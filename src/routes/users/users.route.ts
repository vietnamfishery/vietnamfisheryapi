import { NextFunction, Request, Response } from 'express';
import { logger, UserRolesServices, ProvinceServices, DistrictServives, WardServices, PondsServices, UserServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { User, UserRole, OwnerBreed, OwnerStorage } from '../../components';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Enscrypts } from '../../lib';
import * as jwt from 'jsonwebtoken';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { defaultImage } from '../../common';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';
import { readFileSync } from 'fs';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class UserRoute extends BaseRoute {
    public static path = '/user';
    private static instance: UserRoute;
    private cert: Buffer = readFileSync(process.cwd() + '/authKey/jwtRS256.key');
    private userRolesServices: UserRolesServices = new UserRolesServices();
    private provinceServices: ProvinceServices = new ProvinceServices();
    private districtServives: DistrictServives = new DistrictServives();
    private wardServices: WardServices = new WardServices();
    private pondsServices: PondsServices = new PondsServices();
    private userServives: UserServives = new UserServives();
    /**
     * @class UserRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!UserRoute.instance) {
            UserRoute.instance = new UserRoute();
        }
        return UserRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[UserRoute] Creating user route.');

        // vertify login
        this.router.get('/vertify', this.vertify);
        this.router.get('/vertify/boss', Authentication.isLogin, this.vertifyBoss);
        this.router.get('/vertify/roles', Authentication.isLogin, this.vertifyRoles);

        // add route boss
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.get('/get', Authentication.isLogin, this.getUserInfo);
        this.router.get('/getWithUpdate', Authentication.isLogin, this.getUserInfoWithUpdate);
        this.router.put('/update', Authentication.isLogin, this.updateUserProfile);
        this.router.put('/update/password', Authentication.isLogin, this.updateUserPassword);

        // employees
        this.router.post('/register/employee', Authentication.isLogin, this.regiterEmployee);
        this.router.get('/gets/employees', Authentication.isLogin, this.getEmployee);
        this.router.get('/gets/employees/withoutIsDelete', Authentication.isLogin, this.getEmployeesWithoutIsDelete);
        this.router.get('/get/employee', Authentication.isLogin, this.getEmplyeeById);
        this.router.get('/gets/employees/pond', Authentication.isLogin, this.getEmployeesPondRole);
        this.router.get('/gets/all/employees/pond', Authentication.isLogin, this.getAllPondAndEmployees);
        this.router.put('/update/employee', Authentication.isLogin, this.updateEmployee);
        this.router.post('/insert/employee/role', Authentication.isLogin, this.insertOnlyRole);

        // log endPoint
        this.logEndpoints(this.router, UserRoute.path);
    }

    private register = async (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const { firstname, lastname, username, password } = request.body;
        user.setUserUUId = uuidv4();
        user.setFirstname = firstname;
        user.setLastname = lastname;
        user.setUsername = username;
        const hash = user.hashPassword(password);
        user.setPassword = hash;
        user.setImages = defaultImage.userImage;
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            const userCreated: any = await user.userServices.models.create(user, {
                transaction: t
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Tên người dùng đã được sử dụng, vui lòng thử tên khác.'
                });
                t.rollback();
            });
            if(userCreated.userId) {
                const storageOwner: OwnerStorage = new OwnerStorage();
                storageOwner.setOwnerStorages(null, userCreated.userId);
                const breedOwner: OwnerBreed = new OwnerBreed();
                breedOwner.setOwnerBreed(null, userCreated.userId);
                const sOwner: any = await storageOwner.storegeOwnwerServices.models.create(storageOwner, { transaction: t })
                    .catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Có lỗi xảy ra, vui lòng thực hiện lại.'
                        });
                        t.rollback();
                    });
                const bOwner: any = await breedOwner.breedOwnwerServices.models.create(breedOwner, { transaction: t })
                    .catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Có lỗi xảy ra, vui lòng thực hiện lại.'
                        });
                        t.rollback();
                    });
                if(sOwner && bOwner) {
                    response.status(200).json({
                        success: true,
                        message: 'Tạo tài khoản thành công, vui lòng đợi trong khi chúng tôi chuyển bạn về trang trước...'
                    });
                    t.commit();
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Có lỗi xảy ra, vui lòng thực hiện lại.'
                    });
                    t.rollback();
                }
            }
        });
    }

    private login = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const { username, password } = request.body;
        user.setUsername = username;
        user.setPassword = password;
        user.userServices.models.findOne({
            include: [
                {
                    model: this.userRolesServices.models,
                    as: ActionAssociateDatabase.USER_2_ROLES_USER,
                    required: false
                }
            ],
            where: {
                username
            },
            attributes: ['userId', 'userUUId', 'lastname', 'firstname', 'username', 'password', 'createdDate', 'createdBy']
        }).then((u: any) => {
            if(!u) {
                response.json({
                    success: false,
                    message: 'Sai tài khoản, mật khẩu, vui lòng thử lại!'
                });
            } else {
                Enscrypts.compare(user.getPassword, u.password).then((isMatch: boolean) => {
                    if(isMatch) {
                        delete u.dataValues.password;
                        const content: any = u.dataValues;
                        const token: any = jwt.sign(content, this.cert, {
                            algorithm: 'RS512'
                        });
                        response.json({
                            success: true,
                            token
                        });
                    } else {
                        response.json({
                            success: false,
                            message: 'Sai tài khoản, mật khẩu, vui lòng thử lại!'
                        });
                    }
                }).catch(err => {
                    response.json({
                        success: false,
                        message: 'Sai tài khoản, mật khẩu, vui lòng thử lại!'
                    });
                });
            }
        }).catch(err => {
            response.json({
                success: false,
                message: 'Sai tài khoản, mật khẩu, vui lòng thử lại!'
            });
        });
    }

    /**
     * get cho chức năng xem thông tin
     */
    private getUserInfo = (request: Request, response: Response) => {
        const user: User = new User();
        const token: string = request.headers.authorization;
        const decodeToken: any = Authentication.detoken(token);
        const { userId } = decodeToken;
        user.userServices.models.findOne({
            include: [
                {
                    model: this.provinceServices.models,
                    as: ActionAssociateDatabase.USER_2_PRO
                },
                {
                    model: this.districtServives.models,
                    as: ActionAssociateDatabase.USER_2_DIS,
                },
                {
                    model: this.wardServices.models,
                    as: ActionAssociateDatabase.USER_2_WAR
                }
            ],
            where: {
                userId
            }
        })
        .then((user$: any) => {
            if(!user$) {
                response.json({
                    success: false,
                    message: 'Có lỗi xảy ra vui lòng thử lại!'
                });
            } else {
                delete user$.dataValues[`password`];
                response.json(user$.dataValues);
            }
        }).catch(err => {
            response.json({
                success: false,
                message: 'Có lỗi xảy ra vui lòng thử lại!'
            });
        });
    }

    /**
     * get cho chưc năng update, khong can join tinh huyen xa
     */
    private getUserInfoWithUpdate = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization;
        const decodeToken: any = Authentication.detoken(token);
        user.setUsername = decodeToken.username;
        user.login().then((user$: any) => {
            if(!user$) {
                response.json({
                    success: false,
                    message: 'Có lỗi xảy ra vui lòng thử lại!'
                });
            } else {
                delete user$[`password`];
                response.json(user$);
            }
        }).catch(err => {
            response.json({
                success: false,
                message: 'Có lỗi xảy ra vui lòng thử lại!'
            });
        });
    }

    private updateUserProfile = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization;
        const decodetoken: any = Authentication.detoken(token);
        const { firstname, lastname, birthday, email, phone, town, district, province, images } = request.body;
        user.setUser(decodetoken.userId,undefined,firstname,lastname,undefined,null,birthday,email,phone,undefined,town,district,province,null,images,undefined,undefined,undefined,undefined,undefined);
        if(request.files) {
            GoogleDrive.upload(request,response,next).then((data: any) => {
                if(data.fileId) {
                    user.setImages = data.fileId;
                    user.updateMyProfile().then(res => {
                        if(Array.isArray(res)) {
                            response.status(200).json({
                                success: true,
                                fileId: data.fileId,
                                message: 'Hồ sơ đã được cập nhật.'
                            });
                        } else {
                            response.status(200).json({
                                success: false,
                                message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!'
                    });
                        }
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!',
                            error: e
                        });
                    });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!'
                    });
                }
            });
        } else {
            user.updateMyProfile().then(res => {
                if(Array.isArray(res)) {
                    response.status(200).json({
                        success: true,
                        message: 'Hồ sơ đã được cập nhật.'
                    });
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!'
                    });
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, xin vui lòng thử lại!',
                    error: e
                });
            });
        }
    }

    private updateUserPassword = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const { oldPassword, newPassword } = request.body;
        const token: string = request.headers.authorization;
        const decodeToken: any = Authentication.detoken(token);
        user.setUsername = decodeToken.username;
        user.login().then((data: any) => {
            Enscrypts.compare(oldPassword, data.password).then((isMatch: boolean) => {
                if(!isMatch) {
                    response.status(200).json({
                        success: false,
                        message: 'Sai mật khẩu cũ!'
                    });
                } else {
                    user.setUserId = decodeToken.userId;
                    user.setPassword = newPassword;
                    user.changePassword().then((data$: any) => {
                        response.status(200).json({
                            success: true,
                            message: 'Thực hiện thành công, vui lòng đợi hệ thống chuyển sang trang trước.'
                        });
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Có lỗi xảy ra vui lòng thử lại!',
                            error: e
                        });
                    });
                }
            });
        });
    }

    private regiterEmployee = async (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { username, password, firstname, lastname, roles } = request.body;
        user.setUserUUId = uuidv4();
        user.setFirstname = firstname;
        user.setLastname = lastname;
        user.setUsername = username;
        const hash = user.hashPassword(password);
        user.setPassword = hash;
        user.setImages = defaultImage.userImage;
        user.setCreatedBy = deToken.userUUId;
        return this.sequeliz.transaction().then(async (t: Transaction) => {
            const userCreated: any = await user.userServices.models.create(user, {
                transaction: t
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Tên người dùng đã được sử dụng, vui lòng thử tên khác.'
                });
            });
            if(userCreated) {
                const userRoles: UserRole = new UserRole();
                userRoles.setUserRoles(null, deToken.userId, userCreated.userId, roles);
                const role: any = await userRoles.userRolesServices.models.create(userRoles, {
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Có lỗi xảy ra, vui lòng thực hiện lại.'
                    });
                    t.rollback();
                });
                if(role) {
                    response.status(200).json({
                        success: true,
                        message: 'Tạo tài khoản thành công, vui lòng đợi trong khi chúng tôi chuyển bạn về trang trước...'
                    });
                    t.commit();
                } else {
                    response.status(200).json({
                        success: false,
                        message: 'Có lỗi xảy ra, vui lòng thực hiện lại.'
                    });
                    t.rollback();
                }
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Có lỗi xảy ra, vui lòng thực hiện lại.'
                });
                t.rollback();
            }
        });
    }

    private getEmployee = async (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization;
        const decodetoken: any = Authentication.detoken(token);
        user.userServices.models.findAll({
            include: [
                {
                    model: this.userRolesServices.models,
                    as: ActionAssociateDatabase.USER_2_ROLES_USER,
                    where: {
                        bossId: decodetoken.userId,
                        [this.userRolesServices.Op.and]: {
                            userId: {
                                [this.userRolesServices.Op.ne]: decodetoken.userId
                            }
                        }
                    }
                }
            ]
        }).then(async (employees: any[]) => {
            response.status(200).json({
                success: true,
                message: '',
                employees
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi không mong muốn, vui lòng thử lại.'
            });
            throw e;
        });
    }

    private getEmplyeeById = async (request: Request, response: Response, next: NextFunction) => {
        const { rolesid }: any = request.headers;
        const user: User = new User();
        this.userRolesServices.models.findOne({
            include: [
                {
                    model: user.userServices.models,
                    as: ActionAssociateDatabase.USER_ROLES_2_USER
                }
            ],
            where: {
                rolesId: (rolesid * 1)
            }
        }).then(roles => {
            response.status(200).json({
                success: true,
                message: '',
                roles
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thực hiện lại...'
            });
        });
    }

    private insertOnlyRole = async (request: Request, response: Response, next: NextFunction) => {
        const userRoles: UserRole = new UserRole();
        const { userId, roles } = request.body;
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        userRoles.setBossId = deToken.userId;
        userRoles.setUserId = userId;
        userRoles.setRoles = roles;
        userRoles.userRolesServices.models.upsert(userRoles.getFields(userRoles))
        .then((res: any) => {
            response.status(200).json({
                success: true,
                message: 'Phân quyền thành công.'
            });
        }).catch(e => {
            e;
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thực hiện lại...'
            });
        });
    }

    private updateEmployee = async (request: Request, response: Response, next: NextFunction) => {
        const userRoles: UserRole = new UserRole();
        const { rolesId, roles, isDeleted } = request.body;
        userRoles.setRolesId = rolesId;
        userRoles.setRoles = roles;
        userRoles.setIsDeleted = isDeleted;
        userRoles.update().then((res: any) => {
            if(res.length > 0) {
                response.status(200).json({
                    success: true,
                    message: 'Cập nhật thành công.'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thực hiện lại...'
            });
        });
    }

    private getEmployeesPondRole = async (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        user.userServices.models.findAll({
            include: [
                {
                    model: this.pondsServices.models,
                    through: {
                        where: {
                            isDeleted: 0
                        }
                    },
                    as: ActionAssociateDatabase.USER_2_POND_MANY_ROLES,
                    where: {
                        userId: deToken.userId
                    }
                }
            ]
        }).then((res: any) => {
            if(res.length > 0) {
                response.status(200).json({
                    success: true,
                    message: '',
                    employees: res
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: 'Bạn không có nhân viên có quyền quản lý ao.'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }

    private getAllPondAndEmployees = async (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        user.userServices.models.findOne({
            include: [
                {
                    model: this.userRolesServices.models,
                    as: ActionAssociateDatabase.USER_ROLES_2_USER_BOSS,
                    where: {
                        roles: 1
                    },
                    attributes: ['userId'],
                    include: [
                        {
                            model: user.userServices.models,
                            as: ActionAssociateDatabase.USER_ROLES_2_USER,
                            attributes: ['userId', 'userUUId', 'username', 'lastname', 'firstname']
                        }
                    ]
                },
                {
                    model: this.pondsServices.models,
                    as: ActionAssociateDatabase.USER_2_POND
                }
            ],
            where: {
                userId: deToken.userId
            },
            attributes: []
        }).then((res: any) => {
            response.status(200).json({
                success: true,
                message: '',
                user: res
            });
        }).catch(e => {
            console.log(e);
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }

    private getEmployeesWithoutIsDelete = async (request: Request, response: Response, next: NextFunction) => {
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const user: User = new User();
        user.userServices.models.findAll({
            where: {
                createdBy: deToken.userUUId
            }
        }).then(employees => {
            response.status(200).json({
                success: true,
                message: '',
                employees
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.'
            });
        });
    }

    private vertify = async (request: Request, response: Response, next: NextFunction) => {
        // start authozation info
        const token: string = request.headers.authorization;
        jwt.verify(token, Authentication.cert, {
            algorithms: ['RS512', 'RS256']
        }, (err, data) => {
            if(err) {
                response.status(200).json({
                    success: false,
                    message: 'Bạn cần đăng nhập để tiếp tục.'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: 'Đăng nhập thành công!'
                });
            }
        });
    }

    private vertifyBoss = async (request: Request, response: Response, next: NextFunction) => {
        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        this.userServives.models.findOne({
            where: {
                userId,
                createdBy: null
            }
        }).then(res => {
            if(res) {
                response.status(200).json({
                    success: true,
                    message: '',
                    isBoss: true
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: '',
                    isBoss: false
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi xác thực người dùng.'
            });
        });
    }

    private vertifyRoles = async (request: Request, response: Response, next: NextFunction) => {
        // start authozation info
        const token: string = request.headers.authorization;
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        this.userServives.models.findOne({
            include: [
                {
                    model: this.userRolesServices.models,
                    as: ActionAssociateDatabase.USER_2_ROLES_USER
                }
            ],
            where: {
                userId
            }
        }).then((res: any) => {
            if(res) {
                response.status(200).json({
                    success: true,
                    message: '',
                    roles: res.roles
                });
            } else {
                response.status(200).json({
                    success: false,
                    message: '',
                    roles: []
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi xác thực người dùng.'
            });
        });
    }
}

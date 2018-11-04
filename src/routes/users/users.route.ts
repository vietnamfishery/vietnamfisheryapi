import { NextFunction, Request, Response } from 'express';
import { logger, UserRolesServices, UserServives } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { User, UserRole, OwnerBreed, OwnerStorage } from '../../components';
import { ActionAssociateDatabase } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Enscrypts } from '../../lib';
import * as jwt from 'jsonwebtoken';
import { GoogleDrive } from '../../googleAPI/drive.google';
import { secret, defaultImage } from '../../common';
import { Authentication } from '../../helpers/login-helpers';
import { Sequelize, Transaction } from 'sequelize';
import DBHelper from '../../helpers/db-helpers';
import { readFileSync } from 'fs';
import * as path from 'path';

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
    private sequeliz: Sequelize = DBHelper.sequelize;
    private userRolesServices: UserRolesServices = new UserRolesServices();
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
        // log
        logger.info('[UserRoute] Creating ping route.');
        // add index page route
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.get('/get', Authentication.isLogin, this.getUserInfo);
        this.router.get('/getWithUpdate', Authentication.isLogin, this.getUserInfoWithUpdate);
        this.router.put('/update', Authentication.isLogin, this.updateUserProfile);
        this.router.put('/update/password', Authentication.isLogin, this.updateUserPassword);
        this.router.post('/register/employee', Authentication.isLogin, this.regiterEmployee);
        this.router.get('/gets/employees', Authentication.isLogin, this.getEmployee);
        this.router.get('/get/employee', Authentication.isLogin, this.getEmplyeeById);
        this.router.put('/update/employee', Authentication.isLogin, this.updateEmployee);
        this.router.post('/insert/employee/role', Authentication.isLogin, this.insertOnlyRole);
        this.router.get('/login', (req, res) => {
            res.render('login');
        });
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
                const userRoles: UserRole = new UserRole();
                userRoles.setUserRoles(null, userCreated.userId, userCreated.userId, 0);
                const role: any = await userRoles.userRolesServices.models.create(userRoles, {
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Có lỗi xảy ra, vui lòng thực hiện lại.'
                    });
                    t.rollback();
                });
                if(role.userId) {
                    const ownerStorage: OwnerStorage = new OwnerStorage();
                    ownerStorage.setOwnerStorages(null, userCreated.userId);
                    ownerStorage.storegeOwnwerServices.models.create(ownerStorage, {
                        transaction: t
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Có lỗi xảy ra, vui lòng thực hiện lại.'
                        });
                        t.rollback();
                    }).then(async (oStorage: any) => {
                        const ownerBreed: OwnerBreed = new OwnerBreed();
                        ownerBreed.setOwnerBreed(null, userCreated.userId);
                        const owner: any = await ownerBreed.breedOwnwerServices.models.create(ownerBreed, {
                            transaction: t
                        }).catch(e => {
                            response.status(200).json({
                                success: false,
                                message: 'Có lỗi xảy ra, vui lòng thực hiện lại.'
                            });
                            t.rollback();
                        });
                        if(owner) {
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
                    });

                }
            }
        });
    }

    private login = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const { username, password } = request.body;
        const certsPath = path.join(__dirname, '/../../certs', 'server');
        const cert = readFileSync(path.join(certsPath, 'my-server.key.pem'), { encoding: 'utf8'});
        user.setUsername = username;
        user.setPassword = password;
        user.userServices.models.findOne({
            include: [
                {
                    model: this.userRolesServices.models,
                    as: ActionAssociateDatabase.USER_2_ROLES_BOSS,
                    required: false,
                    attributes: ['bossId']
                }
            ],
            where: {
                username
            },
            attributes: ['userId', 'username', 'password', 'createdDate']
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
                        const token: any = jwt.sign(content, cert, {
                            algorithm: 'RS512'
                        });
                        // token = this.reCryptToken(token,content.boss.length === 0);
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

    private getUserInfo = (request: Request, response: Response) => {
        const user: User = new User();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        const { userId, userUUId, firstname, lastname, username, password, birthday, email, phone, addressContact, town, district, province, status, images, createdBy, createdDate, updatedBy, updatedDate, isDeleted } = decodeToken;
        user.setUser(userId, userUUId, firstname, lastname, username, password, birthday, email, phone, addressContact, town, district, province, status, images, createdBy, createdDate, updatedBy, updatedDate, isDeleted);
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

    private getUserInfoWithUpdate = (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization.split('100%<3')[1];
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
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        const { firstname, lastname, birthday, email, phone, town, district, province, images } = request.body;
        user.setUser(decodetoken.userId,null,firstname,lastname,decodetoken.username,null,birthday,email,phone,null,town,district,province,null,images,decodetoken.userUUId,undefined,undefined,undefined,undefined);
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
        const token: string = request.headers.authorization.split('100%<3')[1];
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
                            message: 'Thực hiện thành công!'
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

    regiterEmployee = async (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        const { username, password, firstname, lastname, roles } = request.body;
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
            });
            if(userCreated) {
                const userRoles: UserRole = new UserRole();
                userRoles.setUserRoles(null, decodeToken.userId, userCreated.userId, roles);
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

    getEmployee = async (request: Request, response: Response, next: NextFunction) => {
        const user: User = new User();
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodetoken: any = Authentication.detoken(token);
        user.userServices.models.findAll({
            include: [
                {
                    model: this.userRolesServices.models,
                    as: ActionAssociateDatabase.USER_2_ROLE_USER,
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

    getEmplyeeById = async (request: Request, response: Response, next: NextFunction) => {
        const { rolesid }: any = request.headers;
        this.userRolesServices.models.findOne({
            include: [
                {
                    model: this.userServives.models,
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

    insertOnlyRole = async (request: Request, response: Response, next: NextFunction) => {
        const userRoles: UserRole = new UserRole();
        const { userId, roles } = request.body;
        const token: string = request.headers.authorization.split('100%<3')[1];
        const decodeToken: any = Authentication.detoken(token);
        userRoles.setBossId = decodeToken.userId;
        userRoles.setUserId = userId;
        userRoles.setRoles = roles;
        userRoles.insert().then((res: any) => {
            response.status(200).json({
                success: true,
                message: 'Phân quyền thành công.'
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng kiểm tra và thực hiện lại...'
            });
        });
    }

    updateEmployee = async (request: Request, response: Response, next: NextFunction) => {
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
}

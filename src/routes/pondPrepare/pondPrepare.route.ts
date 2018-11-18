import { PondPrepare, PondPrepareDetail, Storage, Pond, SeasonsAndPond, Incurred } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, PondPrepareServices, SeasonAndPondServices, SeasonServices, PondsServices, IncurredsServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { ActionAssociateDatabase, defaultImage } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { Authentication } from '../../helpers/login-helpers';
import { Transaction } from 'sequelize';
import { DateUtil } from '../../lib';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PondPrepareRoute extends BaseRoute {
    public static path = '/PondPrepares';
    private static instance: PondPrepareRoute;
    private pondPrepareServices: PondPrepareServices = new PondPrepareServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    private incurredsServices: IncurredsServices = new IncurredsServices();
    /**
     * @class PondPrepareRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondPrepareRoute.instance) {
            PondPrepareRoute.instance = new PondPrepareRoute();
        }
        return PondPrepareRoute.instance.router;
    }

    private init() {
        logger.info('[PondPrepareRoute] Creating season route.');
        this.router.post('/add', Authentication.isLogin, this.addPrepare);
        this.router.post('/addNew', Authentication.isLogin, this.addNewPrepare);
        this.router.post('/add/exiting-pond', Authentication.isLogin, this.addPrepareOldPond);
        this.router.post('/gets', Authentication.isLogin, this.getPondPrepares);
        this.router.get('/get', Authentication.isLogin, this.getById);
        this.router.put('/update', Authentication.isLogin, this.updatePondPrepare);

        // incurred
        this.router.post('incurreds/add', Authentication.isLogin, this.addIncurred);
        this.router.put('incurreds/update', Authentication.isLogin, this.updateIncurred);
    }

    private getPondPrepares = (request: Request, response: Response, next: NextFunction) => {
        const { seasonId, pondId } = request.body;
        this.pondPrepareServices.models.findAll({
            include: [
                // {
                //     model: this.pondPrepareDetailsServices.models,
                //     as: ActionAssociateDatabase.POND_PREPARE_2_POND_PREPARE_DETAILS,
                //     // include: [
                //     //     {
                //     //         model: this.materialServices.models,
                //     //         as: ActionAssociateDatabase.POND_PREPARE_DETAIL_2_MATERIAL
                //     //     }
                //     // ]
                // },
                {
                    model: this.seasonAndPondServices.models,
                    as: ActionAssociateDatabase.POND_PREPARE_2_SEASON_AND_POND,
                    include: [
                        {
                            model: this.seasonServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                            where: {
                                seasonId
                            },
                            attributes: ['seasonName']
                        },
                        {
                            model: this.pondsServices.models,
                            as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
                            where: {
                                pondId
                            },
                            attributes: ['pondName']
                        }
                    ]
                }
            ]
        }).then((res) => {
            response.status(200).json({
                success: true,
                message: '',
                pondPrepare: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Lỗi, vui lòng thử lại sau.',
                error: e
            });
            throw e;
        });
    }

    /**
     * Chức năng click vào 1 đợt chuẩn bị cụ thể
     */
    private getById = (request: Request, response: Response, next: NextFunction) => {
        const { pondprepareid } = request.headers;
        const pondPrepare: PondPrepare = new PondPrepare();
        pondPrepare.setPondPrepareId = pondprepareid;
        pondPrepare.getById(pondPrepare.getPondPrepareId).then(res => {
            response.status(200).json({
                success: true,
                message: '',
                pondPrepare: res
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Không có thông tin của đợt chuẩn bị này, vui lòng kiểm tra lại, cảm ơn!'
            });
        });
    }

    /**
     * Update tên vụ
     */
    private updatePondPrepare = (request: Request, response: Response, next: NextFunction) => {
        const pondPrepare: PondPrepare = new PondPrepare();
        const { pondPrepareId, pondprepareName } = request.body;
        if (!pondPrepareId) {
            response.status(200).json({
                success: false,
                message: 'Hành động không khuyến khích, vui lòng quay lại sau.'
            });
            return response.end();
        }
        pondPrepare.setPondPrepareId = pondPrepareId;
        pondPrepare.setPondprepareName = pondprepareName;
        pondPrepare.update().then(res => {
            response.status(200).json({
                success: true,
                message: 'Cập nhật thành công.'
            });
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau, cảm ơn!'
            });
        });
    }

    /**
     * Thêm hoạt động chuẩn bị - transaction cũ
     */
    private addPrepare = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, pondPrepareId, storageId, quantity, seasonAndPondId } = request.body;
        if (!seasonAndPondId) {
            const seasonAndPond: any = await this.seasonAndPondServices.models.findOne({
                include: [
                    {
                        model: this.seasonServices.models,
                        as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                        where: {
                            userId: ownerId,
                            status: 0
                        },
                        attributes: []
                    }
                ],
                where: {
                    pondId
                },
                attributes: ['seasonAndPondId']
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
            });
            return this.sequeliz.transaction().then(async (t: Transaction) => {
                const storage: Storage = new Storage();
                const str: any = await storage.storegeServices.models.update(
                    {
                        quantityStorages: this.sequeliz.literal(`quantityStorages - ${quantity}`)
                    },
                    {
                        where: {
                            storageId
                        },
                        transaction: t
                    }
                ).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã xảy ra lỗi vui lòng thử lại sau.',
                    });
                    t.rollback();
                });
                if (str) {
                    const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
                    pondPrepareDetail.setPondpreparedetails(null, uuidv4(), pondPrepareId, storageId, quantity);
                    pondPrepareDetail.pondPrepareDetailsServices.models.create(pondPrepareDetail, {
                        transaction: t
                    }).then(res => {
                        response.status(200).json({
                            success: true,
                            message: 'Thêm thành công.'
                        });
                        t.commit();
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                            e
                        });
                        t.rollback();
                    });
                }
            });
        } else {
            return this.sequeliz.transaction().then(async (t: Transaction) => {
                const storage: Storage = new Storage();
                const str: any = await storage.storegeServices.models.update(
                    {
                        quantityStorages: this.sequeliz.literal(`quantityStorages - ${quantity}`)
                    },
                    {
                        where: {
                            storageId
                        },
                        transaction: t
                    }
                ).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã xảy ra lỗi vui lòng thử lại sau.',
                    });
                    t.rollback();
                });
                if (str) {
                    const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
                    pondPrepareDetail.setPondpreparedetails(null, uuidv4(), pondPrepareId, storageId, quantity);
                    pondPrepareDetail.pondPrepareDetailsServices.models.create(pondPrepareDetail, {
                        transaction: t
                    }).then(res => {
                        response.status(200).json({
                            success: true,
                            message: 'Thêm thành công.'
                        });
                        t.commit();
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                            e
                        });
                        t.rollback();
                    });
                }
            });

        }
    }

    private addPrepareOldPond = async (request: Request, response: Response, next: NextFunction) => {
        const { pondId, ownerId, pondPrepareName, detailsOfPrepare } = request.body;
        const snp: any = await this.seasonAndPondServices.models.findOne({
            include: [
                {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                    where: {
                        userId: ownerId,
                        status: 0
                    },
                    attributes: []
                }
            ],
            where: {
                pondId
            },
            attributes: ['seasonAndPondId']
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        });
        if (!snp) {
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        } else {
            return this.sequeliz.transaction().then(async (t: Transaction) => {
                const pondPrepare: PondPrepare = new PondPrepare();
                pondPrepare.setPondprepare(null, uuidv4(), snp.seasonAndPondId, pondPrepareName);
                const pp: any = await pondPrepare.pondPrepareServices.models.create(pondPrepare, {
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                    });
                    t.rollback();
                });
                if (pp) {
                    const successArr: any[] = [];
                    for (const detail of detailsOfPrepare) {
                        const storage: Storage = new Storage();
                        const str: any = await storage.storegeServices.models.update(
                            {
                                quantityStorages: this.sequeliz.literal(`quantityStorages - ${detail.quantity}`)
                            },
                            {
                                where: {
                                    storageId: detail.storageId
                                },
                                transaction: t
                            }
                        ).catch(e => {
                            response.status(200).json({
                                success: false,
                                message: 'Đã xảy ra lỗi vui lòng thử lại sau.',
                                e
                            });
                            t.rollback();
                        });
                        if (str.length > 0) {
                            const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
                            pondPrepareDetail.setPondpreparedetails(null, uuidv4(), pp.pondPrepareId, detail.storageId, detail.quantity);
                            const ppd: any = await pondPrepareDetail.pondPrepareDetailsServices.models.create(pondPrepareDetail, {
                                transaction: t
                            }).catch(e => {
                                response.status(200).json({
                                    success: false,
                                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                                    e
                                });
                                t.rollback();
                            });
                            if (ppd) {
                                successArr.push(1);
                            } else {
                                response.status(200).json({
                                    success: false,
                                    message: 'Thất bại, vui lòng thử lại sau.',
                                });
                            }
                        } else {
                            response.status(200).json({
                                success: false,
                                message: 'Vật phẩm không tồn tại trong kho của bạn, vui lòng thêm vật phẩm này vào kho và quay lại sau.'
                            });
                        }
                    }
                    if (detailsOfPrepare.length === successArr.length) {
                        t.commit();
                        response.status(200).json({
                            success: true,
                            message: 'Thêm thành công.'
                        });
                    } else {
                        t.rollback();
                        response.status(200).json({
                            success: false,
                            message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                        });
                    }
                } else {
                    t.rollback();
                    response.status(200).json({
                        success: false,
                        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                    });
                }
            }).catch(e => {
                response.status(200).json({
                    success: false,
                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                });
            });
        }
    }

    /**
     * Thêm hoạt động chuẩn bị ao
     * Sau khi quá trình thêm kết thúc người dùng sẽ có một ao mới
     */
    private addNewPrepare = async (request: Request, response: Response, next: NextFunction) => {
        const { pondPrepareId, ownerId, pondPrepareName, detailsOfPrepare } = request.body; // init
        const { pondName, pondArea, pondDepth, createCost, pondLatitude, pondLongitude, status } = request.body; // Thông tin của ao mới
        /** Chuẩn bị cho ao mới */
        if (!pondPrepareId) {
            return this.sequeliz.transaction().then(async (t: Transaction) => {
                const pond: Pond = new Pond();
                pond.setPond(null, uuidv4(), ownerId, pondName, pondArea, pondDepth, createCost, status, status === 1 ? 1 : 0, status === 1 ? 1 : 0, defaultImage.pondImage, pondLatitude, pondLongitude, DateUtil.getUTCDateTime());
                const p: any = await this.pondsServices.models.create(pond, {
                    transaction: t
                }).catch(e => {
                    response.status(200).json({
                        success: false,
                        message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                    });
                    t.rollback();
                });
                if (!p) {
                    response.status(200).json({
                        success: false,
                        message: 'Lỗi dữ liệu đường truyền, vui lòng thử lại sau'
                    });
                    t.rollback();
                } else {
                    const ss: any = await this.seasonServices.models.findOne({
                        where: {
                            userId: ownerId,
                            status: 0
                        },
                        transaction: t
                    }).catch(e => {
                        response.status(200).json({
                            success: false,
                            message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                        });
                        t.rollback();
                    });
                    if (!ss) {
                        response.status(200).json({
                            success: false,
                            message: 'Bạn không có vụ đang kích hoạt, vui lòng kích hoạt vụ mùa để tiếp tục sử dụng hệ thống.'
                        });
                    } else {
                        const seasonAndPond: SeasonsAndPond = new SeasonsAndPond();
                        seasonAndPond.setSeasonsAndPond(null, ss.seasonId, p.pondId);
                        const snp: any = await seasonAndPond.seasonAndPondServices.models.create(seasonAndPond, {
                            transaction: t
                        }).catch(e => {
                            response.status(200).json({
                                success: false,
                                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                            });
                            t.rollback();
                        });
                        if (!snp) {
                            response.status(200).json({
                                success: false,
                                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                            });
                            t.rollback();
                        } else {
                            const pondPrepare: PondPrepare = new PondPrepare();
                            pondPrepare.setPondprepare(null, uuidv4(), snp.seasonAndPondId, pondPrepareName);
                            const pp: any = await pondPrepare.pondPrepareServices.models.create(pondPrepare, {
                                transaction: t
                            }).catch(e => {
                                response.status(200).json({
                                    success: false,
                                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                                });
                                t.rollback();
                            });
                            if (pp) {
                                const successArr: any[] = [];
                                for (const detail of detailsOfPrepare) {
                                    const storage: Storage = new Storage();
                                    const str: any = await storage.storegeServices.models.update(
                                        {
                                            quantityStorages: this.sequeliz.literal(`quantityStorages - ${detail.quantity}`)
                                        },
                                        {
                                            where: {
                                                storageId: detail.storageId
                                            },
                                            transaction: t
                                        }
                                    ).catch(e => {
                                        response.status(200).json({
                                            success: false,
                                            message: 'Đã xảy ra lỗi vui lòng thử lại sau.',
                                            e
                                        });
                                        t.rollback();
                                    });
                                    if (str.length > 0) {
                                        const pondPrepareDetail: PondPrepareDetail = new PondPrepareDetail();
                                        pondPrepareDetail.setPondpreparedetails(null, uuidv4(), pp.pondPrepareId, detail.storageId, detail.quantity);
                                        const ppd: any = await pondPrepareDetail.pondPrepareDetailsServices.models.create(pondPrepareDetail, {
                                            transaction: t
                                        }).catch(e => {
                                            response.status(200).json({
                                                success: false,
                                                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                                                e
                                            });
                                            t.rollback();
                                        });
                                        if (ppd) {
                                            successArr.push(1);
                                        } else {
                                            response.status(200).json({
                                                success: false,
                                                message: 'Thất bại, vui lòng thử lại sau.',
                                            });
                                        }
                                    } else {
                                        response.status(200).json({
                                            success: false,
                                            message: 'Vật phẩm không tồn tại trong kho của bạn, vui lòng thêm vật phẩm này vào kho và quay lại sau.'
                                        });
                                    }
                                }
                                if (detailsOfPrepare.length === successArr.length) {
                                    t.commit();
                                    response.status(200).json({
                                        success: true,
                                        message: 'Thêm thành công.'
                                    });
                                } else {
                                    t.rollback();
                                    response.status(200).json({
                                        success: false,
                                        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                                    });
                                }
                            } else {
                                t.rollback();
                                response.status(200).json({
                                    success: false,
                                    message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                                });
                            }
                        }
                    }
                }
            });
        }
    }

    private addIncurred = async (request: Request, response: Response, next: NextFunction) => {
        const { pondPrepareId, incurredName, value } = request.body;
        const incurred: Incurred = new Incurred();
        incurred.setIncurred(null, uuidv4(), pondPrepareId, incurredName, value);
        incurred.incurredsServices.models.create(incurred).then(res => {
            if(!res) {
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: 'Thêm thành phí phát sinh thành công.'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        });
    }

    private updateIncurred = async (request: Request, response: Response, next: NextFunction) => {
        const { incurredUUId, incurredName, value } = request.body;
        this.incurredsServices.models.update({
            incurredName, value
        }, {
            where: {
                incurredUUId
            }
        }).then(res => {
            if(!res) {
                response.status(200).json({
                    success: false,
                    message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: 'Thêm thành phí phát sinh thành công.'
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã xảy ra lỗi vui lòng thử lại sau.'
            });
        });
    }
}

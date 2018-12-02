// import { UsingFood, TakeCare } from '../../components';
import { NextFunction, Request, Response } from 'express';
import { logger, TakeCareServices, SeasonAndPondServices, SeasonServices, PondsServices, PondUserRolesServices, UsingFoodsServices, UsingVeterinaryServices, StoregeServices } from '../../services';
import { BaseRoute } from '../BaseRoute';
import { Authentication } from '../../helpers/login-helpers';
import { FindOptions } from 'sequelize';
import { ActionAssociateDatabase } from '../../common';
import { DateUtil } from '../../lib';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class TakeCareRoute extends BaseRoute {
    public static path = '/takeCare';
    private static instance: TakeCareRoute;
    private takeCareServices: TakeCareServices = new TakeCareServices();
    private seasonAndPondServices: SeasonAndPondServices = new SeasonAndPondServices();
    private seasonServices: SeasonServices = new SeasonServices();
    private pondsServices: PondsServices = new PondsServices();
    private pondUserRolesServices: PondUserRolesServices = new PondUserRolesServices();
    private usingFoodsServices: UsingFoodsServices = new UsingFoodsServices();
    private usingVeterinaryServices: UsingVeterinaryServices = new UsingVeterinaryServices();
    private storegeServices: StoregeServices = new StoregeServices();
    /**
     * @class TakeCareRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!TakeCareRoute.instance) {
            TakeCareRoute.instance = new TakeCareRoute();
        }
        return TakeCareRoute.instance.router;
    }

    private init() {
        // log message
        logger.info('[TakeCareRoute] Creating Take Care route.');

        // add route
        this.router.post('/gets', Authentication.isLogin, this.getTakeCare);
        this.router.get('/get', this.test);

        // log endpoints
        this.logEndpoints(this.router, TakeCareRoute.path);
    }

    /**
     * @method POST
     *
     * Get using food or using veterinay option
     * ```
     * {
     *      seasonId: number, // required
     *      pondId: number, // required
     *      type: number<0 | 1> // required 0 = Food | 1 = Veterinary
     *      options: {
     *          timeOut: Date,
     *          unitOfTime: string
     *      }
     * }
     * ```
     */
    private getTakeCare = async (request: Request, response: Response, next: NextFunction) => {
        // init search
        const {
            pondId, seasonId,
            type, // type of take care
            /**
             * default (30 days from present)
             * 'days' - get by days
             * 'months' - get by months
             * ```json
             * {
             *      "timeOut": "Thời gian cần get",
             *      "unitOfTime": "Đơn vị tính: days, months"
             * }
             * ```
             */
            options // search options
        } = request.body;

        // start authozation info
        const token: string = request.headers.authorization.split(' ')[1];
        const deToken: any = Authentication.detoken(token);
        const { userId } = deToken;
        const ownerId: number = deToken.createdBy == null && deToken.roles.length === 0 ? deToken.userId : deToken.roles[0].bossId;
        const isBoss: boolean = userId === ownerId;
        // create query
        const query: FindOptions<any> = {
            include: [],
            where: {}
        };

        // tmp where
        let where: any = {};

        // init query
        const init: any = {
            model: this.seasonAndPondServices.models,
            as: ActionAssociateDatabase.TAKE_CARE_2_SEASON_AND_POND,
            where: {
                pondId, seasonId
            },
            include: [
                {
                    model: this.pondsServices.models,
                    as: ActionAssociateDatabase.SEASON_AND_POND_2_POND,
                    include: [
                        {
                            model: this.pondUserRolesServices.models,
                            as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
                            where: {
                                userId
                            },
                            attributes: []
                        }
                    ],
                    where: {
                        userId: ownerId
                    },
                    attributes: []
                },
                {
                    model: this.seasonServices.models,
                    as: ActionAssociateDatabase.SEASON_AND_POND_2_SEASON,
                    where: {
                        userId: ownerId
                    },
                    attributes: []
                }
            ],
            attributes: []
        };
        query.include.push(init);

        // get using Food or veterinary
        let getType: any = {};
        if (type === 0) {
            getType = {
                model: this.usingFoodsServices.models,
                as: ActionAssociateDatabase.TAKE_CARE_2_USING_FOOD,
                required: false,
                include: [
                    {
                        model: this.storegeServices.models,
                        as: ActionAssociateDatabase.USING_FOOD_2_STORAGE,
                        required: false
                    }
                ]
            };

            // options date
            if (options ? options.unitOfTime : false) {
                where = {
                    ...{
                        '$usingFoods.createdDate$': {
                            [this.sequeliz.Op.between]: [
                                DateUtil.getUTCDateTime(DateUtil.startOf(DateUtil.parse(options.timeOut ? options.timeOut : new Date()), options.unitOfTime)),
                                DateUtil.getUTCDateTime(DateUtil.endOf(DateUtil.parse(options.timeOut ? options.timeOut : new Date()), options.unitOfTime))
                            ]
                        }
                    }
                };
                query.where = {
                    ...query.where,
                    ...where
                };
            } else {
                where = {
                    '$usingFoods.createdDate$': {
                        [this.sequeliz.Op.between]: [
                            DateUtil.getUTCDateTime(DateUtil.startOf(DateUtil.subtract(DateUtil.parse(new Date()), 30, 'days'), 'days')),
                            DateUtil.getUTCDateTime(DateUtil.parse(new Date()))
                        ]
                    }
                };
                query.where = {
                    ...query.where,
                    ...where
                };
            }
        }
        if (type === 1) {
            getType = {
                model: this.usingVeterinaryServices.models,
                as: ActionAssociateDatabase.TAKE_CARE_2_USING_VETERINARY,
                required: false,
                include: [
                    {
                        model: this.storegeServices.models,
                        as: ActionAssociateDatabase.USING_VETERINARY_2_STORAGE,
                        required: false
                    }
                ]
            };

            // options date
            if (options ? options.unitOfTime : false) {
                where = {
                    ...{
                        '$usingVeterinary.createdDate$': {
                            [this.sequeliz.Op.between]: [
                                DateUtil.getUTCDateTime(DateUtil.startOf(DateUtil.parse(options.timeOut ? options.timeOut : new Date()), options.unitOfTime)),
                                DateUtil.getUTCDateTime(DateUtil.endOf(DateUtil.parse(options.timeOut ? options.timeOut : new Date()), options.unitOfTime))
                            ]
                        }
                    }
                };
                query.where = {
                    ...query.where,
                    ...where
                };
            } else {
                where = {
                    '$usingVeterinary.createdDate$': {
                        [this.sequeliz.Op.between]: [
                            DateUtil.getUTCDateTime(DateUtil.startOf(DateUtil.subtract(DateUtil.parse(new Date()), 30, 'days'), 'days')),
                            DateUtil.getUTCDateTime(DateUtil.parse(new Date()))
                        ]
                    }
                };
                query.where = {
                    ...query.where,
                    ...where
                };
            }
        }
        query.include.push(getType);

        // sure type
        where = {
            type
        };
        query.where = {
            ...query.where,
            ...where
        };

        // check isBoss
        if (!isBoss) {
            where = {
                ...{
                    '$seasonAndPond->ponds->pondUserRoles.userId$': userId,
                    '$seasonAndPond->ponds->pondUserRoles.pondId$': pondId
                }
            };
            query.where = {
                ...query.where,
                ...where
            };
        }

        // execute
        this.takeCareServices.models.findAll(query).then(res => {
            if (!res.length) {
                response.status(200).json({
                    success: true,
                    message: 'Không tìm thấy hoạt động chăm sóc.',
                    takeCare: res
                });
            } else {
                response.status(200).json({
                    success: true,
                    message: '',
                    takeCare: res
                });
            }
        }).catch(e => {
            response.status(200).json({
                success: false,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
                e
            });
        });
    }

    private test = async (req, response, next) => {
        const { date } = req.headers;
        response.status(200).json({
            'success': true,
            'message': '',
            'parse': DateUtil.parse(date ? date : null).toLocaleDateString() + ' ' + DateUtil.parse(date).toLocaleTimeString(),
            'start-of-date': DateUtil.startOf(new Date(), 'day').toLocaleDateString() + ' ' + DateUtil.startOf(new Date(), 'day').toLocaleTimeString(),
            'end-of-date': DateUtil.endOf(new Date(), 'day').toLocaleDateString() + ' ' + DateUtil.endOf(new Date(), 'day').toLocaleTimeString(),
            'start-of-week': DateUtil.startOf(new Date(), 'week').toLocaleDateString() + ' ' + DateUtil.startOf(new Date(), 'day').toLocaleTimeString(),
            'end-of-week': DateUtil.endOf(new Date(), 'week').toLocaleDateString() + ' ' + DateUtil.endOf(new Date(), 'day').toLocaleTimeString(),
            'start-of-month': DateUtil.startOf(new Date(), 'month').toLocaleDateString() + ' ' + + ' ' + DateUtil.startOf(new Date(), 'month').toLocaleTimeString(),
            'end-of-month': DateUtil.endOf(new Date(), 'month').toLocaleDateString() + ' ' + + ' ' + DateUtil.endOf(new Date(), 'month').toLocaleTimeString(),
            'add-day': DateUtil.add(new Date(), 1, 'day').toLocaleDateString() + ' ' + DateUtil.add(new Date(), 1, 'day').toLocaleTimeString(),
            'add-months': DateUtil.add(new Date(), 1, 'month').toLocaleDateString() + ' ' + DateUtil.add(new Date(), 1, 'month').toLocaleTimeString(),
            'subtract-day': DateUtil.subtract(new Date(), 1, 'day').toLocaleDateString() + ' ' + DateUtil.subtract(new Date(), 1, 'day').toLocaleTimeString(),
            'subtract-months': DateUtil.subtract(new Date(), 1, 'month').toLocaleDateString() + ' ' + DateUtil.subtract(new Date(), 1, 'month').toLocaleTimeString(),
        });
    }
}

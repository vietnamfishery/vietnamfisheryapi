import { Pond } from './../../components/ponds/ponds';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../../services';
import { BaseRoute } from '../BaseRoute';
import * as jwt from 'jsonwebtoken';
import { defaultImage, secret, ActionServer } from '../../common';
import * as uuidv4 from 'uuid/v4';
import { GoogleDrive } from '../../googleAPI/drive.google';

/**
 * @api {get} /ping Ping Request customer object
 * @apiName Ping
 * @apiGroup Ping
 *
 * @apiSuccess {String} type Json Type.
 */
export class PondRoute extends BaseRoute {
    public static path = '/ponds';
    private static instance: PondRoute;
    /**
     * @class PondRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!PondRoute.instance) {
            PondRoute.instance = new PondRoute();
        }
        return PondRoute.instance.router;
    }

    private init() {
        logger.info('[PondRoute] Creating ping route.');
        this.router.get('/gets', this.getPonds);
        // this.router.get('/get/:pondId', this.getPondById);
        this.router.post('/add', this.addPond);
        // this.router.post('/update', this.addPond);
    }

    private async getPonds(request: Request, response: Response, next: NextFunction) {
        const token: string = request.headers.authorization.split('%')[1];
        const action = ActionServer.AUTH;
        const pond = new Pond();
        const decodetoken: any = jwt.verify(token, secret);
        if(decodetoken) {
            const pondResult = await pond.getAll(action, decodetoken.userId).catch(e => {
                if(e) {
                    response.status(200).json({
                        action,
                        success: false,
                        message: 'Đã có lỗi xãy ra, xin vui lòng thử lại!'
                    });
                }
            });
            const endData = [];
            for(const e of pondResult) {
                e[`images`] = await GoogleDrive.delayGetFileById(e.images);
                endData.push(e);
            }
            response.status(200).json({
                action,
                success: true,
                ponds: endData
            });
        } else {
            response.status(200).json({
                action,
                success: false,
                message: 'Bạn không có quyền truy cập!'
            });
        }
    }

    private addPond(request: Request, response: Response, next: NextFunction) {
        const token: string = request.headers.authorization.split('%')[1];
        const decodetoken: any = jwt.verify(token,secret);
        const { pondName, pondCreatedDate, pondArea, pondDepth, createCost, images, pondLatitude, pondLongitude, pondStatus } = request.body;
        const action = ActionServer.INSERT;
        const pond = new Pond();
        pond.setPond(null, uuidv4(), decodetoken.userId, pondName, pondCreatedDate, pondArea, pondDepth, createCost, pondStatus, images || defaultImage.pondImage, pondLatitude, pondLongitude);
        pond.upsert(action).then((res: any) => {
            if(res) {
                response.status(200).json({
                    action,
                    success: true,
                    message: 'Thêm ao thành công!'
                });
            }
        }).catch(e => {
            if(e) {
                response.status(200).json({
                    action,
                    success: false,
                    message: 'Có lỗi xảy ra vui lòng kiểm tra lại!'
                });
            }
        });
    }

    // private getPondById(request: Request, response: Response, next: NextFunction) {
    //     const token: string = request.headers.authorization.split('%')[1];
    //     const decodetoken: any = jwt.verify(token,secret);
    //     const { pondId } = request.params;
    //     const pond = new Pond();
    //     pond.setPondId = pondId;
    //     pond.
    // }
}

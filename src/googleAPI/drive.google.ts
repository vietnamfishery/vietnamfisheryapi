import { google, drive_v3 } from 'googleapis';
import { JWT } from 'google-auth-library';
import { folderDrive, actionUserServices } from '../common';
import { NextFunction, Request, Response } from 'express';
import { CustomStream } from '../lib';
import { colorCli } from '../config';

export class GoogleDrive {
    private static drive: drive_v3.Drive;
    private static key: any;
    private static jwtToken: JWT;
    constructor() {
        GoogleDrive.drive = google.drive('v3');
        GoogleDrive.key = JSON.parse(process.env.GOOGLE_API_KEY);
        GoogleDrive.jwtToken = new google.auth.JWT(GoogleDrive.key.client_email, null, GoogleDrive.key.private_key, ['https://www.googleapis.com/auth/drive'], null);
        GoogleDrive.jwtToken.authorize(err => {
            if (err) {
                console.log(`${ colorCli.RED }Google authorization not accorded: `,err);
                return;
            } else {
                console.log(`${ colorCli.GREEN }Google authorization accorded.${ colorCli.RESET }`);
            }
        });
    }

    public static upload(request: Request, response: Response, next: NextFunction): Promise<any> {
        return new Promise((resolve, reject) => {
            const image: any = request.files.image || request.files.images;
            const requestBody = {
                name: image.name,
                parents: [folderDrive.uploadImageVNF]
            };

            const media = {
                mediaType: image.mimetype,
                body: CustomStream.BufferToStream(image.data as Buffer)
            };

            GoogleDrive.drive.files.create({
                auth: GoogleDrive.jwtToken,
                requestBody,
                media
            }, (err, file) => {
                if (err) {
                    resolve({
                        success: false,
                        message: 'Can not upload files. Please try again later.'
                    });
                } else {
                    resolve({
                        success: true,
                        message: 'Upload file successful!',
                        fileId: file.data.id
                    });
                }
            });
        });
    }

    public static getFile(request: Request, response: Response, next: NextFunction) {
        const options: any = {
            auth: GoogleDrive.jwtToken,
            fileId: request.params.fileId,
            alt: 'media'
        };
        GoogleDrive.drive.files.get(options, {
            responseType: 'arraybuffer'
        }, (err, file: any) => {
            if (err) {
                response.status(200).json({ error: err.toString() });
            }
            if (file) {
                const type = file.headers[`content-type`];
                const prefix = 'data:' + type + ';base64,';
                const base64 = file.data.toString('base64');
                const data = prefix + base64;
                response.status(200).json({ data });
            }
        });
    }

    public static delayGetFileById(fileId: any): Promise<any> {
        const options: any = {
            auth: GoogleDrive.jwtToken,
            fileId,
            alt: 'media'
        };
        return new Promise((resolve, reject) => {
            GoogleDrive.drive.files.get(options, {
                responseType: 'arraybuffer'
            }, (err, file: any) => {
                if (file) {
                    const type = file.headers[`content-type`];
                    const prefix = 'data:' + type + ';base64,';
                    const base64 = file.data.toString('base64');
                    const data = prefix + base64;
                    resolve(data);
                }
            });
        });
    }
}

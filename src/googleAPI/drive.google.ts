import { google, drive_v3 } from 'googleapis';
import { JWT } from 'google-auth-library';
import * as constants from '../common';
import { NextFunction, Request, Response } from 'express';
import { CustomStream } from '../lib';
import { Stream } from 'stream';

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
                console.log(err);
                return;
            } else {
                console.log(`Google authorization accorded.`);
            }
        });
    }

    public static upload(request: Request, response: Response, next: NextFunction) {
        const image: any = request.files.image;
        const requestBody = {
            name: image.name,
            parents: [constants.folderDrive.uploadImageVNF]
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
                response.status(200).json({
                    action: 'upload',
                    success: false,
                    message: 'Can not upload files. Please try again later.'
                });
            }
            response.status(200).json({
                action: 'upload',
                success: true,
                message: 'Upload file successful!',
                fileId: file.data.id
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
            responseType: 'stream'
        }, (err, file: any) => {
            if (err) {
                console.log(err);
                return;
            }
            if(file) {
                response.contentType(file.headers[`content-type`]);
                const data: Stream = file.data;
                data.on('data', (chunk) => {
                    console.log(chunk);
                }).on('end', () => {
                    console.log(`Done!`);
                    response.end();
                }).on('error', err$ => {
                    console.log(`Error: ${err$}`);
                    response.end();
                }).pipe(response);
            }
        });
    }
}

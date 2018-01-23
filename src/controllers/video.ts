import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import VideoService from '../services/video';

/**
 * GET /
 * Video Controller.
 */
export default class VideoController {
    private message: any;
    private images: any;
    private videoService: VideoService;
    private static _instance: VideoController;

    constructor() {
        this.videoService = VideoService.Instance;

        this.message = this.videoService.message.subscribe((data) => {
            console.log('get images', data);
        });
    }

    private getImages() {
        this.images = this.videoService.images.subscribe((data) => {
            console.log('dowloaded images', data);
        });
        this.videoService.startDownload();
    }

    public videoIndex = (req: Request, res: Response, next: NextFunction) => {
        this.getImages();
        res.render('video/player', {
            title: 'Video',
            data: 'Data'
        });
    }

    public videoRender = (req: Request, res: Response) => {
        res.render('video/render', {
            title: 'Render'
        });
    }

    public static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }
}

import { Request, Response, NextFunction } from 'express';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const fs = require('fs');
const request = require('request');
/**
 * Download resources.
 */

export default class VideoService {

    private LOCAL_CONFIG: string = './dist/public/images/downloads';
    public message: BehaviorSubject<string>;
    public images: BehaviorSubject<any>;

    private tasks: any;

    private urls: string;
    private static _instance: VideoService;

    constructor() {
        console.log('INIT VIDEO SERVICE');
        this.message = new BehaviorSubject('init');
        this.images = new BehaviorSubject(undefined);
    }

    public hello() {
        this.message.next('in hello');
        return 'HELLO';
    }

    public startDownload() {
        this.getImages().subscribe({
            // next: (data: any) => this.images.next(data),
            next: (data: any) => data,
            error: (err: any) => console.log(err),
            complete: () => console.log('complete'),
        });
    }

    private getImages() {
        const tasksObservable = Observable.create((observer: any) => {
            this.createBaseFolder(observer);
            this.getResources(observer);
            observer.complete();
        });

        return tasksObservable;
    }

    private createBaseFolder(cb: any) {
        try {
            if (!fs.existsSync(this.LOCAL_CONFIG)) {
                fs.mkdirSync(this.LOCAL_CONFIG, cb.next(true));
            } else {
                console.log(`Directory existent`);
                cb.next(true);
            }
        } catch (err) {
            console.log(`Create Folder Error: ${err}`);
            throw err;
        }
    }

    private getResources(cb: any) {
        try {
            console.log('get resources');
            this.images.next('data for you');
            cb.next(true);
        } catch (err) {
            console.log(`Get Resources Error: ${err}`);
            throw err;
        }
    }

    public static get Instance(): VideoService {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }
}



// var getResources = (data) =>  {
//     _.each(data, (item, index) => {
//         let imgName = item['url'].split('/')[4];
//         download(item['url'], imgName, () => {
//             console.log(`DOWNLOADING IMAGE >>> ${imgName}`);
//             if (index === data.length) {
//                 console.log('DONE');
//                 return true;
//             }
//         });
//     });
//     return true;
// }

// var download = (uri, filename, callback) => {
//     const file = `${LOCAL_CONF.base.path}${filename}`;

//     request.head(uri, (err, res, body) => {
//         let r = request(uri).pipe(fs.createWriteStream(file));
//         r.on('close', callback);
//         r.on('error', error);
//     });
// }

// var error = (message) => {
//     console.log(`Download Error: ${message}`);
// };
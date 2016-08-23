// ?? ошибка Cannot find module
//import * as debounce from '../../../node_modules/lodash.debounce/index.js';
//console.log('debounce', debounce)



// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
// https://github.com/iliakan/ts-course/blob/master/ts-lesson-3/demo-flikr-app/scripts/fetch.ts

/**
 * uri: 'https://api.flickr.com/services/rest/?',
 * queryMethod: 'flickr.photos.search',
 * apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
 */


interface InitRequest {
    method: string;
    mode: string;
    cache: string;
}

interface Request {
    method: string;
    url: string;
}

declare var Request: {
    prototype: Request;
    new(input: string|Request, init?: InitRequest): Request;
}

interface InitResponse {
    status: string;
    statusText: string;
    headers: string;
}
interface ResponseBody {
    blob: Blob;
    FormData: FormData;
    USVString: string;
}

interface Response {
    arrayBuffer: ()=>PromiseLike<ArrayBuffer>;
    blob: ()=>PromiseLike<Blob>;
    json: ()=>PromiseLike<any>;
    text: ()=>PromiseLike<string>;
}

declare var Response: {
    prototype: Response;
    new(input: ResponseBody, init: InitResponse): Response;
};

declare function fetch(input: string|Request): PromiseLike<Response>

type opt = {
    elem: HTMLElement;
    uri: string;
    queryMethod: string;
    apiKey: string;
}

interface IPhoto {
    farm: number;
    id: string;
    isfamily: boolean;
    ispublic: boolean;
    owner: string;
    secret: string;
    server: string;
    title: string;
}

class FlickrApp {
    private elem: HTMLElement;
    private input: HTMLInputElement;
    private searchButton: HTMLButtonElement;
    private imageBox: HTMLDivElement;
    private sortUpButton: HTMLButtonElement;
    private sortDownButton: HTMLButtonElement;
    private uri: string;
    private queryMethod: string;
    private apiKey: string;
    private photos: IPhoto[];

    constructor(opt: opt) {
        this.elem = opt.elem;
        this.uri = opt.uri;
        this.queryMethod = opt.queryMethod;
        this.apiKey = opt.apiKey;
        this.input = <HTMLInputElement>this.elem.querySelector('.flickr-search-input');
        this.imageBox = <HTMLDivElement>this.elem.querySelector('.image-area');
        this.searchButton = <HTMLButtonElement>this.elem.querySelector('.flickr-search-button');
        this.sortUpButton = <HTMLButtonElement>this.elem.querySelector('.flickr-sort-up-button');
        this.sortDownButton = <HTMLButtonElement>this.elem.querySelector('.flickr-sort-down-button');

        this.searchButton.addEventListener('click', _.debounce(() => {
            this.search(this.render.bind(this));
        }, 300, {
            'leading': true,
            'trailing': false
        }));
        this.sortUpButton.addEventListener('click', this.sortPhotos.bind(this, 1));
        this.sortDownButton.addEventListener('click', this.sortPhotos.bind(this, -1));
    }

    private sortPhotos(sortDirection: number): void {
        if (!(this.photos && this.photos.length)) {
            return;
        }

        this.photos.sort((sortDirection === 1) ? this.compareTitle : this.reverseCompareTitle);

        console.log('sort', this.photos,this)
        this.renderHTML(this.photos);
    }

    private compareTitle(photo1: IPhoto, photo2: IPhoto): number {
        if (photo1.title > photo2.title) return 1;
        if (photo1.title < photo2.title) return -1;
    }

    private reverseCompareTitle(photo1: IPhoto, photo2: IPhoto): number {
        if (photo1.title > photo2.title) return -1;
        if (photo1.title < photo2.title) return 1;
    }

    private render(body: any): void {
        this.photos = body.photos.photo;

        this.renderHTML(this.photos);
    }

    private renderHTML(photos: IPhoto[]): void {
        let content = ``;

        for (let photo of photos) {
            console.log('photo', photo)
            content += `<div class="image-box" >
                            <img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" />
                            <p>${photo.title}</p>
                        </div>`;
        }

        this.imageBox.innerHTML = content;
    }

    private search(cb: (body: any)=>any): void {
        if (!this.input.value) return;
        let text = this.input.value;
        this.input.value = '';
        let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
        this.getPhotos(url, cb)
    }

    private getPhotos(input: string|Request, cb: (body: any)=>any): void {
        console.log(input);
        fetch(input).then((response: Response): PromiseLike<any>=>response.json()).then(cb)
    }
}

let elem = <HTMLElement>document.querySelector('.flikr-box');

let flickr = new FlickrApp({
    elem,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
});
import {HttpEventType} from "@angular/common/http";
export const blobFileDownload = (res?: any, name?: string) =>{
    console.log('.>>>REPOSE....', res.headers.getAll('Content-Disposition'))
    // @ts-ignore
    if (res.type === HttpEventType.DownloadProgress) {
        // @ts-ignore
        this.percentDone = Math.round(100 * res.loaded / res.total);
    } else {
        // @ts-ignore
        if (res.type === HttpEventType.Response) {
            // @ts-ignore
            const file = new Blob([res.body], {type: res.headers.get('Content-Type')});
            let downloadURL = window.URL.createObjectURL(file);
            let link = document.createElement('a');
            link.href = downloadURL;
            // @ts-ignore
            link.download = name;
            link.click();
        }
    }
}
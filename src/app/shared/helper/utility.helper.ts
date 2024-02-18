import {ToastrService} from 'ngx-toastr';
import {Inject, Injectable} from "@angular/core";
import { DOCUMENT } from '@angular/common';
import {BrowserDB, Constants} from "../../shared";

@Injectable({
    providedIn: 'root'
})
export class UtilityHelper {
    constructor(
        private toastr: ToastrService,
		private browserDB: BrowserDB,
		private constants: Constants,
        @Inject(DOCUMENT) document: Document
    ) {
    }
    // @ts-ignore
    fileSize = (file:any, size:string) => {
        const type = size.split(' ');
        if (type[1] == 'KB' || type[1] == 'kb') {
            let maxSize = parseInt(type[0]) * 1024; //File size is returned in Bytes
            if (file.files[0].size > maxSize) {
                this.toastr.error(`File size exceeds ${size} `);
                // @ts-ignore
                document.getElementById(file.id).value= null
            }else {
                return true;
            }

        }
        if (type[1] == 'MB' || type[1] == 'mb') {
            const maxMBSize = parseInt(type[0]) * 1024 * 1024; // in MiB
            if (file.files[0].size > maxMBSize) {
                this.toastr.error(`File size exceeds ${size}`);
                // @ts-ignore
                document.getElementById(file.id).value= null
            }else {
                return true;

            }
        }
        if (type[1] == 'GB' || type[1] == 'gb') {

        }
    }

    /**
     * Add two string time values (HH:mm:ss) with javascript
     *
     * Usage:
     *  > addTimes('04:20:10', '21:15:10');
     *  > "25:35:20"
     *  > addTimes('04:35:10', '21:35:10');
     *  > "26:10:20"
     *  > addTimes('30:59', '17:10');
     *  > "48:09:00"
     *  > addTimes('19:30:00', '00:30:00');
     *  > "20:00:00"
     *
     * @param {String} startTime  String time format
     * @param {String} endTime  String time format
     * @returns {String}
     */
     addTimes (startTime: any, endTime: any) {
        let times = [ 0, 0, 0 ]
        let max = times.length

        let a = (startTime || '').split(':')
        let b = (endTime || '').split(':')

        // normalize time values
        for (let i = 0; i < max; i++) {
            a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
            b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
        }

        // store time values
        for (let i = 0; i < max; i++) {
            times[i] = a[i] + b[i]
        }

        let hours = times[0]
        let minutes = times[1]
        let seconds = times[2]

        if (seconds >= 60) {
            let m = (seconds / 60) << 0
            minutes += m
            seconds -= 60 * m
        }

        if (minutes >= 60) {
            let h = (minutes / 60) << 0
            hours += h
            minutes -= 60 * h
        }
        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
    }
		
    chkPagePermission (pageName: any) {
        var userPermissions = this.browserDB.getLocalStorage(this.constants.SET_PERMISSION_RESPONSE);
		//console.log("userPermissions",JSON.stringify(userPermissions));
		var perfound = false;
		for(var i = 0 ; i < userPermissions.length ; i++)
		{
			if(pageName == userPermissions[i].permissionName)
			{
				perfound = true;break;
			}
		}
		perfound=true
        return perfound;
    }
}
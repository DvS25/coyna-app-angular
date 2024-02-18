import {Injectable} from "@angular/core";
import {forkJoin, map, Observable, throwError} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import { HttpServices } from "../http/http.service";
import { Constants } from "../../config/constants";
import { of, combineLatest, from } from 'rxjs'; 
import {tap } from 'rxjs/operators';
import {ajax} from "rxjs/internal/ajax/ajax";

@Injectable()
export class ApiService {

  constructor(
    private constants: Constants,
    private httpServices: HttpServices
  ) {
  }
  headers = new HttpHeaders().set('Version', '1');

  public test1():Observable<any> {
    return this.httpServices.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      // .pipe(retry(1), catchError(this.handleError))
      .pipe(
        // retry(1),
        map(response => response));
   }


   public test2():Observable<any> {
    return this.httpServices.get('https://api.publicapis.org/entries')
      // .pipe(retry(1), catchError(this.handleError))
      .pipe(
        // retry(1),
        map(response => response));
   }

   public test3():Observable<any> {
    return this.httpServices.get('https://api.genderize.io/?name=luc')
      // .pipe(retry(1), catchError(this.handleError))
      .pipe(
        // retry(1),
        map(response => response));
   }


public mock(){

// return this.httpServices.get()
const requests = [of(this.test1),of(this.test2),of(this.test3)]
const handleResponse = (response:any) => {console.log(response)}
combineLatest(requests.map(req => req.pipe(tap(handleResponse)))).subscribe();


    // zip(
    //     this.httpServices.get_1('https://api.publicapis.org/entries'),
    //     this.httpServices.get_1('https://www.boredapi.com/api/activity'),
    //     this.httpServices.get_1('https://api.nationalize.io?name=nathaniel'),
    //     )
    //     // @ts-ignore
    //     .subscribe(([response1, response2, response3]) => {
    //       // @ts-ignore
    //         this.responseArray.push(response1,response2,response3)
    //     console.log(this.responseArray);
    //
    //   })

    forkJoin({
            google: ajax.getJSON('https://api.github.com/users/google'),
            microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
            users: ajax.getJSON('https://api.github.com/users')
        }
    ).subscribe(console.log);

}


}

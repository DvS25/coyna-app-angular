import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpServices } from "../http/http.service";
import { Constants } from "../../config/constants";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(
    private constants: Constants,
    private httpServices: HttpServices
  ) {}

  public getDepartment(): Observable<any> {
    const url = `${this.constants.DEPARTMENT_ENDPOINT}`;
    return this.httpServices.get(url).pipe(map((response) => response));
  }


  public addDepartment(data?: any, isEdit?: boolean, departmentId?: string): Observable<any> {
    if (isEdit) {
      return this.httpServices
        .put(this.constants.DEPARTMENT_ENDPOINT + "/" + departmentId, data)
        .pipe(map((response) => response));
    }
    return this.httpServices
      .post(this.constants.DEPARTMENT_ENDPOINT, data)
      .pipe(map((response) => response));
  }

}

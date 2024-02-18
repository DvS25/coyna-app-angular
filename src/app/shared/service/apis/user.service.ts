import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpServices } from "../http/http.service";
import { Constants } from "../../config/constants";

@Injectable()
export class UserService {
  constructor(
    private constants: Constants,
    private httpServices: HttpServices
  ) { }

  public userLogin(data: Object): Observable<any> {
    return this.httpServices
      .post(this.constants.API_LOGIN_ENDPOINT, data, { observe: "response" })
      .pipe(map((response) => response));
  }

  public userProfile(data: Object): Observable<any> {
    return this.httpServices
      .put(this.constants.UPDATE_PROFILE_ENDPOINT, data)
      .pipe(map((response) => response));
  }

  public userRegister(data: Object): Observable<any> {
    return this.httpServices
      .post(this.constants.API_USER_REGISTER_END_POINT, data)
      .pipe(map((response) => response));
  }
  public tokenVerify(data: Object): Observable<any> {
    return this.httpServices
      .post(this.constants.TOKEN_VERIFY_ENDPOINT, data)
      .pipe(map((response) => response));
  }

  public logOut(): Observable<any> {
    return this.httpServices
      .get(this.constants.LOGOUT_ENDPOINT)
      .pipe(map((response) => response));
    // @ts-ignore
  }

  public allSessionLogout(data: Object): Observable<any> {
    return this.httpServices
      .post(this.constants.SESSION_LOGOUT_ENDPOINT, data)
      .pipe(map((response) => response));
  }

  public forgotPassword(data: Object): Observable<any> {
    return this.httpServices
      .put(this.constants.FORGOT_ENDPOINT, data)
      .pipe(map((response) => response));
  }

  public getlanguage(): Observable<any> {
    return this.httpServices
      .get(this.constants.API_LANGUAGE_ENDPOINT)
      .pipe(map((response) => response));
  }

  public getPermissionListFromUserType(userType: string): Observable<any> {
    const url = `${this.constants.ROLE_ENDPOINT}?user-type=${userType}`;
    return this.httpServices.get(url).pipe(map((response) => response));
  }

  public getUsers(): Observable<any> {
    return this.httpServices
      .get(this.constants.OPERATION_ENDPOINT)
      .pipe(map((response) => response));
  }

  public reInviteUser(data?: any): Observable<any> {
    return this.httpServices
      .post(this.constants.API_USER_RE_INVITE_ENDPOINT, data)
      .pipe(map((response) => response));
  }

  public addUser(data?: any, isEdit?: boolean, id?: string): Observable<any> {
    if (isEdit) {
      return this.httpServices
        .put(this.constants.API_USER_ENDPOINT + "/" + id, data)
        .pipe(map((response) => response));
    }
    return this.httpServices
      .post(this.constants.API_USER_ENDPOINT, data)
      .pipe(map((response) => response));
  }

  public deleteUser(id: String): Observable<any> {
    const url = `${this.constants.API_USER_ENDPOINT}/` + id;
    return this.httpServices.delete(url).pipe(map((response) => response));
  }

  public addCustomRole(data?: any): Observable<any> {
    return this.httpServices
      .post(this.constants.ROLE_ENDPOINT, data)
      .pipe(map((response) => response));
  }

  public getRoles(): Observable<any> {
    return this.httpServices
      .get(this.constants.ROLE_ENDPOINT)
      .pipe(map((response) => response));
  }

  public ResetPassword(data: Object): Observable<any> {
    return this.httpServices
      .put(this.constants.RESET_PASSWORD, data)
      .pipe(map((response) => response));
  }
}

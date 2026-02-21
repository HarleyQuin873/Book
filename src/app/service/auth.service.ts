import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, map, Observable, throwError } from 'rxjs';
//const ApiUrl = 'http://localhost:8888/bookserver/';
//http://localhost:8888/bookServer/auth/index.php
//const ApiUrl = 'http://localhost:8888/bookServer/auth/index.php';
const ApiUrl = 'http://localhost:8888/bookServer/auth/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private headers = new HttpHeaders()

  private options : HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient) { }

  login(datiForm: NgForm) : Observable<string>{
    const body =this.body(datiForm);
    return this.http.post<{ token: string }>(ApiUrl, body, { headers: this.options })// {headers: this.options})
    .pipe(
      map(res => {
        if(res.token){ //res['token']
          this.setSession(res.token); //res['token']
        }
        return res.token; //res['token']
      }),
      catchError(this.errorhandler)
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expired');

    // localStorage.removeItem('token');
  }

  private setSession(jwt: string){ //jwt : jason web token
    let expire : number = new Date().getTime() + 10000; //10 secondi
    localStorage.setItem('token', jwt);
    localStorage.setItem('expired', expire.toString());
  }

  //metodo che accede a questa proprietà expire per verificare
  //  se il token è effettivamente scaduto o no 
  // notExpired():boolean{ //metodo prof
  //   if(localStorage.getItem('expire')){
  //      let expire : number = parseInt(localStorage.getItem('expire'));
  //     return new Date().getTime() < expire;
  //   }
  //   return false;
  // }

  notExpired(): boolean {
  const expire = localStorage.getItem('expire');

  if (expire) {
    const expireNumber = parseInt(expire, 10);
    return Date.now() < expireNumber;
  }

  return false;
}

  // private body(df:NgForm){

  //   let params = new HttpParams()
  //    .set('username', df.value.username)
  //    .set('password', df.value.password);
  // }

  private body(df: NgForm): string {
  return new HttpParams()
    .set('username', df.value.username)
    .set('password', df.value.password)
    .toString(); // Serve per x-www-form-urlencoded
}

  /**GESTION ERRORI  */
 private errorhandler(error: any){
  console.log(error);
  let msg : string = '';
  if(error instanceof HttpErrorResponse){
    if(error.status === 0 ){
      msg = 'Applicazione offline';
    }
    else{
      msg = `Si è verificato un errore: ${error.error.msg} (server status code ${error.status})`;
    }
    return throwError(msg);
  }
  return throwError(`Si è verificato un errore di tipo: ${error.message}`);
  
    // console.error('Errore:', error);
    // return throwError(() => error);
  }
}

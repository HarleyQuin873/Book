// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   // isLoggedIn() {
//   //   throw new Error('Method not implemented.');
//   // }

//   constructor() { }
// }


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}

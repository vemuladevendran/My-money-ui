import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings/settings.service';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { lastValueFrom } from 'rxjs';
import { Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDetails: any;

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private router: Router,
    private token: TokenService,
    private platform: Platform
  ) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }

    
    this.platform.ready().then(() => {
      GoogleAuth.initialize();
    });
  }

  async googleSignIn() {
    this.userDetails = await GoogleAuth.signIn();

    return await this.userDetails;
  }



  // create user 

  userLogin(data: any) {
    const url = `${this.settings.API_BASE_URL}/user/login`;
    return lastValueFrom(this.http.post(url, data));
  }


  isLoggedIn() {
    return this.token.isTokenExist();
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}

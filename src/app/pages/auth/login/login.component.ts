import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Device } from '@capacitor/device';
import { TokenService } from 'src/app/services/token/token.service';
import { PermissionsService } from 'src/app/services/permissions/permissions.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastService } from 'src/app/services/toast/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent {
  userDetails: any;
  constructor(
    private authServe: AuthService,
    private router: Router,
    private tokenServe: TokenService,
    private permissionServe: PermissionsService,
    private loaderServe: LoaderService,
    private toastServe: ToastService,
  ) {}

  // google sign option

  async googleSign(): Promise<void> {
    try {
      this.userDetails = await this.authServe.googleSignIn();
      const info = await Device.getInfo();
      const deviceId = await Device.getId();

      const data = {
        name: this.userDetails.name,
        email: this.userDetails.email,
        idToken: this.userDetails.authentication?.idToken,
        googleImg: this.userDetails.imageUrl,
        loggedInDevices: [
          {
            platform: info.platform,
            operatingSystem: info.operatingSystem,
            deviceId: deviceId.identifier,
          },
        ],
      };
      this.loaderServe.showLoading();
      const res: any = await this.authServe.userLogin(data);
      this.tokenServe.saveToken(res?.token);
      // const contacts = await this.permissionServe.getContacts();
      // console.log(contacts, '==============');
      
      this.router.navigate(['home']);
    } catch (error) {
      console.log(error);
      this.toastServe.presentToast('Fail to login')
    }finally{
      this.loaderServe.hideLoading();
    }
  }
}

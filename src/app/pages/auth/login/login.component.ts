import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    private router: Router
  ) {}

  // google sign option

  async googleSign(): Promise<void> {
    try {
      this.userDetails = await this.authServe.googleSignIn()
      console.log(this.userDetails, 'google details');
      
    } catch (error) {
      console.log(error);
    }
  }

 
}

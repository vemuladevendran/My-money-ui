import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports:[RouterModule, IonApp, IonRouterOutlet, IonicModule],
  standalone: true,
})
export class MainLayoutComponent {
  constructor(private tokenServe: TokenService, private router: Router) {}

  async logOut() {
    await this.tokenServe.removeToken();
    this.router.navigate(['/login']);
  }
}

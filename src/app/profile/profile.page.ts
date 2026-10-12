import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  constructor(
    private router: Router,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  public onHelpClick(): void {
    this.popoverCtrl.dismiss();
    this.router.navigate(['/help']);
  }

  public onLogoutClick(): void {
    this.popoverCtrl.dismiss();

    // Clear any stored session/auth data here, e.g.:
    // localStorage.removeItem('authToken');
    // localStorage.clear();
    // this.authService.clearSession();

    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
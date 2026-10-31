
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Common } from '../common';
import { Api } from '../api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit, OnDestroy {

  private _unsubscribeAll = new Subject<void>();

  phoneNumber = '';
  showError = false;
  isSubmitting = false;

  constructor(
    private router: Router,
    private commonService: Common,
    private apiService: Api
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onPhoneInput(event: any) {
    this.phoneNumber = event.target.value;
    this.showError = false;
  }

  proceedToOtp() {
    const username = this.phoneNumber.trim();

    const isPhone = /^[0-9]{10}$/.test(username);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

    if (!isPhone && !isEmail) {
      this.showError = true;
      return;
    }

    if (this.isSubmitting) return;

    const otpData = {
      username: username,
      user_type: 'member'
    };

    this.isSubmitting = true;
    this.commonService.presentLoading();

    this.apiService.request_otp(otpData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          this.commonService.dismissLoading();

          console.log('OTP API response:', response);

          this.commonService.showToastMessage(
            response?.message || 'OTP sent successfully',
            'toast-success',
            '',
            2000
          );

          this.router.navigate(['/otp-verification'], {
            queryParams: {
              username: response?.username || username,
              user_type: response?.user_type || 'member',
              otp_type: response?.otp_type || (isEmail ? 'email' : 'mobile')
            }
          });
        },
        error: (error: any) => {
          this.isSubmitting = false;
          this.commonService.dismissLoading();

          this.commonService.showToastMessage(
            error?.error?.message ||
            error?.message ||
            'Unable to send OTP. Please try again.',
            'toast-error',
            '',
            4000
          );
        }
      });
  }
}


import {
  Component, ElementRef, QueryList, ViewChildren, OnInit, OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Api } from '../api';
import { Common } from '../common';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.page.html',
  styleUrls: ['./otp-verification.page.scss'],
  standalone: false,
})
export class OtpVerificationPage implements OnInit, OnDestroy {

  @ViewChildren('otp0, otp1, otp2, otp3')
  otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private destroy$ = new Subject<void>();
  private timerInterval: any;

  username = '';
  userType = 'member';
  otpDigits = ['', '', '', ''];
  activeIndex = 0;
  timerSeconds = 59;
  isVerifying = false;
  isResending = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: Api,
    private commonService: Common
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.username = params['username'] || '';
        this.userType = params['user_type'] || 'member';
      });

    if (!this.username) {
      this.router.navigate(['/login']);
      return;
    }

    this.startResendTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
    this.destroy$.next();
    this.destroy$.complete();
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timerSeconds / 60);
    const seconds = this.timerSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString().padStart(2, '0')}`;
  }

  get isComplete(): boolean {
    return this.otpDigits.every(digit => /^[0-9]$/.test(digit));
  }

  startResendTimer() {
    clearInterval(this.timerInterval);
    this.timerSeconds = 59;

    this.timerInterval = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  setActiveIndex(index: number) {
    this.activeIndex = index;
  }

  onInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/[^0-9]/g, '');

    if (!digits) {
      this.otpDigits[index] = '';
      input.value = '';
      this.errorMessage = '';
      return;
    }

    const start = digits.length > 1 ? 0 : index;
    const values = digits.slice(-4).split('');

    values.forEach((digit, i) => {
      if (start + i < 4) {
        this.otpDigits[start + i] = digit;
      }
    });

    this.syncInputs();
    this.errorMessage = '';

    const next = this.otpDigits.findIndex(digit => !digit);
    this.activeIndex = next === -1 ? 3 : next;

    this.otpInputs.toArray()[this.activeIndex]?.nativeElement.focus();
  }

  onKeyDown(index: number, event: KeyboardEvent) {
    if (event.key !== 'Backspace') return;

    event.preventDefault();

    if (this.otpDigits[index]) {
      this.otpDigits[index] = '';
    } else if (index > 0) {
      this.otpDigits[index - 1] = '';
      this.activeIndex = index - 1;
    }

    this.syncInputs();
    this.otpInputs.toArray()[this.activeIndex]?.nativeElement.focus();
    this.errorMessage = '';
  }

  private syncInputs() {
    this.otpInputs.toArray().forEach((input, index) => {
      input.nativeElement.value = this.otpDigits[index];
    });
  }

  appendNumber(num: string) {
    if (!/^[0-9]$/.test(num)) return;

    let index = this.otpDigits.findIndex(digit => !digit);
    if (index === -1) index = this.activeIndex;

    this.otpDigits[index] = num;
    this.syncInputs();
    this.errorMessage = '';

    const next = this.otpDigits.findIndex(digit => !digit);
    this.activeIndex = next === -1 ? 3 : next;

    this.otpInputs.toArray()[this.activeIndex]?.nativeElement.focus();
  }

  deleteNumber() {
    let index = this.activeIndex;

    if (this.otpDigits[index]) {
      this.otpDigits[index] = '';
    } else if (index > 0) {
      index--;
      this.otpDigits[index] = '';
      this.activeIndex = index;
    }

    this.syncInputs();
    this.otpInputs.toArray()[this.activeIndex]?.nativeElement.focus();
    this.errorMessage = '';
  }

  verifyOtp() {
    if (!this.isComplete || this.isVerifying) return;

    const payload = {
      username: this.username,
      code: this.otpDigits.join(''),
      user_type: this.userType,
      device_type: 'mobile',
      fcm_token: ''
    };

    this.isVerifying = true;
    this.errorMessage = '';
    this.commonService.presentLoading();

    this.apiService.verify_otp(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.isVerifying = false;
          this.commonService.dismissLoading();

          if (!response?.tokens) {
            this.errorMessage =
              response?.message || 'OTP verification failed.';
            return;
          }

          localStorage.setItem('tokens', response.tokens);
          localStorage.setItem(
            'currentUser',
            JSON.stringify(response.user)
          );
          localStorage.setItem(
            'user_type',
            response.user_type || this.userType
          );

          this.commonService.showToastMessage(
            response.message || 'Login successful',
            'toast-success',
            '',
            2000
          );

          this.router.navigate(['/basic-info']);
        },
        error: (error: any) => {
          this.isVerifying = false;
          this.commonService.dismissLoading();

          this.errorMessage =
            typeof error === 'string'
              ? error
              : error?.error?.message ||
                error?.message ||
                'Invalid OTP. Please try again.';

          this.commonService.showToastMessage(
            this.errorMessage,
            'toast-error',
            '',
            3000
          );
        }
      });
  }

  resendCode() {
    if (this.timerSeconds > 0 || this.isResending) return;

    this.isResending = true;
    this.commonService.presentLoading();

    this.apiService.request_otp({
      username: this.username,
      user_type: this.userType
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.isResending = false;
          this.commonService.dismissLoading();

          this.otpDigits = ['', '', '', ''];
          this.syncInputs();
          this.activeIndex = 0;
          this.otpInputs.first?.nativeElement.focus();
          this.startResendTimer();

          this.commonService.showToastMessage(
            response?.message || 'OTP sent successfully',
            'toast-success',
            '',
            2000
          );
        },
        error: (error: any) => {
          this.isResending = false;
          this.commonService.dismissLoading();

          this.commonService.showToastMessage(
            typeof error === 'string'
              ? error
              : error?.error?.message || 'Unable to resend OTP.',
            'toast-error',
            '',
            3000
          );
        }
      });
  }
}

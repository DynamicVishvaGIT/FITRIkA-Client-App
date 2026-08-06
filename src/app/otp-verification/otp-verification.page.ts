import { Component, ElementRef, QueryList, ViewChildren, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.page.html',
  styleUrls: ['./otp-verification.page.scss'],
  standalone: false,
})
export class OtpVerificationPage implements OnInit, OnDestroy {
  @ViewChildren('otp0, otp1, otp2, otp3') otpInputs!: QueryList<ElementRef>;

  otpDigits: string[] = ['', '', '', ''];
  activeIndex: number = 0;
  timerSeconds: number = 59;
  timerInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startResendTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startResendTimer() {
    this.timerSeconds = 59;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  get formattedTime(): string {
    const minutes: number = Math.floor(this.timerSeconds / 60);
    const seconds: number = this.timerSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  setActiveIndex(index: number) {
    this.activeIndex = index;
  }

  onInput(index: number, event: any) {
    const value: string = event.target.value;
    const cleanValue: string = value.replace(/[^0-9]/g, '').slice(-1);
    
    this.otpDigits[index] = cleanValue;
    event.target.value = cleanValue;

    if (cleanValue && index < 3) {
      this.activeIndex = index + 1;
      const inputsArray = this.otpInputs.toArray();
      if (inputsArray[this.activeIndex]) {
        inputsArray[this.activeIndex].nativeElement.focus();
      }
    }
  }

  onKeyDown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (this.otpDigits[index]) {
        this.otpDigits[index] = '';
      } else if (index > 0) {
        this.activeIndex = index - 1;
        const inputsArray = this.otpInputs.toArray();
        if (inputsArray[this.activeIndex]) {
          inputsArray[this.activeIndex].nativeElement.focus();
        }
        this.otpDigits[this.activeIndex] = '';
      }
    }
  }

  appendNumber(num: string) {
    if (this.activeIndex < 4) {
      this.otpDigits[this.activeIndex] = num;
      const inputsArray = this.otpInputs.toArray();
      if (inputsArray[this.activeIndex]) {
        inputsArray[this.activeIndex].nativeElement.value = num;
      }
      
      if (this.activeIndex < 3) {
        this.activeIndex++;
        if (inputsArray[this.activeIndex]) {
          inputsArray[this.activeIndex].nativeElement.focus();
        }
      }
    }
  }

  deleteNumber() {
    if (this.activeIndex >= 0) {
      if (this.otpDigits[this.activeIndex]) {
        this.otpDigits[this.activeIndex] = '';
        const inputsArray = this.otpInputs.toArray();
        if (inputsArray[this.activeIndex]) {
          inputsArray[this.activeIndex].nativeElement.value = '';
        }
      } else if (this.activeIndex > 0) {
        this.activeIndex--;
        this.otpDigits[this.activeIndex] = '';
        const inputsArray = this.otpInputs.toArray();
        if (inputsArray[this.activeIndex]) {
          inputsArray[this.activeIndex].nativeElement.value = '';
          inputsArray[this.activeIndex].nativeElement.focus();
        }
      }
    }
  }

  get isComplete(): boolean {
    return this.otpDigits.every((digit: string) => digit.length === 1);
  }

  verifyOtp() {
    if (this.isComplete) {
      const fullCode: string = this.otpDigits.join('');
      this.router.navigate(['/basic-info']);
    }
  }

  resendCode() {
    this.startResendTimer();
  }
}
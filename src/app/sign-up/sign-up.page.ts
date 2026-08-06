import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage implements OnInit {

  fullName: string = '';
  email: string = '';
  phone: string = '';
  acceptedTerms = false;

  showPhoneError = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  // Allow only numbers and maximum 10 digits
  onPhoneInput(event: any) {

    let value = event.target.value;

    // Remove non-numeric characters
    value = value.replace(/[^0-9]/g, '');

    // Maximum 10 digits
    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    this.phone = value;

    // Hide error while typing
    this.showPhoneError = false;
  }

  get isFormValid(): boolean {

    const phoneRegex = /^[0-9]{10}$/;

    return (
      this.fullName.trim().length > 0 &&
      this.email.trim().length > 0 &&
      phoneRegex.test(this.phone) &&
      this.acceptedTerms
    );
  }

  sendOtpAction() {

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(this.phone)) {
      this.showPhoneError = true;
      return;
    }

    localStorage.setItem('userFullName', this.fullName);
    localStorage.setItem('userEmail', this.email);
    localStorage.setItem('userPhone', this.phone);

    this.router.navigate(['/otp-verification']);
  }

}
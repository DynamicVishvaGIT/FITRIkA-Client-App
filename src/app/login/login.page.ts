import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage implements OnInit {

phoneNumber: string = '';
  showError: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  // Allow only numbers and maximum 10 digits
  onPhoneInput(event: any) {

    let value = event.target.value;

    // Remove all non-numeric characters
    value = value.replace(/[^0-9]/g, '');

    // Limit to 10 digits
    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    this.phoneNumber = value;

    // Hide error while typing
    this.showError = false;
  }

  proceedToOtp() {

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(this.phoneNumber)) {
      this.showError = true;
      return;
    }

    this.showError = false;

    // Navigate when valid
    this.router.navigate(['/sign-up']);
  }

}

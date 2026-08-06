import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.page.html',
  styleUrls: ['./basic-info.page.scss'],
  standalone: false,
})
export class BasicInfoPage implements OnInit {

  // ----------------------------
  // Step Progress
  // ----------------------------

  progress = 66;

  // ----------------------------
  // Form Data (Initialized as empty/null)
  // ----------------------------

  selectedGender: string = '';
  age: number | null = null;
  weight: number | null = null;
  height: number | null = null;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    // Left intentionally blank so fields start completely empty
  }

  // ----------------------------
  // Gender Selection
  // ----------------------------

  selectGender(gender: string): void {
    this.selectedGender = gender;
  }

  // ----------------------------
  // Validation
  // ----------------------------

  isFormValid(): boolean {
    return (
      this.selectedGender !== '' &&
      this.age !== null &&
      this.weight !== null &&
      this.height !== null &&
      this.age > 0 &&
      this.weight > 0 &&
      this.height > 0
    );
  }

  // ----------------------------
  // Continue Button
  // ----------------------------

  proceedToGoals(): void {
    if (!this.isFormValid()) {
      alert('Please complete all fields.');
      return;
    }

    const body = {
      gender: this.selectedGender,
      age: this.age,
      weight: this.weight,
      height: this.height
    };

    // Save locally on submit
    localStorage.setItem(
      'basicInfo',
      JSON.stringify(body)
    );

    // Navigate
    this.router.navigate(['/main-goal']);
  }

  // ----------------------------
  // Back Button
  // ----------------------------

  goBack(): void {
    this.router.navigate(['/sign-up']);
  }

}
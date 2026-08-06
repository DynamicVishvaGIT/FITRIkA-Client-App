import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-goal',
  templateUrl: './your-goal.page.html',
  styleUrls: ['./your-goal.page.scss'],
  standalone: false,
})
export class YourGoalPage implements OnInit {

  selectedOption: string = ''; // Starts completely empty

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  isFormValid(): boolean {
    return this.selectedOption !== '';
  }

  completeOnboarding(): void {
    if (!this.isFormValid()) {
      alert('Please make a selection.');
      return;
    }
    
    // Save selection to local storage
    localStorage.setItem('trainerPreference', this.selectedOption);

    // Conditional Routing based on selected card option
    if (this.selectedOption === 'have-trainer') {
      this.router.navigate(['/dashboard']);
    } else if (this.selectedOption === 'find-trainer') {
      this.router.navigate(['/find-your-trainer']);
    }
  }

  goBack() {
    this.router.navigate(['/main-goal']);
  }

}
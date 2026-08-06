import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-goal',
  templateUrl: './main-goal.page.html',
  styleUrls: ['./main-goal.page.scss'],
  standalone: false,
})
export class MainGoalPage implements OnInit {
  selectedGoal: string = ''; // Starts completely empty

  constructor(private router: Router) {}

  ngOnInit() {
    // Left intentionally blank so fields start completely empty
  }

  selectGoal(goal: string) {
    this.selectedGoal = goal;
  }

  isFormValid(): boolean {
    return this.selectedGoal !== '';
  }

  proceedToTrainerSelection() {
    if (!this.isFormValid()) {
      alert('Please select a goal.');
      return;
    }
    localStorage.setItem('mainGoal', this.selectedGoal);
    this.router.navigate(['/current-fitness']);
  }

  goBack() {
    this.router.navigate(['/basic-info']);
  }
}
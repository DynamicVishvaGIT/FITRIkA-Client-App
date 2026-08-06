import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diet-preference',
  templateUrl: './diet-preference.page.html',
  styleUrls: ['./diet-preference.page.scss'],
  standalone: false,
})
export class DietPreferencePage implements OnInit {
  selectedDiet: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  selectDiet(diet: string) {
    this.selectedDiet = diet;
  }

  goBack() {
    this.router.navigate(['/current-fitness']);
  }

  goToFindTrainer() {
    this.router.navigate(['/your-goal'], {
      queryParams: { diet: this.selectedDiet }
    });
  }
}
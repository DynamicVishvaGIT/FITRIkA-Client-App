import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-fitness',
  templateUrl: './current-fitness.page.html',
  styleUrls: ['./current-fitness.page.scss'],
  standalone: false,
})
export class CurrentFitnessPage implements OnInit {
  selectedFitness: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  selectFitness(level: string) {
    this.selectedFitness = level;
  }

  goBack() {
    this.router.navigate(['/main-goal']);
  }

  goToDietPreference() {
    this.router.navigate(['/diet-preference'], {
      queryParams: { fitness: this.selectedFitness }
    });
  }
}
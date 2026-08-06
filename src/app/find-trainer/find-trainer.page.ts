import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-trainer',
  templateUrl: './find-trainer.page.html',
  styleUrls: ['./find-trainer.page.scss'],
  standalone: false,
})
export class FindTrainerPage implements OnInit {
  
  // Track the currently selected option, starting as empty/null
  selectedOptionType: string | null = null;

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/coaches']);
  }

  selectOption(type: string): void {
    // 1. Set the selection state first
    this.selectedOptionType = type;

    // 2. Perform the navigation based on the clicked option
    if (type === 'expert' || type === 'accountability') {
      this.router.navigate(['/add-coaches'], { queryParams: { type } });
    } else if (type === 'programs') {
      this.router.navigate(['/programs']);
    }
  }

  navigateTo(route: string): void {
    this.router.navigate(['/add-coaches']);
  }

  ngOnInit() {
    // Reset selection when the page loads
    this.selectedOptionType = null;
  }
}
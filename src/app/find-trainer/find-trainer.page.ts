import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-trainer',
  templateUrl: './find-trainer.page.html',
  styleUrls: ['./find-trainer.page.scss'],
  standalone: false,
})
export class FindTrainerPage implements OnInit {

  selectedOptionType: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // No option selected initially
    this.selectedOptionType = null;
  }

  goBack(): void {
    this.router.navigate(['/coaches']);
  }

  selectOption(type: string): void {

    // Highlight selected option
    this.selectedOptionType = type;

    // Navigate
    if (type === 'expert' || type === 'accountability') {
      this.router.navigate(['/add-coaches'], {
        queryParams: { type }
      });
    } else if (type === 'programs') {
      this.router.navigate(['/programs']);
    }
  }

  navigateTo(route: string): void {
    this.router.navigate(['/' + route]);
  }

}
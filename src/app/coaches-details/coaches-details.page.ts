import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coaches-details',
  templateUrl: './coaches-details.page.html',
  styleUrls: ['./coaches-details.page.scss'],
  standalone: false
})
export class CoachesDetailsPage implements OnInit {
  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['/programs']);
  }

  subscribe() {
    alert('Subscribed successfully via Coach profile!');
    this.router.navigate(['/programs']);
  }
}
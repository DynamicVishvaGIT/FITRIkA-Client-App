import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.page.html',
  styleUrls: ['./coaches.page.scss'],
  standalone: false,
})
export class CoachesPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  openMenu() {
    console.log('Menu opened');
  }

  addCoach() {
    this.router.navigate(['/find-trainer']);
  }

  switchTab(tab: string) {
    if (tab === 'task') {
      this.router.navigate(['/dashboard']);
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-detail-screen',
  templateUrl: './task-detail-screen.page.html',
  styleUrls: ['./task-detail-screen.page.scss'],
  standalone: false
})
export class TaskDetailScreenPage implements OnInit {

  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

 weight = 40;
  reps = 12;
  isVsLastActive = false;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  toggleVsLast() {
    this.isVsLastActive = !this.isVsLastActive;
  }

  incrementWeight() {
    this.weight += 1;
  }

  decrementWeight() {
    if (this.weight > 0) {
      this.weight -= 1;
    }
  }

  incrementReps() {
    this.reps += 1;
  }

  decrementReps() {
    if (this.reps > 0) {
      this.reps -= 1;
    }
  }

  navigateTo(route: string) {
    switch (route) {
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'task':
        this.router.navigate(['/task-detail']);
        break;
      case 'coaches':
        this.router.navigate(['/coaches']);
        break;
      case 'profile':
        this.router.navigate(['/profile']);
        break;
    }
  }
}


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-detail-screen',
  templateUrl: './task-detail-screen.page.html',
  styleUrls: ['./task-detail-screen.page.scss'],
  standalone: false
})
export class TaskDetailScreenPage implements OnInit, OnDestroy {

  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

  weight = 40;
  reps = 12;
  isVsLastActive = false;

  // Timer properties
  timerSeconds = 0;
  timerInterval: any = null;
  isTimerRunning = false;
  timerDisplay = '00:00';

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer() {
    if (!this.isTimerRunning) {
      this.isTimerRunning = true;
      this.timerInterval = setInterval(() => {
        this.timerSeconds++;
        this.updateTimerDisplay();
      }, 1000);
    }
  }

  pauseTimer() {
    this.isTimerRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  stopTimer() {
    this.pauseTimer();
  }

  resetTimer() {
    this.pauseTimer();
    this.timerSeconds = 0;
    this.updateTimerDisplay();
  }

  toggleTimer() {
    if (this.isTimerRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timerSeconds / 60);
    const seconds = this.timerSeconds % 60;
    const minStr = minutes < 10 ? '0' + minutes : '' + minutes;
    const secStr = seconds < 10 ? '0' + seconds : '' + seconds;
    this.timerDisplay = `${minStr}:${secStr}`;
  }

  goBack() {
    this.stopTimer();
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
    this.stopTimer();
    switch (route) {
      case 'home':
      case 'dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'task':
        this.router.navigate(['/task']);
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
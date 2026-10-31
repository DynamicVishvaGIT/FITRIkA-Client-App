import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController, ToastController } from '@ionic/angular';

interface SetEntry {
  weight: number;
  reps: number;
}

interface PreviewExercise {
  name: string;
  top: string;
}

interface SetChip {
  text: string;
  kind: 'up' | 'down' | 'same' | 'neutral';
}

@Component({
  selector: 'app-task-detail-screen',
  templateUrl: './task-detail-screen.page.html',
  styleUrls: ['./task-detail-screen.page.scss'],
  standalone: false
})
export class TaskDetailScreenPage implements OnInit, OnDestroy {

  // Counters
  weight = 40;
  reps = 12;
  readonly weightStep = 2.5;
  readonly ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // View state: false = log view, true = today vs last week compare view
  isVsLastActive = false;

  // Edit mode for the preview cards (remove exercises)
  editMode = false;

  // Currently edited set (null = logging a new set)
  editingIndex: number | null = null;

  currentSet = 1;
  totalExercises = 4;

  previewExercises: PreviewExercise[] = [
    { name: 'Leg press', top: '140 × 10' },
    { name: 'Leg extension', top: '55 × 10' }
  ];

  todaySets: SetEntry[] = [
    { weight: 47.5, reps: 13 },
    { weight: 52.5, reps: 15 },
    { weight: 55, reps: 15 },
    { weight: 57.5, reps: 15 }
  ];

  lastWeekSets: SetEntry[] = [
    { weight: 40, reps: 12 },
    { weight: 40, reps: 11 },
    { weight: 35, reps: 12 }
  ];

  // Timer
  timerSeconds = 38 * 60 + 42; // session already running at 38:42
  timerInterval: any = null;
  isTimerRunning = false;
  timerDisplay = '38:42';

  constructor(
    private router: Router,
    private location: Location,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.updateTimerDisplay();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  /* ---------------- Derived values ---------------- */

  get loggedCount(): number {
    return this.previewExercises.length;
  }

  get currentTop(): string {
    if (!this.todaySets.length) {
      return '— × —';
    }
    const best = this.todaySets.reduce((a, b) => (b.weight >= a.weight ? b : a));
    return `${best.weight} × ${best.reps}`;
  }

  get compareRows(): number[] {
    const count = Math.max(6, this.todaySets.length, this.lastWeekSets.length);
    return Array.from({ length: count }, (_, i) => i);
  }

  getChip(index: number): SetChip {
    const last = this.lastWeekSets[index];
    const today = this.todaySets[index];

    if (!last) {
      return { text: 'Target match', kind: 'neutral' };
    }

    const wd = Math.round((today.weight - last.weight) * 10) / 10;
    const rd = today.reps - last.reps;

    const parts: string[] = [];
    if (wd !== 0) {
      parts.push(`${wd > 0 ? '+' : ''}${wd}kg`);
    }
    if (rd !== 0) {
      parts.push(`${Math.abs(rd)}r`);
    }

    if (!parts.length) {
      return { text: 'Same', kind: 'same' };
    }

    const kind = wd > 0 || (wd === 0 && rd > 0) ? 'up' : 'down';
    return { text: parts.join(' '), kind };
  }

  /* ---------------- Timer ---------------- */

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
      this.timerInterval = null;
    }
  }

  stopTimer() {
    this.pauseTimer();
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timerSeconds / 60);
    const seconds = this.timerSeconds % 60;
    const minStr = minutes < 10 ? '0' + minutes : '' + minutes;
    const secStr = seconds < 10 ? '0' + seconds : '' + seconds;
    this.timerDisplay = `${minStr}:${secStr}`;
  }

  /* ---------------- Navigation ---------------- */

  goBack() {
    this.stopTimer();
    this.location.back();
  }

  async finishWorkout() {
    this.stopTimer();
    const toast = await this.toastCtrl.create({
      message: `Workout finished • ${this.timerDisplay}`,
      duration: 1800,
      position: 'top',
      color: 'success'
    });
    await toast.present();
    this.router.navigate(['/task']);
  }

  /* ---------------- View toggle ---------------- */

  toggleVsLast() {
    this.isVsLastActive = !this.isVsLastActive;
  }

  /* ---------------- Counters ---------------- */

  incrementWeight() {
    this.weight = Math.round((this.weight + this.weightStep) * 10) / 10;
  }

  decrementWeight() {
    if (this.weight > 0) {
      this.weight = Math.max(0, Math.round((this.weight - this.weightStep) * 10) / 10);
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

  /* ---------------- Sets ---------------- */

  logSet() {
    if (this.editingIndex !== null) {
      // update an existing set, stay on the log view
      this.todaySets[this.editingIndex] = { weight: this.weight, reps: this.reps };
      this.editingIndex = null;
      return;
    }

    this.todaySets.push({ weight: this.weight, reps: this.reps });
    this.currentSet++;

    // after logging, show today vs last week
    this.isVsLastActive = true;
  }

  editSet(index: number) {
    const set = this.todaySets[index];
    this.weight = set.weight;
    this.reps = set.reps;
    this.editingIndex = index;
  }

  /* ---------------- Preview exercises ---------------- */

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  removeExercise(index: number) {
    this.previewExercises.splice(index, 1);
    if (this.totalExercises > 1) {
      this.totalExercises--;
    }
  }

  async addExercise() {
    const alert = await this.alertCtrl.create({
      header: 'Add exercise',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Exercise name (e.g. Calf raise)' },
        { name: 'top', type: 'text', placeholder: 'Top set (e.g. 60 × 10)' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data: any) => {
            const name = (data.name || '').trim();
            if (!name) {
              return false;
            }
            this.previewExercises.push({ name, top: (data.top || '— × —').trim() });
            this.totalExercises++;
            return true;
          }
        }
      ]
    });
    await alert.present();
  }
}
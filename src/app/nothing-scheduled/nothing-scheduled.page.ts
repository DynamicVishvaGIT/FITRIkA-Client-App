import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface WorkoutTemplate {
  id: number;
  name: string;
  focus: string;
  lastUsed: string;
  duration: number;
  exercises: string[];
}

type SheetType = 'exercise' | 'template' | null;

@Component({
  selector: 'app-nothing-scheduled',
  templateUrl: './nothing-scheduled.page.html',
  styleUrls: ['./nothing-scheduled.page.scss'],
  standalone: false,
})
export class NothingScheduledPage {
  activeSheet: SheetType = null;
  selectedAction: 'exercise' | 'template' = 'exercise'; // Pick Exercise is active by default

  // ---------- Pick first exercise ----------
  exerciseSearch = '';
  recentExercises: string[] = ['Back Squat', 'Leg Press', 'Leg Curl', 'Leg Extension', 'Leg Curl'];
  filteredExercises: string[] = [...this.recentExercises];
  selectedIndex: number | null = 0; // "Back Squat" is selected by default, like the design

  // ---------- Load a Template ----------
  templates: WorkoutTemplate[] = [
    {
      id: 1,
      name: 'Leg day A',
      focus: 'Squat focus',
      lastUsed: 'last used 7 days ago',
      duration: 50,
      exercises: ['Back squat', 'Leg press', 'Leg extension', 'Leg curl']
    }
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  // ---------- Sheets ----------
  openSheet(type: SheetType) {
    if (type) {
      this.selectedAction = type; // remembers the active button, even after the sheet closes
    }
    this.activeSheet = type;
  }

  closeSheet() {
    this.activeSheet = null;
  }

  // ---------- Exercise sheet ----------
  filterExercises() {
    const q = this.exerciseSearch.trim().toLowerCase();
    this.filteredExercises = this.recentExercises.filter(e => e.toLowerCase().includes(q));
    this.selectedIndex = null;
  }

  selectExercise(index: number) {
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }

  applyExercise() {
    if (this.selectedIndex === null) {
      return;
    }
    const exercise = this.filteredExercises[this.selectedIndex];
    this.closeSheet();
    // TODO: navigate to your workout logging screen with the chosen exercise
    // this.router.navigate(['/log-workout'], { queryParams: { exercise } });
    console.log('Selected exercise:', exercise);
  }

  // ---------- Template sheet ----------
  previewTemplate(tpl: WorkoutTemplate) {
    // TODO: open routine preview
    console.log('Preview template:', tpl.name);
  }

  startWorkout(tpl: WorkoutTemplate) {
    this.closeSheet();
    // TODO: navigate to your workout logging screen with the chosen template
    // this.router.navigate(['/log-workout'], { queryParams: { template_id: tpl.id } });
    console.log('Start workout:', tpl.name);
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HowDidYouPage } from '../how-did-you/how-did-you.page';

// Change these if your routes are named differently
const ROUTES = {
  taskDetail: '/task-detail-screen',
  nothingScheduled: '/nothing-scheduled',
  dashboard: '/dashboard'
};

interface SheetOption {
  key: string;
  label: string;
  icon: 'check' | 'edit' | 'ban' | 'play';
}

@Component({
  selector: 'app-how-did',
  templateUrl: './how-did.page.html',
  styleUrls: ['./how-did.page.scss'],
  standalone: false
})
export class HowDidPage implements OnInit {

  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

  selectedOption: string = '';
  isWorkout: boolean = false;
  private isBusy = false;

  // 'food' | 'workout' decides which sheet is shown
  @Input() mealData: any = {
    title: 'Brown rice + chicken + salad',
    calories: '620 kcal',
    modalTitle: 'How did lunch go?',
    type: 'food'
  };

  private readonly foodOptions: SheetOption[] = [
    { key: 'planned', label: 'Ate as planned', icon: 'check' },
    { key: 'else', label: 'Ate something else', icon: 'edit' },
    { key: 'skipped', label: 'Skipped the meal', icon: 'ban' }
  ];

  private readonly workoutOptions: SheetOption[] = [
    { key: 'start', label: 'Start Workout', icon: 'play' },
    { key: 'else', label: 'Done something else', icon: 'edit' },
    { key: 'skipped', label: 'Skipped the Workout', icon: 'ban' }
  ];

  options: SheetOption[] = this.foodOptions;

  constructor(private router: Router, private modalController: ModalController) {}

  ngOnInit() {
    this.processMealData(this.mealData || {});
  }

  processMealData(passedData: any) {
    this.isWorkout = passedData.type === 'workout';
    this.options = this.isWorkout ? this.workoutOptions : this.foodOptions;

    let header = passedData.modalTitle;
    if (!header) {
      const t = (passedData.title || '').toLowerCase();
      if (this.isWorkout) {
        header = 'How did your workout go?';
      } else if (t.includes('breakfast')) {
        header = 'How did breakfast go?';
      } else if (t.includes('dinner') || t.includes('supper')) {
        header = 'How did dinner go?';
      } else {
        header = 'How did lunch go?';
      }
    }

    this.mealData = {
      ...passedData,
      title: passedData.title || this.mealData.title,
      calories: passedData.calories || this.mealData.calories,
      modalTitle: header
    };
  }

  /** Tap an option: highlight it, then continue automatically */
  selectOption(option: string) {
    if (this.isBusy) {
      return;
    }
    this.isBusy = true;
    this.selectedOption = option;

    setTimeout(async () => {
      await this.proceedNext();
      this.isBusy = false;
    }, 280);
  }

  dismissModal() {
    this.modalController.dismiss({ dismissed: true });
  }

  async proceedNext() {
    if (this.isWorkout) {
      await this.handleWorkoutOption();
    } else {
      await this.handleFoodOption();
    }
  }

  /* ---------------- FOOD ---------------- */

  private async handleFoodOption() {
    if (this.selectedOption === 'else') {
      const modal = await this.modalController.create({
        component: HowDidYouPage,
        cssClass: 'oval-bottom-modal',
        componentProps: { mealData: this.mealData },
        backdropDismiss: true,
        breakpoints: [0, this.sheetBreakpoint(620)],
        initialBreakpoint: this.sheetBreakpoint(620),
        handle: false
      });

      await modal.present();

      const { data } = await modal.onDidDismiss();
      if (data && (data.status === 'swapped' || data.swappedMeal || data.status)) {
        this.modalController.dismiss({ ...data, taskId: this.mealData.taskId });
      } else {
        // closed without logging: let the user pick again
        this.selectedOption = '';
      }
    } else {
      // 'planned' | 'skipped'
      this.modalController.dismiss({ status: this.selectedOption, taskId: this.mealData.taskId });
    }
  }

  /* ---------------- WORKOUT ---------------- */

  private async handleWorkoutOption() {
    const taskId = this.mealData.taskId;

    switch (this.selectedOption) {
      case 'start':
        // Start Workout -> Task Detail Screen
        await this.modalController.dismiss({ status: 'workout-start', taskId });
        this.router.navigate([ROUTES.taskDetail], {
          queryParams: { taskId },
          state: { task: this.mealData }
        });
        break;

      case 'else':
        // Done something else -> "Nothing scheduled today" screen
        await this.modalController.dismiss({ status: 'workout-else', taskId });
        this.router.navigate([ROUTES.nothingScheduled]);
        break;

      case 'skipped':
        // Skipped the Workout -> back to the dashboard
        await this.modalController.dismiss({ status: 'skipped', taskId });
        this.router.navigate([ROUTES.dashboard], {
          queryParams: { status: 'skipped', taskId }
        });
        break;
    }
  }

  /** sheet height = content height, whatever the phone size is */
  private sheetBreakpoint(contentPx: number): number {
    const h = window.innerHeight || 800;
    return Math.min(0.95, Math.max(0.35, contentPx / h));
  }

  closeSheet() {
    this.modalController.dismiss();
  }
}

export { HowDidPage as HowDidComponent };
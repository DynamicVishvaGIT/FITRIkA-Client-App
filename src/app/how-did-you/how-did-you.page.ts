import { Component, Input,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-how-did-you',
  templateUrl: './how-did-you.page.html',
  styleUrls: ['./how-did-you.page.scss'],
  standalone: false
})
export class HowDidYouPage implements OnInit {

  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

     @Input() currentMeal: any;
  swappedMealName = 'Pizza - 2 slices pepperoni';
  swappedMealCalories = 'Rough calories: ~580 kcal';
  mealNote = '';

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {}

  closeSheet() {
    this.modalController.dismiss();
  }

  editMealDetails() {
    const newName = prompt('Edit swapped meal name:', this.swappedMealName);
    if (newName) {
      this.swappedMealName = newName;
    }
  }

  logSwap() {
    // Dismisses modal and notifies dashboard that the meal swap is logged and completed
    this.modalController.dismiss({ logged: true, updated: true });
  }
}

export { HowDidYouPage as HowDidYouComponent };
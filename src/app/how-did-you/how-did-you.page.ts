import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  @Input() mealData: any = {
    title: 'Brown rice + chicken + salad',
    calories: '620 kcal'
  };

  mealOptions = [
    { name: 'Pizza - 2 slices pepperoni', calories: '580 kcal' },
    { name: 'Chicken Burger & Fries', calories: '750 kcal' },
    { name: 'Grilled Salmon with Quinoa', calories: '520 kcal' },
    { name: 'Paneer Wrap & Green Chutney', calories: '480 kcal' },
    { name: 'Avocado Toast with Eggs', calories: '410 kcal' }
  ];

  selectedAlternativeMeal: string = 'Pizza - 2 slices pepperoni';
  selectedCalories: string = '580 kcal';
  swapNote: string = '';
  isEditing: boolean = false;

  constructor(private router: Router, private modalController: ModalController) {}

  ngOnInit() {}

  onDropdownChange(event: any) {
    const val = event.detail.value;
    const match = this.mealOptions.find(m => m.name === val);
    if (match) {
      this.selectedAlternativeMeal = match.name;
      this.selectedCalories = match.calories;
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  logSwap() {
    this.modalController.dismiss({
      status: 'swapped',
      swappedMeal: this.selectedAlternativeMeal,
      calories: this.selectedCalories,
      note: this.swapNote
    });

    this.router.navigate(['/dashboard'], {
      queryParams: { 
        swappedMeal: this.selectedAlternativeMeal,
        calories: this.selectedCalories,
        note: this.swapNote,
        status: 'swapped' 
      }
    });
  }
}
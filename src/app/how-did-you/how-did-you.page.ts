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

  // Placeholder text of the search box (as in the design)
  inputPlaceholder: string = 'john@example.com';

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

  // Ate less / ate more
  portion: 'less' | 'more' | null = null;

  // Search box + suggestions
  searchText: string = '';
  isDropdownOpen: boolean = false;

  // Inline edit (pencil)
  isEditing: boolean = false;
  editName: string = '';

  // remembers the last chosen alternative so "Ate less/more" can be toggled off
  private lastAlternative = { name: this.selectedAlternativeMeal, calories: this.selectedCalories };

  constructor(private router: Router, private modalController: ModalController) {}

  ngOnInit() {}

  /* ---------------- helpers ---------------- */

  private get plannedCalories(): number {
    return parseInt(this.mealData?.calories, 10) || 0;
  }

  /* ---------------- Ate less / more ---------------- */

  selectPortion(type: 'less' | 'more') {
    this.isEditing = false;

    if (this.portion === type) {
      // toggle off -> restore the previous alternative
      this.portion = null;
      this.selectedAlternativeMeal = this.lastAlternative.name;
      this.selectedCalories = this.lastAlternative.calories;
      return;
    }

    this.portion = type;
    const factor = type === 'less' ? 0.75 : 1.25;
    this.selectedAlternativeMeal = `${this.mealData.title} (${type === 'less' ? 'ate less' : 'ate more'})`;
    this.selectedCalories = `${Math.round(this.plannedCalories * factor)} kcal`;
  }

  /* ---------------- Search / suggestions ---------------- */

  get filteredOptions() {
    const term = this.searchText.trim().toLowerCase();
    if (!term) {
      return this.mealOptions;
    }
    return this.mealOptions.filter(o => o.name.toLowerCase().includes(term));
  }

  get showCustomOption(): boolean {
    const term = this.searchText.trim().toLowerCase();
    return !!term && !this.mealOptions.some(o => o.name.toLowerCase() === term);
  }

  openDropdown() {
    this.isDropdownOpen = true;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  // Handle selection from the suggestion list
  selectMealOption(item: any) {
    this.setAlternative(item.name, item.calories);
  }

  // Use whatever the user typed (custom meal)
  useTypedMeal() {
    const name = this.searchText.trim();
    if (!name) {
      return;
    }
    // rough estimate = planned calories (can be adjusted by editing the name with the pencil)
    this.setAlternative(name, this.mealData.calories);
  }

  private setAlternative(name: string, calories: string) {
    this.portion = null;
    this.isEditing = false;
    this.selectedAlternativeMeal = name;
    this.selectedCalories = calories;
    this.lastAlternative = { name, calories };
    this.searchText = '';
    this.isDropdownOpen = false;
  }

  /* ---------------- Inline edit ---------------- */

  toggleEdit() {
    this.isEditing = true;
    this.editName = this.selectedAlternativeMeal;
  }

  saveEdit() {
    const name = this.editName.trim();
    if (name) {
      this.selectedAlternativeMeal = name;
      if (this.portion === null) {
        this.lastAlternative = { name, calories: this.selectedCalories };
      }
    }
    this.isEditing = false;
  }

  /* ---------------- Modal actions ---------------- */

  dismissModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  logSwap() {
    if (!this.selectedAlternativeMeal) {
      return;
    }

    this.modalController.dismiss({
      status: 'swapped',
      swappedMeal: this.selectedAlternativeMeal,
      calories: this.selectedCalories,
      portion: this.portion,
      note: this.swapNote
    }, 'confirm');

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
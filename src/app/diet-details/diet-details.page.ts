// diet-details.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-diet-details',
  templateUrl: './diet-details.page.html',
  styleUrls: ['./diet-details.page.scss'],
  standalone: false
})
export class DietDetailsPage implements OnInit {
  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

  meal: any;
  isCompleted = false;
  activeBadge: string | null = 'category';

  micronutrients = [
    { name: 'Fiber', percent: '32%', color: '#00c853', sub: '8.5g / 25g' },
    { name: 'Magnesium', percent: '15%', color: '#00c853', sub: '60mg / 400mg' },
    { name: 'Iron', percent: '24%', color: '#00c853', sub: '4.3mg / 18mg' },
    { name: 'Vitamin C', percent: '68%', color: '#00c853', sub: '61mg / 90mg' }
  ];

  ingredients = [
    { name: 'Brown rice (cooked)', amount: '150g' },
    { name: 'Chicken breast (grilled)', amount: '120g' },
    { name: 'Mixed Salad Greens', amount: '80g' },
    { name: 'Cherry Tomatoes', amount: '50g' },
    { name: 'Olive Oil Dressing', amount: '10ml' }
  ];

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.meal = navigation.extras.state['meal'];
    }
  }

  ngOnInit(): void {
    if (!this.meal) {
      this.meal = {
        name: 'Brown Rice & Grilled Chicken Bowl',
        time: '25m',
        calories: '540 kcal',
        category: 'High Protein',
        serving: '1 serving',
        macros: { protein: '142g', carbs: '198g', fat: '48g' }
      };
    }
  }

  goBack() {
    this.location.back();
  }

  onBadgeClick(type: string) {
    this.activeBadge = this.activeBadge === type ? null : type;
  }

  markAsDone() {
    this.isCompleted = true;
    setTimeout(() => {
      this.router.navigate(['/tasks']);
    }, 600);
  }
}

export { DietDetailsPage as DietDetailPage };
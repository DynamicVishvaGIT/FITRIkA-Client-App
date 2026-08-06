import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.page.html',
  styleUrls: ['./program-detail.page.scss'],
  standalone: false
})
export class ProgramDetailPage implements OnInit {
  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

  program: any;
  selectedPlan: string = 'personal';
  currentPrice: number = 18000;

  weeks = [
    {
      title: 'FOUNDATION & CALIBRATION',
      open: true,
      workouts: [
        { day: 'M', name: 'Upper Body Power', desc: 'Bench focus with back volume.', color: '#b9f6ca' },
        { day: 'T', name: 'Lower Body Strength', desc: 'Squat variations and posterior chain.', color: '#ccff90' },
        { day: 'W', name: 'Active Recovery', desc: 'Mobility drills and light cardio.', color: '#e0f7fa' }
      ]
    },
    { 
      title: 'VOLUME ACCUMULATION', 
      open: false, 
      workouts: [
        { day: 'Th', name: 'Hypertrophy Upper', desc: 'High rep accessory movements.', color: '#ffe0b2' },
        { day: 'F', name: 'Posterior Chain Focus', desc: 'Deadlifts and hamstring curls.', color: '#d1c4e9' }
      ] 
    },
    { 
      title: 'PEAK & INTENSIFICATION', 
      open: false, 
      workouts: [
        { day: 'M', name: 'Max Effort Upper', desc: 'Heavy singles and back off sets.', color: '#b9f6ca' }
      ] 
    }
  ];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.program = navigation.extras.state['program'];
    }
  }

  ngOnInit(): void {
    if (!this.program) {
      this.program = {
        name: '12-Week Strength Builder',
        trainer: 'Rohan Kapoor',
        location: 'Mumbai, India',
        duration: '12wk',
        frequency: '4d/wk',
        level: 'Inter..',
        rating: '4.6',
        price: 2500,
        tags: ['Muscle Gain', 'Powerlifting', 'Hypertrophy', 'Fat Loss'],
        description: 'A comprehensive training program designed to push your limits, build functional strength, and optimize muscle hypertrophy.'
      };
    }
  }

  goBack() {
    this.router.navigate(['/programs']);
  }

  toggleWeek(index: number) {
    this.weeks[index].open = !this.weeks[index].open;
  }

  openCoachDetails() {
    this.router.navigate(['/coaches-details']);
  }

  selectPlan(planKey: string, price: number) {
    this.selectedPlan = planKey;
    this.currentPrice = price;
  }

  subscribe() {
    alert(`Successfully subscribed to ${this.program?.name || 'Program'} (${this.selectedPlan} plan) for ₹${this.currentPrice}/mo!`);
    this.router.navigate(['/programs']);
  }
}
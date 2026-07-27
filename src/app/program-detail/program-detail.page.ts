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
        price: 2500,
        level: 'Inter..',
        duration: '12wk',
        tags: ['Muscle Gain', 'Powerlifting']
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

  subscribe() {
    alert(`Successfully subscribed to ${this.program.name} for ₹${this.program.price}/mo!`);
    this.router.navigate(['/programs']);
  }
}
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

  // Dynamic Plan Selection properties
  selectedPlanKey: string = '';
  currentPrice: number = 2500; // footer shows the program price until a plan is chosen

  availablePlans = [
    {
      key: 'personal',
      name: 'Personal Training',
      price: 18000
    }
    // You can easily add more plans here, e.g.:
    // { key: 'vip', name: 'VIP 1-on-1 Coaching', price: 25000 }
  ];

  weeks = [
    {
      title: 'FOUNDATION & CALIBRATION',
      open: true,
      workouts: [
        {
          day: 'M',
          name: 'Upper Body Power',
          desc: 'Bench focus with back volume.',
          exercises: 8,
          calories: 420,
          color: '#e3f8ea'
        },
        {
          day: 'T',
          name: 'Lower Body Strength',
          desc: 'Squat variations and posterior chain.',
          exercises: 6,
          calories: 580,
          color: '#e8fbdc'
        },
        {
          day: 'W',
          name: 'Active Recovery',
          desc: 'Mobility drills and light cardio.',
          color: '#edf1f5'
        }
      ]
    },
    {
      title: 'VOLUME ACCUMULATION',
      open: false,
      workouts: [
        {
          day: 'Th',
          name: 'Hypertrophy Upper',
          desc: 'High rep accessory movements.',
          exercises: 7,
          calories: 450,
          color: '#fef3e6'
        },
        {
          day: 'F',
          name: 'Posterior Chain Focus',
          desc: 'Deadlifts and hamstring curls.',
          exercises: 5,
          calories: 510,
          color: '#f0ecf9'
        }
      ]
    },
    {
      title: 'VOLUME ACCUMULATION',
      open: false,
      workouts: [
        {
          day: 'M',
          name: 'Max Effort Upper',
          desc: 'Heavy singles and back off sets.',
          exercises: 4,
          calories: 390,
          color: '#e3f8ea'
        }
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
        coachRole: 'Strength & Hypertrophy',
        location: 'Mumbai, India',
        duration: '12wk',
        frequency: '4d/wk',
        level: 'Inter..',
        rating: '4.6',
        price: 2500,
        tags: ['Muscle Gain', 'Powerlifting', 'Hypertrophy', 'Fat Loss'],
        description:
          'Progressive overload program designed to build foundational strength through high-intensity compound movements. ' +
          'This program focuses on maximizing force production in the squat, bench, and deadlift while maintaining metabolic conditioning.'
      };
    }

    if (this.program?.price) {
      this.currentPrice = this.program.price;
    }
  }

  goBack() {
    this.router.navigate(['/programs']);
  }

  toggleWeek(index: number) {
    this.weeks[index].open = !this.weeks[index].open;
  }

  // Tap on "12-Week Strength Builder" -> Coaches Details (program view)
  openProgramDetails() {
    this.router.navigate(['/coaches-details'], { queryParams: { view: 'program' } });
  }

  // Tap on "View Profile" -> Coaches Details (profile view)
  openCoachProfile() {
    this.router.navigate(['/coaches-details'], { queryParams: { view: 'profile' } });
  }

  selectPlan(plan: any) {
    this.selectedPlanKey = plan.key;
    this.currentPrice = plan.price;
  }

  subscribe() {
    const selectedObj = this.availablePlans.find(p => p.key === this.selectedPlanKey);
    alert(`Successfully subscribed to ${this.program?.name || 'Program'} (${selectedObj?.name || 'Plan'}) for ₹${this.currentPrice}/mo!`);
    this.router.navigate(['/programs']);
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

interface MyCoach {
  id: number;
  name: string;
  initials: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  nextSession: string;
  status: 'live' | 'upcoming';
}

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.page.html',
  styleUrls: ['./coaches.page.scss'],
  standalone: false,
})
export class CoachesPage implements OnInit {
  coaches: MyCoach[] = [
    {
      id: 1,
      name: 'Rohan Kapoor',
      initials: 'RK',
      specialty: 'Hypertrophy & Conditioning',
      rating: 4.9,
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      nextSession: 'Leg Day • Today, 7:00 PM',
      status: 'live',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      initials: 'PS',
      specialty: 'Strength & HIIT Specialist',
      rating: 4.8,
      reviews: 36,
      image: '', // empty = shows initials avatar
      nextSession: 'Upper Body • Tomorrow, 8:30 AM',
      status: 'upcoming',
    },
  ];

  // Rate sheet state
  isRateOpen = false;
  selectedCoach: MyCoach | null = null;
  selectedRating = 5;

  private readonly ratingLabels: { [key: number]: string } = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Great',
    5: 'Outstanding',
  };

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  get ratingLabel(): string {
    return this.ratingLabels[this.selectedRating] || '';
  }

  openMenu() {
    this.menuCtrl.open();
  }

  addCoach() {
    this.router.navigate(['/find-trainer']);
  }

  openCoach(coach: MyCoach) {
    this.router.navigate(['/coaches-detailed'], { state: { coach } });
  }

  // ---- Rate sheet ----
  openRate(coach: MyCoach, event?: Event) {
    event?.stopPropagation();
    this.selectedCoach = coach;
    this.selectedRating = 5;
    this.isRateOpen = true;
  }

  closeRate() {
    this.isRateOpen = false;
  }

  setRating(value: number) {
    this.selectedRating = value;
  }

  async submitRating() {
    if (!this.selectedCoach) {
      return;
    }

    const coach = this.selectedCoach;
    const total = coach.rating * coach.reviews + this.selectedRating;
    coach.reviews += 1;
    coach.rating = Math.round((total / coach.reviews) * 10) / 10;

    this.isRateOpen = false;

    const toast = await this.toastCtrl.create({
      message: `Thanks! You rated ${coach.name} ${this.selectedRating}.0`,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  // ---- Bottom tabs ----
  switchTab(tab: string) {
    switch (tab) {
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'task':
        this.router.navigate(['/dashboard']);
        break;
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      default:
        break; // already on coaches
    }
  }
}
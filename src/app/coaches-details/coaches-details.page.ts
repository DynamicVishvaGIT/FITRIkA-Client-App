import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

interface CoachPackage {
  id: number;
  name: string;
  tagline: string;
  price: number;
  premium: boolean;
}

@Component({
  selector: 'app-coaches-details',
  templateUrl: './coaches-details.page.html',
  styleUrls: ['./coaches-details.page.scss'],
  standalone: false
})
export class CoachesDetailsPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

  // 'program'  -> opened by tapping "12-Week Strength Builder"
  // 'profile'  -> opened by tapping "View Profile"
  isProfile = false;

  program = {
    title: '12-Week Strength Builder',
    badge: 'Trending Program'
  };

  coach = {
    name: 'Rohan Kapoor',
    badge: 'Elite Coach',
    location: 'Mumbai, India',
    rating: 4.9,
    yearsExp: 8,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    expertise: ['Muscle Gain', 'Powerlifting', 'Hypertrophy', 'Fat Loss'],
    phone: '+91 9876543210',
    email: 'ROHANK@GMAIL.COM',
    instagram: 'https://www.instagram.com/',
    about:
      'Rohan is a dedicated performance coach specializing in hypertrophy and functional strength. ' +
      'With nearly a decade of experience training elite athletes and corporate professionals.'
  };

  packages: CoachPackage[] = [
    { id: 1, name: 'Core', tagline: 'Self-paced guidance', price: 2499, premium: false },
    { id: 2, name: 'Pro Mentorship', tagline: '1-on-1 coaching', price: 4999, premium: true }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.isProfile = params['view'] === 'profile';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this.location.back();
  }

  openInstagram() {
    window.open(this.coach.instagram, '_blank');
  }

  bookEnquiry(pkg: CoachPackage) {
    // TODO: connect to your enquiry / booking API
    console.log('Book package:', pkg.name);
  }
}
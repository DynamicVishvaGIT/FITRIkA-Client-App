import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Coach {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  location: string;
  bio: string;
  tags: string[];
  price: number;
  image: string;
  goal: string;
  topRated: boolean;
  status: string;
}

@Component({
  selector: 'app-find-your-trainer',
  templateUrl: './find-your-trainer.page.html',
  styleUrls: ['./find-your-trainer.page.scss'],
  standalone: false,
})
export class FindYourTrainerPage implements OnInit {
  searchQuery: string = '';
  isFilterOpen: boolean = false;
  
  // Track active horizontal banner selection
  selectedCategory: string = 'All';

  specialtyOptions: string[] = ['Strength', 'Nutrition', 'Running', 'Yoga', 'Crossfit'];
  goalOptions: string[] = ['Fat Loss', 'Muscle Gain', 'Running', 'Yoga', 'Crossfit'];

  selectedSpecialties: string[] = [];
  selectedGoals: string[] = [];

  coaches: Coach[] = [
    {
      id: 1,
      name: 'Rohan Kapoor',
      specialty: 'Strength & Hypertrophy',
      experience: 8,
      location: 'Mumbai',
      bio: 'I help professionals build sustainable strength habits without sacrificing their lifestyle.',
      tags: ['Hypertrophy', 'Powerlifting'],
      price: 2500,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      goal: 'Muscle Gain',
      topRated: true,
      status: 'Open for coaching'
    },
    {
      id: 2,
      name: 'Anika Kulkarni',
      specialty: 'Fat Loss & Conditioning',
      experience: 5,
      location: 'Mumbai',
      bio: 'Data-driven nutrition and training tailored to your specific hormonal profile...',
      tags: ['Hypertrophy', 'Powerlifting'],
      price: 1800,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      goal: 'Fat Loss',
      topRated: true,
      status: 'Open for coaching'
    }
  ];

  filteredCoaches: Coach[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filterCoaches();
  }

  goBack(): void {
    this.router.navigate(['/diet-preference']);
  }

  toggleFilter(open: boolean): void {
    this.isFilterOpen = open;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterCoaches();
  }

  toggleSpecialty(spec: string): void {
    const index = this.selectedSpecialties.indexOf(spec);
    if (index > -1) {
      this.selectedSpecialties.splice(index, 1);
    } else {
      this.selectedSpecialties.push(spec);
    }
  }

  toggleGoal(goal: string): void {
    const index = this.selectedGoals.indexOf(goal);
    if (index > -1) {
      this.selectedGoals.splice(index, 1);
    } else {
      this.selectedGoals.push(goal);
    }
  }

  clearFilters(): void {
    this.selectedSpecialties = [];
    this.selectedGoals = [];
    this.filterCoaches();
  }

  getActiveFilterCount(): number {
    return this.selectedSpecialties.length + this.selectedGoals.length;
  }

  applyFilters(): void {
    this.isFilterOpen = false;
    this.filterCoaches();
  }

  onSearch(): void {
    this.filterCoaches();
  }

  filterCoaches(): void {
    this.filteredCoaches = this.coaches.filter(coach => {
      const matchesSearch = 
        this.searchQuery === '' || 
        coach.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        coach.specialty.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesBannerCategory = 
        this.selectedCategory === 'All' || 
        coach.specialty.toLowerCase().includes(this.selectedCategory.toLowerCase()) ||
        coach.tags.some(t => t.toLowerCase().includes(this.selectedCategory.toLowerCase()));

      const matchesSpecialty = 
        this.selectedSpecialties.length === 0 || 
        this.selectedSpecialties.some(spec => 
          coach.specialty.toLowerCase().includes(spec.toLowerCase()) || 
          coach.tags.some(t => t.toLowerCase().includes(spec.toLowerCase()))
        );

      const matchesGoal = 
        this.selectedGoals.length === 0 || 
        this.selectedGoals.includes(coach.goal);

      return matchesSearch && matchesBannerCategory && (this.selectedSpecialties.length === 0 && this.selectedGoals.length === 0 || (matchesSpecialty || matchesGoal));
    });
  }

  viewProfile(coach: Coach): void {
    this.router.navigate(['/trainer-profile'], { queryParams: { id: coach.id } });
  }
}
// programs.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
  standalone: false
})
export class ProgramsPage implements OnInit {
  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

  searchQuery = '';

  programs = [
    { 
      id: 1, 
      name: 'Calisthenic master...', 
      trainer: 'Sneha Dey', 
      level: 'Intermediate', 
      duration: '16 weeks / 4days/wk', 
      tags: ['Calisthenic', 'Strength'], 
      price: 2500, 
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' 
    },
    { 
      id: 2, 
      name: '12-Week Strength Builder...', 
      trainer: 'Rohan Kapoor', 
      level: 'Inter..', 
      duration: '12 weeks / 4d/wk', 
      tags: ['Muscle Gain', 'Powerlifting'], 
      price: 2500, 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' 
    }
  ];

  filteredPrograms = [...this.programs];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredPrograms = [...this.programs];
  }

  goBack() {
    this.router.navigate(['../']);
  }

  filterPrograms() {
    const q = this.searchQuery.toLowerCase();
    this.filteredPrograms = this.programs.filter(p => 
      p.name.toLowerCase().includes(q) || p.trainer.toLowerCase().includes(q)
    );
  }

  openProgramDetail(prog: any) {
    this.router.navigate(['/program-detail'], { state: { program: prog } });
  }
}
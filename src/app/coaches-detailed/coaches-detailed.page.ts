import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coaches-detailed',
  templateUrl: './coaches-detailed.page.html',
  styleUrls: ['./coaches-detailed.page.scss'],
  standalone: false,
})
export class CoachesDetailedPage implements OnInit {

  coach: any = {
    name: 'Rohan Kapoor',
    firstName: 'Rohan',
    specialty: 'Strength & Conditioning',
    location: 'Mumbai',
    experience: '8',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    longBio: 'Rohan is a dedicated performance coach specializing in hypertrophy and functional strength. With nearly a decade of experience training elite athletes and corporate professionals, his methodology focuses on data-driven progress tracking and biomechanically efficient movement patterns.',
    allExpertise: ['Muscle Gain', 'Powerlifting', 'Hypertrophy', 'Fat Loss']
  };

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['coach']) {
      const passedCoach = navigation.extras.state['coach'];
      this.coach = {
        ...this.coach,
        ...passedCoach,
        firstName: passedCoach.name.split(' ')[0],
        longBio: passedCoach.bio || this.coach.longBio,
        allExpertise: passedCoach.tags ? [...passedCoach.tags, 'Muscle Gain', 'Fat Loss'] : this.coach.allExpertise
      };
    }
  }

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['/add-coaches']);
  }

  selectPlan(planName: string): void {
    alert(`Selected ${planName} plan for ${this.coach.name}!`);
  }
}
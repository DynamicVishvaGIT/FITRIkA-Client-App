import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HowDidComponent, HowDidPage } from '../how-did/how-did.page';
import { ActivatedRoute, Router } from '@angular/router';

interface Task {
  id: number;
  title: string;
  description: string;
  coach: string;
  completed: boolean;
  active?: boolean;
  category: string; // 'Rohan' | 'Priya' | 'Food'
  calories?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  activeFilter: string = 'All Task';

  microBars = [
    { label: 'STRENGTH', width: 100 },
    { label: 'NUTRITION', width: 100 },
    { label: 'NUTRITION', width: 100 },
    { label: 'NUTRITION', width: 60 },
    { label: 'NUTRITION', width: 30 },
    { label: 'NUTRITION', width: 20 },
    { label: 'RUN', width: 40 }
  ];

  tasks: Task[] = [
    {
      id: 1,
      title: 'Breakfast',
      description: 'High protein oatmeal + berries',
      coach: 'Coach Marcus',
      completed: false,
      active: false,
      category: 'Food',
      calories: '450 kcal'
    },
    {
      id: 2,
      title: 'Pre-workout shake',
      description: '30 mins before Leg Day session',
      coach: 'Coach Elena',
      completed: false,
      active: true,
      category: 'Rohan',
      calories: '300 kcal'
    },
    {
      id: 3,
      title: 'Interval Training',
      description: '5km mix of sprints and recovery',
      coach: 'Coach Marcus',
      completed: false,
      active: false,
      category: 'Rohan',
      calories: '500 kcal'
    },
    {
      id: 4,
      title: 'Yoga Flow',
      description: 'Flexibility and mobility routine',
      coach: 'Coach Priya',
      completed: false,
      active: false,
      category: 'Priya',
      calories: '250 kcal'
    },
    {
      id: 5,
      title: 'Lunch',
      description: 'Brown rice + chicken + salad',
      coach: 'Coach Rohan',
      completed: false,
      active: false,
      category: 'Rohan',
      calories: '620 kcal'
    }
  ];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['status']) {
        const lunchTask = this.tasks.find(t => t.title.toLowerCase().includes('lunch') || t.id === 5);
        if (lunchTask) {
          if (params['status'] === 'swapped' && params['swappedMeal']) {
            lunchTask.description = params['swappedMeal'];
            lunchTask.completed = true;
          } else if (params['status'] === 'planned' || params['status'] === 'skipped') {
            lunchTask.completed = true;
          }
        }
      }
    });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  getCurrentBanner() {
    switch (this.activeFilter) {
      case 'Rohan':
        return {
          name: 'Rohan Kapoor',
          specialty: 'Fat Loss Specialist',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          quote: 'Aryan, your consistency with interval training is showing in your recovery heart rate. Push the pace on todays session.'
        };
      case 'Priya':
        return {
          name: 'Priya Sharma',
          specialty: 'Yoga & Mobility Coach',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
          quote: 'Focus on core stability and deep breathing throughout today’s flexibility flow.'
        };
      case 'Food':
        return {
          name: 'Nutrition Plan',
          specialty: 'Daily Macro Targets',
          avatar: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=150',
          quote: 'Keep hitting your protein goals consistently to support muscle recovery and growth.'
        };
      default:
        return { name: '', specialty: '', avatar: '', quote: '' };
    }
  }

  getTasksHeaderTitle(): string {
    if (this.activeFilter === 'All Task') return "Today's Tasks";
    return `${this.activeFilter}'s plan Today`;
  }

  getFilteredTasks(): Task[] {
    if (this.activeFilter === 'All Task') {
      return this.tasks;
    }
    return this.tasks.filter(t => t.category === this.activeFilter);
  }

  openMenu() {
    console.log('Menu opened');
  }

  async onCardClick(task: Task, event: Event) {
    event.stopPropagation();
    await this.openLunchModalForMeal(task);
  }

  async openLunchModalForMeal(selectedMeal: any) {
    let headerTitle = 'How did lunch go?';
    const lowerTitle = (selectedMeal.title || '').toLowerCase();
    const lowerDesc = (selectedMeal.description || '').toLowerCase();
    
    if (lowerTitle.includes('breakfast') || lowerDesc.includes('breakfast')) {
      headerTitle = 'How did breakfast go?';
    } else if (lowerTitle.includes('dinner') || lowerDesc.includes('dinner') || lowerDesc.includes('supper')) {
      headerTitle = 'How did dinner go?';
    } else if (lowerTitle.includes('lunch') || lowerDesc.includes('lunch') || lowerTitle.includes('rice')) {
      headerTitle = 'How did lunch go?';
    } else {
      headerTitle = `How did ${selectedMeal.title.toLowerCase()} go?`;
    }

    if (selectedMeal.completed) {
      const modal = await this.modalController.create({
        component: HowDidPage,
        cssClass: 'oval-bottom-modal',
        componentProps: {
          mealData: {
            title: selectedMeal.description || selectedMeal.title,
            calories: selectedMeal.calories || '620 kcal',
            modalTitle: headerTitle
          }
        },
        backdropDismiss: true,
        breakpoints: [0, 0.78],
        initialBreakpoint: 0.68,
        handle:false
      });

      await modal.present();

      const { data } = await modal.onDidDismiss();
      if (data) {
        console.log('Action logged:', data);
      }
    }
  }

  toggleTaskCompletion(task: Task, event: Event) {
    event.stopPropagation();
    task.completed = !task.completed;
  }

  swapTask(task: Task, event: Event) {
    event.stopPropagation();
    const currentList = this.getFilteredTasks();
    const currentIndex = currentList.indexOf(task);
    const masterIndex = this.tasks.indexOf(task);

    if (currentIndex > 0) {
      const prevTaskInView = currentList[currentIndex - 1];
      const masterPrevIndex = this.tasks.indexOf(prevTaskInView);
      
      const temp = this.tasks[masterIndex];
      this.tasks[masterIndex] = this.tasks[masterPrevIndex];
      this.tasks[masterPrevIndex] = temp;
    } else if (currentList.length > 1) {
      const firstItem = currentList[0];
      const firstMasterIdx = this.tasks.indexOf(firstItem);
      const extracted = this.tasks.splice(firstMasterIdx, 1)[0];
      this.tasks.push(extracted);
    }
  }

  switchTab(tab: string) {
    if (tab === 'task') {
      this.router.navigate(['/task']);
    } else if (tab === 'coaches') {
      this.router.navigate(['/coaches']);
    } else if (tab === 'profile') {
      this.router.navigate(['/profile']);
    } else if (tab === 'home' || tab === 'dashboard') {
      this.router.navigate(['/dashboard']);
    }
  }
}
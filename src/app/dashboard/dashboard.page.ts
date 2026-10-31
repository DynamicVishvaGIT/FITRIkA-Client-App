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
  type: 'food' | 'workout'; // decides which bottom sheet opens
  calories?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  activeFilter: string = 'Rohan';

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
      completed: true,
      active: false,
      category: 'Rohan',
      type: 'food',
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
      type: 'food',
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
      type: 'workout',
      calories: '500 kcal'
    },
    {
      id: 4,
      title: 'Interval Training',
      description: '5km mix of sprints and recovery',
      coach: 'Coach Marcus',
      completed: false,
      active: false,
      category: 'Rohan',
      type: 'workout',
      calories: '500 kcal'
    },
    {
      id: 5,
      title: 'Interval Training',
      description: '5km mix of sprints and recovery',
      coach: 'Coach Marcus',
      completed: false,
      active: false,
      category: 'Rohan',
      type: 'workout',
      calories: '500 kcal'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!params['status']) {
        return;
      }
      const targetId = params['taskId'] ? Number(params['taskId']) : 1;
      const targetTask = this.tasks.find(t => t.id === targetId);
      if (targetTask) {
        this.applyStatus(targetTask, {
          status: params['status'],
          swappedMeal: params['swappedMeal'],
          calories: params['calories']
        });
      }
    });
  }

  /** Updates a task after a bottom-sheet action (idempotent) */
  private applyStatus(task: Task, data: any) {
    if (!data || !data.status) {
      return;
    }

    if (data.status === 'swapped' && data.swappedMeal) {
      task.description = data.swappedMeal;
      if (data.calories) {
        task.calories = data.calories;
      }
      task.completed = true;
    } else if (data.status === 'planned' || data.status === 'skipped') {
      task.completed = true;
    }
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
          quote: 'Aryan, your consistency with interval training is showing in your recovery heart rate.'
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

  /** Food task -> meal sheet, workout task -> workout sheet */
  async openLunchModalForMeal(selectedMeal: Task) {
    const isWorkout = this.getTaskType(selectedMeal) === 'workout';
    const headerTitle = `How did ${selectedMeal.title.toLowerCase()} go?`;

    const mealData = isWorkout
      ? {
          type: 'workout',
          taskId: selectedMeal.id,
          title: selectedMeal.title,
          subtitle: selectedMeal.description,
          calories: selectedMeal.calories || '500 kcal',
          modalTitle: headerTitle
        }
      : {
          type: 'food',
          taskId: selectedMeal.id,
          title: selectedMeal.description || selectedMeal.title,
          calories: selectedMeal.calories || '450 kcal',
          modalTitle: headerTitle
        };

    // sheet height = content height (a bit taller for the workout sheet's extra line)
    const bp = this.sheetBreakpoint(isWorkout ? 560 : 540);

    const modal = await this.modalController.create({
      component: HowDidPage,
      cssClass: 'oval-bottom-modal',
      componentProps: { mealData },
      backdropDismiss: true,
      breakpoints: [0, bp],
      initialBreakpoint: bp,
      handle: false
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Action logged:', data);
      this.applyStatus(selectedMeal, data);
    }
  }

  /** explicit type first, otherwise guess from the text */
  private getTaskType(task: Task): 'food' | 'workout' {
    if (task.type) {
      return task.type;
    }
    const text = `${task.title} ${task.description}`.toLowerCase();
    if (/(breakfast|lunch|dinner|snack|shake|meal|oatmeal|salad|smoothie)/.test(text)) {
      return 'food';
    }
    if (/(training|workout|run|session|exercise|leg day|yoga|strength|cardio|hiit)/.test(text)) {
      return 'workout';
    }
    return 'food';
  }

  private sheetBreakpoint(contentPx: number): number {
    const h = window.innerHeight || 800;
    return Math.min(0.95, Math.max(0.35, contentPx / h));
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
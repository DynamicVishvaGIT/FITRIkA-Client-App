import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Task {
  id: number;
  title: string;
  subtitle: string;
  time?: string;
  coach: string;
  category: 'Rohan' | 'Priya' | 'Food';
  type: 'diet' | 'workout';
  completed: boolean;
  isActive?: boolean;
  // Specific properties for dynamic passing to detail pages
  weight?: number;
  reps?: number;
  calories?: string;
  protein?: string;
  carbs?: string;
  fats?: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: false,
})
export class TaskPage implements OnInit {
  selectedDate: number = 17;
  activeFilter: string = 'All Task';

  weekDays = [
    { dayName: 'MON', dayNum: 16 },
    { dayName: 'TUE', dayNum: 17 },
    { dayName: 'WED', dayNum: 18 },
    { dayName: 'THU', dayNum: 19 },
    { dayName: 'FRI', dayNum: 20 },
    { dayName: 'SAT', dayNum: 21 }
  ];

  tasks: Task[] = [
    {
      id: 1,
      title: 'Breakfast',
      subtitle: 'High protein oatmeal + berries',
      time: '8:00 AM',
      coach: 'Coach Marcus',
      category: 'Food',
      type: 'diet',
      completed: true,
      calories: '450 kcal',
      protein: '30g',
      carbs: '55g',
      fats: '10g'
    },
    {
      id: 2,
      title: 'Pre-workout shake',
      subtitle: '30 mins before Leg Day session',
      coach: 'Coach Elena',
      category: 'Rohan',
      type: 'workout',
      completed: false,
      isActive: true,
      weight: 40,
      reps: 12
    },
    {
      id: 3,
      title: 'Interval Training',
      subtitle: '5km mix of sprints and recovery',
      coach: 'Coach Marcus',
      category: 'Rohan',
      type: 'workout',
      completed: false,
      weight: 50,
      reps: 15
    },
    {
      id: 4,
      title: 'Yoga Flow',
      subtitle: 'Flexibility and mobility routine',
      coach: 'Coach Priya',
      category: 'Priya',
      type: 'workout',
      completed: false,
      weight: 15,
      reps: 20
    },
    {
      id: 5,
      title: 'Lunch Salad',
      subtitle: 'Grilled chicken with mixed greens',
      time: '1:00 PM',
      coach: 'Coach Marcus',
      category: 'Food',
      type: 'diet',
      completed: false,
      calories: '550 kcal',
      protein: '45g',
      carbs: '20g',
      fats: '18g'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  selectDate(dayNum: number) {
    this.selectedDate = dayNum;
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  getHeaderTitle(): string {
    if (this.activeFilter === 'All Task') {
      return 'All Task';
    }
    return `${this.activeFilter}'s Plan`;
  }

  getSectionHeaderTitle(): string {
    if (this.activeFilter === 'All Task') {
      return "Today's Tasks";
    }
    return `${this.activeFilter}'s plan Today`;
  }

  getSectionActionText(): string {
    const filtered = this.getFilteredTasks();
    if (this.activeFilter === 'All Task') {
      return 'All Coaches';
    }
    return `${filtered.length} items`;
  }

  getFilteredTasks(): Task[] {
    if (this.activeFilter === 'All Task') {
      return this.tasks;
    }
    return this.tasks.filter(t => t.category === this.activeFilter);
  }

  // Passes the exact clicked task object through router state so detail components can display specific data
  handleTaskClick(task: Task, event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.status-indicator')) {
      return;
    }

    if (task.type === 'diet') {
      this.router.navigate(['/diet-details'], { state: { taskData: task } });
    } else {
      this.router.navigate(['/task-detail-screen'], { state: { taskData: task } });
    }
  }

  toggleTask(taskId: number, event: Event) {
    event.stopPropagation();
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  openMenu() {
    console.log('Menu opened');
  }

  switchTab(tab: string) {
    if (tab === 'profile') {
      this.router.navigate(['/profile']);
    }
  }
}
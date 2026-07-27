// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HowDidComponent } from '../how-did/how-did.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

  selectedTab = 'rohan';

  meals = [
    { name: 'Breakfast', desc: 'High protein oatmeal + berries', coach: 'Coach Marcus', status: true },
    { name: 'Pre-workout shake', desc: '30 mins before Leg Day session', coach: 'Coach Elena', status: false },
    { name: 'Interval Training', desc: '5km mix of sprints and recovery', coach: 'Coach Marcus', status: false },
    { name: 'Interval Training', desc: '5km mix of sprints and recovery', coach: 'Coach Marcus', status: false },
    { name: 'Interval Training', desc: '5km mix of sprints and recovery', coach: 'Coach Marcus', status: false }
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {}

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  async openHowDid(meal: any) {
    const modal = await this.modalController.create({
      component: HowDidComponent,
      componentProps: { currentMeal: meal },
      cssClass: 'custom-bottom-sheet-modal',
      breakpoints: [0, 0.65, 1],
      initialBreakpoint: 0.65
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.updated) {
      // Update meal status locally upon successful log/return
      meal.status = true;
    }
  }
}
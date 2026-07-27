import { Component, Input,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HowDidYouComponent } from '../how-did-you/how-did-you.page';

@Component({
  selector: 'app-how-did',
  templateUrl: './how-did.page.html',
  styleUrls: ['./how-did.page.scss'],
  standalone: false
})
export class HowDidPage implements OnInit {

  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

     @Input() currentMeal: any;

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {}

  closeSheet() {
    this.modalController.dismiss();
  }

  async selectOption(type: string) {
    if (type === 'planned' || type === 'skipped') {
      // Closes current sheet and marks meal complete on dashboard
      this.modalController.dismiss({ updated: true });
    } else if (type === 'else') {
      // Dismiss current modal and open the next modal sheet using ModalController
      await this.modalController.dismiss();
      
      const nextModal = await this.modalController.create({
        component: HowDidYouComponent,
        componentProps: { currentMeal: this.currentMeal },
        cssClass: 'custom-bottom-sheet-modal',
        breakpoints: [0, 0.9, 1],
        initialBreakpoint: 0.9
      });

      await nextModal.present();
      const { data } = await nextModal.onDidDismiss();
      if (data && data.logged) {
        // Pass completion back up through parent handler if needed
      }
    }
  }

  moveAnotherTime() {
    this.modalController.dismiss();
  }
}

export { HowDidPage as HowDidComponent };
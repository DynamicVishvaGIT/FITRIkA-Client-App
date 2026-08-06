import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HowDidYouPage } from '../how-did-you/how-did-you.page';

@Component({
  selector: 'app-how-did',
  templateUrl: './how-did.page.html',
  styleUrls: ['./how-did.page.scss'],
  standalone: false
})
export class HowDidPage implements OnInit {

  safeAreaTop = 'env(safe-area-inset-top)';
  safeAreaBottom = 'env(safe-area-inset-bottom)';

  selectedOption: string = '';
  
  @Input() mealData: any = {
    title: 'Brown rice + chicken + salad',
    calories: '620 kcal',
    modalTitle: 'How did lunch go?'
  };

  constructor(private router: Router, private route: ActivatedRoute, private modalController: ModalController) {}

  ngOnInit() {
    // Fallback if passed via router state navigation
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['mealData']) {
      const passedData = navigation.extras.state['mealData'];
      this.processMealData(passedData);
    } else if (this.mealData && this.mealData.title) {
      // Handles data passed via componentProps directly from ModalController
      this.processMealData(this.mealData);
    }
  }

  processMealData(passedData: any) {
    let dynamicHeader = 'How did lunch go?';
    const titleLower = (passedData.title || '').toLowerCase();
    
    if (titleLower.includes('breakfast')) {
      dynamicHeader = 'How did breakfast go?';
    } else if (titleLower.includes('dinner') || titleLower.includes('supper')) {
      dynamicHeader = 'How did dinner go?';
    } else if (titleLower.includes('lunch') || titleLower.includes('rice') || titleLower.includes('salad')) {
      dynamicHeader = 'How did lunch go?';
    } else if (passedData.modalTitle) {
      dynamicHeader = passedData.modalTitle;
    }

    this.mealData = {
      title: passedData.title || this.mealData.title,
      calories: passedData.calories || this.mealData.calories,
      modalTitle: dynamicHeader
    };
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  dismissModal() {
    this.modalController.dismiss({ dismissed: true });
  }

  // Opens the next How-Did-You page with the exact same oval bottom sheet style
  async proceedNext() {
    if (this.selectedOption === 'else') {
      const modal = await this.modalController.create({
        component: HowDidYouPage,
        cssClass: 'oval-bottom-modal', // Matches the exact deep oval modal style from dashboard
        componentProps: {
          mealData: this.mealData
        },
        backdropDismiss: true,
        breakpoints: [0, 0.85, 1],
        initialBreakpoint: 0.85,
        handle: false
      });

      await modal.present();

      const { data } = await modal.onDidDismiss();
      if (data) {
        console.log('How-Did-You modal closed with data:', data);
        if (data.status === 'swapped' || data.swappedMeal || data.status) {
          this.modalController.dismiss(data);
        }
      }
    } else {
      this.modalController.dismiss({ status: this.selectedOption });
    }
  }

  closeSheet() {
    this.modalController.dismiss();
  }

  moveAnotherTime() {
    this.modalController.dismiss();
  }
}

export { HowDidPage as HowDidComponent };
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-find-trainer',
  templateUrl: './find-trainer.page.html',
  styleUrls: ['./find-trainer.page.scss'],
  standalone: false,
})
export class FindTrainerPage implements OnInit {

  selectedOptionType: string | null = 'expert';
  inviteLink: string = 'hyynd.app/priya-sharma';

  constructor(private router: Router, private toastCtrl: ToastController) {}

  ngOnInit(): void {
    this.selectedOptionType = 'expert';
  }

  goBack(): void {
    this.router.navigate(['/coaches']);
  }

  selectOption(type: string): void {
    // Highlight selected option
    this.selectedOptionType = type;

    // Navigate
    if (type === 'expert' || type === 'accountability') {
      this.router.navigate(['/add-coaches'], {
        queryParams: { type }
      });
    } else if (type === 'programs') {
      this.router.navigate(['/programs']);
    }
  }

  navigateTo(route: string): void {
    this.router.navigate(['/' + route]);
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.inviteLink);
      this.showToast('Link copied');
    } catch (e) {
      this.showToast('Could not copy the link');
    }
  }

  async shareLink(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({ url: 'https://' + this.inviteLink });
      } catch (e) {
        // user cancelled the share sheet
      }
    } else {
      this.copyLink();
    }
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }
}
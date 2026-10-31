import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-prospects',
  templateUrl: './my-prospects.page.html',
  styleUrls: ['./my-prospects.page.scss'],
  standalone: false,
})
export class MyProspectsPage implements OnInit {
  trainerLink: string = '';
  inviteLink: string = 'hyynd.app/priya-sharma';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['/diet-preference']);
  }

  async pasteLink(): Promise<void> {
    try {
      this.trainerLink = await navigator.clipboard.readText();
    } catch (e) {
      console.warn('Clipboard read not permitted', e);
    }
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.inviteLink);
    } catch (e) {
      console.warn('Clipboard write not permitted', e);
    }
  }

  async shareLink(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({ url: 'https://' + this.inviteLink });
      } catch (e) {}
    } else {
      this.copyLink();
    }
  }

  onContinue(): void {
    if (!this.trainerLink.trim()) {
      return;
    }
    // TODO: link the trainer profile using this.trainerLink
  }

  browseCoaches(): void {
    this.router.navigate(['/find-your-trainer']);
  }
}
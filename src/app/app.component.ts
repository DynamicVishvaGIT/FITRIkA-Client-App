import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonTabs,
  Platform,
  ModalController,
  AlertController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('myTabs', { static: false }) tabs!: IonTabs;

  selectedIndex = 0;
  selected = false;
  activeTabName: string | undefined = '';
  tab_name: any;

  appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  // Routes on which pressing back should ask the user to exit the app
  // instead of navigating backwards.
  private exitRoutes: string[] = ['/login', '/dashboard'];

  private backButtonSub!: Subscription;
  private lastTimeBackPress = 0;
  private readonly timePeriodToExit = 2000; // ms window for double back-press

  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.initBackButtonHandler();
    });
  }

  ngOnDestroy(): void {
    if (this.backButtonSub) {
      this.backButtonSub.unsubscribe();
    }
  }

  private initBackButtonHandler(): void {
    // Higher priority number = handled first.
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(
      10,
      async (processNextHandler) => {
        // 1) Close an open modal first, if any.
        const topModal = await this.modalCtrl.getTop();
        if (topModal) {
          await topModal.dismiss();
          return;
        }

        // 2) Close an open alert, if any.
        const topAlert = await this.alertCtrl.getTop();
        if (topAlert) {
          await topAlert.dismiss();
          return;
        }

        // 3) Catch any other overlay (action-sheet, popover, loading, picker, toast)
        //    that doesn't have its own controller injected here.
        const otherOverlay = document.querySelector(
          'ion-action-sheet, ion-popover, ion-loading, ion-picker'
        ) as any;
        if (otherOverlay) {
          await otherOverlay.dismiss();
          return;
        }

        // 4) Close the side menu if it's open.
        const menuOpen = await this.menuCtrl.isOpen();
        if (menuOpen) {
          await this.menuCtrl.close();
          return;
        }

        // 5) On a "root" page -> double-press-to-exit, else navigate back.
        const currentUrl = this.router.url.split('?')[0];
        const isExitRoute =
          this.exitRoutes.includes(currentUrl) || currentUrl === '/';

        if (isExitRoute) {
          await this.handleExitApp();
        } else {
          this.location.back();
        }
      }
    );
  }

  private async handleExitApp(): Promise<void> {
    const now = Date.now();

    if (now - this.lastTimeBackPress < this.timePeriodToExit) {
      // Second press within the window -> actually exit (Cordova).
      const nav: any = navigator;
      if (nav.app && typeof nav.app.exitApp === 'function') {
        nav.app.exitApp();
      }
      return;
    }

    this.lastTimeBackPress = now;

    const toast = await this.toastCtrl.create({
      message: 'Press back again to exit the app',
      duration: this.timePeriodToExit,
      position: 'bottom',
    });
    await toast.present();
  }

  getSelectedTab(): void {
    if (this.tabs) {
      this.selected = true;
      this.activeTabName = this.tabs.getSelected() || '';
      this.tab_name = this.activeTabName;
    }
  }
}
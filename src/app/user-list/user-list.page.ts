import { Component } from '@angular/core';

export interface User {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
  standalone:false,
})
export class UserListPage {
  // Initial 4 Users
  users: User[] = [
    { id: 1, name: 'Alex Morgan', age: 28 },
    { id: 2, name: 'David Miller', age: 34 },
    { id: 3, name: 'Sophia Chen', age: 24 },
    { id: 4, name: 'James Wilson', age: 41 }
  ];

  // Modal State Controls
  isModalOpen = false;
  isEditMode = false;
  selectedUserId: number | null = null;

  // Simple Input Models
  userName: string = '';
  userAge: number | null = null;

  // Open sheet modal in "ADD" mode
  openAddModal() {
    this.isEditMode = false;
    this.selectedUserId = null;
    this.resetForm();
    this.isModalOpen = true;
  }

  // Open sheet modal in "EDIT" mode with user data prefilled
  openEditModal(user: User) {
    this.isEditMode = true;
    this.selectedUserId = user.id;
    this.userName = user.name;
    this.userAge = user.age;
    this.isModalOpen = true;
  }

  // Handle both Create and Update logic dynamically
  saveUser() {
    if (!this.userName || !this.userAge) return;

    if (this.isEditMode && this.selectedUserId !== null) {
      // UPDATE logic
      const index = this.users.findIndex(u => u.id === this.selectedUserId);
      console.log(index)
      if (index !== -1) {
        this.users[index] = { 
          ...this.users[index], 
          name: this.userName, 
          age: Number(this.userAge) 
        };
      }
    } else {
      // CREATE logic
      const newUser: User = {
        id: Date.now(),
        name: this.userName,
        age: Number(this.userAge)
      };
      this.users.unshift(newUser); // Add to top of list
    }

    this.closeModal();
  }

  // Delete User
  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  // Close sheet modal
  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.userName = '';
    this.userAge = null;
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  createUserForm!: FormGroup;
  updateUserForm!: FormGroup;

  showCreateUserModal = false;
  showModifyUserModal = false;
  currentUser: any = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.createUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });



  }

  openCreateUserModal() {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal() {
    this.showCreateUserModal = false;
    this.createUserForm.reset();
  }

  createUser(): void {
    console.log('Create User function called');

    if (this.createUserForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const newUser = { ...this.createUserForm.value, role: 'waiter' };

    this.userService.createUser(newUser).subscribe(
      response => {
        this.closeCreateUserModal();
        this.loadUsers();
      },
      error => {
      }
    );
  }

  openModifyUserModal(user: any) {
    this.currentUser = { ...user };
    this.updateUserForm.patchValue(this.currentUser); // Populate the form with current user data
    this.showModifyUserModal = true;
  }

  closeModifyUserModal() {
    this.showModifyUserModal = false;
    this.currentUser = null;
  }

  onUpdateUser(): void {
    if (this.updateUserForm.invalid) {
      return;
    }

    const updatedUser = this.updateUserForm.value;

    this.userService.updateUser(this.currentUser._id, updatedUser).subscribe(
      data => {
        console.log('User updated successfully', data);
        this.loadUsers(); // Reload the list of users after update
        this.closeModifyUserModal(); // Close the modal after update
      },
      error => {
        console.error('Failed to update user:', error);
      }
    );
  }

  onDeleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('User deleted successfully');
        this.loadUsers(); // Reload the list of users after deletion
      },
      (error) => {
        console.error('Failed to delete user:', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        console.log('Users loaded successfully:', this.users);
      },
      error => {
        console.error('Failed to load users:', error);
      }
    );
  }
}


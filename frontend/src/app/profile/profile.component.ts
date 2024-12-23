import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any = {};  // Ensure user object is initialized
  passwordVisible = false;
  showChangeEmailModal = false;
  showChangePasswordModal = false;
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  newEmail = '';
  userData: any;
  username: any;
  id: any;
  email: any

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedPayload = atob(token.split('.')[1]);
      this.userData = JSON.parse(decodedPayload);
      console.log("userData: ", this.userData.user)
      this.id = this.userData.user.id;
      this.username = this.userData.user.username;
      this.email = this.userData.user.email;
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  openChangeEmailModal() {
    this.showChangeEmailModal = true;
  }

  closeChangeEmailModal() {
    this.showChangeEmailModal = false;
  }

  openChangePasswordModal() {
    this.showChangePasswordModal = true;
  }

  closeChangePasswordModal() {
    this.showChangePasswordModal = false;
  }

  onChangeEmail() {
    // Handle email change logic here
    // this.userService.changeEmail(this.newEmail).subscribe(
    //   (      response: any) => {
    //     console.log('Email changed successfully:', response);
    //     this.user.email = this.newEmail; // Update user email
    //     this.closeChangeEmailModal();
    //   },
    //   (      error: any) => {
    //     console.error('Error changing email:', error);
    //   }
    // );
  }

  onChangePassword() {
    if (this.newPassword !== this.confirmPassword) {
      console.error('New passwords do not match');
      return;
    }
    this.userService.changePassword(this.id, this.oldPassword, this.newPassword, this.confirmPassword).subscribe(
      (      response: any) => {
        console.log('Password changed successfully:', response);
        this.closeChangePasswordModal();
      },
      (      error: any) => {
        console.error('Error changing password:', error);
      }
    );
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor( private auth: AuthService,private router: Router) {}

  login() {
    this.auth.login({
      email: this.email,
      password: this.password,
      role: '' // You can remove this if role is no longer used for login
    }).subscribe({
      next: (res) => {
        if (res.requires2FA) {
          // Save email temporarily so the 2FA component can access it
          localStorage.setItem('pendingEmail', this.email);
          this.router.navigate(['/2fa']);
        } else {
          this.auth.saveToken(res.token!);
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => alert('Login failed')
    });
  }  
}

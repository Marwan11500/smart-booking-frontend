import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-factor',
  imports: [CommonModule, FormsModule],
  templateUrl: './two-factor.component.html',
  styleUrl: './two-factor.component.scss'
})
export class TwoFactorComponent {
  email: string = '';
  code: string = '';
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {
    const storedEmail = localStorage.getItem('pendingEmail');
  if (storedEmail) {
    this.email = storedEmail;
  }
  }

  verifyCode() {
    this.auth.verify2FA(this.email, this.code).subscribe({
      next: (res: { token: any; }) => {
        this.auth.saveToken(res.token!);
        this.router.navigate(['/dashboard']);
      },
      error: (err: { error: { message: string; }; }) => {
        console.error('2FA error response:', err);
        this.error = err.error.message || 'Invalid code';
      }
    });
  }
}

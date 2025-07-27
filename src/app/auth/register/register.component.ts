import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  role: string = 'CUSTOMER';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth
      .register({ email: this.email, password: this.password, role: this.role })
      .subscribe({
        next: (res) => {
          this.auth.saveToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Register error:', err);  // ⬅️ Log it
          alert('Registration failed');
        }
      });
  }
}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  isLoading = signal(false);

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
      const { name, email, password } = this.signupForm.value;

      setTimeout(() => {
        if (this.authService.signup(name!, email!, password!)) {
          this.toast.show('Account created successfully!', 'success');
          this.router.navigate(['/']);
        } else {
          this.toast.show('Signup failed', 'error');
        }
        this.isLoading.set(false);
      }, 1000);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}

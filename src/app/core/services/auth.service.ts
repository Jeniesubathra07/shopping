import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  // Signals
  currentUser = signal<User | null>(this.loadUser());
  isAuthenticated = computed(() => !!this.currentUser());

  constructor() { }

  private loadUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(email: string, password: string): boolean {
    // Mock validation
    if (password.length >= 8) {
      // Create mock user
      const user: User = {
        id: 1,
        name: email.split('@')[0], // Use part of email as name
        email: email,
        avatar: undefined // No avatar mainly
      };

      this.setUser(user);
      return true;
    }
    return false;
  }

  signup(name: string, email: string, password: string): boolean {
    if (password.length >= 8) {
      const user: User = {
        id: Math.floor(Math.random() * 1000),
        name,
        email
      };
      this.setUser(user);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }
}

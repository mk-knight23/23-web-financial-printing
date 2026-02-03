import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfile = signal<{ name: string; email: string }>({
    name: 'Guest',
    email: ''
  });

  private userPreferences = signal<{ theme: 'light' | 'dark'; notifications: boolean }>({
    theme: 'light',
    notifications: true
  });

  private userStats = signal<{ totalVisits: number; chequesCreated: number }>({
    totalVisits: 0,
    chequesCreated: 0
  });

  profile = this.userProfile.asReadonly();
  preferences = this.userPreferences.asReadonly();
  stats = this.userStats.asReadonly();

  updateProfile(updates: Partial<{ name: string; email: string }>): void {
    this.userProfile.update(current => ({ ...current, ...updates }));
  }

  updatePreferences(updates: Partial<{ theme: 'light' | 'dark'; notifications: boolean }>): void {
    this.userPreferences.update(current => ({ ...current, ...updates }));
  }

  incrementVisits(): void {
    this.userStats.update(current => ({ ...current, totalVisits: current.totalVisits + 1 }));
  }

  incrementCheques(): void {
    this.userStats.update(current => ({ ...current, chequesCreated: current.chequesCreated + 1 }));
  }
}

import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STORAGE_KEYS } from '../utils/constants';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private platformId = inject(PLATFORM_ID);

  private _totalChequesGenerated = signal<number>(0);
  private _totalPrints = signal<number>(0);
  private _totalTimeSpent = signal<number>(0);
  private _lastSessionDate = signal<string | null>(null);

  readonly totalChequesGenerated = this._totalChequesGenerated.asReadonly();
  readonly totalPrints = this._totalPrints.asReadonly();
  readonly totalTimeSpent = this._totalTimeSpent.asReadonly();
  readonly lastSessionDate = this._lastSessionDate.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      if (stored) {
        const data = JSON.parse(stored);
        this._totalChequesGenerated.set(data.totalChequesGenerated ?? 0);
        this._totalPrints.set(data.totalPrints ?? 0);
        this._totalTimeSpent.set(data.totalTimeSpent ?? 0);
        this._lastSessionDate.set(data.lastSessionDate ?? null);
      }
    } catch {
      console.warn('Failed to load stats');
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(
        STORAGE_KEYS.STATS,
        JSON.stringify({
          totalChequesGenerated: this._totalChequesGenerated(),
          totalPrints: this._totalPrints(),
          totalTimeSpent: this._totalTimeSpent(),
          lastSessionDate: this._lastSessionDate(),
        })
      );
    } catch {
      console.warn('Failed to save stats');
    }
  }

  recordChequeGenerated(): void {
    this._totalChequesGenerated.update(v => v + 1);
    this._lastSessionDate.set(new Date().toISOString());
    this.saveToStorage();
  }

  recordPrint(): void {
    this._totalPrints.update(v => v + 1);
    this.saveToStorage();
  }

  addTimeSpent(seconds: number): void {
    this._totalTimeSpent.update(v => v + seconds);
    this.saveToStorage();
  }

  resetStats(): void {
    this._totalChequesGenerated.set(0);
    this._totalPrints.set(0);
    this._totalTimeSpent.set(0);
    this._lastSessionDate.set(null);
    this.saveToStorage();
  }

  formatTime(): string {
    const seconds = this._totalTimeSpent();
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
}

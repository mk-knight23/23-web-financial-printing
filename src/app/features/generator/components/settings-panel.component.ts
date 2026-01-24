import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, ThemeMode } from '../../../core/services/settings.service';
import { StatsService } from '../../../core/services/stats.service';
import { AudioService } from '../../../core/services/audio.service';
import { KeyboardService } from '../../../core/services/keyboard.service';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (settingsService.showHelp()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" (click)="close()">
        <div class="bg-white dark:bg-financial-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" (click)="$event.stopPropagation()">
          <div class="p-8">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-3xl font-black dark:text-white">⚙️ Settings</h2>
              <button (click)="close()" class="p-2 rounded-full hover:bg-financial-100 dark:hover:bg-financial-700 transition-colors">
                <span class="text-2xl">✕</span>
              </button>
            </div>

            <div class="space-y-8">
              <div class="space-y-4">
                <h3 class="text-lg font-bold dark:text-white">🎨 Theme</h3>
                <div class="flex gap-3">
                  @for (mode of themeModes; track mode.value) {
                    <button
                      (click)="setTheme(mode.value)"
                      [class]="settingsService.theme() === mode.value
                        ? 'bg-accent-primary text-white'
                        : 'bg-financial-100 dark:bg-financial-700 text-financial-700 dark:text-financial-200 hover:bg-financial-200 dark:hover:bg-financial-600'"
                      class="px-4 py-2 rounded-xl font-medium transition-all"
                    >
                      {{ mode.label }}
                    </button>
                  }
                </div>
              </div>

              <div class="space-y-4">
                <h3 class="text-lg font-bold dark:text-white">🔊 Sound Effects</h3>
                <button
                  (click)="toggleSound()"
                  class="w-full flex items-center justify-between p-4 bg-financial-50 dark:bg-financial-900/50 rounded-2xl"
                >
                  <span class="font-medium dark:text-white">Enable Sound</span>
                  <span [class]="settingsService.soundEnabled() ? 'text-emerald-500' : 'text-financial-400'">
                    {{ settingsService.soundEnabled() ? '✓ Enabled' : '✕ Disabled' }}
                  </span>
                </button>
              </div>

              <div class="space-y-4">
                <h3 class="text-lg font-bold dark:text-white">📊 Statistics</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 bg-financial-50 dark:bg-financial-900/50 rounded-2xl text-center">
                    <div class="text-3xl font-black text-accent-primary">{{ statsService.totalChequesGenerated() }}</div>
                    <div class="text-sm text-financial-500 dark:text-financial-400">Cheques Generated</div>
                  </div>
                  <div class="p-4 bg-financial-50 dark:bg-financial-900/50 rounded-2xl text-center">
                    <div class="text-3xl font-black text-accent-secondary">{{ statsService.totalPrints() }}</div>
                    <div class="text-sm text-financial-500 dark:text-financial-400">Prints / Exports</div>
                  </div>
                  <div class="p-4 bg-financial-50 dark:bg-financial-900/50 rounded-2xl text-center">
                    <div class="text-3xl font-black text-accent-primary">{{ statsService.formatTime() }}</div>
                    <div class="text-sm text-financial-500 dark:text-financial-400">Time Spent</div>
                  </div>
                  <div class="p-4 bg-financial-50 dark:bg-financial-900/50 rounded-2xl text-center">
                    <div class="text-3xl font-black text-accent-secondary">{{ statsService.lastSessionDate() ? 'Today' : 'Never' }}</div>
                    <div class="text-sm text-financial-500 dark:text-financial-400">Last Session</div>
                  </div>
                </div>
                <button
                  (click)="resetStats()"
                  class="w-full p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
                >
                  Reset Statistics
                </button>
              </div>

              <div class="space-y-4">
                <h3 class="text-lg font-bold dark:text-white">⌨️ Keyboard Shortcuts</h3>
                <div class="space-y-2">
                  @for (shortcut of keyboardService.getShortcuts(); track shortcut.key) {
                    <div class="flex items-center justify-between p-3 bg-financial-50 dark:bg-financial-900/50 rounded-xl">
                      <span class="dark:text-white">{{ shortcut.action }}</span>
                      <kbd class="px-3 py-1 text-sm font-mono bg-financial-200 dark:bg-financial-700 rounded-lg dark:text-white">{{ shortcut.key }}</kbd>
                    </div>
                  }
                </div>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-financial-200 dark:border-financial-700">
              <p class="text-center text-financial-500 dark:text-financial-400 text-sm">
                ChequeGen v1.0.0 • Built with Angular 19 & Signals
              </p>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class SettingsPanelComponent {
  settingsService = inject(SettingsService);
  statsService = inject(StatsService);
  private audioService = inject(AudioService);
  keyboardService = inject(KeyboardService);

  themeModes: { value: ThemeMode; label: string }[] = [
    { value: 'dark', label: '🌙 Dark' },
    { value: 'light', label: '☀️ Light' },
    { value: 'system', label: '💻 System' },
  ];

  close(): void {
    this.audioService.playClick();
    this.settingsService.toggleHelp();
  }

  setTheme(mode: ThemeMode): void {
    this.audioService.playClick();
    this.settingsService.setTheme(mode);
  }

  toggleSound(): void {
    this.settingsService.toggleSound();
    this.audioService.playSuccess();
  }

  resetStats(): void {
    this.audioService.playClick();
    if (confirm('Are you sure you want to reset all statistics?')) {
      this.statsService.resetStats();
      this.audioService.playSuccess();
    }
  }
}

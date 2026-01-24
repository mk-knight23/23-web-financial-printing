import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequeFormComponent } from './features/generator/components/cheque-form.component';
import { LivePreviewComponent } from './features/generator/components/live-preview.component';
import { SettingsPanelComponent } from './features/generator/components/settings-panel.component';
import { ChequeService } from './core/services/cheque.service';
import { SettingsService } from './core/services/settings.service';
import { AudioService } from './core/services/audio.service';
import { KeyboardService } from './core/services/keyboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChequeFormComponent, LivePreviewComponent, SettingsPanelComponent],
  template: `
    <div class="min-h-screen transition-colors duration-300" [class.dark]="settingsService.isDarkMode()" [class.light]="!settingsService.isDarkMode()">
      <!-- Top Navigation -->
      <nav class="bg-white dark:bg-financial-800 border-b border-financial-200 dark:border-financial-700 px-6 py-4 flex justify-between items-center shadow-sm">
        <div class="flex items-center space-x-3">
          <div class="bg-accent-primary p-2 rounded-xl">
            <span class="text-white font-bold text-xl">CQ</span>
          </div>
          <h1 class="text-xl font-black tracking-tight dark:text-white">Cheque<span class="text-accent-primary">Gen</span></h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <button (click)="toggleTheme()" class="p-2 rounded-full hover:bg-financial-100 dark:hover:bg-financial-700 transition-colors">
            @if (settingsService.isDarkMode()) {
              <span class="text-xl">☀️</span>
            } @else {
              <span class="text-xl">🌙</span>
            }
          </button>
          <button (click)="openSettings()" class="p-2 rounded-full hover:bg-financial-100 dark:hover:bg-financial-700 transition-colors">
            <span class="text-xl">⚙️</span>
          </button>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          
          <!-- Control Panel -->
          <div class="xl:col-span-4 space-y-8">
            <div class="space-y-2">
              <h2 class="text-3xl font-black tracking-tight dark:text-white">Generate Cheque</h2>
              <p class="text-financial-500 dark:text-financial-400">Fill in the details to generate your professional bank cheque.</p>
            </div>

            <div class="glass p-8 rounded-[2rem] shadow-xl">
              <app-cheque-form></app-cheque-form>
            </div>
            
            <!-- Security Notice -->
            <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 flex space-x-3">
              <span class="text-emerald-500">🛡️</span>
              <p class="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                This is a generation tool for documentation and organizational purposes. Always verify with your bank's actual security standards.
              </p>
            </div>
          </div>

          <!-- Preview & Export -->
          <div class="xl:col-span-8 flex flex-col items-center">
            <div class="sticky top-12 space-y-8 w-full flex flex-col items-center">
               <div class="text-center space-y-1">
                 <span class="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary">Live Preview</span>
                 <h3 class="text-xl font-bold dark:text-white">Professional Rendering</h3>
               </div>
               
               <div class="w-full overflow-x-auto pb-8 custom-scrollbar flex justify-center">
                 <app-live-preview class="scale-75 md:scale-90 lg:scale-100 origin-top"></app-live-preview>
               </div>
            </div>
          </div>

        </div>
      </main>

      <footer class="mt-20 border-t border-financial-200 dark:border-financial-700 py-12 text-center text-financial-400 text-sm">
        <p>&copy; 2026 ChequeGen Architect. Built with Angular 19 & Signals.</p>
      </footer>

      <app-settings-panel></app-settings-panel>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-financial-200 dark:bg-financial-700 rounded-full; }
  `]
})
export class App {
  settingsService = inject(SettingsService);
  private audioService = inject(AudioService);
  private keyboardService = inject(KeyboardService);

  constructor() {
    effect(() => {
      this.settingsService.isDarkMode();
    });

    effect(() => {
      const action = this.keyboardService.lastAction();
      if (action !== 'none') {
        this.handleAction(action);
      }
    });
  }

  private handleAction(action: string): void {
    switch (action) {
      case 'help':
        this.settingsService.toggleHelp();
        break;
      case 'close':
        if (this.settingsService.showHelp()) {
          this.settingsService.toggleHelp();
        }
        break;
    }
  }

  toggleTheme(): void {
    this.audioService.playClick();
    const current = this.settingsService.theme();
    const next: 'dark' | 'light' | 'system' = current === 'dark' ? 'light' : current === 'light' ? 'system' : 'dark';
    this.settingsService.setTheme(next);
  }

  openSettings(): void {
    this.audioService.playClick();
    this.settingsService.toggleHelp();
  }
}

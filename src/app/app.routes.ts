import { Routes } from '@angular/router';
import { App } from './app.component';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'stats', component: App },
  { path: 'settings', component: App },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

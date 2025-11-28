import { Routes } from '@angular/router';
import { Home } from './home/home';
export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/route').then(
        (m) => m.ABOUT_ROUTES
      ),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/tasks/tasks-page/route').then(
        (m) => m.TASKS_ROUTES
      ),
  },
  { path: '**', redirectTo: 'home' },
];

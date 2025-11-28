import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/tasks/tasks-page/route').then(
        (m) => m.TASKS_ROUTES
      ),
  },
  { path: '**', redirectTo: 'home' },
];

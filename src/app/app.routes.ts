import { Routes } from '@angular/router';

import { AssociationsComponent } from './features/associations/associations.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: 'plans',
    loadChildren: () =>
      import('./features/plans/plans.routes').then((m) => m.PLANS_ROUTES),
  },
  {
    path: 'associations',
    loadChildren: () =>
      import('./features/associations/associations.routes').then(
        (m) => m.ASSOCIATIONS_ROUTES
      ),
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

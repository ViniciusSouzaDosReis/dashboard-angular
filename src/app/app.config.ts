import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './core/services/api.service';
import { appReducers } from './core/state/app.reducer';
import { UsersService } from './features/users/services/users.service';
import { DashboardService } from './features/dashboard/services/home.service';
import { UsersEffects } from './features/users/state/users.effects';
import { DashboardEffects } from './features/dashboard/state/dashboard.effects';
import { PlansService } from './features/plans/services/plans.service';
import { PlansEffects } from './features/plans/state/plans.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideStore(appReducers),
    provideEffects([UsersEffects, DashboardEffects, PlansEffects]),
    ApiService,
    UsersService,
    DashboardService,
    PlansService,
  ],
};

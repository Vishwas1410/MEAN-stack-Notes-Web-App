import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { NgxsModule } from '@ngxs/store';
import { NoteState } from './store/NoteState';
import { UserState } from './store/UserState';
import { TaskState } from './store/TaskState';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

export const appConfig: ApplicationConfig = {
  providers: [provideCharts(withDefaultRegisterables()),provideRouter(routes,withRouterConfig({
    onSameUrlNavigation: "reload",
  })),importProvidersFrom(NgxsModule.forRoot([NoteState,UserState,TaskState]),HttpClientModule),
  provideHttpClient(withInterceptors([httpInterceptor]))]
};

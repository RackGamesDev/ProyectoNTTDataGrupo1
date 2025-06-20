import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  provideAnimations();


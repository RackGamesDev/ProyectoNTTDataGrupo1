import { Routes } from '@angular/router';
import { PruebasComponent } from './shared/components/pruebas/pruebas.component';


export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'pruebas',
        component: PruebasComponent
    },
    {
        path: 'user-home',
        loadChildren: () => import('./modules/user-home/user-home.module').then(m => m.UserHomeModule)
    }
];

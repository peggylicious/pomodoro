import { Route } from'@angular/router';

export const routes: Route[] = [
 {
   path:'home',
   loadComponent: () => import('./home/home.page').then((m) =>m.HomePage),
 },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

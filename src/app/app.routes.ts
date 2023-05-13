import { Route } from'@angular/router';
import { TasksResolver } from './tasks/utils/tasks.resolver';
import { AuthGuard } from './auth/utils/auth.guard';

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
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/feature/task-shell/task-shell.routes').then( m => m.taskRoutes),
    canActivate: [AuthGuard],
    resolve: {
      taskxx: TasksResolver
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/feature/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/feature/login/login.page').then( m => m.LoginPage)
  },
];

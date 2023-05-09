import { Route } from'@angular/router';
import { TasksResolver } from './tasks/utils/tasks.resolver';

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
    resolve: {
      taskxx: TasksResolver
    }
  },
];

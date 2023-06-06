import { Route } from'@angular/router';
import { TodaysTasksResolver } from '../../utils/todays-task.resolver';
import { TasksResolver } from '../../utils/tasks.resolver';

export const taskRoutes: Route[] = [
 {
   path:'',
   loadComponent: () => import('../task-container/task-container.page').then((m) =>m.TaskContainerPage),
  //  resolve: {
  //   taskxx: TodaysTasksResolver
  // },
   children: [
    {
      path:'home',
      loadComponent: () => import('../task-home/task-home.page').then((m) =>m.TaskHomePage),
      resolve: {
        todaysTasks: TasksResolver
      },
     },
    {
      path:'all',
      loadComponent: () => import('../task-list/task-list.page').then((m) =>m.TaskListPage),

    },
    {
      path: ':id/task-timer',
      loadComponent: () => import('../task-focus-timer/task-focus-timer.page').then( m => m.TaskFocusTimerPage)
    },
    {
      path:'add',
      loadComponent: () => import('../task-add/task-add.page').then((m) =>m.TaskAddPage),

    },
    // {
    //   path: '',
    //   redirectTo: 'tasks/all',
    //   pathMatch: 'full'
    // }
   ]
 },
//  {
//   path:'all',
//   loadComponent: () => import('../task-list/task-list.page').then((m) =>m.TaskListPage),
// },
// ]
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'task-container',
  //   loadComponent: () => import('./tasks/feature/task-container/task-container.page').then( m => m.TaskContainerPage)
  // },
];

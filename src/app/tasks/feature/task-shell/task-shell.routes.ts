import { Route } from'@angular/router';

export const taskRoutes: Route[] = [
 {
   path:'',
   loadComponent: () => import('../task-container/task-container.page').then((m) =>m.TaskContainerPage),
   children: [
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

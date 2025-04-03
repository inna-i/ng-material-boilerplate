import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        data: {
          icon: 'desktop_windows',
          title: 'Dashboard',
        },
        loadChildren: () => import('./components/dashboard/dashboard.routes'),
      },
      {
        path: 'roles-dd',
        title: 'Roles D&D',
        data: {
          icon: 'drag_indicator',
          title: 'D&D',
        },
        loadChildren: () => import('./components/roles-drag-drop/roles-drag-drop.routes'),
      },
      {
        path: 'table',
        title: 'Table',
        data: {
          icon: 'table_chart',
          title: 'Table',
        },
        loadChildren: () => import('./components/table/table.routes'),
      },
      {
        path: 'address-form',
        title: 'Address Form',
        data: {
          icon: 'home',
          title: 'Address Form',
        },
        loadChildren: () =>
          import('./components/address-form/address-form.routes'),
      },
      {
        path: 'tree',
        title: 'Tree',
        data: {
          icon: 'account_tree',
          title: 'Tree',
        },
        loadChildren: () => import('./components/tree/tree.routes'),
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

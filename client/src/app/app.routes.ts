import { Routes } from '@angular/router';

import { RepositoryListComponent } from './repository-list/components/repository-list.component';
import { RepositoryDetailsComponent } from './repository-details/components/repository-details.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: RepositoryListComponent },
  {
    path: 'repository',
    component: RepositoryDetailsComponent
  },
  {
    path: 'repository/:id',
    component: RepositoryDetailsComponent
  }
];

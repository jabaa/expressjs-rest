import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RepositoryListComponent } from './components/repository-list.component';
import { RepositoryListItemComponent } from './components/repository-list-item.component';
import { RepositoryListService } from './services/repository-list.service';
import { RepositoryListPaginationPipe } from './pipes/repository-list-pagination.pipe';
import { RepositoryListDeleteConfirmationComponent } from './components/repository-list-delete-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    RepositoryListComponent,
    RepositoryListItemComponent,
    RepositoryListPaginationPipe,
    RepositoryListDeleteConfirmationComponent
  ],
  providers: [
    RepositoryListService,
    RepositoryListPaginationPipe
  ],
  exports: [
    RepositoryListComponent
  ]
})
export class RepositoryListModule {}

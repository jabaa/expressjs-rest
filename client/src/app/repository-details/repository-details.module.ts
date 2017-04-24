import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RepositoryDetailsComponent } from './components/repository-details.component';
import { RepositoryDetailsService } from './services/repository-details.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RepositoryDetailsComponent
  ],
  providers: [
    RepositoryDetailsService
  ],
  exports: [
    RepositoryDetailsComponent
  ]
})
export class RepositoryDetailsModule {}

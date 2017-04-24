import { Component, EventEmitter } from '@angular/core';

import { RepositoryListService } from '../services/repository-list.service';
import { RepositoryListInterface } from '../models/repository-list.interface';
import { RepositoryDetailsInterface } from '../../repository-details/models/repository-details.interface';

@Component({
  moduleId: module.id,
  templateUrl: './repository-list.component.html'
})
export class RepositoryListComponent {
  public list: RepositoryListInterface;
  public page = 0;
  public itemsPerPage = 10;

  public modalEvent = new EventEmitter<{method: any, data: RepositoryDetailsInterface}>();

  constructor(private repositoryListService: RepositoryListService) {
    this.reloadList();
  }

  public get showPagination(): boolean {
    return this.list && this.list.length > this.itemsPerPage;
  }

  public get pages(): number[] {
    return !this.list ? [1] : Array(this.list.length / this.itemsPerPage).fill(0).map((el: number, idx: number) => idx + 1);
  }

  public goToPage(page: number) {
    this.page = page;
  }

  public openDeleteConfirmation(repository: RepositoryDetailsInterface) {
    this.modalEvent.emit({method: 'show', data: repository});
  }

  public reloadList() {
    this.repositoryListService.getList()
      .subscribe((response: RepositoryListInterface) => {
        this.list = response;
      });
  }
}

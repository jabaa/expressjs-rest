import { Pipe, PipeTransform } from '@angular/core';

import { RepositoryListInterface } from '../models/repository-list.interface';

@Pipe({
  name: 'repositoryListPagination'
})
export class RepositoryListPaginationPipe implements PipeTransform {
  transform(list: RepositoryListInterface, page?: number, itemsPerPage?: number) {
    if (!list) {
      list = [];
    }
    if (!page) {
      page = 1;
    }
    if (!itemsPerPage) {
      itemsPerPage = 10;
    }
    let start = (page) * itemsPerPage;
    if (start >= list.length) {
      start = list.length - (list.length % itemsPerPage);
    }
    let end = (page + 1) * itemsPerPage;
    if (end >= list.length) {
      end = list.length;
    }
    return list.slice(start, end);
  }
}

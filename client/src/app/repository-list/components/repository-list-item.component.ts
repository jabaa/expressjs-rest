import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RepositoryDetailsInterface } from '../../repository-details/models/repository-details.interface';

@Component({
  moduleId: module.id,
  selector: 'app-repository-list-item',
  templateUrl: './repository-list-item.component.html'
})
export class RepositoryListItemComponent {
  @Input() item: RepositoryDetailsInterface;
  @Input() index: number;

  @Output() openDeleteConfirmation = new EventEmitter<RepositoryDetailsInterface>();
}

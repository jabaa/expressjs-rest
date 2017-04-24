import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepositoryDetailsInterface } from '../../repository-details/models/repository-details.interface';
import { RepositoryListService } from '../services/repository-list.service';

declare var $;

@Component({
  moduleId: module.id,
  selector: 'app-repository-list-delete-confirmation',
  templateUrl: './repository-list-delete-confirmation.component.html'
})
export class RepositoryListDeleteConfirmationComponent implements OnInit {

  @Input() eventListener: EventEmitter<{method: any, data: RepositoryDetailsInterface}>;
  @Output() reloadList = new EventEmitter();

  public repository: RepositoryDetailsInterface;

  constructor(private repositoryListService: RepositoryListService) {}

  ngOnInit() {
    this.eventListener
      .subscribe((event: {method: any, data: RepositoryDetailsInterface}) => {
        this.repository = event.data;
        $('#repository-list-delete-confirmation').modal(event.method);
      });
  }

  public deleteRepository() {
    this.repositoryListService.deleteRepository(this.repository)
      .subscribe((response: boolean) => {
        if (response) {
          this.reloadList.emit();
        }
      });
  }
}

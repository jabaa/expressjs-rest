import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RepositoryDetailsInterface } from '../../repository-details/models/repository-details.interface';

@Injectable()
export class RepositoryListService {
  constructor(private http: Http) {}

  public getList() {
    return this.http.get('/api/repositories')
      .map((response: Response) => response.json());
  }

  public deleteRepository(repository: RepositoryDetailsInterface) {
    return this.http.delete('/api/repository/' + repository._id)
      .map((response: Response) => response.json());
  }
}

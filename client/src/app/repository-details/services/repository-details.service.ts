import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RepositoryDetailsInterface } from '../models/repository-details.interface';

@Injectable()
export class RepositoryDetailsService {

  constructor(private http: Http) {}

  public getRepositoryDetails(id: string) {
    return this.http.get('/api/repository/' + id)
      .map((response: Response) => response.json());
  }

  public updateRepositoryDetails(repository: RepositoryDetailsInterface) {
    return this.http.put('/api/repository/' + repository._id, repository)
      .map((response: Response) => response.json());
  }

  public createRepository(repository: RepositoryDetailsInterface) {
    return this.http.post('/api/repository', repository)
      .map((response: Response) => response.json());
  }
}

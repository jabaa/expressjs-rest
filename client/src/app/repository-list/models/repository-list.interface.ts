import { RepositoryDetailsInterface } from '../../repository-details/models/repository-details.interface';

export interface RepositoryListInterface {
  [idx: number]: RepositoryDetailsInterface;
  length: number;
  slice: (start?: number, end?: number) => RepositoryListInterface
}

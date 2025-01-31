import { Either } from '../Utils/Either';

export interface IAplicationService<V, T> {
  execute(s: V): Promise<Either<T, Error>>;
}
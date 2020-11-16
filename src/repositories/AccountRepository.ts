import { Account, OrderBy } from "../types";

export interface CreateParameters {
  firstName: string;
  lastName: string;
}

export interface FindParameters {
  first: number;
  after?: number;
  firstName?: string;
  lastName?: string;
  orderBy?: OrderBy[];
}

export interface CountParameters {
  firstName?: string;
  lastName?: string;
}

export default interface AccountRepository {
  get(id: number): Promise<Account>;

  getMany(ids: number[]): Promise<Account[]>;

  create(params: CreateParameters): Promise<Account>;

  update(id: number, firstName: string, lastName: string): Promise<Account>;

  find(params: FindParameters): Promise<Account[]>;

  count(params: CountParameters): Promise<number>;
}

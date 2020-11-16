import { Transaction } from "../types";

export interface FindParameters {
  first: number;
  after?: number;
  accountId?: number;
  amount?: string;
}

export interface CountParameters {
  accountId?: number;
  amount?: string;
}

export default interface TransactionRepository {
  get(id: number): Promise<Transaction>;

  find(params: FindParameters): Promise<Transaction[]>;

  count(params: CountParameters): Promise<number>;
}

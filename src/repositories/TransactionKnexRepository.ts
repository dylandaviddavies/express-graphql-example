import TransactionRepository, {
  FindParameters,
  CountParameters,
} from "./TransactionRepository";
import database from "../database";
import { Transaction } from "../types";

export default class TransactionKnexRepository
  implements TransactionRepository {
  async get(id: number): Promise<Transaction> {
    return database.select().from("transaction").where("id", id).first();
  }

  async find(params: FindParameters): Promise<Transaction[]> {
    const { first, after, accountId, amount } = params;

    return database
      .select()
      .from("transaction")
      .modify((queryBuilder) => {
        if (typeof after !== "undefined" && after !== null) {
          queryBuilder.offset(after);
        }

        if (typeof accountId !== "undefined" && accountId !== null) {
          queryBuilder.where("accountId", accountId);
        }

        if (typeof amount !== "undefined" && amount !== null) {
          queryBuilder.where("amount", "like", `%${amount}%`);
        }
      })
      .limit(first);
  }

  async count(params: CountParameters): Promise<number> {
    const { accountId, amount } = params;

    return database
      .count({ count: "*" })
      .from("transaction")
      .modify((queryBuilder) => {
        if (typeof accountId !== "undefined" && accountId !== null) {
          queryBuilder.where("transactionId", accountId);
        }

        if (typeof amount !== "undefined" && amount !== null) {
          queryBuilder.where("amount", "like", `%${amount}%`);
        }
      })
      .first()
      .then((result) => result.count);
  }
}

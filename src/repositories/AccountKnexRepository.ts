import AccountRepository, {
  CreateParameters,
  FindParameters,
  CountParameters,
} from "./AccountRepository";
import database from "../database";
import { Account } from "../types";

export default class AccountKnexRepository implements AccountRepository {
  async get(id: number): Promise<Account> {
    return database.select().from("account").where("id", id).first();
  }

  getMany(ids: number[]): Promise<Account[]> {
    return database.select().from("account").whereIn("id", ids);
  }

  async find(params: FindParameters): Promise<Account[]> {
    const { first, after, firstName, lastName, orderBy } = params;

    return database
      .select()
      .from("account")
      .modify((queryBuilder) => {
        if (typeof after !== "undefined" && after !== null) {
          queryBuilder.offset(after);
        }

        if (typeof firstName !== "undefined" && firstName !== null) {
          queryBuilder.where("firstName", "like", `%${firstName}%`);
        }

        if (typeof lastName !== "undefined" && lastName !== null) {
          queryBuilder.where("lastName", "like", `%${lastName}%`);
        }

        if (Array.isArray(orderBy)) {
          orderBy.forEach((ob) => queryBuilder.orderBy(ob.field, ob.direction));
        }
      })
      .limit(first);
  }

  async count(params: CountParameters): Promise<number> {
    const { firstName, lastName } = params;

    return database
      .count({ count: "*" })
      .from("account")
      .modify((queryBuilder) => {
        if (typeof firstName !== "undefined" && firstName !== null) {
          queryBuilder.where("firstName", "like", `%${firstName}%`);
        }

        if (typeof lastName !== "undefined" && lastName !== null) {
          queryBuilder.where("lastName", "like", `%${lastName}%`);
        }
      })
      .first()
      .then((result) => result.count);
  }

  async create(params: CreateParameters): Promise<Account> {
    return database
      .insert({
        firstName: params.firstName,
        lastName: params.lastName,
      })
      .returning("id")
      .into("account")
      .then((ids) => {
        return this.get(ids[0]);
      });
  }

  async update(
    id: number,
    firstName: string,
    lastName: string
  ): Promise<Account> {
    return database
      .table("account")
      .where("id", id)
      .modify((queryBuilder) => {
        if (typeof firstName !== "undefined" && firstName !== null) {
          queryBuilder.update("firstName", firstName);
        }

        if (typeof lastName !== "undefined" && lastName !== null) {
          queryBuilder.update("lastName", lastName);
        }
      })
      .then((updatedRows) => {
        if (updatedRows.length === 0) {
          throw new Error("Account not found!");
        }
        return updatedRows;
      })
      .then(() => {
        return this.get(id);
      });
  }
}

import DataLoader from "dataloader";
import AccountRepository from "../repositories/AccountRepository";
import TransactionRepository from "../repositories/TransactionRepository";
import AuthorRepository from "../repositories/AuthorRepository";
import QuoteRepository from "../repositories/QuoteRepository";
import { Author, Account } from "../types";

interface RepositoriesContext {
  author: AuthorRepository;
  quote: QuoteRepository;
  account: AccountRepository;
  transaction: TransactionRepository;
}

interface LoadersContext {
  author: DataLoader<number, Author>;
  account: DataLoader<number, Account>;
}

export default interface Context {
  repositories: RepositoriesContext;
  loaders: LoadersContext;
}

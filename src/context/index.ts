import AccountRepository from "../repositories/AccountKnexRepository";
import TransactionRepository from "../repositories/TransactionKnexRepository";
import Context from "./Context";
import AuthorRepository from "../repositories/AuthorKnexRepository";
import QuoteRepository from "../repositories/QuoteKnexRepository";
import authorLoader from "../loaders/authorLoader";
import accountLoader from "../loaders/accountLoader";

const context: Context = {
  repositories: {
    author: new AuthorRepository(),
    quote: new QuoteRepository(),
    transaction: new TransactionRepository(),
    account: new AccountRepository(),
  },
  loaders: {
    author: authorLoader,
    account: accountLoader,
  },
};

export default context;

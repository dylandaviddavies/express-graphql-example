import { GraphQLObjectType } from "graphql";
import author from "./queries/author";
import authors from "./queries/authors";
import quote from "./queries/quote";
import quotes from "./queries/quotes";
import transaction from "./queries/transaction";
import transactions from "./queries/transactions";
import account from "./queries/account";
import accounts from "./queries/accounts";

const query = new GraphQLObjectType({
  name: "Query",
  fields: (): any => ({
    author,
    authors,
    quote,
    quotes,
    transaction,
    transactions,
    account,
    accounts,
  }),
});

export default query;

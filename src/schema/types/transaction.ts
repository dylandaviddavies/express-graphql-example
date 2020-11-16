import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import Context from "../../context/Context";
import account from "./account";
import { formatDate } from "../../utils/functions";
import { Transaction, Account } from "../../types";

const transaction = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Globally unique ID of the transaction",
      resolve: (obj: Transaction): string => {
        return Buffer.from(`transaction-${obj.id}`).toString("base64");
      },
    },
    _id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Database ID of the transaction",
      resolve: (obj: Transaction): number => {
        return obj.id;
      },
    },
    amount: {
      type: GraphQLFloat,
      description: "Amount of the transaction",
      resolve: (obj: Transaction): number => {
        return obj.amount;
      },
    },
    account: {
      type: account,
      description: "Account of the transaction",
      resolve: (obj: Transaction, args, context: Context): Promise<Account> => {
        return context.loaders.account.load(obj.accountId);
      },
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      description: "",
      resolve: (obj: Transaction): string => {
        return formatDate(new Date(obj.createdAt));
      },
    },
  }),
});

export default transaction;

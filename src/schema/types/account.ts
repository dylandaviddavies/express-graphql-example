import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from "graphql";
import Context from "../../context/Context";
import { formatDate } from "../../utils/functions";
import transactionConnection from "./connections/transactionConnection";
import nodesToEdges from "../queries/nodesToEdges";
import toConnection from "../queries/toConnection";
import { Account } from "../../types";

const account = new GraphQLObjectType({
  name: "Account",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Globally unique ID of the account",
      resolve: (obj: Account): string => {
        return Buffer.from(`account-${obj.id}`).toString("base64");
      },
    },
    _id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Database ID of the account",
      resolve: (obj: Account): number => {
        return obj.id;
      },
    },
    firstName: {
      type: GraphQLNonNull(GraphQLString),
      description: "Account's first name",
      resolve: (obj: Account): string => {
        return obj.firstName;
      },
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString),
      description: "Account's last name",
      resolve: (obj: Account): string => {
        return obj.lastName;
      },
    },
    transactions: {
      type: transactionConnection,
      args: {
        first: {
          defaultValue: 10,
          description:
            "Limits the number of results returned in the page. Defaults to 10.",
          type: GraphQLInt,
        },
        after: {
          defaultValue: "Y3Vyc29yMA==", // base64encode('cursor0')
          description:
            "The cursor value of an item returned in previous page. An alternative to in integer offset.",
          type: GraphQLString,
        },
        amount: {
          type: GraphQLFloat,
        },
      },
      resolve: async (obj: Account, args, context: Context): Promise<any> => {
        const after =
          typeof args.after === "undefined" || args.after === null
            ? 0
            : parseInt(
                Buffer.from(args.after, "base64")
                  .toString("ascii")
                  .replace("cursor", ""),
                10
              );
        const transactions = await context.repositories.transaction.find({
          first: args.first,
          after,
          accountId: obj.id,
          amount: args.amount,
        });
        const transactionsCount = await context.repositories.transaction.count({
          accountId: obj.id,
          amount: args.amount,
        });
        const edges = nodesToEdges(transactions, after);
        return toConnection(
          edges,
          transactionsCount,
          edges.length === args.first,
          after > 0
        );
      },
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      description: "",
      resolve: (obj: Account): string => {
        return formatDate(new Date(obj.createdAt));
      },
    },
  }),
});

export default account;

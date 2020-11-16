import { GraphQLFloat, GraphQLInt, GraphQLString } from "graphql";
import Context from "../../context/Context";
import transactionConnection from "../types/connections/transactionConnection";
import nodesToEdges from "./nodesToEdges";
import toConnection from "./toConnection";

interface TransactionsQueryArguments {
  first: number;
  after: string;
  amount: string;
}

export default {
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
  resolve: async (_, args: TransactionsQueryArguments, context: Context) => {
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
      amount: args.amount,
    });
    const transactionsCount = await context.repositories.transaction.count({
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
};

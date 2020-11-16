import { GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import Context from "../../context/Context";
import accountConnection from "../types/connections/accountConnection";
import accountsOrder from "../types/inputs/accountsOrder";
import nodesToEdges from "./nodesToEdges";
import toConnection from "./toConnection";

interface AccountsQueryArguments {
  first: number;
  after: string;
  firstName: string;
  lastName: string;
  orderBy: any[];
}

export default {
  type: accountConnection,
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
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    orderBy: {
      type: GraphQLList(accountsOrder),
    },
  },
  resolve: async (_, args: AccountsQueryArguments, context: Context) => {
    const after =
      typeof args.after === "undefined" || args.after === null
        ? 0
        : parseInt(
            Buffer.from(args.after, "base64")
              .toString("ascii")
              .replace("cursor", ""),
            10
          );
    const accounts = await context.repositories.account.find({
      first: args.first,
      after,
      firstName: args.firstName,
      lastName: args.lastName,
      orderBy: args.orderBy,
    });
    const accountsCount = await context.repositories.account.count({
      firstName: args.firstName,
      lastName: args.lastName,
    });
    const edges = nodesToEdges(accounts, after);
    return toConnection(
      edges,
      accountsCount,
      edges.length === args.first,
      after > 0
    );
  },
};

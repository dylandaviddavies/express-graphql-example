import { GraphQLObjectType, GraphQLString } from "graphql";
import transaction from "../transaction";

const transactionEdge = new GraphQLObjectType({
  name: "TransactionEdge",
  description: "List of edges.",
  fields: {
    node: {
      description: "The item at the end of the edge.",
      type: transaction,
    },
    cursor: {
      description: "A cursor for pagination.",
      type: GraphQLString,
    },
  },
});

export default transactionEdge;

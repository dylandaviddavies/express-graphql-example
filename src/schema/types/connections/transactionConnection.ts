import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql";
import pageInfo from "../pageInfo";
import transactionEdge from "../edges/transactionEdge";

const transactionConnection = new GraphQLObjectType({
  name: "TransactionConnection",
  fields: {
    totalCount: {
      description: "Identifies the total count of items in the connection.",
      type: GraphQLNonNull(GraphQLInt),
    },
    edges: {
      description: "A list of edges.",
      type: new GraphQLList(transactionEdge),
    },
    pageInfo: {
      type: GraphQLNonNull(pageInfo),
    },
  },
});

export default transactionConnection;

import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql";
import pageInfo from "../pageInfo";
import accountEdge from "../edges/accountEdge";

const accountConnection = new GraphQLObjectType({
  name: "AccountConnection",
  fields: {
    totalCount: {
      description: "Identifies the total count of items in the connection.",
      type: GraphQLNonNull(GraphQLInt),
    },
    edges: {
      description: "A list of edges.",
      type: new GraphQLList(accountEdge),
    },
    pageInfo: {
      type: GraphQLNonNull(pageInfo),
    },
  },
});

export default accountConnection;

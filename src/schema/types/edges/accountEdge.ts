import { GraphQLObjectType, GraphQLString } from "graphql";
import account from "../account";

const accountEdge = new GraphQLObjectType({
  name: "AccountEdge",
  description: "List of edges.",
  fields: {
    node: {
      description: "The item at the end of the edge.",
      type: account,
    },
    cursor: {
      description: "A cursor for pagination.",
      type: GraphQLString,
    },
  },
});

export default accountEdge;

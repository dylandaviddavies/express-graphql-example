import { GraphQLEnumType } from "graphql";

export default new GraphQLEnumType({
  name: "AccountsOrderField",
  values: {
    ID: {
      value: "id",
    },
    CREATED_AT: {
      value: "createdAt",
    },
  },
});

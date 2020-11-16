import { GraphQLInputObjectType, GraphQLNonNull } from "graphql";
import accountsOrderField from "../enums/accountsOrderField";
import direction from "../enums/direction";

const accountsOrder = new GraphQLInputObjectType({
  name: "AccountsOrder",
  fields: {
    field: {
      type: new GraphQLNonNull(accountsOrderField),
    },
    direction: {
      type: new GraphQLNonNull(direction),
    },
  },
});

export default accountsOrder;

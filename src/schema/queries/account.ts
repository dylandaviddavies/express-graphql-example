import { GraphQLID, GraphQLNonNull } from "graphql";
import Context from "../../context/Context";
import { default as accountType } from "../types/account";

const account = {
  type: accountType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_, { id }, context: Context): Promise<any> => {
    return context.repositories.account.get(id);
  },
};

export default account;

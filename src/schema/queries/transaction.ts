import { GraphQLID, GraphQLNonNull } from "graphql";
import Context from "../../context/Context";
import { default as transactionType } from "../types/transaction";

const transaction = {
  type: transactionType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_, { id }, context: Context) => {
    return context.repositories.transaction.get(id);
  },
};

export default transaction;

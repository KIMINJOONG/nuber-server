import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "src/types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(async (_, args:UpdateMyProfileMutationArgs, { req }) : Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        await User.update({id: user.id}, {...args})
    })
  }
};

export default resolvers;

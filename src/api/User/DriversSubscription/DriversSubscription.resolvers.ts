const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: (_, __, { pubSub }) => {
        // driverUpdate -> 그냥 채널이름임 내가 임의로 정해줌
        return pubSub.asyncIterator("driverUpdate");
      }
    }
  }
};

export default resolvers;

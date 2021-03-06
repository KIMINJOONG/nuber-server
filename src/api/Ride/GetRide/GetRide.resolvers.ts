import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { GetRideQueryArgs, GetRideResponse } from "../../../types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetRide: privateResolver(
      async (_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
        const user: User = req.user;
        try {
          const ride = await Ride.findOne({
            id: args.rideId
          });
          //user.isTaken = false;
          //user.isRiding = false;
          //user.save();
          if (ride) {
            if (ride.passengerId === user.id || ride.driverId === user.id) {
              //ride.remove();
              return {
                ok: true,
                error: null,
                ride
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized",
                ride: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Ride not found",
              ride: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;

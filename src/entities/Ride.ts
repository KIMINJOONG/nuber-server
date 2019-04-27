import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { rideStatus } from "..//types/types";
import User from "./User";
import Chat from "./Chat";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
    default: "REQUESTING"
  })
  status: rideStatus;

  @Column({ type: "text" })
  pickUpAddress: string;

  @Column({ type: "double precision", default: 0 })
  pickUpLat: number;

  @Column({ type: "double precision", default: 0 })
  pickUpLng: number;

  @Column({ type: "text" })
  dropOffAddress: string;

  @Column({ type: "double precision", default: 0 })
  dropOffLat: number;

  @Column({ type: "double precision", default: 0 })
  dropOffLng: number;

  @Column({ type: "double precision", default: 0 })
  price: number;

  @Column({ type: "text" })
  distance: string;

  @Column({ type: "text" })
  duration: string;

  //이렇게 하면 typeorm이 자동으로 데이터베이스를 보지 않고도 id를 붙여서 반환해줌
  //typeorm이 driver와 passenger의 foreign key를 찾아서 보여줌. 처음부터 전체객체를 찾아서 보여줄필요가 없다.
  @Column({ nullable: true })
  passengerId: number;

  @ManyToOne(type => User, user => user.ridesAsPassenger)
  passenger: User;

  @Column({ nullable: true })
  driverId: number;

  @ManyToOne(type => User, user => user.ridesAsDriver, { nullable: true })
  driver: User;

  @Column({ nullable: true })
  chatId: number;

  @OneToOne(type => Chat, chat => chat.ride, { nullable: true })
  @JoinColumn()
  chat: Chat;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Ride;

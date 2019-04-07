import {
    BaseEntity,
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryColumn, 
    UpdateDateColumn, 
} from "typeorm";

@Entity()
class Verification extends BaseEntity {
    @PrimaryColumn() id: number
    
    @Column({type: "text"})
    target: string;

    @Column({type: "text"})
    payload: string;

    @Column({type: "text"})
    key: string;

    @Column({type: "boolean", default: false})
    used: boolean;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Verification;
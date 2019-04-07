import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import { 
    BaseEntity, 
    BeforeInsert, 
    BeforeUpdate, 
    Column, 
    Entity,  
    CreateDateColumn, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 
} from "typeorm";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text", unique: true})
    @IsEmail()
    email:string;

    @Column({type: "boolean", default: false})
    verifiedEmail: boolean;

    @Column({type: "text"})
    firstName: string;

    @Column({type: "text"})
    lastName: string;

    @Column({type: "int"})
    age: number;

    @Column({type: "text"})
    password: string;

    @Column({type: "text"})
    phoneNumber: string;

    @Column({type: "boolean", default: false})
    verifiedPhoneNumber: boolean;

    @Column({type: "text"})
    profilePhoto: string;

    
    @Column({type: "boolean", default: false})
    isDriving: boolean;
    
    @Column({type: "boolean", default: false})
    isRiding: boolean;
    
    @Column({type: "boolean", default: false})
    isTaken: boolean;
    
    @Column({type: "double precision", default: 0 })
    lastLng : number;
    
    @Column({type: "double precision", default: 0 })
    lastLat : number;
    
    @Column({type: "double precision", default: 0 })
    lastOrientation: number;
    
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
    
    // fullName은 이미 있는것을 합치는것이므로 함수로 선언
    get fullName(): string{
        return `${this.firstName} ${this.lastName}`;
    }

    // 유저가 입력한 패스워드와 해쉬(암호화)된 패스워드 비교함수 resolver에서 사용예정
    public comparePassword(password: string) : Promise<boolean>{
        return bcrypt.compare(password, this.password);
    }

    // Insert Update하기전 전달받은 패스워드 암호화하는 함수
    @BeforeInsert()
    @BeforeUpdate()
    async savePassword() : Promise<void> {
        if(this.password) {
            const hashedPassword = await this.hashPassword(this.password);
            this.password = hashedPassword;
        }
    }

    private hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BCRYPT_ROUNDS)
    }
    
}

export default User;
import { Column, Entity, JoinColumn } from "typeorm";
import { PrimaryColumn } from "typeorm";
import { User } from "./User";
import { ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid"
@Entity("users_tokens")
class UserTokens {
    @PrimaryColumn('uuid')
    id: string
    @Column('varchar')
    refresh_token: string
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User
    @Column('varchar')
    user_id: string
    @Column('timestamp')
    expires_date: Date
    @Column('timestamp')
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidv4()
        }
    }

}
export { UserTokens }

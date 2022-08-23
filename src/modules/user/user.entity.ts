import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({
    name:'users'
})
export class User{

    @PrimaryGeneratedColumn()
    id:number
   
    @Column({type : 'varchar'})
    name:string
   
    @Column({type : 'varchar' , unique:true})
    unique_id:string

    @Column({type:'varchar'})
    mobile_number:string

    @Column({type : 'varchar'})
    availability_channel_id:string

    @Column({type:'int'})
    workspace_id:number

    @Column({type:'varchar'})
    user_access_token:string

    @CreateDateColumn({type:'timestamp',default: () => 'CURRENT_TIMESTAMP'})
    created_on:Date
}
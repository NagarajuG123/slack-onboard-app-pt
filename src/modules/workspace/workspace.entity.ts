import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name:'workspaces'
})
export class Workspace{
@PrimaryGeneratedColumn()
id:number

@Column({type:'varchar'})
team_id:string

@Column({type:'varchar'})
name:string

@Column({type:'varchar'})
bot_access_token:string

@Column({type:'varchar'})
bot_id:string 

@Column({type:'varchar'})
default_channel:string

@CreateDateColumn({type:'timestamp',default: () => 'CURRENT_TIMESTAMP'})
created_on:Date

@UpdateDateColumn({type:'timestamp'})
updated_at:Date

}
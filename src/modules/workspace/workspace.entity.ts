import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

@CreateDateColumn({type:'timestamp',default: () => 'CURRENT_TIMESTAMP'})
created_on:Date

}
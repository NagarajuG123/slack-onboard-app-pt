import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'message-log'})
export class MessageLog{

@PrimaryGeneratedColumn()
id:number

@Column({type:'text'})
message:string

@Column({type:'varchar'})
sender_whatsapp:string

@CreateDateColumn({type:'timestamp',default:() => 'CURRENT TIMESTAMP'})
received_on:Date

}
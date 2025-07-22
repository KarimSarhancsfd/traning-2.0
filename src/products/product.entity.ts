import { Entity, Column, CreateDateColumn,UpdateDateColumn,DeleteDateColumn,PrimaryGeneratedColumn } from 'typeorm';



const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP(6)';

@Entity({name :'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    title:string;
    @Column()
    description:string;
     @Column()
    price:number;


    @CreateDateColumn({type: 'timestamp with time zone', default: () => CURRENT_TIMESTAMP})
    createdAT:Date;

   @UpdateDateColumn({type: 'timestamp with time zone', default:() => CURRENT_TIMESTAMP, onUpdate: CURRENT_TIMESTAMP})
    updatedAT:Date;
    @DeleteDateColumn({type: 'timestamp with time zone', default:() => CURRENT_TIMESTAMP})
    deletedAT:Date;

}
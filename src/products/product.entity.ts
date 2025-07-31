import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

import { CURRENT_TIMESTAMP } from '../utils/constants';
import {Review} from "../reviews/review.entity";

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  title: string;
  @Column()
  description: string;
  @Column({ type: 'float' })
  price: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
   @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  //IMPORTANT nOTE:
  // The line @OneToMany() reviews: Review[]; is a placeholder for establishing
  // a one-to-many relationship between Product and Review entities in TypeORM.
  // It indicates that a product can have multiple reviews associated with it.





//    Why Use reviews: Review[];
// This declaration sets up a placeholder for storing multiple reviews associated with a product. It’s useful when:
// - You want to retrieve reviews along with product data (especially helpful in joins).
// - You plan to establish a one-to-many relationship between products and reviews.
// However, this line alone doesn’t establish the actual relationship in TypeORM. It just tells TypeScript that your Product will have an array of Review objects. For it to be functional with your database, you’ll need to decorate it properly.


}

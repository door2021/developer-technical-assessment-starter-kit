import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true, default: '{}' })
  imageUrls: string[];

  @Column('numeric')
  price: number;

  @Column()
  location: string;

  @Column('text')
  details: string;

  @Column('numeric')
  sqFtOrArea: number;

  @Column('int', { default: 0 })
  views: number;
}

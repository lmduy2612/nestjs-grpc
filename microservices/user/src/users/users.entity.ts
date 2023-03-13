import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Column({ type: 'varchar', name: 'first_name' })
  public firstName!: string;

  @Column({ type: 'varchar', name: 'last_name' })
  public lastName!: string;

  @Column({ type: 'varchar' })
  public address!: string;

  @Column({ type: 'varchar' })
  public avatar!: string;

  @Column({ type: 'int' })
  public gender!: number;

  @Column({ type: 'int' })
  public role!: number;

  @Column({ type: 'int', name: 'city_id' })
  public cityId!: number;

  @Column({ type: 'int', default: 1 })
  public status!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

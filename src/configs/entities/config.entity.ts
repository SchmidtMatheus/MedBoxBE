import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'configs' })
export class ConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'temperature', nullable: false, type: 'float' })
  temperature: number;

  @Column({ name: 'offset', nullable: false, type: 'float' })
  offset: number;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false, type: 'timestamp' })
  updated_at: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'registries' })
export class RegistryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'temperature', nullable: false, type: 'float' })
  temperature: number;

  @Column({ name: 'humidity', nullable: false, type: 'float' })
  humidity: number;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}

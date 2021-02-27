import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Survey } from "./Survey";
import { User } from "./User";

@Entity('surveys_users')
class SurveyUser {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @Column('integer')
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) this.id = uuid();
  }
}

export { SurveyUser };

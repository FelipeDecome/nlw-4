import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Survey } from "./Survey";
import { User } from "./User";

@Entity('surveys_users')
class SurveyUser {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => User)
  user: User;

  @Column('uuid')
  survey_id: string;

  @OneToOne(() => Survey)
  survey: Survey;

  @Column('integer')
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) this.id = uuid();
  }
}

export { SurveyUser };

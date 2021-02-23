import { getRepository, Repository } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

import { User } from "../entities/User";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      id: uuid(),
      name,
      email,
    });

    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    })
  }
}

export { UsersRepository };

import { User } from "../entities/User";
import { AppError } from "../Errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserService {

  constructor(private usersRepository: IUsersRepository) {}

  public async execute({name, email}: IRequest): Promise<User> {

    const isEmailInUse = await this.usersRepository.findByEmail(email);

    if(isEmailInUse) throw new AppError('Email already in use.');

    const user = await this.usersRepository.create({
      name,
      email,
    });

    return user;
  }

}

export { CreateUserService };

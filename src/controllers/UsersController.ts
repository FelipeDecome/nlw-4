import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import { CreateUserService } from "../services/CreateUserService";

export default class UsersController {

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const usersRepository = new UsersRepository();

    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({
      name,
      email,
    })

    return response.json(user);
  }
}

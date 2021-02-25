import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

let connection: Connection;

describe("Users", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    expect(response.status).toEqual(201);
  });

  it('should fail if email already exists', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    expect(response.status).toEqual(400);
  });

  afterAll(async () => {
    connection.migrations.forEach(async () => connection.undoLastMigration());
  })
});

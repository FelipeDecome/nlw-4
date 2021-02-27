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

  it('should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'a simple title',
      description: 'a simple description',
    });

    expect(response.status).toEqual(201);
  });

  it('should fail if title or description is not provided', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'a simple title',
    });

    expect(response.status).toEqual(400);

    const response2 = await request(app).post('/surveys').send({
      description: 'a simple description',
    });

    expect(response2.status).toEqual(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })
});

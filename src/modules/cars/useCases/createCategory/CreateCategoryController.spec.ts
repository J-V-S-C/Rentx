import { app } from '@shared/infra/http/app';
import { AppDataSource } from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid'

describe("Create Category Controller", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.runMigrations()

        const password = await hash(process.env.ADMIN_PASSWORD!, 8);
        const id = uuidv4()

        await AppDataSource.query(
            `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license) 
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [id, 'admin', 'admin@rentx.com.br', password, true, new Date(), '3821jde'],
        );
    })

    afterAll(async () => {
        await AppDataSource.dropDatabase()
        await AppDataSource.destroy()
    })

    it("Should be able to create a categorie", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: 'admin@rentx.com.br',
            password: process.env.ADMIN_PASSWORD
        })
        const { token } = responseToken.body

        const response = await request(app).post("/categories").send({
            "name": "CategoriesSuperTestName",
            "description": "CategoriesSuperTestDescription"
        }).set({
            authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201);
    })
    it('Should not be able to create a new category with name exists', async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: 'admin@rentx.com.br',
            password: process.env.ADMIN_PASSWORD
        })
        const { token } = responseToken.body

        const response = await request(app).post("/categories").send({
            "name": "CategoriesSuperTestName",
            "description": "CategoriesSuperTestDescription"
        }).set({
            authorization: `Bearer ${token}`
        })
        expect(response.status).toBe(400)

    })
})

import { app } from "@shared/infra/http/app"
import { AppDataSource } from "@shared/infra/typeorm"
import { hash } from "bcrypt"
import request from "supertest"
import { v4 as uuidv4 } from 'uuid'

describe("List Rentals By User Controller", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.runMigrations()

        const password = await hash(process.env.ADMIN_PASSWORD!, 8)
        const id = uuidv4()
        await AppDataSource.query(
            `INSERT INTO users(id, name,email, password, is_admin, created_at, driver_license)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [id, 'admin', 'admin@rentx.com.br', password, true, new Date(), '3821jde']
        )
    })

    afterAll(async () => {
        await AppDataSource.dropDatabase()
        await AppDataSource.destroy()
    })

    it("Should be able to list rentals by user", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: 'admin@rentx.com.br',
            password: process.env.ADMIN_PASSWORD
        })

        const { token } = responseToken.body

        await request(app).post("/rentals").send({
            "id": "1234",
            "car_id": "12345",
            "user_id": token.user_id,
            "expected_return_date": new Date,
        }).set({
            authorization: `Bearer ${token}`
        })

        const response = await request(app).get("/rentals").set({
            authorization: `Bearer ${token}`
        })
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0].id).toEqual("1234")
    })
})

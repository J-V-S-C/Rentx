import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query
        const { password } = request.body
        const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase)

        const res = await resetPasswordUserUseCase.execute({ password, token: String(token) })

        return response.json(res)
    }

}

export { ResetPasswordUserController }

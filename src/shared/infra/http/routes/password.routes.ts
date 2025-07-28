import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRouter = Router()
const sendForgetMailPasswordController = new SendForgotPasswordMailController()

passwordRouter.post('/forgot', sendForgetMailPasswordController.handle)

export { passwordRouter }

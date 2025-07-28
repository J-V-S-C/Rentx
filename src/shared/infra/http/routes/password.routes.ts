import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRouter = Router()
const sendForgetMailPasswordController = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController

passwordRouter.post('/forgot', sendForgetMailPasswordController.handle)
passwordRouter.post('/reset', resetPasswordUserController.handle)

export { passwordRouter }

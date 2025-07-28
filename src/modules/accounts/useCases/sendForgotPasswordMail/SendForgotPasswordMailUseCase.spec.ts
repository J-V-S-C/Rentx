import { AppError } from "@errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { UserTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory
let userTokenRepositoryInMemory: UserTokenRepositoryInMemory


describe('Send Forgot Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        mailProvider = new MailProviderInMemory()
        userTokenRepositoryInMemory = new UserTokenRepositoryInMemory()
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory, userTokenRepositoryInMemory, dateProvider, mailProvider
        )
    });
    it('Should be able to send a forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail")
        await usersRepositoryInMemory.create({
            driver_license: "134793",
            email: "harilabu@gmail.com",
            name: "Blurray Cummit",
            password: "1234"
        })
        await sendForgotPasswordMailUseCase.execute("harilabu@gmail.com")

        expect(sendMail).toHaveBeenCalled()
    });
    it('Should not be able to send a forgot password mail if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("wrongEmail@gmail.com")
        ).rejects.toEqual(new AppError("User does not exists!"))
    });
    it('Should be able to create an users token', async () => {
        const generateTokenMail = jest.spyOn(userTokenRepositoryInMemory, "create")
        await usersRepositoryInMemory.create({
            driver_license: "3491843",
            email: "daurite@gmail.com",
            name: "Lio Morgen",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("daurite@gmail.com")

        expect(generateTokenMail).toHaveBeenCalled()

    });

});

import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
    private message: any[] = []
    sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        this.message.push({
            to,
            subject,
            variables,
            path,
        })
        return Promise.resolve()
    }
}

export { MailProviderInMemory }

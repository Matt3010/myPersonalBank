import { User } from "../services/auth.service";

export default interface BankAccount {
	id: string;
	user: User
	createdAt: Date;
	iban: string;
}

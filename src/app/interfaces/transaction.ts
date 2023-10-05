import { TransactionType } from "./transactionType";

export interface Transaction {
	bankAccount : string;
	createdAt: Date;
	balance: number;
	amount: number;
	transactionType: TransactionType;
	description: string;
}

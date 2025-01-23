import * as uuid from "uuid";

import {
    DynamoDBClient,
	PutItemCommand,
	GetItemCommand,
	ScanCommand,
} from "@aws-sdk/client-dynamodb";

import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import type { Expense } from "./expense.type";

const client = new DynamoDBClient({ region: "us-east-1" });

async function createExpenseService(payload: any) {
	//create a unique id and merge with the payload
	const id = uuid.v4();
	const expense: Expense = { id, ...payload };

	//create the params object
	const params: any = {
		TableName: "moneymind-Expense_Table",
		Item: marshall(expense),
	};

	//save the expense to the database
	try {
		const command = new PutItemCommand(params);
		await client.send(command);
		return expense;
	} catch (error: Error | any) {
		console.error(error);
		throw new Error(error);
	}
}

async function readExpenseService(payload: string) {
	//create the params object
	const params: any = {
		TableName: "moneymind-Expense_Table",
		Key: {
			id: marshall(payload),
		},
	};

	//get the expense from the database
	try {
		const command = new GetItemCommand(params);
		const response = await client.send(command);
		if (response.Item === undefined) {
			throw new Error("Expense not found");
		}
		return unmarshall(response.Item);
	} catch (error: Error | any) {
		console.error(error);
		throw new Error(error);
	}
}

async function listExpensesService() {
	//create the params object
	const params: any = {
		TableName: "moneymind-Expense_Table",
	};

	//get the expenses from the database
	try {
		const command = new ScanCommand(params);
        const { $metadata, ScannedCount, ...response } = await client.send(command);
        
        const items = {
            count: response.Count,
            items: response.Items ? response.Items.map(item => unmarshall(item)) : []
        }

        return items;
        
	} catch (error: Error | any) {
		console.error(error);
		throw new Error(error);
	}
}

async function updateExpenseService(payload: any) {
}

export { createExpenseService, readExpenseService, listExpensesService, updateExpenseService };

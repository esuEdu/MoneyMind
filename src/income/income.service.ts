import * as uuid from "uuid";

import {
	DynamoDBClient,
	PutItemCommand,
	UpdateItemCommand,
	GetItemCommand,
	ScanCommand,
	DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";

import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import type { Income } from "./income.type";

const client = new DynamoDBClient({ region: "us-east-1" });

async function createIncomeService(payload: any) {
    //create a unique id and merge with the payload
    const id = uuid.v4();
    const income: Income = { id, ...payload };

    //create the params object
    const params: any = {
        TableName: "moneymind-Income_Table",
        Item: marshall(income),
    };

    //save the income to the database
    try {
        const command = new PutItemCommand(params);
        await client.send(command);
        return income;
    } catch (error: Error | any) {
        console.error(error);
        throw new Error(error);
    }
}   

export { createIncomeService };
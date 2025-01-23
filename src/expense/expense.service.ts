import * as uuid from "uuid"

import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
} from "@aws-sdk/client-dynamodb";

import { marshall } from "@aws-sdk/util-dynamodb";

import type { Expense } from "./expense.type";

const client = new DynamoDBClient({ region: "us-east-1" })

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
        const command = new PutItemCommand(params)
        await client.send(command);
        return expense;
    } catch (error: Error | any) {
        console.error(error);
        throw new Error(error);
    }
}

async function readExpenseService(payload:string) {
    //create the params object
    const params: any = {
      TableName: "moneymind-Expense_Table",
      Key: {
        id: marshall(payload),
      },
    };
    
    //get the expense from the database
    try {
        const command = new GetItemCommand(params)
        const response = await client.send(command);
        if (response.Item === undefined) {
            throw new Error("Expense not found");
        }
        return response.Item;
    } catch (error: Error | any) {
        console.error(error);
        throw new Error(error);
    }
}

export {
    createExpenseService,
    readExpenseService
 };

import * as uuid from "uuid"
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import { Expense } from "./expense.interface";

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

export { createExpenseService };

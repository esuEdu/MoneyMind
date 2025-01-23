import * as uuid from "uuid"

import {
	DynamoDBClient,
	PutItemCommand,
	UpdateItemCommand,
	GetItemCommand,
	ScanCommand,
	DeleteItemCommand,
} from "@aws-sdk/client-dynamodb"

import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"

import type { Income } from "./income.type"

const client = new DynamoDBClient({ region: "us-east-1" })

async function createIncomeService(payload: any) {
	//create a unique id and merge with the payload
	const id = uuid.v4()
	const income: Income = { id, ...payload }

	//create the params object
	const params: any = {
		TableName: "moneymind-Income_Table",
		Item: marshall(income),
	};

	//save the income to the database
	try {
		const command = new PutItemCommand(params);
		await client.send(command)
		return income
	} catch (error: Error | any) {
		console.error(error)
		throw new Error(error)
	}
}

async function readIncomeService(payload: any) {
	//create the params object
	const params: any = {
		TableName: "moneymind-Income_Table",
		Key: {
			id: marshall(payload),
		},
	}

	//get the income from the database
	try {
		const command = new GetItemCommand(params)
		const response = await client.send(command)
		if (response.Item === undefined) {
			throw new Error("Income not found");
		}
		return unmarshall(response.Item);
	} catch (error: Error | any) {
		console.error(error)
		throw new Error(error)
	}
}

async function listIncomeService() {
	//create the params object
	const params: any = {
		TableName: "moneymind-Income_Table",
	};

	//get the income from the database
	try {
		const command = new ScanCommand(params)
		const response = await client.send(command)

		const items = {
			count: response.Count,
			items: response.Items
				? response.Items.map((item) => unmarshall(item))
				: [],
		}

		return items
	} catch (error: Error | any) {
		console.error(error)
		throw new Error(error)
	}
}

async function updateIncomeService(payload: any) {
    if (!payload.id) {
        throw new Error("The 'id' field is required.")
    }

    // Prepare dynamic UpdateExpression
    const updateExpressions: string[] = []
    const expressionAttributeNames: Record<string, string> = {}
    const expressionAttributeValues: Record<string, any> = {}

    for (const [key, value] of Object.entries(payload)) {
        if (key !== "id" && value !== undefined) {
            const attributeKey = `#${key}`
            const valueKey = `:${key}`

            updateExpressions.push(`${attributeKey} = ${valueKey}`);
            expressionAttributeNames[attributeKey] = key;
            expressionAttributeValues[valueKey] = value;
        }
    }

    // If no fields to update, throw an error
    if (updateExpressions.length === 0) {
        throw new Error("No fields to update.")
    }

    // Construct the parameters
    const params: any = {
        TableName: "moneymind-Income_Table",
        Key: marshall({ id: payload.id }),
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: marshall(expressionAttributeValues),
        ReturnValues: "ALL_NEW", // Return the updated item
    }

    // Update the item in the database
    try {
        const command = new UpdateItemCommand(params)
        const response = await client.send(command)

        if (!response.Attributes) {
            throw new Error("Expense not found.")
        }

        return unmarshall(response.Attributes) as Income;
    } catch (error: any) {
        console.error("Error updating income:", error);
        throw new Error(error.message || "Failed to update income.")
    }
}

async function deleteIncomeService(payload: any) {
    //create the params object
    const params: any = {
        TableName: "moneymind-Income_Table",
        Key: {
            id: marshall(payload),
        },
    }

    //delete the income from the database
    try {
        const command = new DeleteItemCommand(params)
        await client.send(command)
        return
    } catch (error: Error | any) {
        console.error(error)
        throw new Error(error)
    }
}

export { createIncomeService, readIncomeService, listIncomeService, updateIncomeService, deleteIncomeService };

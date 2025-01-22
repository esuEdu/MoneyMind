import { handler } from '../src/expense/functions/createExpense';
import {
    DynamoDBClient,
    GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://localhost:8000",
});

const mockContext = {} as any

describe('create expense', () => {

    it('should return a message with created object', async () => {

        const mockEvent = {
            body: JSON.stringify({
                name: 'Bread',
                amount: 100,
                date: '2021-06-01',
                category: 'Food',
                description: 'Lunch'
            })
        } as any

        const result: any = await handler(mockEvent, mockContext, () => {});

        const { statusCode, body } = result

        const parsedBody = JSON.parse(body);
        
        expect(statusCode).toBe(200)
        expect(parsedBody).toEqual({
            message: 'Expense created successfully',
            expense: {
                id: expect.any(String),
                name: 'Bread',
                amount: 100,
                date: '2021-06-01',
                category: 'Food',
                description: 'Lunch'
            }
        })
    })
})
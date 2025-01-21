import { handler } from '../src/expense/functions/createExpense';

import type { Expense } from '../src/expense/expense.model';

const mockContext = {} as any

describe('create expense', () => {
    it('should return a message with created object', async () => {

        const mockEvent = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Bread',
                amount: 100,
                date: '2021-06-01',
                category: 'Food',
                description: 'Lunch'
            })
        } as any

        const result: any = await handler(mockEvent, mockContext);

        const { statusCode, body } = result

        expect(statusCode).toBe(200)
        expect(body).toBe(
            JSON.stringify({
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
        )
    })
})
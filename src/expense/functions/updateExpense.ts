import { updateExpenseService } from "../expense.service";

import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event: any) => {
	const body = JSON.parse(event.body);

	try {
		const expense = await updateExpenseService(body);

		const response = {
			statusCode: 200,
			body: JSON.stringify({
				message: "Expense updated successfully",
				expense: expense,
			}),
		};
		return response;
	} catch (error: Error | any) {
		const response = {
			statusCode: 500,
			body: JSON.stringify({
				message: "Internal Server Error",
				error: error.message,
			}),
		};
		return response;
	}
};

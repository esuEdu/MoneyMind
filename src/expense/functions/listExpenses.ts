import { APIGatewayProxyHandler } from "aws-lambda";

import { listExpensesService } from "../expense.service";

export const handler: APIGatewayProxyHandler = async () => {
	try {
		const expenses = await listExpensesService();
		const response = {
			statusCode: 200,
			body: JSON.stringify({
				message: "Expense list successfully",
				expense: expenses,
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

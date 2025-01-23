import { APIGatewayProxyHandler } from "aws-lambda";

import { deleteExpenseService } from "../expense.service";

export const handler: APIGatewayProxyHandler = async (event: any) => {
	try {
		await deleteExpenseService(event.headers.id);
		const response = {
			statusCode: 200,
			body: JSON.stringify({
				message: "Expense deleted successfully",
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

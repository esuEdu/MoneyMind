import { APIGatewayProxyHandler } from "aws-lambda";

import { deleteIncomeService } from "../income.service";

export const handler: APIGatewayProxyHandler = async (event: any) => {
	try {
		const income = await deleteIncomeService(event.headers.id);

		const response = {
			statusCode: 200,
			body: JSON.stringify({
				message: "Income deleted successfully",
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

import { APIGatewayProxyHandler } from "aws-lambda";

import { updateIncomeService } from "../income.service";

export const handler: APIGatewayProxyHandler = async (event: any) => {
	const body = JSON.parse(event.body);

	try {
		const income = await updateIncomeService(body);

		const response = {
			statusCode: 200,
			body: JSON.stringify({
				message: "Income updated successfully",
				income: income,
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

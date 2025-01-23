import { APIGatewayProxyHandler } from "aws-lambda";

import { readExpenseService } from "../expense.service";

export const handler: APIGatewayProxyHandler = async (event: any) => {
  try {
    const expense = await readExpenseService(event.headers.id);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Expense read successfully",
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

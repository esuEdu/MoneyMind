// AWS
import { APIGatewayProxyHandler } from "aws-lambda";

//Service
import { createExpenseService } from "../expense.service";

export const handler: APIGatewayProxyHandler = async (event: any) => {

  const body = JSON.parse(event.body);

  try {
    const expense = await createExpenseService(body);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Expense created successfully",
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

import { APIGatewayProxyHandler } from "aws-lambda";

import { listIncomeService } from "../income.service";

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const income = await listIncomeService();
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Income list successfully",
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
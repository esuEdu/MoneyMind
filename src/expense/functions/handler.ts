import { APIGatewayProxyHandler } from 'aws-lambda';

export const hello: APIGatewayProxyHandler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v4.0! Your function executed successfully!',
      input: event
    })
  };
}
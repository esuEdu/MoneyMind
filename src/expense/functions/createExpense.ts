//middy
import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpCors from '@middy/http-cors';
import httpErrorHandler from "@middy/http-error-handler";

// AWS
import { APIGatewayProxyHandler } from 'aws-lambda';

//Service

const createExpense: APIGatewayProxyHandler = async (event) => {

    

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello, ${name}!` }),
    };
}

export const handler = middy(createExpense)
    .use(httpCors())
    .use(httpJsonBodyParser())
    .use(httpErrorHandler());

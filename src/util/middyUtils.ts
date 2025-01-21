import middy from "@middy/core"
import errorLogger from "@middy/error-logger"
import httpCors from "@middy/http-cors"
import httpErrorHandler from "@middy/http-error-handler"
import httpEventNormalizer from "@middy/http-event-normalizer"
import httpHeaderNormalizer from "@middy/http-header-normalizer"
import httpJsonBodyPhase from "@middy/http-json-body-parser"
import httpSecurityHeaders from "@middy/http-security-headers"

const middyUtils = {
    middy,
    errorLogger,
    httpCors,
    httpErrorHandler,
    httpEventNormalizer,
    httpHeaderNormalizer,
    httpJsonBodyPhase,
    httpSecurityHeaders
}

export { middyUtils }
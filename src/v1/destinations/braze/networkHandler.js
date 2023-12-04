/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const { NetworkError } = require('@rudderstack/integrations-lib');
const { prepareProxyRequest, proxyRequest } = require('../../../adapters/network');
const { isHttpStatusSuccess, getAuthErrCategoryFromStCode } = require('../../../v0/util/index');

const {
    processAxiosResponse,
    getDynamicErrorType,
} = require('../../../adapters/utils/networkUtils');
const tags = require('../../../v0/util/tags');

const responseHandler = (destinationResponse) => {
    const message = `[BRAZE Response V1 Handler] - Request Processed Successfully`;
    const responseWithIndividualEvents = [];
    const { response, status, rudderJobMetadata } = destinationResponse;
    if (isHttpStatusSuccess(status)) {
        if (
            !!response &&
            response.message === 'success' &&
            response?.errors &&
            response?.errors.length > 0
        ) {
            for (const metadata of rudderJobMetadata) {
                responseWithIndividualEvents.push({
                    statusCode: 400,
                    metadata,
                    error: response.errors,
                });
            }
        } else{
            for (const metadata of rudderJobMetadata) {
                responseWithIndividualEvents.push({
                    statusCode: status,
                    metadata,
                    error: 'success',
                });
            }
        }

        return {
            status,
            message,
            destinationResponse,
            response: responseWithIndividualEvents,
        };
    }

    // in case of failure status, populate response to maintain len(metadata)=len(response)
    for (const metadata of rudderJobMetadata) {
        responseWithIndividualEvents.push({
            statusCode: status,
            metadata,
            error: response,
        });
    }

    throw new NetworkError(
        `BRAZE: Error transformer proxy v1 during BRAZE response transformation`,
        status,
        {
            [tags.TAG_NAMES.ERROR_TYPE]: getDynamicErrorType(status),
        },
        destinationResponse,
        getAuthErrCategoryFromStCode(status),
        responseWithIndividualEvents,
    );
};

function networkHandler() {
    this.prepareProxy = prepareProxyRequest;
    this.proxy = proxyRequest;
    this.processAxiosResponse = processAxiosResponse;
    this.responseHandler = responseHandler;
}

module.exports = { networkHandler };

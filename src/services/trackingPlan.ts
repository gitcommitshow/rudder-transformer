import logger from '../logger';
import { RetryRequestError, RespStatusError, constructValidationErrors } from '../util/utils';
import { getMetadata } from '../v0/util';
import eventValidator from '../util/eventValidation';
import stats from '../util/stats';
import { HTTP_STATUS_CODES } from '../v0/util/constant';

export class TrackingPlanservice {

  public static validate(events, requestSize, reqParams) {
    const startTime = new Date();
    const respList: any[] = [];
    const metaTags = events.length && events[0].metadata ? getMetadata(events[0].metadata) : {};
    let ctxStatusCode = 200;

    for(let event of events) {
      let toAdd;
      let exceptionOccured = false;

      try {
        event.request = { query: reqParams }; // FIXME: Do we need this update ?
        const validatedEvent = eventValidator.handleValidation(event);
        toAdd = {
          output: event.message,
          metadata: event.metadata,
          statusCode: validatedEvent['dropEvent'] ? HTTP_STATUS_CODES.BAD_REQUEST : HTTP_STATUS_CODES.OK,
          validationErrors: validatedEvent['validationErrors'],
          error: JSON.stringify(constructValidationErrors(validatedEvent['validationErrors'])),
        }
      } catch (error) {
        exceptionOccured = true;
        // no need to process further if
        // we have error of retry request error
        if (error instanceof RetryRequestError) {
          ctxStatusCode = error.statusCode;
          break;
        }

        toAdd = {
          output: event.message,
          metadata: event.metadata,
          statusCode: error instanceof RespStatusError ? error.statusCode : HTTP_STATUS_CODES.OK,
          validationErrors: [],
          error: `Error occurred while validating: ${error}`,
        };
      }

      // finally on every event, we need to
      // capture the information related to the validates event
      stats.counter('tp_event_validation', 1, {
        ...metaTags,
        workspaceId: event.metadata.workspaceId,
        trackingPlanId: event.metadata.trackingPlanId,
        status: toAdd.statusCode,
        exception: exceptionOccured,
      })
      respList.push(toAdd);
    }

    // capture overall function latency
    // with metadata tags
    stats.timing('tp_request_latency', startTime, {
      ...metaTags,
      workspaceId: events[0]?.metadata?.workspaceId,
      trackingPlanId: events[0]?.metadata?.trackingPlanId,
    });

    return { body: respList, status: ctxStatusCode };
  }
}

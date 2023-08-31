import TransformationError from 'rs-integration-lib/build/errorDefinitions/transformationError';
import PluginAdapter from '../../helpers/pluginAdaper';
import {
  DeliveryResponse,
  Destination,
  ErrorDetailer,
  MetaTransferObject,
  Metadata,
  ProcessorTransformationOutput,
  ProcessorTransformationRequest,
  ProcessorTransformationResponse,
  RouterTransformationRequestData,
  RouterTransformationResponse,
  UserDeletionRequest,
  UserDeletionResponse,
} from '../../types';
import tags from '../../v0/util/tags';
import NativeIntegrationDestinationService from './nativeIntegration';

export default class PluginIntegrationService implements NativeIntegrationDestinationService {
  init() {}

  public getName(): string {
    return 'Plugin';
  }

  public getTags(
    destType: string,
    destinationId: string,
    workspaceId: string,
    feature: string,
  ): MetaTransferObject {
    const metaTO = {
      errorDetails: {
        destType: destType.toUpperCase(),
        module: tags.MODULES.DESTINATION,
        implementation: tags.IMPLEMENTATIONS.NATIVE,
        feature,
        destinationId,
        workspaceId,
      } as ErrorDetailer,
      errorContext: `[Plugin Integration Service] Failure During ${feature} Transformation`,
    } as MetaTransferObject;
    return metaTO;
  }

  public async doProcessorTransformation(
    events: ProcessorTransformationRequest[],
    destinationType: string,
    _version: string,
    _requestMetadata: Object,
  ): Promise<ProcessorTransformationResponse[]> {
    const results = await PluginAdapter.transformAtProcessor(events, destinationType);
    const respList: ProcessorTransformationResponse[] = [];
    results.allSuccessList.forEach((successResponse) => {
      respList.push({
        output: successResponse.payload,
        metadata: successResponse.metadata,
        statusCode: 200,
      });
    });

    results.allErrorList.forEach(
      (errorResponse: {
        metadata: Metadata;
        response: {
          // need to build type def here
          message: string;
          status: number;
          destinationResponse?: any;
          statTags?: { [x: string]: string };
        };
      }) => {
        respList.push({
          metadata: errorResponse.metadata,
          statusCode: errorResponse.response.status,
          error: errorResponse.response.message,
          statTags: errorResponse.response.statTags,
        });
      },
    );
    return respList;
  }

  public async doRouterTransformation(
    events: RouterTransformationRequestData[],
    destinationType: string,
    _version: string,
    _requestMetadata: Object,
  ): Promise<RouterTransformationResponse[]> {
    const results = await PluginAdapter.transformAtRouter(events, destinationType);
    const respList: RouterTransformationResponse[] = [];
    results.allSuccessList.forEach((successResponse) => {
      respList.push({
        batched: true,
        batchedRequest: successResponse.payload,
        statusCode: 200,
        metadata: successResponse.metadata,
        destination: successResponse.destination as Destination, // commonalise the type destination
      });
    });

    results.allErrorList.forEach((errorResponse) => {
      respList.push({
        metadata: [errorResponse.metadata],
        statusCode: errorResponse.response.status,
        error: errorResponse.response.message,
        statTags: errorResponse.response.statTags,
        destination: errorResponse.destination as Destination,
        batched: false,
      });
    });
    return respList;
  }

  // TODO: implement these methods
  public doBatchTransformation(
    _events: RouterTransformationRequestData[],
    _destinationType: string,
    _version: any,
    _requestMetadata: Object,
  ): RouterTransformationResponse[] {
    throw new TransformationError('CDKV1 Does not Implement Batch Transform Routine');
  }

  public deliver(
    _event: ProcessorTransformationOutput,
    _destinationType: string,
    _requestMetadata: Object,
  ): Promise<DeliveryResponse> {
    throw new TransformationError('CDV1 Does not Implement Delivery Routine');
  }

  public processUserDeletion(
    requests: UserDeletionRequest[],
    rudderDestInfo: string,
  ): Promise<UserDeletionResponse[]> {
    throw new TransformationError('CDV1 Does not Implement Deletion Routine');
  }
}
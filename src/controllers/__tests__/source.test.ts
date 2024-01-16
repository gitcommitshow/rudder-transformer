import request from 'supertest';
import { createHttpTerminator } from 'http-terminator';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { applicationRoutes } from '../../routes';
import { NativeIntegrationSourceService } from '../../services/source/nativeIntegration';
import { ServiceSelector } from '../../helpers/serviceSelector';
import { ControllerUtility } from '../util/index';

let server: any;
const OLD_ENV = process.env;

beforeAll(async () => {
  process.env = { ...OLD_ENV }; // Make a copy
  const app = new Koa();
  app.use(
    bodyParser({
      jsonLimit: '200mb',
    }),
  );
  applicationRoutes(app);
  server = app.listen(9090);
});

afterAll(async () => {
  process.env = OLD_ENV; // Restore old environment
  const httpTerminator = createHttpTerminator({
    server,
  });
  await httpTerminator.terminate();
});

afterEach(() => {
  jest.clearAllMocks();
});

const getData = () => {
  return [{ event: { a: 'b1' } }, { event: { a: 'b2' } }];
};

describe('Source controller tests', () => {
  describe('Source transform tests', () => {
    test('successful source transform', async () => {
      const testOutput = [{ event: { a: 'b' } }];
      const mockSourceService = new NativeIntegrationSourceService();
      mockSourceService.sourceTransformRoutine = jest
        .fn()
        .mockImplementation((input, source, version, requestMetadata) => {
          expect(input).toEqual(getData());
          expect(source).toEqual('__rudder_test__');
          expect(version).toEqual('v0');
          return testOutput;
        });
      const getNativeSourceServiceSpy = jest
        .spyOn(ServiceSelector, 'getNativeSourceService')
        .mockImplementation(() => {
          return mockSourceService;
        });

      const adaptInputToVersionSpy = jest
        .spyOn(ControllerUtility, 'adaptInputToVersion')
        .mockImplementation((source, version, events) => {
          expect(source).toEqual('__rudder_test__');
          expect(version).toEqual('v0');
          expect(events).toEqual(getData());
          return { implementationVersion: 'v0', input: events };
        });

      const data = getData();
      const response = await request(server)
        .post('/v0/sources/__rudder_test__')
        .set('Accept', 'application/json')
        .send(data);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(testOutput);

      expect(response.header['apiversion']).toEqual('2');

      expect(getNativeSourceServiceSpy).toHaveBeenCalledTimes(1);
      expect(adaptInputToVersionSpy).toHaveBeenCalledTimes(1);
      expect(mockSourceService.sourceTransformRoutine).toHaveBeenCalledTimes(1);
    });

    test('failing source transform', async () => {
      const mockSourceService = new NativeIntegrationSourceService();
      const getNativeSourceServiceSpy = jest
        .spyOn(ServiceSelector, 'getNativeSourceService')
        .mockImplementation(() => {
          return mockSourceService;
        });

      const adaptInputToVersionSpy = jest
        .spyOn(ControllerUtility, 'adaptInputToVersion')
        .mockImplementation((source, version, events) => {
          expect(source).toEqual('__rudder_test__');
          expect(version).toEqual('v0');
          expect(events).toEqual(getData());
          throw new Error('test error');
        });

      const data = getData();
      const response = await request(server)
        .post('/v0/sources/__rudder_test__')
        .set('Accept', 'application/json')
        .send(data);

      const expectedResp = [
        {
          error: 'test error',
          statTags: {
            errorCategory: 'transformation',
          },
          statusCode: 500,
        },
      ];

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedResp);

      expect(response.header['apiversion']).toEqual('2');

      expect(getNativeSourceServiceSpy).toHaveBeenCalledTimes(1);
      expect(adaptInputToVersionSpy).toHaveBeenCalledTimes(1);
    });
  });
});

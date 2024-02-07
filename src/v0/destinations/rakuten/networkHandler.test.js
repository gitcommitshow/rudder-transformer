const { responseHandler } = require('./networkHandler');
// Generated by CodiumAI

describe('responseHandler', () => {
  it('should return a success message with status code 200 when the request is successful and no bad records or errors are found', () => {
    const destinationResponse = {
      response: '<response></response>',
      status: 200,
    };

    const result = responseHandler(destinationResponse);

    expect(result.status).toBe(200);
    expect(result.message).toBe('[RAKUTEN Response Handler] - Request Processed Successfully');
    expect(result.destinationResponse).toEqual(destinationResponse);
  });

  it('should throw a NetworkError with status code 400 and error message when the response status is 400 due to invalid Marketing Id', () => {
    const destinationResponse = {
      response: '<response>Invalid marketing id</response>',
      status: 400,
    };
    expect(() => {
      responseHandler(destinationResponse);
    }).toThrow('Request failed with status: 400 due to invalid Marketing Id');
  });

  it('should throw a NetworkError with status code 400 and error message when the response contains errors', () => {
    const destinationResponse = {
      response: '<response><error>Access denied</error></response>',
      status: 200,
    };
    expect(() => {
      responseHandler(destinationResponse);
    }).toThrow(
      'Request failed with status: 200 due to Access denied. Can you try to enable pixel tracking for this mid.',
    );
  });

  it('should return a success message with status code 200 when the response status is 200 and no bad records or errors are found', () => {
    const destinationResponse = {
      response: '<response></response>',
      status: 200,
    };

    const result = responseHandler(destinationResponse);

    expect(result.status).toBe(200);
    expect(result.message).toBe('[RAKUTEN Response Handler] - Request Processed Successfully');
    expect(result.destinationResponse).toEqual(destinationResponse);
  });

  it('should throw a NetworkError with status code 400 and error message when the response status is 200 and the response contains only bad records', () => {
    const destinationResponse = {
      response: '<response><bad>1</bad></response>',
      status: 200,
    };

    expect(() => {
      responseHandler(destinationResponse);
    }).toThrow('Request failed with status: 200 with number of bad records 1');
  });
});

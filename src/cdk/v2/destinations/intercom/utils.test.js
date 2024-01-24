const md5 = require('md5');
const axios = require('axios');
const {
  getName,
  getHeaders,
  searchContact,
  getLookUpField,
  getBaseEndpoint,
  getCompaniesList,
  addMetadataToPayload,
  attachUserAndCompany,
  createOrUpdateCompany,
  filterCustomAttributes,
  checkIfEmailOrUserIdPresent,
  separateReservedAndRestMetadata,
} = require('./utils');
const { BASE_ENDPOINT, BASE_EU_ENDPOINT, BASE_AU_ENDPOINT } = require('./config');

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  post: jest.fn(),
}));

describe('separateReservedAndRestMetadata utility test', () => {
  it('separate reserved and rest metadata', () => {
    const metadata = {
      property1: 1,
      property2: 'test',
      property3: true,
      property4: {
        property1: 1,
        property2: 'test',
        property3: {
          subProp1: {
            a: 'a',
            b: 'b',
          },
          subProp2: ['a', 'b'],
        },
      },
      property5: {},
      property6: [],
      property7: null,
      property8: undefined,
      revenue: {
        amount: 1232,
        currency: 'inr',
        test: 123,
      },
      price: {
        amount: 3000,
        currency: 'USD',
      },
      article: {
        url: 'https://example.org/ab1de.html',
        value: 'the dude abides',
      },
    };
    const expectedReservedMetadata = {
      revenue: {
        amount: 1232,
        currency: 'inr',
        test: 123,
      },
      price: {
        amount: 3000,
        currency: 'USD',
      },
      article: {
        url: 'https://example.org/ab1de.html',
        value: 'the dude abides',
      },
    };
    const expectedRestMetadata = {
      property1: 1,
      property2: 'test',
      property3: true,
      property4: {
        property1: 1,
        property2: 'test',
        property3: {
          subProp1: {
            a: 'a',
            b: 'b',
          },
          subProp2: ['a', 'b'],
        },
      },
      property5: {},
      property6: [],
      property7: null,
      property8: undefined,
    };
    const { reservedMetadata, restMetadata } = separateReservedAndRestMetadata(metadata);

    expect(expectedReservedMetadata).toEqual(reservedMetadata);
    expect(expectedRestMetadata).toEqual(restMetadata);
  });

  it('reserved metadata types not present in input metadata', () => {
    const metadata = {
      property1: 1,
      property2: 'test',
      property3: true,
      property4: {
        property1: 1,
        property2: 'test',
        property3: {
          subProp1: {
            a: 'a',
            b: 'b',
          },
          subProp2: ['a', 'b'],
        },
      },
      property5: {},
      property6: [],
      property7: null,
      property8: undefined,
    };
    const expectedRestMetadata = {
      property1: 1,
      property2: 'test',
      property3: true,
      property4: {
        property1: 1,
        property2: 'test',
        property3: {
          subProp1: {
            a: 'a',
            b: 'b',
          },
          subProp2: ['a', 'b'],
        },
      },
      property5: {},
      property6: [],
      property7: null,
      property8: undefined,
    };
    const { reservedMetadata, restMetadata } = separateReservedAndRestMetadata(metadata);

    expect({}).toEqual(reservedMetadata);
    expect(expectedRestMetadata).toEqual(restMetadata);
  });

  it('metadata input contains only reserved metadata types', () => {
    const metadata = {
      revenue: {
        amount: 1232,
        currency: 'inr',
        test: 123,
      },
      price: {
        amount: 3000,
        currency: 'USD',
      },
      article: {
        url: 'https://example.org/ab1de.html',
        value: 'the dude abides',
      },
    };
    const expectedReservedMetadata = {
      revenue: {
        amount: 1232,
        currency: 'inr',
        test: 123,
      },
      price: {
        amount: 3000,
        currency: 'USD',
      },
      article: {
        url: 'https://example.org/ab1de.html',
        value: 'the dude abides',
      },
    };
    const { reservedMetadata, restMetadata } = separateReservedAndRestMetadata(metadata);

    expect(expectedReservedMetadata).toEqual(reservedMetadata);
    expect({}).toEqual(restMetadata);
  });

  it('empty metadata object', () => {
    const metadata = {};
    const { reservedMetadata, restMetadata } = separateReservedAndRestMetadata(metadata);
    expect({}).toEqual(reservedMetadata);
    expect({}).toEqual(restMetadata);
  });

  it('null/undefined metadata', () => {
    const metadata = null;
    const { reservedMetadata, restMetadata } = separateReservedAndRestMetadata(metadata);
    expect({}).toEqual(reservedMetadata);
    expect({}).toEqual(restMetadata);
  });
});

describe('getBaseEndpoint utility test', () => {
  it('Should return BASE_ENDPOINT when destination.Config.apiServer is not "eu" or "au"', () => {
    const destination = {
      Config: {
        apiServer: 'us',
      },
    };
    const result = getBaseEndpoint(destination);
    expect(result).toBe(BASE_ENDPOINT);
  });

  it('Should return BASE_EU_ENDPOINT when destination.Config.apiServer is "eu"', () => {
    const destination = {
      Config: {
        apiServer: 'eu',
      },
    };
    const result = getBaseEndpoint(destination);
    expect(result).toBe(BASE_EU_ENDPOINT);
  });

  it('Should return BASE_AU_ENDPOINT when destination.Config.apiServer is "au"', () => {
    const destination = {
      Config: {
        apiServer: 'au',
      },
    };
    const result = getBaseEndpoint(destination);
    expect(result).toBe(BASE_AU_ENDPOINT);
  });

  it('Should return BASE_ENDPOINT when destination.Config.apiServer is null', () => {
    const destination = {
      Config: {
        apiServer: null,
      },
    };
    const result = getBaseEndpoint(destination);
    expect(result).toBe(BASE_ENDPOINT);
  });
});

describe('getHeaders utility test', () => {
  it('Should return an object with the correct headers', () => {
    const destination = {
      Config: {
        apiKey: 'testApiKey',
      },
    };

    const expectedHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${destination.Config.apiKey}`,
      Accept: 'application/json',
      'Intercom-Version': '2.10',
    };
    const headers = getHeaders(destination);
    expect(headers).toEqual(expectedHeaders);
  });
});

describe('getLookUpField utility test', () => {
  it('Should return email as default lookup field when no integration object is found', () => {
    const message = {};
    const result = getLookUpField(message);
    expect(result).toBe('email');
  });
});

describe('getName utility test', () => {
  it('Should return the concatenation of firstName and lastName fields when both exist', () => {
    const message = {
      context: {
        traits: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    };
    expect(getName(message)).toBe('John Doe');
  });

  it('Should return the firstName field when only firstName exists', () => {
    const message = {
      context: {
        traits: {
          firstName: 'John',
        },
      },
    };
    expect(getName(message)).toBe('John');
  });

  it('Should return the lastName field when only lastName exists', () => {
    const message = {
      context: {
        traits: {
          lastName: 'Doe',
        },
      },
    };
    expect(getName(message)).toBe('Doe');
  });

  it('Should return undefined when both message.traits and message.context.traits are undefined', () => {
    const message = {};
    expect(getName(message)).toBeUndefined();
  });
});

describe('filterCustomAttributes utility test', () => {
  it('Should return an empty object when all custom attributes are reserved attributes', () => {
    const payload = { custom_attributes: { email: 'test@rudder.com', name: 'rudder test' } };
    const result = filterCustomAttributes(payload, 'user', { Config: { apiVersion: 'latest' } });
    expect(result).toBeUndefined();
  });

  it('Should return a flattened object when custom attributes are not null, not reserved attributes and nested', () => {
    const payload = {
      custom_attributes: { source: 'rudder-js-sdk', data: { nestedAttribute: 'nestedValue' } },
    };
    const result = filterCustomAttributes(payload, 'user', { Config: { apiVersion: 'latest' } });
    expect(result).toEqual({ source: 'rudder-js-sdk', data_nestedAttribute: 'nestedValue' });
  });

  it('Should return null when custom_attributes is null', () => {
    const payload = { custom_attributes: null };
    const result = filterCustomAttributes(payload, 'company', { Config: { apiVersion: 'latest' } });
    expect(result).toBeUndefined();
  });
});

describe('addMetadataToPayload utility test', () => {
  it('Should return the same payload if metadata is present but empty', () => {
    const payload = { data: 'test', metadata: {} };
    const result = addMetadataToPayload(payload);
    expect(result).toEqual(payload);
  });

  it('should add flattened metadata to payload if metadata is present and not empty', () => {
    const payload = {
      data: 'test',
      metadata: {
        amount: 30,
        currency: 'USD',
        url: 'https//test.com',
        restData: { source: 'rudderStack' },
      },
    };
    const result = addMetadataToPayload(payload);
    expect(result).toEqual({
      data: 'test',
      metadata: {
        amount: 30,
        currency: 'USD',
        url: 'https//test.com',
        'restData.source': 'rudderStack',
      },
    });
  });
});

describe('searchContact utility test', () => {
  it('Should successfully search contact by email', async () => {
    const message = { context: { traits: { email: 'test@rudderlabs.com' } } };
    const destination = { Config: { apiKey: 'testApiKey', apiServer: 'us' } };
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        type: 'list',
        total_count: 1,
        pages: {
          type: 'pages',
          page: 1,
          per_page: 50,
          total_pages: 1,
        },
        data: [
          {
            type: 'contact',
            id: '1',
            email: 'test@rudderlabs.com',
          },
        ],
      },
    });

    const result = await searchContact(message, destination);
    expect(result).toEqual('1');
  });

  it('Should return first contact id if multiple contact exist with give search field', async () => {
    const message = {
      context: {
        traits: { email: 'test@rudderlabs.com', phone: '+91 9999999999' },
        integrations: { INTERCOM: { lookup: 'phone' } },
      },
    };
    const destination = { Config: { apiKey: 'testApiKey', apiServer: 'us' } };
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        type: 'list',
        total_count: 1,
        pages: {
          type: 'pages',
          page: 1,
          per_page: 50,
          total_pages: 1,
        },
        data: [
          {
            type: 'contact',
            id: '1',
            email: 'test@rudderlabs.com',
            phone: '+91 9999999999',
          },
          {
            type: 'contact',
            id: '2',
            email: 'test+1@rudderlabs.com',
            phone: '+91 9999999999',
          },
        ],
      },
    });

    const result = await searchContact(message, destination);
    expect(result).toEqual('1');
  });

  it('Should return null if no contact is found', async () => {
    const message = {
      context: {
        traits: { email: 'test+10@rudderlabs.com', phone: '+91 9999999999' },
        integrations: { INTERCOM: { lookup: 'email' } },
      },
    };
    const destination = { Config: { apiKey: 'testApiKey', apiServer: 'us' } };
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        type: 'list',
        total_count: 0,
        pages: {
          type: 'pages',
          page: 1,
          per_page: 50,
          total_pages: 0,
        },
        data: [],
      },
    });

    const result = await searchContact(message, destination);
    expect(result).toBeNull();
  });

  it('Should throw an error in case if axios calls returns an error', async () => {
    const message = {
      context: {
        traits: { email: 'test+3@rudderlabs.com', phone: '+91 9999999999' },
        integrations: { INTERCOM: { lookup: 'email' } },
      },
    };
    const destination = { Config: { apiKey: 'invalidTestApiKey', apiServer: 'us' } };
    axios.post.mockRejectedValue({
      status: 401,
      data: {
        type: 'error.list',
        request_id: 'request_400',
        errors: [
          {
            code: 'unauthorized',
            message: 'Access Token Invalid',
          },
        ],
      },
    });

    try {
      const result = await searchContact(message, destination);
      expect(result).toEqual('');
    } catch (error) {
      expect(error.message).toEqual(
        'Unable to search contact due to : [{"code":"unauthorized","message":"Access Token Invalid"}]',
      );
    }
  });
});

describe('createOrUpdateCompany utility test', () => {
  it('Should successfully create company', async () => {
    const payload = {
      company_id: 'rudderlabs',
      name: 'RudderStack',
      website: 'www.rudderstack.com',
      plan: 'enterprise',
      size: 500,
      industry: 'CDP',
      custom_attributes: {},
    };
    const destination = { Config: { apiKey: 'testApiKey', apiServer: 'us' } };
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        type: 'company',
        company_id: 'rudderlabs',
        id: '1',
        name: 'RudderStack',
        website: 'www.rudderstack.com',
        plan: 'enterprise',
        size: 500,
        industry: 'CDP',
        remote_created_at: 1374138000,
        created_at: 1701930212,
        updated_at: 1701930212,
      },
    });

    const result = await createOrUpdateCompany(payload, destination);
    expect(result).toEqual('1');
  });

  it('Should throw an error in case if axios calls returns an error', async () => {
    const payload = {
      company_id: 'rudderlabs',
      name: 'RudderStack',
      website: 'www.rudderstack.com',
      plan: 'enterprise',
      size: 500,
      industry: 'CDP',
      testData: true,
    };
    const destination = { Config: { apiKey: 'testApiKey', apiServer: 'us' } };
    axios.post.mockRejectedValue({
      status: 400,
      data: {
        type: 'error.list',
        request_id: 'request_400',
        errors: [
          {
            code: 'bad_request',
            message: "bad 'testData' parameter",
          },
        ],
      },
    });

    try {
      const result = await createOrUpdateCompany(payload, destination);
      expect(result).toEqual('');
    } catch (error) {
      expect(error.message).toEqual(
        'Unable to Create or Update Company due to : [{"code":"bad_request","message":"bad \'testData\' parameter"}]',
      );
    }
  });

  it('Should throw an error in case if axios calls returns an error', async () => {
    const payload = {
      company_id: 'rudderlabs',
      name: 'RudderStack',
      website: 'www.rudderstack.com',
      plan: 'enterprise',
      size: 500,
      industry: 'CDP',
      testData: true,
    };
    const destination = { Config: { apiKey: 'invalidTestApiKey', apiServer: 'us' } };
    axios.post.mockRejectedValue({
      status: 400,
      data: {
        type: 'error.list',
        request_id: 'request_400',
        errors: [
          {
            code: 'unauthorized',
            message: 'Access Token Invalid',
          },
        ],
      },
    });

    try {
      const result = await createOrUpdateCompany(payload, destination);
      expect(result).toEqual('');
    } catch (error) {
      expect(error.message).toEqual(
        'Unable to Create or Update Company due to : [{"code":"unauthorized","message":"Access Token Invalid"}]',
      );
    }
  });
});

describe('checkIfEmailOrUserIdPresent utility test', () => {
  it('Should return true when userId is present in message', () => {
    const message = {
      userId: '12345',
      context: {
        traits: {
          email: 'test@example.com',
        },
      },
    };
    const Config = {
      sendAnonymousId: true,
      apiKey: '1234567890',
    };
    const result = checkIfEmailOrUserIdPresent(message, Config);
    expect(result).toBe(true);
  });

  it('Should return true when email is present in message', () => {
    const message = {
      context: {
        traits: {
          email: 'test@example.com',
        },
      },
    };
    const Config = {
      sendAnonymousId: true,
      apiKey: '1234567890',
    };
    const result = checkIfEmailOrUserIdPresent(message, Config);
    expect(result).toBe(true);
  });

  it('Should return true when both userId and email are present in message', () => {
    const message = {
      userId: '12345',
      context: {
        traits: {
          email: 'test@example.com',
        },
      },
    };
    const Config = {
      sendAnonymousId: true,
      apiKey: '1234567890',
    };
    const result = checkIfEmailOrUserIdPresent(message, Config);
    expect(result).toBe(true);
  });

  it('Should return false when no email or userId is present', () => {
    const message = { anonymousId: 'anon@123' };
    const Config = {
      sendAnonymousId: false,
      apiKey: '1234567890',
    };
    const result = checkIfEmailOrUserIdPresent(message, Config);
    expect(result).toBe(false);
  });
});

describe('getCompaniesList utility test', () => {
  it('Should return an array with one object containing the company_id, custom_attributes, name and industry properties when the payload contains a company object with name or id properties', () => {
    const payload = {
      custom_attributes: {
        company: {
          name: 'rudderlabs',
          industry: 'Tech',
        },
      },
    };

    const result = getCompaniesList(payload);

    expect(result).toEqual([
      {
        company_id: md5('rudderlabs'),
        custom_attributes: {},
        name: 'rudderlabs',
        industry: 'Tech',
      },
    ]);
  });

  it('Should return undefined when the payload does not contain a company object', () => {
    const payload = {};
    const result = getCompaniesList(payload);
    expect(result).toBeUndefined();
  });

  it('Should return an empty array when the company object in the payload does not have name or id properties', () => {
    const payload = {
      custom_attributes: {
        company: {},
      },
    };
    const result = getCompaniesList(payload);
    expect(result).toEqual([]);
  });

  it('Should return an array with one object containing the company_id, custom_attributes, name and industry properties when the payload contains a company object with name and id properties', () => {
    const payload = {
      custom_attributes: {
        company: {
          name: 'Company A',
          id: '123',
          industry: 'Tech',
        },
      },
    };
    const result = getCompaniesList(payload);
    expect(result).toEqual([
      {
        company_id: '123',
        custom_attributes: {},
        name: 'Company A',
        industry: 'Tech',
      },
    ]);
  });
});

describe('attachUserAndCompany utility test', () => {
  it('should return a valid response object when only email and groupId are present', () => {
    const message = {
      context: {
        traits: {
          email: 'test@example.com',
        },
      },
      groupId: 'group123',
    };
    const Config = {
      sendAnonymousId: false,
      apiKey: 'testApiKey',
    };

    const expectedResponse = {
      method: 'POST',
      params: {},
      type: 'REST',
      version: '1',
      endpoint: 'https://api.intercom.io/users',
      files: {},
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer testApiKey',
        Accept: 'application/json',
        'Intercom-Version': '1.4',
      },
      body: {
        FORM: {},
        JSON: {
          email: 'test@example.com',
          companies: [
            {
              company_id: 'group123',
            },
          ],
        },
        JSON_ARRAY: {},
        XML: {},
      },
      userId: undefined,
    };
    const response = attachUserAndCompany(message, Config);
    expect(response).toEqual(expectedResponse);
  });
});

export const data = [
  {
    name: 'intercom',
    description: 'Intercom router tests',
    feature: 'router',
    module: 'destination',
    version: 'v0',
    input: {
      request: {
        body: {
          input: [
            {
              message: {
                userId: 'user@1',
                channel: 'web',
                context: {
                  traits: {
                    age: 23,
                    email: 'test@rudderlabs.com',
                    phone: '+91 9999999999',
                    firstName: 'Test',
                    lastName: 'Rudderlabs',
                    address: 'california usa',
                    ownerId: '13',
                  },
                },
                type: 'identify',
                originalTimestamp: '2023-11-10T14:42:44.724Z',
                timestamp: '2023-11-22T10:12:44.757+05:30',
              },
              destination: {
                DestinationDefinition: {
                  Config: {
                    cdkV2Enabled: true,
                  },
                },
                Config: {
                  accessToken: 'testAccessToken',
                  apiServer: 'standard',
                  sendAnonymousId: false,
                },
              },
              metadata: {
                jobId: 1,
              },
            },
            {
              message: {
                userId: 'user@3',
                channel: 'web',
                context: {
                  traits: {
                    age: 32,
                    email: 'test+3@rudderlabs.com',
                    phone: '+91 9399999999',
                    firstName: 'Test',
                    lastName: 'RudderStack',
                    ownerId: '15',
                  },
                },
                properties: {
                  revenue: {
                    amount: 1232,
                    currency: 'inr',
                    test: 123,
                  },
                  price: {
                    amount: 3000,
                    currency: 'USD',
                  },
                },
                event: 'Product Viewed',
                type: 'track',
                originalTimestamp: '2023-11-10T14:42:44.724Z',
                timestamp: '2023-11-22T10:12:44.757+05:30',
              },
              destination: {
                DestinationDefinition: {
                  Config: {
                    cdkV2Enabled: true,
                  },
                },
                Config: {
                  accessToken: 'testAccessToken',
                  apiServer: 'standard',
                  sendAnonymousId: false,
                },
              },
              metadata: {
                jobId: 2,
              },
            },
            {
              message: {
                userId: 'user@5',
                groupId: 'rudderlabs',
                channel: 'web',
                context: {
                  traits: {
                    email: 'test+5@rudderlabs.com',
                    phone: '+91 9599999999',
                    firstName: 'John',
                    lastName: 'Snow',
                    ownerId: '17',
                  },
                },
                traits: {
                  name: 'RudderStack',
                  size: 500,
                  website: 'www.rudderstack.com',
                  industry: 'CDP',
                  plan: 'enterprise',
                },
                type: 'group',
                originalTimestamp: '2023-11-10T14:42:44.724Z',
                timestamp: '2023-11-22T10:12:44.757+05:30',
              },
              destination: {
                DestinationDefinition: {
                  Config: {
                    cdkV2Enabled: true,
                  },
                },
                Config: {
                  accessToken: 'testAccessToken',
                  apiServer: 'standard',
                  sendAnonymousId: false,
                },
              },
              metadata: {
                jobId: 3,
              },
            },
          ],
          destType: 'intercom',
        },
        method: 'POST',
      },
    },
    output: {
      response: {
        status: 200,
        body: {
          output: [
            {
              batched: false,
              batchedRequest: {
                body: {
                  JSON: {
                    email: 'test@rudderlabs.com',
                    external_id: 'user@1',
                    last_seen_at: 1700628164,
                    name: 'Test Rudderlabs',
                    owner_id: 13,
                    phone: '+91 9999999999',
                    custom_attributes: {
                      address: 'california usa',
                      age: 23,
                    },
                  },
                  XML: {},
                  FORM: {},
                  JSON_ARRAY: {},
                },
                endpoint: 'https://api.intercom.io/contacts',
                files: {},
                headers: {
                  Authorization: 'Bearer testAccessToken',
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Intercom-Version': '2.10',
                },
                method: 'POST',
                params: {},
                type: 'REST',
                version: '1',
              },
              destination: {
                Config: {
                  accessToken: 'testAccessToken',
                  apiServer: 'standard',
                  sendAnonymousId: false,
                },
                DestinationDefinition: {
                  Config: {
                    cdkV2Enabled: true,
                  },
                },
              },
              metadata: [
                {
                  jobId: 1,
                },
              ],
              statusCode: 200,
            },
            {
              batched: false,
              batchedRequest: {
                body: {
                  FORM: {},
                  JSON: {
                    created_at: 1700628164,
                    email: 'test+3@rudderlabs.com',
                    event_name: 'Product Viewed',
                    metadata: {
                      price: {
                        amount: 3000,
                        currency: 'USD',
                      },
                      revenue: {
                        amount: 1232,
                        currency: 'inr',
                        test: 123,
                      },
                    },
                    user_id: 'user@3',
                  },
                  JSON_ARRAY: {},
                  XML: {},
                },
                endpoint: 'https://api.intercom.io/events',
                files: {},
                headers: {
                  Authorization: 'Bearer testAccessToken',
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Intercom-Version': '2.10',
                },
                method: 'POST',
                params: {},
                type: 'REST',
                version: '1',
              },
              destination: {
                Config: {
                  accessToken: 'testAccessToken',
                  apiServer: 'standard',
                  sendAnonymousId: false,
                },
                DestinationDefinition: {
                  Config: {
                    cdkV2Enabled: true,
                  },
                },
              },
              metadata: [
                {
                  jobId: 2,
                },
              ],
              statusCode: 200,
            },
            {
              batched: false,
              batchedRequest: {
                body: {
                  JSON: {
                    id: '657264e9018c0a647s45',
                  },
                  XML: {},
                  FORM: {},
                  JSON_ARRAY: {},
                },
                endpoint: 'https://api.intercom.io/contacts/70701240741e45d040/companies',
                files: {},
                headers: {
                  Authorization: 'Bearer testAccessToken',
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Intercom-Version': '2.10',
                },
                method: 'POST',
                params: {},
                type: 'REST',
                version: '1',
              },
              destination: {
                Config: {
                  accessToken: 'testAccessToken',
                  apiServer: 'standard',
                  sendAnonymousId: false,
                },
                DestinationDefinition: {
                  Config: {
                    cdkV2Enabled: true,
                  },
                },
              },
              metadata: [
                {
                  jobId: 3,
                },
              ],
              statusCode: 200,
            },
          ],
        },
      },
    },
  },
];

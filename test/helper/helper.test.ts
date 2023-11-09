import GeoLocationHelper from '../../src/helpers/geoLocation';

describe('GeoLocationHelper tests', () => {
  test('when context.geo is valid object & address is available in context.traits, map all values in context.traits.address', () => {
    const contextObj = {
      geo: {
        city: 'Gurugram',
        country: 'IN',
        ip: '223.190.82.63',
        location: '28.459700,77.028200',
        postal: '122001',
        region: 'Haryana',
        timezone: 'Asia/Kolkata',
      },
      app: {
        build: '1.0.0',
        name: 'RudderLabs JavaScript SDK',
        namespace: 'com.rudderlabs.javascript',
        version: '1.1.0-beta.2',
      },
      ip: '0.0.0.0',
      library: {
        name: 'RudderLabs JavaScript SDK',
        version: '1.1.0-beta.2',
      },
      locale: 'en-GB',
      os: {
        name: '',
        version: '',
      },
      screen: {
        density: 2,
      },
      traits: {
        email: 'example124@email.com',
        name: 'abcd124',
        address: {
          street: 'dalhousie street',
        },
      },
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    };

    const msg = {
      anonymousId: '297b0750-934b-4411-b66c-9b418cdbc0c9',
      channel: 'web',
      context: contextObj,
      integrations: {
        All: true,
      },
      messageId: '0bab70e8-bf2f-449a-a19b-ca6e3bfed9b7',
      originalTimestamp: '2020-03-23T18:27:28.98Z',
      receivedAt: '2020-03-23T23:57:29.022+05:30',
      request_ip: '[::1]:51573',
      sentAt: '2020-03-23T18:27:28.981Z',
      timestamp: '2020-03-23T23:57:29.021+05:30',
      type: 'identify',
      userId: 'abcd-124',
    };

    const enhancedMsg = GeoLocationHelper.getMessageWithGeoLocationData(msg);

    expect(enhancedMsg.context.traits.address).not.toBe(undefined);
    expect(enhancedMsg.context.traits.address).toEqual({
      city: 'Gurugram',
      country: 'IN',
      postalCode: '122001',
      state: 'Haryana',
      street: 'dalhousie street',
    });
  });

  test('when context.geo is valid object & address is not available at all, map all values in traits.address', () => {
    const contextObj = {
      geo: {
        city: 'Gurugram',
        country: 'IN',
        ip: '223.190.82.63',
        location: '28.459700,77.028200',
        postal: '122001',
        region: 'Haryana',
        timezone: 'Asia/Kolkata',
      },
      app: {
        build: '1.0.0',
        name: 'RudderLabs JavaScript SDK',
        namespace: 'com.rudderlabs.javascript',
        version: '1.1.0-beta.2',
      },
      ip: '0.0.0.0',
      library: {
        name: 'RudderLabs JavaScript SDK',
        version: '1.1.0-beta.2',
      },
      locale: 'en-GB',
      os: {
        name: '',
        version: '',
      },
      screen: {
        density: 2,
      },
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    };

    const msg = {
      anonymousId: '297b0750-934b-4411-b66c-9b418cdbc0c9',
      channel: 'web',
      context: contextObj,
      integrations: {
        All: true,
      },
      messageId: '0bab70e8-bf2f-449a-a19b-ca6e3bfed9b7',
      originalTimestamp: '2020-03-23T18:27:28.98Z',
      receivedAt: '2020-03-23T23:57:29.022+05:30',
      request_ip: '[::1]:51573',
      sentAt: '2020-03-23T18:27:28.981Z',
      timestamp: '2020-03-23T23:57:29.021+05:30',
      type: 'identify',
      userId: 'abcd-124',
    };

    const enhancedMsg = GeoLocationHelper.getMessageWithGeoLocationData(msg);

    expect(enhancedMsg.traits.address).not.toBe(undefined);
    expect(enhancedMsg.traits.address).toEqual({
      city: 'Gurugram',
      country: 'IN',
      postalCode: '122001',
      state: 'Haryana',
    });
  });

  test('when context.geo is valid object & address has some in traits, enrich those that are not available in traits.address', () => {
    const contextObj = {
      geo: {
        city: 'Gurugram',
        country: 'IN',
        ip: '223.190.82.63',
        location: '28.459700,77.028200',
        postal: '122001',
        region: 'Haryana',
        timezone: 'Asia/Kolkata',
      },
      app: {
        build: '1.0.0',
        name: 'RudderLabs JavaScript SDK',
        namespace: 'com.rudderlabs.javascript',
        version: '1.1.0-beta.2',
      },
      ip: '0.0.0.0',
      library: {
        name: 'RudderLabs JavaScript SDK',
        version: '1.1.0-beta.2',
      },
      locale: 'en-GB',
      os: {
        name: '',
        version: '',
      },
      screen: {
        density: 2,
      },
      traits: {
        email: 'example124@email.com',
        name: 'abcd124',
      },
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    };

    const msg = {
      anonymousId: '297b0750-934b-4411-b66c-9b418cdbc0c9',
      channel: 'web',
      context: contextObj,
      integrations: {
        All: true,
      },
      traits: {
        address: {
          state: 'Himachal',
          country: 'INDIA',
          street: 'damgoo road',
        },
      },
      messageId: '0bab70e8-bf2f-449a-a19b-ca6e3bfed9b7',
      originalTimestamp: '2020-03-23T18:27:28.98Z',
      receivedAt: '2020-03-23T23:57:29.022+05:30',
      request_ip: '[::1]:51573',
      sentAt: '2020-03-23T18:27:28.981Z',
      timestamp: '2020-03-23T23:57:29.021+05:30',
      type: 'identify',
      userId: 'abcd-124',
    };

    const enhancedMsg = GeoLocationHelper.getMessageWithGeoLocationData(msg);

    expect(enhancedMsg.traits.address).not.toBe(undefined);
    expect(enhancedMsg.traits.address).toEqual({
      city: 'Gurugram',
      postalCode: '122001',
      // already in traits.address
      state: 'Himachal',
      country: 'INDIA',
      street: 'damgoo road',
    });
  });

  test('when context.geo is valid object & address is already enhanced, do not enrich with values from context.geo', () => {
    const contextObj = {
      geo: {
        city: 'Gurugram',
        country: 'IN',
        ip: '223.190.82.63',
        location: '28.459700,77.028200',
        postal: '122001',
        region: 'Haryana',
        timezone: 'Asia/Kolkata',
      },
      app: {
        build: '1.0.0',
        name: 'RudderLabs JavaScript SDK',
        namespace: 'com.rudderlabs.javascript',
        version: '1.1.0-beta.2',
      },
      ip: '0.0.0.0',
      library: {
        name: 'RudderLabs JavaScript SDK',
        version: '1.1.0-beta.2',
      },
      locale: 'en-GB',
      os: {
        name: '',
        version: '',
      },
      screen: {
        density: 2,
      },
      traits: {
        email: 'example124@email.com',
        name: 'abcd124',
      },
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    };

    const msg = {
      anonymousId: '297b0750-934b-4411-b66c-9b418cdbc0c9',
      channel: 'web',
      context: contextObj,
      integrations: {
        All: true,
      },
      traits: {
        address: {
          state: 'Himachal',
          country: 'INDIA',
          street: 'damgoo road',
          city: 'Dharamshala',
          postalCode: '123546',
        },
      },
      messageId: '0bab70e8-bf2f-449a-a19b-ca6e3bfed9b7',
      originalTimestamp: '2020-03-23T18:27:28.98Z',
      receivedAt: '2020-03-23T23:57:29.022+05:30',
      request_ip: '[::1]:51573',
      sentAt: '2020-03-23T18:27:28.981Z',
      timestamp: '2020-03-23T23:57:29.021+05:30',
      type: 'identify',
      userId: 'abcd-124',
    };

    const enhancedMsg = GeoLocationHelper.getMessageWithGeoLocationData(msg);

    expect(enhancedMsg.traits.address).not.toBe(undefined);
    expect(enhancedMsg.traits.address).toEqual({
      // already in traits.address
      state: 'Himachal',
      country: 'INDIA',
      street: 'damgoo road',
      city: 'Dharamshala',
      postalCode: '123546',
    });
    // same reference check
    expect(enhancedMsg.traits.address).toStrictEqual(msg.traits.address);
  });

  test("when context.geo doesn't have some properties, do not make use of non-available values in context.geo", () => {
    const contextObj = {
      geo: {
        city: '',
        country: '',
        ip: '223.190.82.63',
        location: '28.459700,77.028200',
        postal: '122001',
        region: 'Haryana',
        timezone: 'Asia/Kolkata',
      },
      app: {
        build: '1.0.0',
        name: 'RudderLabs JavaScript SDK',
        namespace: 'com.rudderlabs.javascript',
        version: '1.1.0-beta.2',
      },
      ip: '0.0.0.0',
      library: {
        name: 'RudderLabs JavaScript SDK',
        version: '1.1.0-beta.2',
      },
      locale: 'en-GB',
      os: {
        name: '',
        version: '',
      },
      screen: {
        density: 2,
      },
      traits: {
        email: 'example124@email.com',
        name: 'abcd124',
      },
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    };

    const msg = {
      anonymousId: '297b0750-934b-4411-b66c-9b418cdbc0c9',
      channel: 'web',
      context: contextObj,
      integrations: {
        All: true,
      },
      traits: {
        address: {
          state: 'Himachal',
          street: 'damgoo road',
          postalCode: '123546',
        },
      },
      messageId: '0bab70e8-bf2f-449a-a19b-ca6e3bfed9b7',
      originalTimestamp: '2020-03-23T18:27:28.98Z',
      receivedAt: '2020-03-23T23:57:29.022+05:30',
      request_ip: '[::1]:51573',
      sentAt: '2020-03-23T18:27:28.981Z',
      timestamp: '2020-03-23T23:57:29.021+05:30',
      type: 'identify',
      userId: 'abcd-124',
    };

    const enhancedMsg = GeoLocationHelper.getMessageWithGeoLocationData(msg);

    expect(enhancedMsg.traits.address).not.toBe(undefined);
    expect(enhancedMsg.traits.address).toEqual({
      // already in traits.address
      state: 'Himachal',
      street: 'damgoo road',
      postalCode: '123546',
    });
  });

  test("when context.geo doesn't exist, enrichment would not happen", () => {
    const contextObj = {
      app: {
        build: '1.0.0',
        name: 'RudderLabs JavaScript SDK',
        namespace: 'com.rudderlabs.javascript',
        version: '1.1.0-beta.2',
      },
      ip: '0.0.0.0',
      library: {
        name: 'RudderLabs JavaScript SDK',
        version: '1.1.0-beta.2',
      },
      locale: 'en-GB',
      os: {
        name: '',
        version: '',
      },
      screen: {
        density: 2,
      },
      traits: {
        email: 'example124@email.com',
        name: 'abcd124',
      },
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    };

    const msg = {
      anonymousId: '297b0750-934b-4411-b66c-9b418cdbc0c9',
      channel: 'web',
      context: contextObj,
      integrations: {
        All: true,
      },
      messageId: '0bab70e8-bf2f-449a-a19b-ca6e3bfed9b7',
      originalTimestamp: '2020-03-23T18:27:28.98Z',
      receivedAt: '2020-03-23T23:57:29.022+05:30',
      request_ip: '[::1]:51573',
      sentAt: '2020-03-23T18:27:28.981Z',
      timestamp: '2020-03-23T23:57:29.021+05:30',
      type: 'identify',
      userId: 'abcd-124',
    };

    const enhancedMsg = GeoLocationHelper.getMessageWithGeoLocationData(msg);

    expect(enhancedMsg).toEqual({});
    // @ts-ignore
    expect(enhancedMsg?.traits?.address).toBe(undefined);
    // @ts-ignore
    expect(enhancedMsg?.context?.traits?.address).toBe(undefined);
  });

  test('when message is null(no geo-enrichment happened), enrichment would not happen', () => {
    const msg = null;

    // @ts-ignore
    const enhancedMsg = GeoLocationHelper.getMessageWithGeoLocationData(msg);

    expect(enhancedMsg).toEqual({});
    // @ts-ignore
    expect(enhancedMsg?.traits).toBe(undefined);
  });
});

describe('get addressKey & address tests', () => {
  test('addressKey should be "traits.address", when address is not present but traits object is present', () => {
    const { key: addressKey } = GeoLocationHelper.getAddressKeyAndValue({
      traits: {
        name: 'Bruce Wayne',
        age: 35,
        title: 'The Dark Knight',
      },
    });
    expect(addressKey).toEqual('traits.address');
  });

  test('addressKey should be "context.traits.address", when address is not present but traits object is present', () => {
    const { key: addressKey } = GeoLocationHelper.getAddressKeyAndValue({
      context: {
        traits: {
          name: 'Bruce Wayne',
          age: 35,
          title: 'The Dark Knight',
        },
      },
    });
    expect(addressKey).toEqual('context.traits.address');
  });

  test('addressKey should be "traits.address", when traits object is not present at all', () => {
    const { key: addressKey } = GeoLocationHelper.getAddressKeyAndValue({
      anonymousId: '129893-2idi9292',
      originalTimestamp: '2020-04-17T14:42:44.722Z',
      receivedAt: '2020-04-17T20:12:44.758+05:30',
      request_ip: '[::1]:53513',
      sentAt: '2020-04-17T14:42:44.722Z',
      context: {
        page: {
          path: '/tests/html/index4.html',
          referrer: '',
          search: '',
          title: '',
          url: 'http://localhost/tests/html/index4.html',
        },
        screen: {
          density: 2,
        },
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
      },
    });
    expect(addressKey).toEqual('traits.address');
  });

  test('addressKey should be "context.traits.address", when address is present in context.traits & address is not present in traits', () => {
    const { key: addressKey } = GeoLocationHelper.getAddressKeyAndValue({
      anonymousId: '129893-2idi9292',
      originalTimestamp: '2020-04-17T14:42:44.722Z',
      receivedAt: '2020-04-17T20:12:44.758+05:30',
      request_ip: '[::1]:53513',
      sentAt: '2020-04-17T14:42:44.722Z',
      context: {
        page: {
          path: '/tests/html/index4.html',
          referrer: '',
          search: '',
          title: '',
          url: 'http://localhost/tests/html/index4.html',
        },
        screen: {
          density: 2,
        },
        traits: {
          address: {
            city: 'Gotham',
          },
        },
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
      },
      traits: {
        age: 23,
        firstname: 'Selina Kyle',
      },
    });
    expect(addressKey).toEqual('context.traits.address');
  });

  test('addressKey should be "traits.address", when empty payload is sent', () => {
    const { key: addressKey } = GeoLocationHelper.getAddressKeyAndValue({});
    expect(addressKey).toEqual('traits.address');
  });
});

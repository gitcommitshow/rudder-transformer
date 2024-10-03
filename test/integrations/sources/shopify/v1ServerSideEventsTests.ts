// This file contains the test scenarios for the server-side events from the Shopify GraphQL API for
// the v1 transformation flow
import utils from '../../../../src/v0/util';
const defaultMockFns = () => {
  jest.spyOn(utils, 'generateUUID').mockReturnValue('5d3e2cb6-4011-5c9c-b7ee-11bc1e905097');
};
import { dummySourceConfig } from './constants';

export const v1ServerSideEventsScenarios = [
  {
    name: 'shopify',
    description: 'Track Call -> Checkout Updated event',
    module: 'source',
    version: 'v1',
    input: {
      request: {
        body: [
          {
            event: {
              id: 35374569160817,
              token: 'e89d4437003b6b8480f8bc7f8036a659',
              cart_token: 'Z2NwLXVzLWVhc3QxOjAxSjdXRjdOQjY0NlFFNFdQVEg0MTRFM1E2',
              email: 'testuser101@gmail.com',
              gateway: null,
              buyer_accepts_marketing: false,
              buyer_accepts_sms_marketing: false,
              sms_marketing_phone: null,
              created_at: '2024-09-16T03:50:15+00:00',
              updated_at: '2024-09-17T03:29:02-04:00',
              landing_site: '/',
              note: '',
              note_attributes: [],
              referring_site: '',
              shipping_lines: [
                {
                  code: 'Standard',
                  price: '6.90',
                  original_shop_price: '6.90',
                  original_shop_markup: '0.00',
                  source: 'shopify',
                  title: 'Standard',
                  presentment_title: 'Standard',
                  phone: null,
                  tax_lines: [],
                  custom_tax_lines: null,
                  markup: '0.00',
                  carrier_identifier: null,
                  carrier_service_id: null,
                  api_client_id: '580111',
                  delivery_option_group: {
                    token: '26492692a443ee35c30eb82073bacaa8',
                    type: 'one_time_purchase',
                  },
                  delivery_expectation_range: null,
                  delivery_expectation_type: null,
                  id: null,
                  requested_fulfillment_service_id: null,
                  delivery_category: null,
                  validation_context: null,
                  applied_discounts: [],
                },
              ],
              shipping_address: {
                first_name: 'testuser',
                address1: 'oakwood bridge',
                phone: null,
                city: 'KLF',
                zip: '85003',
                province: 'Arizona',
                country: 'United States',
                last_name: 'dummy',
                address2: 'Hedgetown',
                company: null,
                latitude: null,
                longitude: null,
                name: 'testuser dummy',
                country_code: 'US',
                province_code: 'AZ',
              },
              taxes_included: false,
              total_weight: 0,
              currency: 'USD',
              completed_at: null,
              phone: null,
              customer_locale: 'en-US',
              line_items: [
                {
                  key: '41327143059569',
                  fulfillment_service: 'manual',
                  gift_card: false,
                  grams: 0,
                  presentment_title: 'The Multi-location Snowboard',
                  presentment_variant_title: '',
                  product_id: 7234590638193,
                  quantity: 1,
                  requires_shipping: true,
                  sku: '',
                  tax_lines: [],
                  taxable: true,
                  title: 'The Multi-location Snowboard',
                  variant_id: 41327143059569,
                  variant_title: '',
                  variant_price: '729.95',
                  vendor: 'pixel-testing-rs',
                  unit_price_measurement: {
                    measured_type: null,
                    quantity_value: null,
                    quantity_unit: null,
                    reference_value: null,
                    reference_unit: null,
                  },
                  compare_at_price: null,
                  line_price: '729.95',
                  price: '729.95',
                  applied_discounts: [],
                  destination_location_id: null,
                  user_id: null,
                  rank: null,
                  origin_location_id: null,
                  properties: {},
                },
              ],
              name: '#35374569160817',
              abandoned_checkout_url:
                'https://pixel-testing-rs.myshopify.com/59026964593/checkouts/ac/Z2NwLXVzLWVhc3QxOjAxSjdXRjdOQjY0NlFFNFdQVEg0MTRFM1E2/recover?key=8195f56ee0de230b3a0469cc692f3436',
              discount_codes: [],
              tax_lines: [],
              presentment_currency: 'USD',
              source_name: 'web',
              total_line_items_price: '729.95',
              total_tax: '0.00',
              total_discounts: '0.00',
              subtotal_price: '729.95',
              total_price: '736.85',
              total_duties: '0.00',
              device_id: null,
              user_id: null,
              location_id: null,
              source_identifier: null,
              source_url: null,
              source: null,
              closed_at: null,
              customer: {
                id: 7188389789809,
                email: 'testuser101@gmail.com',
                accepts_marketing: false,
                created_at: null,
                updated_at: null,
                first_name: 'testuser',
                last_name: 'dummy',
                orders_count: 0,
                state: 'disabled',
                total_spent: '0.00',
                last_order_id: null,
                note: null,
                verified_email: true,
                multipass_identifier: null,
                tax_exempt: false,
                phone: null,
                tags: '',
                currency: 'USD',
                accepts_marketing_updated_at: null,
                admin_graphql_api_id: 'gid://shopify/Customer/7188389789809',
                default_address: {
                  id: null,
                  customer_id: 7188389789809,
                  first_name: 'testuser',
                  last_name: 'dummy',
                  company: null,
                  address1: 'oakwood bridge',
                  address2: 'Hedgetown',
                  city: 'KLF',
                  province: 'Arizona',
                  country: 'United States',
                  zip: '85003',
                  phone: null,
                  name: 'testuser dummy',
                  province_code: 'AZ',
                  country_code: 'US',
                  country_name: 'United States',
                  default: true,
                },
                last_order_name: null,
                marketing_opt_in_level: null,
              },
              query_parameters: {
                topic: ['checkouts_update'],
                writeKey: ['2l9QoM7KRMJLMcYhXNUVDT0Mqbd'],
              },
            },
            source: dummySourceConfig,
          },
        ],
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      pathSuffix: '',
    },
    output: {
      response: {
        status: 200,
        body: [
          {
            output: {
              batch: [
                {
                  context: {
                    library: {
                      name: 'RudderStack Shopify Cloud',
                      version: '1.0.0',
                    },
                    integration: {
                      name: 'SHOPIFY',
                    },
                    topic: 'checkouts_update',
                    cart_token: 'Z2NwLXVzLWVhc3QxOjAxSjdXRjdOQjY0NlFFNFdQVEg0MTRFM1E2',
                  },
                  integrations: {
                    SHOPIFY: true,
                  },
                  type: 'track',
                  event: 'Checkout Updated',
                  properties: {
                    order_id: 35374569160817,
                    value: '736.85',
                    tax: '0.00',
                    currency: 'USD',
                    token: 'e89d4437003b6b8480f8bc7f8036a659',
                    cart_token: 'Z2NwLXVzLWVhc3QxOjAxSjdXRjdOQjY0NlFFNFdQVEg0MTRFM1E2',
                    email: 'testuser101@gmail.com',
                    buyer_accepts_marketing: false,
                    buyer_accepts_sms_marketing: false,
                    created_at: '2024-09-16T03:50:15+00:00',
                    updated_at: '2024-09-17T03:29:02-04:00',
                    landing_site: '/',
                    note: '',
                    note_attributes: [],
                    referring_site: '',
                    shipping_lines: [
                      {
                        code: 'Standard',
                        price: '6.90',
                        original_shop_price: '6.90',
                        original_shop_markup: '0.00',
                        source: 'shopify',
                        title: 'Standard',
                        presentment_title: 'Standard',
                        phone: null,
                        tax_lines: [],
                        custom_tax_lines: null,
                        markup: '0.00',
                        carrier_identifier: null,
                        carrier_service_id: null,
                        api_client_id: '580111',
                        delivery_option_group: {
                          token: '26492692a443ee35c30eb82073bacaa8',
                          type: 'one_time_purchase',
                        },
                        delivery_expectation_range: null,
                        delivery_expectation_type: null,
                        id: null,
                        requested_fulfillment_service_id: null,
                        delivery_category: null,
                        validation_context: null,
                        applied_discounts: [],
                      },
                    ],
                    taxes_included: false,
                    total_weight: 0,
                    customer_locale: 'en-US',
                    name: '#35374569160817',
                    abandoned_checkout_url:
                      'https://pixel-testing-rs.myshopify.com/59026964593/checkouts/ac/Z2NwLXVzLWVhc3QxOjAxSjdXRjdOQjY0NlFFNFdQVEg0MTRFM1E2/recover?key=8195f56ee0de230b3a0469cc692f3436',
                    discount_codes: [],
                    tax_lines: [],
                    presentment_currency: 'USD',
                    source_name: 'web',
                    total_line_items_price: '729.95',
                    total_discounts: '0.00',
                    subtotal_price: '729.95',
                    total_duties: '0.00',
                    products: [
                      {
                        product_id: 7234590638193,
                        price: '729.95',
                        brand: 'pixel-testing-rs',
                        quantity: 1,
                        key: '41327143059569',
                        fulfillment_service: 'manual',
                        gift_card: false,
                        grams: 0,
                        presentment_title: 'The Multi-location Snowboard',
                        presentment_variant_title: '',
                        requires_shipping: true,
                        tax_lines: [],
                        taxable: true,
                        title: 'The Multi-location Snowboard',
                        unit_price_measurement: {
                          measured_type: null,
                          quantity_value: null,
                          quantity_unit: null,
                          reference_value: null,
                          reference_unit: null,
                        },
                        compare_at_price: null,
                        line_price: '729.95',
                        applied_discounts: [],
                        destination_location_id: null,
                        user_id: null,
                        rank: null,
                        origin_location_id: null,
                        properties: {},
                        variant: '41327143059569 729.95 ',
                      },
                    ],
                  },
                  userId: '7188389789809',
                  traits: {
                    email: 'testuser101@gmail.com',
                    firstName: 'testuser',
                    lastName: 'dummy',
                    address: {
                      id: null,
                      customer_id: 7188389789809,
                      first_name: 'testuser',
                      last_name: 'dummy',
                      company: null,
                      address1: 'oakwood bridge',
                      address2: 'Hedgetown',
                      city: 'KLF',
                      province: 'Arizona',
                      country: 'United States',
                      zip: '85003',
                      phone: null,
                      name: 'testuser dummy',
                      province_code: 'AZ',
                      country_code: 'US',
                      country_name: 'United States',
                      default: true,
                    },
                    acceptsMarketing: false,
                    orderCount: 0,
                    state: 'disabled',
                    totalSpent: '0.00',
                    verifiedEmail: true,
                    taxExempt: false,
                    tags: '',
                    currency: 'USD',
                    adminGraphqlApiId: 'gid://shopify/Customer/7188389789809',
                    shippingAddress: {
                      first_name: 'testuser',
                      address1: 'oakwood bridge',
                      phone: null,
                      city: 'KLF',
                      zip: '85003',
                      province: 'Arizona',
                      country: 'United States',
                      last_name: 'dummy',
                      address2: 'Hedgetown',
                      company: null,
                      latitude: null,
                      longitude: null,
                      name: 'testuser dummy',
                      country_code: 'US',
                      province_code: 'AZ',
                    },
                  },
                  timestamp: '2024-09-17T07:29:02.000Z',
                  anonymousId: '5d3e2cb6-4011-5c9c-b7ee-11bc1e905097',
                },
              ],
            },
          },
        ],
      },
    },
    mockFns: () => {
      defaultMockFns();
    },
  },
  {
    name: 'shopify',
    description: 'Track Call -> Cart Update event',
    module: 'source',
    version: 'v1',
    input: {
      request: {
        body: [
          {
            event: {
              id: 'Z2NwLXVzLWVhc3QxOjAxSjdXRjdOQjY0NlFFNFdQVEg0MTRFM1E2',
              token: 'Z2NwLXVzLWVhc3QxOjAxSjdXRjdOQjY0NlFFNFdQVEg0MTRFM1E2',
              line_items: [
                {
                  id: 41327143059569,
                  properties: null,
                  quantity: 3,
                  variant_id: 41327143059569,
                  key: '41327143059569:90562f18109e0e6484b0c297e7981b30',
                  discounted_price: '729.95',
                  discounts: [],
                  gift_card: false,
                  grams: 0,
                  line_price: '2189.85',
                  original_line_price: '2189.85',
                  original_price: '729.95',
                  price: '729.95',
                  product_id: 7234590638193,
                  sku: '',
                  taxable: true,
                  title: 'The Multi-location Snowboard',
                  total_discount: '0.00',
                  vendor: 'pixel-testing-rs',
                  discounted_price_set: {
                    shop_money: {
                      amount: '729.95',
                      currency_code: 'USD',
                    },
                    presentment_money: {
                      amount: '729.95',
                      currency_code: 'USD',
                    },
                  },
                  line_price_set: {
                    shop_money: {
                      amount: '2189.85',
                      currency_code: 'USD',
                    },
                    presentment_money: {
                      amount: '2189.85',
                      currency_code: 'USD',
                    },
                  },
                  original_line_price_set: {
                    shop_money: {
                      amount: '2189.85',
                      currency_code: 'USD',
                    },
                    presentment_money: {
                      amount: '2189.85',
                      currency_code: 'USD',
                    },
                  },
                  price_set: {
                    shop_money: {
                      amount: '729.95',
                      currency_code: 'USD',
                    },
                    presentment_money: {
                      amount: '729.95',
                      currency_code: 'USD',
                    },
                  },
                  total_discount_set: {
                    shop_money: {
                      amount: '0.0',
                      currency_code: 'USD',
                    },
                    presentment_money: {
                      amount: '0.0',
                      currency_code: 'USD',
                    },
                  },
                },
              ],
              note: '',
              updated_at: '2024-09-17T08:15:13.280Z',
              created_at: '2024-09-16T03:50:15.478Z',
              query_parameters: {
                topic: ['carts_update'],
                writeKey: ['2l9QoM7KRMJLMcYhXNUVDT0Mqbd'],
              },
            },
            source: dummySourceConfig,
          },
        ],
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      pathSuffix: '',
    },
    output: {
      response: {
        status: 200,
        body: [
          {
            output: {
              batch: [
                {
                  context: {
                    library: {
                      name: 'RudderStack Shopify Cloud',
                      version: '1.0.0',
                    },
                    integration: {
                      name: 'SHOPIFY',
                    },
                    topic: 'carts_update',
                  },
                  integrations: {
                    SHOPIFY: true,
                  },
                  type: 'track',
                  event: 'Cart Update',
                  properties: {
                    id: 'Z2NwLXVzLWVhc3QxOjAxSjdXRjdOQjY0NlFFNFdQVEg0MTRFM1E2',
                    token: 'Z2NwLXVzLWVhc3QxOjAxSjdXRjdOQjY0NlFFNFdQVEg0MTRFM1E2',
                    note: '',
                    updated_at: '2024-09-17T08:15:13.280Z',
                    created_at: '2024-09-16T03:50:15.478Z',
                    products: [
                      {
                        product_id: 7234590638193,
                        price: '729.95',
                        brand: 'pixel-testing-rs',
                        quantity: 3,
                        id: 41327143059569,
                        properties: null,
                        key: '41327143059569:90562f18109e0e6484b0c297e7981b30',
                        discounted_price: '729.95',
                        discounts: [],
                        gift_card: false,
                        grams: 0,
                        line_price: '2189.85',
                        original_line_price: '2189.85',
                        original_price: '729.95',
                        taxable: true,
                        title: 'The Multi-location Snowboard',
                        total_discount: '0.00',
                        discounted_price_set: {
                          shop_money: {
                            amount: '729.95',
                            currency_code: 'USD',
                          },
                          presentment_money: {
                            amount: '729.95',
                            currency_code: 'USD',
                          },
                        },
                        line_price_set: {
                          shop_money: {
                            amount: '2189.85',
                            currency_code: 'USD',
                          },
                          presentment_money: {
                            amount: '2189.85',
                            currency_code: 'USD',
                          },
                        },
                        original_line_price_set: {
                          shop_money: {
                            amount: '2189.85',
                            currency_code: 'USD',
                          },
                          presentment_money: {
                            amount: '2189.85',
                            currency_code: 'USD',
                          },
                        },
                        price_set: {
                          shop_money: {
                            amount: '729.95',
                            currency_code: 'USD',
                          },
                          presentment_money: {
                            amount: '729.95',
                            currency_code: 'USD',
                          },
                        },
                        total_discount_set: {
                          shop_money: {
                            amount: '0.0',
                            currency_code: 'USD',
                          },
                          presentment_money: {
                            amount: '0.0',
                            currency_code: 'USD',
                          },
                        },
                        variant: '41327143059569  ',
                      },
                    ],
                  },
                  anonymousId: '5d3e2cb6-4011-5c9c-b7ee-11bc1e905097',
                },
              ],
            },
          },
        ],
      },
    },
    mockFns: () => {
      defaultMockFns();
    },
  },
];

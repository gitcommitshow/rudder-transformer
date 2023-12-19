export const data = [
    {
        name: 'am',
        description: 'Test 0',
        feature: 'router',
        module: 'destination',
        version: 'v0',
        input: {
            request: {
                body: {
                    input: [
                        {
                            "message": {
                                "channel": "web",
                                "context": {
                                    "app": {
                                        "build": "1.0.0",
                                        "name": "RudderLabs JavaScript SDK",
                                        "namespace": "com.rudderlabs.javascript",
                                        "version": "1.0.0"
                                    },
                                    "traits": {
                                        "anonymousId": "123456",
                                        "email": "test@rudderstack.com",
                                        "address": {
                                            "city": "kolkata",
                                            "country": "India",
                                            "postalCode": 712136,
                                            "state": "WB",
                                            "street": ""
                                        },
                                        "ip": "0.0.0.0",
                                        "age": 26
                                    },
                                    "library": {
                                        "name": "RudderLabs JavaScript SDK",
                                        "version": "1.0.0"
                                    },
                                    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
                                    "locale": "en-US",
                                    "ip": "0.0.0.0",
                                    "os": {
                                        "name": "",
                                        "version": ""
                                    },
                                    "screen": {
                                        "density": 2
                                    },
                                    "page": {
                                        "path": "/destinations/amplitude",
                                        "referrer": "",
                                        "search": "",
                                        "title": "",
                                        "url": "https://docs.rudderstack.com/destinations/amplitude",
                                        "category": "destination",
                                        "initial_referrer": "https://docs.rudderstack.com",
                                        "initial_referring_domain": "docs.rudderstack.com"
                                    }
                                },
                                "type": "identify",
                                "messageId": "84e26acc-56a5-4835-8233-591137fca468",
                                "session_id": "3049dc4c-5a95-4ccd-a3e7-d74a7e411f22",
                                "originalTimestamp": "2019-10-14T09:03:17.562Z",
                                "anonymousId": "123456",
                                "userId": "123456",
                                "integrations": {
                                    "All": true
                                },
                                "sentAt": "2019-10-14T09:03:22.563Z"
                            },
                            "metadata": {
                                "jobId": 1
                            },
                            "destination": {
                                "Config": {
                                    "apiKey": "abcde",
                                    "groupTypeTrait": "email",
                                    "groupValueTrait": "age"
                                }
                            }
                        },
                        {
                            "message": {
                                "channel": "web",
                                "context": {
                                    "app": {
                                        "build": "1.0.0",
                                        "name": "RudderLabs JavaScript SDK",
                                        "namespace": "com.rudderlabs.javascript",
                                        "version": "1.0.0"
                                    },
                                    "traits": {
                                        "email": "test@rudderstack.com",
                                        "anonymousId": "12345"
                                    },
                                    "library": {
                                        "name": "RudderLabs JavaScript SDK",
                                        "version": "1.0.0"
                                    },
                                    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
                                    "locale": "en-US",
                                    "os": {
                                        "name": "",
                                        "version": ""
                                    },
                                    "screen": {
                                        "density": 2
                                    },
                                    "page": {
                                        "path": "/destinations/amplitude",
                                        "referrer": "",
                                        "search": "",
                                        "title": "",
                                        "url": "https://docs.rudderstack.com/destinations/amplitude",
                                        "category": "destination",
                                        "initial_referrer": "https://docs.rudderstack.com",
                                        "initial_referring_domain": "docs.rudderstack.com"
                                    }
                                },
                                "request_ip": "1.1.1.1",
                                "type": "page",
                                "messageId": "5e10d13a-bf9a-44bf-b884-43a9e591ea71",
                                "session_id": "3049dc4c-5a95-4ccd-a3e7-d74a7e411f22",
                                "originalTimestamp": "2019-10-14T11:15:18.299Z",
                                "anonymousId": "00000000000000000000000000",
                                "userId": "12345",
                                "properties": {
                                    "path": "/destinations/amplitude",
                                    "referrer": "",
                                    "search": "",
                                    "title": "",
                                    "url": "https://docs.rudderstack.com/destinations/amplitude",
                                    "category": "destination",
                                    "initial_referrer": "https://docs.rudderstack.com",
                                    "initial_referring_domain": "docs.rudderstack.com"
                                },
                                "integrations": {
                                    "All": true
                                },
                                "name": "ApplicationLoaded",
                                "sentAt": "2019-10-14T11:15:53.296Z"
                            },
                            "metadata": {
                                "jobId": 2
                            },
                            "destination": {
                                "Config": {
                                    "apiKey": "abcde"
                                }
                            }
                        }
                    ],
                    destType: 'am',
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
                            "batchedRequest": [
                                {
                                    "version": "1",
                                    "type": "REST",
                                    "method": "POST",
                                    "endpoint": "https://api2.amplitude.com/2/httpapi",
                                    "headers": {
                                        "Content-Type": "application/json"
                                    },
                                    "params": {},
                                    "body": {
                                        "JSON": {
                                            "api_key": "abcde",
                                            "events": [
                                                {
                                                    "os_name": "Chrome",
                                                    "os_version": "77.0.3865.90",
                                                    "device_model": "Mac",
                                                    "library": "rudderstack",
                                                    "platform": "Web",
                                                    "device_id": "123456",
                                                    "app_name": "RudderLabs JavaScript SDK",
                                                    "app_version": "1.0.0",
                                                    "language": "en-US",
                                                    "session_id": -1,
                                                    "insert_id": "84e26acc-56a5-4835-8233-591137fca468",
                                                    "city": "kolkata",
                                                    "country": "India",
                                                    "user_properties": {
                                                        "initial_referrer": "https://docs.rudderstack.com",
                                                        "initial_referring_domain": "docs.rudderstack.com",
                                                        "anonymousId": "123456",
                                                        "email": "test@rudderstack.com",
                                                        "postalCode": 712136,
                                                        "state": "WB",
                                                        "street": "",
                                                        "ip": "0.0.0.0",
                                                        "age": 26
                                                    },
                                                    "event_type": "$identify",
                                                    "time": 1571043797562,
                                                    "user_id": "123456",
                                                    "ip": "0.0.0.0"
                                                }
                                            ],
                                            "options": {
                                                "min_id_length": 1
                                            }
                                        },
                                        "XML": {},
                                        "JSON_ARRAY": {},
                                        "FORM": {}
                                    },
                                    "files": {},
                                    "userId": "123456"
                                }
                            ],
                            "metadata": [
                                {
                                    "jobId": 1
                                }
                            ],
                            "batched": false,
                            "statusCode": 200,
                            "destination": {
                                "Config": {
                                    "apiKey": "abcde",
                                    "groupTypeTrait": "email",
                                    "groupValueTrait": "age"
                                }
                            }
                        },
                        {
                            "batchedRequest": [
                                {
                                    "version": "1",
                                    "type": "REST",
                                    "method": "POST",
                                    "endpoint": "https://api2.amplitude.com/2/httpapi",
                                    "headers": {
                                        "Content-Type": "application/json"
                                    },
                                    "params": {},
                                    "body": {
                                        "JSON": {
                                            "api_key": "abcde",
                                            "events": [
                                                {
                                                    "os_name": "Chrome",
                                                    "os_version": "77.0.3865.90",
                                                    "device_model": "Mac",
                                                    "library": "rudderstack",
                                                    "platform": "Web",
                                                    "device_id": "00000000000000000000000000",
                                                    "app_name": "RudderLabs JavaScript SDK",
                                                    "app_version": "1.0.0",
                                                    "language": "en-US",
                                                    "event_type": "Viewed ApplicationLoaded Page",
                                                    "event_properties": {
                                                        "path": "/destinations/amplitude",
                                                        "referrer": "",
                                                        "search": "",
                                                        "title": "",
                                                        "url": "https://docs.rudderstack.com/destinations/amplitude",
                                                        "category": "destination",
                                                        "initial_referrer": "https://docs.rudderstack.com",
                                                        "initial_referring_domain": "docs.rudderstack.com",
                                                        "name": "ApplicationLoaded"
                                                    },
                                                    "session_id": -1,
                                                    "insert_id": "5e10d13a-bf9a-44bf-b884-43a9e591ea71",
                                                    "ip": "1.1.1.1",
                                                    "user_properties": {
                                                        "initial_referrer": "https://docs.rudderstack.com",
                                                        "initial_referring_domain": "docs.rudderstack.com",
                                                        "email": "test@rudderstack.com",
                                                        "anonymousId": "12345"
                                                    },
                                                    "user_id": "12345",
                                                    "time": 1571051718299
                                                }
                                            ],
                                            "options": {
                                                "min_id_length": 1
                                            }
                                        },
                                        "XML": {},
                                        "JSON_ARRAY": {},
                                        "FORM": {}
                                    },
                                    "files": {},
                                    "userId": "00000000000000000000000000"
                                }
                            ],
                            "metadata": [
                                {
                                    "jobId": 2
                                }
                            ],
                            "batched": false,
                            "statusCode": 200,
                            "destination": {
                                "Config": {
                                    "apiKey": "abcde"
                                }
                            }
                        }
                    ],
                },
            },
        },
    }
];

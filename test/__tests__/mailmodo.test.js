const integration = "mailmodo";
const name = "Mailmodo";

const fs = require("fs");
const path = require("path");

const version = "v0";

const transformer = require(`../../src/${version}/destinations/${integration}/transform`);
const { assertRouterOutput } = require('../testHelper');

// Processor Test files
const testDataFile = fs.readFileSync(
  path.resolve(__dirname, `./data/${integration}.json`)
);
const testData = JSON.parse(testDataFile);

// Router Test files
const inputRouterDataFile = fs.readFileSync(
  path.resolve(__dirname, `./data/${integration}_router_input.json`)
);
const outputRouterDataFile = fs.readFileSync(
  path.resolve(__dirname, `./data/${integration}_router_output.json`)
);
const inputRouterData = JSON.parse(inputRouterDataFile);
const expectedRouterData = JSON.parse(outputRouterDataFile);

describe(`${name} Tests`, () => {
  describe("Processor", () => {
    testData.forEach((dataPoint, index) => {
      it(`${index}. ${integration} - ${dataPoint.description}`, () => {
        try {
          const output = transformer.process(dataPoint.input);
          expect(output).toEqual(dataPoint.output);
        } catch (error) {
          expect(error.message).toEqual(dataPoint.output.error);
        }
      });
    });
  });
  describe("Router", () => {
    it("Payload", async () => {
      try {
        const routerOutput = await transformer.processRouterDest(
          inputRouterData
        );
        //assertRouterOutput(routerOutput, inputRouterData); //TODO fix
        expect(routerOutput).toEqual(expectedRouterData);
      } catch (error) {
        expect(error.message).toEqual(expectedRouterData.error);
      }
    });
  });
});

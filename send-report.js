const axios = require("axios");
const fs = require("fs");

// auth options:
const baseUrl = "https://jana12.testrail.io/index.php?";
const username = "jana.djordjevic.bg@gmail.com";
const password = "";
const projectId = 2;

const readTestResultsJson = () => {
  let rawData = fs.readFileSync("./mochawesome-report/mochawesome.json");
  let results = JSON.parse(rawData);
  const tests = results.results[0].suites[0].suites[0].tests;
  return tests;
};

const getTestId = (testRailTests, testCaseId) => {
  const result = testRailTests.find((item) => item.case_id == testCaseId);
  return result?.id
};

const postResults = async () => {
  // create a new run
  const run = await axios({
    method: "post",
    url: `${baseUrl}/api/v2/add_run/${projectId}`,
    auth: {
      username,
      password,
    },
    data: {
      name: `Test run ${new Date()}`,
      include_all: true,
    },
  });
  const runId = run.data.id;
  // const runId = 23;
  // get tests for run:
  const testsResponse = await axios({
    method: "get",
    url: `${baseUrl}/api/v2/get_tests/${runId}`,
    auth: {
      username,
      password,
    },
  });
  const testRailTests = testsResponse.data.tests;
    // create results json:
  // status ids:
  /**
     1: Passed
     2: Blocked
     3: Untested (not allowed when adding a new result)
     4: Retest
     5: Failed
     */
  const testResultsTests = readTestResultsJson();
  const resultsData = [];
//   console.log('tests je: ', testResultsTests)
  testResultsTests.forEach((test) => {
    const testId = test.title.split("#")[0].trim();
    // console.log('test id je: ', getTestId(testRailTests, testId.substring(1)).id)
    resultsData.push({
      test_id: getTestId(testRailTests, testId.substring(1)),
      status_id: test.pass ? 1 : 5,
    });
  });

  // post results
//   console.log("results bodu je: ", resultsData)
  const results = await axios({
    method: "post",
    url: `${baseUrl}/api/v2/add_results/${runId}`,
    auth: {
      username,
      password,
    },
    data: {
      results: resultsData,
    },
  });
};

(async function example() {
  await postResults();
})();

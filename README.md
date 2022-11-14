# Sample CircleCI -> TestRail Integration demo

This is a sample project to test out integration of TestRail with CircleCI.
The following workflow is set up: 
- changes are pushed to the GitHub repo
- this triggers a circleCI workflow that runs sample tests and sends the test results to TestRail

## Setting up the project
### Prerequisites
- Github and CircleCI set up and connected
- Test plan created in TestRail (make sure test case name is included at the start of the test title in the project, followed by a #)
- update ./send-report.js with your TestRail credentials (baseUrl, username, password and projectId - lines 5, 6, 7 and 8)

### Testing the changes
- to see the integration in action, you can simply push a change to your github repo. If all steps in the prerequisits have been followed, you should see CircleCI run the tests and then as a final step, push test results to the TestRail. This should result in a new Test Run being added to your TestRail project.

### Running the project locally
- run: ```npm install ``` to install all required dependencies
- run: ```npm test ``` to run the tests and save results to ./mochawesome-report
- run: ```npm run send-report  ``` to send test results to TestRail




## 📚 Description

Introduction: You are tasked with building the skeleton of a Backend for Frontend (BFF) application using Node.js.
The BFF application will consist of multiple components, and for this assessment, we will focus only on creating the BFF and one
component which is a logging service.
The primary consumer of the logging service would be a courier mobile app used by couriers to make deliveries.
The courier app will send log lines to the BFF, which would then send those log lines to an elastic search system which could be queried
on-demand later (building the elastic search system is not required in this assignment).
These log lines will be debugging data that allows the mobile team to understand what is happening in the application as couriers make
their deliveries.
Task Description:

1. Logging Service (GraphQL):
   Create a logging service that exposes a GraphQL (GQL) API that will handle and store log lines on disk.
   The purpose of this service is to collect log lines from various sources and store them for future processing.
2. Expose Logging Functionality as REST API:
   Implement a REST API that exposes the functionality of the logging service through the BFF.
   This API should allow clients to send log lines using RESTful endpoints.
3. Scalability & Kubernetes (k8s):
   Ensure that your BFF application is designed for high traffic and can scale horizontally.
   Your solution should be deployable in a Kubernetes (k8s) infrastructure.

Requirements:

- ✅ Implement the entire application in TypeScript.
- ✅ Deliver a Git repository containing all the source code.
- ✅ Include clear instructions on how to set up and run the service.
- ✅ Provide sample Postman or cURL requests for testing.

Timeframe:
This test is expected to be completed within 3-4 hours.

Prioritization:
Done is better than perfect. Prioritize tasks based on your understanding of the problem. Explain any additional features or
improvements you would consider if you had extra time during the test.

Flaws Identification and Mitigation:
Identify potential flaws in the provided solution and propose how you would address them. For instance, think about security, error handling, and performance issues that may arise.

## 💻 Requirements

In order to run this project you will need

- [Node v20.9](https://nodejs.org/en). This is the current LTS
- [NVM](https://github.com/nvm-sh/nvm). This will allow you to switch node versions if you have multiple projects.
- Docker (Will add instalation later)
- [PNPM](https://pnpm.io/) or [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [YARN](https://yarnpkg.com/)

## Installation

You can switch your commands to run either with pnpm, yarn or npm. (You should replace pnpm, if you want to execute them with different package manager)

```bash
$ pnpm install
```

## 🏃 Running the app

🏠 Local mode:

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

🐳 Docker:

Run from root of the project:

```
docker build -t logger-bff .
docker run -p 3000:3000 logger-bff
```

This will start the application in a docker, exposing the port 3000.

Next steps, would be to add horizontal scalling. (depending on K8)

## Manual check

### - REST API

Start the app with one of the previous commands to test the rest api or the graphql resolvers.

CURL:

```
curl --location 'localhost:3000/logger' \
--header 'Content-Type: application/json' \
--data '{
    "message":"YOU_CAN__ADD_YOUR_MESSAGE_HERE"
}'
```

If you are using postman, you can try with the endpoint:
POST: `localhost:3000/logger`

And in the body add the JSON:

```
{ "message":"This is message cannot be blank, otherwise it will throw a domain exception."}
```

### - Graphql resolver:

The app has playground available at: `http://localhost:3000/graphql`, you can add:

```
mutation {
   createLog(message: "THIS_CAN_BE_YOUR_MESSAGE AND IT CAN HAVE SPACES")
}
```

# 🚧 Next Steps and TO DO's : 🚧

### Obvious flaws:

- Disable playground in prod (Could be done with ENV_VARIABLE)
- Validate entries (sanitize, escape messages)
- Change hardcoded PORT in src/main.ts, to be injected by the infra (k8s), an ENV_VARIABLE would be really nice.
- Test, unit test, integration/functional. E2E might not be needed for this particular use case. If we plan to scale this to millions of logs per seconds, load/stress testing with [k6](https://k6.io/docs/get-started/running-k6/) could be a really nice step.
- Validate the request (user, authentication, permissions, etc.). This could be use with a sidecard (reverse proxy) or by [nestjs](https://docs.nestjs.com/security/authentication).

### 🙏 Performance improvements:

- Writting files (logs in this case) in disk is pretty slow, and if this service is heavily lodaded, this could mean lots of error, desyncronization and messages lost. One potential way to improve this (if we want to keep writing in disk), is adding a buffer, and avoiding going to the disk on every request. We could save the file every N seconds, or once the buffer is full.
- We can also think of some log rotation improvement, we dont want to save 1GB of text files.
- Horizontal/Vertically scaling: We need to set the app deployment config file. Either if we are using helm or another k8s app manager. We can add the min resources this app need (CPU and memory), and the limits (in case we want to sace it vertically). In case we get to a given threshold (CPU, memory limits), we can scale horizontaly. This would also depend on the cost's of vertically vs horizontally scaling (Given this use case horizontally seems the TO GO option). If we expect to have millions of logs, this is a MUST DO.
- Rate limiting: We could also add a rate limiter to our appilication, depending on how much traffic we could recieve. We could add this with a reverse-proxy (sidecard pattern) or a [config improvement](https://docs.nestjs.com/security/rate-limiting)

I can still think of many possible improvements, but I think those are the most important ones.

### Potential Improvements:

- Error handling, we could improve our errors and responses to our clients. [See example](https://docs.nestjs.com/exception-filters)
- Monitoring: We could check metrics of failed request, bff uptime, memory and CPU usage.
- Alerting: It would be nice if we could add alerts for different cases, for example, we could add a healthceck endpoint to be hit every 5 seconds, if the endpoint is down, probably the app is down aswell. A notification in email, slack or other ways could save downtime.
- Change output path of the saved files. This file is being saved at the /dist/logger/application/logs.txt, we might need to re-think this or define a outputpath,.

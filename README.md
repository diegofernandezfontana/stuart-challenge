## Description

Stuart Coding challenge.

Introduction:
You are tasked with building the skeleton of a Backend for Frontend (BFF) application using Node.js.
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

## Requirements

In order to run this project you will need

- [Node v20.9](https://nodejs.org/en). This is the current LTS
- [NVM](https://github.com/nvm-sh/nvm)
- Docker (Will add instalation later)
- [PNPM](https://pnpm.io/) or [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [YARN](https://yarnpkg.com/)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

# nodejs-2023-q2-crud-api

## Description

Simple CRUD API using in-memory database underneath.

### Build scenarios

Implemented tow build scenarios:

* No bundle - use ```start:prod-no-bundle```, to build app in ```dist``` directory. Uses tsc and its config.
* Bundle all in one file, to build app in one file in ```build``` directory. Uses webpack and its config.

### About architecture

Used simplified MVC with DTO.

During to shortage of time on development, some concepts may be different/degraded/absent.

By the same reason, DB implementation represented in static object.

## Usage

1. Clone project
2. Install dependencies by running ```npm i```
3. Modify ```.env.example``` to your needs and then rename it into ```.env```
4. Launch server
    1. Launch server in ```development``` mode by running ```npm run start:dev```
    2. Launch server in ```production``` by running ```npm run start:prod```

# nodejs-2023-q2-crud-api

## Description

Simple CRUD API using in-memory database underneath.

### Build scenarios

Implemented tow build scenarios:

* No bundle - use ```start:prod-no-bundle```, to build app in ```dist``` directory. Uses tsc and its config.
* Bundle all in one file, to build app in one file in ```build``` directory. Uses webpack and its config.

### About architecture

Used simplified MVC with DTO.
For API output used standards from <https://jsonapi.org/>.

During to shortage of time on development, some concepts may be different/degraded/absent.

By the same reason, DB implementation represented in static object.

## Usage

1. Clone project
2. Install dependencies by running ```npm i```
3. Modify ```.env.example``` to your needs and then rename it into ```.env```
4. Launch server
    1. Launch server in ```development``` mode by running ```npm run start:dev```
    2. Launch server in ```production``` by running ```npm run start:prod```

## Endpoints

### api/users

* **GET** `api/users` is used to get all ```User```
  * Answer with `status code` **200** and all ```User``` records
* **GET** `api/users/{userId}` is used to get specific ```User```
  * Answer with `status code` **200** and record with `id === userId` if it exists
  * Answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  * Answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
* **POST** `api/users` is used to create record about new ```User``` and store it in database
  * Answer with `status code` **201** and newly created record
  * Answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
* **PUT** `api/users/{userId}` is used to update existing ```User```
  * Answer with `status code` **200** and updated record
  * Answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  * Answer with ` status code` **404** and corresponding message if record with `id === userId` doesn't exist
* **DELETE** `api/users/{userId}` is used to delete existing ```User``` from database
  * Answer with `status code` **204** if the record is found and deleted
  * Answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  * Answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

Response body form server on success will be in JSON object with field ```data``` witch is Array of ```User```.

Example:

```json
{
    "data": [
        {
            "uuid": "efc5c092-9517-420d-a837-9b503f61a369",
            "name": "Sam",
            "age": 22,
            "hobbies": []
        }
    ]
}
```

Response body form server on error will be in JSON object with field ```errors``` witch is Array of object with field title type of sting.

Example:

```json
{
    "errors": [
        {
            "title": "User not found"
        }
    ]
}
```

Request body should follow this schema:  

```ts
{
  "username": string,
  "age": number,
  "hobbies": Array<String>
}
```

Example:

```json
{
    "name": "Sam",
    "age": 22,
    "hobbies": []
}
```

Note: it's allowed to send in this object field uuid, but this field will be ignored.

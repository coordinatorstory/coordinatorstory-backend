# OurStory API Documentation

[https://ourstory-api.herokuapp.com/api/](https://ourstory-api.herokuapp.com/api/)

## Contents

1. [Requests & Responses](#requests--responses)
1. [HTML Response Codes](#html-response-codes)
1. [Example Error Message](#example-error-message)
1. [Protected Routes](#protected-routes)
1. Auth
   - [Create User](#create-user)
   - [Log in](#log-in)
1. Stories (public)
   - [Get all stories](#get-all-stories)
1. Users (protected)

## Requests & Responses

All responses come in JSON. All requests must include a `Content-Type` of `application/json` and the body must be valid JSON.

## HTML Response Codes

| Code  | Description                                             |
| ----- | ------------------------------------------------------- |
| `200` | Success, data may be returned                           |
| `201` | Resource created, new resource returned                 |
| `204` | Success, no data returned (PUT and DELETE methods)      |
| `400` | Bad request, error message returned                     |
| `401` | Unauthorized to access resource, error message returned |
| `404` | Resource not found, error message returned              |
| `500` | Server error, error message returned                    |

## Example Error Message

Error messages will be returned the in the format of:

```json
{ "error": "Information about the error will be here." }
```

## Protected Routes

Requests to protected routes must include a valid encoded JWT string in the `Authorization` header. Unauthorized requests will receive a `401` response.

## Auth

### Create User

`POST /auth/register`

#### Request

| Property     | Description                                    |
| ------------ | ---------------------------------------------- |
| `username`   | String, alphanumeric, min-length `3`, required |
| `password`   | String, min-length `6`, required               |
| `email`      | Email address, required                        |
| `first_name` | String, required                               |
| `last_name`  | String, required                               |
| `title`      | String                                         |

#### Response

| Property  | Description        |
| --------- | ------------------ |
| `message` | Welcome message    |
| `token`   | Encoded JWT string |

### Log in

`POST /auth/login`

#### Request

| Property   | Description                                    |
| ---------- | ---------------------------------------------- |
| `username` | String, alphanumeric, min-length `3`, required |
| `password` | String, min-length `6`, required               |

#### Response

| Property  | Description        |
| --------- | ------------------ |
| `message` | Welcome message    |
| `token`   | Encoded JWT string |

## Stories (public)

### Get all stories

`GET /stories`

#### Request

Optional query string `country` to get stories by country. E.g. `/stories?country=bolivia` to get all stories with `country` similar to "Bolivia".

#### Response

An array of Story objects with the shape of:

| Property      |
| ------------- |
| `id`          |
| `title`       |
| `country`     |
| `description` |

Or an empty array if no stories are found.

## Users (protected)

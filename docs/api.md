# OurStory API Documentation

[https://ourstory-api.herokuapp.com/api/](https://ourstory-api.herokuapp.com/api/)

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
{"error": "Information about the error will be here."}
```
## Auth

1. __User Registration__
   
   `POST /auth/register`

   Request

   | Property   | Description                                                      |
   | ---------- | ---------------------------------------------------------------- |
   | username   | String, alphanumeric, min-length `3`, max-length `255`, required |
   | password   | String, min-length `6`, required                                 |
   | email      | Email address, required                                          |
   | first_name | String, required                                                 |
   | last_name  | String, required                                                 |
   | title      | String                                                           |

    Response

    | Property | Description        |
    | -------- | ------------------ |
    | message  | Welcome message    |
    | token    | Encoded JWT string |
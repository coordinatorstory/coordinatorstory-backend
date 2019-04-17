# OurStory API Documentation

## HTML Response Codes

- 200: Success, data may be returned
- 201: Resource created, new resource returned
- 204: Success, no data returned (PUT and DELETE methods)
- 400: Bad request, error message returned
- 401: Unauthorized to access resource, error message returned
- 404: Resource not found, error message returned
- 500: Server error, error message returned

## Error Messages

Error messages will be returned the in the format of:

```json
{"error": "Error message"}
```


# cloud-json-store
store json docs via google firebase and cloud-store

## Stack
NPM packages:
- Google Firebase Admin (for connecting to the database)
- Joi (for validating data)
- Express (API)
- UUID (for creating UUIDs)

## Install
Clone the repo and install all NPM packages
```
npm install
```
Setup a firebase app and download the credentials file and place it in `firebase/credentials`. Replace the file path and the firebase app name in `firebase/database.js`.

## Endpoints

### GET /api/v1/data
- name - of the JSON doc
- key (length: 36) - in response object of request when creating the JSON doc (POST /api/v1/data)

## POST /api/v1/data
- name - of the JSON doc to create
- data - valid JSON string (e.g. JSON.stringify of object)
key of the doc is in the response object
<br>Example
```json
{
    "status": "success",
    "message": "🟢 data stored",
    "data": {
        "key": "98c658c0-a98d-11ea-bc5f-ddcda6d16f11",
        "collection": "helloWorld_98c658c0-a98d-11ea-bc5f-ddcda6d16f11"
    }
}
```
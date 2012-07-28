NodeJS -- Simperium Client
==========================

Implemented the parts I've needed so far, which is really just the create user and auth user.

## Docs

Request Callbacks are in the form of `function (err, respObj, body) {}`. Further in this document these will be expressed as `cb`.

```javascript
var simperium = require('./simperium')
var auth = simperium.Auth(appID, apiKey, opts)
auth.create({ username: username, password: password }, cb)
auth.authorize({ username: username, password: password }, cb)

var api = simperium.Api(appID, authToken, opts)
var bucket = api.bucket(bucketName)
bucket.list(cb)

```

### `Simperium.Auth(appId, apiKey, opts)`

* `appId` (*string*) - The appId for your application.
* `apiKey` (*string*) - The apiKey for your application.
* `opts` (*object, optional*) - Options object.  The following are valid keys:
  1. `host` (*string*) - The host for the simperium server defaults to `auth.simperium.com`
  1. `version` (*string*) - The api version, defaults to `1`


### `Auth#create(info, cb)`

* `info` (*object*) - The info needs the following values:
  1. username (*string*) — Usernames currently must be a valid email address
  1. password (*string*) — Password for the user
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. access_token (*string*) — Use token to access data for this user
  1. userid (*string*) — A unique id that won't change if user changes their username


### `Auth#authorize`
### `Auth#update`
### `Auth#reset\_password`
### `Auth#delete`

### `Api#bucket(name)`

* `name` (*string*) - name of the Bucket.

Returns a `Bucket` object.

### `Bucket#list(opts, cb)`

* `opts` (*object, optional*) - An options object with the following are valid key/values:
  1. limit (*int*) — Maximum number of objects to return
  1. mark (*string*) — A cursor to continue retrieving pages from (returned from previous index fetch)
  1. since (*string*) — Return only objects changed since this cursor
  1. data (*bool*) — Include current object data
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. cursor — A cursor referencing the latest change for this user in this bucket
  1. mark — If returned, a cursor indicating next page to fetch index for
  1. index — A list of objects


### `Bucket#all(opts, cb)`

* `opts` (*object, optional*) - An options object with the following are valid key/values:
  1. cv (*string*) — A cursor id to retrieve changes from
  1. data (*bool*) — Send 1 or True to return the current data with each change for an object
  1. username (*bool*) — Set this parameter to 1 to return the username with each change
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. An array of change objects.

### `Bucket#entry('name')`

* `name` (*string*) - Name of the Entity

Returns an `Entity` object.

### `Entry#get`
### `Entry#put`
### `Entry#delete`

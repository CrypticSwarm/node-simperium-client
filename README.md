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

Returns an Auth Object. The Auth object is your gate way into the user management features of simperium.

### `Auth#create(info, cb)`

* `info` (*object*) - The info needs the following values:
  1. username (*string*) — Usernames currently must be a valid email address
  1. password (*string*) — Password for the user
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. access_token (*string*) — Use token to access data for this user
  1. userid (*string*) — A unique id that won't change if user changes their username


### `Auth#authorize(info, cb)`

* `info` (*object*) - The info needs the following values:
  1. username — Usernames currently must be a valid email address
  1. password — Password for the user
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. access_token — Use token to access data for this user
  1. userid — A unique id that won't change if user changes their username

### `Auth#update(info, cb)`

* `info` (*object*) - The info needs the following values:
  1. username (*string*) — Usernames currently must be a valid email address
  1. password (*string*) — Password for the user
  1. new_username (*string, option*) — New username
  1. new_password (*string, option*) — New password
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. status (*string*) The status

### `Auth#reset_password(info, cb)`

* `info` (*object*) - The info needs the following values:
  1. username — Usernames currently must be a valid email address
  1. new_password — New password (optional)
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. status (*string*) The status

### `Auth#delete(info, cb)`

* `info` (*object*) - The info needs the following values:
  1. username — Usernames currently must be a valid email address
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. status (*string*) The status

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

### `Entry#get(cb)`


* `opts` (*object, optional*) - An options object with the following are valid key/values:
  1. urlParam (*string*) - `/v/{version number}` — A specific object version to retrieve
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. Res.header(X-Simperium-Version) — An HTTP response header indicating the object version retrieved
  1. { data }

### `Entry#put(opts, cb)`

* `opts` (*object, optional*) - An options object with the following are valid key/values:
  1. urlParam (*string*) - `/v/{version number}` — A specific object version to modify
  1. qs (*object*) - a query sting object with the following valid values:
      * clientid — A unique string identifying your client (useful for debugging and tracking changes)
      * ccid — A unique id for this change. If you need to resubmit this operation, you should send the same ccid to prevent duplicate operations.
      * response — Set this parameter to 1 to return resulting data
      * replace — By default, this endpoint will update the object with the data you submit. If you omit fields, then they won't be changed. If you need to remove fields, set replace to 1 to completely replace the object data with what you submit.
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. X-Simperium-Version — An HTTP response header indicating the current object version after the modify 
  1. { data } — If response was set to 1 in query parameter

### `Entry#delete(opts, cb)`


* `opts` (*object, optional*) - An options object with the following are valid key/values:
  1. urlParam (*string*) - `/v/{version number}` — A specific object version to delete, if you suppply this, delete will only succeed if the current object version matches this parameter
  1. qs (*object*) - a query sting object with the following valid values:
      * clientid (*string*)— A unique string identifying your client (useful for debugging and tracking changes)
      * ccid (*string*) — A unique id for this change. If you need to resubmit this operation, you should send the same ccid to prevent duplicate operations.
* `cb`  (*function(err, res, data)*) data passed to callback contains:
  1. X-Simperium-Version (*string*) — An HTTP (see res object second param to cb) response header indicating the current object version after the modify

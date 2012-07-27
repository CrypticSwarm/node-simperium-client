NodeJS -- Simperium Client
==========================

Implemented the parts I've needed so far, which is really just the create user and auth user.

## Docs

```javascript
var simperium = require('./simperium')
var auth = simperium.Auth(appID, apiKey, opts)
auth.create({ username: username, password: password }, function (err, respObj, body) {})
auth.authorize({ username: username, password: password }, function (err, respObj, body) {})

var api = simperium.Api(appID, authToken, opts)
var bucket = api.bucket(bucketName)
bucket.list(function (err, respObj, body) {})

```


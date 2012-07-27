var request = require('request')

module.exports = { Auth: Auth,
  Api: Api
}

function Auth(appid, key, opts) {
  if (!(this instanceof Auth)) return new Auth(appid, key, opts)
  opts = opts || {}
  this.id = appid
  this.key = key
  this.host = opts.host || 'auth.simperium.com'
  this.version = opts.version || 1
  this.headers = { 'X-Simperium-API-Key':  this.key }
}

Auth.prototype = {
  create: function create(data, cb) {
    var url = ['https:/', this.host, this.version, this.id, 'create/'].join('/')
    request({ url: url, json: data, headers: this.headers, method: 'POST' }, cb)
  },
  authorize: function authorize(data, cb) {
    var url = ['https:/', this.host, this.version, this.id, 'authorize/'].join('/')
    request({ url: url, json: data, headers: this.headers, method: 'POST'}, cb)
  }
}

function Api(appid, token, opts) {
  if (!(this instanceof Api)) return new Api(appid, token, opts)
  opts = opts || {}
  this.id = appid
  this.token = token
  this.host = opts.host || 'api.simperium.com'
  this.version = opts.version || 1
  this.headers = { 'X-Simperium-Token':  this.token }
}

Api.prototype = {
  bucket: Bucket
}

function Bucket(name, api) {
  if (!(this instanceof Bucket)) return new Bucket(name, this)
  this.name = name
  this.api = api
}

Bucket.prototype = {
  list: function (cb) {
    var api = this.api
    var url = ['https:/', api.host, api.version, api.id, this.name, 'index'].join('/')
    request({ url: url, headers: api.headers, method: 'GET'}, cb)
  }
}

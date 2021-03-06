var request = require('request')

module.exports = {
  Auth: Auth,
  Api: Api
}

function post(endPoint) {
  return function apiPost(data, cb) {
    var url = this.baseUrl
    var reqOpts = { url: url, json: data, headers: this.headers, method: 'POST' }
    if (endPoint) url += '/' + endPoint
    if (data.qs != null) {
      reqOpts.url += data.urlParam
      delete data.urlParam
    }
    if (data.qs != null) {
      reqOpts.qs += data.qs
      delete data.qs
    }
    request(, cb)
  }
}

function get(endPoint) {
  return function apiGet(data, cb) {
    var url = this.baseUrl
    if (endPoint) url += '/' + endPoint
    var reqOpts = { url: url, headers: this.headers, method: 'GET' }
    if (cb == null) cb = data
    else { 
      if (data.urlParam != null) {
        reqOpts.url += data.urlParam
        delete data.urlParam
      }
      reqOpts.qs = data
    }
    request(reqOpts, cb)
  }
}

function del(endpoint) {
  return function apiDelete(data, cb) {
    var url = this.baseUrl
    var reqOpts = { url: url, headers: this.headers, method: 'DELETE' }
    if (endPoint) url += '/' + endPoint
    if (cb == null) cb = data
    else {
      if (data.urlParam != null) {
        reqOpts.url += data.urlParam
        delete data.urlParam
      }
      reqOpts.qs = data
    }
    request(reqOpts, cb)
  }
}

function Auth(appid, key, opts) {
  if (!(this instanceof Auth)) return new Auth(appid, key, opts)
  opts = opts || {}
  this.id = appid
  this.key = key
  this.host = opts.host || 'auth.simperium.com'
  this.version = opts.version || 1
  this.headers = { 'X-Simperium-API-Key':  this.key }
  this.baseUrl = ['https:/', this.host, this.version, this.id].join('/')
}


Auth.prototype = {
  create: post('create/'),
  authorize: post('authorize/'),
  update: post('update/'),
  reset_password: post('reset_password/'),
  delete: post('delete/')
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
  this.baseUrl = ['https:/', api.host, api.version, api.id, this.name].join('/')
  this.headers = api.headers
}

Bucket.prototype = {
  list: get('index'),
  all: get('all'),
  entry: Entry
}

function Entry(name, bucket) {
  if (!(this instanceof Entry)) return new Entry(name, this)
  this.baseUrl = bucket.baseUrl + '/i/' + name
  this.headers = bucket.headers
  this.name = name
}

Entry.prototype = {
  get: get(),
  put: post(),
  delete: del()
}

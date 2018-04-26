import axios from 'axios'
import defaults from 'lodash.defaults'
import FetchingDataOptionsService from 'odd-fetching_data_options_service'

let OPTIONS = new WeakMap()
const DEFAULT_OPTIONS = {
  apiPath: '/api',
  apiVersion: 'v1',
  scope: 'web',
  resourceType: 'resources',
  attributes: [],
  editableAttributes: []
}

export default class Base {
  constructor(options = {}, attributes = {}) {
    OPTIONS.set(this, defaults(options, DEFAULT_OPTIONS))

    OPTIONS.get(this).attributes.forEach(attr => {
      this[attr] = attributes[attr]
    })
  }

  /**
   * 對 API 送出請求，拿回 resources 的 list
   *
   * @returns {Promise} 回傳 response 或 errors
   */
  static all(options = {}) {
    return axios.get(`${new this().apiBasePath()}?${FetchingDataOptionsService.call(options)}`)
  }

  /**
   * 對 API 送出請求，拿回單一 resource 的內容
   *
   * @param {number} id 指定的 resource ID
   * @returns {Promise} 回傳 response 或 errors
   */
  static find(id, options = {}) {
    return axios.get(`${new this().apiBasePath()}/${id}?${FetchingDataOptionsService.call(options)}`)
  }

  /**
   * 把目前的 resource 內容存到 server。
   *
   * @returns {Promise} 回傳 response 或 errors
   */
  save() {
    if (this.isNewRecord()) {
      return axios.post(this.apiBasePath(), this.requestBody())
    }
    return axios.put(`${this.apiBasePath()}/${this.id}`, this.requestBody())
  }

  /**
   * 刪除目前的 resource
   *
   * @returns {Promise} 回傳 response 或 errors
   */
  destroy() {
    return axios.delete(`${this.apiBasePath()}/${this.id}`)
  }

  /**
   *  Helpers
   */
  apiBasePath() {
    return `${OPTIONS.get(this).apiPath}/${OPTIONS.get(this).apiVersion}/${OPTIONS.get(this).scope}/${
      OPTIONS.get(this).resourceType
    }`
  }

  attributes(options = {}) {
    let result = {}

    if (options.all) {
      OPTIONS.get(this).attributes.forEach(attr => {
        result[attr] = this[attr]
      })
    } else {
      OPTIONS.get(this).editableAttributes.forEach(attr => {
        result[attr] = this[attr]
      })
    }

    return result
  }

  isNewRecord() {
    return this.id === undefined
  }

  requestBody() {
    return {
      data: {
        type: OPTIONS.get(this).resourceType,
        attributes: this.attributes()
      }
    }
  }
}

const Provider = require('./Provider');
const axios = require('axios');
const querystring = require('querystring');


 class Weixin extends Provider {
    /**
     * 构造函数
     */
    constructor(opts) {
        super(opts);
        this.fetch=axios;
    }

      fg(opts = {}) {
         return {
             method: opts.method ? opts.method.toLowerCase() : 'get',
             url: `${opts.url}?${querystring.stringify({
                 access_token:  this.token,
                 ...opts.query,
             })}`,
             headers: opts.headers || {},
             data: opts.data,
         };
     }


     /**
      * 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。更多使用方法详见 小程序登录。
      */
    async jscode2session(code) {
        return this.fetch({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${this.options.AppID}&secret=${this.options.AppSecret}&js_code=${code}&grant_type=authorization_code`
        });
    }



 };


module.exports =Weixin;
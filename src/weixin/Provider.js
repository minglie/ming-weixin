

M=require('ming_node');


const config = {
    baseUrl: 'https://api.weixin.qq.com'
};


class Provider {
  constructor(opts) {
      this._apiHost = config.baseUrl;
      this.options = opts;
      // 缓存token
      this._token = {
          value: 0,
          expires: 0,
      };
  }

    get token() {
        // return "8673bb7f09fa3855b8812948b4b3cbda";

        const token = this._token;
        if (!token.expires || token.expires < +new Date()) {
            return this.getToken();
        }
        return token.value;
    }

    set token(val) {
        this._token = val;
        return this._token;
    }

    /**
     * 获取Token
     */
    async getToken() {
        return this.fetch({
            method: 'get',
            url: `${this._apiHost}/cgi-bin/token?grant_type=client_credential&appid=${this.options.AppID}&secret=${this.options.AppSecret}`,
        }).then(res => {
                const token = res.data;
                const now = +new Date();
                this.token = {
                    value: token.access_token,
                    // 钉钉颁发的token有效期为7200秒
                    // 提前 300秒 重新获取token
                    expires: now + ((7200 - 300) * 1000),
                };
                return token.access_token;
            });
    }



  get fetch() {
    return this._fetch;
  }
  set fetch(axios) {
    let agent = axios.create( {timeout:10000});

      if(0)
      agent.interceptors.request.use(config => {
          M.log(config.method,config.url,JSON.stringify(config.data))
          return config;
      },error=>{
           Promise.reject(error)
         }
      );


      if(0)
      agent.interceptors.response.use(
          response=>{
              return response;
          },
          error => {
              return Promise.reject(error)
          }
        )

       this._fetch = agent.request;
  }


}

module.exports = Provider;

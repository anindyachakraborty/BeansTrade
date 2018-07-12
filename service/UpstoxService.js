var Upstox = require("upstox");

class UpstoxService{
    constructor(apiKey,apiSecret){
        this.apiKey= apiKey;
        this.apiSecret =  apiSecret;
        this.accessToken;
        this.code;
        this.loginUri = "http://localhost:3000/api/getAccessToken";
        this.upstox ;
        this.test
    }
    Test1(test){
        this.test=test;
        return this.test;
    }
    getAccessCode(){
        this.upstox = new Upstox(this.apiKey);
        console.log(this.apiKey+"   hii");
        console.log(this.upstox)
        // this.loginUri 
        console.log(this.loginUri)
        var loginURL = this.upstox.getLoginUri(this.loginUri);
        
        console.log(loginURL);
        return loginURL;
    }
    generateAccessToken(code){
        this.code = code;
        var params = {
            "apiSecret" : this.apiSecret,
            "code" : this.code,
            "grant_type" : "authorization_code",
            "redirect_uri" : this.loginUri
        };
        console.log(params);
        console.log(this.apiSecret)
        this.upstox.getAccessToken(params);
        var resAccess;
        this.upstox.getAccessToken(params)
        .then(function(response) {
            this.accessToken = response.access_token;
            this.upstox.setToken(this.accessToken);
            console.log(response);
            reresAccess = response;
        })
        .catch(function(err) {
            console.log(err)
            return err;
        });
        console.log("complete")
        return resAccess;
    }
}
module.exports = UpstoxService;

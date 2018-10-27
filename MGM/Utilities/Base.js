
var Base = function(){

    this.homeurl = ('https://www.mgmresorts.com/en.html');
    
    this.navigateToHome = function(homeurl){
        browser.get(this.homeurl);
    }
    
    
    }
    
    module.exports = new Base();
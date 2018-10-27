var customers = require ('/Users/daniyarmokeev/Desktop/framework/MGM/pages/customer.page.js')
var using = require('jasmine-data-provider')
describe('Jasmine Data Provider', () => {
    beforeAll(function(){
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/manager/addCust')
    })
    function dataProvider(){
        return [
        {fName:"Elon", lName:'Musk',pCode:'334455'},
        {fName:"Warren", lName:'Buffet',pCode:'112233'},
        {fName:"Amanico", lName:'Ortega',pCode:'112233'}
    ]};

    using(dataProvider,function(data){
        it('should add customer: ' +data.fName+' '+data.lName, function(){
            element(by.model('fName')).sendKeys(data.fName);
            element(by.model('lName')).sendKeys(data.lName);
            element(by.model('postCd')).sendKeys(data.pCode);
            $('.btn-default').click();
            expect(browser.switchTo().alert().getText()).toContain('Customer added successfully with customer id :');
            
            browser.switchTo().alert().accept()
            
            element(by.xpath("(//button[@class='btn btn-lg tab'])[2]")).click()
            expect(customers.getLastRowValue(1).getText()).toEqual(data.fName)
            expect(customers.getLastRowValue(2).getText()).toEqual(data.lName)
            expect(customers.getLastRowValue(3).getText()).toEqual(data.pCode)

          
           element(by.xpath("//button[@class='btn btn-lg tab']")).click();
            
                
                
            
            
           
             
        })
    })

});
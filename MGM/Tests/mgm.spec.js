
 var Base = require('/Users/daniyarmokeev/Desktop/framework/MGM/Utilities/Base.js');
 var HomePage = require('/Users/daniyarmokeev/Desktop/framework/MGM/pages/home.page.js');
 var MGMData = require('/Users/daniyarmokeev/Desktop/framework/MGM/TestData/MGMData.json');
 var table = require('/Users/daniyarmokeev/Desktop/framework/MGM/pages/listTable.page.js');
 require('/Users/daniyarmokeev/Desktop/framework/MGM/Utilities/BuildbyHunter.js');
 
 var EC = protractor.ExpectedConditions;
 

    

 describe('MGM SUITE', () => {
    beforeEach(() => {
        Base.navigateToHome();
       
    });
   
    it('should verify the Book Now button',function(){
           expect( HomePage.buttonBN.getText()).toEqual(MGMData.appdata.buttonName);
    })

    it('should verify the header bar of the home page',function(){
        
        HomePage.menubar.getText().then(function(text){
            
            var final = text.join().split("\n");

            for(let i=0;i<MGMData.menubarjs.length;i++){
            
                expect(final[i]).toEqual(MGMData.menubarjs[i].names);
            }
         })
    })

    it('verify the alert message',function(){
         
        HomePage.firstButton.click();
        HomePage.firstDropDown.get(2).click();
        HomePage.secondButton.click();
        HomePage.secondDropDown.get(0).click();
        
        HomePage.thirdButton.click();
        HomePage.thirdDropDown1.click()
        HomePage.thirdDropDown2.click(); 
        
        HomePage.fourthButton.click();
        HomePage.fourthDropDown.get(1).click();
        
        
        HomePage.fifthButton.click();
        
        
        
        browser.ignoreSynchronization = true;
        browser.wait(EC.presenceOf(element(by.xpath("(//button[@class='btn-cta cta-default-pricing'])[2]"))),16000);
        element(by.xpath("(//button[@class='btn-cta cta-default-pricing'])[2]")).click() 
        browser.wait(EC.presenceOf(element(by.xpath("//a[@id='brand-logo']/span"))),12000);  
        element(by.xpath("//a[@id='brand-logo']/span")).click()
        expect($(".session-pop-up>p").getText()).toEqual(MGMData.alert.message);

     
    })


    xit('verify the second page number rooms',function(){
        //$("a[class='rotate-nav']").click();
        //browser.get("https://www.mgmresorts.com/en.html")
        element(by.linkText('MEETINGS')).click();



        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1])
            browser.sleep(3000);
            browser.ignoreSynchronization=true;
            expect(table.RowValue(4).getText()).toEqual(MGMData.tableData.number)
        
    
        //browser.switchTo().window(handles[0]);

            })
        }) 
    })


require('/Users/daniyarmokeev/Desktop/framework/MGM/Utilities/BuildbyHunter.js');
var HomePage = function(){

    this.buttonBN = $("button.icon-book-nav");
    this.menubar = $$(".nav-main.nav-items-9")
    this.firstButton = element(by.ngClick("getDropdownOpen($event,'region')"));
    this.firstDropDown = $$(".booking-widget-dropdown.region-selector-dropdown li");
    this.secondButton = element(by.ngClick("getDropdownOpen($event,'resort')"));
    this.secondDropDown =$$("#resort-selector-dd li ");
   
    
    this.thirdButton = element(by.ngClick("getDropdownOpen($event,'duration')"));
    this.thirdDropDown1 = element(by.xpath("(//div[@class='week-wrapper clearfix']//span[@class='day ng-scope ng-binding date-wrapper'])[11]"));
    this.thirdDropDown2 = element(by.xpath("(//div[@class='week-wrapper clearfix']//span[@class='day ng-scope ng-binding date-wrapper'])[15]"));
   
   
   
   
   
    this.fourthButton = element(by.ngClick("getDropdownOpen($event,'guest')"));
    this.fourthDropDown = $$(".custom-scroll.guest-scroll li ");
    this.fifthButton = element(by.ngClick("findRooms( $event )"));
}

module.exports = new HomePage();
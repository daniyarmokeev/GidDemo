var listTable = function(){

   
    this.table = element(by.xpath("//table[contains(@class, 'data-grid')]"));

    this.RowValue = (function(columnNumber){
        return this.table.element(by.xpath("tbody//tr[16]/td["+columnNumber+"]"));
    })
}


module.exports = new listTable();
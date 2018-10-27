
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
   framework: 'jasmine',

   directConnect: 'true',

   capabilities: {
       browserName: 'chrome',
       chromeOptions: {
        args:['--window-size=1920,1080']
        
        },
   },

   specs: ['/Users/daniyarmokeev/Desktop/framework/MGM/Tests/bank.spec.js'],

   // suites:{
   //   smoke:['../Tests/BankManagerSimple.spec.js','../Tests/demo.spec.js'],
   //   regression:['../Tests//*.spec.js']
   // },


   onPrepare: function(){
     //browser.manage().window().maximize();
     jasmine.getEnv().addReporter(new SpecReporter({
       displayFailuresSummary: true,
       displayFailuredSpec: true,
       displaySuiteNumber: true,
       displaySpecDuration: true,
       showstack: false
     }));

     // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
     jasmine.getEnv().addReporter(new HtmlReporter({
       baseDirectory: '/Users/daniyarmokeev/Desktop/TTT/QQQ/report',
       preserveDirectory: false,
       screenshotsSubfolder: 'images',
       jsonsSubfolder: 'jsons',
       docName: 'MGM-Report.html'
    }).getJasmine2Reporter());
   },
}
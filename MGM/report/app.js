var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should verify the Book Now button|MGM SUITE",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 1498,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.67"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254637685,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254637685,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://www.everestjs.net/static/le/last-event-tag-latest.min.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254637687,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://mgmdmp.okta.com/api/v1/sessions/me - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1540254637858,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254638185,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638185,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254638232,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638232,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254638513,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638513,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254638513,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638513,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254638516,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638516,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254638517,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638517,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254638530,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638531,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254638531,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638531,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254638630,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638630,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254638631,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638631,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #email-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254638665,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #global-nav-search-form: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254638665,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #password-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254638665,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #sign-in-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254638666,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #signin-widget-form: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254638666,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254638705,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638705,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254638705,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638705,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254638706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254638706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254638706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254638706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254638706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638707,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254638707,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638707,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254638707,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638707,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254638707,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638707,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254638711,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638711,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254638711,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638712,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254638712,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254638712,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254638712,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254638712,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254639679,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254639679,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254639679,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254639679,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254639679,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254639680,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254639680,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254639680,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254641694,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254641695,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254641695,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254641695,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254641696,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254641696,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254641697,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254641697,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/e17c7943-8db2-4470-9e2a-74a8d01f6776.woff2",
                "timestamp": 1540254641907,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254641907,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/e17c7943-8db2-4470-9e2a-74a8d01f6776.woff2",
                "timestamp": 1540254641907,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254641907,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/e17c7943-8db2-4470-9e2a-74a8d01f6776.woff2",
                "timestamp": 1540254641908,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254641908,
                "type": ""
            }
        ],
        "screenShotFile": "images/00ce0097-0011-0025-0059-00ef00860072.png",
        "timestamp": 1540254636951,
        "duration": 5179
    },
    {
        "description": "should verify the header bar of the home page|MGM SUITE",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 1498,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.67"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254644310,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254644311,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://www.everestjs.net/static/le/last-event-tag-latest.min.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254644314,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://mgmdmp.okta.com/api/v1/sessions/me - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1540254644568,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254644581,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644581,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254644582,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644582,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254644583,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644583,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254644583,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644583,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254644666,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644666,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254644667,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644667,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254644667,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644668,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254644668,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644668,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254644792,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644793,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254644793,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644793,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254644793,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644793,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254644793,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644793,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254644797,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644797,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254644797,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644797,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254644798,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644798,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254644798,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644798,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254644811,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644811,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254644811,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644811,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254644812,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644812,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254644812,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644812,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254644925,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644925,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254644926,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644926,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254644926,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644927,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254644927,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644927,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #email-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254644961,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #global-nav-search-form: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254644962,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #password-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254644962,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #sign-in-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254644962,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #signin-widget-form: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254644963,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254644971,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644971,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254644971,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644971,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254644971,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254644971,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254644971,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254644971,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254645959,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254645960,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254645960,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254645960,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254645961,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254645961,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254645962,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254645962,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/e17c7943-8db2-4470-9e2a-74a8d01f6776.woff2",
                "timestamp": 1540254646160,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254646160,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/e17c7943-8db2-4470-9e2a-74a8d01f6776.woff2",
                "timestamp": 1540254646160,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254646161,
                "type": ""
            }
        ],
        "screenShotFile": "images/00df003c-0041-00bf-00aa-0054003a00dd.png",
        "timestamp": 1540254643635,
        "duration": 2705
    },
    {
        "description": "verify the alert message|MGM SUITE",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 1498,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.67"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254648598,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254648598,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://www.everestjs.net/static/le/last-event-tag-latest.min.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254648601,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://mgmdmp.okta.com/api/v1/sessions/me - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1540254648689,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254648840,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254648840,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254648841,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254648841,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254648932,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254648932,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254648933,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254648933,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254649069,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649070,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254649070,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649070,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254649070,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649070,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254649071,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649071,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254649073,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649074,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254649074,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649074,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254649074,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649074,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254649075,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649075,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254649088,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649088,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254649088,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649088,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254649088,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649089,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254649089,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649089,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254649139,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649139,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254649139,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649140,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254649140,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649140,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254649140,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649140,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #email-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254649169,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #global-nav-search-form: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254649169,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #password-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254649169,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #sign-in-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254649170,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #signin-widget-form: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254649170,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254649178,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649178,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254649178,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649178,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254649178,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649178,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254649178,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649178,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 0 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254649229,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 0 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649229,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 0 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254649230,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 0 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649230,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 0 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254649230,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 0 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254649231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 0 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254649231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 0 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254649231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254650308,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254650308,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254650309,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254650309,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254650309,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254650310,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254650310,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254650311,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/e17c7943-8db2-4470-9e2a-74a8d01f6776.woff2",
                "timestamp": 1540254650507,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254650507,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/e17c7943-8db2-4470-9e2a-74a8d01f6776.woff2",
                "timestamp": 1540254650507,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254650507,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 12:21367 \"Deprecation warning: value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.\\nArguments: \\n[0] _isAMomentObject: true, _isUTC: false, _useUTC: false, _l: undefined, _i: 11/02/2018, _f: undefined, _strict: undefined, _locale: [object Object]\\nError\\n    at Function.createFromInputFallback (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:13:21774)\\n    at fb (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:14:5317)\\n    at qb (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:14:8343)\\n    at pb (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:14:8204)\\n    at ob (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:14:7923)\\n    at rb (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:14:8682)\\n    at sb (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:14:8716)\\n    at a (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:13:18770)\\n    at B (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:18:3079)\\n    at l.b.findRooms (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:18:13038)\"",
                "timestamp": 1540254651981,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254652600,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254652601,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://www.everestjs.net/static/le/last-event-tag-latest.min.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254652602,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://mgmdmp.okta.com/api/v1/sessions/me - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1540254653075,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/app/vendor.ceecd74c667d9248f4fc967c9933ea10.js 21:24179 \"Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.\\nArguments: \\n[0] _isAMomentObject: true, _isUTC: false, _useUTC: false, _l: undefined, _i: 11/02/2018, _f: undefined, _strict: undefined, _locale: [object Object]\\nError\\n    at Function.createFromInputFallback (https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/app/vendor.ceecd74c667d9248f4fc967c9933ea10.js:22:24586)\\n    at https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/app/vendor.ceecd74c667d9248f4fc967c9933ea10.js:22:42771\\n    at https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/app/vendor.ceecd74c667d9248f4fc967c9933ea10.js:22:42822\\n    at Ct (https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/app/vendor.ceecd74c667d9248f4fc967c9933ea10.js:22:43112)\\n    at https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/app/vendor.ceecd74c667d9248f4fc967c9933ea10.js:22:43502\\n    at Pt (https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/app/vendor.ceecd74c667d9248f4fc967c9933ea10.js:22:43564)\\n    at Dt (https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/app/vendor.ceecd74c667d9248f4fc967c9933ea10.js:22:43596)\\n    at r (https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/app/vendor.ceecd74c667d9248f4fc967c9933ea10.js:22:21427)\\n    at e.value (https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/global/components/TopNavRoomFilter.792f0857071305f382f1d38b9e98468e.js:1:83594)\\n    at e.value (https://www.mgmresorts.com/etc.clientlibs/mgm-clientlibs/global/components/TopNavRoomFilter.792f0857071305f382f1d38b9e98468e.js:1:82514)\"",
                "timestamp": 1540254653105,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://connect.facebook.net/en_US/fbevents.js 24:14549 \"[Facebook Pixel] - Duplicate Pixel ID: 481866798660369.\"",
                "timestamp": 1540254653748,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/room-booking.html#/rooms?numGuests=2&selectedPropertyId=0990fdce-7fc8-41b1-b8b6-9a25dce3db55&selectedRegion=Maryland&arrive=2018-11-02&depart=2018-11-07 0:0 Uncaught TypeError: Failed to register a ServiceWorker: ServiceWorker script evaluation failed",
                "timestamp": 1540254653919,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254655701,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254655702,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://www.everestjs.net/static/le/last-event-tag-latest.min.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254655703,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://mgmdmp.okta.com/api/v1/sessions/me - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1540254655805,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254655805,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254655806,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254655819,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254655819,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254655821,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254655821,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254655826,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254655826,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254655863,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254655863,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 2 elements with non-unique id #bill-us-state: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540254655880,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 2 elements with non-unique id #cancel-mlife-forgot-pw: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540254655880,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 2 elements with non-unique id #guest-info-cont-first-name: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540254655880,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 2 elements with non-unique id #guest-info-cont-last-name: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540254655881,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 4 elements with non-unique id #guest-info-email: (More info: https://goo.gl/9p2vKq) %o %o %o %o",
                "timestamp": 1540254655881,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 4 elements with non-unique id #guest-info-first-name: (More info: https://goo.gl/9p2vKq) %o %o %o %o",
                "timestamp": 1540254655882,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 2 elements with non-unique id #guest-info-forgot-pw-email: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540254655882,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 4 elements with non-unique id #guest-info-last-name: (More info: https://goo.gl/9p2vKq) %o %o %o %o",
                "timestamp": 1540254655882,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 2 elements with non-unique id #guest-info-login-email: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540254655882,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 2 elements with non-unique id #guest-info-mlife-email: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540254655882,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 2 elements with non-unique id #guest-info-mlife-password: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540254655883,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 4 elements with non-unique id #guest-info-phone: (More info: https://goo.gl/9p2vKq) %o %o %o %o",
                "timestamp": 1540254655883,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - [DOM] Found 2 elements with non-unique id #mlife-forgot: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540254655883,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254655901,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254655901,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/mgmlib.js 0 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254656474,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/mgmlib.js 0 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254656474,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254656991,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254656991,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254656992,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en/booking/your-reservation.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254656992,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 10:4910 \"TypeError: Cannot read property 'getAttribute' of null\\n    at https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/mediators/booking-bookall.js:3:26815\\n    at https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:11:20790\\n    at g (https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:10:8997)\\n    at https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js:10:10715\"",
                "timestamp": 1540254657271,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://connect.facebook.net/en_US/fbevents.js 24:14549 \"[Facebook Pixel] - Duplicate Pixel ID: 481866798660369.\"",
                "timestamp": 1540254657290,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://static.mgmresorts.com/content/dam/MGM/mgm-national-harbor/hotel/architecture/mgm-national-harbor-hotel-capitol-view-king.jpg.image.192.192.high.jpg - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1540254657454,
                "type": ""
            }
        ],
        "screenShotFile": "images/000d0074-007e-0058-00e8-0086007a0082.png",
        "timestamp": 1540254647877,
        "duration": 9750
    },
    {
        "description": "verify the second page|MGM SUITE",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 1498,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.67"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254658704,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/mbox-contents-25cdb50b9490ebc766312d9e8ba3870f89f6d7d9.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254658705,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://www.everestjs.net/static/le/last-event-tag-latest.min.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1540254658706,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://mgmdmp.okta.com/api/v1/sessions/me - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1540254658802,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254658803,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658803,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254658804,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658804,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254658847,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658847,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254658847,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658847,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254658848,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658848,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254658848,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658848,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254658848,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658849,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254658849,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658849,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254658892,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658892,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254658892,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658892,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254658893,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658893,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254658893,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658893,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254658896,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658896,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254658896,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658896,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254658896,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658896,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254658897,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658897,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254658902,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658902,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254658902,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658902,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254658902,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658902,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254658903,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/Modernizr.df036f3d4bc9efa933695e738cc853b0.js 8 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658903,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254658943,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658943,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254658943,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658943,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254658943,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658944,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254658944,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/2e12f12fbf8ed50edacd472ec9f5829c79558d1e/satelliteLib-0ef255248f6afb9ae6e6a55e457149fd220065d7.js 10 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658944,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #email-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254658963,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #global-nav-search-form: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254658963,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #password-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254658963,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #sign-in-widget: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254658964,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.mgmresorts.com/en.html - [DOM] Found 3 elements with non-unique id #signin-widget-form: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540254658964,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254658994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254658994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254658994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254658994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254658994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254658994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/26091050-06ef-4fd5-b199-21b27c0ed85e.woff2",
                "timestamp": 1540254659323,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254659324,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/8bf38806-3423-4080-b38f-d08542f7e4ac.woff2",
                "timestamp": 1540254659325,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254659325,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/3cf9e1e8-63a2-497f-86ed-6b63d6de1986.woff2",
                "timestamp": 1540254659326,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Failed to convert WOFF 2.0 font to SFNT",
                "timestamp": 1540254659327,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/f3fa9288-dc04-4f75-b949-b06584863c9c.woff2",
                "timestamp": 1540254659328,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/etc/designs/mgmresorts/library/js/vendor/require.595a4e1ad14753700d9cb2c0fbe89515.js 2 OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254659328,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - Failed to decode downloaded font: https://www.mgmresorts.com/etc/designs/mgmresorts/library/fonts/e17c7943-8db2-4470-9e2a-74a8d01f6776.woff2",
                "timestamp": 1540254659750,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.mgmresorts.com/en.html - OTS parsing error: Size of decompressed WOFF 2.0 is less than compressed size",
                "timestamp": 1540254659750,
                "type": ""
            }
        ],
        "screenShotFile": "images/007d0037-0084-0041-0051-00950097000a.png",
        "timestamp": 1540254658283,
        "duration": 8458
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

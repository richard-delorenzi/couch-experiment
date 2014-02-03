define(function(require){

    var myLib = require("lib/myLib"); 

    QUnit.start();
    test( "hello test", function() {
	ok( 1 == "1", "Passed!" );
    });

});
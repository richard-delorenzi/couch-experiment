test( "addIfdef", function() {
    var stash = {
	"o" : { 
            "e":"E",
            "f": { 
		"g":"G" 
            }
	},
	"z": 
	[ "hello",
          { 
	      "a": "A", 
	      "b": "B"
          }
        ]
    };

    var expectedStash =  {
	"ifdef_o" : true,
	"ifdef_z" : true,
	"o" : { 
            "ifdef_e" : true,
            "ifdef_f" : true,
            "e":"E",
            "f": { 
		"ifdef_g" : true,
		"g":"G" 
            }
	},
	"z": 
	[ "hello",
          {
	      "ifdef_a" : true,
	      "ifdef_b" : true,
	      "a": "A",
	      "b": "B"
          }
        ]
    };

    var output = addIfdef(stash);
    deepEqual( output, expectedStash);
});

test( "listify", function() {
    deepEqual( listify("hello"), ["hello"] );
    deepEqual( listify(["hello"]), ["hello"] );
    deepEqual( listify(true), [true] );
    deepEqual( listify(123), [123] );
    deepEqual( listify(undefined), null);
});



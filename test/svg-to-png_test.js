/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

/*global require:true*/
(function( exports ){
	'use strict';

	var fs = require( 'fs' );
	var svg_to_png = require('../lib/svg-to-png.js');


	exports.awesome = {
		setUp: function(done) {
			// setup here
			done();
		},
		'no args': function(test) {
			test.expect(1);
			// tests here
			test.equal(svg_to_png.awesome(), 'awesome', 'should be awesome.');
			test.done();
		}
	};

	exports.convert = {
		setUp: function(done) {
			// setup here
			done();
		},
		tearDown: function( done ){
			if( fs.existsSync( "test/output/bear.png" ) ){
				fs.unlinkSync( "test/output/bear.png" );
			}
			done();
		},
		'no args': function(test) {
			test.expect(1);
			// tests here
			test.throws( function(){
				svg_to_png.convert();
			}, Error, "Should throw input error" );
			test.done();
		},
		'one arg': function(test) {
			test.expect(1);
			// tests here
			test.throws( function(){
				svg_to_png.convert("test/files");
			}, Error, "Should throw output error" );
			test.done();
		},
		'two args - no opts': function(test) {
			test.expect(1);
			// tests here
			test.throws( function(){
				svg_to_png.convert("test/files", "test/output", {});
			}, Error, "Should throw opts.dest error" );
			test.done();
		},
		'two args - dest': function(test) {
			test.expect(1);
			// tests here
			svg_to_png.convert("test/files", "", { dest: "test/output" })
			.then( function(){
				test.ok( fs.existsSync( "test/output/bear.png" ) );
				test.done();
			});
		}
	};
}(typeof exports === 'object' && exports || this));

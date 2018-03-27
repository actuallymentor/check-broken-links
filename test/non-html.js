// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// The get module
const get = require( __dirname + '/../modules/get' )

// This is a random pdf I generated
let link = 'https://raw.githubusercontent.com/actuallymentor/check-broken-links/master/test/test.pdf'

describe( 'Check what happens to a pdf', f => {
	it( 'Loads pdf', done => {
		get( link )
		.then( res => {
			expect( res.html ).to.contain( 'html' )
			done( )
		} )
	 } )
} )
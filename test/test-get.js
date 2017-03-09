// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// The get module
const get = require( __dirname + '/../modules/get' )

describe( 'The get function', f => {
	it( 'Returns html for google.com', done => {
		get( 'https://www.google.com' ).then( res => {
			expect( res.html ).to.contain( 'body' )
			done( )
		} ).catch( console.log.bind( console ) )
	} )
} )
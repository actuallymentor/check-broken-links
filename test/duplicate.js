// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// The get module
const clean = require( __dirname + '/../modules/cleanlinks' )

let links = [ 'https://google.com', 'https://google.com', 'https://google.com', 'https://google.com', 'http://google.com', 'http://google.com', 'http://google.com' ]

describe( 'Duplicates removed by cleaner', f => {
	it( 'CLeans and dedupes links', ( ) => { 
		return clean( 'http://baseurl.com', links )
		.then( links => { 
			expect( links.length ).to.equal( 2 )
		 } )
	 } )
} )
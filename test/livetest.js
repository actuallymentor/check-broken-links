// I will disable this test in the deployment commit for this package

// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// The get module
const checker = require( __dirname + '/../app' )

let inputlinks = [ 'https://google.com', 'https://www.skillcollector.com', 'https://www.skillcollector.com/post/i-didnt-eat-for-105-hours-science-benefits/', 'https://www.skillcollector.com/post/best-android-root-apps/' ]

describe( 'Check if the link checker works on live links', function(  ) {

	// Set the timeouts high so that all links can be checked without many or slow requests crashing the test
  	this.timeout( process.env.maxtimeout || ( 1000 * 60 * 5 ) )

	it( 'Check links', () => {
		return checker( 'https://www.skillcollector.com', inputlinks )
		.then( brokenlinks => console.log( brokenlinks ) )
	} )
} )
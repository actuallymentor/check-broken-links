// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// The get module
const restructure = require( __dirname + '/../modules/link-restructure' )

let inputlinks = [
	{ source: 'https://google.com', links: [ 'https://twitter.com', 'https://reddit.com' ] },
	{ source: 'https://bing.com', links: [ 'https://msn.com', 'https://reddit.com' ] }
]

describe( 'Check of the restructuring works', f => {
	it( 'Restructures the links as expected', done => {
		let restructured = restructure( inputlinks )
		for (var i = restructured.length - 1; i >= 0; i--) {
			if ( restructured[i].link == 'https://twitter.com' ) expect( restructured[i].sources.indexOf( 'https://google.com' ) ).not.to.equal( -1 )
			if ( restructured[i].link == 'https://msn.com' ) expect( restructured[i].sources.indexOf( 'https://bing.com' ) ).not.to.equal( -1 )
			if ( restructured[i].link == 'https://reddit.com' ) expect( restructured[i].sources.indexOf( 'https://bing.com' ) ).not.to.equal( -1 )
			if ( restructured[i].link == 'https://reddit.com' ) expect( restructured[i].sources.indexOf( 'https://google.com' ) ).not.to.equal( -1 )
		}
		done(  )
	} )
} )
// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// The extract module
const extract = require( __dirname + '/../modules/link-extract' )

const demohtml = `
<head>
	<link href="http://cdn.adomain.com/style.css">
</head>
<body>
	<a href="https://amazing.com">Look here</a>
	<a href="/iamsorelative">Relativity here</a>
	<script src="/relative.js"></script>
	<script src="https://absolute.com/relative.js"></script>
</body>
`

describe( 'The url extractor', f => {

	it( 'Returns the correct amount of links', done => {
		extract( 'https://mocha.test', demohtml ).then( matches => {
			expect( matches.links.length ).to.equal( 5 )
			done( )
		} ).catch( console.log.bind( console ) )
	} )

	it( 'Returns the correct structure', done => {
		extract( 'https://mocha.test', demohtml ).then( matches => {
			expect( matches.source ).to.equal( 'https://mocha.test' )
			for (var i = matches.links.length - 1; i >= 0; i--) {
				expect( matches.links[i].status ).to.equal( 'unchecked' )
			}
			done( )
		} ).catch( console.log.bind( console ) )
	} )
	
} )
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
		extract( 'https://mocha.test/', 'https://mocha.test', demohtml ).then( matches => {
			expect( matches.links.length ).to.equal( 2 )
			done( )
		} ).catch( console.log.bind( console ) )
	} )
	
} )
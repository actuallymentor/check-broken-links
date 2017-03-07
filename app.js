const get = require( __dirname + '/modules/get' )
const extract = require( __dirname + '/modules/link-extract' )
const checker = links => {
	let broken = {
		top: [],
		crawled: []
	}
	// Load all links
	return Promise.all( links.map( link => {
		if ( process.env.debug ) console.log( 'Making GET promise for ' + link )
		return get( link ).catch( brokentop => {
			// Add the broken links to the results array
			if ( process.env.debug ) console.log( 'broken links found' )
			broken.top.push( brokentop )
		} )
	} ) )
	// Parse the loaded links
	.then( pages => {
		pages = pages.filter( page => { return ( page != undefined ) } )
		console.log( pages )
		return Promise.all( pages.map( page => {
			console.log( 'Page extract for ' + page.url )
			return extract( page.url, page.html ).catch( console.log.bind( console ) )
		} ) )
	} ).then( pageswlinks => {
		return Promise.all( pageswlinks.map( pwlinks => {
			return get( pwlinks ).catch( brokencrawled => { broken.crawled.push( brokencrawled ) } )
		} ) )
	} ).then( crawledlinks => {
		console.log( crawledlinks )
	} )
	.catch( console.log.bind( console ) )
	
}

checker( [ 'https://www.google.com', 'https://www.skillcollector.com', 'https://notawebsiteiruythn.com' ] )
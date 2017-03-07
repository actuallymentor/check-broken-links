const get = require( __dirname + '/modules/get' )
const extract = require( __dirname + '/modules/link-extract' )
const clean = require( __dirname + '/modules/cleanlinks' )
const checker = ( base, links )  => {
	let broken = {
		top: [],
		crawled: []
	}
	// Clean up inputted links
	return clean( base, links ).then( cleanlinks => {
		// Load all links
		return Promise.all( cleanlinks.map( link => {
			if ( process.env.debug ) console.log( 'Making GET promise for ' + link )
			return get( link ).catch( brokentop => {
				// Add the broken links to the results array
				if ( process.env.debug ) console.log( 'broken links found' )
				broken.top.push( brokentop )
			} )
		} ) )
	} )
	// Extract links from the supplied urls
	.then( pages => {
		pages = pages.filter( page => { return ( page != undefined ) } )
		return Promise.all( pages.map( page => {
			if ( process.env.debug ) console.log( 'Page extract for ' + page.url )
			return extract( base, page.url, page.html ).catch( console.log.bind( console ) )
		} ) )
	} )
	// Find broken links in the crwaled results
	.then( pageswlinks => {
		if ( process.env.debug ) console.log( 'Extracted pages' )
		// Parse every analysed page
		return Promise.all( pageswlinks.map( page => {
			// Parse every link in a specific page
			return Promise.all( page.links.map( link => {
				return get( link ).catch( brokenlink => { broken.crawled.push( brokenlink ) } )
			} ) )
		} ) )
	} ).then( crawledlinks => {
		console.log( broken )
		return Promise.resolve( broken )
	} )
	.catch( console.log.bind( console ) )
}

module.exports = checker
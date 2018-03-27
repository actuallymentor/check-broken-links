const get = require( __dirname + '/modules/get' )
const extract = require( __dirname + '/modules/link-extract' )
const clean = require( __dirname + '/modules/cleanlinks' )
const checker = ( base, links )  => {
	let broken = {
		top: [],
		crawled: []
	}
	// Clean up inputted links
	return clean( base, links )
	// This step uses the sanitised links and GETs their content
	.then( cleanlinks => {
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
		// Filter out empty responses
		pages = pages.filter( page => page != undefined && page.html != undefined )

		// Crawls page content and returns { source: 'sourceurl', links: [ 'links' ] }
		return Promise.all( pages.map( page => {
			if ( process.env.debug ) console.log( 'Page extract for ' + page.url )
			return extract( base, page.url, page.html ).catch( console.log.bind( console ) )
		} ) )
	} )
	// Find broken links in the crawled results
	// Structure is [
	// 	{ source: 'sourceurl', links: [ 'links' ] }
	// 	{ source: 'sourceurl', links: [ 'links' ] }
	// 	{ source: 'sourceurl', links: [ 'links' ] }
	// ]
	.then( pageswlinks => {
		if ( process.env.debug ) console.log( 'Extracted pages' )
		// Parse every analysed page
		return Promise.all( pageswlinks.map( page => {
			// Parse every link in a specific page
			return Promise.all( page.links.map( link => {
				return get( link ).catch( brokenlink => {
					brokenlink.source = page.source
					broken.crawled.push( brokenlink )
				} )
			} ) )
		} ) )
	} ).then( crawledlinks => {
		return Promise.resolve( broken )
	} )
	.catch( console.log.bind( console ) )
}

module.exports = checker
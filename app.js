const get = require( __dirname + '/modules/get' )
const extract = require( __dirname + '/modules/link-extract' )
const clean = require( __dirname + '/modules/cleanlinks' )
const restructure = require( __dirname + '/modules/link-restructure' )

const checker = ( base, links )  => {
	let broken = {
		// Top meaning the links you originally supplied
		top: [],
		// Crawled referring to the links extracted from the above 'top' links
		crawled: []
	}
	// Clean up inputted links and add a base url for relative links
	return clean( base, links )
	// This step uses the sanitised links and GETs their content
	.then( cleanlinks => {
		// Create GET promises for all provided links
		return Promise.all( cleanlinks.map( link => {
			if ( process.env.debug ) console.log( 'Making GET promise for ' + link )
			return get( link ).catch( brokentop => {
				// Add the broken links to the results array
				if ( process.env.debug ) console.log( 'broken links found' )
				broken.top.push( brokentop )
			} )
		} ) )
	} )
	// The html bodies of the links above are now loaded
	// Extract links from the bodies of supplied urls
	.then( urlbodies => {
		// Filter out empty responses
		urlbodies = urlbodies.filter( page => page != undefined && page.html != undefined )

		// Crawls page content and returns { source: 'sourceurl', links: [ 'links' ] }
		return Promise.all( urlbodies.map( page => {
			if ( process.env.debug ) console.log( 'Page extract for ' + page.url )
			return extract( base, page.url, page.html ).catch( console.log.bind( console ) )
		} ) )
	} )
	// Restructure the links to go from urls and the links they contain to links and what parent sources they have
	// The output structure is [ { link: link, sources: [] }, { link: link, sources: [] } ]
	.then( restructure )
	// Now scan the links
	.then( linksfromurls => {
		// Add checked links to the top object
		broken.allchecked = linksfromurls
		if ( process.env.debug ) console.log( 'Scanning links extracted from url pages' )
		// Check if the links are alove
		return Promise.all( linksfromurls.map( thislink => get( thislink.link ).catch( kaput => broken.crawled.push( thislink ) ) ) )
	} )
	.then( f => {
		// Return the parent broken object
		return Promise.resolve( broken )
	} )
	.catch( console.log.bind( console ) )
}

module.exports = checker
// Taken from https://mathiasbynens.be/demo/url-regex
const jsdom = require( 'jsdom' )

const clean = require( __dirname + '/cleanlinks' )

const makedom = html => {
	return new Promise( ( resolve, reject ) => {
		jsdom.env( html, ( err, window ) => {
			if ( err ) return reject( err )
			resolve( window )
		} )
	} )
}

const extract = ( base, source, html ) => {
	return makedom( html )
	.then( window => {
		return Array.prototype.slice.call( window.document.links ).map( link => { return link.href } )
	} )
	.then( links => {
		if ( process.env.debug ) console.log( 'Parsing links for ' + source, links )
		return clean( base, links )
	} )
	.then( cleanlinks => {
		return Promise.resolve( { source: source, links: cleanlinks } )
	} ).catch( console.log.bind( console ) )
}

module.exports = extract
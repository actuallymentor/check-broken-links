// Taken from https://mathiasbynens.be/demo/url-regex
const jsdom = require( 'jsdom' )
const { JSDOM } = jsdom

const clean = require( __dirname + '/cleanlinks' )

const makedom = html => Promise.resolve( new JSDOM( html ) )

const extract = ( base, source, html ) => {
	return makedom( html )
	.then( thedom => {
		return Array.prototype.slice.call( thedom.window.document.links ).map( link => { return link.href } )
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
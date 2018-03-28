const request = require( 'request' )
const colors = require( 'colors' )
// I noticed that the module broke on links that were not html ( for example pdf ) so this function will add a filler response for non html output
const verifyhtml = body => body.indexOf( '<html>' ) != -1 ? body : `<html><body>There was a valid non html response to this query</body></html>`

const get = url => {
	return new Promise( ( resolve, reject ) => {
		// Make a request to the url
		request( { url: url, headers: { 'User-Agent': 'request' } }, ( err, response, body ) => {
			// If debugging is enabled be verbose
			if ( process.env.debug || process.env.verbose ) {
				let color = response ? ( response.statusCode == 200 ? colors.green : colors.red ) : colors.red
				console.log( color ( ( response ? response.statusCode : '000' ) + ': ' + url ) )
			}
			// If an error is returned reject with the info
			if ( err ) return reject( { url: url, err: err } )
			// If no response was given at all reject and return that status code ( or 000 if none is given )
			if ( !response ) return reject( { url: url, err: response.statusCode || '000' } )
			// If the status code is 200 resolve
			response.statusCode == 200 ? resolve( { url: url, html: verifyhtml( body ) } ) : reject( { url: url, err: response.statusCode || '000' } )
		} )	
		// Set a timeout so that no GET can block the resolution of overarching promises, default is one minute
		setTimeout( f => reject( 'Connection timed out'), ( process.env.gettimeout * 1000 ) || ( 1000 * 60 ) )
	} )
}

module.exports = get
const request = require( 'request' )
const colors = require( 'colors' )
const get = url => {
	return new Promise( ( resolve, reject ) => {
		request( { url: url, headers: { 'User-Agent': 'request' } }, ( err, response, body ) => {
			if ( process.env.debug || process.env.verbose ) {
				let color = response ? ( response.statusCode == 200 ? colors.green : colors.red ) : colors.red
				console.log( color ( ( response ? response.statusCode : '000' ) + ': ' + url ) )
			}
			if ( err ) return reject( { url: url, err: err } )
			if ( !response ) return reject( { url: url, err: response.statusCode || '000' } )
			response.statusCode == 200 ? resolve( { url: url, html: body } ) : reject( { url: url, err: response.statusCode || '000' } )
		} )	
	} )
}

module.exports = get
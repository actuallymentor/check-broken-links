const request = require( 'request' )
const get = url => {
	return new Promise( ( resolve, reject ) => {
		request( url, ( err, response, body ) => {
			if ( process.env.debug ) console.log ( url + ' gave status ' + ( response ? response.statusCode : 'no response' ) )
			if ( err ) return reject( { url: url, err: err } )
			if ( !response ) return reject( { url: url, err: response.statusCode || 'no response' } )
			response.statusCode == 200 ? resolve( { url: url, html: body } ) : reject( { url: url, err: response.statusCode || 'no response' } )
		} )	
	} )
}

module.exports = get
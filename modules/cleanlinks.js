module.exports = ( base, links ) => {
	if ( process.env.debug ) console.log( 'The links passed to cleanlinks look like this: ' )
	if ( process.env.debug ) console.log( links )
	if( links.length < 1 ) return Promise.resolve( links )
	return Promise.resolve( links.map( link => {
		return link.replace( /^\/\//, 'https://' ).replace( /^\//, base )
	} ).filter( link => {
		return link.indexOf( 'http' ) == 0 ? true : false
	} ) )
}
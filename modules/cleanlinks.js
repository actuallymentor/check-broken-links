module.exports = ( base, links ) => {
	link = link || []
	return Promise.resolve( links.map( link => {
		return link.replace( /^\/\//, 'https://' ).replace( /^\//, base )
	} ).filter( link => {
		return link.indexOf( 'http' ) == 0 ? true : false
	} ) )
}
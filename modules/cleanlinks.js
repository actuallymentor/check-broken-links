module.exports = ( base, links ) => {
	if ( process.env.debug ) console.log( 'The links passed to cleanlinks look like this: ' )
	if ( process.env.debug ) console.log( links )
	// If no links resolve
	if( links.length < 1 ) return Promise.resolve( links )
	// Resolve with the links
	// If the link starts as // make it https://, if it starts with / ( relative link ) add the base url
	// Filter out things that are not a http or https link
	let cleanlinks = links.map( link =>  link.replace( /^\/\//, 'https://' ).replace( /^\//, base ) ).filter( link => link.indexOf( 'http' ) == 0 ? true : false )
	// ES6 uniquify feature
	let uniques = Array.from( new Set( cleanlinks ) )
	return Promise.resolve( uniques	)
}
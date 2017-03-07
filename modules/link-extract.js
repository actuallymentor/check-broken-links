// Taken from https://mathiasbynens.be/demo/url-regex
let hrefregex = new RegExp( /((src\w*=\w*["']|href\w*=\w*["'])(([\.\w_\-:\\\/&@#\(\)]*[\\\/])([^"^']*)))/, 'ig' )

const extract = ( source, html ) => {
	let hrefmatches = []
	let matched
	while ( matched = hrefregex.exec( html ) ) {
		hrefmatches.push( matched[3] )
	}
	return Promise.resolve( {
		source: source,
		links: hrefmatches ? hrefmatches.map( matched => {
			if ( process.env.debug ) console.log ( 'Found ' + matched.length + ' links in ' + source )
			return { url: matched, status: 'unchecked' }
		} ) : []
	} )
}

module.exports = extract
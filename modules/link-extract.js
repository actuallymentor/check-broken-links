// Taken from https://mathiasbynens.be/demo/url-regex
let hrefregex = new RegExp( '((href=)|(src=))[\'"]{1}.*[\'"]', 'ig' )

const extract = ( source, html ) => {
	let hrefmatches = html.match( hrefregex )
	return Promise.resolve( {
		source: source,
		links: hrefmatches ? hrefmatches.match( hrefregex ).map( matched => {
			if ( process.env.debug ) console.log ( 'Found ' + matched.length + ' links in ' + source )
			return { link: matched, status: 'unchecked' }
		} ) : []
	} )
}

module.exports = extract
module.exports = crawledlinks => {
	// Structure is [
	// 	{ source: 'sourceurl', links: [ 'links' ] }
	// 	{ source: 'sourceurl', links: [ 'links' ] }
	// 	{ source: 'sourceurl', links: [ 'links' ] }
	// ]

	// List all links
	let alllinks = []
	for (var i = crawledlinks.length - 1; i >= 0; i--) {
		alllinks = alllinks.concat( crawledlinks[i].links )
	}
	if( process.env.debug ) console.log( 'All links in the restructuring:\n', alllinks )
	// Dedupe array
	alllinks = Array.from( new Set( alllinks ) )
	if( process.env.debug ) console.log( 'Deduped in the restructuring:\n', alllinks )
	// Redo the structure so that links have a sources array
	alllinks = alllinks.map( link => ( { link: link, sources: [] } ) )
	if( process.env.debug ) console.log( 'Restructured links in the restructuring:\n', alllinks )

	// If a source has a link, append the source to the link
	// Walk over every inputted link object
	for (let i = crawledlinks.length - 1; i >= 0; i--) {
		
		// Walk over every link in this particular object
		for (let j = crawledlinks[i].links.length - 1; j >= 0; j--) {

			// For this link walk over the entire alllinks array
			for (let k = alllinks.length - 1; k >= 0; k--) {

				// Check if the current alllinks position contains the current link
				let match = alllinks[k].link == crawledlinks[i].links[j]
				// If there is a match add the current source to the current alllinks array object
				if( process.env.debug ) console.log( `Match ${match} for ${alllinks[k].link} and ${crawledlinks[i].links[j]}` )
				if ( match ) alllinks[k].sources.push( crawledlinks[i].source )

			}

		}
		
	}
	if( process.env.debug ) console.log( 'Result of filtering\n', alllinks )
	// Return the new structure
	return alllinks
}
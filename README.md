# Check Broken Links

[![Build Status](https://travis-ci.org/actuallymentor/check-broken-links.svg?branch=master)](https://travis-ci.org/actuallymentor/check-broken-links)

An npm package that checks an array of supplied links for broken links.

```js
const check = require( 'check-broken-links' )
const containsBroken = [
    'https://www.iCONTAINbrokenlinks.com',
    'https://www.iAMbroken.com',
    'https://www.iamfine.com'
]
check( 'https://base.url/', containsBroken ).then( brokenlinks => {
    console.log( brokenlinks )
    /*
    { top: [ { url: 'https://www.iAMbroken.com', err: [Object] } ],
      crawled:
       [ { link: 'https://iwasinside.com/iCONTAINbrokenlinks ',
           sources: [ 'https://iwasfoundinthislinkyou supplied.com', 'https://butalsointhisone.com' ] }
      ] },
      allchecked: { [ link: '', sources: [] ] } // This would obviously be populated
    */
} )
```

The base url for the relative links has a required trailing slash.

## Mocha testing example

Let's say you want to check if your project has any broken links:

```js
// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// Display results as table
import 'console.table'

// Import the link checker
const check = require( 'check-broken-links' )

// We do not use arrow syntax here because that would break the this.timeout
describe( 'Links in the project', function( ) {

  // Set the timeouts high so that all links can be checked without many or slow requests crashing the test
  this.timeout( process.env.maxtimeout || ( 1000 * 60 * 5 ) )

  // Of course you would do some dynamic stuff to find links in the test below
  let yourlinks = []

  // The current setup uses mocha in a promise fashion
  // You could also have the callback be done => {}, but then need to call done() after the expect()
  it( 'All return 200', () => {
    return check( yourlinks )
    .then( brokenlinkarray => {
      if ( broken.top.length > 0 ) console.log( 'Broken Top levels' ); console.table( broken.top )
      if ( broken.crawled.length > 0 ) console.log( 'Broken crawled links' ); console.table( broken.crawled )
      expect( broken.crawled.length ).to.equal( 0 )
      expect( broken.top.length ).to.equal( 0 )
    } )
  } )
} )
```

## Configuration

Want the module to console.log every request set the environment variable 'verbose' to true:

```shell
verbose=true node app.js 
```

This will log out every request. Successfull requests turn green, failed ones red.

The GET requests have a default timeout of 60 seconds. You can set this using the 'gettimeout' environment variable in seconds.

```shell
# 2 minute timeout
gettimeout=120 node app.js 
```

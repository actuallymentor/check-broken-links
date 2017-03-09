# Check Broken Links [![Build Status](https://travis-ci.org/actuallymentor/check-broken-links.svg?branch=master)](https://travis-ci.org/actuallymentor/check-broken-links)

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
       [ { url: 'https://iwasinside.com/iCONTAINbrokenlinks ',
           err: 404 },
         { url: 'https://iwasalsoinside.com/iCONTAINbrokenlinks',
           err: 404 }
    ] }
    */
} )
```

The base url for the relative links has a required trailing slash.
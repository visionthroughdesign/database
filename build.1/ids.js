const { generateId } = require( '../lib/utils' )
const { Shabads, Lines } = require( '../' )


const main = async ( model, start, length, idLength, startOid ) => {
  // Grab ids to exclude from database
  const ids = new Set( ( await model.query().select( 'id' ) ).map( ( { id } ) => id ) )

  // Poor man's search for an id that's not taken
  const newIds = []
  while ( newIds.length < length ) {
    const id = generateId( idLength )
    if ( ids.has( id ) ) continue

    ids.add( id )
    newIds.push( id )
    console.log( `${newIds.length + start - 1},${id},${startOid + newIds.length}` )
  }
}

// main( Lines, 81289, 14409, 4, 128251 ).then( x => process.exit( 0 ) )
main( Shabads, 20000, 20171, 3, 10954 ).then( x => process.exit( 0 ) )

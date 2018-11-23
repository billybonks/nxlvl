// import Movie from '../__test__/movie';
// import ProviderListing from '../__test__/provider-listing';
// import Schema from './schema';
// import AttributeSet from './attribute-map';
// import BelongsToRelationShip from './relationships/belongs-to-relationship';
// import Attribute from './attribute';
//
// let ass = new AttributeSet({"random":{"type":'test', value: 2}}) as any;
// console.log(`isDirty ${ass.isDirty()}`);
// ass.random = "awesome"
// console.log(`isDirty ${ass.isDirty()}`);
//
// async function belongsToTest(){
//   // let belongsTo = new BelongsToRelationShip(Movie);
//   // let fkey = new Attribute(44, 'bigint');
//   // belongsTo.forigenAttribute = fkey;
//   // await belongsTo.load()
//   // console.log(belongsTo.value.id);
// }
//
//
//
//
//
// Schema.load().then(async function(){
//   // let m = await Movie.find(44);
//   // console.log(m.id)
//   //belongsToTest();
//   let p = await ProviderListing.find(2);
//   console.log(p);
//   let m = await p.movie;
//   console.log('----')
//   console.log(m.id);
// });

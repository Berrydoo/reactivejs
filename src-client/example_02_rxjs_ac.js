import $ from 'jquery';
import Rx from 'rxjs/Rx';


const $title = $("#title");
const $results = $("#results");

Rx.Observable.fromEvent($title, "keyup")
    .map( e => e.target.value) 
    .distinctUntilChanged()
    .debounceTime(500)
    .switchMap( getItems )
    .subscribe( items => {
        $results.empty();
        $results.append( items.map( item => $('<li />').text(item) ) ); 
    });


// const keyUps$ = Rx.Observable.fromEvent($title, "keyup");
// const queries$ = keyUps$
//                     .map( e => e.target.value )
//                     .distinctUntilChanged()
//                     .debounceTime(250)
//                     .switchMap( query => getItems(query));

// queries$.subscribe( items => { 
//     $results.empty();
//     $results.append( items.map( item => $('<li />').text(item) ));
// });

// -----------------------------
// Library
function getItems(title){
    console.log(`Querying ${title}`);
    return new Promise( (resolve, reject)=>{
        window.setTimeout( resolve([ title, "Item 2", `Another ${Math.random()}`]));
    }, 500 + (Math.random() * 2000));
}
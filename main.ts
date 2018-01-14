import {Observable} from "rxjs";

// import {Observable} from "rxjs/Observable";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/filter";

let numbers = [1, 5, 5, 6, 7, 8,9, 10];
let source = Observable.create(observer => {

    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if(index < numbers.length) {
            setTimeout(produceValue, 250);
        }
        else {
            observer.complete();
        }
    }

    produceValue();

}).map(n => n * 4)
    .filter(n => n > 18);


source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);

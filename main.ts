import {Observable} from "rxjs";


const button = document.querySelector('button');
const output = document.querySelector('#output');


let click = Observable.fromEvent(button, 'click');

function load(url: string) {

    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });

        xhr.open("GET", url);
        xhr.send();
    }).retryWhen((errors, limit = 5, delay = 2000) => {
        return errors
            .takeWhile((e, i) => {
                console.log(i);
                return i < limit;
            })
            .delay(delay);
    })
}

function renderBooks(books) {
    books.forEach(b => {
        let node = document.createElement('div');
        node.innerText = b.title;
        output.appendChild(node);
    });
}

click.flatMap(e => load("/books-api.json"))
    .subscribe(
        renderBooks,
        (e) => console.log(`error: ${e}`),
        () => console.log('done')
    );

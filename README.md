# iter-db
Database, based on singly linked list and iterators
Contains:
- im-memory database class with iterators support
- iterator for iterating elements one-by-one
- class of shell, thats implements periodical autosave data as json, loading from file and messaging

see also packages:
- list-db-server //implementation of server, thats runs from command line
- list-db-connector //implementation of connector with functional api


## IterDb
It is in-memory database thats may contents elems and iterator
```typescript
import { IterDb } form "list-db"
//Example of usage
const db: IterDb<any> = (new IterDb()) //empty db
const id = db.push(12) //id = 0 - index of new elem
db.push("John Konor") //id = 1 ...
db.push([false, true, false])
db.push({ i: 43, val: { name: "\"[Jona<ta>n\"]", vals: [12, 13] } })
db.push(999) //id = 4

const json = db.serializeToJson() //serialization of db content
db.parseFromJson(json) //deserialization and reinitialization

const iterId = db.regIter() //register new iterator from start, and gets it's id
let iter = db.getIter(iterId) //get iter by ID
iter.read() // = 12 . Iterator now on 0-th elem and its readed
iter.next().read() // = "John Konnor" . Iterator now on 1-st element and its readed
Array.isArray(iter.next().read()) // true. Iterator now on 2-nd  element and its readed
let iter = db.getIter(iterId) // get iterator again. It has save its position
iter.next().next().read() // = 999 . Iterator now on 4-th  element and its readed
```


## IterDbShell
class of shell, thats implements periodical autosave data as json, loading from file and messaging
Use it as template for server-making based on db
```typescript
import { IterDb, IterDbShell } form "list-db"
import * as path from "path"
import * as fs from "fs"

const db = new IterDb()
const filepath = path
    .resolve((module as unknown as { path: string }).path, "..", "..", "test.json")

const shell = new IterDbShell(db, {
    token: "7gx1827b", //Auth token
    filepath: filepath, //file to load and store data
    unref: true, //is unref imterval-timer thats rewrite file 
    //(without unref script will not stop running)
    fileDelay: 1000 //delay of rewriting file in milliseconds
})

//message handling. See full list of messages in next paragraph
shell.handleMessage(new IterDbMessage({
    authToken: "7gx1827b",
    set: { v: 216318729 }
}))
```

#### All request message types
```typescript
//file IterDb.listReq
//also contains superstruct declaration
type ReqIterBody = { //request data
    authToken: string;
    req: {
        iter: string;
        req: {
            batchNew: number;
        } | {
            oneNew: true;
        } | {
            again: true;
        };
    };
} | { //set new event
    authToken: string;
    set?: any;
} | { //request of new iterator
    authToken: string;
    reg: true;
}
```

#### All response message types
```typescript
//file IterDb.listResp
//also contains superstruct declaration
type IterResp = { //error responses
    error: "Invalid auth data" | "Iter is not exists" | "Invalid format of request" | "Unexcepted error";
    details?: any;
} | { //response on iter request
    iter: string;
} | { //response on set new event
    id: number;
} | { //response on batch request vals
    vals: {
        id: number;
        val?: any;
    }[];
} | { //response on request one item 
    //(if requested new item and all items are readed, will returns null)
    val: {
        id: number,
        val: any
    } | null
}
```


## Index file overview
```typescript
export { arr, IterDb as ListDb } from "./IterDb"
export { IterDbMessage as ListDbMessage } from "./IterDbMessage"
export { IterIter as ListIter } from "./IterIter"
export { IterDbShellConfig as ListDbShellConfig, IterDbShell as ListDbShell } from "./IterDbShell"
export * as iterReq from "./IterReq"
export * as iterResp from "./IterResp"
```


## License
MIT


## Author
Anatoly Starodubtsev
tostar74@mail.ru
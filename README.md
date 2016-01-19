# Tags API explorer

A simple explorer for the tags API built using the MEAN stack without the Angular bit.
The tags API allows you to store and retrieve tags and was built as a playground for features of the ME(A)N stack and ES6.

## Prerequisites

 - node.js (tested on v4.2.4)
 - mongodb (v3.x)

## Setup

Clone this repository and then from the root of your local project directory run `npm install` to install dependencies.

## Running the app

Start up mongo db and on the mongo command line run  `use tags` to create the tags database.

Then run `node app.js` from the project root directory to run the app on http://localhost:3000. Use any client you want to query the API e.g. curl or Postman.

## Examples

### Store a single tag

`curl -H "Content-Type: application/json" -X POST -d '{"tag": "tshirt", "relevance": 5}' http://localhost:3000/api/tags`

Should return a `200 OK` response

### Retrieve a single tag

`curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/api/tags/tshirt`

Should return the tag as a json object e.g.

```
{
  "tag": "tshirt",
  "relevance": 5,
  "_id": "737ete6et6ete63tw67w7w7"
}
```
> each time a tag is searched for its relevance increases by one

### Retrieve all tags currently stored in the database

`curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/api/current`


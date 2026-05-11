# Node with Express API

## Node.Js

- Node.js is a JavaScript runtime.
- Runtime: A program that runs another program.
- Run JS in local machine.
- Built on C++
- Powered by Google Chrome v8 engine
- Used to build: API, real time apps, micro-services

## Architecture

- Single threaded
- Non-blocking I/O operation
- Event loop

## Express.js

- It is a Node.js API/backend framework.
- Used to build API (Application program interface)
- It simplies the HTTP module of node.js
- Minimalist, fast and unopinionated framework

## API

- API format: JSON (JavaScript Object Notation)
- REST API (Representational state transfer)

### JSON

- JS Object => JSON.stringify() => JSON
- JSON => JSON.parse() => JS Object

## HTTP Methods

1. GET - Read/Fetch
2. POST - Create
3. PUT - Update
4. DELETE - Delete
5. PATCH - Partial update

## Layered Architecture

1. API Layer
   a. Routes: Handle routes/endpoints
   b. Controllers: Handle request/response
   c. Middlewares: Handle request/response, Logging, Auth

2. Business logic layer
   a. Services

3. Data logic layer
   a. Models

4. Database layer

# MongoDB

- Non-relational database
- Data are stored in collections & documents
- Database: Main container, all collections are stored here
- Collection: Equivalent to table of relational database
- Document: Equivalent to Row
- Field: Equivalent to Column

## Tools used

- Locally: MongoDB Compass (Shell included)
- Cloud: MongoDB Atlas

**Run mongoDB in compass**

1. Open mongoDB compass
2. Setup a new connection (mongodb://localhost:27017)[mongodb://localhost:27017]

## MongoDB Queries

- `show dbs` : Shows list of database
- `use <dbname>` : Use existing db or create a new one
- `show collections` : Shows list of collections in that db

1. Create

- `db.users.insertOne({name:"Ram"})`
- `db.users.insertMany([{name:"Hari"}, {name:"Sita"}])`

2. Read

- `db.users.find({age:20})` Returns multiple result if exists
- `db.users.findOne({age:20})`

3. Update

- `db.users.updateOne({name:"Ram"}, {$set: {age:40}})`

4. Delete

- `db.users.deleteOne({name:"Ram"})`

## Complex filters

1. $eq: db.users.find({name: {$eq:"Hari"}})
2. $ne: db.users.find({name: {$ne:"Hari"}})
3. $gt/gte: db.users.find({age: {$gt:50}})
4. $lt/lte: db.users.find({age: {$lt:50}})
5. $and: db.users.find({$and: [ {name:"Hari"}, {age:20} ]})
6. $or: db.users.find({$or: [ {name:"Hari"}, {age:45} ]})
7. $in: db.users.find({name: {$in: [ "Hari", "Rohan" ]}})

a. limit: db.users.find().limit(2)
b. skip: db.users.find().skip(1)
c. sort: db.users.find().sort({name:1}) 1: ASC, -1: DESC

## Mongoose

- ODM of MongoDB for Node.js
- Create Schema
- Validate Schema
- Create models using Schema
- Relationships

# Cryptography

## Encryption

- Encryption: Converting readable text to unreadable/cipher text
- for e.g: hello -> aijosecq9wn033qcu-

- Decryption: Converting cipher text to readable text
- for e.g: aijosecq9wn033qcu- -> hello

### Types

- Symmetric: Same key is used for encryption and decryption
- Assymetric: Different keys are used for encryption and decryption, Public/Private key (RSA)

## Hashing

- One way encryption
- Convert the readable text to cipher text but not back to readable
- Hashing always returns same cipher
- hello => 123456asdfdsfg

## Salt

- Adding random characters in the hash
- hello -> 123sdg456ahyusdfdsfuigui
- hello => 12asd3456assdfdghsfgke34

## Authentication & Authorization

1. Authentication: Who you are? Logged in user
2. Authorization: What you can do? User role

## JSON Web Token (JWT)

- Self verified
- Tamper proof
- Used for both authentication & authorization

### JWT structure

- Header
- Payload
- Signature

## Storage

1. Cookie Storage

- Size: 4KB
- Storage: Server & Browser
- Expiry: Cookie expiry

2. Local Storage

- Size: 5-10MB
- Storage: Only Browser
- Expiry: Never

3. Session Storage

- Size: 5MB
- Storage: Only Browser
- Expiry: On tab close

## Auth Process

1. Login/Register success
2. Generate token (JWT)
3. Store token: Cookie, Session, Local storage
4. Append the token in every request to handle auth
5. Verify the token and authenticate/authorize user (Middleware)

## Middleware

- Function that lies between request and response
- Function that has access of both request and response object.
- It has additional functionality to go to next() middleware call

Browser ------ Request ------> Server
Middleware, Middleware, Middleware
Server ------- Response -----> Browser

### Usage

- Logging
- Authentication & Authorization
- Request & Response object modification
- Error handling
- Data validation

## File upload

1. File with data -> Send using FormData
2. Use `multer` package to handle formdata
   - When file is sent through formdata, multer handles it
   - Store the file temporarily, local folder or RAM
   - Upload the file
   - Remove the file after successful upload
   - File can be single or multiple
3. Cloudinary: Upload file to cloudinary (store your file here)
   - Signin/Signup to cloudinary
   - Create an API key or Use existing API key
   - Use cloudinary sdk, and use your api key here
4. Receive the file url from uploaded file in cloudinary
5. Store the URL in database

## Reset password

### Forgot password

1. User requests for forgot password
2. User inputs email address
3. Using email address, find the user, create a reset password link and token
4. Send the reset password link to the email

### Reset password

1. User clicks on the reset password link from the received email
2. The link contains the reset-password route with token
3. User inputs new password
4. Send request for reset password with the new password and token
5. Verify the user and token
6. Update the password

## MongoDB Aggregation

- Performing operation in multiple documents (table)
- Complex queries
- Filtering in multiple documents
- Data formatting

1. $match => Filtering
2. $lookup => LEFT JOIN
3. $unwind => INNER JOIN
4. $project => Data formatting
5. $group => Complex grouped operation

## Template Engine

- Building UI from Node.js and Express
- Building templates for email or pdf
- for e.g: handlebars, ejs, njk

============================

## Todo from frontend

1. Stripe
2. Orders Filtering

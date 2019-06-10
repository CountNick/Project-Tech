# :skull:Anarchy Dating:skull:

![Anarchy Dating logo](https://github.com/CountNick/Project-Tech/blob/master/Wiki_img/LogoRoze.png?raw=true)

## Introduction:point_left:

Anarchydating is a conceptual website which is based on punks finding like minded people to go out on a date with. For this concept i worked out one feature, this feature makes it possible to fill in profile information such as:

* Uploading a profile picture
* Adding and changing a bio story in a user's profile
* Adding and removing favorite artists from a list of favorite artists

## Used NPM packages in this project:package:

In the making of this project i used a number of packages from the Node Package Manager:

* [Express framework](https://www.npmjs.com/package/express)
  * used to make a server
* [Multer](https://www.npmjs.com/package/multer) 
  * Used to make file uploads available 
* [Body-parser](https://www.npmjs.com/package/body-parser)
  * Used to parse the body of to be posted data to the database
* MongoDB
  * Used to save user input
* [Mongoose](https://www.npmjs.com/package/mongoose)
  * Used to talk to the database in the node server
* [EJS templating engine](https://www.npmjs.com/package/ejs)
  * Used to make the html pages modulair, and able to read data dynamically from the database
* [Dotenv](https://www.npmjs.com/package/dotenv)
  * Used to hide the databaseroute-, name et.
* Node JS



# Installation guide:cd:

## Step 1 

run the following command in the directory you saved this repository in:

```
npm install
```
this command will automatically download the _npm packages_ this program is dependant on

## Step 2

first cd into the server directory:

```
cd server
```

## Step 3 

Start the server the express server

There are two possible ways to run this program

* use Node, type in:
```
node server.js
```

* use Nodemon(automatically installed when you ran _npm install_), type in:
```
nodemon server.js
```

## Step 4

When the server is running you can visit the following link to see the app running:

```
http://localhost:5000
```

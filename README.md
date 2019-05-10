# Project-Tech, Feature installation guide

_Please note: You need [node](https://github.com/nodejs/node) and npm installed on your computer to use this_

## Step 1

On GitHub navigate to the navigate to the repository main page

## Step 2

Under the name of the repository click on the clone or download button, and copy the clone URL

## Step 3
open terminal 


## Step 4

navigate to the directory you want to save the project in using th following command:
```
cd directoryname
```

## Step 5

now type the following command _git clone_ paste the link of the clone link after the command, like so:
```
git clone https://github.com/CountNick/Project-Tech.git
```
## Step 6 

now run the following command:

```
npm install
```
this command will automatically download the _npm packages_ this program is dependant on

## Step 7

first cd into the backend directory like so:

```
cd backend
```

There are two possible ways to run this program

* use Node, type in:
```
node index.js
```

* use Nodemon(automatically installed when you ran _npm install_), type in:
```
nodemon index.js
```

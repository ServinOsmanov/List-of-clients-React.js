const express = require("express");
const path = require("path");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let bodyParser = require("body-parser");

const app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.get('/listUsers', function (req, res) {
	console.log(req.query._start);
	console.log(req.query._limit);
	let queries = '';
	for(let prop in req.query) {
		if(req.query.hasOwnProperty(prop)) {
			queries += (queries.length ? '&' : '?') + prop + '=' + req.query[prop];
		}
	}

    let url = `http://api.demo.lakmus.org/api/clients${queries}`;
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, false);

    xhr.setRequestHeader("Authorization", "Basic " + new Buffer("demo:demo").toString("base64"));

    xhr.onreadystatechange = () => {
        res.end(xhr.responseText);
    };

    xhr.send();
});

app.get("/", (req, res) => {
	console.log(0);
	res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.post("/register", function (req, res) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://api.demo.lakmus.org/api/clients', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
        res.end(xhr.responseText);
    };
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.send(req.body);
});


app.listen(9000);
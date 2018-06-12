const express= require('express');
const hbs= require('hbs');
const fs= require('fs');

const app= express();
const port= process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('View Engine','hbs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=> {
	var now = new Date().toString();
	var log=now + ":"+req.method + " " + req.url;
	//fs.writeFileSync("log.txt",now + ":"+req.method + " " + req.url);
	fs.appendFile('server.log', log+ '\n',(err) => {
		if(err)
			console.log("unable to write");
	});
	//console.log(now + ":"+req.method + " " + req.url);
	next();
});

/* app.use((req, res, next)=>{
	res.render('maintenance.hbs');
}); */

hbs.registerHelper("getCurrentYear",() => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
	return text.toUpperCase();
});
app.get('/', (req, res) =>{	
	/* res.send({
		name: "Ishant",
		like:[
			"Gym",
			"Cricket"
		]
	}); */
	
	res.render('home.hbs',{
		welcomeMsg:"Welcome to the website",
		pageTitle:"Home Page",
		//currentYear:new Date().getFullYear()
	});
	
});

app.get('/about',(req,res) => {
	//res.send("About page")
	res.render('about.hbs',{
		welcomeMsg:"Welcome to the website",
		pageTitle:"About page",
		//currentYear: new Date().getFullYear()
	});
});

app.get('/projects',(req,res) => {
	//res.send("About page")
	res.render('projects.hbs',{
		welcomeMsg:"Portfolio Page",
		pageTitle:"Projects page",
		//currentYear: new Date().getFullYear()
	});
});

app.get('/bad',(req,res) => {
	res.send({
		errorMessage:"Bad Request"
	});
});

app.listen(port, () =>{	
	console.log("Server is up on port "+port)
});
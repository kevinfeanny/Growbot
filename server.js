var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
var run = require("./run.js");
var express = require("express");
var app = express();
var path = require('path');
const exphbs = require('express-handlebars');
const fs = require('fs');
const bodyParser = require('body-parser');
const cron = require('node-cron');
app.use(bodyParser.urlencoded({ extended: true }));

let todaysdate = new Date();
app.use(express.static(path.join(__dirname, "public", 'public')));
//app.use(express.static(path.join(__dirname, "/views", 'public' )));

cron.schedule(' 0 */30 * * * * ', () =>{

      console.log("in cron");
      run.run();

}); 





let rawdata = fs.readFileSync('data.json');
let homegrown = JSON.parse(rawdata);

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
// setup a 'route' to listen on the default url path
app.get("/home", (req,res) => {
  res.render('home', {
    date: new Date(),
    cycle: homegrown.cycle,
    cyclestartdate: homegrown.datecyclestarted,
    layout: false // do not use the default Layout (main.hbs)
});

});
app.get("/controlrobot", (req,res) => {
  res.render('controlrobot');
  
  });
  app.post("/controlrobot",  (req, res) => {
    const formData = req.body;
    console.log(formData);
    const formFile = req.file;
            if(formData.commandtype == "veg"){
                homegrown.datecyclestarted = new Date();
                homegrown.cycle ='veg';
            }
                else if (formData.commandtype == "bloom"){
                  homegrown.datecyclestarted = new Date();
                  homegrown.cycle = 'bloom';
                }else if(formData.commandtype ==  "24veg"){
                  homegrown.datecyclestarted = new Date();
                  homegrown.cycle = '24veg';

                }
                console.log(homegrown.cycle);
                fs.writeFileSync("data.json" , JSON.stringify(homegrown));
                console.log("changed");
                run.run();
                

    
  
    const dataReceived = "Your submission was received:<br/><br/>" +
      "Your form data was:<br/>" + JSON.stringify(formData) + "<br/><br/>" +
      "Your File data was:<br/>" + JSON.stringify(formFile) ;
    res.send(dataReceived);
    console.log(formData.name);
  });


  app.listen(HTTP_PORT, onHttpStart);
   run.run();

  
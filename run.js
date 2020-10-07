const fs = require('fs');
const Gpio = require('onoff').Gpio;
const veglight = new Gpio(17, 'high');
const bloomlight = new Gpio(4, 'high');



module.exports.run = function() {
    let rawdata = fs.readFileSync('data.json');
    let homegrown = JSON.parse(rawdata);
    let date = new Date();
    console.log(date.getHours());

    if(homegrown.cycle == "24veg"){

       
           /* const Gpio = require('onoff').Gpio;
const veglight = new Gpio(17, 'out');
const bloomlight = new Gpio(4, 'out');*/
            

                        veglight.writeSync(1);
                        bloomlight.writeSync(0);
          //bloomlight.unexport();
         } else if(homegrown.cycle === "veg"){
        if(date.getHours() >= 6 && date.getHours() <= 23){
            /*const Gpio = require('onoff').Gpio;
const veglight = new Gpio(17, 'out');
const bloomlight = new Gpio(4, 'out');*/
        
             bloomlight.writeSync(0);  
            veglight.writeSync(1);
        }else if (date.getHours() >= 0 && date.getHours() <= 5){
            //bloomlight.writeSync(0);
        
                console.log(veglight.readSync());
            veglight.writeSync(1);
            console.log(bloomlight.readSync());
            bloomlight.writeSync(1);
            /*veglight.unexport();
            bloomlight.unexport();*/
            
            console.log("in)");
          
            

        }



    }

    else if(homegrown.cycle === "bloom"){
                    if(date.getHours() >= 11 && date.getHours() <= 23){
                       /* const Gpio = require('onoff').Gpio;
const veglight = new Gpio(17, 'out');
const bloomlight = new Gpio(4, 'out');*/
                    
                           
                        bloomlight.writeSync(1);
                        veglight.writeSync(0);
                    }else if(date.getHours() >= 0 && date.getHours() <= 10) {
                     
                        bloomlight.writeSync(1);
                        bloomlight.writeSync(1);
                        /*bloomlight.unexport();
                        veglight.unexport();*/
                        //veglight.writeSync(0);
                        
            
                        
                    }
                        //veglight.unexport();


    }
    
    }

 /* process.on('SIGINT', _ => { 
        veglight.unexport();
        bloomlight.unexport();

  });*/





//Timer init varaibles.
var StepTime;
let LastTimeStamp = 0; 
//Main timer loop.
setInterval(() => {
    control();
}, 1);
function control() {
    //Step timer.
    StepTime = Date.now() - LastTimeStamp;
    LastTimeStamp = Date.now();
}
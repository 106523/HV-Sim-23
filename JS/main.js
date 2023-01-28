//Powertrain variables.
let EngineRPM = 0;
let MG2KW = 0;
let MG1KW = 0;
let Speed = 0;
let TorqueLimit = 0;
let TorqueDemand = 0;
let MG1TorqueOutput = 0;
let EngineTorqueOutput = 0;
//Timer init varaibles.
let StepTime;
let LastTimeStamp = 0; 
//Main timer loop.
setInterval(() => {
    control();
}, 1);
function control() {
    //Step timer.
    StepTime = Date.now() - LastTimeStamp;
    LastTimeStamp = Date.now();
    //Input system.
    const AcceleratorInput = document.getElementById("Accelerator");
    //Convert accelerator pedal input to torque.
}
//EV drive mode
function EVMode() {
    //Pure EV Mode
    //Dont call the engine ECU to save resources
    //let everything else know the engine isnt doing shit
    EngineRPM = 0;
    MG2KW = 0;
    EngineTorqueOutput = 0;
    //why the FUCK did I make MG1Torquelimit an absolute? Did it ever go into the NEGATIVE range for god knows what reason?!
    if (TorqueDemand >= Math.abs(TorqueLimit)) {
        MG1TorqueOutput = TorqueLimit;
      } else {
        MG1TorqueOutput = TorqueDemand;
      }
  }
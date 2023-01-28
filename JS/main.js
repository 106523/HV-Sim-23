//Powertrain variables.
let EngineRPM = 0;
let MG2KW = 0;
let MG1KW = 0;
let Speed = 0;
let TorqueLimit = 0;
let TorqueDemand = 0;
let MG1TorqueOutput = 0;
let EngineTorqueOutput = 0;
let MG1RPM = 0;
const BatteryMaxPowerDraw = 100000;
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
    //Speed to MG1RPM.
    MG1RPM = Speed * 130;
    //Input system.
    const AcceleratorInput = document.getElementById("Accelerator");
    //Convert accelerator pedal input to torque.
    if ((9.5488 * (MG1KW + BatteryMaxPowerDraw)) / F_CAN[9] <= 314) {
        TorqueLimit = (9.5488 * (MG1KW + BatteryMaxPowerDraw)) / F_CAN[9];
      } else {
        TorqueLimit = 314;
      }
      if ((9.5488 * 134972) / F_CAN[9] <= 314) {
        let MG1Torque = (9.5488 * 134972) / F_CAN[9];
      } else {
        let MG1Torque = 314;
      }
      //Return the Torque Demand
      TorqueDemand = MG1Torque * (AcceleratorInput / 100);
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
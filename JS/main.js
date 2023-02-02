//Initialize the F_CAN bus
var F_CAN = {
  "Speed" : 0,
  "MG1RPM" : 0,
  "TorqueDemand" : 0,
  "StepTime" : 0,
  "MG1TorqueOutput" : 0,
  "EngineTorqueOutput" : 0,
  "MG1TorqueLimit" : 0,
  "MG1Torque" : 0,
  "RegenAvalibleTorque" : 0,
  "HVSOC" : 0,
  "FrictionBrakeDemand" : 0,
  "HVMode" : 0,
  "LockUpClutch" : 0,
  "EngineGeneration" : 0,
  "EngineRPM" : 0,
  "WheelTorque" : 0,
};
//Powertrain variables.
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

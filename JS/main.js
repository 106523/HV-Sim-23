//Initialize the F_CAN bus.
var F_CAN = {
  "Speed" : 0,
  "WheelRPM" : 0,
  "MG1RPM" : 0,
  "TorqueDemand" : 0,
  "StepTime" : 0,
  "MG1TorqueOutput" : 0,
  "EngineTorqueOutput" : 0,
  "MG1TorqueLimit" : 0,
  "MG1Torque" : 0,
  "RegenAvalibleTorque" : 0,
  "HVSOC" : 100,
  "FrictionBrakeDemand" : 0,
  "BrakeDemand" : 0,
  "HVMode" : 0,
  "LockUpClutch" : 0,
  "EngineGeneration" : 0,
  "EngineRPM" : 0,
  "WheelTorque" : 0,
};
//Powertrain variables.
const BatteryMaxPowerDraw = 100000;
//Gearing.
const FinalDrive = 3.421;
const MotorShaft = 2.454;
const OverDrive = 0.806;
//Timer init varaibles.
let StepTime;
let LastTimeStamp = Date.now(); 
//Main timer loop.
setInterval(() => {
    control();
}, 1);
function control() {
    //Step timer.
    F_CAN.StepTime = Date.now() - LastTimeStamp;
    LastTimeStamp = Date.now();
    //Speed to MG1RPM.
    F_CAN.MG1RPM = F_CAN.Speed * 130;
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
    if (TorqueDemand >= TorqueLimit) {
        MG1TorqueOutput = TorqueLimit;
      } else {
        MG1TorqueOutput = TorqueDemand;
      }
  }

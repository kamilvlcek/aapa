#Include(Overlapping/Destinations.js)
#Include(EventRegistrations.js)
#Include(ClientEvents.js)
#Include(Timers.js)

Log("AAPA Experiment started");
// ExperimentDebugHUD.AddDebug("AAPAExperiment started");

var RedActive = false;
var YellowActive = false;
var TestActive = false;
var AttachedActive = false;

ExperimentHUD.SetAvoidanceText("0:00.0");
SetPhase(0);

var destinationVisitsLast = 0; // udaje z posledni faze
var AvoidanceTimeLast = 0;
var AvoidanceNumberLast = 0;
//Phasing
function EndPhase(phase){
   //ulozi data o predchozi faze
   Log("Phase finished: "+phase+", Diamants: "+(destinationVisits-destinationVisitsLast) + ", Avoidance area time: "+(AvoidanceTime-AvoidanceTimeLast) + ", Avoidance entrances : "+(AvoidanceNumber - AvoidanceNumberLast));
   destinationVisitsLast =  destinationVisits;    // ulozim posledni hodnoty
   AvoidanceTimeLast = AvoidanceTime;
   AvoidanceNumberLast = AvoidanceNumber;
}
function SetPhase(phase){
	Log("Phase started: "+phase);
	Sounds.StopCue(1);	
			
	switch(phase){
		// Tréning (nebo fáze 0): room 0 (=sektor neotáčející se s arénou) aktivní a viditelný, - 60s 
		case 0:
			RedActive = DeactivateArea(RedArea);
			YellowActive = DeactivateArea(YellowArea);
			TestActive = ActivateArea(TestArea);
			TestArea.SetVisibility(true);
			AttachedActive = DeactivateArea(AttachedArea);
			break;
			// test 1: room 1 aktivní ale neviditelný,  - 3 minuty 
		case 1:
			RedActive = DeactivateArea(RedArea);
			YellowActive = ActivateArea(YellowArea);
			TestActive = DeactivateArea(TestArea);
			AttachedActive = DeactivateArea(AttachedArea);
			break;
		// test 2: room 2 aktivní ale neviditelný,  - 3 minuty
		case 2:
			RedActive = ActivateArea(RedArea);
			YellowActive = DeactivateArea(YellowArea);
			TestActive = DeactivateArea(TestArea);
			AttachedActive = DeactivateArea(AttachedArea);
			break;
		// test 3: aréna  (=sektor otáčející se s arénou) aktivní ale neviditelný,-  3 min 
		case 3:
			RedActive = DeactivateArea(RedArea);
			YellowActive = DeactivateArea(YellowArea);
			TestActive = DeactivateArea(TestArea);
			AttachedActive = ActivateArea(AttachedArea);
			AttachedArea.AttachToActor("Platform");
			break;
		default:
			ExperimentDebugHUD.AddDebug("Unknown phase");
	}
}

function ActivateArea(area){
	area.SetVisibility(false);
	area.SetActive(true);
	area.ActivateSound();
	return true;
}

function DeactivateArea(area){
	area.SetVisibility(false);
	area.SetActive(false);
	area.DeactivateSound();
	return false;
}

function ToggleActiveAreaVisibility(){
	if(TestActive)
		TestArea.SetVisibility(!TestArea.GetVisibility());
	if(YellowActive)
		YellowArea.SetVisibility(!YellowArea.GetVisibility());		
	if(RedActive)
		RedArea.SetVisibility(!RedArea.GetVisibility());
}

function LogPlayerStats(){
	var loc = Player.GetLocation();
	var rot = Player.GetRotation();
	LogT("Location: [" + loc.X + ";" + loc.Y + ";" + loc.Z + "]");
	LogT("Rotation: [" + rot.Yaw + ";" + rot.Roll + ";" + rot.Pitch + "]");
}

function PlayDestinationEnterSound(){
	Sounds.PlaySound(4);
}

Log("AAPA Experiment initialized");
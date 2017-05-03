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
			Sounds.StopCue(1);	
			RedArea.SetVisibility(RedVisible = false);
			RedActive = false;
			RedArea.SetActive(false);
			
			YellowArea.SetVisibility(YellowVisible = false);
			YellowActive = false;
			YellowArea.SetActive(false);
			
			TestArea.SetVisibility(TestVisible = true);
			TestActive = true;
			TestArea.SetActive(true);
			
			AttachedArea.SetVisibility(AttachedVisible = false);
			AttachedActvie = false;
			AttachedArea.SetActive(false);
			break;
		// test 1: room 1 aktivní ale neviditelný,  - 3 minuty 
		case 1:
			RedArea.SetVisibility(false);
			RedActive = false;
			RedArea.SetActive(false);
			
			YellowArea.SetVisibility(false);
			YellowActive = true;
			YellowArea.SetActive(true);
			
			TestArea.SetVisibility(false);
			TestActive = false;
			TestArea.SetActive(false);
			
			AttachedArea.SetVisibility(AttachedVisible = false);
			AttachedActvie = false;
			AttachedArea.SetActive(false);
			
			break;
		// test 2: room 2 aktivní ale neviditelný,  - 3 minuty
		case 2:
			RedArea.SetVisibility(false);
			RedActive = true;
			RedArea.SetActive(true);
			
			YellowActive = false;
			YellowArea.SetVisibility(false);
			YellowArea.SetActive(false);
			
			TestArea.SetVisibility(false);
			TestActive = false;
			TestArea.SetActive(false);
			
			AttachedArea.SetVisibility(false);
			AttachedActvie = false;
			AttachedArea.SetActive(false);
			break;
		// test 3: aréna  (=sektor otáčející se s arénou) aktivní ale neviditelný,-  3 min 
		case 3:
			RedArea.SetVisibility(false);
			RedArea.SetActive(false);
			RedActive = false;
			AttachedArea.AttachToActor("Platform");
			AttachedActive = true;
			AttachedArea.SetVisibility(false);
			AttachedArea.SetActive(true);
			
			break;
		default:
			ExperimentDebugHUD.AddDebug("Unknown phase");
	}
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
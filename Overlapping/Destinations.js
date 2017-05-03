var destinations = [Destination1, Destination2, Destination3, 
	Destination4, Destination5, Destination6];

// Initialize counter
var destinationVisits = 0;
ExperimentHUD.SetDestinationText(destinationVisits);

// Initialize randomizer
Srand(GetTime());

function OnDestinationEnter(destination){
	IncrementVisits();
	PlayDestinationEnterSound();
	MoveToNewPosition(destination);
}

function MoveToNewPosition(destination){
	Log("Moving destination");
	var valid = false;
	var iteration = 0;
	
	var x;
	var y;
	
	while(!valid){
		iteration++;
		valid = true;
		
		x = (Rand()%2000)-1000;
		y = (Rand()%2000)-1000;
		
		for(i = 0; i < destinations.length; i++){
			var loc = destinations[i].GetLocation();	
			var sizeY = Abs(loc.Y - y);
			var sizeX = Abs(loc.X - x);
			
			var powerY = sizeY*sizeY;
			var powerX = sizeX*sizeX;
			
			var distance = Sqrt(powerX + powerY);
			
			if(distance < 600){
				valid = false;
				break;
			}
		}
		
		var radius = Sqrt(x*x + y*y);
		if((radius < 250) || (1000 < radius)){
			valid = false;
		}
	}
	
	Log("New location resolved in " + iteration + " iteration");
	
	destination.SetLocation(x,y,86)
}

function IncrementVisits(){
	destinationVisits++;
	ExperimentHUD.SetDestinationText(destinationVisits);
}
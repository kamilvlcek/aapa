//LogTimer
Timer(1, LogPlayerStats);

//Experiment timer
var TimeToGo = 600;
Timer(1, function(){
	--TimeToGo;
	
	LogT("Timer: " + TimeToGo);
	ExperimentHUD.SetTime((TimeToGo/60 | 0) + ":" + TimeToGo%60);

	switch(TimeToGo){
		case 9*60:
      			EndPhase(0);    
			SetPhase(1);   // v aapa2.0 js
			break;
		case 6*60:
      			EndPhase(1);  
			SetPhase(2);
			break;
		case 3*60:
      			EndPhase(2);  
			SetPhase(3);
			break;
		case 0:
      			EndPhase(3);  
			ExperimentHUD.SetTime("End");
			StopScript();		
			break;
	}
});

function IsAvoidanceColliding(){
	return (
		(RedArea.IsColliding() && RedActive)
		|| (YellowArea.IsColliding() && YellowActive)
		|| (TestArea.IsColliding() && TestActive)
		|| (AttachedArea.IsColliding() && AttachedActive)
	);
}

//Avoidance area presence counter
var AvoidanceTime = 0;
var AvoidanceNumber = 0;
var CuePlaying = false;  // zvuk pri pozici v avoidance


Timer(0.005, function(){
	if(IsAvoidanceColliding()){   
		AvoidanceTime += 0.005;
				
		
		if(!CuePlaying){
			CuePlaying = true;
      			Log('Avoidance entered');
      			AvoidanceNumber++;
			Sounds.PlayCue(1);
		}
		
		var minutes = (AvoidanceTime/60) - ((AvoidanceTime/60)%1);
		var decimals = AvoidanceTime%1;
		var seconds = AvoidanceTime%60 - decimals;
		var secondsFormatted;
		
		var centiseconds = (decimals * 10) - (decimals * 10)%1;
		
		if(seconds<10){
			secondsFormatted = "0" + seconds;
		}
		else{
			secondsFormatted = seconds;
		}
				
		ExperimentHUD.SetAvoidanceText(minutes + ":" + secondsFormatted + "." + centiseconds);
	}
	else{
		if(CuePlaying){
			Sounds.StopCue(1);
			CuePlaying = false;
      			Log('Avoidance left');
		}
	}
})
/**    
 * CODETANK 
 * Copyright (c) 2012, Tencent AlloyTeam, All rights reserved.
 * http://CodeTank.AlloyTeam.com/
 *
 * @version     1.0
 * @author      TAT.Csonlai
 *
 *  .d8888b.                888      88888888888               888   TM   
 * d88P  Y88b               888      ````888````               888      
 * 888    888               888          888                   888      
 * 888         .d88b.   .d88888  .d88b.  888  8888b.  88888b.  888  888 
 * 888        d88""88b d88" 888 d8P  Y8b 888     "88b 888 "88b 888 .88P 
 * 888    888 888  888 888  888 88888888 888 .d888888 888  888 888888K  
 * Y88b  d88P Y88..88P Y88b 888 Y8b.     888 888  888 888  888 888 "88b 
 *  "Y8888P"   "Y88P"   "Y88888  "Y8888  888 "Y888888 888  888 888  888 
 * 
 */
 
 Jx().$package(function(J){
    var count = 0; // Keeps track of how long we've
	// been searching for our target
	var gunTurnAmt; // How much to turn our gun when searching
	var trackName; // Name of the robot we're currently tracking
	Robot = new J.Class({extend : tank.Robot},{

		/**
		*robot主函数
		**/	
		run:function(){
            this.setUI(tank.ui["green"]);
			this.loop(function(){
                this.say("转到你晕~~~~","orange");
				this.setTurn(10000);
				this.ahead(10000);
			});
		},
		onHitWall:function(e){
			this.back(10);
		},
		onHitRobot:function(e){
			if(e.getBearing()<10&&e.getBearing()>-10){
				this.fire(3);
			}
		},
		onScannedRobot:function(e){
			this.fire(3);
		}

	});
});
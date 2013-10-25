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
    var smartTurn=function(angle){
        if(angle>180){
            angle=angle-360;
        }
        else if(angle<-180){
            angle=angle+360;
        }
        return angle;        
    };
    var getGunAngleToTurn=function(angleGunToTurn){
        return (angleGunToTurn+this.getHeading()-this.getGunHeading())%360;
    };       
	Robot = new J.Class({extend : tank.Robot},{

		/**
		*robot主函数
		**/	
		run:function(){
            this.setUI(tank.ui["white"]);
			trackName = null; // Initialize to not tracking anyone
			this.setAdjustGunForRobotTurn(true); // Keep the gun still when we turn
			gunTurnAmt = 10; // Initialize gunTurn to 10

		
			this.loop(function(){
				// turn the Gun (looks for enemy)
				this.turnGunRight(gunTurnAmt);
				// Keep track of how long we've been looking
				count++;
				// If we've haven't seen our target for 2 turns, look left
				if (count > 2) {
					gunTurnAmt = -10;
				}
				// If we still haven't seen our target for 5 turns, look right
				if (count > 5) {
					gunTurnAmt = 10;
				}
				// If we *still* haven't seen our target after 10 turns, find another target
				if (count > 11) {
					trackName = null;
				}


			});
          

			

		},
		/**
		*看到其他robot的处理程序
		**/	
		onScannedRobot:function(e){
            this.say("我跟定你了亲~","#887cff");
			if (trackName != null && e.getName()!=trackName) {
				return;
			}
			count=0;

			// If our target is too far away, turn and move toward it.
			if (e.getDistance() > 150) {

				this.setGunTurn(0);
               // this.stopMove();
				this.turnLeft(e.getBearing()); // and see how much Tracker improves...
				this.ahead(e.getDistance()-140);
				return;
			}	
            var angleToRobot=e.getBearing();
            var angleGunToTurn=getGunAngleToTurn.call(this,angleToRobot);
            var angleToTurn=smartTurn(angleGunToTurn);
            this.stopMove();
        	this.turnGunLeft(angleToTurn);
			this.fire(3);

			if(e.getDistance() < 100){
				if(e.getBearing()<=90&&e.getBearing()>-90)
					this.back(40);
				else
					this.ahead(40);
			}
			this.scan();
			

		},
		onHitRobot:function(e){
			var angle=e.getBearing()-(this.getGunHeading()-this.getHeading());
			this.turnGun(angle);
			this.fire(3);
			this.back(50);
		}
	});
});

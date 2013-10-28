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
			this.loop(function(){
				this.turnGunRight(10);

			});
		},
		/**
		*看到其他robot的处理程序
		**/	
		onScannedRobot:function(e){
            this.say("别跑啊亲！~","#887cff");
    		
            var angleToRobot=e.getBearing();
        	var angleGunToTurn=getGunAngleToTurn.call(this,angleToRobot);
            var angleToTurn=smartTurn(angleGunToTurn);
        	
			// If it's close enough, fire!
			if (Math.abs(angleToTurn) <= 3) {
                this.stopMove();
                this.turnGunLeft(angleToTurn);
				// We check gun heat here, because calling fire()
				// uses a turn, which could cause us to lose track
				// of the other robot.
				if (this.getGunHeat() == 0) {
					this.fire(Math.min(3 - Math.abs(angleToTurn), this.getEnergy() - .1));
				}
			} // otherwise just set the gun to turn.
			else {
                this.stopMove();
				this.turnGunLeft(angleToTurn);
			}	
			this.scan();			

		}

	});
});
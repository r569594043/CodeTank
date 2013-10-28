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
    var stopWhenSeeRobot;
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
    var smartFire=function(robot,robotDistance) {
        if (robotDistance > 200 || robot.getEnergy() < 15) {

        	robot.fire(1);
		} else if (robotDistance > 50) {
			robot.fire(2);
		} else {
			robot.fire(3);
		}
	}
	Robot = new J.Class({extend : tank.Robot},{
		
		/**
		*robot主函数
		**/	
		run:function(){
            this.setUI(tank.ui["green"]);
            this.say("go go go!","#887cff");
			var currentPos=this.getPos();
			var size=this.getSize();
			var heading=this.getHeading();

			stopWhenSeeRobot = false;
			this.turnLeft(90-heading,function(){
				stopWhenSeeRobot=true;
			});
			
			this.ahead(currentPos[1]-size[1]/2-10);
			this.turnLeft(90);
			this.ahead(currentPos[0]-size[0]/2-10);
    		this.loop(function(){
				
    			var angle=smartTurn(this.getGunHeading());
				this.turnGunLeft(angle);
				this.turnGunRight(90);
				this.turnGunLeft(90);
			});


		},
		/**
		*看到其他robot的处理程序
		**/	
		onScannedRobot:function(e){
			if (stopWhenSeeRobot){
				//this.turnGun(this.getHeading()-this.getGunHeading()+e.getBearing());
             
				this.stopMove();
	            var angleToRobot=e.getBearing();
            	var angleGunToTurn=getGunAngleToTurn.call(this,angleToRobot);
            	this.turnGunLeft(smartTurn(angleGunToTurn));
				smartFire(this,e.getDistance());
				this.scan();
			
			}
			else{
				smartFire(this,e.getDistance());
			}
			
		}

	
	});
});
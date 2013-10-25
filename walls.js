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
    var peek; // Don't turn if there's a robot there
    var moveAmount; // How much to move
    var isAhead;
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
            this.setUI(tank.ui["orange"]);
			var pos=this.getPos();
			var size=this.getSize();
			this.turnRight(this.getHeading()%90);
			this.turnGunRight(90);
			this.loop(function(){
                this.say("我是墙头坦克~","#8fe543");     
               // this.turnGunLeft(a);
				this.turnRight(90,function(){
                    isAhead=true;			
				});
                var heading=this.getHeading();
                var gunHeading=this.getGunHeading()
                var a=(this.getHeading()-this.getGunHeading())%360-90;
                this.setGunTurnLeft(smartTurn(a));
				this.ahead(1000);
			});
		},
		onHitWall:function(e){
			//this.stopMove();
            if(isAhead){
			    this.back(20);
                isAhead=false;
            }
            else{
                this.ahead(20);
                isAhead=true;
            }
		},
		onHitRobot:function(e){
			if(e.getBearing()<90&&e.getBearing()>-90){
                isAhead=false;
				this.back(100);
			}
			else{
                isAhead=true;
				this.ahead(100);
			}
		},
		onScannedRobot:function(e){
            var angleToRobot=e.getBearing();
            var angleGunToTurn=getGunAngleToTurn.call(this,angleToRobot);
            var angleToTurn=smartTurn(angleGunToTurn);
            this.turnGunLeft(angleToTurn);
			this.fire(2);
		}

	});
});
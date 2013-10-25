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
    var dist=50;
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
            this.setUI(tank.ui["gold"]);
            //this.turnRight(10000);
			this.loop(function(){
				this.turnGunRight(40);
			});
		

		},
		/**
		*看到其他robot的处理程序
		**/	
		onScannedRobot:function(e){
            //alert(e.getBearing());
           
            this.say("发现你了！","#8fe543");
			this.stopMove();
            var angleToRobot=e.getBearing();
        	var angleGunToTurn=getGunAngleToTurn.call(this,angleToRobot);
            var angleToTurn=smartTurn(angleGunToTurn);
        	this.turnGunLeft(angleToTurn);
			if (e.getDistance() < 50 && this.getEnergy() > 30) {
				this.fire(3);
			} // otherwise, fire 1.
			else {
				this.fire(1);
			}
			this.scan();
			//this.resumeMove();
		},
		/**
		*被子弹击中的处理程序
		**/	
		onHitByBullet:function(e){
            this.say("打我就跑~","#ff1818");
            var angle=90-(this.getHeading()-e.getHeading())%360;
			this.turnLeft(smartTurn(angle));
			this.ahead(dist,function(){
				dist*=-1;
			});

		},
		onHitRobot:function(e){
			var angle=e.getBearing()-(this.getGunHeading()-this.getHeading());
			this.turnGunLeft(angle%360);
			this.fire(3);
		},
        onWin:function(){
            this.say("你太菜啦~~");
            this.turn(3600);
        }


	});
});
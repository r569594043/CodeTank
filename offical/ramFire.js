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
    var turnDirection = 1;
	Robot = new J.Class({extend : tank.Robot},{

		/**
		*robot主函数
		**/	
		run:function(){
			this.setUI(tank.ui["gold"]);
			this.loop(function(){
				this.turnRight(30*turnDirection);
			});
			

		},
		/**
		*看到其他robot的处理程序
		**/	
		onScannedRobot:function(e){
            this.say("冲啊！","orange");
			if (e.getBearing() >= 0) {
				turnDirection = 1;
			} else {
				turnDirection = -1;
			}
            this.stopMove();
			this.turnLeft(e.getBearing());
			this.ahead(e.getDistance() + 5);
			this.scan();

		},
        onHitWall:function(){
            this.back(30);
        },
		onHitRobot:function(e){
			if (e.getBearing() >= 0) {
				turnDirection = 1;
			} else {
				turnDirection = -1;
			}
			this.turnLeft(e.getBearing());

			if (e.getEnergy() > 16) {
				this.fire(3);
			} else if (e.getEnergy() > 10) {
				this.fire(2);
			} else if (e.getEnergy() > 4) {
				this.fire(1);
			} else if (e.getEnergy() > 2) {
				this.fire(.5);
			} else if (e.getEnergy() > .4) {
				this.fire(.1);
			}
			this.ahead(40); // Ram him again!
		},
        onWin:function(){
            this.say("你太菜啦~~");
            this.turn(3600);
        }	


	});
});
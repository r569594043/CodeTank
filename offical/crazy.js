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
    var isMoveForward;
	var revertDirection=function(){
		if(isMoveForward){
			this.setAhead(-10000);
			isMoveForward=false;
		}
		else{
			this.setAhead(10000);
			isMoveForward=true;

		}
	};
	Robot = new J.Class({extend : tank.Robot},{
		/**
		*robot主函数
		**/	
		run:function(){

			this.setAhead(10000);
			isMoveForward=true;

			this.loop(function(){
                this.say("小样，能打到我么？","deepskyblue");
				this.setTurn(60,function(){
					this.setTurn(-120,function(){
						this.setTurn(240,function(){
							this.setTurn(-120);
							this.execute();
						});
						this.execute();
					});
					this.execute();
				});
				this.execute();				

			})


		},
		/**
		*看到其他robot的处理程序
		**/	
		onScannedRobot:function(e){
            this.say("打打打！","yellow");
			this.fire(1);
		},
		/**
		*和墙碰撞的处理程序
		**/	
		onHitWall:function(e){
			revertDirection.call(this);
		},
		onHitRobot:function(e){
			revertDirection.call(this);
		}
	
	});
});
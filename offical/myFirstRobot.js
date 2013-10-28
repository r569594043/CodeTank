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
    var isForward;

    Robot = new J.Class({extend : tank.Robot},{

		/*
		*robot主函数
		**/	
		run:function(){
            this.setUI(tank.ui["green"]);
			this.loop(function(){
				isForward=true;
				this.ahead(100); // Move ahead 100
				this.turnGunRight(360,function(){
					isForward=false;
				}); // Spin gun around
				this.back(100); // Move back 100
				this.turnGunRight(360); // Spin gun around
                this.say("我走了千万里，才找到一个你！！","yellow");
			});
		},
		onHitWall:function(e){
            this.say("这该死的墙！","#ff1818");
            if(isForward){
            	this.back(40);
            	isForward=false;
            }
            else{
            	this.ahead(40);
            	isForward=true;
            }
			
			this.turnRight(90);
            
		},
		onScannedRobot:function(e){
            this.say("亲，来一发吧，看你往哪儿躲！");
            this.fire(1);
		},
		onHitByBullet:function(e){
			var a=e.getBearing();
			this.turnLeft((90 + e.getBearing())%360);
            this.say("哇，好痛！","red");
		}

	});
});
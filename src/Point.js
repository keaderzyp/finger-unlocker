class Point{
	constructor(base,index) {
		this.initData(base,index)
		this.base = base;
	}
	initData(base,index){
		let point = base.point;
		let canvas = base.canvas;
		this.index = index;
		this.row = Math.floor(index/point.count);
		this.col = index-this.row*point.count;
		this.eachSpaceMaxWidth = canvas.width/point.count;
		this.eachSpaceMaxHeight = canvas.height/point.count;
		this.x = this.eachSpaceMaxWidth*this.row+this.eachSpaceMaxWidth/2;
		this.y = this.eachSpaceMaxHeight*this.col+this.eachSpaceMaxHeight/2;
		this.r = point.r>=this.eachSpaceMaxWidth/2?(this.eachSpaceMaxWidth/2-10):point.r;
		this.backgoundColor = point.backgoundColor;
		this.globalAlpha = point.globalAlpha;
		this.shadow = point.shadow;
		this.shadowColor = point.shadowColor;
		this.border = point.border;
		this.borderColor = point.borderColor;
		this.centerPointColor = point.centerPointColor;
		this.centerPointR = point.centerPointR>=this.eachSpaceMaxWidth/2?(this.eachSpaceMaxWidth/2-20):point.centerPointR;
	}
	render(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.globalAlpha = this.globalAlpha;
		ctx.fillStyle = this.backgoundColor;
		if(this.shadow){
			ctx.shadowColor = this.shadowColor;
			ctx.shadowBlur = 10;
		}
		if(this.border){
			ctx.strokeStyle = this.borderColor;
			ctx.lineWidth = 1;
		}
		ctx.arc(this.x,this.y,this.r,Math.PI*2,false);
		ctx.fill();
		ctx.stroke();
		if(this.active){
			ctx.beginPath();
			ctx.shadowBlur = 0;
			ctx.fillStyle = this.centerPointColor;
			ctx.arc(this.x,this.y,this.centerPointR,Math.PI*2,false);
			ctx.fill();
		}
		ctx.restore();
	}
	
	checkPointOnFinger(mouseX,mouseY){
		if(!this.active){
			if(Math.sqrt((mouseX-this.x)*(mouseX-this.x)+(mouseY-this.y)*(mouseY-this.y))<=this.r){
				this.active = true;
				this.rerender();
				return this;
			}
		}
		
	}
	rerender(){
		this.base.render();
	}
}
module.exports = Point;
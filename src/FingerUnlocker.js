import {Base64} from 'js-base64';
import MD5 from 'md5';
import SHA1 from 'sha1';
import Point from './Point.js';
export default class FingerUnlocker{
	constructor(args) {
		this.initData(args);
		this.initCanvas(this.el,args.callback);
		this.initPointList();
		this.render();
	}
	/**
	 * 初始化数据
	 * @param {Object} args 整体参数
	 * @param {Object} args.el 容器对象
	 * @param {Object} args.options 选项
	 * @param {Object} args.styles canvas样式表
	 * @param {Object} args.point 点的基本属性
	 * @param {Object} args.callback 事件的回调
	 */
	initData(args){
		let el = args.el;
		if(el==undefined||el==null){
			throw(new Error('the prop \'el\' is undefined(el属性为空,请检查)'));
			return;
		}
		if(args.styles){
			this.styles = {
				backgroundColor:args.styles.backgroundColor||'rgba(0,0,0,0)',
				width:args.styles.width||'100%',
				height:args.styles.width||'auto'
			}
		}else{
			this.styles = {
				backgroundColor:'rgba(0,0,0,0)',
				width:'100%',
				height:'auto'
			}
		}
		this.pointActiveArr = [];
	
		if(args.options){
			this.options = {
				width:args.options.width||600,
				height:args.options.height||600,
				lineWidth:args.options.lineWidth||20,
				lineColor:args.options.lineColor||'#3370CC',
				passwordType:args.options.passwordType||'none',//none,md5,sha1,base64
			}
		}else{
			this.options = {
				width:600,
				height:600,
				lineWidth:20,
				lineColor:'#3370CC',
				passwordType:'none',
			}
		}
		
		if(args.point){
			this.point = {
				count:args.point.count||3,
				r:args.point.r||50,
				backgoundColor:args.point.backgoundColor||'#22DDDD',
				globalAlpha:args.point.globalAlpha||1,
				shadow:args.point.shadow||false,
				shadowColor:args.point.shadowColor||'#22DDDD',
				borderColor:args.point.borderColor||'#3370CC',
				border:args.point.border||true,
				centerPointR:args.point.centerPointR||25,
				centerPointColor:args.point.centerPointColor||'#3370CC',
			}
		}else{
			this.point = {
				count:3,
				r:50,
				backgoundColor:'#22DDDD',
				globalAlpha:1,
				shadow:false,
				shadowColor:'#22DDDD',
				borderColor:'#3370CC',
				border:true,
				centerPointR:25,
				centerPointColor:'#3370CC',
			}
		}
		this.el = el;
		this.checkDevice();
	}
	initPointList(){
		this.pointList = [];
		for(let i = 0;i<this.point.count*this.point.count;i++){
			this.pointList.push(new Point(this,i));
		}
	}
	render(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.renderPoint();
		this.renderLine();
	}
	renderPoint(){
		for(let item of this.pointList){
			item.render(this.ctx);
		}
	}
	renderLine(){
		if(this.pointActiveArr.length>0){
			this.ctx.beginPath();
			this.ctx.strokeStyle = this.options.lineColor;
			this.ctx.lineWidth = this.options.lineWidth;
			this.ctx.lineCap="round";
			this.ctx.lineJoin="round";
			this.ctx.miterLimit=1;
			this.ctx.moveTo(this.pointActiveArr[0].x,this.pointActiveArr[0].y);
			for(let i = 1;i<this.pointActiveArr.length;i++){
				this.ctx.lineTo(this.pointActiveArr[i].x,this.pointActiveArr[i].y)
			}
			this.ctx.lineTo(this.mouseX,this.mouseY);
			this.ctx.stroke();
		}
	}
	/**
	 * 初始化canvas
	 * @param {Object} el canvas的容器
	 */
	initCanvas(el,callback){
		let canvas = document.createElement('canvas');
		canvas.width = this.options.width;
		canvas.height = this.options.height;
		for(let key in this.styles){
			canvas.style[key] = this.styles[key]
		}
		el.appendChild(canvas);
		el.style.display = 'flex';
		el.style.justifyContent = 'center';
		el.style.alignItems = 'center';
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		let _this = this;
		if(this.isPC){
			canvas.onmousedown = e => {
				_this.mouseDown(e)
				if(callback){
					if(callback.mouseDown){
						callback.mouseDown(_this);
					}
				}
				
			}
			canvas.onmousemove = e => {
				_this.mouseMove(e)
				if(callback){
					if(callback.mouseMove){
						callback.mouseMove(_this);
					}
				}
			}
			canvas.onmouseup = e => {
				_this.mouseUp(e)
				if(callback){
					if(callback.mouseUp){
						callback.mouseUp(_this);
					}
				}
				
			}
		}else{
			canvas.ontouchstart = e => {
				_this.touchStart(e)
				if(callback){
					if(callback.touchStart){
						callback.touchStart(_this);
					}
				}
			}
			canvas.ontouchmove = e => {
				_this.touchMove(e)
				if(callback){
					if(callback.touchMove){
						callback.touchMove(_this);
					}
				}
			}
			canvas.ontouchend = e => {
				_this.touchEnd(e)
				if(callback){
					if(callback.touchEnd){
						callback.touchEnd(_this);
					}
				}
				
			}
		}
	}
	checkDevice(){
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
		{
			this.isPC = false;
		}else{
			this.isPC = true;
		}
	}
	computedMouseXY(x,y){
		this.mouseX = Math.round(x/this.canvas.offsetWidth*this.canvas.width*1000)/1000;
		this.mouseY = Math.round(y/this.canvas.offsetHeight*this.canvas.height*1000)/1000;
	}
	mouseDown(e){
		this.computedMouseXY(e.layerX|e.offsetX,e.layerY|e.offsetY);
		this.isMouseDown = true;
		this.checkPoint();
	}
	mouseMove(e){
		if(this.isMouseDown){
			this.computedMouseXY(e.layerX||e.offsetX,e.layerY||e.offsetY);
			this.checkPoint();
			console.log(this.mouseX,this.mouseY)
		}
	}
	mouseUp(e){
		this.getPassWordAndClearPointArr();
		this.computedMouseXY(e.layerX||e.offsetX,e.layerY||e.offsetY);
		this.isMouseDown = false;
	}
	
	computedCanvasPositionAndFixTouchPosition(x,y){
		let canvasRect = this.canvas.getBoundingClientRect();
		this.computedMouseXY(x-canvasRect.left,y-canvasRect.top);
	}
	
	touchStart(e){
		this.computedCanvasPositionAndFixTouchPosition(e.targetTouches[0].pageX,e.targetTouches[0].pageY);
		this.checkPoint();
	}
	touchMove(e){
		this.computedCanvasPositionAndFixTouchPosition(e.targetTouches[0].pageX,e.targetTouches[0].pageY);
		this.checkPoint();
	}
	touchEnd(e){
		this.getPassWordAndClearPointArr();
	}
	
	checkPoint(){
		for(let item of this.pointList){
			let rn = item.checkPointOnFinger(this.mouseX,this.mouseY);
			if(rn){
				this.pointActiveArr.push(rn);
			}
		}
		this.render();
	}
	getPassWordAndClearPointArr(){
		this.password = '';
		for(let item of this.pointActiveArr){
			this.password = this.password + item.index;
		}
		this.pointActiveArr = [];
		this.restorePointList();
		this.render();
		switch (this.options.passwordType){
			case 'md5':
				this.password = MD5(this.password);
				break;
			case 'sha1':
				this.password = SHA1(this.password);
				break;
			case 'base64':
				this.password = Base64.encode(this.password);
				break;
			default:
				break;
		}
		return this.password;
	}
	restorePointList(){
		for(let item of this.pointList){
			item.active = false;
		}
	}
}
window.FingerUnlocker = FingerUnlocker;
import FingerUnlocker from './FingerUnlocker.js';
let f = new FingerUnlocker({
	el:document.querySelector('#container'),
	point:{
		count:4
	},
	options:{
		passwordType:'sha1'
	},
	callback:{
		touchEnd(res){
			console.log(res)
		},
		mouseUp(res){
			console.log(res)
		}
	}
})
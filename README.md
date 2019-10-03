 # finger-unlocker
一款web端的手势解锁组件  

> 引入介绍（Introduction）

finger-unlocker是一款可自由定制样式的手势解锁组件，支持web端移动端使用。
通过npm安装步骤如下：

```javascript
npm i finger-unlocker
```
    
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<div id="container"  ></div>
	</body>
</html>
```  
```javascript
  import FingerUnlocker from 'finger-unlocker';
  new FingerUnlocker({
    el:document.querySelector("#container"),
    options:{
	    passwordType:'base64'
    },
    callback:{
	    mouseUp(res){
		    console.log(res.password);
	    },
	    touchEnd(res){
		    console.log(res.password);
	    }
    }
  })
```

> 参数说明（Parameter description）

Introduction of Overall Parameters
| prop |  type|required|info|
|--|--|--|--|
| el |  htmlElement|true|the container of finger-unlocker|
| options |  object|false|Option configuration for finger-unlocker, please refer to the parameters of options for details |
| styles |  object|false|The style sheet of canvas object can configure the style of canvas object itself according to the setting specification of CSS |
| point |  object|false|Configure the styles of all gesture touch points. Refer to point's specific parameters for details. |
| callback |  object|false|Callback events for components |

Introduction of **options** 
| prop |  type| required | default| info |
|--|--|--|--|--|
| width |  number|false|600|Canvas transverse physical pixels |
| height |  number|false|600|Vertical physical pixels of canvas|
| lineWidth |  number|false|20|Width of trajectory |
| lineColor |  string|false|'#3370CC'|Color of Trajectory Line |
| passwordType |  string|false|'none'|Encryption Type of Password，You can set 'md5','sha1','base64'|

Introduction of **point** 
| prop |  type| required | default| info |
|--|--|--|--|--|
| count |  number|false|3|The number of lattices is the cardinal number multiplied by the cardinal number |
| r |  number|false|50|Radius of each circle,Invalid settings when available space is worth exceeding a point|
| backgroundColor |  number|false|'#22DDDD'|Background color of dots |
| shadow |  boolean|false|Whether to set shadows |
| shadowColor |  string|false|'#22DDDD'|Shadow color|
| border |  boolean|false|false|Whether to set the border|
| borderColor |  string|false|'#3370CC'|Border Color|
| centerPointR |  number|false|25'|The Radius of the active dot|
| centerPointColor |  string|false|'#3370CC'|The color of the active dot|
Introduction of **callback** 
| prop |  type| required | default| info |
|--|--|--|--|--|
| mouseUp |  function|false|function(res){}|Callback of mouse button lifting event returns all object information of Finger Unlocker |
| touchEnd |  function|false|function(res){}|Callbacks to finger-lift events return all object information for Finger Unlocker|




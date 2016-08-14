/**
 * Created by LQL on 2016/5/25.
 */
var EventUtil = {

    addEvent:function(obj,event,handler){
        if(obj.addEventListener){
            obj.addEventListener(event,handler,true);
        }else if(obj.attachEvent){
            event += 'on';
            obj.attachEvent(event , handler);
        }else{
            event += 'on';
            obj[event] = handler;
        }
    },
    removeEvent : function (obj, event, handler) {
        if(obj.addEventListener){
            obj.removeEventListener(event,handler,true);
        }else if(obj.attachEvent){
            event += 'on';
            obj.detachEvent(event , handler);
        }else{
            event += 'on';
            obj[event] = null;
        }
    },
    getEvent:function(event){
        return event ? event : window.event;
    },
    getTarget:function(event){
        return event.target ? event.target : event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault(); //dom取消事件的默认行为
        }else{
            event.returnValue = true; //IE取消事件的默认行为
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation; //取消冒泡
        }else{
            event.cancelBubble = true; //IE取消冒泡
        }
    },
    getRelatedTarget:function(event){ // 获取mouseover,mouseout方法的相关对象
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    },
    getWheelDelta:function(event){ //跨浏览器获取滚轮的滚动值
        if(event.wheelDelta){
            return event.wheelDelta;
        }else{
            return -event.detail * 40;
        }
    },
    getCharCode:function(event){
        if(typeof event.charCode == "number"){//IE9，FF , chrome,opera,sf按键 的ASCII码
            return event.charCode;
        }else{
            return event.keyCode;  //IE8之前版本获取所按下按键的ASCII码
        }
    }
}

//删除作用两边的空格
String.prototype.trim=function()
{
     return this.replace(/(^\s*)|(\s*$)/g, "");
}

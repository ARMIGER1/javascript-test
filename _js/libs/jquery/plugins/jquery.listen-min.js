/**
 * jQuery.Listen - Unattached event handling.
 * Copyright (c) 2007 Ariel Flesler - aflesler(at)gmail(dot)com
 * Licensed under LGPL license (http://www.gnu.org/licenses/lgpl.html).
 * @author Ariel Flesler
 * @version 0.8
 * Date: 12/10/2007
 * Compatible with jQuery 1.2.1, tested on Firefox 2.0.0.6, and IE 6, both on Windows.
 **/
(function($){$.listen=function(a,b,c,d){if($.listen.illegal(a))throw'jQuery.Listen > "'+a+'" can\'t be handled because it doesn\'t bubble';if(typeof b!='object')d=c,c=b,b=document;var e=jQuery.data(b,'indexer-'+a)||jQuery.data(b,'indexer-'+a,new Indexer(a,b));switch(c){case undefined:case false:e.stop();break;default:e.append(c,d);case true:e.start();break}};$.fn.listen=function(a,b,c){return this.each(function(){$.listen(a,this,b,c)})};$.extend($.listen,{strict:true,bubbles:{},illegal:function(a){return this.strict&&!this.bubbles[a]}});$.each(('click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,'+'keydown,keypress,keyup').split(','),function(i,e){$.listen.bubbles[e]=true});function Indexer(a,b){this.ids={};this.names={};this.listener=b;this.event=a;Indexer.instances.push(this)};Indexer.instances=[];Indexer.prototype={constructor:Indexer,handler:function(e){var a=e.data;e.data=null;a.parse.apply(a,arguments)},running:false,start:function(){if(this.running)return;$.event.add(this.listener,this.event,this.handler,this);this.running=true},stop:function(){if(!this.running)return;$.event.remove(this.listener,this.event,this.handler);this.running=false},parse:function(e){var d=e.target,handlers=[];if(d.id&&this.ids[d.id])push(handlers,this.ids[d.id]);each([d.nodeName,'*'],function(b){var c=this.names[b];if(c)each(push(d.className.split(' '),['*']),function(a){if(c[a])push(handlers,c[a])})},this);this.execute(d,handlers,arguments);d=handlers=e=null},append:function(a,b){var c=new Index(a);if(c.id){(this.ids[c.id]||(this.ids[c.id]=[])).push(b)}else if(c.nodeName){var d=this.names[c.nodeName]||(this.names[c.nodeName]={});(d[c.className]||(d[c.className]=[])).push(b)}else{throw'jQuery.Listen > "'+a+'" was not recognized as a valid selector.';}},execute:function(b,c,d){if(c.length)each(c,function(a){a.apply(b,d)})}};function Index(a){var b=Index.regex.exec(a)||[];if(b[1]){this.id=b[1]}else if(b[2]||b[3]){this.nodeName=b[2]?b[2].toUpperCase():'*';this.className=b[3]?b[3].substring(1):'*'}};Index.regex=/#([\w\d_-]+)$|(\w*)(\.[\w_]+)?$/;function each(a,b,c){for(var i=0,l=a.length;i<l;i++)b.call(c,a[i],i)};function push(a,b){Array.prototype.push.apply(a,b);return a};$.event.add(window,'unload',function(){if(Indexer)$.each(Indexer.instances,function(i,a){a.stop();a.listener=null})})})(jQuery);
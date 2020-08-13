function _defineProperties(l,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(l,n.key,n)}}function _createClass(l,t,e){return t&&_defineProperties(l.prototype,t),e&&_defineProperties(l,e),l}function _classCallCheck(l,t){if(!(l instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{p9XQ:function(l,t,e){"use strict";e.r(t);var n=e("8Y7J"),a=function l(){_classCallCheck(this,l)},o=e("pMnS"),r=e("UMKc"),i=e("BWfq"),u=e("hOc/"),c=e("PMgq"),s=e("g895"),h=e("VT0v"),d=e("SVse"),g=e("MKJQ"),b=e("sZkV"),p=e("hrZj"),f=e("aILq"),v=e("s7LF"),m=e("mrSG"),C=e("qyxE"),y=e("bBk2"),M=e("A1CT"),D=e("MO+k"),w=function(){function l(t,e,n){_classCallCheck(this,l),this.appDBService=t,this.utilityService=e,this.router=n,this.chartFilterModel={fromDate:null,toDate:null,dateRange:"YEAR"},this.chartCategsDetail=[],this.chartSelectedEl="",this.chartRefOut=null,this.chartRefIn=null,this.chartSliderOpts={initialSlide:0,speed:400,allowTouchMove:!1},this.totalOut=0,this.totalIn=0}return _createClass(l,[{key:"refreshChart",value:function(){var l=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e={entity:C.a.entityName,date:{$gte:this.utilityService.dateToISO(this.chartFilterModel.fromDate),$lte:this.utilityService.dateToISO(this.chartFilterModel.toDate)}};C.a.getEntries(this.appDBService,!1,null,e).then((function(e){var n=e;l.totalOut=0,l.totalIn=0;var a=[];if("YEAR"===l.chartFilterModel.dateRange)a=["Ge","Fe","Ma","Ap","Ma","Gi","Lu","Ag","Se","Ot","No","Di"];else if("MONTH"===l.chartFilterModel.dateRange)for(var o=0;o<new Date(l.chartFilterModel.toDate).getDate();o++)a.push(""+(o+1));else if("PERIOD"===l.chartFilterModel.dateRange)for(var r=new Date(l.chartFilterModel.fromDate),i=new Date(l.chartFilterModel.toDate),u=r.getMonth()!==i.getMonth(),c=r;c.getTime()<=i.getTime();){var s=("00"+c.getDate()).slice(-2);u&&(s+="/"+("00"+(c.getMonth()+1).toString()).slice(-2)),a.push(s),c=new Date(c.getTime()+864e5)}else a=["Lu","Ma","Me","Gi","Ve","Sa","Do"];var h=[],d=[],g=[],b=[];n.forEach((function(t){if(b.indexOf(t.id_category)<0&&g.indexOf(t.id_category)<0){var e={id_category:t.category._id,label:t.category.description,color:t.category.color,icon:t.category.icon,backgroundColor:l.utilityService.hexToRgbA(t.category.color,.5),borderColor:t.category.color,borderWidth:1,data:[]};a.forEach((function(){e.data.push(0)})),"P"===t.category.type?(d.push(e),b.push(t.id_category)):(h.push(e),g.push(t.id_category))}var n=0;if("P"===t.category.type?(n=b.indexOf(t.id_category),l.totalIn+=t.value):(n=g.indexOf(t.id_category),l.totalOut+=-1*t.value),"YEAR"===l.chartFilterModel.dateRange){var o=new Date(t.date).getMonth();"P"===t.category.type?d[n].data[o]+=t.value:h[n].data[o]+=t.value}else if("MONTH"===l.chartFilterModel.dateRange){var r=new Date(t.date).getDate();"P"===t.category.type?d[n].data[r-1]+=t.value:h[n].data[r-1]+=t.value}else if("PERIOD"===l.chartFilterModel.dateRange){var i=new Date(new Date(t.date).getFullYear(),new Date(t.date).getMonth(),new Date(t.date).getDate(),0,0,0),u=parseInt((Math.abs(new Date(l.chartFilterModel.fromDate).getTime()-i.getTime())/1e3/60/60/24).toString());"P"===t.category.type?d[n].data[u+1]+=t.value:h[n].data[u+1]+=t.value}else{var c=new Date(t.date).getDay()-1;c<0&&(c=6),"P"===t.category.type?d[n].data[c]+=t.value:h[n].data[c]+=t.value}})),l.chartRefIn&&l.chartRefIn.destroy(),l.chartRefOut&&l.chartRefOut.destroy(),l.chartRefIn=new D.Chart(l.statsInChart.nativeElement,{type:"bar",data:{labels:a,datasets:d},options:{legend:{display:!1},tooltips:{enabled:!1},maintainAspectRatio:!1,responsive:!0,scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0,ticks:{display:!0,fontSize:9,callback:function(l,t,e){return l+" \u20ac "}}}]},onClick:function(t){l.showChartCategsDetail(t,l.chartRefIn)}}}),l.chartRefOut=new D.Chart(l.statsOutChart.nativeElement,{type:"bar",data:{labels:a,datasets:h},options:{legend:{display:!1},tooltips:{enabled:!1},maintainAspectRatio:!1,responsive:!0,scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0,ticks:{display:!0,fontSize:9,callback:function(l,t,e){return l+" \u20ac "}}}]},onClick:function(t){l.showChartCategsDetail(t,l.chartRefOut)}}}),t&&t.target.complete()}))}},{key:"dateFilterChanged",value:function(l){this.chartFilterModel.fromDate=l.start.toISOString(),this.chartFilterModel.toDate=l.end.toISOString(),this.chartFilterModel.dateRange=l.range,this.refreshChart()}},{key:"segmentChanged",value:function(l){l.detail&&l.detail.value&&(this.chartCategsDetail=[],"in"===l.detail.value?this.chartSlider.slideNext():this.chartSlider.slidePrev())}},{key:"showChartCategsDetail",value:function(l,t){var e=this;this.chartCategsDetail=[];var n=t.getElementsAtXAxis(l);if(n.length>0){var a=n[0]._index,o=0;t.config.data.datasets.forEach((function(l){o+=parseFloat(l.data[a])})),t.config.data.datasets.forEach((function(l){parseInt(l.data[a],10)>0&&e.chartCategsDetail.push({color:l.color,icon:l.icon,description:l.label,id_category:l.id_category,index:a,value:parseFloat(l.data[a]),perc:parseFloat(l.data[a])/o*100})})),this.chartSelectedEl=t.config.data.labels[a],this.chartCategsDetail.sort((function(l,t){return l.value>t.value?-1:1})),this.scrollToBottom(t)}}},{key:"scrollToBottom",value:function(l){return m.a(this,void 0,void 0,regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{this.mainContent.scrollToPoint(0,l.height,1500)}catch(e){}case 1:case"end":return t.stop()}}),t,this)})))}},{key:"showCatMoviments",value:function(l){var t=0,e="YEAR";if("YEAR"===this.chartFilterModel.dateRange){var n=new Date(this.chartFilterModel.fromDate).getFullYear(),a=(new Date).getFullYear(),o=(new Date).getMonth();t=12*(n-a),t+=l.index-o,e="MONTH"}else{var r=new Date,i=new Date(this.chartFilterModel.fromDate),u=null;if("MONTH"===this.chartFilterModel.dateRange)u=new Date(i.getFullYear(),i.getMonth(),l.index+1);else if("WEEK"===this.chartFilterModel.dateRange||"PERIOD"===this.chartFilterModel.dateRange){var c=new Date(i.getFullYear(),i.getMonth(),i.getDate());u=new Date(c.getTime()+864e5*l.index)}else u=new Date(i.getFullYear(),i.getMonth(),i.getDate());var s=u.getTime()-r.getTime();t=parseInt((s/1e3/60/60/24).toString(),10),e="TODAY"}this.router.navigate(["/t/list-moviments",{category:l.id_category,filterDateType:e,filterDateOffset:t}])}}]),l}(),k=e("iInd"),x=n.nb({encapsulation:0,styles:[["ion-content[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:translucent}ion-slides[_ngcontent-%COMP%]{height:100%}ion-slides[_ngcontent-%COMP%]   ion-slide[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]{width:100%;height:100%;overflow-x:auto;overflow-y:hidden;background-color:#fff}ion-slides[_ngcontent-%COMP%]   ion-slide[_ngcontent-%COMP%]   .chart[_ngcontent-%COMP%]{width:200%;height:100%}.perc-bar-content[_ngcontent-%COMP%]{position:relative;width:100%;height:5px;border-radius:3px;background-color:var(--ion-color-light)}.perc-bar-content[_ngcontent-%COMP%]   .perc-bar[_ngcontent-%COMP%]{position:absolute;left:0;height:5px;border-radius:3px}.perc-bar-content[_ngcontent-%COMP%]   .perc[_ngcontent-%COMP%]{position:absolute;width:40px;height:20px;background-color:#fff;font-size:9px;font-weight:700;line-height:20px;text-align:right;right:0;top:-20px;color:var(--ion-color-medium)}"]],data:{}});function O(l){return n.Kb(0,[(l()(),n.pb(0,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),n.pb(1,0,null,null,2,"h5",[["class","ion-text-center"]],null,null,null,null,null)),(l()(),n.pb(2,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),n.Ib(3,null,["",""])),(l()(),n.pb(4,0,null,null,1,"fb-categs-card-list",[],null,[[null,"itemClicked"]],(function(l,t,e){var n=!0;return"itemClicked"===t&&(n=!1!==l.component.showCatMoviments(e)&&n),n}),c.c,c.b)),n.ob(5,49152,null,0,h.a,[],{categories:[0,"categories"]},{itemClicked:"itemClicked"})],(function(l,t){l(t,5,0,t.component.chartCategsDetail)}),(function(l,t){l(t,3,0,t.component.chartSelectedEl)}))}function F(l){return n.Kb(0,[n.Cb(0,d.e,[n.s]),n.Gb(671088640,1,{statsOutChart:0}),n.Gb(671088640,2,{statsInChart:0}),n.Gb(671088640,3,{chartSlider:0}),n.Gb(671088640,4,{mainContent:0}),(l()(),n.pb(5,0,null,null,9,"div",[],null,null,null,null,null)),(l()(),n.pb(6,0,null,null,6,"ion-list",[["mode","ios"]],null,null,null,g.tb,g.x)),n.ob(7,49152,null,0,b.O,[n.h,n.k,n.x],{mode:[0,"mode"]},null),(l()(),n.pb(8,0,null,0,4,"ion-list-header",[],null,null,null,g.sb,g.y)),n.ob(9,49152,null,0,b.P,[n.h,n.k,n.x],null,null),(l()(),n.pb(10,0,null,0,2,"ion-label",[["class","ion-no-margin"]],null,null,null,g.rb,g.w)),n.ob(11,49152,null,0,b.N,[n.h,n.k,n.x],null,null),(l()(),n.Ib(-1,0,["Statistiche"])),(l()(),n.pb(13,0,null,null,1,"fb-date-filter-toolbar",[],null,[[null,"changed"]],(function(l,t,e){var n=!0;return"changed"===t&&(n=!1!==l.component.dateFilterChanged(e)&&n),n}),p.b,p.a)),n.ob(14,114688,null,0,f.a,[b.Jb,n.h,n.x],null,{changed:"changed"}),(l()(),n.pb(15,0,null,null,24,"div",[["style","margin: 5px; margin-top: -5px;"]],null,null,null,null,null)),(l()(),n.pb(16,0,null,null,23,"ion-segment",[["color","medium"],["mode","ios"],["value","out"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,t,e){var a=!0,o=l.component;return"ionBlur"===t&&(a=!1!==n.Bb(l,19)._handleBlurEvent(e.target)&&a),"ionChange"===t&&(a=!1!==n.Bb(l,19)._handleChangeEvent(e.target)&&a),"ionChange"===t&&(a=!1!==o.segmentChanged(e)&&a),a}),g.Cb,g.G)),n.Fb(5120,null,v.d,(function(l){return[l]}),[b.Lb]),n.ob(18,49152,null,0,b.ib,[n.h,n.k,n.x],{color:[0,"color"],mode:[1,"mode"],value:[2,"value"]},null),n.ob(19,16384,null,0,b.Lb,[n.k],null,null),(l()(),n.pb(20,0,null,0,9,"ion-segment-button",[["layout","icon-start"],["value","out"]],null,null,null,g.Bb,g.H)),n.ob(21,49152,null,0,b.jb,[n.h,n.k,n.x],{layout:[0,"layout"],value:[1,"value"]},null),(l()(),n.pb(22,0,null,0,1,"ion-icon",[["color","danger"],["name","arrow-down"]],null,null,null,g.lb,g.q)),n.ob(23,49152,null,0,b.C,[n.h,n.k,n.x],{color:[0,"color"],name:[1,"name"]},null),(l()(),n.pb(24,0,null,0,5,"ion-label",[["color","danger"]],null,null,null,g.rb,g.w)),n.ob(25,49152,null,0,b.N,[n.h,n.k,n.x],{color:[0,"color"]},null),(l()(),n.Ib(-1,0,[" Uscite "])),(l()(),n.pb(27,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),n.Ib(28,0,[" "," \u20ac "])),n.Eb(29,2),(l()(),n.pb(30,0,null,0,9,"ion-segment-button",[["layout","icon-start"],["value","in"]],null,null,null,g.Bb,g.H)),n.ob(31,49152,null,0,b.jb,[n.h,n.k,n.x],{layout:[0,"layout"],value:[1,"value"]},null),(l()(),n.pb(32,0,null,0,1,"ion-icon",[["color","success"],["name","arrow-up"]],null,null,null,g.lb,g.q)),n.ob(33,49152,null,0,b.C,[n.h,n.k,n.x],{color:[0,"color"],name:[1,"name"]},null),(l()(),n.pb(34,0,null,0,5,"ion-label",[["color","success"]],null,null,null,g.rb,g.w)),n.ob(35,49152,null,0,b.N,[n.h,n.k,n.x],{color:[0,"color"]},null),(l()(),n.Ib(-1,0,[" Entrate "])),(l()(),n.pb(37,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),n.Ib(38,0,[" "," \u20ac "])),n.Eb(39,2),(l()(),n.pb(40,0,null,null,15,"ion-content",[["color","light"]],null,null,null,g.eb,g.j)),n.ob(41,49152,[[4,4],["mainContent",4]],0,b.u,[n.h,n.k,n.x],{color:[0,"color"],scrollEvents:[1,"scrollEvents"]},null),(l()(),n.pb(42,0,null,0,11,"ion-slides",[["pager","false"]],null,null,null,g.Gb,g.L)),n.ob(43,49152,[[3,4],["chartSlider",4]],0,b.ob,[n.h,n.k,n.x],{options:[0,"options"],pager:[1,"pager"]},null),(l()(),n.pb(44,0,null,0,4,"ion-slide",[],null,null,null,g.Fb,g.K)),n.ob(45,49152,null,0,b.nb,[n.h,n.k,n.x],null,null),(l()(),n.pb(46,0,null,0,2,"div",[["class","chart-container"]],null,null,null,null,null)),(l()(),n.pb(47,0,null,null,1,"div",[["class","chart"]],null,null,null,null,null)),(l()(),n.pb(48,0,[[1,0],["statsOutChart",1]],null,0,"canvas",[],null,null,null,null,null)),(l()(),n.pb(49,0,null,0,4,"ion-slide",[],null,null,null,g.Fb,g.K)),n.ob(50,49152,null,0,b.nb,[n.h,n.k,n.x],null,null),(l()(),n.pb(51,0,null,0,2,"div",[["class","chart-container"]],null,null,null,null,null)),(l()(),n.pb(52,0,null,null,1,"div",[["class","chart"]],null,null,null,null,null)),(l()(),n.pb(53,0,[[2,0],["statsInChart",1]],null,0,"canvas",[],null,null,null,null,null)),(l()(),n.eb(16777216,null,0,1,null,O)),n.ob(55,16384,null,0,d.k,[n.M,n.J],{ngIf:[0,"ngIf"]},null)],(function(l,t){var e=t.component;l(t,7,0,"ios"),l(t,14,0),l(t,18,0,"medium","ios","out"),l(t,21,0,"icon-start","out"),l(t,23,0,"danger","arrow-down"),l(t,25,0,"danger"),l(t,31,0,"icon-start","in"),l(t,33,0,"success","arrow-up"),l(t,35,0,"success"),l(t,41,0,"light",!0),l(t,43,0,e.chartSliderOpts,"false"),l(t,55,0,e.chartCategsDetail.length>0)}),(function(l,t){var e=t.component,a=n.Jb(t,28,0,l(t,29,0,n.Bb(t,0),e.totalOut,"1.2-2"));l(t,28,0,a);var o=n.Jb(t,38,0,l(t,39,0,n.Bb(t,0),e.totalIn,"1.2-2"));l(t,38,0,o)}))}var _=n.lb("app-stats",w,(function(l){return n.Kb(0,[(l()(),n.pb(0,0,null,null,1,"app-stats",[],null,null,null,F,x)),n.ob(1,49152,null,0,w,[y.a,M.a,k.m],null,null)],null,null)}),{},{},[]),R=e("eVLi");e.d(t,"StatsPageModuleNgFactory",(function(){return S}));var S=n.mb(a,[],(function(l){return n.yb([n.zb(512,n.j,n.X,[[8,[o.a,r.a,i.a,u.a,c.a,s.a,_]],[3,n.j],n.v]),n.zb(4608,d.m,d.l,[n.s,[2,d.x]]),n.zb(4608,b.c,b.c,[n.x,n.g]),n.zb(4608,b.Eb,b.Eb,[b.c,n.j,n.p]),n.zb(4608,b.Jb,b.Jb,[b.c,n.j,n.p]),n.zb(4608,v.l,v.l,[]),n.zb(1073742336,d.b,d.b,[]),n.zb(1073742336,b.Bb,b.Bb,[]),n.zb(1073742336,v.k,v.k,[]),n.zb(1073742336,v.b,v.b,[]),n.zb(1073742336,k.o,k.o,[[2,k.t],[2,k.m]]),n.zb(1073742336,R.a,R.a,[]),n.zb(1073742336,a,a,[]),n.zb(1024,k.k,(function(){return[[{path:"",component:w}]]}),[])])}))}}]);
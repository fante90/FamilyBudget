function _defineProperties(t,e){for(var l=0;l<e.length;l++){var n=e[l];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,l){return e&&_defineProperties(t.prototype,e),l&&_defineProperties(t,l),t}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{p9XQ:function(t,e,l){"use strict";l.r(e);var n=l("8Y7J"),a=function t(){_classCallCheck(this,t)},o=l("pMnS"),r=l("UMKc"),i=l("BWfq"),u=l("hOc/"),c=l("PMgq"),s=l("g895"),h=l("VT0v"),d=l("SVse"),g=l("MKJQ"),b=l("sZkV"),p=l("hrZj"),f=l("aILq"),v=l("s7LF"),C=l("mrSG"),D=l("qyxE"),m=l("bBk2"),y=l("A1CT"),M=l("MO+k"),O=function(){function t(e,l,n){_classCallCheck(this,t),this.appDBService=e,this.utilityService=l,this.router=n,this.chartFilterModel={fromDate:null,toDate:null,offset:0,dateRange:"YEAR"},this.chartCategsDetailTIn=[],this.chartCategsDetailTOut=[],this.chartCategsDetail=[],this.chartSelectedEl="",this.currentChart="out",this.chartRefOut=null,this.chartRefIn=null,this.chartSliderOpts={initialSlide:0,speed:400,allowTouchMove:!1},this.totalOut=0,this.totalIn=0}return _createClass(t,[{key:"refreshChart",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,l={entity:D.a.entityName,date:{$gte:this.utilityService.dateToISO(this.chartFilterModel.fromDate),$lte:this.utilityService.dateToISO(this.chartFilterModel.toDate)}};D.a.getEntries(this.appDBService,!1,null,l).then((function(l){var n=l;t.totalOut=0,t.totalIn=0,t.chartCategsDetailTIn=[],t.chartCategsDetailTOut=[];var a=[];if("YEAR"===t.chartFilterModel.dateRange)a=["Ge","Fe","Ma","Ap","Ma","Gi","Lu","Ag","Se","Ot","No","Di"];else if("MONTH"===t.chartFilterModel.dateRange)for(var o=0;o<new Date(t.chartFilterModel.toDate).getDate();o++)a.push(""+(o+1));else if("PERIOD"===t.chartFilterModel.dateRange)for(var r=new Date(t.chartFilterModel.fromDate),i=new Date(t.chartFilterModel.toDate),u=r.getMonth()!==i.getMonth(),c=r;c.getTime()<=i.getTime();){var s=("00"+c.getDate()).slice(-2);u&&(s+="/"+("00"+(c.getMonth()+1).toString()).slice(-2)),a.push(s),c=new Date(c.getTime()+864e5)}else a=["Lu","Ma","Me","Gi","Ve","Sa","Do"];var h=[],d=[],g=[],b=[];n.forEach((function(e){if(b.indexOf(e.id_category)<0&&g.indexOf(e.id_category)<0){var l={id_category:e.category._id,label:e.category.description,color:e.category.color,icon:e.category.icon,backgroundColor:t.utilityService.hexToRgbA(e.category.color,.5),borderColor:e.category.color,borderWidth:1,data:[]};a.forEach((function(){l.data.push(0)})),"P"===e.category.type?(d.push(l),b.push(e.id_category)):(h.push(l),g.push(e.id_category))}var n=0;if("P"===e.category.type?(n=b.indexOf(e.id_category),t.totalIn+=e.value):(n=g.indexOf(e.id_category),t.totalOut+=-1*e.value),"YEAR"===t.chartFilterModel.dateRange){var o=new Date(e.date).getMonth();"P"===e.category.type?d[n].data[o]+=e.value:h[n].data[o]+=e.value}else if("MONTH"===t.chartFilterModel.dateRange){var r=new Date(e.date).getDate();"P"===e.category.type?d[n].data[r-1]+=e.value:h[n].data[r-1]+=e.value}else if("PERIOD"===t.chartFilterModel.dateRange){var i=new Date(new Date(e.date).getFullYear()+"-"+("00"+(new Date(e.date).getMonth()+1)).slice(-2)+"-"+("00"+new Date(e.date).getDate()).slice(-2)+"T00:00:00.000Z"),u=parseInt((Math.abs(new Date(t.chartFilterModel.fromDate).getTime()-i.getTime())/1e3/60/60/24).toString(),10);"P"===e.category.type?d[n].data[u]+=e.value:h[n].data[u]+=e.value}else{var c=new Date(e.date).getDay()-1;c<0&&(c=6),"P"===e.category.type?d[n].data[c]+=e.value:h[n].data[c]+=e.value}})),t.chartRefIn&&t.chartRefIn.destroy(),t.chartRefOut&&t.chartRefOut.destroy(),t.chartRefIn=new M.Chart(t.statsInChart.nativeElement,{type:"bar",data:{labels:a,datasets:d},options:{legend:{display:!1},tooltips:{enabled:!1},maintainAspectRatio:!1,responsive:!0,scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0,ticks:{display:!0,fontSize:9,callback:function(t,e,l){return t+" \u20ac "}}}]},onClick:function(e){t.showChartCategsDetail(e,t.chartRefIn)}}}),t.chartRefOut=new M.Chart(t.statsOutChart.nativeElement,{type:"bar",data:{labels:a,datasets:h},options:{legend:{display:!1},tooltips:{enabled:!1},maintainAspectRatio:!1,responsive:!0,scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0,ticks:{display:!0,fontSize:9,callback:function(t,e,l){return t+" \u20ac "}}}]},onClick:function(e){t.showChartCategsDetail(e,t.chartRefOut)}}}),t.chartCategsDetailTIn=Object.assign([],d),t.chartCategsDetailTOut=Object.assign([],h),t.chartCategsDetailTIn.forEach((function(e){e.description=e.label,e.index=-1,e.value=e.data.reduce((function(t,e){return t+e}),0),e.perc=e.value/t.totalIn*100})),t.chartCategsDetailTOut.forEach((function(e){e.description=e.label,e.index=-1,e.value=e.data.reduce((function(t,e){return t+e}),0),e.perc=e.value/t.totalOut*100})),t.chartCategsDetailTIn.sort((function(t,e){return t.value>e.value?-1:1})),t.chartCategsDetailTOut.sort((function(t,e){return t.value>e.value?-1:1})),t.setChartCategsTotalDetail(),e&&e.target.complete()}))}},{key:"dateFilterChanged",value:function(t){this.chartFilterModel.fromDate=t.start.toISOString(),this.chartFilterModel.toDate=t.end.toISOString(),this.chartFilterModel.dateRange=t.range,this.chartFilterModel.offset=t.offset,this.refreshChart()}},{key:"segmentChanged",value:function(t){t.detail&&t.detail.value&&(this.currentChart=t.detail.value,"in"===t.detail.value?this.chartSlider.slideNext():this.chartSlider.slidePrev(),this.setChartCategsTotalDetail())}},{key:"showChartCategsDetail",value:function(t,e){var l=this;this.chartCategsDetail=[];var n=e.getElementsAtXAxis(t);if(n.length>0){var a=n[0]._index,o=0;e.config.data.datasets.forEach((function(t){o+=parseFloat(t.data[a])})),e.config.data.datasets.forEach((function(t){parseInt(t.data[a],10)>0&&l.chartCategsDetail.push({color:t.color,icon:t.icon,description:t.label,id_category:t.id_category,index:a,value:parseFloat(t.data[a]),perc:parseFloat(t.data[a])/o*100})})),this.chartSelectedEl=e.config.data.labels[a],this.chartCategsDetail.sort((function(t,e){return t.value>e.value?-1:1})),this.scrollToBottom(e)}else this.setChartCategsTotalDetail()}},{key:"scrollToBottom",value:function(t){return C.a(this,void 0,void 0,regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{this.mainContent.scrollToPoint(0,t.height,1500)}catch(l){}case 1:case"end":return e.stop()}}),e,this)})))}},{key:"showCatMoviments",value:function(t){var e=0,l="YEAR",n=null,a=null;if(-1===t.index)l=this.chartFilterModel.dateRange,e=this.chartFilterModel.offset,"PERIOD"===this.chartFilterModel.dateRange&&(n=this.chartFilterModel.fromDate,a=this.chartFilterModel.toDate);else if("YEAR"===this.chartFilterModel.dateRange){var o=new Date(this.chartFilterModel.fromDate).getFullYear(),r=(new Date).getFullYear(),i=(new Date).getMonth();e=12*(o-r),e+=t.index-i,l="MONTH"}else{var u=new Date,c=new Date(this.chartFilterModel.fromDate),s=null;if("MONTH"===this.chartFilterModel.dateRange)s=new Date(c.getFullYear(),c.getMonth(),t.index+1);else if("WEEK"===this.chartFilterModel.dateRange||"PERIOD"===this.chartFilterModel.dateRange){var h=new Date(c.getFullYear(),c.getMonth(),c.getDate());s=new Date(h.getTime()+864e5*t.index)}else s=new Date(c.getFullYear(),c.getMonth(),c.getDate());var d=s.getTime()-u.getTime();e=parseInt((d/1e3/60/60/24).toString(),10),l="TODAY"}this.router.navigate(["/t/list-moviments",{category:t.id_category,filterDateType:l,filterDateOffset:e,filterDateStartCustDate:n,filterDateEndCustDate:a}])}},{key:"setChartCategsTotalDetail",value:function(){"in"===this.currentChart?(this.chartSelectedEl="Entrate",this.chartCategsDetail=this.chartCategsDetailTIn):(this.chartSelectedEl="Uscite",this.chartCategsDetail=this.chartCategsDetailTOut)}}]),t}(),k=l("iInd"),x=n.nb({encapsulation:0,styles:[["ion-content[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:translucent}ion-slides[_ngcontent-%COMP%]{height:100%}ion-slides[_ngcontent-%COMP%]   ion-slide[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]{width:100%;height:100%;overflow-x:auto;overflow-y:hidden;background-color:#fff}ion-slides[_ngcontent-%COMP%]   ion-slide[_ngcontent-%COMP%]   .chart[_ngcontent-%COMP%]{width:200%;height:100%}.perc-bar-content[_ngcontent-%COMP%]{position:relative;width:100%;height:5px;border-radius:3px;background-color:var(--ion-color-light)}.perc-bar-content[_ngcontent-%COMP%]   .perc-bar[_ngcontent-%COMP%]{position:absolute;left:0;height:5px;border-radius:3px}.perc-bar-content[_ngcontent-%COMP%]   .perc[_ngcontent-%COMP%]{position:absolute;width:40px;height:20px;background-color:#fff;font-size:9px;font-weight:700;line-height:20px;text-align:right;right:0;top:-20px;color:var(--ion-color-medium)}"]],data:{}});function w(t){return n.Kb(0,[(t()(),n.pb(0,0,null,null,5,"div",[],null,null,null,null,null)),(t()(),n.pb(1,0,null,null,2,"h5",[["class","ion-text-center"]],null,null,null,null,null)),(t()(),n.pb(2,0,null,null,1,"strong",[],null,null,null,null,null)),(t()(),n.Ib(3,null,["",""])),(t()(),n.pb(4,0,null,null,1,"fb-categs-card-list",[],null,[[null,"itemClicked"]],(function(t,e,l){var n=!0;return"itemClicked"===e&&(n=!1!==t.component.showCatMoviments(l)&&n),n}),c.c,c.b)),n.ob(5,49152,null,0,h.a,[],{categories:[0,"categories"]},{itemClicked:"itemClicked"})],(function(t,e){t(e,5,0,e.component.chartCategsDetail)}),(function(t,e){t(e,3,0,e.component.chartSelectedEl)}))}function F(t){return n.Kb(0,[n.Cb(0,d.e,[n.s]),n.Gb(671088640,1,{statsOutChart:0}),n.Gb(671088640,2,{statsInChart:0}),n.Gb(671088640,3,{chartSlider:0}),n.Gb(671088640,4,{mainContent:0}),(t()(),n.pb(5,0,null,null,9,"div",[],null,null,null,null,null)),(t()(),n.pb(6,0,null,null,6,"ion-list",[["mode","ios"]],null,null,null,g.sb,g.w)),n.ob(7,49152,null,0,b.O,[n.h,n.k,n.x],{mode:[0,"mode"]},null),(t()(),n.pb(8,0,null,0,4,"ion-list-header",[],null,null,null,g.rb,g.x)),n.ob(9,49152,null,0,b.P,[n.h,n.k,n.x],null,null),(t()(),n.pb(10,0,null,0,2,"ion-label",[["class","ion-no-margin"]],null,null,null,g.qb,g.v)),n.ob(11,49152,null,0,b.N,[n.h,n.k,n.x],null,null),(t()(),n.Ib(-1,0,["Statistiche"])),(t()(),n.pb(13,0,null,null,1,"fb-date-filter-toolbar",[],null,[[null,"changed"]],(function(t,e,l){var n=!0;return"changed"===e&&(n=!1!==t.component.dateFilterChanged(l)&&n),n}),p.b,p.a)),n.ob(14,114688,null,0,f.a,[b.Jb,n.h,n.x],null,{changed:"changed"}),(t()(),n.pb(15,0,null,null,24,"div",[["style","margin: 5px; margin-top: -5px;"]],null,null,null,null,null)),(t()(),n.pb(16,0,null,null,23,"ion-segment",[["color","medium"],["mode","ios"],["value","out"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(t,e,l){var a=!0,o=t.component;return"ionBlur"===e&&(a=!1!==n.Bb(t,19)._handleBlurEvent(l.target)&&a),"ionChange"===e&&(a=!1!==n.Bb(t,19)._handleChangeEvent(l.target)&&a),"ionChange"===e&&(a=!1!==o.segmentChanged(l)&&a),a}),g.Bb,g.F)),n.Fb(5120,null,v.d,(function(t){return[t]}),[b.Lb]),n.ob(18,49152,null,0,b.ib,[n.h,n.k,n.x],{color:[0,"color"],mode:[1,"mode"],value:[2,"value"]},null),n.ob(19,16384,null,0,b.Lb,[n.k],null,null),(t()(),n.pb(20,0,null,0,9,"ion-segment-button",[["layout","icon-start"],["value","out"]],null,null,null,g.Ab,g.G)),n.ob(21,49152,null,0,b.jb,[n.h,n.k,n.x],{layout:[0,"layout"],value:[1,"value"]},null),(t()(),n.pb(22,0,null,0,1,"ion-icon",[["color","danger"],["name","arrow-down"]],null,null,null,g.kb,g.p)),n.ob(23,49152,null,0,b.C,[n.h,n.k,n.x],{color:[0,"color"],name:[1,"name"]},null),(t()(),n.pb(24,0,null,0,5,"ion-label",[["color","danger"]],null,null,null,g.qb,g.v)),n.ob(25,49152,null,0,b.N,[n.h,n.k,n.x],{color:[0,"color"]},null),(t()(),n.Ib(-1,0,[" Uscite "])),(t()(),n.pb(27,0,null,0,0,"br",[],null,null,null,null,null)),(t()(),n.Ib(28,0,[" "," \u20ac "])),n.Eb(29,2),(t()(),n.pb(30,0,null,0,9,"ion-segment-button",[["layout","icon-start"],["value","in"]],null,null,null,g.Ab,g.G)),n.ob(31,49152,null,0,b.jb,[n.h,n.k,n.x],{layout:[0,"layout"],value:[1,"value"]},null),(t()(),n.pb(32,0,null,0,1,"ion-icon",[["color","success"],["name","arrow-up"]],null,null,null,g.kb,g.p)),n.ob(33,49152,null,0,b.C,[n.h,n.k,n.x],{color:[0,"color"],name:[1,"name"]},null),(t()(),n.pb(34,0,null,0,5,"ion-label",[["color","success"]],null,null,null,g.qb,g.v)),n.ob(35,49152,null,0,b.N,[n.h,n.k,n.x],{color:[0,"color"]},null),(t()(),n.Ib(-1,0,[" Entrate "])),(t()(),n.pb(37,0,null,0,0,"br",[],null,null,null,null,null)),(t()(),n.Ib(38,0,[" "," \u20ac "])),n.Eb(39,2),(t()(),n.pb(40,0,null,null,15,"ion-content",[["color","light"]],null,null,null,g.eb,g.j)),n.ob(41,49152,[[4,4],["mainContent",4]],0,b.u,[n.h,n.k,n.x],{color:[0,"color"],scrollEvents:[1,"scrollEvents"]},null),(t()(),n.pb(42,0,null,0,11,"ion-slides",[["pager","false"]],null,null,null,g.Gb,g.L)),n.ob(43,49152,[[3,4],["chartSlider",4]],0,b.ob,[n.h,n.k,n.x],{options:[0,"options"],pager:[1,"pager"]},null),(t()(),n.pb(44,0,null,0,4,"ion-slide",[],null,null,null,g.Fb,g.K)),n.ob(45,49152,null,0,b.nb,[n.h,n.k,n.x],null,null),(t()(),n.pb(46,0,null,0,2,"div",[["class","chart-container"]],null,null,null,null,null)),(t()(),n.pb(47,0,null,null,1,"div",[["class","chart"]],null,null,null,null,null)),(t()(),n.pb(48,0,[[1,0],["statsOutChart",1]],null,0,"canvas",[],null,null,null,null,null)),(t()(),n.pb(49,0,null,0,4,"ion-slide",[],null,null,null,g.Fb,g.K)),n.ob(50,49152,null,0,b.nb,[n.h,n.k,n.x],null,null),(t()(),n.pb(51,0,null,0,2,"div",[["class","chart-container"]],null,null,null,null,null)),(t()(),n.pb(52,0,null,null,1,"div",[["class","chart"]],null,null,null,null,null)),(t()(),n.pb(53,0,[[2,0],["statsInChart",1]],null,0,"canvas",[],null,null,null,null,null)),(t()(),n.eb(16777216,null,0,1,null,w)),n.ob(55,16384,null,0,d.k,[n.M,n.J],{ngIf:[0,"ngIf"]},null)],(function(t,e){var l=e.component;t(e,7,0,"ios"),t(e,14,0),t(e,18,0,"medium","ios","out"),t(e,21,0,"icon-start","out"),t(e,23,0,"danger","arrow-down"),t(e,25,0,"danger"),t(e,31,0,"icon-start","in"),t(e,33,0,"success","arrow-up"),t(e,35,0,"success"),t(e,41,0,"light",!0),t(e,43,0,l.chartSliderOpts,"false"),t(e,55,0,l.chartCategsDetail.length>0)}),(function(t,e){var l=e.component,a=n.Jb(e,28,0,t(e,29,0,n.Bb(e,0),l.totalOut,"1.2-2"));t(e,28,0,a);var o=n.Jb(e,38,0,t(e,39,0,n.Bb(e,0),l.totalIn,"1.2-2"));t(e,38,0,o)}))}var T=n.lb("app-stats",O,(function(t){return n.Kb(0,[(t()(),n.pb(0,0,null,null,1,"app-stats",[],null,null,null,F,x)),n.ob(1,49152,null,0,O,[m.a,y.a,k.m],null,null)],null,null)}),{},{},[]),I=l("eVLi");l.d(e,"StatsPageModuleNgFactory",(function(){return E}));var E=n.mb(a,[],(function(t){return n.yb([n.zb(512,n.j,n.X,[[8,[o.a,r.a,i.a,u.a,c.a,s.a,T]],[3,n.j],n.v]),n.zb(4608,d.m,d.l,[n.s,[2,d.x]]),n.zb(4608,b.c,b.c,[n.x,n.g]),n.zb(4608,b.Eb,b.Eb,[b.c,n.j,n.p]),n.zb(4608,b.Jb,b.Jb,[b.c,n.j,n.p]),n.zb(4608,v.l,v.l,[]),n.zb(1073742336,d.b,d.b,[]),n.zb(1073742336,b.Bb,b.Bb,[]),n.zb(1073742336,v.k,v.k,[]),n.zb(1073742336,v.b,v.b,[]),n.zb(1073742336,k.o,k.o,[[2,k.t],[2,k.m]]),n.zb(1073742336,I.a,I.a,[]),n.zb(1073742336,a,a,[]),n.zb(1024,k.k,(function(){return[[{path:"",component:O}]]}),[])])}))}}]);
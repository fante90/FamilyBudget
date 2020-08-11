function _defineProperties(l,n){for(var t=0;t<n.length;t++){var e=n[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(l,e.key,e)}}function _createClass(l,n,t){return n&&_defineProperties(l.prototype,n),t&&_defineProperties(l,t),l}function _classCallCheck(l,n){if(!(l instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{p9XQ:function(l,n,t){"use strict";t.r(n);var e=t("8Y7J"),a=function l(){_classCallCheck(this,l)},u=t("pMnS"),o=t("UMKc"),i=t("MKJQ"),r=t("sZkV"),c=t("SVse"),s=t("hrZj"),b=t("aILq"),h=t("s7LF"),d=t("mrSG"),p=t("qyxE"),g=t("bBk2"),f=t("A1CT"),v=t("MO+k"),m=function(){function l(n,t,e){_classCallCheck(this,l),this.appDBService=n,this.utilityService=t,this.router=e,this.chartFilterModel={fromDate:null,toDate:null,dateRange:"YEAR"},this.chartCategsDetail=[],this.chartSelectedEl="",this.chartRefOut=null,this.chartRefIn=null,this.chartSliderOpts={initialSlide:0,speed:400,allowTouchMove:!1},this.totalOut=0,this.totalIn=0}return _createClass(l,[{key:"refreshChart",value:function(){var l=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t={entity:p.a.entityName,date:{$gte:this.utilityService.dateToISO(this.chartFilterModel.fromDate),$lte:this.utilityService.dateToISO(this.chartFilterModel.toDate)}};p.a.getEntries(this.appDBService,!1,null,t).then((function(t){var e=t;l.totalOut=0,l.totalIn=0;var a=[];if("YEAR"===l.chartFilterModel.dateRange)a=["Ge","Fe","Ma","Ap","Ma","Gi","Lu","Ag","Se","Ot","No","Di"];else if("MONTH"===l.chartFilterModel.dateRange)for(var u=0;u<new Date(l.chartFilterModel.toDate).getDate();u++)a.push(""+(u+1));else a=["Lu","Ma","Me","Gi","Ve","Sa","Do"];var o=[],i=[],r=[],c=[];e.forEach((function(n){if(c.indexOf(n.id_category)<0&&r.indexOf(n.id_category)<0){var t={id_category:n.category._id,label:n.category.description,color:n.category.color,icon:n.category.icon,backgroundColor:l.utilityService.hexToRgbA(n.category.color,.5),borderColor:n.category.color,borderWidth:1,data:[]};a.forEach((function(){t.data.push(0)})),"P"===n.category.type?(i.push(t),c.push(n.id_category)):(o.push(t),r.push(n.id_category))}var e=0;if("P"===n.category.type?(e=c.indexOf(n.id_category),l.totalIn+=n.value):(e=r.indexOf(n.id_category),l.totalOut+=-1*n.value),"YEAR"===l.chartFilterModel.dateRange){var u=new Date(n.date).getMonth();"P"===n.category.type?i[e].data[u]+=n.value:o[e].data[u]+=n.value}else if("MONTH"===l.chartFilterModel.dateRange){var s=new Date(n.date).getDate();"P"===n.category.type?i[e].data[s-1]+=n.value:o[e].data[s-1]+=n.value}else{var b=new Date(n.date).getDay()-1;b<0&&(b=6),"P"===n.category.type?i[e].data[b]+=n.value:o[e].data[b]+=n.value}})),l.chartRefIn&&l.chartRefIn.destroy(),l.chartRefOut&&l.chartRefOut.destroy(),l.chartRefIn=new v.Chart(l.statsInChart.nativeElement,{type:"bar",data:{labels:a,datasets:i},options:{legend:{display:!1},tooltips:{enabled:!1},maintainAspectRatio:!1,responsive:!0,scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0,ticks:{display:!0,fontSize:9,callback:function(l,n,t){return l+" \u20ac "}}}]},onClick:function(n){l.showChartCategsDetail(n,l.chartRefIn)}}}),l.chartRefOut=new v.Chart(l.statsOutChart.nativeElement,{type:"bar",data:{labels:a,datasets:o},options:{legend:{display:!1},tooltips:{enabled:!1},maintainAspectRatio:!1,responsive:!0,scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0,ticks:{display:!0,fontSize:9,callback:function(l,n,t){return l+" \u20ac "}}}]},onClick:function(n){l.showChartCategsDetail(n,l.chartRefOut)}}}),n&&n.target.complete()}))}},{key:"dateFilterChanged",value:function(l){this.chartFilterModel.fromDate=l.start.toISOString(),this.chartFilterModel.toDate=l.end.toISOString(),this.chartFilterModel.dateRange=l.range,this.refreshChart()}},{key:"segmentChanged",value:function(l){l.detail&&l.detail.value&&(this.chartCategsDetail=[],"in"===l.detail.value?this.chartSlider.slideNext():this.chartSlider.slidePrev())}},{key:"showChartCategsDetail",value:function(l,n){var t=this;this.chartCategsDetail=[];var e=n.getElementsAtXAxis(l);if(e.length>0){var a=e[0]._index,u=0;n.config.data.datasets.forEach((function(l){u+=parseFloat(l.data[a])})),n.config.data.datasets.forEach((function(l){parseInt(l.data[a],10)>0&&t.chartCategsDetail.push({color:l.color,icon:l.icon,description:l.label,id_category:l.id_category,index:a,value:parseFloat(l.data[a]),perc:parseFloat(l.data[a])/u*100})})),this.chartSelectedEl=n.config.data.labels[a],this.chartCategsDetail.sort((function(l,n){return l.value>n.value?-1:1})),this.scrollToBottom(n)}}},{key:"scrollToBottom",value:function(l){return d.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:try{this.mainContent.scrollToPoint(0,l.height,1500)}catch(t){}case 1:case"end":return n.stop()}}),n,this)})))}},{key:"showCatMoviments",value:function(l,n){var t=0,e="YEAR";if("YEAR"===this.chartFilterModel.dateRange)t=12*(new Date(this.chartFilterModel.fromDate).getFullYear()-(new Date).getFullYear()),t+=n-(new Date).getMonth(),e="MONTH";else{var a=new Date,u=new Date(this.chartFilterModel.fromDate),o=null;if("MONTH"===this.chartFilterModel.dateRange)o=new Date(u.getFullYear(),u.getMonth(),n+1);else if("WEEK"===this.chartFilterModel.dateRange){var i=new Date(u.getFullYear(),u.getMonth(),u.getDate());o=new Date(i.getTime()+864e5*n)}else o=new Date(u.getFullYear(),u.getMonth(),u.getDate());var r=o.getTime()-a.getTime();t=parseInt((r/1e3/60/60/24).toString(),10),e="TODAY"}this.router.navigate(["/t/list-moviments",{category:l,filterDateType:e,filterDateOffset:t}])}}]),l}(),y=t("iInd"),C=e.nb({encapsulation:0,styles:[["ion-content[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:translucent}ion-slides[_ngcontent-%COMP%]{height:100%}ion-slides[_ngcontent-%COMP%]   ion-slide[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%]{width:100%;height:100%;overflow-x:auto;overflow-y:hidden;background-color:#fff}ion-slides[_ngcontent-%COMP%]   ion-slide[_ngcontent-%COMP%]   .chart[_ngcontent-%COMP%]{width:200%;height:100%}.perc-bar-content[_ngcontent-%COMP%]{position:relative;width:100%;height:5px;border-radius:3px;background-color:var(--ion-color-light)}.perc-bar-content[_ngcontent-%COMP%]   .perc-bar[_ngcontent-%COMP%]{position:absolute;left:0;height:5px;border-radius:3px}.perc-bar-content[_ngcontent-%COMP%]   .perc[_ngcontent-%COMP%]{position:absolute;width:40px;height:20px;background-color:#fff;font-size:9px;font-weight:700;line-height:20px;text-align:right;right:0;top:-20px;color:var(--ion-color-medium)}"]],data:{}});function x(l){return e.Kb(0,[(l()(),e.pb(0,0,null,null,26,"ion-item",[["lines","full"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.showCatMoviments(l.context.$implicit.id_category,l.context.$implicit.index)&&e),e}),i.qb,i.s)),e.ob(1,49152,null,0,r.H,[e.h,e.k,e.x],{lines:[0,"lines"]},null),(l()(),e.pb(2,0,null,0,5,"div",[["class","round-icon"],["slot","start"]],null,null,null,null,null)),e.Fb(512,null,c.u,c.v,[e.k,e.r,e.B]),e.ob(4,278528,null,0,c.n,[c.u],{ngStyle:[0,"ngStyle"]},null),e.Db(5,{"background-color":0}),(l()(),e.pb(6,0,null,null,1,"ion-icon",[],null,null,null,i.lb,i.q)),e.ob(7,49152,null,0,r.C,[e.h,e.k,e.x],{name:[0,"name"]},null),(l()(),e.pb(8,0,null,0,18,"ion-label",[],null,null,null,i.rb,i.w)),e.ob(9,49152,null,0,r.N,[e.h,e.k,e.x],null,null),(l()(),e.pb(10,0,null,0,3,"strong",[],null,null,null,null,null)),(l()(),e.pb(11,0,null,null,2,"small",[],null,null,null,null,null)),(l()(),e.Ib(12,null,["",""])),e.Eb(13,1),(l()(),e.pb(14,0,null,0,7,"div",[["class","perc-bar-content"]],null,null,null,null,null)),(l()(),e.pb(15,0,null,null,3,"div",[["class","perc-bar"]],null,null,null,null,null)),e.Fb(512,null,c.u,c.v,[e.k,e.r,e.B]),e.ob(17,278528,null,0,c.n,[c.u],{ngStyle:[0,"ngStyle"]},null),e.Db(18,{"background-color":0,width:1}),(l()(),e.pb(19,0,null,null,2,"div",[["class","perc"]],null,null,null,null,null)),(l()(),e.Ib(20,null,[""," %"])),e.Eb(21,2),(l()(),e.pb(22,0,null,0,4,"div",[["class","ion-text-end"]],null,null,null,null,null)),(l()(),e.pb(23,0,null,null,3,"strong",[],null,null,null,null,null)),(l()(),e.pb(24,0,null,null,2,"small",[],null,null,null,null,null)),(l()(),e.Ib(25,null,[""," \u20ac"])),e.Eb(26,2)],(function(l,n){l(n,1,0,"full");var t=l(n,5,0,n.context.$implicit.color);l(n,4,0,t),l(n,7,0,e.tb(1,"",n.context.$implicit.icon,""));var a=l(n,18,0,n.context.$implicit.color,n.context.$implicit.perc+"%");l(n,17,0,a)}),(function(l,n){var t=e.Jb(n,12,0,l(n,13,0,e.Bb(n.parent.parent,1),n.context.$implicit.description));l(n,12,0,t);var a=e.Jb(n,20,0,l(n,21,0,e.Bb(n.parent.parent,0),n.context.$implicit.perc,"1.1-1"));l(n,20,0,a);var u=e.Jb(n,25,0,l(n,26,0,e.Bb(n.parent.parent,0),n.context.$implicit.value,"1.2"));l(n,25,0,u)}))}function k(l){return e.Kb(0,[(l()(),e.pb(0,0,null,null,9,"div",[],null,null,null,null,null)),(l()(),e.pb(1,0,null,null,2,"h5",[["class","ion-text-center"]],null,null,null,null,null)),(l()(),e.pb(2,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e.Ib(3,null,["",""])),(l()(),e.pb(4,0,null,null,5,"ion-card",[],null,null,null,i.cb,i.d)),e.ob(5,49152,null,0,r.m,[e.h,e.k,e.x],null,null),(l()(),e.pb(6,0,null,0,3,"ion-card-content",[["class","ion-no-margin ion-no-padding"]],null,null,null,i.Y,i.e)),e.ob(7,49152,null,0,r.n,[e.h,e.k,e.x],null,null),(l()(),e.eb(16777216,null,0,1,null,x)),e.ob(9,278528,null,0,c.j,[e.M,e.J,e.q],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,9,0,n.component.chartCategsDetail)}),(function(l,n){l(n,3,0,n.component.chartSelectedEl)}))}function M(l){return e.Kb(0,[e.Cb(0,c.e,[e.s]),e.Cb(0,c.q,[]),e.Gb(671088640,1,{statsOutChart:0}),e.Gb(671088640,2,{statsInChart:0}),e.Gb(671088640,3,{chartSlider:0}),e.Gb(671088640,4,{mainContent:0}),(l()(),e.pb(6,0,null,null,9,"div",[],null,null,null,null,null)),(l()(),e.pb(7,0,null,null,6,"ion-list",[["mode","ios"]],null,null,null,i.tb,i.x)),e.ob(8,49152,null,0,r.O,[e.h,e.k,e.x],{mode:[0,"mode"]},null),(l()(),e.pb(9,0,null,0,4,"ion-list-header",[],null,null,null,i.sb,i.y)),e.ob(10,49152,null,0,r.P,[e.h,e.k,e.x],null,null),(l()(),e.pb(11,0,null,0,2,"ion-label",[["class","ion-no-margin"]],null,null,null,i.rb,i.w)),e.ob(12,49152,null,0,r.N,[e.h,e.k,e.x],null,null),(l()(),e.Ib(-1,0,["Statistiche"])),(l()(),e.pb(14,0,null,null,1,"app-fb-date-filter-toolbar",[],null,[[null,"changed"]],(function(l,n,t){var e=!0;return"changed"===n&&(e=!1!==l.component.dateFilterChanged(t)&&e),e}),s.b,s.a)),e.ob(15,114688,null,0,b.a,[r.Jb,e.h,e.x],null,{changed:"changed"}),(l()(),e.pb(16,0,null,null,24,"div",[["style","margin: 5px; margin-top: -5px;"]],null,null,null,null,null)),(l()(),e.pb(17,0,null,null,23,"ion-segment",[["color","medium"],["mode","ios"],["value","out"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,t){var a=!0,u=l.component;return"ionBlur"===n&&(a=!1!==e.Bb(l,20)._handleBlurEvent(t.target)&&a),"ionChange"===n&&(a=!1!==e.Bb(l,20)._handleChangeEvent(t.target)&&a),"ionChange"===n&&(a=!1!==u.segmentChanged(t)&&a),a}),i.Cb,i.G)),e.Fb(5120,null,h.d,(function(l){return[l]}),[r.Lb]),e.ob(19,49152,null,0,r.ib,[e.h,e.k,e.x],{color:[0,"color"],mode:[1,"mode"],value:[2,"value"]},null),e.ob(20,16384,null,0,r.Lb,[e.k],null,null),(l()(),e.pb(21,0,null,0,9,"ion-segment-button",[["layout","icon-start"],["value","out"]],null,null,null,i.Bb,i.H)),e.ob(22,49152,null,0,r.jb,[e.h,e.k,e.x],{layout:[0,"layout"],value:[1,"value"]},null),(l()(),e.pb(23,0,null,0,1,"ion-icon",[["color","danger"],["name","arrow-down"]],null,null,null,i.lb,i.q)),e.ob(24,49152,null,0,r.C,[e.h,e.k,e.x],{color:[0,"color"],name:[1,"name"]},null),(l()(),e.pb(25,0,null,0,5,"ion-label",[["color","danger"]],null,null,null,i.rb,i.w)),e.ob(26,49152,null,0,r.N,[e.h,e.k,e.x],{color:[0,"color"]},null),(l()(),e.Ib(-1,0,[" Uscite "])),(l()(),e.pb(28,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.Ib(29,0,[" "," \u20ac "])),e.Eb(30,2),(l()(),e.pb(31,0,null,0,9,"ion-segment-button",[["layout","icon-start"],["value","in"]],null,null,null,i.Bb,i.H)),e.ob(32,49152,null,0,r.jb,[e.h,e.k,e.x],{layout:[0,"layout"],value:[1,"value"]},null),(l()(),e.pb(33,0,null,0,1,"ion-icon",[["color","success"],["name","arrow-up"]],null,null,null,i.lb,i.q)),e.ob(34,49152,null,0,r.C,[e.h,e.k,e.x],{color:[0,"color"],name:[1,"name"]},null),(l()(),e.pb(35,0,null,0,5,"ion-label",[["color","success"]],null,null,null,i.rb,i.w)),e.ob(36,49152,null,0,r.N,[e.h,e.k,e.x],{color:[0,"color"]},null),(l()(),e.Ib(-1,0,[" Entrate "])),(l()(),e.pb(38,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.Ib(39,0,[" "," \u20ac "])),e.Eb(40,2),(l()(),e.pb(41,0,null,null,15,"ion-content",[["color","light"]],null,null,null,i.eb,i.j)),e.ob(42,49152,[[4,4],["mainContent",4]],0,r.u,[e.h,e.k,e.x],{color:[0,"color"],scrollEvents:[1,"scrollEvents"]},null),(l()(),e.pb(43,0,null,0,11,"ion-slides",[["pager","false"]],null,null,null,i.Gb,i.L)),e.ob(44,49152,[[3,4],["chartSlider",4]],0,r.ob,[e.h,e.k,e.x],{options:[0,"options"],pager:[1,"pager"]},null),(l()(),e.pb(45,0,null,0,4,"ion-slide",[],null,null,null,i.Fb,i.K)),e.ob(46,49152,null,0,r.nb,[e.h,e.k,e.x],null,null),(l()(),e.pb(47,0,null,0,2,"div",[["class","chart-container"]],null,null,null,null,null)),(l()(),e.pb(48,0,null,null,1,"div",[["class","chart"]],null,null,null,null,null)),(l()(),e.pb(49,0,[[1,0],["statsOutChart",1]],null,0,"canvas",[],null,null,null,null,null)),(l()(),e.pb(50,0,null,0,4,"ion-slide",[],null,null,null,i.Fb,i.K)),e.ob(51,49152,null,0,r.nb,[e.h,e.k,e.x],null,null),(l()(),e.pb(52,0,null,0,2,"div",[["class","chart-container"]],null,null,null,null,null)),(l()(),e.pb(53,0,null,null,1,"div",[["class","chart"]],null,null,null,null,null)),(l()(),e.pb(54,0,[[2,0],["statsInChart",1]],null,0,"canvas",[],null,null,null,null,null)),(l()(),e.eb(16777216,null,0,1,null,k)),e.ob(56,16384,null,0,c.k,[e.M,e.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){var t=n.component;l(n,8,0,"ios"),l(n,15,0),l(n,19,0,"medium","ios","out"),l(n,22,0,"icon-start","out"),l(n,24,0,"danger","arrow-down"),l(n,26,0,"danger"),l(n,32,0,"icon-start","in"),l(n,34,0,"success","arrow-up"),l(n,36,0,"success"),l(n,42,0,"light",!0),l(n,44,0,t.chartSliderOpts,"false"),l(n,56,0,t.chartCategsDetail.length>0)}),(function(l,n){var t=n.component,a=e.Jb(n,29,0,l(n,30,0,e.Bb(n,0),t.totalOut,"1.2-2"));l(n,29,0,a);var u=e.Jb(n,39,0,l(n,40,0,e.Bb(n,0),t.totalIn,"1.2-2"));l(n,39,0,u)}))}var w=e.lb("app-stats",m,(function(l){return e.Kb(0,[(l()(),e.pb(0,0,null,null,1,"app-stats",[],null,null,null,M,C)),e.ob(1,49152,null,0,m,[g.a,f.a,y.m],null,null)],null,null)}),{},{},[]),O=t("0Rqu");t.d(n,"StatsPageModuleNgFactory",(function(){return D}));var D=e.mb(a,[],(function(l){return e.yb([e.zb(512,e.j,e.X,[[8,[u.a,o.a,w]],[3,e.j],e.v]),e.zb(4608,c.m,c.l,[e.s,[2,c.x]]),e.zb(4608,r.c,r.c,[e.x,e.g]),e.zb(4608,r.Eb,r.Eb,[r.c,e.j,e.p]),e.zb(4608,r.Jb,r.Jb,[r.c,e.j,e.p]),e.zb(4608,h.l,h.l,[]),e.zb(1073742336,c.b,c.b,[]),e.zb(1073742336,r.Bb,r.Bb,[]),e.zb(1073742336,h.k,h.k,[]),e.zb(1073742336,h.b,h.b,[]),e.zb(1073742336,y.o,y.o,[[2,y.t],[2,y.m]]),e.zb(1073742336,O.a,O.a,[]),e.zb(1073742336,a,a,[]),e.zb(1024,y.k,(function(){return[[{path:"",component:m}]]}),[])])}))}}]);
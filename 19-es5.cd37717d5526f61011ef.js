function _defineProperties(l,n){for(var e=0;e<n.length;e++){var t=n[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(l,t.key,t)}}function _createClass(l,n,e){return n&&_defineProperties(l.prototype,n),e&&_defineProperties(l,e),l}function _classCallCheck(l,n){if(!(l instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{Btt2:function(l,n,e){"use strict";e.r(n);var t=e("8Y7J"),u=function l(){_classCallCheck(this,l)},i=e("pMnS"),o=e("MKJQ"),r=e("sZkV"),a=e("SVse"),s=e("mrSG"),c=e("qyxE"),b=e("Witw"),p=e("Hlaf"),h=e("bBk2"),d=function(){function l(n,e){_classCallCheck(this,l),this.appDBService=n,this.uiService=e,this.listDateFilter=null,this.daysDateFilter=7,this.yearlyBalance="",this.setListDateFilter(7)}return _createClass(l,[{key:"ionViewDidEnter",value:function(){this.refreshList(),this.calcYearlyBalance()}},{key:"setListDateFilter",value:function(l){this.daysDateFilter=l;var n=new Date,e=n.getTime(),t=new Date(e-864e5*l);this.listDateFilter={entity:c.a.entityName,date:{$gte:t,$lte:n}}}},{key:"newOperation",value:function(){var l=this;this.uiService.presentActionSheet({header:"Seleziona il tipo di movimento:",buttons:[{text:"Registra entrata",icon:"arrow-down-outline",handler:function(){return s.a(l,void 0,void 0,regeneratorRuntime.mark((function l(){var n=this;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,this.uiService.presentModal(p.a,{mvType:"P"});case 2:l.t0=function(){n.refreshList()},l.sent.onDidDismiss().then(l.t0);case 4:case"end":return l.stop()}}),l,this)})))}},{text:"Registra uscita",icon:"arrow-up-outline",handler:function(){return s.a(l,void 0,void 0,regeneratorRuntime.mark((function l(){var n=this;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,this.uiService.presentModal(p.a,{mvType:"M"});case 2:l.t0=function(){n.refreshList()},l.sent.onDidDismiss().then(l.t0);case 4:case"end":return l.stop()}}),l,this)})))}},{text:"Registra investimento",icon:"cash-outline",handler:function(){return s.a(l,void 0,void 0,regeneratorRuntime.mark((function l(){var n=this;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,this.uiService.presentModal(p.a,{mvType:"I"});case 2:l.t0=function(){n.refreshList()},l.sent.onDidDismiss().then(l.t0);case 4:case"end":return l.stop()}}),l,this)})))}}]})}},{key:"refreshList",value:function(){var l=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;c.a.getEntries(this.appDBService,!0,null,this.listDateFilter).then((function(e){l.moviments=e,n&&n.target.complete()}))}},{key:"calcYearlyBalance",value:function(){var l=this;this.yearlyBalance="";var n={entity:c.a.entityName,date:{$gte:new Date((new Date).getFullYear(),0,1,0,0),$lte:new Date}};c.a.getEntries(this.appDBService,!1,null,n).then((function(n){var e=0;n.forEach((function(l){e+=l.value*("P"===l.type?1:-1)})),l.yearlyBalance=(e>=0?"+":"-")+e.toFixed(2)}))}},{key:"getTotal",value:function(){var l=0;return this.moviments&&this.moviments.forEach((function(n){l+=n.value*("P"===n.type?1:-1)})),l}},{key:"openSetListDateFilter",value:function(){var l=this;this.uiService.presentAlert({header:"Seleziona il filtro di data",inputs:[{name:"days",type:"radio",label:"Ultimi 7 giorni",value:7,checked:7===this.daysDateFilter},{name:"days",type:"radio",label:"Ultimi 30 giorni",value:30,checked:30===this.daysDateFilter},{name:"days",type:"radio",label:"Ultimi 90 giorni",value:90,checked:90===this.daysDateFilter}],buttons:[{text:"Annulla",role:"cancel",cssClass:"medium"},{text:"Conferma",handler:function(n){if(!n)return!1;l.setListDateFilter(n),l.refreshList()}}]})}}]),l}(),m=t.nb({encapsulation:0,styles:[[".dashboard-top-card[_ngcontent-%COMP%]{margin-top:30px;overflow:visible;position:relative;background-color:var(--ion-color-primary)}.dashboard-top-card[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{-webkit-transform:translateY(-30%);transform:translateY(-30%);position:relative}"]],data:{}});function f(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"ion-spinner",[["name","dots"]],null,null,null,o.pb,o.D)),t.ob(1,49152,null,0,r.pb,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){l(n,1,0,"dots")}),null)}function v(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),t.Hb(1,null,[""," \u20ac"]))],null,(function(l,n){l(n,1,0,n.component.yearlyBalance)}))}function g(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"ion-icon",[],null,null,null,o.Z,o.n)),t.ob(1,49152,null,0,r.C,[t.h,t.k,t.x],{color:[0,"color"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,t.tb(1,"",null==n.parent.context.$implicit.category?null:n.parent.context.$implicit.category.color,""),t.tb(1,"",null==n.parent.context.$implicit.category?null:n.parent.context.$implicit.category.icon,""))}),null)}function y(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,19,"ion-item",[["mode","ios"]],null,null,null,o.eb,o.p)),t.ob(1,49152,null,0,r.H,[t.h,t.k,t.x],{mode:[0,"mode"]},null),(l()(),t.pb(2,0,null,0,2,"div",[["slot","start"]],[[8,"className",0]],null,null,null,null)),(l()(),t.eb(16777216,null,null,1,null,g)),t.ob(4,16384,null,0,a.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(5,0,null,0,7,"ion-label",[],null,null,null,o.fb,o.t)),t.ob(6,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(l()(),t.pb(7,0,null,0,2,"h3",[],null,null,null,null,null)),(l()(),t.Hb(8,null,["",""])),t.Db(9,2),(l()(),t.pb(10,0,null,0,2,"h5",[["class","ion-text-uppercase"]],null,null,null,null,null)),(l()(),t.pb(11,0,null,null,1,"small",[],null,null,null,null,null)),(l()(),t.Hb(12,null,["",""])),(l()(),t.pb(13,0,null,0,6,"div",[["slot","end"]],null,null,null,null,null)),(l()(),t.pb(14,0,null,null,5,"ion-label",[],null,null,null,o.fb,o.t)),t.ob(15,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(l()(),t.pb(16,0,null,0,3,"p",[],null,null,null,null,null)),(l()(),t.pb(17,0,null,null,2,"strong",[["class","ion-text-right"]],null,null,null,null,null)),(l()(),t.Hb(18,null,[" "," \u20ac "])),t.Db(19,2)],(function(l,n){l(n,1,0,"ios"),l(n,4,0,null==n.context.$implicit.category?null:n.context.$implicit.category.icon)}),(function(l,n){l(n,2,0,t.tb(1,"round-icon ",null==n.context.$implicit.category?null:n.context.$implicit.category.color,"-borders"));var e=t.Ib(n,8,0,l(n,9,0,t.Bb(n.parent,0),n.context.$implicit.date,"dd/MM/yyyy"));l(n,8,0,e),l(n,12,0,null==n.context.$implicit.category?null:n.context.$implicit.category.description);var u=t.Ib(n,18,0,l(n,19,0,t.Bb(n.parent,1),n.context.$implicit.value,"1.2-2"));l(n,18,0,u)}))}function k(l){return t.Jb(0,[t.Cb(0,a.d,[t.s]),t.Cb(0,a.e,[t.s]),(l()(),t.pb(2,0,null,null,14,"div",[["class","ion-padding-horizontal dashboard-top-card"]],null,null,null,null,null)),(l()(),t.pb(3,0,null,null,13,"ion-card",[["color","light ion-no-margin"]],null,null,null,o.S,o.d)),t.ob(4,49152,null,0,r.m,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(5,0,null,0,11,"ion-card-header",[["class","ion-text-center"]],null,null,null,o.P,o.e)),t.ob(6,49152,null,0,r.o,[t.h,t.k,t.x],null,null),(l()(),t.pb(7,0,null,0,3,"ion-card-subtitle",[],null,null,null,o.Q,o.f)),t.ob(8,49152,null,0,r.p,[t.h,t.k,t.x],null,null),(l()(),t.pb(9,0,null,0,1,"strong",[],null,null,null,null,null)),(l()(),t.Hb(-1,null,["BILANCIO ANNUALE"])),(l()(),t.pb(11,0,null,0,5,"ion-card-title",[],null,null,null,o.R,o.g)),t.ob(12,49152,null,0,r.q,[t.h,t.k,t.x],null,null),(l()(),t.eb(16777216,null,0,1,null,f)),t.ob(14,16384,null,0,a.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.eb(16777216,null,0,1,null,v)),t.ob(16,16384,null,0,a.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(17,0,null,null,9,"div",[],null,null,null,null,null)),(l()(),t.pb(18,0,null,null,8,"ion-list",[["lines","full"],["mode","ios"]],null,null,null,o.hb,o.u)),t.ob(19,49152,null,0,r.O,[t.h,t.k,t.x],{lines:[0,"lines"],mode:[1,"mode"]},null),(l()(),t.pb(20,0,null,0,6,"ion-list-header",[["class","ion-padding-bottom"]],null,null,null,o.gb,o.v)),t.ob(21,49152,null,0,r.P,[t.h,t.k,t.x],null,null),(l()(),t.pb(22,0,null,0,2,"ion-label",[["class","ion-no-margin"]],null,null,null,o.fb,o.t)),t.ob(23,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(l()(),t.Hb(-1,0,["Ultimi Movimenti"])),(l()(),t.pb(25,0,null,0,1,"ion-icon",[["class","ion-float-right ion-padding-horizontal"],["color","dark"],["name","options-outline"],["size","large"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.openSetListDateFilter()&&t),t}),o.Z,o.n)),t.ob(26,49152,null,0,r.C,[t.h,t.k,t.x],{color:[0,"color"],name:[1,"name"],size:[2,"size"]},null),(l()(),t.pb(27,0,null,null,9,"ion-content",[],null,null,null,o.T,o.h)),t.ob(28,49152,null,0,r.u,[t.h,t.k,t.x],null,null),(l()(),t.pb(29,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(l,n,e){var t=!0;return"ionRefresh"===n&&(t=!1!==l.component.refreshList(e)&&t),t}),o.mb,o.z)),t.ob(30,49152,null,0,r.ab,[t.h,t.k,t.x],null,null),(l()(),t.pb(31,0,null,0,1,"ion-refresher-content",[],null,null,null,o.lb,o.A)),t.ob(32,49152,null,0,r.bb,[t.h,t.k,t.x],null,null),(l()(),t.pb(33,0,null,0,3,"ion-list",[["lines","full"],["mode","ios"]],null,null,null,o.hb,o.u)),t.ob(34,49152,null,0,r.O,[t.h,t.k,t.x],{lines:[0,"lines"],mode:[1,"mode"]},null),(l()(),t.eb(16777216,null,0,1,null,y)),t.ob(36,278528,null,0,a.j,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t.pb(37,0,null,null,17,"ion-footer",[],null,null,null,o.X,o.l)),t.ob(38,49152,null,0,r.z,[t.h,t.k,t.x],null,null),(l()(),t.pb(39,0,null,0,9,"ion-list",[["class","ion-no-padding"],["lines","none"]],null,null,null,o.hb,o.u)),t.ob(40,49152,null,0,r.O,[t.h,t.k,t.x],{lines:[0,"lines"]},null),(l()(),t.pb(41,0,null,0,7,"ion-item",[["color","light"]],null,null,null,o.eb,o.p)),t.ob(42,49152,null,0,r.H,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(43,0,null,0,5,"ion-label",[],null,null,null,o.fb,o.t)),t.ob(44,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(l()(),t.pb(45,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),t.pb(46,0,null,null,2,"strong",[],null,null,null,null,null)),(l()(),t.Hb(47,null,["TOTALE: "," \u20ac"])),t.Db(48,2),(l()(),t.pb(49,0,null,0,5,"ion-fab",[["horizontal","end"],["slot","fixed"],["vertical","bottom"]],null,null,null,o.W,o.j)),t.ob(50,49152,null,0,r.w,[t.h,t.k,t.x],{horizontal:[0,"horizontal"],vertical:[1,"vertical"]},null),(l()(),t.pb(51,0,null,0,3,"ion-fab-button",[["color","tertiary"],["size","small"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.newOperation()&&t),t}),o.V,o.k)),t.ob(52,49152,null,0,r.x,[t.h,t.k,t.x],{color:[0,"color"],size:[1,"size"]},null),(l()(),t.pb(53,0,null,0,1,"ion-icon",[["name","add"]],null,null,null,o.Z,o.n)),t.ob(54,49152,null,0,r.C,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){var e=n.component;l(n,4,0,"light ion-no-margin"),l(n,14,0,""==e.yearlyBalance),l(n,16,0,""!=e.yearlyBalance),l(n,19,0,"full","ios"),l(n,26,0,"dark","options-outline","large"),l(n,34,0,"full","ios"),l(n,36,0,e.moviments),l(n,40,0,"none"),l(n,42,0,"light"),l(n,50,0,"end","bottom"),l(n,52,0,"tertiary","small"),l(n,54,0,"add")}),(function(l,n){var e=n.component,u=t.Ib(n,47,0,l(n,48,0,t.Bb(n,1),e.getTotal(),"1.2-2"));l(n,47,0,u)}))}var x=t.lb("app-home",d,(function(l){return t.Jb(0,[(l()(),t.pb(0,0,null,null,1,"app-home",[],null,null,null,k,m)),t.ob(1,49152,null,0,d,[h.a,b.a],null,null)],null,null)}),{},{},[]),D=e("s7LF"),w=e("iInd");e.d(n,"HomePageModuleNgFactory",(function(){return z}));var z=t.mb(u,[],(function(l){return t.yb([t.zb(512,t.j,t.X,[[8,[i.a,x]],[3,t.j],t.v]),t.zb(4608,a.m,a.l,[t.s,[2,a.s]]),t.zb(4608,r.c,r.c,[t.x,t.g]),t.zb(4608,r.Db,r.Db,[r.c,t.j,t.p]),t.zb(4608,r.Ib,r.Ib,[r.c,t.j,t.p]),t.zb(4608,D.l,D.l,[]),t.zb(1073742336,a.b,a.b,[]),t.zb(1073742336,r.Bb,r.Bb,[]),t.zb(1073742336,D.k,D.k,[]),t.zb(1073742336,D.b,D.b,[]),t.zb(1073742336,w.o,w.o,[[2,w.t],[2,w.m]]),t.zb(1073742336,u,u,[]),t.zb(1024,w.k,(function(){return[[{path:"",component:d}]]}),[])])}))}}]);
function _defineProperties(n,l){for(var e=0;e<l.length;e++){var t=l[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function _createClass(n,l,e){return l&&_defineProperties(n.prototype,l),e&&_defineProperties(n,e),n}function _classCallCheck(n,l){if(!(n instanceof l))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{s0AX:function(n,l,e){"use strict";e.r(l);var t=e("8Y7J"),i=function n(){_classCallCheck(this,n)},u=e("pMnS"),o=e("MKJQ"),r=e("sZkV"),a=e("SVse"),s=e("mrSG"),c=e("Witw"),b=e("bBk2"),p=e("Hlaf"),m=e("qyxE"),h=e("HIux"),d=e("A1CT"),v=function(){function n(l,e,t){_classCallCheck(this,n),this.uiService=l,this.appDBService=e,this.utilityService=t,this.listFilterModel={fromDate:new Date((new Date).getFullYear(),(new Date).getMonth(),1,0,0,0).toISOString(),toDate:new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate(),23,59,0).toISOString(),type:"*",category:"*"},this.moviments=[]}return _createClass(n,[{key:"newMoviment",value:function(){return s.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var l=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:this.uiService.presentActionSheet({header:"Seleziona il tipo di movimento:",buttons:[{text:"Registra entrata",icon:"arrow-down-outline",handler:function(){return s.a(l,void 0,void 0,regeneratorRuntime.mark((function n(){var l=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.uiService.presentModal(p.a,{mvType:"P"});case 2:n.t0=function(){l.refreshList()},n.sent.onDidDismiss().then(n.t0);case 4:case"end":return n.stop()}}),n,this)})))}},{text:"Registra uscita",icon:"arrow-up-outline",handler:function(){return s.a(l,void 0,void 0,regeneratorRuntime.mark((function n(){var l=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.uiService.presentModal(p.a,{mvType:"M"});case 2:n.t0=function(){l.refreshList()},n.sent.onDidDismiss().then(n.t0);case 4:case"end":return n.stop()}}),n,this)})))}},{text:"Registra investimento",icon:"cash-outline",handler:function(){return s.a(l,void 0,void 0,regeneratorRuntime.mark((function n(){var l=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.uiService.presentModal(p.a,{mvType:"I"});case 2:n.t0=function(){l.refreshList()},n.sent.onDidDismiss().then(n.t0);case 4:case"end":return n.stop()}}),n,this)})))}}]});case 1:case"end":return n.stop()}}),n,this)})))}},{key:"editMoviment",value:function(n){return s.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var e=this;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,this.uiService.presentModal(p.a,{ID:n._id});case 2:l.t0=function(){e.refreshList()},l.sent.onDidDismiss().then(l.t0);case 4:case"end":return l.stop()}}),l,this)})))}},{key:"deleteMoviment",value:function(n){return s.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var e=this;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:this.uiService.presentAlert({header:"Elimina movimento",message:"Sei sicuro di voler eliminare il movimento?",buttons:[{text:"Annulla",role:"cancel",cssClass:"medium"},{text:"Conferma",handler:function(){e.delete(n)}}]});case 1:case"end":return l.stop()}}),l,this)})))}},{key:"delete",value:function(n){return s.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var e,t;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return e=new m.a(this.appDBService),l.next=3,e.findEntry(n._id);case 3:if(t=l.sent,l.t0=t,!l.t0){l.next=9;break}return l.next=8,e.delete();case 8:t=l.sent;case 9:!1===t?this.uiService.presentAlert({header:"ERRORE",message:e.getErrors().join("\n\r"),buttons:[{text:"Chiudi",role:"cancel",cssClass:"primary"}]}):(this.uiService.presentToast({message:"Movimento eliminato correttamente",duration:2e3,color:"success"}),this.refreshList());case 10:case"end":return l.stop()}}),l,this)})))}},{key:"refreshList",value:function(){var n=this,l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e={entity:m.a.entityName,date:{$gte:this.utilityService.dateToISO(this.listFilterModel.fromDate),$lte:this.utilityService.dateToISO(this.listFilterModel.toDate)}};"*"!==this.listFilterModel.type&&(e.type=this.listFilterModel.type),"*"!==this.listFilterModel.category&&(e.id_category=this.listFilterModel.category),m.a.getEntries(this.appDBService,!1,null,e).then((function(e){n.moviments=e,l&&l.target.complete()}))}},{key:"openModalSetFilter",value:function(){return s.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var l=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.uiService.presentModal(h.a,{listFilterModel:this.listFilterModel});case 2:n.t0=function(n){n&&n.data&&(l.listFilterModel=n.data),l.refreshList()},n.sent.onDidDismiss().then(n.t0);case 4:case"end":return n.stop()}}),n,this)})))}},{key:"getTotal",value:function(){var n=0;return this.moviments&&this.moviments.forEach((function(l){n+=l.value*("P"===l.type?1:-1)})),n}},{key:"ionViewDidEnter",value:function(){this.refreshList()}}]),n}(),f=t.nb({encapsulation:0,styles:[["ion-content[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:translucent}"]],data:{}});function g(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,1,"ion-icon",[],null,null,null,o.eb,o.o)),t.ob(1,49152,null,0,r.C,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(n,l){n(l,1,0,t.tb(1,"",null==l.parent.context.$implicit.category?null:l.parent.context.$implicit.category.icon,""))}),null)}function k(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,36,"ion-item-sliding",[["mode","ios"]],null,null,null,o.ib,o.t)),t.ob(1,49152,null,0,r.M,[t.h,t.k,t.x],null,null),(n()(),t.pb(2,0,null,0,24,"ion-item",[],null,null,null,o.jb,o.q)),t.ob(3,49152,null,0,r.H,[t.h,t.k,t.x],null,null),(n()(),t.pb(4,0,null,0,5,"div",[["class","round-icon"],["slot","start"]],null,null,null,null,null)),t.Fb(512,null,a.u,a.v,[t.k,t.r,t.B]),t.ob(6,278528,null,0,a.n,[a.u],{ngStyle:[0,"ngStyle"]},null),t.Db(7,{"background-color":0}),(n()(),t.eb(16777216,null,null,1,null,g)),t.ob(9,16384,null,0,a.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.pb(10,0,null,0,9,"ion-label",[],null,null,null,o.kb,o.u)),t.ob(11,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(n()(),t.pb(12,0,null,0,2,"h3",[],null,null,null,null,null)),(n()(),t.Ib(13,null,["",""])),t.Eb(14,2),(n()(),t.pb(15,0,null,0,2,"h5",[["class","ion-text-uppercase"]],null,null,null,null,null)),(n()(),t.pb(16,0,null,null,1,"small",[],null,null,null,null,null)),(n()(),t.Ib(17,null,["",""])),(n()(),t.pb(18,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),t.Ib(19,null,["",""])),(n()(),t.pb(20,0,null,0,6,"div",[["slot","end"]],null,null,null,null,null)),(n()(),t.pb(21,0,null,null,5,"ion-label",[],null,null,null,o.kb,o.u)),t.ob(22,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(n()(),t.pb(23,0,null,0,3,"p",[],null,null,null,null,null)),(n()(),t.pb(24,0,null,null,2,"strong",[["class","ion-text-right"]],null,null,null,null,null)),(n()(),t.Ib(25,null,[" "," \u20ac "])),t.Eb(26,2),(n()(),t.pb(27,0,null,0,9,"ion-item-options",[["side","end"]],null,null,null,o.hb,o.s)),t.ob(28,49152,null,0,r.L,[t.h,t.k,t.x],{side:[0,"side"]},null),(n()(),t.pb(29,0,null,0,3,"ion-item-option",[["color","secondary"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.editMoviment(n.context.$implicit)&&t),t}),o.gb,o.r)),t.ob(30,49152,null,0,r.K,[t.h,t.k,t.x],{color:[0,"color"]},null),(n()(),t.pb(31,0,null,0,1,"ion-icon",[["name","pencil"]],null,null,null,o.eb,o.o)),t.ob(32,49152,null,0,r.C,[t.h,t.k,t.x],{name:[0,"name"]},null),(n()(),t.pb(33,0,null,0,3,"ion-item-option",[["color","danger"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.deleteMoviment(n.context.$implicit)&&t),t}),o.gb,o.r)),t.ob(34,49152,null,0,r.K,[t.h,t.k,t.x],{color:[0,"color"]},null),(n()(),t.pb(35,0,null,0,1,"ion-icon",[["name","trash-outline"]],null,null,null,o.eb,o.o)),t.ob(36,49152,null,0,r.C,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(n,l){var e=n(l,7,0,l.context.$implicit.category?l.context.$implicit.category.color:"");n(l,6,0,e),n(l,9,0,null==l.context.$implicit.category?null:l.context.$implicit.category.icon),n(l,28,0,"end"),n(l,30,0,"secondary"),n(l,32,0,"pencil"),n(l,34,0,"danger"),n(l,36,0,"trash-outline")}),(function(n,l){var e=t.Jb(l,13,0,n(l,14,0,t.Bb(l.parent,0),l.context.$implicit.date,"dd/MM/yyyy"));n(l,13,0,e),n(l,17,0,null==l.context.$implicit.category?null:l.context.$implicit.category.description),n(l,19,0,l.context.$implicit.note);var i=t.Jb(l,25,0,n(l,26,0,t.Bb(l.parent,1),l.context.$implicit.value,"1.2-2"));n(l,25,0,i)}))}function x(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,5,"ion-item",[["lines","none"]],null,null,null,o.jb,o.q)),t.ob(1,49152,null,0,r.H,[t.h,t.k,t.x],{lines:[0,"lines"]},null),(n()(),t.pb(2,0,null,0,3,"ion-label",[],null,null,null,o.kb,o.u)),t.ob(3,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(n()(),t.pb(4,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),t.Ib(-1,null,["Nessun movimento inserito"]))],(function(n,l){n(l,1,0,"none")}),null)}function y(n){return t.Kb(0,[t.Cb(0,a.d,[t.s]),t.Cb(0,a.e,[t.s]),(n()(),t.pb(2,0,null,null,9,"div",[],null,null,null,null,null)),(n()(),t.pb(3,0,null,null,8,"ion-list",[["mode","ios"]],null,null,null,o.mb,o.v)),t.ob(4,49152,null,0,r.O,[t.h,t.k,t.x],{mode:[0,"mode"]},null),(n()(),t.pb(5,0,null,0,6,"ion-list-header",[["class","ion-padding-bottom"]],null,null,null,o.lb,o.w)),t.ob(6,49152,null,0,r.P,[t.h,t.k,t.x],null,null),(n()(),t.pb(7,0,null,0,2,"ion-label",[["class","ion-no-margin"]],null,null,null,o.kb,o.u)),t.ob(8,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(n()(),t.Ib(-1,0,["Movimenti"])),(n()(),t.pb(10,0,null,0,1,"ion-icon",[["class","ion-float-right ion-padding-horizontal"],["color","dark"],["name","options-outline"],["size","large"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.openModalSetFilter()&&t),t}),o.eb,o.o)),t.ob(11,49152,null,0,r.C,[t.h,t.k,t.x],{color:[0,"color"],name:[1,"name"],size:[2,"size"]},null),(n()(),t.pb(12,0,null,null,11,"ion-content",[],null,null,null,o.Y,o.i)),t.ob(13,49152,null,0,r.u,[t.h,t.k,t.x],null,null),(n()(),t.pb(14,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(n,l,e){var t=!0;return"ionRefresh"===l&&(t=!1!==n.component.refreshList(e)&&t),t}),o.sb,o.B)),t.ob(15,49152,null,0,r.ab,[t.h,t.k,t.x],null,null),(n()(),t.pb(16,0,null,0,1,"ion-refresher-content",[],null,null,null,o.rb,o.C)),t.ob(17,49152,null,0,r.bb,[t.h,t.k,t.x],null,null),(n()(),t.pb(18,0,null,0,5,"ion-list",[["lines","full"],["mode","ios"]],null,null,null,o.mb,o.v)),t.ob(19,49152,null,0,r.O,[t.h,t.k,t.x],{lines:[0,"lines"],mode:[1,"mode"]},null),(n()(),t.eb(16777216,null,0,1,null,k)),t.ob(21,278528,null,0,a.j,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(n()(),t.eb(16777216,null,0,1,null,x)),t.ob(23,16384,null,0,a.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.pb(24,0,null,null,17,"ion-footer",[],null,null,null,o.cb,o.m)),t.ob(25,49152,null,0,r.z,[t.h,t.k,t.x],null,null),(n()(),t.pb(26,0,null,0,9,"ion-list",[["class","ion-no-padding"],["lines","none"]],null,null,null,o.mb,o.v)),t.ob(27,49152,null,0,r.O,[t.h,t.k,t.x],{lines:[0,"lines"]},null),(n()(),t.pb(28,0,null,0,7,"ion-item",[["color","light"]],null,null,null,o.jb,o.q)),t.ob(29,49152,null,0,r.H,[t.h,t.k,t.x],{color:[0,"color"]},null),(n()(),t.pb(30,0,null,0,5,"ion-label",[],null,null,null,o.kb,o.u)),t.ob(31,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(n()(),t.pb(32,0,null,0,3,"h3",[],null,null,null,null,null)),(n()(),t.pb(33,0,null,null,2,"strong",[],null,null,null,null,null)),(n()(),t.Ib(34,null,["TOTALE: "," \u20ac"])),t.Eb(35,2),(n()(),t.pb(36,0,null,0,5,"ion-fab",[["horizontal","end"],["slot","fixed"],["vertical","bottom"]],null,null,null,o.bb,o.k)),t.ob(37,49152,null,0,r.w,[t.h,t.k,t.x],{horizontal:[0,"horizontal"],vertical:[1,"vertical"]},null),(n()(),t.pb(38,0,null,0,3,"ion-fab-button",[["color","tertiary"],["size","small"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.newMoviment()&&t),t}),o.ab,o.l)),t.ob(39,49152,null,0,r.x,[t.h,t.k,t.x],{color:[0,"color"],size:[1,"size"]},null),(n()(),t.pb(40,0,null,0,1,"ion-icon",[["name","add"]],null,null,null,o.eb,o.o)),t.ob(41,49152,null,0,r.C,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(n,l){var e=l.component;n(l,4,0,"ios"),n(l,11,0,"dark","options-outline","large"),n(l,19,0,"full","ios"),n(l,21,0,e.moviments),n(l,23,0,0==e.moviments.length),n(l,27,0,"none"),n(l,29,0,"light"),n(l,37,0,"end","bottom"),n(l,39,0,"tertiary","small"),n(l,41,0,"add")}),(function(n,l){var e=l.component,i=t.Jb(l,34,0,n(l,35,0,t.Bb(l,1),e.getTotal(),"1.2-2"));n(l,34,0,i)}))}var w=t.lb("app-moviments",v,(function(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,1,"app-moviments",[],null,null,null,y,f)),t.ob(1,49152,null,0,v,[c.a,b.a,d.a],null,null)],null,null)}),{},{},[]),M=e("s7LF"),S=e("iInd");e.d(l,"ListMovimentPageModuleNgFactory",(function(){return D}));var D=t.mb(i,[],(function(n){return t.yb([t.zb(512,t.j,t.X,[[8,[u.a,w]],[3,t.j],t.v]),t.zb(4608,a.m,a.l,[t.s,[2,a.x]]),t.zb(4608,r.c,r.c,[t.x,t.g]),t.zb(4608,r.Eb,r.Eb,[r.c,t.j,t.p]),t.zb(4608,r.Jb,r.Jb,[r.c,t.j,t.p]),t.zb(4608,M.l,M.l,[]),t.zb(1073742336,a.b,a.b,[]),t.zb(1073742336,r.Bb,r.Bb,[]),t.zb(1073742336,M.k,M.k,[]),t.zb(1073742336,M.b,M.b,[]),t.zb(1073742336,S.o,S.o,[[2,S.t],[2,S.m]]),t.zb(1073742336,i,i,[]),t.zb(1024,S.k,(function(){return[[{path:"",component:v}]]}),[])])}))}}]);
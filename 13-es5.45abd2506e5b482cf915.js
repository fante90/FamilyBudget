function _classCallCheck(n,l){if(!(n instanceof l))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,l){for(var e=0;e<l.length;e++){var t=l[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function _createClass(n,l,e){return l&&_defineProperties(n.prototype,l),e&&_defineProperties(n,e),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{SeuA:function(n,l,e){"use strict";e.r(l);var t=e("8Y7J"),u=e("mrSG"),o=e("Witw"),i=e("2dAZ"),r=e("jdXt"),a=e("EYbX"),c=e("bBk2"),s=function(){function n(l,e){_classCallCheck(this,n),this.uiService=l,this.appDBService=e,this.categories=[]}return _createClass(n,[{key:"newCategory",value:function(){return u.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var l=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.uiService.presentModal(i.a,{});case 2:n.t0=function(){l.refreshCategories()},n.sent.onDidDismiss().then(n.t0);case 4:case"end":return n.stop()}}),n,this)})))}},{key:"editCategory",value:function(n){return u.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var e=this;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,this.uiService.presentModal(i.a,{ID:n._id});case 2:l.t0=function(){e.refreshCategories()},l.sent.onDidDismiss().then(l.t0);case 4:case"end":return l.stop()}}),l,this)})))}},{key:"deleteCategory",value:function(n){return u.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var e=this;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:this.uiService.presentAlert({header:"Elimina categoria",text:"Sei sicuro di voler eliminare la categoria "+n.description+"?",buttons:[{text:"Annulla",role:"cancel",cssClass:"medium"},{text:"Conferma",handler:function(){e.delete(n)}}]});case 1:case"end":return l.stop()}}),l,this)})))}},{key:"delete",value:function(n){return u.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var e,t;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return e=new r.a(this.appDBService),l.next=3,e.findEntry(n._id);case 3:if(t=l.sent,l.t0=t,!l.t0){l.next=9;break}return l.next=8,e.delete();case 8:t=l.sent;case 9:!1===t?this.uiService.presentAlert({header:"ERRORE",message:e.getErrors().join("\n\r"),buttons:[{text:"Chiudi",role:"cancel",cssClass:"primary"}]}):(this.uiService.presentToast({message:"Categoria eliminata correttamente",duration:2e3,color:"success"}),this.refreshCategories());case 10:case"end":return l.stop()}}),l,this)})))}},{key:"getTypeDescription",value:function(n){return a.a.getMovimentType(n).description}},{key:"refreshCategories",value:function(){var n=this,l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;r.a.getEntries(this.appDBService).then((function(e){n.categories=e,l&&l.target.complete()}))}},{key:"ionViewDidEnter",value:function(){this.refreshCategories()}}]),n}(),b=function n(){_classCallCheck(this,n)},p=e("pMnS"),h=e("MKJQ"),d=e("sZkV"),f=e("SVse"),m=t.nb({encapsulation:0,styles:[[""]],data:{}});function g(n){return t.Jb(0,[(n()(),t.pb(0,0,null,null,1,"ion-icon",[],null,null,null,h.W,h.m)),t.ob(1,49152,null,0,d.B,[t.h,t.k,t.x],{color:[0,"color"],name:[1,"name"]},null)],(function(n,l){n(l,1,0,t.tb(1,"",l.parent.context.$implicit.color,""),t.tb(1,"",l.parent.context.$implicit.icon,""))}),null)}function k(n){return t.Jb(0,[(n()(),t.pb(0,0,null,null,22,"ion-item-sliding",[["mode","ios"]],null,null,null,h.ab,h.r)),t.ob(1,49152,null,0,d.L,[t.h,t.k,t.x],null,null),(n()(),t.pb(2,0,null,0,10,"ion-item",[],null,null,null,h.bb,h.o)),t.ob(3,49152,null,0,d.G,[t.h,t.k,t.x],null,null),(n()(),t.pb(4,0,null,0,2,"div",[["slot","start"]],[[8,"className",0]],null,null,null,null)),(n()(),t.eb(16777216,null,null,1,null,g)),t.ob(6,16384,null,0,f.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.pb(7,0,null,0,5,"ion-label",[],null,null,null,h.cb,h.s)),t.ob(8,49152,null,0,d.M,[t.h,t.k,t.x],null,null),(n()(),t.pb(9,0,null,0,1,"h3",[],null,null,null,null,null)),(n()(),t.Hb(10,null,["",""])),(n()(),t.pb(11,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),t.Hb(12,null,[" "," "])),(n()(),t.pb(13,0,null,0,9,"ion-item-options",[["side","end"]],null,null,null,h.Z,h.q)),t.ob(14,49152,null,0,d.K,[t.h,t.k,t.x],{side:[0,"side"]},null),(n()(),t.pb(15,0,null,0,3,"ion-item-option",[["color","secondary"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.editCategory(n.context.$implicit)&&t),t}),h.Y,h.p)),t.ob(16,49152,null,0,d.J,[t.h,t.k,t.x],{color:[0,"color"]},null),(n()(),t.pb(17,0,null,0,1,"ion-icon",[["name","pencil"]],null,null,null,h.W,h.m)),t.ob(18,49152,null,0,d.B,[t.h,t.k,t.x],{name:[0,"name"]},null),(n()(),t.pb(19,0,null,0,3,"ion-item-option",[["color","danger"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.deleteCategory(n.context.$implicit)&&t),t}),h.Y,h.p)),t.ob(20,49152,null,0,d.J,[t.h,t.k,t.x],{color:[0,"color"]},null),(n()(),t.pb(21,0,null,0,1,"ion-icon",[["name","trash-outline"]],null,null,null,h.W,h.m)),t.ob(22,49152,null,0,d.B,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(n,l){n(l,6,0,l.context.$implicit.icon),n(l,14,0,"end"),n(l,16,0,"secondary"),n(l,18,0,"pencil"),n(l,20,0,"danger"),n(l,22,0,"trash-outline")}),(function(n,l){var e=l.component;n(l,4,0,t.tb(1,"round-icon ",l.context.$implicit.color,"-borders")),n(l,10,0,l.context.$implicit.description),n(l,12,0,e.getTypeDescription(l.context.$implicit.type))}))}function v(n){return t.Jb(0,[(n()(),t.pb(0,0,null,null,5,"ion-item",[["lines","none"]],null,null,null,h.bb,h.o)),t.ob(1,49152,null,0,d.G,[t.h,t.k,t.x],{lines:[0,"lines"]},null),(n()(),t.pb(2,0,null,0,3,"ion-label",[],null,null,null,h.cb,h.s)),t.ob(3,49152,null,0,d.M,[t.h,t.k,t.x],null,null),(n()(),t.pb(4,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),t.Hb(-1,null,["Nessuna categoria inserita"]))],(function(n,l){n(l,1,0,"none")}),null)}function x(n){return t.Jb(0,[(n()(),t.pb(0,0,null,null,7,"ion-header",[],null,null,null,h.V,h.l)),t.ob(1,49152,null,0,d.A,[t.h,t.k,t.x],null,null),(n()(),t.pb(2,0,null,0,5,"ion-toolbar",[["mode","ios"]],null,null,null,h.tb,h.J)),t.ob(3,49152,null,0,d.yb,[t.h,t.k,t.x],{mode:[0,"mode"]},null),(n()(),t.pb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,h.M,h.c)),t.ob(5,49152,null,0,d.k,[t.h,t.k,t.x],null,null),(n()(),t.pb(6,0,null,0,1,"ion-menu-button",[["autoHide","false"],["mode","ios"]],null,null,null,h.fb,h.w)),t.ob(7,49152,null,0,d.Q,[t.h,t.k,t.x],{autoHide:[0,"autoHide"]},null),(n()(),t.pb(8,0,null,null,20,"ion-content",[],null,null,null,h.R,h.h)),t.ob(9,49152,null,0,d.t,[t.h,t.k,t.x],null,null),(n()(),t.pb(10,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(n,l,e){var t=!0;return"ionRefresh"===l&&(t=!1!==n.component.refreshCategories(e)&&t),t}),h.jb,h.y)),t.ob(11,49152,null,0,d.Z,[t.h,t.k,t.x],null,null),(n()(),t.pb(12,0,null,0,1,"ion-refresher-content",[],null,null,null,h.ib,h.z)),t.ob(13,49152,null,0,d.ab,[t.h,t.k,t.x],null,null),(n()(),t.pb(14,0,null,0,8,"ion-list",[["lines","full"],["mode","ios"]],null,null,null,h.eb,h.t)),t.ob(15,49152,null,0,d.N,[t.h,t.k,t.x],{lines:[0,"lines"],mode:[1,"mode"]},null),(n()(),t.pb(16,0,null,0,2,"ion-list-header",[],null,null,null,h.db,h.u)),t.ob(17,49152,null,0,d.O,[t.h,t.k,t.x],null,null),(n()(),t.Hb(-1,0,[" Categorie "])),(n()(),t.eb(16777216,null,0,1,null,k)),t.ob(20,278528,null,0,f.j,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(n()(),t.eb(16777216,null,0,1,null,v)),t.ob(22,16384,null,0,f.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.pb(23,0,null,0,5,"ion-fab",[["horizontal","end"],["slot","fixed"],["vertical","bottom"]],null,null,null,h.U,h.j)),t.ob(24,49152,null,0,d.v,[t.h,t.k,t.x],{horizontal:[0,"horizontal"],vertical:[1,"vertical"]},null),(n()(),t.pb(25,0,null,0,3,"ion-fab-button",[["color","tertiary"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.newCategory()&&t),t}),h.T,h.k)),t.ob(26,49152,null,0,d.w,[t.h,t.k,t.x],{color:[0,"color"]},null),(n()(),t.pb(27,0,null,0,1,"ion-icon",[["name","add"]],null,null,null,h.W,h.m)),t.ob(28,49152,null,0,d.B,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(n,l){var e=l.component;n(l,3,0,"ios"),n(l,7,0,"false"),n(l,15,0,"full","ios"),n(l,20,0,e.categories),n(l,22,0,0==e.categories.length),n(l,24,0,"end","bottom"),n(l,26,0,"tertiary"),n(l,28,0,"add")}),null)}var y=t.lb("app-list-categories",s,(function(n){return t.Jb(0,[(n()(),t.pb(0,0,null,null,1,"app-list-categories",[],null,null,null,x,m)),t.ob(1,49152,null,0,s,[o.a,c.a],null,null)],null,null)}),{},{},[]),C=e("s7LF"),w=e("iInd");e.d(l,"ListCategoriesPageModuleNgFactory",(function(){return z}));var z=t.mb(b,[],(function(n){return t.yb([t.zb(512,t.j,t.X,[[8,[p.a,y]],[3,t.j],t.v]),t.zb(4608,f.m,f.l,[t.s,[2,f.s]]),t.zb(4608,C.l,C.l,[]),t.zb(4608,d.c,d.c,[t.x,t.g]),t.zb(4608,d.Cb,d.Cb,[d.c,t.j,t.p]),t.zb(4608,d.Hb,d.Hb,[d.c,t.j,t.p]),t.zb(1073742336,f.b,f.b,[]),t.zb(1073742336,C.k,C.k,[]),t.zb(1073742336,C.b,C.b,[]),t.zb(1073742336,d.Ab,d.Ab,[]),t.zb(1073742336,w.o,w.o,[[2,w.t],[2,w.m]]),t.zb(1073742336,b,b,[]),t.zb(1024,w.k,(function(){return[[{path:"",component:s}]]}),[])])}))}}]);
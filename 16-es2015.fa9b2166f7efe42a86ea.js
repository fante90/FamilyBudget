(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{Btt2:function(l,n,t){"use strict";t.r(n);var e=t("8Y7J");class u{}var i=t("pMnS"),o=t("MKJQ"),a=t("sZkV"),r=t("SVse"),s=t("mrSG"),c=t("qyxE"),b=t("Witw"),p=t("Hlaf"),d=t("bBk2");class h{constructor(l,n){this.appDBService=l,this.uiService=n,this.listDateFilter=null,this.daysDateFilter=30,this.yearlyBalance="",this.setListDateFilter(30),this.calcYearlyBalance()}ionViewDidEnter(){this.refreshList()}setListDateFilter(l){this.daysDateFilter=l;const n=new Date((new Date).getTime()+6e4),t=n.getTime(),e=new Date(t-864e5*l);this.listDateFilter={entity:c.a.entityName,date:{$gt:e.toJSON(),$lt:n.toJSON()}}}newOperation(){this.uiService.presentActionSheet({header:"Seleziona il tipo di operazione:",buttons:[{text:"Registra entrata",icon:"arrow-down-outline",handler:()=>s.a(this,void 0,void 0,(function*(){(yield this.uiService.presentModal(p.a,{mvType:"P"})).onDidDismiss().then(()=>{this.refreshList()})}))},{text:"Registra uscita",icon:"arrow-up-outline",handler:()=>s.a(this,void 0,void 0,(function*(){(yield this.uiService.presentModal(p.a,{mvType:"M"})).onDidDismiss().then(()=>{this.refreshList()})}))},{text:"Registra investimento",icon:"cash-outline",handler:()=>s.a(this,void 0,void 0,(function*(){(yield this.uiService.presentModal(p.a,{mvType:"I"})).onDidDismiss().then(()=>{this.refreshList()})}))}]})}refreshList(l=null){c.a.getEntries(this.appDBService,!0,null,this.listDateFilter).then(n=>{this.moviments=n,l&&l.target.complete()})}calcYearlyBalance(){const l={entity:c.a.entityName,date:{$gt:new Date((new Date).getFullYear(),0,1,0,0).toJSON(),$lt:new Date((new Date).getTime()+6e4)}};c.a.getEntries(this.appDBService,!1,null,l).then(l=>{let n=0;l.forEach(l=>{"I"!==l.type&&(n+=l.value*("P"===l.type?1:-1))}),this.yearlyBalance=n.toFixed(2)})}openSetListDateFilter(){this.uiService.presentAlert({header:"Seleziona il filtro di data",inputs:[{name:"days",type:"radio",label:"Ultimi 30 giorni",value:30,checked:30===this.daysDateFilter},{name:"days",type:"radio",label:"Ultimi 90 giorni",value:90,checked:90===this.daysDateFilter},{name:"days",type:"radio",label:"Ultimo anno",value:365,checked:365===this.daysDateFilter}],buttons:[{text:"Annulla",role:"cancel",cssClass:"medium"},{text:"Conferma",handler:l=>{if(!l)return!1;this.setListDateFilter(l),this.refreshList()}}]})}}var m=e.nb({encapsulation:0,styles:[[".dashboard-top-card[_ngcontent-%COMP%]{margin-top:30px;overflow:visible;position:relative;background-color:var(--ion-color-primary)}.dashboard-top-card[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{-webkit-transform:translateY(-30%);transform:translateY(-30%);position:relative}"]],data:{}});function f(l){return e.Jb(0,[(l()(),e.pb(0,0,null,null,1,"ion-spinner",[["name","dots"]],null,null,null,o.mb,o.C)),e.ob(1,49152,null,0,a.ob,[e.h,e.k,e.x],{name:[0,"name"]},null)],(function(l,n){l(n,1,0,"dots")}),null)}function y(l){return e.Jb(0,[(l()(),e.pb(0,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e.Hb(1,null,[""," \u20ac"]))],null,(function(l,n){l(n,1,0,n.component.yearlyBalance)}))}function v(l){return e.Jb(0,[(l()(),e.pb(0,0,null,null,20,"ion-item",[["mode","ios"]],null,null,null,o.bb,o.o)),e.ob(1,49152,null,0,a.G,[e.h,e.k,e.x],{mode:[0,"mode"]},null),(l()(),e.pb(2,0,null,0,2,"div",[["slot","start"]],[[8,"className",0]],null,null,null,null)),(l()(),e.pb(3,0,null,null,1,"ion-icon",[],null,null,null,o.W,o.m)),e.ob(4,49152,null,0,a.B,[e.h,e.k,e.x],{color:[0,"color"],name:[1,"name"]},null),(l()(),e.pb(5,0,null,0,8,"ion-label",[],null,null,null,o.cb,o.s)),e.ob(6,49152,null,0,a.M,[e.h,e.k,e.x],null,null),(l()(),e.pb(7,0,null,0,2,"h4",[],null,null,null,null,null)),(l()(),e.Hb(8,null,["",""])),e.Db(9,2),(l()(),e.pb(10,0,null,0,1,"small",[["class","ion-text-uppercase"]],null,null,null,null,null)),(l()(),e.Hb(11,null,["",""])),(l()(),e.pb(12,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),e.Hb(13,null,["",""])),(l()(),e.pb(14,0,null,0,6,"div",[["slot","end"]],null,null,null,null,null)),(l()(),e.pb(15,0,null,null,5,"ion-label",[],null,null,null,o.cb,o.s)),e.ob(16,49152,null,0,a.M,[e.h,e.k,e.x],null,null),(l()(),e.pb(17,0,null,0,3,"p",[],null,null,null,null,null)),(l()(),e.pb(18,0,null,null,2,"strong",[["class","ion-text-right"]],null,null,null,null,null)),(l()(),e.Hb(19,null,[" "," \u20ac "])),e.Db(20,2)],(function(l,n){l(n,1,0,"ios"),l(n,4,0,e.tb(1,"",null==n.context.$implicit.category?null:n.context.$implicit.category.color,""),e.tb(1,"",null==n.context.$implicit.category?null:n.context.$implicit.category.icon,""))}),(function(l,n){l(n,2,0,e.tb(1,"round-icon ",null==n.context.$implicit.category?null:n.context.$implicit.category.color,"-borders"));var t=e.Ib(n,8,0,l(n,9,0,e.Bb(n.parent,0),n.context.$implicit.date,"dd/MM/yyyy HH:mm"));l(n,8,0,t),l(n,11,0,null==n.context.$implicit.category?null:n.context.$implicit.category.description),l(n,13,0,n.context.$implicit.note);var u=e.Ib(n,19,0,l(n,20,0,e.Bb(n.parent,1),n.context.$implicit.value,"1.2-2"));l(n,19,0,u)}))}function g(l){return e.Jb(0,[e.Cb(0,r.d,[e.s]),e.Cb(0,r.e,[e.s]),(l()(),e.pb(2,0,null,null,5,"ion-toolbar",[["mode","ios"]],null,null,null,o.tb,o.J)),e.ob(3,49152,null,0,a.yb,[e.h,e.k,e.x],{mode:[0,"mode"]},null),(l()(),e.pb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,o.M,o.c)),e.ob(5,49152,null,0,a.k,[e.h,e.k,e.x],null,null),(l()(),e.pb(6,0,null,0,1,"ion-menu-button",[["autoHide","false"],["mode","ios"]],null,null,null,o.fb,o.w)),e.ob(7,49152,null,0,a.Q,[e.h,e.k,e.x],{autoHide:[0,"autoHide"]},null),(l()(),e.pb(8,0,null,null,14,"div",[["class","ion-padding-horizontal dashboard-top-card"]],null,null,null,null,null)),(l()(),e.pb(9,0,null,null,13,"ion-card",[["color","light ion-no-margin"]],null,null,null,o.Q,o.d)),e.ob(10,49152,null,0,a.l,[e.h,e.k,e.x],{color:[0,"color"]},null),(l()(),e.pb(11,0,null,0,11,"ion-card-header",[["class","ion-text-center"]],null,null,null,o.N,o.e)),e.ob(12,49152,null,0,a.n,[e.h,e.k,e.x],null,null),(l()(),e.pb(13,0,null,0,3,"ion-card-subtitle",[],null,null,null,o.O,o.f)),e.ob(14,49152,null,0,a.o,[e.h,e.k,e.x],null,null),(l()(),e.pb(15,0,null,0,1,"strong",[],null,null,null,null,null)),(l()(),e.Hb(-1,null,["BILANCIO ANNUALE"])),(l()(),e.pb(17,0,null,0,5,"ion-card-title",[],null,null,null,o.P,o.g)),e.ob(18,49152,null,0,a.p,[e.h,e.k,e.x],null,null),(l()(),e.eb(16777216,null,0,1,null,f)),e.ob(20,16384,null,0,r.k,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.eb(16777216,null,0,1,null,y)),e.ob(22,16384,null,0,r.k,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(23,0,null,null,9,"div",[],null,null,null,null,null)),(l()(),e.pb(24,0,null,null,8,"ion-list",[["lines","full"],["mode","ios"]],null,null,null,o.eb,o.t)),e.ob(25,49152,null,0,a.N,[e.h,e.k,e.x],{lines:[0,"lines"],mode:[1,"mode"]},null),(l()(),e.pb(26,0,null,0,6,"ion-list-header",[],null,null,null,o.db,o.u)),e.ob(27,49152,null,0,a.O,[e.h,e.k,e.x],null,null),(l()(),e.pb(28,0,null,0,2,"ion-label",[["class","ion-no-margin"]],null,null,null,o.cb,o.s)),e.ob(29,49152,null,0,a.M,[e.h,e.k,e.x],null,null),(l()(),e.Hb(-1,0,["Ultimi Movimenti"])),(l()(),e.pb(31,0,null,0,1,"ion-icon",[["class","ion-float-right ion-padding-horizontal"],["color","dark"],["name","options-outline"],["size","large"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.openSetListDateFilter()&&e),e}),o.W,o.m)),e.ob(32,49152,null,0,a.B,[e.h,e.k,e.x],{color:[0,"color"],name:[1,"name"],size:[2,"size"]},null),(l()(),e.pb(33,0,null,null,15,"ion-content",[],null,null,null,o.R,o.h)),e.ob(34,49152,null,0,a.t,[e.h,e.k,e.x],null,null),(l()(),e.pb(35,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(l,n,t){var e=!0;return"ionRefresh"===n&&(e=!1!==l.component.refreshList(t)&&e),e}),o.jb,o.y)),e.ob(36,49152,null,0,a.Z,[e.h,e.k,e.x],null,null),(l()(),e.pb(37,0,null,0,1,"ion-refresher-content",[],null,null,null,o.ib,o.z)),e.ob(38,49152,null,0,a.ab,[e.h,e.k,e.x],null,null),(l()(),e.pb(39,0,null,0,3,"ion-list",[["lines","full"],["mode","ios"]],null,null,null,o.eb,o.t)),e.ob(40,49152,null,0,a.N,[e.h,e.k,e.x],{lines:[0,"lines"],mode:[1,"mode"]},null),(l()(),e.eb(16777216,null,0,1,null,v)),e.ob(42,278528,null,0,r.j,[e.M,e.J,e.q],{ngForOf:[0,"ngForOf"]},null),(l()(),e.pb(43,0,null,0,5,"ion-fab",[["horizontal","end"],["slot","fixed"],["vertical","bottom"]],null,null,null,o.U,o.j)),e.ob(44,49152,null,0,a.v,[e.h,e.k,e.x],{horizontal:[0,"horizontal"],vertical:[1,"vertical"]},null),(l()(),e.pb(45,0,null,0,3,"ion-fab-button",[["color","tertiary"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.newOperation()&&e),e}),o.T,o.k)),e.ob(46,49152,null,0,a.w,[e.h,e.k,e.x],{color:[0,"color"]},null),(l()(),e.pb(47,0,null,0,1,"ion-icon",[["name","add"]],null,null,null,o.W,o.m)),e.ob(48,49152,null,0,a.B,[e.h,e.k,e.x],{name:[0,"name"]},null)],(function(l,n){var t=n.component;l(n,3,0,"ios"),l(n,7,0,"false"),l(n,10,0,"light ion-no-margin"),l(n,20,0,""==t.yearlyBalance),l(n,22,0,""!=t.yearlyBalance),l(n,25,0,"full","ios"),l(n,32,0,"dark","options-outline","large"),l(n,40,0,"full","ios"),l(n,42,0,t.moviments),l(n,44,0,"end","bottom"),l(n,46,0,"tertiary"),l(n,48,0,"add")}),null)}function x(l){return e.Jb(0,[(l()(),e.pb(0,0,null,null,1,"app-home",[],null,null,null,g,m)),e.ob(1,49152,null,0,h,[d.a,b.a],null,null)],null,null)}var k=e.lb("app-home",h,x,{},{},[]),D=t("s7LF"),z=t("iInd");t.d(n,"Tab1PageModuleNgFactory",(function(){return w}));var w=e.mb(u,[],(function(l){return e.yb([e.zb(512,e.j,e.X,[[8,[i.a,k]],[3,e.j],e.v]),e.zb(4608,r.m,r.l,[e.s,[2,r.s]]),e.zb(4608,a.c,a.c,[e.x,e.g]),e.zb(4608,a.Cb,a.Cb,[a.c,e.j,e.p]),e.zb(4608,a.Hb,a.Hb,[a.c,e.j,e.p]),e.zb(4608,D.l,D.l,[]),e.zb(1073742336,r.b,r.b,[]),e.zb(1073742336,a.Ab,a.Ab,[]),e.zb(1073742336,D.k,D.k,[]),e.zb(1073742336,D.b,D.b,[]),e.zb(1073742336,z.o,z.o,[[2,z.t],[2,z.m]]),e.zb(1073742336,u,u,[]),e.zb(1024,z.k,(function(){return[[{path:"",component:h}]]}),[])])}))}}]);
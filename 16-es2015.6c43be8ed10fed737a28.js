(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{Btt2:function(l,n,u){"use strict";u.r(n);var t=u("8Y7J");class o{}var e=u("pMnS"),i=u("MKJQ"),a=u("sZkV"),r=u("SVse");class b{constructor(l,n,u,t){this.category=l,this.date=n,this.note=u,this.value=t}getCategory(){return this.category}getDate(){return this.date.getDate()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear()}getNote(){return this.note}getValue(){return(Math.round(100*this.value)/100).toFixed(2)}}var s=u("Witw"),c=u("Hlaf"),p=u("jdXt");class d{constructor(l,n){this.uiService=l,this.modalCtrl=n}newOperation(){this.uiService.presentActionSheet({header:"Seleziona il tipo di operazione:",buttons:[{text:"Registra entrata",icon:"arrow-round-down",handler:()=>{this.uiService.presentModal(c.a,{mvType:"P"})}},{text:"Registra uscita",icon:"arrow-round-up",handler:()=>{this.uiService.presentModal(c.a,{mvType:"M"})}},{text:"Registra investimento",icon:"cash",handler:()=>{this.uiService.presentModal(c.a,{mvType:"I"})}}]})}ngOnInit(){this.moviments=[new b(new p.a(6,"Spesa","M","primary","basket"),new Date,"Spesa al Mercat\xf2",-20.19),new b(new p.a(4,"Cene","M","secondary","pizza"),new Date,"Cena in pizzeria",-35),new b(new p.a(2,"Bollette Luce","M","dark","flash"),new Date,"",-105),new b(new p.a(1,"Bollette Gas","M","dark","thermometer"),new Date,"",-65),new b(new p.a(6,"Spesa","M","primary","basket"),new Date,"Spesa Macelleria",-45),new b(new p.a(5,"Shopping","M","tertiary","shirt"),new Date,"Felpa",-45),new b(new p.a(3,"Bollette Telefoniche","M","dark","globe"),new Date,"",-57)]}}var h=t.nb({encapsulation:0,styles:[[".dashboard-top-card[_ngcontent-%COMP%]{margin-top:30px;overflow:visible;position:relative;background-color:var(--ion-color-primary)}.dashboard-top-card[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{-webkit-transform:translateY(-30%);transform:translateY(-30%);position:relative}"]],data:{}});function m(l){return t.Gb(0,[(l()(),t.pb(0,0,null,null,18,"ion-item",[["mode","ios"]],null,null,null,i.X,i.n)),t.ob(1,49152,null,0,a.G,[t.h,t.k,t.x],{mode:[0,"mode"]},null),(l()(),t.pb(2,0,null,0,2,"div",[["slot","start"]],[[8,"className",0]],null,null,null,null)),(l()(),t.pb(3,0,null,null,1,"ion-icon",[],null,null,null,i.S,i.l)),t.ob(4,49152,null,0,a.B,[t.h,t.k,t.x],{color:[0,"color"],name:[1,"name"]},null),(l()(),t.pb(5,0,null,0,7,"ion-label",[],null,null,null,i.Y,i.r)),t.ob(6,49152,null,0,a.M,[t.h,t.k,t.x],null,null),(l()(),t.pb(7,0,null,0,1,"h4",[],null,null,null,null,null)),(l()(),t.Fb(8,null,["",""])),(l()(),t.pb(9,0,null,0,1,"small",[["class","ion-text-uppercase"]],null,null,null,null,null)),(l()(),t.Fb(10,null,["",""])),(l()(),t.pb(11,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Fb(12,null,["",""])),(l()(),t.pb(13,0,null,0,5,"div",[["slot","end"]],null,null,null,null,null)),(l()(),t.pb(14,0,null,null,4,"ion-label",[],null,null,null,i.Y,i.r)),t.ob(15,49152,null,0,a.M,[t.h,t.k,t.x],null,null),(l()(),t.pb(16,0,null,0,2,"p",[],null,null,null,null,null)),(l()(),t.pb(17,0,null,null,1,"strong",[["class","ion-text-right"]],null,null,null,null,null)),(l()(),t.Fb(18,null,[" "," \u20ac "]))],(function(l,n){l(n,1,0,"ios");var u=t.tb(1,"",n.context.$implicit.getCategory().color,""),o=t.tb(1,"",n.context.$implicit.getCategory().icon,"");l(n,4,0,u,o)}),(function(l,n){var u=t.tb(1,"round-icon ",n.context.$implicit.getCategory().color,"-borders");l(n,2,0,u);var o=n.context.$implicit.getDate();l(n,8,0,o);var e=n.context.$implicit.getCategory().description;l(n,10,0,e);var i=n.context.$implicit.getNote();l(n,12,0,i);var a=n.context.$implicit.getValue();l(n,18,0,a)}))}function g(l){return t.Gb(0,[(l()(),t.pb(0,0,null,null,37,"ion-content",[],null,null,null,i.O,i.h)),t.ob(1,49152,null,0,a.t,[t.h,t.k,t.x],null,null),(l()(),t.pb(2,0,null,0,5,"ion-toolbar",[["mode","ios"]],null,null,null,i.nb,i.G)),t.ob(3,49152,null,0,a.yb,[t.h,t.k,t.x],{mode:[0,"mode"]},null),(l()(),t.pb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,i.J,i.c)),t.ob(5,49152,null,0,a.k,[t.h,t.k,t.x],null,null),(l()(),t.pb(6,0,null,0,1,"ion-menu-button",[["autoHide","false"],["mode","ios"]],null,null,null,i.bb,i.v)),t.ob(7,49152,null,0,a.Q,[t.h,t.k,t.x],{autoHide:[0,"autoHide"]},null),(l()(),t.pb(8,0,null,0,12,"div",[["class","ion-padding-horizontal dashboard-top-card"]],null,null,null,null,null)),(l()(),t.pb(9,0,null,null,11,"ion-card",[["color","light ion-no-margin"]],null,null,null,i.N,i.d)),t.ob(10,49152,null,0,a.l,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(11,0,null,0,9,"ion-card-header",[["class","ion-text-center"]],null,null,null,i.K,i.e)),t.ob(12,49152,null,0,a.n,[t.h,t.k,t.x],null,null),(l()(),t.pb(13,0,null,0,3,"ion-card-subtitle",[],null,null,null,i.L,i.f)),t.ob(14,49152,null,0,a.o,[t.h,t.k,t.x],null,null),(l()(),t.pb(15,0,null,0,1,"strong",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["BILANCIO ANNUALE"])),(l()(),t.pb(17,0,null,0,3,"ion-card-title",[],null,null,null,i.M,i.g)),t.ob(18,49152,null,0,a.p,[t.h,t.k,t.x],null,null),(l()(),t.pb(19,0,null,0,1,"strong",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["+ 10.000 \u20ac"])),(l()(),t.pb(21,0,null,0,10,"ion-list",[["lines","full"],["mode","ios"]],null,null,null,i.ab,i.s)),t.ob(22,49152,null,0,a.N,[t.h,t.k,t.x],{lines:[0,"lines"],mode:[1,"mode"]},null),(l()(),t.pb(23,0,null,0,6,"ion-list-header",[],null,null,null,i.Z,i.t)),t.ob(24,49152,null,0,a.O,[t.h,t.k,t.x],null,null),(l()(),t.pb(25,0,null,0,2,"ion-label",[["class","ion-no-margin"]],null,null,null,i.Y,i.r)),t.ob(26,49152,null,0,a.M,[t.h,t.k,t.x],null,null),(l()(),t.Fb(-1,0,["Ultimi Movimenti"])),(l()(),t.pb(28,0,null,0,1,"ion-icon",[["class","ion-float-right ion-padding-horizontal"],["color","dark"],["name","options-outline"],["size","large"]],null,null,null,i.S,i.l)),t.ob(29,49152,null,0,a.B,[t.h,t.k,t.x],{color:[0,"color"],name:[1,"name"],size:[2,"size"]},null),(l()(),t.eb(16777216,null,0,1,null,m)),t.ob(31,278528,null,0,r.h,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t.pb(32,0,null,0,5,"ion-fab",[["horizontal","end"],["slot","fixed"],["vertical","bottom"]],null,null,null,i.Q,i.i)),t.ob(33,49152,null,0,a.v,[t.h,t.k,t.x],{horizontal:[0,"horizontal"],vertical:[1,"vertical"]},null),(l()(),t.pb(34,0,null,0,3,"ion-fab-button",[["color","tertiary"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.newOperation()&&t),t}),i.P,i.j)),t.ob(35,49152,null,0,a.w,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(36,0,null,0,1,"ion-icon",[["name","add"]],null,null,null,i.S,i.l)),t.ob(37,49152,null,0,a.B,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){var u=n.component;l(n,3,0,"ios"),l(n,7,0,"false"),l(n,10,0,"light ion-no-margin"),l(n,22,0,"full","ios"),l(n,29,0,"dark","options-outline","large"),l(n,31,0,u.moviments),l(n,33,0,"end","bottom"),l(n,35,0,"tertiary"),l(n,37,0,"add")}),null)}function v(l){return t.Gb(0,[(l()(),t.pb(0,0,null,null,1,"app-home",[],null,null,null,g,h)),t.ob(1,114688,null,0,d,[s.a,a.Cb],null,null)],(function(l,n){l(n,1,0)}),null)}var k=t.lb("app-home",d,v,{},{},[]),w=u("s7LF"),x=u("iInd");u.d(n,"Tab1PageModuleNgFactory",(function(){return f}));var f=t.mb(o,[],(function(l){return t.yb([t.zb(512,t.j,t.X,[[8,[e.a,k]],[3,t.j],t.v]),t.zb(4608,r.k,r.j,[t.s,[2,r.q]]),t.zb(4608,a.c,a.c,[t.x,t.g]),t.zb(4608,a.Cb,a.Cb,[a.c,t.j,t.p]),t.zb(4608,a.Hb,a.Hb,[a.c,t.j,t.p]),t.zb(4608,w.l,w.l,[]),t.zb(1073742336,r.b,r.b,[]),t.zb(1073742336,a.Ab,a.Ab,[]),t.zb(1073742336,w.k,w.k,[]),t.zb(1073742336,w.b,w.b,[]),t.zb(1073742336,x.o,x.o,[[2,x.t],[2,x.m]]),t.zb(1073742336,o,o,[]),t.zb(1024,x.k,(function(){return[[{path:"",component:d}]]}),[])])}))}}]);
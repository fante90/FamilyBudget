(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{s0AX:function(l,n,e){"use strict";e.r(n);var t=e("8Y7J");class i{}var u=e("pMnS"),o=e("MKJQ"),r=e("sZkV"),s=e("SVse"),a=e("mrSG"),c=e("Witw"),b=e("bBk2"),d=e("Hlaf"),p=e("qyxE"),h=e("HIux"),m=e("A1CT");class v{constructor(l,n,e){this.uiService=l,this.appDBService=n,this.utilityService=e,this.listFilterModel={fromDate:new Date((new Date).getFullYear(),(new Date).getMonth(),1,0,0,0).toISOString(),toDate:new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate(),23,59,0).toISOString(),type:"*",category:"*"},this.moviments=[]}newMoviment(){return a.a(this,void 0,void 0,(function*(){this.uiService.presentActionSheet({header:"Seleziona il tipo di movimento:",buttons:[{text:"Registra entrata",icon:"arrow-down-outline",handler:()=>a.a(this,void 0,void 0,(function*(){(yield this.uiService.presentModal(d.a,{mvType:"P"})).onDidDismiss().then(()=>{this.refreshList()})}))},{text:"Registra uscita",icon:"arrow-up-outline",handler:()=>a.a(this,void 0,void 0,(function*(){(yield this.uiService.presentModal(d.a,{mvType:"M"})).onDidDismiss().then(()=>{this.refreshList()})}))},{text:"Registra investimento",icon:"cash-outline",handler:()=>a.a(this,void 0,void 0,(function*(){(yield this.uiService.presentModal(d.a,{mvType:"I"})).onDidDismiss().then(()=>{this.refreshList()})}))}]})}))}editMoviment(l){return a.a(this,void 0,void 0,(function*(){(yield this.uiService.presentModal(d.a,{ID:l._id})).onDidDismiss().then(()=>{this.refreshList()})}))}deleteMoviment(l){return a.a(this,void 0,void 0,(function*(){this.uiService.presentAlert({header:"Elimina movimento",message:"Sei sicuro di voler eliminare il movimento?",buttons:[{text:"Annulla",role:"cancel",cssClass:"medium"},{text:"Conferma",handler:()=>{this.delete(l)}}]})}))}delete(l){return a.a(this,void 0,void 0,(function*(){const n=new p.a(this.appDBService);let e=yield n.findEntry(l._id);e&&(e=yield n.delete()),!1===e?this.uiService.presentAlert({header:"ERRORE",message:n.getErrors().join("\n\r"),buttons:[{text:"Chiudi",role:"cancel",cssClass:"primary"}]}):(this.uiService.presentToast({message:"Movimento eliminato correttamente",duration:2e3,color:"success"}),this.refreshList())}))}refreshList(l=null){const n={entity:p.a.entityName,date:{$gte:this.utilityService.dateToISO(this.listFilterModel.fromDate),$lte:this.utilityService.dateToISO(this.listFilterModel.toDate)}};"*"!==this.listFilterModel.type&&(n.type=this.listFilterModel.type),"*"!==this.listFilterModel.category&&(n.id_category=this.listFilterModel.category),p.a.getEntries(this.appDBService,!1,null,n).then(n=>{this.moviments=n,l&&l.target.complete()})}openModalSetFilter(){return a.a(this,void 0,void 0,(function*(){(yield this.uiService.presentModal(h.a,{listFilterModel:this.listFilterModel})).onDidDismiss().then(l=>{l&&l.data&&(this.listFilterModel=l.data),this.refreshList()})}))}getTotal(){let l=0;return this.moviments&&this.moviments.forEach(n=>{l+=n.value*("P"===n.type?1:-1)}),l}ionViewDidEnter(){this.refreshList()}}var g=t.nb({encapsulation:0,styles:[["ion-content[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:translucent}"]],data:{}});function f(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,1,"ion-icon",[],null,null,null,o.eb,o.o)),t.ob(1,49152,null,0,r.C,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){l(n,1,0,t.tb(1,"",null==n.parent.context.$implicit.category?null:n.parent.context.$implicit.category.icon,""))}),null)}function k(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,36,"ion-item-sliding",[["mode","ios"]],null,null,null,o.ib,o.t)),t.ob(1,49152,null,0,r.M,[t.h,t.k,t.x],null,null),(l()(),t.pb(2,0,null,0,24,"ion-item",[],null,null,null,o.jb,o.q)),t.ob(3,49152,null,0,r.H,[t.h,t.k,t.x],null,null),(l()(),t.pb(4,0,null,0,5,"div",[["class","round-icon"],["slot","start"]],null,null,null,null,null)),t.Fb(512,null,s.u,s.v,[t.k,t.r,t.B]),t.ob(6,278528,null,0,s.n,[s.u],{ngStyle:[0,"ngStyle"]},null),t.Db(7,{"background-color":0}),(l()(),t.eb(16777216,null,null,1,null,f)),t.ob(9,16384,null,0,s.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(10,0,null,0,9,"ion-label",[],null,null,null,o.kb,o.u)),t.ob(11,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(l()(),t.pb(12,0,null,0,2,"h3",[],null,null,null,null,null)),(l()(),t.Ib(13,null,["",""])),t.Eb(14,2),(l()(),t.pb(15,0,null,0,2,"h5",[["class","ion-text-uppercase"]],null,null,null,null,null)),(l()(),t.pb(16,0,null,null,1,"small",[],null,null,null,null,null)),(l()(),t.Ib(17,null,["",""])),(l()(),t.pb(18,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Ib(19,null,["",""])),(l()(),t.pb(20,0,null,0,6,"div",[["slot","end"]],null,null,null,null,null)),(l()(),t.pb(21,0,null,null,5,"ion-label",[],null,null,null,o.kb,o.u)),t.ob(22,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(l()(),t.pb(23,0,null,0,3,"p",[],null,null,null,null,null)),(l()(),t.pb(24,0,null,null,2,"strong",[["class","ion-text-right"]],null,null,null,null,null)),(l()(),t.Ib(25,null,[" "," \u20ac "])),t.Eb(26,2),(l()(),t.pb(27,0,null,0,9,"ion-item-options",[["side","end"]],null,null,null,o.hb,o.s)),t.ob(28,49152,null,0,r.L,[t.h,t.k,t.x],{side:[0,"side"]},null),(l()(),t.pb(29,0,null,0,3,"ion-item-option",[["color","secondary"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.editMoviment(l.context.$implicit)&&t),t}),o.gb,o.r)),t.ob(30,49152,null,0,r.K,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(31,0,null,0,1,"ion-icon",[["name","pencil"]],null,null,null,o.eb,o.o)),t.ob(32,49152,null,0,r.C,[t.h,t.k,t.x],{name:[0,"name"]},null),(l()(),t.pb(33,0,null,0,3,"ion-item-option",[["color","danger"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.deleteMoviment(l.context.$implicit)&&t),t}),o.gb,o.r)),t.ob(34,49152,null,0,r.K,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(35,0,null,0,1,"ion-icon",[["name","trash-outline"]],null,null,null,o.eb,o.o)),t.ob(36,49152,null,0,r.C,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){var e=l(n,7,0,n.context.$implicit.category?n.context.$implicit.category.color:"");l(n,6,0,e),l(n,9,0,null==n.context.$implicit.category?null:n.context.$implicit.category.icon),l(n,28,0,"end"),l(n,30,0,"secondary"),l(n,32,0,"pencil"),l(n,34,0,"danger"),l(n,36,0,"trash-outline")}),(function(l,n){var e=t.Jb(n,13,0,l(n,14,0,t.Bb(n.parent,0),n.context.$implicit.date,"dd/MM/yyyy"));l(n,13,0,e),l(n,17,0,null==n.context.$implicit.category?null:n.context.$implicit.category.description),l(n,19,0,n.context.$implicit.note);var i=t.Jb(n,25,0,l(n,26,0,t.Bb(n.parent,1),n.context.$implicit.value,"1.2-2"));l(n,25,0,i)}))}function x(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,5,"ion-item",[["lines","none"]],null,null,null,o.jb,o.q)),t.ob(1,49152,null,0,r.H,[t.h,t.k,t.x],{lines:[0,"lines"]},null),(l()(),t.pb(2,0,null,0,3,"ion-label",[],null,null,null,o.kb,o.u)),t.ob(3,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(l()(),t.pb(4,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Ib(-1,null,["Nessun movimento inserito"]))],(function(l,n){l(n,1,0,"none")}),null)}function y(l){return t.Kb(0,[t.Cb(0,s.d,[t.s]),t.Cb(0,s.e,[t.s]),(l()(),t.pb(2,0,null,null,9,"div",[],null,null,null,null,null)),(l()(),t.pb(3,0,null,null,8,"ion-list",[["mode","ios"]],null,null,null,o.mb,o.v)),t.ob(4,49152,null,0,r.O,[t.h,t.k,t.x],{mode:[0,"mode"]},null),(l()(),t.pb(5,0,null,0,6,"ion-list-header",[["class","ion-padding-bottom"]],null,null,null,o.lb,o.w)),t.ob(6,49152,null,0,r.P,[t.h,t.k,t.x],null,null),(l()(),t.pb(7,0,null,0,2,"ion-label",[["class","ion-no-margin"]],null,null,null,o.kb,o.u)),t.ob(8,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(l()(),t.Ib(-1,0,["Movimenti"])),(l()(),t.pb(10,0,null,0,1,"ion-icon",[["class","ion-float-right ion-padding-horizontal"],["color","dark"],["name","options-outline"],["size","large"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.openModalSetFilter()&&t),t}),o.eb,o.o)),t.ob(11,49152,null,0,r.C,[t.h,t.k,t.x],{color:[0,"color"],name:[1,"name"],size:[2,"size"]},null),(l()(),t.pb(12,0,null,null,11,"ion-content",[],null,null,null,o.Y,o.i)),t.ob(13,49152,null,0,r.u,[t.h,t.k,t.x],null,null),(l()(),t.pb(14,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(l,n,e){var t=!0;return"ionRefresh"===n&&(t=!1!==l.component.refreshList(e)&&t),t}),o.sb,o.B)),t.ob(15,49152,null,0,r.ab,[t.h,t.k,t.x],null,null),(l()(),t.pb(16,0,null,0,1,"ion-refresher-content",[],null,null,null,o.rb,o.C)),t.ob(17,49152,null,0,r.bb,[t.h,t.k,t.x],null,null),(l()(),t.pb(18,0,null,0,5,"ion-list",[["lines","full"],["mode","ios"]],null,null,null,o.mb,o.v)),t.ob(19,49152,null,0,r.O,[t.h,t.k,t.x],{lines:[0,"lines"],mode:[1,"mode"]},null),(l()(),t.eb(16777216,null,0,1,null,k)),t.ob(21,278528,null,0,s.j,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t.eb(16777216,null,0,1,null,x)),t.ob(23,16384,null,0,s.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(24,0,null,null,17,"ion-footer",[],null,null,null,o.cb,o.m)),t.ob(25,49152,null,0,r.z,[t.h,t.k,t.x],null,null),(l()(),t.pb(26,0,null,0,9,"ion-list",[["class","ion-no-padding"],["lines","none"]],null,null,null,o.mb,o.v)),t.ob(27,49152,null,0,r.O,[t.h,t.k,t.x],{lines:[0,"lines"]},null),(l()(),t.pb(28,0,null,0,7,"ion-item",[["color","light"]],null,null,null,o.jb,o.q)),t.ob(29,49152,null,0,r.H,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(30,0,null,0,5,"ion-label",[],null,null,null,o.kb,o.u)),t.ob(31,49152,null,0,r.N,[t.h,t.k,t.x],null,null),(l()(),t.pb(32,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),t.pb(33,0,null,null,2,"strong",[],null,null,null,null,null)),(l()(),t.Ib(34,null,["TOTALE: "," \u20ac"])),t.Eb(35,2),(l()(),t.pb(36,0,null,0,5,"ion-fab",[["horizontal","end"],["slot","fixed"],["vertical","bottom"]],null,null,null,o.bb,o.k)),t.ob(37,49152,null,0,r.w,[t.h,t.k,t.x],{horizontal:[0,"horizontal"],vertical:[1,"vertical"]},null),(l()(),t.pb(38,0,null,0,3,"ion-fab-button",[["color","tertiary"],["size","small"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.newMoviment()&&t),t}),o.ab,o.l)),t.ob(39,49152,null,0,r.x,[t.h,t.k,t.x],{color:[0,"color"],size:[1,"size"]},null),(l()(),t.pb(40,0,null,0,1,"ion-icon",[["name","add"]],null,null,null,o.eb,o.o)),t.ob(41,49152,null,0,r.C,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){var e=n.component;l(n,4,0,"ios"),l(n,11,0,"dark","options-outline","large"),l(n,19,0,"full","ios"),l(n,21,0,e.moviments),l(n,23,0,0==e.moviments.length),l(n,27,0,"none"),l(n,29,0,"light"),l(n,37,0,"end","bottom"),l(n,39,0,"tertiary","small"),l(n,41,0,"add")}),(function(l,n){var e=n.component,i=t.Jb(n,34,0,l(n,35,0,t.Bb(n,1),e.getTotal(),"1.2-2"));l(n,34,0,i)}))}function M(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,1,"app-moviments",[],null,null,null,y,g)),t.ob(1,49152,null,0,v,[c.a,b.a,m.a],null,null)],null,null)}var S=t.lb("app-moviments",v,M,{},{},[]),D=e("s7LF"),z=e("iInd");e.d(n,"ListMovimentPageModuleNgFactory",(function(){return w}));var w=t.mb(i,[],(function(l){return t.yb([t.zb(512,t.j,t.X,[[8,[u.a,S]],[3,t.j],t.v]),t.zb(4608,s.m,s.l,[t.s,[2,s.x]]),t.zb(4608,r.c,r.c,[t.x,t.g]),t.zb(4608,r.Eb,r.Eb,[r.c,t.j,t.p]),t.zb(4608,r.Jb,r.Jb,[r.c,t.j,t.p]),t.zb(4608,D.l,D.l,[]),t.zb(1073742336,s.b,s.b,[]),t.zb(1073742336,r.Bb,r.Bb,[]),t.zb(1073742336,D.k,D.k,[]),t.zb(1073742336,D.b,D.b,[]),t.zb(1073742336,z.o,z.o,[[2,z.t],[2,z.m]]),t.zb(1073742336,i,i,[]),t.zb(1024,z.k,(function(){return[[{path:"",component:v}]]}),[])])}))}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{Btt2:function(l,n,u){"use strict";u.r(n);var t=u("8Y7J");class o{}var e=u("pMnS"),a=u("UMKc"),i=u("BWfq"),r=u("hOc/"),s=u("PMgq"),b=u("g895"),c=u("MKJQ"),d=u("sZkV"),p=u("SVse"),h=u("VT0v"),g=u("qyxE"),f=u("bBk2"),v=u("MO+k");class k{constructor(l,n){this.appDBService=l,this.router=n,this.yearlyBalance=null,this.totalOut=null,this.totalOutNoInv=null,this.totalIn=null,this.totalInv=null,this.categoriesTotalOut=[],this.categoriesTotalIn=[],this.chartSliderOpts={initialSlide:0,speed:400},this.listSliderOpts={initialSlide:0,speed:400,allowTouchMove:!1},this.outChartRef=null,this.inChartRef=null}ionViewDidEnter(){this.calcYearlyBalance()}calcYearlyBalance(){this.yearlyBalance=null,this.totalIn=null,this.totalOut=null,this.totalOutNoInv=null,this.totalInv=null;const l={entity:g.a.entityName,date:{$gte:new Date((new Date).getFullYear(),0,1,0,0),$lte:new Date}},n=[],u=[],t={labels:[],datasets:[{data:[],backgroundColor:[]}]},o={labels:[],datasets:[{data:[],backgroundColor:[]}]};g.a.getEntries(this.appDBService,!1,null,l).then(l=>{let e=0,a=0,i=0,r=0;this.categoriesTotalIn=[],this.categoriesTotalOut=[],l.forEach(l=>{if(e+=l.value*("P"===l.type?1:-1),"P"===l.type){i+=l.value;const n=u.indexOf(l.id_category);if(n>=0)o.datasets[0].data[n]+=l.value,this.categoriesTotalIn[n].value+=l.value;else{u.push(l.id_category),o.labels.push(l.category.description),o.datasets[0].data.push(l.value),o.datasets[0].backgroundColor.push(l.category.color);const n=Object.assign({value:l.value},l.category);this.categoriesTotalIn.push(n)}}else{a+=l.value,"I"===l.type&&(r+=l.value);const u=n.indexOf(l.id_category);if(u>=0)t.datasets[0].data[u]+=l.value,this.categoriesTotalOut[u].value+=l.value;else{n.push(l.id_category),t.labels.push(l.category.description),t.datasets[0].data.push(l.value),t.datasets[0].backgroundColor.push(l.category.color);const u=Object.assign({value:l.value},l.category);this.categoriesTotalOut.push(u)}}}),this.yearlyBalance=e,this.totalIn=i,this.totalOut=-1*a,this.totalOutNoInv=-1*Math.abs(a-r),this.totalInv=r;for(const[n,u]of this.categoriesTotalOut.entries())this.categoriesTotalOut[n].perc=u.value/a*100;for(const[n,u]of this.categoriesTotalIn.entries())this.categoriesTotalIn[n].perc=u.value/i*100;this.categoriesTotalOut.sort((l,n)=>l.value>n.value?-1:1),this.categoriesTotalIn.sort((l,n)=>l.value>n.value?-1:1),this.outChartRef=new v.Chart(this.outChart.nativeElement,{type:"doughnut",data:t,options:{circumference:Math.PI,rotation:-Math.PI,legend:{display:!1},tooltips:{callbacks:{label:(l,n)=>{let u=n.labels[l.index]||"";return u&&(u+=": "),u+=n.datasets[0].data[l.index].toFixed(2)+" \u20ac",u}}}}}),this.inChartRef=new v.Chart(this.inChart.nativeElement,{type:"doughnut",data:o,options:{circumference:Math.PI,rotation:-Math.PI,legend:{display:!1},tooltips:{callbacks:{label:(l,n)=>{let u=n.labels[l.index]||"";return u&&(u+=": "),u+=n.datasets[0].data[l.index].toFixed(2)+" \u20ac",u}}}}})})}showCatMoviments(l){this.router.navigate(["/t/list-moviments",{category:l._id,filterDateType:"YEAR"}])}slideNext(){this.listSlider.slideNext()}slidePrev(){this.listSlider.slidePrev()}}var m=u("iInd"),I=t.nb({encapsulation:0,styles:[[".dashboard-top-card[_ngcontent-%COMP%]{margin-top:30px;overflow:visible;position:relative;background-color:var(--ion-color-primary)}.dashboard-top-card[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{-webkit-transform:translateY(-30%);transform:translateY(-30%);position:relative}.card-chart[_ngcontent-%COMP%]{position:relative}.card-chart[_ngcontent-%COMP%]   .total[_ngcontent-%COMP%]{position:absolute;font-size:18px;font-weight:700;color:var(--ion-color-dark);bottom:20px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}"]],data:{}});function x(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,1,"ion-spinner",[["name","dots"]],null,null,null,c.Hb,c.M)),t.ob(1,49152,null,0,d.pb,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){l(n,1,0,"dots")}),null)}function y(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.Ib(-1,null,["+"]))],null,null)}function C(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,4,"strong",[],null,null,null,null,null)),(l()(),t.eb(16777216,null,null,1,null,y)),t.ob(2,16384,null,0,p.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.Ib(3,null,[" "," \u20ac"])),t.Eb(4,2)],(function(l,n){l(n,2,0,n.component.yearlyBalance>0)}),(function(l,n){var u=n.component,o=t.Jb(n,3,0,l(n,4,0,t.Bb(n.parent,0),u.yearlyBalance,"1.2"));l(n,3,0,o)}))}function O(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,1,"ion-spinner",[["name","dots"]],null,null,null,c.Hb,c.M)),t.ob(1,49152,null,0,d.pb,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){l(n,1,0,"dots")}),null)}function M(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,2,"span",[],null,null,null,null,null)),(l()(),t.Ib(1,null,[""," \u20ac"])),t.Eb(2,2)],null,(function(l,n){var u=n.component,o=t.Jb(n,1,0,l(n,2,0,t.Bb(n.parent,0),u.totalIn,"1.2"));l(n,1,0,o)}))}function w(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,1,"ion-spinner",[["name","dots"]],null,null,null,c.Hb,c.M)),t.ob(1,49152,null,0,d.pb,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){l(n,1,0,"dots")}),null)}function z(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,2,"span",[],null,null,null,null,null)),(l()(),t.Ib(1,null,[""," \u20ac"])),t.Eb(2,2)],null,(function(l,n){var u=n.component,o=t.Jb(n,1,0,l(n,2,0,t.Bb(n.parent,0),u.totalOutNoInv,"1.2"));l(n,1,0,o)}))}function B(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,1,"ion-spinner",[["name","dots"]],null,null,null,c.Hb,c.M)),t.ob(1,49152,null,0,d.pb,[t.h,t.k,t.x],{name:[0,"name"]},null)],(function(l,n){l(n,1,0,"dots")}),null)}function E(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,2,"span",[],null,null,null,null,null)),(l()(),t.Ib(1,null,[""," \u20ac"])),t.Eb(2,2)],null,(function(l,n){var u=n.component,o=t.Jb(n,1,0,l(n,2,0,t.Bb(n.parent,0),u.totalInv,"1.2"));l(n,1,0,o)}))}function J(l){return t.Kb(0,[t.Cb(0,p.e,[t.s]),t.Gb(671088640,1,{outChart:0}),t.Gb(671088640,2,{inChart:0}),t.Gb(671088640,3,{listSlider:0}),(l()(),t.pb(4,0,null,null,50,"div",[["class","ion-padding-horizontal dashboard-top-card"]],null,null,null,null,null)),(l()(),t.pb(5,0,null,null,49,"ion-card",[["class","ion-no-margin"],["color","light"]],null,null,null,c.cb,c.d)),t.ob(6,49152,null,0,d.m,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(7,0,null,0,11,"ion-card-header",[["class","ion-text-center"]],null,null,null,c.Z,c.f)),t.ob(8,49152,null,0,d.o,[t.h,t.k,t.x],null,null),(l()(),t.pb(9,0,null,0,3,"ion-card-subtitle",[],null,null,null,c.ab,c.g)),t.ob(10,49152,null,0,d.p,[t.h,t.k,t.x],null,null),(l()(),t.pb(11,0,null,0,1,"strong",[],null,null,null,null,null)),(l()(),t.Ib(-1,null,["BILANCIO ANNUALE"])),(l()(),t.pb(13,0,null,0,5,"ion-card-title",[],null,null,null,c.bb,c.h)),t.ob(14,49152,null,0,d.q,[t.h,t.k,t.x],null,null),(l()(),t.eb(16777216,null,0,1,null,x)),t.ob(16,16384,null,0,p.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.eb(16777216,null,0,1,null,C)),t.ob(18,16384,null,0,p.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(19,0,null,0,35,"ion-card-content",[],null,null,null,c.Y,c.e)),t.ob(20,49152,null,0,d.n,[t.h,t.k,t.x],null,null),(l()(),t.pb(21,0,null,0,33,"ion-grid",[["class","ion-no-padding"]],null,null,null,c.ib,c.n)),t.ob(22,49152,null,0,d.A,[t.h,t.k,t.x],null,null),(l()(),t.pb(23,0,null,0,31,"ion-row",[],null,null,null,c.zb,c.E)),t.ob(24,49152,null,0,d.gb,[t.h,t.k,t.x],null,null),(l()(),t.pb(25,0,null,0,9,"ion-col",[["class","ion-text-center ion-no-padding"],["size","4"]],null,null,null,c.db,c.i)),t.ob(26,49152,null,0,d.t,[t.h,t.k,t.x],{size:[0,"size"]},null),(l()(),t.pb(27,0,null,0,3,"ion-text",[["color","success"]],null,null,null,c.Lb,c.Q)),t.ob(28,49152,null,0,d.ub,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(29,0,null,0,1,"ion-icon",[["name","arrow-up"]],null,null,null,c.kb,c.p)),t.ob(30,49152,null,0,d.C,[t.h,t.k,t.x],{name:[0,"name"]},null),(l()(),t.eb(16777216,null,0,1,null,O)),t.ob(32,16384,null,0,p.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.eb(16777216,null,0,1,null,M)),t.ob(34,16384,null,0,p.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(35,0,null,0,9,"ion-col",[["class","ion-text-center ion-no-padding"],["size","4"]],null,null,null,c.db,c.i)),t.ob(36,49152,null,0,d.t,[t.h,t.k,t.x],{size:[0,"size"]},null),(l()(),t.pb(37,0,null,0,3,"ion-text",[["color","danger"]],null,null,null,c.Lb,c.Q)),t.ob(38,49152,null,0,d.ub,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(39,0,null,0,1,"ion-icon",[["name","arrow-down"]],null,null,null,c.kb,c.p)),t.ob(40,49152,null,0,d.C,[t.h,t.k,t.x],{name:[0,"name"]},null),(l()(),t.eb(16777216,null,0,1,null,w)),t.ob(42,16384,null,0,p.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.eb(16777216,null,0,1,null,z)),t.ob(44,16384,null,0,p.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(45,0,null,0,9,"ion-col",[["class","ion-text-center ion-no-padding"],["size","4"]],null,null,null,c.db,c.i)),t.ob(46,49152,null,0,d.t,[t.h,t.k,t.x],{size:[0,"size"]},null),(l()(),t.pb(47,0,null,0,3,"ion-text",[["color","tertiary"]],null,null,null,c.Lb,c.Q)),t.ob(48,49152,null,0,d.ub,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(49,0,null,0,1,"ion-icon",[["name","trending-up-outline"]],null,null,null,c.kb,c.p)),t.ob(50,49152,null,0,d.C,[t.h,t.k,t.x],{name:[0,"name"]},null),(l()(),t.eb(16777216,null,0,1,null,B)),t.ob(52,16384,null,0,p.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.eb(16777216,null,0,1,null,E)),t.ob(54,16384,null,0,p.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(55,0,null,null,45,"ion-content",[["color","light"]],null,null,null,c.eb,c.j)),t.ob(56,49152,null,0,d.u,[t.h,t.k,t.x],{color:[0,"color"]},null),(l()(),t.pb(57,0,null,0,33,"ion-slides",[["pager","true"]],null,[[null,"ionSlideNextEnd"],[null,"ionSlidePrevEnd"]],(function(l,n,u){var t=!0,o=l.component;return"ionSlideNextEnd"===n&&(t=!1!==o.slideNext()&&t),"ionSlidePrevEnd"===n&&(t=!1!==o.slidePrev()&&t),t}),c.Gb,c.L)),t.ob(58,49152,null,0,d.ob,[t.h,t.k,t.x],{options:[0,"options"],pager:[1,"pager"]},null),(l()(),t.pb(59,0,null,0,15,"ion-slide",[],null,null,null,c.Fb,c.K)),t.ob(60,49152,null,0,d.nb,[t.h,t.k,t.x],null,null),(l()(),t.pb(61,0,null,0,13,"ion-card",[],null,null,null,c.cb,c.d)),t.ob(62,49152,null,0,d.m,[t.h,t.k,t.x],null,null),(l()(),t.pb(63,0,null,0,5,"ion-card-header",[],null,null,null,c.Z,c.f)),t.ob(64,49152,null,0,d.o,[t.h,t.k,t.x],null,null),(l()(),t.pb(65,0,null,0,3,"ion-card-title",[],null,null,null,c.bb,c.h)),t.ob(66,49152,null,0,d.q,[t.h,t.k,t.x],null,null),(l()(),t.pb(67,0,null,0,1,"strong",[],null,null,null,null,null)),(l()(),t.Ib(-1,null,["Uscite"])),(l()(),t.pb(69,0,null,0,5,"ion-card-content",[["class","card-chart"]],null,null,null,c.Y,c.e)),t.ob(70,49152,null,0,d.n,[t.h,t.k,t.x],null,null),(l()(),t.pb(71,0,[[1,0],["outChart",1]],0,0,"canvas",[],null,null,null,null,null)),(l()(),t.pb(72,0,null,0,2,"div",[["class","total"]],null,null,null,null,null)),(l()(),t.Ib(73,null,[""," \u20ac"])),t.Eb(74,2),(l()(),t.pb(75,0,null,0,15,"ion-slide",[],null,null,null,c.Fb,c.K)),t.ob(76,49152,null,0,d.nb,[t.h,t.k,t.x],null,null),(l()(),t.pb(77,0,null,0,13,"ion-card",[],null,null,null,c.cb,c.d)),t.ob(78,49152,null,0,d.m,[t.h,t.k,t.x],null,null),(l()(),t.pb(79,0,null,0,5,"ion-card-header",[],null,null,null,c.Z,c.f)),t.ob(80,49152,null,0,d.o,[t.h,t.k,t.x],null,null),(l()(),t.pb(81,0,null,0,3,"ion-card-title",[],null,null,null,c.bb,c.h)),t.ob(82,49152,null,0,d.q,[t.h,t.k,t.x],null,null),(l()(),t.pb(83,0,null,0,1,"strong",[],null,null,null,null,null)),(l()(),t.Ib(-1,null,["Entrate"])),(l()(),t.pb(85,0,null,0,5,"ion-card-content",[["class","card-chart"]],null,null,null,c.Y,c.e)),t.ob(86,49152,null,0,d.n,[t.h,t.k,t.x],null,null),(l()(),t.pb(87,0,[[2,0],["inChart",1]],0,0,"canvas",[],null,null,null,null,null)),(l()(),t.pb(88,0,null,0,2,"div",[["class","total"]],null,null,null,null,null)),(l()(),t.Ib(89,null,[""," \u20ac"])),t.Eb(90,2),(l()(),t.pb(91,0,null,0,9,"ion-slides",[["pager","false"]],null,null,null,c.Gb,c.L)),t.ob(92,49152,[[3,4],["listSlider",4]],0,d.ob,[t.h,t.k,t.x],{options:[0,"options"],pager:[1,"pager"]},null),(l()(),t.pb(93,0,null,0,3,"ion-slide",[],null,null,null,c.Fb,c.K)),t.ob(94,49152,null,0,d.nb,[t.h,t.k,t.x],null,null),(l()(),t.pb(95,0,null,0,1,"fb-categs-card-list",[["style","width:100%"]],null,[[null,"itemClicked"]],(function(l,n,u){var t=!0;return"itemClicked"===n&&(t=!1!==l.component.showCatMoviments(u)&&t),t}),s.c,s.b)),t.ob(96,49152,null,0,h.a,[],{categories:[0,"categories"]},{itemClicked:"itemClicked"}),(l()(),t.pb(97,0,null,0,3,"ion-slide",[],null,null,null,c.Fb,c.K)),t.ob(98,49152,null,0,d.nb,[t.h,t.k,t.x],null,null),(l()(),t.pb(99,0,null,0,1,"fb-categs-card-list",[["style","width:100%"]],null,[[null,"itemClicked"]],(function(l,n,u){var t=!0;return"itemClicked"===n&&(t=!1!==l.component.showCatMoviments(u)&&t),t}),s.c,s.b)),t.ob(100,49152,null,0,h.a,[],{categories:[0,"categories"]},{itemClicked:"itemClicked"})],(function(l,n){var u=n.component;l(n,6,0,"light"),l(n,16,0,null===u.yearlyBalance),l(n,18,0,null!==u.yearlyBalance),l(n,26,0,"4"),l(n,28,0,"success"),l(n,30,0,"arrow-up"),l(n,32,0,null===u.totalIn),l(n,34,0,null!==u.totalIn),l(n,36,0,"4"),l(n,38,0,"danger"),l(n,40,0,"arrow-down"),l(n,42,0,null===u.totalOutNoInv),l(n,44,0,null!==u.totalOutNoInv),l(n,46,0,"4"),l(n,48,0,"tertiary"),l(n,50,0,"trending-up-outline"),l(n,52,0,null===u.totalInv),l(n,54,0,null!==u.totalInv),l(n,56,0,"light"),l(n,58,0,u.chartSliderOpts,"true"),l(n,92,0,u.listSliderOpts,"false"),l(n,96,0,u.categoriesTotalOut),l(n,100,0,u.categoriesTotalIn)}),(function(l,n){var u=n.component,o=t.Jb(n,73,0,l(n,74,0,t.Bb(n,0),u.totalOut,"1.2"));l(n,73,0,o);var e=t.Jb(n,89,0,l(n,90,0,t.Bb(n,0),u.totalIn,"1.2"));l(n,89,0,e)}))}function P(l){return t.Kb(0,[(l()(),t.pb(0,0,null,null,1,"app-home",[],null,null,null,J,I)),t.ob(1,49152,null,0,k,[f.a,m.m],null,null)],null,null)}var T=t.lb("app-home",k,P,{},{},[]),S=u("s7LF"),K=u("eVLi");u.d(n,"HomePageModuleNgFactory",(function(){return N}));var N=t.mb(o,[],(function(l){return t.yb([t.zb(512,t.j,t.X,[[8,[e.a,a.a,i.a,r.a,s.a,b.a,T]],[3,t.j],t.v]),t.zb(4608,p.m,p.l,[t.s,[2,p.x]]),t.zb(4608,d.c,d.c,[t.x,t.g]),t.zb(4608,d.Eb,d.Eb,[d.c,t.j,t.p]),t.zb(4608,d.Jb,d.Jb,[d.c,t.j,t.p]),t.zb(4608,S.l,S.l,[]),t.zb(1073742336,p.b,p.b,[]),t.zb(1073742336,d.Bb,d.Bb,[]),t.zb(1073742336,S.k,S.k,[]),t.zb(1073742336,S.b,S.b,[]),t.zb(1073742336,m.o,m.o,[[2,m.t],[2,m.m]]),t.zb(1073742336,K.a,K.a,[]),t.zb(1073742336,o,o,[]),t.zb(1024,m.k,(function(){return[[{path:"",component:k}]]}),[])])}))}}]);
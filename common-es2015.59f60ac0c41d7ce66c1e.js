(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{A1CT:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var o=n("8Y7J");let a=(()=>{class t{download(t,e,n){const o=new Blob([t],{type:n});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(o,e);else{const t=document.createElement("a"),n=URL.createObjectURL(o);t.href=n,t.download=e,document.body.appendChild(t),t.click(),setTimeout(()=>{document.body.removeChild(t),window.URL.revokeObjectURL(n)},0)}}dateToISO(t){return t instanceof Date||(t=new Date(t)),t.toISOString()}hexToRgbA(t,e){let n;if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(t))return n=t.substring(1).split(""),3===n.length&&(n=[n[0],n[0],n[1],n[1],n[2],n[2]]),n="0x"+n.join(""),"rgba("+[n>>16&255,n>>8&255,255&n].join(",")+", "+e+")";throw new Error("Bad Hex")}}return t.ngInjectableDef=o.Ob({factory:function(){return new t},token:t,providedIn:"root"}),t})()},Dl6n:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return l})),n.d(e,"c",(function(){return o})),n.d(e,"d",(function(){return r}));const o=(t,e)=>null!==e.closest(t),a=t=>"string"==typeof t&&t.length>0?{"ion-color":!0,[`ion-color-${t}`]:!0}:void 0,l=t=>{const e={};return(t=>void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter(t=>null!=t).map(t=>t.trim()).filter(t=>""!==t):[])(t).forEach(t=>e[t]=!0),e},i=/^[a-z][a-z0-9+\-.]*:/,r=async(t,e,n)=>{if(null!=t&&"#"!==t[0]&&!i.test(t)){const o=document.querySelector("ion-router");if(o)return null!=e&&e.preventDefault(),o.push(t,n)}return!1}},TMBv:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));const o={bubbles:{dur:1e3,circles:9,fn:(t,e,n)=>{const o=`${t*e/n-t}ms`,a=2*Math.PI*e/n;return{r:5,style:{top:`${9*Math.sin(a)}px`,left:`${9*Math.cos(a)}px`,"animation-delay":o}}}},circles:{dur:1e3,circles:8,fn:(t,e,n)=>{const o=e/n,a=`${t*o-t}ms`,l=2*Math.PI*o;return{r:5,style:{top:`${9*Math.sin(l)}px`,left:`${9*Math.cos(l)}px`,"animation-delay":a}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(t,e)=>({r:6,style:{left:`${9-9*e}px`,"animation-delay":-110*e+"ms"}})},lines:{dur:1e3,lines:12,fn:(t,e,n)=>({y1:17,y2:29,style:{transform:`rotate(${30*e+(e<6?180:-180)}deg)`,"animation-delay":`${t*e/n-t}ms`}})},"lines-small":{dur:1e3,lines:12,fn:(t,e,n)=>({y1:12,y2:20,style:{transform:`rotate(${30*e+(e<6?180:-180)}deg)`,"animation-delay":`${t*e/n-t}ms`}})}}},Uch9:function(t,e,n){"use strict";n.d(e,"a",(function(){return v})),n.d(e,"b",(function(){return C})),n.d(e,"c",(function(){return b})),n.d(e,"d",(function(){return D})),n.d(e,"e",(function(){return l}));var o=n("54nT"),a=n("kBU6");const l=t=>new Promise((e,n)=>{Object(o.l)(()=>{i(t),r(t).then(n=>{n.animation&&n.animation.destroy(),s(t),e(n)},e=>{s(t),n(e)})})}),i=t=>{const e=t.enteringEl,n=t.leavingEl;y(e,n,t.direction),t.showGoBack?e.classList.add("can-go-back"):e.classList.remove("can-go-back"),D(e,!1),n&&D(n,!1)},r=async t=>{const e=await c(t);return e?u(e,t):d(t)},s=t=>{const e=t.leavingEl;t.enteringEl.classList.remove("ion-page-invisible"),void 0!==e&&e.classList.remove("ion-page-invisible")},c=async t=>{if(t.leavingEl&&t.animated&&0!==t.duration)return t.animationBuilder?t.animationBuilder:"ios"===t.mode?(await n.e(103).then(n.bind(null,"QtHV"))).iosTransitionAnimation:(await n.e(104).then(n.bind(null,"cmQl"))).mdTransitionAnimation},u=async(t,e)=>{await f(e,!0);const n=t(e.baseEl,e);m(e.enteringEl,e.leavingEl);const o=await g(n,e);return e.progressCallback&&e.progressCallback(void 0),o&&p(e.enteringEl,e.leavingEl),{hasCompleted:o,animation:n}},d=async t=>{const e=t.enteringEl,n=t.leavingEl;return await f(t,!1),m(e,n),p(e,n),{hasCompleted:!0}},f=async(t,e)=>{const n=(void 0!==t.deepWait?t.deepWait:e)?[v(t.enteringEl),v(t.leavingEl)]:[w(t.enteringEl),w(t.leavingEl)];await Promise.all(n),await h(t.viewIsReady,t.enteringEl)},h=async(t,e)=>{t&&await t(e)},g=(t,e)=>{const n=e.progressCallback,o=new Promise(e=>{t.onFinish(t=>e(1===t))});return n?(t.progressStart(!0),n(t)):t.play(),o},m=(t,e)=>{b(e,a.c),b(t,a.a)},p=(t,e)=>{b(t,a.b),b(e,a.d)},b=(t,e)=>{if(t){const n=new CustomEvent(e,{bubbles:!1,cancelable:!1});t.dispatchEvent(n)}},w=t=>t&&t.componentOnReady?t.componentOnReady():Promise.resolve(),v=async t=>{const e=t;if(e){if(null!=e.componentOnReady&&null!=await e.componentOnReady())return;await Promise.all(Array.from(e.children).map(v))}},D=(t,e)=>{e?(t.setAttribute("aria-hidden","true"),t.classList.add("ion-page-hidden")):(t.hidden=!1,t.removeAttribute("aria-hidden"),t.classList.remove("ion-page-hidden"))},y=(t,e,n)=>{void 0!==t&&(t.style.zIndex="back"===n?"99":"101"),void 0!==e&&(e.style.zIndex="100")},C=t=>t.classList.contains("ion-page")?t:t.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")||t},YtD4:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));const o=t=>{try{if("string"!=typeof t||""===t)return t;const e=document.createDocumentFragment(),n=document.createElement("div");e.appendChild(n),n.innerHTML=t,r.forEach(t=>{const n=e.querySelectorAll(t);for(let o=n.length-1;o>=0;o--){const t=n[o];t.parentNode?t.parentNode.removeChild(t):e.removeChild(t);const i=l(t);for(let e=0;e<i.length;e++)a(i[e])}});const o=l(e);for(let t=0;t<o.length;t++)a(o[t]);const i=document.createElement("div");i.appendChild(e);const s=i.querySelector("div");return null!==s?s.innerHTML:i.innerHTML}catch(e){return console.error(e),""}},a=t=>{if(t.nodeType&&1!==t.nodeType)return;for(let n=t.attributes.length-1;n>=0;n--){const e=t.attributes.item(n),o=e.name;if(!i.includes(o.toLowerCase())){t.removeAttribute(o);continue}const a=e.value;null!=a&&a.toLowerCase().includes("javascript:")&&t.removeAttribute(o)}const e=l(t);for(let n=0;n<e.length;n++)a(e[n])},l=t=>null!=t.children?t.children:t.childNodes,i=["class","id","href","src","name","slot"],r=["script","style","iframe","meta","link","object","embed"]},aILq:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n("mrSG"),a=n("8Y7J"),l=n("Ad8E"),i=n("MTcp");class r{constructor(t,e,n){this.popoverCtrl=t,this.changeDetector=e,this.ngZone=n,this.saveConfig=!0,this.changed=new a.m,this.currRange="",this.offset=0,this.startCustDate=null,this.endCustDate=null,this.monthsLabel=["GENNAIO","FEBBRAIO","MARZO","APRILE","MAGGIO","GIUGNO","LUGLIO","AGOSTO","SETTEMBRE","OTTOBRE","NOVEMBRE","DICEMBRE"],this.shortMonthsLabel=["GEN","FEB","MAR","APR","MAG","GIU","LUG","AGO","SET","OTT","NOV","DIC"],this.filterLabel="",this.filterIcon="",this.lastOnSwipe=Date.now()}ngOnInit(){if(this.initConfig)this.currRange=this.initConfig.range,this.offset=parseInt(this.initConfig.offset,10),this.startCustDate=new Date(this.initConfig.startCustDate)||null,this.endCustDate=new Date(this.initConfig.endCustDate)||null;else{let t=window.localStorage.getItem("fb-date-filter");t?(t=JSON.parse(t),this.currRange=t.range,this.offset=t.offset,this.startCustDate=new Date(t.startCustDate)||null,this.endCustDate=new Date(t.endCustDate)||null):(this.currRange="MONTH",this.offset=0,this.updateOnLocalStorage())}this.updateIconAndLabel(),Object(i.i)({el:document.querySelector(".date-toolbar"),threshold:45,gestureName:"swipe",onMove:t=>this.ngZone.run(()=>this.onSwipeHandler(t))}).enable()}onSwipeHandler(t){if("PERIOD"!==this.currRange){const e=Date.now();Math.abs(e-this.lastOnSwipe)>=100?(this.lastOnSwipe=Date.now(),t.startX-t.currentX<0?this.goPrev():this.goNext()):this.lastOnSwipe=Date.now()}}goPrev(){this.offset-=1,this.updateOnLocalStorage(),this.updateIconAndLabel()}goNext(){this.offset+=1,this.updateOnLocalStorage(),this.updateIconAndLabel()}updateIconAndLabel(){let t=new Date,e=new Date;switch(this.currRange){case"TODAY":this.filterIcon="today-outline",t=new Date,t.setHours(0,0,0),e=new Date,e.setHours(23,59,59),t.setTime(t.getTime()+1e3*this.offset*60*60*24),e.setTime(e.getTime()+1e3*this.offset*60*60*24),this.filterLabel=t.getDate()+" "+this.monthsLabel[t.getMonth()]+" "+t.getFullYear();break;case"WEEK":for(this.filterIcon="W",t=new Date,t.setHours(0,0,0);1!==t.getDay();)t.setTime(t.getTime()+-864e5);for(e=new Date,e.setHours(23,59,59);0!==e.getDay();)e.setTime(e.getTime()+864e5);t.setTime(t.getTime()+7*this.offset*1e3*60*60*24),e.setTime(e.getTime()+7*this.offset*1e3*60*60*24),this.filterLabel=t.getDate()+" ",t.getMonth()!==e.getMonth()&&(this.filterLabel+=this.shortMonthsLabel[t.getMonth()]),t.getFullYear()!==e.getFullYear()&&(this.filterLabel+=" "+t.getFullYear()),this.filterLabel+=" - "+e.getDate()+" "+this.shortMonthsLabel[e.getMonth()]+" "+e.getFullYear();break;case"MONTH":this.filterIcon="calendar-outline",t=new Date((new Date).getFullYear(),(new Date).getMonth(),1,0,0,0),t.setMonth(t.getMonth()+this.offset),e=new Date(t.getFullYear(),t.getMonth()+1,0),e.setHours(23,59,59),this.filterLabel=this.monthsLabel[t.getMonth()]+" "+t.getFullYear();break;case"YEAR":this.filterIcon="Y",t=new Date((new Date).getFullYear(),0,1,0,0,0),e=new Date((new Date).getFullYear(),11,31,23,59,59),t.setFullYear(t.getFullYear()+this.offset),e.setFullYear(e.getFullYear()+this.offset),e.setHours(23,59,59),this.filterLabel="ANNO "+t.getFullYear();break;case"PERIOD":this.filterIcon="P",t=this.startCustDate,e=this.endCustDate,t.setTime(t.getTime()+7*this.offset*1e3*60*60*24),e.setTime(e.getTime()+7*this.offset*1e3*60*60*24),this.filterLabel=t.getDate()+" ",t.getMonth()!==e.getMonth()&&(this.filterLabel+=this.shortMonthsLabel[t.getMonth()]),t.getFullYear()!==e.getFullYear()&&(this.filterLabel+=" "+t.getFullYear()),this.filterLabel+=" - "+e.getDate()+" "+this.shortMonthsLabel[e.getMonth()]+" "+e.getFullYear()}setTimeout(()=>{this.changed.emit({start:t,end:e,range:this.currRange,offset:this.offset})},1)}chooseDateInterval(){return o.a(this,void 0,void 0,(function*(){const t=yield this.popoverCtrl.create({component:l.a,componentProps:{range:this.currRange}});t.present(),t.onDidDismiss().then(t=>{t&&t.data&&(this.currRange=t.data.range,this.offset=t.data.offset?t.data.offset:0,t.data.startDate&&t.data.endDate&&(this.startCustDate=t.data.startDate,this.endCustDate=t.data.endDate),this.updateOnLocalStorage(),this.updateIconAndLabel())})}))}updateOnLocalStorage(){this.saveConfig&&window.localStorage.setItem("fb-date-filter",JSON.stringify({range:this.currRange,offset:this.offset,startCustDate:this.startCustDate,endCustDate:this.endCustDate}))}}},hrZj:function(t,e,n){"use strict";var o=n("8Y7J"),a=n("MKJQ"),l=n("sZkV"),i=n("SVse");n("aILq"),n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return d}));var r=o.nb({encapsulation:0,styles:[[".date-toolbar[_ngcontent-%COMP%]{background-color:var(--ion-color-primary);color:var(--ion-color-primary-contrast);padding:14px;margin-top:5px;margin-bottom:10px}.date-toolbar[_ngcontent-%COMP%]   .next[_ngcontent-%COMP%], .date-toolbar[_ngcontent-%COMP%]   .prev[_ngcontent-%COMP%]{font-size:18px;-webkit-transform:translateY(3px);transform:translateY(3px);position:relative;z-index:999}.date-toolbar[_ngcontent-%COMP%]   .current-date[_ngcontent-%COMP%]{text-align:center;font-size:15px;font-weight:700;-webkit-transform:translateY(-2px);transform:translateY(-2px);max-width:70%;overflow:hidden;margin:auto}.date-toolbar[_ngcontent-%COMP%]   .current-date[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%]{font-size:18px;-webkit-transform:translateY(3px);transform:translateY(3px)}.date-toolbar[_ngcontent-%COMP%]   .current-date[_ngcontent-%COMP%]   .text-ico[_ngcontent-%COMP%]{font-size:14px;font-weight:700;color:var(--ion-color-primary);background-color:#fff;width:18px;height:16px;line-height:18px;border-radius:4px;display:inline-block;margin-right:2px}.date-toolbar[_ngcontent-%COMP%]   .current-date[_ngcontent-%COMP%]   .caret[_ngcontent-%COMP%]{font-size:9px}"]],data:{}});function s(t){return o.Kb(0,[(t()(),o.pb(0,0,null,null,2,"div",[["class","ion-float-left prev"]],null,[[null,"click"]],(function(t,e,n){var o=!0;return"click"===e&&(o=!1!==t.component.goPrev()&&o),o}),null,null)),(t()(),o.pb(1,0,null,null,1,"ion-icon",[["name","chevron-back-outline"]],null,null,null,a.lb,a.q)),o.ob(2,49152,null,0,l.C,[o.h,o.k,o.x],{name:[0,"name"]},null)],(function(t,e){t(e,2,0,"chevron-back-outline")}),null)}function c(t){return o.Kb(0,[(t()(),o.pb(0,0,null,null,2,"div",[["class","ion-float-right next"]],null,[[null,"click"]],(function(t,e,n){var o=!0;return"click"===e&&(o=!1!==t.component.goNext()&&o),o}),null,null)),(t()(),o.pb(1,0,null,null,1,"ion-icon",[["name","chevron-forward-outline"]],null,null,null,a.lb,a.q)),o.ob(2,49152,null,0,l.C,[o.h,o.k,o.x],{name:[0,"name"]},null)],(function(t,e){t(e,2,0,"chevron-forward-outline")}),null)}function u(t){return o.Kb(0,[(t()(),o.pb(0,0,null,null,1,"span",[["class","text-ico"]],null,null,null,null,null)),(t()(),o.Ib(1,null,["",""]))],null,(function(t,e){t(e,1,0,e.component.filterIcon)}))}function d(t){return o.Kb(0,[(t()(),o.pb(0,0,null,null,12,"div",[["class","date-toolbar"]],null,null,null,null,null)),(t()(),o.eb(16777216,null,null,1,null,s)),o.ob(2,16384,null,0,i.k,[o.M,o.J],{ngIf:[0,"ngIf"]},null),(t()(),o.eb(16777216,null,null,1,null,c)),o.ob(4,16384,null,0,i.k,[o.M,o.J],{ngIf:[0,"ngIf"]},null),(t()(),o.pb(5,0,null,null,7,"div",[["class","current-date"]],null,[[null,"click"]],(function(t,e,n){var o=!0;return"click"===e&&(o=!1!==t.component.chooseDateInterval()&&o),o}),null,null)),(t()(),o.pb(6,0,null,null,1,"ion-icon",[["class","ico"]],null,null,null,a.lb,a.q)),o.ob(7,49152,null,0,l.C,[o.h,o.k,o.x],{name:[0,"name"]},null),(t()(),o.eb(16777216,null,null,1,null,u)),o.ob(9,16384,null,0,i.k,[o.M,o.J],{ngIf:[0,"ngIf"]},null),(t()(),o.Ib(10,null,[" "," "])),(t()(),o.pb(11,0,null,null,1,"ion-icon",[["class","caret"],["name","caret-down-outline"]],null,null,null,a.lb,a.q)),o.ob(12,49152,null,0,l.C,[o.h,o.k,o.x],{name:[0,"name"]},null)],(function(t,e){var n=e.component;t(e,2,0,"P"!=n.filterIcon),t(e,4,0,"P"!=n.filterIcon),t(e,7,0,o.tb(1,"",n.filterIcon,"")),t(e,9,0,1==n.filterIcon.length),t(e,12,0,"caret-down-outline")}),(function(t,e){t(e,10,0,e.component.filterLabel)}))}},m9yc:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return a}));const o=async(t,e,n,o,a)=>{if(t)return t.attachViewToDom(e,n,a,o);if("string"!=typeof n&&!(n instanceof HTMLElement))throw new Error("framework delegate is missing");const l="string"==typeof n?e.ownerDocument&&e.ownerDocument.createElement(n):n;return o&&o.forEach(t=>l.classList.add(t)),a&&Object.assign(l,a),e.appendChild(l),l.componentOnReady&&await l.componentOnReady(),l},a=(t,e)=>{if(e){if(t)return t.removeViewFromDom(e.parentElement,e);e.remove()}return Promise.resolve()}},opz7:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return l})),n.d(e,"c",(function(){return i})),n.d(e,"d",(function(){return o}));const o=()=>{const t=window.TapticEngine;t&&t.selection()},a=()=>{const t=window.TapticEngine;t&&t.gestureSelectionStart()},l=()=>{const t=window.TapticEngine;t&&t.gestureSelectionChanged()},i=()=>{const t=window.TapticEngine;t&&t.gestureSelectionEnd()}}}]);
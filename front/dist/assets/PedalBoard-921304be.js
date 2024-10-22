import{u as le,a as ge}from"./useFcbPedal-4fafcbd4.js";import{d as E,o as B,c as O,a as L,t as z,r as R,b as G,n as oe,e as W,f as _e,g as i,w as H,v as J,u as P,i as Q,F as N,h as q,j as xe,p as pe,k as ye,_ as ie,l as D,m as ne,q as ke,s as we,x as Be,y as A,z as re,A as F,B as se,C as $e}from"./index-13c9d12b.js";const ce=E({__name:"PedalButton",props:{button:{}},emits:["click"],setup(e,{emit:t}){const n=e;return(r,o)=>{var g,_,v;return B(),O("button",{class:oe(["text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-gray-700 dark:border-gray-700",{"bg-cyan-800 hover:bg-cyan-900":(g=n.button)==null?void 0:g.enabled,"bg-gray-700 hover:bg-gray-800":!((_=n.button)!=null&&_.enabled)}]),onClick:o[0]||(o[0]=b=>{var m;return t("click",(m=n.button)!=null?m:void 0)})},[L(z((v=n.button)==null?void 0:v.name)+" ",1),r.$slots.default?R(r.$slots,"default",{key:0}):G("",!0)],2)}}}),U=e=>(pe("data-v-821e999c"),e=e(),ye(),e),Oe={class:"config-modal h-full rounded-lg border dark:border-gray-600 shadow-xl bg-transparent"},Ie=U(()=>i("div",{class:"flex flex-row justify-between p-6 dark:bg-gray-800 border-b dark:text-gray-100 dark:border-gray-700 rounded-tl-lg rounded-tr-lg"},[i("p",{class:"font-semibold"},"Add a step"),i("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})])],-1)),Me={class:"flex flex-col px-6 py-5 dark:bg-gray-900 overflow-y-auto"},Ce={class:"w-full"},Se=U(()=>i("label",{for:"midi-input",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"Pedal Midi input",-1)),Pe=["value"],De={class:"w-full"},Ae=U(()=>i("label",{for:"midi-output",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"Pedal midi output",-1)),je=["value"],ze={class:"w-full"},Fe=U(()=>i("label",{for:"midi-input",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"DAW midi input",-1)),Ve=["value"],Ne={class:"w-full"},Ee=U(()=>i("label",{for:"midi-output",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"DAW midi output",-1)),Le=["value"],We=xe('<hr data-v-821e999c><div class="flex items-center mt-5 mb-3 space-x-4" data-v-821e999c><input class="inline-flex rounded-full" type="checkbox" id="check1" name="check1" data-v-821e999c><label class="inline-flex font-semibold dark:text-white" for="check1" data-v-821e999c> Add a crew</label><br data-v-821e999c><input class="inline-flex" type="checkbox" id="check2" name="check2" checked data-v-821e999c><label class="inline-flex font-semibold text-blue-300" for="check2" data-v-821e999c> Add a specific agent</label><br data-v-821e999c></div><div class="flex flex-row items-center justify-between p-5 dark:bg-gray-800 border border-gray-200 rounded shadow-sm" data-v-821e999c><div class="flex flex-row items-center" data-v-821e999c><img class="w-10 h-10 mr-3 rounded-full" src="https://randomuser.me/api/portraits/lego/7.jpg" alt="" data-v-821e999c><div class="flex flex-col" data-v-821e999c><p class="font-semibold dark:text-gray-100" data-v-821e999c>Xu Lin Bashir</p><p class="text-gray-200" data-v-821e999c>table.co</p></div></div><h1 class="font-semibold text-red-300" data-v-821e999c>Remove</h1></div>',3),Re=U(()=>i("div",{class:"flex flex-row items-center justify-between p-5 dark:bg-gray-800 border-t dark:border-gray-700 rounded-bl-lg rounded-br-lg"},[i("p",{class:"font-semibold dark:text-gray-200"},"Cancel"),i("button",{class:"px-4 py-2 text-white font-semibold bg-blue-500 rounded"}," Save ")],-1)),Ue=E({__name:"ConfigModal",setup(e,{expose:t}){const n=W(null),{dawMidiOutput:r,midiOutputs:o,dawMidiInput:g,pedalMidiOutput:_,pedalMidiInput:v,midiInputs:b}=le(),m=async()=>{var h;(h=n.value)==null||h.showModal()};return _e(()=>{var h;(h=n.value)==null||h.addEventListener("click",function(x){var y;x.target===n.value&&((y=n.value)==null||y.close())})}),t({open:m,close:()=>{var h;(h=n.value)==null||h.close()}}),(h,x)=>(B(),O("dialog",{ref_key:"dialog",ref:n,class:"w-2/3 h-full overflow-y-hidden backdrop:backdrop-blur-md bg-transparent p-0"},[i("div",Oe,[Ie,i("div",Me,[i("div",Ce,[Se,H(i("select",{class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500","onUpdate:modelValue":x[0]||(x[0]=y=>Q(v)?v.value=y:null)},[(B(!0),O(N,null,q(P(b),y=>(B(),O("option",{key:y,value:y},z(y.name),9,Pe))),128))],512),[[J,P(v)]])]),i("div",De,[Ae,H(i("select",{class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500","onUpdate:modelValue":x[1]||(x[1]=y=>Q(_)?_.value=y:null)},[(B(!0),O(N,null,q(P(o),y=>(B(),O("option",{key:y,value:y},z(y.name),9,je))),128))],512),[[J,P(_)]])]),i("div",ze,[Fe,H(i("select",{class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500","onUpdate:modelValue":x[2]||(x[2]=y=>Q(g)?g.value=y:null)},[(B(!0),O(N,null,q(P(b),y=>(B(),O("option",{key:y,value:y},z(y.name),9,Ve))),128))],512),[[J,P(g)]])]),i("div",Ne,[Ee,H(i("select",{class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500","onUpdate:modelValue":x[3]||(x[3]=y=>Q(r)?r.value=y:null)},[(B(!0),O(N,null,q(P(o),y=>(B(),O("option",{key:y,value:y},z(y.name),9,Le))),128))],512),[[J,P(r)]])]),We]),Re])],512))}});const Te=ie(Ue,[["__scopeId","data-v-821e999c"]]),Ke={},qe={class:"max-w-2xl mx-auto h-full"},Ge={class:"w-64 h-full","aria-label":"Sidebar"},Xe={class:"px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800 h-full"},Ze={class:"space-y-2"};function He(e,t){return B(),O("div",qe,[i("aside",Ge,[i("div",Xe,[i("ul",Ze,[R(e.$slots,"default")])])])])}const Je=ie(Ke,[["render",He]]);function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ue(Object(n),!0).forEach(function(r){C(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function ee(e){"@babel/helpers - typeof";return ee=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ee(e)}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Qe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,g;for(g=0;g<r.length;g++)o=r[g],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function Ye(e,t){if(e==null)return{};var n=Qe(e,t),r,o;if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(e);for(o=0;o<g.length;o++)r=g[o],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var ea=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},me={exports:{}};(function(e){(function(t){var n=function(s,c,M){if(!m(c)||h(c)||x(c)||y(c)||b(c))return c;var S,V=0,Z=0;if(I(c))for(S=[],Z=c.length;V<Z;V++)S.push(n(s,c[V],M));else{S={};for(var K in c)Object.prototype.hasOwnProperty.call(c,K)&&(S[s(K,M)]=n(s,c[K],M))}return S},r=function(s,c){c=c||{};var M=c.separator||"_",S=c.split||/(?=[A-Z])/;return s.split(S).join(M)},o=function(s){return ae(s)?s:(s=s.replace(/[\-_\s]+(.)?/g,function(c,M){return M?M.toUpperCase():""}),s.substr(0,1).toLowerCase()+s.substr(1))},g=function(s){var c=o(s);return c.substr(0,1).toUpperCase()+c.substr(1)},_=function(s,c){return r(s,c).toLowerCase()},v=Object.prototype.toString,b=function(s){return typeof s=="function"},m=function(s){return s===Object(s)},I=function(s){return v.call(s)=="[object Array]"},h=function(s){return v.call(s)=="[object Date]"},x=function(s){return v.call(s)=="[object RegExp]"},y=function(s){return v.call(s)=="[object Boolean]"},ae=function(s){return s=s-0,s===s},T=function(s,c){var M=c&&"process"in c?c.process:c;return typeof M!="function"?s:function(S,V){return M(S,s,V)}},X={camelize:o,decamelize:_,pascalize:g,depascalize:_,camelizeKeys:function(s,c){return n(T(o,c),s)},decamelizeKeys:function(s,c){return n(T(_,c),s,c)},pascalizeKeys:function(s,c){return n(T(g,c),s)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=X:t.humps=X})(ea)})(me);var aa=me.exports,ta=["class","style"];function na(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var r=n.indexOf(":"),o=aa.camelize(n.slice(0,r)),g=n.slice(r+1).trim();return t[o]=g,t},{})}function ra(e){return e.split(/\s+/).reduce(function(t,n){return t[n]=!0,t},{})}function he(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var r=(e.children||[]).map(function(b){return he(b)}),o=Object.keys(e.attributes||{}).reduce(function(b,m){var I=e.attributes[m];switch(m){case"class":b.class=ra(I);break;case"style":b.style=na(I);break;default:b.attrs[m]=I}return b},{attrs:{},class:{},style:{}});n.class;var g=n.style,_=g===void 0?{}:g,v=Ye(n,ta);return Be(e.tag,j(j(j({},t),{},{class:o.class,style:j(j({},o.style),_)},o.attrs),v),r)}var ve=!1;try{ve=!0}catch{}function sa(){if(!ve&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function te(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?C({},e,t):{}}function la(e){var t,n=(t={"fa-spin":e.spin,"fa-pulse":e.pulse,"fa-fw":e.fixedWidth,"fa-border":e.border,"fa-li":e.listItem,"fa-inverse":e.inverse,"fa-flip":e.flip===!0,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both"},C(t,"fa-".concat(e.size),e.size!==null),C(t,"fa-rotate-".concat(e.rotation),e.rotation!==null),C(t,"fa-pull-".concat(e.pull),e.pull!==null),C(t,"fa-swap-opacity",e.swapOpacity),C(t,"fa-bounce",e.bounce),C(t,"fa-shake",e.shake),C(t,"fa-beat",e.beat),C(t,"fa-fade",e.fade),C(t,"fa-beat-fade",e.beatFade),C(t,"fa-flash",e.flash),C(t,"fa-spin-pulse",e.spinPulse),C(t,"fa-spin-reverse",e.spinReverse),t);return Object.keys(n).map(function(r){return n[r]?r:null}).filter(function(r){return r})}function de(e){if(e&&ee(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(ne.icon)return ne.icon(e);if(e===null)return null;if(ee(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}var be=E({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(t){return[!0,!1,"horizontal","vertical","both"].indexOf(t)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(t){return["right","left"].indexOf(t)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(t){return[90,180,270].indexOf(Number.parseInt(t,10))>-1}},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(t)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1}},setup:function(t,n){var r=n.attrs,o=D(function(){return de(t.icon)}),g=D(function(){return te("classes",la(t))}),_=D(function(){return te("transform",typeof t.transform=="string"?ne.transform(t.transform):t.transform)}),v=D(function(){return te("mask",de(t.mask))}),b=D(function(){return ke(o.value,j(j(j(j({},g.value),_.value),v.value),{},{symbol:t.symbol,title:t.title}))});we(b,function(I){if(!I)return sa("Could not find one or more icon(s)",o.value,v.value)},{immediate:!0});var m=D(function(){return b.value?he(b.value.abstract[0],{},r):null});return function(){return m.value}}});const oa={href:"#",class:"flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"},ia={class:"ml-3"},Y=E({__name:"SideBarOption",props:{icon:{}},setup(e){const t=e;return(n,r)=>(B(),O("li",null,[i("a",oa,[A(P(be),{icon:t.icon,class:"w-5 h-5 dark:text-gray-400"},null,8,["icon"]),i("span",ia,[R(n.$slots,"default")])])]))}}),ca=e=>(pe("data-v-f31d3fe7"),e=e(),ye(),e),ua={class:"preset-bar grid grid-cols-[1fr_auto] p-8"},da={class:"buttons"},fa=ca(()=>i("hr",{class:"border-gray-400"},null,-1)),ga=E({__name:"MainLayout",setup(e){const{pedalMidiOutput:t,pedalMidiInput:n}=le(),{exportFcb:r,banks:o,hasDirectBank:g}=ge(n,t),_=W(null),v=W(!1),b=W({"pedal-board--side-bar-open":v});return(m,I)=>(B(),O(N,null,[i("div",{class:oe(["pedal-board",b.value])},[i("div",ua,[R(m.$slots,"top-bar",{},void 0,!0),i("button",{class:"config-icon justify-self-end self-start",onClick:I[0]||(I[0]=h=>v.value=!v.value)},[A(P(be),{size:"xl",icon:"fa-solid fa-bars"})])]),i("div",da,[R(m.$slots,"buttons",{},void 0,!0)]),v.value?(B(),re(Je,{key:0,class:"side-bar"},{default:F(()=>[A(Y,{icon:"grip"},{default:F(()=>[L(" Pedal Board ")]),_:1}),A(Y,{icon:"vial-circle-check"},{default:F(()=>[L(" Simulator ")]),_:1}),A(Y,{icon:"clipboard",onClick:P(r)},{default:F(()=>[L(" UnO2 To Clipboard ")]),_:1},8,["onClick"]),fa,A(Y,{icon:"cog",onClick:I[1]||(I[1]=h=>{var x;return(x=_.value)==null?void 0:x.open()})},{default:F(()=>[L(" Config ")]),_:1})]),_:1})):G("",!0)],2),A(Te,{ref_key:"configModal",ref:_},null,512)],64))}});const pa=ie(ga,[["__scopeId","data-v-f31d3fe7"]]),ya={class:"absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center h-full"},ma={class:"text-xs text-gray-100"},ha={class:"text-xs text-gray-100"},fe=E({__name:"SweepPedal",props:{sweep:{}},setup(e){const t=e,n=D(()=>{var g,_;return(g=t.sweep)!=null&&g.value&&((_=t.sweep)==null?void 0:_.value)>-1?(t.sweep.value-t.sweep.min)/(t.sweep.max-t.sweep.min)*100:null}),r=D(()=>`height: ${n.value||0}%;`),o=D(()=>({"bg-gray-800":t.sweep===void 0}));return(g,_)=>{var v;return B(),O("button",{class:oe(["text-white flex flex-col-reverse w-32 relative focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mr-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700 bg-gray-700",o.value])},[i("div",ya,[i("div",ma,z((v=t.sweep)==null?void 0:v.name),1),i("div",ha,z(n.value!==null?`${n.value.toFixed(0)}%`:""),1)]),g.sweep?(B(),O("div",{key:0,class:"bg-cyan-800 from-indigo-500 via-purple-500 to-pink-500 w-full rounded-lg px-5 py-2.5",style:se(r.value)},[g.$slots.default?R(g.$slots,"default",{key:0}):G("",!0)],4)):G("",!0)],2)}}}),va={class:"preset-bar grid grid-cols-[1fr_auto]"},ba={class:"text-4xl justify-self-center"},_a={class:"h-full grid grid-cols-[1fr_auto] gap-4"},xa={class:"h-full grid-layout grid grid-cols-6 gap-4 p-4"},ka={class:"h-full grid-layout grid grid-cols-2 gap-4 p-4"},$a=E({__name:"PedalBoard",async setup(e){let t,n;const{dawMidiOutput:r,pedalMidiOutput:o,pedalMidiInput:g,onPedalEvent:_,onDawEvent:v,getRawMidiMessage:b}=([t,n]=$e(()=>le()),t=await t,n(),t),{banks:m,hasDirectBank:I}=ge(g,o),h=W(1),x=D(()=>m[h.value]),y=W([]),ae=D(()=>I&&h.value===0?[...x.value.buttons,{name:"Return to previous bank",type:"returnToPreviousBank"}]:I&&h.value>0?[...x.value.buttons,{name:"Go to Looper",type:"goToDirectBank"}]:x.value.buttons),T=a=>{var l;(l=o.value)==null||l.channels[16].sendProgramChange(a)},X=()=>{var l;const a=m[0].name==="Direct Bank";h.value<m.length-1?h.value++:h.value=a?1:0,(l=o.value)==null||l.channels[16].sendProgramChange(15)},s=()=>{var l;const a=m[0].name==="Direct Bank";h.value>1&&a||h.value>0&&!a?h.value--:h.value=m.length-1,(l=o.value)==null||l.channels[16].sendProgramChange(14)},c=(a,l)=>{var k,p,u;a.type==="effect"&&l.rawValue!==void 0&&(a.enabled=l.rawValue>0,console.log(`Button ${a.name} is now ${l.rawValue>0?"enabled":"disabled"}`,l),(!a.onMessages||!a.offMessages)&&(console.log(`Button has no on/off messages, sending CC message to daw output controller ${a.controller} with value ${l.rawValue}`),(k=r.value)==null||k.channels[a.channel].sendControlChange(a.controller,l.rawValue)),a.onMessages&&a.enabled&&(console.log("Sending on messages",a.onMessages),a.onMessages.forEach(d=>{var f;(f=r.value)==null||f.channels[a.channel].send(b(d))})),a.offMessages&&!a.enabled&&(console.log("Sending off messages",a.offMessages),a.offMessages.forEach(d=>{var f;(f=r.value)==null||f.channels[a.channel].send(b(d))})),a.sweeps&&a.sweeps.forEach(d=>{y.value[d.pedal-1]=a.enabled?d:void 0})),a.type==="trigger"&&l.rawValue!==void 0&&(a.enabled=l.rawValue>0,a.controller&&typeof l.value=="number"&&((p=r.value)==null||p.channels[a.channel].sendControlChange(a.controller,l.value)),a.onMessages&&a.onMessages.forEach(d=>{var f;(f=r.value)==null||f.channels[a.channel].send(b(d))}),a.offMessages&&a.offMessages.forEach(d=>{var f;(f=r.value)==null||f.channels[a.channel].send(b(d))})),a.type==="program"&&(m[h.value].buttons.forEach((d,f)=>{d.type==="program"&&(m[h.value].buttons[f].enabled=a===d)}),(u=r.value)==null||u.channels[a.channel].sendControlChange(a.controller,127),a.messages&&a.messages.forEach(d=>{var f;(f=r.value)==null||f.channels[a.channel].send(b(d))}))};function M(a,l,k=["effect","trigger","program"]){return m.findIndex(p=>p.buttons.find(u=>k.includes(u.type)&&"controller"in u&&u.controller===a&&u.channel===l)||p.buttons.find(u=>u.sweeps&&u.sweeps.find(d=>d.controller===a&&d.channel===l)))}function S(a,l,k){let p=-1;const u=m.findIndex(d=>{const f=d.buttons.findIndex(w=>(w.type==="effect"||w.type==="trigger")&&w.controller===a&&w.channel===l);if(f>-1)return p=f,!0});return u>-1?{bankIndex:u,buttonIndex:p,enableButton:k>0}:null}function V(a,l,k){let p=-1;const u=m.findIndex(d=>{const f=d.buttons.findIndex(w=>(w.type==="effect"||w.type==="trigger")&&w.onMessages&&w.onMessages.find($=>$.controller===a&&$.channel===l));if(f>-1)return p=f,!0});return u>-1?{bankIndex:u,buttonIndex:p,enableButton:!0}:null}function Z(a,l,k){let p=-1;const u=m.findIndex(d=>{const f=d.buttons.findIndex(w=>(w.type==="effect"||w.type==="trigger")&&w.offMessages&&w.offMessages.find($=>$.controller===a&&$.channel===l));if(f>-1)return p=f,!0});return u>-1?{bankIndex:u,buttonIndex:p,enableButton:!1}:null}function K(a,l,k){const p=S(a,l,k);if(p)return p;const u=V(a,l);if(u)return u;const d=Z(a,l);return d||null}return _(a=>{var p;const l=a.message.dataBytes[0],k=M(l,a.message.channel);if(console.log(`event with ${l} on channel ${a.message.channel} with value ${a.message.dataBytes[1]}`),a.message.channel===15&&(h.value=a.message.dataBytes[0]),a.message.type==="programchange"&&k>-1){const u=m[k].buttons.find(d=>d.type==="program"&&d.controller===l&&d.channel===a.message.channel);u&&c(u,a)}if(a.message.type==="controlchange"&&k>-1){const u=a.message.dataBytes[0],d=M(u,a.message.channel,["effect","trigger"]),f=m[d].buttons.find($=>($.type==="effect"||$.type==="trigger")&&$.controller===u&&$.channel===a.message.channel),w=m[d].buttons.flatMap($=>$.sweeps).find($=>($==null?void 0:$.controller)===u&&$.channel===a.message.channel);f&&(console.log("found button"),c(f,a)),w&&(w.value=a.message.dataBytes[1]),!f&&!w&&(console.log(`No handler for midi. Sending control change ${u} with value ${a.message.dataBytes[1]} to DAW`),(p=r.value)==null||p.channels[a.message.channel].sendControlChange(u,a.message.dataBytes[1]))}}),v(a=>{var l;if(console.log(`DAW sent ${a.message.type} on channel ${a.message.channel} for controller ${a.message.dataBytes[0]} with value ${a.message.dataBytes[1]}`),a.message.type==="controlchange"){const k=a.message.dataBytes[0],{bankIndex:p,buttonIndex:u,enableButton:d}=K(k,a.message.channel,a.message.dataBytes[1]),f=m[p].buttons[u];if(f)if(h.value===p){const w=a.message.dataBytes[1]>0;f.type==="effect"&&f.enabled!==w&&((l=o.value)==null||l.channels[16].sendProgramChange(u))}else f.enabled=d,console.warn(`Received from DAW an event type ${a.type} with channel ${a.message.channel}, controller ${k} and value ${a.message.dataBytes[1]}. Button ${f.name} is not in the current bank`);else throw new Error(`Button not found for channel ${a.message.channel} controller ${a.message.dataBytes[0]}`)}console.log(`DAW sent ${a.message.type} on channel ${a.message.channel} for controller ${a.message.dataBytes[0]} with value ${a.message.dataBytes[1]}`)}),(a,l)=>(B(),re(pa,null,{"top-bar":F(()=>[i("div",va,[i("span",ba,z(x.value.name),1)])]),buttons:F(()=>[i("div",_a,[i("div",xa,[(B(!0),O(N,null,q(ae.value,(k,p)=>(B(),O(N,{key:k.name},[A(ce,{style:se({order:p<5?p+6:p-6}),button:k,onClick:u=>T(p)},null,8,["style","button","onClick"]),p===4||p===9?(B(),re(ce,{key:0,style:se({order:p+1}),onClick:u=>p===4?X():s()},{default:F(()=>[L(z(p===4?"Up":"Down"),1)]),_:2},1032,["style","onClick"])):G("",!0)],64))),128))]),i("div",ka,[A(fe,{sweep:y.value[0]},null,8,["sweep"]),A(fe,{sweep:y.value[1]},null,8,["sweep"])])])]),_:1}))}});export{$a as default};

import{_ as ye,E as _e}from"./Ckh4Vg3s.js";import{_ as $e}from"./DVWupxGx.js";import{g as ue,C as be,E as pe,i as me,j as L,o as f,p as B,w as D,c as y,F as C,a as t,t as u,b as r,m as e,I as le,v as X,q as N,r as Q,f as T,_ as ke,L as Ve,J as xe,D as Ee,h as we,z as Ue,n as se,d as re,M as Ce,N as Me}from"./B2JkDLO_.js";import{C as z}from"./DzMWEpI4.js";import{u as qe}from"./CB9b7Iub.js";import{u as Te}from"./--20hfBe.js";import{u as Se}from"./CaQrBqMy.js";import"./CARqcS45.js";const ze={key:0,class:"kb-dialog-body"},Ne={class:"kb-field"},Ie={class:"kb-field"},Le={class:"kb-field"},Re={class:"kb-field"},Oe={class:"kb-row"},De={class:"kb-field"},He={class:"kb-field"},Ae={class:"kb-field"},Be={class:"kb-field"},We={class:"kb-field"},Pe={class:"kb-items"},je={class:"kb-field"},Fe={class:"kb-field"},Je={class:"kb-row"},Ke={class:"kb-field"},Ge={class:"kb-field"},Ye={class:"kb-field"},Xe={class:"kb-field"},Qe={class:"kb-field"},Ze={class:"kb-row"},el={class:"kb-field"},ll={class:"kb-field"},tl={key:4,class:"kb-field"},nl={class:"kb-row"},ol={class:"kb-field"},al={class:"kb-field"},il={class:"kb-note"},sl={key:6,class:"kb-field"},rl={class:"kb-row"},dl={class:"kb-field"},cl={class:"kb-field"},ul={class:"kb-field"},bl={class:"kb-field"},pl={class:"kb-field"},ml={class:"kb-field"},kl={class:"kb-items"},gl={class:"kb-field"},fl={class:"kb-field"},vl={class:"kb-field"},hl={class:"kb-field"},yl={class:"kb-field"},_l={class:"kb-items"},$l={class:"kb-field"},Vl={key:0,class:"kb-field"},xl={class:"kb-items"},El=["src"],wl={class:"kb-row"},Ul={class:"kb-field"},Cl={class:"kb-field"},Ml={class:"kb-field"},ql={class:"kb-row"},Tl={class:"kb-field"},Sl={class:"kb-field"},zl={class:"kb-field"},Nl={class:"kb-field"},Il={class:"kb-checkline"},Ll={class:"kb-field"},Rl={class:"kb-items"},Ol={class:"kb-field"},Dl={class:"kb-field"},Hl={class:"kb-note"},Al=ue({__name:"BlockWidgetDialog",props:{visible:{type:Boolean},type:{},data:{}},emits:["update:visible","save","delete","duplicate"],setup(l,{emit:s}){const k=l,g=s,{t:p}=be(),x=pe().public.photoUrl||"",i=Q({});me(()=>k.visible,a=>{a&&k.data&&(i.value=JSON.parse(JSON.stringify(k.data)))});const _=T(()=>k.type?`${p("blockEditor.editWidget")} — ${p("blockEditor."+k.type)}`:p("blockEditor.editWidget")),P=T(()=>[{label:p("blockEditor.left"),value:"left"},{label:p("blockEditor.center"),value:"center"},{label:p("blockEditor.right"),value:"right"}]),te=T(()=>[{label:p("blockEditor.primary"),value:"primary"},{label:p("blockEditor.outline"),value:"outline"}]),R=T(()=>[{label:p("blockEditor.checkMark"),value:"check"},{label:p("blockEditor.crossMark"),value:"cross"}]),j=T(()=>[{label:p("blockEditor.solid"),value:"solid"},{label:p("blockEditor.dashed"),value:"dashed"},{label:p("blockEditor.dotted"),value:"dotted"}]),v=T(()=>[{label:"2",value:2},{label:"3",value:3},{label:"4",value:4}]),M=T(()=>[{label:p("blockEditor.info"),value:"info"},{label:p("blockEditor.success"),value:"success"},{label:p("blockEditor.warning"),value:"warning"},{label:p("blockEditor.danger"),value:"danger"}]),F=T(()=>[{label:p("blockEditor.phone"),value:"phone"},{label:p("blockEditor.email"),value:"email"},{label:p("blockEditor.address"),value:"address"},{label:p("blockEditor.hours"),value:"hours"}]),H=()=>i.value.items.push({label:"",checked:!1}),ne=a=>i.value.items.splice(a,1),Z=()=>i.value.items.push({number:"",label:""}),A=a=>i.value.items.splice(a,1),E=()=>i.value.items.push({type:"phone",value:""}),w=a=>i.value.items.splice(a,1),oe=()=>i.value.items.push({q:"",a:""}),ae=a=>i.value.items.splice(a,1),J=a=>a?x&&a.startsWith(x)?[a.slice(x.length)]:[]:[],K=a=>a&&a[0]?x+a[0]:"",G=T({get:()=>J(i.value.imageUrl),set:a=>{i.value.imageUrl=K(a)}}),Y=T({get:()=>J(i.value.url),set:a=>{i.value.url=K(a)}}),W=T({get:()=>J(i.value.avatarUrl),set:a=>{i.value.avatarUrl=K(a)}}),d=T({get:()=>(i.value.images||[]).map(a=>{const o=a.url||"";return x&&o.startsWith(x)?o.slice(x.length):o}),set:a=>{const o=new Map((i.value.images||[]).map(b=>[b.url,b.alt]));i.value.images=(a||[]).map(b=>{const U=x+b;return{url:U,alt:o.has(U)?o.get(U):""}})}}),c=a=>i.value.images.splice(a,1),$=()=>g("save",JSON.parse(JSON.stringify(i.value)));return(a,o)=>{const b=L("InputText"),U=L("Textarea"),O=$e,S=L("Dropdown"),I=L("Checkbox"),h=L("Button"),ee=L("Dialog");return f(),B(ee,{visible:l.visible,"onUpdate:visible":o[46]||(o[46]=n=>a.$emit("update:visible",n)),header:e(_),modal:!0,style:{width:"640px",maxWidth:"95vw"},dismissableMask:!1,class:"kb-dialog"},{footer:D(()=>[r(h,{label:a.$t("blockEditor.duplicate"),icon:"pi pi-clone",severity:"secondary",outlined:"",onClick:o[43]||(o[43]=n=>a.$emit("duplicate"))},null,8,["label"]),r(h,{label:a.$t("blockEditor.delete"),icon:"pi pi-trash",severity:"danger",outlined:"",onClick:o[44]||(o[44]=n=>a.$emit("delete"))},null,8,["label"]),r(h,{label:a.$t("common.cancel"),icon:"pi pi-times",outlined:"",onClick:o[45]||(o[45]=n=>a.$emit("update:visible",!1))},null,8,["label"]),r(h,{label:a.$t("common.save"),icon:"pi pi-check",onClick:$},null,8,["label"])]),default:D(()=>[l.type?(f(),y("div",ze,[l.type==="card"?(f(),y(C,{key:0},[t("div",Ne,[t("label",null,u(a.$t("blockEditor.title")),1),r(b,{modelValue:e(i).title,"onUpdate:modelValue":o[0]||(o[0]=n=>e(i).title=n)},null,8,["modelValue"])]),t("div",Ie,[t("label",null,u(a.$t("blockEditor.text")),1),r(U,{modelValue:e(i).text,"onUpdate:modelValue":o[1]||(o[1]=n=>e(i).text=n),rows:"3",autoResize:""},null,8,["modelValue"])]),t("div",Le,[t("label",null,u(a.$t("blockEditor.imageUrl")),1),r(b,{modelValue:e(i).imageUrl,"onUpdate:modelValue":o[2]||(o[2]=n=>e(i).imageUrl=n),placeholder:a.$t("blockEditor.imageUrl")},null,8,["modelValue","placeholder"]),r(O,{modelValue:e(G),"onUpdate:modelValue":o[3]||(o[3]=n=>le(G)?G.value=n:null),multiple:!1},null,8,["modelValue"])]),t("div",Re,[t("label",null,u(a.$t("blockEditor.altText")),1),r(b,{modelValue:e(i).imageAlt,"onUpdate:modelValue":o[4]||(o[4]=n=>e(i).imageAlt=n)},null,8,["modelValue"])]),t("div",Oe,[t("div",De,[t("label",null,u(a.$t("blockEditor.linkUrl")),1),r(b,{modelValue:e(i).linkUrl,"onUpdate:modelValue":o[5]||(o[5]=n=>e(i).linkUrl=n)},null,8,["modelValue"])]),t("div",He,[t("label",null,u(a.$t("blockEditor.linkLabel")),1),r(b,{modelValue:e(i).linkLabel,"onUpdate:modelValue":o[6]||(o[6]=n=>e(i).linkLabel=n)},null,8,["modelValue"])])])],64)):l.type==="checkbox"?(f(),y(C,{key:1},[t("div",Ae,[t("label",null,u(a.$t("blockEditor.title")),1),r(b,{modelValue:e(i).title,"onUpdate:modelValue":o[7]||(o[7]=n=>e(i).title=n)},null,8,["modelValue"])]),t("div",Be,[t("label",null,u(a.$t("blockEditor.style")),1),r(S,{modelValue:e(i).style,"onUpdate:modelValue":o[8]||(o[8]=n=>e(i).style=n),options:e(R),optionLabel:"label",optionValue:"value"},null,8,["modelValue","options"])]),t("div",We,[t("label",null,u(a.$t("blockEditor.items")),1),t("div",Pe,[(f(!0),y(C,null,X(e(i).items,(n,q)=>(f(),y("div",{key:q,class:"kb-item"},[r(I,{modelValue:n.checked,"onUpdate:modelValue":V=>n.checked=V,binary:!0},null,8,["modelValue","onUpdate:modelValue"]),r(b,{modelValue:n.label,"onUpdate:modelValue":V=>n.label=V,placeholder:a.$t("blockEditor.label")},null,8,["modelValue","onUpdate:modelValue","placeholder"]),r(h,{icon:"pi pi-times",text:"",severity:"danger",onClick:V=>ne(q)},null,8,["onClick"])]))),128))]),r(h,{label:a.$t("blockEditor.addItem"),icon:"pi pi-plus",size:"small",outlined:"",onClick:H},null,8,["label"])])],64)):l.type==="button"?(f(),y(C,{key:2},[t("div",je,[t("label",null,u(a.$t("blockEditor.linkLabel")),1),r(b,{modelValue:e(i).label,"onUpdate:modelValue":o[9]||(o[9]=n=>e(i).label=n)},null,8,["modelValue"])]),t("div",Fe,[t("label",null,u(a.$t("blockEditor.linkUrl")),1),r(b,{modelValue:e(i).url,"onUpdate:modelValue":o[10]||(o[10]=n=>e(i).url=n)},null,8,["modelValue"])]),t("div",Je,[t("div",Ke,[t("label",null,u(a.$t("blockEditor.variant")),1),r(S,{modelValue:e(i).variant,"onUpdate:modelValue":o[11]||(o[11]=n=>e(i).variant=n),options:e(te),optionLabel:"label",optionValue:"value"},null,8,["modelValue","options"])]),t("div",Ge,[t("label",null,u(a.$t("blockEditor.align")),1),r(S,{modelValue:e(i).align,"onUpdate:modelValue":o[12]||(o[12]=n=>e(i).align=n),options:e(P),optionLabel:"label",optionValue:"value"},null,8,["modelValue","options"])])])],64)):l.type==="image"?(f(),y(C,{key:3},[t("div",Ye,[t("label",null,u(a.$t("blockEditor.imageUrl")),1),r(b,{modelValue:e(i).url,"onUpdate:modelValue":o[13]||(o[13]=n=>e(i).url=n),placeholder:a.$t("blockEditor.imageUrl")},null,8,["modelValue","placeholder"]),r(O,{modelValue:e(Y),"onUpdate:modelValue":o[14]||(o[14]=n=>le(Y)?Y.value=n:null),multiple:!1},null,8,["modelValue"])]),t("div",Xe,[t("label",null,u(a.$t("blockEditor.altText")),1),r(b,{modelValue:e(i).alt,"onUpdate:modelValue":o[15]||(o[15]=n=>e(i).alt=n)},null,8,["modelValue"])]),t("div",Qe,[t("label",null,u(a.$t("blockEditor.caption")),1),r(b,{modelValue:e(i).caption,"onUpdate:modelValue":o[16]||(o[16]=n=>e(i).caption=n)},null,8,["modelValue"])]),t("div",Ze,[t("div",el,[t("label",null,u(a.$t("blockEditor.width")),1),r(b,{modelValue:e(i).width,"onUpdate:modelValue":o[17]||(o[17]=n=>e(i).width=n),placeholder:"100% / 320px"},null,8,["modelValue"])]),t("div",ll,[t("label",null,u(a.$t("blockEditor.align")),1),r(S,{modelValue:e(i).align,"onUpdate:modelValue":o[18]||(o[18]=n=>e(i).align=n),options:e(P),optionLabel:"label",optionValue:"value"},null,8,["modelValue","options"])])])],64)):l.type==="divider"?(f(),y("div",tl,[t("label",null,u(a.$t("blockEditor.style")),1),r(S,{modelValue:e(i).style,"onUpdate:modelValue":o[19]||(o[19]=n=>e(i).style=n),options:e(j),optionLabel:"label",optionValue:"value"},null,8,["modelValue","options"])])):l.type==="columns"?(f(),y(C,{key:5},[t("div",nl,[t("div",ol,[t("label",null,u(a.$t("blockEditor.leftCol")),1),r(U,{modelValue:e(i).leftHtml,"onUpdate:modelValue":o[20]||(o[20]=n=>e(i).leftHtml=n),rows:"5",autoResize:""},null,8,["modelValue"])]),t("div",al,[t("label",null,u(a.$t("blockEditor.rightCol")),1),r(U,{modelValue:e(i).rightHtml,"onUpdate:modelValue":o[21]||(o[21]=n=>e(i).rightHtml=n),rows:"5",autoResize:""},null,8,["modelValue"])])]),t("small",il,u(a.$t("blockEditor.columnsHint")),1)],64)):l.type==="spacer"?(f(),y("div",sl,[t("label",null,u(a.$t("blockEditor.height")),1),r(b,{modelValue:e(i).height,"onUpdate:modelValue":o[22]||(o[22]=n=>e(i).height=n),placeholder:"32"},null,8,["modelValue"])])):l.type==="icon"?(f(),y(C,{key:7},[t("div",rl,[t("div",dl,[t("label",null,u(a.$t("blockEditor.glyph")),1),r(b,{modelValue:e(i).glyph,"onUpdate:modelValue":o[23]||(o[23]=n=>e(i).glyph=n),placeholder:"⭐"},null,8,["modelValue"])]),t("div",cl,[t("label",null,u(a.$t("blockEditor.size")),1),r(b,{modelValue:e(i).size,"onUpdate:modelValue":o[24]||(o[24]=n=>e(i).size=n),placeholder:"24"},null,8,["modelValue"])])]),t("div",ul,[t("label",null,u(a.$t("blockEditor.label")),1),r(b,{modelValue:e(i).label,"onUpdate:modelValue":o[25]||(o[25]=n=>e(i).label=n)},null,8,["modelValue"])]),t("div",bl,[t("label",null,u(a.$t("blockEditor.align")),1),r(S,{modelValue:e(i).align,"onUpdate:modelValue":o[26]||(o[26]=n=>e(i).align=n),options:e(P),optionLabel:"label",optionValue:"value"},null,8,["modelValue","options"])])],64)):l.type==="stats"?(f(),y(C,{key:8},[t("div",pl,[t("label",null,u(a.$t("blockEditor.columns")),1),r(S,{modelValue:e(i).columns,"onUpdate:modelValue":o[27]||(o[27]=n=>e(i).columns=n),options:e(v),optionLabel:"label",optionValue:"value"},null,8,["modelValue","options"])]),t("div",ml,[t("label",null,u(a.$t("blockEditor.items")),1),t("div",kl,[(f(!0),y(C,null,X(e(i).items||[],(n,q)=>(f(),y("div",{key:q,class:"kb-item"},[r(b,{modelValue:n.number,"onUpdate:modelValue":V=>n.number=V,placeholder:a.$t("blockEditor.number")},null,8,["modelValue","onUpdate:modelValue","placeholder"]),r(b,{modelValue:n.label,"onUpdate:modelValue":V=>n.label=V,placeholder:a.$t("blockEditor.label")},null,8,["modelValue","onUpdate:modelValue","placeholder"]),r(h,{icon:"pi pi-times",text:"",severity:"danger",onClick:V=>A(q)},null,8,["onClick"])]))),128))]),r(h,{label:a.$t("blockEditor.addItem"),icon:"pi pi-plus",size:"small",outlined:"",onClick:Z},null,8,["label"])])],64)):l.type==="callout"?(f(),y(C,{key:9},[t("div",gl,[t("label",null,u(a.$t("blockEditor.variant")),1),r(S,{modelValue:e(i).variant,"onUpdate:modelValue":o[28]||(o[28]=n=>e(i).variant=n),options:e(M),optionLabel:"label",optionValue:"value"},null,8,["modelValue","options"])]),t("div",fl,[t("label",null,u(a.$t("blockEditor.title")),1),r(b,{modelValue:e(i).title,"onUpdate:modelValue":o[29]||(o[29]=n=>e(i).title=n)},null,8,["modelValue"])]),t("div",vl,[t("label",null,u(a.$t("blockEditor.text")),1),r(U,{modelValue:e(i).text,"onUpdate:modelValue":o[30]||(o[30]=n=>e(i).text=n),rows:"3",autoResize:""},null,8,["modelValue"])])],64)):l.type==="contact"?(f(),y(C,{key:10},[t("div",hl,[t("label",null,u(a.$t("blockEditor.title")),1),r(b,{modelValue:e(i).title,"onUpdate:modelValue":o[31]||(o[31]=n=>e(i).title=n)},null,8,["modelValue"])]),t("div",yl,[t("label",null,u(a.$t("blockEditor.items")),1),t("div",_l,[(f(!0),y(C,null,X(e(i).items||[],(n,q)=>(f(),y("div",{key:q,class:"kb-item"},[r(S,{modelValue:n.type,"onUpdate:modelValue":V=>n.type=V,options:e(F),optionLabel:"label",optionValue:"value"},null,8,["modelValue","onUpdate:modelValue","options"]),r(b,{modelValue:n.value,"onUpdate:modelValue":V=>n.value=V,placeholder:a.$t("blockEditor."+n.type)},null,8,["modelValue","onUpdate:modelValue","placeholder"]),r(h,{icon:"pi pi-times",text:"",severity:"danger",onClick:V=>w(q)},null,8,["onClick"])]))),128))]),r(h,{label:a.$t("blockEditor.addItem"),icon:"pi pi-plus",size:"small",outlined:"",onClick:E},null,8,["label"])])],64)):l.type==="gallery"?(f(),y(C,{key:11},[t("div",$l,[t("label",null,u(a.$t("blockEditor.imageUrl")),1),r(O,{modelValue:e(d),"onUpdate:modelValue":o[32]||(o[32]=n=>le(d)?d.value=n:null),multiple:!0},null,8,["modelValue"])]),e(i).images&&e(i).images.length?(f(),y("div",Vl,[t("label",null,u(a.$t("blockEditor.altText")),1),t("div",xl,[(f(!0),y(C,null,X(e(i).images,(n,q)=>(f(),y("div",{key:q,class:"kb-item"},[n.url?(f(),y("img",{key:0,src:n.url,class:"kb-thumb",alt:""},null,8,El)):N("",!0),r(b,{modelValue:n.alt,"onUpdate:modelValue":V=>n.alt=V,placeholder:a.$t("blockEditor.altText")},null,8,["modelValue","onUpdate:modelValue","placeholder"]),r(h,{icon:"pi pi-times",text:"",severity:"danger",onClick:V=>c(q)},null,8,["onClick"])]))),128))])])):N("",!0),t("div",wl,[t("div",Ul,[t("label",null,u(a.$t("blockEditor.columns")),1),r(S,{modelValue:e(i).columns,"onUpdate:modelValue":o[33]||(o[33]=n=>e(i).columns=n),options:e(v),optionLabel:"label",optionValue:"value"},null,8,["modelValue","options"])]),t("div",Cl,[t("label",null,u(a.$t("blockEditor.caption")),1),r(b,{modelValue:e(i).caption,"onUpdate:modelValue":o[34]||(o[34]=n=>e(i).caption=n)},null,8,["modelValue"])])])],64)):l.type==="quote"?(f(),y(C,{key:12},[t("div",Ml,[t("label",null,u(a.$t("blockEditor.quoteText")),1),r(U,{modelValue:e(i).quote,"onUpdate:modelValue":o[35]||(o[35]=n=>e(i).quote=n),rows:"3",autoResize:""},null,8,["modelValue"])]),t("div",ql,[t("div",Tl,[t("label",null,u(a.$t("blockEditor.author")),1),r(b,{modelValue:e(i).author,"onUpdate:modelValue":o[36]||(o[36]=n=>e(i).author=n)},null,8,["modelValue"])]),t("div",Sl,[t("label",null,u(a.$t("blockEditor.role")),1),r(b,{modelValue:e(i).role,"onUpdate:modelValue":o[37]||(o[37]=n=>e(i).role=n)},null,8,["modelValue"])])]),t("div",zl,[t("label",null,u(a.$t("blockEditor.imageUrl")),1),r(b,{modelValue:e(i).avatarUrl,"onUpdate:modelValue":o[38]||(o[38]=n=>e(i).avatarUrl=n),placeholder:a.$t("blockEditor.imageUrl")},null,8,["modelValue","placeholder"]),r(O,{modelValue:e(W),"onUpdate:modelValue":o[39]||(o[39]=n=>le(W)?W.value=n:null),multiple:!1},null,8,["modelValue"])])],64)):l.type==="accordion"?(f(),y(C,{key:13},[t("div",Nl,[t("label",Il,[r(I,{modelValue:e(i).firstOpen,"onUpdate:modelValue":o[40]||(o[40]=n=>e(i).firstOpen=n),binary:!0},null,8,["modelValue"]),t("span",null,u(a.$t("blockEditor.firstItemOpen")),1)])]),t("div",Ll,[t("label",null,u(a.$t("blockEditor.items")),1),t("div",Rl,[(f(!0),y(C,null,X(e(i).items||[],(n,q)=>(f(),y("div",{key:q,class:"kb-accordionrow"},[r(b,{modelValue:n.q,"onUpdate:modelValue":V=>n.q=V,placeholder:a.$t("blockEditor.question")},null,8,["modelValue","onUpdate:modelValue","placeholder"]),r(U,{modelValue:n.a,"onUpdate:modelValue":V=>n.a=V,rows:"2",autoResize:"",placeholder:a.$t("blockEditor.answer")},null,8,["modelValue","onUpdate:modelValue","placeholder"]),r(h,{icon:"pi pi-times",text:"",severity:"danger",onClick:V=>ae(q)},null,8,["onClick"])]))),128))]),r(h,{label:a.$t("blockEditor.addItem"),icon:"pi pi-plus",size:"small",outlined:"",onClick:oe},null,8,["label"])])],64)):l.type==="video"?(f(),y(C,{key:14},[t("div",Ol,[t("label",null,u(a.$t("blockEditor.videoUrl")),1),r(b,{modelValue:e(i).url,"onUpdate:modelValue":o[41]||(o[41]=n=>e(i).url=n),placeholder:"https://youtube.com/watch?v=…"},null,8,["modelValue"])]),t("div",Dl,[t("label",null,u(a.$t("blockEditor.caption")),1),r(b,{modelValue:e(i).caption,"onUpdate:modelValue":o[42]||(o[42]=n=>e(i).caption=n)},null,8,["modelValue"])]),t("small",Hl,u(a.$t("blockEditor.videoHint")),1)],64)):N("",!0)])):N("",!0)]),_:1},8,["visible","header"])}}}),Bl=ke(Al,[["__scopeId","data-v-9d63c647"]]),Wl=["card","checkbox","button","image","divider","columns","spacer","icon","stats","callout","contact","gallery","quote","accordion","video"],ge=l=>typeof l=="string"&&Wl.includes(l),de={card:{title:"Card title",text:"Add a short description for this card.",imageUrl:"",imageAlt:"",linkUrl:"",linkLabel:"Learn more"},checkbox:{title:"Checklist",items:[{label:"First item",checked:!0},{label:"Second item",checked:!1}],style:"check"},button:{label:"Click here",url:"#",variant:"primary",align:"left"},image:{url:"",alt:"",caption:"",width:"100%",align:"center"},divider:{style:"solid"},columns:{leftHtml:"<p>Left column</p>",rightHtml:"<p>Right column</p>"},spacer:{height:"32"},icon:{glyph:"⭐",label:"",size:"24",align:"center"},stats:{items:[{number:"500+",label:"Clients"},{number:"10",label:"Years"},{number:"24/7",label:"Support"}],columns:3},callout:{variant:"info",title:"",text:""},contact:{title:"",items:[{type:"phone",value:""},{type:"email",value:""}]},gallery:{images:[],columns:3,caption:""},quote:{quote:"",author:"",role:"",avatarUrl:""},accordion:{items:[{q:"First question?",a:"Answer here."},{q:"Second question?",a:"Answer here."}],firstOpen:!0},video:{url:"",caption:""}};function fe(l){const s=JSON.stringify(l);return typeof btoa<"u"?btoa(unescape(encodeURIComponent(s))):Buffer.from(s,"utf-8").toString("base64")}function Pl(l){if(!l)return null;try{const s=typeof atob<"u"?decodeURIComponent(escape(atob(l))):Buffer.from(l,"base64").toString("utf-8");return JSON.parse(s)}catch{return null}}function m(l){return String(l??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function jl(l){const s=l.imageUrl?`<img class="kb-card__img" src="${m(l.imageUrl)}" alt="${m(l.imageAlt)}" />`:"",k=l.title?`<h3 class="kb-card__title">${m(l.title)}</h3>`:"",g=l.text?`<div class="kb-card__text">${m(l.text).replace(/\n/g,"<br/>")}</div>`:"",p=l.linkUrl&&l.linkLabel?`<a class="kb-card__link" href="${m(l.linkUrl)}">${m(l.linkLabel)}</a>`:"";return`${s}<div class="kb-card__body">${k}${g}${p}</div>`}function Fl(l){const s=l.title?`<h4 class="kb-checklist__title">${m(l.title)}</h4>`:"",k=l.style==="cross"?"kb-checklist__mark--cross":"kb-checklist__mark--check",g=(l.items||[]).map(p=>`<li class="kb-checklist__item${p.checked?" kb-checklist__item--on":""}"><span class="kb-checklist__mark ${k}"></span><span class="kb-checklist__label">${m(p.label)}</span></li>`).join("");return`${s}<ul class="kb-checklist">${g}</ul>`}function Jl(l){return`<div class="kb-button-wrap" style="text-align:${m(l.align)}"><a class="kb-button kb-button--${m(l.variant)}" href="${m(l.url||"#")}">${m(l.label)}</a></div>`}function Kl(l){if(!l.url)return'<div class="kb-image kb-image--empty">No image selected</div>';const s=l.caption?`<figcaption class="kb-image__caption">${m(l.caption)}</figcaption>`:"";return`<figure class="kb-image" style="max-width:${m(l.width)};text-align:${m(l.align)}"><img src="${m(l.url)}" alt="${m(l.alt)}" />${s}</figure>`}function Gl(l){return`<hr class="kb-divider kb-divider--${m(l.style)}" />`}function Yl(l){return`<div class="kb-columns"><div class="kb-col">${l.leftHtml||""}</div><div class="kb-col">${l.rightHtml||""}</div></div>`}function Xl(l){const s=parseInt(String(l.height),10);return`<div class="kb-spacer" style="height:${Number.isFinite(s)&&s>0?s:32}px"></div>`}function Ql(l){const s=parseInt(String(l.size),10),g=`<span class="kb-icon__glyph" style="font-size:${Number.isFinite(s)&&s>0?s:24}px">${m(l.glyph)}</span>`,p=l.label?`<span class="kb-icon__label">${m(l.label)}</span>`:"";return`<div class="kb-icon" style="text-align:${m(l.align)}">${g}${p}</div>`}function Zl(l){const s=Number(l.columns),k=[2,3,4].includes(s)?s:3,g=(l.items||[]).filter(p=>p.number||p.label).map(p=>`<div class="kb-stats__item"><span class="kb-stats__num">${m(p.number)}</span><span class="kb-stats__label">${m(p.label)}</span></div>`).join("");return`<div class="kb-stats" style="--kb-cols:${k}">${g}</div>`}function et(l){const s=["info","success","warning","danger"].includes(l.variant)?l.variant:"info",k=l.title?`<h4 class="kb-callout__title">${m(l.title)}</h4>`:"",g=l.text?`<div class="kb-callout__text">${m(l.text).replace(/\n/g,"<br/>")}</div>`:"";return`<div class="kb-callout kb-callout--${s}">${k}${g}</div>`}const lt={phone:"📞",email:"📧",address:"📍",hours:"🕒"};function tt(l){const s=l.title?`<h4 class="kb-contact__title">${m(l.title)}</h4>`:"",k=(l.items||[]).filter(g=>g.value).map(g=>{const p=lt[g.type]||"•",x=g.type==="phone"?`<a class="kb-contact__value" href="tel:${m(g.value)}">${m(g.value)}</a>`:g.type==="email"?`<a class="kb-contact__value" href="mailto:${m(g.value)}">${m(g.value)}</a>`:`<span class="kb-contact__value">${m(g.value)}</span>`;return`<li class="kb-contact__item"><span class="kb-contact__icon">${p}</span>${x}</li>`}).join("");return k?`${s}<ul class="kb-contact">${k}</ul>`:s}function nt(l){const s=Number(l.columns),k=[2,3,4].includes(s)?s:3,g=(l.images||[]).filter(x=>x.url).map(x=>`<div class="kb-gallery__cell"><img src="${m(x.url)}" alt="${m(x.alt)}" /></div>`).join("");if(!g)return'<div class="kb-gallery kb-gallery--empty">No images selected</div>';const p=l.caption?`<figcaption class="kb-gallery__caption">${m(l.caption)}</figcaption>`:"";return`<figure class="kb-gallery"><div class="kb-gallery__grid" style="--kb-cols:${k}">${g}</div>${p}</figure>`}function ot(l){const s=l.quote?`<blockquote class="kb-quote__text">${m(l.quote).replace(/\n/g,"<br/>")}</blockquote>`:"",k=l.avatarUrl?`<img class="kb-quote__avatar" src="${m(l.avatarUrl)}" alt="${m(l.author)}" />`:"",g=l.author?`<span class="kb-quote__author">${m(l.author)}</span>`:"",p=l.role?`<span class="kb-quote__role">${m(l.role)}</span>`:"",x=k||g||p?`<figcaption class="kb-quote__meta">${k}${g}${p}</figcaption>`:"";return`<figure class="kb-quote">${s}${x}</figure>`}function at(l){return`<div class="kb-accordion">${(l.items||[]).filter(k=>k.q||k.a).map((k,g)=>`<details class="kb-accordion__item"${l.firstOpen&&g===0?" open":""}><summary class="kb-accordion__q">${m(k.q)}</summary><div class="kb-accordion__a">${m(k.a).replace(/\n/g,"<br/>")}</div></details>`).join("")}</div>`}function it(l){const s=String(l||"").trim();if(!s)return"";const k=s.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/);if(k)return`https://www.youtube.com/embed/${k[1]}`;const g=s.match(/vimeo\.com\/(?:video\/)?(\d+)/);return g?`https://player.vimeo.com/video/${g[1]}`:s}function st(l){return/\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(String(l||""))}function rt(l){const s=String(l.url||"").trim();if(!s)return'<div class="kb-video kb-video--empty">No video URL</div>';const k=l.caption?`<figcaption class="kb-video__caption">${m(l.caption)}</figcaption>`:"";return`<figure class="kb-video">${st(s)?`<div class="kb-video__frame"><video src="${m(s)}" controls preload="metadata"></video></div>`:`<div class="kb-video__frame"><iframe src="${m(it(s))}" title="${m(l.caption||"Video")}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`}${k}</figure>`}function ve(l,s){switch(l){case"card":return jl(s);case"checkbox":return Fl(s);case"button":return Jl(s);case"image":return Kl(s);case"divider":return Gl(s);case"columns":return Yl(s);case"spacer":return Xl(s);case"icon":return Ql(s);case"stats":return Zl(s);case"callout":return et(s);case"contact":return tt(s);case"gallery":return nt(s);case"quote":return ot(s);case"accordion":return at(s);case"video":return rt(s);default:return""}}function dt(l,s){const k=fe(de[l]),g=ve(l,de[l]);return`<div class="kb-widget kb-${l} mceNonEditable" contenteditable="false" data-kb-type="${l}" data-kb-payload="${k}">${g}</div>`}function ct(l){if(!l)return null;let s=null;if(l.closest&&typeof l.closest=="function"?s=l.closest(".kb-widget"):l.nodeType===1&&(s=l.classList&&l.classList.contains("kb-widget")?l:null),!s)return null;const k=s.getAttribute("data-kb-type");if(!ge(k))return null;const g=Pl(s.getAttribute("data-kb-payload")||"")||{...de[k]};return{type:k,data:g}}const ce="kb:";function ut(l){if(typeof l!="string"||!l.startsWith(ce))return null;const s=l.slice(ce.length);return ge(s)?s:null}let he=null;const bt=l=>{he=l},pt=()=>he,mt=`/* Global styles for low-code widgets (\`.kb-*\`).
   Loaded globally so it applies to:
   - the TinyMCE editor (admin)
   - public \`v-html\` rendering of the article description
*/

/* Widgets have no special chrome here. The dashed "click to edit" chrome is
   injected into the TinyMCE iframe only (via content_style in
   pages/admin/content/[id].vue), so it never appears on the public site even
   though the stored markup keeps the \`mceNonEditable\` class. */
.kb-widget {
  margin: 16px 0;
}

/* ---------- Card ---------- */
.kb-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
}
.kb-card__img {
  width: 100%;
  max-height: 260px;
  object-fit: cover;
  display: block;
}
.kb-card__body {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.kb-card__title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}
.kb-card__text {
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.5;
}
.kb-card__link {
  align-self: flex-start;
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}
.kb-card__link:hover {
  text-decoration: underline;
}

/* ---------- Checklist ---------- */
.kb-checklist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.kb-checklist__title {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}
.kb-checklist__item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #374151;
}
.kb-checklist__mark {
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid #d1d5db;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  line-height: 1;
  color: #fff;
}
.kb-checklist__item--on .kb-checklist__mark {
  background: #16a34a;
  border-color: #16a34a;
}
.kb-checklist__mark--cross.kb-checklist__mark,
.kb-checklist__item--on .kb-checklist__mark--cross {
  background: #dc2626;
  border-color: #dc2626;
}
.kb-checklist__item--on .kb-checklist__mark--check::before {
  content: "✓";
}
.kb-checklist__item--on .kb-checklist__mark--cross::before {
  content: "✕";
}

/* ---------- Button ---------- */
.kb-button-wrap {
  margin: 4px 0;
}
.kb-button {
  display: inline-block;
  padding: 9px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
}
.kb-button--primary {
  background: #2563eb;
  color: #fff;
  border: 1px solid #2563eb;
}
.kb-button--primary:hover {
  background: #1d4ed8;
}
.kb-button--outline {
  background: transparent;
  color: #2563eb;
  border: 1px solid #2563eb;
}
.kb-button--outline:hover {
  background: #eff6ff;
}

/* ---------- Image ---------- */
.kb-image {
  margin: 0;
  display: block;
}
.kb-image img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
.kb-image__caption {
  margin-top: 6px;
  text-align: center;
  font-size: 0.85rem;
  color: #6b7280;
}
.kb-image--empty {
  padding: 24px;
  text-align: center;
  color: #9ca3af;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
}

/* ---------- Divider ---------- */
.kb-divider {
  border: 0;
  height: 0;
  margin: 18px 0;
}
.kb-divider--solid {
  border-top: 2px solid #e5e7eb;
}
.kb-divider--dashed {
  border-top: 2px dashed #e5e7eb;
}
.kb-divider--dotted {
  border-top: 3px dotted #e5e7eb;
}

/* ---------- Columns ---------- */
.kb-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.kb-columns .kb-col {
  min-width: 0;
}
.kb-columns .kb-col > :last-child {
  margin-bottom: 0;
}
@media (max-width: 640px) {
  .kb-columns {
    grid-template-columns: 1fr;
  }
}

/* ---------- Spacer ---------- */
.kb-spacer {
  width: 100%;
}

/* ---------- Icon ---------- */
.kb-icon {
  margin: 8px 0;
  line-height: 1;
}
.kb-icon__glyph {
  display: inline-block;
  vertical-align: middle;
}
.kb-icon__label {
  margin-left: 8px;
  vertical-align: middle;
  font-size: 1rem;
  color: #374151;
}

/* ---------- Stats ---------- */
.kb-stats {
  display: grid;
  grid-template-columns: repeat(var(--kb-cols, 3), 1fr);
  gap: 16px;
  margin: 8px 0;
}
.kb-stats__item {
  text-align: center;
  padding: 12px 8px;
}
.kb-stats__num {
  display: block;
  font-size: 1.8rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.1;
}
.kb-stats__label {
  display: block;
  margin-top: 4px;
  font-size: 0.85rem;
  color: #6b7280;
}
@media (max-width: 640px) {
  .kb-stats {
    grid-template-columns: 1fr 1fr;
  }
}

/* ---------- Callout ---------- */
.kb-callout {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid;
  margin: 8px 0;
}
.kb-callout__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}
.kb-callout__text {
  font-size: 0.92rem;
  line-height: 1.5;
  margin: 0;
}
.kb-callout--info {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #1e3a8a;
}
.kb-callout--success {
  background: #ecfdf5;
  border-color: #16a34a;
  color: #14532d;
}
.kb-callout--warning {
  background: #fffbeb;
  border-color: #f59e0b;
  color: #78350f;
}
.kb-callout--danger {
  background: #fef2f2;
  border-color: #dc2626;
  color: #7f1d1d;
}

/* ---------- Contact ---------- */
.kb-contact__title {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}
.kb-contact {
  list-style: none;
  margin: 8px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.kb-contact__item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #374151;
}
.kb-contact__icon {
  flex: none;
  width: 22px;
  text-align: center;
  font-size: 1rem;
}
.kb-contact__value {
  color: #374151;
  text-decoration: none;
}
a.kb-contact__value:hover {
  text-decoration: underline;
}

/* ---------- Gallery ---------- */
.kb-gallery {
  margin: 8px 0;
}
.kb-gallery__grid {
  display: grid;
  grid-template-columns: repeat(var(--kb-cols, 3), 1fr);
  gap: 10px;
}
.kb-gallery__cell {
  overflow: hidden;
  border-radius: 8px;
}
.kb-gallery__cell img {
  width: 100%;
  height: 100%;
  min-height: 120px;
  object-fit: cover;
  display: block;
}
.kb-gallery__caption {
  margin-top: 6px;
  text-align: center;
  font-size: 0.85rem;
  color: #6b7280;
}
.kb-gallery--empty {
  padding: 24px;
  text-align: center;
  color: #9ca3af;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
}
@media (max-width: 640px) {
  .kb-gallery__grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* ---------- Quote ---------- */
.kb-quote {
  margin: 8px 0;
  padding: 0;
}
.kb-quote__text {
  margin: 0;
  font-size: 1.1rem;
  font-style: italic;
  color: #374151;
  line-height: 1.6;
  border-left: 3px solid #cbd5e1;
  padding-left: 14px;
}
.kb-quote__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}
.kb-quote__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex: none;
}
.kb-quote__author {
  font-weight: 700;
  color: #111827;
}
.kb-quote__role {
  color: #6b7280;
  font-size: 0.85rem;
}
.kb-quote__author + .kb-quote__role::before {
  content: "·";
  margin: 0 6px;
  color: #9ca3af;
}

/* ---------- Accordion ---------- */
.kb-accordion {
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.kb-accordion__item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
.kb-accordion__q {
  cursor: pointer;
  padding: 12px 14px;
  font-weight: 600;
  color: #111827;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.kb-accordion__q::-webkit-details-marker {
  display: none;
}
.kb-accordion__q::after {
  content: "▾";
  color: #9ca3af;
  transition: transform 0.2s;
}
.kb-accordion__item[open] .kb-accordion__q::after {
  transform: rotate(180deg);
}
.kb-accordion__a {
  padding: 0 14px 14px;
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* ---------- Video ---------- */
.kb-video {
  margin: 8px 0;
}
.kb-video__frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
}
.kb-video__frame iframe,
.kb-video__frame video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.kb-video__caption {
  margin-top: 6px;
  text-align: center;
  font-size: 0.85rem;
  color: #6b7280;
}
.kb-video--empty {
  padding: 24px;
  text-align: center;
  color: #9ca3af;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
}
`,kt={class:"content-form-page"},gt={class:"page-header"},ft={class:"page-title"},vt={class:"page-actions"},ht={class:"form-grid"},yt={class:"form-group"},_t={for:"title"},$t={key:0,class:"p-error"},Vt={class:"form-group"},xt={for:"contentType"},Et={key:0,class:"p-error"},wt={class:"form-group"},Ut={for:"description"},Ct={class:"description-editor",style:{display:"block"}},Mt={class:"form-group"},qt={for:"menu"},Tt={key:0,class:"p-error"},St={class:"form-group"},zt={for:"status"},Nt={class:"status-toggle"},It={class:"action-links"},Lt=`
.kb-widget.mceNonEditable { position: relative; display: block; margin: 12px 0; padding: 10px; border: 1px dashed #93c5fd; border-radius: 8px; background: #f8fbff; cursor: pointer; user-select: none; }
.kb-widget.mceNonEditable:hover { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
.kb-widget.mceNonEditable::after { content: "click to edit"; position: absolute; top: -9px; right: 10px; font-size: 10px; line-height: 1; padding: 2px 6px; background: #3b82f6; color: #fff; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.04em; }
`,Rt=ue({__name:"[id]",setup(l){const s=qe(),k=Te(),g=Ve(),p=Se(),i=pe().public.photoUrl,{t:_}=be(),P=xe(),te=Ee(),R=T(()=>{const d=te.params.id;return d==="new"?null:Number(d)}),j=T(()=>R.value===null),v=Q({title:"",description:"",content_type:z.ARTICLE,lang_id:null,menu_id:null,status:0}),M=Q({}),F=Q(!1),H=Q(""),ne=[{label:_("contentManager.article"),value:z.ARTICLE},{label:_("contentManager.photo"),value:z.PHOTO},{label:_("contentManager.video"),value:z.VIDEO},{label:_("contentManager.document"),value:z.DOCUMENT},{label:_("contentManager.blogNews"),value:z.NEWS},{label:"Map",value:z.MAP},{label:"Product / Service",value:z.PRODUCT}],Z=T(()=>{const d=(c,$="")=>{var o;const a=[];for(const b of c){const U=$+(b.item_name||"");a.push({item_id:b.item_id,item_name:U,lang_id:b.lang_id}),(o=b.children)!=null&&o.length&&a.push(...d(b.children,U+" → "))}return a};return d([...p.menuTree])});me(()=>v.value.menu_id,d=>{if(d==null)return;const c=Z.value.find($=>$.item_id===d);c!=null&&c.lang_id&&(v.value.lang_id=c.lang_id)});const A=Me(null),E=Ce({visible:!1,type:null,data:{},node:null}),w=d=>{const c=A.value;if(!c)return;c.focus();const $=dt(d);typeof c.insertContent=="function"?c.insertContent($):c.execCommand("mceInsertContent",!1,$),c.undoManager.add()},oe=(d,c,$)=>{E.type=d,E.data=c,E.node=$,E.visible=!0},ae=d=>{const c=A.value,$=E.node;if(!c||!$||!E.type){E.visible=!1;return}$.setAttribute("data-kb-payload",fe(d)),c.dom.setHTML($,ve(E.type,d)),c.undoManager.add(),c.nodeChanged(),E.visible=!1},J=()=>{const d=A.value,c=E.node;d&&c&&(c.remove(),d.undoManager.add(),d.nodeChanged()),E.visible=!1},K=()=>{const d=A.value,c=E.node;d&&c&&c.parentNode&&(c.parentNode.insertBefore(c.cloneNode(!0),c.nextSibling),d.undoManager.add(),d.nodeChanged()),E.visible=!1},G=T(()=>({height:360,menubar:"tools",plugins:"noneditable advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste",toolbar:"undo redo | bold italic underline | forecolor backcolor | fontselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | kbinsert | fullscreen",branding:!1,promotion:!1,relative_urls:!1,remove_script_host:!1,document_base_url:i,content_style:mt+Lt,extended_valid_elements:"div[class|style|contenteditable|data-kb-type|data-kb-payload],img[src|alt|class|style|width|height],figure[class|style],figcaption[class|style],hr[class|style],a[href|class|target|rel|style],h3[class|style],h4[class|style],p[class|style],span[class|style],ul[class|style],li[class|style],blockquote[class|style],details[class|style|open],summary[class|style],iframe[src|class|style|allow|allowfullscreen|loading|width|height|title],video[src|class|style|controls|preload|width|height]",setup(d){A.value=d,d.addButton("kbinsert",{type:"menubutton",text:_("blockEditor.components"),tooltip:_("blockEditor.insert"),menu:[{text:_("blockEditor.card"),onclick:()=>w("card")},{text:_("blockEditor.checklist"),onclick:()=>w("checkbox")},{text:_("blockEditor.button"),onclick:()=>w("button")},{text:_("blockEditor.image"),onclick:()=>w("image")},{text:_("blockEditor.divider"),onclick:()=>w("divider")},{text:_("blockEditor.columns"),onclick:()=>w("columns")},{text:_("blockEditor.spacer"),onclick:()=>w("spacer")},{text:_("blockEditor.icon"),onclick:()=>w("icon")},{text:_("blockEditor.stats"),onclick:()=>w("stats")},{text:_("blockEditor.callout"),onclick:()=>w("callout")},{text:_("blockEditor.contact"),onclick:()=>w("contact")},{text:_("blockEditor.gallery"),onclick:()=>w("gallery")},{text:_("blockEditor.quote"),onclick:()=>w("quote")},{text:_("blockEditor.accordion"),onclick:()=>w("accordion")},{text:_("blockEditor.video"),onclick:()=>w("video")}]}),d.on("click",c=>{const $=c.target&&c.target.nodeType===3?c.target.parentNode:c.target,a=ct($);if(!a)return;const o=$.closest?$.closest(".kb-widget"):null;oe(a.type,a.data,o)}),d.on("drop",c=>{const $=c.dataTransfer&&(c.dataTransfer.getData("application/x-kb-block")||c.dataTransfer.getData("text/plain")),a=ut($)||pt();if(bt(null),!!a){c.preventDefault();try{const o=d.getDoc(),b=d.getContentAreaContainer&&d.getContentAreaContainer(),U=b&&b.getBoundingClientRect?b.getBoundingClientRect():{left:0,top:0},O=(c.clientX||0)-U.left,S=(c.clientY||0)-U.top;let I=null;if(typeof o.caretRangeFromPoint=="function")I=o.caretRangeFromPoint(O,S);else if(typeof o.caretPositionFromPoint=="function"){const h=o.caretPositionFromPoint(O,S);h&&(I=o.createRange(),I.setStart(h.offsetNode,h.offset),I.collapse(!0))}I&&d.selection&&d.selection.setRng&&d.selection.setRng(I)}catch{}w(a)}})}})),Y=()=>(M.value={},v.value.title||(M.value.title=_("validation.required")),v.value.content_type===null&&(M.value.content_type=_("validation.required")),v.value.lang_id===null&&(M.value.lang_id=_("validation.required")),v.value.menu_id===null&&(M.value.menu_id=_("validation.required")),Object.keys(M.value).length===0),W=async()=>{if(H.value="",!!Y()){F.value=!0,console.log("Saving content with form data:",v.value);try{let d;j.value?d=await s.saveContent({title:v.value.title,description:v.value.description,content_type:v.value.content_type,lang_id:v.value.lang_id,menu_id:v.value.menu_id,status:v.value.status?0:1}):d=await s.updateContent(R.value,{title:v.value.title,description:v.value.description,content_type:v.value.content_type,lang_id:v.value.lang_id,menu_id:v.value.menu_id,status:v.value.status?0:1}),d===!0||typeof d=="object"&&d.success?P.push("/admin/content"):H.value=_("common.error")}catch(d){H.value=d.message||_("common.error")}finally{F.value=!1}}};return we(async()=>{var d;if(await k.resolveDomain((d=g.user)==null?void 0:d.domain_id),await p.fetchAllMenuTree(),await s.fetchContent(R.value),s.currentContent){const c=s.currentContent,$=JSON.parse(c.description);v.value={title:$.title,description:$.description,content_type:c.content_type,lang_id:c.lang_id,menu_id:c.menu_id??null,status:c.status?0:1}}}),(d,c)=>{const $=L("Button"),a=L("InputText"),o=L("Dropdown"),b=ye,U=Bl,O=L("ToggleSwitch"),S=L("Message"),I=L("Card");return f(),y("div",null,[t("div",kt,[t("div",gt,[t("h1",ft,u(e(j)?d.$t("contentManager.addNew"):d.$t("contentManager.edit")),1),t("div",vt,[r($,{label:d.$t("common.back"),icon:"pi pi-arrow-left",outlined:"",onClick:c[0]||(c[0]=h=>d.$router.back())},null,8,["label"]),r($,{label:d.$t("common.save"),icon:"pi pi-check",onClick:W,loading:e(F)},null,8,["label","loading"])])]),t("div",ht,[r(I,{class:"form-card"},{title:D(()=>[re(u(d.$t("contentManager.contentTitle")),1)]),content:D(()=>[t("form",{onSubmit:Ue(W,["prevent"]),class:"content-form"},[t("div",yt,[t("label",_t,u(d.$t("contentManager.contentTitle"))+" *",1),r(a,{id:"title",modelValue:e(v).title,"onUpdate:modelValue":c[1]||(c[1]=h=>e(v).title=h),placeholder:d.$t("contentManager.contentTitle"),class:se({"p-invalid":e(M).title})},null,8,["modelValue","placeholder","class"]),e(M).title?(f(),y("small",$t,u(e(M).title),1)):N("",!0)]),t("div",Vt,[t("label",xt,u(d.$t("contentManager.contentType"))+" *",1),r(o,{id:"contentType",modelValue:e(v).content_type,"onUpdate:modelValue":c[2]||(c[2]=h=>e(v).content_type=h),options:ne,optionLabel:"label",optionValue:"value",placeholder:d.$t("contentManager.contentType"),class:se({"p-invalid":e(M).content_type})},null,8,["modelValue","placeholder","class"]),e(M).content_type?(f(),y("small",Et,u(e(M).content_type),1)):N("",!0)]),t("div",wt,[t("label",Ut,u(d.$t("contentManager.description")),1),t("div",Ct,[r(b,null,{default:D(()=>[r(e(_e),{modelValue:e(v).description,"onUpdate:modelValue":c[3]||(c[3]=h=>e(v).description=h),tinymceScriptSrc:"/tinymce/tinymce.min.js",init:e(G),class:"description-editor__field"},null,8,["modelValue","init"])]),_:1})]),r(U,{visible:e(E).visible,"onUpdate:visible":c[4]||(c[4]=h=>e(E).visible=h),type:e(E).type,data:e(E).data,onSave:ae,onDelete:J,onDuplicate:K},null,8,["visible","type","data"])]),t("div",Mt,[t("label",qt,u(d.$t("menuManager.menuName"))+" *",1),r(o,{id:"menu",modelValue:e(v).menu_id,"onUpdate:modelValue":c[5]||(c[5]=h=>e(v).menu_id=h),options:e(Z),optionLabel:"item_name",optionValue:"item_id",placeholder:d.$t("menuManager.selectMenu"),class:se({"p-invalid":e(M).menu_id}),showClear:""},null,8,["modelValue","options","placeholder","class"]),e(M).menu_id?(f(),y("small",Tt,u(e(M).menu_id),1)):N("",!0)]),t("div",St,[t("label",zt,u(d.$t("contentManager.status")),1),t("div",Nt,[r(O,{id:"status",modelValue:e(v).status,"onUpdate:modelValue":c[6]||(c[6]=h=>e(v).status=h),trueValue:1,falseValue:0},null,8,["modelValue"]),t("span",null,u(e(v).status?d.$t("contentManager.published"):d.$t("contentManager.draft")),1)])]),e(H)?(f(),B(S,{key:0,severity:"error",closable:!1},{default:D(()=>[re(u(e(H)),1)]),_:1})):N("",!0)],32)]),_:1}),e(j)?N("",!0):(f(),B(I,{key:0,class:"preview-card"},{title:D(()=>[re(u(d.$t("contentManager.actions")),1)]),content:D(()=>{var h,ee,n,q,V;return[t("div",It,[((h=e(s).currentContent)==null?void 0:h.content_type)!==e(z).ARTICLE&&((ee=e(s).currentContent)==null?void 0:ee.content_type)!==e(z).PRODUCT?(f(),B($,{key:0,label:d.$t("contentManager.list"),icon:"pi pi-list",outlined:"",onClick:c[7]||(c[7]=ie=>d.$router.push(`/admin/content/${e(R)}/items`)),class:"w-full mb-3"},null,8,["label"])):N("",!0),((n=e(s).currentContent)==null?void 0:n.content_type)===e(z).NEWS?(f(),B($,{key:1,label:d.$t("contentManager.blogNews"),icon:"pi pi-news",outlined:"",onClick:c[8]||(c[8]=ie=>d.$router.push(`/admin/content/${e(R)}/news`)),class:"w-full mb-3"},null,8,["label"])):N("",!0),((q=e(s).currentContent)==null?void 0:q.content_type)===e(z).MAP?(f(),B($,{key:2,label:d.$t("contentManager.showMap"),icon:"pi pi-map",outlined:"",onClick:c[9]||(c[9]=ie=>d.$router.push(`/admin/content/${e(R)}/map`)),class:"w-full mb-3"},null,8,["label"])):N("",!0),((V=e(s).currentContent)==null?void 0:V.content_type)===e(z).PRODUCT?(f(),B($,{key:3,label:"Manage Products",icon:"pi pi-shopping-bag",outlined:"",onClick:c[10]||(c[10]=ie=>d.$router.push(`/admin/content/${e(R)}/products`)),class:"w-full"})):N("",!0)])]}),_:1}))])])])}}}),Ft=ke(Rt,[["__scopeId","data-v-19b8794e"]]);export{Ft as default};

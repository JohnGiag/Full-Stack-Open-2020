(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(13),c=t.n(r),o=t(2),l=function(e){var n=e.value,t=e.onChange;return u.a.createElement("div",null,"Seacrh: ",u.a.createElement("input",{value:n,onChange:t}))},i=function(e){return u.a.createElement("form",{onSubmit:e.onSubmit},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.persons,t=e.serachValue,a=e.deleteContact;return u.a.createElement("table",null,u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Name"),u.a.createElement("th",null,"Number"))),u.a.createElement("tbody",null,n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e,n){return u.a.createElement("tr",{key:n},u.a.createElement("td",null," ",e.name," "),u.a.createElement("td",null,e.number),u.a.createElement("td",null,u.a.createElement("button",{onClick:function(){return a(e.id)}},"delete")))}))))},f=t(3),s=t.n(f),d="/api/persons",h=function(){return s.a.get(d).then((function(e){return e.data}))},b=h,E=function(e){return s.a.post(d,e).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return s.a.delete("".concat(d,"/").concat(e)).then((function(){return h()}))},g=function(e){var n=e.text;return u.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},u.a.createElement("br",null),u.a.createElement("em",null,n))},C=function(e){var n=e.message,t=e.type;return null===n?null:u.a.createElement("div",{className:t},n)},w=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),f=Object(o.a)(c,2),s=f[0],d=f[1],h=Object(a.useState)(""),w=Object(o.a)(h,2),j=w[0],O=w[1],S=Object(a.useState)(""),k=Object(o.a)(S,2),N=k[0],y=k[1],T=Object(a.useState)(null),x=Object(o.a)(T,2),D=x[0],J=x[1],L=Object(a.useState)("success"),P=Object(o.a)(L,2),V=P[0],z=P[1];Object(a.useEffect)((function(){b().then((function(e){r(e)}))}),[]);return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(C,{message:D,type:V}),u.a.createElement(l,{value:N,onChange:function(e){return y(e.target.value)}}),u.a.createElement(i,{onSubmit:function(e){e.preventDefault();var n={name:s,number:j},a=t.find((function(e){return e.name===s}));t.some((function(e){return e.name===s}))?window.confirm("".concat(s," is already in the phonebook, replace old number with new number ?"))&&(n.id=a.id,p(a.id,n).then((function(e){r(t.map((function(e){return e.id===a.id?n:e}))),z("success"),J("Updated '".concat(n.name,"'")),setTimeout((function(){J(null)}),3e3)})).catch((function(e){z("error"),J("".concat(n.name,"' has been removed from the phonebook")),setTimeout((function(){J(null)}),3e3),r(t.filter((function(e){return e.id!==a.id})))}))):E(n).then((function(e){r(t.concat(e)),d(""),O(""),z("success"),J("Added '".concat(n.name,"'")),setTimeout((function(){J(null)}),3e3)}))},newName:s,handleNameChange:function(e){return d(e.target.value)},newNumber:j,handleNumberChange:function(e){return O(e.target.value)}}),u.a.createElement("h2",null,"Contacts"),u.a.createElement(m,{persons:t,serachValue:N,deleteContact:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))&&v(e).then((function(e){r(e),z("success"),J("Deleted '".concat(n.name,"'")),setTimeout((function(){J(null)}),3e3)})).catch((function(e){z("error"),J("".concat(n.name,"' has already been removed from the phonebook")),setTimeout((function(){J(null)}),3e3),r(t.filter((function(e){return e.id!==n.id})))}))}}),u.a.createElement(g,{text:"Phonebook app, JohnGiag 2020"}))};t(36);c.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(w,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.54c6c868.chunk.js.map
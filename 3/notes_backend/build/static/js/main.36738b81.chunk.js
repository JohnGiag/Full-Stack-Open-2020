(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},20:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),u=(n(20),n(4)),l=n(2),i=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},e.content,r.a.createElement("button",{onClick:n},a))},m=n(3),f=n.n(m),s="http://localhost:3001/notes",p=function(){return f.a.get(s).then((function(t){return t.data}))},d=function(t){return f.a.post(s,t).then((function(t){return t.data}))},E=function(t,e){return f.a.put("".concat(s,"/").concat(t),e).then((function(t){return t.data}))},b=function(t){var e=t.message;return null===e?null:r.a.createElement("div",{className:"error"},e)},h=function(t){var e=t.text;return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,e))},v=function(){var t=Object(a.useState)([]),e=Object(l.a)(t,2),n=e[0],o=e[1],c=Object(a.useState)(""),m=Object(l.a)(c,2),f=m[0],s=m[1],v=Object(a.useState)(!0),g=Object(l.a)(v,2),O=g[0],j=g[1],S=Object(a.useState)("some error happened..."),k=Object(l.a)(S,2),y=k[0],w=k[1];Object(a.useEffect)((function(){p().then((function(t){console.log("promise fulfilled"),o(t)}))}),[]),console.log("render",n.length,"notes");var N=O?n:n.filter((function(t){return!0===t.important}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement("div",null,r.a.createElement(b,{message:y}),r.a.createElement("ul",null,N.map((function(t,e){return r.a.createElement(i,{key:e,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});E(t,a).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(a){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),100),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()<.5};d(e).then((function(t){o(n.concat(t)),s("")}))}},r.a.createElement("input",{value:f,onChange:function(t){s(t.target.value)}})," \xa0\xa0\xa0 ",r.a.createElement("button",{type:"submit"},"save")),r.a.createElement("button",{onClick:function(){return j(!O)}},"show ",O?"important":"all")),r.a.createElement(h,{text:"Notes App, JohnGiag 2020"}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.36738b81.chunk.js.map
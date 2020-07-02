(function(e){function o(o){for(var n,i,a=o[0],c=o[1],l=o[2],u=0,p=[];u<a.length;u++)i=a[u],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&p.push(s[i][0]),s[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);d&&d(o);while(p.length)p.shift()();return r.push.apply(r,l||[]),t()}function t(){for(var e,o=0;o<r.length;o++){for(var t=r[o],n=!0,a=1;a<t.length;a++){var c=t[a];0!==s[c]&&(n=!1)}n&&(r.splice(o--,1),e=i(i.s=t[0]))}return e}var n={},s={app:0},r=[];function i(o){if(n[o])return n[o].exports;var t=n[o]={i:o,l:!1,exports:{}};return e[o].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=n,i.d=function(e,o,t){i.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,o){if(1&o&&(e=i(e)),8&o)return e;if(4&o&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var n in e)i.d(t,n,function(o){return e[o]}.bind(null,n));return t},i.n=function(e){var o=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(o,"a",o),o},i.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},i.p="/web-rtc-demo-app/dist/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=o,a=a.slice();for(var l=0;l<a.length;l++)o(a[l]);var d=c;r.push([0,"chunk-vendors"]),t()})({0:function(e,o,t){e.exports=t("cd49")},"034f":function(e,o,t){"use strict";var n=t("85ec"),s=t.n(n);s.a},"0cf6":function(e,o,t){"use strict";var n=t("7086"),s=t.n(n);s.a},2154:function(e,o,t){"use strict";var n=t("ed34"),s=t.n(n);s.a},5654:function(e,o,t){},"62ca":function(e,o,t){"use strict";var n=t("90d1"),s=t.n(n);s.a},7086:function(e,o,t){},"714b":function(e,o,t){"use strict";var n=function(){var e=this,o=e.$createElement,t=e._self._c||o;return this.open?t("div",{staticClass:"modal",class:{"is-fixed":e.fixed}},[t("div",{staticClass:"backdrop",on:{click:function(o){return e.$emit("close")}}}),t("div",{staticClass:"dialog"},[t("header",{staticClass:"header"},[e._t("header"),t("span",{staticClass:"close-icon",on:{click:function(o){return e.$emit("close")}}},[e._t("close-icon",[e._v("×")])],2)],2),t("div",{staticClass:"content"},[e._t("default")],2),t("footer",{staticClass:"footer"},[e._t("footer",[t("button",{on:{click:function(o){return e.$emit("close")}}},[e._v("Close")])])],2)])]):e._e()},s=[],r={name:"Modal",props:{open:Boolean,fixed:{type:Boolean,default:!1}}},i=r,a=(t("62ca"),t("2877")),c=Object(a["a"])(i,n,s,!1,null,"4a83eccf",null);o["a"]=c.exports},"78b4":function(e,o,t){"use strict";t.r(o);var n=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("main",[t("h1",[e._v(e._s("Session "+e.$route.query.sessionName))]),e.$route.query.serverUrl?e._e():t("Modal",{attrs:{fixed:"",open:""},on:{close:function(o){return e.$router.replace("/")}},scopedSlots:e._u([{key:"header",fn:function(){return[t("h3",[e._v(e._s("Error !"))])]},proxy:!0}],null,!1,2136969466)},[t("p",[e._v(e._s("A server URL is required."))])]),t("Modal",{attrs:{fixed:"",open:!!e.error},on:{close:function(o){e.error=void 0}},scopedSlots:e._u([{key:"header",fn:function(){return[t("h3",[e._v(e._s("An unknown error occurred"))])]},proxy:!0}])},[t("p",[e._v(e._s("This is the error"))]),e.error?t("pre",[e._v("      "+e._s(e.error.message)+"\n      "+e._s(e.error.stack)+"\n    ")]):e._e()]),t("Modal",{attrs:{fixed:"",open:e.unableToReachServer},on:{close:function(o){e.unableToReachServer=void 0}},scopedSlots:e._u([{key:"header",fn:function(){return[t("h3",[e._v("Oopsie…")])]},proxy:!0}])},[t("p",[e._v("Looks like the server is taking a nap, we can’t reach it…")])]),e.canJoinSession?e.isLocalPeerSetupReady?t("div",[t("h3",[e._v("Conference "+e._s(e.$route.query.sessionName))]),t("video",{key:"local-peer-video",ref:"local-peer-video",attrs:{playsinline:"",autoplay:"",muted:""},domProps:{muted:!0}}),e.peersManager?t("span",{staticStyle:{display:"inline-block"}},e._l(e.peersManager.peerConnections.keys(),(function(e){return t("video",{key:e,ref:e,refInFor:!0,attrs:{playsinline:"",autoplay:""}})})),0):e._e()]):t("div",[t("ul",{staticStyle:{"text-align":"left","line-height":"2.5em"}},[t("h3",{staticStyle:{margin:"0"}},[e._v("Before joining the session:")]),t("li",[e._v("Accept sharing your audio & video with this us.")]),t("li",[e._v("Check out your video (below) to see if everything is OK.")]),t("li",[e._v("If necessary, you can "),t("button",{on:{click:e.askLocalStream}},[e._v("Re-ask to get your audio & video")])])]),t("div",[t("video",{key:"local-peer-video",ref:"test-video",attrs:{playsinline:"",autoplay:"",muted:""},domProps:{muted:!0}})]),t("div",{staticStyle:{padding:"2em 0"}},[t("button",{attrs:{disabled:!e.localStream},on:{click:e.finishInitialSetup}},[e._v("Let’s go to that conference call")])])]):t("div",[t("h3",[e._v("Let’s initialize that session dude.")]),e.joinSessionLoading?t("div",[e._v(" Joining the session… ")]):e._e(),t("Modal",{attrs:{fixed:"",open:!1===e.canJoinSession},on:{close:function(o){return e.$router.replace("/")}},scopedSlots:e._u([{key:"header",fn:function(){return[t("h3",[e._v("Aïe aïe aïe")])]},proxy:!0}],null,!1,3527552773)},[t("p",[e._v(" You cannot join this session. Either this session does not exist, either the URL you were given is wrong. ")])])],1)],1)},s=[],r=t("12fd"),i=t("714b"),a=t("9ab4"),c=[{urls:"stun:stun.stunprotocol.org:3478"},{urls:"turn:137.74.113.202:3478",username:"azfne",credential:"oegiojre"}],l=function(){function e(e){var o=this;this.localPeerId=e.localPeerId,this.remotePeerId=e.remotePeerId,this.socketAPI=e.socketAPI,this.connection=new RTCPeerConnection({iceServers:c}),this.remoteStream=null,this.remotePeerVideo=null,e.localStream.getTracks().map((function(t){return o.connection.addTrack(t,e.localStream)})),this.registerICECandidatesListener(),this.connection.addEventListener("track",(function(e){o.remoteStream=e.streams[0],console.debug("PeerConnection: received remote stream"),o.remotePeerVideo&&(o.remotePeerVideo.srcObject=o.remoteStream)}))}return e.prototype.onClose=function(e){var o=this;return this.connection.addEventListener("connectionstatechange",(function(t){switch(console.debug("PeerConnection: connection state change",t,"connection state:",o.connection.connectionState),o.connection.connectionState){case"closed":case"disconnected":case"failed":e(t);break;default:break}})),this},e.prototype.registerVideo=function(e){return this.remotePeerVideo=e,console.debug("PeerConnection: registerVideo()"),this.remoteStream&&(this.remotePeerVideo.srcObject=this.remoteStream),this},e.prototype.registerICECandidatesListener=function(){var e=this;return this.connection.addEventListener("icecandidate",(function(o){o.candidate&&(console.debug("PeerConnection: emit ICE candidate to",e.remotePeerId,o.candidate),console.debug("PeerConnection: PeerConnection send ICE candidates"),e.socketAPI.send({type:"ice-candidate",candidate:o.candidate,fromPeerId:e.localPeerId,toPeerId:e.remotePeerId}))})),this.socketAPI.onIceCandidate((function(o){"ice-candidate"===o.type&&(console.debug("PeerConnection:",e.localPeerId,"receive ice candidate from",o.fromPeerId,o.candidate),e.connection.addIceCandidate(new RTCIceCandidate(o.candidate)).catch(console.error))})),this.connection.addEventListener("iceconnectionstatechange",(function(o){console.debug("PeerConnection: ice connection state change",o,e.connection.iceConnectionState)})),this},e}(),d=(new Map,{offerToReceiveAudio:!0,offerToReceiveVideo:!0,voiceActivityDetection:!0}),u=function(){function e(e){var o=this,t=e.socketAPI,n=e.localPeerId,s=e.localStream;this.socketAPI=t,this.localPeerId=n,this.localStream=s,this.peerConnections=new Map,t.onConnectedPeers((function(e){return o.onConnectedPeers(e)})),t.onOffer((function(e){return o.onOffer(e)})),t.onAnswer((function(e){return o.onAnswer(e)}))}return e.prototype.getPeerConnection=function(e){var o=this.peerConnections.get(e);if(!o)throw console.debug("PeersManager: available peer connections",this.peerConnections),new Error("No peer connection with remote peer "+e);return o},e.prototype.closeAllConnections=function(){this.socketAPI.close()},e.prototype.onConnectedPeers=function(e){var o=this;if("connected-peers-id"!==e.type)throw new Error("Invalid connected peers message");console.debug("PeersManager: connected-peers-id",e);var t=e.peerIds.filter((function(e){return e!==o.localPeerId})).map((function(e){return Object(a["a"])(o,void 0,void 0,(function(){var o,t;return Object(a["b"])(this,(function(n){switch(n.label){case 0:return o=new l({localPeerId:this.localPeerId,remotePeerId:e,localStream:this.localStream,socketAPI:this.socketAPI}),console.debug("PeersManager: set peer connection with",e),this.peerConnections.set(e,o),[4,o.connection.createOffer(d)];case 1:return t=n.sent(),[4,o.connection.setLocalDescription(t)];case 2:return n.sent(),console.debug("PeersManager: send offer to peer",e),this.socketAPI.send({type:"offer",description:t,offererId:this.localPeerId,answererId:e}),[2]}}))}))}));Promise.all(t).catch(console.error)},e.prototype.onOffer=function(e){return Object(a["a"])(this,void 0,Promise,(function(){var o,t;return Object(a["b"])(this,(function(n){switch(n.label){case 0:if("offer"!==e.type)throw new Error("Invalid offer socket message");return console.debug("PeersManager: received offer",e,this.peerConnections),o=this.getPeerConnection(e.offererId),[4,o.connection.setRemoteDescription(e.description)];case 1:return n.sent(),[4,o.connection.createAnswer(d)];case 2:return t=n.sent(),[4,o.connection.setLocalDescription(t)];case 3:return n.sent(),console.debug("PeersManager: send answer"),this.socketAPI.send({type:"answer",answererId:this.localPeerId,offererId:e.offererId,description:t}),[2]}}))}))},e.prototype.onAnswer=function(e){if("answer"!==e.type)throw new Error("Invalid answer socket message");console.debug("PeersManager: received answer",e,this.peerConnections);var o=this.getPeerConnection(e.answererId);o.connection.setRemoteDescription(e.description)},e}();function p(){const e=Math.round(1e5*Math.random());return"peer-"+e}var f={name:"Session",components:{Modal:i["a"]},data:()=>({joinSessionLoading:!1,canJoinSession:void 0,unableToReachServer:void 0,error:void 0,isLocalPeerSetupReady:!1,localStream:null,localPeerId:p(),peersManager:null}),async mounted(){const{serverUrl:e,password:o,sessionName:t}=this.$route.query,n=new r["ServerAPI"]({url:new URL(e).origin});if("string"!==typeof t)throw new Error("sessionName should be a string");this.joinSessionLoading=!0,console.info("local peer id",this.localPeerId);try{const e=await n.joinSession(t,o);this.canJoinSession=e.ok}catch(s){console.error(s),this.unableToReachServer=!0}this.joinSessionLoading=!1,this.canJoinSession&&!this.unableToReachServer&&await this.askLocalStream()},errorCaptured(e){this.error=e},beforeDestroy(){console.info("beforeDestroy()"),this.peersManager&&this.peersManager.closeAllConnections()},methods:{finishInitialSetup(){this.isLocalPeerSetupReady=!0;const{serverUrl:e,sessionName:o}=this.$route.query,t=new URL(e);t.protocol=window.location.protocol.replace("http","ws");const n=r["SOCKET_ROUTE"].replace("{sessionName}",o).replace("{peerId}",this.localPeerId);this.peersManager=new u({socketAPI:new r["SocketAPI"]({url:new URL(n,t).href,sessionName:o,peerId:this.localPeer}),localPeerId:this.localPeerId,localStream:this.localStream}),this.$nextTick(()=>{this.registerRemotePeersVideo(),this.$refs["local-peer-video"].srcObject=this.localStream}),this.$watch("peersManager.size",()=>{this.$nextTick(()=>this.registerRemotePeersVideo())})},registerRemotePeersVideo(){this.peersManager.peerConnections.forEach((e,o)=>{e.registerVideo(this.$refs[o])})},async askLocalStream(){const e={echoCancellation:!0,noiseSuppression:!0};this.localStream=await window.navigator.mediaDevices.getUserMedia({audio:e,video:e}),this.$refs["test-video"].srcObject=this.localStream}}},h=f,v=(t("0cf6"),t("2877")),m=Object(v["a"])(h,n,s,!1,null,null,null);o["default"]=m.exports},"85ec":function(e,o,t){},"90d1":function(e,o,t){},ca53:function(e,o,t){"use strict";var n=t("5654"),s=t.n(n);s.a},cd49:function(e,o,t){"use strict";t.r(o);var n=t("2b0e"),s=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"nav"}},[t("router-link",{attrs:{to:"/"}},[e._v("Home")])],1),e.$route.query.sessionName?e._e():t("Home"),e.$route.query.sessionName?t("Session"):e._e()],1)},r=[],i=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("main",{staticClass:"home"},[n("img",{attrs:{alt:"Vue logo",src:t("cf05")}}),n("form",{staticClass:"form",on:{submit:function(o){return o.preventDefault(),e.submit(o)}}},[n("fieldset",[n("legend",[e._v(" Start a conference ")]),n("label",[e._v(" Server URL "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.serverUrl,expression:"serverUrl"}],attrs:{type:"url",required:""},domProps:{value:e.serverUrl},on:{input:function(o){o.target.composing||(e.serverUrl=o.target.value)}}})]),n("label",[e._v(" Session Name "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.sessionName,expression:"sessionName"}],staticClass:"text-input",attrs:{type:"text",required:""},domProps:{value:e.sessionName},on:{input:function(o){o.target.composing||(e.sessionName=o.target.value)}}})]),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.sessionWithPassword,expression:"sessionWithPassword"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.sessionWithPassword)?e._i(e.sessionWithPassword,null)>-1:e.sessionWithPassword},on:{change:function(o){var t=e.sessionWithPassword,n=o.target,s=!!n.checked;if(Array.isArray(t)){var r=null,i=e._i(t,r);n.checked?i<0&&(e.sessionWithPassword=t.concat([r])):i>-1&&(e.sessionWithPassword=t.slice(0,i).concat(t.slice(i+1)))}else e.sessionWithPassword=s}}}),e._v(" Add a password ")]),e.sessionWithPassword?n("label",[e._v(" Password "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"text-input",attrs:{type:"password"},domProps:{value:e.password},on:{input:function(o){o.target.composing||(e.password=o.target.value)}}})]):e._e(),n("hr"),e._m(0)]),n("Modal",{attrs:{fixed:"",open:e.createSessionLoading||e.sessionExistsLoading},on:{close:e.resetForm},scopedSlots:e._u([{key:"header",fn:function(){return[n("h3",[e._v("Loading…")])]},proxy:!0},{key:"footer",fn:function(){return[n("p",{staticStyle:{"text-align":"center"}},[e._v("No actions")])]},proxy:!0}])},[e.sessionExistsLoading?n("p",[e._v("Checking if session is available")]):e._e(),e.createSessionLoading?n("p",[e._v("Creating session")]):e._e()]),n("Modal",{attrs:{fixed:"",open:e.sessionExists},on:{close:e.resetForm},scopedSlots:e._u([{key:"header",fn:function(){return[n("h3",[e._v("Sorry!")])]},proxy:!0}])},[n("p",[e._v("This section already exists")])]),n("Modal",{attrs:{fixed:"",open:!1===e.createdSessionSuccessfully},on:{close:e.resetForm},scopedSlots:e._u([{key:"header",fn:function(){return[n("h3",[e._v("Something went wrong")])]},proxy:!0}])},[n("p",[e._v("For an unknown reason, we were unable to create your session. Please try again.")]),n("p",[e._v("If the problem persists, maybe try a bit later. Sorry for the inconvenience.")])]),n("Modal",{attrs:{fixed:"",open:!0===e.unableToReachServer},on:{close:e.resetForm},scopedSlots:e._u([{key:"header",fn:function(){return[n("h3",[e._v("Oopsie…")])]},proxy:!0}])},[n("p",[e._v("It looks like the server is taking a nap, we can’t reach it… :/")])]),n("Modal",{attrs:{fixed:"",open:e.createdSessionSuccessfully},scopedSlots:e._u([{key:"header",fn:function(){return[n("h3",[e._v("Success !")])]},proxy:!0},e.sessionUrl?{key:"footer",fn:function(){return[n("button",{on:{click:function(o){e.$router.push(e.sessionUrl.href.replace(e.sessionUrl.origin,""))}}},[e._v("Let’s go !")])]},proxy:!0}:null],null,!0)},[e.sessionUrl?n("p",[e._v(" Copy the following link to share with your friends: "),n("input",{attrs:{type:"text"},domProps:{value:e.sessionUrl.href}})]):e._e()])],1)])},a=[function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"form-footer"},[t("button",{attrs:{type:"submit"}},[e._v("Submit")])])}],c=t("714b"),l=t("12fd"),d={name:"Home",components:{Modal:c["a"]},data:()=>({sessionName:"",sessionWithPassword:!1,password:"",serverUrl:"",sessionUrl:void 0,unableToReachServer:void 0,sessionExistsLoading:!1,sessionExists:void 0,createSessionLoading:!1,createdSessionSuccessfully:void 0}),methods:{async submit(){const e=new l["ServerAPI"]({url:new URL(this.serverUrl).origin});this.sessionExistsLoading=!0;try{const o=await e.sessionExists(this.sessionName);this.sessionExists=o.ok}catch(o){this.unableToReachServer=!0}if(this.sessionExistsLoading=!1,!this.unableToReachServer&&!this.sessionExists){this.createSessionLoading=!0;try{const o=await e.createSession(this.sessionName,this.password);this.createdSessionSuccessfully=o.ok,this.sessionUrl=new URL("/",window.location.origin),this.sessionUrl.searchParams.set("serverUrl",this.serverUrl),this.sessionUrl.searchParams.set("sessionName",this.sessionName),this.password&&this.sessionUrl.searchParams.set("password",this.password)}catch(o){this.unableToReachServer=!0}this.createSessionLoading=!1}},resetForm(){this.unableToReachServer=void 0,this.sessionUrl=void 0,this.sessionExistsLoading=!1,this.sessionExists=void 0,this.createSessionLoading=!1,this.createdSessionSuccessfully=void 0}}},u=d,p=(t("ca53"),t("2154"),t("2877")),f=Object(p["a"])(u,i,a,!1,null,"7b587502",null),h=f.exports,v=t("78b4"),m={name:"App",components:{Home:h,Session:v["default"]}},g=m,y=(t("034f"),Object(p["a"])(g,s,r,!1,null,null,null)),w=y.exports,b=t("9483");Object(b["a"])("/web-rtc-demo-app/dist/service-worker.js",{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var P=t("8c4f");n["a"].use(P["a"]);var S=[{path:"/",name:"Home",component:h},{path:"/sessions/:sessionName",name:"Session",component:function(){return Promise.resolve().then(t.bind(null,"78b4"))}}],_=new P["a"]({mode:"history",base:"/web-rtc-demo-app/dist/",routes:S}),k=_;n["a"].config.productionTip=!1,new n["a"]({router:k,render:function(e){return e(w)}}).$mount("#app")},cf05:function(e,o,t){e.exports=t.p+"img/logo.82b9c7a5.png"},ed34:function(e,o,t){}});
//# sourceMappingURL=app.9d8364cc.js.map
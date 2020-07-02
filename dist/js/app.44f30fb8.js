(function(e){function t(t){for(var s,i,a=t[0],c=t[1],l=t[2],u=0,h=[];u<a.length;u++)i=a[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&h.push(n[i][0]),n[i]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);d&&d(t);while(h.length)h.shift()();return r.push.apply(r,l||[]),o()}function o(){for(var e,t=0;t<r.length;t++){for(var o=r[t],s=!0,a=1;a<o.length;a++){var c=o[a];0!==n[c]&&(s=!1)}s&&(r.splice(t--,1),e=i(i.s=o[0]))}return e}var s={},n={app:0},r=[];function i(t){if(s[t])return s[t].exports;var o=s[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=s,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(o,s,function(t){return e[t]}.bind(null,s));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/web-rtc-demo-app/dist/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var d=c;r.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("cd49")},"034f":function(e,t,o){"use strict";var s=o("85ec"),n=o.n(s);n.a},"0cf6":function(e,t,o){"use strict";var s=o("7086"),n=o.n(s);n.a},2154:function(e,t,o){"use strict";var s=o("ed34"),n=o.n(s);n.a},"543c":function(e,t,o){},5654:function(e,t,o){},7086:function(e,t,o){},"714b":function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return this.open?o("div",{staticClass:"modal",class:{"is-fixed":e.fixed}},[o("div",{staticClass:"backdrop",on:{click:function(t){return e.$emit("close")}}}),o("div",{staticClass:"dialog"},[o("header",{staticClass:"header"},[e._t("header"),o("span",{staticClass:"close-icon",on:{click:function(t){return e.$emit("close")}}},[e._t("close-icon",[e._v("×")])],2)],2),o("div",{staticClass:"content"},[e._t("default")],2),o("footer",{staticClass:"footer"},[e._t("footer",[o("button",{on:{click:function(t){return e.$emit("close")}}},[e._v("Close")])])],2)])]):e._e()},n=[],r={name:"Modal",props:{open:Boolean,fixed:{type:Boolean,default:!1}}},i=r,a=(o("8f27"),o("2877")),c=Object(a["a"])(i,s,n,!1,null,"65614be0",null);t["a"]=c.exports},7545:function(e,t,o){"use strict";var s=o("d25d"),n=o.n(s);n.a},"78b4":function(e,t,o){"use strict";o.r(t);var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("main",[o("h1",[e._v(e._s("Session "+e.$route.query.sessionName))]),e.$route.query.serverUrl?e._e():o("Modal",{attrs:{fixed:"",open:""},on:{close:function(t){return e.$router.replace("/")}},scopedSlots:e._u([{key:"header",fn:function(){return[o("h3",[e._v(e._s("Error !"))])]},proxy:!0}],null,!1,2136969466)},[o("p",[e._v(e._s("A server URL is required."))])]),o("Modal",{attrs:{fixed:"",open:!!e.error},on:{close:function(t){e.error=void 0}},scopedSlots:e._u([{key:"header",fn:function(){return[o("h3",[e._v(e._s("An unknown error occurred"))])]},proxy:!0}])},[o("p",[e._v(e._s("This is the error"))]),e.error?o("pre",[e._v("      "+e._s(e.error.message)+"\n      "+e._s(e.error.stack)+"\n    ")]):e._e()]),o("Modal",{attrs:{fixed:"",open:e.unableToReachServer},on:{close:function(t){e.unableToReachServer=void 0}},scopedSlots:e._u([{key:"header",fn:function(){return[o("h3",[e._v("Oopsie…")])]},proxy:!0}])},[o("p",[e._v("Looks like the server is taking a nap, we can’t reach it…")])]),e.canJoinSession?e.isLocalPeerSetupReady?o("div",[o("h3",[e._v("Conference "+e._s(e.$route.query.sessionName))]),o("p",[o("button",{on:{click:function(t){e.isChatDrawerOpened=!0}}},[e._v("Open chat")])]),o("Drawer",{attrs:{position:"left",open:e.isChatDrawerOpened},on:{close:function(t){e.isChatDrawerOpened=!1}}},[o("div",{ref:"chat-messages-root",staticClass:"chat-messages"}),o("form",{ref:"chat-form",staticClass:"chat-form",on:{submit:function(t){return t.preventDefault(),e.submitChatMessage(t)}}},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.chatMessage,expression:"chatMessage"}],attrs:{name:"message",placeholder:"Type something…",required:""},domProps:{value:e.chatMessage},on:{input:function(t){t.target.composing||(e.chatMessage=t.target.value)}}}),o("button",{attrs:{type:"submit"}},[e._v("Send 👻")])])]),o("video",{key:"local-peer-video",ref:"local-peer-video",attrs:{playsinline:"",autoplay:"",muted:""},domProps:{muted:!0}}),o("span",{ref:"peers-video-root",staticStyle:{display:"inline-block"}})],1):o("div",[o("ul",{staticStyle:{"text-align":"left","line-height":"2.5em"}},[o("h3",{staticStyle:{margin:"0"}},[e._v("Before joining the session:")]),o("li",[e._v("Accept sharing your audio & video with this us.")]),o("li",[e._v("Check out your video (below) to see if everything is OK.")]),o("li",[e._v("If necessary, you can "),o("button",{on:{click:e.askLocalStream}},[e._v("Re-ask to get your audio & video")])])]),o("div",[o("video",{key:"local-peer-video",ref:"test-video",attrs:{playsinline:"",autoplay:"",muted:""},domProps:{muted:!0}})]),o("div",{staticStyle:{padding:"2em 0"}},[o("button",{attrs:{disabled:!e.localStream},on:{click:e.finishInitialSetup}},[e._v("Let’s go to that conference call")])])]):o("div",[o("h3",[e._v("Let’s initialize that session dude.")]),e.joinSessionLoading?o("div",[e._v(" Joining the session… ")]):e._e(),o("Modal",{attrs:{fixed:"",open:!1===e.canJoinSession},on:{close:function(t){return e.$router.replace("/")}},scopedSlots:e._u([{key:"header",fn:function(){return[o("h3",[e._v("Aïe aïe aïe")])]},proxy:!0}],null,!1,3527552773)},[o("p",[e._v(" You cannot join this session. Either this session does not exist, either the URL you were given is wrong. ")])])],1)],1)},n=[],r=o("12fd"),i=o("714b"),a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[e.open?o("div",{staticClass:"backdrop",on:{click:function(t){return e.$emit("close")}}}):e._e(),o("div",{class:"drawer drawer-"+this.position+(this.open?" open":"")},[o("span",{staticClass:"close-icon",on:{click:function(t){return e.$emit("close")}}},[e._t("close-icon",[e._v("×")])],2),e._t("default")],2)])},c=[];const l=["left","right"];var d={name:"Drawer",props:{open:Boolean,position:{required:!0,validator:e=>l.includes(e)}}},u=d,h=(o("7545"),o("2877")),p=Object(h["a"])(u,a,c,!1,null,"28fbaa36",null),f=p.exports,v=o("9ab4");function m(e){var t=JSON.parse(e.data.toString("utf-8"));switch(t.type){case"chat-message":return t;default:throw new Error("Invalid data message")}}var g=function(){function e(e){var t=this,o=e.dataChannel,s=e.localPeerId,n=e.chatMessagesRootNode;this.dataChannel=o,this.localPeerId=s,this.chatMessagesRootNode=n,o.addEventListener("open",(function(){return console.debug("data channel opened",s)})),o.addEventListener("close",(function(){return console.debug("data channel closed",s)})),o.addEventListener("error",(function(e){return console.error(e.error)})),this.onChatMessage((function(e){console.debug("PeerChatAPI: received chat message",e,t),t.appendMessageNode(e.content,e.author)}))}return e.prototype.onChatMessage=function(e){return this.dataChannel.addEventListener("message",(function(t){var o=m(t);"chat-message"===o.type&&e(o)})),this},e.prototype.sendMessage=function(e){var t={type:"chat-message",author:this.localPeerId,content:e};return console.debug("PeerChatAPI: sendMessage",t,this),this.dataChannel.send(JSON.stringify(t)),this.appendMessageNode(e,this.localPeerId),this},e.prototype.appendMessageNode=function(e,t){var o=this.chatMessagesRootNode.appendChild(document.createElement("div"));o.className="bubble "+(t===this.localPeerId?"local-peer":"remote-peer");var s=o.appendChild(document.createElement("div"));s.className="author",s.textContent=t;var n=o.appendChild(document.createElement("div"));n.textContent=e},e}(),y=[{urls:"stun:stun.stunprotocol.org:3478"},{urls:"turn:137.74.113.202:3478",username:"azfne",credential:"oegiojre"}],w=function(){function e(e){var t=this;this.localPeerId=e.localPeerId,this.remotePeerId=e.remotePeerId,this.socketAPI=e.socketAPI,this.connection=new RTCPeerConnection({iceServers:y}),this.remoteStream=null,this.remotePeerVideo=null,this.peerChatAPI=new g({dataChannel:this.connection.createDataChannel("chat"),chatMessagesRootNode:e.chatMessagesRootNode,localPeerId:this.localPeerId}),this.onClose((function(){return t.peerChatAPI.dataChannel.close()})),e.localStream.getTracks().map((function(o){return t.connection.addTrack(o,e.localStream)})),this.registerICECandidatesListener(),this.connection.addEventListener("track",(function(e){t.remoteStream=e.streams[0],console.debug("PeerConnection: received remote stream"),t.remotePeerVideo&&(t.remotePeerVideo.srcObject=t.remoteStream)}))}return e.prototype.onClose=function(e){var t=this;return this.connection.addEventListener("connectionstatechange",(function(o){switch(console.debug("PeerConnection: connection state change",o,"connection state:",t.connection.connectionState),t.connection.connectionState){case"closed":case"disconnected":case"failed":e(o);break;default:break}})),this},e.prototype.registerVideo=function(e){return this.remotePeerVideo=e,console.debug("PeerConnection: registerVideo()"),this.remoteStream&&(this.remotePeerVideo.srcObject=this.remoteStream),this},e.prototype.unregisterVideo=function(){return this.remotePeerVideo=null,this},e.prototype.registerICECandidatesListener=function(){var e=this;return this.connection.addEventListener("icecandidate",(function(t){t.candidate&&(console.debug("PeerConnection: emit ICE candidate to",e.remotePeerId,t.candidate),console.debug("PeerConnection: PeerConnection send ICE candidates"),e.socketAPI.send({type:"ice-candidate",candidate:t.candidate,fromPeerId:e.localPeerId,toPeerId:e.remotePeerId}))})),this.socketAPI.onIceCandidate((function(t){"ice-candidate"===t.type&&(console.debug("PeerConnection:",e.localPeerId,"receive ice candidate from",t.fromPeerId,t.candidate),e.connection.addIceCandidate(new RTCIceCandidate(t.candidate)).catch(console.error))})),this.connection.addEventListener("iceconnectionstatechange",(function(t){console.debug("PeerConnection: ice connection state change",t,e.connection.iceConnectionState)})),this},e}(),b=(new Map,{offerToReceiveAudio:!0,offerToReceiveVideo:!0,voiceActivityDetection:!0}),P=function(){function e(e){var t=this,o=e.socketAPI,s=e.localPeerId,n=e.localStream,r=e.videosRootNode,i=e.chatMessagesRootNode;this.socketAPI=o,this.localPeerId=s,this.localStream=n,this.peerConnections=new Map,this.videosRootNode=r,this.chatMessagesRootNode=i,o.onConnectedPeers((function(e){return t.onConnectedPeers(e)})),o.onOffer((function(e){return t.onOffer(e)})),o.onAnswer((function(e){return t.onAnswer(e)}))}return e.prototype.getPeerConnection=function(e){var t=this.peerConnections.get(e);if(!t)throw console.debug("PeersManager: available peer connections",this.peerConnections,this),new Error("No peer connection with remote peer "+e);return t},e.prototype.setPeerConnection=function(e,t){var o=this,s=this.videosRootNode.appendChild(document.createElement("video"));return s.setAttribute("autoplay",""),s.setAttribute("playsinline",""),t.registerVideo(s),t.onClose((function(){o.videosRootNode.removeChild(s),t.unregisterVideo()})),this.peerConnections.set(e,t),this},e.prototype.closeAllConnections=function(){this.socketAPI.close()},e.prototype.sendChatMessage=function(e){var t=this;this.peerConnections.forEach((function(o){console.debug("PeersManager: sendChatMessage",e,o,t),o.peerChatAPI.sendMessage(e)}))},e.prototype.onConnectedPeers=function(e){var t=this;if("connected-peers-id"!==e.type)throw new Error("Invalid connected peers message");console.debug("PeersManager: connected-peers-id",e,this);var o=e.peerIds.filter((function(e){return e!==t.localPeerId})).map((function(e){return Object(v["a"])(t,void 0,void 0,(function(){var t,o;return Object(v["b"])(this,(function(s){switch(s.label){case 0:return t=new w({localPeerId:this.localPeerId,remotePeerId:e,localStream:this.localStream,socketAPI:this.socketAPI,chatMessagesRootNode:this.chatMessagesRootNode}),console.debug("PeersManager: set peer connection with",e,this),this.setPeerConnection(e,t),[4,t.connection.createOffer(b)];case 1:return o=s.sent(),[4,t.connection.setLocalDescription(o)];case 2:return s.sent(),console.debug("PeersManager: send offer to peer",e,this),this.socketAPI.send({type:"offer",description:o,offererId:this.localPeerId,answererId:e}),[2]}}))}))}));Promise.all(o).catch(console.error)},e.prototype.onOffer=function(e){return Object(v["a"])(this,void 0,Promise,(function(){var t,o;return Object(v["b"])(this,(function(s){switch(s.label){case 0:if("offer"!==e.type)throw new Error("Invalid offer socket message");return console.debug("PeersManager: received offer",e,this.peerConnections,this),t=new w({localPeerId:this.localPeerId,remotePeerId:e.offererId,localStream:this.localStream,socketAPI:this.socketAPI,chatMessagesRootNode:this.chatMessagesRootNode}),this.setPeerConnection(e.offererId,t),[4,t.connection.setRemoteDescription(e.description)];case 1:return s.sent(),[4,t.connection.createAnswer(b)];case 2:return o=s.sent(),[4,t.connection.setLocalDescription(o)];case 3:return s.sent(),console.debug("PeersManager: send answer",this),this.socketAPI.send({type:"answer",answererId:this.localPeerId,offererId:e.offererId,description:o}),[2]}}))}))},e.prototype.onAnswer=function(e){if("answer"!==e.type)throw new Error("Invalid answer socket message");console.debug("PeersManager: received answer",e,this.peerConnections,this);var t=this.getPeerConnection(e.answererId);t.connection.setRemoteDescription(e.description)},e}();function S(){const e=Math.round(1e5*Math.random());return"peer-"+e}var _={name:"Session",components:{Modal:i["a"],Drawer:f},data:()=>({joinSessionLoading:!1,canJoinSession:void 0,unableToReachServer:void 0,error:void 0,isChatDrawerOpened:!1,chatMessage:"",isLocalPeerSetupReady:!1,localStream:null,localPeerId:S(),peersManager:null}),async mounted(){const{serverUrl:e,password:t,sessionName:o}=this.$route.query,s=new r["ServerAPI"]({url:new URL(e).origin});if("string"!==typeof o)throw new Error("sessionName should be a string");this.joinSessionLoading=!0,console.info("local peer id",this.localPeerId);try{const e=await s.joinSession(o,t);this.canJoinSession=e.ok}catch(n){console.error(n),this.unableToReachServer=!0}this.joinSessionLoading=!1,this.canJoinSession&&!this.unableToReachServer&&await this.askLocalStream()},errorCaptured(e){this.error=e},beforeDestroy(){console.info("beforeDestroy()"),this.peersManager&&this.peersManager.closeAllConnections()},methods:{finishInitialSetup(){this.isLocalPeerSetupReady=!0,this.$nextTick(()=>{this.$refs["local-peer-video"].srcObject=this.localStream;const{serverUrl:e,sessionName:t}=this.$route.query,o=new URL(e);o.protocol=window.location.protocol.replace("http","ws");const s=r["SOCKET_ROUTE"].replace("{sessionName}",t).replace("{peerId}",this.localPeerId);this.peersManager=new P({socketAPI:new r["SocketAPI"]({url:new URL(s,o).href,sessionName:t,peerId:this.localPeer}),videosRootNode:this.$refs["peers-video-root"],chatMessagesRootNode:this.$refs["chat-messages-root"],localPeerId:this.localPeerId,localStream:this.localStream})})},async askLocalStream(){const e={echoCancellation:!0,noiseSuppression:!0};this.localStream=await window.navigator.mediaDevices.getUserMedia({audio:e,video:e}),this.$refs["test-video"].srcObject=this.localStream},submitChatMessage(){console.debug("Session: send message",this.chatMessage,this),this.peersManager.sendChatMessage(this.chatMessage)}}},C=_,I=(o("0cf6"),Object(h["a"])(C,s,n,!1,null,null,null));t["default"]=I.exports},"85ec":function(e,t,o){},"8f27":function(e,t,o){"use strict";var s=o("543c"),n=o.n(s);n.a},ca53:function(e,t,o){"use strict";var s=o("5654"),n=o.n(s);n.a},cd49:function(e,t,o){"use strict";o.r(t);var s=o("2b0e"),n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("div",{attrs:{id:"nav"}},[o("router-link",{attrs:{to:"/"}},[e._v("Home")])],1),e.$route.query.sessionName?e._e():o("Home"),e.$route.query.sessionName?o("Session"):e._e()],1)},r=[],i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("main",{staticClass:"home"},[s("img",{attrs:{alt:"Vue logo",src:o("cf05")}}),s("form",{staticClass:"form",on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[s("fieldset",[s("legend",[e._v(" Start a conference ")]),s("label",[e._v(" Server URL "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.serverUrl,expression:"serverUrl"}],attrs:{type:"url",required:""},domProps:{value:e.serverUrl},on:{input:function(t){t.target.composing||(e.serverUrl=t.target.value)}}})]),s("label",[e._v(" Session Name "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.sessionName,expression:"sessionName"}],staticClass:"text-input",attrs:{type:"text",required:""},domProps:{value:e.sessionName},on:{input:function(t){t.target.composing||(e.sessionName=t.target.value)}}})]),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.sessionWithPassword,expression:"sessionWithPassword"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.sessionWithPassword)?e._i(e.sessionWithPassword,null)>-1:e.sessionWithPassword},on:{change:function(t){var o=e.sessionWithPassword,s=t.target,n=!!s.checked;if(Array.isArray(o)){var r=null,i=e._i(o,r);s.checked?i<0&&(e.sessionWithPassword=o.concat([r])):i>-1&&(e.sessionWithPassword=o.slice(0,i).concat(o.slice(i+1)))}else e.sessionWithPassword=n}}}),e._v(" Add a password ")]),e.sessionWithPassword?s("label",[e._v(" Password "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"text-input",attrs:{type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]):e._e(),s("hr"),e._m(0)]),s("Modal",{attrs:{fixed:"",open:e.createSessionLoading||e.sessionExistsLoading},on:{close:e.resetForm},scopedSlots:e._u([{key:"header",fn:function(){return[s("h3",[e._v("Loading…")])]},proxy:!0},{key:"footer",fn:function(){return[s("p",{staticStyle:{"text-align":"center"}},[e._v("No actions")])]},proxy:!0}])},[e.sessionExistsLoading?s("p",[e._v("Checking if session is available")]):e._e(),e.createSessionLoading?s("p",[e._v("Creating session")]):e._e()]),s("Modal",{attrs:{fixed:"",open:e.sessionExists},on:{close:e.resetForm},scopedSlots:e._u([{key:"header",fn:function(){return[s("h3",[e._v("Sorry!")])]},proxy:!0}])},[s("p",[e._v("This section already exists")])]),s("Modal",{attrs:{fixed:"",open:!1===e.createdSessionSuccessfully},on:{close:e.resetForm},scopedSlots:e._u([{key:"header",fn:function(){return[s("h3",[e._v("Something went wrong")])]},proxy:!0}])},[s("p",[e._v("For an unknown reason, we were unable to create your session. Please try again.")]),s("p",[e._v("If the problem persists, maybe try a bit later. Sorry for the inconvenience.")])]),s("Modal",{attrs:{fixed:"",open:!0===e.unableToReachServer},on:{close:e.resetForm},scopedSlots:e._u([{key:"header",fn:function(){return[s("h3",[e._v("Oopsie…")])]},proxy:!0}])},[s("p",[e._v("It looks like the server is taking a nap, we can’t reach it… :/")])]),s("Modal",{attrs:{fixed:"",open:e.createdSessionSuccessfully},scopedSlots:e._u([{key:"header",fn:function(){return[s("h3",[e._v("Success !")])]},proxy:!0},e.sessionUrl?{key:"footer",fn:function(){return[s("button",{on:{click:function(t){e.$router.push(e.sessionUrl.href.replace(e.sessionUrl.origin,""))}}},[e._v("Let’s go !")])]},proxy:!0}:null],null,!0)},[e.sessionUrl?s("p",[e._v(" Copy the following link to share with your friends: "),s("input",{attrs:{type:"text"},domProps:{value:e.sessionUrl.href}})]):e._e()])],1)])},a=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"form-footer"},[o("button",{attrs:{type:"submit"}},[e._v("Submit")])])}],c=o("714b"),l=o("12fd"),d={name:"Home",components:{Modal:c["a"]},data:()=>({sessionName:"",sessionWithPassword:!1,password:"",serverUrl:"",sessionUrl:void 0,unableToReachServer:void 0,sessionExistsLoading:!1,sessionExists:void 0,createSessionLoading:!1,createdSessionSuccessfully:void 0}),methods:{async submit(){const e=new l["ServerAPI"]({url:new URL(this.serverUrl).origin});this.sessionExistsLoading=!0;try{const t=await e.sessionExists(this.sessionName);this.sessionExists=t.ok}catch(t){this.unableToReachServer=!0}if(this.sessionExistsLoading=!1,!this.unableToReachServer&&!this.sessionExists){this.createSessionLoading=!0;try{const t=await e.createSession(this.sessionName,this.password);this.createdSessionSuccessfully=t.ok,this.sessionUrl=new URL("/",window.location.origin),this.sessionUrl.searchParams.set("serverUrl",this.serverUrl),this.sessionUrl.searchParams.set("sessionName",this.sessionName),this.password&&this.sessionUrl.searchParams.set("password",this.password)}catch(t){this.unableToReachServer=!0}this.createSessionLoading=!1}},resetForm(){this.unableToReachServer=void 0,this.sessionUrl=void 0,this.sessionExistsLoading=!1,this.sessionExists=void 0,this.createSessionLoading=!1,this.createdSessionSuccessfully=void 0}}},u=d,h=(o("ca53"),o("2154"),o("2877")),p=Object(h["a"])(u,i,a,!1,null,"7b587502",null),f=p.exports,v=o("78b4"),m={name:"App",components:{Home:f,Session:v["default"]}},g=m,y=(o("034f"),Object(h["a"])(g,n,r,!1,null,null,null)),w=y.exports,b=o("9483");Object(b["a"])("/web-rtc-demo-app/dist/service-worker.js",{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var P=o("8c4f");s["a"].use(P["a"]);var S=[{path:"/",name:"Home",component:f},{path:"/sessions/:sessionName",name:"Session",component:function(){return Promise.resolve().then(o.bind(null,"78b4"))}}],_=new P["a"]({mode:"history",base:"/web-rtc-demo-app/dist/",routes:S}),C=_;s["a"].config.productionTip=!1,new s["a"]({router:C,render:function(e){return e(w)}}).$mount("#app")},cf05:function(e,t,o){e.exports=o.p+"img/logo.82b9c7a5.png"},d25d:function(e,t,o){},ed34:function(e,t,o){}});
//# sourceMappingURL=app.44f30fb8.js.map
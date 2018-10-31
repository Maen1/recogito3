(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{13:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"c",function(){return c}),n.d(t,"b",function(){return l});var a=n(1),s=n(2),r=["author","title","language","date_freeform","uploaded_at","last_edit_at","last_edit_by","annotations","public_visibility"],c={author:"Author",title:"Title",language:"Language",date_freeform:"Date",uploaded_at:"Uploaded at",last_edit_at:"Last edit",last_edit_by:"Last edit by",annotations:"Annotations",public_visibility:"Visibility",status_ratio:"Verification ratio",activity:"Activity graph",owner:"Document owner",shared_by:"Shared by",access_level:"Access level"},i={agg_document:"XL",author:"M",title:"L",language:"M",date_freeform:"M",uploaded_at:"M",last_edit_at:"M",last_edit_by:"M",annotations:"M",public_visibility:"M",status_ratio:"M",activity:"M",owner:"M",shared_by:"M",access_level:"S"},o={agg_document:["author","document"]},l=function(){function e(){Object(a.a)(this,e)}return Object(s.a)(e,null,[{key:"getSpan",value:function(e){var t=i[e];return"XL"===t?6:"L"===t?4:"M"===t?2:"S"===t?1:void 0}},{key:"expandAggregatedColumns",value:function(e){return e.reduce(function(e,t){return t.startsWith("agg_")?e=e.concat(o[t]):e.push(t),e},[])}}]),e}()},21:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n(1),s=n(2),r=function(){function e(t,n){Object(a.a)(this,e),this._allItems=t,this._selection=n}return Object(s.a)(e,[{key:"clear",value:function(){this._selection=[]}},{key:"isEmpty",value:function(){return 0===this._selection.length}},{key:"getSelectedItems",value:function(){return this._selection}},{key:"selectItem",value:function(e,t){var n=this._selection.indexOf(e);t?n>-1?this._selection.splice(n,1):this._selection.push(e):this._selection=[e]}},{key:"selectRange",value:function(e){var t=this,n=this._selection.map(function(e){return t._allItems.indexOf(e)}),a=Math.min.apply(null,n),s=Math.max.apply(null,n),r=e>s||e<a,c=function(e,n){return t._allItems.slice(e,n+1)};this._selection=r&&e>s?c(a,e):r?c(e,s):c(a,e)}}]),e}()},216:function(e,t,n){e.exports=n(220)},217:function(e,t,n){},220:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n(2),r=n(4),c=n(3),i=n(5),o=n(0),l=n.n(o),u=n(16),m=n.n(u),p=n(18),h=n.n(p),d=function(){function e(){Object(a.a)(this,e)}return Object(s.a)(e,null,[{key:"fetchLoginStatus",value:function(){return h.a.get("/api/me")}},{key:"fetchPublicAccountInfo",value:function(e){return h.a.get("/api/account/".concat(e))}},{key:"fetchAccessibleDocuments",value:function(e){return h.a.get("/api/documents/accessible/".concat(e))}}]),e}(),f=n(52),b=n(51),v=n(49),y=n(44),g=n(50),E=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"sidebar"},l.a.createElement("div",{className:"section"},l.a.createElement(g.a,{account:this.props.account})))}}]),t}(o.Component),O=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"search"},l.a.createElement("div",{className:"wrapper"},l.a.createElement("input",{placeholder:"Search Recogito..."})),l.a.createElement("span",{className:"icon hand-lens"},"\uf002"))}}]),t}(o.Component),k=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"notLoggedIn",value:function(){return l.a.createElement("div",{className:"not logged-in"},l.a.createElement("a",{href:"/login"},"Log in"),"\xa0 | \xa0New to Recogito? \xa0",l.a.createElement("a",{href:"/"},"Learn more"))}},{key:"loggedInAs",value:function(){var e=this.props.me.real_name?this.props.me.real_name:this.props.me.username;return l.a.createElement("div",{className:"logged-in"},"Logged in as ",l.a.createElement("a",{href:"/".concat(this.props.me.username)},e))}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"top-bar"},l.a.createElement("div",{className:"top-left"},l.a.createElement("a",{href:"/my",className:"home"},l.a.createElement("img",{src:"/assets/images/logo-recogito-small.png",alt:"Recogito logo"})),this.props.me&&this.props.me.logged_in&&l.a.createElement("a",{href:"/my"},"My Workspace"),l.a.createElement("a",{href:"/help"},"Help"),l.a.createElement("a",{href:"/help/about"},"About"),l.a.createElement(O,null)),l.a.createElement("div",{className:"top-right"},this.props.me&&this.props.me.logged_in?this.loggedInAs():this.notLoggedIn())))}}]),t}(o.Component);n(217);n.d(t,"default",function(){return j});var j=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(r.a)(this,Object(c.a)(t).call(this,e))).state={me:null,visitedAccount:null,presentation:"TABLE",table_columns:["author","title","language","date_freeform","uploaded_at","last_edit_at"],table_sorting:null,busy:!1,documents:null},n._profileOwner=window.location.pathname.substring(1),n}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;d.fetchPublicAccountInfo(this._profileOwner).then(function(t){return e.setState({visitedAccount:t.data})}),d.fetchLoginStatus().then(function(t){return e.setState({me:t.data})}),d.fetchAccessibleDocuments(this._profileOwner).then(function(t){return e.setState({documents:t.data.items})})}},{key:"onTogglePresentation",value:function(e){this.setState(function(e){return{presentation:"TABLE"===e.presentation?"GRID":"TABLE"}})}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(k,{me:this.state.me}),l.a.createElement(E,{account:this.state.visitedAccount}),l.a.createElement("div",{className:"container"},l.a.createElement(v.a,{label:"Public Documents"}),l.a.createElement(y.a,{className:"presentation-toggle stroke7",icon:"TABLE"===this.state.presentation?"\ue645":"\ue636",onClick:this.onTogglePresentation.bind(this)}),this.state.documents&&(0===this.state.documents.length?l.a.createElement("div",{className:"no-public-documents"},this.state.visitedAccount.username," has not shared any documents yet"):"TABLE"===this.state.presentation?l.a.createElement(b.a,{folders:[],documents:this.state.documents,columns:this.state.table_columns,sorting:this.state.table_sorting,busy:this.state.busy,disableFiledrop:!0}):l.a.createElement(f.a,{folders:[],documents:this.state.documents,busy:this.state.busy,disableFiledrop:!0}))))}}]),t}(o.Component);m.a.render(l.a.createElement(j,null),document.getElementById("app"))},24:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var a=n(1),s=n(2),r=n(4),c=n(3),i=n(5),o=n(0),l=n.n(o),u=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"readme"},l.a.createElement("div",{className:"inner"},this.props.children))}}]),t}(o.Component)},30:function(e,t,n){"use strict";n.d(t,"a",function(){return m});var a=n(1),s=n(2),r=n(4),c=n(3),i=n(5),o=n(0),l=n.n(o),u=n(68).a.div({open:{bottom:"30px",transition:{ease:"easeOut",duration:200}},closed:{bottom:"-140px"}}),m=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(r.a)(this,Object(c.a)(t).call(this,e))).state={visible:!1},n}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setState({visible:!0})}},{key:"render",value:function(){return l.a.createElement("div",{className:"dropzone-decoration"},l.a.createElement(u,{className:"inner",pose:this.state.visible?"open":"closed"},l.a.createElement("span",{className:"icon"},"\uf0ee"),l.a.createElement("p",{className:"instructions"},"Drop files or IIIF manifest URLs to add them to your workspace."),l.a.createElement("p",{className:"supported"},"Supported formats: plain text (UTF-8), TEI/XML, image files, CSV (UTF-8)")))}}]),t}(o.Component)},44:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var a=n(1),s=n(2),r=n(4),c=n(3),i=n(5),o=n(0),l=n.n(o),u=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"header-icon ".concat(this.props.className),onClick:this.props.onClick},this.props.link?l.a.createElement("a",{href:this.props.link,className:"icon inner"},this.props.icon):l.a.createElement("span",{className:"icon inner"},this.props.icon))}}]),t}(o.Component)},49:function(e,t,n){"use strict";n.d(t,"a",function(){return m});var a=n(1),s=n(2),r=n(4),c=n(3),i=n(5),o=n(0),l=n.n(o),u={MY_DOCUMENTS:"My Documents",SHARED_WITH_ME:"Shared with me"},m=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.view?u[this.props.view]:this.props.label;return l.a.createElement("div",{className:"breadcrumbs"},l.a.createElement("h2",null,e))}}]),t}(o.Component)},50:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var a=n(1),s=n(2),r=n(4),c=n(3),i=n(5),o=n(0),l=n.n(o),u=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"formatURL",value:function(e){return e.replace(/^https?\:\/\//i,"")}},{key:"stringToHslColor",value:function(e){for(var t=0,n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t);return t%360}},{key:"render",value:function(){var e=this.props.account&&this.props.account.username&&this.props.account.member_since,t=e?"hsl(".concat(this.stringToHslColor(this.props.account.username),", 35%, 65%)"):"#e2e2e2";return l.a.createElement("div",{className:"identity"},l.a.createElement("div",{className:"user"},l.a.createElement("div",{className:"avatar",style:{backgroundColor:t}},l.a.createElement("div",{className:"inner"},e&&this.props.account.username.charAt(0).toUpperCase())),l.a.createElement("h1",null,e?this.props.account.real_name?this.props.account.real_name:this.props.account.username:l.a.createElement("span",{className:"placeholder"})),l.a.createElement("p",{className:"member-since"},e?l.a.createElement(l.a.Fragment,null,"Joined on ",new Intl.DateTimeFormat("en-GB",{year:"numeric",month:"short",day:"2-digit"}).format(new Date(this.props.account.member_since))):l.a.createElement("span",{className:"placeholder"}))),l.a.createElement("div",{className:"user-extended"},e&&this.props.account.bio&&l.a.createElement("p",{className:"bio"},this.props.account.bio),e&&this.props.account.website&&l.a.createElement("p",{className:"homepage"},l.a.createElement("a",{href:this.props.account.website},this.formatURL(this.props.account.website)))))}}]),t}(o.Component)},51:function(e,t,n){"use strict";var a=n(1),s=n(2),r=n(4),c=n(3),i=n(5),o=n(0),l=n.n(o),u=n(25),m=n(36),p=n(30),h=n(24),d=n(21),f=n(29),b=n(13),v=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(r.a)(this,Object(c.a)(t).call(this,e))).updateTotalRowSpan(e),n}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.updateTotalRowSpan(e)}},{key:"updateTotalRowSpan",value:function(e){this._totalSpan=e.columns.reduce(function(e,t){return e+b.b.getSpan(t)},0)}},{key:"getWidth",value:function(e){return b.b.getSpan(e)/this._totalSpan}}]),t}(o.Component),y=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"column-labels"},this.props.columns.map(function(n){return l.a.createElement("span",{key:n,style:{width:"".concat(100*Object(f.a)(Object(c.a)(t.prototype),"getWidth",e).call(e,n),"%")},className:"label ".concat(n),onClick:e.props.onSort.bind(e,n)},l.a.createElement("span",{className:"inner"},b.c[n]||n,e.props.sortColumn===n&&l.a.createElement("span",{className:"sort icon"},l.a.createElement("span",{className:"inner"},e.props.sortAsc?"\ue688":"\ue682"))))}))}}]),t}(v),g=n(40),E=n.n(g),O=n(67),k=n.n(O),j={TEXT_PLAIN:"icon_text.png",TEXT_TEIXML:"icon_tei.png",IMAGE_UPLOAD:"icon_image.png",IMAGE_IIIF:"icon_iiif.png",DATA_CSV:"icon_csv.png"},N={language:function(e){return e.toUpperCase()},uploaded_at:function(e){return new Intl.DateTimeFormat("en-GB",{year:"numeric",month:"short",day:"2-digit"}).format(new Date(e))},last_edit_at:function(e){return l.a.createElement(k.a,{date:e})},public_visibility:function(e){return"PUBLIC"===e?l.a.createElement("span",{className:"icon",title:"Open to anyone"},"\uf09c"):"WITH_LINK"===e?l.a.createElement("span",{className:"icon",title:"Open to anyone with the link"},"\uf0c1"):l.a.createElement("span",{className:"icon",title:"Private"},"\uf023")},annotations:function(e){return l.a.createElement(E.a,{displayType:"text",value:e,thousandSeparator:!0})}},_={agg_document:function(e){return e.author?"".concat(e.author,", ").concat(e.title):e.title}},C=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"createAggregateField",value:function(e,n){return l.a.createElement("a",{key:n,href:e,className:n.substring(4),style:{width:"".concat(100*Object(f.a)(Object(c.a)(t.prototype),"getWidth",this).call(this,n),"%")}},_[n](this.props.item))}},{key:"createField",value:function(e,n){var a=N[n],s=void 0!==this.props.item[n]?a?a(this.props.item[n]):this.props.item[n]:"";return l.a.createElement("a",{key:n,href:e,className:n,style:{width:"".concat(100*Object(f.a)(Object(c.a)(t.prototype),"getWidth",this).call(this,n),"%")}},s)}},{key:"render",value:function(){var e=this,t=this.props.item.filetypes[0],n="document/".concat(this.props.item.id,"/part/1/edit");return l.a.createElement("div",{className:"row".concat(this.props.selected?" selected":""),style:this.props.style,onClick:this.props.onClick},this.props.columns.map(function(t){return t.startsWith("agg_")?e.createAggregateField(n,t):e.createField(n,t)}),l.a.createElement("span",{className:"type icon ".concat(t)},l.a.createElement("img",{src:"/assets/images/".concat(j[t]),alt:"icon type ".concat(t)})))}}]),t}(v),w=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{style:this.props.style,className:"row folder"},l.a.createElement("a",{href:"#",className:"folder-icon"},"\uf07b"),l.a.createElement("a",{href:"#",className:"folder-name"},this.props.name))}}]),t}(o.Component),S=n(28),D=n(43),A=n.n(D),I=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"clicktrap ".concat(this.props.className)},l.a.createElement("div",{className:"modal-wrapper"},l.a.createElement(A.a,{handle:".modal-header"},l.a.createElement("div",{className:"modal"},l.a.createElement("div",{className:"modal-header"},l.a.createElement("h1",{className:"title"},this.props.title),l.a.createElement("button",{className:"close nostyle",onClick:this.props.onClose},"\ue897")),l.a.createElement("div",{className:"modal-body"},this.props.children)))))}}]),t}(o.Component),L=Object(S.SortableElement)(function(e){var t=e.label;return l.a.createElement("div",{className:"card"},t)}),M=Object(S.SortableContainer)(function(e){var t=e.items;return l.a.createElement("div",{className:"column-order"},t.map(function(e,t){return l.a.createElement(L,{key:"card-".concat(t),index:t,label:b.c[e]})}))}),R=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement(M,{items:this.props.items,onSortEnd:function(t){return e.props.onSortEnd(t.oldIndex,t.newIndex)}})}}]),t}(o.Component),T=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(r.a)(this,Object(c.a)(t).call(this,e))).state={columns:e.columns.slice(0)},n}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.columns!==this.props.columns&&this.setState({columns:e.columns.slice(0)})}},{key:"getCheckboxStates",value:function(e){var t=this,n={};return b.a.forEach(function(e){var a=t.state.columns.includes(e);n[e]=a}),n}},{key:"setAllRows",value:function(e){var t=this;e?function(){var e=b.a.filter(function(e){return!t.state.columns.includes(e)});t.setState({columns:t.state.columns.concat(e)})}():t.setState({columns:[]})}},{key:"onClickAll",value:function(){b.a.length===this.state.columns.length?this.setAllRows(!1):this.setAllRows(!0)}},{key:"toggleOne",value:function(e){this.setState(function(t){var n=t.columns.indexOf(e);return n<0?t.columns.push(e):t.columns.splice(n,1),t})}},{key:"onSort",value:function(e,t){this.setState({columns:Object(S.arrayMove)(this.state.columns,e,t)})}},{key:"render",value:function(){var e=this;return l.a.createElement(I,{className:"preferences",title:"Configure Columns",onClose:this.props.onCancel},l.a.createElement("div",{className:"scroll-pane"},l.a.createElement("div",{className:"selected-columns"},l.a.createElement("button",{className:"all nostyle",onClick:this.onClickAll.bind(this)},"All"),l.a.createElement("ul",null,b.a.map(function(t){return l.a.createElement("li",{key:t},l.a.createElement("input",{type:"checkbox",id:t,name:t,checked:e.state.columns.includes(t),onChange:e.toggleOne.bind(e,t)}),l.a.createElement("label",{htmlFor:t},b.c[t]))}))),l.a.createElement(R,{items:this.state.columns,onSortEnd:this.onSort.bind(this)})),l.a.createElement("div",{className:"buttons"},l.a.createElement("button",{className:"btn",onClick:this.props.onSave.bind(this,this.state.columns)},"Save"),l.a.createElement("button",{className:"btn outline",onClick:this.props.onCancel},"Cancel")))}}]),t}(o.Component);n.d(t,"a",function(){return F});var F=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(r.a)(this,Object(c.a)(t).call(this,e))).state={prefsOpen:!1,selection:new d.a(e.folders.concat(e.documents),e.selection)},n}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({selection:new d.a(e.folders.concat(e.documents),e.selection)})}},{key:"onClick",value:function(e,t,n){var a=e.getModifierState("Shift"),s=e.getModifierState("Control");(a||s||!this.props.selection.includes(t))&&(a?this.state.selection.selectRange(n):this.state.selection.selectItem(t,s),this.props.onSelect(this.state.selection.getSelectedItems()),e.preventDefault())}},{key:"rowRenderer",value:function(){var e=this,t=this.props.folders.concat(this.props.documents);return function(n){var a=t[n.index];return a.name?l.a.createElement(w,{key:n.key,style:n.style,name:a.name}):l.a.createElement(C,{key:n.key,style:n.style,columns:e.props.columns,item:a,selected:e.props.selection&&e.props.selection.includes(a),onClick:function(t){return e.onClick(t,a,n.index)}})}}},{key:"showPreferences",value:function(e){this.setState({prefsOpen:e})}},{key:"onSavePreferences",value:function(e){this.setState({prefsOpen:!1}),this.props.onChangeColumnPrefs(e)}},{key:"sortBy",value:function(e){var t=!this.props.sorting||(this.props.sorting.by!==e||!this.props.sorting.asc);this.props.onSort({by:e,asc:t})}},{key:"onDrag",value:function(e){this.setState({drag:e})}},{key:"onDrop",value:function(e,t,n){var a=n.dataTransfer.getData("URL"),s=a?function(){var e=document.createElement("a");return e.href=a,e.hostname}():null;this.setState({drag:!1}),e.length>0?this.props.onDropFiles(e):a&&s!==window.location.hostname&&this.props.onDropURL(a)}},{key:"render",value:function(){var e=this,t=l.a.Children.toArray(this.props.children).filter(function(e){return e.type===h.a}).shift(),n=l.a.createElement("div",{className:"documents-pane table-pane"},l.a.createElement(u.a,null,function(t){var n=t.height,a=t.width;return l.a.createElement(u.b,{className:"virtualized-list",width:a,height:n,rowCount:e.props.folders.length+e.props.documents.length,rowHeight:47,rowRenderer:e.rowRenderer()})}),this.state.drag&&l.a.createElement(p.a,null),this.props.busy&&l.a.createElement("div",{className:"busy-mask"}));return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"documents-table-header"},l.a.createElement(y,{columns:this.props.columns,onSort:this.sortBy.bind(this),sortColumn:this.props.sorting?this.props.sorting.by:null,sortAsc:this.props.sorting?this.props.sorting.asc:null}),l.a.createElement("button",{className:"column-options-btn nostyle icon",onClick:this.showPreferences.bind(this,!0)},"\uf141")),t,this.props.disableFiledrop?n:l.a.createElement(m.a,{className:"dropzone",disableClick:!0,onDragEnter:this.onDrag.bind(this,!0),onDragLeave:this.onDrag.bind(this,!1),onDrop:this.onDrop.bind(this)},n),this.state.prefsOpen&&l.a.createElement(T,{columns:this.props.columns,onCancel:this.showPreferences.bind(this,!1),onSave:this.onSavePreferences.bind(this)}))}}]),t}(o.Component)},52:function(e,t,n){"use strict";var a=n(1),s=n(2),r=n(4),c=n(3),i=n(5),o=n(0),l=n.n(o),u=n(36),m=n(25),p=n(21),h=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"cell"},l.a.createElement("div",{className:"item-wrapper"},l.a.createElement("a",{href:"#",className:"folder"},l.a.createElement("div",{className:"label"},this.props.name))))}}]),t}(o.Component),d=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.filetypes[0],t=this.props.fileCount>1;return l.a.createElement("div",{className:"cell".concat(this.props.selected?" selected":""),onClick:this.props.onClick,onDoubleClick:this.props.onDoubleClick},l.a.createElement("div",{className:"inner"},l.a.createElement("div",{className:"item-wrapper".concat(t?" stacked":"")},t&&l.a.createElement("div",{className:"stack"}),l.a.createElement("a",{href:"document/".concat(this.props.id,"/part/1/edit"),className:"document ".concat(e)},l.a.createElement("div",{className:"label"},this.props.title)))))}}]),t}(o.Component),f=n(24),b=n(30);n.d(t,"a",function(){return v});var v=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(r.a)(this,Object(c.a)(t).call(this,e))).state={selection:new p.a(e.folders.concat(e.documents),e.selection)},n}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({selection:new p.a(e.folders.concat(e.documents),e.selection)})}},{key:"onClick",value:function(e,t,n){var a=e.getModifierState("Shift"),s=e.getModifierState("Control");a?this.state.selection.selectRange(n):this.state.selection.selectItem(t,s),this.props.onSelect(this.state.selection.getSelectedItems()),e.preventDefault()}},{key:"onDoubleClick",value:function(e){window.location.href="document/".concat(e.id,"/part/1/edit")}},{key:"rowRenderer",value:function(e,t){var n=this,a=this.props.folders.concat(this.props.documents);return function(t){var s=t.index*e,r=Math.min(s+e,a.length)-s,c=new Array(r).fill(void 0).map(function(e,r){var c=r+s,i=a[c];return i.name?l.a.createElement(h,{key:c,name:i.name}):l.a.createElement(d,{key:c,id:i.id,title:i.title,filetypes:i.filetypes,fileCount:i.file_count,selected:n.props.selection&&n.props.selection.includes(i),onClick:function(e){return n.onClick(e,i,t.index)},onDoubleClick:n.onDoubleClick.bind(n,i)})});return r<e&&c.push(new Array(e-r).fill(void 0).map(function(e,t){return l.a.createElement("div",{className:"cell dummy",key:"dummy-".concat(t)})})),l.a.createElement("div",{key:t.key,style:t.style,className:"row"},c)}}},{key:"onDrag",value:function(e){this.setState({drag:e})}},{key:"onDrop",value:function(e,t,n){var a=n.dataTransfer.getData("URL");this.setState({drag:!1}),e.length>0?this.props.onDropFiles(e):a&&this.props.onDropURL(a)}},{key:"render",value:function(){var e=this,t=l.a.Children.toArray(this.props.children).filter(function(e){return e.type===f.a}).shift(),n=l.a.createElement(m.a,null,function(t){var n=t.height,a=t.width,s=e.props.folders.length+e.props.documents.length,r=Math.floor(a/192),c=Math.ceil(s/r);return l.a.createElement(m.b,{className:"virtualized-grid",width:a,height:n,rowCount:c,rowHeight:192,rowRenderer:e.rowRenderer(r,c)})});return l.a.createElement(l.a.Fragment,null,t,l.a.createElement("div",{className:"documents-pane grid-pane"},this.props.disableFiledrop?n:l.a.createElement(u.a,{className:"dropzone",disableClick:!0,onDragEnter:this.onDrag.bind(this,!0),onDragLeave:this.onDrag.bind(this,!1),onDrop:this.onDrop.bind(this)},n),this.state.drag&&l.a.createElement(b.a,null)))}}]),t}(o.Component)}},[[216,5,0]]]);
//# sourceMappingURL=profile.5ca3b2f9.chunk.js.map
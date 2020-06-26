(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{195:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(11),i=(n(0),n(221)),o=n(225),s=n(230),c={id:"js-custom",title:"Building Custom UI",sidebar_label:"Custom UI"},l={id:"tutorial/js-custom",title:"Building Custom UI",description:"Displaying your data in a table might work for many use-cases. However, depending on your plugin and data it might make sense to customize the way your data is visualized. Flipper uses React to render the plugins and provides a variety of ready-to-use UI components that can be used to build custom plugin UIs.",source:"@site/../docs/tutorial/js-custom.mdx",permalink:"/docs/tutorial/js-custom",editUrl:"https://github.com/facebook/flipper/blob/master/website/../docs/tutorial/js-custom.mdx",sidebar_label:"Custom UI",sidebar:"extending",previous:{title:"Showing a table",permalink:"/docs/tutorial/js-table"},next:{title:"Publishing your Plugin",permalink:"/docs/tutorial/js-publishing"}},u=[{value:"Replacing the table",id:"replacing-the-table",children:[]},{value:"Adding data handling",id:"adding-data-handling",children:[]},{value:"Rendering the data",id:"rendering-the-data",children:[]},{value:"Adding the sidebar",id:"adding-the-sidebar",children:[]},{value:"Creating a custom component",id:"creating-a-custom-component",children:[]}],d={rightToc:u};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Displaying your data in a table might work for many use-cases. However, depending on your plugin and data it might make sense to customize the way your data is visualized. Flipper uses React to render the plugins and provides a variety of ready-to-use UI components that can be used to build custom plugin UIs."),Object(i.b)("h2",{id:"replacing-the-table"},"Replacing the table"),Object(i.b)("p",null,"For our sea mammals app, we might not only want to see them listed as image URLs in a table but render the actual images in nice little cards. When selecting one of the cards we still want to display all details in the sidebar."),Object(i.b)("img",{alt:"Custom cards UI for our sea mammals plugin",src:Object(o.a)("img/js-custom.png")}),Object(i.b)("p",null,"Currently, the default export in our ",Object(i.b)("inlineCode",{parentName:"p"},"index.tsx")," is from ",Object(i.b)("inlineCode",{parentName:"p"},"createTablePlugin"),". Now we are going to replace this with a custom React component extending ",Object(i.b)("inlineCode",{parentName:"p"},"FlipperPlugin"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"export default class SeaMammals extends FlipperPlugin<State, any, PersistedState> {\n  static Container = styled(FlexRow)({\n    backgroundColor: colors.macOSTitleBarBackgroundBlur,\n    flexWrap: 'wrap',\n    alignItems: 'flex-start',\n    alignContent: 'flex-start',\n    flexGrow: 1,\n    overflow: 'scroll',\n  });\n\n  render() {\n    return (\n      <SeaMammals.Container>\n        Hello custom plugin!\n      </SeaMammals.Container>\n    );\n  }\n}\n")),Object(i.b)("p",null,"You can see how we are styling our components using ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://emotion.sh/"}),"emotion"),". To learn more about this, make sure to read our guide on ",Object(i.b)(s.a,{to:Object(o.a)("/docs/extending/styling-components"),mdxType:"Link"},"styling components"),"."),Object(i.b)("h2",{id:"adding-data-handling"},"Adding data handling"),Object(i.b)("p",null,"The plugin is quite useless when we don't display any actual data. We are adding two static properties to our plugin class for data handling. ",Object(i.b)("inlineCode",{parentName:"p"},"defaultPersistedState")," defines the default state before we received any data. In ",Object(i.b)("inlineCode",{parentName:"p"},"persistedStateReducer")," we define how new data is merged with the existing data."),Object(i.b)("p",null,"For the default state we define an empty object because we don't have any data, yet. When receiving data, we simply add it to the existing object, using the ID as a key. Learn more about ",Object(i.b)(s.a,{to:Object(o.a)("/docs/extending/js-plugin-api#persistedstate"),mdxType:"Link"},"persistedState")," in our guide."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"static defaultPersistedState: PersistedState = {\n  data: [],\n};\n\nstatic persistedStateReducer<PersistedState>(\n  persistedState: PersistedState,\n  method: string,\n  payload: Row,\n) {\n  if (method === 'newRow') {\n    return return Object.assign({}, persistedState, {,\n      [payload.id]: payload,\n    });\n  }\n  return persistedState;\n};\n")),Object(i.b)("p",null,"Note: The method name ",Object(i.b)("inlineCode",{parentName:"p"},"newRow")," is still the same that we defined on the native side."),Object(i.b)("h2",{id:"rendering-the-data"},"Rendering the data"),Object(i.b)("p",null,"Now we can access the data from ",Object(i.b)("inlineCode",{parentName:"p"},"this.props.persistedState.data")," and render it. So let's update our ",Object(i.b)("inlineCode",{parentName:"p"},"render")," method using a custom ",Object(i.b)("inlineCode",{parentName:"p"},"Card")," component, which we will implement in a bit."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"render() {\n  const {selectedIndex} = this.state;\n  const {persistedState} = this.props;\n\n  return (\n    <SeaMammals.Container>\n      {Object.entries(persistedState).map(([id, row]) => <Card\n        {...row}\n        onSelect={() => this.setState({selectedID: id})}\n        selected={id === selectedID}\n        key={id}\n      />)}\n    </SeaMammals.Container>\n  );\n}\n")),Object(i.b)("h2",{id:"adding-the-sidebar"},"Adding the sidebar"),Object(i.b)("p",null,"When clicking on a Card, we want to show all details in the sidebar as we did with the table before. We are using React's state to store the selected ID in our data. Flipper provides a ",Object(i.b)("inlineCode",{parentName:"p"},"DetailSidebar")," component which we can use to add information to the sidebar. It doesn't matter where this component is placed as long as it is returned somewhere in our ",Object(i.b)("inlineCode",{parentName:"p"},"render")," method. The ",Object(i.b)("inlineCode",{parentName:"p"},"renderSidebar")," method returning the sidebar's content is still the same we used with ",Object(i.b)("inlineCode",{parentName:"p"},"createTablePlugin"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"<DetailSidebar>\n  {typeof selectedID === 'string' && renderSidebar(persistedState[selectedID])}\n</DetailSidebar>\n")),Object(i.b)("h2",{id:"creating-a-custom-component"},"Creating a custom component"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"Card")," component is responsible for rendering the actual image and title. This is not very specific to Flipper, but is using plain React. Note the usage of ",Object(i.b)("inlineCode",{parentName:"p"},"styled")," to adjust the style of existing UI components and ",Object(i.b)("inlineCode",{parentName:"p"},"colors")," which provides a library of colors used throughout the app."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"class Card extends React.Component<{\n  onSelect: () => void,\n  selected: boolean,\n} & Row> {\n  static Container = styled(FlexColumn)(props => ({\n    margin: 10,\n    borderRadius: 5,\n    border: '2px solid black',\n    backgroundColor: colors.white,\n    borderColor: props.selected\n      ? colors.macOSTitleBarIconSelected\n      : colors.white,\n    padding: 0,\n    width: 150,\n    overflow: 'hidden',\n    boxShadow: '1px 1px 4px rgba(0,0,0,0.1)',\n    cursor: 'pointer',\n  }));\n\n  static Image = styled.div({\n    backgroundSize: 'cover',\n    width: '100%',\n    paddingTop: '100%',\n  });\n\n  static Title = styled(Text)({\n    fontSize: 14,\n    fontWeight: 'bold',\n    padding: '10px 5px',\n    overflow: 'hidden',\n    textOverflow: 'ellipsis',\n    whiteSpace: 'nowrap',\n  });\n\n  render() {\n    return (\n      <Card.Container\n        onClick={this.props.onSelect}\n        selected={this.props.selected}>\n        <Card.Image style={{backgroundImage: `url(${this.props.url || ''})`}} />\n        <Card.Title>{this.props.title}</Card.Title>\n      </Card.Container>\n    );\n  }\n}\n")))}p.isMDXComponent=!0},221:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},d=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(n),b=r,f=d["".concat(o,".").concat(b)]||d[b]||p[b]||i;return n?a.a.createElement(f,s({ref:t},l,{components:n})):a.a.createElement(f,s({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=b;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},222:function(e,t,n){"use strict";var r=n(8),a=n(10),i=n(226),o="".startsWith;r(r.P+r.F*n(227)("startsWith"),"String",{startsWith:function(e){var t=i(this,e,"startsWith"),n=a(Math.min(arguments.length>1?arguments[1]:void 0,t.length)),r=String(e);return o?o.call(t,r,n):t.slice(n,n+r.length)===r}})},223:function(e,t,n){"use strict";var r=n(0),a=n(59);t.a=function(){return Object(r.useContext)(a.a)}},224:function(e,t){t.f=Object.getOwnPropertySymbols},225:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n(222);var r=n(223);function a(e){var t=(Object(r.a)().siteConfig||{}).baseUrl,n=void 0===t?"/":t;if(!e)return e;return/^(https?:|\/\/)/.test(e)?e:e.startsWith("/")?n+e.slice(1):n+e}},226:function(e,t,n){var r=n(86),a=n(33);e.exports=function(e,t,n){if(r(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(a(e))}},227:function(e,t,n){var r=n(3)("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,!"/./"[e](t)}catch(a){}}return!0}},228:function(e,t,n){var r=n(91),a=n(60).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,a)}},229:function(e,t,n){t.f=n(3)},230:function(e,t,n){"use strict";n(232),n(222),n(24),n(235),n(87);var r=n(0),a=n.n(r),i=n(44),o=n(231),s=n(34),c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};t.a=function(e){var t,n=e.isNavLink,l=c(e,["isNavLink"]),u=l.to,d=l.href,p=u||d,b=Object(o.a)(p),f=Object(r.useRef)(!1),m=n?i.c:i.b,h=s.a.canUseIntersectionObserver;return Object(r.useEffect)((function(){return!h&&b&&window.docusaurus.prefetch(p),function(){h&&t&&t.disconnect()}}),[p,h,b]),p&&b&&!p.startsWith("#")?a.a.createElement(m,Object.assign({},l,{onMouseEnter:function(){f.current||(window.docusaurus.preload(p),f.current=!0)},innerRef:function(e){var n,r;h&&e&&b&&(n=e,r=function(){window.docusaurus.prefetch(p)},(t=new window.IntersectionObserver((function(e){e.forEach((function(e){n===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(t.unobserve(n),t.disconnect(),r())}))}))).observe(n))},to:p})):a.a.createElement("a",Object.assign({href:p},!b&&{target:"_blank",rel:"noopener noreferrer"},l))}},231:function(e,t,n){"use strict";function r(e){return!1===/^(https?:|\/\/|mailto:|tel:)/.test(e)}n.d(t,"a",(function(){return r}))},232:function(e,t,n){var r=n(8);r(r.S+r.F,"Object",{assign:n(234)})},233:function(e,t,n){var r=n(84),a=n(41),i=n(31),o=n(85),s=n(30),c=n(89),l=Object.getOwnPropertyDescriptor;t.f=n(14)?l:function(e,t){if(e=i(e),t=o(t,!0),c)try{return l(e,t)}catch(n){}if(s(e,t))return a(!r.f.call(e,t),e[t])}},234:function(e,t,n){"use strict";var r=n(14),a=n(32),i=n(224),o=n(84),s=n(16),c=n(46),l=Object.assign;e.exports=!l||n(15)((function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach((function(e){t[e]=e})),7!=l({},e)[n]||Object.keys(l({},t)).join("")!=r}))?function(e,t){for(var n=s(e),l=arguments.length,u=1,d=i.f,p=o.f;l>u;)for(var b,f=c(arguments[u++]),m=d?a(f).concat(d(f)):a(f),h=m.length,g=0;h>g;)b=m[g++],r&&!p.call(f,b)||(n[b]=f[b]);return n}:l},235:function(e,t,n){"use strict";var r=n(6),a=n(30),i=n(14),o=n(8),s=n(17),c=n(236).KEY,l=n(15),u=n(45),d=n(47),p=n(42),b=n(3),f=n(229),m=n(237),h=n(238),g=n(88),y=n(9),O=n(12),j=n(16),w=n(31),v=n(85),S=n(41),C=n(90),x=n(239),N=n(233),P=n(224),k=n(23),I=n(32),E=N.f,T=k.f,R=x.f,D=r.Symbol,F=r.JSON,W=F&&F.stringify,U=b("_hidden"),M=b("toPrimitive"),z={}.propertyIsEnumerable,L=u("symbol-registry"),_=u("symbols"),A=u("op-symbols"),B=Object.prototype,J="function"==typeof D&&!!P.f,H=r.QObject,K=!H||!H.prototype||!H.prototype.findChild,X=i&&l((function(){return 7!=C(T({},"a",{get:function(){return T(this,"a",{value:7}).a}})).a}))?function(e,t,n){var r=E(B,t);r&&delete B[t],T(e,t,n),r&&e!==B&&T(B,t,r)}:T,Y=function(e){var t=_[e]=C(D.prototype);return t._k=e,t},q=J&&"symbol"==typeof D.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof D},G=function(e,t,n){return e===B&&G(A,t,n),y(e),t=v(t,!0),y(n),a(_,t)?(n.enumerable?(a(e,U)&&e[U][t]&&(e[U][t]=!1),n=C(n,{enumerable:S(0,!1)})):(a(e,U)||T(e,U,S(1,{})),e[U][t]=!0),X(e,t,n)):T(e,t,n)},Q=function(e,t){y(e);for(var n,r=h(t=w(t)),a=0,i=r.length;i>a;)G(e,n=r[a++],t[n]);return e},$=function(e){var t=z.call(this,e=v(e,!0));return!(this===B&&a(_,e)&&!a(A,e))&&(!(t||!a(this,e)||!a(_,e)||a(this,U)&&this[U][e])||t)},V=function(e,t){if(e=w(e),t=v(t,!0),e!==B||!a(_,t)||a(A,t)){var n=E(e,t);return!n||!a(_,t)||a(e,U)&&e[U][t]||(n.enumerable=!0),n}},Z=function(e){for(var t,n=R(w(e)),r=[],i=0;n.length>i;)a(_,t=n[i++])||t==U||t==c||r.push(t);return r},ee=function(e){for(var t,n=e===B,r=R(n?A:w(e)),i=[],o=0;r.length>o;)!a(_,t=r[o++])||n&&!a(B,t)||i.push(_[t]);return i};J||(s((D=function(){if(this instanceof D)throw TypeError("Symbol is not a constructor!");var e=p(arguments.length>0?arguments[0]:void 0),t=function(n){this===B&&t.call(A,n),a(this,U)&&a(this[U],e)&&(this[U][e]=!1),X(this,e,S(1,n))};return i&&K&&X(B,e,{configurable:!0,set:t}),Y(e)}).prototype,"toString",(function(){return this._k})),N.f=V,k.f=G,n(228).f=x.f=Z,n(84).f=$,P.f=ee,i&&!n(43)&&s(B,"propertyIsEnumerable",$,!0),f.f=function(e){return Y(b(e))}),o(o.G+o.W+o.F*!J,{Symbol:D});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)b(te[ne++]);for(var re=I(b.store),ae=0;re.length>ae;)m(re[ae++]);o(o.S+o.F*!J,"Symbol",{for:function(e){return a(L,e+="")?L[e]:L[e]=D(e)},keyFor:function(e){if(!q(e))throw TypeError(e+" is not a symbol!");for(var t in L)if(L[t]===e)return t},useSetter:function(){K=!0},useSimple:function(){K=!1}}),o(o.S+o.F*!J,"Object",{create:function(e,t){return void 0===t?C(e):Q(C(e),t)},defineProperty:G,defineProperties:Q,getOwnPropertyDescriptor:V,getOwnPropertyNames:Z,getOwnPropertySymbols:ee});var ie=l((function(){P.f(1)}));o(o.S+o.F*ie,"Object",{getOwnPropertySymbols:function(e){return P.f(j(e))}}),F&&o(o.S+o.F*(!J||l((function(){var e=D();return"[null]"!=W([e])||"{}"!=W({a:e})||"{}"!=W(Object(e))}))),"JSON",{stringify:function(e){for(var t,n,r=[e],a=1;arguments.length>a;)r.push(arguments[a++]);if(n=t=r[1],(O(t)||void 0!==e)&&!q(e))return g(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!q(t))return t}),r[1]=t,W.apply(F,r)}}),D.prototype[M]||n(13)(D.prototype,M,D.prototype.valueOf),d(D,"Symbol"),d(Math,"Math",!0),d(r.JSON,"JSON",!0)},236:function(e,t,n){var r=n(42)("meta"),a=n(12),i=n(30),o=n(23).f,s=0,c=Object.isExtensible||function(){return!0},l=!n(15)((function(){return c(Object.preventExtensions({}))})),u=function(e){o(e,r,{value:{i:"O"+ ++s,w:{}}})},d=e.exports={KEY:r,NEED:!1,fastKey:function(e,t){if(!a(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!i(e,r)){if(!c(e))return"F";if(!t)return"E";u(e)}return e[r].i},getWeak:function(e,t){if(!i(e,r)){if(!c(e))return!0;if(!t)return!1;u(e)}return e[r].w},onFreeze:function(e){return l&&d.NEED&&c(e)&&!i(e,r)&&u(e),e}}},237:function(e,t,n){var r=n(6),a=n(18),i=n(43),o=n(229),s=n(23).f;e.exports=function(e){var t=a.Symbol||(a.Symbol=i?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:o.f(e)})}},238:function(e,t,n){var r=n(32),a=n(224),i=n(84);e.exports=function(e){var t=r(e),n=a.f;if(n)for(var o,s=n(e),c=i.f,l=0;s.length>l;)c.call(e,o=s[l++])&&t.push(o);return t}},239:function(e,t,n){var r=n(31),a=n(228).f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return o&&"[object Window]"==i.call(e)?function(e){try{return a(e)}catch(t){return o.slice()}}(e):a(r(e))}}}]);
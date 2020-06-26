(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{215:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return p})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return f}));var r=n(2),i=n(11),a=(n(0),n(221)),o=n(225),c=n(230),p={id:"react-native-android",title:"Manually set up your React Native Android App",sidebar_label:"React Native for Android"},l={id:"getting-started/react-native-android",title:"Manually set up your React Native Android App",description:"These instructions are aimed at people manually adding Flipper to a React Native 0.62+ app.",source:"@site/../docs/getting-started/react-native-android.mdx",permalink:"/docs/getting-started/react-native-android",editUrl:"https://github.com/facebook/flipper/blob/master/website/../docs/getting-started/react-native-android.mdx",sidebar_label:"React Native for Android",sidebar:"setup",previous:{title:"Set up your React Native App",permalink:"/docs/getting-started/react-native"},next:{title:"Manually set up your React Native iOS App",permalink:"/docs/getting-started/react-native-ios"}},s=[{value:"Dependencies",id:"dependencies",children:[]},{value:"Application Setup",id:"application-setup",children:[]},{value:"Further Steps",id:"further-steps",children:[]}],u={rightToc:s};function f(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"These instructions are aimed at people manually adding Flipper to a React Native 0.62+ app.\nThis should only be necessary if you have an existing app that cannot be upgraded with the\n",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://reactnative.dev/docs/upgrading"}),"React Native Upgrade tool"),"."),Object(a.b)("h2",{id:"dependencies"},"Dependencies"),Object(a.b)("p",null,"Flipper is distributed via JCenter. Add the dependencies to your ",Object(a.b)("inlineCode",{parentName:"p"},"build.gradle")," file.\nYou should also explicitly depend on ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/facebook/soloader"}),Object(a.b)("inlineCode",{parentName:"a"},"soloader")),"\ninstead of relying on transitive dependency resolution which is getting deprecated\nwith Gradle 5."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-groovy"}),"repositories {\n  jcenter()\n}\n\ndependencies {\n  debugImplementation('com.facebook.flipper:flipper:0.35.0') {\n    exclude group:'com.facebook.fbjni'\n  }\n\n  debugImplementation('com.facebook.flipper:flipper-network-plugin:0.35.0') {\n    exclude group:'com.facebook.flipper'\n  }\n}\n")),Object(a.b)("p",null,"These exclusions are currently necessary to avoid some clashes with FBJNI\nshared libraries."),Object(a.b)("h2",{id:"application-setup"},"Application Setup"),Object(a.b)("p",null,"For maximum flexibility, we recommend you move the Flipper initialization to a separate\nclass that lives in a ",Object(a.b)("inlineCode",{parentName:"p"},"debug/")," folder, so that Flipper code never gets referenced in a\nrelease build."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-java"}),"import android.content.Context;\nimport com.facebook.flipper.android.AndroidFlipperClient;\nimport com.facebook.flipper.android.utils.FlipperUtils;\nimport com.facebook.flipper.core.FlipperClient;\nimport com.facebook.flipper.plugins.inspector.DescriptorMapping;\nimport com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin;\nimport com.facebook.react.ReactInstanceManager;\nimport okhttp3.OkHttpClient;\n\npublic class ReactNativeFlipper {\n  public static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {\n    if (FlipperUtils.shouldEnableFlipper(context)) {\n      final FlipperClient client = AndroidFlipperClient.getInstance(context);\n\n      client.addPlugin(new InspectorFlipperPlugin(context, DescriptorMapping.withDefaults()));\n    }\n  }\n}\n")),Object(a.b)("p",null,"Note that this only enables the Layout Inspector plugin. Check out ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/facebook/react-native/blob/6f627f684bb6506a677c9632b2710e4a541690a9/template/android/app/src/debug/java/com/helloworld/ReactNativeFlipper.java"}),"the React Native template")," for more plugins."),Object(a.b)("p",null,"In your ",Object(a.b)("inlineCode",{parentName:"p"},"Application")," implementation, we then call the static method using\nreflection. This gives us a lot of flexibility, but can be quite noisy.\nAlternatively, recreate an empty ",Object(a.b)("inlineCode",{parentName:"p"},"ReactNativeFlipper")," class in a ",Object(a.b)("inlineCode",{parentName:"p"},"release/")," folder,\nso you can call into the method directly."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-java"}),'public class MainApplication extends Application implements ReactApplication {\n  // ...\n\n  @Override\n  public void onCreate() {\n    super.onCreate();\n    SoLoader.init(this, /* native exopackage */ false);\n    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());\n  }\n\n  /**\n   * Loads Flipper in React Native templates. Call this in the onCreate method with something like\n   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());\n   *\n   * @param context\n   * @param reactInstanceManager\n   */\n  private static void initializeFlipper(\n      Context context, ReactInstanceManager reactInstanceManager) {\n    if (BuildConfig.DEBUG) {\n      try {\n        /*\n         We use reflection here to pick up the class that initializes\n         Flipper, since Flipper library is not available in release mode\n        */\n        Class<?> aClass = Class.forName("com.example.ReactNativeFlipper");\n        aClass\n            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)\n            .invoke(null, context, reactInstanceManager);\n      } catch (ClassNotFoundException e) {\n        e.printStackTrace();\n      } catch (NoSuchMethodException e) {\n        e.printStackTrace();\n      } catch (IllegalAccessException e) {\n        e.printStackTrace();\n      } catch (InvocationTargetException e) {\n        e.printStackTrace();\n      }\n    }\n  }\n}\n')),Object(a.b)("h2",{id:"further-steps"},"Further Steps"),Object(a.b)("p",null,"To create your own plugins and integrate with Flipper using JavaScript, check out our ",Object(a.b)(c.a,{to:Object(o.a)("/docs/tutorial/react-native"),mdxType:"Link"},"writing plugins for React Native")," tutorial!"))}f.isMDXComponent=!0},221:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),s=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},u=function(e){var t=s(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=s(n),b=r,d=u["".concat(o,".").concat(b)]||u[b]||f[b]||a;return n?i.a.createElement(d,c({ref:t},l,{components:n})):i.a.createElement(d,c({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=b;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var l=2;l<a;l++)o[l]=n[l];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},222:function(e,t,n){"use strict";var r=n(8),i=n(10),a=n(226),o="".startsWith;r(r.P+r.F*n(227)("startsWith"),"String",{startsWith:function(e){var t=a(this,e,"startsWith"),n=i(Math.min(arguments.length>1?arguments[1]:void 0,t.length)),r=String(e);return o?o.call(t,r,n):t.slice(n,n+r.length)===r}})},223:function(e,t,n){"use strict";var r=n(0),i=n(59);t.a=function(){return Object(r.useContext)(i.a)}},224:function(e,t){t.f=Object.getOwnPropertySymbols},225:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n(222);var r=n(223);function i(e){var t=(Object(r.a)().siteConfig||{}).baseUrl,n=void 0===t?"/":t;if(!e)return e;return/^(https?:|\/\/)/.test(e)?e:e.startsWith("/")?n+e.slice(1):n+e}},226:function(e,t,n){var r=n(86),i=n(33);e.exports=function(e,t,n){if(r(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(i(e))}},227:function(e,t,n){var r=n(3)("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,!"/./"[e](t)}catch(i){}}return!0}},228:function(e,t,n){var r=n(91),i=n(60).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},229:function(e,t,n){t.f=n(3)},230:function(e,t,n){"use strict";n(232),n(222),n(24),n(235),n(87);var r=n(0),i=n.n(r),a=n(44),o=n(231),c=n(34),p=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n};t.a=function(e){var t,n=e.isNavLink,l=p(e,["isNavLink"]),s=l.to,u=l.href,f=s||u,b=Object(o.a)(f),d=Object(r.useRef)(!1),h=n?a.c:a.b,m=c.a.canUseIntersectionObserver;return Object(r.useEffect)((function(){return!m&&b&&window.docusaurus.prefetch(f),function(){m&&t&&t.disconnect()}}),[f,m,b]),f&&b&&!f.startsWith("#")?i.a.createElement(h,Object.assign({},l,{onMouseEnter:function(){d.current||(window.docusaurus.preload(f),d.current=!0)},innerRef:function(e){var n,r;m&&e&&b&&(n=e,r=function(){window.docusaurus.prefetch(f)},(t=new window.IntersectionObserver((function(e){e.forEach((function(e){n===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(t.unobserve(n),t.disconnect(),r())}))}))).observe(n))},to:f})):i.a.createElement("a",Object.assign({href:f},!b&&{target:"_blank",rel:"noopener noreferrer"},l))}},231:function(e,t,n){"use strict";function r(e){return!1===/^(https?:|\/\/|mailto:|tel:)/.test(e)}n.d(t,"a",(function(){return r}))},232:function(e,t,n){var r=n(8);r(r.S+r.F,"Object",{assign:n(234)})},233:function(e,t,n){var r=n(84),i=n(41),a=n(31),o=n(85),c=n(30),p=n(89),l=Object.getOwnPropertyDescriptor;t.f=n(14)?l:function(e,t){if(e=a(e),t=o(t,!0),p)try{return l(e,t)}catch(n){}if(c(e,t))return i(!r.f.call(e,t),e[t])}},234:function(e,t,n){"use strict";var r=n(14),i=n(32),a=n(224),o=n(84),c=n(16),p=n(46),l=Object.assign;e.exports=!l||n(15)((function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach((function(e){t[e]=e})),7!=l({},e)[n]||Object.keys(l({},t)).join("")!=r}))?function(e,t){for(var n=c(e),l=arguments.length,s=1,u=a.f,f=o.f;l>s;)for(var b,d=p(arguments[s++]),h=u?i(d).concat(u(d)):i(d),m=h.length,g=0;m>g;)b=h[g++],r&&!f.call(d,b)||(n[b]=d[b]);return n}:l},235:function(e,t,n){"use strict";var r=n(6),i=n(30),a=n(14),o=n(8),c=n(17),p=n(236).KEY,l=n(15),s=n(45),u=n(47),f=n(42),b=n(3),d=n(229),h=n(237),m=n(238),g=n(88),v=n(9),y=n(12),O=n(16),j=n(31),w=n(85),N=n(41),x=n(90),S=n(239),k=n(233),F=n(224),E=n(23),C=n(32),P=k.f,R=E.f,I=S.f,M=r.Symbol,T=r.JSON,A=T&&T.stringify,D=b("_hidden"),W=b("toPrimitive"),J={}.propertyIsEnumerable,z=s("symbol-registry"),L=s("symbols"),U=s("op-symbols"),_=Object.prototype,B="function"==typeof M&&!!F.f,G=r.QObject,H=!G||!G.prototype||!G.prototype.findChild,K=a&&l((function(){return 7!=x(R({},"a",{get:function(){return R(this,"a",{value:7}).a}})).a}))?function(e,t,n){var r=P(_,t);r&&delete _[t],R(e,t,n),r&&e!==_&&R(_,t,r)}:R,X=function(e){var t=L[e]=x(M.prototype);return t._k=e,t},Y=B&&"symbol"==typeof M.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof M},q=function(e,t,n){return e===_&&q(U,t,n),v(e),t=w(t,!0),v(n),i(L,t)?(n.enumerable?(i(e,D)&&e[D][t]&&(e[D][t]=!1),n=x(n,{enumerable:N(0,!1)})):(i(e,D)||R(e,D,N(1,{})),e[D][t]=!0),K(e,t,n)):R(e,t,n)},Q=function(e,t){v(e);for(var n,r=m(t=j(t)),i=0,a=r.length;a>i;)q(e,n=r[i++],t[n]);return e},V=function(e){var t=J.call(this,e=w(e,!0));return!(this===_&&i(L,e)&&!i(U,e))&&(!(t||!i(this,e)||!i(L,e)||i(this,D)&&this[D][e])||t)},Z=function(e,t){if(e=j(e),t=w(t,!0),e!==_||!i(L,t)||i(U,t)){var n=P(e,t);return!n||!i(L,t)||i(e,D)&&e[D][t]||(n.enumerable=!0),n}},$=function(e){for(var t,n=I(j(e)),r=[],a=0;n.length>a;)i(L,t=n[a++])||t==D||t==p||r.push(t);return r},ee=function(e){for(var t,n=e===_,r=I(n?U:j(e)),a=[],o=0;r.length>o;)!i(L,t=r[o++])||n&&!i(_,t)||a.push(L[t]);return a};B||(c((M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(n){this===_&&t.call(U,n),i(this,D)&&i(this[D],e)&&(this[D][e]=!1),K(this,e,N(1,n))};return a&&H&&K(_,e,{configurable:!0,set:t}),X(e)}).prototype,"toString",(function(){return this._k})),k.f=Z,E.f=q,n(228).f=S.f=$,n(84).f=V,F.f=ee,a&&!n(43)&&c(_,"propertyIsEnumerable",V,!0),d.f=function(e){return X(b(e))}),o(o.G+o.W+o.F*!B,{Symbol:M});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)b(te[ne++]);for(var re=C(b.store),ie=0;re.length>ie;)h(re[ie++]);o(o.S+o.F*!B,"Symbol",{for:function(e){return i(z,e+="")?z[e]:z[e]=M(e)},keyFor:function(e){if(!Y(e))throw TypeError(e+" is not a symbol!");for(var t in z)if(z[t]===e)return t},useSetter:function(){H=!0},useSimple:function(){H=!1}}),o(o.S+o.F*!B,"Object",{create:function(e,t){return void 0===t?x(e):Q(x(e),t)},defineProperty:q,defineProperties:Q,getOwnPropertyDescriptor:Z,getOwnPropertyNames:$,getOwnPropertySymbols:ee});var ae=l((function(){F.f(1)}));o(o.S+o.F*ae,"Object",{getOwnPropertySymbols:function(e){return F.f(O(e))}}),T&&o(o.S+o.F*(!B||l((function(){var e=M();return"[null]"!=A([e])||"{}"!=A({a:e})||"{}"!=A(Object(e))}))),"JSON",{stringify:function(e){for(var t,n,r=[e],i=1;arguments.length>i;)r.push(arguments[i++]);if(n=t=r[1],(y(t)||void 0!==e)&&!Y(e))return g(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!Y(t))return t}),r[1]=t,A.apply(T,r)}}),M.prototype[W]||n(13)(M.prototype,W,M.prototype.valueOf),u(M,"Symbol"),u(Math,"Math",!0),u(r.JSON,"JSON",!0)},236:function(e,t,n){var r=n(42)("meta"),i=n(12),a=n(30),o=n(23).f,c=0,p=Object.isExtensible||function(){return!0},l=!n(15)((function(){return p(Object.preventExtensions({}))})),s=function(e){o(e,r,{value:{i:"O"+ ++c,w:{}}})},u=e.exports={KEY:r,NEED:!1,fastKey:function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!a(e,r)){if(!p(e))return"F";if(!t)return"E";s(e)}return e[r].i},getWeak:function(e,t){if(!a(e,r)){if(!p(e))return!0;if(!t)return!1;s(e)}return e[r].w},onFreeze:function(e){return l&&u.NEED&&p(e)&&!a(e,r)&&s(e),e}}},237:function(e,t,n){var r=n(6),i=n(18),a=n(43),o=n(229),c=n(23).f;e.exports=function(e){var t=i.Symbol||(i.Symbol=a?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||c(t,e,{value:o.f(e)})}},238:function(e,t,n){var r=n(32),i=n(224),a=n(84);e.exports=function(e){var t=r(e),n=i.f;if(n)for(var o,c=n(e),p=a.f,l=0;c.length>l;)p.call(e,o=c[l++])&&t.push(o);return t}},239:function(e,t,n){var r=n(31),i=n(228).f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return o&&"[object Window]"==a.call(e)?function(e){try{return i(e)}catch(t){return o.slice()}}(e):i(r(e))}}}]);
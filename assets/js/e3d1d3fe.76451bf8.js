(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{144:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return m}));var a=n(3),i=n(7),r=(n(0),n(159)),l={id:"sandy-migration",title:"Migrating a plugin to Sandy"},o={unversionedId:"extending/sandy-migration",id:"extending/sandy-migration",isDocsHomePage:!1,title:"Migrating a plugin to Sandy",description:"Migrating a plugin to the new Sandy plugin architecture consists of 3 steps:",source:"@site/../docs/extending/sandy-migration.mdx",slug:"/extending/sandy-migration",permalink:"/docs/extending/sandy-migration",editUrl:"https://github.com/facebook/flipper/blob/master/website/../docs/extending/sandy-migration.mdx",version:"current",sidebar:"extending",previous:{title:"Plugin Distribution",permalink:"/docs/extending/plugin-distribution"},next:{title:"Desktop Plugin API",permalink:"/docs/extending/flipper-plugin"}},p=[{value:"Opting in to Sandy",id:"opting-in-to-sandy",children:[]},{value:"Using Sandy for state and connection management",id:"using-sandy-for-state-and-connection-management",children:[{value:"Tips:",id:"tips",children:[]},{value:"Migration table",id:"migration-table",children:[]}]},{value:"Using Sandy / Ant.design to organise the plugin UI",id:"using-sandy--antdesign-to-organise-the-plugin-ui",children:[{value:"Design resources",id:"design-resources",children:[]},{value:"Old and new components",id:"old-and-new-components",children:[]},{value:"Theming &amp; custom styled components",id:"theming--custom-styled-components",children:[]},{value:"Wrapping up",id:"wrapping-up",children:[]}]}],b=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(r.b)("div",t)}},c=b("OssOnly"),d=b("FbInternalOnly"),s={toc:p};function m(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Migrating a plugin to the new Sandy plugin architecture consists of 3 steps:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Enabling Sandy for a plugin."),Object(r.b)("li",{parentName:"ol"},"Update state and connection management to use the Sandy APIs. "),Object(r.b)("li",{parentName:"ol"},"Update the UI to use Sandy / Antd components only.")),Object(r.b)("h2",{id:"opting-in-to-sandy"},"Opting in to Sandy"),Object(r.b)("p",null,"Converting a Flipper plugin to use Sandy can best be done by running Flipper from source."),Object(r.b)(c,{mdxType:"OssOnly"},Object(r.b)("p",null,"For open source users: clone this repository and run ",Object(r.b)("inlineCode",{parentName:"p"},"yarn install")," in the ",Object(r.b)("inlineCode",{parentName:"p"},"desktop")," folder.")),Object(r.b)(d,{mdxType:"FbInternalOnly"},Object(r.b)("p",null,"For Facebook employees, pull the latest ",Object(r.b)("inlineCode",{parentName:"p"},"fbsource"),", and run ",Object(r.b)("inlineCode",{parentName:"p"},"yarn install")," in ",Object(r.b)("inlineCode",{parentName:"p"},"~/fbsource/xplat/sonar/desktop"))),Object(r.b)("p",null,"Enabling Sandy for a plugin requires two steps. First of all, ",Object(r.b)("inlineCode",{parentName:"p"},"flipper-plugin")," should be added as peer dependency to the ",Object(r.b)("inlineCode",{parentName:"p"},"package.json")," of the plugin:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-json"},'"peerDependencies": {\n  "flipper-plugin": "*"\n},\n')),Object(r.b)("p",null,"Next, make sure to run ",Object(r.b)("inlineCode",{parentName:"p"},"yarn install")," again in the ",Object(r.b)("inlineCode",{parentName:"p"},"desktop/")," folder.\nSandy is now enabled for this plugin, and the plugin has to be restructured to the new architecture which we will do in the next step."),Object(r.b)("h2",{id:"using-sandy-for-state-and-connection-management"},"Using Sandy for state and connection management"),Object(r.b)("p",null,"The goal of this step is to use the leave the plugin UI largely as is but convert state and connection management to use the new Sandy APIs as exposed through the ",Object(r.b)("inlineCode",{parentName:"p"},"flipper-plugin")," package."),Object(r.b)(d,{mdxType:"FbInternalOnly"},Object(r.b)("p",null,"For every plugin, we generated a task on our ",Object(r.b)("a",{parentName:"p",href:"https://www.internalfb.com/tasks?folder_filters&q=1341478626215302&group_by_type=MANUAL"},"Sandy Plugin Migration")," dashboard. Completing this step corresponds to completing the ",Object(r.b)("inlineCode",{parentName:"p"},"[flipper][sandy] convert plugin 'xxxx' to use Sandy APIs")," task.\nIf you start this task, please assign yourself as owner and link it in the diff. ")),Object(r.b)("p",null,"Comparing to 'classic' plugins, there are a few fundamental differences when it comes to the plugin structure of Sandy plugins.\nA class extending from ",Object(r.b)("inlineCode",{parentName:"p"},"FlipperPlugin")," which is exported as ",Object(r.b)("inlineCode",{parentName:"p"},"default")," is ",Object(r.b)("em",{parentName:"p"},"no longer")," used to define a plugin.\nInstead, a plugin definition consists of two parts:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"A definition of the state and logic of our plugin that is exported under the name ",Object(r.b)("inlineCode",{parentName:"li"},"plugin"),": ",Object(r.b)("inlineCode",{parentName:"li"},"export function plugin(client: PluginClient<Events, Methods>) { ... }"),". Most of the state and all connection logic will move here."),Object(r.b)("li",{parentName:"ol"},"A definition of the root of the UI is exported under the name ",Object(r.b)("inlineCode",{parentName:"li"},"Component"),": ",Object(r.b)("inlineCode",{parentName:"li"},"export function Component() { ... }"))),Object(r.b)("p",null,"There are a few conceptual changes that are important to understand, as they are different compared to classic plugins:"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"plugin")," function is called exactly once when a plugin is set up for an application. This means that all state that is created inside the ",Object(r.b)("inlineCode",{parentName:"p"},"plugin")," definition will be kept as long as the app is connected,\neven when the user is navigating away.\nIt used to be necessary to use ",Object(r.b)("inlineCode",{parentName:"p"},"persistedState")," for this kind of state, but that is no longer the case."),Object(r.b)("p",null,"In contrast, the ",Object(r.b)("inlineCode",{parentName:"p"},"Component")," component is mounted whenever the user ",Object(r.b)("em",{parentName:"p"},"opens")," the plugin, so any state stored locally in that React component will be lost if the user navigates away.\nWe recommend avoiding that, and store state, including selection, in the ",Object(r.b)("inlineCode",{parentName:"p"},"plugin")," definition instead, using the ",Object(r.b)("inlineCode",{parentName:"p"},"createState")," abstraction."),Object(r.b)("p",null,"The relation between ",Object(r.b)("inlineCode",{parentName:"p"},"plugin"),", its parameter ",Object(r.b)("inlineCode",{parentName:"p"},"client"),", and how to use it in your ",Object(r.b)("inlineCode",{parentName:"p"},"Component")," definition is documented in detail in the ",Object(r.b)("a",{parentName:"p",href:"/docs/tutorial/js-custom#the-plugin-declaration"},"Plugin Declaration section"),".\nPlease read it before continuing as it will explain how to manage state, handle receiving and sending data and testing in detail."),Object(r.b)("p",null,"The full set of available APIs on ",Object(r.b)("inlineCode",{parentName:"p"},"client")," is documented on the ",Object(r.b)("a",{parentName:"p",href:"/docs/extending/flipper-plugin#pluginclient"},"Desktop Plugin API")," page."),Object(r.b)("p",null,"This step is completed if the plugin follows the next ",Object(r.b)("inlineCode",{parentName:"p"},"plugin")," / ",Object(r.b)("inlineCode",{parentName:"p"},"component")," structure and is working again. Make sure to test extensively!"),Object(r.b)("h3",{id:"tips"},"Tips:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"To quickly verify the plugin compiles, the simplest way is to keep ",Object(r.b)("inlineCode",{parentName:"li"},"yarn tsc -w")," running in the ",Object(r.b)("inlineCode",{parentName:"li"},"desktop")," folder. "),Object(r.b)("li",{parentName:"ul"},"Similarly ",Object(r.b)("inlineCode",{parentName:"li"},"yarn watch")," can be used to run the unit tests in watch mode. Use the ",Object(r.b)("inlineCode",{parentName:"li"},"p")," key to filter for your specific plugin if ",Object(r.b)("inlineCode",{parentName:"li"},"jest")," doesn't do so automatically."),Object(r.b)("li",{parentName:"ul"},"Example of migrating the network plugin to use Sandy APIs. D24108772 / ",Object(r.b)("a",{parentName:"li",href:"https://github.com/facebook/flipper/commit/fdde2761ef054e44f399c846a2eae6baba03861e"},"Github commit")),Object(r.b)("li",{parentName:"ul"},"Example of migrating the example plugin to use Sandy APIs. D22308265 / ",Object(r.b)("a",{parentName:"li",href:"https://github.com/facebook/flipper/commit/babc88e472612c66901d21d289bd217ef28ee385#diff-a145be72bb13a4675dcc8cbac5e55abcd9a542cc92f5c781bd7d3749f13676fc"},"Github commit")),Object(r.b)("li",{parentName:"ul"},"Other plugins that can be check for inspiration are the Logs and Network plugins."),Object(r.b)("li",{parentName:"ul"},"These steps typically does not involve change much the UI or touch other files than ",Object(r.b)("inlineCode",{parentName:"li"},"index.tsx"),". Typically, the root component needs to be changed, but most other components can remain as is. However, if a ManagedTable is used (see the next section), it might be easier to already convert the table in this step."),Object(r.b)("li",{parentName:"ul"},"Sandy has first class support for unit testing your plugin and mocking device interactions. Please do set up unit tests per documentation linked above!"),Object(r.b)("li",{parentName:"ul"},"If the original plugin definition contained ",Object(r.b)("inlineCode",{parentName:"li"},"state"),", it is recommended to create one new state atoms (",Object(r.b)("inlineCode",{parentName:"li"},"createState"),") per field in the original ",Object(r.b)("inlineCode",{parentName:"li"},"state"),", rather than having one big atom."),Object(r.b)("li",{parentName:"ul"},"If the original plugin definition contained ",Object(r.b)("inlineCode",{parentName:"li"},"persistedState"),", it is recommended to create one new state atoms (",Object(r.b)("inlineCode",{parentName:"li"},"createState"),") per field in the original ",Object(r.b)("inlineCode",{parentName:"li"},"state"),", rather than having one big atom. By setting the ",Object(r.b)("inlineCode",{parentName:"li"},"persist")," ",Object(r.b)("a",{parentName:"li",href:"/docs/extending/flipper-plugin#options"},"option")," of the state, you can make sure this piece of state becomes part of the import / export functionality of Flipper. Which is important if the data stored here is relevant for bug reports. "),Object(r.b)("li",{parentName:"ul"},"For deeply nested state updates, using ",Object(r.b)("inlineCode",{parentName:"li"},"state.update")," is often simpler than using ",Object(r.b)("inlineCode",{parentName:"li"},"state.set"),", as it uses ",Object(r.b)("a",{parentName:"li",href:"https://immerjs.github.io/immer/"},"immer")," under the hood to make immutable state updates straight forward."),Object(r.b)("li",{parentName:"ul"},"For the same reason, you don't need to shallowly clone your state anymore, as long as ",Object(r.b)("inlineCode",{parentName:"li"},"state.update")," is used for state updates."),Object(r.b)("li",{parentName:"ul"},"When dealing a lot with promises, using ",Object(r.b)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await"},Object(r.b)("inlineCode",{parentName:"a"},"async")," / ",Object(r.b)("inlineCode",{parentName:"a"},"await"))," is usually simpler.")),Object(r.b)("h3",{id:"migration-table"},"Migration table"),Object(r.b)("p",null,"Some abstractions that used to be (for example) static methods on ",Object(r.b)("inlineCode",{parentName:"p"},"FlipperPlugin")," are now exposed from the ",Object(r.b)("inlineCode",{parentName:"p"},"client")," object:"),Object(r.b)("p",null,"| Old | New |\n| ",Object(r.b)("inlineCode",{parentName:"p"},"persistedState")," | Use ",Object(r.b)("inlineCode",{parentName:"p"},"createState")," and set the ",Object(r.b)("inlineCode",{parentName:"p"},"persist")," option |\n| ",Object(r.b)("inlineCode",{parentName:"p"},"persistedStateReducer")," | Create message handlers and update the state objects directly |\n| ",Object(r.b)("inlineCode",{parentName:"p"},"exportPersistedState")," | Use the ",Object(r.b)("inlineCode",{parentName:"p"},"client.onExport")," hook |\n| ",Object(r.b)("inlineCode",{parentName:"p"},"getActiveNotifications")," | Use ",Object(r.b)("inlineCode",{parentName:"p"},"client.showNotification")," for persistent notifications, or ",Object(r.b)("inlineCode",{parentName:"p"},"message")," / ",Object(r.b)("inlineCode",{parentName:"p"},"notification")," from ",Object(r.b)("inlineCode",{parentName:"p"},"antd")," for one-off notifications.\n| ",Object(r.b)("inlineCode",{parentName:"p"},"createTablePlugin")," | TBD, so these conversions can be skipped for now |\n| ",Object(r.b)("inlineCode",{parentName:"p"},"init")," | ",Object(r.b)("inlineCode",{parentName:"p"},"client.onReady")," |"),Object(r.b)("h2",{id:"using-sandy--antdesign-to-organise-the-plugin-ui"},"Using Sandy / Ant.design to organise the plugin UI"),Object(r.b)(d,{mdxType:"FbInternalOnly"},Object(r.b)("p",null,"For every plugin, we generated a tasks on our ",Object(r.b)("a",{parentName:"p",href:"https://www.internalfb.com/tasks?folder_filters&q=1341478626215302&group_by_type=MANUAL"},"Sandy Plugin Migration")," dashboard. Completing this step corresponds to completing the ",Object(r.b)("inlineCode",{parentName:"p"},"[flipper][sandy] convert plugin 'xxxx's UI to use ant.design")," task.\nIf you start this task, please assign yourself as owner and link it in the diff. ")),Object(r.b)("p",null,"The goal of this step is to update the UI of the plugin to use Sandy / Ant.design components.\nThese will provide a more consistent user experience, usually provide better UX and they support dark mode!\nRoughly speaking this typically involves replacing all imported components with their modern counterpart."),Object(r.b)("p",null,"For Sandy plugins, components can be found here:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Interactive data displaying components are exposed from ",Object(r.b)("inlineCode",{parentName:"li"},"flipper-plugin"),": ",Object(r.b)("inlineCode",{parentName:"li"},"DataTable")," (for tables), ",Object(r.b)("inlineCode",{parentName:"li"},"DataInspector")," (for JSON trees) and ",Object(r.b)("inlineCode",{parentName:"li"},"ElementInspector")," (for element trees). "),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"flipper-plugin")," also provides the primitives to organise the ",Object(r.b)("inlineCode",{parentName:"li"},"Layout")," of the plugin."),Object(r.b)("li",{parentName:"ul"},"Practically all other, more generic components are provided by ",Object(r.b)("a",{parentName:"li",href:"https://ant.design/components/overview/"},"ant.design"),", a proven mature open source component library, which is much richer than the components that are offered from ",Object(r.b)("inlineCode",{parentName:"li"},"flipper"),".")),Object(r.b)("p",null,"In Sandy, the layout is typically build by using a combination of ",Object(r.b)("inlineCode",{parentName:"p"},"Layout.Top")," (or ",Object(r.b)("inlineCode",{parentName:"p"},".Right"),", ",Object(r.b)("inlineCode",{parentName:"p"},".Left"),", ",Object(r.b)("inlineCode",{parentName:"p"},".Bottom"),"), which divides all available space in a fixed and dynamic section, ",Object(r.b)("inlineCode",{parentName:"p"},"Layout.Scrollable"),", which takes all available space and provides scrollbars if its content is still greater, and ",Object(r.b)("inlineCode",{parentName:"p"},"Layout.Container")," which organizes paddings, borders and spacing between elements etc."),Object(r.b)("p",null,"We generally recommend against using ",Object(r.b)("inlineCode",{parentName:"p"},"margins"),"; use padding and ",Object(r.b)("inlineCode",{parentName:"p"},"gap")," instead.\nIdeally, use ",Object(r.b)("inlineCode",{parentName:"p"},"theme.spacing")," to get standard numbers for margins and paddings instead of hard-coded numbers.\nThis will help with achieving consistency in look and feel."),Object(r.b)("h3",{id:"design-resources"},"Design resources"),Object(r.b)("p",null,"There are three important resources to check for documentation on the components available:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"If you start Flipper, and go to ",Object(r.b)("inlineCode",{parentName:"li"},"View > Flipper style guide"),", you will see a general overview of the Flipper design system. It will demonstrate colors, typography and creating layouts including some examples. "),Object(r.b)("li",{parentName:"ol"},"The ",Object(r.b)("a",{parentName:"li",href:"https://ant.design/components/overview/"},"ant.design component overview")),Object(r.b)("li",{parentName:"ol"},"The ",Object(r.b)("a",{parentName:"li",href:"/docs/extending/flipper-plugin#ui-components"},"API reference")," documentation for the components provided by ",Object(r.b)("inlineCode",{parentName:"li"},"flipper-plugin"))),Object(r.b)("h3",{id:"old-and-new-components"},"Old and new components"),Object(r.b)("p",null,"For conversion, the following table maps the old components to the new ones:"),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Old ",Object(r.b)("inlineCode",{parentName:"th"},"flipper")," component"),Object(r.b)("th",{parentName:"tr",align:null},"New component"),Object(r.b)("th",{parentName:"tr",align:null},"Providing package"),Object(r.b)("th",{parentName:"tr",align:null},"Notes"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"DetailsSidebar")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"DetailsSidebar")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"flipper-plugin")),Object(r.b)("td",{parentName:"tr",align:null},"as-is")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Sidebar")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Layout.Top")," (or ",Object(r.b)("inlineCode",{parentName:"td"},".Right"),", ",Object(r.b)("inlineCode",{parentName:"td"},".Left"),", ",Object(r.b)("inlineCode",{parentName:"td"},".Bottom"),")"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"flipper-plugin")),Object(r.b)("td",{parentName:"tr",align:null},"Set the ",Object(r.b)("inlineCode",{parentName:"td"},"resizable")," flag to allow the user to resize the pane.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"FlexColumn")," / ",Object(r.b)("inlineCode",{parentName:"td"},"Pane")," / ",Object(r.b)("inlineCode",{parentName:"td"},"View")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Layout.Container")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"flipper-plugin")),Object(r.b)("td",{parentName:"tr",align:null},"Use the ",Object(r.b)("inlineCode",{parentName:"td"},"gap")," property to provide some spacing between the children!")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"FlexRow")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Layout.Horizontal")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"flipper-plugin")),Object(r.b)("td",{parentName:"tr",align:null},"Use the ",Object(r.b)("inlineCode",{parentName:"td"},"gap")," property to provide some spacing between the children!")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Scrollable")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Layout.ScrollContainer")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"flipper-plugin")),Object(r.b)("td",{parentName:"tr",align:null})),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Link")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Typography.Link")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"antd")),Object(r.b)("td",{parentName:"tr",align:null})),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Text")," / ",Object(r.b)("inlineCode",{parentName:"td"},"Heading")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Typography.Text")," / ",Object(r.b)("inlineCode",{parentName:"td"},"Typography.Title")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"antd")),Object(r.b)("td",{parentName:"tr",align:null})),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Button")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Button")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"antd")),Object(r.b)("td",{parentName:"tr",align:null})),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Glyph")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Icon")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"antd")),Object(r.b)("td",{parentName:"tr",align:null})),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"ManagedDataTable")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"DataTable")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"flipper-plugin")),Object(r.b)("td",{parentName:"tr",align:null},"Requires state to be provided by a ",Object(r.b)("a",{parentName:"td",href:"/docs/extending/flipper-plugin#createdatasource"},Object(r.b)("inlineCode",{parentName:"a"},"createDataSource")))),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"ManagedDataInspector")," / ",Object(r.b)("inlineCode",{parentName:"td"},"DataInspector")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"DataInspector")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"flipper-plugin")),Object(r.b)("td",{parentName:"tr",align:null})),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"ManagedElementInspector")," / ",Object(r.b)("inlineCode",{parentName:"td"},"ElementInspector")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"ElementInspector")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"flipper-plugin")),Object(r.b)("td",{parentName:"tr",align:null})),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Panel")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Panel")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"flipper-plugin")),Object(r.b)("td",{parentName:"tr",align:null})),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Tabs")," / ",Object(r.b)("inlineCode",{parentName:"td"},"Tab")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Tabs")," / ",Object(r.b)("inlineCode",{parentName:"td"},"Tab")),Object(r.b)("td",{parentName:"tr",align:null},"`flipper-plugin"),Object(r.b)("td",{parentName:"tr",align:null},"Note that ",Object(r.b)("inlineCode",{parentName:"td"},"Tab"),"'s ",Object(r.b)("inlineCode",{parentName:"td"},"title")," property is now called ",Object(r.b)("inlineCode",{parentName:"td"},"tab"),".")))),Object(r.b)("p",null,"Most other components, like ",Object(r.b)("inlineCode",{parentName:"p"},"select")," elements, tabs, date-pickers, etc etc can all be found in the Ant documentaiton."),Object(r.b)("h3",{id:"theming--custom-styled-components"},"Theming & custom styled components"),Object(r.b)("p",null,"Creating your own components / styling using ",Object(r.b)("inlineCode",{parentName:"p"},"styled")," is still supported.\nBut ideally, you should need custom styled components a lot less!"),Object(r.b)("p",null,"Since Sandy plugins are expected to support dark mode, (use the settings pane to quickly toggle), we recommend to not use hard-coded colors, but instead use one of the semantic colors that are provided through the ",Object(r.b)("inlineCode",{parentName:"p"},"theme")," object that can be imported from ",Object(r.b)("inlineCode",{parentName:"p"},"flipper-plugin"),"."),Object(r.b)("p",null,"Ideally there should be no hard-coded colors anymore either, and little need to use ",Object(r.b)("inlineCode",{parentName:"p"},"width: 100%")," / ",Object(r.b)("inlineCode",{parentName:"p"},"height: 100%")," anywhere, as needing those typically signals a layout issue."),Object(r.b)("p",null,"Tip: it is recommended to keep components as much as possible outside the entry file, as components defined outside the index.tsx file will benefit from fast refresh."),Object(r.b)("h3",{id:"wrapping-up"},"Wrapping up"),Object(r.b)("p",null,"This step of the process is completed as soon as there are no imports from the ",Object(r.b)("inlineCode",{parentName:"p"},"flipper")," package anymore.\nDon't forget to remove ",Object(r.b)("inlineCode",{parentName:"p"},"flipper")," from the ",Object(r.b)("inlineCode",{parentName:"p"},"peerDependencies")," in the ",Object(r.b)("inlineCode",{parentName:"p"},"package.json")," section if present."),Object(r.b)("p",null,"Feel free to reach out to the Flipper team for any questions!"))}m.isMDXComponent=!0},159:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return u}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var b=i.a.createContext({}),c=function(e){var t=i.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=c(e.components);return i.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},m=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,b=p(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,u=d["".concat(l,".").concat(m)]||d[m]||s[m]||r;return n?i.a.createElement(u,o(o({ref:t},b),{},{components:n})):i.a.createElement(u,o({ref:t},b))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var b=2;b<r;b++)l[b]=n[b];return i.a.createElement.apply(null,l)}return i.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);
var T=Object.defineProperty;var C=(t,s,i)=>s in t?T(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i;var l=(t,s,i)=>(C(t,typeof s!="symbol"?s+"":s,i),i);import{s as S}from"./utils-bf63a336.js";import{j as e,r as o,g as w,a as f,c as v,N as F}from"./nav-0789d0b5.js";import{S as k,A as M,T as z}from"./showcase-048341fb.js";function P({children:t,heading:s,...i}){return e.jsxs("div",{className:"details",children:[s||"",e.jsxs("details",{...i,children:[e.jsx("summary",{children:""}),t]})]})}function A(){return e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Phase One: Planning"}),e.jsx("p",{children:"The most important part to ensuring a quality website is knowing what to build. After talking with the owner, it was determined that their primary concerns were a simple design and strong Search Engine Optimization."}),e.jsx(P,{open:!0,heading:e.jsx("h4",{children:"Questions I asked before building the site"}),children:e.jsxs("ol",{children:[e.jsx("li",{children:"What does the site do? What should users be able to accomplish?"}),e.jsx("p",{children:"The site should allow people to view puppies and their parents as well as past litters from parents. The focus should be on informing people about puppies we have available. The end goal would be to users fill out a form to apply for a puppy or sign up to be notified about the next litter."}),e.jsxs("li",{children:["What are some similar sites that you like? How about ones you don’t like?",e.jsxs("p",{children:["Example sites are featured ",e.jsx("a",{href:"#example-sites",children:"below"}),"."]})]}),e.jsxs("li",{children:["Is this a completely new site, or are giving the existing one a makeover?",e.jsx("p",{children:"This will be a completely new site done from scratch."})]}),e.jsxs("li",{children:["Are we talking a webpage or a web of pages?",e.jsx("p",{children:"It will likely operate more like a web app. So, a web of pages is closer."})]}),e.jsxs("li",{children:["Will you want to add, edit, and delete pages yourself?",e.jsx("p",{children:"Updating pictures and information about dogs and puppies should be all that is needed to keep things running."})]}),e.jsxs("li",{children:["Think you’ll want to do some blogging on there? If so, is there a CMS you already like?",e.jsx("p",{children:"No blog will be necessary. Engages with audience on social media."})]}),e.jsxs("li",{children:["Do you have a certain design in mind, or can it be some out-of-the-box template?",e.jsx("p",{children:"The design should be completely uniue."})]}),e.jsxs("li",{children:["Should visitors be able to contact you through a form? Where do you plan on storing form submissions? (Many more questions were included here.)",e.jsx("p",{children:"Visitors and contacts will be managed through Zoho. Owners' email address will be made public with the help of a scrape shield for a bit of protection. A privacy policy will need to be created before collecting any information from visitors."})]}),e.jsxs("li",{children:["Are you planning to sell these puppies through the site?",e.jsx("p",{children:"The site will only need to manage the acceptance of Applications. Owner will handle payment processing."})]}),e.jsxs("li",{children:["Do you have content and images, or will you need help with those?",e.jsx("p",{children:"Plenty of Images. Graphics will need to be created for the design."})]}),e.jsxs("li",{children:["Does it need to support multiple languages?",e.jsx("p",{children:"U.S. English will be all. This is a locally operated business."})]}),e.jsxs("li",{children:["Who will be responsible for looking after the site after it’s done? Will someone need to be trained, or are you looking for a contractor to maintain things?",e.jsx("p",{children:"The site should be simple enough for the owner to maintain on their own after completion."})]}),e.jsxs("li",{children:["How do you want people to find your site?",e.jsx("p",{children:"Search Engine Optimization is a major priority."})]}),e.jsxs("li",{children:["If you want your site to be “better, faster, and cheaper” but can only pick two of them, which two would you choose?",e.jsx("p",{children:"Managed to do all of these. 😉"})]}),e.jsxs("li",{children:["What’s your budget?",e.jsx("p",{children:"Domain will be the only cost."})]})]})}),e.jsx("div",{id:"example-sites",children:e.jsx(k,{db:new Map([[{empty:0,hilltop:1,gravelle:2},[{id:"empty",img:e.jsx(e.Fragment,{children:e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("h3",{children:"Example Sites"}),e.jsx("p",{children:"These two sites were given as a pattern to work from."}),e.jsx("p",{children:"They both had a focused on whitespace, artistic fonts, and simplicity, I wanted to take things a little bit further."})]})})},{id:"hilltop",title:"Hilltop Poodles and Doodles",link:["https://www.hilltopdoodlesandpoodles.com","_blank"],img:e.jsx("img",{src:"/static/img/hilltop-doodles-ss.png",alt:"Screenshot taken from hilltopdoodlesandpoodles.com"})},{id:"gravelle",title:"Gravelle Family Farm",link:["https://www.gravellefamilyfarm.com/","_blank"],img:e.jsx("img",{src:"/static/img/gravelle-family-farm-ss.png",alt:"Screenshot taken from gravellefamilyfarm.com"})}]]])})})]})}/*!
 * @gsap/react 2.1.1
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/let j=typeof window<"u"?o.useLayoutEffect:o.useEffect,b=t=>t&&!Array.isArray(t)&&typeof t=="object",u=[],L={},I=w;const y=(t,s=u)=>{let i=L;b(t)?(i=t,t=null,s="dependencies"in i?i.dependencies:u):b(s)&&(i=s,s="dependencies"in i?i.dependencies:u),t&&typeof t!="function"&&console.warn("First parameter must be a function or config object");const{scope:n,revertOnUpdate:c}=i,r=o.useRef(!1),a=o.useRef(I.context(()=>{},n)),h=o.useRef(m=>a.current.add(null,m)),d=s&&s.length&&!c;return j(()=>{if(t&&a.current.add(t,n),!d||!r.current)return()=>a.current.revert()},s),d&&j(()=>(r.current=!0,()=>a.current.revert()),u),{context:a.current,contextSafe:h.current}};y.register=t=>{I=t};y.headless=!0;class N{constructor(s,i,n){l(this,"zoomTl");l(this,"container");l(this,"selector");l(this,"initialWidth");this.selector=i,this.container=s,this.initialWidth=n}createTimeline(){const s={duration:.5,ease:"power2.inOut"};this.zoomTl=w.timeline({defaults:s}).to([this.selector,this.container],{width:"100%",flex:1}).to("svg",{duration:0,opacity:1,zIndex:2,width:"revert",height:"revert"}),this.zoom()}async zoom(){if(this.zoomTl||this.createTimeline(),!this.zoomTl)throw new Error("Zoom Animation was not successfully created");await this.zoomTl.reversed(!this.zoomTl.reversed())}}function D({img:t,container:s,initialWidth:i}){const n=s||o.useRef(null),c=o.useRef(null),r=o.useRef(null),a=o.useRef(null),h=o.useRef(null),{contextSafe:d}=y(async()=>{a.current=new N(n.current,h.current,i),r.current=w.timeline(),r.current.to(c.current,{opacity:1,height:"initial",duration:.2,ease:"power2.inOut"}),await r.current.play()},{scope:n}),m=d(()=>{if(!a.current)throw new Error("Zoom Animation not successfully created");a.current.zoom(),r.current.reversed(!r.current.reversed())}),x=g=>{(g.key==="Enter"||g.key===" "||g.key==="Escape")&&m()},p=25;return e.jsxs("button",{className:"zoomable-image",style:{width:i+p+"px"},ref:n,onClick:m,onKeyUp:x,children:[e.jsxs("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink","aria-label":"Zoom Image",role:"button",tabIndex:0,width:p*2,height:p*2,viewBox:"-5,-5,266,266",onKeyUp:x,children:[e.jsx("rect",{fill:"#ffffff",stroke:"#424b54",strokeWidth:"10",width:"256",height:"256",rx:"40"}),e.jsx("g",{transform:"scale(5.12,5.12)",children:e.jsx("path",{fill:"#424b54",d:"M5.97852,3.98047c-0.81349,0.00101 -1.54534,0.49459 -1.85108,1.24844c-0.30574,0.75385 -0.12447,1.61777 0.4585,2.18515l10.58594,10.58594h-5.17187c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h12v-12c0.00739,-0.54026 -0.2041,-1.06052 -0.58634,-1.44239c-0.38224,-0.38187 -0.90271,-0.59286 -1.44296,-0.58495c-1.1038,0.01618 -1.9858,0.92353 -1.9707,2.02734v5.17188l-10.58594,-10.58594c-0.37701,-0.38755 -0.89487,-0.60596 -1.43555,-0.60547zM43.96094,3.98047c-0.5196,0.01548 -1.01276,0.23264 -1.375,0.60547l-10.58594,10.58594v-5.17187c0.00739,-0.54026 -0.2041,-1.06052 -0.58634,-1.44239c-0.38224,-0.38187 -0.90271,-0.59286 -1.44296,-0.58495c-1.1038,0.01618 -1.9858,0.92353 -1.9707,2.02734v12h12c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175h-5.17187l10.58594,-10.58594c0.59152,-0.57498 0.76938,-1.45413 0.44787,-2.21383c-0.32151,-0.75969 -1.07643,-1.24409 -1.90099,-1.21977zM10,28c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h5.17188l-10.58594,10.58594c-0.52247,0.50163 -0.73294,1.24653 -0.55022,1.94741c0.18271,0.70088 0.73006,1.24822 1.43094,1.43094c0.70088,0.18271 1.44578,-0.02775 1.94741,-0.55022l10.58594,-10.58594v5.17188c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578v-12zM28,28v12c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578v-5.17187l10.58594,10.58594c0.50163,0.52248 1.24653,0.73295 1.94742,0.55024c0.70088,-0.18271 1.24823,-0.73006 1.43094,-1.43094c0.18271,-0.70088 -0.02776,-1.44578 -0.55024,-1.94742l-10.58594,-10.58594h5.17188c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"})})]}),e.jsx("p",{className:"zoomable-image_clickExpand",style:{width:i},ref:c,children:"Click to Expand"}),e.jsx("img",{...t,width:i,src:t.src,className:t.className?t.className:"",ref:h})]})}function E(){const[t,s]=o.useState("section-1"),i=400,n=new Map([[{showcased:0,"clf-section-2":1,"clf-section-3":2,"clf-404":3,"clf-section-1":4},[{id:"showcased",img:e.jsx(e.Fragment,{children:e.jsx(D,{initialWidth:i,img:{className:"showcase_zoomable-image",src:`/static/img/CLF-${t}.png`,alt:"Mock-up of Cherry Lane Farms"}})})},{id:"clf-section-2",title:"Wood Section",onClick:()=>s("section-2"),img:e.jsx("img",{src:"/static/img/CLF-section-2.png",alt:"Mock-up of Cherry Lane Farms"})},{id:"clf-section-3",title:"Tan Section",onClick:()=>s("section-3"),img:e.jsx("img",{src:"/static/img/CLF-section-3.png",alt:"Mock-up of Cherry Lane Farms"})},{id:"clf-404",title:"404 Page",onClick:()=>s("404"),img:e.jsx("img",{src:"/static/img/CLF-404.png",alt:"Mock-up of Cherry Lane Farms"})},{id:"clf-section-1",title:"Topmost Section",onClick:()=>s("section-1"),img:e.jsx("img",{src:"/static/img/CLF-section-1.png",alt:"Mock-up of Cherry Lane Farms"})}]]]);return e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Phase Two: Design"}),e.jsx(M,{sideText:e.jsx("i",{children:e.jsx("p",{children:"The color scheme I created is characterized by a uniform luminance and contrast ratio across the entire pallete."})}),sideText_classPrefix:"clf-figma",imgClass:"clf-figma-color-theme",imgSrc:"/static/img/CLF-color-theme.png",imgAlt:"Color pallete for Cherry Lane Farms"}),e.jsxs("p",{children:["Figma is one of the foremost tools for web design. It has a focus on collaboration very similar to"," ",e.jsx(f,{link:"https://apps.nextcloud.com/apps/whiteboard",children:"Nextcloud's new Whiteboard app"}),". I used Figma to create a mock-up of the site. Allowing me a space to collaborate with the owner on the UX and UI of the site before anything was hardcoded."]}),e.jsx(k,{db:n}),e.jsx("p",{children:"This process included building out all components and other visual graphics that would be used in the site early on. There was definitely a learning curve with Figma, but taking the time to plan the design of the site before building it saved me a lot of time reworking things later on."}),e.jsx("h4",{children:"If I could go back"}),e.jsx("p",{children:"I think I wouldn't have spent so much effort with the little details, like filling the mock-up with up-to-date content. Although this provided a very clear picture for the client, the extra time it took to gather and create some of these timely visual elements of the site did not help when I didn't end up using them."}),e.jsx("p",{children:`As great as Figma is, some design aspects are still better done as code is being written. In fact, I found that parts of Figma's interface were more cumbersome than straight code would have been in design. For example, Figma's "auto-layout" tools are very similar to how flex-box and grid displays work in CSS. Despite this, they are definitely not easier to mock. I found myself wanting to simply use my browser Dev Tools to write out what I wanted instead of trying to wrestle with Figma's 'auto-layout'. To its credit, Figma's variable system did translate very easily into Sass variables.`})]})}function R({children:t}){return e.jsx("div",{className:"pre",children:e.jsx("pre",{children:t})})}function W(){return e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Phase Three: Backend"}),e.jsx("h4",{children:"Cloudflare"}),e.jsx("p",{children:"The backend system for the site was built entirely serverless. Cloudflare, despite their many crimes against the internet, offer an unmatchable amount of free services. Everything from the relational database to the Next.js cache, all the way to the image delivery system was built using Cloudflare's services."}),e.jsx("h4",{children:"Relational Database"}),e.jsx("p",{children:"Initially, I thought I would be using Cloudflare Workers KV for the database. KV is a NoSQL solution though. I needed a relational database in order to define dog families. I quickly realized this was going to be a non-negotiable feature for this dog breeding site. After careful consideration of many options, I decided to use Cloudflare's D1 Sqlite database."}),e.jsxs("aside",{children:[e.jsx("h4",{children:"D1 is still new"}),e.jsxs("p",{children:["D1 is still being adopted by the devolpment community. So, I quickly became deeply familiar with Cloudflare's documentation. This lead me to making"," ",e.jsx(f,{link:"https://github.com/search?q=is%3Apr%20author%3AtheTyster%20archived%3Afalse%20cloudflare%20&type=pullrequests",children:"several contributions"})," ","to their documentation during the development of the site."]})]}),e.jsx("h5",{children:"Here's a visual example of the schema I ended up creating for this Database"}),e.jsx(R,{children:`
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │ Group_Photos │  │ Headshots_Lg │  │ Headshots_Sm │
  └──────────────┘  └──────────────┘  └──────────────┘
  1:M    │       │          │         │
         │       └──────────┼─────────┘
         │                  └────┐
         v                       V 1:1
  ┌─────────────────────┐  M:M  ┌──────┐
  │ Dog_To_Group_Photos │<=====>│ Dogs │
  └─────────────────────┘       └──────┘
                                 / 1:1 \\
                                /       \\
                               /         \\
                              v           v
                      ┌─────────┐      ┌────────┐
                      │ Puppies │      │ Adults │
                      └─────────┘      └────────┘
                        \\ M:1 /          \\ 2:1 /
                         \\   /            \\   /    
                          \\ /              \\ /
                           │                │
                           v                v
                      ┌─────────┐ 1:1 ┌──────────┐  
                      │ Litters │────>│ Families │  
                      └─────────┘     └──────────┘
        `}),e.jsx("p",{children:"This boiled down to only five total queries for site data and one complex query requiring aggregated 'Select' statements. Nevertheless, in the interest of squeezing every bit of speed I knew how to out of the site, I built a caching and validation function to cache the results of these six queries in Cloudflare's KV storage three times a day."}),e.jsx("img",{src:"/static/img/backend-architecture.svg",alt:"Cherry Lane Farms Back End Image Management map."}),e.jsx("p",{children:"This not only reduces queries, to a standard rate, (Something that could eventually cost money if it got out of hand.) but it also stores the results closer to users since KV storage is more distributed across Cloudflares CDN than D1 is currently."}),e.jsx("h4",{children:"Image Delivery"}),e.jsx("p",{children:"Protecting proprietary images was a priority for the owner. Apparently it is not uncommon for puppy mills to steal images off the internet and use them to market off their own dogs."}),e.jsx("p",{children:"With this in mind, I devised a way to not only optimize images, but also secure them, and the image optimization service from abuse."}),e.jsx("img",{src:"/static/img/image-delivery.svg",alt:"Cherry Lane Farms Image Delivery Architectural map."}),e.jsx("p",{children:"Cloudflare's image delivery service optimizes images as they are accessed and immediately caches them on the edge. The first time an image is accessed, it is optimized and then stored on the edge server."}),e.jsx("p",{children:"Using this service is very easy. It simply requires a minor change to the sources image URL. The problem was that, once enabled, anyone savvy enough to discover that the service is in use can make the same alteration and siphon optimizations from your image delivery worker. This can lead to a large bill from Cloudflare."}),e.jsx("h5",{children:"The Creation of CripToe"}),e.jsx("p",{children:"For a small website like this that would otherwise have no costs for image delivery, I was determined to lock everything down."}),e.jsxs("p",{children:["So, I created my first NPM package,"," ",e.jsx(f,{link:"https://www.npmjs.com/package/criptoe",children:"CripToe"}),". CripToe simply encrypts and decrypts URL strings. I used this to encrypt the image delivery URL and programmed the worker to reject any optimizations that could not be decrypted. Then, all that was left was to encrypt and hash all of the images and store the encrypted URLs in the database."]})]})}function q(){return e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Phase Four: Frontend"}),e.jsx("h4",{children:"Typescript & Next.JS"}),e.jsx("p",{children:"I chose to use Next.js for this project because of its support for TypeScript and its ability to generate static sites. Since Search Engine optimization was such a priority for this client, I wanted to be have an end product that was as SEO friendly as possible. Next.js has the most community support and is by far the most widely used static site generator. In an interest to learn a framework that could be used in a professional setting, I chose Next.js."}),e.jsx("img",{src:"/static/img/typescript-and-next.png",alt:"Typescript + Next.JS"}),e.jsx("p",{children:"Typescript was chosen for similar reasons as Next.js. I was only really aware of Typescript's existence and what it was on a surface level before starting this project. But, I knew I wanted something that would produce stable code, and I wanted an opportunity to get experience with a statically typed language. Typescript, once again being the most popular choice, was the reason I used it in this project."}),e.jsx("p",{children:"Having never used any of these tools before, I have to say that I was happy with how easily I was able to pick them up."}),e.jsx("h4",{children:"CMS"}),e.jsx("img",{src:"/static/img/zoho-logo.png",alt:"Zoho's Logo"}),e.jsx("p",{children:"One of the first things I did was to set up a CMS for the owner to use. I chose to use Zoho CRM for this because it was free and easy to set up. I also set up a system for the owner to receive emails when a new customer signed up on the site. This was done using Gmail and an SMTP server that I connected to the domain."}),e.jsx("h4",{children:"Business Email"}),e.jsx("p",{children:"Setting up a business email was not too difficult. I used Gmail and MailerSend, a free SMTP server that I connected to the domain. Then, I connected that business address and SMTP provider directly to the owner's Gmail account. This allowed the owner to receive and respond to emails from clients without needing a new inbox."}),e.jsx("p",{children:"Additionally, since we were using our own SMTP provider instead of routing them through Gmail's SMTP, the owner's primary Gmail email will not be visible in email headers and they have a much stronger deliverability rate."})]})}const U=()=>(S("The Creation of Cherry Lane Farms"),e.jsxs("main",{children:[e.jsx("img",{className:"hero",src:"/static/img/mt_fuji.jpg",alt:"Painting of Mt. Fuji."}),e.jsxs("p",{children:[e.jsxs("a",{href:"https://original.cherrylanefarmdoodles.com/about/development",children:["Cherry Lane Farm Doodles"," "]}),"is a family-owned and operated business that breeds and raises Goldendoodles. This website/webapp was created to help them manage their business."]}),e.jsx("p",{children:"I had 5 goals in mind:"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Easy to use."}),e.jsx("li",{children:"Only pay for the domain."}),e.jsx("li",{children:"Lightning fast."}),e.jsx("li",{children:"Maximum Accessibility."}),e.jsxs("li",{children:["Full-featured. Should accommodate:",e.jsxs("ul",{children:[e.jsx("li",{children:"Marketing"}),e.jsx("li",{children:"Sales"}),e.jsx("li",{children:"Customer Management"}),e.jsx("li",{children:"Product Management"})]})]})]}),e.jsx("p",{children:"This project turned out to be an excellent opportunity for me to express my full range of capability in web development. Everything from design to implementation was done by me."}),e.jsx("h2",{children:"When I started this project, I had never…"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Successfully created a custom email address for free.",e.jsx("p",{children:"I learned how to integrate the owner's Gmail accounts with an SMTP server that I connected to their domain."})]}),e.jsxs("li",{children:["Used Zoho.",e.jsx("p",{children:"I learned how to use Zoho as a customer relationship manager for the owners. My familiarity with Hubspot helped, but every CRM is a bit different."})]}),e.jsxs("li",{children:["Worked with a web design tool.",e.jsx("p",{children:"I learned to use Figma to create design components and mock-ups."})]}),e.jsxs("li",{children:["Touched Typescript; Next.js; Cloudflare Pages, D1, R2, Workers, or KV.",e.jsx("p",{children:"I learned how to use all of these tools for the first time as I built the site."})]}),e.jsxs("li",{children:["Built my own NPM package.",e.jsx("p",{children:"This was something that was necessary for the project in order to have a set of utilities that could be used across the site various environments that I was working with."})]})]}),e.jsx("h4",{children:"Why is this is so great?"}),e.jsx("p",{children:"This project included the first backend system I have ever designed from beginning to end. I suppose it might not be the most complex system, but I am proud of the fact that I was able to learn it from scratch and implement it from beginning to end."}),e.jsx("p",{children:"In the end, the only cost to build this website was the domain. If the rate of images created stays constant, the only potential cost could be for the SMTP server if the volume of emails sent ever surpasses a few thousand in a single day."}),e.jsx("p",{children:"The site is completely serverless and hosted entirely on the edge. On top of that, the statically generated assets and asynchronous loading done by Next.JS means that this website turned out to be remarkably fast."}),e.jsx("h2",{children:"Four Phases in Four Months"}),e.jsx(z,{menuItems:new Map([[{initial:0,design:1,backend:2,frontend:3},[{id:"initial",title:"Planning",component:e.jsx(A,{})},{id:"design",title:"Design",component:e.jsx(E,{})},{id:"backend",title:"Backend",component:e.jsx(W,{})},{id:"frontend",title:"Frontend",component:e.jsx(q,{})}]]])})]})),G=v.createRoot(document.getElementById("nav"));G.render(e.jsx(o.StrictMode,{children:e.jsx(F,{})}));const _=v.createRoot(document.getElementById("content"));_.render(e.jsx(o.StrictMode,{children:e.jsx(U,{})}));
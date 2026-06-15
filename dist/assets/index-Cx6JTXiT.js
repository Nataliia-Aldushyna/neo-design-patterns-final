(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{raw;constructor(e){this.raw=e}import(){this.validate();let e=this.map();this.render(e)}},t=class{d;constructor(e){this.d=e}render(){let e=document.createElement(`header`);e.className=`section header`;let t=[this.d.contacts.email?`<p><a href="mailto:${this.d.contacts.email}">${this.d.contacts.email}</a></p>`:``,this.d.contacts.phone?`<p>${this.d.contacts.phone}</p>`:``,this.d.contacts.location?`<p>${this.d.contacts.location}</p>`:``].join(``);return e.innerHTML=`
      <h1>${this.d.fullName}</h1>
      <p class="title">${this.d.title}</p>
      <div class="contacts">
        ${t}
      </div>
    `,e}},n=class{d;constructor(e){this.d=e}render(){let e=document.createElement(`section`);return e.className=`section summary`,e.innerHTML=`
      <h2>Summary</h2>
      <p>${this.d.text}</p>
    `,e}},r=class{d;constructor(e){this.d=e}render(){let e=document.createElement(`li`);return e.className=`project-item`,e.textContent=`${this.d.name} – ${this.d.description}`,e}},i=class{wrapped;constructor(e){this.wrapped=e}render(){let e=this.wrapped.render();return e.classList.add(`highlight`),e}},a=class{d;constructor(e){this.d=e}render(){let e=document.createElement(`section`);return e.className=`section experience`,e.innerHTML=`<h2>Experience</h2>`,this.d.forEach(t=>{let n=document.createElement(`div`);n.className=`experience-item`,n.innerHTML=`
        <p>
          <span class="position">${t.position}</span> at
          <span class="company">${t.company}</span>
          (${t.start} - ${t.end})
        </p>
      `;let a=document.createElement(`ul`);a.className=`projects-list`,t.projects.forEach(e=>{let t=new r(e);e.isRecent&&(t=new i(t)),a.appendChild(t.render())}),n.appendChild(a),e.appendChild(n)}),e}},o=class{d;constructor(e){this.d=e}render(){let e=document.createElement(`section`);return e.className=`section education`,e.innerHTML=`<h2>Education</h2>`,this.d.forEach(t=>{let n=document.createElement(`div`);n.className=`education-item`,n.innerHTML=`
        <p>
          ${t.degree} ${t.field},
          ${t.institution}
          (${t.graduation})
        </p>
      `,e.appendChild(n)}),e}},s=class{d;constructor(e){this.d=e}render(){let e=document.createElement(`section`);e.className=`section skills`,e.innerHTML=`<h2>Skills</h2>`;let t=document.createElement(`ul`);return Object.entries(this.d).forEach(([e,n])=>{if(n.length===0)return;let r=document.createElement(`li`);r.innerHTML=`
        <p class="category-item">
          <span class="category">${e}:</span>
          ${n.join(`, `)}
        </p>
      `,t.appendChild(r)}),e.appendChild(t),e}},c=class{createBlock(e,r){switch(e){case`header`:return new t(r.header);case`summary`:return new n(r.summary);case`experience`:return new a(r.experience);case`education`:return new o(r.education);case`skills`:return new s(r.skills);default:throw Error(`Unknown block type: ${e}`)}}},l=class extends e{validate(){if(!this.raw||typeof this.raw!=`object`)throw Error(`Invalid resume data: JSON root must be an object.`);let e=this.raw;if(!e.header||!e.summary||!e.experience||!e.education||!e.skills)throw Error(`Invalid resume data: required sections are missing.`);if(!e.header.fullName||!e.header.title||!e.header.contacts)throw Error(`Invalid resume data: header is incomplete.`);if(!e.summary.text)throw Error(`Invalid resume data: summary is missing.`);if(!Array.isArray(e.experience))throw Error(`Invalid resume data: experience must be an array.`);if(!Array.isArray(e.education))throw Error(`Invalid resume data: education must be an array.`);if(!Array.isArray(e.skills.core)||!Array.isArray(e.skills.tools)||!Array.isArray(e.skills.languages))throw Error(`Invalid resume data: skills are incomplete.`)}map(){return this.raw}render(e){let t=document.getElementById(`resume-content`);if(!t)throw Error(`Element with id "resume-content" was not found.`);t.innerHTML=``;let n=new c;for(let r of[`header`,`summary`,`experience`,`education`,`skills`]){let i=n.createBlock(r,e);t.appendChild(i.render())}}};new class{async init(e){try{new l(await this.fetchData(e)).import()}catch(e){let t=e instanceof Error?e.message:`Unknown initialization error`;console.error(`Error initializing resume: ${t}`)}}async fetchData(e){let t=await fetch(e);if(!t.ok)throw Error(`Error loading JSON: ${t.statusText} (${t.status})`);return t.json()}}().init(`/resume.json`);
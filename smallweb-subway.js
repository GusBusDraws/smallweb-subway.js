const WEBRING_DATA_URL = `https://gusbus.space/smallweb-subway/data.json`;
// const WEBRING_DATA_URL = `https://gusbus.space/smallweb-subway/ring.json`;

let WEBRING_DATA;
loadJSON()
// async function fetchKeywords() {
//   const response = await fetch(WEBRING_DATA_URL);
//   WEBRING_DATA = await response.json();
// }

let thisSite;
let matchedSite;
let prevSiteIndex;
let nextSiteIndex;


function loadJSON() {
  fetch(WEBRING_DATA_URL)
    .then(response => response.json())
    .then((json) => {dataReady(json)});
}

function dataReady(json) {
  WEBRING_DATA = json;
  customElements.define("smallweb-subway", WebRing);
}

function goToPrev() {
  location.href = WEBRING_DATA[prevSiteIndex].url
}

function goToNext() {
  location.href = WEBRING_DATA[nextSiteIndex].url
}

let template = document.createElement("template");
template.innerHTML = `
  <style>
    /* styles */
  </style>

  <div class="webring">
    <h1>The Smallweb Subway</h1>
    <button onclick="goToPrev()">[Prev]</button>
    <button onclick="goToNext()">[Next]</button>
  </div>
`;
// let templateContent = document.getElementById("template").content;

class WebRing extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    // this.append(template.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    console.log('JSON data:')
    console.log(JSON.stringify(WEBRING_DATA))
    // thisSite = this.getAttribute("site");
    thisSite = window.location.href;
    if (thisSite === "http://127.0.0.1:5500/index.html") {
      thisSite = "https://gusbus.space/DoodleBot.html"
    }
    console.log("This site:")
    console.log(thisSite)
    // const matchedSiteIndex = WEBRING_DATA.findIndex(
    //   (site) => site.url === thisSite
    // );
    const matchedSiteIndex = WEBRING_DATA.map(x => x.url).indexOf(thisSite)
    // currentIdx =
    matchedSite = WEBRING_DATA[matchedSiteIndex];
    console.log("Matched site:")
    console.log(matchedSite.url)
    prevSiteIndex = matchedSiteIndex - 1;
    if (prevSiteIndex === -1) prevSiteIndex = WEBRING_DATA.length - 1;
    console.log("Previous site:")
    console.log(WEBRING_DATA[prevSiteIndex].url)
    nextSiteIndex = matchedSiteIndex + 1;
    if (nextSiteIndex > WEBRING_DATA.length) nextSiteIndex = 0;
    console.log("Next site:")
    console.log(WEBRING_DATA[nextSiteIndex].url)
  }
}

// customElements.define("smallweb-subway", WebRing);
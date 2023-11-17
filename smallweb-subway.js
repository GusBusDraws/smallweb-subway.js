let thisSite;
let matchedSite;
let prevSiteIndex;
let nextSiteIndex;
const WEBRING_DATA_URL = `https://gusbus.space/smallweb-subway/data.json`;
let WEBRING_DATA;
loadWebringJSON(WEBRING_DATA_URL);

function loadWebringJSON(url) {
  fetch(url)
    .then(response => response.json())
    .then((json) => {webringDataReady(json)});
}

function webringDataReady(json) {
  WEBRING_DATA = json;
  customElements.get('smallweb-subway') || customElements.define('smallweb-subway', WebRing);
  // customElements.define('smallweb-subway', WebRing);
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

class WebRing extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    console.log('Webring JSON data:')
    console.log(JSON.stringify(WEBRING_DATA))
    thisSite = window.location.href;
    // thisSite = "https://gusbus.space/doodlebot.html"
    console.log("This site:")
    console.log(thisSite)
    const matchedSiteIndex = WEBRING_DATA.map(x => x.url).indexOf(thisSite)
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


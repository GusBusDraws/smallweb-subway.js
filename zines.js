let thisURL_zines;
let thisSite_zines;
let matchedSiteIndex_zines;
let matchedSite_zines;
let prevSiteIndex_zines;
let nextSiteIndex_zines;
const WEBRING_DATA_URL_zines = `https://gusbus.space/smallweb-subway.js/zines.json`;
let DATA_zines;
loadWebringJSON_zines(WEBRING_DATA_URL_zines);

function loadWebringJSON_zines(url) {
  document.write('<script src="'+url+'"></script>');
  document.close();
}

function webringDataReady_zines(json) {
  DATA_zines = JSON.parse(json);
  customElements.get('smallweb-subway-zines') || (
    customElements.define('smallweb-subway-zines', Webring_zines));
}

function getHostName_zines(url) {
  // this is a bit of a cheat that leverages the URL type to get the hostname automagically
  return new URL(url).hostname;
}

function goToPrev_zines() {
  // Adding '//' treats the link as an external site, even without "https:"
  location.href = '//' + DATA_zines[prevSiteIndex_zines].url
}

function goToNext_zines() {
  // Adding '//' treats the link as an external site, even without "https:"
  location.href = '//' + DATA_zines[nextSiteIndex_zines].url
}

let template_zines = document.createElement("template");
template_zines.innerHTML = `
  <div class="webring_zines">
    <h3>The Smallweb Subway</h3>
    <div>
      <button id="tri-left_zines" onclick="goToPrev_zines()"></button>
      <div id="line">
        <div id="outer-circle">
          <div id="inner-circle"></div>
        </div>
      </div>
      <button id="tri-right_zines" onclick="goToNext_zines()"></button>
    </div>
    <p>
      Zines Line: Sites with original zines and zine resources.
    </p>
  </div>

  <style>
    .webring_zines {
      width: 100%;
      height: auto;
    }
    .webring_zines > div {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: center;
    }
    h3 {
      text-align: center;
      margin-bottom: 10px;
      padding-top: 10px;
    }
    p {
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
    #tri-left_zines {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid #0077c0;
      border-bottom: 20px solid transparent;
      outline: none;
      cursor: pointer;
    }
    #tri-left_zines:hover {
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid black;
      border-bottom: 20px solid transparent;
    }
    #tri-right_zines {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: 40px solid #0077c0;
      border-right: none;
      border-bottom: 20px solid transparent;
      cursor: pointer;
    }
    #tri-right_zines:hover {
      border-top: 20px solid transparent;
      border-left: 40px solid black;
      border-right: none;
      border-bottom: 20px solid transparent;
    }
    #line {
      width: 120px;
      height: 20px;
      background: #0077c0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #outer-circle {
      width: 40px;
      height: 40px;
      background: black;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #inner-circle {
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
    }
  </style>
`;

class Webring_zines extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_zines.content.cloneNode(true));
  }
  connectedCallback() {
    console.log('----------')
    console.log('zines line')
    console.log('----------')
    console.log('Webring JSON data:')
    console.log(JSON.stringify(DATA_zines))
    thisURL_zines = new URL(window.location.href);
    thisSite_zines = (
      thisURL_zines.hostname + thisURL_zines.pathname)
    console.log("This site:")
    console.log(thisSite_zines)
    matchedSiteIndex_zines = (
      DATA_zines.map(x => x.url).indexOf(thisSite_zines))
    matchedSite_zines = (
      DATA_zines[matchedSiteIndex_zines]);
    console.log("Matched site:")
    console.log(matchedSite_zines.url)
    prevSiteIndex_zines = matchedSiteIndex_zines - 1;
    if (prevSiteIndex_zines === -1) {
      prevSiteIndex_zines = DATA_zines.length - 1};
    console.log("Previous site:")
    console.log(DATA_zines[prevSiteIndex_zines].url)
    nextSiteIndex_zines = matchedSiteIndex_zines + 1;
    if (nextSiteIndex_zines === DATA_zines.length) {
      nextSiteIndex_zines = 0};
    console.log("Next site:")
    console.log(DATA_zines[nextSiteIndex_zines].url)
  }
}

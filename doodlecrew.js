let thisURL_doodlecrew;
let thisSite_doodlecrew;
let matchedSiteIndex_doodlecrew;
let matchedSite_doodlecrew;
let prevSiteIndex_doodlecrew;
let nextSiteIndex_doodlecrew;
const WEBRING_DATA_URL_doodlecrew = `https://gusbus.space/smallweb-subway.js/doodlecrew.json`;
let DATA_doodlecrew;
loadWebringJSON_doodlecrew(WEBRING_DATA_URL_doodlecrew);
// Currently out-of-date sites (to add back into JSON):
  // {
  //   "name" : "Doodles",
  //   "url" : "art.bymegan.com/doodles.html",
  //   "owner" : "Megan Chesterton"
  // },
  // {
  //   "name" : "Webring Landing Page",
  //   "url" : "yamasztuka.com/artindex.html",
  //   "owner" : "Yamasztuka"
  // }

function loadWebringJSON_doodlecrew(url) {
  fetch(url)
    .then(response => response.json())
    .then((json) => {webringDataReady_doodlecrew(json)});
}

function webringDataReady_doodlecrew(json) {
  DATA_doodlecrew = json;
  customElements.get('smallweb-subway-doodlecrew') || customElements.define('smallweb-subway-doodlecrew', Webring_doodlecrew);
}

function getHostName_doodlecrew(url) {
  // this is a bit of a cheat that leverages the URL type to get the hostname automagically
  return new URL(url).hostname;
}

function goToPrev_doodlecrew() {
  // Adding '//' treats the link as an external site, even without "https:"
  location.href = '//' + DATA_doodlecrew[prevSiteIndex_doodlecrew].url
}

function goToNext_doodlecrew() {
  // Adding '//' treats the link as an external site, even without "https:"
  location.href = '//' + DATA_doodlecrew[nextSiteIndex_doodlecrew].url
}

let template_doodlecrew = document.createElement("template");
template_doodlecrew.innerHTML = `
  <div class="webring_doodlecrew">
    <h3>The Smallweb Subway</h3>
    <div>
      <button id="tri-left" onclick="goToPrev_doodlecrew()"></button>
      <div id="line">
        <div id="outer-circle">
          <div id="inner-circle"></div>
        </div>
      </div>
      <button id="tri-right" onclick="goToNext_doodlecrew()"></button>
    </div>
    <p>
      Green Line: Sites from artists of the Doodle Crew Discord server.
    </p>
  </div>

  <style>
    .webring_doodlecrew {
      width: 100%;
      height: auto;
    }
    .webring_doodlecrew > div {
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
    #tri-left {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid #25b233;
      border-bottom: 20px solid transparent;
      outline: none;
      cursor: pointer;
    }
    #tri-left:hover {
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid black;
      border-bottom: 20px solid transparent;
    }
    #tri-right {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: 40px solid #25b233;
      border-right: none;
      border-bottom: 20px solid transparent;
      cursor: pointer;
    }
    #tri-right:hover {
      border-top: 20px solid transparent;
      border-left: 40px solid black;
      border-right: none;
      border-bottom: 20px solid transparent;
    }
    #line {
      width: 120px;
      height: 20px;
      background: #25b233;
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

class Webring_doodlecrew extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_doodlecrew.content.cloneNode(true));
  }
  connectedCallback() {
    console.log('---------------')
    console.log('doodlecrew line')
    console.log('---------------')
    console.log('Webring JSON data:')
    console.log(JSON.stringify(DATA_doodlecrew))
    if (typeof forceURL_doodlecrew !== 'undefined') {
      console.log('forceURL_doodlecrew: ', forceURL_doodlecrew)
      thisSite_doodlecrew = forceURL_doodlecrew
    } else {
      thisURL_doodlecrew = new URL(window.location.href);
      thisSite_doodlecrew = (
        thisURL_doodlecrew.hostname + thisURL_doodlecrew.pathname
      )
    }
    console.log("This site:")
    console.log(thisSite_doodlecrew)
    matchedSiteIndex_doodlecrew = DATA_doodlecrew.map(x => x.url).indexOf(thisSite_doodlecrew)
    matchedSite_doodlecrew = DATA_doodlecrew[matchedSiteIndex_doodlecrew];
    console.log("Matched site:")
    console.log(matchedSite_doodlecrew.url)
    prevSiteIndex_doodlecrew = matchedSiteIndex_doodlecrew - 1;
    if (prevSiteIndex_doodlecrew === -1) prevSiteIndex_doodlecrew = DATA_doodlecrew.length - 1;
    console.log("Previous site:")
    console.log(DATA_doodlecrew[prevSiteIndex_doodlecrew].url)
    nextSiteIndex_doodlecrew = matchedSiteIndex_doodlecrew + 1;
    if (nextSiteIndex_doodlecrew === DATA_doodlecrew.length) nextSiteIndex_doodlecrew = 0;
    console.log("Next site:")
    console.log(DATA_doodlecrew[nextSiteIndex_doodlecrew].url)
  }
}

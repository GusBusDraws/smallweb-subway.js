let thisURL_scifi;
let thisSite_scifi;
let matchedSiteIndex_scifi;
let matchedSite_scifi;
let prevSiteIndex_scifi;
let nextSiteIndex_scifi;
const WEBRING_DATA_URL_scifi = `https://gusbus.space/smallweb-subway.js/scifi.json`;
let DATA_scifi;
loadWebringJSON_scifi(WEBRING_DATA_URL_scifi);

function loadWebringJSON_scifi(url) {
  fetch(url)
    .then(response => response.json())
    .then((json) => {webringDataReady_scifi(json)});
}

function webringDataReady_scifi(json) {
  DATA_scifi = json;
  customElements.get('smallweb-subway-scifi') || (
    customElements.define('smallweb-subway-scifi', Webring_scifi));
}

function getHostName_scifi(url) {
  // this is a bit of a cheat that leverages the URL type to get the hostname automagically
  return new URL(url).hostname;
}

function goToPrev_scifi() {
  // Adding '//' treats the link as an external site, even without "https:"
  // location.href = '//' + DATA_scifi[prevSiteIndex_scifi].url
  window.open('//' + DATA_scifi[prevSiteIndex_scifi].url)
}

function goToNext_scifi() {
  // Adding '//' treats the link as an external site, even without "https:"
  // location.href = '//' + DATA_scifi[nextSiteIndex_scifi].url
  window.open('//' + DATA_scifi[nextSiteIndex_scifi].url)
}

let template_scifi = document.createElement("template");
template_scifi.innerHTML = `
  <div class="webring_scifi">
    <h3>The Smallweb Subway</h3>
    <div>
      <button id="tri-left_scifi" onclick="goToPrev_scifi()"></button>
      <div id="line">
        <div id="outer-circle">
          <div id="inner-circle"></div>
        </div>
      </div>
      <button id="tri-right_scifi" onclick="goToNext_scifi()"></button>
    </div>
    <p>
      Scifi Line: Sites with original science fiction work.
    </p>
  </div>

  <style>
    .webring_scifi {
      width: 100%;
      height: auto;
    }
    .webring_scifi > div {
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
    #tri-left_scifi {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid #A1A3A1;
      border-bottom: 20px solid transparent;
      outline: none;
      cursor: pointer;
    }
    #tri-left_scifi:hover {
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid black;
      border-bottom: 20px solid transparent;
    }
    #tri-right_scifi {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: 40px solid #A1A3A1;
      border-right: none;
      border-bottom: 20px solid transparent;
      cursor: pointer;
    }
    #tri-right_scifi:hover {
      border-top: 20px solid transparent;
      border-left: 40px solid black;
      border-right: none;
      border-bottom: 20px solid transparent;
    }
    #line {
      width: 120px;
      height: 20px;
      background: #A1A3A1;
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

class Webring_scifi extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_scifi.content.cloneNode(true));
  }
  connectedCallback() {
    console.log('-----------')
    console.log('scifi line')
    console.log('-----------')
    console.log('Webring JSON data:')
    console.log(JSON.stringify(DATA_scifi))
    thisURL_scifi = new URL(window.location.href);
    thisSite_scifi = "www.yukiclarke.com/home/"
    console.log("This site:")
    console.log(thisSite_scifi)
    matchedSiteIndex_scifi = (
      DATA_scifi.map(x => x.url).indexOf(thisSite_scifi))
    matchedSite_scifi = (
      DATA_scifi[matchedSiteIndex_scifi]);
    console.log("Matched site:")
    console.log(matchedSite_scifi.url)
    prevSiteIndex_scifi = matchedSiteIndex_scifi - 1;
    if (prevSiteIndex_scifi === -1) {
      prevSiteIndex_scifi = DATA_scifi.length - 1};
    console.log("Previous site:")
    console.log(DATA_scifi[prevSiteIndex_scifi].url)
    nextSiteIndex_scifi = matchedSiteIndex_scifi + 1;
    if (nextSiteIndex_scifi === DATA_scifi.length) {
      nextSiteIndex_scifi = 0};
    console.log("Next site:")
    console.log(DATA_scifi[nextSiteIndex_scifi].url)
  }
}

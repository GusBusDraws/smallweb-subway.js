let thisURL_creativesclub;
let thisSite_creativesclub;
let matchedSiteIndex_creativesclub;
let matchedSite_creativesclub;
let prevSiteIndex_creativesclub;
let nextSiteIndex_creativesclub;
// const WEBRING_DATA_URL_creativesclub = `https://gusbus.space/smallweb-subway.js/creativesclub.json`;
const WEBRING_DATA_URL_creativesclub = `https://gusbus.space/smallweb-subway.js/data.json`;
// let DATA_creativesclub;
let DATA_creativesclub = [
      {
        "name" : "Test",
        "url" : "127.0.0.1/",
        "owner" : "Gus Becker"
      },
      {
        "name" : "Creatives Club",
        "url" : "creativesclub.art",
        "owner" : "Gus Becker"
      },
      {
        "name" : "Smallweb Subway",
        "url" : "gusbus.space/smallweb-subway/",
        "owner" : "Gus Becker"
      },
      {
        "name" : "urlocalcyb.org",
        "url" : "urlocalcyb.org",
        "owner" : "cyborgforty"
      },
      {
        "name" : "haystack blog and oddities",
        "url" : "thatoddhaystack.neocities.org",
        "owner" : "vita"
      }
    ]
loadWebringJSON_creativesclub(WEBRING_DATA_URL_creativesclub);

function loadWebringJSON_creativesclub(url) {
  fetch(url)
    .then(response => response.json())
    .then((json) => {webringDataReady_creativesclub(json)});
}

function webringDataReady_creativesclub(json) {
  // DATA_creativesclub = json;
  customElements.get('smallweb-subway-creativesclub') || (
    customElements.define('smallweb-subway-creativesclub', Webring_creativesclub));
}

function getHostName_creativesclub(url) {
  // this is a bit of a cheat that leverages the URL type to get the hostname automagically
  return new URL(url).hostname;
}

function goToPrev_creativesclub() {
  // Adding '//' treats the link as an external site, even without "https:"
  location.href = '//' + DATA_creativesclub[prevSiteIndex_creativesclub].url
}

function goToNext_creativesclub() {
  // Adding '//' treats the link as an external site, even without "https:"
  location.href = '//' + DATA_creativesclub[nextSiteIndex_creativesclub].url
}

let template_creativesclub = document.createElement("template");
template_creativesclub.innerHTML = `
  <div class="webring_creativesclub">
    <h3>The Smallweb Subway</h3>
    <div>
      <button id="tri-left_creativesclub" onclick="goToPrev_creativesclub()"></button>
      <div id="line">
        <div id="outer-circle">
          <div id="inner-circle"></div>
        </div>
      </div>
      <button id="tri-right_creativesclub" onclick="goToNext_creativesclub()"></button>
    </div>
    <p>
      Creatives Club line: Websites of Creatives Club members.
    </p>
  </div>

  <style>
    .webring_creativesclub {
      width: 100%;
      height: auto;
      outline: 1px solid;
      background: white;
    }
    .webring_creativesclub > div {
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
    #tri-left_creativesclub {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid #fad447;
      border-bottom: 20px solid transparent;
      outline: none;
      cursor: pointer;
    }
    #tri-left_creativesclub:hover {
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid black;
      border-bottom: 20px solid transparent;
    }
    #tri-right_creativesclub {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: 40px solid #fad447;
      border-right: none;
      border-bottom: 20px solid transparent;
      cursor: pointer;
    }
    #tri-right_creativesclub:hover {
      border-top: 20px solid transparent;
      border-left: 40px solid black;
      border-right: none;
      border-bottom: 20px solid transparent;
    }
    #line {
      width: 120px;
      height: 20px;
      background: #fad447;
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

class Webring_creativesclub extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_creativesclub.content.cloneNode(true));
  }
  connectedCallback() {
    console.log('------------------')
    console.log('creativesclub line')
    console.log('------------------')
    console.log('Webring JSON data:')
    console.log(JSON.stringify(DATA_creativesclub))
    thisURL_creativesclub = new URL(window.location.href);
    thisSite_creativesclub = (
      thisURL_creativesclub.hostname + thisURL_creativesclub.pathname)
    console.log("This site:")
    console.log(thisSite_creativesclub)
    matchedSiteIndex_creativesclub = (
      DATA_creativesclub.map(x => x.url).indexOf(thisSite_creativesclub))
    matchedSite_creativesclub = (
      DATA_creativesclub[matchedSiteIndex_creativesclub]);
    console.log("Matched site:")
    console.log(matchedSite_creativesclub.url)
    prevSiteIndex_creativesclub = matchedSiteIndex_creativesclub - 1;
    if (prevSiteIndex_creativesclub === -1) {
      prevSiteIndex_creativesclub = DATA_creativesclub.length - 1};
    console.log("Previous site:")
    console.log(DATA_creativesclub[prevSiteIndex_creativesclub].url)
    nextSiteIndex_creativesclub = matchedSiteIndex_creativesclub + 1;
    if (nextSiteIndex_creativesclub === DATA_creativesclub.length) {
      nextSiteIndex_creativesclub = 0};
    console.log("Next site:")
    console.log(DATA_creativesclub[nextSiteIndex_creativesclub].url)
  }
}

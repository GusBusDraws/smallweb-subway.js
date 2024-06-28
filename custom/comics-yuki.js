let thisURL_comics;
let thisSite_comics;
let matchedSiteIndex_comics;
let matchedSite_comics;
let prevSiteIndex_comics;
let nextSiteIndex_comics;
const WEBRING_DATA_URL_comics = `https://gusbus.space/smallweb-subway.js/comics.json`;
let DATA_comics;
loadWebringJSON_comics(WEBRING_DATA_URL_comics);

function loadWebringJSON_comics(url) {
  fetch(url)
    .then(response => response.json())
    .then((json) => {webringDataReady_comics(json)});
}

function webringDataReady_comics(json) {
  DATA_comics = json;
  customElements.get('smallweb-subway-comics') || (
    customElements.define('smallweb-subway-comics', Webring_comics));
}

function getHostName_comics(url) {
  // this is a bit of a cheat that leverages the URL type to get the hostname automagically
  return new URL(url).hostname;
}

function goToPrev_comics() {
  // Adding '//' treats the link as an external site, even without "https:"
  // location.href = '//' + DATA_comics[prevSiteIndex_comics].url
  window.open('//' + DATA_comics[prevSiteIndex_comics].url)
}

function goToNext_comics() {
  // Adding '//' treats the link as an external site, even without "https:"
  // location.href = '//' + DATA_comics[nextSiteIndex_comics].url
  // window.open('//' + DATA_comics[nextSiteIndex_comics].url, "_self")
  window.open('//' + DATA_comics[nextSiteIndex_comics].url)
}

let template_comics = document.createElement("template");
template_comics.innerHTML = `
  <div class="webring_comics">
    <h3>The Smallweb Subway</h3>
    <div>
      <button id="tri-left_comics" onclick="goToPrev_comics()"></button>
      <div id="line">
        <div id="outer-circle">
          <div id="inner-circle"></div>
        </div>
      </div>
      <button id="tri-right_comics" onclick="goToNext_comics()"></button>
    </div>
    <p>
      Comics Line: Sites with original comics.
    </p>
  </div>

  <style>
    .webring_comics {
      width: 100%;
      height: auto;
    }
    .webring_comics > div {
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
    #tri-left_comics {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid #f7941d;
      border-bottom: 20px solid transparent;
      outline: none;
      cursor: pointer;
    }
    #tri-left_comics:hover {
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid black;
      border-bottom: 20px solid transparent;
    }
    #tri-right_comics {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: 40px solid #f7941d;
      border-right: none;
      border-bottom: 20px solid transparent;
      cursor: pointer;
    }
    #tri-right_comics:hover {
      border-top: 20px solid transparent;
      border-left: 40px solid black;
      border-right: none;
      border-bottom: 20px solid transparent;
    }
    #line {
      width: 120px;
      height: 20px;
      background: #f7941d;
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

class Webring_comics extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_comics.content.cloneNode(true));
  }
  connectedCallback() {
    console.log('----------')
    console.log('comics line')
    console.log('----------')
    console.log('Webring JSON data:')
    console.log(JSON.stringify(DATA_comics))
    thisURL_comics = new URL(window.location.href);
    thisSite_comics = "www.yukiclarke.com/home/"
    console.log("This site:")
    console.log(thisSite_comics)
    matchedSiteIndex_comics = (
      DATA_comics.map(x => x.url).indexOf(thisSite_comics))
    matchedSite_comics = (
      DATA_comics[matchedSiteIndex_comics]);
    console.log("Matched site:")
    console.log(matchedSite_comics.url)
    prevSiteIndex_comics = matchedSiteIndex_comics - 1;
    if (prevSiteIndex_comics === -1) {
      prevSiteIndex_comics = DATA_comics.length - 1};
    console.log("Previous site:")
    console.log(DATA_comics[prevSiteIndex_comics].url)
    nextSiteIndex_comics = matchedSiteIndex_comics + 1;
    if (nextSiteIndex_comics === DATA_comics.length) {
      nextSiteIndex_comics = 0};
    console.log("Next site:")
    console.log(DATA_comics[nextSiteIndex_comics].url)
  }
}

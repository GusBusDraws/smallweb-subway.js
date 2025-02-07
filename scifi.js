let DATA_scifi = [
  {
    "title" : "Smallweb Subway",
    "url"   : "gusbus.space/smallweb-subway/",
    "owner" : "Gus Becker"
  },
  {
    "title" : "Clockwork's Archive of Tomorrow",
    "url"   : "clockwooork.github.io/future-stop.html",
    "owner" : "Clockwork"
  },
  {
    "title" : "Gus's Scifi Gallery",
    "url"   : "gusbus.space/scifi/",
    "owner" : "Gus Becker"
  },
  {
    "title" : "Varve's writing bits & pieces",
    "url"   : "www.write-on.org/writing/",
    "owner" : "Varve"
  },
  {
    "title" : "Stories",
    "url"   : "dionra.com/stories.php",
    "owner" : "Dion Ra"
  },
  {
    "title" : "yukiclarke.com",
    "url"   : "www.yukiclarke.com/home/",
    "owner" : "Yuki Clarke"
  },
  {
    "title" : "Friction Comic",
    "url"   : "frictioncomic.com/home",
    "owner" : "Jack"
  }
]


let thisURL_scifi;
let thisSite_scifi;
let matchedSiteIndex_scifi;
let matchedSite_scifi;
let prevSiteIndex_scifi;
let nextSiteIndex_scifi;

class Webring_scifi extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_scifi.content.cloneNode(true));
    console.log('-----------')
    console.log('scifi line')
    console.log('-----------')
    // console.log('Webring JSON data:')
    // console.log(DATA_scifi)
    if (typeof forceNewTab_scifi !== 'undefined' && forceNewTab_scifi) {
      console.log('forceNewTab_scifi: ', forceNewTab_scifi)
    }
    if (typeof forceURL_scifi !== 'undefined') {
      console.log('forceURL_scifi: ', forceURL_scifi)
      thisSite_scifi = forceURL_scifi
    } else {
      thisURL_scifi = new URL(window.location.href);
      thisSite_scifi = (
        thisURL_scifi.hostname + thisURL_scifi.pathname)
    }
    console.log("This site: "+thisSite_scifi)
    matchedSiteIndex_scifi = (
      DATA_scifi.map(x => x.url).indexOf(thisSite_scifi))
    matchedSite_scifi = (
      DATA_scifi[matchedSiteIndex_scifi]);
    if (matchedSite_scifi != null) {
      console.log("Matched site: "+matchedSite_scifi)
      prevSiteIndex_scifi = matchedSiteIndex_scifi - 1;
      if (prevSiteIndex_scifi === -1) {
        prevSiteIndex_scifi = DATA_scifi.length - 1
      };
      console.log("Previous site: "+DATA_scifi[prevSiteIndex_scifi].url)
      nextSiteIndex_scifi = matchedSiteIndex_scifi + 1;
      if (nextSiteIndex_scifi === DATA_scifi.length) {
        nextSiteIndex_scifi = 0
      };
      console.log("Next site: "+DATA_scifi[nextSiteIndex_scifi].url)
    } else {
      console.log("Matched site: Not found.")
    }
  }
}

let template_scifi = document.createElement("template");
customElements.define('smallweb-subway-scifi', Webring_scifi);
insertWidget_scifi();

function getHostName_scifi(url) {
  // this is a bit of a cheat that leverages the URL type to get the hostname automagically
  return new URL(url).hostname;
}

function goToPrev_scifi() {
  // The leading '//' treats the link as an external site, even without "https:"
  if (typeof forceNewTab_scifi !== 'undefined' && forceNewTab_scifi) {
    window.open('//' + DATA_scifi[prevSiteIndex_scifi].url)
  } else {
    location.href = '//' + DATA_scifi[prevSiteIndex_scifi].url
  }
}

function goToNext_scifi() {
  // The leading '//' treats the link as an external site, even without "https:"
  if (typeof forceNewTab_scifi !== 'undefined' && forceNewTab_scifi) {
    window.open('//' + DATA_scifi[nextSiteIndex_scifi].url)
  } else {
    location.href = '//' + DATA_scifi[nextSiteIndex_scifi].url
  }
}

function insertWidget_scifi() {
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
}

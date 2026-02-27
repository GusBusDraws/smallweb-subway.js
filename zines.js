let DATA_zines = [
  {
    "title" : "Smallweb Subway",
    "url"   : "gusbus.space/smallweb-subway/",
    "owner" : "Gus Becker"
  },
  {
    "title" : "Ether",
    "url"   : "ethersent.neocities.org/",
    "owner" : "Emil Aisling"
  },
  {
    "title" : "Sheryl's Momzines",
    "url"   : "sherylvernon.neocities.org/",
    "owner" : "Sheryl Vernon"
  },
  {
    "title" : "Mythical Type Zines",
    "url"   : "mythicaltype.com/zines/",
    "owner" : "Mythical Type"
  },
  {
    "title" : "Lunaseeker Press",
    "url"   : "lunaseeker.com/",
    "owner" : "Zachary Kai"
  },
  {
    "title" : "MyDogStoleThisWebsite",
    "url"   : "metrogoldia.neocities.org/",
    "owner" : "MyDogStoleMyLiver (Devin Spector)"
  },
  {
    "title" : "Toa of Cloudbursting",
    "url" : "toa.nekoweb.org/",
    "owner": "Toa"
  },
  {
    "title" : "zines",
    "url"   : "bumblechub.com/zines/",
    "owner" : "bumblechub"
  }
]


let thisURL_zines;
let thisSite_zines;
let matchedSiteIndex_zines;
let matchedSite_zines;
let prevSiteIndex_zines;
let nextSiteIndex_zines;

// Set site data regardless of widget creation;
document.addEventListener('DOMContentLoaded', function() {
  setData_zines();
}, false);

class Webring_zines extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_zines.content.cloneNode(true));
  }
}

function setData_zines() {
  console.log('----------')
  console.log('zines line')
  console.log('----------')
  if (typeof forceNewTab_zines !== 'undefined' && forceNewTab_zines) {
    console.log('forceNewTab_zines: ', forceNewTab_zines)
  }
  if (typeof forceURL_zines !== 'undefined') {
    console.log('forceURL_zines: ', forceURL_zines)
    thisSite_zines = forceURL_zines
  } else {
    thisURL_zines = new URL(window.location.href);
    thisSite_zines = (
      thisURL_zines.hostname + thisURL_zines.pathname)
  }
  console.log("This site: "+thisSite_zines)
  matchedSiteIndex_zines = (
    DATA_zines.map(x => x.url).indexOf(thisSite_zines))
  matchedSite_zines = (
    DATA_zines[matchedSiteIndex_zines]);
  if (matchedSite_zines != null) {
    console.log("Site successfully matched!")
    prevSiteIndex_zines = matchedSiteIndex_zines - 1;
    if (prevSiteIndex_zines === -1) {
      prevSiteIndex_zines = DATA_zines.length - 1
    };
    console.log("Previous site: "+DATA_zines[prevSiteIndex_zines].url)
    nextSiteIndex_zines = matchedSiteIndex_zines + 1;
    if (nextSiteIndex_zines === DATA_zines.length) {
      nextSiteIndex_zines = 0
    };
    console.log("Next site: "+DATA_zines[nextSiteIndex_zines].url)
  } else {
    console.log("Matched site: Not found.")
  }
}

let template_zines = document.createElement("template");
customElements.define('smallweb-subway-zines', Webring_zines);
insertWidget_zines();

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

function insertWidget_zines() {
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
}

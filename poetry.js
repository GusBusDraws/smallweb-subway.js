let DATA_poetry = [
  {
    "title" : "Smallweb Subway",
    "url"   : "gusbus.space/smallweb-subway/",
    "owner" : "Gus Becker"
  },
  {
    "title" : "Poems",
    "url"   : "ololufe-collective.ghost.io/tag/poems/",
    "owner" : "Olólùfè Collective"
  },
  {
    "title" : "poems",
    "url"   : "dead.garden/poetry/",
    "owner" : "jo"
  },
  {
    "title" : "poetry!",
    "url"   : "columbidaecorner.neocities.org/poetry",
    "owner" : "columbidaecorner"
  },
  {
    "title" : "flower in binary",
    "url"   : "flowerinbinary.neocities.org/poetry",
    "owner" : "tim flower"
  },
  {
    "title" : "delovely's poetry",
    "url"   : "delovely.neocities.org/poetry/",
    "owner" : "delovely"
  },
  {
    "title" : "manyface world",
    "url"   : "manyface.neocities.org/",
    "owner" : "Manyface"
  },
  {
    "title" : "Doug's Poetry Shack",
    "url"   : "dsserv.net/poetry/",
    "owner" : "Doug's Shack"
  }
]


let thisURL_poetry;
let thisSite_poetry;
let matchedSiteIndex_poetry;
let matchedSite_poetry;
let prevSiteIndex_poetry;
let nextSiteIndex_poetry;

class Webring_poetry extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_poetry.content.cloneNode(true));
    console.log('-----------')
    console.log('poetry line')
    console.log('-----------')
    // console.log('Webring JSON data:')
    // console.log(DATA_poetry);
    if (typeof forceNewTab_poetry !== 'undefined' && forceNewTab_poetry) {
      console.log('forceNewTab_poetry: ', forceNewTab_poetry)
    }
    if (typeof forceURL_poetry !== 'undefined') {
      console.log('forceURL_poetry: ', forceURL_poetry)
      thisSite_poetry = forceURL_poetry
    } else {
      thisURL_poetry = new URL(window.location.href);
      thisSite_poetry = (
        thisURL_poetry.hostname + thisURL_poetry.pathname
      )
    }
    console.log("This site: "+thisSite_poetry)
    matchedSiteIndex_poetry = (
      DATA_poetry.map(x => x.url).indexOf(thisSite_poetry))
    matchedSite_poetry = (
      DATA_poetry[matchedSiteIndex_poetry]);
    if (matchedSite_poetry != null) {
      console.log("Matched site: "+matchedSite_poetry.url)
      prevSiteIndex_poetry = matchedSiteIndex_poetry - 1;
      if (prevSiteIndex_poetry === -1) {
        prevSiteIndex_poetry = DATA_poetry.length - 1
      };
      console.log("Previous site: "+DATA_poetry[prevSiteIndex_poetry].url)
      nextSiteIndex_poetry = matchedSiteIndex_poetry + 1;
      if (nextSiteIndex_poetry === DATA_poetry.length) {
        nextSiteIndex_poetry = 0
      };
      console.log("Next site: "+DATA_poetry[nextSiteIndex_poetry].url)
    } else {
      console.log("Matched site: Not found.")
    }
  }
}

let template_poetry = document.createElement("template");
customElements.define('smallweb-subway-poetry', Webring_poetry);
insertWidget_poetry();

function getHostName_poetry(url) {
  // this is a bit of a cheat that leverages the URL type to get the hostname automagically
  return new URL(url).hostname;
}

function goToPrev_poetry() {
  // Adding '//' treats the link as an external site, even without "https:"
  if (typeof forceNewTab_poetry !== 'undefined' && forceNewTab_poetry) {
    window.open('//' + DATA_poetry[prevSiteIndex_poetry].url)
  } else {
    location.href = '//' + DATA_poetry[prevSiteIndex_poetry].url
  }
}

function goToNext_poetry() {
  // Adding '//' treats the link as an external site, even without "https:"
  if (typeof forceNewTab_poetry !== 'undefined' && forceNewTab_poetry) {
    window.open('//' + DATA_poetry[nextSiteIndex_poetry].url)
  } else {
    location.href = '//' + DATA_poetry[nextSiteIndex_poetry].url
  }
}

function insertWidget_poetry() {
  template_poetry.innerHTML = `
    <div class="webring_poetry">
      <h3>The Smallweb Subway</h3>
      <div>
        <button id="tri-left_poetry" onclick="goToPrev_poetry()"></button>
        <div id="line">
          <div id="outer-circle">
            <div id="inner-circle"></div>
          </div>
        </div>
        <button id="tri-right_poetry" onclick="goToNext_poetry()"></button>
      </div>
      <p>
        Poetry Line: Sites showcasing original poetry.
      </p>
    </div>

    <style>
      .webring_poetry {
        width: 100%;
        height: auto;
      }
      .webring_poetry > div {
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
      #tri-left_poetry {
        width: 0;
        height: 0;
        background: none;
        border-top: 20px solid transparent;
        border-left: none;
        border-right: 40px solid #e51937;
        border-bottom: 20px solid transparent;
        outline: none;
        cursor: pointer;
      }
      #tri-left_poetry:hover {
        border-top: 20px solid transparent;
        border-left: none;
        border-right: 40px solid black;
        border-bottom: 20px solid transparent;
      }
      #tri-right_poetry {
        width: 0;
        height: 0;
        background: none;
        border-top: 20px solid transparent;
        border-left: 40px solid #e51937;
        border-right: none;
        border-bottom: 20px solid transparent;
        cursor: pointer;
      }
      #tri-right_poetry:hover {
        border-top: 20px solid transparent;
        border-left: 40px solid black;
        border-right: none;
        border-bottom: 20px solid transparent;
      }
      #line {
        width: 120px;
        height: 20px;
        background: #e51937;
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


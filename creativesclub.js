let DATA_creativesclub = [
  {
    "title" : "Smallweb Subway",
    "url"   : "gusbus.space/smallweb-subway/",
    "owner" : "Gus Becker"
  },
  {
    "title" : "DoodleBot",
    "url"   : "gusbus.space/doodlebot/",
    "owner" : "Gus Becker"
  },
  {
    "title" : "Creatives Club",
    "url"   : "creativesclub.art/",
    "owner" : "Gus Becker"
  },
  {
    "title" : "yukiclarke.com",
    "url"   : "www.yukiclarke.com/home/",
    "owner" : "Yuki Clarke"
  },
  {
    "title" : "haystack blog and oddities",
    "url"   : "thatoddhaystack.neocities.org/",
    "owner" : "vita"
  },
  {
    "title" : "UR LOCAL CYBORG",
    "url"   : "seenby.urlocalcyb.org/",
    "owner" : "Caroline"
  },
  // {
  //   "title" : "marcinek.tech",
  //   "url"   : "marcinek.tech/",
  //   "owner" : "Kristen"
  // },
  // {
  //   "title" : "community - Justbestvisuals",
  //   "url"   : "justbestvisuals.com/community/",
  //   "owner" : "Justin"
  // },
  // {
  //   "title" : "michi.foo",
  //   "url"   : "michi.foo/0",
  //   "owner" : "Sara"
  // }
  {
    "title" : "Art",
    "url"   : "www.stephaniediederich.com/",
    "owner" : "Stephanie Diederich"
  }
]


let thisURL_creativesclub;
let thisSite_creativesclub;
let matchedSiteIndex_creativesclub;
let matchedSite_creativesclub;
let prevSiteIndex_creativesclub;
let nextSiteIndex_creativesclub;

// Set site data regardless of widget creation;
document.addEventListener('DOMContentLoaded', function() {
  setData_creativesclub();
}, false);

class Webring_creativesclub extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_creativesclub.content.cloneNode(true));
  }
}

let template_creativesclub = document.createElement("template");
customElements.define('smallweb-subway-creativesclub', Webring_creativesclub);
insertWidget_creativesclub();

function setData_creativesclub() {
  console.log('------------------')
  console.log('creativesclub line')
  console.log('------------------')
  if (typeof forceURL_creativesclub !== 'undefined') {
    console.log('forceURL_creativesclub: ', forceURL_creativesclub)
    thisSite_creativesclub = forceURL_creativesclub
  } else {
    thisURL_creativesclub = new URL(window.location.href);
    thisSite_creativesclub = (
      thisURL_creativesclub.hostname + thisURL_creativesclub.pathname)
  }
  console.log("This site: "+thisSite_creativesclub)
  matchedSiteIndex_creativesclub = (
    DATA_creativesclub.map(x => x.url).indexOf(thisSite_creativesclub))
  matchedSite_creativesclub = (
    DATA_creativesclub[matchedSiteIndex_creativesclub]);
  if (matchedSite_creativesclub != null) {
    console.log("Site successfully matched!")
    prevSiteIndex_creativesclub = matchedSiteIndex_creativesclub - 1;
    if (prevSiteIndex_creativesclub === -1) {
      prevSiteIndex_creativesclub = DATA_creativesclub.length - 1
    };
    console.log(
      "Previous site: "+DATA_creativesclub[prevSiteIndex_creativesclub].url)
    nextSiteIndex_creativesclub = matchedSiteIndex_creativesclub + 1;
    if (nextSiteIndex_creativesclub === DATA_creativesclub.length) {
      nextSiteIndex_creativesclub = 0
    };
    console.log("Next site: "+DATA_creativesclub[nextSiteIndex_creativesclub].url)
  } else {
    console.log("Matched site: Not found.")
  }
}

function getHostName_creativesclub(url) {
  // this is a bit of a cheat that leverages the URL type to get the hostname automagically
  return new URL(url).hostname;
}

function goToPrev_creativesclub() {
  // The leading '//' treats the link as an external site, even without "https:"
  if (typeof forceNewTab_creativesclub !== 'undefined' && forceNewTab_creativesclub) {
    window.open('//' + DATA_creativesclub[prevSiteIndex_creativesclub].url)
  } else {
    window.top.location.href = '//' + DATA_creativesclub[prevSiteIndex_creativesclub].url
  }
}

function goToNext_creativesclub() {
  // The leading '//' treats the link as an external site, even without "https:"
  if (typeof forceNewTab_creativesclub !== 'undefined' && forceNewTab_creativesclub) {
    window.open('//' + DATA_creativesclub[nextSiteIndex_creativesclub].url)
  } else {
    window.top.location.href = '//' + DATA_creativesclub[nextSiteIndex_creativesclub].url
  }
}

function insertWidget_creativesclub() {
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
        Creatives Club Line: Sites of Creatives Club members.
      </p>
    </div>

    <style>
      .webring_creativesclub {
        width: 100%;
        height: auto;
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
}

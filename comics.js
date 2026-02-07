let DATA_comics = [
  {
    "title" : "Smallweb Subway",
    "url"   : "gusbus.space/smallweb-subway/",
    "owner" : "Gus Becker"
  },
  {
    "title" : "The Fuzzy Slug's Webcomic Hub",
    "url"   : "thefuzzyslug.neocities.org/",
    "owner" : "thefuzzyslug"
  },
  {
    "title" : "slime pond comics",
    "url"   : "abslimeware.neocities.org/comic/",
    "owner" : "candycanearter07"
  },
  {
    "title" : "Trailerparkia",
    "url"   : "trailerparkia.net/",
    "owner" : "Em"
  },
  {
    "title" : "The Iron Ragdoll",
    "url"   : "tofutush.github.io/The-Iron-Ragdoll/misc/links/",
    "owner" : "Tofutush"
  },
  {
    "title" : "Redux",
    "url"   : "thel3tterm.com/redux/about",
    "owner" : "TheL3tterM"
  },
  {
    "title" : "My Comics",
    "url"   : "columbidaecorner.neocities.org/comics",
    "owner" : "Pigeon"
  },
  {
    "title" : "Long Gone Legend",
    "url"   : "tertiaryapocalypse.neocities.org/lgl/",
    "owner" : "hal"
  },
  {
    "title" : "Bruno and Friends",
    "url"   : "brunoandfriends.nekoweb.org/",
    "owner" : "Yoylecake420"
  },
  {
    "title" : "White Noise",
    "url"   : "www.white-noise-comic.com/",
    "owner" : "Adrien Lee (thephooka)"
  },
  {
    "title" : "Neat Hobby!",
    "url"   : "neathobby.com/",
    "owner" : "Scott Andrew"
  },
  {
    "title" : "Keeping Time",
    "url"   : "www.keepingtimecomic.com/links/",
    "owner" : "Kody Okamoto"
  },
  {
    "title" : "BrittHub",
    "url"   : "britthub.co.uk/",
    "owner" : "Britt Coxon"
  },
  {
    "title" : "Links",
    "url"   : "diabloafterdark.nekoweb.org/links.html",
    "owner" : "DiabloAfterDark"
  },
  {
    "title" : "Ultraviolents",
    "url"   : "uv.itsnero.com/about/",
    "owner" : "Nero Villagallos O'Reilly"
  },
  {
    "title" : "Beyond the End",
    "url"   : "beyondtheend.gay/",
    "owner" : "Dusk Pendragon (DuskDragonXIII)"
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


let thisURL_comics;
let thisSite_comics;
let matchedSiteIndex_comics;
let matchedSite_comics;
let prevSiteIndex_comics;
let nextSiteIndex_comics;

// Set site data regardless of widget creation;
document.addEventListener('DOMContentLoaded', function() {
  setData_comics();
}, false);

class Webring_comics extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_comics.content.cloneNode(true));
  }
}

let template_comics = document.createElement("template");
customElements.define('smallweb-subway-comics', Webring_comics);
insertWidget_comics();

function setData_comics() {
  console.log('-----------')
  console.log('comics line')
  console.log('-----------')
  if (typeof forceNewTab_comics !== 'undefined' && forceNewTab_comics) {
    console.log('forceNewTab_comics: ', forceNewTab_comics)
  }
  if (typeof forceURL_comics !== 'undefined') {
    console.log('forceURL_comics: ', forceURL_comics)
    thisSite_comics = forceURL_comics
  } else {
    thisURL_comics = new URL(window.location.href);
    thisSite_comics = (
      thisURL_comics.hostname + thisURL_comics.pathname
    )
  }
  console.log("This site: "+thisSite_comics)
  matchedSiteIndex_comics = (
    DATA_comics.map(x => x.url).indexOf(thisSite_comics))
    matchedSite_comics = DATA_comics[matchedSiteIndex_comics];
  if (matchedSite_comics != null) {
    console.log("Site successfully matched!")
    prevSiteIndex_comics = matchedSiteIndex_comics - 1;
    if (prevSiteIndex_comics === -1) {
      prevSiteIndex_comics = DATA_comics.length - 1
    };
    console.log("Previous site: "+DATA_comics[prevSiteIndex_comics].url)
    nextSiteIndex_comics = matchedSiteIndex_comics + 1;
    if (nextSiteIndex_comics === DATA_comics.length) {
      nextSiteIndex_comics = 0
    };
    console.log("Next site: "+DATA_comics[nextSiteIndex_comics].url)
  } else {
    console.log("Matched site: Not found.")
  }
}

function getHostName_comics(url) {
  // this is a bit of a cheat that leverages the URL type to get the hostname automagically
  return new URL(url).hostname;
}

function goToPrev_comics() {
  if (typeof forceNewTab_comics !== 'undefined' && forceNewTab_comics) {
    window.open('//' + DATA_comics[prevSiteIndex_comics].url)
  } else {
    // Adding '//' treats the link as an external site, even without "https:"
    location.href = '//' + DATA_comics[prevSiteIndex_comics].url
  }
}

function goToNext_comics() {
  if (typeof forceNewTab_comics !== 'undefined' && forceNewTab_comics) {
    window.open('//' + DATA_comics[nextSiteIndex_comics].url)
  } else {
    // Adding '//' treats the link as an external site, even without "https:"
    location.href = '//' + DATA_comics[nextSiteIndex_comics].url
  }
}

function insertWidget_comics() {
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
}


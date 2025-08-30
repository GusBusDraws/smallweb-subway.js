class Webring_central extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template_central.content.cloneNode(true));
  }
}

let template_central = document.createElement("template");
customElements.define('smallweb-subway-central', Webring_central);
insertWidget_central();

function insertWidget_central() {
  template_central.innerHTML = `
    <div class="webring_central">
      <div class="lines">
        <div>
          <button id="tri-left_scifi" onclick="goToPrev_scifi()"></button>
          <div id="line_scifi">
          </div>
          <button id="tri-right_scifi" onclick="goToNext_scifi()"></button>
        </div>
        <div>
          <button id="tri-left_zines" onclick="goToPrev_zines()"></button>
          <div id="line_zines">
          </div>
          <button id="tri-right_zines" onclick="goToNext_zines()"></button>
        </div>
        <div>
          <button id="tri-left_doodlecrew" onclick="goToPre_doodlecrew()"></button>
          <div id="line_doodlecrew">
          </div>
          <button id="tri-right_doodlecrew" onclick="goToNext_doodlecrew()"></button>
        </div>
        <div>
          <button id="tri-left_creativesclub" onclick="goToPrev_creativesclub()"></button>
          <div id="line_creativesclub">
          </div>
          <button id="tri-right_creativesclub" onclick="goToNext_creativesclub()"></button>
        </div>
        <div>
          <button id="tri-left_comics" onclick="goToPrev_comics()"></button>
          <div id="line_comics">
          </div>
          <button id="tri-right_comics" onclick="goToNext_comics()"></button>
        </div>
        <div>
          <button id="tri-left_poetry" onclick="goToPrev_poetry()"></button>
          <div id="line_poetry">
          </div>
          <button id="tri-right_poetry" onclick="goToNext_poetry()"></button>
        </div>
      </div>
      <div class="station">
        <div id="outer-circle">
          <div id="inner-circle"></div>
        </div>
      </div>
    </div>

    <style>
      .webring_central {
        display: flex;
        width: 100%;
        height: auto;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .lines {
        position: absolute;
      }
      .lines > div {
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: center;
      }
      .station {
        z-index: 1;
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

      /*********/
      /* Scifi */
      /*********/
      #tri-left_scifi {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid #A1A3A1;
        border-bottom: 10px solid transparent;
        outline: none;
        cursor: pointer;
      }
      #tri-left_scifi:hover {
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid black;
        border-bottom: 10px solid transparent;
      }
      #tri-right_scifi {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: 20px solid #A1A3A1;
        border-right: none;
        border-bottom: 10px solid transparent;
        cursor: pointer;
      }
      #tri-right_scifi:hover {
        border-top: 10px solid transparent;
        border-left: 20px solid black;
        border-right: none;
        border-bottom: 10px solid transparent;
      }
      #line_scifi {
        width: 120px;
        height: 20px;
        background: #A1A3A1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /*********/
      /* Zines */
      /*********/
      #tri-left_zines {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid #0077c0;
        border-bottom: 10px solid transparent;
        outline: none;
        cursor: pointer;
      }
      #tri-left_zines:hover {
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid black;
        border-bottom: 10px solid transparent;
      }
      #tri-right_zines {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: 20px solid #0077c0;
        border-right: none;
        border-bottom: 10px solid transparent;
        cursor: pointer;
      }
      #tri-right_zines:hover {
        border-top: 10px solid transparent;
        border-left: 20px solid black;
        border-right: none;
        border-bottom: 10px solid transparent;
      }
      #line_zines {
        width: 120px;
        height: 20px;
        background: #0077c0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /***************/
      /* Doodle Crew */
      /***************/

      #tri-left_doodlecrew {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid #25b233;
        border-bottom: 10px solid transparent;
        outline: none;
        cursor: pointer;
      }
      #tri-left_doodlecrew:hover {
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid black;
        border-bottom: 10px solid transparent;
      }
      #tri-right_doodlecrew {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: 20px solid #25b233;
        border-right: none;
        border-bottom: 10px solid transparent;
        cursor: pointer;
      }
      #tri-right_doodlecrew:hover {
        border-top: 10px solid transparent;
        border-left: 20px solid black;
        border-right: none;
        border-bottom: 10px solid transparent;
      }
      #line_doodlecrew {
        width: 120px;
        height: 20px;
        background: #25b233;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /******************/
      /* Creatives Club */
      /******************/

      #tri-left_creativesclub {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid #25b233;
        border-bottom: 10px solid transparent;
        outline: none;
        cursor: pointer;
      }
      #tri-left_creativesclub:hover {
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid black;
        border-bottom: 10px solid transparent;
      }
      #tri-right_creativesclub {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: 20px solid #25b233;
        border-right: none;
        border-bottom: 10px solid transparent;
        cursor: pointer;
      }
      #tri-right_creativesclub:hover {
        border-top: 10px solid transparent;
        border-left: 20px solid black;
        border-right: none;
        border-bottom: 10px solid transparent;
      }
      #line_creativesclub {
        width: 120px;
        height: 20px;
        background: #25b233;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /**********/
      /* Comics */
      /**********/

      #tri-left_comics {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid #25b233;
        border-bottom: 10px solid transparent;
        outline: none;
        cursor: pointer;
      }
      #tri-left_comics:hover {
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid black;
        border-bottom: 10px solid transparent;
      }
      #tri-right_comics {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: 20px solid #25b233;
        border-right: none;
        border-bottom: 10px solid transparent;
        cursor: pointer;
      }
      #tri-right_comics:hover {
        border-top: 10px solid transparent;
        border-left: 20px solid black;
        border-right: none;
        border-bottom: 10px solid transparent;
      }
      #line_comics {
        width: 120px;
        height: 20px;
        background: #25b233;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /**********/
      /* Poetry */
      /**********/

      #tri-left_poetry {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid #25b233;
        border-bottom: 10px solid transparent;
        outline: none;
        cursor: pointer;
      }
      #tri-left_poetry:hover {
        border-top: 10px solid transparent;
        border-left: none;
        border-right: 20px solid black;
        border-bottom: 10px solid transparent;
      }
      #tri-right_poetry {
        width: 0;
        height: 0;
        background: none;
        border-top: 10px solid transparent;
        border-left: 20px solid #25b233;
        border-right: none;
        border-bottom: 10px solid transparent;
        cursor: pointer;
      }
      #tri-right_poetry:hover {
        border-top: 10px solid transparent;
        border-left: 20px solid black;
        border-right: none;
        border-bottom: 10px solid transparent;
      }
      #line_poetry {
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
}

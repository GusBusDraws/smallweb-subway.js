// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />
let lineWidth;
let lineColors = [
  '#a1a3a1', '#0077c0', '#25b233', '#fad447', '#f7941d', '#e51937'];
let lineNames = [
  'Scifi', 'Zines', 'Doodle Crew', 'Creatives Club', 'Comics', 'Poetry'];
let lineCodes = [
  'scifi', 'zines', 'doodle-crew', 'creatives-club', 'comics', 'poetry'];
let legendArr = [];
let legendWidth;
let legendHeight;
let stationDist;
let stations = [];
let dcWidth = 8;
let dcHeight = 7;
let dcPts = [
  [1, 0], [dcWidth - 2, 0], // Top
  [dcWidth - 1, 1], [dcWidth - 1, dcHeight - 3], // Right
  [dcWidth - 3, dcHeight - 1], [2, dcHeight - 1],  // Bottom
  [0, dcHeight - 3], [0, 1],  // Left
  [1, 0]
]
let dcOffset = [];
let dcScale;
let ccWidth = 6;
let ccHeight = 6;
let ccPts = [
  [1, 0], [ccWidth - 2, 0],
  [ccWidth - 1, 1], [ccWidth - 1, ccHeight - 2],
  [ccWidth - 2, ccHeight - 1], [1, ccHeight - 1],
  [1, ccHeight - 1], [0, ccHeight - 2],
  [0, 1], [1, 0]
]
let ccOffset = [];
let ccScale;
let comicsWidth = 15;
let comicsHeight = 7;
let comicsPts = [
  [1, 0], [comicsWidth - 2, 0],  // Top
  [comicsWidth - 1, 1], [comicsWidth - 1, 2],  // Right (outside)
  [comicsWidth - 2, comicsHeight - 4], [comicsWidth - 2, comicsHeight - 2.84],  // Right (inside)
  [comicsWidth - 3.84, comicsHeight - 1], [1, comicsHeight - 1],  // Bottom
  [0, comicsHeight - 2], [0, 1], // Left
  [1, 0]
]
let comicsOffset = [];
let comicsScale;
let poetryWidth = 10;
let poetryHeight = 4;
let poetryPts = [
  [1, 0], [poetryWidth-2, 0],
  [poetryWidth-1, 1], [poetryWidth-1, poetryHeight-2+0.15],
  [poetryWidth-2+0.15, poetryHeight-1], [1, poetryHeight-1],
  [1, poetryHeight-1], [0, poetryHeight-2],
  [0, 1], [1, 0]
]
let poetryOffset = [];
let poetryScale;
let zinesWidth = 7;
let zinesHeight = 4;
let zinesPts = [
  [1, 0], [zinesWidth - 2, 0],
  [zinesWidth - 1, 1], [zinesWidth - 1, zinesHeight - 2],
  [zinesWidth - 2, zinesHeight - 1], [1, zinesHeight - 1],
  [1, zinesHeight - 1], [0, zinesHeight - 2],
  [0, 1], [1, 0]
]
let zinesOffset = [];
let zinesScale;
let sfWidth = 8;
let sfHeight = 6;
let sfPts = [
  [1, 0], [sfWidth - 2, 0], // Top side
  [sfWidth - 1, 1], [sfWidth - 1, sfHeight - 3], // Right side
  [sfWidth - 3, sfHeight - 1], [1, sfHeight - 1], // Bottom side
  [0, sfHeight - 2], [0, 1], // Left side
  [1, 0]
]
let sfOffset = [];
let sfScale;
let DEBUG = false;
// let DEBUG = true;
let selection;

function setup() {
  // let canvas = createCanvas(600, 400);
  let canvasDiv = document.getElementById('map')
  // @ts-ignore: Object is possibly 'null'.
  let mapDivWidth = canvasDiv.offsetWidth;
	let canvas = createCanvas(mapDivWidth, mapDivWidth * 2/3);
  canvas.parent('map')
  // stationDist = height / 8;
  stationDist = height / 12;
  // Set the dcOffset based on the width & height of the canvas
  dcOffset = [2  * width/8 , 2*height/5];
  lineWidth = width * 0.015
  legendWidth = 10*lineWidth;
  legendHeight = 2*lineWidth;
  let nLines = lineColors.length;
  let spacing = width / (2*nLines + 1);
  for (let i = 0; i < nLines; i++) {
    legendArr.push(
      {
        'x' : (2*i+1.5)*spacing,
        'y' : height / 20,
        'name' : lineNames[i],
        'color' : lineColors[i],
        'code' : lineCodes[i]
      }
    )
  }
}

function draw() {
  background(225);
  // Green : Doodle Crew Line
  dcScale = [stationDist, stationDist];
  let [dcScaledX, dcScaledY] = drawLine(dcOffset, dcScale, dcPts, '#25b233');
  // Silver : Scifi Line
  sfOffset[0] = (
    max(dcScaledX)
    - 4 * (max(dcScaledX) - min(dcScaledX))/(dcWidth - 1)
    + lineWidth
  );
  sfOffset[1] = (
    min(dcScaledY)
    - 2 * (max(dcScaledY) - min(dcScaledY))/(dcHeight - 1)
  );
  sfScale = [stationDist, stationDist];
  let [sfScaledX, sfScaledY] = drawLine(sfOffset, sfScale, sfPts, '#A1A3A1');
  // Orange : Comics Line
  comicsOffset[0] = (
    max(dcScaledX)
    - 10 * (max(dcScaledX) - min(dcScaledX))/(dcWidth - 1)
    // - lineWidth
  )
  comicsOffset[1] = (
    min(dcScaledY)
    - 3 * (max(dcScaledY) - min(dcScaledY))/(dcHeight - 1)
    - lineWidth
  );
  comicsScale = [stationDist, stationDist];
  let [comicsScaledX, comicsScaledY] = drawLine(comicsOffset, comicsScale, comicsPts, '#f7941d');
  // Blue : Zines Line
  zinesOffset[0] = (
    max(dcScaledX)
    - 2 * (max(dcScaledX)-min(dcScaledX)) / (dcWidth-1)
    // - lineWidth
  );
  zinesOffset[1] = (
    min(dcScaledY)
    + 3 * (max(dcScaledY)-min(dcScaledY)) / (dcHeight-1)
    + lineWidth
  );
  zinesScale = [stationDist, stationDist];
  let [zinesScaledX, zinesScaledY] = drawLine(zinesOffset, zinesScale, zinesPts, '#0077c0');
  // Red : Poetry Line
  poetryOffset[0] = (
    max(dcScaledX)
    - 9 * (max(dcScaledX)-min(dcScaledX)) / (dcWidth-1)
    - lineWidth
  );
  poetryOffset[1] = (
    min(dcScaledY)
    + 2 * (max(dcScaledY)-min(dcScaledY)) / (dcHeight-1)
    - lineWidth
  );
  poetryScale = [stationDist, stationDist];
  let [poetryScaledX, poetryScaledY] = drawLine(poetryOffset, poetryScale, poetryPts, '#e51937');
  // Redraw green to put it over blue
  [dcScaledX, dcScaledY] = drawLine(dcOffset, dcScale, dcPts, '#25b233');
  // Yellow : Creatives Club Line
  ccOffset[0] = max(dcScaledX) + lineWidth;
  ccOffset[1] = (
    min(dcScaledY)
    // + 1 * (max(dcScaledY)-min(dcScaledY)) / (dcHeight-1)
  )
  ccScale = [stationDist, stationDist];
  let [ccScaledX, ccScaledY] = drawLine(ccOffset, ccScale, ccPts, '#fad447');
  // Stations
  stations = addStations()
  drawStations(stations);
  drawLegend();
  checkLegendSelect();
  checkStationSelect();
  if (selection != null) {
    drawSelection(selection);
  }
}

function getScaledPt(pt, offsets, scales, extraOffsets=[0, 0]) {
  let x = offsets[0] + pt[0] * scales[0] + extraOffsets[0];
  let y = offsets[1] + pt[1] * scales[1] + extraOffsets[1];
  return [x, y];
}

function drawLine(offsets, scales, linePts, lineColor) {
  let scaledX = [];
  let scaledY = [];
  for (let i = 0; i < linePts.length - 1; i++) {
    stroke(lineColor);
    strokeWeight(lineWidth);
    let x1 = offsets[0] + scales[0] * linePts[i][0];
    let y1 = offsets[1] + scales[1] * linePts[i][1];
    let x2 = offsets[0] + scales[0] * linePts[i + 1][0];
    let y2 = offsets[1] + scales[1] * linePts[i + 1][1];
    line(x1, y1, x2, y2);
    if (DEBUG) {
      noStroke()
      fill(0)
      text(linePts[i], x1, y1)
    }
    scaledX.push(x1);
    scaledY.push(y1);
  }
  return [scaledX, scaledY];
}

function drawStations(stations) {
  for (let station of stations) {
    if (station.title == "Smallweb Subway") {
      drawMainStation(station.pt[0], station.pt[1])
    } else {
      drawStation(station.pt[0], station.pt[1])
    }
  }
}

function drawStation(x, y) {
  noStroke();
  fill(0);
  circle(x, y, lineWidth * 2);
  fill(255);
  circle(x, y, lineWidth);
}

function drawMainStation(x, y) {
  noStroke();
  fill(0);
  circle(x, y, lineWidth * 4);
  fill(255);
  circle(x, y, lineWidth * 3);
  fill(0);
  circle(x, y, lineWidth * 2);
  fill(255);
  circle(x, y, lineWidth);
}

function drawLegend() {
  rectMode(CENTER);
  textSize(0.017 * width);
  textFont('Consolas');
  textAlign(CENTER, CENTER);
  noStroke();
  for (let legend of legendArr) {
    let itemX = legend.x;
    let itemY = legend.y;
    fill(legend.color);
    rect(itemX, itemY, legendWidth, legendHeight, 20);
    fill(0);
    text(legend.name, itemX, itemY)
  }
}

function checkStationSelect(mode = 'hover') {
  let selectRadius;
  if (mode == 'hover') {
    selectRadius = 2*lineWidth
  } else if (mode == 'touch') {
    selectRadius = 4*lineWidth
  } else {
    selectRadius = 0
  }
  if (selection == null) {
    // Check for station hover
    for (let station of stations) {
      let stationX = station.pt[0];
      let stationY = station.pt[1];
      let mouseDist = dist(mouseX, mouseY, stationX, stationY);
      if ((mouseDist < selectRadius)) {
        selection = {
          'type' : 'station',
          'title' : station.title,
          'owner' : station.owner,
          'url' : station.url,
          'pt' : station.pt,
          'mode' : mode,
          'boxXMin' : undefined,
          'boxYMin' : undefined,
          'boxXMax' : undefined,
          'boxYMax' : undefined,
          'code' : undefined
        }
        // If mouse is clicked while hovering, open the corresponding url
        if (mouseIsPressed && touches.length == 0) {
          console.log('Station clicked')
          window.open('https://'+station.url);
          // Needed to insure only one page is opened
          mouseIsPressed = false;
        }
        break;
      } else {
        selection = undefined;
      }
    }
  }
}

function checkLegendSelect() {
  // Check for legend hover
  for (let leg of legendArr) {
    // Shift by 1/2*height (or width) to account for rectangle center
    if (
      (mouseX > leg.x - legendWidth/2 && mouseX <= leg.x + legendWidth/2)
      && (mouseY > leg.y -legendHeight/2 && mouseY <= leg.y + legendHeight/2)
    ) {
      selection = {
        'type' : 'legend',
        'title' : undefined,
        'owner' : undefined,
        'url' : undefined,
        'pt' : undefined,
        'mode' : 'hover',
        'boxXMin' : leg.x,
        'boxYMin' : leg.y,
        'boxXMax' : undefined,
        'boxYMax' : undefined,
        'code' : leg.code
      }
      // If mouse is clicked while hovering, open the corresponding url
      if (mouseIsPressed && touches.length == 0) {
      // if (mouseIsPressed) {
        console.log('Legend clicked')
        window.open('/smallweb-subway/'+leg.code);
        // Needed to insure only one page is opened
        mouseIsPressed = false;
      }
      break;
    } else {
      selection = undefined;
    }
  }
}

function drawSelection(selection) {
  if (selection.type == 'station') {
    let x = selection.pt[0]
    let y = selection.pt[1]
    strokeWeight(lineWidth / 2);
    stroke(255);
    fill(0, 0);
    circle(x, y, lineWidth * 2.5);
    drawInfoBox(selection);
  } else if (selection.type == 'legend') {
    rectMode(CENTER)
    strokeWeight(lineWidth / 2);
    stroke(255);
    noFill();
    rect(
      selection.boxXMin-lineWidth/16,
      selection.boxYMin-lineWidth/16,
      legendWidth+lineWidth/4,
      legendHeight+lineWidth/2,
      20
    );
  }
}

function drawInfoBox(selection) {
  // let selectedStation = selectedLine.getStationBytitle(stationtitle)
  // let [x, y] = selectedStation.location
  textAlign(LEFT, TOP);
  rectMode(CORNER);
  let x = selection.pt[0]
  let y = selection.pt[1]
  let title = selection.title
  let owner = selection.owner
  let url = selection.url
  strokeWeight(lineWidth / 2);
  let boxW = 28 * lineWidth;
  let boxH = 5 * lineWidth;
  let boxX;
  let boxY;
  if (x + boxW < width) {
    boxX = x + 1.5*lineWidth
  } else if (x - boxW > lineWidth) {
    boxX = x - boxW - 1.5*lineWidth
  } else {
    boxX = x - (boxW / 2)
  }
  if (y + 30 + boxH < height) {
    boxY = y + 2.5*lineWidth
  } else {
    boxY = y - boxH - 2.5*lineWidth
  }
  selection.boxXMin = boxX;
  selection.boxYMin = boxY;
  selection.boxXMax = boxX + boxW;
  selection.boxYMax = boxY + boxH;
  noStroke();
  textSize(0.017 * width)
  textFont('Consolas')
  let desc = title + ' by ' + owner;
  if (desc.length < 38) {
    fill(255);
    rect(boxX, boxY, boxW, boxH);
    fill(0);
    text(desc, boxX + lineWidth, boxY + lineWidth)
    text(url, boxX + lineWidth, boxY + 3*lineWidth);
  } else {
    fill(255);
    rect(boxX, boxY, boxW, boxH+2*lineWidth);
    fill(0);
    text(title, boxX + lineWidth, boxY + lineWidth)
    text("by "+owner, boxX + lineWidth, boxY + 3*lineWidth)
    text(url, boxX + lineWidth, boxY + 5*lineWidth);
  }
}

function touchStarted() {
  let isFound = false;
  // Check if legend or station highlighted by touch
  if (selection != undefined && touches.length > 0) {
    // If legend highlighted by touch, follow link to index page
    for (let leg of legendArr) {
      // Shift by 1/2*height (or width) to account for rectangle center
      if (
        (mouseX > leg.x - legendWidth/2 && mouseX <= leg.x + legendWidth/2)
        && (mouseY > leg.y -legendHeight/2 && mouseY <= leg.y + legendHeight/2)
        && (selection.code != null && selection.code == leg.code)
      ) {
        console.log('Legend clicked')
        window.open('/smallweb-subway/'+leg.code);
        isFound = true;
        // Needed to insure only one page is opened
        mouseIsPressed = false;
        break;
      }
    }
    // If station highlighted by touch, follow link to webring site
    for (let station of stations) {
      if (
        (mouseX > selection.boxXMin && mouseX < selection.boxXMax)
        && (mouseY > selection.boxYMin && mouseY < selection.boxYMax)
      ) {
        console.log('Station clicked')
        window.open('https://'+selection.url);
        isFound = true;
        // Needed to insure only one page is opened
        mouseIsPressed = false;
        break;
      }
    }
  }
}

function getProp(data_array, elemTitle, prop) {
  let arrayElem = data_array.find(x => x.title === elemTitle);
  if (arrayElem == undefined) {
    console.log('"' + elemTitle + '" not found.')
  } else {
    // @ts-ignore
    return arrayElem[prop]
  }
}

function populateObj(data_array, elemTitle, pt) {
  return {
    "title" : elemTitle,
    "url"   : getProp(data_array, elemTitle, 'url'),
    "owner" : getProp(data_array, elemTitle, 'owner'),
    "pt"    : pt
  }
}

function addStations() {
  let stations = [
    // Map
    {
      'title' : 'Smallweb Subway',
      'url' : 'gusbus.space/smallweb-subway/',
      'owner' : 'Gus Becker',
      'pt' : getScaledPt([dcWidth-1, 3], dcOffset, dcScale, [0, 0])
    },
    /////////////////////////
    // Silver : Scifi Line //
    /////////////////////////
    populateObj(
      DATA_scifi,
      "Gus's Scifi Gallery",
      getScaledPt([0, 2], sfOffset, sfScale, [0, 0])
    ),
    populateObj(
      DATA_scifi,
      "Clockwork's Archive of Tomorrow",
      getScaledPt([sfWidth-1.5, 0.5], sfOffset, sfScale, [0, 0])
    ),
    populateObj(
      DATA_scifi,
      "Codex Archonic",
      getScaledPt([0.5, 0.5], sfOffset, sfScale, [0, 0])
    ),
    populateObj(
      DATA_scifi,
      "Varve's writing bits & pieces",
      getScaledPt([2, 0], sfOffset, sfScale, [0, 0])
    ),
    populateObj(
      DATA_scifi,
      "The Stardustverse",
      getScaledPt([3.5, 0], sfOffset, sfScale, [0, 0])
    ),
    populateObj(
      DATA_scifi,
      "Stories",
      getScaledPt([5, 0], sfOffset, sfScale, [0, 0])
    ),
    // Blue : Zines Line
    populateObj(
      DATA_zines,
      "Mythical Type Zines",
      getScaledPt([zinesWidth-1.5, zinesHeight-1.5], zinesOffset, zinesScale, [0, 0])
    ),
    populateObj(
      DATA_zines,
      "zines",
      getScaledPt([zinesWidth-3, zinesHeight-1], zinesOffset, zinesScale, [0, 0])
    ),
    populateObj(
      DATA_zines,
      "MyDogStoleThisWebsite",
      getScaledPt([2, zinesHeight-1], zinesOffset, zinesScale, [0, 0])
    ),
    populateObj(
      DATA_zines,
      "Ether",
      getScaledPt([0.5, 0.5], zinesOffset, zinesScale, [0, 0])
    ),
    //////////////////////////////////
    // Yellow : Creatives Club Line //
    //////////////////////////////////
    populateObj(
      DATA_creativesclub,
      "DoodleBot",
      getScaledPt([0, 1.75], ccOffset, ccScale, [-lineWidth/2, 0])
    ),
    populateObj(
      DATA_creativesclub,
      "Creatives Club",
      getScaledPt([0.5, 0.5], ccOffset, ccScale, [0, 0])
    ),
    populateObj(
      DATA_creativesclub,
      "haystack blog and oddities",
      getScaledPt([ccWidth-1.5, 0.5], ccOffset, ccScale, [0, 0])
    ),
    populateObj(
      DATA_creativesclub,
      "UR LOCAL CYBORG",
      getScaledPt([ccWidth-1, 1.75], ccOffset, ccScale, [0, 0])
    ),
    populateObj(
      DATA_creativesclub,
      "marcinek.tech",
      getScaledPt([ccWidth-1, ccHeight - 2.75], ccOffset, ccScale, [0, 0])
    ),
    populateObj(
      DATA_creativesclub,
      "community - Justbestvisuals",
      getScaledPt([ccWidth-1.5, ccHeight-1.5], ccOffset, ccScale, [0, 0])
    ),
    populateObj(
      DATA_creativesclub,
      "michi.foo",
      getScaledPt([2, ccHeight-1], ccOffset, ccScale, [-lineWidth/2, 0])
    ),
    //////////////////////////
    // Orange : Comics Line //
    //////////////////////////
    populateObj(
      DATA_comics,
      "The Fuzzy Slug's Webcomic Hub",
      getScaledPt([6, comicsHeight-1], comicsOffset, comicsScale, [-lineWidth/4, -lineWidth/16])
    ),
    populateObj(
      DATA_comics,
      "The Iron Ragdoll",
      getScaledPt([4.5, comicsHeight-1], comicsOffset, comicsScale, [-lineWidth/4, -lineWidth/16])
    ),
    populateObj(
      DATA_comics,
      "slime pond comics",
      getScaledPt([3, comicsHeight-1], comicsOffset, comicsScale, [0, -lineWidth/16])
    ),
    populateObj(
      DATA_comics,
      "Redux",
      getScaledPt([0, comicsHeight-3], comicsOffset, comicsScale, [0, -lineWidth/4])
    ),
    populateObj(
      DATA_comics,
      "Long Gone Legend",
      getScaledPt([0, 2], comicsOffset, comicsScale, [0, 0])
    ),
    populateObj(
      DATA_comics,
      "Bruno and Friends",
      getScaledPt([2, 0], comicsOffset, comicsScale, [0, 0])
    ),
    populateObj(
      DATA_comics,
      "White Noise",
      getScaledPt([comicsWidth-11, 0], comicsOffset, comicsScale, [0, 0])
    ),
    populateObj(
      DATA_comics,
      "Neat Hobby!",
      getScaledPt([comicsWidth-9, 0], comicsOffset, comicsScale, [0, 0])
    ),
    populateObj(
      DATA_comics,
      "Keeping Time",
      getScaledPt([comicsWidth-7, 0], comicsOffset, comicsScale, [0, 0])
    ),
    populateObj(
      DATA_comics,
      "BrittHub",
      getScaledPt([comicsWidth-5, 0], comicsOffset, comicsScale, [0, 0])
    ),
    populateObj(
      DATA_comics,
      "Links",
      getScaledPt([comicsWidth-3, 0], comicsOffset, comicsScale, [0, 0])
    ),
    populateObj(
      DATA_comics,
      "Ultraviolents",
      getScaledPt([comicsWidth-1.5, 0.5], comicsOffset, comicsScale, [0, 0])
    ),
    populateObj(
      DATA_comics,
      "Beyond the End",
      getScaledPt([comicsWidth-1, 1.5], comicsOffset, comicsScale, [0, 0])
    ),
    populateObj(
      DATA_comics,
      "yukiclarke.com",
      getScaledPt([comicsWidth-2, 3], comicsOffset, comicsScale, [lineWidth/2, lineWidth])
    ),
    populateObj(
      DATA_comics,
      "Friction Comic",
      getScaledPt([comicsWidth-3, 5], comicsOffset, comicsScale, [lineWidth/4, lineWidth])
    ),
    //////////////////////////////
    // Green : Doodle Crew Line //
    //////////////////////////////
    populateObj(
      DATA_doodlecrew,
      "feuer-in-soho.art",
      getScaledPt([dcWidth-4, dcHeight-1], dcOffset, dcScale, [0, 0])
    ),
    populateObj(
      DATA_doodlecrew,
      "my art 2025",
      getScaledPt([dcWidth-6, dcHeight-1], dcOffset, dcScale, [0, 0])
    ),
    populateObj(
      DATA_doodlecrew,
      "Honora's web garden",
      getScaledPt([0, dcHeight-3], dcOffset, dcScale, [0, 0])
    ),
    populateObj(
      DATA_doodlecrew,
      "varve's art gallery",
      getScaledPt([0.5, 0.5], dcOffset, dcScale, [0, 0])
    ),
    // slime pond comics (Orange Line)
    // Gus's Scifi Gallery (Silver Line)
    ///////////////////////
    // Red : Poetry Line //
    ///////////////////////
    populateObj(
      DATA_poetry,
      "Poems",
      getScaledPt([poetryWidth-4, poetryHeight-1], poetryOffset, poetryScale, [0, 0])
    ),
    populateObj(
      DATA_poetry,
      "poems",
      getScaledPt([poetryWidth-6, poetryHeight-1], poetryOffset, poetryScale, [0, 0])
    ),
    populateObj(
      DATA_poetry,
      "poetry!",
      getScaledPt([1, poetryHeight-1], poetryOffset, poetryScale, [0, 0])
    ),
    populateObj(
      DATA_poetry,
      "flower in binary",
      getScaledPt([0, poetryHeight-2.5], poetryOffset, poetryScale, [0, 0])
    ),
    populateObj(
      DATA_poetry,
      "delovely's poetry",
      getScaledPt([1, 0], poetryOffset, poetryScale, [0, 0])
    ),
    populateObj(
      DATA_poetry,
      "manyface world",
      getScaledPt([4, 0], poetryOffset, poetryScale, [0, 0])
    ),
    populateObj(
      DATA_poetry,
      "Doug's Poetry Shack",
      getScaledPt([poetryWidth-2, 0], poetryOffset, poetryScale, [0, 0])
    )
  ];
  return stations
}

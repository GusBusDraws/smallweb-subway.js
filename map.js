// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />
let lineWidth;
let stationDist;
let stations = [];
let dcWidth
let dcHeight
let dcPts
let dcOffset = [];
let dcScale;
let ccWidth
let ccHeight
let ccPts
let ccOffset = [];
let ccScale;
let comicsWidth
let comicsHeight
let comicsPts
let comicsOffset = [];
let comicsScale;
let poetryWidth
let poetryHeight
let poetryPts
let poetryOffset = [];
let poetryScale;
let zinesWidth
let zinesHeight
let zinesPts
let zinesOffset = [];
let zinesScale;
let sfWidth
let sfHeight
let sfPts
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
  dcOffset = [width/7 , height/3];
  lineWidth = width * 0.015
}

function draw() {
  background(225);
  drawLines();
    //////////////
   // Stations //
  //////////////
  stations = addStations()
  drawStations(stations);
  drawLegend();
  drawMarker("Smallweb Subway");
  checkStationHover();
  if (selection != null) {
    drawInfoBox(selection);
  }
}

function drawLines() {
    //////////////////////////////
   // Green : Doodle Crew Line //
  //////////////////////////////
  dcWidth = 9;
  dcHeight = 7;
  dcPts = [
    [1, 0], [3, 0], // Top (higher)
    [4, 1], [dcWidth - 2, 1], // Top (lower)
    [dcWidth - 1, 2], [dcWidth - 1, dcHeight - 2], // Right
    [dcWidth - 2, dcHeight - 1], [1, dcHeight - 1],  // Bottom
    [0, dcHeight - 2], [0, 1],  // Left
    [1, 0]
  ]
  dcScale = [stationDist, stationDist];
  let [dcScaledX, dcScaledY] = drawLine(dcOffset, dcScale, dcPts, '#25b233');
    /////////////////////////
   // Silver : Scifi Line //
  /////////////////////////
  sfWidth = 10;
  sfHeight = 6;
  sfPts = [
    [1, 0], [sfWidth - 2, 0], // Top side
    [sfWidth - 1, 1], [sfWidth - 1, sfHeight - 3], // Right side
    [sfWidth - 3, sfHeight - 1], [1, sfHeight - 1], // Bottom side
    [0, sfHeight - 2], [0, 1], // Left side
    [1, 0]
  ]
  sfOffset[0] = (
    min(dcScaledX)
    + 2 * (max(dcScaledX) - min(dcScaledX))/(dcWidth - 1)
    + lineWidth
  );
  sfOffset[1] = (
    min(dcScaledY)
    - 1 * (max(dcScaledY) - min(dcScaledY))/(dcHeight - 1)
  );
  sfScale = [stationDist, stationDist];
  let [sfScaledX, sfScaledY] = drawLine(sfOffset, sfScale, sfPts, '#A1A3A1');
    ////////////////////////
   // Blue : Zines Line //
  ////////////////////////
  zinesWidth = 11;
  zinesHeight = 4;
  zinesPts = [
    [1, 0], [zinesWidth - 2, 0],
    [zinesWidth - 1, 1], [zinesWidth - 1, zinesHeight - 2],
    [zinesWidth - 2, zinesHeight - 1], [1, zinesHeight - 1],
    [1, zinesHeight - 1], [0, zinesHeight - 2],
    [0, 1], [1, 0]
  ]
  zinesOffset[0] = (
    min(dcScaledX)
    + (max(dcScaledX)-min(dcScaledX)) / (dcWidth-1)
    // - lineWidth
  );
  zinesOffset[1] = (
    min(dcScaledY)
    + 4 * (max(dcScaledY)-min(dcScaledY)) / (dcHeight-1)
    + lineWidth
  );
  zinesScale = [stationDist, stationDist];
  let [zinesScaledX, zinesScaledY] = drawLine(zinesOffset, zinesScale, zinesPts, '#0077c0');
  // Redraw green to put it over blue
  [dcScaledX, dcScaledY] = drawLine(dcOffset, dcScale, dcPts, '#25b233');
    //////////////////////////
   // Orange : Comics Line //
  //////////////////////////
  comicsWidth = 10;
  comicsHeight = 7;
  comicsPts = [
    [1, 0], [comicsWidth - 2, 0],  // Top
    [comicsWidth - 1, 1], [comicsWidth - 1, 2],  // Right (outside)
    [comicsWidth - 2, comicsHeight - 4], [comicsWidth - 2, comicsHeight - 2.85],  // Right (inside)
    [comicsWidth - 3.85, comicsHeight - 1], [3.1, comicsHeight - 1],  // Bottom
    [2, comicsWidth - 5], [2, comicsWidth - 6.1], // Left (inside)
    [0, 2-0.1], [0, 1], // Left
    [1, 0]
  ]
  comicsOffset[0] = (
    max(dcScaledX)
    - 5 * (max(dcScaledX) - min(dcScaledX))/(dcWidth - 1)
    // - lineWidth
  )
  comicsOffset[1] = (
    min(dcScaledY)
    - 2 * (max(dcScaledY) - min(dcScaledY))/(dcHeight - 1)
    - lineWidth
  );
  comicsScale = [stationDist, stationDist];
  let [comicsScaledX, comicsScaledY] = drawLine(comicsOffset, comicsScale, comicsPts, '#f7941d');
    //////////////////////////////////
   // Yellow : Creatives Club Line //
  //////////////////////////////////
  ccWidth = 6;
  ccHeight = 6;
  ccPts = [
    [1, 0], [ccWidth - 2, 0],
    [ccWidth - 1, 1], [ccWidth - 1, ccHeight - 2],
    [ccWidth - 2, ccHeight - 1], [1, ccHeight - 1],
    [1, ccHeight - 1], [0, ccHeight - 2],
    [0, 1], [1, 0]
  ]
  ccOffset[0] = max(dcScaledX) + lineWidth;
  ccOffset[1] = (
    min(dcScaledY)
    + 1 * (max(dcScaledY)-min(dcScaledY)) / (dcHeight-1)
  )
  ccScale = [stationDist, stationDist];
  let [ccScaledX, ccScaledY] = drawLine(ccOffset, ccScale, ccPts, '#fad447');
    ////////////////////////
   // Red : Poetry Line //
  ////////////////////////
  poetryWidth = 5;
  poetryHeight = 4;
  poetryPts = [
    [1, 0], [poetryWidth-2, 0],
    [poetryWidth-1, 1], [poetryWidth-1, poetryHeight-2+0.15],
    [poetryWidth-2+0.15, poetryHeight-1], [1, poetryHeight-1],
    [1, poetryHeight-1], [0, poetryHeight-2],
    [0, 1], [1, 0]
  ]
  poetryOffset[0] = (
    min(dcScaledX)
    + 4 * (max(dcScaledX)-min(dcScaledX)) / (dcWidth-1)
    - lineWidth
  );
  poetryOffset[1] = (
    min(dcScaledY)
    + 3 * (max(dcScaledY)-min(dcScaledY)) / (dcHeight-1)
    - lineWidth
  );
  poetryScale = [stationDist, stationDist];
  let [poetryScaledX, poetryScaledY] = drawLine(poetryOffset, poetryScale, poetryPts, '#e51937');
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
      // Draw the main map station with an extra outline!
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
  let lineColors = [
    '#a1a3a1', '#0077c0', '#25b233', '#fad447', '#f7941d', '#e51937'];
  let lineNames = [
    'SCIFI', 'ZINES', 'DOODLE CREW', 'CREATIVES CLUB', 'COMICS', 'POETRY'];
  let textColors = [
    '#000000', '#ffffff', '#000000', '#000000', '#000000', '#000000'];
  let nLines = lineColors.length;
  let spacing = width / (2*nLines + 1);
  rectMode(CENTER);
  textSize(0.017 * width);
  textFont('Consolas');
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  noStroke();
  let legendY = height / 20;
  for (let i = 0; i < nLines; i++) {
    let itemX = (2*i+1.5)*spacing;
    let itemY = legendY;
    fill(lineColors[i]);
    rect(itemX, itemY, 10*lineWidth, 2*lineWidth, 20);
    fill(textColors[i]);
    text(lineNames[i], (2*i+1.5)*spacing, itemY)
  }
}

function drawMarker(stationTitle) {
  rectMode(CENTER);
  textSize(0.017 * width);
  textFont('Consolas');
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  noStroke();
  fill('#e51937');
  let stationX, stationY;
  for (let station of stations) {
    if (station.title == stationTitle) {
      [stationX, stationY] = station.pt;
      rect(stationX + 10*lineWidth, stationY, 10*lineWidth, 2*lineWidth)
    }
  }
  let x1 = stationX + 3*lineWidth;
  let y1 = stationY;
  let x2 = stationX + 5*lineWidth;
  let y2 = stationY - lineWidth;
  let x3 = stationX + 5*lineWidth;
  let y3 = stationY + lineWidth;
  triangle(x1, y1, x2, y2, x3, y3);
  fill(255);
  text("YOU ARE HERE", stationX + 10*lineWidth, stationY)
}

function checkStationHover() {
  // for (let stationIdx = 0; stationIdx < stations.length; stationIdx++) {
  for (let station of stations) {
    let stationX = station.pt[0];
    let stationY = station.pt[1];
    let mouseDist = dist(mouseX, mouseY, stationX, stationY);
    if ((mouseDist < 2*lineWidth)) {
      selection = {
        'title' : station.title,
        'owner' : station.owner,
        'url' : station.url,
        'pt' : station.pt,
        'type' : 'hover',
        'boxXMin' : undefined,
        'boxYMin' : undefined,
        'boxXMax' : undefined,
        'boxYMax' : undefined,
      }
      drawInfoBox(selection)
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
  stroke(255);
  fill(0, 0);
  circle(x, y, lineWidth * 2.5);
  let boxW = 26 * lineWidth;
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
  if (selection != undefined && touches.length > 0) {
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
  } else if (selection === undefined || selection.type != 'hover') {
    for (let station of stations) {
      let stationX = station.pt[0];
      let stationY = station.pt[1];
      let mouseDist = dist(mouseX, mouseY, stationX, stationY);
      if ((mouseDist < 4*lineWidth)) {
        selection = {
          'title' : station.title,
          'owner' : station.owner,
          'url' : station.url,
          'pt' : station.pt,
          'type' : 'touch'
        }
        drawInfoBox(selection)
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      selection = undefined;
    }
  }
}

function addStations() {
  let stations = [
    // Map
    {
      'title' : 'Smallweb Subway',
      'url' : 'gusbus.space/smallweb-subway/',
      'owner' : 'Gus Becker',
      'pt' : getScaledPt([dcWidth-1, 4], dcOffset, dcScale, [0, 0])
    },
    // Silver : Scifi Line
    {
      "title" : "Clockwork's Archive of Tomorrow",
      "url" : "clockwooork.github.io/future-stop.html",
      "owner" : "Clockwork",
      "pt" : getScaledPt([0, 3], sfOffset, sfScale, [0, 0])
    },
    {
      "title" : "Gus's Scifi Gallery",
      "url" : "gusbus.space/scifi/",
      "owner" : "Gus Becker",
      "pt" : getScaledPt([0, 1], sfOffset, sfScale, [0, 0])
    },
    {
      "title" : "Varve's writing bits & pieces",
      "url" : "www.write-on.org/writing/",
      "owner" : "Varve",
      "pt" : getScaledPt([3, 0], sfOffset, sfScale, [0, 0])
    },
    {
      "title" : "Stories",
      "url" : "dionra.com/stories.php",
      "owner" : "Dion Ra",
      "pt" : getScaledPt([5, 0], sfOffset, sfScale, [0, 0])
    },
    // Blue : Zines Line
    {
      "title" : "zines",
      "url" : "bumblechub.com/zines/",
      "owner" : "bumblechub",
      "pt" : getScaledPt([2, zinesHeight-1], zinesOffset, zinesScale, [0, 0])
    },
    {
      "title" : "Mythical Type Zines",
      "url" : "mythicaltype.com/zines/",
      "owner" : "Mythical Type",
      "pt" : getScaledPt([4, zinesHeight-1], zinesOffset, zinesScale, [0, 0]),
    },
    {
      "title" : "dead zines",
      "url" : "dead.garden/zines/",
      "owner" : "jo",
      "pt" : getScaledPt([6, zinesHeight-1], zinesOffset, zinesScale, [0, 0])
    },
    {
      "title" : "MyDogStoleThisWebsite",
      "url" : "metrogoldia.neocities.org/",
      "owner" : "MyDogStoleMyLiver (Devin Spector)",
      "pt" : getScaledPt([1, 0], zinesOffset, zinesScale, [0, 0])
    },
    {
      "title" : "Ether",
      "url" : "ethersent.neocities.org/",
      "owner" : "Emil Aisling",
      "pt" : getScaledPt([8, zinesHeight-1], zinesOffset, zinesScale, [0, 0])
    },
    // Yellow : Creatives Club Line
    {
      "title" : "DoodleBot",
      "url" : "gusbus.space/doodlebot/",
      "owner" : "Gus Becker",
      "pt" : getScaledPt([0, 2], ccOffset, ccScale, [-lineWidth/2, 0])
    },
    {
      "title" : "Creatives Club",
      "url" : "creativesclub.art/",
      "owner" : "Gus Becker",
      "pt" : getScaledPt([0.5, 0.5], ccOffset, ccScale, [0, 0])
    },
    {
      "title" : "haystack blog and oddities",
      "url" : "thatoddhaystack.neocities.org/",
      "owner" : "vita",
      "pt" : getScaledPt([ccWidth-1, 1], ccOffset, ccScale, [0, 0])
    },
    {
      "title" : "UR LOCAL CYBORG",
      "url" : "urlocalcyb.org/",
      "owner" : "cyborgforty",
      "pt" : getScaledPt([ccWidth-1, 2.5], ccOffset, ccScale, [0, 0])
    },
    {
      "title" : "marcinek.tech",
      "url" : "marcinek.tech/",
      "owner" : "Kristen",
      "pt" : getScaledPt([ccWidth-1, 4], ccOffset, ccScale, [0, 0])
    },
    {
      "title" : "michi.foo",
      "url" : "michi.foo/0",
      "owner" : "Sara",
      "pt" : getScaledPt([2, ccHeight-1], ccOffset, ccScale, [-lineWidth/2, 0])
    },
    // Orange : Comics Line
    {
      "title" : "Sunday Comics",
      "url" : "jazz-dude.com/Portfolio/SundayC.html",
      "owner" : "Jazz",
      "pt" : getScaledPt([0, 2], comicsOffset, comicsScale, [2/3*lineWidth, lineWidth])
    },
    {
      "title" : "The Fuzzy Slug's Webcomic Hub",
      "url"   : "thefuzzyslug.neocities.org/",
      "owner" : "thefuzzyslug",
      "pt"    : getScaledPt([2, 0], comicsOffset, comicsScale, [0, 0])
    },
    {
      "title" : "Neat Hobby!",
      "url" : "neathobby.com/",
      "owner" : "Scott Andrew",
      "pt" : getScaledPt([3.66, 0], comicsOffset, comicsScale, [0, 0])
    },
    {
      "title" : "Keeping Time",
      "url" : "www.keepingtimecomic.com/links/",
      "owner" : "Kody Okamoto",
      "pt" : getScaledPt([comicsWidth-4.66, 0], comicsOffset, comicsScale, [0, 0])
    },
    {
      "title"  : "Links",
      "url"   : "diabloafterdark.nekoweb.org/links.html",
      "owner" : "DiabloAfterDark",
      "pt" : getScaledPt([comicsWidth-3, 0], comicsOffset, comicsScale, [0, 0])
    },
    {
      "title" : "Ultraviolents",
      "url" : "uv.itsnero.com/about/",
      "owner" : "Nero Villagallos O'Reilly",
      "pt" : getScaledPt([comicsWidth-1, 1.5], comicsOffset, comicsScale, [0, 0])
    },
    {
      "title" : "yukiclarke.com",
      "url" : "www.yukiclarke.com/home/",
      "owner" : "Yuki Clarke",
      "pt" : getScaledPt([comicsWidth-2, 3], comicsOffset, comicsScale, [lineWidth/2, lineWidth])
    },
    // Green : Doodle Crew Line
    {
      "title" : "jazz-dude.com",
      "url" : "jazz-dude.com/",
      "owner" : "Jazz",
      "pt" : getScaledPt([2, 6], dcOffset, dcScale, [0, 0])
    },
    {
      "title" : "my art 2024",
      "url" : "uuupah.neocities.org/art/my-art-2024/",
      "owner" : "uuupah",
      "pt" : getScaledPt([0, 3], dcOffset, dcScale, [0, 0])
    },
    {
      "title" : "slime pond comics",
      "url" : "abslimeware.neocities.org/comic/",
      "owner" : "candycanearter07",
      "pt" : getScaledPt([4, 1], dcOffset, dcScale, [1/3*lineWidth, -1/3*lineWidth])
    },
    // Red : Poetry Line
    {
      "title" : "poetry!",
      "url" : "columbidaecorner.neocities.org/poetry",
      "owner" : "columbidaecorner",
      "pt" : getScaledPt([0.5, 0.5], poetryOffset, poetryScale, [0, 0])
    },
    {
      "title" : "poems",
      "url" : "dead.garden/poetry/",
      "owner" : "jo",
      "pt" : getScaledPt([0.5, 2.5], poetryOffset, poetryScale, [0, 0])
    }
  ];
  return stations
}

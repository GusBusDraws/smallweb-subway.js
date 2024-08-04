// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />
let lineWidth;
let stationDist;
let stations = [];
let dcWidth = 9;
let dcHeight = 7;
let dcPts = [
  [1, 0], [4, 0], // Top (higher)
  [4, 0], [5, 1],
  [5, 1], [dcWidth - 2, 1], // Top (lower)
  [dcWidth - 2, 1], [dcWidth - 1, 2],
  [dcWidth - 1, 2], [dcWidth - 1, dcHeight - 2], // Right
  [dcWidth - 2, dcHeight - 1], [1, dcHeight - 1],
  [1, dcHeight - 1], [0, dcHeight - 2],
  [0, 1], [1, 0]
]
let dcOffset = [];
let dcScale;
let ccWidth = 5;
let ccHeight = 7;
let ccPts = [
  [1, 0], [ccWidth - 2, 0],
  [ccWidth - 1, 1], [ccWidth - 1, ccHeight - 2],
  [ccWidth - 2, ccHeight - 1], [1, ccHeight - 1],
  [1, ccHeight - 1], [0, ccHeight - 2],
  [0, 1], [1, 0]
]
let ccOffset = [];
let ccScale;
let comicsWidth = 7;
let comicsHeight = 7;
let comicsPts = [
  [1, 0], [comicsWidth - 2, 0],
  [comicsWidth - 1, 1], [comicsWidth - 1, comicsHeight - 2],
  [comicsWidth - 2, comicsHeight - 1], [1, comicsHeight - 1],
  [1, comicsHeight - 1], [0, comicsHeight - 2], // Left
  // [0, 5], [0, 1],
  [0, 1], [1, 0]
]
let comicsOffset = [];
let comicsScale;
let poetryWidth = 5;
let poetryHeight = 5;
let poetryPts = [
  [1, 0], [poetryWidth-2, 0],
  [poetryWidth-1, 1], [poetryWidth-1, poetryHeight-2+0.15],
  [poetryWidth-2+0.15, poetryHeight-1], [1, poetryHeight-1],
  [1, poetryHeight-1], [0, poetryHeight-2],
  [0, 1], [1, 0]
]
let poetryOffset = [];
let poetryScale;
let zinesWidth = 11;
let zinesHeight = 5;
let zinesPts = [
  [1, 0], [zinesWidth - 2, 0],
  [zinesWidth - 1, 1], [zinesWidth - 1, zinesHeight - 2],
  [zinesWidth - 2, zinesHeight - 1], [1, zinesHeight - 1],
  [1, zinesHeight - 1], [0, zinesHeight - 2],
  [0, 1], [1, 0]
]
let zinesOffset = [];
let zinesScale;
let sfWidth = 10;
let sfHeight = 6;
let sfPts = [
  [1, 0], [sfWidth - 3, 0], // Top side
  [sfWidth - 1, 2], [sfWidth - 1, sfHeight - 3+0.12], // Right side
  [sfWidth - 3+0.12, sfHeight - 1], [3, sfHeight - 1], // Bottom side
  [0, sfHeight - 4], [0, 1], // Left side
  [1, 0]
]
let sfOffset = [];
let sfScale;
// let DEBUG = false;
let DEBUG = true;
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
  dcOffset = [width/10, height/4];
  lineWidth = width * 0.015
}

function draw() {
  background(225);
    //////////////////////////////
   // Green : Doodle Crew Line //
  //////////////////////////////
  dcScale = [stationDist, stationDist];
  let [dcScaledX, dcScaledY] = drawLine(dcOffset, dcScale, dcPts, '#25b233');
    /////////////////////////
   // Silver : Scifi Line //
  /////////////////////////
  sfOffset[0] = (
    min(dcScaledX)
    + 2 * (max(dcScaledX) - min(dcScaledX))/(dcWidth - 1)
  );
  sfOffset[1] = (
    min(dcScaledY)
    - 1 * (max(dcScaledY) - min(dcScaledY))/(dcHeight - 1)
  );
  sfScale = [stationDist, stationDist];
  let [sfScaledX, sfScaledY] = drawLine(sfOffset, sfScale, sfPts, '#A1A3A1');
    //////////////////////////
   // Orange : Comics Line //
  //////////////////////////
  comicsOffset[0] = (
    max(dcScaledX)
    - 4 * (max(dcScaledX) - min(dcScaledX))/(dcWidth - 1)
    // - lineWidth
  )
  comicsOffset[1] = (
    min(dcScaledY)
    - 2 * (max(dcScaledY) - min(dcScaledY))/(dcHeight - 1)
    - lineWidth
  );
  comicsScale = [stationDist, stationDist];
  let [comicsScaledX, comicsScaledY] = drawLine(comicsOffset, comicsScale, comicsPts, '#f7941d');
    ////////////////////////
   // Blue : Zines Line //
  ////////////////////////
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
    ////////////////////////
   // Red : Poetry Line //
  ////////////////////////
  poetryOffset[0] = (
    max(dcScaledX)
    - 4 * (max(dcScaledX)-min(dcScaledX)) / (dcWidth-1)
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
    //////////////////////////////////
   // Yellow : Creatives Club Line //
  //////////////////////////////////
  ccOffset[0] = max(dcScaledX) + lineWidth;
  ccOffset[1] = dcOffset[1];
  ccScale = [stationDist, stationDist];
  let [ccScaledX, ccScaledY] = drawLine(ccOffset, ccScale, ccPts, '#fad447');
    //////////////
   // Stations //
  //////////////
  stations = [
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
      "pt" : getScaledPt([1, 3], sfOffset, sfScale, [0, 0])
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
      "pt" : getScaledPt([4, 0], sfOffset, sfScale, [0, 0])
    },
    {
      "title" : "Stories",
      "url" : "dionra.com/stories.php",
      "owner" : "Dion Ra",
      "pt" : getScaledPt([6, 0], sfOffset, sfScale, [0, 0])
    },
    // Blue : Zines Line
    {
      "title" : "zines",
      "url" : "bumblechub.com/zines/",
      "owner" : "bumblechub",
      "pt" : getScaledPt([2, 4], zinesOffset, zinesScale, [0, 0])
    },
    {
      "title" : "Mythical Type Zines",
      "url" : "mythicaltype.com/zines/",
      "owner" : "Mythical Type",
      "pt" : getScaledPt([4, 4], zinesOffset, zinesScale, [0, 0]),
    },
    {
      "title" : "dead zines",
      "url" : "dead.garden/zines/",
      "owner" : "jo",
      "pt" : getScaledPt([6, poetryHeight-1], zinesOffset, zinesScale, [0, 0])
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
      "pt" : getScaledPt([8, poetryHeight-1], zinesOffset, zinesScale, [0, 0])
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
      "pt" : getScaledPt([4, 1], ccOffset, ccScale, [0, 0])
    },
    {
      "title" : "UR LOCAL CYBORG",
      "url" : "urlocalcyb.org/",
      "owner" : "cyborgforty",
      "pt" : getScaledPt([4, 3], ccOffset, ccScale, [0, 0])
    },
    {
      "title" : "marcinek.tech",
      "url" : "marcinek.tech/",
      "owner" : "Kristen",
      "pt" : getScaledPt([4, 5], ccOffset, ccScale, [0, 0])
    },
    {
      "title" : "michi.foo",
      "url" : "michi.foo/0",
      "owner" : "Sara",
      "pt" : getScaledPt([2, 6], ccOffset, ccScale, [-lineWidth/2, 0])
    },
    // Orange : Comics Line
    {
      "title" : "Sunday Comics",
      "url" : "jazz-dude.com/Portfolio/SundayC.html",
      "owner" : "Jazz",
      "pt" : getScaledPt([0, 2], comicsOffset, comicsScale, [0, lineWidth])
    },
    {
      "title" : "Keeping Time",
      "url" : "www.keepingtimecomic.com/links/",
      "owner" : "Kody Okamoto",
      "pt" : getScaledPt([1, 0], comicsOffset, comicsScale, [0, 0])
    },
    {
      "title"  : "Links",
      "url"   : "diabloafterdark.nekoweb.org/links.html",
      "owner" : "DiabloAfterDark",
      "pt" : getScaledPt([3, 0], comicsOffset, comicsScale, [0, 0])
    },
    {
      "title" : "Ultraviolents",
      "url" : "uv.itsnero.com/about/",
      "owner" : "Nero Villagallos O'Reilly",
      "pt" : getScaledPt([5, 0], comicsOffset, comicsScale, [0, 0])
    },
    {
      "title" : "yukiclarke.com",
      "url" : "www.yukiclarke.com/home/",
      "owner" : "Yuki Clarke",
      "pt" : getScaledPt([comicsWidth-1, 2], comicsOffset, comicsScale, [0, lineWidth])
    },
    {
      "title" : "Neat Hobby!",
      "url" : "neathobby.com/",
      "owner" : "Scott Andrew",
      "pt" : getScaledPt([comicsWidth-1, 4], comicsOffset, comicsScale, [0, lineWidth])
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
      "pt" : getScaledPt([6, 0], dcOffset, dcScale, [0, 0])
    },
    // Red : Poetry Line
    {
      "title" : "poetry!",
      "url" : "columbidaecorner.neocities.org/poetry",
      "owner" : "columbidaecorner",
      "pt" : getScaledPt([0, 2], poetryOffset, poetryScale, [0, 0])
    },
    {
      "title" : "poems",
      "url" : "dead.garden/poetry/",
      "owner" : "jo",
      "pt" : getScaledPt([2, 0], poetryOffset, poetryScale, [0, 0])
    }
  ];
  drawStations(stations);
  drawLegend();
  checkStationHover();
  if (selection != null) {
    drawInfoBox(selection);
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
    drawStation(station.pt[0], station.pt[1])
  }
}

function drawStation(x, y) {
  noStroke();
  fill(0);
  circle(x, y, lineWidth * 2);
  fill(255);
  circle(x, y, lineWidth);
}

function drawLegend() {
  let lineColors = ['#0077c0', '#25b233', '#fad447', '#f7941d', '#e51937'];
  let lineNames = ['Zines', 'Doodle Crew', 'Creatives Club', 'Comics', 'Poetry'];
  let nLines = lineColors.length;
  textSize(0.017 * width)
  textFont('Consolas')
  textAlign(LEFT, TOP);
  noStroke();
  fill(255);
  let legendWidth = 0.21*width
  let legendHeight = (2*nLines+1)*lineWidth
  let legendX = width - legendWidth - lineWidth;
  let legendY = height - legendHeight - lineWidth;
  rect(legendX, legendY, legendWidth, legendHeight);
  for (let i = 0; i < nLines; i++) {
    let itemX = legendX + lineWidth;
    let itemY = legendY+(2*i+1)*lineWidth;
    fill(lineColors[i]);
    rect(itemX, itemY, 2*lineWidth, lineWidth);
    fill(0);
    text(lineNames[i], itemX+3*lineWidth, itemY)
  }
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
  textAlign(LEFT, TOP)
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

let data;
let dataWidth = 1200;
let dataHeight = 900;
let editMode = false;
let lineWidth;
let fontSize;
let gridSize;
let is_dragging = false;
let nodes;
let edges;
let lines;
let stations = {};
let highlightColor = "#fff";
let legendHeight;
let legendWidth;
let legendItems;
let selection;
let printMousePosition = false;
// let scifiInfo = formatInfoFromLineJS(DATA_scifi)
// let zinesInfo = formatInfoFromLineJS(DATA_zines)
// let doodlecrewInfo = formatInfoFromLineJS(DATA_doodlecrew)
// let creativesclubInfo = formatInfoFromLineJS(DATA_creativesclub)
// let comicsInfo = formatInfoFromLineJS(DATA_comics)
// let poetryInfo = formatInfoFromLineJS(DATA_poetry)
let info = {
  "sf": formatInfoFromLineJS(DATA_scifi),
  "zi": formatInfoFromLineJS(DATA_zines),
  "dc": formatInfoFromLineJS(DATA_doodlecrew),
  "cc": formatInfoFromLineJS(DATA_creativesclub),
  "cx": formatInfoFromLineJS(DATA_comics),
  "po": formatInfoFromLineJS(DATA_poetry)
}

function formatInfoFromLineJS(infoArr) {
  let lineInfo = {};
  for (let station of infoArr) {
    lineInfo[station.title] = {"url": station.url, "owner": station.owner}
  }
  return lineInfo
}

function preload() {
  data = loadJSON("https://gusbus.space/smallweb-subway.js/map-data.json");
}

function setup() {
  let canvasDiv = document.getElementById('map')
  if (editMode) {
    let canvas = createCanvas(dataWidth, dataHeight);
    canvas.parent('map')
    lineWidth = 15;
    gridSize = 25;
    fontSize = lineWidth * 1.2;
  } else {
    let mapDivWidth = canvasDiv.offsetWidth;
    let canvas = createCanvas(mapDivWidth, mapDivWidth * 0.75);
    canvas.parent('map')
    lineWidth = width * 0.012;
    gridSize = width * 0.03;
    fontSize = lineWidth * 1.2;
  }

  // Collect data about line and station position from map-data.json file
  nodes = data["nodes"];
  edges = data["edges"];
  lines = data["lines"];

  let name = "po14"
  console.log(info[nodes[name].line][nodes[name].title].owner)

  for (let name of Object.keys(nodes)) {
    // Rescale position data to fit the dynamically-sized canvas
    nodes[name].x = nodes[name].x / dataWidth * width;
    nodes[name].y = nodes[name].y / dataHeight * height;

    // Apply line/station offset adjustments
    applyNodePositionOffsets(name)

    // Collect station nodes into an array
    if (nodes[name].is_station == 1) {
      stations[name] = nodes[name];
    }
  }

  legendItems = setupLegend();
}

function draw() {
  background(100);
  drawLines();
  checkLegendSelect();
  if (editMode) {
    checkNodeHover();
  } else {
    checkStationSelect();
  }
  drawNodes();
  drawMainStation();
  drawLegend();
  if (printMousePosition) {
    drawMouseCoords();
  }
  if (selection != null) {
    drawSelection(selection);
  }
}

function applyNodePositionOffsets(name) {
  // Dividing by sqrt(2) accounts for hypotenuse to squeeze adjacent lines together
  if (nodes[name].x_adjust) {
    nodes[name].x = nodes[name].x + nodes[name].x_adjust * lineWidth/sqrt(2);
  }
  if (nodes[name].y_adjust) {
    nodes[name].y = nodes[name].y + nodes[name].y_adjust * lineWidth/sqrt(2);
  }

  // Apply line offsets
  let x_offset = lines[nodes[name].line].x_offset * lineWidth;
  nodes[name].x = nodes[name].x + x_offset;
  let y_offset = lines[nodes[name].line].y_offset * lineWidth;
  nodes[name].y = nodes[name].y + y_offset;
}

function drawLines() {
  for (let edgeObj of edges) {
    let lineName = Object.keys(edgeObj)[0];
    let edge = Object.values(edgeObj)[0];
    let lineColor = lines[lineName].color;
    stroke(lineColor);
    strokeWeight(lineWidth);
    let node_0 = edge[0];
    let node_1 = edge[1];
    line(nodes[node_0].x, nodes[node_0].y, nodes[node_1].x, nodes[node_1].y)
  }
}

function checkNodeHover() {
  if (selection == null) {
    for (let name of Object.keys(nodes)) {
      let lineName = nodes[name].line;
      // let x = getNodeX(name, lineName);
      // let y = getNodeY(name, lineName);
      let x = getStationDisplayX(name);
      let y = getStationDisplayY(name);
      if (dist(x, y, mouseX, mouseY) < lineWidth) {
        if (nodes[name].is_station) {
          selection = {
            'type' : 'station',
            'title' : nodes[name].title,
            'owner' : info[nodes[name].line][nodes[name].title].owner,
            'url' : info[nodes[name].line][nodes[name].title].url,
            'x' : nodes[name].x,
            'y' : nodes[name].y,
            'mode' : "hover",
            'boxXMin' : null,
            'boxYMin' : null,
            'boxXMax' : null,
            'boxYMax' : null,
            'name' : nodes[name].name
          }
          // hover = name;
        } else if (!nodes[name].is_station && editMode) {
          selection = {
            'type' : 'node',
            'title' : nodes[name].name,
            'owner' : "",
            'url' : "",
            'x' : nodes[name].x,
            'y' : nodes[name].y,
            'mode' : "hover",
            'boxXMin' : null,
            'boxYMin' : null,
            'boxXMax' : null,
            'boxYMax' : null,
            'name' : nodes[name].name
          }
          // hover = name;
        }
        return
      } else {
        // hover = null;
        selection = null;
      }
    }
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
    for (let station of Object.values(stations)) {
      let mouseDist = dist(mouseX, mouseY, station.x, station.y);
      if ((mouseDist < selectRadius)) {
        selection = {
          'type' : 'station',
          'title' : station.title,
          'owner' : info[station.line][station.title].owner,
          'url' : info[station.line][station.title].url,
          'x' : station.x,
          'y' : station.y,
          'mode' : mode,
          'boxXMin' : null,
          'boxYMin' : null,
          'boxXMax' : null,
          'boxYMax' : null,
          'name' : station.name
        }
        // If mouse is clicked while hovering, open the corresponding url
        if (mouseIsPressed && touches.length == 0 && !editMode) {
          console.log('Station clicked')
          window.open('https://'+station.url);
          // Needed to insure only one page is opened
          mouseIsPressed = false;
        }
        break;
      } else {
        selection = null;
      }
    }
  }
}

function checkLegendSelect() {
  // Check for legend hover
  for (let leg of legendItems) {
    // Shift by 1/2*height (or width) to account for rectangle center
    if (
      (mouseX > leg.x - legendWidth/2 && mouseX <= leg.x + legendWidth/2)
      && (mouseY > leg.y -legendHeight/2 && mouseY <= leg.y + legendHeight/2)
    ) {
      selection = {
        'type' : 'legend',
        'title' : null,
        'owner' : null,
        'url' : null,
        'x' : null,
        'y' : null,
        'mode' : 'hover',
        'boxXMin' : leg.x,
        'boxYMin' : leg.y,
        'boxXMax' : null,
        'boxYMax' : null,
        'code' : leg.code
      }
      // If mouse is clicked while hovering, open the corresponding url
      if (mouseIsPressed && touches.length == 0 && !editMode) {
      // if (mouseIsPressed) {
        console.log('Legend clicked')
        window.open('/smallweb-subway/'+leg.code);
        // Needed to insure only one page is opened
        mouseIsPressed = false;
      }
      break;
    } else {
      if (!is_dragging) {
        selection = null;
      }
    }
  }
}

function drawSelection(selection) {
  if (selection.type == 'station') {
    strokeWeight(lineWidth / 2);
    stroke(255);
    fill(0, 0);
    let x = getStationDisplayX(selection.name);
    let y = getStationDisplayY(selection.name);
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
  } else if (selection.type == 'node') {
    noStroke();
    fill(255);
    circle(selection.x, selection.y, lineWidth);
  }
}

function drawInfoBox(selection) {
  textAlign(LEFT, TOP);
  rectMode(CORNER);
  strokeWeight(lineWidth / 2);
  let boxW;
  let boxH;
  let boxX;
  let boxY;
  noStroke();
  textSize(fontSize)
  textFont('Consolas')
  let desc = selection.title + ' by ' + selection.owner;
  if (desc.length < 38) {
    boxW = max(desc.length, selection.url.length) * fontSize * 0.7;
    boxH = 5 * lineWidth;
    boxX = getInfoBoxX(selection.x, boxW)
    boxY = getInfoBoxY(selection.y, boxH)
    fill(255);
    rect(boxX, boxY, boxW, boxH);
    fill(0);
    text(desc, boxX + lineWidth, boxY + lineWidth)
    text(selection.url, boxX + lineWidth, boxY + 3*lineWidth);
  } else {
    let desc1 = selection.title
    let desc2 = "by "+selection.owner
    boxW = max(desc1.length, desc2.length, selection.url.length) * fontSize * 0.7;
    boxH = 5 * lineWidth + 2*lineWidth;
    boxX = getInfoBoxX(selection.x, boxW)
    boxY = getInfoBoxY(selection.y, boxH)
    fill(255);
    rect(boxX, boxY, boxW, boxH);
    fill(0);
    text(desc1, boxX + lineWidth, boxY + lineWidth)
    text(desc2, boxX + lineWidth, boxY + 3*lineWidth)
    text(selection.url, boxX + lineWidth, boxY + 5*lineWidth);
  }
  selection.boxXMin = boxX;
  selection.boxYMin = boxY;
  selection.boxXMax = boxX + boxW;
  selection.boxYMax = boxY + boxH;
}

function getInfoBoxX(stationX, boxW) {
  if (stationX + boxW < width) {
    boxX = stationX + 1.5*lineWidth
  } else if (stationX - boxW > lineWidth) {
    boxX = stationX - boxW - 1.5*lineWidth
  } else {
    boxX = stationX - (boxW / 2)
  }
  return boxX
}

function getInfoBoxY(stationY, boxH) {
  if (stationY + 30 + boxH < height) {
    boxY = stationY + 2.5*lineWidth
  } else {
    boxY = stationY - boxH - 2.5*lineWidth
  }
  return boxY
}

function touchStarted() {
  let isFound = false;
  // Check if legend or station highlighted by touch
  if (selection != undefined && touches.length > 0) {
    // If legend highlighted by touch, follow link to index page
    for (let leg of legendItems) {
      // Shift by 1/2*height (or width) to account for rectangle center
      if (
        (mouseX > leg.x - legendWidth/2 && mouseX <= leg.x + legendWidth/2)
        && (mouseY > leg.y -legendHeight/2 && mouseY <= leg.y + legendHeight/2)
        && (selection.code != null && selection.code == leg.code)
      ) {
        console.log('Legend touched')
        window.open('/smallweb-subway/'+leg.code);
        isFound = true;
        // Needed to insure only one page is opened
        mouseIsPressed = false;
        break;
      }
    }
    // If station highlighted by touch, follow link to webring site
    for (let station of Object.values(stations)) {
      if (
        (mouseX > selection.boxXMin && mouseX < selection.boxXMax)
        && (mouseY > selection.boxYMin && mouseY < selection.boxYMax)
      ) {
        console.log('Station touched')
        window.open('https://'+selection.url);
        isFound = true;
        // Needed to insure only one page is opened
        mouseIsPressed = false;
        break;
      }
    }
  }
}


function drawNodes() {
  for (let name of Object.keys(nodes)) {
    // If dragging is true, set x, y to mouseX, mouseY
    if (is_dragging && selection != null && selection.name == name && selection.type != "legend") {
      nodes[name].x = round(mouseX / gridSize) * gridSize;
      nodes[name].y = round(mouseY / gridSize) * gridSize;
      applyNodePositionOffsets(name)
      selection.x = nodes[name].x;
      selection.y = nodes[name].y;
    }

    if (nodes[name].is_station) {
      let x = getStationDisplayX(name)
      let y = getStationDisplayY(name)
      fill(0);
      noStroke();
      circle(x, y, lineWidth*2);
      fill(255);
      circle(x, y, lineWidth);
    }
  }
}

function drawMainStation() {
  let reference_node = "dc00";
  let x = nodes[reference_node].x;
  let y = nodes[reference_node].y;
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

function getStationDisplayX(name) {
  let x = nodes[name].x;
  if (nodes[name].station_offset_x) {
    x += lineWidth * nodes[name].station_offset_x;
  }
  return x
}

function getStationDisplayY(name) {
  let y = nodes[name].y;
  if (nodes[name].station_offset_y) {
    y += lineWidth * nodes[name].station_offset_y;
  }
  return y
}

function keyPressed() {
  if (key == "s" && editMode) {
    print("Saving data...");
    saveJSON(data);
  }
}

// Enable dragging if mouse is intersecting w/ a circle
function mousePressed() {
  // Check if mouse is within a circle
  if (editMode && selection != null && selection.type != 'legend' && touches.length == 0) {
    is_dragging = true;
    console.log("is_dragging =", is_dragging)
    console.log("selection.name =", selection.name)
    return
  }
}

function mouseReleased() {
  selection = null;
  if (is_dragging) {
    is_dragging = false;
    console.log("is_dragging =", is_dragging)
  }
}

function setupLegend() {
  legendItems = [];
  let legendOrder = ['sf', 'zi', 'dc', 'cc', 'cx', 'po']
  legendWidth = 10*lineWidth;
  legendHeight = 2*lineWidth;
  let nLines = Object.keys(lines).length;
  let spacing = width / (2*nLines + 1);
  for (let i = 0; i < nLines; i++) {
    // let [lineShorthand, lineObj] = Object.entries(lines)[i];
    // let lineObj = lines[i];
    let lineObj = lines[legendOrder[i]];
    legendItems.push(
      {
        'x' : (2*i+1.5)*spacing,
        'y' : height * 0.05,
        'name' : lineObj["name"],
        'color' : lineObj["color"],
        'code' : lineObj["code"]
      }
    )
  }
  return legendItems
}

function drawLegend() {
  rectMode(CENTER);
  textSize(fontSize);
  textFont('Consolas');
  textAlign(CENTER, CENTER);
  noStroke();
  for (let legendItem of legendItems) {
    let itemX = legendItem.x;
    let itemY = legendItem.y;
    fill(legendItem.color);
    rect(itemX, itemY, legendWidth, legendHeight, lineWidth);
    fill(0);
    text(legendItem.name, itemX, itemY)
  }
}

function drawMouseCoords() {
  let gap = 25;
  fill(0)
  textAlign(RIGHT, CENTER);
  textSize(fontSize);
  text(`${round(mouseX)}, ${round(mouseY)}`, mouseX - gap, mouseY + gap)
}

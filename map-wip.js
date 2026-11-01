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
    fontSize = width * 0.015;
  } else {
    let mapDivWidth = canvasDiv.offsetWidth;
    let canvas = createCanvas(mapDivWidth, mapDivWidth * 0.75);
    canvas.parent('map')
    lineWidth = width * 0.012;
    gridSize = width * 0.03;
    fontSize = width * 0.01;
  }

  // Collect data about line and station position from map-data.json file
  nodes = data["nodes"];
  edges = data["edges"];
  lines = data["lines"];

  // Rescale position data to fit the dynamically-sized canvas
  for (let name of Object.keys(nodes)) {
    nodes[name].x = nodes[name].x / dataWidth * width;
    nodes[name].y = nodes[name].y / dataHeight * height;
    if (nodes[name].is_station == 1) {
      stations[name] = nodes[name];
    }
  }
  console.log(Object.keys(stations).length)

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

function checkForAdjustments(name) {
  if (nodes[name].needs_adjusting) {    
    // Dividing by sqrt(2) accounts for hypotenuse to squeeze adjacent lines together
    if (nodes[name].x_adjust) {
      nodes[name].x = nodes[name].x + nodes[name].x_adjust * lineWidth/sqrt(2);
    }
    
    if (nodes[name].y_adjust) {
      nodes[name].y = nodes[name].y + nodes[name].y_adjust * lineWidth/sqrt(2);
    }

    // Once adjustments are made, unmark so points don't continuously move
    nodes[name].needs_adjusting = 0;
  }
}

function drawLines() {
  for (let edgeObj of edges) {
    let lineName = Object.keys(edgeObj)[0];
    let edge = Object.values(edgeObj)[0];
    let lineColor = data.lines[lineName].color;
    stroke(lineColor);
    strokeWeight(lineWidth);
    let node_0 = edge[0];
    let node_1 = edge[1];
    let x_offset = data.lines[lineName].x_offset * lineWidth;
    let y_offset = data.lines[lineName].y_offset * lineWidth;
    line(
      nodes[node_0].x + x_offset,
      nodes[node_0].y + y_offset,
      nodes[node_1].x + x_offset,
      nodes[node_1].y + y_offset
    )
  }
}

function checkNodeHover() {
  if (selection == null) {
    for (let name of Object.keys(nodes)) {
      let lineName = nodes[name].line;
      let x = getNodeX(name, lineName);
      let y = getNodeY(name, lineName);
      if (dist(x, y, mouseX, mouseY) < lineWidth) {
        if (nodes[name].is_station) {
          selection = {
            'type' : 'station',
            'title' : nodes[name].title,
            'owner' : nodes[name].owner,
            'url' : nodes[name].url,
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
          'owner' : station.owner,
          'url' : station.url,
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
    circle(selection.x, selection.y, lineWidth * 2.5);
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
  // let selectedStation = selectedLine.getStationBytitle(stationtitle)
  // let [x, y] = selectedStation.location
  textAlign(LEFT, TOP);
  rectMode(CORNER);
  strokeWeight(lineWidth / 2);
  let boxW = 28 * lineWidth;
  let boxH = 5 * lineWidth;
  let boxX;
  let boxY;
  if (selection.x + boxW < width) {
    boxX = selection.x + 1.5*lineWidth
  } else if (selection.x - boxW > lineWidth) {
    boxX = selection.x - boxW - 1.5*lineWidth
  } else {
    boxX = selection.x - (boxW / 2)
  }
  if (selection.y + 30 + boxH < height) {
    boxY = selection.y + 2.5*lineWidth
  } else {
    boxY = selection.y - boxH - 2.5*lineWidth
  }
  selection.boxXMin = boxX;
  selection.boxYMin = boxY;
  selection.boxXMax = boxX + boxW;
  selection.boxYMax = boxY + boxH;
  noStroke();
  textSize(0.017 * width)
  textFont('Consolas')
  let desc = selection.title + ' by ' + selection.owner;
  if (desc.length < 38) {
    fill(255);
    rect(boxX, boxY, boxW, boxH);
    fill(0);
    text(desc, boxX + lineWidth, boxY + lineWidth)
    text(selection.url, boxX + lineWidth, boxY + 3*lineWidth);
  } else {
    fill(255);
    rect(boxX, boxY, boxW, boxH+2*lineWidth);
    fill(0);
    text(selection.title, boxX + lineWidth, boxY + lineWidth)
    text("by "+selection.owner, boxX + lineWidth, boxY + 3*lineWidth)
    text(selection.url, boxX + lineWidth, boxY + 5*lineWidth);
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
    for (let station of Object.values(stations)) {
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


function drawNodes() {
  for (let name of Object.keys(nodes)) {
    // If dragging is true, set x, y to mouseX, mouseY
    if (is_dragging && selection != null && selection.name == name && selection.type != "legend") {
      nodes[name].x = round(mouseX / gridSize) * gridSize;
      nodes[name].y = round(mouseY / gridSize) * gridSize;
      selection.x = nodes[name].x;
      selection.y = nodes[name].y;
    }

    checkForAdjustments(name);

    if (nodes[name].is_station) {
      let lineName = nodes[name].line;
      let x = getNodeX(name, lineName);
      let y = getNodeY(name, lineName);
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

function getNodeX(name, lineName) {
  let x_offset = data.lines[lineName].x_offset * lineWidth;
  let x = nodes[name].x + x_offset;
  if (nodes[name].station_offset_x) {
        x += lineWidth * nodes[name].station_offset_x;
  }
  return x
}

function getNodeY(name, lineName) {
  let y_offset = data.lines[lineName].y_offset * lineWidth;
  let y = nodes[name].y + y_offset;
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
  is_dragging = false;
  console.log("is_dragging =", is_dragging)
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

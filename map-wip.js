let data;
let dataWidth = 1200;
let dataHeight = 900;
let editMode = false;
let lineWidth;
let fontSize;
let gridSize;
let dragging = null;
let nodes;
let edges;
let lines;
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
    let canvas = createCanvas(mapDivWidth, mapDivWidth * 2/3);
    canvas.parent('map')
    lineWidth = width * 0.01;
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
  }

  legendItems = setupLegend();
}

function draw() {
  background(100);
  drawLines();
  checkHover();
  drawNodes();
  drawMainStation();
  drawLegend();
  if (selection != null) {
    drawSelectionInfo();
  }
  if (printMousePosition) {
    drawMouseCoords();
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

function checkHover() {
  checkLegendHover();
  checkNodeHover();
}

function checkLegendHover() {
  for (let legendItem of legendItems) {
    let x = legendItem.x;
    let y = legendItem.y;
    if (
      (mouseX > x - legendWidth/2 && mouseX <= x + legendWidth/2)
      && (mouseY > y -legendHeight/2 && mouseY <= y + legendHeight/2)
    ) {
      rectMode(CENTER)
      strokeWeight(lineWidth / 2);
      stroke(highlightColor);
      fill(highlightColor);
      rect(
        x-lineWidth/16,
        y-lineWidth/16,
        legendWidth+lineWidth/4,
        legendHeight+lineWidth/2,
        lineWidth
      );
      // If mouse is clicked while hovering, open the corresponding url
      if (mouseIsPressed && touches.length == 0) {
        console.log('Legend clicked')
        window.open('//gusbus.space/smallweb-subway/'+legendItem.code);
        // Needed to insure only one page is opened
        mouseIsPressed = false;
      }
      return
    } else {
      hover = null;
    }
  }
}

function checkNodeHover() {
  for (let name of Object.keys(nodes)) {
    let lineName = nodes[name].line;
    let x = getNodeX(name, lineName);
    let y = getNodeY(name, lineName);
    if (dist(x, y, mouseX, mouseY) < lineWidth) {
      if (nodes[name].is_station) {
        selection = {
          "name": name,
          "x": x,
          "y": y
        }
        hover = name;
        hoverHighlight(x, y);
      }
      if (!nodes[name].is_station && editMode) {
        hover = name;
        hoverHighlight(x, y);
      }
      // If touch detected, also enter dragging mode
      if (touches.length > 0) {
        dragging = name;
      }
      return
    } else {
      hover = null;
      selection = null;
    }
  }
}

function hoverHighlight(x, y) {
  fill(highlightColor);
  noStroke();
  circle(x, y, 3 * lineWidth);
}

function drawSelectionInfo() {
  let name = selection.name;
  let x = selection.x;
  let y = selection.y;
  let gap = 1.5 * lineWidth;
  let h = 4 * lineWidth;
  let rect_x = x + gap;
  let rect_y = y - gap - h;
  let text_x = rect_x + gap;
  let text_y = rect_y + h/2;
  rectMode(CORNER);
  noStroke();
  if (nodes[name].is_station) {
    textStr = `${name}\n${nodes[name].title}`;
    let w = textStr.length * 10;
    fill(255);
    rect(rect_x, rect_y, w, h);
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(fontSize);
    text(textStr, text_x, text_y)
  }
  else {
    fill(0);
    textAlign(LEFT, CENTER);
    text(hover, text_x, text_y);
  }
}

function drawNodes() {
  for (let name of Object.keys(nodes)) {
    // If dragging is true, set x, y to mouseX, mouseY
    if (dragging != null && dragging == name) {
      nodes[name].x = round(mouseX / gridSize) * gridSize;
      nodes[name].y = round(mouseY / gridSize) * gridSize;
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
  if (key == "s") {
    print("Saving data...");
    saveJSON(data);
  }
}

// Enable dragging if mouse is intersecting w/ a circle
function mousePressed() {
  // Check if mouse is within a circle
  if (editMode && hover != null && touches.length == 0) {
    dragging = hover;
    return
  }
}

function mouseReleased() {
  hover = null;
  dragging = null;
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
    console.log(legendOrder[i])
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

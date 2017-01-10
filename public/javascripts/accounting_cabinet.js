let sqft = 0.704;
let lf = 0.11;
let lfin = 0.14;
let drsqft = 15;
let ft3 = 0.15;
let glides = 4;
let hinges = 1.5;
let plates = 1;
let bumpers = 0.05;
let dowel = 0.12;
let screws = 0.02;
let pins = 0.02;
let t = 0.625


let left = function(d, h) {
    return (d * h / 144) * sqft;
}

let right = left;

let bottom = function(w, d) {
    return (w - t * 2) * (d - t) / 144 * sqft;
}

let spanner = function(w) {
    return (w - t * 2) * 4 / 144 * sqft
}

let nailer = spanner;

let shelf = function(w, d) {
    return ((w - t) * (2 - 1/8)) * (d - 1.5) / 144 * sqft;
}

let back = function(w, h) {
    return (w - t * 2) * (h - 4.5) /144 * sqft;
}

let edgeboard = function(w, h) {
    return ((w * 4) + (h - 4.5) * 2) /12 * lf;
}

let drawerBoxes = function(w, d) {
    return (((w - t * 2) -1) * 2 + (d - 3) * 2) * lfin;
}

let doors = function (w, h) {
    if (getValue("doorStyleSelector") == "No") {
        return 0;
    }

    return ((w / 2 - 1/8) * (h -6.5 - 4.5 - 1/2)) / 144 * drsqft;
}

let drawerFront = function(w) {
    return (w - 1/8) * 6.5 / 144 * drsqft;
}

let cardboard = function(w, h, d) {
    return (w * h * 2 + d * h *2) / 144 * ft3;
}

let glidesCost = function() { return glides; }
let hingesCost = function() { return hinges * 2; }
let platesCost = function() { return plates * 2; }
let bumpersCost = function() { return bumpers * 8; }
let pinsCost = function() { return pins * 4; }
let dowelCost = function() { return dowel * 34; }
let screwsCost = function() { return screws * 26; }

function getValue(name) {
    return document.getElementById(name).value;
}

function setValue(name, value) {
    document.getElementById(name).value = value;
}

function calculatePrice() {

    console.log(getValue("doorStyleSelector"));    
    
    var d = getValue("Depth");
    var h = getValue("Height");
    var w = getValue("Width");

    //let cost = left(d, h) + right(d, h) + bottom(w, d) + (spanner(w) * 2) + (nailer(w) * 3) + shelf(w, d) + back(w, h) + edgeboard(w, h) + drawerBoxes(w, d) + doors(w, h) + drawerFront(w) + cardboard(w, h, d) + glides + hinges + plates + bumpers + pins + dowel + screws;

    let cost = -1;
    
    cost = left(d, h) + right(d, h) + bottom(w, d) + (spanner(w) * 2) + (nailer(w) * 3) + shelf(w, d) + back(w, h) + edgeboard(w, h) + drawerBoxes(w, d) + doors(w, h) + drawerFront(w) + cardboard(w, h, d) + glides + hinges + plates + bumpers + pins + dowel + screws;
    
    if (w >= 9 && w <= 23.9375) {
        cost = left(d, h) + right(d, h) + bottom(w, d) + (spanner(w) * 2) + (nailer(w) * 3) + shelf(w, d) + back(w, h) + edgeboard(w, h) + drawerBoxes(w, d) + doors(w, h) + drawerFront(w) + cardboard(w, h, d) + glides + hinges + plates + (bumpers * 6) + pins + dowel + screws;
    }

    if (w >= 24 && w <= 35.9375) {
        cost = left(d, h) + right(d, h) + bottom(w, d) + (spanner(w) * 2) + (nailer(w) * 3) + shelf(w, d) + back(w, h) + edgeboard(w, h) + drawerBoxes(w, d) + (doors(w, h) * 2) + drawerFront(w) + cardboard(w, h, d) + glides + ((hinges + plates)*2) + (bumpers*8) + pins + dowel + screws;
    }

    if (w >= 36 && w <= 42) {
        cost = left(d, h) + right(d, h) + bottom(w, d) + (spanner(w) * 2) + (nailer(w) * 3) + shelf(w, d) + back(w, h) + edgeboard(w, h) + (drawerBoxes(w, d) * 2) + (doors(w, h) * 2) + (drawerFront(w) * 2) + cardboard(w, h, d) + (glides * 2) + (2 * (hinges + plates)) + (bumpers * 12) + pins + dowel + screws;
    }
    
    return parseFloat(cost).toFixed(2);

    //return (getValue("Width") * getValue("Height") * getValue("Depth"));
}

function updatePrice() {
    setValue("yourPrice", "Your Price: $" + calculatePrice());
}

let sqft = 2;
let lf = 0.1;
let lfin = 0.35;
let drsqft = 15;
let ft3 = 3;
let glides = 10;
let hinges = 1.5;
let plates = 0.5;
let bumpers = 0.05;
let dowel = 0.05;
let screws = 0.02;

let left = function(d, h) {
    return (d * h) / (144 * sqft);
}

let right = left;

let bottom = function(w, d) {
    return (w * d) / (144 * sqft);
}

let spanner = function(w) {
    return ((w - (11/8) * 4) * sqft)
}

let nailer = spanner;

let shelf = function(w, d) {
    return ((w - (3/2)) * (d - 6)) / (144 * sqft);
}

let back = function(w, h) {
    return ((w - (15/16)) * (h - (1/16))) / (144 * sqft);
}

let edgeboard = function(w, h) {
    return (w * 4) + (h * 2) * lf;
}

let drawerBoxes = function(w, d) {
    return ((w - (7/4)) * 2) + ((d - 3) * 2 * lfin);
}

let doors = function(w, h) {
    return (((w - (1/8)) * (h - (13/2) - 0.5))) / (144 * drsqft);
}

let drawerFront = function(w) {
    return (((w - (1/8)) * (13/2))) / (144 * drsqft);
}

let cardboard = function(w, h, d) {
    return w * h * d * ft3;
}

let glidesCost = function() { return glides; }
let hingesCost = function() { return hinges * 2; }
let platesCost = function() { return plates * 2; }
let bumpersCost = function() { return bumpers * 8; }
let dowelCost = function() { return dowl * 17; }
let screwsCost = function() { return screws * 26; }

function getValue(name) {
    return document.getElementById(name).value;
}

function setValue(name, value) {
    document.getElementById(name).value = value;
}

function calculatePrice() {
    
    var d = getValue("Depth");
    var h = getValue("Height");
    var w = getValue("Width");

    let cost = left(d, h) + right(d, h) + bottom(w, d) + (spanner(w) * 2) + (nailer(w) * 3) + shelf(w, d) + back(w, h) + edgeboard(w, h) + drawerBoxes(w, d) + doors(w, h) + drawerFront(w) + cardboard(w, h, d) + glides + hinges + plates + bumpers + dowel + screws;
    
    return parseFloat(cost).toFixed(2);

    //return (getValue("Width") * getValue("Height") * getValue("Depth"));
}

function updatePrice() {
    setValue("yourPrice", "Your Price: $" + calculatePrice());
}
//A KÉT FELADAT KÖZÜL ELEGENDŐ CSAK AZ EGYIKET MEGOLDANI

//RÖVID FELADAT, HA EZT VÁLASZTOD, AKKOR TELJESEN MEG KELL OLDANI A PLUSZPONTÉRT
//1. Módosítsd az órai példát, hogy ha shift lenyomása mellett kattintunk
//az oszlopra, akkor mint csökkenő rendezési szempontként adjuk hozzá az
//oszlopot, shift lenyomása nélkül pedig maradjon az órán megírt
//növekvő rendezési szempont funkcionalitása

//ÖSSZETETT FELADAT, HA EZT VÁLASZTOD, AKKOR ELÉG EGY REÁLIS MENNYISÉGET MEGOLDANOD A PLUSZPONTÉRT
//2. Pixel art 5. gyakorlat 15. feladat
//http://webprogramozas.inf.elte.hu/#!/subjects/webprog-pti/gyak/05

addEventListener("load", () => {
    resizeButton.addEventListener('click', () => resizeCanvas(canvasWidth.value, canvasHeight.value));
    newCanvasButton.addEventListener('click', () => newCanvas(canvasWidth.value, canvasHeight.value));
    saveButton.addEventListener('click', () => saveCanvas(canvasName.value, currentPixels));
    loadButton.addEventListener('click', () => { 
        currentPixels = loadCanvas(canvasName.value);
        redrawCanvas(canvas, currentPixels, canvasPXSize);
    });

    colorPicker.addEventListener('click', colorPicked);

    foreColor.addEventListener('change', () => pencolor.forecolor = foreColor.value);
    backColor.addEventListener('change', () => pencolor.backcolor = backColor.value);

    canvas.addEventListener('mousemove', draw);
    otherCanvases.addEventListener('click', loadOtherCanvas);

    newCanvas(10, 10);

    displayOtherCanvases();
});

const canvasPXSize = 15;

let currentCanvasName;
let currentPixels = [];
let customColors = [];

const pencolor = {
    foreColor: "#000000",
    backColor: "#ffffff",

    set forecolor(color) {
        this.foreColor = color;
        foreColor.value = this.foreColor;
        customColors.push(color);
        customColors = customColors.filter((color, index, self) => self.indexOf(color) === index).slice(-10);
        if (colorPicker) Array.from(colorPicker.rows[1].cells).splice(1).forEach((cell, index) => cell.style.backgroundColor = customColors[index]);
    },

    set backcolor(color) {
        this.backColor = color;
        backColor.value = this.backColor;
        customColors.push(color);
        customColors = customColors.filter((color, index, self) => self.indexOf(color) === index).slice(-10);
        if (colorPicker) Array.from(colorPicker.rows[1].cells).splice(1).forEach((cell, index) => cell.style.backgroundColor = customColors[index]);
    },

    get forecolor() {
        return this.foreColor;
    },
    
    get backcolor() {
        return this.backColor;
    }
}

function resizeCanvas(x, y) {
    if (x < currentPixels.length) {
        currentPixels.splice(x);
    }

    currentPixels.forEach((column) => {
        if (y < column.length) {
            column.splice(y);
        }

        if (y > column.length) {
            for (let i = column.length; i < y; i++) {
                column[i] = pencolor.backcolor
            }
        }
    });

    if (x > currentPixels.length) {
        for (let i = currentPixels.length; i < x; i++) {
            currentPixels[i] = [];
            for (let j = 0; j < y; j++) {
                currentPixels[i][j] = pencolor.backcolor;
            }
        }
    }

    redrawCanvas(canvas, currentPixels, canvasPXSize);
}

function newCanvas(x, y) {
    currentPixels = [];
    for (let i = 0; i < x; i++) {
        currentPixels[i] = [];
        for (let j = 0; j < y; j++) {
            currentPixels[i][j] = pencolor.backcolor;
        }
    }

    redrawCanvas(canvas, currentPixels, canvasPXSize);
}

function saveCanvas(name, pixels) {
    let canvasnames = JSON.parse(localStorage.getItem("canvasnames"));
    if (canvasnames == null) canvasnames = [];

    if (!canvasnames.includes(name)) { canvasnames.push(name); }
    localStorage.setItem("canvasnames", JSON.stringify(canvasnames));

    localStorage.setItem("canvas_" + name, JSON.stringify(pixels));

    displayOtherCanvases();
}

function loadCanvas(name) {
    return JSON.parse(localStorage.getItem("canvas_" + name));
}

function redrawCanvas(canvas, pixels, px) {
    canvas.innerHTML = "";

    for (let y = 0; y < pixels[0].length; y++) {
        let row = document.createElement("tr");
        for (let x = 0; x < pixels.length; x++) {
            let cell = document.createElement("td");
            cell.style.backgroundColor = pixels[x][y];
            cell.style.width = px + "px";
            cell.style.height = px + "px";
            row.appendChild(cell);
        }
        canvas.appendChild(row);
    }
}

function draw(event) {
    let cell = event.target;
    if (cell.tagName != "TD") return;

    event.preventDefault();

    let x = cell.cellIndex;
    let y = cell.parentNode.rowIndex;

    if (event.buttons == 1) {
        currentPixels[x][y] = pencolor.forecolor;
        cell.style.backgroundColor = pencolor.forecolor;
    } else if (event.buttons == 2) {
        currentPixels[x][y] = pencolor.backcolor;
        cell.style.backgroundColor = pencolor.backcolor;
    }

    redrawCanvas(canvas, currentPixels, canvasPXSize);
}

function colorPicked(event) {
    let cell = event.target;
    if (cell.tagName != "TD") return;
    if (cell.innerHTML != "") return;

    event.preventDefault();

    let color = cell.style.backgroundColor;
    color = color.replace("rgb(", "").replace(")", "");
    color = "#" + color.split(", ").map((value) => parseInt(value).toString(16)).map((value) => value.length == 1 ? "0" + value : value).join("");

    console.log(color);

    if (event.shiftKey) {
        pencolor.backcolor = color;
    } else {
        pencolor.forecolor = color;
    }
}

function loadOtherCanvas(event) {
    let table = event.target;

    while (table.tagName != "TABLE" && table.parentNode) table = table.parentNode;
    if (table.tagName != "TABLE") return;

    let name = table.getAttribute("data-canvasname");
    canvasName.value = name;
    currentPixels = loadCanvas(name);
    redrawCanvas(canvas, currentPixels, canvasPXSize);
}

function displayOtherCanvases() {
    let canvasnames = JSON.parse(localStorage.getItem("canvasnames"));
    if (canvasnames == null) canvasnames = [];

    otherCanvases.innerHTML = "";
    canvasnames.forEach((name) => {
        let table = document.createElement("table");
        table.setAttribute("data-canvasname", name);
        redrawCanvas(table, loadCanvas(name), 5);
        otherCanvases.appendChild(table);
    });
}
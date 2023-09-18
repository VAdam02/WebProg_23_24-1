//document.getElementById("helloWorld").innerHTML = "szia";

addEventListener("load", (event) =>
{
    document.getElementById("username").addEventListener("change", changeText);
    //document.getElementById("username").addEventListener("keypress", changeText);

    increaseCount.addEventListener("change", printIncreasing);

    multiplicationTableNum.addEventListener("change", printMultiplicationTable);

    circleRadius.addEventListener("change", calculateCircle);

    loadImageButton.addEventListener("click", loadImage);

    plus.addEventListener("click", () => count(1));
    minus.addEventListener("click", () => count(-1));

    plus.addEventListener("mousedown", () => startCount(1));
    minus.addEventListener("mousedown", () => startCount(-1));
    plus.addEventListener("mouseup", stopCount);
    minus.addEventListener("mouseup", stopCount);
});

function changeText() {
    let p = document.getElementById("helloWorld");
    let username = document.getElementById("username");

    p.innerHTML = `Hello ${username.value}`;
}

function printIncreasing()
{
    if (!increaseCount.value.match(/^\d+$/)) return;

    let output = "";
    for (let i = 0; i < increaseCount.value; i++)
    {
        output += `<p style="font-size: ${i * 2 + 10}px">Hello</p>`;
    }

    increaseDiv.innerHTML = output;
}

function printMultiplicationTable()
{
    if (!multiplicationTableNum.value.match(/^\d+$/)) return;

    let output = "";

    for (let i = 0; i <= multiplicationTableNum.value; i++)
    {
        output += `<tr>`;
        
        for (let j = 0; j <= multiplicationTableNum.value; j++)
        {
            if (i == 0)
            {
                output += `<td><b>${j}</b></td>`;
            }
            else if (j == 0)
            {
                output += `<td><b>${i}</b></td>`;
            }
            else
            {
                output += `<td>${(i + 1) * (j + 1)}</td>`;
            }
        }

        output += `</tr>`;
    }
    multiplicationTable.innerHTML = output;
}

function calculateCircle()
{
    let radius = circleRadius.value;

    if (!radius.match(/^\d+$/)) return;

    let kerulet = 2 * radius * Math.PI;
    let terulet = radius * radius * Math.PI;

    korKerulet.innerHTML = kerulet;
    korTerulet.innerHTML = terulet;
}

function loadImage()
{
    let url = imageURL.value;

    if (!url.match(/^https?:\/\/.+\.(png|jpg|jpeg|gif)$/i)) return;

    image.src = url;
}

let number = 0;
let interval = null;
let delay = 0;

function count(num)
{
    number += num;
    counter.value = number;
}

function startCount(num)
{
    clearInterval(interval);
    delay = 5;
    interval = setInterval(() => tickCount(num), 100);
}

function stopCount()
{
    clearInterval(interval);
}

function tickCount(n)
{
    if (delay === 0)
    {
        count(n);
    }
    else
    {
        delay--;
    }
}
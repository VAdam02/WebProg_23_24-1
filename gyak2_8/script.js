//document.getElementById("helloWorld").innerHTML = "szia";

addEventListener("load", (event) =>
{
    document.getElementById("username").addEventListener("change", changeText);
    //document.getElementById("username").addEventListener("keypress", changeText);

    increaseCount.addEventListener("change", printIncreasing);

    multiplicationTableNum.addEventListener("change", printMultiplicationTable);
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
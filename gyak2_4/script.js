console.log("Hello, world!");

const helloWorldP = document.getElementById("helloWorld");

helloWorldP.innerHTML = "Hello world!";

helloWorld.innerHTML = "akármi";

helloWorldCount.addEventListener("change", () => printHelloWorld2())

function printHelloWorld2()
{
    console.log("Hello world2");
}

helloWorldCount.addEventListener("change", () => printHelloWorld())

function printHelloWorld()
{
    let n = helloWorldCount.value;

    if (!n.match(/^\d+$/)) return;

    helloWorldNovekvo.innerHTML = "";
    let output = "";

    for (let i = 0; i < n; i++)
    {
        output += `<p style="font-size: ${i * 2 + 10}px">Hello</p>`;
    }
    helloWorldNovekvo.innerHTML = output;
}
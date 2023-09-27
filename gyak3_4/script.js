addEventListener('load', function () {
    console.log(alma);

    akarmi();
});


let korte = () => { return 5; }

function akarmi()
{
    //let korte = korte();
}


///////////////////////////////////

addEventListener('load', function () {

    basicEvent.addEventListener('click', displayEventObj);

    loremIpsum.addEventListener('click', displaySpanContent);
});

function displayEventObj(event)
{
    console.log(event);
}

function displaySpanContent(event)
{
    console.log(event.target.tagName);

    if (event.target.tagName === 'SPAN')
    {
        console.log(event.target.textContent);
    }

    if (event.target.tagName === 'A')
    {
        event.preventDefault();
    }
}

addEventListener('click', disableNotElteLinks)

function disableNotElteLinks(event)
{
    if (event.target.tagName !== 'A') return;

    if (event.target.href.match(/^(https?:\/\/)?([a-zA-Z0-9.]+\.)?elte\.hu(\/.*)?/g) != null) return;


    console.log(event);


    event.preventDefault();

    console.log("Link letiltva");
}


addEventListener('input', keepOnlyNumbersClean);

function keepOnlyNumbersClean(event)
{
    if (event.target.tagName !== 'INPUT') return;

    //console.log(event);
    //console.log(event.target.classList);

    //console.log(Array.from(event.target.classList));

    if (!event.target.classList.contains('onlyNumber')) return;

    console.log(event);

    event.target.value = event.target.value.replace(/[^0-9]/g, '');
}


addEventListener('click', clickStat)

let clickCounter = 0;
let clickDistance = 0;
let lastClick = undefined;
let firstClickTime = undefined;

function clickStat(event)
{
    console.log(event);
    clickCounter++;
    console.log([event.clientX, event.clientY, clickCounter]);

    if (firstClickTime === undefined)
    {
        firstClickTime = event.timeStamp;
    }

    let avgTime = (event.timeStamp-firstClickTime) / clickCounter;

    let avgDistance = 0;
    if (lastClick !== undefined)
    {
        avgDistance = Math.sqrt(Math.pow(event.clientX - lastClick[0], 2) + Math.pow(event.clientY - lastClick[1], 2));
    }

    lastClick = [event.clientX, event.clientY];

    console.log([avgTime, avgDistance]);
    avgClickDistanceBox.value = avgDistance;
    avgClickTimeBox.value = avgTime;    
}

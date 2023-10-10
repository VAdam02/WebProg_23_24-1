addEventListener("click", orderByColumn)
addEventListener("load", () => loadOrdering())

function loadOrdering()
{
    const tables = document.querySelectorAll("table")

    for (const table of tables)
    {
        if (table.id)
        {
            table.setAttribute("orderedBy", localStorage.getItem(table.id))
            orderTable(table)
        }
    }
}

function orderTable(table)
{
    let values = Array.from(table.rows).slice(1).map(row => Array.from(row.cells).map(cell => cell.textContent))
    
    let orderedBy = []
    orderedBy = table.getAttribute("orderedBy")
    orderedBy = orderedBy ? JSON.parse(orderedBy) : [];
    //////////////////////////////

    /*
    NOTE
    rendezés irányának tényét tároljuk el JSONban és maga a rendezés csak egy -1 szorzás az outputon
    */


    Array.from(targyak.querySelector("thead").children[0].children).forEach(element => element.style.backgroundColor = "rgb(255, 255, 255)")
    for (orderByColumnIndex of orderedBy)
    {
        Array.from(table.querySelector("thead").children[0].children)[orderByColumnIndex].style.backgroundColor = "rgb(127, 255, 64)"
    }

    values.sort((a, b) => {

        for (orderByColumnIndex of orderedBy)
        {
            let output = a[orderByColumnIndex].localeCompare(b[orderByColumnIndex])

            if (output != 0) return output
        }
        //orderby
        //console.log([a[orderBy], b[orderBy], output])
        return 0;
    })


    Array.from(table.querySelectorAll("tbody")).forEach(element => table.removeChild(element))

    const tbody = document.createElement("tbody")
    for (const rowVals of values)
    {
        const row = document.createElement("tr")

        for (const cellVal of rowVals)
        {
            const cell = document.createElement("td")
            cell.textContent = cellVal
            row.appendChild(cell)
        }
    
        tbody.appendChild(row);
    }
    table.appendChild(tbody)
}

function orderByColumn(event)
{
    let th = event.target;
    if (th.tagName != "TH") return;


    let table = th;
    while (table.tagName != "TABLE" && table.parentElement)
    {
        table = table.parentElement;
    }
    if (table.tagName != "TABLE") return;

    let orderBy = th.cellIndex
    let orderedBy = []
    if (event.ctrlKey)
    {
        orderedBy = table.getAttribute("orderedBy")
        orderedBy = orderedBy ? JSON.parse(orderedBy) : [];
    }
    orderedBy.push(th.cellIndex)

    console.log(event)
    if (event.ctrlKey && event.shiftKey)
    {
        orderedBy = []
    }

    table.setAttribute("orderedBy", JSON.stringify(orderedBy))
    localStorage.setItem(table.id, JSON.stringify(orderedBy))

    orderTable(table)

}

function addTableRow(form) {
    let tr = document.createElement("tr");

    let subjectName = document.createElement("td");
    subjectName.textContent = form.subjectName.value;
    tr.appendChild(subjectName);

    let subjectCode = document.createElement("td");
    subjectCode.textContent = form.subjectCode.value;
    tr.appendChild(subjectCode);

    let subjectGroupName = document.createElement("td");
    subjectGroupName.textContent = form.subjectGroupName.value;
    tr.appendChild(subjectGroupName);

    let queueNumber = document.createElement("td");
    queueNumber.textContent = "";
    tr.appendChild(queueNumber);

    let recommendedSemester = document.createElement("td");
    recommendedSemester.textContent = form.recommendedSemester.value;
    tr.appendChild(recommendedSemester);

    let credit = document.createElement("td");
    credit.textContent = form.credit.value;
    tr.appendChild(credit);

    let subjectType = document.createElement("td");
    subjectType.textContent = form.subjectType.value;
    tr.appendChild(subjectType);

    let notes = document.createElement("td");
    notes.textContent = form.notes.value;
    tr.appendChild(notes);

    let semesterMin = document.createElement("td");
    semesterMin.textContent = form.semesterMin.value;
    tr.appendChild(semesterMin);

    let semesterMax = document.createElement("td");
    semesterMax.textContent = form.semesterMax.value;
    tr.appendChild(semesterMax);

    let completed = document.createElement("td");
    completed.textContent = form.completed.checked ? "Completed" : "";
    tr.appendChild(completed);

    let enrolled = document.createElement("td");
    enrolled.textContent = form.taken.checked ? "Taken" : "";
    tr.appendChild(enrolled);

    let subjectTake = document.createElement("td");
    subjectTake.textContent = "Felvesz";
    tr.appendChild(subjectTake);

    let tableBody = document.querySelector("table#targyak tbody");
    tableBody.appendChild(tr);
    orderTable(document.querySelector("table#targyak"))

    form.reset();
}
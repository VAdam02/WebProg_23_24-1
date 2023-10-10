addEventListener("click", orderByColumn)

function orderByColumn(event)
{
    let th = event.target;
    if (th.tagName != "TH") return;

    let table = th;
    while (table.tagName != "TABLE" && table.parentElement)
    {
        table = table.parentElement
    }
    if (!table.parentElement) return

    if (!table.id) return

    let orderedBy = []
    if (event.ctrlKey)
    {
        orderedBy = localStorage.getItem(table.id)
        orderedBy = orderedBy ? JSON.parse(orderedBy) : []
    }
    orderedBy.push(th.cellIndex)

    localStorage.setItem(table.id, JSON.stringify(orderedBy))

    //localStorage.setItem(table.id, th.cellIndex)

    //console.log([event, table, th.cellIndex])
    orderTable(table)
}

addEventListener("load", () => {
    let tables = document.querySelectorAll("table")

    for (const table of tables)
    {
        orderTable(table)
    }
})

function orderTable(table)
{
    let values = Array.from(table.rows).slice(1).map(element => Array.from(element.cells).map(cell => cell.textContent))

    if (!table.id) return

    let orderBy = localStorage.getItem(table.id)
    orderBy = orderBy ? JSON.parse(orderBy) : []

    for (const th of table.querySelector('thead').children[0].children)
    {
        if (orderBy.includes(th.cellIndex))
        {
            th.style.backgroundColor = "rgb(127, 64, 255)"
        }
        else
        {
            th.style.backgroundColor = "rgb(255, 255, 255)"
        }
    }

    values.sort((a, b) => {
        //a[orderBy]
        //b[orderBy]
        //return a[orderBy].localeCompare(b[orderBy], "hu", {sensitivity: "base" });
        
        for (const columnID of orderBy)
        {
            let order = a[columnID].localeCompare(b[columnID], "hu", {sensitivity: "base" })
            if (order != 0) return order
        }
        return 0;
    })

    //console.log(values)

    let tbodies = table.querySelectorAll("tbody")
    for (const tbody of tbodies)
    {
        tbody.remove()
    }

    const tbody = document.createElement("tbody")
    for (const rowValues of values)
    {
        const row = document.createElement("tr")

        for (const cellValue of rowValues)
        {
            const cell = document.createElement("td")
            cell.textContent = cellValue
            row.appendChild(cell)
        }
        tbody.appendChild(row)
    }
    table.appendChild(tbody)
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
    orderTable(tableBody.parentElement)

    form.reset();
}
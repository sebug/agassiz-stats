const getStatsEntries = async () => {
    const dataResponse = await fetch('/api/GetStatsTrigger');
    const data = await dataResponse.json();
    return data;
};

const renderTable = (data) => {
    const container = document.querySelector('.table-placeholder');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headingTr = document.createElement('tr');
    const dateTh = document.createElement('th');
    dateTh.innerHTML = 'Date';
    headingTr.appendChild(dateTh);
    const modeTh = document.createElement('th');
    modeTh.innerHTML = 'Mode';
    headingTr.appendChild(modeTh);
    thead.appendChild(headingTr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const row of data) {
        const tr = document.createElement('tr');

        const dateTd = document.createElement('td');
        dateTd.innerHTML = row[0];
        tr.appendChild(dateTd);

        const modeTd = document.createElement('td');
        modeTd.innerHTML = row[1];
        tr.appendChild(modeTd);

        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    container.appendChild(table);
};

getStatsEntries().then(renderTable);
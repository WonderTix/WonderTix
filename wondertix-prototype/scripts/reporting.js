function querySelection(query) {
    document.getElementById("sort-queries").hidden = false;
    const fieldset = document.getElementById("filter-queries");
    fieldset.hidden = false;
    const select = document.getElementById("reporting-select");

    while(fieldset.firstChild && (fieldset.lastChild.id !== "filter-legend"))
        fieldset.removeChild(fieldset.lastChild);

    while(select.firstChild)
        select.removeChild(select.lastChild);

    if(query === "accounts") {
        accountFilters();
        accountSorters();
    }
    else if(query === "contacts") {
        contactFilters();
        contactSorters();
    }
    else if(query === "donations") {
        donationFilters();
        donationSorters();
    }
    else {
        return;
    }
}

function accountFilters() {
    var fieldset = document.getElementById("filter-queries");

    ["Username", "ID"].forEach(i => {
        var input = document.createElement("input");
        input.className = "reporting-filter";
        input.name = i;
        input.type = "text";
        input.placeholder = i + "...";
        fieldset.appendChild(input);
    });
}

function accountSorters() {
    var select = document.getElementById("reporting-select");

    ["Username, Ascending", "Username, Descending", 
    "ID, Ascending", "ID, Descending"]
    .forEach(i => {
        var option = document.createElement("option");
        option.textContent = i;
        option.value = i;
        select.appendChild(option);
    });
}

function contactFilters() {
    var fieldset = document.getElementById("filter-queries");

    ["Name", "Email", "Phone", "Address"].forEach(i => {
        var input = document.createElement("input");
        input.className = "reporting-filter";
        input.name = i;
        input.type = "text";
        input.placeholder = i + "...";
        fieldset.appendChild(input);
    });
};

function contactSorters() {
    var select = document.getElementById("reporting-select");

    ["Name, Ascending", "Name, Descending", 
    "Email, Ascending", "Email, Descending"]
    .forEach(i => {
        var option = document.createElement("option");
        option.textContent = i;
        option.value = i;
        select.appendChild(option);
    });
};

function contactFilters() {
    var fieldset = document.getElementById("filter-queries");

    ["Name", "Email", "Phone", "Address"].forEach(i => {
        var input = document.createElement("input");
        input.className = "reporting-filter";
        input.name = i;
        input.type = "text";
        input.placeholder = i + "...";
        fieldset.appendChild(input);
    });
};

function contactSorters() {
    var select = document.getElementById("reporting-select");

    ["Name, Ascending", "Name, Descending", 
    "Email, Ascending", "Email, Descending"]
    .forEach(i => {
        var option = document.createElement("option");
        option.textContent = i;
        option.value = i;
        select.appendChild(option);
    });
};

function donationFilters() {
    var fieldset = document.getElementById("filter-queries");

    ["Name", "Amount", "Date"].forEach(i => {
        var input = document.createElement("input");
        input.className = "reporting-filter";
        input.name = i;
        input.type = "text";
        input.placeholder = i + "...";
        fieldset.appendChild(input);
    });
};

function donationSorters() {
    var select = document.getElementById("reporting-select");

    ["Name, Ascending", "Name, Descending", 
    "Amount, Ascending", "Amount, Descending",
    "Date, Most Recent", "Date, Longest Ago"]
    .forEach(i => {
        var option = document.createElement("option");
        option.textContent = i;
        option.value = i;
        select.appendChild(option);
    });
};

function runButton() {
    const container = document.getElementById("reporting-table-container");

    while(container.firstChild)
        container.removeChild(container.firstChild);


    const table = document.createElement("table");
    table.className = "reporting-table";
    const tr1 = document.createElement("tr");
    table.appendChild(tr1);
    const tr2 = document.createElement("tr");
    table.appendChild(tr2);

    ["Name", "Email", "Phone", "Address"].forEach(i => {
        const th = document.createElement("th");
        th.innerText = i;
        tr1.appendChild(th);
    });

    ["Shane McBroom", "mcbroom@pdx.edu", "(503) 332-8057", "Portland, OR 97229"].forEach(i => {
        const td = document.createElement("td");

        if(i === "Shane McBroom") {
            var a = document.createElement("a");
            a.innerText = i;
            a.href = "./contacts.html";
            a.style.textDecoration = "none";
            td.appendChild(a);
        }
        else
            td.innerText = i;

        tr2.appendChild(td);
    });

    container.appendChild(table);
}
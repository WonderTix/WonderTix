function querySelection(query) {
  document.getElementById("sort-queries").hidden = false;
  const fieldset = document.getElementById("filter-queries");
  fieldset.hidden = false;
  const select = document.getElementById("sort-select");

  while (fieldset.firstChild && fieldset.lastChild.id !== "filter-legend")
    fieldset.removeChild(fieldset.lastChild);

  while (select.firstChild) select.removeChild(select.lastChild);

  if (query === "accounts") {
    accountFilters();
    accountSorters();
  } else if (query === "contacts") {
    contactFilters();
    contactSorters();
  } else if (query === "donations") {
    donationFilters();
    donationSorters();
  } else {
    return;
  }
}

function accountFilters() {
  var fieldset = document.getElementById("filter-queries");

  ["Username", "ID"].forEach((i) => {
    var input = document.createElement("input");
    input.className = "reporting-filter";
    input.name = i;
    input.type = "text";
    input.placeholder = i + "...";
    fieldset.appendChild(input);
  });
}

function accountSorters() {
  var select = document.getElementById("sort-select");

  [
    "Username, Ascending",
    "Username, Descending",
    "ID, Ascending",
    "ID, Descending",
  ].forEach((i) => {
    var option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    select.appendChild(option);
  });
}

function contactFilters() {
  var fieldset = document.getElementById("filter-queries");

  ["Name", "Email", "Phone", "Address"].forEach((i) => {
    var input = document.createElement("input");
    input.className = "reporting-filter";
    input.name = i;
    input.type = "text";
    input.placeholder = i + "...";
    fieldset.appendChild(input);
  });
}

function contactSorters() {
  var select = document.getElementById("sort-select");

  [
    "Name, Ascending",
    "Name, Descending",
    "Email, Ascending",
    "Email, Descending",
  ].forEach((i) => {
    var option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    select.appendChild(option);
  });
}

function contactFilters() {
  var fieldset = document.getElementById("filter-queries");

  ["Name", "Email", "Phone", "Address"].forEach((i) => {
    var input = document.createElement("input");
    input.className = "reporting-filter";
    input.name = i;
    input.type = "text";
    input.placeholder = i + "...";
    fieldset.appendChild(input);
  });
}

function contactSorters() {
  var select = document.getElementById("sort-select");

  [
    "Name, Ascending",
    "Name, Descending",
    "Email, Ascending",
    "Email, Descending",
  ].forEach((i) => {
    var option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    select.appendChild(option);
  });
}

function donationFilters() {
  var fieldset = document.getElementById("filter-queries");

  ["Name", "Amount", "Date"].forEach((i) => {
    var input = document.createElement("input");
    input.className = "reporting-filter";
    input.name = i;
    input.type = "text";
    input.placeholder = i + "...";
    fieldset.appendChild(input);
  });
}

function donationSorters() {
  var select = document.getElementById("sort-select");

  [
    "Name, Ascending",
    "Name, Descending",
    "Amount, Ascending",
    "Amount, Descending",
    "Date, Most Recent",
    "Date, Longest Ago",
  ].forEach((i) => {
    var option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    select.appendChild(option);
  });
}

function runButton() {
  const container = document.getElementById("reporting-table-container");

  while (container.firstChild) container.removeChild(container.firstChild);

  const table = document.createElement("table");
  table.className = "reporting-table";
  const headerRow = document.createElement("tr");
  table.appendChild(headerRow);

  ["Name", "Email", "Phone", "Address", "Newsletter", "VIP"].forEach((i) => {
    const headers = document.createElement("th");
    headers.innerText = i;
    headerRow.appendChild(headers);
  });

  const unordered = [
    {
      name: "Allen Golan",
      email: "agolan@pdx.edu",
      phone: "(503) 555-5555",
      address: "Portland, OR 97229",
      newsletter: "Y",
      vip: "Y",
    },
    {
      name: "Shane McBroom",
      email: "mcbroom@pdx.edu",
      phone: "(503) 555-5555",
      address: "Portland, OR 97229",
      newsletter: "Y",
      vip: "Y",
    },
    {
      name: "Tony Le",
      email: "tony24@pdx.edu",
      phone: "(503) 555-5555",
      address: "Portland, OR 97229",
      newsletter: "Y",
      vip: "Y",
    },
    {
      name: "Jesse Emerson",
      email: "jemerson@pdx.edu",
      phone: "(503) 555-5555",
      address: "Portland, OR 97229",
      newsletter: "Y",
      vip: "Y",
    },
    {
      name: "Adam Shih",
      email: "ashih@pdx.edu",
      phone: "(503) 555-5555",
      address: "Portland, OR 97229",
      newsletter: "Y",
      vip: "Y",
    },
    {
      name: "Arman Alavizadeh",
      email: "arman5@pdx.edu",
      phone: "(503) 555-5555",
      address: "Portland, OR 97229",
      newsletter: "Y",
      vip: "Y",
    },
    {
      name: "Daniel Mendez",
      email: "mendez5@pdx.edu",
      phone: "(503) 555-5555",
      address: "Portland, OR 97229",
      newsletter: "Y",
      vip: "Y",
    },
  ];

  var rows = unordered.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  for (var i = 0; i < rows.length; i++) {
    let row = document.createElement("tr");

    var person = rows[i];

    for (var data in person) {
      let cell = document.createElement("td");

      if (data == "name") {
        let a = document.createElement("a");

        if (person[data] === "Shane McBroom") a.href = "./contacts.html";
        else a.href = "#";

        a.innerText = person[data];
        cell.append(a);
      } else {
        cell.innerText = person[data];
      }

      row.append(cell);
    }

    table.appendChild(row);
  }

  container.appendChild(table);
  const p = document.createElement("p");
  p.innerText = rows.length + " results returned.";
  container.append(p);
}

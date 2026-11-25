let names = [];
let selectedIndex = -1;

async function getNames() {
    try {
        let res = await fetch('nimet.json');
        names = await res.json();

        console.log(names);
    } catch (error) {
        console.log(error);
    }
}


function searchNames(searchText) {
    let searchResults = document.getElementById("searchResults");

    searchResults.innerHTML = "";
    selectedIndex = -1;
    console.log("Searching for:", searchText);

    if (searchText.trim() === "") {
        return;
    }

    let filteredNames = names.filter(name =>
        name.toLowerCase().startsWith(searchText.toLowerCase())
    );

    filteredNames.forEach((name, index) => {
        let result = document.createElement("div");

        result.className = "searchResult";
        result.textContent = name;

        result.addEventListener("click", function() {
            selectName(name);
        });

        searchResults.appendChild(result);
    });
}

function selectName(name) {
    let searchInput = document.getElementById("searchInput");
    let searchResults = document.getElementById("searchResults");

    searchInput.value = name;
    searchResults.innerHTML = "";
    selectedIndex = -1;
}

function updateSelection() {
    let results = document.querySelectorAll(".searchResult");

    results.forEach((result, index) => {
        if (index === selectedIndex) {
            result.classList.add("active");
        } else {
            result.classList.remove("active");
        }
    });
}

document.getElementById("searchInput").addEventListener("keyup", function(event) {
    let searchInput = document.getElementById("searchInput");
    let results = document.querySelectorAll(".searchResult");

    if (event.key === "ArrowDown") {
        event.preventDefault();

        if (results.length > 0) {
            selectedIndex++;

            if (selectedIndex >= results.length) {
                selectedIndex = 0;
            }

            updateSelection();
        }
    }

    else if (event.key === "ArrowUp") {
        event.preventDefault();

        if (results.length > 0) {
            selectedIndex--;

            if (selectedIndex < 0) {
                selectedIndex = results.length - 1;
            }

            updateSelection();
        }
    }

    else if (event.key === "Enter") {
        event.preventDefault();

        if (selectedIndex >= 0 && results[selectedIndex]) {
            selectName(results[selectedIndex].textContent);
        } else {
            searchInput.value = "";
            document.getElementById("searchResults").innerHTML = "";
            selectedIndex = -1;
        }
    }

    else if (event.key === "Escape") {
        searchInput.value = "";
        document.getElementById("searchResults").innerHTML = "";
        selectedIndex = -1;
    }

    else {
        searchNames(searchInput.value);
    }
});

getNames();
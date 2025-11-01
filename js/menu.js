const url = "http://localhost:3000/menu";
const masterdata = [];

const tableBody = document.getElementById("menuTableBody");
const categorySelect = document.getElementById("categorySelect");

//fetching menu details
async function fetchMenu() {
  await axios
    .get(url)
    .then((resp) => {
      masterdata.push(...resp.data);
      displayData(masterdata);
    })
    .catch((err) => {
      alert(err);
    });
}

//function to display data
function displayData(data) {
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = `<tr>
        <td>${item.itemName}</td>
        <td>${item.price}</td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}

//function to filter menu by category
function filterMenu() {
  const selectedCategory = categorySelect.value;

  if (selectedCategory === "all") {
    displayData(masterdata);
  } else {
    const filtered = masterdata.filter((item) => {
      return item.category === selectedCategory;
    });
    displayData(filtered);
  }
}

//eventlistener to track the change in dropdown
categorySelect.addEventListener("change", filterMenu);

fetchMenu();

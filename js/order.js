// Write JS code to dynamically add order form fields
// Write JS function to submit and persist the order details using Axios API

const form = document.querySelector("form");
const addItemsBtn = document.querySelector(".add-btn");
const orderTableBody = document.querySelector(".order-table tbody");

addItemsBtn.addEventListener("click", () => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" placeholder="Category" required /></td>
    <td><input type="text" placeholder="Item" required /></td>
    <td><input type="number" placeholder="Price" required /></td>
    <td><input type="number" placeholder="Qty" required /></td>
    <td class="itemSubtotal">0</td>
    <td><button type="button" class="addMenuBtn">Add</button></td>
  `;
  orderTableBody.appendChild(row);

  row.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      const price = row.querySelector('[placeholder="Price"]').value || 0;
      const quantity = row.querySelector('[placeholder="Qty"]').value || 0;
      row.querySelector(".itemSubtotal").textContent = (
        price * quantity
      ).toFixed(2);
      updateTotal();
    });
  });
});

function updateTotal() {
  let totalAmount = 0;
  document.querySelectorAll(".itemSubtotal").forEach((cell) => {
    totalAmount += parseFloat(cell.textContent) || 0;
  });
  form.total.value = totalAmount;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const orderDetails = {
    id: form.id.value,
    name: form.name.value,
    email: form.email.value,
    contact: form.contact.value,
    address: form.address.value,
    total: form.total.value,
  };

  try {
    await axios.post("http://localhost:3001/order", orderDetails);
    alert(`
✅ Order Placed Successfully!

🧾 Order Details:
ID: ${orderDetails.id}
Name: ${orderDetails.name}
Email: ${orderDetails.email}
Contact: ${orderDetails.contact}
Address: ${orderDetails.address}
Total: ₹${orderDetails.total}
    `);
    form.reset();
    orderTableBody.innerHTML = "";
  } catch (err) {
    alert("❌ Failed to save order. Please try again.");
    console.error(err);
  }
});

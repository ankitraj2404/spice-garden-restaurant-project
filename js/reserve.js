const form = document.querySelector("form");
const reserveurl = "http://localhost:3002/reservations";

if (!form) {
  console.error("Form not found!");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const date = form.bookingDate.value;
  const time = form.bookingTime.value;

  const reservationDetail = { name, email, phone, date, time };

  if (name.length < 5) {
    alert("Name must be at least 5 characters long.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Phone number should contain exactly 10 digits");
    return;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email address");
  }

  try {
    const resp = await axios.post(reserveurl, reservationDetail);
    alert("Reservation added successfully!");
    form.reset();
  } catch (error) {
    console.error("Error sending data:", error);
    alert("Failed to send reservation!");
  }
});

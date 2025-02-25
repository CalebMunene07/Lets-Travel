fetch("https://lets-travel-x4bn.onrender.com/reservation")
   .then(response => response.json())
   .then(data => {
       console.log("Fetched Data:", data); // Debugging

       const tableBody = document.getElementById("reservations-table-body");

       if (!tableBody) {
           console.error("Table body not found!");
           return;
       }

       tableBody.innerHTML = ""; // Clear previous content

       data.forEach(reservation => {
           const row = document.createElement("tr");
           row.innerHTML = `
               <td>${reservation.id_passport}</td>
               <td>${reservation.full_name}</td>
               <td>${reservation.email}</td>
               <td>${reservation.phone}</td>
               <td>${reservation.date}</td>
               <td>${reservation.seat}</td>
               <td>${reservation.payment}</td>
           `;
           tableBody.appendChild(row);
       });
   })
   .catch(error => console.error("Error fetching reservations:", error));

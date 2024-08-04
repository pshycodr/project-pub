document.addEventListener("DOMContentLoaded", () => {
    const addSubButton = document.querySelector(".add_sub_button");
    const subNameInput = document.querySelector(".add_sub_input");
    const subjectCardSec = document.querySelector(".sub_card_section");
    const subjectFilter = document.querySelector("#subject_filter");
    const attendanceTable = document.querySelector("#attendance_table");
  
    let allData = JSON.parse(localStorage.getItem("data")) || {};
    let attendance_dates = JSON.parse(localStorage.getItem("attendance_dates")) || [];
  
    console.log(attendance_dates);
    console.log(allData);
  
    addSubButton.addEventListener("click", () => {
      const subName = subNameInput.value.trim();
      if (!subName) {
        alert("Please enter a subject name.");
        return;
      }
  
      if (allData[subName]) {
        alert("Subject already exists");
      } else {
        allData[subName] = {
          total_attendance: 0,
        };
        localStorage.setItem("data", JSON.stringify(allData));
        subNameInput.value = "";
        addSingleCard(subName);
      }
    });
  
    function addCard() {
        subjectCardSec.innerHTML = ""
      let subjects = Object.keys(allData);
      subjects.forEach((sub) => {
        addOption(sub);
        addSingleCard(sub);
      });
    }
  
    function addOption(sub) {
      const option = document.createElement("option");
      option.value = sub;
      option.text = sub;
      subjectFilter.appendChild(option);
    }
  
    function addSingleCard(sub) {
      const card = document.createElement("div");
      card.classList.add("sub_card");
      card.innerHTML = `
        <div class="sub_logo_sec">
          <p class="card_logo">${sub[0]}</p>
        </div>
        <div class="card_sub_name_sec">
          <p class="card_sub_name">${sub}</p>
        </div>
        <div class="card_attendance_count_sec">
          <p class="card_attendance_count">${allData[sub].total_attendance}</p>
        </div>
        <div class="card_attendance_count_sec">
          <button class="add_attendance">Add</button>
          <button class="remove_attendance">Remove</button>
        </div>
      `;
  
      subjectCardSec.appendChild(card);
  
      const addButton = card.querySelector(".add_attendance");
      const removeButton = card.querySelector(".remove_attendance");
      const attendanceCount = card.querySelector(".card_attendance_count");
  
      addButton.addEventListener("click", () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
  
        allData[sub].total_attendance += 1;
  
        const attendanceDate = {
          sub,
          date: formattedDate,
        };
        attendance_dates.unshift(attendanceDate);
  
        localStorage.setItem("attendance_dates", JSON.stringify(attendance_dates));
        addAttendanceTable();
        attendanceCount.textContent = allData[sub].total_attendance;
        localStorage.setItem("data", JSON.stringify(allData));
      });
  
      removeButton.addEventListener("click", () => {
        if (allData[sub].total_attendance > 0) {
          allData[sub].total_attendance -= 1;
  
          attendance_dates = attendance_dates.filter((entry) => entry.sub !== sub);
          localStorage.setItem("attendance_dates", JSON.stringify(attendance_dates));
          addAttendanceTable();
          attendanceCount.textContent = allData[sub].total_attendance;
          localStorage.setItem("data", JSON.stringify(allData));
        }
      });
    }
  
    window.addAttendanceTable = function (sub = "all") {
      attendanceTable.innerHTML = ""; // Clear existing rows
      const allAttendance = sub === "all" ? attendance_dates : attendance_dates.filter((entry) => entry.sub === sub);
  
      allAttendance.forEach((entry, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${entry.sub}</td>
          <td>${entry.date}</td>
          <td>
            <button id="delete_entry_button" onclick="removeEntry(${index},'${sub}', '${entry.sub}')">
              <img id="delete_img" src="delete.png">
            </button>
          </td>
        `;
        attendanceTable.appendChild(newRow);
      });
    };
  
    window.removeEntry = function (index, sub, key) {
      if (index >= 0 && index < attendance_dates.length) {
        attendance_dates.splice(index, 1);
        localStorage.setItem("attendance_dates", JSON.stringify(attendance_dates));
        allData[key].total_attendance -= 1;
        addCard();
        addAttendanceTable(sub);
      }
    };
  
    addCard();
    addAttendanceTable();
  
    // Uncomment the line below if you want to clear the local storage
    // localStorage.clear();



    window.distroy = function(){
        localStorage.clear();
        location.reload();
    }
  });
  
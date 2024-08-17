document.addEventListener("DOMContentLoaded", () => {
  const addSubButton = document.querySelector(".add_sub_button");
  const subNameInput = document.querySelector(".add_sub_input");
  const subjectCardSec = document.querySelector(".sub_card_section");
  const subjectFilter = document.querySelector("#subject_filter");
  const attendanceTable = document.querySelector("#attendance_table");
  

  let allData = JSON.parse(localStorage.getItem("data")) || {};
  let attendance_dates = JSON.parse(localStorage.getItem("attendance_dates")) || [];

  initialize();

  addSubButton.addEventListener("click", handleAddSubject);

  function initialize() {
    renderSubjectCards();
    renderAttendanceTable();
  }

  function handleAddSubject() {
    const subName = subNameInput.value.trim();
    if (!subName) {
      alert("Please enter a subject name.");
      return;
    }

    if (allData[subName]) {
      alert("Subject already exists");
    } else {
      addSubject(subName);
    }
  }

  function addSubject(subName) {
    allData[subName] = { total_attendance: 0 };
    localStorage.setItem("data", JSON.stringify(allData));
    subNameInput.value = "";
    addSubjectCard(subName);
    addSubjectOption(subName);
  }

  function renderSubjectCards() {
    subjectCardSec.innerHTML = "";
    Object.keys(allData).forEach((sub) => {
      addSubjectOption(sub);
      addSubjectCard(sub);
    });
  }

  function addSubjectOption(sub) {
    const option = document.createElement("option");
    option.value = sub;
    option.text = sub;
    subjectFilter.appendChild(option);
  }

  function addSubjectCard(sub) {
    const card = createCardElement(sub);
    subjectCardSec.appendChild(card);

    const addButton = card.querySelector(".add_attendance");
    const removeButton = card.querySelector(".remove_attendance");
    const attendanceCount = card.querySelector(".card_attendance_count");

    addButton.addEventListener("click", () => changeAttendance(sub, attendanceCount, 1));
    removeButton.addEventListener("click", () => changeAttendance(sub, attendanceCount, -1));
  }

  function createCardElement(sub) {
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
    return card;
  }

  function changeAttendance(sub, attendanceCount, change) {
    if (change > 0) {
      addAttendanceEntry(sub);
    } else if (change < 0 && allData[sub].total_attendance > 0) {
      removeLastAttendanceEntry(sub);
    }
    attendanceCount.textContent = allData[sub].total_attendance;
    localStorage.setItem("data", JSON.stringify(allData));
    renderAttendanceTable();
  }

  function addAttendanceEntry(sub) {
    const currentDate = new Date().toISOString().split("T")[0];
    allData[sub].total_attendance += 1;
    attendance_dates.unshift({ sub, date: currentDate });
    localStorage.setItem("attendance_dates", JSON.stringify(attendance_dates));
  }

  function removeLastAttendanceEntry(sub) {
    allData[sub].total_attendance -= 1;
    for (let i = attendance_dates.length - 1; i >= 0; i--) {
      if (attendance_dates[i].sub === sub) {
        attendance_dates.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("attendance_dates", JSON.stringify(attendance_dates));
  }

  function renderAttendanceTable(sub = "all") {
    attendanceTable.innerHTML = "";
    const filteredAttendance = sub === "all" ? attendance_dates : attendance_dates.filter((entry) => entry.sub === sub);
    console.log(filteredAttendance);
    filteredAttendance.forEach((entry, index) => {
      const newRow = createAttendanceRow(entry, index, sub);
      attendanceTable.appendChild(newRow);
    });
  }

  function createAttendanceRow(entry, index, sub) {
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
    return newRow;
  }

  window.removeEntry = function (index, sub, key) {
    if (index >= 0 && index < attendance_dates.length) {
      attendance_dates.splice(index, 1);
      localStorage.setItem("attendance_dates", JSON.stringify(attendance_dates));
      allData[key].total_attendance -= 1;
      renderSubjectCards();
      renderAttendanceTable(sub);
    }
  };

  subjectFilter.addEventListener("change", function () {
    renderAttendanceTable(this.value);
  });

  window.distroy = function () {
    localStorage.clear();
    location.reload();
  };
}); 

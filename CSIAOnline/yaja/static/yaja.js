apiURL = "https://csiatech.kr/";

function getSelectedValue(dropdownId) {
  let dropdown = document.getElementById(dropdownId);
  let selectedValue = dropdown.options[dropdown.selectedIndex].value;
  if (selectedValue === "기타") {
    let inputField = document.getElementById(`${dropdownId}-input`);
    return inputField.value;
  } else {
    return selectedValue;
  }
}

function getSelectedValues() {
  const periods = ["period1", "period2", "period3"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday"];
  const values = {};
  days.forEach((day) => {
    values[day] = {};
    periods.forEach((period) => {
      const selectId = `${period}-${day}`;
      values[day][period] = getSelectedValue(selectId);
    });
  });
  return values;
}

function validateScheduleValues(updatedValues) {
  // Define acceptable values
  const acceptableValues = ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"];

  // Check if all selected values for each day and period are acceptable
  for (const day in updatedValues) {
    for (const period in updatedValues[day]) {
      const value = updatedValues[day][period];
      if (!acceptableValues.includes(value)) {
        alert(
          `Invalid value "${value}" selected for ${day} ${period}. Please select a valid option.`
        );
        return false; // Return false if any value is invalid
      }
    }
  }
  return true; // All values are valid
}

function getCSRFToken() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('csrftoken=')) {
          return cookie.substring('csrftoken='.length, cookie.length);
      }
  }
  return null;
}

function updateWeekSchedule() {
  let updatedValues = getSelectedValues();

  // Validate the selected schedule values before proceeding
  if (!validateScheduleValues(updatedValues)) {
    return; // Stop execution if validation fails
  }

  console.log(updatedValues);

  fetch(apiURL + "yaja/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'X-CSRFToken': getCSRFToken(), 
    },
    body: JSON.stringify(updatedValues),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        alert("Successfully changed this week's schedule!");
        retrieveCurrentSchedule();
        window.location.reload();
      } else {
        console.error("Error in updateWeekSchedule: Unexpected response", data);
      }
    })
    .catch((error) => {
      console.error("Error in updateWeekSchedule:", error);
    });
}

function retrieveCurrentSchedule() {
  console.log("Sending GET request to:", apiURL + "yaja/");

  fetch(apiURL + "yaja/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Schedule-Type": "current",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Received response:", data);
      if (data.action === "retrieve") {
        console.log("GET request responded");
        updateUIWithSchedule(data);
      }
    })
    .catch((error) => {
      console.error("Error in retrieveCurrentSchedule:", error);
      alert(
        "Failed to load the current schedule. Please refresh the page and try again."
      );
    });
}

function updateUIWithSchedule(data) {
  const days = ["monday", "tuesday", "wednesday", "thursday"];
  const periods = ["period1", "period2", "period3"];

  days.forEach((day) => {
    periods.forEach((period) => {
      const selectId = `${period}-${
        day.charAt(0).toUpperCase() + day.slice(1)
      }`;
      const selectElement = document.getElementById(selectId);
      const inputId = `${selectId}-input`;
      const inputElement = document.getElementById(inputId);
      const value = data[day][period];

      if (["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(value)) {
        selectElement.value = value;
        inputElement.style.display = "none"; // Hide input field
      } else {
        selectElement.value = "기타"; // Set to 'Others'
        inputElement.style.display = "block"; // Show input field
        inputElement.value = value; // Set custom value
      }
    });
  });
}

document.querySelectorAll(".period-select").forEach((select) => {
  select.addEventListener("change", function () {
    const customInputId = `${this.id}-input`;
    const customInput = document.getElementById(customInputId);

    if (this.value === "기타") {
      customInput.style.display = "block";
    } else {
      customInput.style.display = "none";
    }

    const day = this.id.split("-")[1];
    const period = this.id.split("-")[0];

    const period1 = document.getElementById(`period1-${day}`);
    const period2 = document.getElementById(`period2-${day}`);
    const period3 = document.getElementById(`period3-${day}`);

    if (this.value === "조퇴") {
      if (period1.value !== "외출/현체") period1.value = "조퇴";
      if (period2.value !== "외출/현체") period2.value = "조퇴";
      if (period3.value !== "외출/현체") period3.value = "조퇴";

      document.getElementById(`period1-${day}-input`).style.display = "none";
      document.getElementById(`period2-${day}-input`).style.display = "none";
      document.getElementById(`period3-${day}-input`).style.display = "none";
    } else if (this.value !== "외출/현체") {
      if (period1.value === "조퇴" && period !== "period1") {
        period1.value = "야자";
        document.getElementById(`period1-${day}-input`).style.display = "none";
      }
      if (period2.value === "조퇴" && period !== "period2") {
        period2.value = "야자";
        document.getElementById(`period2-${day}-input`).style.display = "none";
      }
      if (period3.value === "조퇴" && period !== "period3") {
        period3.value = "야자";
        document.getElementById(`period3-${day}-input`).style.display = "none";
      }
    }
  });
});

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", (event) => {
  retrieveCurrentSchedule();
});

document
  .getElementById("weekForm")
  .addEventListener("submit", function (event) {
    console.log("clickeeed the submit for today button");
    event.preventDefault();
    updateWeekSchedule();
  });

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    const value = link.getAttribute("value");
    if (value) {
      window.location.href = apiURL + value;
    }
  });
});

document.querySelectorAll(".navbar-brand").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    const value = link.getAttribute("value");
    if (value) {
      window.location.href = apiURL + value;
    }
  });
});

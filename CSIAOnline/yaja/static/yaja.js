// Function to update the entire schedule
// Function to get the selected value of a dropdown

apiURL = "https://csiatech.kr/";

function getSelectedValue(dropdownId) {
  let dropdown = document.getElementById(dropdownId);
  let selectedValue = dropdown.options[dropdown.selectedIndex].value;

  // Check if the selected value is "others"
  if (selectedValue === "기타") {
    // If "others" is selected, get the value from the input field
    let inputField = document.getElementById(`${dropdownId}-input`);
    return inputField.value;
  } else {
    // If not, return the selected option value
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

function updateDefaultSchedule() {
  // Retrieve selected values from the
  let selectedValues = {};

  // Loop through each day and period to get selected values
  ["Monday", "Tuesday", "Wednesday", "Thursday"].forEach((day) => {
    selectedValues[day] = {};
    for (let period_num = 1; period_num <= 3; period_num++) {
      let periodId = `default-period${period_num}-${day}`;
      selectedValues[day][`period${period_num}`] = getSelectedValue(periodId);
    }
  });

  console.log(selectedValues);

  // Make the request to the backend API to update the entire schedule
  fetch(apiURL + "yaja/", {
    method: "POST", // Assuming it's always a POST request for updating the entire schedule
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectedValues),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.student_id);
      if (data.status === "echo") {
        alert("Successfully changed Default schedule!");
        retrieveDefaultSchedule();
        window.location.reload(); // Reload the page after successful update
      } else {
        console.error(
          "Error in updateDefaultSchedule: Unexpected response",
          data
        );
      }
    })
    .catch((error) => {
      console.error("Error in updateDefaultSchedule:", error);
    });
}

function retrieveDefaultSchedule() {
  console.log("Sending GET request to:", apiURL + "yaja");
  fetch(apiURL + "yaja/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Schedule-Type": "default",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Received response:", data);
      if (data.action === "retrieve") {
        console.log("GET request responded");
        const selectIdMonday1 = "default-period1-Monday";
        const selectElementMonday1 = document.getElementById(selectIdMonday1);
        const inputIdMonday1 = `${selectIdMonday1}-input`;
        const inputElementMonday1 = document.getElementById(inputIdMonday1);

        const selectIdTuesday1 = "default-period1-Tuesday";
        const selectElementTuesday1 = document.getElementById(selectIdTuesday1);
        const inputIdTuesday1 = `${selectIdTuesday1}-input`;
        const inputElementTuesday1 = document.getElementById(inputIdTuesday1);

        const selectIdWednesday1 = "default-period1-Wednesday";
        const selectElementWednesday1 = document.getElementById(selectIdWednesday1);
        const inputIdWednesday1 = `${selectIdWednesday1}-input`;
        const inputElementWednesday1 = document.getElementById(inputIdWednesday1);

        const selectIdThursday1 = "default-period1-Thursday";
        const selectElementThursday1 = document.getElementById(selectIdThursday1);
        const inputIdThursday1 = `${selectIdThursday1}-input`;
        const inputElementThursday1 = document.getElementById(inputIdThursday1);

        const selectIdMonday2 = "default-period2-Monday";
        const selectElementMonday2 = document.getElementById(selectIdMonday2);
        const inputIdMonday2 = `${selectIdMonday2}-input`;
        const inputElementMonday2 = document.getElementById(inputIdMonday2);

        const selectIdTuesday2 = "default-period2-Tuesday";
        const selectElementTuesday2 = document.getElementById(selectIdTuesday2);
        const inputIdTuesday2 = `${selectIdTuesday2}-input`;
        const inputElementTuesday2 = document.getElementById(inputIdTuesday2);

        const selectIdWednesday2 = "default-period2-Wednesday";
        const selectElementWednesday2 = document.getElementById(selectIdWednesday2);
        const inputIdWednesday2 = `${selectIdWednesday2}-input`;
        const inputElementWednesday2 = document.getElementById(inputIdWednesday2);

        const selectIdThursday2 = "default-period2-Thursday";
        const selectElementThursday2 = document.getElementById(selectIdThursday2);
        const inputIdThursday2 = `${selectIdThursday2}-input`;
        const inputElementThursday2 = document.getElementById(inputIdThursday2);

        const selectIdMonday3 = "default-period3-Monday";
        const selectElementMonday3 = document.getElementById(selectIdMonday3);
        const inputIdMonday3 = `${selectIdMonday3}-input`;
        const inputElementMonday3 = document.getElementById(inputIdMonday3);

        const selectIdTuesday3 = "default-period3-Tuesday";
        const selectElementTuesday3 = document.getElementById(selectIdTuesday3);
        const inputIdTuesday3 = `${selectIdTuesday3}-input`;
        const inputElementTuesday3 = document.getElementById(inputIdTuesday3);

        const selectIdWednesday3 = "default-period3-Wednesday";
        const selectElementWednesday3 = document.getElementById(selectIdWednesday3);
        const inputIdWednesday3 = `${selectIdWednesday3}-input`;
        const inputElementWednesday3 = document.getElementById(inputIdWednesday3);

        const selectIdThursday3 = "default-period3-Thursday";
        const selectElementThursday3 = document.getElementById(selectIdThursday3);
        const inputIdThursday3 = `${selectIdThursday3}-input`;
        const inputElementThursday3 = document.getElementById(inputIdThursday3);

        const valueMonday1 = data.monday.period1;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueMonday1
          )
        ) {
          selectElementMonday1.value = valueMonday1;
        } else {
          selectElementMonday1.value = "기타";
          inputElementMonday1.style.display = "block";
          inputElementMonday1.value = valueMonday1;
        }

        const valueTuesday1 = data.tuesday.period1;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueTuesday1
          )
        ) {
          selectElementTuesday1.value = valueTuesday1;
        } else {
          selectElementTuesday1.value = "기타";
          inputElementTuesday1.style.display = "block";
          inputElementTuesday1.value = valueTuesday1;
        }

        const valueWednesday1 = data.wednesday.period1;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueWednesday1
          )
        ) {
          selectElementWednesday1.value = valueWednesday1;
        } else {
          selectElementWednesday1.value = "기타";
          inputElementWednesday1.style.display = "block";
          inputElementWednesday1.value = valueWednesday1;
        }

        const valueThursday1 = data.thursday.period1;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueThursday1
          )
        ) {
          selectElementThursday1.value = valueThursday1;
        } else {
          selectElementThursday1.value = "기타";
          inputElementThursday1.style.display = "block";
          inputElementThursday1.value = valueThursday1;
        }

        const valueMonday2 = data.monday.period2;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueMonday2
          )
        ) {
          selectElementMonday2.value = valueMonday2;
        } else {
          selectElementMonday2.value = "기타";
          inputElementMonday2.style.display = "block";
          inputElementMonday2.value = valueMonday2;
        }

        const valueTuesday2 = data.tuesday.period2;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueTuesday2
          )
        ) {
          selectElementTuesday2.value = valueTuesday2;
        } else {
          selectElementTuesday2.value = "기타";
          inputElementTuesday2.style.display = "block";
          inputElementTuesday2.value = valueTuesday2;
        }
        const valueWednesday2 = data.wednesday.period2;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueWednesday2
          )
        ) {
          selectElementWednesday2.value = valueWednesday2;
        } else {
          selectElementWednesday2.value = "기타";
          inputElementWednesday2.style.display = "block";
          inputElementWednesday2.value = valueWednesday2;
        }

        const valueThursday2 = data.thursday.period2;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueThursday2
          )
        ) {
          selectElementThursday2.value = valueThursday2;
        } else {
          selectElementThursday2.value = "기타";
          inputElementThursday2.style.display = "block";
          inputElementThursday2.value = valueThursday2;
        }

        const valueMonday3 = data.monday.period3;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueMonday3
          )
        ) {
          selectElementMonday3.value = valueMonday3;
        } else {
          selectElementMonday3.value = "기타";
          inputElementMonday3.style.display = "block";
          inputElementMonday3.value = valueMonday3;
        }

        const valueTuesday3 = data.tuesday.period3;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueTuesday3
          )
        ) {
          selectElementTuesday3.value = valueTuesday3;
        } else {
          selectElementTuesday3.value = "기타";
          inputElementTuesday3.style.display = "block";
          inputElementTuesday3.value = valueTuesday3;
        }

        const valueWednesday3 = data.wednesday.period3;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueWednesday3
          )
        ) {
          selectElementWednesday3.value = valueWednesday3;
        } else {
          selectElementWednesday3.value = "기타";
          inputElementWednesday3.style.display = "block";
          inputElementWednesday3.value = valueWednesday3;
        }

        const valueThursday3 = data.thursday.period3;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueThursday3
          )
        ) {
          selectElementThursday3.value = valueThursday3;
        } else {
          selectElementThursday3.value = "기타";
          inputElementThursday3.style.display = "block";
          inputElementThursday3.value = valueThursday3;
        }
      }
    })
    .catch((error) => {
      console.error("Error in retrieveDefaultSchedule:", error);
    });
}

// Function to update today's schedule
function updateWeekSchedule() {
  // Retrieve selected values from the inputs for Monday to Thursday
  let updatedValues = getSelectedValues();

  console.log(updatedValues);

  // Make the request to the backend API to update this week's schedule
  fetch(apiURL + "yaja/", {
    method: "PUT", // PUT request to update the entire week's schedule
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedValues),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("got response");
      if (data.status == "success") {
        alert("Successfully changed this week's schedule!");
        retrieveCurrentSchedule();
        window.location.reload(); // Reload the page after successful update
      } else {
        console.error("Error in updateWeekSchedule: Unexpected response", data);
      }
    })
    .catch((error) => {
      console.error("Error in updateWeekSchedule:", error);
    });
}

function retrieveCurrentSchedule() {
  console.log("Sending GET request to:", apiURL + "/yaja");
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
        const selectIdMonday1 = "period1-Monday";
        const selectElementMonday1 = document.getElementById(selectIdMonday1);
        const inputIdMonday1 = `${selectIdMonday1}-input`;
        const inputElementMonday1 = document.getElementById(inputIdMonday1);

        const selectIdTuesday1 = "period1-Tuesday";
        const selectElementTuesday1 = document.getElementById(selectIdTuesday1);
        const inputIdTuesday1 = `${selectIdTuesday1}-input`;
        const inputElementTuesday1 = document.getElementById(inputIdTuesday1);

        const selectIdWednesday1 = "period1-Wednesday";
        const selectElementWednesday1 =
          document.getElementById(selectIdWednesday1);
        const inputIdWednesday1 = `${selectIdWednesday1}-input`;
        const inputElementWednesday1 =
          document.getElementById(inputIdWednesday1);

        const selectIdThursday1 = "period1-Thursday";
        const selectElementThursday1 =
          document.getElementById(selectIdThursday1);
        const inputIdThursday1 = `${selectIdThursday1}-input`;
        const inputElementThursday1 = document.getElementById(inputIdThursday1);

        const selectIdMonday2 = "period2-Monday";
        const selectElementMonday2 = document.getElementById(selectIdMonday2);
        const inputIdMonday2 = `${selectIdMonday2}-input`;
        const inputElementMonday2 = document.getElementById(inputIdMonday2);

        const selectIdTuesday2 = "period2-Tuesday";
        const selectElementTuesday2 = document.getElementById(selectIdTuesday2);
        const inputIdTuesday2 = `${selectIdTuesday2}-input`;
        const inputElementTuesday2 = document.getElementById(inputIdTuesday2);

        const selectIdWednesday2 = "period2-Wednesday";
        const selectElementWednesday2 =
          document.getElementById(selectIdWednesday2);
        const inputIdWednesday2 = `${selectIdWednesday2}-input`;
        const inputElementWednesday2 =
          document.getElementById(inputIdWednesday2);

        const selectIdThursday2 = "period2-Thursday";
        const selectElementThursday2 =
          document.getElementById(selectIdThursday2);
        const inputIdThursday2 = `${selectIdThursday2}-input`;
        const inputElementThursday2 = document.getElementById(inputIdThursday2);

        const selectIdMonday3 = "period3-Monday";
        const selectElementMonday3 = document.getElementById(selectIdMonday3);
        const inputIdMonday3 = `${selectIdMonday3}-input`;
        const inputElementMonday3 = document.getElementById(inputIdMonday3);

        const selectIdTuesday3 = "period3-Tuesday";
        const selectElementTuesday3 = document.getElementById(selectIdTuesday3);
        const inputIdTuesday3 = `${selectIdTuesday3}-input`;
        const inputElementTuesday3 = document.getElementById(inputIdTuesday3);

        const selectIdWednesday3 = "period3-Wednesday";
        const selectElementWednesday3 =
          document.getElementById(selectIdWednesday3);
        const inputIdWednesday3 = `${selectIdWednesday3}-input`;
        const inputElementWednesday3 =
          document.getElementById(inputIdWednesday3);

        const selectIdThursday3 = "period3-Thursday";
        const selectElementThursday3 =
          document.getElementById(selectIdThursday3);
        const inputIdThursday3 = `${selectIdThursday3}-input`;
        const inputElementThursday3 = document.getElementById(inputIdThursday3);

        const valueMonday1 = data.monday.period1;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueMonday1
          )
        ) {
          selectElementMonday1.value = valueMonday1;
          inputElementMonday1.style.display = "none";
        } else {
          selectElementMonday1.value = "기타";
          inputElementMonday1.style.display = "block";
          inputElementMonday1.value = valueMonday1;
        }

        const valueTuesday1 = data.tuesday.period1;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueTuesday1
          )
        ) {
          selectElementTuesday1.value = valueTuesday1;
          inputElementTuesday1.style.display = "none";
        } else {
          selectElementTuesday1.value = "기타";
          inputElementTuesday1.style.display = "block";
          inputElementTuesday1.value = valueTuesday1;
        }

        const valueWednesday1 = data.wednesday.period1;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueWednesday1
          )
        ) {
          selectElementWednesday1.value = valueWednesday1;
          inputElementWednesday1.style.display = "none";
        } else {
          selectElementWednesday1.value = "기타";
          inputElementWednesday1.style.display = "block";
          inputElementWednesday1.value = valueWednesday1;
        }

        const valueThursday1 = data.thursday.period1;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueThursday1
          )
        ) {
          selectElementThursday1.value = valueThursday1;
          inputElementThursday1.style.display = "none";
        } else {
          selectElementThursday1.value = "기타";
          inputElementThursday1.style.display = "block";
          inputElementThursday1.value = valueThursday1;
        }

        const valueMonday2 = data.monday.period2;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueMonday2
          )
        ) {
          selectElementMonday2.value = valueMonday2;
          inputElementMonday2.style.display = "none";
        } else {
          selectElementMonday2.value = "기타";
          inputElementMonday2.style.display = "block";
          inputElementMonday2.value = valueMonday2;
        }

        const valueTuesday2 = data.tuesday.period2;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueTuesday2
          )
        ) {
          selectElementTuesday2.value = valueTuesday2;
          inputElementTuesday2.style.display = "none";
        } else {
          selectElementTuesday2.value = "기타";
          inputElementTuesday2.style.display = "block";
          inputElementTuesday2.value = valueTuesday2;
        }
        const valueWednesday2 = data.wednesday.period2;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueWednesday2
          )
        ) {
          selectElementWednesday2.value = valueWednesday2;
          inputElementWednesday2.style.display = "none";
        } else {
          selectElementWednesday2.value = "기타";
          inputElementWednesday2.style.display = "block";
          inputElementWednesday2.value = valueWednesday2;
        }

        const valueThursday2 = data.thursday.period2;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueThursday2
          )
        ) {
          selectElementThursday2.value = valueThursday2;
          inputElementThursday2.style.display = "none";
        } else {
          selectElementThursday2.value = "기타";
          inputElementThursday2.style.display = "block";
          inputElementThursday2.value = valueThursday2;
        }

        const valueMonday3 = data.monday.period3;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueMonday3
          )
        ) {
          selectElementMonday3.value = valueMonday3;
          inputElementMonday3.style.display = "none";
        } else {
          selectElementMonday3.value = "기타";
          inputElementMonday3.style.display = "block";
          inputElementMonday3.value = valueMonday3;
        }

        const valueTuesday3 = data.tuesday.period3;
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueTuesday3
          )
        ) {
          selectElementTuesday3.value = valueTuesday3;
          inputElementTuesday3.style.display = "none";
        } else {
          selectElementTuesday3.value = "기타";
          inputElementTuesday3.style.display = "block";
          inputElementTuesday3.value = valueTuesday3;
        }

        const valueWednesday3 = data.wednesday.period3;
        console.log(valueWednesday3);
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueWednesday3
          )
        ) {
          selectElementWednesday3.value = valueWednesday3;
          inputElementWednesday3.style.display = "none";
        } else {
          selectElementWednesday3.value = "기타";
          inputElementWednesday3.style.display = "block";
          inputElementWednesday3.value = valueWednesday3;
        }

        const valueThursday3 = data.thursday.period3;
        console.log(valueThursday3);
        if (
          ["외출/현체", "조퇴", "야자", "주문형강좌/방과후"].includes(
            valueThursday3
          )
        ) {
          selectElementThursday3.value = valueThursday3;
          inputElementThursday3.style.display = "none";
        } else {
          selectElementThursday3.value = "기타";
          inputElementThursday3.style.display = "block";
          inputElementThursday3.value = valueThursday3;
        }
      }
    })
    .catch((error) => {
      console.error("Error in retrieveSchedule:", error);
    });
}

// Attach event listeners to the s based on their IDs or other attributes

document.addEventListener("DOMContentLoaded", function () {
  console.log("loaded");
  retrieveCurrentSchedule();
  // Attach change event listener to all select elements
  document
    .getElementById("weekForm")
    .addEventListener("submit", function (event) {
      console.log("clickeeed the submit for today button");
      event.preventDefault();
      updateWeekSchedule();
    });

  document
    .getElementById("defaultForm")
    .addEventListener("submit", function (event) {
      console.log("clickeeed the submit button");
      event.preventDefault();
      updateDefaultSchedule();
    });

  document
    .getElementById("modalpop")
    .addEventListener("click", function (event) {
      console.log("clickeeed to enable retrieveschedule");
      event.preventDefault();
      retrieveDefaultSchedule();
    });
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
    if (this.value === "조퇴") {
      const period1 = document.getElementById(`period1-${day}`).value;
      const period2 = document.getElementById(`period2-${day}`).value;
      const period3 = document.getElementById(`period3-${day}`).value;

      if (period1 !== "외출/현체") {
        document.getElementById(`period1-${day}`).value = "조퇴";
      }
      if (period2 !== "외출/현체") {
        document.getElementById(`period2-${day}`).value = "조퇴";
      }
      if (period3 !== "외출/현체") {
        document.getElementById(`period3-${day}`).value = "조퇴";
      }
    }
  });
});

document.querySelectorAll(".week-period-select").forEach((select) => {
  select.addEventListener("change", function () {
    const parts = this.id.split("-");
    const day = parts[2];
    const customInputId = `default-${parts[1]}-${day}-input`;
    const customInput = document.getElementById(customInputId);

    if (this.value === "기타") {
      customInput.style.display = "block";
    } else {
      customInput.style.display = "none";
    }

    if (this.value === "조퇴") {
      const period1 = document.getElementById(`default-period1-${day}`).value;
      const period2 = document.getElementById(`default-period2-${day}`).value;
      const period3 = document.getElementById(`default-period3-${day}`).value;

      if (period1 !== "외출/현체") {
        document.getElementById(`default-period1-${day}`).value = "조퇴";
      }
      if (period2 !== "외출/현체") {
        document.getElementById(`default-period2-${day}`).value = "조퇴";
      }
      if (period3 !== "외출/현체") {
        document.getElementById(`default-period3-${day}`).value = "조퇴";
      }
    }
  });
});

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

document.querySelectorAll(".week-period-select").forEach((select) => {
  select.addEventListener("change", function () {
    const parts = this.id.split("-");
    const day = parts[2];
    const period = parts[1];

    const customInputId = `default-${period}-${day}-input`;
    const customInput = document.getElementById(customInputId);

    if (this.value === "기타") {
      customInput.style.display = "block";
    } else {
      customInput.style.display = "none";
    }

    const period1 = document.getElementById(`default-period1-${day}`);
    const period2 = document.getElementById(`default-period2-${day}`);
    const period3 = document.getElementById(`default-period3-${day}`);

    if (this.value === "조퇴") {
      if (period1.value !== "외출/현체") period1.value = "조퇴";
      if (period2.value !== "외출/현체") period2.value = "조퇴";
      if (period3.value !== "외출/현체") period3.value = "조퇴";

      document.getElementById(`default-period1-${day}-input`).style.display =
        "none";
      document.getElementById(`default-period2-${day}-input`).style.display =
        "none";
      document.getElementById(`default-period3-${day}-input`).style.display =
        "none";
    } else if (this.value !== "외출/현체") {
      if (period1.value === "조퇴" && period !== "period1") {
        period1.value = "야자";
        document.getElementById(`default-period1-${day}-input`).style.display =
          "none";
      }
      if (period2.value === "조퇴" && period !== "period2") {
        period2.value = "야자";
        document.getElementById(`default-period2-${day}-input`).style.display =
          "none";
      }
      if (period3.value === "조퇴" && period !== "period3") {
        period3.value = "야자";
        document.getElementById(`default-period3-${day}-input`).style.display =
          "none";
      }
    }
  });
});

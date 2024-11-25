const btn = document.querySelector(".add");
let count = 0;
const url = "http://localhost:3000/employees";
const cardContainer = document.getElementById("card-container");
// Get the theme switcher element
const themeSwitcher = document.getElementById('theme-switcher');

// Function to apply the selected theme
function applyTheme(theme) {
    // Remove existing theme classes
    document.documentElement.classList.remove('light', 'dark', 'blue');

    // Add the selected theme class
    if (theme !== 'default') {
        document.documentElement.classList.add(theme);
    }
}

// Event listener for theme switcher
themeSwitcher.addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    applyTheme(selectedTheme);
    
    // Save the selected theme in localStorage
    localStorage.setItem('theme', selectedTheme);
});

// Load the saved theme from localStorage on page load
window.onload = () => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    themeSwitcher.value = savedTheme; // Set the dropdown to the saved theme
    applyTheme(savedTheme); // Apply the saved theme
};



btn.addEventListener("click", () => {
    if (count >= 1) {
        return;
    }

    const inputContainer = document.getElementById("inputContainer");

    // Create form
    const form = document.createElement("form");
    form.id = "form1";


    // EMPLOYEE NAME
    const eName = document.createElement("label");
    eName.innerText = "EMPLOYEE NAME";
    eName.htmlFor = "employeename";


    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "employeename";
    nameInput.id = "employeename";
    nameInput.placeholder = "ENTER EMPLOYEE NAME";
    nameInput.setAttribute("onchange", "updateObject(this.value)")
    // nameInput.setAttribute("required")
    nameInput.required = true; // Add required attribute

    // EMPLOYEE EMAIL
    const email = document.createElement("label");
    email.innerText = "EMPLOYEE EMAIL";
    email.htmlFor = "email";

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "emailInput";
    emailInput.id = "emailInput";
    emailInput.placeholder = "ENTER EMPLOYEE EMATK";
    emailInput.required = true; // Required field

    // SALARY
    const salaryLabel = document.createElement("label");
    salaryLabel.innerText = "SALARY";
    salaryLabel.htmlFor = "salary";

    const salaryInput = document.createElement("input");
    salaryInput.type = "number";
    salaryInput.name = "salary";
    salaryInput.id = "salary";
    salaryInput.placeholder = "ENTER EMPLOYEE SALARY";
    salaryInput.required = true; // Required field

    // DEPARTMENT
    const deptLabel = document.createElement("label");
    deptLabel.innerText = "DEPARTMENT";
    deptLabel.htmlFor = "dept";

    const deptInput = document.createElement("input");
    deptInput.name = "dept";
    deptInput.id = "dept";
    deptInput.placeholder = "ENTER THE DEPARTMENT";
    deptInput.required = true; // Required field

    // ADDRESS
    const addressLabel = document.createElement("label");
    addressLabel.innerText = "ADDRESS";
    addressLabel.htmlFor = "address";

    const addressInput = document.createElement("input");
    addressInput.name = "address";
    addressInput.id = "address";
    addressInput.placeholder = "ENTER THE ADDRESS";
    addressInput.required = true; // Required field

    // phoneNumber
    const phoneNumber = document.createElement("label");
    phoneNumber.innerText = "PHONE NUMBER";
    phoneNumber.htmlFor = "phoneNumber";

    const phoneNumberInput = document.createElement("input");
    phoneNumberInput.name = "phoneNumberInput";
    phoneNumberInput.id = "phoneNumberInput";
    phoneNumberInput.placeholder = "ENTER THE PHONE NUMBER";
    phoneNumberInput.required = true; // Required field

    // Submit Button
    const submitbtn = document.createElement("button");
    submitbtn.id = "btnsubmit";
    submitbtn.type = "button";
    submitbtn.innerText = "SUBMIT";

    submitbtn.onclick = async () => {
        const form = document.getElementById("form1");

        // gpt
        // Check if the form is valid
        if (!form.checkValidity()) {
            form.reportValidity(); // Show validation messages
            return;
        }

        const data = {
            name: nameInput.value,
            email: emailInput.value,
            salary: salaryInput.value,
            department: deptInput.value,
            phoneNumber: phoneNumberInput.value,
            address: addressInput.value,
        };

        await addEmployee(data);
        alert("Data submitted successfully");
        inputContainer.removeChild(form);
        count--;
    };


    // Append elements to the form
    // form.appendChild(eId);
    // form.appendChild(idInput);
    form.appendChild(eName);
    form.appendChild(nameInput);
    form.appendChild(email);
    form.appendChild(emailInput);
    form.appendChild(salaryLabel);
    form.appendChild(salaryInput);
    form.appendChild(deptLabel);
    form.appendChild(deptInput);
    form.appendChild(phoneNumber);
    form.appendChild(phoneNumberInput);
    form.appendChild(addressLabel);
    form.appendChild(addressInput);
    form.appendChild(submitbtn);

    inputContainer.appendChild(form);
    count++;
});
// ---------------------------------------
// script.js
// Add a new employee (POST)
async function addEmployee(data) {
    const url = "http://localhost:3000/employees";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.log(errorText)
            throw new Error(`Failed to add employee: ${response.status} `);
        }

        const responseData = await response.json();
        console.log("Employee added:", responseData);
    } catch (err) {
        console.error("Error adding employee:", err.message);
        alert(`Error: ${err.message}`);
    }

}

async function editEmployee(id) {
    try {
        let form = document.getElementById("form1");
        console.log(form);
        if (!form) {


            btn.click();
            form = document.getElementById("form1");
        }



        const nameInput = document.querySelector("#employeename");
        const emailInput = document.querySelector("#emailInput");
        const salaryInput = document.querySelector("#salary");
        const deptInput = document.querySelector("#dept");
        const phoneNumberInput = document.querySelector("#phoneNumberInput");
        const addressInput = document.querySelector("#address");


        const employee = await getEmployee(id);
        if (!employee) {
            alert("Employee not found!");
            return;
        }

        nameInput.value = employee.name || "NA";
        emailInput.value = employee.email || "NA";
        salaryInput.value = employee.salary || "NA";
        deptInput.value = employee.department || "NA";
        phoneNumberInput.value = employee.phoneNumber || "NA";
        addressInput.value = employee.address || "NA";

        const submitbtn = document.querySelector("#btnsubmit");
        submitbtn.innerHTML = "UPDATE";
        // Create an updated data object
        const updatedData = {
            name: employee.name,
            email: employee.email,
            salary: employee.salary,
            department: employee.department,
            phoneNumber: employee.phoneNumber,
            address: employee.address,
        };




        nameInput.addEventListener("input", (e) => {
            updatedData.name = e.target.value;
        });
        emailInput.addEventListener("input", (e) => {
            updatedData.email = e.target.value;
        });
        salaryInput.addEventListener("input", (e) => {
            updatedData.salary = e.target.value;
        });
        deptInput.addEventListener("input", (e) => {
            updatedData.department = e.target.value;
        });
        phoneNumberInput.addEventListener("input", (e) => {
            updatedData.phoneNumber = e.target.value;

        });
        addressInput.addEventListener("input", (e) => {
            updatedData.address = e.target.value;
        });



        console.log(updatedData);

        submitbtn.onclick = async () => {
            const response = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            console.log(response);


            if (!response.ok) {
                throw new Error("Failed to update employee");
            }

            alert("Employee updated successfully!");
            fetchData();
        }
    } catch (error) {
        console.error("Error updating employee:", error);
        alert(`Error updating employee: ${error.message}`);
    }

}



async function getEmployee(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch employee");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching employee:", error);
        alert(`Error: ${error.message}`);
    }
}







// Delete an employee
const deleteEmployee = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert(`Employee with ID ${id} deleted successfully.`);

            document.querySelector(".card-container").innerHTML = "";
            fetchData();
        } else {
            alert("Failed to delete employee.");
        }
    } catch (error) {
        console.error(error);
    }
};




// fetch
async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch: " + response.statusText);
        const data = await response.json();
        console.log(data);
        dispaly(data);
    } catch (error) {
        // error.preventDefault();
        console.error("Error fetching data:", error);
    }
}
fetchData();




function dispaly(data) {
    data.map(employees => {
     
        const card = document.createElement("div");
        card.className = "card flip-card";

    
        const cardInner = document.createElement("div");
        cardInner.className = "flip-card-inner";

        const cardFront = document.createElement("div");
        cardFront.className = "flip-card-front";
        cardFront.innerHTML = `
            <h3>ID: ${employees.id}</h3>
            <h3>NAME: ${employees.name}</h3>
            <p>EMAIL: ${employees.email || "N/A"}</p>
            <p>SALARY: ${employees.salary || "N/A"}</p>
            <p>DEPARTMENT: ${employees.department || "N/A"}</p>
            <p>PHONE: ${employees.phoneNumber || "N/A"}</p>
        `;

     
        const cardBack = document.createElement("div");
        cardBack.className = "flip-card-back";
        cardBack.innerHTML = `
            <h3>Address</h3>
            <p>${employees.address || "N/A"}</p>
            <div class="btn2">
                <button class="edt-btn" data-id="${employees.id}">EDIT</button>
                <button class="del-btn" data-id="${employees.id}">DELETE</button>
                <button class="dow-btn" data-id="${employees.id}"><i class="fa-solid fa-download"></i></button>
            </div>
        `;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        card.appendChild(cardInner);

        cardContainer.appendChild(card);

        const editBtn = cardBack.querySelector(".edt-btn");
        editBtn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            editEmployee(id);
        });

        const deleteBtn = cardBack.querySelector(".del-btn");
        deleteBtn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            deleteEmployee(id);
        });
          // Download Button event listener
          const downloadBtn = cardBack.querySelector(".dow-btn");
          downloadBtn.addEventListener("click", (e) => {
              const id = e.target.getAttribute("data-id");
              downloadEmployeeInfo(id, employees); // Pass the employee data for download
          });
    });
}
// Function to download employee information
function downloadEmployeeInfo(id, employee) {
    // You can customize this format (JSON, plain text, etc.)
    const employeeData = `Employee ID: ${employee.id}\n` +
                         `Name: ${employee.name}\n` +
                         `Email: ${employee.email || "N/A"}\n` +
                         `Salary: ${employee.salary || "N/A"}\n` +
                         `Department: ${employee.department || "N/A"}\n` +
                         `Phone: ${employee.phoneNumber || "N/A"}\n` +
                         `Address: ${employee.address || "N/A"}`;

    // Create a Blob from the employee data
    const blob = new Blob([employeeData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create an anchor tag to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `employee_${employee.id}.txt`; // Set the file name with employee id
    a.click(); // Trigger the download

    // Clean up the object URL after download
    URL.revokeObjectURL(url);
}




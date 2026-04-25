function showMessage() {
    alert("Thanks for visiting my portfolio 😊");
}

function scrollToSection(id){
    document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

let leads = JSON.parse(localStorage.getItem("leads")) || [];

function addLead() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email) { alert("Please fill required fields!"); return; }

    const newLead = { name, email, message, status: "New" };
    leads.push(newLead);
    localStorage.setItem("leads", JSON.stringify(leads));

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    loadLeads();
}

function loadLeads() {
    const container = document.getElementById("leadsContainer");
    container.innerHTML = "";
    leads.forEach((lead, index) => {
        container.innerHTML += `
        <div class="card">
            <h3>${lead.name}</h3>
            <p>${lead.email}</p>
            <p>${lead.message}</p>
            <select onchange="updateStatus(${index}, this.value)">
                <option value="New" ${lead.status === "New" ? "selected" : ""}>New</option>
                <option value="Contacted" ${lead.status === "Contacted" ? "selected" : ""}>Contacted</option>
                <option value="Converted" ${lead.status === "Converted" ? "selected" : ""}>Converted</option>
            </select>
        </div>
        `;
    });
}

function updateStatus(index, status) {
    leads[index].status = status;
    localStorage.setItem("leads", JSON.stringify(leads));
    loadLeads();
}

// Load leads on page start
loadLeads();

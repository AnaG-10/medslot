const pendingContainer = document.getElementById("pendingRequests");
const patientTable = document.getElementById("todayPatients");

const patientCountDisplay = document.getElementById("patientCount");
const pendingCountDisplay = document.getElementById("pendingCount");

let patientCount = 0;
let pendingCount = 0;

/* Fake database (simulated patients) */
const pendingPatients = [
    {name:"Ravi Sharma", issue:"Fever", time:"4:20 PM"},
    {name:"Anita Verma", issue:"Headache", time:"4:40 PM"},
    {name:"Kiran Rao", issue:"Diabetes Follow-up", time:"5:00 PM"}
];

/* Create request cards dynamically */
function loadPendingPatients(){

    pendingPatients.forEach(patient => {

        const card = document.createElement("div");
        card.className = "request";

        card.innerHTML = `
            <div>
                <b>${patient.name}</b><br>
                ${patient.issue}
            </div>

            <div class="actions">
                <button class="approve">Approve</button>
                <button class="reject">Reject</button>
            </div>
        `;

        pendingContainer.appendChild(card);
        pendingCount++;
    });

    updateCounts();
}

/* Update stats */
function updateCounts(){
    patientCountDisplay.innerText = patientCount + " Patients";
    pendingCountDisplay.innerText = pendingCount + " Waiting";
}

/* Approve / Reject logic */
pendingContainer.addEventListener("click", function(e){

    /* APPROVE */
    if(e.target.classList.contains("approve")){

        const card = e.target.closest(".request");

        // turn green
        card.classList.add("approved");

        setTimeout(() => {

            const name = card.querySelector("b").innerText;
            const issue = card.querySelector("div").innerText.split("\n")[1];
            const time = "Next Slot";

            const row = document.createElement("tr");
            row.innerHTML = `<td>${name}</td><td>${time}</td><td>${issue}</td>`;

            patientTable.appendChild(row);

            card.remove();

            patientCount++;
            pendingCount--;
            updateCounts();

        }, 650); // wait for animation
    }


    /* REJECT */
    if(e.target.classList.contains("reject")){

        const card = e.target.closest(".request");

        // turn red
        card.classList.add("rejected");

        setTimeout(() => {
            card.remove();
            pendingCount--;
            updateCounts();
        }, 650);
    }

});

/* Initial load */
loadPendingPatients();

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const main = document.querySelector(".main");

hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    main.classList.toggle("shift");
});
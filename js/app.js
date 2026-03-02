document.addEventListener("DOMContentLoaded", function(){

    /* ---------------- SIDEBAR (ALL PAGES) ---------------- */

    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");
    const main = document.querySelector(".main");

    if(hamburger && sidebar && main){
        hamburger.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            main.classList.toggle("shift");
        });
    }


    /* ---------------- DASHBOARD ONLY CODE ---------------- */

    const pendingContainer = document.getElementById("pendingRequests");

    // If this element does not exist → we are NOT on index.html
    if(!pendingContainer) return;

    const patientTable = document.getElementById("todayPatients");
    const patientCountDisplay = document.getElementById("patientCount");
    const pendingCountDisplay = document.getElementById("pendingCount");

    let patientCount = 0;
    let pendingCount = 0;

    const pendingPatients = [
        {name:"Ravi Sharma", issue:"Fever", time:"4:20 PM"},
        {name:"Anita Verma", issue:"Headache", time:"4:40 PM"},
        {name:"Kiran Rao", issue:"Diabetes Follow-up", time:"5:00 PM"}
    ];

    function updateCounts(){
        if(patientCountDisplay)
            patientCountDisplay.innerText = patientCount + " Patients";

        if(pendingCountDisplay)
            pendingCountDisplay.innerText = pendingCount + " Waiting";
    }

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

    pendingContainer.addEventListener("click", function(e){

        if(e.target.classList.contains("approve")){

            const card = e.target.closest(".request");
            card.classList.add("approved");

            setTimeout(() => {

                const name = card.querySelector("b").innerText;
                const issue = card.querySelector("div").innerText.split("\n")[1];

                const row = document.createElement("tr");
                row.innerHTML = `<td>${name}</td><td>Next Slot</td><td>${issue}</td>`;

                patientTable.appendChild(row);

                card.remove();
                patientCount++;
                pendingCount--;
                updateCounts();

            }, 650);
        }

        if(e.target.classList.contains("reject")){

            const card = e.target.closest(".request");
            card.classList.add("rejected");

            setTimeout(() => {
                card.remove();
                pendingCount--;
                updateCounts();
            }, 650);
        }
    });

    loadPendingPatients();

});
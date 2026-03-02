document.addEventListener("DOMContentLoaded", function(){

    /* SHOW TODAY DATE */
    const dateBox = document.getElementById("todayDate");
    if(dateBox){
        dateBox.innerText = new Date().toDateString();
    }

    /* SLOT CAPACITY SYSTEM */
    const slots = document.querySelectorAll(".slot");

    slots.forEach(slot => {

        const max = parseInt(slot.dataset.max);
        let booked = parseInt(slot.dataset.booked);

        const capacityText = slot.querySelector(".capacity");
        const fullTag = slot.querySelector(".fullTag");

        function updateSlot(){
            capacityText.innerText = `${booked} / ${max} Patients`;

            if(booked >= max){
                fullTag.innerText = "FULL";
                fullTag.style.color = "red";
            } else {
                fullTag.innerText = "";
            }
        }

        updateSlot();

        /* TEMP TEST BUTTON (for you) */
        slot.addEventListener("dblclick", () => {
            booked++;
            slot.dataset.booked = booked;
            updateSlot();
        });

    });

});
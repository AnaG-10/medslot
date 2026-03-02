const toggles = document.querySelectorAll(".slotToggle");

toggles.forEach((toggle, index) => {

    toggle.addEventListener("change", () => {

        const slotName = toggle.closest(".slot").querySelector("b").innerText;

        if(toggle.checked){
            alert(slotName + " is now AVAILABLE for booking");
        }else{
            alert(slotName + " is CLOSED for booking");
        }

    });

});
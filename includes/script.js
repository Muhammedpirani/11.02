let timerId = null; 
const label = document.getElementById('autoJbLabel');
const checkbox = document.getElementById('autoJbInput');
const jeilbrekBtn = document.getElementById('jeilbrek');
const UAElement = document.getElementById("UA");

const storedAutoJb = localStorage.getItem("autoJb");
let autoJbValue = storedAutoJb !== null ? storedAutoJb === "true" : true;

// choose one of kernel exploits
var exploitChain = localStorage.getItem("exploitChain") || "lapse";
const netctrlRadio = document.getElementById("netctrl-exploit");
const lapseRadio = document.getElementById("lapse-exploit");
const poopsRadio = document.getElementById("poops-exploit"); 
const kexForm = document.getElementById('kernel-options');

// Show user agent safely
if (UAElement) {
    UAElement.innerText += " " + navigator.userAgent;
}

if (kexForm) {
    kexForm.addEventListener("change", function (event) {
        localStorage.setItem("exploitChain", event.target.value);
        exploitChain = event.target.value;
    });
}

// jailbreak execution
if (jeilbrekBtn) {
    jeilbrekBtn.addEventListener("click", function (e){
        jeilbrekBtn.disabled = true;
        stopInterval();
        if (typeof doJb === "function") {
            doJb();
        } else {
            console.error("doJb function is not defined!");
        }
    });
}

if (checkbox) {
    checkbox.addEventListener('change', function () {
        localStorage.setItem("autoJb", checkbox.checked);
        if (checkbox.checked == true && jeilbrekBtn && jeilbrekBtn.disabled == false) {
            jailbreakCountdown();
            return;
        }
        stopInterval();
    });
}

function stopInterval(){
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    if (label) {
        label.textContent = "Auto Jailbreak";
    }
}

function jailbreakCountdown() {   
    stopInterval();

    let countdown = 5;
    if (label) label.textContent = `Auto Jailbreaking in: ${countdown}`;
    
    timerId = setInterval(() => {
        countdown--;
        if (label) label.textContent = `Auto Jailbreaking in: ${countdown}`;

        if (countdown < 0) {
            if (jeilbrekBtn) jeilbrekBtn.disabled = true; 
            clearInterval(timerId);
            timerId = null;
            if (label) label.textContent = 'Executing';
            
            if (typeof doJb === "function") {
                doJb();
            } else {
                console.error("doJb function is not defined!");
            }
        }
    }, 1000);
}

function cacheProgress(e) {
    if (e.total > 0) {
        var Percent = (Math.round(e.loaded / e.total * 100));
        document.title = "Caching: " + Percent + "%";
    }
}

function displayCacheProgress() {
    setTimeout(function () {
        document.title = "\u2713";
    }, 1000);
    setTimeout(function () {
        document.title = "CSSFontFace exploit";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
    // Cache handling
    if (window.applicationCache) {
        window.applicationCache.addEventListener("progress", cacheProgress, false);
        window.applicationCache.oncached = function (e) { displayCacheProgress(); };
        window.applicationCache.onupdateready = function (e) { displayCacheProgress(); };
    }

    // choose prefered exploit chain
    if (exploitChain == "netctrl") {
        if (netctrlRadio) netctrlRadio.checked = true;
    } else if (exploitChain == "poops") {
        if (poopsRadio) poopsRadio.checked = true; 
    } else {
        if (lapseRadio) lapseRadio.checked = true;
    }

    // apply autojb localStorage value
    if (checkbox) {
        checkbox.checked = autoJbValue;
    }

    if (autoJbValue) jailbreakCountdown();
});

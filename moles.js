
const holes = document.querySelectorAll(".hole");

console.log(holes);

let activeHole = null;
let moleSpeed = 1000;
let moleTimer = null;
let successfulHits = 0;
let nextMoleTimer = null;
let isPlaying = false;


function showMole() {
    if (!isPlaying) {
        return;
    }

    clearTimeout(nextMoleTimer);
    nextMoleTimer = null;

    const randomIndex = Math.floor(Math.random() * holes.length);

    activeHole = holes[randomIndex];
    activeHole.classList.add("mole");

    moleTimer = setTimeout(hideMole, moleSpeed);
}


function hideMole() {
    clearTimeout(moleTimer);
    moleTimer = null;

    if (activeHole !== null) {
        activeHole.classList.remove("mole");
        activeHole = null;
    }

    clearTimeout(nextMoleTimer);
    nextMoleTimer = null;

    if (isPlaying) {
        nextMoleTimer = setTimeout(showMole, 500);
    }
}


holes.forEach(function(hole) {
    hole.addEventListener("click", function() {

        if (isPlaying && hole === activeHole) {
            hideMole();

            successfulHits++;
            document.dispatchEvent(new Event("moleHit"));

            console.log("You hit the mole!");
            console.log("Successful hits:", successfulHits);

            if (successfulHits % 5 === 0) {
                increaseDifficulty();
            }
        }

    });
});


function increaseDifficulty() {
    if (moleSpeed > 600) {
        moleSpeed -= 100;
    }

    console.log("Mole speed:", moleSpeed);
}


function startMoles() {
    stopMoles();

    moleSpeed = 1000;
    successfulHits = 0;
    isPlaying = true;

    showMole();
}


function stopMoles() {
    isPlaying = false;

    clearTimeout(moleTimer);
    clearTimeout(nextMoleTimer);

    moleTimer = null;
    nextMoleTimer = null;

    if (activeHole !== null) {
        activeHole.classList.remove("mole");
        activeHole = null;
    }
}




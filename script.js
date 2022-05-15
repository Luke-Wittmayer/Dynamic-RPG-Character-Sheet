function updateModifiers() {
    // convert ability scores into modifiers

    var strScore = document.getElementById("strScore").value;
    document.getElementById("strMod").value = Math.floor((strScore - 10)/2);
    var dexScore = document.getElementById("dexScore").value;
    document.getElementById("strMod").value = Math.floor((dexScore - 10)/2);
    var conScore = document.getElementById("conScore").value;
    document.getElementById("strMod").value = Math.floor((conScore - 10)/2);
    var intScore = document.getElementById("intScore").value;
    document.getElementById("strMod").value = Math.floor((intScore - 10)/2);
    var wisScore = document.getElementById("wisScore").value;
    document.getElementById("strMod").value = Math.floor((wisScore - 10)/2);
    var chaScore = document.getElementById("chaScore").value;
    document.getElementById("strMod").value = Math.floor((chaScore - 10)/2);
}

function updateProfBonus() {
    // update proficiency bonus based on player level

    var playerLevel = parseInt(document.getElementById("playerLevel").value);
    document.getElementById("profBonus").value = Math.ceil((playerLevel/4) + 1);
}

function playerLevelChange() {
    updateProfBonus();
    updateModifiers();
}


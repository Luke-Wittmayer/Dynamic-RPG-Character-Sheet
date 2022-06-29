function getValue(element){
    return document.getElementById(element).value;
}

function setValue(element, newValue){
    document.getElementById(element).value = newValue;
}

function updateModifiers() {
    // convert ability scores into modifiers
    
    var strScore = getValue("strScore");
    setValue("strMod", Math.floor((strScore - 10)/2));
    var dexScore = getValue("dexScore");
    setValue("dexMod", Math.floor((dexScore - 10)/2));
    var conScore = getValue("conScore");
    setValue("conMod", Math.floor((conScore - 10)/2));
    var intScore = getValue("intScore");
    setValue("intMod", Math.floor((intScore - 10)/2));
    var wisScore = getValue("wisScore");
    setValue("wisMod", Math.floor((wisScore - 10)/2));
    var chaScore = getValue("chaScore");
    setValue("chaMod", Math.floor((chaScore - 10)/2));;

    setSkills();
    enableArmor();
    equipArmor(equippedArmor);
    shieldEquip(shieldEquip);
}

function updateProfBonus() {
  // update proficiency bonus based on player level
  
  var playerLevel = parseInt(getValue("playerLevel"));
  setValue("profBonus", Math.ceil((playerLevel/4) + 1));
    
}

function setSkills(){
    var profBonus = parseInt(getValue("profBonus"));
    var strMod = parseInt(getValue("strMod"));
    var dexMod = parseInt(getValue("dexMod"));
    var intMod = parseInt(getValue("intMod"));
    var wisMod = parseInt(getValue("wisMod"));
    var chaMod = parseInt(getValue("chaMod"));

    if (document.getElementById("acroProf").checked == true) {
        setValue("acroScore", dexMod+profBonus);
    } else {
        setValue("acroScore", dexMod);
    }
    if (document.getElementById("animProf").checked == true) {
        setValue("animScore", wisMod+profBonus);
    } else {
        setValue("animScore", wisMod);
    }
    if (document.getElementById("arcaProf").checked == true) {
        setValue("arcaScore", intMod+profBonus);
    } else {
        setValue("arcaScore", intMod);
    }
    if (document.getElementById("athlProf").checked == true) {
        setValue("athlScore", strMod+profBonus);
    } else {
        setValue("athlScore", strMod);
    }
    if (document.getElementById("decProf").checked == true) {
        setValue("decScore", chaMod+profBonus);
    } else {
        setValue("decScore", chaMod);
    }
    if (document.getElementById("hisProf").checked == true) {
        setValue("hisScore", intMod+profBonus);
    } else {
        setValue("hisScore", intMod);
    }
    if (document.getElementById("insProf").checked == true) {
        setValue("insScore", wisMod+profBonus);
    } else {
        setValue("insScore", wisMod);
    }
    if (document.getElementById("intiProf").checked == true) {
        setValue("intiScore", chaMod+profBonus);
    } else {
        setValue("intiScore", chaMod);
    }
    if (document.getElementById("invProf").checked == true) {
        setValue("invScore", intMod+profBonus);
    } else {
        setValue("invScore", intMod);
    }
    if (document.getElementById("medProf").checked == true) {
        setValue("medScore", wisMod+profBonus);
    } else {
        setValue("medScore", wisMod);
    }
    if (document.getElementById("natProf").checked == true) {
        setValue("natScore", intMod+profBonus);
    } else {
        setValue("natScore", intMod);
    }
    if (document.getElementById("percProf").checked == true) {
        setValue("percScore", wisMod+profBonus);
    } else {
        setValue("percScore", wisMod);
    }
    if (document.getElementById("perfProf").checked == true) {
        setValue("perfScore", chaMod+profBonus);
    } else {
        setValue("perfScore", chaMod);
    }
    if (document.getElementById("persProf").checked == true) {
        setValue("persScore", chaMod+profBonus);
    } else {
        setValue("persScore", chaMod);
    }
    if (document.getElementById("relProf").checked == true) {
        setValue("relScore", intMod+profBonus);
    } else {
        setValue("relScore", intMod);
    }
    if (document.getElementById("sleiProf").checked == true) {
        setValue("sleiScore", dexMod+profBonus);
    } else {
        setValue("sleiScore", dexMod);
    }
    if (document.getElementById("steProf").checked == true) {
        setValue("steScore", dexMod+profBonus);
    } else {
        setValue("steScore", dexMod);
    }
    if (document.getElementById("survProf").checked == true) {
        setValue("survScore", wisMod+profBonus);
    } else {
        setValue("survScore", wisMod);
    }
}

function equipArmor(equippedArmor){
    var armor = equippedArmor.value;
    var dexMod = parseInt(getValue("dexMod"));
    if (armor == 'padded' || armor == 'leather'){
        setValue("armorClass", dexMod + 11);
    } else if (armor == 'studded'){
        setValue("armorClass", dexMod + 12);
    } else if (armor == 'hide'){
        var tempArmor = dexMod + 12;
        if (tempArmor > 14){
            setValue("armorClass", 14);
        } else {
            setValue("armorClass", tempArmor);
        }
    } else if (armor == 'chain'){
        var tempArmor = dexMod + 13;
        if (tempArmor > 15){
            setValue("armorClass", 15);
        } else {
            setValue("armorClass", tempArmor);
        }
    } else if (armor == 'scale'){
        var tempArmor = dexMod + 14;
        if (tempArmor > 16){
            setValue("armorClass", 16);
        } else {
            setValue("armorClass", tempArmor);
        }
    } else if (armor == 'breastplate'){
        var tempArmor = dexMod + 14;
        if (tempArmor > 16){
            setValue("armorClass", 16);
        } else {
            setValue("armorClass", tempArmor);
        }
    } else if (armor == 'halfplate'){
        var tempArmor = dexMod + 15;
        if (tempArmor > 17){
            setValue("armorClass", 17);
        } else {
            setValue("armorClass", tempArmor);
        }
    } else if (armor == 'ringmail') {
        setValue("armorClass", 14);
    } else if (armor == 'chainmail') {
        setValue("armorClass", 16);
    } else if (armor == 'splint') {
        setValue("armorClass", 17);
    } else if (armor == 'plate') {
        setValue("armorClass", 18);
    } else {
        setValue("armorClass", dexMod+10);
    }
}

function shieldEquip(shieldEquip){
    var shield = shieldEquip.value;
    if (shield == 'shield'){
        setValue("armorClass", parseInt(getValue("armorClass")) + 2);
    } else {
        equipArmor(equippedArmor);
    }
}

function enableArmor(){
    var strScore = getValue("strScore");
    if (strScore >= 15) {
        document.getElementById("plateArmor").disabled = false;
        document.getElementById("chainmailArmor").disabled = false;
        document.getElementById("splintArmor").disabled = false;
    } else if (strScore >= 13) {
        document.getElementById("plateArmor").disabled = true;
        document.getElementById("chainmailArmor").disabled = false;
        document.getElementById("splintArmor").disabled = true;
    } else {
        document.getElementById("plateArmor").disabled = true;
        document.getElementById("chainmailArmor").disabled = true;
        document.getElementById("splintArmor").disabled = true;
    }
}

function playerLevelChange() {
    updateProfBonus();
    updateModifiers();
    setSkills();
    resetHP();
    resetHitDice();
}

function takeDamage() {
    var amount = getValue("modHP");
    var currentHP = getValue("currentHP");
    if ((currentHP - amount) >= 0) {
        setValue("currentHP", currentHP-amount);
    } else {
        setValue("currentHP", 0);
    }
}

function healHP() {
    var amount = parseInt(getValue("modHP"));
    var currentHP = parseInt(getValue("currentHP"));
    var maxHP = parseInt(getValue("maxHP"));
    if ((currentHP + amount) <= maxHP){
        setValue("currentHP", currentHP+amount);
    } else {
        setValue("currentHP", maxHP);
    }
}

function longRest() {
    resetHP();
    resetHitDice();
}

function shortRest() {
    var currentDice = parseInt(getValue("hitDice"));
    if (currentDice > 0) {
        var currentHP = parseInt(getValue("currentHP"));
        var maxHP = parseInt(getValue("maxHP"));
        var maxDie = parseInt(getValue("hitDie"));
        var hitDieRoll = Math.floor(Math.random() * Math.floor(maxDie));
        var conMod = parseInt(getValue("conMod"));
        if ((currentHP + hitDieRoll + conMod) <= maxHP) {
            setValue("currentHP", currentHP+hitDieRoll+conMod);
        } else {
            setValue("currentHP", maxHP);
        }
        setValue("hitDice", currentDice-1);
    }
}

function resetHP() {
    setValue("currentHP", getValue("maxHP"));
}

function resetHitDice() {
    var currentDice = parseInt(getValue("hitDice"));
    var maxDice = parseInt(getValue("playerLevel"));
    if(currentDice < maxDice){
        setValue("hitDice", currentDice + Math.floor((maxDice-currentDice)/2));
    }
}
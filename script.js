var characterData = [];

function getValue(element){
    return document.getElementById(element).value;
}

function setValue(element, newValue){
    document.getElementById(element).value = newValue;
}

function changeEnabled(element, state){
    document.getElementById(element).disabled = state;
}

function loadSheet() {
    var file =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKNE_Z7AZ7zHus002EWtn2nQwgQmAsKEgjvru2cdrUzlZ4wj5vfIfK4-qZvJriyf8ecBMHw_JMLIro/pub?gid=0&single=true&output=csv";
  
    Papa.parse(file, {
      download: true,
      header: true,
      complete: function (results) {
        characterData = results.data;
        populateData(characterData);
      }
    });
  }
  
  function populateData(data) {
    var playerList;
    var uniquePlayers = [];
    for (var i = 0; i < data.length; i++) {
      if (!uniquePlayers.includes(data[i].PlayerName))
      {
        uniquePlayers.push(data[i].PlayerName);
        playerList += '<option>' + data[i].PlayerName + '</option>';
      } 
    } 
    document.getElementById("players").innerHTML = playerList;
    loadPlayer();
  }
  
  function loadPlayer() {
    var selectedPlayer = document.getElementById("playerSelect").value;
    var playerCharacters;
    for (var i = 0; i < characterData.length; i++) {
      if (characterData[i].PlayerName == selectedPlayer)
      {
        playerCharacters += '<option>' + characterData[i].CharacterName + '</option>';
      } 
    }
    document.getElementById("characters").innerHTML = playerCharacters;
    loadCharacter();
  }
  

function loadCharacter() {
    updateHP();
    updateCurrentHP();
    updateHitDice();
    updateSkillProficiency();
    updateAbilityScores();
    loadGear();
    updateAC();
    setLevel();
    setSkills();
    setSaves();
    loadRace();
    applyRace();
}

function setLevel(){
    var selectedCharacter = getValue("characterSelect");
    for (var i = 0; i < characterData.length; i++) {
        if (characterData[i].CharacterName == selectedCharacter) {
            setValue("playerLevel", characterData[i].Level);
            updateProfBonus();
            return;
        }
    }
}

function updateProfBonus() {
  // update proficiency bonus based on player level
  
  var level = getValue("playerLevel");
  setValue("profBonus", Math.floor(2 + ((level-1)/4)));
    
}

function updateAbilityScores() {
    var selectedCharacter = getValue("characterSelect");
    for (var i = 0; i < characterData.length; i++){
        if (characterData[i].CharacterName == selectedCharacter){
            setValue("strScore", characterData[i].STR);
            setValue("dexScore", characterData[i].DEX);
            setValue("conScore", characterData[i].CON);
            setValue("intScore", characterData[i].INT);
            setValue("wisScore", characterData[i].WIS);
            setValue("chaScore", characterData[i].CHA);
            updateModifiers();
            return;
        }
    }
}

function  updateSkillProficiency() {
    var selectedCharacter = getValue("characterSelect");
    for (var i = 0; i < characterData.length; i++) {
        if (characterData[i].CharacterName == selectedCharacter) {
            document.getElementById("strProf").checked = IsTrue(characterData[i].strSave);
            document.getElementById("dexProf").checked = IsTrue(characterData[i].dexSave);
            document.getElementById("conProf").checked = IsTrue(characterData[i].conSave);
            document.getElementById("intProf").checked = IsTrue(characterData[i].intSave);
            document.getElementById("wisProf").checked = IsTrue(characterData[i].wisSave);
            document.getElementById("chaProf").checked = IsTrue(characterData[i].chaSave);
            setSaves();
            document.getElementById("acroProf").checked = IsTrue(characterData[i].acrobatics); 
            document.getElementById("animProf").checked = IsTrue(characterData[i].animalHandling);
            document.getElementById("arcaProf").checked = IsTrue(characterData[i].arcana);
            document.getElementById("athlProf").checked = IsTrue(characterData[i].athletics);
            document.getElementById("decProf").checked = IsTrue(characterData[i].deception);
            document.getElementById("hisProf").checked = IsTrue(characterData[i].history);
            document.getElementById("insProf").checked = IsTrue(characterData[i].insight);
            document.getElementById("intiProf").checked = IsTrue(characterData[i].intimidation);
            document.getElementById("invProf").checked = IsTrue(characterData[i].investigation);
            document.getElementById("medProf").checked = IsTrue(characterData[i].medicine);
            document.getElementById("natProf").checked = IsTrue(characterData[i].nature);
            document.getElementById("percProf").checked = IsTrue(characterData[i].perception);
            document.getElementById("perfProf").checked = IsTrue(characterData[i].performance);
            document.getElementById("persProf").checked = IsTrue(characterData[i].persuasion);
            document.getElementById("relProf").checked = IsTrue(characterData[i].religion);
            document.getElementById("sleiProf").checked = IsTrue(characterData[i].sleightOfHand);
            document.getElementById("steProf").checked = IsTrue(characterData[i].stealth);
            document.getElementById("survProf").checked = IsTrue(characterData[i].survival);
            setSkills();

            return;
        }
    }
}

function updateCurrentHP() {
    var selectedCharacter = getValue("characterSelect");
    for (var i = 0; i < characterData.length; i++) {
        if(characterData[i].CharacterName == selectedCharacter) {
            setValue("currentHP", characterData[i].HP);
        }
    }
}

function updateHitDice() {
    var selectedCharacter = getValue("characterSelect");
    for (var i = 0; i < characterData.length; i++) {
        if(characterData[i].CharacterName == selectedCharacter) {
            setValue("hitDice", characterData[i].HitDice);
            setValue("hitDie", characterData[i].HitDie);
        }
    }    
}

function loadGear() {
    var selectedCharacter = getValue("characterSelect");
    for (var i = 0; i < characterData.length; i++) {
        if(characterData[i].CharacterName == selectedCharacter) {
            setValue("equippedArmor", characterData[i].armor);
            setValue("equippedShield", characterData[i].shield);
        }
    }       
}

function loadRace() {
    var selectedCharacter = getValue("characterSelect");
    for (var i = 0; i < characterData.length; i++) {
        if(characterData[i].CharacterName == selectedCharacter) {
            setValue("race", characterData[i].Race);
        }
    }
}

function applyRace() {
    var strScore = parseInt(getValue("strScore"));
    var dexScore = parseInt(getValue("dexScore"));
    var conScore = parseInt(getValue("conScore"));
    var intScore = parseInt(getValue("intScore"));
    var wisScore = parseInt(getValue("wisScore"));
    var chaScore = parseInt(getValue("chaScore"));
    var race = race.value;

    if (race == 'hillDwarf'){
        setValue("conScore", conScore+2);
        setValue("wisScore", wisScore+1);
    } else if (race == 'mountainDwarf'){
        setValue("conScore", conScore+2);
        setValue("strScore", strScore+2);
    }

    updateModifiers();
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
    setSaves();
    enableArmor();
    updateAC();
    updateHP();
}

function setSaves(){
    var profBonus = parseInt(getValue("profBonus"));
    var strMod = parseInt(getValue("strMod"));
    var dexMod = parseInt(getValue("dexMod"));
    var conMod = parseInt(getValue("conMod"));
    var intMod = parseInt(getValue("intMod"));
    var wisMod = parseInt(getValue("wisMod"));
    var chaMod = parseInt(getValue("chaMod")); 

    if (document.getElementById("strProf").checked == true) {
        setValue("strProf", true);
        setValue("strSave", strMod+profBonus);
    } else {
        setValue("strProf", false);
        setValue("strSave", strMod);
    }
    if (document.getElementById("dexProf").checked == true) {
        setValue("dexProf", true);
        setValue("dexSave", dexMod+profBonus);
    } else {
        setValue("dexProf", false);
        setValue("dexSave", dexMod);
    }
    if (document.getElementById("conProf").checked == true) {
        setValue("conProf", true);
        setValue("conSave", conMod+profBonus);
    } else {
        setValue("conProf", false);
        setValue("conSave", conMod);
    }
    if (document.getElementById("intProf").checked == true) {
        setValue("intProf", true);
        setValue("intSave", intMod+profBonus);
    } else {
        setValue("intProf", false);
        setValue("intSave", intMod);
    }
    if (document.getElementById("wisProf").checked == true) {
        setValue("wisProf", true);
        setValue("wisSave", wisMod+profBonus);
    } else {
        setValue("wisProf", false);
        setValue("wisSave", wisMod);
    }
    if (document.getElementById("chaProf").checked == true) {
        setValue("chaProf", true);
        setValue("chaSave", chaMod+profBonus);
    } else {
        setValue("chaProf", false);
        setValue("chaSave", chaMod);
    }
}

function setSkills(){
    var profBonus = parseInt(getValue("profBonus"));
    var strMod = parseInt(getValue("strMod"));
    var dexMod = parseInt(getValue("dexMod"));
    var intMod = parseInt(getValue("intMod"));
    var wisMod = parseInt(getValue("wisMod"));
    var chaMod = parseInt(getValue("chaMod"));

    if (document.getElementById("acroProf").checked == true) {
        setValue("acroProf", true);
        setValue("acroScore", dexMod+profBonus);
    } else {
        setValue("acroProf", false);
        setValue("acroScore", dexMod);
    }
    if (document.getElementById("animProf").checked == true) {
        setValue("animProf", true);
        setValue("animScore", wisMod+profBonus);
    } else {
        setValue("animProf", false);
        setValue("animScore", wisMod);
    }
    if (document.getElementById("arcaProf").checked == true) {
        setValue("arcaProf", true);
        setValue("arcaScore", intMod+profBonus);
    } else {
        setValue("arcaProf", false);
        setValue("arcaScore", intMod);
    }
    if (document.getElementById("athlProf").checked == true) {
        setValue("athlProf", true);
        setValue("athlScore", strMod+profBonus);
    } else {
        setValue("athlProf", false);
        setValue("athlScore", strMod);
    }
    if (document.getElementById("decProf").checked == true) {
        setValue("decProf", true);
        setValue("decScore", chaMod+profBonus);
    } else {
        setValue("decProf", false);
        setValue("decScore", chaMod);
    }
    if (document.getElementById("hisProf").checked == true) {
        setValue("hisProf", true);
        setValue("hisScore", intMod+profBonus);
    } else {
        setValue("hisProf", false);
        setValue("hisScore", intMod);
    }
    if (document.getElementById("insProf").checked == true) {
        setValue("insProf", true);
        setValue("insScore", wisMod+profBonus);
    } else {
        setValue("insProf", false);
        setValue("insScore", wisMod);
    }
    if (document.getElementById("intiProf").checked == true) {
        setValue("intiProf", true);
        setValue("intiScore", chaMod+profBonus);
    } else {
        setValue("intiProf", false);
        setValue("intiScore", chaMod);
    }
    if (document.getElementById("invProf").checked == true) {
        setValue("invProf", true);
        setValue("invScore", intMod+profBonus);
    } else {
        setValue("invProf", false);
        setValue("invScore", intMod);
    }
    if (document.getElementById("medProf").checked == true) {
        setValue("medProf", true);
        setValue("medScore", wisMod+profBonus);
    } else {
        setValue("medProf", false);
        setValue("medScore", wisMod);
    }
    if (document.getElementById("natProf").checked == true) {
        setValue("natProf", true);
        setValue("natScore", intMod+profBonus);
    } else {
        setValue("natProf", false);
        setValue("natScore", intMod);
    }
    if (document.getElementById("percProf").checked == true) {
        setValue("percProf", true);
        setValue("percScore", wisMod+profBonus);
    } else {
        setValue("percProf", false);
        setValue("percScore", wisMod);
    }
    if (document.getElementById("perfProf").checked == true) {
        setValue("perfProf", true);
        setValue("perfScore", chaMod+profBonus);
    } else {
        setValue("perfProf", false);
        setValue("perfScore", chaMod);
    }
    if (document.getElementById("persProf").checked == true) {
        setValue("persProf", true);
        setValue("persScore", chaMod+profBonus);
    } else {
        setValue("persProf", false);
        setValue("persScore", chaMod);
    }
    if (document.getElementById("relProf").checked == true) {
        setValue("relProf", true);
        setValue("relScore", intMod+profBonus);
    } else {
        setValue("relProf", false);
        setValue("relScore", intMod);
    }
    if (document.getElementById("sleiProf").checked == true) {
        setValue("sleiProf", true);
        setValue("sleiScore", dexMod+profBonus);
    } else {
        setValue("sleiProf", false);
        setValue("sleiScore", dexMod);
    }
    if (document.getElementById("steProf").checked == true) {
        setValue("steProf", true);
        setValue("steScore", dexMod+profBonus);
    } else {
        setValue("steProf", false);
        setValue("steScore", dexMod);
    }
    if (document.getElementById("survProf").checked == true) {
        setValue("survProf", true);
        setValue("survScore", wisMod+profBonus);
    } else {
        setValue("survProf", false);
        setValue("survScore", wisMod);
    }
}

function updateAC(){
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
    var shield = equippedShield.value;
    if (shield == 'shield'){
        setValue("armorClass", parseInt(getValue("armorClass")) + 2);
    } else {
        setValue("armorClass", parseInt(getValue("armorClass")));
    }
}

function enableArmor(){
    var strScore = getValue("strScore");
    if (strScore >= 15) {
        changeEnabled("plateArmor", false);
        changeEnabled("chainmailArmor", false);
        changeEnabled("splintArmor", false);
    } else if (strScore >= 13) {
        changeEnabled("plateArmor", true);
        changeEnabled("chainmailArmor", false);
        changeEnabled("splintArmor", true);
    } else {
        changeEnabled("plateArmor", true);
        changeEnabled("chainmailArmor", true);
        changeEnabled("splintArmor", true)
    }
}

function applyClass(){
    var playerClass = getValue("class");
    var conMod = parseInt(getValue("conMod"));
    var level = parseInt(getValue("playerLevel"));
    updateHP();
    enableSubclass();
}

function enableSubclass(){
    var playerClass = getValue("class");
    var level = getValue("playerLevel");
    if (playerClass == "barbarian" && level >= 3){
        changeEnabled("barbarian", false);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "bard" && level >= 3){
        changeEnabled("barbarian", true);
        changeEnabled("bard", false);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "cleric" && level >= 1){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", false);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "druid" && level >= 2){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", false);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "fighter" && level >= 3){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", false);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "monk" && level >= 3){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", false);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "paladin" && level >= 3){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", false);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "ranger" && level >= 3){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", false);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "rogue" && level >= 3){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", false);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "sorcerer" && level >= 1){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", false);
        changeEnabled("warlock", true);
        changeEnabled("wizard", true);
    } else if (playerClass == "warlock" && level >= 1){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", false);
        changeEnabled("wizard", true);
    } else if (playerClass == "wizard" && level >= 2){
        changeEnabled("barbarian", true);
        changeEnabled("bard", true);
        changeEnabled("cleric", true);
        changeEnabled("druid", true);
        changeEnabled("fighter", true);
        changeEnabled("monk", true);
        changeEnabled("paladin", true);
        changeEnabled("ranger", true);
        changeEnabled("rogue", true);
        changeEnabled("sorcerer", true);
        changeEnabled("warlock", true);
        changeEnabled("wizard", false);
    }
}

function updateHP(){
    var playerClass = getValue("class");
    var conMod = parseInt(getValue("conMod"));
    var level = parseInt(getValue("playerLevel"));
    if(playerClass == "barbarian"){
        setValue("maxHP", 12+conMod+((level-1)*(7+conMod)));
        setValue("hitDie", 12);
    } else if (playerClass == "paladin" || playerClass == "fighter" || playerClass == "ranger"){
        setValue("maxHP", 10+conMod+((level-1)*(6+conMod)));
        setValue("hitDie", 10);
    } else if (playerClass == "wizard") {
        setValue("maxHP", 6+conMod+((level-1)*(4+conMod)));
        setValue("hitDie", 6);
    } else {
        setValue("maxHP", 8+conMod+((level-1)*(5+conMod)));
        setValue("hitDie", 8);
    }
}

function playerLevelChange() {
    applyClass();
    enableSubclass();
    updateProfBonus();
    updateModifiers();
    setSkills();
    setSaves();
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

function saveData() {
    var formData = new FormData(document.getElementById("charSheet"));
    fetch('https://script.google.com/macros/s/AKfycby7or7dKqkC0iCdCbAnBxtmeI8ACcRi-FjwrJcvtBxGXKcX-q8fFot1vJ0piXr5Eg/exec', 
            {
        method: 'post',
        body: formData,
    })
}

function IsTrue(string) {
    if (string.toLowerCase() == 'true') { return true; }
}

window.onload = loadSheet();
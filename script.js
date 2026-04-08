// ==========================================
// PSYCHNOTE ENGINE — JS V4 (CUMULATIVE)
// ==========================================

// ---------------- STATE GLOBAL ----------------

const state = {
  gender: "femme",
  type: "administratif",
  subType: "rapport mutuelle",
  mode: "complet",
  output: "texte",
  theme: "clair",

  selected: {},

  tasks: [],
  patients: [],
  habits: [],

  withdrawalPlan: ""
};

// ---------------- HELPERS ----------------

const $ = id => document.getElementById(id);

function clean(s){
  return (s || "").trim();
}

function cap(s){
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

function join(arr){
  if(!arr || !arr.length) return "";
  if(arr.length === 1) return arr[0];
  return arr.slice(0,-1).join(", ") + " et " + arr[arr.length-1];
}

// ---------------- GRAMMAIRE ----------------

function G(){
  const m = state.gender === "homme";

  return {
    civ: m ? "Monsieur" : "Madame",
    patient: m ? "le patient" : "la patiente",
    orienté: m ? "orienté" : "orientée",
    suivi: m ? "suivi" : "suivie"
  };
}

// ---------------- TOKENS ----------------

document.addEventListener("click", e => {

  const t = e.target.closest(".token");
  if(t){
    const key = t.dataset.key;
    const val = t.dataset.value;

    if(!state.selected[key]) state.selected[key] = [];

    const arr = state.selected[key];
    const i = arr.indexOf(val);

    if(i >= 0){
      arr.splice(i,1);
      t.classList.remove("active");
    } else {
      arr.push(val);
      t.classList.add("active");
    }

    generate();
  }

});

// ---------------- PANELS ----------------

$("toggleLeft").onclick = () => {
  $("leftPanel").classList.toggle("collapsed");
};

$("toggleRight").onclick = () => {
  $("rightPanel").classList.toggle("collapsed");
};

// ---------------- EXAMEN CLINIQUE ----------------

function buildMSE(){

  const g = G();
  let txt = "";

  txt += `${g.patient} bien ${g.orienté} dans le temps et l’espace`;

  if(state.selected.mseContactChoices?.length)
    txt += `, ${join(state.selected.mseContactChoices)}`;

  if(state.selected.msePresentationChoices?.length)
    txt += `, ${join(state.selected.msePresentationChoices)}`;

  txt += ". ";

  if(state.selected.mseCollaborationChoices?.length)
    txt += `${cap(join(state.selected.mseCollaborationChoices))}. `;

  if(state.selected.msePsychomotorChoices?.length)
    txt += `${cap(join(state.selected.msePsychomotorChoices))}. `;

  let middle = [];

  if(state.selected.mseMoodChoices?.length)
    middle.push(join(state.selected.mseMoodChoices));

  if(state.selected.mseAnxietyChoices?.length)
    middle.push(join(state.selected.mseAnxietyChoices));

  if(state.selected.mseThoughtChoices?.length)
    middle.push(join(state.selected.mseThoughtChoices));

  if(state.selected.mseTraumaChoices?.length)
    middle.push(join(state.selected.mseTraumaChoices));

  if(middle.length)
    txt += cap(join(middle)) + ". ";

  // idées suicidaires
  if(state.selected.riskIdeasChoices?.includes("actives"))
    txt += "Présence d’idées suicidaires actives. ";
  else if(state.selected.riskIdeasChoices?.includes("passives"))
    txt += "Présence d’idées noires passives. ";
  else
    txt += "Absence d’idées noires. ";

  if(state.selected.riskAttemptChoices?.length)
    txt += `${cap(join(state.selected.riskAttemptChoices))}. `;

  if(state.selected.mseBehaviorChoices?.length)
    txt += `${cap(join(state.selected.mseBehaviorChoices))}. `;

  if(state.selected.mseSleepChoices?.length)
    txt += `${cap(join(state.selected.mseSleepChoices))}. `;

  if(state.selected.mseFoodChoices?.length)
    txt += `${cap(join(state.selected.mseFoodChoices))}. `;

  if(clean($("mseFree")?.value))
    txt += cap(clean($("mseFree").value)) + ". ";

  return txt;
}

// ---------------- TRAITEMENT ----------------

function buildTreatment(){

  let txt = "";

  if(state.selected.medicationPresenceChoices?.includes("sans traitement médicamenteux")){
    txt += "Sans traitement médicamenteux. ";
  }

  if(state.selected.medMoleculeChoices?.length){
    txt += `Traitement : ${join(state.selected.medMoleculeChoices)}`;

    const dose = $("medDose")?.value;
    if(dose) txt += ` (${dose})`;

    txt += ". ";
  }

  if(clean($("treatment")?.value)){
    txt += $("treatment").value + ". ";
  }

  return txt;
}

// ---------------- PSYCHOSOCIAL ----------------

function buildPsycho(){

  let arr = [];

  if(state.selected.psyWorkChoices?.length)
    arr.push(`situation professionnelle : ${join(state.selected.psyWorkChoices)}`);

  if(state.selected.psyIncomeChoices?.length)
    arr.push(`revenus : ${join(state.selected.psyIncomeChoices)}`);

  if(state.selected.psyFamilyChoices?.length)
    arr.push(`famille : ${join(state.selected.psyFamilyChoices)}`);

  if(clean($("psyChildren")?.value))
    arr.push(`enfants : ${$("psyChildren").value}`);

  if(state.selected.psyHousingChoices?.length)
    arr.push(`logement : ${join(state.selected.psyHousingChoices)}`);

  if(clean($("psyFree")?.value))
    arr.push($("psyFree").value);

  return arr.length ? cap(arr.join(", ")) + "." : "";
}

// ---------------- CONSOMMATION ----------------

function buildConsumption(){

  let txt = "";

  if(state.selected.alcTypeChoices?.length){
    txt += `Consommation d’alcool : ${join(state.selected.alcTypeChoices)}. `;
  }

  if(clean($("alcQty")?.value))
    txt += `Quantité : ${$("alcQty").value}. `;

  if(state.selected.otherSubstanceChoices?.length)
    txt += `Autres substances : ${join(state.selected.otherSubstanceChoices)}. `;

  return txt;
}

// ---------------- DSM (simple intelligent) ----------------

function buildDSM(){

  let dx = [];

  const mood = state.selected.mseMoodChoices || [];

  if(mood.includes("humeur triste") || mood.includes("humeur abaissée")){
    dx.push("épisode dépressif probable");
  }

  if(state.selected.mseAnxietyChoices?.length){
    dx.push("trouble anxieux possible");
  }

  if(state.selected.alcDependenceChoices?.length){
    dx.push("trouble lié à l’usage d’alcool");
  }

  return dx.length ? dx.join(" ; ") : "à préciser";
}

// ---------------- MUTUELLE ----------------

function buildMutuelle(){

  const g = G();
  let txt = "";

  const dx = state.selected.mutDxChoices || [];

  txt += `Je vois en consultation de psychiatrie ${g.civ} pour ${dx.length ? join(dx) : "une symptomatologie à préciser"}.`;
  txt += "\n\n";

  if(state.selected.mutInitialChoices?.length){
    txt += `Au début de la prise en charge, le tableau était marqué par ${join(state.selected.mutInitialChoices)}.\n\n`;
  }

  if(state.selected.mutCurrentChoices?.length){
    txt += `Actuellement, il persiste ${join(state.selected.mutCurrentChoices)}.\n\n`;
  }

  txt += `Sur le plan clinique, ${buildMSE()}\n\n`;

  const psycho = buildPsycho();
  if(psycho){
    txt += `Sur le plan psychosocial, ${psycho}\n\n`;
  }

  if(state.selected.mutFunctionChoices?.length){
    txt += `Le retentissement fonctionnel est marqué par ${join(state.selected.mutFunctionChoices)}.\n\n`;
  }

  if(state.selected.mutWorkChoices?.includes("non compatible")){
    txt += `${g.civ} ne présente pas un état compatible avec une reprise du travail.\n\n`;
  }

  txt += buildTreatment() + "\n\n";

  txt += "La poursuite du traitement est encouragée. ";
  txt += "Je reste à disposition pour de plus amples informations.";

  return txt;
}

// ---------------- GÉNÉRATION ----------------

function generate(){

  let txt = "";

  if(state.output === "questionnaire"){
    txt = "QUESTIONNAIRE CLINIQUE\n\n(à compléter)";
  }
  else if(state.subType === "rapport mutuelle"){
    txt = buildMutuelle();
  }
  else{
    txt = buildMSE() + "\n\n" + buildTreatment();
  }

  $("output").value = txt;
}

// ---------------- TASK SYSTEM ----------------

function addTask(name){
  state.tasks.push({ name, done:false });
}

$("btnRoulette").onclick = () => {

  const list = state.tasks.filter(t => !t.done);

  if(!list.length){
    alert("Rien à faire (suspicious)");
    return;
  }

  const pick = list[Math.floor(Math.random()*list.length)];

  alert("👉 Fais ça maintenant :\n\n" + pick.name);
};

// ---------------- PATIENTS ----------------

$("patientList")?.addEventListener("input", () => {
  state.patients = $("patientList").value.split("\n").filter(x=>x);
});

// ---------------- HABITS ----------------

function renderHabits(){

  const grid = $("habitGrid");
  if(!grid) return;

  grid.innerHTML = "";

  for(let i=0;i<7;i++){
    const cell = document.createElement("div");
    cell.className = "habit-cell";
    grid.appendChild(cell);
  }
}

// ---------------- SEVRAGE ----------------

$("btnBuildWithdrawal")?.addEventListener("click", () => {

  const dose = Number($("withdrawDose").value);
  const days = Number($("withdrawDays").value);
  const drug = $("withdrawDrug").value;

  let txt = "";

  let current = dose;

  for(let i=0;i<days;i++){
    txt += `${drug} ${current} mg\n`;
    current -= Math.round(dose/days);
  }

  txt += "Arrêt";

  state.withdrawalPlan = txt;
  $("withdrawOutput").value = txt;

});

// ---------------- COPY / PRINT ----------------

$("btnCopy").onclick = () => {
  navigator.clipboard.writeText($("output").value);
};

$("btnPrint").onclick = () => {
  window.print();
};

// ---------------- INIT ----------------

function init(){

  renderHabits();
  generate();

}

init();

const STORAGE_KEY = "psychnote_workspace_v7";

const TYPES = [
  "consultation",
  "urgences",
  "hospitalisation",
  "préadmission",
  "administratif",
  "mail"
];

const SUBTYPES = {
  consultation: [
    "première consultation",
    "suivi",
    "note courte",
    "courrier médecin traitant",
    "consultation de crise",
    "avis diagnostique"
  ],
  urgences: [
    "évaluation urgences",
    "décision / orientation"
  ],
  hospitalisation: [
    "admission",
    "semaine 1",
    "semaine 2",
    "évolution intermédiaire",
    "sortie",
    "synthèse d’hospitalisation"
  ],
  "préadmission": [
    "évaluation de préadmission",
    "conclusion d’indication"
  ],
  administratif: [
    "rapport mutuelle",
    "rapport assurance / autre",
    "attestation simple",
    "attestation de présence",
    "attestation de suivi",
    "certificat médical",
    "certificat incapacité",
    "certificat circonstancié simple"
  ],
  mail: [
    "réponse simple",
    "réponse patient",
    "réponse médecin / confrère",
    "transmission clinique brève",
    "relance",
    "confirmation de rendez-vous"
  ]
};

const PRESETS = {
  "rapport mutuelle anxio-dépressif": () => {
    state.type = "administratif";
    state.subType = "rapport mutuelle";
    resetSelections();
    state.gender = "femme";
    state.civility = "auto";
    state.selected.mutDx = ["trouble anxio-dépressif persistant"];
    state.selected.mutInitial = ["une anxiété envahissante", "une anhédonie marquée", "des troubles du sommeil"];
    state.selected.mutCurrent = ["une symptomatologie anxieuse persistante", "une amélioration seulement partielle", "des difficultés de concentration"];
    state.selected.mutWork = "non compatible";
    state.selected.mutFunction = ["altération de la concentration", "fatigabilité importante", "difficulté à maintenir un rythme soutenu"];
    state.selected.mutConclusion = ["poursuite du traitement encouragée", "je reste à disposition pour de plus amples informations"];
    state.selected.mseMode = "complet";
    state.selected.mseOrientation = ["bien orienté dans le temps et l’espace"];
    state.selected.mseContact = ["contact adéquat"];
    state.selected.msePresentation = ["présentation correcte"];
    state.selected.mseCollaboration = ["bonne collaboration"];
    state.selected.msePsychomotor = ["absence de ralentissement psychomoteur"];
    state.selected.mseMood = ["humeur triste", "humeur fragile"];
    state.selected.mseAnxiety = ["anxiété diffuse", "ruminations anxieuses"];
    state.selected.mseThought = ["discours cohérent", "pensée organisée", "pas d’élément délirant"];
    state.selected.mseBehavior = ["comportement adapté"];
    state.selected.mseSleep = ["insomnie", "sommeil non réparateur"];
    state.selected.mseFood = ["alimentation conservée"];
    state.selected.careType = ["suivi psychiatrique régulier", "psychothérapie"];
    state.selected.medicationPresence = "avec traitement médicamenteux en cours";
  },

  "rapport mutuelle dépression chronique": () => {
    state.type = "administratif";
    state.subType = "rapport mutuelle";
    resetSelections();
    state.selected.mutDx = ["dépression chronique"];
    state.selected.mutInitial = ["une anhédonie marquée", "une perte d’élan vital", "une fatigabilité importante"];
    state.selected.mutCurrent = ["une anhédonie encore marquée", "une baisse de l’élan", "une fragilité clinique persistante"];
    state.selected.mutWork = "non compatible";
    state.selected.mutFunction = ["retentissement fonctionnel global", "altération de l’organisation"];
    state.selected.mutConclusion = ["poursuite du suivi psychiatrique encouragée", "je reste à disposition pour de plus amples informations"];
  },

  "consultation suivi anxio-dépressif": () => {
    state.type = "consultation";
    state.subType = "suivi";
    resetSelections();
    state.selected.mutDx = ["trouble anxio-dépressif"];
    state.selected.mseMood = ["humeur triste"];
    state.selected.mseAnxiety = ["anxiété diffuse", "ruminations anxieuses"];
    state.selected.mseSleep = ["insomnie"];
    state.selected.careType = ["suivi psychiatrique régulier"];
  },

  "urgences crise suicidaire": () => {
    state.type = "urgences";
    state.subType = "évaluation urgences";
    resetSelections();
    state.selected.mutDx = ["symptomatologie anxio-dépressive"];
    state.selected.suicideIdeas = "actives";
    state.selected.mseMood = ["humeur triste"];
    state.selected.mseAnxiety = ["angoisse majeure"];
  },

  "préadmission sevrage alcool": () => {
    state.type = "préadmission";
    state.subType = "évaluation de préadmission";
    resetSelections();
    state.selected.alcType = ["mixte"];
    state.selected.alcPattern = ["quotidien"];
    state.selected.alcWithdrawal = ["hospitalier", "sevrage simple"];
    setField("alcQty", "8 unités/jour");
  },

  "hospitalisation semaine 1": () => {
    state.type = "hospitalisation";
    state.subType = "semaine 1";
    resetSelections();
    state.selected.alcType = ["mixte"];
    state.selected.alcPattern = ["quotidien"];
    state.selected.mseMood = ["humeur fragile"];
    state.selected.mseAnxiety = ["anxiété diffuse"];
    state.selected.mseSleep = ["insomnie"];
  },

  "attestation de présence": () => {
    state.type = "administratif";
    state.subType = "attestation de présence";
    resetSelections();
  },

  "mail réponse simple": () => {
    state.type = "mail";
    state.subType = "réponse simple";
    resetSelections();
    state.selected.letterTone = "sobre";
    state.selected.letterType = "réponse clinique";
  }
};

const TOKEN_DEFS = [
  // Left
  { id:"planningVisualChoices", key:"planningVisual", single:true, options:["liste","ligne du temps","tableau de bord"] },
  { id:"dayTemplateChoices", key:"dayTemplate", single:true, options:[
    "lundi matin 74",
    "lundi après-midi consultations",
    "mardi matin entretiens 74",
    "mardi après-midi préadmissions",
    "journée mixte",
    "demi-journée légère",
    "demi-journée lourde"
  ]},
  { id:"timeBlockChoices", key:"timeBlock", single:true, options:[
    "matin",
    "après-midi",
    "demi-journée complète",
    "bloc administratif",
    "bloc rapports",
    "bloc mails"
  ]},
  { id:"taskTypeChoices", key:"taskType", single:false, options:[
    "rapport",
    "mail",
    "appel",
    "consultation",
    "administratif",
    "organisation",
    "facturation",
    "lecture",
    "article",
    "clôture dossier",
    "préparation de semaine",
    "préadmission sevrage"
  ]},
  { id:"taskPriorityChoices", key:"taskPriority", single:true, options:["haute","moyenne","basse"] },
  { id:"taskEnergyChoices", key:"taskEnergy", single:true, options:["très simple","simple","moyen","lourd"] },
  { id:"patientChecklistChoices", key:"patientChecklist", single:false, options:[
    "patient vu",
    "note faite",
    "traitement adapté",
    "communication réseau",
    "contact assistante sociale",
    "courrier envoyé",
    "dossier fermé"
  ]},
  { id:"dailyGoalChoices", key:"dailyGoalStatus", single:true, options:["non commencé","en cours","objectif atteint"] },
  { id:"habitChoices", key:"habitChoices", single:false, options:[
    "sport",
    "batterie",
    "guitare",
    "lecture",
    "2L eau",
    "marche",
    "coucher tôt",
    "article",
    "prière"
  ]},
  { id:"historyViewChoices", key:"historyView", single:true, options:["semaine passée","semaine à venir","mois","historique libre"] },

  // Right
  { id:"genderChoices", key:"gender", single:true, direct:"gender", options:["femme","homme"] },
  { id:"civilityChoices", key:"civility", single:true, direct:"civility", options:["auto","madame","monsieur"] },

  { id:"mseModeChoices", key:"mseMode", single:true, options:["rapide","complet"] },
  { id:"mseOrientationChoices", key:"mseOrientation", single:false, options:["bien orienté dans le temps et l’espace","partiellement désorienté","désorienté"] },
  { id:"mseContactChoices", key:"mseContact", single:false, options:["contact adéquat","contact distant","contact méfiant","contact fuyant","contact engageant"] },
  { id:"msePresentationChoices", key:"msePresentation", single:false, options:["présentation soignée","présentation correcte","présentation négligée"] },
  { id:"mseCollaborationChoices", key:"mseCollaboration", single:false, options:["bonne collaboration","collaboration partielle","collaboration limitée"] },
  { id:"msePsychomotorChoices", key:"msePsychomotor", single:false, options:["absence de ralentissement psychomoteur","ralentissement psychomoteur","agitation psychomotrice"] },
  { id:"mseMoodChoices", key:"mseMood", single:false, options:["humeur triste","humeur abaissée","humeur anxieuse","humeur fragile","humeur irritable","humeur stable"] },
  { id:"mseAnxietyChoices", key:"mseAnxiety", single:false, options:["anxiété diffuse","ruminations anxieuses","tension interne","angoisse majeure","hypervigilance"] },
  { id:"mseThoughtChoices", key:"mseThought", single:false, options:["discours cohérent","pensée organisée","ruminations","pas d’élément délirant","éléments délirants","pas de désorganisation","éléments traumatiques"] },
  { id:"mseTraumaChoices", key:"mseTrauma", single:false, options:["hypervigilance","reviviscences","évitement","pas d’élément traumatique mis en avant"] },
  { id:"riskIdeasChoices", key:"suicideIdeas", single:true, options:["absence","passives","actives"] },
  { id:"riskAttemptChoices", key:"riskAttempts", single:false, options:["pas d’antécédent de passage à l’acte","antécédent(s) de passage à l’acte"] },
  { id:"mseBehaviorChoices", key:"mseBehavior", single:false, options:["comportement adapté","attitude de retrait","évitement","agitation","coopérant"] },
  { id:"mseSleepChoices", key:"mseSleep", single:false, options:["sommeil conservé","insomnie","réveils nocturnes","sommeil non réparateur","endormissement difficile"] },
  { id:"mseFoodChoices", key:"mseFood", single:false, options:["alimentation conservée","appétit diminué","alimentation irrégulière"] },

  { id:"careTypeChoices", key:"careType", single:false, options:["suivi psychiatrique régulier","psychothérapie","prise en charge pluridisciplinaire","centre de jour","accompagnement ambulatoire"] },
  { id:"medicationPresenceChoices", key:"medicationPresence", single:true, options:["sans traitement médicamenteux","avec traitement médicamenteux en cours"] },
  { id:"medClassChoices", key:"medClass", single:false, options:["ISRS","IRSNa","antipsychotique","benzodiazépine","hypnotique","autre"] },
  { id:"medMoleculeChoices", key:"medMolecule", single:false, options:["sertraline","escitalopram","fluoxétine","venlafaxine","duloxétine","aripiprazole","quétiapine","olanzapine","trazodone","diazépam","lorazépam"] },

  { id:"psyWorkChoices", key:"psyWork", single:false, options:["travail","arrêt de travail","incapacité","chômage","sans activité","études"] },
  { id:"psyIncomeChoices", key:"psyIncome", single:false, options:["salaire","mutuelle","chômage","CPAS","revenus à préciser"] },
  { id:"psyFamilyChoices", key:"psyFamily", single:false, options:["vit seul","vit en couple","soutien familial","conflits familiaux","enfants à charge","réseau limité"] },
  { id:"psyHousingChoices", key:"psyHousing", single:false, options:["logement stable","hébergé","chez les parents","logement instable","institution"] },

  { id:"mutDxChoices", key:"mutDx", single:false, options:[
    "trouble anxio-dépressif persistant",
    "trouble anxio-dépressif",
    "dépression chronique",
    "trouble dépressif caractérisé",
    "trouble anxieux généralisé",
    "symptomatologie anxio-dépressive",
    "trouble de l’adaptation avec humeur anxio-dépressive"
  ]},
  { id:"mutInitialChoices", key:"mutInitial", single:false, options:[
    "une anxiété envahissante",
    "une anhédonie marquée",
    "une perte d’élan vital",
    "des idées noires intermittentes",
    "des troubles du sommeil",
    "un isolement social important",
    "des ruminations anxieuses",
    "une fatigabilité importante",
    "des difficultés de concentration",
    "un ralentissement global"
  ]},
  { id:"mutCurrentChoices", key:"mutCurrent", single:false, options:[
    "une symptomatologie anxieuse persistante",
    "une anhédonie encore marquée",
    "des ruminations envahissantes",
    "une fatigabilité importante",
    "des troubles du sommeil",
    "une baisse de l’élan",
    "des difficultés de concentration",
    "une fragilité clinique persistante",
    "une amélioration seulement partielle"
  ]},
  { id:"mutWorkChoices", key:"mutWork", single:true, options:["compatible","partiellement compatible","non compatible"] },
  { id:"mutFunctionChoices", key:"mutFunction", single:false, options:[
    "altération de la concentration",
    "altération de l’organisation",
    "fatigabilité importante",
    "difficulté à maintenir un rythme soutenu",
    "difficulté d’adaptation au cadre professionnel",
    "retentissement fonctionnel global"
  ]},
  { id:"mutConclusionChoices", key:"mutConclusion", single:false, options:[
    "poursuite du traitement encouragée",
    "poursuite du suivi psychiatrique encouragée",
    "réévaluation ultérieure recommandée",
    "je reste à disposition pour de plus amples informations"
  ]},

  { id:"letterTypeChoices", key:"letterType", single:true, options:["réponse clinique","réponse administrative","courrier simple","transmission"] },
  { id:"letterToneChoices", key:"letterTone", single:true, options:["sobre","chaleureux","professionnel","direct"] },
  { id:"letterActionChoices", key:"letterAction", single:false, options:["confirmer","demander un retour","transmettre un document","reporter","remercier","clarifier la suite"] },

  // Bottom
  { id:"alcTypeChoices", key:"alcType", single:false, options:["bière","vin","alcool fort","mixte"] },
  { id:"alcPatternChoices", key:"alcPattern", single:false, options:["quotidien","épisodique","binge","majoré le soir","avec consommation matinale"] },
  { id:"alcFunctionChoices", key:"alcFunction", single:false, options:["anxiolytique","sommeil","socialisation","gestion émotion","habitude","solitude"] },
  { id:"alcDependenceChoices", key:"alcDependence", single:false, options:["craving","perte de contrôle","tolérance","symptômes de sevrage","retentissement social","retentissement professionnel"] },
  { id:"alcWithdrawalChoices", key:"alcWithdrawal", single:false, options:["ambulatoire","hospitalier","sevrage simple","sevrage compliqué","DT","convulsions"] },

  { id:"otherSubstanceChoices", key:"otherSubstances", single:false, options:["cannabis","cocaïne","benzodiazépines","opiacés","tabac","autres"] }
];

const state = {
  gender: "femme",
  civility: "auto",
  type: "administratif",
  subType: "rapport mutuelle",
  mode: "complet",
  output: "texte",
  theme: "clair",
  font: "inter",
  leftView: "day",
  selected: {},
  tasks: [],
  patients: [],
  docs: [],
  activeDocId: null,
  habitTrack: {}
};

const $ = (id) => document.getElementById(id);

function cleanText(s){
  return (s || "").replace(/\s+/g, " ").trim();
}

function sentence(s){
  const t = cleanText(s);
  if(!t) return "";
  return /[.!?]$/.test(t) ? t : t + ".";
}

function cap(s){
  const t = cleanText(s);
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
}

function joinClinical(arr){
  const items = (arr || []).filter(Boolean);
  if(!items.length) return "";
  if(items.length === 1) return items[0];
  if(items.length === 2) return `${items[0]} et ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

function getTokenDefByKey(key){
  return TOKEN_DEFS.find(def => def.key === key);
}

function resetSelections(){
  state.selected = {};
  TOKEN_DEFS.forEach(def => {
    state.selected[def.key] = def.single ? "" : [];
  });
}

resetSelections();

function setField(id, value){
  if($(id)) $(id).value = value;
}

function getField(id){
  return $(id) ? $(id).value : "";
}

function genderPack(){
  const male = state.gender === "homme";
  const civ = state.civility === "auto"
    ? (male ? "Monsieur" : "Madame")
    : (state.civility === "monsieur" ? "Monsieur" : "Madame");

  return {
    male,
    civ,
    patient: male ? "le patient" : "la patiente",
    Patient: male ? "Le patient" : "La patiente",
    vu: male ? "vu" : "vue",
    orienté: male ? "orienté" : "orientée",
    suivi: male ? "suivi" : "suivie",
    présenté: male ? "présenté" : "présentée"
  };
}

function currentDiagnosisText(){
  const dx = [
    ...(state.selected.mutDx || []),
    cleanText(getField("mutDxFree"))
  ].filter(Boolean);
  return dx.length ? joinClinical(dx) : "une symptomatologie à préciser";
}

function inferDSM(){
  const dx = [];
  const mood = state.selected.mseMood || [];
  const anx = state.selected.mseAnxiety || [];
  const dep = (state.selected.mutDx || []).join(" ").toLowerCase();

  if(dep.includes("dépress") || mood.includes("humeur triste") || mood.includes("humeur abaissée")){
    dx.push("épisode dépressif probable");
  }
  if(dep.includes("anx") || anx.length){
    dx.push("trouble anxieux possible");
  }
  if((state.selected.alcDependence || []).length){
    dx.push("trouble lié à l’usage d’alcool");
  }
  return dx.length ? dx.join(" ; ") : "à préciser";
}

function suggestMedication(){
  const recos = [];
  const dx = currentDiagnosisText().toLowerCase();

  if(dx.includes("dépress") || dx.includes("anxio-dépress")){
    recos.push("ISRS en première intention selon tolérance");
  }
  if(dx.includes("anxieux")){
    recos.push("approche non pharmacologique et/ou antidépresseur si persistance");
  }
  if((state.selected.mseSleep || []).some(x => x.includes("insomnie") || x.includes("sommeil non réparateur"))){
    recos.push("traitement à visée hypnotique possible selon le contexte");
  }
  if(cleanText(getField("alcQty"))){
    recos.push("prudence avec les benzodiazépines hors cadre de sevrage structuré");
  }
  return recos.length ? recos.join(" ; ") + "." : "Aucune suggestion particulière.";
}

function buildMSE(){
  const g = genderPack();
  const mode = state.selected.mseMode || "complet";

  if(mode === "rapide"){
    const bits = [];
    if((state.selected.mseOrientation || []).length) bits.push(joinClinical(state.selected.mseOrientation));
    if((state.selected.mseContact || []).length) bits.push(joinClinical(state.selected.mseContact));
    if((state.selected.mseMood || []).length) bits.push(joinClinical(state.selected.mseMood));
    if((state.selected.mseAnxiety || []).length) bits.push(joinClinical(state.selected.mseAnxiety));
    if((state.selected.mseThought || []).length) bits.push(joinClinical(state.selected.mseThought));
    if((state.selected.mseSleep || []).length) bits.push(joinClinical(state.selected.mseSleep));
    if((state.selected.mseFood || []).length) bits.push(joinClinical(state.selected.mseFood));
    const free = cleanText(getField("mseFree"));
    if(free) bits.push(free);
    return bits.length ? cap(bits.join(", ")) + "." : `${g.Patient} bien ${g.orienté} dans le temps et l’espace, contact adéquat.`;
  }

  let txt = "";

  txt += (state.selected.mseOrientation || []).length
    ? `${cap(joinClinical(state.selected.mseOrientation))}, `
    : `${g.Patient} bien ${g.orienté} dans le temps et l’espace, `;

  txt += (state.selected.mseContact || []).length
    ? `${joinClinical(state.selected.mseContact)}, `
    : "contact adéquat, ";

  txt += (state.selected.msePresentation || []).length
    ? `${joinClinical(state.selected.msePresentation)}, `
    : "présentation correcte, ";

  txt += (state.selected.mseCollaboration || []).length
    ? `${joinClinical(state.selected.mseCollaboration)}. `
    : "bonne collaboration. ";

  txt += (state.selected.msePsychomotor || []).length
    ? `${cap(joinClinical(state.selected.msePsychomotor))}. `
    : "Absence de ralentissement psychomoteur. ";

  const middle = [];
  if((state.selected.mseMood || []).length) middle.push(joinClinical(state.selected.mseMood));
  if((state.selected.mseAnxiety || []).length) middle.push(joinClinical(state.selected.mseAnxiety));
  if((state.selected.mseThought || []).length) middle.push(joinClinical(state.selected.mseThought));
  if((state.selected.mseTrauma || []).length) middle.push(joinClinical(state.selected.mseTrauma));
  if(middle.length) txt += `${cap(joinClinical(middle))}. `;

  const risk = state.selected.suicideIdeas;
  if(risk === "absence") txt += "Absence d’idées noires rapportée. ";
  else if(risk === "passives") txt += "Présence d’idées noires passives. ";
  else if(risk === "actives") txt += "Présence d’idées suicidaires actives. ";

  if((state.selected.riskAttempts || []).length){
    txt += `${cap(joinClinical(state.selected.riskAttempts))}. `;
  }

  txt += (state.selected.mseBehavior || []).length
    ? `${cap(joinClinical(state.selected.mseBehavior))}. `
    : "Comportement adapté. ";

  txt += (state.selected.mseSleep || []).length
    ? `${cap(joinClinical(state.selected.mseSleep))}. `
    : "Sommeil conservé. ";

  txt += (state.selected.mseFood || []).length
    ? `${cap(joinClinical(state.selected.mseFood))}. `
    : "Alimentation conservée. ";

  const free = cleanText(getField("mseFree"));
  if(free) txt += sentence(free) + " ";

  return cleanText(txt);
}

function buildTreatment(){
  const chunks = [];
  if((state.selected.careType || []).length){
    chunks.push(`prise en charge actuelle : ${joinClinical(state.selected.careType)}`);
  }

  if(state.selected.medicationPresence){
    chunks.push(state.selected.medicationPresence);
  }

  if((state.selected.medClass || []).length){
    chunks.push(`classe thérapeutique : ${joinClinical(state.selected.medClass)}`);
  }

  if((state.selected.medMolecule || []).length){
    let m = `molécule(s) : ${joinClinical(state.selected.medMolecule)}`;
    const dose = cleanText(getField("medDose"));
    if(dose) m += ` (${dose})`;
    chunks.push(m);
  }

  const raw = cleanText(getField("treatment"));
  if(raw){
    chunks.push(`traitement résumé : ${raw.replace(/\n/g, "; ")}`);
  }

  return chunks.length ? cap(chunks.join(". ")) + "." : "";
}

function buildPsychosocial(){
  const chunks = [];
  if((state.selected.psyWork || []).length) chunks.push(`travail : ${joinClinical(state.selected.psyWork)}`);
  if((state.selected.psyIncome || []).length) chunks.push(`revenus : ${joinClinical(state.selected.psyIncome)}`);
  if((state.selected.psyFamily || []).length) chunks.push(`famille : ${joinClinical(state.selected.psyFamily)}`);
  if(cleanText(getField("psyChildren"))) chunks.push(`enfants : ${cleanText(getField("psyChildren"))}`);
  if((state.selected.psyHousing || []).length) chunks.push(`logement : ${joinClinical(state.selected.psyHousing)}`);
  if(cleanText(getField("psyFree"))) chunks.push(cleanText(getField("psyFree")));
  return chunks.length ? cap(chunks.join(", ")) + "." : "";
}

function buildConsumption(){
  const blocks = [];
  const alc = [];

  if((state.selected.alcType || []).length) alc.push(`type ${joinClinical(state.selected.alcType)}`);
  if(cleanText(getField("alcQty"))) alc.push(`quantité ${cleanText(getField("alcQty"))}`);
  if((state.selected.alcPattern || []).length) alc.push(`pattern ${joinClinical(state.selected.alcPattern)}`);
  if(cleanText(getField("alcLast"))) alc.push(`dernière prise ${cleanText(getField("alcLast"))}`);
  if(cleanText(getField("alcStart"))) alc.push(`début ${cleanText(getField("alcStart"))}`);
  if(cleanText(getField("alcCharacter"))) alc.push(`caractère ${cleanText(getField("alcCharacter"))}`);
  if((state.selected.alcFunction || []).length) alc.push(`fonction ${joinClinical(state.selected.alcFunction)}`);
  if((state.selected.alcDependence || []).length) alc.push(`éléments de dépendance : ${joinClinical(state.selected.alcDependence)}`);
  if((state.selected.alcWithdrawal || []).length) alc.push(`sevrage / ATCD : ${joinClinical(state.selected.alcWithdrawal)}`);
  if(cleanText(getField("alcFree"))) alc.push(cleanText(getField("alcFree")));
  if(alc.length) blocks.push("Alcool : " + sentence(alc.join(", ")));

  const other = [];
  if((state.selected.otherSubstances || []).length) other.push(`substances : ${joinClinical(state.selected.otherSubstances)}`);
  if(cleanText(getField("otherSubstances"))) other.push(cleanText(getField("otherSubstances")));
  if(other.length) blocks.push("Autres consommations : " + sentence(other.join(", ")));

  if(state.withdrawalPlanText){
    blocks.push("Schéma de sevrage :\n" + state.withdrawalPlanText);
  }

  return blocks.join("\n\n");
}

function buildMutuelle(){
  const g = genderPack();
  let txt = "";

  txt += `Je vois en consultation de psychiatrie ${g.civ} pour ${currentDiagnosisText()}.`;
  txt += `\n\n`;

  if((state.selected.mutInitial || []).length){
    txt += `Au début de la prise en charge, le tableau était marqué par ${joinClinical(state.selected.mutInitial)}.\n\n`;
  }

  if((state.selected.mutCurrent || []).length || cleanText(getField("mutContext"))){
    txt += "Actuellement, ";
    if((state.selected.mutCurrent || []).length){
      txt += `il persiste ${joinClinical(state.selected.mutCurrent)}. `;
    }
    if(cleanText(getField("mutContext"))){
      txt += sentence(getField("mutContext")) + " ";
    }
    txt += "\n\n";
  }

  txt += `Sur le plan clinique, ${buildMSE()}\n\n`;

  const psycho = buildPsychosocial();
  if(psycho){
    txt += `Sur le plan psychosocial, ${psycho}\n\n`;
  }

  if((state.selected.mutFunction || []).length || cleanText(getField("mutFunctionFree"))){
    txt += `Le retentissement fonctionnel est marqué par ${joinClinical(state.selected.mutFunction) || "des difficultés fonctionnelles à préciser"}`;
    if(cleanText(getField("mutFunctionFree"))){
      txt += `. ${cap(cleanText(getField("mutFunctionFree")))}`;
      if(!/[.!?]$/.test(cleanText(getField("mutFunctionFree")))) txt += ".";
    } else {
      txt += ".";
    }
    txt += "\n\n";
  }

  if(state.selected.mutWork === "non compatible"){
    txt += `${g.civ} ne présente pas un état compatible avec une reprise du travail. `;
    txt += `Les symptômes persistent et continuent d’altérer de manière significative les capacités d’adaptation, de concentration, d’organisation ainsi que le maintien d’un rythme soutenu dans un cadre professionnel.`;
    txt += "\n\n";
  } else if(state.selected.mutWork === "partiellement compatible"){
    txt += `L’état clinique actuel n’apparaît que partiellement compatible avec une reprise d’activité, et nécessite une réévaluation prudente et progressive.\n\n`;
  } else if(state.selected.mutWork === "compatible"){
    txt += `L’état clinique pourrait être compatible avec une reprise, sous réserve d’une réévaluation prudente du contexte fonctionnel et de l’évolution symptomatique.\n\n`;
  }

  const treatment = buildTreatment();
  if(treatment){
    txt += `Sur le plan thérapeutique, ${treatment.charAt(0).toLowerCase() + treatment.slice(1)}\n\n`;
  } else {
    txt += `Sur le plan thérapeutique, ${g.civ.toLowerCase()} bénéficie d’un suivi psychiatrique régulier.\n\n`;
  }

  if((state.selected.mutConclusion || []).length){
    txt += `${cap(joinClinical(state.selected.mutConclusion))}. `;
  } else {
    txt += `La poursuite du traitement et du suivi reste encouragée. `;
  }

  txt += `Je reste à disposition pour de plus amples informations.`;

  return txt.trim();
}

function buildConsultation(){
  const g = genderPack();
  let txt = `Je vois en consultation de psychiatrie ${g.civ} pour ${currentDiagnosisText()}.\n\n`;

  txt += `Évolution générale\n\n`;
  txt += `Le tableau clinique reste fluctuant, avec une évolution globalement fragile.\n\n`;

  txt += `Examen clinique / mental\n\n`;
  txt += `${buildMSE()}\n\n`;

  const psycho = buildPsychosocial();
  if(psycho){
    txt += `Psychosocial\n\n${psycho}\n\n`;
  }

  const cons = buildConsumption();
  if(cons){
    txt += `Consommations\n\n${cons}\n\n`;
  }

  const treatment = buildTreatment();
  if(treatment){
    txt += `Traitement\n\n${treatment}\n\n`;
  }

  txt += `Hypothèse diagnostique\n\n${inferDSM()}\n\n`;
  txt += `Suggestion médicamenteuse\n\n${suggestMedication()}\n\n`;

  const plan = cleanText(getField("planningNotes")) || "Poursuite du suivi recommandée avec réévaluation clinique.";
  txt += `Plan\n\n${sentence(plan)}`;

  return txt.trim();
}

function buildUrgences(){
  const g = genderPack();
  let txt = `${g.civ} est ${g.vu} aux urgences pour ${currentDiagnosisText()}.\n\n`;
  txt += `Examen clinique / mental\n\n${buildMSE()}\n\n`;

  const risk = state.selected.suicideIdeas;
  txt += `Risque suicidaire\n\n`;
  if(risk === "actives"){
    txt += "Présence d’idées suicidaires actives nécessitant une vigilance accrue.\n\n";
  } else if(risk === "passives"){
    txt += "Présence d’idées noires passives à contextualiser.\n\n";
  } else {
    txt += "Absence d’élément suicidaire aigu rapporté à ce stade.\n\n";
  }

  txt += `Décision / orientation\n\n`;
  txt += sentence(cleanText(getField("letterFree")) || "Réévaluation clinique et orientation selon le contexte.");

  return txt.trim();
}

function buildHospitalisation(){
  const st = state.subType;
  const cons = buildConsumption();
  const treatment = buildTreatment();
  const mse = buildMSE();

  if(st === "semaine 1"){
    return `Évolution générale

Évolution globalement favorable au terme de cette première semaine de prise en charge. ${cons ? "Le sevrage alcoolique a été globalement bien toléré, sans complication aiguë rapportée." : ""}

Examen mental

${mse}

Dynamique thérapeutique

Le patient s’inscrit dans une démarche de réflexion autour de son fonctionnement et des facteurs ayant contribué à la situation clinique. Un travail d’élaboration a pu être initié, avec une implication satisfaisante dans les entretiens.

Traitement

${treatment || "Traitement à préciser."}

Projection / suite

La suite de la prise en charge est envisagée comme une étape de consolidation, avec maintien des objectifs thérapeutiques et préparation à la continuité du suivi ambulatoire.`;
  }

  if(st === "semaine 2"){
    return `Évolution

Évolution globalement favorable avec poursuite du travail de consolidation.

Examen mental

${mse}

Autonomie / consolidation

Travail autour de l’autonomie, de la consolidation et des repères au quotidien.

Traitement

${treatment || "Traitement à préciser."}

Préparation de la suite

Préparation de la sortie et du suivi ambulatoire.`;
  }

  if(st === "admission"){
    return `Motif et contexte

Hospitalisation motivée par ${currentDiagnosisText()}.

Consommations

${cons || "Aucune consommation problématique actuellement détaillée."}

Examen mental

${mse}

Psychosocial

${buildPsychosocial() || "Éléments psychosociaux à préciser."}

Traitement

${treatment || "Traitement à préciser."}

Plan

${sentence(cleanText(getField("planningNotes")) || "Prise en charge encadrée et évaluation clinique plus approfondie.")}`;
  }

  if(st === "sortie"){
    return `Évolution générale

Amélioration clinique permettant une sortie avec relais ambulatoire.

Examen mental

${mse}

Traitement de sortie

${treatment || "Traitement de sortie à préciser."}

Plan de sortie

${sentence(cleanText(getField("planningNotes")) || "Poursuite du suivi ambulatoire et maintien des recommandations.")}`;
  }

  return `Examen mental

${mse}

Traitement

${treatment || "À préciser."}`;
}

function buildPreadmission(){
  return `Demande et contexte

Évaluation de préadmission réalisée dans le cadre de ${currentDiagnosisText()}.

Consommations

${buildConsumption() || "Aucune consommation problématique actuellement détaillée."}

Examen clinique / mental

${buildMSE()}

Psychosocial

${buildPsychosocial() || "Éléments psychosociaux à préciser."}

Indication

${sentence(cleanText(getField("planningNotes")) || "Indication à discuter au regard des éléments cliniques et addictologiques.")}`;
}

function buildAdministrative(){
  const g = genderPack();

  switch(state.subType){
    case "rapport mutuelle":
      return buildMutuelle();

    case "attestation de présence":
      return `Je soussigné certifie que ${g.civ} s’est ${g.présenté} en consultation le ____.\n\nAttestation délivrée pour faire valoir ce que de droit.`;

    case "attestation simple":
      return `Je soussigné certifie que ${g.civ} est actuellement ${g.suivi} en psychiatrie.\n\nCette attestation est délivrée à la demande de l’intéressé${g.male ? "" : "e"} pour faire valoir ce que de droit.`;

    case "attestation de suivi":
      return `Je soussigné certifie que ${g.civ} bénéficie d’un suivi psychiatrique régulier.\n\nCette attestation est délivrée pour faire valoir ce que de droit.`;

    case "certificat médical":
    case "certificat incapacité":
    case "certificat circonstancié simple":
      return `Je soussigné certifie avoir examiné ${g.civ}.\n\nÉtat clinique\n\n${buildMSE()}\n\nRetentissement\n\n${cleanText(getField("mutFunctionFree")) || "Retentissement fonctionnel à préciser."}\n\nCe certificat est établi à la demande de l’intéressé${g.male ? "" : "e"}.`;

    default:
      return `Contexte\n\n${sentence(cleanText(getField("mutContext")) || `${g.civ} est vu dans un contexte clinique à préciser.`)}\n\nÉtat clinique\n\n${buildMSE()}`;
  }
}

function buildMail(){
  const subtype = state.subType;
  const tone = state.selected.letterTone || "sobre";
  const actions = state.selected.letterAction || [];
  const free = cleanText(getField("letterFree"));

  let subject = subtype;
  if(actions.length){
    subject += " — " + joinClinical(actions);
  }

  let greeting = "Bonjour,";
  if(tone === "chaleureux") greeting = "Bonjour,";
  if(tone === "direct") greeting = "Bonjour,";

  let body = free || `Je reviens vers vous concernant ${subtype}.`;
  body = sentence(body);

  return `Objet : ${subject}

${greeting}

${body}

${actions.length ? cap(joinClinical(actions)) + "." : ""}

Bien à vous.`;
}

function buildQuestionnaire(){
  if(state.subType === "rapport mutuelle"){
    return `DIAGNOSTIC PRINCIPAL
................................................................
................................................................
................................................................

AU DÉBUT DE LA PRISE EN CHARGE, LE TABLEAU ÉTAIT MARQUÉ PAR
................................................................
................................................................
................................................................

ACTUELLEMENT, IL PERSISTE
................................................................
................................................................
................................................................

EXAMEN CLINIQUE / MENTAL
Orientation :
................................................................
Contact :
................................................................
Présentation / collaboration :
................................................................
Psychomotricité :
................................................................
Humeur / anxiété / pensée :
................................................................
Idées noires :
................................................................
Comportement :
................................................................
Sommeil / alimentation :
................................................................

SITUATION PSYCHOSOCIALE
Travail / revenus :
................................................................
Famille / enfants :
................................................................
Logement :
................................................................

TRAITEMENT / PRISE EN CHARGE
................................................................
................................................................
................................................................

COMPATIBILITÉ AVEC REPRISE DU TRAVAIL
................................................................
................................................................
................................................................

CONCLUSION
................................................................
................................................................
................................................................`;
  }

  return `MOTIF
................................................................
................................................................
................................................................

CONTEXTE
................................................................
................................................................
................................................................

EXAMEN CLINIQUE
................................................................
................................................................
................................................................

PLAN
................................................................
................................................................
................................................................`;
}

function buildTodoText(){
  const lines = [];
  const tasks = state.tasks.length ? state.tasks : cleanText(getField("taskInbox")).split("\n").filter(Boolean).map(t => ({ title:t, done:false }));
  const patients = cleanText(getField("patientListInput")).split("\n").filter(Boolean);

  lines.push(`TO DO — ${state.leftView === "week" ? "SEMAINE" : state.leftView === "halfday" ? "DEMI-JOURNÉE" : "JOUR"}`);
  lines.push("");

  if(state.selected.dayTemplate){
    lines.push(`STRUCTURE`);
    lines.push(`- ${state.selected.dayTemplate}`);
    lines.push("");
  }

  if(tasks.length){
    lines.push(`TÂCHES`);
    tasks.forEach(t => lines.push(`- ${t.title || t.name || t}`));
    lines.push("");
  }

  if(patients.length){
    lines.push(`PATIENTS DU BLOC`);
    patients.forEach(p => lines.push(`- ${p}`));
    if((state.selected.patientChecklist || []).length){
      lines.push("");
      lines.push(`CHECKLIST PATIENT`);
      lines.push(`- ${joinClinical(state.selected.patientChecklist)}`);
    }
    lines.push("");
  }

  if(cleanText(getField("dailyClosingGoal"))){
    lines.push(`OBJECTIF DOSSIERS`);
    lines.push(`- ${cleanText(getField("dailyClosingGoal"))} dossiers à fermer`);
    lines.push("");
  }

  return lines.join("\n");
}

function buildGeneratedContent(){
  if(state.output === "questionnaire") return buildQuestionnaire();
  if(state.output === "todo") return buildTodoText();

  switch(state.type){
    case "consultation": return buildConsultation();
    case "urgences": return buildUrgences();
    case "hospitalisation": return buildHospitalisation();
    case "préadmission": return buildPreadmission();
    case "administratif": return buildAdministrative();
    case "mail": return buildMail();
    default: return buildConsultation();
  }
}

function computeWarnings(){
  const warnings = [];

  if(state.subType === "rapport mutuelle" && !((state.selected.mutDx || []).length || cleanText(getField("mutDxFree")))){
    warnings.push("Rapport mutuelle sans diagnostic renseigné.");
  }

  if(state.selected.mutWork === "non compatible" && !((state.selected.mutFunction || []).length || cleanText(getField("mutFunctionFree")))){
    warnings.push("Incompatibilité au travail sans retentissement fonctionnel explicité.");
  }

  if(cleanText(getField("alcQty")) && !(state.selected.alcType || []).length){
    warnings.push("Quantité alcool renseignée sans type d’alcool.");
  }

  const target = $("warnings");
  if(!target) return;
  if(!warnings.length){
    target.textContent = "Aucune alerte.";
  } else {
    target.innerHTML = warnings.map(w => `<div class="warn">• ${w}</div>`).join("");
  }
}

function renderMenus(){
  renderMenu("typeMenu", TYPES, state.type, (value) => {
    state.type = value;
    state.subType = SUBTYPES[state.type][0];
    updateDisplays();
    renderDynamicChoices();
    regenerateCurrentDoc();
  });

  renderMenu("subTypeMenu", SUBTYPES[state.type], state.subType, (value) => {
    state.subType = value;
    updateDisplays();
    regenerateCurrentDoc();
  });

  renderMenu("modeMenu", ["rapide","complet"], state.mode, (value) => {
    state.mode = value;
    updateDisplays();
    regenerateCurrentDoc();
  });

  renderMenu("outputMenu", ["texte","questionnaire","todo"], state.output, (value) => {
    state.output = value;
    updateDisplays();
    regenerateCurrentDoc();
  });

  renderMenu("themeMenu", ["clair","sombre"], state.theme, (value) => {
    state.theme = value;
    applyTheme();
    updateDisplays();
  });

  renderMenu("fontMenu", ["inter","mono","serif"], state.font, (value) => {
    state.font = value;
    applyFont();
    updateDisplays();
  });
}

function renderMenu(id, options, current, onClick){
  const menu = $(id);
  menu.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "menu-item" + (opt === current ? " active" : "");
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      onClick(opt);
      closeMenus();
    });
    menu.appendChild(btn);
  });
}

function renderTokenGroups(){
  TOKEN_DEFS.forEach(def => {
    const container = $(def.id);
    if(!container) return;
    container.innerHTML = "";

    const current = def.direct ? state[def.direct] : state.selected[def.key];

    def.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "token";
      btn.textContent = opt;
      const isActive = def.single
        ? current === opt
        : Array.isArray(current) && current.includes(opt);
      if(isActive) btn.classList.add("active");

      btn.addEventListener("click", () => {
        if(def.direct){
          state[def.direct] = opt;
        }
        if(def.single){
          state.selected[def.key] = opt;
        } else {
          const arr = state.selected[def.key] || [];
          const idx = arr.indexOf(opt);
          if(idx >= 0) arr.splice(idx, 1);
          else arr.push(opt);
          state.selected[def.key] = arr;
        }

        if(def.key === "gender") state.gender = opt;
        if(def.key === "civility") state.civility = opt;

        if(def.key === "habitChoices"){
          if(!state.habitTrack[opt]){
            state.habitTrack[opt] = [false,false,false,false,false,false,false];
          }
          renderHabitGrid();
        }

        renderTokenGroups();
        regenerateCurrentDoc();
      });

      container.appendChild(btn);
    });
  });

  renderDynamicChoices();
}

function renderDynamicChoices(){
  renderQuickChoices(
    "docTypeChoices",
    TYPES,
    state.type,
    (value) => {
      state.type = value;
      state.subType = SUBTYPES[value][0];
      updateDisplays();
      renderMenus();
      renderDynamicChoices();
      regenerateCurrentDoc();
    }
  );

  renderQuickChoices(
    "docSubTypeQuickChoices",
    SUBTYPES[state.type],
    state.subType,
    (value) => {
      state.subType = value;
      updateDisplays();
      renderMenus();
      regenerateCurrentDoc();
    }
  );

  renderQuickChoices(
    "docTemplateChoices",
    Object.keys(PRESETS),
    "",
    (value) => {
      PRESETS[value]();
      renderAll();
      regenerateCurrentDoc();
    }
  );
}

function renderQuickChoices(containerId, options, current, onClick){
  const el = $(containerId);
  if(!el) return;
  el.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "token" + (opt === current ? " active" : "");
    btn.textContent = opt;
    btn.addEventListener("click", () => onClick(opt));
    el.appendChild(btn);
  });
}

function applyTheme(){
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(state.theme === "sombre" ? "theme-dark" : "theme-light");
}

function applyFont(){
  document.body.classList.remove("font-inter","font-mono","font-serif");
  document.body.classList.add(`font-${state.font}`);
}

function updateDisplays(){
  setText("typeDisplay", state.type);
  setText("subTypeDisplay", state.subType);
  setText("modeDisplay", state.mode);
  setText("outputDisplay", state.output);
  setText("themeDisplay", state.theme);
  setText("fontDisplay", state.font);

  setText("metaType", state.type);
  setText("metaSubType", state.subType);
  setText("metaMode", state.mode);
  setText("metaOutput", state.output);
}

function setText(id, value){
  if($(id)) $(id).textContent = value;
}

function positionMenu(menuId, button){
  const menu = $(menuId);
  const rect = button.getBoundingClientRect();
  menu.style.left = `${Math.max(12, rect.left)}px`;
}

function closeMenus(){
  ["typeMenu","subTypeMenu","modeMenu","outputMenu","themeMenu","fontMenu"].forEach(id => $(id).classList.add("hidden"));
}

function initMenus(){
  document.querySelectorAll("[data-menu]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.menu;
      const menu = $(id);
      const willOpen = menu.classList.contains("hidden");
      closeMenus();
      if(willOpen){
        positionMenu(id, btn);
        menu.classList.remove("hidden");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if(!e.target.closest("[data-menu]") && !e.target.closest(".menu")){
      closeMenus();
    }
  });
}

function createDoc(title, content = ""){
  return {
    id: "doc_" + Math.random().toString(36).slice(2, 9),
    title,
    content
  };
}

function ensureDocs(){
  if(!state.docs.length){
    const doc = createDoc(defaultDocTitle(), buildGeneratedContent());
    state.docs.push(doc);
    state.activeDocId = doc.id;
  }
}

function currentDoc(){
  return state.docs.find(d => d.id === state.activeDocId);
}

function defaultDocTitle(){
  return `${state.subType}`;
}

function renderDocumentTabs(){
  ensureDocs();
  const container = $("documentTabs");
  if(!container) return;
  container.innerHTML = "";

  state.docs.forEach(doc => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "document-tab" + (doc.id === state.activeDocId ? " active" : "");
    btn.innerHTML = `<span class="document-tab-title">${doc.title}</span>`;
    btn.addEventListener("click", () => switchToDoc(doc.id));
    container.appendChild(btn);
  });
}

function switchToDoc(id){
  saveCurrentOutputToDoc();
  state.activeDocId = id;
  loadDocIntoOutput();
  renderDocumentTabs();
}

function saveCurrentOutputToDoc(){
  const doc = currentDoc();
  if(doc && $("output")){
    doc.content = $("output").value;
  }
}

function loadDocIntoOutput(){
  const doc = currentDoc();
  if(doc && $("output")){
    $("output").value = doc.content || "";
  }
}

function regenerateCurrentDoc(){
  ensureDocs();
  const doc = currentDoc();
  if(!doc) return;
  doc.title = defaultDocTitle();
  doc.content = buildGeneratedContent();
  loadDocIntoOutput();
  renderDocumentTabs();
  computeWarnings();
}

function newBlankDoc(){
  saveCurrentOutputToDoc();
  const doc = createDoc("document vierge", "");
  state.docs.push(doc);
  state.activeDocId = doc.id;
  renderDocumentTabs();
  loadDocIntoOutput();
}

function duplicateCurrentDoc(){
  saveCurrentOutputToDoc();
  const doc = currentDoc();
  if(!doc) return;
  const copy = createDoc(doc.title + " copie", doc.content);
  state.docs.push(copy);
  state.activeDocId = copy.id;
  renderDocumentTabs();
  loadDocIntoOutput();
}

function clearCurrentDoc(){
  const doc = currentDoc();
  if(!doc) return;
  doc.content = "";
  loadDocIntoOutput();
}

function closeCurrentDoc(){
  if(state.docs.length <= 1){
    clearCurrentDoc();
    return;
  }
  const idx = state.docs.findIndex(d => d.id === state.activeDocId);
  state.docs.splice(idx, 1);
  state.activeDocId = state.docs[Math.max(0, idx - 1)].id;
  renderDocumentTabs();
  loadDocIntoOutput();
}

function newSimilarDoc(){
  saveCurrentOutputToDoc();
  const content = buildGeneratedContent();
  const doc = createDoc(defaultDocTitle() + " 2", content);
  state.docs.push(doc);
  state.activeDocId = doc.id;
  renderDocumentTabs();
  loadDocIntoOutput();
}

function renderHabitGrid(){
  const grid = $("habitGrid");
  if(!grid) return;
  grid.innerHTML = "";

  const selectedHabits = state.selected.habitChoices || [];
  if(!selectedHabits.length){
    for(let i = 0; i < 7; i++){
      const cell = document.createElement("div");
      cell.className = "habit-cell";
      grid.appendChild(cell);
    }
    return;
  }

  selectedHabits.forEach(habit => {
    for(let i = 0; i < 7; i++){
      const cell = document.createElement("div");
      cell.className = "habit-cell";
      cell.title = `${habit} — jour ${i+1}`;
      if(state.habitTrack[habit] && state.habitTrack[habit][i]){
        cell.style.opacity = "1";
        cell.style.outline = "2px solid var(--accent)";
      } else {
        cell.style.opacity = "0.55";
      }
      cell.addEventListener("click", () => {
        if(!state.habitTrack[habit]){
          state.habitTrack[habit] = [false,false,false,false,false,false,false];
        }
        state.habitTrack[habit][i] = !state.habitTrack[habit][i];
        renderHabitGrid();
      });
      grid.appendChild(cell);
    }
  });
}

function parseTaskInbox(){
  const raw = cleanText(getField("taskInbox"));
  if(!raw) return;
  raw.split("\n").map(x => cleanText(x)).filter(Boolean).forEach(line => {
    state.tasks.push({
      title: line,
      type: state.selected.taskType || [],
      priority: state.selected.taskPriority || "",
      energy: state.selected.taskEnergy || "",
      block: state.selected.timeBlock || "",
      done: false
    });
  });
  setField("taskInbox", "");
}

function spinRoulette(micro = false){
  if(cleanText(getField("taskInbox"))){
    parseTaskInbox();
  }
  const list = state.tasks.filter(t => !t.done);
  if(!list.length){
    alert("Aucune tâche disponible.");
    return;
  }
  let pool = list;
  if(micro){
    pool = list.filter(t => ["mail","appel","administratif"].some(x => (t.type || []).includes(x))) || list;
  }
  const pick = pool[Math.floor(Math.random() * pool.length)];
  alert(`👉 Fais ça maintenant :\n\n${pick.title}`);
}

function buildWithdrawalPlanText(){
  const drug = getField("withdrawDrug");
  const pattern = getField("withdrawPattern");
  const dose = Number(getField("withdrawDose"));
  const days = Number(getField("withdrawDays"));
  const startDate = getField("withdrawStartDate");

  if(!dose || !days || days < 2) return "";

  let factor = 1;
  if(pattern === "rapide") factor = 1.25;
  if(pattern === "lent") factor = 0.75;

  let decrement = Math.max(1, Math.round((dose / days) * factor));
  let current = dose;
  const rows = [];
  const base = startDate ? new Date(startDate) : new Date();

  for(let i = 0; i < days; i++){
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    rows.push(`${d.toLocaleDateString("fr-BE")} — ${drug} ${current} mg`);
    current = Math.max(0, current - decrement);
  }

  rows.push("Arrêt");
  return rows.join("\n");
}

function saveState(){
  saveCurrentOutputToDoc();
  const fields = {};
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if(el.id !== "output"){
      fields[el.id] = el.value;
    }
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    gender: state.gender,
    civility: state.civility,
    type: state.type,
    subType: state.subType,
    mode: state.mode,
    output: state.output,
    theme: state.theme,
    font: state.font,
    leftView: state.leftView,
    selected: state.selected,
    tasks: state.tasks,
    patients: state.patients,
    docs: state.docs,
    activeDocId: state.activeDocId,
    habitTrack: state.habitTrack,
    withdrawalPlanText: state.withdrawalPlanText,
    fields
  }));
}

function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;
  const parsed = JSON.parse(raw);

  state.gender = parsed.gender || state.gender;
  state.civility = parsed.civility || state.civility;
  state.type = parsed.type || state.type;
  state.subType = parsed.subType || state.subType;
  state.mode = parsed.mode || state.mode;
  state.output = parsed.output || state.output;
  state.theme = parsed.theme || state.theme;
  state.font = parsed.font || state.font;
  state.leftView = parsed.leftView || state.leftView;
  state.selected = parsed.selected || state.selected;
  state.tasks = parsed.tasks || [];
  state.patients = parsed.patients || [];
  state.docs = parsed.docs || [];
  state.activeDocId = parsed.activeDocId || null;
  state.habitTrack = parsed.habitTrack || {};
  state.withdrawalPlanText = parsed.withdrawalPlanText || "";

  Object.entries(parsed.fields || {}).forEach(([id, value]) => {
    if($(id)) $(id).value = value;
  });

  renderAll();
  loadDocIntoOutput();
}

function resetAll(){
  localStorage.removeItem(STORAGE_KEY);
  state.gender = "femme";
  state.civility = "auto";
  state.type = "administratif";
  state.subType = "rapport mutuelle";
  state.mode = "complet";
  state.output = "texte";
  state.theme = "clair";
  state.font = "inter";
  state.leftView = "day";
  resetSelections();
  state.tasks = [];
  state.patients = [];
  state.docs = [];
  state.activeDocId = null;
  state.habitTrack = {};
  state.withdrawalPlanText = "";

  document.querySelectorAll("input, textarea").forEach(el => {
    if(el.id !== "output") el.value = "";
  });
  document.querySelectorAll("select").forEach(el => el.selectedIndex = 0);

  setTodayDefaults();
  renderAll();
  regenerateCurrentDoc();
}

function setTodayDefaults(){
  const now = new Date();
  const p = n => String(n).padStart(2, "0");
  const date = `${now.getFullYear()}-${p(now.getMonth()+1)}-${p(now.getDate())}`;
  setField("withdrawStartDate", date);
}

function initButtons(){
  $("toggleLeftPanel")?.addEventListener("click", () => {
    $("leftPanel").classList.toggle("collapsed");
    document.body.classList.toggle("left-collapsed");
  });

  $("toggleRightPanel")?.addEventListener("click", () => {
    $("rightPanel").classList.toggle("collapsed");
    document.body.classList.toggle("right-collapsed");
  });

  $("btnText")?.addEventListener("click", () => {
    state.output = "texte";
    updateDisplays();
    regenerateCurrentDoc();
  });

  $("btnQuestionnaire")?.addEventListener("click", () => {
    state.output = "questionnaire";
    updateDisplays();
    regenerateCurrentDoc();
  });

  $("btnTodo")?.addEventListener("click", () => {
    state.output = "todo";
    updateDisplays();
    regenerateCurrentDoc();
  });

  $("btnCopy")?.addEventListener("click", () => {
    navigator.clipboard.writeText($("output").value || "");
  });

  $("btnPrint")?.addEventListener("click", () => window.print());

  $("btnNewDocumentTab")?.addEventListener("click", newBlankDoc);
  $("btnDuplicateDocumentTab")?.addEventListener("click", duplicateCurrentDoc);
  $("btnClearCurrentDocumentTab")?.addEventListener("click", clearCurrentDoc);
  $("btnCloseCurrentDocumentTab")?.addEventListener("click", closeCurrentDoc);
  $("btnRegenerateCurrentTab")?.addEventListener("click", regenerateCurrentDoc);
  $("btnNewLetterFromCurrent")?.addEventListener("click", newSimilarDoc);
  $("btnNewBlankDocument")?.addEventListener("click", newBlankDoc);

  $("btnBuildWithdrawal")?.addEventListener("click", () => {
    state.withdrawalPlanText = buildWithdrawalPlanText();
    setField("withdrawOutput", state.withdrawalPlanText);
    regenerateCurrentDoc();
  });

  $("btnSave")?.addEventListener("click", saveState);
  $("btnLoad")?.addEventListener("click", loadState);
  $("btnReset")?.addEventListener("click", resetAll);
  $("btnDemo")?.addEventListener("click", () => {
    PRESETS["rapport mutuelle anxio-dépressif"]();
    renderAll();
    regenerateCurrentDoc();
  });

  $("btnDistributeTasks")?.addEventListener("click", parseTaskInbox);
  $("btnSpinRoulette")?.addEventListener("click", () => spinRoulette(false));
  $("btnOneMicroTask")?.addEventListener("click", () => spinRoulette(true));

  $("output")?.addEventListener("input", () => {
    const doc = currentDoc();
    if(doc) doc.content = $("output").value;
  });

  document.querySelectorAll("input, textarea, select").forEach(el => {
    if(el.id === "output") return;
    el.addEventListener("input", () => regenerateCurrentDoc());
    el.addEventListener("change", () => regenerateCurrentDoc());
  });

  document.querySelectorAll("[data-left-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-left-view]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.leftView = btn.dataset.leftView;
      regenerateCurrentDoc();
    });
  });
}

function renderAll(){
  applyTheme();
  applyFont();
  updateDisplays();
  renderMenus();
  renderTokenGroups();
  renderDocumentTabs();
  renderHabitGrid();
  computeWarnings();
}

function init(){
  setTodayDefaults();
  initMenus();
  initButtons();
  renderAll();
  regenerateCurrentDoc();
}

init();

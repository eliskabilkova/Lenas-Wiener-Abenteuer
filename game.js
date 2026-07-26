let gameState = {
  transport: null, // will store 'correct' or 'wrong'
  stop: null,      // will store 'correct' or 'wrong'
  house: null,     // will store 'correct' or 'wrong'
  ch1StationFailed: false,
  ch1LateArrival: false,
  receptionistMistake: false,
  meldezettelMistakes: 0,
  ch3Strikes: 0,
  ch4Strikes: 0,
  ch5Strikes: 0,
  hasSeenVokabelTutorial: false
};

/**
 * Visual Novel Game Engine
 * Node-based flow powered by storyData.
 */
(function () {
  "use strict";

  const START_NODE = "chapter_1_title";
  const TYPE_SPEED = 24;
  const TOTAL_CHAPTERS = 6;
  const PROGRESS_STORAGE_KEY = "lenasWienerAbenteuer.progress";

  // ── Vocabulary lists (edit words here — glossary & practice mode read from this) ──
  const VOCABULARY_DATA = {
    chapter1: [
      { german: "der Fahrkartenautomat", english: "ticket vending machine" },
      { german: "die Fahrkarte / das Ticket", english: "ticket" },
      { german: "die Ankunft", english: "arrival" },
      { german: "der Hauptbahnhof", english: "main train station" },
      { german: "der Schaffner", english: "train conductor" },
      { german: "kaufen", english: "to buy" },
      { german: "helfen", english: "to help" },
      { german: "die Entschuldigung", english: "excuse me / apology" },
      { german: "verstehen", english: "to understand" },
      { german: "der Bahnsteig", english: "train platform" },
    ],
    chapter2: [
      { german: "die Rezeption", english: "reception desk" },
      { german: "einchecken", english: "to check in" },
      { german: "der Zimmerschlüssel / die Karte", english: "room key / keycard" },
      { german: "das Einzelzimmer", english: "single room" },
      { german: "das Frühstück", english: "breakfast" },
      { german: "inklusive", english: "included" },
      { german: "das WLAN-Passwort", english: "Wi-Fi password" },
      { german: "der Aufzug / der Lift", english: "elevator" },
      { german: "die Etage / der Stock", english: "floor / level" },
      { german: "Gute Nacht", english: "good night" },
    ],
    chapter3: [
      { german: "die U-Bahn-Linie", english: "underground line (e.g., U3)" },
      { german: "die Richtung", english: "direction" },
      { german: "das Gleis", english: "track / platform" },
      { german: "die Endstation", english: "terminus / last stop" },
      { german: "die Rolltreppe", english: "escalator" },
      { german: "rechts stehen, links gehen", english: "stand on the right, walk on the left" },
      { german: "umsteigen", english: "to change trains / lines" },
      { german: "der Fahrplan", english: "timetable / schedule" },
      { german: "drängeln", english: "to push / hustle" },
      { german: "nächste Station", english: "next station" },
    ],
    chapter4: [
      { german: "die Hausordnung / die Regeln", english: "building rules / code of conduct" },
      { german: "Ruhe bewahren", english: "to stay quiet / keep calm" },
      { german: "das Blitzlicht", english: "camera flash" },
      { german: "keine Kappen tragen", english: "no hats / caps allowed" },
      { german: "der Ausblick / die Aussicht", english: "view / panorama" },
      { german: "die Stufe", english: "step (staircase)" },
      { german: "der Südturm", english: "South Tower" },
      { german: "steigen / klettern", english: "to climb" },
      { german: "anstrengend", english: "exhausting / tiring" },
      { german: "eine Kerze anzünden", english: "to light a candle" },
    ],
    chapter5: [
      { german: "der Supermarkt", english: "supermarket" },
      { german: "das Regal / die Regale", english: "shelf / shelves" },
      { german: "Obst & Gemüse", english: "fruit & vegetables (produce)" },
      { german: "die Bäckerei", english: "bakery" },
      { german: "das Kühlregal", english: "refrigerated section / dairy aisle" },
      { german: "die Süßigkeiten", english: "sweets / candy" },
      { german: "die Getränke", english: "drinks / beverages" },
      { german: "der Einkaufskorb", english: "shopping basket" },
      { german: "die Kasse / der Kassierer", english: "checkout / cashier" },
      { german: "Stimmt so!", english: "Keep the change!" },
    ],
    chapter6: [
      { german: "das Kaffeehaus", english: "coffee house / café" },
      { german: "die Melange", english: "Viennese coffee with milk foam" },
      { german: "das Frühstück", english: "breakfast" },
      { german: "die Abreise", english: "departure" },
      { german: "auf Wiedersehen", english: "goodbye (until we see each other again)" },
      { german: "Tschüss", english: "bye (informal)" },
      { german: "stolz", english: "proud" },
      { german: "lernen", english: "to learn" },
      { german: "die Reise", english: "journey / trip" },
      { german: "wunderbar", english: "wonderful" },
    ],
  };

  const VOCABULARY_CHAPTER_KEYS = [
    "chapter1",
    "chapter2",
    "chapter3",
    "chapter4",
    "chapter5",
    "chapter6",
  ];

  function getVocabularyForChapter(chapterNumber) {
    return VOCABULARY_DATA[`chapter${chapterNumber}`] || VOCABULARY_DATA.chapter1;
  }

  function getAllVocabularyEntries() {
    return VOCABULARY_CHAPTER_KEYS.flatMap((key) => VOCABULARY_DATA[key] || []);
  }

  function resetGameState() {
    gameState.transport = null;
    gameState.stop = null;
    gameState.house = null;
    gameState.ch1StationFailed = false;
    gameState.ch1LateArrival = false;
    gameState.receptionistMistake = false;
    gameState.meldezettelMistakes = 0;
    gameState.ch3Strikes = 0;
    gameState.ch4Strikes = 0;
    gameState.ch5Strikes = 0;
  }

  const BACKGROUND_MAP = {
    "train_interior.jpg": "train_interior",
    "vienna_hauptbahnhof.jpg": "vienna_hauptbahnhof",
    "vienna_street.jpg": "vienna_street",
    "hotel_lobby.jpg": "cafe",
    "hotel_room.jpg": "hotel_room",
    "u_bahn_station.jpg": "u_bahn_station",
    "cathedral.jpg": "cathedral",
    "cathedral_interior.jpg": "cathedral_interior",
    "vienna_view.jpg": "vienna_view",
    "supermarket_exterior.jpg": "supermarket_exterior",
    "supermarket_interior.jpg": "supermarket_interior",
    "supermarket_cashier.jpg": "supermarket_cashier",
    "kaffeehaus.jpg": "kaffeehaus",
    "cafe": "cafe",
    "black": "black",
  };

  const NPC_MAP = {
    none: { visible: false, character: "elder", name: "Viennese Man", mood: "neutral" },
    "old_man_neutral.png": { visible: true, character: "elder", name: "Viennese Man", mood: "neutral" },
    "old_man_confused.png": { visible: true, character: "elder", name: "Viennese Man", mood: "neutral" },
    "old_man_friendly.png": { visible: true, character: "elder", name: "Viennese Man", mood: "happy" },
    "receptionist_neutral.png": { visible: true, character: "mira", name: "Rezeptionistin", mood: "neutral" },
    "receptionist_confused.png": { visible: true, character: "mira", name: "Rezeptionistin", mood: "neutral" },
    "commuter_man_neutral.png": { visible: true, character: "elder", name: "Wiener Mann", mood: "neutral" },
    "commuter_man_annoyed.png": { visible: true, character: "elder", name: "Wiener Mann", mood: "neutral" },
    "mozart_seller_neutral.png": { visible: true, character: "mozart_seller", name: "Straßenverkäufer", mood: "neutral" },
    "mozart_seller_pushy.png": { visible: true, character: "mozart_seller", name: "Straßenverkäufer", mood: "pushy" },
    "warden_stern.png": { visible: true, character: "warden", name: "Domaufseher", mood: "stern" },
    "cashier_friendly.png": { visible: true, character: "mira", name: "Kassiererin", mood: "happy" },
  };

  const LENA_MOOD_MAP = {
    normal: "neutral",
    happy: "happy",
    unsure: "thoughtful",
    surprised: "surprised",
    thoughtful: "thoughtful",
    // Distinct mood values so tired/exhausted Lena artwork can be swapped in later.
    tired: "tired",
    exhausted: "exhausted",
    none: "neutral",
  };

  const JUMP_SCARE_NODE_IDS = new Set(["ch4_mozart_surprise"]);

  const REPLAY_CHOICES_FROM_NODE = {
    wrong_rude: "start_see_man",
    wrong_grammar: "start_see_man",
    ch2_greet_wrong_rude: "ch2_reception_greet",
    ch2_greet_wrong_grammar: "ch2_reception_greet",
    ch2_id_wrong_phone: "ch2_reception_id",
    ch2_id_wrong_name: "ch2_reception_id",
  };

  const MELDEZETTEL_TRIGGER_NODE = "ch2_meldezettel";
  const MELDEZETTEL_SUCCESS_NODE = "ch2_meldezettel_success";

  const TICKET_MACHINE_TRIGGER_NODE = "ch3_ticket_machine";
  const TICKET_MACHINE_NEXT_NODE = "ch3_boarding";
  const TICKET_MACHINE_SUCCESS_NODE = "ch3_ticket_success";
  const TICKET_MACHINE_FAIL_NODE = "ch3_ticket_fail";

  const METRO_SIGN_BOARD_HTML = `
    <div class="metro-sign-board" role="img" aria-label="U3 line direction board at Neubaugasse station">
      <header class="metro-sign-board__head">
        <span class="metro-sign-board__badge">U3</span>
        <span class="metro-sign-board__headline">Line Directions</span>
        <span class="metro-sign-board__station">Neubaugasse</span>
      </header>
      <div class="metro-sign-board__columns">
        <section class="metro-sign-board__direction">
          <div class="metro-sign-board__arrow" aria-hidden="true">⬅</div>
          <h3 class="metro-sign-board__heading">Richtung: Ottakring</h3>
          <p class="metro-sign-board__stations">Zieglergasse · Westbahnhof · …</p>
        </section>
        <section class="metro-sign-board__direction">
          <div class="metro-sign-board__arrow" aria-hidden="true">➡</div>
          <h3 class="metro-sign-board__heading">Richtung: Simmering</h3>
          <p class="metro-sign-board__stations">Volkstheater · Herrengasse · Stephansplatz · Stubentor · …</p>
        </section>
      </div>
    </div>
  `;

  const TICKET_MACHINE_MISTAKE_THRESHOLD = 3;
  const MELDEZETTEL_MISTAKE_THRESHOLD = 3;

  const RULES_GAME_TRIGGER_NODE = "ch4_rules_game";
  const RULES_GAME_MISTAKE_THRESHOLD = 3;

  const AISLE_GAME_TRIGGER_NODE = "ch5_aisles_game";
  const AISLE_GAME_SUCCESS_NODE = "ch5_basket_done";
  const CASHIER_GAME_TRIGGER_NODE = "ch5_cashier_game";
  const CASHIER_GAME_SUCCESS_NODE = "ch5_paid_thought";

  const SUPERMARKET_AISLES = [
    { id: "produce", icon: "🍎", german: "Obst & Gemüse", english: "Produce" },
    { id: "bakery", icon: "🥖", german: "Bäckerei", english: "Bakery" },
    { id: "dairy", icon: "🧀", german: "Kühlregal", english: "Dairy / Refrigerated" },
    { id: "sweets", icon: "🍫", german: "Süßigkeiten & Getränke", english: "Sweets & Drinks" },
  ];

  const AISLE_TASKS = [
    {
      prompt: "I need some fresh apples. Where should I go?",
      correctId: "produce",
      successText: "Richtig! Das ist im Obst & Gemüse.",
      hintItem: "apples",
    },
    {
      prompt: "Now I need a loaf of bread!",
      correctId: "bakery",
      successText: "Richtig! Das ist in der Bäckerei.",
      hintItem: "bread",
    },
    {
      prompt: "And some cheese for dinner!",
      correctId: "dairy",
      successText: "Richtig! Das ist im Kühlregal.",
      hintItem: "cheese",
    },
  ];

  const CASHIER_OPTIONS = [
    {
      id: "tip",
      correct: true,
      german: "Hier bitte, 10 Euro. Stimmt so!",
      english: "Here you go, 10 Euros. Keep the change!",
    },
    {
      id: "exact",
      correct: true,
      german: "Hier bitte, 10 Euro.",
      english: "Here you go, 10 Euros.",
    },
    {
      id: "wrong",
      correct: false,
      german: "Entschuldigung, wo ist die U-Bahn?",
      english: "Excuse me, where is the subway?",
    },
  ];

  const CHURCH_RULES_PAIRS = [
    { id: "quiet", german: "Bitte Ruhe bewahren.", english: "Keep quiet / Stay calm" },
    { id: "dogs", german: "Keine Hunde im Dom.", english: "No dogs allowed" },
    { id: "flash", german: "Keine Fotos mit Blitzlicht.", english: "No flash photography" },
    { id: "hats", german: "Bitte keine Kappen oder Hüte tragen.", english: "Remove hats and caps" },
  ];

  const TICKET_TYPES = [
    "Einzelfahrt (€ 2,40)",
    "24-Stunden-Karte (€ 8,00)",
    "72-Stunden-Karte (€ 17,10)",
    "Monatskarte (€ 51,00)",
  ];
  const TICKET_CATEGORIES = [
    "Vollpreis",
    "Ermäßigt (Kinder/Senioren)",
    "Ermäßigt (Schüler/Studenten mit AT-Ausweis)",
  ];
  const TICKET_QUANTITIES = ["1 Ticket", "3 Tickets", "5 Tickets"];
  const TICKET_GOAL = { type: "Einzelfahrt (€ 2,40)", category: "Vollpreis" };
  const TICKET_MACHINE_HELP_TEXT =
    "I need to go to Stephansdom now, then to a museum, and later back to the hotel. That's at least 3 metro trips today. A single ticket (Einzelfahrt) costs €2.40. Let me check the ticket machine. I should buy whatever is cheaper for today: either individual tickets or a 24-hour pass. Also, since I'm a tourist and don't have an Austrian school ID, I must buy a standard adult fare.";

  const MELDEZETTEL_FIELDS = [
    { id: "vorname", label: "Vorname", answer: "Lena" },
    { id: "nachname", label: "Nachname", answer: "Majerová" },
    { id: "geburtsdatum", label: "Geburtsdatum", answer: "12. 04. 2008" },
    { id: "strasse", label: "Strasse/Hnr", answer: "Na Cikorce 2166/2b" },
    { id: "plz_ort", label: "PLZ / Ort", answer: "143 00 Praha 12" },
    { id: "staatsangehoerigkeit", label: "Staatsangehörigkeit", answer: "tschechisch" },
    { id: "ausweisnummer", label: "Ausweisnummer", answer: "L03X9921B" },
    { id: "ankunftsdatum", label: "Ankunftsdatum", answer: "15. 07. 2027" },
    { id: "abreisedatum", label: "Abreisedatum", answer: "20. 07. 2027" },
    { id: "zimmertyp", label: "Zimmertyp", answer: "Einzelzimmer" },
    { id: "zahlungsart", label: "Zahlungsart", answer: "Kreditkarte" },
  ];

  const meldezettel = {
    active: false,
    cards: [],
    fieldStatus: {},
    selectedCardId: null,
    onSuccessNodeId: null,
    message: "",
    messageType: "info",
    tutorialOpen: false,
  };

  const ticketMachine = {
    active: false,
    step: "type", // "type" | "category" | "quantity" | "payment" | "validate" | "feedback"
    quantity: 1,
    mistakes: 0,
    message: "",
    messageType: "info",
    onCompleteNodeId: null,
    helpOpen: false,
    errorOpen: false,
  };

  const FOLLOW_UP_BEFORE_REPLAY = {
    wrong_rude: {
      speaker: "Lena (Internal Monologue)",
      text: "Oh, I should be more polite. Let me try that again...",
      replayChoicesFrom: "start_see_man",
    },
    wrong_grammar: {
      speaker: "Lena (Internal Monologue)",
      text: "That did not sound right. I need to make the sentence clearer and try again...",
      replayChoicesFrom: "start_see_man",
    },
    ch2_greet_wrong_rude: {
      speaker: "Lena",
      text: "Entschuldigung, ich war unhöflich. Ich versuche es noch einmal...",
      replayChoicesFrom: "ch2_reception_greet",
    },
    ch2_greet_wrong_grammar: {
      speaker: "Lena",
      text: "Entschuldigung, Deutsch ist schwer für mich. Ich korrigiere mich...",
      replayChoicesFrom: "ch2_reception_greet",
    },
  };

  const els = {
    game: document.getElementById("game"),
    startMenu: document.getElementById("start-menu"),
    startMenuTitle: document.getElementById("start-menu-title"),
    startMainActions: document.getElementById("start-main-actions"),
    startGameBtn: document.getElementById("start-game-btn"),
    startChaptersBtn: document.getElementById("start-chapters-btn"),
    startChaptersSelection: document.getElementById("start-chapters-selection"),
    startChaptersBackBtn: document.getElementById("start-chapters-back-btn"),
    chapterSelectGrid: document.getElementById("chapter-select-grid"),
    chapterCards: Array.from(document.querySelectorAll(".chapter-card")),
    startOptionsBtn: document.getElementById("start-options-btn"),
    startVokabeltrainerBtn: document.getElementById("start-vokabeltrainer-btn"),
    optionsPanel: document.getElementById("options-panel"),
    optionsBackBtn: document.getElementById("options-back-btn"),
    vokabeltrainer: document.getElementById("vokabeltrainer"),
    vtSelect: document.getElementById("vt-select"),
    vtQuiz: document.getElementById("vt-quiz"),
    vtResults: document.getElementById("vt-results"),
    vtBackMenuBtn: document.getElementById("vt-back-menu-btn"),
    vtQuizBackBtn: document.getElementById("vt-quiz-back-btn"),
    vtProgressLabel: document.getElementById("vt-progress-label"),
    vtProgressFill: document.getElementById("vt-progress-fill"),
    vtGermanWord: document.getElementById("vt-german-word"),
    vtOptions: document.getElementById("vt-options"),
    vtScore: document.getElementById("vt-score"),
    vtMessage: document.getElementById("vt-message"),
    vtRetryBtn: document.getElementById("vt-retry-btn"),
    vtResultsMenuBtn: document.getElementById("vt-results-menu-btn"),
    vtSetButtons: Array.from(document.querySelectorAll("[data-vt-set]")),
    chapterLabel: document.getElementById("chapter-label"),
    npcContainer: document.getElementById("npc-container"),
    npcSprite: document.getElementById("npc-sprite"),
    npcLabel: document.getElementById("npc-label"),
    lenaContainer: document.getElementById("lena-container"),
    lenaSprite: document.getElementById("lena-sprite"),
    dialogueBox: document.getElementById("dialogue-box"),
    speakerName: document.getElementById("speaker-name"),
    dialogueText: document.getElementById("dialogue-text"),
    advanceHint: document.getElementById("advance-hint"),
    choicesContainer: document.getElementById("choices-container"),
    choiceButtons: Array.from(document.querySelectorAll(".choice-btn")),
    menuBtn: document.getElementById("menu-btn"),
    menuPanel: document.getElementById("menu-panel"),
    vocabBtn: document.getElementById("vocab-btn"),
    vocabOverlay: document.getElementById("vocab-overlay"),
    vocabTitle: document.getElementById("vocab-title"),
    vocabList: document.getElementById("vocab-list"),
    vocabCloseBtn: document.getElementById("vocab-close-btn"),
    vocabTutorial: document.getElementById("vocab-tutorial"),
    vocabTutorialBtn: document.getElementById("vocab-tutorial-btn"),
    menuMainActions: document.getElementById("menu-main-actions"),
    restartBtn: document.getElementById("restart-btn"),
    startMenuFromGameBtn: document.getElementById("start-menu-from-game-btn"),
    closeMenuBtn: document.getElementById("close-menu-btn"),
    meldezettelOverlay: document.getElementById("meldezettel-overlay"),
    meldezettelMessage: document.getElementById("meldezettel-message"),
    meldezettelGrid: document.getElementById("meldezettel-grid"),
    meldezettelPool: document.getElementById("meldezettel-pool"),
    meldezettelSubmitBtn: document.getElementById("meldezettel-submit"),
    meldezettelDevSuccessBtn: document.getElementById("meldezettel-dev-success"),
    meldezettelDevFailBtn: document.getElementById("meldezettel-dev-fail"),
    ticketMachineOverlay: document.getElementById("ticket-machine-overlay"),
    ticketMachineMessage: document.getElementById("ticket-machine-message"),
    ticketMachineStepType: document.getElementById("ticket-machine-step-type"),
    ticketMachineStepCategory: document.getElementById("ticket-machine-step-category"),
    ticketMachineStepQuantity: document.getElementById("ticket-machine-step-quantity"),
    ticketMachineStepPayment: document.getElementById("ticket-machine-step-payment"),
    ticketMachineStepValidate: document.getElementById("ticket-machine-step-validate"),
    ticketMachineTypes: document.getElementById("ticket-machine-types"),
    ticketMachineCategories: document.getElementById("ticket-machine-categories"),
    ticketMachineQuantities: document.getElementById("ticket-machine-quantities"),
    ticketMachineBuyBtn: document.getElementById("ticket-machine-buy"),
    ticketMachineEntwerterBtn: document.getElementById("ticket-machine-entwerter"),
    ticketMachineHintBtn: document.getElementById("ticket-machine-hint"),
    ticketMachineHintOverlay: document.getElementById("ticket-machine-hint-overlay"),
    ticketMachineHintText: document.getElementById("ticket-machine-hint-text"),
    ticketMachineHintCloseBtn: document.getElementById("ticket-machine-hint-close"),
    ticketMachineErrorOverlay: document.getElementById("ticket-machine-error-overlay"),
    ticketMachineErrorText: document.getElementById("ticket-machine-error-text"),
    ticketMachineErrorContinueBtn: document.getElementById("ticket-machine-error-continue"),
    ticketMachineDevSuccessBtn: document.getElementById("ticket-machine-dev-success"),
    ticketMachineDevFailBtn: document.getElementById("ticket-machine-dev-fail"),
  };

  const state = {
    nodeId: START_NODE,
    typing: false,
    waitingForChoice: false,
    fullText: "",
    typeTimer: null,
    activeFollowUp: null,
    followUpShownForNode: null,
    pendingFollowUp: null,
    pendingReplayChoicesFrom: null,
  };

  function getNode() {
    return storyData[state.nodeId];
  }

  function clearTypeTimer() {
    if (state.typeTimer) {
      clearInterval(state.typeTimer);
      state.typeTimer = null;
    }
  }

  function setBackground(filename) {
    const key = BACKGROUND_MAP[filename] || "vienna_hauptbahnhof";
    els.game.dataset.background = key;
  }

  function updateCharacters(node) {
    const npc = NPC_MAP[node.npcImage] || NPC_MAP.none;
    const lenaMood = LENA_MOOD_MAP[node.lenaMood] || "neutral";

    if (npc.visible) {
      els.npcContainer.style.display = "";
      els.npcContainer.classList.remove("is-hidden");
      els.npcSprite.dataset.character = npc.character;
      els.npcSprite.dataset.mood = npc.mood;
      els.npcLabel.textContent = npc.name;
    } else {
      els.npcContainer.style.display = "none";
      els.npcContainer.classList.add("is-hidden");
    }

    els.lenaContainer.classList.remove("is-hidden");
    els.lenaSprite.dataset.character = "lena";
    els.lenaSprite.dataset.mood = lenaMood;

    const speaker = node.speaker || "";
    const isLena = speaker.includes("Lena");
    const isNpc = npc.visible && !isLena;

    els.lenaContainer.classList.toggle("is-speaking", isLena);
    els.lenaContainer.classList.toggle("is-dimmed", isNpc);
    els.npcContainer.classList.toggle("is-speaking", isNpc);
    els.npcContainer.classList.toggle("is-dimmed", isLena);
  }

  function hideChoices() {
    state.waitingForChoice = false;
    els.choicesContainer.hidden = true;
    els.choiceButtons.forEach((btn) => {
      btn.classList.add("is-hidden");
      btn.textContent = "";
      btn.onclick = null;
    });
  }

  function showChoices(choices) {
    state.waitingForChoice = true;
    els.advanceHint.classList.add("is-hidden");
    els.choicesContainer.hidden = false;

    els.choiceButtons.forEach((btn, index) => {
      const choice = choices[index];
      if (choice) {
        btn.textContent = choice.text;
        btn.classList.remove("is-hidden");
        btn.onclick = () => selectChoice(choice.text, choice.nextNode);
      } else {
        btn.classList.add("is-hidden");
        btn.onclick = null;
      }
    });
  }

  function getChoicesForCurrentNode(node) {
    if (state.activeFollowUp?.replayChoicesFrom) {
      return storyData[state.activeFollowUp.replayChoicesFrom]?.choices || [];
    }

    const replaySourceNodeId = REPLAY_CHOICES_FROM_NODE[node.id];
    if (replaySourceNodeId) {
      return storyData[replaySourceNodeId]?.choices || [];
    }

    return node.choices || [];
  }

  function applyTextFadeIn() {
    els.dialogueText.classList.remove("text-fade-in");
    // Force reflow so the animation restarts every time a new node renders.
    void els.dialogueText.offsetWidth;
    els.dialogueText.classList.add("text-fade-in");
  }

  function finishTyping() {
    clearTypeTimer();
    state.typing = false;
    els.dialogueText.textContent = state.fullText;

    const node = getNode();
    const followUp = FOLLOW_UP_BEFORE_REPLAY[node.id];
    if (followUp && state.followUpShownForNode !== node.id && !state.activeFollowUp) {
      state.pendingFollowUp = { sourceNodeId: node.id, followUp };
      els.advanceHint.classList.remove("is-hidden");
      return;
    }

    if (state.activeFollowUp?.replayChoicesFrom) {
      state.pendingReplayChoicesFrom = state.activeFollowUp.replayChoicesFrom;
      state.activeFollowUp = null;
      els.advanceHint.classList.remove("is-hidden");
      return;
    }

    const choices = getChoicesForCurrentNode(node);
    if (choices.length) {
      showChoices(choices);
    } else {
      els.advanceHint.classList.remove("is-hidden");
    }
  }

  function renderFollowUpDialogue(sourceNodeId, followUp) {
    state.followUpShownForNode = sourceNodeId;
    state.activeFollowUp = followUp;
    hideChoices();
    applyTextFadeIn();

    const speaker = followUp.speaker || "Lena";
    const isInternalMonologue = speaker.includes("Internal Monologue");

    els.dialogueText.classList.toggle("internal-thought", isInternalMonologue);
    els.dialogueText.classList.remove("sensory-text", "announcement-text", "metro-sign-text");
    els.speakerName.classList.remove("is-hidden");
    els.speakerName.textContent = isInternalMonologue ? "Lena" : speaker;

    startTypewriter(followUp.text);
  }

  function startTypewriter(text) {
    clearTypeTimer();
    state.fullText = text;
    state.typing = true;
    els.dialogueText.textContent = "";
    els.advanceHint.classList.remove("is-hidden");

    let index = 0;
    state.typeTimer = setInterval(() => {
      index += 1;
      els.dialogueText.textContent = text.slice(0, index);

      if (index >= text.length) {
        finishTyping();
      }
    }, TYPE_SPEED);
  }

  function renderMetroSignBoard() {
    els.dialogueText.innerHTML = METRO_SIGN_BOARD_HTML;
    state.fullText = els.dialogueText.textContent.trim();
  }

  function applyDialogueStyle(node) {
    const speaker = node.speaker || "";
    const isInternalMonologue = speaker.includes("Internal Monologue");

    els.dialogueText.classList.toggle("internal-thought", isInternalMonologue);
    els.dialogueText.classList.toggle("sensory-text", node.dialogueStyle === "sensory");
    els.dialogueText.classList.toggle("announcement-text", node.dialogueStyle === "announcement");
    els.dialogueText.classList.toggle("metro-sign-text", node.dialogueStyle === "metro-sign");
  }

  function renderDialogue(node) {
    hideChoices();
    applyTextFadeIn();
    applyDialogueStyle(node);

    const speaker = node.speaker || "";
    const isInternalMonologue = speaker.includes("Internal Monologue");

    els.speakerName.classList.remove("is-hidden");
    els.speakerName.textContent = isInternalMonologue ? "Lena" : speaker || "???";

    if (node.dialogueStyle === "metro-sign") {
      clearTypeTimer();
      state.typing = false;
      renderMetroSignBoard();
      const choices = node.choices || [];
      if (choices.length) {
        showChoices(choices);
      } else {
        els.advanceHint.classList.remove("is-hidden");
      }
      return;
    }

    // Instant text: show everything at once so the player can't accidentally
    // click a choice button while trying to skip the typewriter effect.
    if (node.instantText) {
      clearTypeTimer();
      state.typing = false;
      state.fullText = node.text;
      els.dialogueText.textContent = node.text;
      const choices = node.choices || [];
      if (choices.length) {
        showChoices(choices);
      } else {
        els.advanceHint.classList.remove("is-hidden");
      }
      return;
    }

    startTypewriter(node.text);
  }

  function removeJumpScareFlash() {
    document.getElementById("jump-scare-flash")?.remove();
  }

  function playJumpScare() {
    removeJumpScareFlash();
    els.npcContainer.classList.remove("is-jumpscare-pop");
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");

    const flash = document.createElement("div");
    flash.id = "jump-scare-flash";
    flash.className = "jump-scare-flash";
    flash.setAttribute("aria-hidden", "true");
    els.game.appendChild(flash);

    window.setTimeout(() => {
      const node = getNode();
      const npc = NPC_MAP[node.npcImage] || NPC_MAP.none;
      if (npc.visible) {
        els.npcContainer.style.display = "";
        els.npcContainer.classList.remove("is-hidden");
        els.npcSprite.dataset.character = npc.character;
        els.npcSprite.dataset.mood = npc.mood;
        els.npcLabel.textContent = npc.name;
        void els.npcContainer.offsetWidth;
        els.npcContainer.classList.add("is-jumpscare-pop");
        els.npcContainer.classList.add("is-speaking");
        els.lenaContainer.classList.add("is-dimmed");
      }
    }, 140);

    window.setTimeout(removeJumpScareFlash, 520);
  }

  function renderJumpScareNode(node) {
    removeBlackScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    removeJumpScareFlash();

    setBackground(node.background);
    els.lenaContainer.classList.remove("is-hidden", "is-dimmed", "is-speaking");
    els.lenaSprite.dataset.character = "lena";
    els.lenaSprite.dataset.mood = LENA_MOOD_MAP[node.lenaMood] || "surprised";

    els.npcContainer.classList.remove("is-jumpscare-pop", "is-speaking", "is-dimmed");
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");

    els.dialogueBox.hidden = false;
    playJumpScare();
    renderDialogue(node);
  }

  // ── Black-screen transition ───────────────────────────────────────────────

  function removeBlackScreen() {
    const existing = document.getElementById("black-screen-overlay");
    if (existing) existing.remove();

    // Restore the standard layout.
    els.dialogueBox.hidden = false;
    els.lenaContainer.classList.remove("is-hidden");
  }

  function showBlackScreen(node) {
    // Hide the normal game UI so nothing bleeds through.
    clearTypeTimer();
    state.typing = false;
    hideChoices();
    els.dialogueBox.hidden = true;
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    // Build the overlay (idempotent — replace if it already exists).
    removeBlackScreen();
    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    const overlay = document.createElement("div");
    overlay.id = "black-screen-overlay";
    overlay.className = "full-black-screen";

    if (isChapterTitleNode(node)) {
      overlay.addEventListener("click", () => {
        advanceBlackScreenChoice(node.choices?.[0]);
      });
    }

    const message = document.createElement("p");
    message.textContent = getBlackScreenTitleText(node);
    if (isChapterTitleNode(node)) {
      message.style.fontWeight = "800";
      message.style.fontSize = "clamp(2rem, 7vw, 4rem)";
      message.style.letterSpacing = "0.04em";
      message.style.textTransform = "uppercase";
      message.style.textAlign = "center";
    }
    overlay.appendChild(message);

    // Render each choice as a styled button.
    (node.choices || []).forEach((choice) => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        advanceBlackScreenChoice(choice);
      });
      overlay.appendChild(btn);
    });

    els.game.appendChild(overlay);
  }

  function isChapterTitleNode(node) {
    return (
      node?.id === "chapter_1_title" ||
      node?.id === "chapter_2_teaser" ||
      node?.id === "chapter_3_title" ||
      node?.id === "chapter_4_title" ||
      node?.id === "chapter_5_title" ||
      node?.id === "chapter_6_title"
    );
  }

  const BLACK_SCREEN_NODE_IDS = new Set([
    "chapter_1_title",
    "black_screen",
    "chapter_2_teaser",
    "chapter_3_title",
    "chapter_4_title",
    "chapter_5_title",
    "chapter_6_title",
    "ch4_time_passes",
    "ch6_morning_title",
  ]);

  function getBlackScreenTitleText(node) {
    if (node.id === "chapter_2_teaser") {
      return "Chapter 2: Check-in";
    }

    return node.text;
  }

  function advanceBlackScreenChoice(choice) {
    if (!choice) return;

    recordAnswer(choice.text, choice.nextNode);
    removeBlackScreen();
    routeToNode(choice.nextNode);
  }

  const TAGEBUCH_CONTENT = {
    1: {
      success: {
        photo: "photo-c1-a.png",
        alt: "Lena smiling at Vienna Hauptbahnhof",
        german:
          "Mein erster Tag in Wien! Die Reise mit dem Zug war sehr schön und bequem. Ich habe ein Busticket auf Deutsch gekauft und eine nette Frau hat mir geholfen. Ich fühle mich glücklich und bereit für mein Abenteuer!",
        english:
          "My first day in Vienna! The train journey was very nice and comfortable. I bought a bus ticket in German and a friendly woman helped me. I feel happy and ready for my adventure!",
      },
      challenge: {
        photo: "photo-c1-b.png",
        alt: "Lena looking lost near the station",
        german:
          "Uff, was für ein Tag! Die Ankunft in Wien war etwas stressig. Der Fahrkartenautomat war kompliziert und ich war sehr nervös beim Deutschsprechen. Aber ich bin hier und morgen wird es sicher besser!",
        english:
          "Phew, what a day! Arriving in Vienna was a bit stressful. The ticket machine was complicated and I was very nervous speaking German. But I am here and tomorrow will surely be better!",
      },
    },
    2: {
      success: {
        photo: "photo-c2-a.png",
        alt: "Lena smiling at the hotel reception",
        german:
          "Das Hotel ist sehr schön! Das Einchecken an der Rezeption hat super geklappt. Ich habe auf Deutsch nach dem Frühstück und dem WLAN-Passwort gefragt. Der Rezeptionist war sehr nett. Jetzt kann ich mich ausruhen.",
        english:
          "The hotel is very nice! Checking in at reception went great. I asked about breakfast and the Wi-Fi password in German. The receptionist was very kind. Now I can rest.",
      },
      challenge: {
        photo: "photo-c2-b.png",
        alt: "Lena looking overwhelmed at the hotel reception",
        german:
          "Ein schwieriger Abend. An der Rezeption habe ich ein paar Fehler gemacht und der Rezeptionist hat mich nicht sofort verstanden. Es war ein bisschen peinlich, aber ich habe mein Zimmer bekommen. Ich muss mehr lernen.",
        english:
          "A difficult evening. I made a few mistakes at reception and the receptionist didn't understand me right away. It was a bit embarrassing, but I got my room. I need to study more.",
      },
    },
    3: {
      success: {
        photo: "photo-c3-a.png",
        alt: "Lena smiling on the U-Bahn in Vienna",
        german:
          "Heute bin ich mit der U-Bahn gefahren. Ich habe die richtige Linie U3 und das richtige Gleis nach Simmering gefunden. Auf der Rolltreppe habe ich gelernt: Rechts stehen, links gehen! Ich fühle mich schon wie eine echte Wienerin.",
        english:
          "Today I took the underground train. I found the correct line U3 and the right platform towards Simmering. On the escalator I learned: Stand on the right, walk on the left! I already feel like a real Viennese.",
      },
      challenge: {
        photo: "photo-c3-b.png",
        alt: "Lena looking stressed on the U-Bahn in Vienna",
        german:
          "Die U-Bahn in Wien ist sehr schnell und voll. Ich habe zuerst den falschen Bahnsteig gewählt und Zeit verloren. Dann gab es ein kleines Missverständnis auf der Rolltreppe. Aber zum Glück bin ich am Stephansplatz angekommen.",
        english:
          "The underground in Vienna is very fast and crowded. I chose the wrong platform at first and lost time. Then there was a small misunderstanding on the escalator. But luckily I arrived at Stephansplatz.",
      },
    },
    4: {
      success: {
        photo: "photo-c4-a.png",
        alt: "Lena smiling at the top of the Stephansdom tower",
        german:
          "Stephansdom war fantastisch! Ich habe die Regeln verstanden und bin 343 Stufen auf den Südturm gestiegen. Der Ausblick über ganz Wien war unglaublich schön. Ich bin sehr stolz auf mich!",
        english:
          "Stephansdom was fantastic! I understood the rules and climbed 343 steps up the South Tower. The view over all of Vienna was unbelievably beautiful. I am very proud of myself!",
      },
      challenge: {
        photo: "photo-c4-b.png",
        alt: "Lena looking exhausted on the cathedral tower stairs",
        german:
          "Ein sehr langer und anstrengender Tag. Der Stephansdom ist wunderschön, aber die vielen Treppen waren sehr schwer für mich. Im Dom war ich kurz etwas verwirrt wegen der Regeln. Aber der Ausblick war es trotzdem wert.",
        english:
          "A very long and exhausting day. Stephansdom is beautiful, but the many stairs were very hard for me. In the cathedral I was briefly confused about the rules. But the view was still worth it.",
      },
    },
    5: {
      success: {
        photo: "photo-c5-a.png",
        alt: "Lena shopping happily at a Viennese supermarket",
        german:
          "Im Supermarkt habe ich alles gefunden! Obst, Brot und Käse — und an der Kasse habe ich auf Deutsch bezahlt. 'Stimmt so!' fühlt sich schon ganz natürlich an.",
        english:
          "At the supermarket I found everything! Fruit, bread and cheese — and at the checkout I paid in German. 'Keep the change!' already feels completely natural.",
      },
      challenge: {
        photo: "photo-c5-b.png",
        alt: "Lena looking unsure at a supermarket checkout",
        german:
          "Einkaufen auf Deutsch war spannend, aber auch ein bisschen stressig. An der Kasse war ich kurz verwirrt. Trotzdem habe ich meine Sachen bekommen — Übung macht den Meister!",
        english:
          "Shopping in German was exciting, but also a bit stressful. At the checkout I was briefly confused. Still, I got my groceries — practice makes perfect!",
      },
    },
    6: {
      success: {
        photo: "photo-c6-a.png",
        alt: "Lena enjoying a Melange in a Viennese café",
        german:
          "Wien war einfach wunderbar! Ich hatte am Anfang Angst, Deutsch zu sprechen, aber mit jedem Tag wurde es einfacher. Ich habe so viel gelernt!",
        english:
          "Vienna was simply wonderful! I was afraid to speak German at first, but it got easier every day. I learned so much!",
      },
      challenge: {
        photo: "photo-c6-b.png",
        alt: "Lena reflecting in a Viennese café before departure",
        german:
          "Wien war einfach wunderbar! Ich hatte am Anfang Angst, Deutsch zu sprechen, aber mit jedem Tag wurde es einfacher. Ich habe so viel gelernt!",
        english:
          "Vienna was simply wonderful! I was afraid to speak German at first, but it got easier every day. I learned so much!",
      },
    },
  };

  const TAGEBUCH_CHAPTER_TITLES = {
    1: "Ankunft",
    2: "Check-in",
    3: "Unterwegs",
    4: "Dem Himmel so nah",
    5: "Im Supermarkt",
    6: "Epilog",
  };

  function removeTagebuchScreen() {
    const existing = document.getElementById("tagebuch-screen");
    if (existing) existing.remove();
  }

  function getMistakeAllowance(threshold) {
    return Math.max(threshold - 1, 0);
  }

  function updateMistakeCounter(element, count, threshold) {
    if (!element) return;

    const maxAllowed = getMistakeAllowance(threshold);
    element.textContent = `Fehler: ${count} / ${maxAllowed}`;
    element.classList.remove("mistake-counter--warning", "mistake-counter--critical");

    if (count >= threshold) {
      element.classList.add("mistake-counter--critical");
    } else if (count >= maxAllowed) {
      element.classList.add("mistake-counter--warning");
    }
  }

  function getChapterStrikeCount(chapterNumber) {
    if (chapterNumber === 2) {
      return [gameState.receptionistMistake, gameState.meldezettelMistakes >= MELDEZETTEL_MISTAKE_THRESHOLD].filter(Boolean).length;
    }

    if (chapterNumber === 3) {
      return Math.min(gameState.ch3Strikes, 2);
    }

    if (chapterNumber === 4) {
      return Math.min(gameState.ch4Strikes, 2);
    }

    if (chapterNumber === 5) {
      return Math.min(gameState.ch5Strikes, 2);
    }

    if (chapterNumber === 6) {
      return 0;
    }

    return [gameState.ch1StationFailed, gameState.ch1LateArrival].filter(Boolean).length;
  }

  function getTotalJourneyStrikes() {
    try {
      const progress = loadSavedProgress();
      let total = 0;
      for (let chapter = 1; chapter <= TOTAL_CHAPTERS; chapter += 1) {
        const entry = progress[`chapter${chapter}`];
        if (entry && typeof entry.strikes === "number") {
          total += entry.strikes;
        }
      }
      return total;
    } catch (error) {
      console.warn("Unable to read journey progress:", error);
      return 0;
    }
  }

  function getTagebuchVariant(chapterNumber, strikes) {
    const content = TAGEBUCH_CONTENT[chapterNumber] || TAGEBUCH_CONTENT[1];
    // Variant A (success): 0-1 strikes. Variant B (challenge): 2+ strikes.
    const isChallenging = strikes >= 2;
    const variant = isChallenging ? content.challenge : content.success;

    return {
      ...variant,
      label: isChallenging ? "Challenging Day" : "Successful Day",
    };
  }

  function saveChapterProgress(chapterNumber, strikes) {
    try {
      const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      const progress = raw ? JSON.parse(raw) : {};
      progress[`chapter${chapterNumber}`] = {
        strikes,
        completedAt: new Date().toISOString(),
      };
      progress.lastCompletedChapter = chapterNumber;
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.warn("Unable to save Tagebuch progress:", error);
    }
  }

  const NEXT_CHAPTER_MAP = {
    1: { label: "Chapter 2 - Check-in", nodeId: "chapter_2_teaser" },
    2: { label: "Chapter 3 - Unterwegs", nodeId: "chapter_3_title" },
    3: { label: "Chapter 4: Dem Himmel so nah", nodeId: "chapter_4_title" },
    4: { label: "Chapter 5: Im Supermarkt", nodeId: "chapter_5_title" },
    5: { label: "Chapter 6: Epilog", nodeId: "chapter_6_title" },
  };

  function goToNextChapterOrMenu(completedChapter) {
    removeTagebuchScreen();
    resetGameState();

    const next = NEXT_CHAPTER_MAP[completedChapter];
    if (next) {
      els.chapterLabel.textContent = next.label;
      goToNode(next.nodeId);
      return;
    }

    showStartMainActions();
    els.startMenu.hidden = false;
    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");
  }

  function showTagebuchScreen(chapterNumber) {
    clearTypeTimer();
    state.typing = false;
    hideChoices();
    removeBlackScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeAisleGame();
    closeCashierGame();
    removeCelebrationScreen();
    removeTagebuchScreen();

    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    const strikes = getChapterStrikeCount(chapterNumber);
    const variant = getTagebuchVariant(chapterNumber, strikes);

    const overlay = document.createElement("div");
    overlay.id = "tagebuch-screen";
    overlay.className = "tagebuch-screen";

    const card = document.createElement("article");
    card.className = "tagebuch-card";

    const title = document.createElement("p");
    title.className = "tagebuch-card__eyebrow";
    title.textContent = `Tagebuch — Chapter ${chapterNumber}`;
    card.appendChild(title);

    const heading = document.createElement("h2");
    heading.className = "tagebuch-card__title";
    heading.textContent = TAGEBUCH_CHAPTER_TITLES[chapterNumber] || "Ankunft";
    card.appendChild(heading);

    const photo = document.createElement("img");
    photo.className = "tagebuch-card__photo";
    photo.src = variant.photo;
    photo.alt = variant.alt;
    card.appendChild(photo);

    const germanLabel = document.createElement("p");
    germanLabel.className = "tagebuch-card__lang-label";
    germanLabel.textContent = "German";
    card.appendChild(germanLabel);

    const germanText = document.createElement("p");
    germanText.className = "tagebuch-card__text tagebuch-card__text--german";
    germanText.textContent = variant.german;
    card.appendChild(germanText);

    const englishLabel = document.createElement("p");
    englishLabel.className = "tagebuch-card__lang-label";
    englishLabel.textContent = "English";
    card.appendChild(englishLabel);

    const englishText = document.createElement("p");
    englishText.className = "tagebuch-card__text tagebuch-card__text--english";
    englishText.textContent = variant.english;
    card.appendChild(englishText);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tagebuch-card__button";

    if (chapterNumber === 6) {
      btn.textContent = "Continue";
      btn.addEventListener("click", () => {
        saveChapterProgress(chapterNumber, strikes);
        removeTagebuchScreen();
        goToNode("ch6_departure");
      });
    } else {
      btn.textContent = chapterNumber < TOTAL_CHAPTERS ? "Next" : "Finish";
      btn.addEventListener("click", () => {
        saveChapterProgress(chapterNumber, strikes);
        goToNextChapterOrMenu(chapterNumber);
      });
    }

    card.appendChild(btn);

    overlay.appendChild(card);
    els.game.appendChild(overlay);
  }

  // ── Meldezettel drag-and-drop form mini-game ─────────────────────────────

  function shuffleArray(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function createMeldezettelCards() {
    return MELDEZETTEL_FIELDS.map((field) => ({
      id: `card-${field.id}`,
      text: field.answer,
      correctFieldId: field.id,
      location: "pool",
      locked: false,
    }));
  }

  function getCardById(cardId) {
    return meldezettel.cards.find((card) => card.id === cardId);
  }

  function getCardInField(fieldId) {
    return meldezettel.cards.find((card) => card.location === fieldId);
  }

  function isFieldId(value) {
    return MELDEZETTEL_FIELDS.some((field) => field.id === value);
  }

  function areAllFieldsFilled() {
    return MELDEZETTEL_FIELDS.every((field) => Boolean(getCardInField(field.id)));
  }

  function placeCard(cardId, targetFieldId) {
    const card = getCardById(cardId);
    if (!card || card.locked) return;
    if (card.location === targetFieldId) return;

    const sourceFieldId = isFieldId(card.location) ? card.location : null;
    const occupying = getCardInField(targetFieldId);

    if (occupying && occupying.locked) return;

    if (occupying) {
      occupying.location = sourceFieldId || "pool";
    }

    if (sourceFieldId) {
      meldezettel.fieldStatus[sourceFieldId] = "neutral";
    }

    card.location = targetFieldId;
    meldezettel.fieldStatus[targetFieldId] = "neutral";
    meldezettel.selectedCardId = null;
    renderMeldezettel();
  }

  function returnCardToPool(cardId) {
    const card = getCardById(cardId);
    if (!card || card.locked) return;
    if (card.location === "pool") return;

    const sourceFieldId = isFieldId(card.location) ? card.location : null;
    card.location = "pool";
    if (sourceFieldId) {
      meldezettel.fieldStatus[sourceFieldId] = "neutral";
    }
    meldezettel.selectedCardId = null;
    renderMeldezettel();
  }

  function createMeldezettelCardElement(card) {
    const cardEl = document.createElement("div");
    cardEl.className = "meldezettel__card";
    cardEl.textContent = card.text;
    cardEl.dataset.cardId = card.id;

    if (card.locked) {
      cardEl.classList.add("is-locked");
      return cardEl;
    }

    const inField = isFieldId(card.location);

    cardEl.addEventListener("click", (event) => {
      event.stopPropagation();
      if (meldezettel.tutorialOpen) return;

      if (inField) {
        // A placed card: either swap in the currently selected card, or send this one back to the pool.
        if (meldezettel.selectedCardId && meldezettel.selectedCardId !== card.id) {
          placeCard(meldezettel.selectedCardId, card.location);
        } else {
          returnCardToPool(card.id);
        }
        return;
      }

      // A pooled card: toggle its selection.
      meldezettel.selectedCardId = meldezettel.selectedCardId === card.id ? null : card.id;
      renderMeldezettel();
    });

    if (meldezettel.selectedCardId === card.id) {
      cardEl.classList.add("is-selected");
    }

    return cardEl;
  }

  function renderMeldezettel() {
    if (!els.meldezettelGrid || !els.meldezettelPool) return;

    els.meldezettelGrid.innerHTML = "";
    els.meldezettelPool.innerHTML = "";

    MELDEZETTEL_FIELDS.forEach((field) => {
      const card = getCardInField(field.id);
      const status = meldezettel.fieldStatus[field.id] || "neutral";

      const fieldEl = document.createElement("div");
      fieldEl.className = `meldezettel__field is-${status}`;
      fieldEl.dataset.fieldId = field.id;

      const labelEl = document.createElement("span");
      labelEl.className = "meldezettel__field-label";
      labelEl.textContent = field.label;
      fieldEl.appendChild(labelEl);

      const slotEl = document.createElement("div");
      slotEl.className = "meldezettel__slot";

      if (card) {
        slotEl.appendChild(createMeldezettelCardElement(card));
      } else {
        slotEl.classList.add("meldezettel__slot--empty");
      }
      fieldEl.appendChild(slotEl);

      if (meldezettel.selectedCardId && !card?.locked && !meldezettel.tutorialOpen) {
        fieldEl.classList.add("is-droppable");
      }

      fieldEl.addEventListener("click", () => {
        if (meldezettel.tutorialOpen) return;
        if (card?.locked) return;
        // Clicking an empty (or filled) field while a card is selected assigns it here.
        if (meldezettel.selectedCardId) {
          placeCard(meldezettel.selectedCardId, field.id);
        }
      });

      els.meldezettelGrid.appendChild(fieldEl);
    });

    meldezettel.cards
      .filter((card) => card.location === "pool")
      .forEach((card) => {
        els.meldezettelPool.appendChild(createMeldezettelCardElement(card));
      });

    els.meldezettelMessage.textContent = meldezettel.message || "";
    els.meldezettelMessage.classList.remove("is-error", "is-success");
    if (meldezettel.messageType === "error") els.meldezettelMessage.classList.add("is-error");
    if (meldezettel.messageType === "success") els.meldezettelMessage.classList.add("is-success");

    els.meldezettelSubmitBtn.disabled = meldezettel.tutorialOpen || !areAllFieldsFilled();
  }

  function initMeldezettelInteractions() {
    if (!els.meldezettelPool || !els.meldezettelSubmitBtn) return;

    // Clicking the empty area of the pool clears the current selection.
    els.meldezettelPool.addEventListener("click", (event) => {
      if (meldezettel.tutorialOpen) return;
      if (event.target !== els.meldezettelPool) return;
      if (meldezettel.selectedCardId) {
        meldezettel.selectedCardId = null;
        renderMeldezettel();
      }
    });

    els.meldezettelSubmitBtn.addEventListener("click", handleMeldezettelSubmit);
    els.meldezettelDevSuccessBtn?.addEventListener("click", () => skipMeldezettelForDev(0));
    els.meldezettelDevFailBtn?.addEventListener("click", () => skipMeldezettelForDev(3));
  }

  function handleMeldezettelSubmit() {
    if (meldezettel.tutorialOpen) return;
    if (!areAllFieldsFilled()) return;

    let allCorrect = true;
    let incorrectCount = 0;

    MELDEZETTEL_FIELDS.forEach((field) => {
      const card = getCardInField(field.id);
      const isCorrect = Boolean(card) && card.correctFieldId === field.id;

      if (isCorrect) {
        meldezettel.fieldStatus[field.id] = "correct";
        card.locked = true;
      } else {
        meldezettel.fieldStatus[field.id] = "incorrect";
        allCorrect = false;
        incorrectCount += 1;
        if (card) {
          card.locked = false;
          card.location = "pool";
        }
      }
    });

    if (allCorrect) {
      meldezettel.message = "Perfekt! Das Formular ist korrekt ausgefüllt.";
      meldezettel.messageType = "success";
      renderMeldezettel();
      els.meldezettelSubmitBtn.disabled = true;

      const nextNodeId = meldezettel.onSuccessNodeId;
      setTimeout(() => {
        closeMeldezettelGame();
        goToNode(nextNodeId);
      }, 1500);
    } else {
      gameState.meldezettelMistakes += incorrectCount;
      meldezettel.cards = shuffleArray(meldezettel.cards);
      meldezettel.message = "Entschuldigung, aber ich glaube, da ist ein Fehler im Formular. Bitte prüfen Sie das noch einmal.";
      meldezettel.messageType = "error";
      renderMeldezettel();
    }
  }

  function skipMeldezettelForDev(mistakeCount) {
    if (!meldezettel.active) return;

    gameState.meldezettelMistakes = mistakeCount;
    meldezettel.tutorialOpen = false;

    const nextNodeId = meldezettel.onSuccessNodeId || MELDEZETTEL_SUCCESS_NODE;
    closeMeldezettelGame();
    goToNode(nextNodeId);
  }

  function openMeldezettelGame(onSuccessNodeId) {
    meldezettel.active = true;
    meldezettel.cards = shuffleArray(createMeldezettelCards());
    meldezettel.fieldStatus = {};
    MELDEZETTEL_FIELDS.forEach((field) => {
      meldezettel.fieldStatus[field.id] = "neutral";
    });
    meldezettel.selectedCardId = null;
    meldezettel.onSuccessNodeId = onSuccessNodeId;
    meldezettel.message = "";
    meldezettel.messageType = "info";
    meldezettel.tutorialOpen = true;

    clearTypeTimer();
    state.typing = false;
    hideChoices();
    removeBlackScreen();
    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");
    els.meldezettelOverlay.hidden = false;

    renderMeldezettel();
    showMeldezettelTutorial();
  }

  function closeMeldezettelGame() {
    meldezettel.active = false;
    meldezettel.tutorialOpen = false;
    removeMeldezettelTutorial();
    if (els.meldezettelOverlay) els.meldezettelOverlay.hidden = true;
  }

  function removeMeldezettelTutorial() {
    const existing = document.getElementById("meldezettel-tutorial");
    if (existing) existing.remove();
  }

  function closeMeldezettelTutorial() {
    meldezettel.tutorialOpen = false;
    removeMeldezettelTutorial();
    renderMeldezettel();
  }

  function showMeldezettelTutorial() {
    removeMeldezettelTutorial();

    const tutorial = document.createElement("div");
    tutorial.id = "meldezettel-tutorial";
    tutorial.className = "meldezettel-tutorial";
    tutorial.setAttribute("role", "dialog");
    tutorial.setAttribute("aria-modal", "true");
    tutorial.setAttribute("aria-labelledby", "meldezettel-tutorial-title");

    const panel = document.createElement("div");
    panel.className = "meldezettel-tutorial__panel";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "meldezettel-tutorial__close";
    closeBtn.setAttribute("aria-label", "Close tutorial");
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", closeMeldezettelTutorial);
    panel.appendChild(closeBtn);

    const title = document.createElement("h3");
    title.id = "meldezettel-tutorial-title";
    title.className = "meldezettel-tutorial__title";
    title.textContent = "How to Play: Registration Form";
    panel.appendChild(title);

    const intro = document.createElement("p");
    intro.className = "meldezettel-tutorial__text";
    intro.textContent = "Help Lena fill out the hotel registration form (Meldezettel) using her details.";
    panel.appendChild(intro);

    const controlsTitle = document.createElement("p");
    controlsTitle.className = "meldezettel-tutorial__controls-title";
    controlsTitle.textContent = "Controls:";
    panel.appendChild(controlsTitle);

    const controls = document.createElement("ul");
    controls.className = "meldezettel-tutorial__list";
    [
      "Click on a card from the 'Available Information' pool at the bottom to select it.",
      "Click on the correct empty field in the form above to place it.",
      "Click a placed card inside the form if you want to remove it.",
      "Click 'Formular abgeben' when you are done!",
    ].forEach((itemText) => {
      const item = document.createElement("li");
      item.textContent = itemText;
      controls.appendChild(item);
    });
    panel.appendChild(controls);

    tutorial.appendChild(panel);
    els.meldezettelOverlay.appendChild(tutorial);
  }

  // ── Ticketautomat mini-game ───────────────────────────────────────────────

  function ticketMachineControlsEnabled() {
    return ticketMachine.active && !ticketMachine.helpOpen && !ticketMachine.errorOpen;
  }

  function showTicketMachineHint() {
    if (!ticketMachine.active || !els.ticketMachineHintOverlay) return;
    ticketMachine.helpOpen = true;
    if (els.ticketMachineHintText) {
      els.ticketMachineHintText.textContent = TICKET_MACHINE_HELP_TEXT;
    }
    els.ticketMachineHintOverlay.hidden = false;
  }

  function closeTicketMachineHint() {
    if (!els.ticketMachineHintOverlay) return;
    ticketMachine.helpOpen = false;
    els.ticketMachineHintOverlay.hidden = true;
  }

  function showTicketMachineError(message) {
    ticketMachine.mistakes += 1;
    ticketMachine.errorOpen = true;
    ticketMachine.step = "feedback";
    ticketMachine.message = message;
    ticketMachine.messageType = "error";
    if (els.ticketMachineErrorText) {
      els.ticketMachineErrorText.textContent = message;
    }
    if (els.ticketMachineErrorOverlay) {
      els.ticketMachineErrorOverlay.hidden = false;
    }
    renderTicketMachine();
  }

  function dismissTicketMachineError() {
    if (!ticketMachine.errorOpen) return;
    ticketMachine.errorOpen = false;
    ticketMachine.step = "type";
    ticketMachine.message = "";
    ticketMachine.messageType = "info";
    if (els.ticketMachineErrorOverlay) {
      els.ticketMachineErrorOverlay.hidden = true;
    }
    renderTicketMachine();
  }

  function renderTicketMachine() {
    if (!els.ticketMachineTypes || !els.ticketMachineCategories || !els.ticketMachineQuantities) return;

    els.ticketMachineTypes.innerHTML = "";
    TICKET_TYPES.forEach((type) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ticket-machine__option";
      btn.textContent = type;
      btn.addEventListener("click", () => handleTicketType(type));
      els.ticketMachineTypes.appendChild(btn);
    });

    els.ticketMachineCategories.innerHTML = "";
    TICKET_CATEGORIES.forEach((category) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ticket-machine__option";
      btn.textContent = category;
      btn.addEventListener("click", () => handleTicketCategory(category));
      els.ticketMachineCategories.appendChild(btn);
    });

    els.ticketMachineQuantities.innerHTML = "";
    TICKET_QUANTITIES.forEach((quantity) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ticket-machine__option";
      btn.textContent = quantity;
      btn.addEventListener("click", () => handleTicketQuantity(quantity));
      els.ticketMachineQuantities.appendChild(btn);
    });

    els.ticketMachineMessage.textContent = ticketMachine.message || "";
    els.ticketMachineMessage.classList.remove("is-error", "is-success");
    if (ticketMachine.messageType === "success") els.ticketMachineMessage.classList.add("is-success");

    const showSteps = !ticketMachine.errorOpen;
    els.ticketMachineStepType.hidden = !showSteps || ticketMachine.step !== "type";
    els.ticketMachineStepCategory.hidden = !showSteps || ticketMachine.step !== "category";
    els.ticketMachineStepQuantity.hidden = !showSteps || ticketMachine.step !== "quantity";
    els.ticketMachineStepPayment.hidden = !showSteps || ticketMachine.step !== "payment";
    els.ticketMachineStepValidate.hidden = !showSteps || ticketMachine.step !== "validate";
    els.ticketMachineBuyBtn.textContent =
      ticketMachine.quantity === 3 ? "Jetzt bezahlen (€ 7,20)" : "Jetzt bezahlen (€ 2,40)";
  }

  function resetTicketMachineToType(errorMessage) {
    showTicketMachineError(errorMessage);
  }

  function handleTicketType(type) {
    if (!ticketMachineControlsEnabled()) return;
    if (type !== TICKET_GOAL.type) {
      const message =
        type === "24-Stunden-Karte (€ 8,00)"
          ? "Wait, €8.00 is more expensive than buying single tickets for just 3 rides! Let me recalculate."
          : "I only need three trips today. This ticket would cost much more than individual single tickets.";
      resetTicketMachineToType(message);
      return;
    }

    ticketMachine.step = "category";
    ticketMachine.message = "";
    ticketMachine.messageType = "info";
    renderTicketMachine();
  }

  function handleTicketCategory(category) {
    if (!ticketMachineControlsEnabled()) return;
    if (category !== TICKET_GOAL.category) {
      const message =
        category === "Ermäßigt (Schüler/Studenten mit AT-Ausweis)"
          ? "I don't have an Austrian student ID, the ticket inspector would fine me!"
          : "That discount is only for children or seniors. I need the standard adult fare.";
      resetTicketMachineToType(message);
      return;
    }

    ticketMachine.step = "quantity";
    ticketMachine.message = "";
    ticketMachine.messageType = "info";
    renderTicketMachine();
  }

  function handleTicketQuantity(quantity) {
    if (!ticketMachineControlsEnabled()) return;
    if (quantity === "5 Tickets") {
      resetTicketMachineToType("Five tickets are more than I need today. I should only buy what I will use.");
      return;
    }

    ticketMachine.quantity = quantity === "3 Tickets" ? 3 : 1;
    ticketMachine.step = "payment";
    ticketMachine.message = "";
    ticketMachine.messageType = "info";
    renderTicketMachine();
  }

  function handleTicketPurchase() {
    if (!ticketMachineControlsEnabled()) return;
    ticketMachine.step = "validate";
    ticketMachine.message = "Ticket purchased!";
    ticketMachine.messageType = "success";
    renderTicketMachine();
  }

  function handleTicketValidate() {
    if (!ticketMachineControlsEnabled()) return;
    completeTicketMachine(ticketMachine.mistakes);
  }

  function completeTicketMachine(mistakeCount) {
    ticketMachine.mistakes = mistakeCount;
    const completedSuccessfully = ticketMachine.mistakes < TICKET_MACHINE_MISTAKE_THRESHOLD;
    if (!completedSuccessfully) {
      gameState.ch3Strikes += 1;
    }

    const nextNodeId = completedSuccessfully
      ? TICKET_MACHINE_SUCCESS_NODE
      : TICKET_MACHINE_FAIL_NODE;
    closeTicketMachine();
    goToNode(nextNodeId);
  }

  function skipTicketMachineForDev(mistakeCount) {
    if (!ticketMachine.active) return;
    ticketMachine.helpOpen = false;
    ticketMachine.errorOpen = false;
    if (els.ticketMachineErrorOverlay) els.ticketMachineErrorOverlay.hidden = true;
    completeTicketMachine(mistakeCount);
  }

  function openTicketMachine(onCompleteNodeId) {
    ticketMachine.active = true;
    ticketMachine.step = "type";
    ticketMachine.quantity = 1;
    ticketMachine.mistakes = 0;
    ticketMachine.message = "";
    ticketMachine.messageType = "info";
    ticketMachine.onCompleteNodeId = onCompleteNodeId;
    ticketMachine.helpOpen = false;
    ticketMachine.errorOpen = false;

    clearTypeTimer();
    state.typing = false;
    hideChoices();
    removeBlackScreen();
    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");
    els.ticketMachineOverlay.hidden = false;
    closeTicketMachineHint();
    if (els.ticketMachineErrorOverlay) els.ticketMachineErrorOverlay.hidden = true;

    renderTicketMachine();
  }

  function closeTicketMachine() {
    ticketMachine.active = false;
    closeTicketMachineHint();
    ticketMachine.errorOpen = false;
    if (els.ticketMachineErrorOverlay) els.ticketMachineErrorOverlay.hidden = true;
    if (els.ticketMachineOverlay) els.ticketMachineOverlay.hidden = true;
  }

  function initTicketMachineInteractions() {
    if (!els.ticketMachineBuyBtn) return;
    els.ticketMachineBuyBtn.addEventListener("click", handleTicketPurchase);
    els.ticketMachineEntwerterBtn.addEventListener("click", handleTicketValidate);
    els.ticketMachineHintBtn?.addEventListener("click", showTicketMachineHint);
    els.ticketMachineHintCloseBtn?.addEventListener("click", closeTicketMachineHint);
    els.ticketMachineHintOverlay?.addEventListener("click", (event) => {
      if (event.target === els.ticketMachineHintOverlay) closeTicketMachineHint();
    });
    els.ticketMachineErrorContinueBtn?.addEventListener("click", dismissTicketMachineError);
    els.ticketMachineDevSuccessBtn?.addEventListener("click", () => skipTicketMachineForDev(0));
    els.ticketMachineDevFailBtn?.addEventListener("click", () => skipTicketMachineForDev(3));
  }

  // ── Church rules matching mini-game ──────────────────────────────────────

  const rulesGame = {
    active: false,
    selectedRuleId: null,
    matchedCount: 0,
    mistakes: 0,
  };

  function closeRulesGame() {
    rulesGame.active = false;
    document.getElementById("rules-game")?.remove();
  }

  function updateRulesGameStatus() {
    const progress = document.getElementById("rules-game-progress");
    const counter = document.getElementById("rules-game-mistakes");

    if (progress) {
      progress.textContent =
        rulesGame.matchedCount === CHURCH_RULES_PAIRS.length
          ? "Alle Regeln zugeordnet! (All rules matched!)"
          : `Zugeordnet: ${rulesGame.matchedCount} / ${CHURCH_RULES_PAIRS.length}`;
    }

    updateMistakeCounter(counter, rulesGame.mistakes, RULES_GAME_MISTAKE_THRESHOLD);
  }

  function finishRulesGame() {
    const mistakes = rulesGame.mistakes;
    closeRulesGame();

    let outcomeNodeId = "ch4_rules_perfect";
    if (mistakes >= RULES_GAME_MISTAKE_THRESHOLD) {
      gameState.ch4Strikes += 1;
      outcomeNodeId = "ch4_rules_fail";
    } else if (mistakes > 0) {
      outcomeNodeId = "ch4_rules_ok";
    }

    goToNode(outcomeNodeId);
  }

  function handleRulesMeaningClick(meaningBtn, overlay) {
    if (meaningBtn.classList.contains("is-matched")) return;

    const selectedRuleBtn = overlay.querySelector(".rules-game__item--rule.is-selected");
    if (!selectedRuleBtn) {
      const instruction = overlay.querySelector(".rules-game__instruction");
      instruction.classList.remove("is-nudge");
      void instruction.offsetWidth;
      instruction.classList.add("is-nudge");
      return;
    }

    if (meaningBtn.dataset.ruleId === selectedRuleBtn.dataset.ruleId) {
      selectedRuleBtn.classList.remove("is-selected");
      selectedRuleBtn.classList.add("is-matched");
      selectedRuleBtn.disabled = true;
      meaningBtn.classList.add("is-matched");
      meaningBtn.disabled = true;
      rulesGame.selectedRuleId = null;
      rulesGame.matchedCount += 1;
      updateRulesGameStatus();

      if (rulesGame.matchedCount === CHURCH_RULES_PAIRS.length) {
        window.setTimeout(finishRulesGame, 900);
      }
    } else {
      rulesGame.mistakes += 1;
      updateRulesGameStatus();
      meaningBtn.classList.remove("is-wrong");
      void meaningBtn.offsetWidth;
      meaningBtn.classList.add("is-wrong");
      window.setTimeout(() => meaningBtn.classList.remove("is-wrong"), 450);
    }
  }

  function openRulesGame() {
    closeRulesGame();
    rulesGame.active = true;
    rulesGame.selectedRuleId = null;
    rulesGame.matchedCount = 0;
    rulesGame.mistakes = 0;

    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    const overlay = document.createElement("div");
    overlay.id = "rules-game";
    overlay.className = "rules-game";

    const panel = document.createElement("section");
    panel.className = "rules-game__panel";
    panel.setAttribute("aria-labelledby", "rules-game-title");
    panel.setAttribute("aria-describedby", "rules-game-instruction");

    const eyebrow = document.createElement("p");
    eyebrow.className = "rules-game__eyebrow";
    eyebrow.textContent = "Stephansdom · Eingang";
    panel.appendChild(eyebrow);

    const title = document.createElement("h2");
    title.id = "rules-game-title";
    title.className = "rules-game__title";
    title.textContent = "Information für Besucher";
    panel.appendChild(title);

    const instruction = document.createElement("p");
    instruction.id = "rules-game-instruction";
    instruction.className = "rules-game__instruction";
    instruction.textContent = "Choose a German rule, then choose its English meaning.";
    panel.appendChild(instruction);

    const columns = document.createElement("div");
    columns.className = "rules-game__columns";

    const rulesColumn = document.createElement("div");
    rulesColumn.className = "rules-game__column";
    const rulesHeading = document.createElement("h3");
    rulesHeading.className = "rules-game__column-title";
    rulesHeading.textContent = "Deutsch";
    rulesColumn.appendChild(rulesHeading);
    CHURCH_RULES_PAIRS.forEach((pair, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rules-game__item rules-game__item--rule";
      btn.dataset.ruleId = pair.id;
      btn.setAttribute("aria-pressed", "false");
      btn.innerHTML = `<span class="rules-game__num">${index + 1}</span>${pair.german}`;
      btn.addEventListener("click", () => {
        if (btn.classList.contains("is-matched")) return;
        rulesColumn.querySelectorAll(".is-selected").forEach((el) => {
          el.classList.remove("is-selected");
          el.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-selected");
        btn.setAttribute("aria-pressed", "true");
        rulesGame.selectedRuleId = pair.id;
      });
      rulesColumn.appendChild(btn);
    });
    columns.appendChild(rulesColumn);

    const meaningsColumn = document.createElement("div");
    meaningsColumn.className = "rules-game__column";
    const meaningsHeading = document.createElement("h3");
    meaningsHeading.className = "rules-game__column-title";
    meaningsHeading.textContent = "English";
    meaningsColumn.appendChild(meaningsHeading);
    shuffleArray(CHURCH_RULES_PAIRS).forEach((pair) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rules-game__item rules-game__item--meaning";
      btn.dataset.ruleId = pair.id;
      btn.textContent = pair.english;
      btn.addEventListener("click", () => handleRulesMeaningClick(btn, overlay));
      meaningsColumn.appendChild(btn);
    });
    columns.appendChild(meaningsColumn);

    panel.appendChild(columns);

    const footerStatus = document.createElement("div");
    footerStatus.className = "rules-game__footer-status";

    const progress = document.createElement("p");
    progress.id = "rules-game-progress";
    progress.className = "rules-game__status";
    progress.setAttribute("role", "status");
    progress.setAttribute("aria-live", "polite");
    footerStatus.appendChild(progress);

    const counter = document.createElement("p");
    counter.id = "rules-game-mistakes";
    counter.className = "mistake-counter";
    counter.setAttribute("role", "status");
    counter.setAttribute("aria-live", "polite");
    footerStatus.appendChild(counter);

    panel.appendChild(footerStatus);

    const devControls = document.createElement("div");
    devControls.className = "rules-game__dev-controls";
    devControls.setAttribute("aria-label", "Development shortcuts");

    const devSuccessBtn = document.createElement("button");
    devSuccessBtn.type = "button";
    devSuccessBtn.textContent = "DEV: Skip Success";
    devSuccessBtn.addEventListener("click", () => {
      rulesGame.mistakes = 0;
      finishRulesGame();
    });
    devControls.appendChild(devSuccessBtn);

    const devFailBtn = document.createElement("button");
    devFailBtn.type = "button";
    devFailBtn.textContent = "DEV: Skip Fail";
    devFailBtn.addEventListener("click", () => {
      rulesGame.mistakes = RULES_GAME_MISTAKE_THRESHOLD;
      finishRulesGame();
    });
    devControls.appendChild(devFailBtn);

    panel.appendChild(devControls);

    overlay.appendChild(panel);
    els.game.appendChild(overlay);
    updateRulesGameStatus();
  }

  // ── Supermarket aisle finder mini-game ───────────────────────────────────

  const aisleGame = {
    active: false,
    taskIndex: 0,
    locked: false,
  };

  function closeAisleGame() {
    aisleGame.active = false;
    aisleGame.locked = false;
    document.getElementById("aisle-game")?.remove();
  }

  function finishAisleGame() {
    closeAisleGame();
    goToNode(AISLE_GAME_SUCCESS_NODE);
  }

  function updateAisleGamePrompt(overlay) {
    const task = AISLE_TASKS[aisleGame.taskIndex];
    const prompt = overlay.querySelector("#aisle-game-prompt");
    const progress = overlay.querySelector("#aisle-game-progress");
    const feedback = overlay.querySelector("#aisle-game-feedback");

    if (prompt) prompt.textContent = task.prompt;
    if (progress) {
      progress.textContent = `Item ${aisleGame.taskIndex + 1} / ${AISLE_TASKS.length}`;
    }
    if (feedback) {
      feedback.textContent = "";
      feedback.className = "aisle-game__feedback";
    }

    overlay.querySelectorAll(".aisle-game__aisle").forEach((btn) => {
      btn.classList.remove("is-correct", "is-wrong", "is-done");
      btn.disabled = false;
    });
  }

  function handleAisleClick(aisleId, aisleBtn, overlay) {
    if (!aisleGame.active || aisleGame.locked) return;

    const task = AISLE_TASKS[aisleGame.taskIndex];
    const feedback = overlay.querySelector("#aisle-game-feedback");

    if (aisleId === task.correctId) {
      aisleGame.locked = true;
      aisleBtn.classList.add("is-correct");
      if (feedback) {
        feedback.textContent = task.successText;
        feedback.className = "aisle-game__feedback aisle-game__feedback--success";
      }

      window.setTimeout(() => {
        aisleGame.taskIndex += 1;
        aisleGame.locked = false;

        if (aisleGame.taskIndex >= AISLE_TASKS.length) {
          finishAisleGame();
          return;
        }

        updateAisleGamePrompt(overlay);
      }, 900);
      return;
    }

    aisleBtn.classList.remove("is-wrong");
    void aisleBtn.offsetWidth;
    aisleBtn.classList.add("is-wrong");
    if (feedback) {
      feedback.textContent = `Hmm, that's not where you find ${task.hintItem}. Try again!`;
      feedback.className = "aisle-game__feedback aisle-game__feedback--hint";
    }
    window.setTimeout(() => aisleBtn.classList.remove("is-wrong"), 450);
  }

  function openAisleGame() {
    closeAisleGame();
    aisleGame.active = true;
    aisleGame.taskIndex = 0;
    aisleGame.locked = false;

    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    const overlay = document.createElement("div");
    overlay.id = "aisle-game";
    overlay.className = "aisle-game";

    const panel = document.createElement("section");
    panel.className = "aisle-game__panel";
    panel.setAttribute("aria-labelledby", "aisle-game-title");

    const eyebrow = document.createElement("p");
    eyebrow.className = "aisle-game__eyebrow";
    eyebrow.textContent = "Billa · Wien";
    panel.appendChild(eyebrow);

    const title = document.createElement("h2");
    title.id = "aisle-game-title";
    title.className = "aisle-game__title";
    title.textContent = "Die Regale — Find the right aisle";
    panel.appendChild(title);

    const progress = document.createElement("p");
    progress.id = "aisle-game-progress";
    progress.className = "aisle-game__progress";
    panel.appendChild(progress);

    const thought = document.createElement("div");
    thought.className = "aisle-game__thought";
    thought.setAttribute("aria-live", "polite");

    const thoughtLabel = document.createElement("p");
    thoughtLabel.className = "aisle-game__thought-label";
    thoughtLabel.textContent = "Lena's thought";
    thought.appendChild(thoughtLabel);

    const prompt = document.createElement("p");
    prompt.id = "aisle-game-prompt";
    prompt.className = "aisle-game__prompt";
    thought.appendChild(prompt);
    panel.appendChild(thought);

    const map = document.createElement("div");
    map.className = "aisle-game__map";
    map.setAttribute("role", "group");
    map.setAttribute("aria-label", "Supermarket aisle map");

    SUPERMARKET_AISLES.forEach((aisle) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "aisle-game__aisle";
      btn.dataset.aisleId = aisle.id;
      btn.innerHTML = `
        <span class="aisle-game__icon" aria-hidden="true">${aisle.icon}</span>
        <span class="aisle-game__name">${aisle.german}</span>
        <span class="aisle-game__sub">${aisle.english}</span>
      `;
      btn.addEventListener("click", () => handleAisleClick(aisle.id, btn, overlay));
      map.appendChild(btn);
    });
    panel.appendChild(map);

    const feedback = document.createElement("p");
    feedback.id = "aisle-game-feedback";
    feedback.className = "aisle-game__feedback";
    feedback.setAttribute("aria-live", "polite");
    panel.appendChild(feedback);

    const devControls = document.createElement("div");
    devControls.className = "aisle-game__dev-controls";
    const devSkip = document.createElement("button");
    devSkip.type = "button";
    devSkip.textContent = "DEV: Skip";
    devSkip.addEventListener("click", finishAisleGame);
    devControls.appendChild(devSkip);
    panel.appendChild(devControls);

    overlay.appendChild(panel);
    els.game.appendChild(overlay);
    updateAisleGamePrompt(overlay);
  }

  // ── Cashier dialogue mini-game ───────────────────────────────────────────

  const cashierGame = {
    active: false,
    resolved: false,
  };

  function closeCashierGame() {
    cashierGame.active = false;
    cashierGame.resolved = false;
    document.getElementById("cashier-game")?.remove();
  }

  function finishCashierGame() {
    closeCashierGame();
    goToNode(CASHIER_GAME_SUCCESS_NODE);
  }

  function showCashierSuccess(overlay) {
    cashierGame.resolved = true;

    const dialogue = overlay.querySelector("#cashier-game-dialogue");
    const options = overlay.querySelector("#cashier-game-options");
    const feedback = overlay.querySelector("#cashier-game-feedback");
    const continueBtn = overlay.querySelector("#cashier-game-continue");

    if (dialogue) {
      dialogue.textContent =
        "Vielen Dank! Hier sind 1 Euro 50 zurück. Einen schönen Abend noch!";
    }
    if (feedback) {
      feedback.textContent = "The cashier smiles warmly.";
      feedback.className = "cashier-game__feedback cashier-game__feedback--success";
    }
    if (options) options.hidden = true;
    if (continueBtn) continueBtn.hidden = false;
  }

  function handleCashierOption(option, optionBtn, overlay) {
    if (!cashierGame.active || cashierGame.resolved) return;

    if (option.correct) {
      overlay.querySelectorAll(".cashier-game__option").forEach((btn) => {
        btn.disabled = true;
        if (btn === optionBtn) btn.classList.add("is-correct");
      });
      showCashierSuccess(overlay);
      return;
    }

    gameState.ch5Strikes += 1;
    optionBtn.classList.remove("is-wrong");
    void optionBtn.offsetWidth;
    optionBtn.classList.add("is-wrong");

    const feedback = overlay.querySelector("#cashier-game-feedback");
    if (feedback) {
      feedback.textContent =
        "Hmm, that doesn't fit at the cashier. Try a payment phrase!";
      feedback.className = "cashier-game__feedback cashier-game__feedback--hint";
    }

    window.setTimeout(() => optionBtn.classList.remove("is-wrong"), 450);
  }

  function openCashierGame() {
    closeCashierGame();
    cashierGame.active = true;
    cashierGame.resolved = false;

    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    const overlay = document.createElement("div");
    overlay.id = "cashier-game";
    overlay.className = "cashier-game";

    const panel = document.createElement("section");
    panel.className = "cashier-game__panel";
    panel.setAttribute("aria-labelledby", "cashier-game-title");

    const eyebrow = document.createElement("p");
    eyebrow.className = "cashier-game__eyebrow";
    eyebrow.textContent = "An der Kasse";
    panel.appendChild(eyebrow);

    const title = document.createElement("h2");
    title.id = "cashier-game-title";
    title.className = "cashier-game__title";
    title.textContent = "Pay at the cashier";
    panel.appendChild(title);

    const register = document.createElement("div");
    register.className = "cashier-game__register";
    register.innerHTML = `
      <div class="cashier-game__cashier-avatar" aria-hidden="true"></div>
      <div class="cashier-game__register-screen">
        <p class="cashier-game__total-label">Summe</p>
        <p class="cashier-game__total">€ 8,50</p>
      </div>
    `;
    panel.appendChild(register);

    const speaker = document.createElement("p");
    speaker.className = "cashier-game__speaker";
    speaker.textContent = "Kassiererin";
    panel.appendChild(speaker);

    const dialogue = document.createElement("p");
    dialogue.id = "cashier-game-dialogue";
    dialogue.className = "cashier-game__dialogue";
    dialogue.textContent = "Guten Tag! Das macht zusammen 8 Euro 50, bitte.";
    panel.appendChild(dialogue);

    const feedback = document.createElement("p");
    feedback.id = "cashier-game-feedback";
    feedback.className = "cashier-game__feedback";
    feedback.setAttribute("aria-live", "polite");
    panel.appendChild(feedback);

    const options = document.createElement("div");
    options.id = "cashier-game-options";
    options.className = "cashier-game__options";

    CASHIER_OPTIONS.forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cashier-game__option";
      btn.innerHTML = `
        <span class="cashier-game__option-de">${option.german}</span>
        <span class="cashier-game__option-en">${option.english}</span>
      `;
      btn.addEventListener("click", () => handleCashierOption(option, btn, overlay));
      options.appendChild(btn);
    });
    panel.appendChild(options);

    const continueBtn = document.createElement("button");
    continueBtn.type = "button";
    continueBtn.id = "cashier-game-continue";
    continueBtn.className = "cashier-game__continue";
    continueBtn.textContent = "Continue";
    continueBtn.hidden = true;
    continueBtn.addEventListener("click", finishCashierGame);
    panel.appendChild(continueBtn);

    const devControls = document.createElement("div");
    devControls.className = "cashier-game__dev-controls";
    const devSkip = document.createElement("button");
    devSkip.type = "button";
    devSkip.textContent = "DEV: Skip";
    devSkip.addEventListener("click", finishCashierGame);
    devControls.appendChild(devSkip);
    panel.appendChild(devControls);

    overlay.appendChild(panel);
    els.game.appendChild(overlay);
  }

  // ── Journey completion celebration ───────────────────────────────────────

  function removeCelebrationScreen() {
    document.getElementById("celebration-screen")?.remove();
  }

  function showCelebrationScreen() {
    clearTypeTimer();
    state.typing = false;
    hideChoices();
    removeBlackScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeAisleGame();
    closeCashierGame();
    removeTagebuchScreen();
    removeCelebrationScreen();

    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    const totalStrikes = getTotalJourneyStrikes();
    const isExpert = totalStrikes <= 2;

    const overlay = document.createElement("div");
    overlay.id = "celebration-screen";
    overlay.className = "celebration-screen";

    const card = document.createElement("article");
    card.className = "celebration-card";

    const title = document.createElement("h2");
    title.className = "celebration-card__title";
    title.textContent = "Herzlichen Glückwunsch! Journey Complete!";
    card.appendChild(title);

    const badge = document.createElement("p");
    badge.className = "celebration-card__badge";
    badge.textContent = isExpert
      ? "🏆 Wien-Profi (Vienna Expert)"
      : "🥉 Mutige Entdeckerin (Brave Explorer)";
    card.appendChild(badge);

    const summary = document.createElement("p");
    summary.className = "celebration-card__summary";
    summary.textContent = isExpert
      ? "You navigated Vienna with confidence — outstanding work!"
      : "You kept going even when it was tricky — that takes real courage!";
    card.appendChild(summary);

    const actions = document.createElement("div");
    actions.className = "celebration-card__actions";

    const vocabBtn = document.createElement("button");
    vocabBtn.type = "button";
    vocabBtn.className = "celebration-card__btn";
    vocabBtn.textContent = "Practice Vocabulary";
    vocabBtn.addEventListener("click", () => {
      removeCelebrationScreen();
      showStartMainActions();
      els.startMenu.hidden = false;
      openVokabeltrainer();
    });
    actions.appendChild(vocabBtn);

    const menuBtn = document.createElement("button");
    menuBtn.type = "button";
    menuBtn.className = "celebration-card__btn celebration-card__btn--secondary";
    menuBtn.textContent = "Main Menu";
    menuBtn.addEventListener("click", () => {
      removeCelebrationScreen();
      returnToStartMenu();
    });
    actions.appendChild(menuBtn);

    card.appendChild(actions);
    overlay.appendChild(card);
    els.game.appendChild(overlay);
  }

  // ── Core render ──────────────────────────────────────────────────────────

  function renderNode() {
    const node = getNode();
    if (!node) return;

    if (BLACK_SCREEN_NODE_IDS.has(node.id)) {
      showBlackScreen(node);
      return;
    }

    if (node.id === MELDEZETTEL_TRIGGER_NODE) {
      openMeldezettelGame(MELDEZETTEL_SUCCESS_NODE);
      return;
    }

    if (node.id === TICKET_MACHINE_TRIGGER_NODE) {
      openTicketMachine(TICKET_MACHINE_NEXT_NODE);
      return;
    }

    if (node.id === RULES_GAME_TRIGGER_NODE) {
      removeBlackScreen();
      removeJumpScareFlash();
      setBackground(node.background);
      openRulesGame();
      return;
    }

    if (node.id === AISLE_GAME_TRIGGER_NODE) {
      removeBlackScreen();
      setBackground(node.background);
      openAisleGame();
      return;
    }

    if (node.id === CASHIER_GAME_TRIGGER_NODE) {
      removeBlackScreen();
      setBackground(node.background);
      openCashierGame();
      return;
    }

    if (JUMP_SCARE_NODE_IDS.has(node.id) || node.effect === "jumpScare") {
      renderJumpScareNode(node);
      return;
    }

    // Make sure any leftover overlay from a previous visit is gone.
    removeBlackScreen();
    removeJumpScareFlash();
    els.npcContainer.classList.remove("is-jumpscare-pop");
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeAisleGame();
    closeCashierGame();
    removeCelebrationScreen();

    setBackground(node.background);
    updateCharacters(node);
    renderDialogue(node);

    if (node.highlightVocab) {
      pulseVocabButton();
    } else {
      stopVocabButtonPulse();
    }
  }

  function advanceBeat() {
    const node = getNode();
    if (!node) return;

    if (state.typing) {
      finishTyping();
      return;
    }

    if (state.pendingFollowUp) {
      const { sourceNodeId, followUp } = state.pendingFollowUp;
      state.pendingFollowUp = null;
      els.advanceHint.classList.add("is-hidden");
      renderFollowUpDialogue(sourceNodeId, followUp);
      return;
    }

    if (state.pendingReplayChoicesFrom) {
      const replaySourceNodeId = state.pendingReplayChoicesFrom;
      state.pendingReplayChoicesFrom = null;
      els.advanceHint.classList.add("is-hidden");
      showChoices(storyData[replaySourceNodeId]?.choices || []);
      return;
    }

    if (state.waitingForChoice) return;

    els.advanceHint.classList.add("is-hidden");
  }

  function getQuizResultNodeId() {
    const allCorrect =
      gameState.transport === "correct" &&
      gameState.stop === "correct" &&
      gameState.house === "correct";

    gameState.ch1LateArrival = !allCorrect;
    return allCorrect ? "arrival_success" : "arrival_failure";
  }

  function routeToNode(nodeId) {
    if (nodeId === "evaluate_quiz_results") {
      goToNode(getQuizResultNodeId());
      return;
    }

    if (nodeId === "end_chapter_1") {
      showTagebuchScreen(1);
      return;
    }

    if (nodeId === "end_chapter_2") {
      showTagebuchScreen(2);
      return;
    }

    if (nodeId === "end_chapter_3") {
      showTagebuchScreen(3);
      return;
    }

    if (nodeId === "end_chapter_4") {
      showTagebuchScreen(4);
      return;
    }

    if (nodeId === "end_chapter_5") {
      showTagebuchScreen(5);
      return;
    }

    if (nodeId === "end_chapter_6") {
      showTagebuchScreen(6);
      return;
    }

    if (nodeId === "journey_complete") {
      showCelebrationScreen();
      return;
    }

    if (nodeId === "main_menu") {
      removeBlackScreen();
      removeJumpScareFlash();
      closeMeldezettelGame();
      closeTicketMachine();
      closeRulesGame();
      closeAisleGame();
      closeCashierGame();
      removeCelebrationScreen();
      removeTagebuchScreen();
      resetGameState();
      showStartMainActions();
      els.startMenu.hidden = false;
      els.dialogueBox.hidden = true;
      els.npcContainer.style.display = "none";
      els.npcContainer.classList.add("is-hidden");
      els.lenaContainer.classList.add("is-hidden");
      return;
    }

    goToNode(nodeId);
  }

  function goToNode(nodeId) {
    if (!storyData[nodeId]) {
      console.warn("Unknown node:", nodeId);
      return;
    }

    state.nodeId = nodeId;
    state.activeFollowUp = null;
    state.followUpShownForNode = null;
    state.pendingFollowUp = null;
    state.pendingReplayChoicesFrom = null;
    hideChoices();
    renderNode();
  }

  function recordAnswer(choiceText, nextNodeId) {
    const currentNode = state.nodeId;

    if (currentNode === "start_see_man" && (nextNodeId === "wrong_rude" || nextNodeId === "wrong_grammar")) {
      gameState.ch1StationFailed = true;
    } else if (
      (currentNode === "ch2_reception_greet" && nextNodeId !== "ch2_reception_id") ||
      (currentNode === "ch2_reception_id" && nextNodeId !== "ch2_id_correct")
    ) {
      gameState.receptionistMistake = true;
    } else if (currentNode === "start_quiz_transport") {
      gameState.transport = choiceText === "Mit der U-Bahn U3" ? "correct" : "wrong";
    } else if (
      currentNode === "quiz_stop_correct_transport" ||
      currentNode === "quiz_stop_wrong_transport"
    ) {
      gameState.stop = choiceText === "Station 'Neubaugasse'" ? "correct" : "wrong";
    } else if (currentNode.startsWith("quiz_house")) {
      gameState.house = choiceText === "In der Mitte der Straße" ? "correct" : "wrong";
    } else if (currentNode === "ch3_platform_deduction" && nextNodeId !== "ch3_platform_correct") {
      gameState.ch3Strikes += 1;
    } else if (currentNode === "ch3_ubahn_thought" && nextNodeId !== "ch3_ubahn_polite") {
      gameState.ch3Strikes += 1;
    } else if (currentNode === "ch4_mozart_choice" && nextNodeId !== "ch4_mozart_correct") {
      gameState.ch4Strikes += 1;
    }

    console.log("gameState:", JSON.stringify(gameState));
  }

  function selectChoice(choiceText, nextNodeId) {
    recordAnswer(choiceText, nextNodeId);
    hideChoices();
    routeToNode(nextNodeId);
  }

  function hideStartMenu() {
    els.startMenu.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
  }

  function loadSavedProgress() {
    try {
      const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.warn("Unable to read journey progress:", error);
      return {};
    }
  }

  function getChapterSelectState(chapterNumber, progress) {
    const lastCompleted = progress.lastCompletedChapter || 0;
    const isCompleted = Boolean(progress[`chapter${chapterNumber}`]?.completedAt);
    const isUnlocked = chapterNumber === 1 || chapterNumber <= lastCompleted + 1;
    const isActive = isUnlocked && !isCompleted && chapterNumber === lastCompleted + 1;

    if (!isUnlocked) return "locked";
    if (isCompleted) return "completed";
    if (isActive) return "active";
    return "unlocked";
  }

  function refreshChapterSelectUI() {
    const progress = loadSavedProgress();

    els.chapterCards.forEach((card) => {
      const chapterNumber = Number(card.dataset.chapter);
      const state = getChapterSelectState(chapterNumber, progress);

      card.classList.remove("chapter-card--locked", "chapter-card--active", "chapter-card--completed", "chapter-card--unlocked");
      card.classList.add(`chapter-card--${state}`);

      if (state === "locked") {
        card.disabled = true;
        card.setAttribute("aria-disabled", "true");
      } else {
        card.disabled = false;
        card.removeAttribute("aria-disabled");
      }
    });
  }

  function showStartMainActions() {
    els.startMainActions.hidden = false;
    els.startChaptersSelection.hidden = true;
    els.startMenuTitle.hidden = false;
    els.startMenu.classList.remove("start-menu--chapter-select");
  }

  function showStartChaptersSelection() {
    refreshChapterSelectUI();
    els.startMainActions.hidden = true;
    els.startChaptersSelection.hidden = false;
    els.startMenuTitle.hidden = true;
    els.startMenu.classList.add("start-menu--chapter-select");
  }

  const CHAPTER_START_NODES = {
    1: "chapter_1_title",
    2: "chapter_2_teaser",
    3: "chapter_3_title",
    4: "chapter_4_title",
    5: "chapter_5_title",
    6: "chapter_6_title",
  };

  const CHAPTER_LABELS = {
    1: "Chapter 1 - Ankunft",
    2: "Chapter 2 - Check-in",
    3: "Chapter 3 - Unterwegs",
    4: "Chapter 4: Dem Himmel so nah",
    5: "Chapter 5: Im Supermarkt",
    6: "Chapter 6: Epilog",
  };

  function getCurrentChapterNumber() {
    const nodeId = state.nodeId || "";
    if (nodeId.startsWith("ch6_") || nodeId === "chapter_6_title" || nodeId === "end_chapter_6" || nodeId === "journey_complete") {
      return 6;
    }
    if (nodeId.startsWith("ch5_") || nodeId === "chapter_5_title" || nodeId === "end_chapter_5") return 5;
    if (nodeId.startsWith("ch4_") || nodeId === "chapter_4_title" || nodeId === "end_chapter_4") return 4;
    if (nodeId.startsWith("ch3_") || nodeId === "chapter_3_title" || nodeId === "end_chapter_3") return 3;
    if (
      nodeId.startsWith("ch2_") ||
      nodeId === "chapter_2_teaser" ||
      nodeId === "hotel_lobby_arrival" ||
      nodeId === "end_chapter_2"
    ) {
      return 2;
    }
    return 1;
  }

  function restartCurrentChapter() {
    clearTypeTimer();
    state.typing = false;
    closeMenu();
    removeBlackScreen();
    removeJumpScareFlash();
    removeTagebuchScreen();
    removeCelebrationScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeAisleGame();
    closeCashierGame();
    resetGameState();
    hideChoices();

    const chapterNumber = getCurrentChapterNumber();
    const startNodeId = CHAPTER_START_NODES[chapterNumber] || CHAPTER_START_NODES[1];
    els.chapterLabel.textContent = CHAPTER_LABELS[chapterNumber] || CHAPTER_LABELS[1];
    goToNode(startNodeId);
  }

  function startGame() {
    hideStartMenu();
    removeBlackScreen();
    removeTagebuchScreen();
    removeCelebrationScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeAisleGame();
    closeCashierGame();
    resetGameState();
    gameState.hasSeenVokabelTutorial = false;
    state.nodeId = START_NODE;
    els.chapterLabel.textContent = "Chapter 1 - Ankunft";
    hideChoices();
    goToNode(START_NODE);
  }

  function openMenu() {
    els.menuPanel.hidden = false;
    showMainMenuActions();
  }

  function closeMenu() {
    els.menuPanel.hidden = true;
    showMainMenuActions();
  }

  // ── Vocabulary glossary (Vokabelheft) ────────────────────────────────────
  // Purely visual overlay: it never touches game state, so closing it returns
  // the player to exactly where they were.

  function stopVocabButtonPulse() {
    els.vocabBtn?.classList.remove("is-pulsing");
  }

  function pulseVocabButton() {
    if (!els.vocabBtn) return;
    stopVocabButtonPulse();
    void els.vocabBtn.offsetWidth;
    els.vocabBtn.classList.add("is-pulsing");
    window.setTimeout(stopVocabButtonPulse, 4200);
  }

  function populateVocabList(chapterNumber) {
    els.vocabList.innerHTML = "";
    (getVocabularyForChapter(chapterNumber)).forEach((entry) => {
      const item = document.createElement("li");
      item.className = "vocab-panel__item";

      const german = document.createElement("span");
      german.className = "vocab-panel__german";
      german.textContent = entry.german;
      item.appendChild(german);

      const english = document.createElement("span");
      english.className = "vocab-panel__english";
      english.textContent = entry.english;
      item.appendChild(english);

      els.vocabList.appendChild(item);
    });
  }

  function revealVocabList() {
    if (els.vocabTutorial) els.vocabTutorial.hidden = true;
    els.vocabList.hidden = false;
  }

  function dismissVocabTutorial() {
    gameState.hasSeenVokabelTutorial = true;
    revealVocabList();
  }

  function openVocabPanel() {
    stopVocabButtonPulse();
    const chapterNumber = getCurrentChapterNumber();
    els.vocabTitle.textContent = `Vokabelheft — Kapitel ${chapterNumber}`;
    populateVocabList(chapterNumber);

    const showTutorial = !gameState.hasSeenVokabelTutorial;
    if (els.vocabTutorial) els.vocabTutorial.hidden = !showTutorial;
    els.vocabList.hidden = showTutorial;

    els.vocabOverlay.hidden = false;
  }

  function closeVocabPanel() {
    els.vocabOverlay.hidden = true;
  }

  function showMainMenuActions() {
    els.menuMainActions.hidden = false;
  }

  function showStartMenuOnly() {
    els.startMainActions.hidden = true;
    els.startChaptersSelection.hidden = true;
    els.startMenuTitle.hidden = false;
    els.startMenu.classList.remove("start-menu--chapter-select");
  }

  function openOptionsPanel() {
    showStartMenuOnly();
    els.optionsPanel.hidden = false;
  }

  function closeOptionsPanel() {
    els.optionsPanel.hidden = true;
    showStartMainActions();
  }

  // ── Vokabeltrainer (vocabulary practice mode) ────────────────────────────

  const vokabeltrainer = {
    active: false,
    setKey: null,
    queue: [],
    index: 0,
    correctCount: 0,
    locked: false,
    advanceTimer: null,
  };

  function buildTrainerQueue(setKey) {
    if (setKey === "mixed") {
      const mixedSize = 12;
      return shuffleArray(getAllVocabularyEntries()).slice(0, mixedSize);
    }

    const chapter = Number(setKey);
    return shuffleArray(getVocabularyForChapter(chapter));
  }

  function clearTrainerAdvanceTimer() {
    if (vokabeltrainer.advanceTimer) {
      clearTimeout(vokabeltrainer.advanceTimer);
      vokabeltrainer.advanceTimer = null;
    }
  }

  function showTrainerView(viewName) {
    els.vtSelect.hidden = viewName !== "select";
    els.vtQuiz.hidden = viewName !== "quiz";
    els.vtResults.hidden = viewName !== "results";
  }

  function openVokabeltrainer() {
    clearTrainerAdvanceTimer();
    vokabeltrainer.active = true;
    vokabeltrainer.setKey = null;
    vokabeltrainer.queue = [];
    vokabeltrainer.index = 0;
    vokabeltrainer.correctCount = 0;
    vokabeltrainer.locked = false;
    showStartMenuOnly();
    els.optionsPanel.hidden = true;
    els.vokabeltrainer.hidden = false;
    showTrainerView("select");
  }

  function closeVokabeltrainerToMenu() {
    clearTrainerAdvanceTimer();
    vokabeltrainer.active = false;
    vokabeltrainer.locked = false;
    els.vokabeltrainer.hidden = true;
    showStartMainActions();
  }

  function getTrainerDistractors(correctEntry, count) {
    const pool = getAllVocabularyEntries().filter((entry) => entry.english !== correctEntry.english);
    return shuffleArray(pool).slice(0, count).map((entry) => entry.english);
  }

  function renderTrainerQuestion() {
    const total = vokabeltrainer.queue.length;
    const current = vokabeltrainer.queue[vokabeltrainer.index];
    if (!current || !els.vtOptions) return;

    vokabeltrainer.locked = false;
    const questionNumber = vokabeltrainer.index + 1;
    els.vtProgressLabel.textContent = `Question ${questionNumber} / ${total}`;
    els.vtProgressFill.style.width = `${(questionNumber / total) * 100}%`;
    els.vtGermanWord.textContent = current.german;
    els.vtGermanWord.classList.remove("is-pop");
    void els.vtGermanWord.offsetWidth;
    els.vtGermanWord.classList.add("is-pop");

    const options = shuffleArray([current.english, ...getTrainerDistractors(current, 3)]);
    els.vtOptions.innerHTML = "";
    options.forEach((optionText) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "vokabeltrainer__option";
      btn.textContent = optionText;
      btn.addEventListener("click", () => handleTrainerAnswer(btn, optionText === current.english, current.english));
      els.vtOptions.appendChild(btn);
    });
  }

  function startTrainerSession(setKey) {
    clearTrainerAdvanceTimer();
    vokabeltrainer.setKey = setKey;
    vokabeltrainer.queue = buildTrainerQueue(setKey);
    vokabeltrainer.index = 0;
    vokabeltrainer.correctCount = 0;
    vokabeltrainer.locked = false;
    showTrainerView("quiz");
    renderTrainerQuestion();
  }

  function getTrainerEncouragement(correct, total) {
    const ratio = total === 0 ? 0 : correct / total;
    if (ratio >= 1) return "Super! Du bist ein Wien-Profi!";
    if (ratio >= 0.7) return "Sehr gut! Keep practicing and you'll be fluent!";
    return "Gute Arbeit! Übung macht den Meister!";
  }

  function showTrainerResults() {
    const total = vokabeltrainer.queue.length;
    const correct = vokabeltrainer.correctCount;
    els.vtScore.textContent = `${correct} / ${total} Correct!`;
    els.vtMessage.textContent = getTrainerEncouragement(correct, total);
    showTrainerView("results");
  }

  function advanceTrainerQuestion() {
    vokabeltrainer.index += 1;
    if (vokabeltrainer.index >= vokabeltrainer.queue.length) {
      showTrainerResults();
      return;
    }
    renderTrainerQuestion();
  }

  function handleTrainerAnswer(button, isCorrect, correctAnswer) {
    if (vokabeltrainer.locked) return;
    vokabeltrainer.locked = true;

    const optionButtons = Array.from(els.vtOptions.querySelectorAll(".vokabeltrainer__option"));
    optionButtons.forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === correctAnswer) {
        btn.classList.add("is-correct");
      }
    });

    if (isCorrect) {
      vokabeltrainer.correctCount += 1;
      button.classList.add("is-correct", "is-pulse");
      clearTrainerAdvanceTimer();
      vokabeltrainer.advanceTimer = setTimeout(advanceTrainerQuestion, 1000);
    } else {
      button.classList.add("is-incorrect");
      clearTrainerAdvanceTimer();
      vokabeltrainer.advanceTimer = setTimeout(advanceTrainerQuestion, 1500);
    }
  }

  function retryTrainerSession() {
    if (!vokabeltrainer.setKey) {
      showTrainerView("select");
      return;
    }
    startTrainerSession(vokabeltrainer.setKey);
  }

  function returnToStartMenu() {
    clearTypeTimer();
    state.typing = false;
    resetGameState();
    gameState.hasSeenVokabelTutorial = false;
    closeMenu();
    removeBlackScreen();
    removeJumpScareFlash();
    removeTagebuchScreen();
    removeCelebrationScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeAisleGame();
    closeCashierGame();
    clearTrainerAdvanceTimer();
    vokabeltrainer.active = false;
    if (els.vokabeltrainer) els.vokabeltrainer.hidden = true;
    hideChoices();
    showStartMainActions();

    state.nodeId = START_NODE;
    els.chapterLabel.textContent = "Chapter 1 - Ankunft";
    els.dialogueBox.hidden = true;
    els.startMenu.hidden = false;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");
    els.dialogueText.textContent = "";
    els.speakerName.textContent = "";
  }

  function jumpToChapter(nodeId) {
    const targetNodeId = nodeId === "ch2_reception_greet" ? "chapter_2_teaser" : nodeId;

    clearTypeTimer();
    state.typing = false;
    closeMenu();
    els.startMenu.hidden = true;
    showStartMainActions();
    removeBlackScreen();
    removeJumpScareFlash();
    removeTagebuchScreen();
    removeCelebrationScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeAisleGame();
    closeCashierGame();
    hideChoices();
    resetGameState();
    els.dialogueText.textContent = "";
    els.speakerName.textContent = "";

    if (targetNodeId === "chapter_1_title") {
      els.chapterLabel.textContent = CHAPTER_LABELS[1];
    } else if (targetNodeId === "chapter_2_teaser") {
      els.chapterLabel.textContent = CHAPTER_LABELS[2];
    } else if (targetNodeId === "chapter_3_title") {
      els.chapterLabel.textContent = CHAPTER_LABELS[3];
    } else if (targetNodeId === "chapter_4_title") {
      els.chapterLabel.textContent = CHAPTER_LABELS[4];
    } else if (targetNodeId === "chapter_5_title") {
      els.chapterLabel.textContent = CHAPTER_LABELS[5];
    } else if (targetNodeId === "chapter_6_title") {
      els.chapterLabel.textContent = CHAPTER_LABELS[6];
    }

    goToNode(targetNodeId);
  }

  function bindEvents() {
    els.dialogueBox.addEventListener("click", (event) => {
      if (event.target.closest(".choice-btn")) return;
      advanceBeat();
    });

    document.addEventListener("keydown", (event) => {
      if (!els.vokabeltrainer.hidden) {
        if (event.code === "Escape") {
          event.preventDefault();
          closeVokabeltrainerToMenu();
        }
        return;
      }

      if (!els.vocabOverlay.hidden) {
        if (event.code === "Escape") {
          event.preventDefault();
          closeVocabPanel();
        }
        return;
      }

      if (meldezettel.tutorialOpen) {
        event.preventDefault();
        if (event.code === "Escape") closeMeldezettelTutorial();
        return;
      }

      if (ticketMachine.helpOpen) {
        event.preventDefault();
        if (event.code === "Escape") closeTicketMachineHint();
        return;
      }

      if (ticketMachine.errorOpen) {
        event.preventDefault();
        if (event.code === "Enter" || event.code === "Space") dismissTicketMachineError();
        return;
      }

      if (rulesGame.active || aisleGame.active || cashierGame.active) {
        if (event.code === "Escape") {
          els.menuPanel.hidden ? openMenu() : closeMenu();
        }
        return;
      }

      if (document.getElementById("celebration-screen")) {
        if (event.code === "Escape") {
          event.preventDefault();
          removeCelebrationScreen();
          returnToStartMenu();
        }
        return;
      }

      if (event.code === "Space" || event.code === "Enter") {
        const currentNode = getNode();
        const blackScreenOverlay = document.getElementById("black-screen-overlay");
        if (blackScreenOverlay && isChapterTitleNode(currentNode)) {
          event.preventDefault();
          advanceBlackScreenChoice(currentNode.choices?.[0]);
          return;
        }

        if (els.menuPanel.hidden) {
          event.preventDefault();
          advanceBeat();
        }
      }

      if (event.code === "Escape") {
        els.menuPanel.hidden ? openMenu() : closeMenu();
      }
    });

    els.startGameBtn.addEventListener("click", startGame);
    els.startChaptersBtn.addEventListener("click", showStartChaptersSelection);
    els.startChaptersBackBtn.addEventListener("click", showStartMainActions);
    els.chapterCards.forEach((card) => {
      card.addEventListener("click", () => {
        if (card.disabled) return;
        jumpToChapter(card.dataset.chapterNode);
      });
    });

    els.startOptionsBtn.addEventListener("click", openOptionsPanel);
    els.optionsBackBtn.addEventListener("click", closeOptionsPanel);
    els.startVokabeltrainerBtn.addEventListener("click", openVokabeltrainer);
    els.vtBackMenuBtn.addEventListener("click", closeVokabeltrainerToMenu);
    els.vtQuizBackBtn.addEventListener("click", closeVokabeltrainerToMenu);
    els.vtResultsMenuBtn.addEventListener("click", closeVokabeltrainerToMenu);
    els.vtRetryBtn.addEventListener("click", retryTrainerSession);
    els.vtSetButtons.forEach((btn) => {
      btn.addEventListener("click", () => startTrainerSession(btn.dataset.vtSet));
    });

    els.menuBtn.addEventListener("click", openMenu);
    els.closeMenuBtn.addEventListener("click", closeMenu);

    els.vocabBtn.addEventListener("click", openVocabPanel);
    els.vocabCloseBtn.addEventListener("click", closeVocabPanel);
    els.vocabTutorialBtn?.addEventListener("click", dismissVocabTutorial);
    els.vocabOverlay.addEventListener("click", (event) => {
      if (event.target === els.vocabOverlay) closeVocabPanel();
    });
    els.startMenuFromGameBtn.addEventListener("click", returnToStartMenu);

    els.restartBtn.addEventListener("click", () => {
      restartCurrentChapter();
    });

    els.menuPanel.addEventListener("click", (event) => {
      if (event.target === els.menuPanel) closeMenu();
    });
  }

  function init() {
    if (typeof storyData === "undefined") {
      els.dialogueText.textContent = "Error: story data not loaded.";
      return;
    }

    // Show the start menu; the game begins only when the player clicks Start Game.
    bindEvents();
    initMeldezettelInteractions();
    initTicketMachineInteractions();
  }

  init();
})();

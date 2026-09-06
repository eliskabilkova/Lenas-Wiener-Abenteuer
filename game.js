let gameState = {
  transport: null, // will store 'correct' or 'wrong'
  stop: null,      // will store 'correct' or 'wrong'
  house: null,     // will store 'correct' or 'wrong'
  ch1StationFailed: false,
  ch1LateArrival: false,
  ch1Strikes: 0,
  ch1DialogueStrike: false,
  dialogueStrikes: 0,
  ch1NavMistakes: 0,
  navigationMistakes: 0,
  ch1NavStrikeApplied: false,
  receptionistMistake: false,
  dialogueMistakeQ1: false,
  dialogueMistakeQ2: false,
  dialogueStrike: 0,
  meldezettelMistakes: 0,
  meldezettelErrors: 0,
  meldezettelStrike: 0,
  ch3Strikes: 0,
  chapter3Strikes: 0,
  ch4Strikes: 0,
  ch5Strikes: 0,
  chapter5Strikes: 0,
  hasSeenVokabelTutorial: false,
  characters: {
    lena: { mood: "neutral" },
    npc: { character: "elder", mood: "neutral", name: "", visible: false },
  },
};

/**
 * Visual Novel Game Engine
 * Node-based flow powered by storyData.
 */
(function () {
  "use strict";

  const START_NODE = "chapter_1_title";
  const TYPE_SPEED = 24;
  const TOTAL_CHAPTERS = 5;
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
      { german: "wie", english: "how (question word)" },
      { german: "wo", english: "where (location)" },
      { german: "wohin", english: "where to (direction)" },
      { german: "wann", english: "when" },
      { german: "wer", english: "who" },
      { german: "warum", english: "why" },
      { german: "geradeaus", english: "straight ahead" },
      { german: "nach links", english: "to the left" },
      { german: "nach rechts", english: "to the right" },
      { german: "an der Kreuzung", english: "at the intersection" },
      { german: "die U-Bahn-Station", english: "underground / metro station" },
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
      { german: "die Reservierung", english: "reservation" },
      { german: "der Ausweis", english: "ID card" },
      { german: "der Meldezettel", english: "registration form" },
      { german: "Guten Tag", english: "good day / hello (formal)" },
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
    gameState.ch1Strikes = 0;
    gameState.ch1DialogueStrike = false;
    gameState.dialogueStrikes = 0;
    gameState.ch1NavMistakes = 0;
    gameState.navigationMistakes = 0;
    gameState.ch1NavStrikeApplied = false;
    gameState.receptionistMistake = false;
    gameState.dialogueMistakeQ1 = false;
    gameState.dialogueMistakeQ2 = false;
    gameState.dialogueStrike = 0;
    gameState.meldezettelMistakes = 0;
    gameState.meldezettelErrors = 0;
    gameState.meldezettelStrike = 0;
    gameState.ch3Strikes = 0;
    gameState.chapter3Strikes = 0;
    gameState.ch4Strikes = 0;
    gameState.ch5Strikes = 0;
    gameState.chapter5Strikes = 0;
    gameState.characters = {
      lena: { mood: "neutral" },
      npc: { character: "elder", mood: "neutral", name: "", visible: false },
    };
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
    "old_man_confused.png": { visible: true, character: "elder", name: "Viennese Man", mood: "uncertain" },
    "old_man_friendly.png": { visible: true, character: "elder", name: "Viennese Man", mood: "happy" },
    "receptionist_neutral.png": { visible: true, character: "mira", name: "Rezeptionistin", mood: "neutral" },
    "receptionist_confused.png": { visible: true, character: "mira", name: "Rezeptionistin", mood: "uncertain" },
    "commuter_man_neutral.png": { visible: true, character: "elder", name: "Wiener Mann", mood: "neutral" },
    "commuter_man_annoyed.png": { visible: true, character: "elder", name: "Wiener Mann", mood: "neutral" },
    "mozart_seller_neutral.png": { visible: true, character: "mozart_seller", name: "Straßenverkäufer", mood: "neutral" },
    "mozart_seller_pushy.png": { visible: true, character: "mozart_seller", name: "Straßenverkäufer", mood: "pushy" },
    "warden_stern.png": { visible: true, character: "warden", name: "Domaufseher", mood: "stern" },
    "cashier_friendly.png": { visible: true, character: "mira", name: "Kassiererin", mood: "happy" },
  };

  // Sprite-ready mood values written to gameState.characters and data-mood:
  // lena: "neutral" | "happy" | "confident" | "uncertain" | "surprised" | "thoughtful" | "tired" | "exhausted"
  // npc:  "neutral" | "happy" | "uncertain" | "pushy" | "stern" (+ optional node.npcMood override)
  const LENA_MOOD_MAP = {
    normal: "neutral",
    neutral: "neutral",
    happy: "happy",
    confident: "confident",
    unsure: "uncertain",
    uncertain: "uncertain",
    surprised: "surprised",
    thoughtful: "thoughtful",
    tired: "tired",
    exhausted: "exhausted",
    none: "neutral",
  };

  function resolveLenaMood(node) {
    return LENA_MOOD_MAP[node?.lenaMood] || "neutral";
  }

  function resolveNpc(node) {
    const npc = { ...(NPC_MAP[node?.npcImage] || NPC_MAP.none) };
    if (node?.npcMood) {
      npc.mood = LENA_MOOD_MAP[node.npcMood] || node.npcMood;
    }
    return npc;
  }

  const JUMP_SCARE_NODE_IDS = new Set(["ch4_mozart_surprise"]);

  const REPLAY_CHOICES_FROM_NODE = {
    wrong_rude: "start_see_man",
    wrong_grammar: "start_see_man",
    ch2_greet_wrong_rude: "ch2_reception_greet",
    ch2_greet_wrong_grammar: "ch2_reception_greet",
    ch2_id_wrong_phone: "ch2_reception_id",
    ch2_id_wrong_name: "ch2_reception_id",
  };

  const CH1_PPP_TRIGGER_NODE = "ch1_ppp_practice";
  const CH2_PPP_TRIGGER_NODE = "ch2_ppp_practice";
  const CH3_PPP_TRIGGER_NODE = "ch3_ppp_practice";
  const CH4_PPP_TRIGGER_NODE = "ch4_ppp_practice";
  const CH1_PPP_SUCCESS_NODE = "start_ask_hotel";
  const CH1_REVIEW_ROUTE_NODE = "ch1_review_route";
  const HOTEL_NAV_NODE_IDS = new Set([
    "start_quiz_transport",
    "quiz_stop_correct_transport",
    "quiz_stop_wrong_transport",
    "quiz_house_correct_transport_correct_stop",
    "quiz_house_correct_transport_wrong_stop",
    "quiz_house_wrong_transport_correct_stop",
    "quiz_house_wrong_transport_wrong_stop",
  ]);
  const OLD_MAN_DIRECTIONS =
    "Guten Tag, kein Problem! Gehen Sie zuerst geradeaus zur U-Bahn. Fahren Sie mit der U3 bis Neubaugasse. Das Hotel ist dort direkt gegenüber von der Station, gleich neben dem Café.";
  const VOCAB_UNLOCK_STORAGE_KEY = "lenasWienerAbenteuer.unlockedVocab";

  const CHAPTER1_PPP_VOCAB = [
    { german: "wie", english: "how (question word)" },
    { german: "wo", english: "where (location)" },
    { german: "wohin", english: "where to (direction)" },
    { german: "wann", english: "when" },
    { german: "wer", english: "who" },
    { german: "warum", english: "why" },
    { german: "geradeaus", english: "straight ahead" },
    { german: "nach links", english: "to the left" },
    { german: "nach rechts", english: "to the right" },
    { german: "dort", english: "there" },
    { german: "neben", english: "next to" },
    { german: "gegenüber", english: "opposite / across from" },
    { german: "die U-Bahn-Station", english: "underground / metro station" },
  ];

  const CH1_PPP_WFRAGEN = [
    { id: "wo", german: "Wo", english: "Where" },
    { id: "wohin", german: "Wohin", english: "Where to" },
    { id: "wie", german: "Wie", english: "How" },
    { id: "wann", german: "Wann", english: "When" },
    { id: "wer", german: "Wer", english: "Who" },
    { id: "warum", german: "Warum", english: "Why" },
  ];

  const CH1_PPP_SENTENCES = [
    {
      type: "order",
      prompt: "Excuse me, how do I get to the hotel?",
      tokens: ["Entschuldigung,", "wie", "komme", "ich", "zum", "Hotel?"],
      distractors: ["geht", "du"],
      correct: ["Entschuldigung,", "wie", "komme", "ich", "zum", "Hotel?"],
      wrongRule: "In German questions, the conjugated verb must always be in position 2!",
    },
    {
      type: "order",
      prompt: "Where is the train station?",
      tokens: ["Wo", "ist", "die", "U-Bahn-Station?"],
      distractors: ["Wohin", "komme"],
      correct: ["Wo", "ist", "die", "U-Bahn-Station?"],
      wrongRule: "In German questions, the conjugated verb must always be in position 2!",
    },
    {
      type: "order",
      prompt: "Where is this train going?",
      tokens: ["Wohin", "fährt", "dieser", "Zug?"],
      distractors: ["Wo", "Wie"],
      correct: ["Wohin", "fährt", "dieser", "Zug?"],
      wrongRule: "In German questions, the conjugated verb must always be in position 2!",
    },
    {
      type: "order",
      prompt: "When does the bus arrive?",
      tokens: ["Wann", "kommt", "der", "Bus", "an?"],
      distractors: ["Wer", "Wo"],
      correct: ["Wann", "kommt", "der", "Bus", "an?"],
      wrongRule: "In German questions, the conjugated verb must always be in position 2!",
    },
    {
      type: "order",
      prompt: "Who can help me?",
      tokens: ["Wer", "kann", "mir", "helfen?"],
      distractors: ["Wo", "Wann"],
      correct: ["Wer", "kann", "mir", "helfen?"],
      wrongRule: "In German questions, the conjugated verb must always be in position 2!",
    },
  ];

  const CH1_PPP_WFRAGEN_BLANKS = [
    {
      prompt: "Where does Lena live?",
      prefix: "",
      suffix: "wohnt Lena?",
      options: ["Wer", "Wo", "Wie"],
      correct: "Wo",
    },
    {
      prompt: "Excuse me, how do I get to the hotel?",
      prefix: "Entschuldigung,",
      suffix: "komme ich zum Hotel?",
      options: ["Wo", "Wie", "Wohin"],
      correct: "Wie",
    },
    {
      prompt: "Where is this train going?",
      prefix: "",
      suffix: "fährt dieser Zug?",
      options: ["Wo", "Wohin", "Wann"],
      correct: "Wohin",
    },
    {
      prompt: "Who can help me?",
      prefix: "",
      suffix: "kann mir helfen?",
      options: ["Wer", "Warum", "Wann"],
      correct: "Wer",
    },
    {
      prompt: "When does the bus arrive?",
      prefix: "",
      suffix: "kommt der Bus an?",
      options: ["Wo", "Wer", "Wann"],
      correct: "Wann",
    },
  ];

  const CH1_PPP_DIRECTIONS = [
    { id: "straight", german: "geradeaus", english: "straight ahead" },
    { id: "left", german: "nach links", english: "to the left" },
    { id: "right", german: "nach rechts", english: "to the right" },
    { id: "there", german: "dort", english: "there" },
    { id: "next", german: "neben", english: "next to" },
    { id: "opposite", german: "gegenüber", english: "opposite / across from" },
  ];

  const CH1_PPP_DIRECTION_SCENARIOS = [
    {
      prompt: "The hotel is across from the station.",
      sentence: "Das Hotel ist ______ .",
      options: ["gegenüber dem Bahnhof", "neben dem Bahnhof", "geradeaus zum Bahnhof"],
      correct: "gegenüber dem Bahnhof",
    },
    {
      prompt: "The café is next to the hotel.",
      sentence: "Das Café ist ______ .",
      options: ["neben dem Hotel", "gegenüber dem Hotel", "geradeaus zum Hotel"],
      correct: "neben dem Hotel",
    },
    {
      prompt: "Go straight ahead.",
      sentence: "Gehen Sie ______ .",
      options: ["geradeaus", "nach rechts", "nach links"],
      correct: "geradeaus",
    },
    {
      prompt: "Go to the left.",
      sentence: "Gehen Sie ______ .",
      options: ["nach links", "nach rechts", "gegenüber"],
      correct: "nach links",
    },
    {
      prompt: "The hotel is there.",
      sentence: "Das Hotel ist ______ .",
      options: ["dort", "neben", "geradeaus"],
      correct: "dort",
    },
  ];

  const CH2_PPP_VOCAB_SETS = [
    [
      { id: "schluessel", german: "der Schlüssel", english: "Key" },
      { id: "reservierung", german: "die Reservierung", english: "Reservation" },
      { id: "geburtsdatum", german: "das Geburtsdatum", english: "Date of birth" },
      { id: "zimmer", german: "das Zimmer", english: "Room" },
      { id: "staatsangehoerigkeit", german: "die Staatsangehörigkeit", english: "Nationality" },
      { id: "fruehstueck", german: "das Frühstück", english: "Breakfast" },
    ],
    [
      { id: "abreise", german: "die Abreise", english: "Departure" },
      { id: "vorname", german: "der Vorname", english: "First name" },
      { id: "ausweis", german: "der Ausweis", english: "ID / Passport" },
      { id: "strasse", german: "die Straße", english: "Street" },
      { id: "unterschrift", german: "die Unterschrift", english: "Signature" },
      { id: "rechnung", german: "die Rechnung", english: "Bill / Receipt" },
    ],
    [
      { id: "nachname", german: "der Nachname", english: "Last name" },
      { id: "ankunft", german: "die Ankunft", english: "Arrival" },
      { id: "alter", german: "das Alter", english: "Age" },
      { id: "meldezettel", german: "der Meldezettel", english: "Registration form" },
      { id: "wlan", german: "das WLAN", english: "Wi-Fi" },
      { id: "stock", german: "der Stock", english: "Floor" },
    ],
  ];

  const CHAPTER2_PPP_VOCAB = CH2_PPP_VOCAB_SETS.flat().map((pair) => ({
    german: pair.german,
    english: pair.english,
  }));

  const CH2_PPP_MODAL_BLANKS = [
    {
      prompt: "Am I allowed to park here?",
      sentence: "______ ich hier parken?",
      options: ["Darf", "Muss", "Will"],
      correct: "Darf",
    },
    {
      prompt: "I would like to pay now, please.",
      sentence: "Ich ______ bitte jetzt bezahlen.",
      options: ["möchte", "muss", "kann"],
      correct: "möchte",
    },
    {
      prompt: "Can you please help me?",
      sentence: "______ Sie mir bitte helfen?",
      options: ["Können", "Müssen", "Dürfen"],
      correct: "Können",
    },
    {
      prompt: "Do I have to fill out the form?",
      sentence: "______ ich das Formular ausfüllen?",
      options: ["Muss", "Kann", "Soll"],
      correct: "Muss",
    },
    {
      prompt: "Should I leave the key here?",
      sentence: "______ ich den Schlüssel hier lassen?",
      options: ["Soll", "Darf", "Kann"],
      correct: "Soll",
    },
  ];

  const CH2_PPP_SENTENCES = [
    {
      type: "order",
      prompt: "Good day.",
      tokens: ["Guten", "Tag"],
      distractors: ["Tschüss", "Hallo"],
      chips: ["Tag", "Tschüss", "Guten", "Hallo"],
      correct: ["Guten", "Tag"],
      endPunct: ".",
      wrongRule: "",
    },
    {
      type: "order",
      prompt: "I have a reservation.",
      tokens: ["Ich", "habe", "eine", "Reservierung"],
      distractors: ["hat", "Meldezettel"],
      chips: ["hat", "Ich", "Reservierung", "Meldezettel", "habe", "eine"],
      correct: ["Ich", "habe", "eine", "Reservierung"],
      endPunct: ".",
      wrongRule: "",
    },
    {
      type: "order",
      prompt: "Here is my ID.",
      tokens: ["Hier", "ist", "mein", "Ausweis"],
      distractors: ["dein", "Schlüssel"],
      chips: ["Ausweis", "dein", "Hier", "Schlüssel", "ist", "mein"],
      correct: ["Hier", "ist", "mein", "Ausweis"],
      endPunct: ".",
      wrongRule: "",
    },
    {
      type: "order",
      prompt: "Where is my room?",
      tokens: ["Wo", "ist", "mein", "Zimmer"],
      distractors: ["Wie", "dein"],
      chips: ["Zimmer", "Wo", "mein", "ist", "Wie", "dein"],
      correct: ["Wo", "ist", "mein", "Zimmer"],
      endPunct: "?",
      wrongRule: "",
    },
    {
      type: "order",
      prompt: "Can I pay with a card?",
      tokens: ["Kann", "ich", "mit", "Karte", "bezahlen"],
      distractors: ["soll", "ohne"],
      chips: ["bezahlen", "mit", "Kann", "Karte", "ich", "soll", "ohne"],
      correct: ["Kann", "ich", "mit", "Karte", "bezahlen"],
      endPunct: "?",
      wrongRule: "",
    },
    {
      type: "order",
      prompt: "When is check-out?",
      tokens: ["Wann", "ist", "der", "Check-out"],
      distractors: ["Wo", "Wer"],
      chips: ["Check-out", "Wann", "der", "ist", "Wo", "Wer"],
      correct: ["Wann", "ist", "der", "Check-out"],
      endPunct: "?",
      wrongRule: "",
    },
  ];

  const CH2_PPP_BLANKS = [
    {
      prompt: "Choose the polite greeting.",
      prefix: "",
      suffix: "! Ich habe eine Reservierung.",
      options: ["Hallo", "Guten Tag", "Tschüss"],
      correct: "Guten Tag",
    },
    {
      prompt: "Choose the correct noun.",
      prefix: "Ich habe eine",
      suffix: ".",
      options: ["Reservierung", "U-Bahn", "Entschuldigung"],
      correct: "Reservierung",
    },
    {
      prompt: "Choose the correct phrase.",
      prefix: "Die Reservierung ist",
      suffix: "Lena Majerová.",
      options: ["auf den Namen", "zum Hotel", "nach links"],
      correct: "auf den Namen",
    },
    {
      prompt: "What do you hand the receptionist?",
      prefix: "Hier ist mein",
      suffix: ".",
      options: ["Ausweis", "Handy", "Ticket"],
      correct: "Ausweis",
    },
    {
      prompt: "Choose the hotel registration form.",
      prefix: "Bitte füllen Sie den",
      suffix: "aus.",
      options: ["Meldezettel", "Fahrplan", "Kaffee"],
      correct: "Meldezettel",
    },
  ];

  const CH3_PPP_VOCAB_SETS = [
    [
      { id: "fahrkarte", german: "die Fahrkarte", english: "Ticket" },
      { id: "einzelfahrt", german: "die Einzelfahrt", english: "Single ride" },
      { id: "tageskarte", german: "die Tageskarte", english: "Day pass" },
      { id: "ermaessigt", german: "ermäßigt", english: "Discounted" },
      { id: "ubahn", german: "Die U-Bahn", english: "Subway" },
      { id: "waehlen", german: "wählen", english: "Select / Choose" },
    ],
    [
      { id: "erwachsene", german: "der Erwachsene", english: "Adult" },
      { id: "kind", german: "das Kind", english: "Child" },
      { id: "wochenkarte", german: "die Wochenkarte", english: "Weekly ticket" },
      { id: "stundenkarte", german: "die 24-Stunden-Karte", english: "24-hour pass" },
      { id: "vollpreis", german: "der Vollpreis", english: "Full price" },
      { id: "schueler", german: "der Schüler", english: "Student" },
    ],
    [
      { id: "richtung", german: "die Richtung", english: "Direction" },
      { id: "einsteigen", german: "einsteigen", english: "Get on (train)" },
      { id: "station", german: "die Station", english: "Station" },
      { id: "zug", german: "der Zug", english: "Train" },
      { id: "linie", german: "die Linie", english: "Line" },
      { id: "aussteigen", german: "aussteigen", english: "Get off / Exit (train)" },
    ],
  ];

  const CHAPTER3_PPP_VOCAB = CH3_PPP_VOCAB_SETS.flat().map((pair) => ({
    german: pair.german,
    english: pair.english,
  }));

  const CH4_PPP_VOCAB_SETS = [
    [
      { id: "fotografieren", german: "fotografieren", english: "to take photos" },
      { id: "telefonieren", german: "telefonieren", english: "to make a phone call" },
      { id: "essen", german: "essen", english: "to eat" },
      { id: "trinken", german: "trinken", english: "to drink" },
      { id: "fluestern", german: "flüstern", english: "to whisper" },
      { id: "besuchen", german: "besuchen", english: "to visit" },
    ],
    [
      { id: "laufen", german: "laufen", english: "to run" },
      { id: "rauchen", german: "rauchen", english: "to smoke" },
      { id: "laut_sprechen", german: "laut sprechen", english: "to speak loudly" },
      { id: "tragen", german: "tragen", english: "to wear" },
      { id: "muell", german: "Müll machen", english: "to make a mess" },
      { id: "kaputt", german: "Sachen kaputt machen", english: "to break things" },
    ],
    [
      { id: "blitzlicht", german: "das Blitzlicht", english: "the camera flash" },
      { id: "hund", german: "der Hund", english: "the dog" },
      { id: "ruhe", german: "die Ruhe", english: "the quiet" },
      { id: "kappe", german: "die Kappe", english: "the cap" },
      { id: "regel", german: "die Regel", english: "the rule" },
      { id: "laerm", german: "der Lärm", english: "the noise" },
    ],
  ];

  const CHAPTER4_PPP_VOCAB = CH4_PPP_VOCAB_SETS.flat().map((pair) => ({
    german: pair.german,
    english: pair.english,
  }));

  const CH2_PPP_MODALS = [
    { id: "koennen", german: "können", english: "can" },
    { id: "muessen", german: "müssen", english: "must" },
    { id: "duerfen", german: "dürfen", english: "may" },
    { id: "wollen", german: "wollen", english: "want" },
    { id: "sollen", german: "sollen", english: "should" },
    { id: "moechten", german: "möchten", english: "would like" },
  ];

  const CH2_PPP_PHRASES = [
    { id: "sie", german: "Sie", english: "you (formal)" },
    { id: "bitte", german: "bitte", english: "please" },
    { id: "willkommen", german: "Herzlich willkommen", english: "welcome" },
    { id: "einzeln", german: "das Einzelzimmer", english: "single room" },
    { id: "wlan", german: "das WLAN-Passwort", english: "Wi-Fi password" },
    { id: "etage", german: "die Etage", english: "floor / level" },
  ];

  const CH2_PPP_SCENARIOS = [
    {
      prompt: "The receptionist asks if you have a reservation. What is the polite reply?",
      options: [
        "Guten Tag! Ich habe eine Reservierung auf den Namen Lena Majerová.",
        "Hallo! Ich brauche jetzt meinen Zimmerschlüssel.",
        "Guten Tag. Ja, ich habe eine Reservierung, weil ich möchte hier schlafen.",
      ],
      correct: "Guten Tag! Ich habe eine Reservierung auf den Namen Lena Majerová.",
    },
    {
      prompt: "She needs to confirm who you are. What do you do?",
      options: ["[Hand her my ID card]", "[Tell her my phone number]", "[Repeat only my first name]"],
      correct: "[Hand her my ID card]",
    },
    {
      prompt: "How do you address the receptionist?",
      options: ["Sie (formal)", "du (informal)", "ihr (plural informal)"],
      correct: "Sie (formal)",
    },
    {
      prompt: "You need the room key. Which request is polite?",
      options: [
        "Könnte ich bitte den Zimmerschlüssel haben?",
        "Gib mir sofort den Schlüssel!",
        "Wo ist mein Bus?",
      ],
      correct: "Könnte ich bitte den Zimmerschlüssel haben?",
    },
    {
      prompt: "What is the Meldezettel?",
      options: ["A guest registration form", "A metro ticket", "A breakfast menu"],
      correct: "A guest registration form",
    },
  ];

  const ETIQUETTE_ROUNDS = [
    [
      { id: "r1-ruhe", text: "Ruhe halten", answer: "erlaubt" },
      { id: "r1-essen", text: "Im Dom essen und trinken.", answer: "verboten" },
      { id: "r1-leise", text: "Leise sprechen.", answer: "erlaubt" },
      { id: "r1-handy", text: "Mit dem Handy telefonieren.", answer: "verboten" },
      { id: "r1-kunst", text: "Die Bilder und Kunstwerke ansehen.", answer: "erlaubt" },
    ],
    [
      { id: "r2-blitz", text: "Fotos mit Blitz machen.", answer: "verboten" },
      { id: "r2-kappe", text: "Kappe oder Hut abnehmen.", answer: "erlaubt" },
      { id: "r2-hunde", text: "Hunde mit in den Dom nehmen.", answer: "verboten" },
      { id: "r2-laune", text: "Gute Laune mitbringen.", answer: "erlaubt" },
      { id: "r2-rauchen", text: "Im Dom rauchen.", answer: "verboten" },
    ],
  ];

  const PPP_PACKS = {
    ch1_ppp_practice: {
      successNode: "start_ask_hotel",
      doneButton: "Approach the man",
      doneTitle: "Lena feels confident now!",
      vocab: CHAPTER1_PPP_VOCAB,
      vocabChapter: "chapter1",
      vocabFlag: "chapter1Ppp",
      matching1: CH1_PPP_WFRAGEN,
      step1Title: "W-Fragen",
      step1Instruction: "Match the German question words with their English meanings.",
      step1Wrong: "Wo = where · Wohin = where to · Wie = how · Wann = when · Wer = who · Warum = why",
      sentences: CH1_PPP_SENTENCES,
      step2Title: "Sentence Building",
      blanks: CH1_PPP_WFRAGEN_BLANKS,
      step3Title: "W-Fragen in Context",
      matching2: CH1_PPP_DIRECTIONS,
      step4Title: "Directions",
      step4Instruction: "Match the German direction phrases with their English meanings.",
      scenarios: CH1_PPP_DIRECTION_SCENARIOS,
      step5Title: "Directions in Context",
      step5Instruction: "Choose the German phrase that fits the situation.",
    },
    ch2_ppp_practice: {
      successNode: "ch2_reception_greet",
      doneButton: "Approach reception",
      doneTitle: "Lena feels ready to approach the reception desk!",
      vocab: CHAPTER2_PPP_VOCAB,
      vocabChapter: "chapter2",
      vocabFlag: "chapter2Ppp",
      matching1: CH2_PPP_VOCAB_SETS,
      flow: [
        {
          type: "matching",
          title: "Check-in words",
          instruction: "Match the German hotel words with their English meanings.",
          pairs: CH2_PPP_VOCAB_SETS[0],
        },
        {
          type: "matching",
          title: "Check-in words",
          instruction: "Match the German hotel words with their English meanings.",
          pairs: CH2_PPP_VOCAB_SETS[1],
        },
        {
          type: "matching",
          title: "Modal verbs",
          instruction: "Match each German modal verb with its English translation.",
          pairs: CH2_PPP_MODALS,
          shuffleLeft: true,
        },
        {
          type: "blanks",
          title: "Modal Verbs in Context",
          instruction: "Choose the modal verb that fits the sentence.",
          tasks: CH2_PPP_MODAL_BLANKS,
        },
        {
          type: "sentences",
          title: "Sentence Building",
          instruction: "Form the correct German sentence using proper word order.",
          tasks: CH2_PPP_SENTENCES,
        },
      ],
    },
    ch3_ppp_practice: {
      successNode: "ch3_morning_intro_transport",
      doneButton: "Lena is ready for the adventure!",
      vocab: CHAPTER3_PPP_VOCAB,
      vocabChapter: "chapter3",
      vocabFlag: "chapter3Ppp",
      matching1: CH3_PPP_VOCAB_SETS,
      flow: [
        {
          type: "matching",
          title: "Transport Vocabulary",
          instruction: "Match the German terms with their English meanings.",
          pairs: CH3_PPP_VOCAB_SETS[0],
          shuffleLeft: true,
        },
        {
          type: "matching",
          title: "Transport Vocabulary",
          instruction: "Match the German terms with their English meanings.",
          pairs: CH3_PPP_VOCAB_SETS[1],
          shuffleLeft: true,
        },
        {
          type: "matching",
          title: "Transport Vocabulary",
          instruction: "Match the German terms with their English meanings.",
          pairs: CH3_PPP_VOCAB_SETS[2],
          shuffleLeft: true,
        },
      ],
    },
    ch4_ppp_practice: {
      successNode: "ch4_rules_intro",
      doneButton: "Proceed to the entrance",
      doneTitle: "Lena feels confident and ready to step inside Stephansdom.",
      vocab: CHAPTER4_PPP_VOCAB,
      vocabChapter: "chapter4",
      vocabFlag: "chapter4Ppp",
      matching1: CH4_PPP_VOCAB_SETS,
      flow: [
        {
          type: "matching",
          title: "Stephansdom Vocabulary & Rules Practice",
          instruction: "Match the German terms with their English meanings.",
          pairs: CH4_PPP_VOCAB_SETS[0],
          shuffleLeft: true,
        },
        {
          type: "matching",
          title: "Stephansdom Vocabulary & Rules Practice",
          instruction: "Match the German terms with their English meanings.",
          pairs: CH4_PPP_VOCAB_SETS[1],
          shuffleLeft: true,
        },
        {
          type: "matching",
          title: "Stephansdom Vocabulary & Rules Practice",
          instruction: "Match the German terms with their English meanings.",
          pairs: CH4_PPP_VOCAB_SETS[2],
          shuffleLeft: true,
        },
        {
          type: "etiquette",
          title: "Is this allowed or forbidden in Stephansdom?",
          instruction: "Choose ALLOWED or FORBIDDEN for each rule.",
          rules: ETIQUETTE_ROUNDS[0],
        },
        {
          type: "etiquette",
          title: "Is this allowed or forbidden in Stephansdom?",
          instruction: "Choose ALLOWED or FORBIDDEN for each rule.",
          rules: ETIQUETTE_ROUNDS[1],
        },
      ],
    },
  };

  const MELDEZETTEL_TRIGGER_NODE = "ch2_meldezettel";
  const MELDEZETTEL_SUCCESS_NODE = "ch2_meldezettel_success";
  const MELDEZETTEL_UNCERTAIN_NODE = "ch2_meldezettel_uncertain";

  const TICKET_MACHINE_TRIGGER_NODE = "ch3_ticket_machine";
  const TICKET_MACHINE_NEXT_NODE = "ch3_boarding";
  const TICKET_MACHINE_SUCCESS_NODE = "ch3_ticket_success";
  const TICKET_MACHINE_FAIL_NODE = "ch3_ticket_fail";

  const U3_LINE_STATIONS = [
    { name: "Ottakring", end: true },
    { name: "Hütteldorfer Straße" },
    { name: "Westbahnhof" },
    { name: "Zieglergasse" },
    { name: "Neubaugasse", here: true, tag: "STANDORT" },
    { name: "Volkstheater" },
    { name: "Herrengasse" },
    { name: "Stephansplatz", dest: true, tag: "ZIEL" },
    { name: "Landstraße" },
    { name: "Simmering", end: true },
  ];

  const u3Direction = {
    mapOpen: false,
    platformOpen: false,
  };
  const u3RailObservers = new WeakMap();

  const TICKET_MACHINE_MISTAKE_THRESHOLD = 3;
  const CHAPTER3_MAX_STRIKES = 3;
  const MELDEZETTEL_MISTAKE_THRESHOLD = 3;

  const RULES_GAME_TRIGGER_NODE = "ch4_rules_game";
  const RULES_GAME_MISTAKE_THRESHOLD = 3;
  const ETIQUETTE_GAME_TRIGGER_NODE = "ch4_erlaubt_game";
  const ETIQUETTE_GAME_SUCCESS_NODE = "ch4_rules_intro";

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
    { id: "food", german: "Essen und Trinken verboten.", english: "No eating or drinking." },
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
  const TICKET_MACHINE_HINT_ROWS = [
    {
      icon: "📍",
      label: "Plan",
      segments: [
        { text: "3 metro trips", strong: true },
        { text: " today (Stephansdom ➔ Park ➔ Hotel)" },
      ],
    },
    {
      icon: "💶",
      label: "Rule",
      segments: [
        { text: "Buy " },
        { text: "whatever is cheaper", strong: true },
        { text: " (Individual tickets vs. 24-hour pass)" },
      ],
    },
    {
      icon: "👤",
      label: "Fare",
      segments: [
        { text: "Standard Adult fare", strong: true },
        { text: " (Tourist, no Austrian school ID)" },
      ],
    },
  ];

  const MELDEZETTEL_FIELDS = [
    { id: "vorname", label: "Vorname", answer: "Lena" },
    { id: "nachname", label: "Nachname", answer: "Majerová" },
    { id: "geburtsdatum", label: "Geburtsdatum", answer: "12. 04. 2008" },
    { id: "strasse", label: "Strasse", answer: "Na Cikorce 2166/2b" },
    { id: "plz_ort", label: "PLZ / Ort", answer: "143 00 Praha 12" },
    { id: "staatsangehoerigkeit", label: "Staatsangehörigkeit", answer: "tschechisch" },
    { id: "ankunftsdatum", label: "Ankunftsdatum", answer: "15. 07. 2027" },
    { id: "abreisedatum", label: "Abreisedatum", answer: "16. 07. 2027" },
    { id: "zimmertyp", label: "Zimmertyp", answer: "Einzelzimmer" },
    { id: "zahlungsart", label: "Zahlungsart", answer: "Kreditkarte" },
  ];

  const meldezettel = {
    active: false,
    cards: [],
    fieldStatus: {},
    selectedCardId: null,
    dragCardId: null,
    suppressClick: false,
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
    pendingHint: false,
    chapterStrikeApplied: false,
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
      text: "Entschuldigung! Ich versuche es noch einmal.",
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
    vocabPanel: document.getElementById("vocab-panel"),
    vocabTitle: document.getElementById("vocab-title"),
    vocabList: document.getElementById("vocab-list"),
    vocabCloseBtn: document.getElementById("vocab-close-btn"),
    vocabTutorial: document.getElementById("vocab-tutorial"),
    vocabTutorialBtn: document.getElementById("vocab-tutorial-btn"),
    directionHint: document.getElementById("direction-hint"),
    directionHintBtn: document.getElementById("direction-hint-btn"),
    directionHintPanel: document.getElementById("direction-hint-panel"),
    directionHintClose: document.getElementById("direction-hint-close"),
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
    const npc = resolveNpc(node);
    const lenaMood = resolveLenaMood(node);
    gameState.characters = {
      lena: { mood: lenaMood },
      npc: {
        character: npc.character,
        mood: npc.mood,
        name: npc.name,
        visible: npc.visible,
      },
    };

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
      btn.classList.remove("choice-btn--practice");
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
        btn.classList.remove("is-hidden");
        btn.classList.toggle("choice-btn--practice", Boolean(choice.prominent));
        if (choice.prominent) {
          const slash = choice.text.indexOf(" / ");
          const main = slash >= 0 ? choice.text.slice(0, slash) : choice.text;
          const sub = slash >= 0 ? choice.text.slice(slash + 3) : "";
          btn.innerHTML = sub
            ? `<span class="choice-btn__main"></span><span class="choice-btn__sub"></span>`
            : `<span class="choice-btn__main"></span>`;
          btn.querySelector(".choice-btn__main").textContent = main;
          const subEl = btn.querySelector(".choice-btn__sub");
          if (subEl) subEl.textContent = sub;
        } else {
          btn.textContent = choice.text;
        }
        btn.onclick = () => selectChoice(choice.text, choice.nextNode);
      } else {
        btn.classList.add("is-hidden");
        btn.classList.remove("choice-btn--practice");
        btn.onclick = null;
      }
    });
  }

  function getChoicesForCurrentNode(node) {
    if (state.pendingFollowUp || state.activeFollowUp?.nextFollowUp) {
      return [];
    }

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

  function isInternalThoughtSpeaker(speaker) {
    return (
      (speaker || "").includes("Internal Monologue") ||
      (speaker || "").includes("Internal Thought")
    );
  }

  function paintSpokenDialogue({ spoken = "", thought = "" } = {}) {
    if (!thought && !spoken) {
      els.dialogueText.textContent = "";
      return;
    }

    if (!thought) {
      els.dialogueText.textContent = spoken;
      return;
    }

    els.dialogueText.replaceChildren();
    if (spoken) {
      const speech = document.createElement("span");
      speech.className = "dialogue__speech";
      speech.textContent = spoken;
      els.dialogueText.appendChild(speech);
      els.dialogueText.appendChild(document.createTextNode(" "));
    }

    const thoughtEl = document.createElement("i");
    thoughtEl.className = "dialogue__thought";
    thoughtEl.textContent = thought;
    els.dialogueText.appendChild(thoughtEl);
  }

  function paintNodeDialogue(node, spokenText) {
    const spoken = spokenText ?? node.text ?? "";
    if (state.activeFollowUp) {
      if (isInternalThoughtSpeaker(state.activeFollowUp.speaker)) {
        paintSpokenDialogue({ thought: spoken });
        return;
      }
      els.dialogueText.textContent = spoken;
      return;
    }

    if (node.thought) {
      paintSpokenDialogue({ spoken, thought: node.thought });
      return;
    }

    if (isInternalThoughtSpeaker(node.speaker)) {
      paintSpokenDialogue({ thought: spoken });
      return;
    }

    els.dialogueText.textContent = spoken;
  }

  function finishTyping() {
    clearTypeTimer();
    state.typing = false;

    const node = getNode();
    paintNodeDialogue(node, state.fullText);

    const followUp = FOLLOW_UP_BEFORE_REPLAY[node.id];
    if (followUp && state.followUpShownForNode !== node.id && !state.activeFollowUp) {
      state.pendingFollowUp = { sourceNodeId: node.id, followUp };
      els.advanceHint.classList.remove("is-hidden");
      return;
    }

    if (state.activeFollowUp?.nextFollowUp) {
      state.pendingFollowUp = {
        sourceNodeId: node.id,
        followUp: state.activeFollowUp.nextFollowUp,
      };
      state.activeFollowUp = null;
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
      return;
    }

    if (node.autoAdvance && node.nextNode) {
      goToNode(node.nextNode);
      return;
    }

    els.advanceHint.classList.remove("is-hidden");
  }

  function renderFollowUpDialogue(sourceNodeId, followUp) {
    state.followUpShownForNode = sourceNodeId;
    state.activeFollowUp = followUp;
    hideChoices();
    applyTextFadeIn();

    const sourceNode = storyData[sourceNodeId] || getNode();
    updateCharacters({
      ...sourceNode,
      speaker: followUp.speaker || "Lena",
      lenaMood: followUp.lenaMood || sourceNode.lenaMood,
      npcImage: followUp.npcImage !== undefined ? followUp.npcImage : sourceNode.npcImage,
      npcMood: followUp.npcMood || sourceNode.npcMood,
    });

    const speaker = followUp.speaker || "Lena";
    const isInternalMonologue = speaker.includes("Internal Monologue") || speaker.includes("Internal Thought");

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

    const node = getNode();
    const splitThought = Boolean(node.thought) && !state.activeFollowUp;
    const wrapInternal =
      !splitThought && isInternalThoughtSpeaker(node.speaker) && !state.activeFollowUp;
    let index = 0;
    state.typeTimer = setInterval(() => {
      index += 1;
      const spoken = text.slice(0, index);
      if (splitThought) {
        paintSpokenDialogue({ spoken, thought: "" });
      } else if (wrapInternal) {
        paintSpokenDialogue({ thought: spoken });
      } else {
        els.dialogueText.textContent = spoken;
      }

      if (index >= text.length) {
        finishTyping();
      }
    }, TYPE_SPEED);
  }

  function createU3LineMap(variant = "inline") {
    const stationNames = U3_LINE_STATIONS.map((station) => station.name).join(", ");
    const map = document.createElement("div");
    map.className = "u3-line-map";
    if (variant === "overlay") map.classList.add("u3-line-map--overlay");
    map.setAttribute("role", "img");
    map.setAttribute(
      "aria-label",
      `U3 line from Ottakring to Simmering: ${stationNames}. Neubaugasse is the current station. Stephansplatz is the destination.`
    );

    const head = document.createElement("header");
    head.className = "u3-line-map__head";

    const identity = document.createElement("div");
    identity.className = "u3-line-map__identity";
    const badge = document.createElement("span");
    badge.className = "u3-line-map__badge";
    badge.textContent = "U3";
    const title = document.createElement("span");
    title.className = "u3-line-map__title";
    title.textContent = "Ottakring — Simmering";
    identity.appendChild(badge);
    identity.appendChild(title);

    const legend = document.createElement("div");
    legend.className = "u3-line-map__legend";
    legend.innerHTML = `
      <span class="u3-line-map__legend-item is-here">Standort · Current Station</span>
      <span class="u3-line-map__legend-item is-dest">Ziel · Destination</span>
    `;

    head.appendChild(identity);
    head.appendChild(legend);
    map.appendChild(head);

    const track = document.createElement("div");
    track.className = "u3-line-map__track";
    const rail = document.createElement("div");
    rail.className = "u3-line-map__rail";
    rail.setAttribute("aria-hidden", "true");
    track.appendChild(rail);

    const row = document.createElement("div");
    row.className = "u3-line-map__row";

    U3_LINE_STATIONS.forEach((station) => {
      const item = document.createElement("div");
      item.className = "u3-line-map__station";
      if (station.end) item.classList.add("is-end");
      if (station.here) item.classList.add("is-here");
      if (station.dest) item.classList.add("is-dest");

      const tag = document.createElement("span");
      tag.className = "u3-line-map__tag";
      if (station.tag) {
        tag.title = station.tag;
        const label = document.createElement("span");
        label.className = "u3-line-map__tag-de";
        label.textContent = station.tag;
        tag.appendChild(label);
      }

      const mark = document.createElement("span");
      mark.className = "u3-line-map__mark";
      mark.setAttribute("aria-hidden", "true");

      const label = document.createElement("span");
      label.className = "u3-line-map__label";
      const name = document.createElement("span");
      name.className = "u3-line-map__name";
      name.textContent = station.name;
      label.appendChild(name);
      if (station.end) {
        const endcap = document.createElement("span");
        endcap.className = "u3-line-map__endcap";
        endcap.textContent = "Endstation";
        label.appendChild(endcap);
      }

      item.appendChild(tag);
      item.appendChild(mark);
      item.appendChild(label);
      row.appendChild(item);
    });

    track.appendChild(row);
    map.appendChild(track);
    scheduleU3RailLayout(map);
    return map;
  }

  function layoutU3Rail(map) {
    const track = map.querySelector(".u3-line-map__track");
    const rail = map.querySelector(".u3-line-map__rail");
    const marks = [...map.querySelectorAll(".u3-line-map__mark")];
    if (!track || !rail || marks.length < 2) return;

    const trackRect = track.getBoundingClientRect();
    const first = marks[0].getBoundingClientRect();
    const last = marks[marks.length - 1].getBoundingClientRect();
    const start = first.left + first.width / 2 - trackRect.left + track.scrollLeft;
    const end = last.left + last.width / 2 - trackRect.left + track.scrollLeft;
    rail.style.left = `${start}px`;
    rail.style.width = `${Math.max(0, end - start)}px`;
    rail.style.right = "auto";
  }

  function scheduleU3RailLayout(map) {
    const layout = () => layoutU3Rail(map);
    requestAnimationFrame(() => requestAnimationFrame(layout));

    const track = map.querySelector(".u3-line-map__track");
    if (!track || u3RailObservers.has(map)) return;
    const observer = new ResizeObserver(layout);
    observer.observe(track);
    track.addEventListener("scroll", layout, { passive: true });
    u3RailObservers.set(map, observer);
  }

  function syncU3DialogueHidden() {
    const hide = u3Direction.mapOpen || u3Direction.platformOpen;
    els.dialogueBox.classList.toggle("is-u3-map-open", hide);
  }

  function closeU3DirectionUi() {
    u3Direction.mapOpen = false;
    u3Direction.platformOpen = false;
    document.getElementById("u3-map-overlay")?.remove();
    document.getElementById("u3-platform-overlay")?.remove();
    syncU3DialogueHidden();
  }

  function setU3MapOpen(open) {
    u3Direction.mapOpen = open;
    const toggle = document.getElementById("u3-map-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.classList.toggle("is-open", open);
    }

    document.getElementById("u3-map-overlay")?.remove();
    syncU3DialogueHidden();
    if (!open) return;

    const overlay = document.createElement("div");
    overlay.id = "u3-map-overlay";
    overlay.className = "u3-map-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "u3-map-overlay-title");
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) setU3MapOpen(false);
    });

    const frame = document.createElement("div");
    frame.className = "u3-map-overlay__frame";
    frame.addEventListener("click", (event) => event.stopPropagation());

    const header = document.createElement("header");
    header.className = "u3-map-overlay__header";
    const title = document.createElement("h2");
    title.id = "u3-map-overlay-title";
    title.className = "u3-map-overlay__title";
    title.textContent = "U3 Liniennetz / Line Map";
    const closeX = document.createElement("button");
    closeX.type = "button";
    closeX.className = "u3-map-overlay__x";
    closeX.setAttribute("aria-label", "Close line map");
    closeX.textContent = "×";
    closeX.addEventListener("click", () => setU3MapOpen(false));
    header.appendChild(title);
    header.appendChild(closeX);

    const body = document.createElement("div");
    body.className = "u3-map-overlay__body";
    const map = createU3LineMap("overlay");
    body.appendChild(map);

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "u3-map-overlay__close";
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", () => setU3MapOpen(false));

    frame.appendChild(header);
    frame.appendChild(body);
    frame.appendChild(closeBtn);
    overlay.appendChild(frame);
    els.game.appendChild(overlay);
    scheduleU3RailLayout(map);
  }

  function createU3MapToggle() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "u3-map-toggle";
    btn.className = "u3-map-toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "u3-map-overlay");
    btn.setAttribute("aria-label", "View U3 line map");
    btn.innerHTML = `
      <span class="u3-map-toggle__icon" aria-hidden="true">🗺️</span>
      <span class="u3-map-toggle__copy">
        <span class="u3-map-toggle__title">Map</span>
        <span class="u3-map-toggle__sub">View Line Map</span>
      </span>
    `;
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setU3MapOpen(!u3Direction.mapOpen);
    });
    return btn;
  }

  function renderU3LineMap() {
    closeU3DirectionUi();
    els.dialogueText.replaceChildren(createU3LineMap());
    state.fullText = `U3: ${U3_LINE_STATIONS.map((station) => station.name).join(", ")}.`;
  }

  function renderU3PlatformBoards() {
    hideChoices();
    state.waitingForChoice = true;
    u3Direction.platformOpen = true;
    syncU3DialogueHidden();
    els.dialogueText.replaceChildren();
    els.advanceHint.classList.add("is-hidden");
    document.getElementById("u3-platform-overlay")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "u3-platform-overlay";
    overlay.className = "u3-platform-overlay";

    const panel = document.createElement("div");
    panel.className = "u3-platform-overlay__panel";

    const head = document.createElement("header");
    head.className = "u3-platform-overlay__head";
    const title = document.createElement("h2");
    title.className = "u3-platform-overlay__title";
    title.textContent = "Choose platform direction:";
    head.appendChild(title);
    head.appendChild(createU3MapToggle());

    const wrap = document.createElement("div");
    wrap.className = "u3-platform-boards";

    const boards = [
      {
        nextNode: "ch3_platform_wrong",
        label: "U3 ➔ Ottakring",
        aria: "U3 towards Ottakring",
      },
      {
        nextNode: "ch3_platform_correct",
        label: "U3 ➔ Simmering",
        aria: "U3 towards Simmering",
      },
    ];

    boards.forEach((board) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "u3-platform-board";
      btn.setAttribute("aria-label", board.aria);

      const boardBadge = document.createElement("span");
      boardBadge.className = "u3-platform-board__badge";
      boardBadge.textContent = "U3";

      const dir = document.createElement("span");
      dir.className = "u3-platform-board__dir";
      dir.textContent = board.label.replace(/^U3\s*/, "");

      btn.appendChild(boardBadge);
      btn.appendChild(dir);
      btn.addEventListener("click", () => {
        closeU3DirectionUi();
        selectChoice(board.label, board.nextNode);
      });
      wrap.appendChild(btn);
    });

    panel.appendChild(head);
    panel.appendChild(wrap);
    overlay.appendChild(panel);
    els.game.appendChild(overlay);
    state.fullText = "Choose U3 towards Simmering or U3 towards Ottakring.";
  }

  function applyDialogueStyle(node) {
    const speaker = node.speaker || "";
    const isInternalMonologue =
      !node.thought &&
      (speaker.includes("Internal Monologue") || speaker.includes("Internal Thought"));
    const isMetroVisual =
      node.dialogueStyle === "metro-sign" ||
      node.dialogueStyle === "u3-line-map" ||
      node.dialogueStyle === "u3-platform-boards";

    els.dialogueText.classList.toggle("internal-thought", isInternalMonologue);
    els.dialogueText.classList.toggle("sensory-text", node.dialogueStyle === "sensory");
    els.dialogueText.classList.toggle("announcement-text", node.dialogueStyle === "announcement");
    els.dialogueText.classList.toggle("metro-sign-text", isMetroVisual);
  }

  function renderDialogue(node) {
    hideChoices();
    applyTextFadeIn();
    applyDialogueStyle(node);

    const speaker = node.speaker || "";
    const isInternalMonologue = speaker.includes("Internal Monologue");

    els.speakerName.classList.remove("is-hidden");
    els.speakerName.textContent = isInternalMonologue ? "Lena" : speaker || "???";

    if (node.dialogueStyle === "u3-line-map" || node.dialogueStyle === "u3-platform-boards") {
      els.speakerName.classList.add("is-hidden");
      els.speakerName.textContent = "";
    }

    if (node.dialogueStyle === "u3-line-map" || node.dialogueStyle === "metro-sign") {
      clearTypeTimer();
      state.typing = false;
      renderU3LineMap();
      const choices = node.choices || [];
      if (choices.length) {
        showChoices(choices);
      } else {
        els.advanceHint.classList.remove("is-hidden");
      }
      return;
    }

    if (node.dialogueStyle === "u3-platform-boards") {
      clearTypeTimer();
      state.typing = false;
      renderU3PlatformBoards();
      return;
    }

    // Instant text: show everything at once so the player can't accidentally
    // click a choice button while trying to skip the typewriter effect.
    if (node.instantText) {
      clearTypeTimer();
      state.typing = false;
      state.fullText = node.text;
      paintNodeDialogue(node, node.text);
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
      const npc = resolveNpc(node);
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
    els.lenaSprite.dataset.mood = resolveLenaMood({ lenaMood: node.lenaMood || "surprised" });
    gameState.characters = {
      lena: { mood: els.lenaSprite.dataset.mood },
      npc: { character: "elder", mood: "neutral", name: "", visible: false },
    };

    els.npcContainer.classList.remove("is-jumpscare-pop", "is-speaking", "is-dimmed");
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");

    els.dialogueBox.hidden = false;
    playJumpScare();
    renderDialogue(node);
  }

  // ── Black-screen transition ───────────────────────────────────────────────

  function hideGameplayScene() {
    closeCh1ReviewThought();
    closeU3DirectionUi();
    clearTypeTimer();
    state.typing = false;
    hideChoices();
    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");
  }

  function closeCh1ReviewThought() {
    document.getElementById("ch1-review-thought")?.remove();
  }

  function showCh1ReviewThought(node) {
    hideGameplayScene();
    closeHotelNavGame();
    setBackground(node.background || "vienna_hauptbahnhof.jpg");

    const overlay = document.createElement("div");
    overlay.id = "ch1-review-thought";
    overlay.className = "full-black-screen full-black-screen--beat ch1-thought";

    const card = document.createElement("div");
    card.className = "chapter-transition ch1-thought-card";

    const message = document.createElement("p");
    message.className = "ch1-thought-card__text";
    message.textContent = node.text;
    card.appendChild(message);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chapter-transition__btn";
    btn.textContent = "Check Route to Hotel";
    btn.addEventListener("click", () => {
      closeCh1ReviewThought();
      goToNode("start_quiz_transport");
    });
    card.appendChild(btn);

    overlay.appendChild(card);
    els.game.appendChild(overlay);
  }

  function removeBlackScreen({ restoreScene = true } = {}) {
    const existing = document.getElementById("black-screen-overlay");
    if (existing) existing.remove();

    if (!restoreScene) return;

    els.dialogueBox.hidden = false;
    els.lenaContainer.classList.remove("is-hidden");
  }

  function showBlackScreen(node) {
    hideGameplayScene();
    closeHotelNavGame();
    document.getElementById("black-screen-overlay")?.remove();
    setBackground(node.background || "black");

    const overlay = document.createElement("div");
    overlay.id = "black-screen-overlay";
    overlay.className = "full-black-screen";

    if (isChapterTitleNode(node)) {
      overlay.classList.add("full-black-screen--chapter");
      overlay.addEventListener("click", () => {
        advanceBlackScreenChoice(node.choices?.[0]);
      });
    } else {
      overlay.classList.add("full-black-screen--beat");
    }

    const card = document.createElement("div");
    card.className = "chapter-transition";

    const message = document.createElement("p");
    message.className = "chapter-transition__title";
    message.textContent = getBlackScreenTitleText(node);
    card.appendChild(message);

    (node.choices || []).forEach((choice) => {
      const btn = document.createElement("button");
      btn.className = "chapter-transition__btn";
      btn.textContent = choice.text;
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        advanceBlackScreenChoice(choice);
      });
      card.appendChild(btn);
    });

    overlay.appendChild(card);
    els.game.appendChild(overlay);
  }

  function isChapterTitleNode(node) {
    return (
      node?.id === "chapter_1_title" ||
      node?.id === "chapter_2_teaser" ||
      node?.id === "chapter_3_title" ||
      node?.id === "chapter_4_title" ||
      node?.id === "chapter_6_title"
    );
  }

  const BLACK_SCREEN_NODE_IDS = new Set([
    "chapter_1_title",
    "black_screen",
    "chapter_2_teaser",
    "chapter_3_title",
    "chapter_4_title",
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
    hideGameplayScene();
    const nextNode = storyData[choice.nextNode];
    if (nextNode?.background) setBackground(nextNode.background);
    removeBlackScreen({ restoreScene: false });
    routeToNode(choice.nextNode);
  }

  const TAGEBUCH_CONTENT = {
    1: {
      success: {
        photo: "photo-c1-a.png",
        alt: "Lena smiling at Vienna Hauptbahnhof",
        german:
          "Mein erster Tag in Wien! Die Zugfahrt war super und am Bahnhof habe ich mich gut zurechtgefunden. Ich habe sogar schon mit einem Mann Deutsch gesprochen und nach dem Weg gefragt. Ich bin so gespannt auf mein Abenteuer!",
        english:
          "My first day in Vienna! The train ride was smooth and I navigated the station well. I even spoke German with a local to ask for directions. I'm so excited for this adventure!",
      },
      challenge: {
        photo: "photo-c1-b.png",
        alt: "Lena looking lost near the station",
        german:
          "Nicht alles ist heute genau nach Plan gelaufen, aber das gehört zum Lernen dazu! Ich bin sicher im Hotel angekommen und bin bereit, morgen weiterzumachen.",
        english:
          "Not everything went strictly according to plan today, but that's all part of the learning process! I made it to the hotel safely, and I'm ready to keep going tomorrow.",
      },
    },
    2: {
      success: {
        photo: "photo-c2-a.png",
        alt: "Lena smiling at the hotel reception",
        german:
          "Das Hotel ist sehr schön! Das Einchecken hat super geklappt. Ich habe an der Rezeption Deutsch gesprochen, den Meldezettel ausgefüllt, und jetzt habe ich meinen Zimmerschlüssel. Ich fühle mich wirklich sicher.",
        english:
          "The hotel is very nice! Check-in went so smoothly. I spoke German at reception, filled out the Meldezettel, and now I have my room key. I feel really confident.",
      },
      challenge: {
        photo: "photo-c2-b.png",
        alt: "Lena looking overwhelmed at the hotel reception",
        german:
          "An der Rezeption habe ich ein paar Fehler gemacht und war ein bisschen unsicher. Aber ich habe endlich meinen Zimmerschlüssel, und ich bin erleichtert, dass das Einchecken hinter mir liegt.",
        english:
          "I made a few mistakes at reception and felt a bit self-conscious. But I finally have my room key, and I'm relieved that check-in is over.",
      },
    },
    3: {
      success: {
        photo: "photo-c3-a.png",
        alt: "Lena smiling on the U-Bahn in Vienna",
        german:
          "Heute bin ich zum ersten Mal mit der U-Bahn gefahren. Die Wiener Linien sind wirklich schnell und praktisch! Ich habe alle Regeln gut verstanden und mich im System orientiert. Wenn man aufpasst, ist das Reisen hier gar nicht so schwer. Ich fühle mich schon fast wie eine echte Wienerin!",
        english:
          "Today I rode the underground for the first time. The Vienna transit system is really fast and practical! I understood all the rules and navigated the system well. When you pay attention, traveling here isn't that hard. I almost feel like a real Viennese!",
      },
      challenge: {
        photo: "photo-c3-b.png",
        alt: "Lena looking stressed on the U-Bahn in Vienna",
        german:
          "Heute bin ich mit der U-Bahn gefahren. In einer fremden Großstadt ist alles neu und etwas hektisch – die Fahrkarten, die Richtungen und die vielen Regeln. Nicht alles hat auf Anhieb geklappt, aber ich habe viel gelernt. Am Ende bin ich gut am Stephansplatz angekommen!",
        english:
          "Today I rode the underground. In a unfamiliar big city, everything is new and a bit hectic – the tickets, the directions, and all the rules. Not everything worked on the first try, but I learned a lot. In the end, I arrived safely at Stephansplatz!",
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
    5: "Epilog",
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

  function getChapter2TotalStrikes() {
    gameState.dialogueStrike =
      gameState.dialogueMistakeQ1 && gameState.dialogueMistakeQ2 ? 1 : 0;
    gameState.meldezettelStrike =
      (gameState.meldezettelErrors || 0) >= MELDEZETTEL_MISTAKE_THRESHOLD ? 1 : 0;
    return Math.min(
      (gameState.dialogueStrike ? 1 : 0) + (gameState.meldezettelStrike ? 1 : 0),
      2
    );
  }

  function getChapterStrikeCount(chapterNumber) {
    if (chapterNumber === 2) {
      return getChapter2TotalStrikes();
    }

    if (chapterNumber === 3) {
      return getChapter3Strikes();
    }

    if (chapterNumber === 4) {
      return Math.min(gameState.ch4Strikes, 2);
    }

    if (chapterNumber === 5) {
      return 0;
    }

    const dialogueStrikes = Math.max(
      gameState.dialogueStrikes || 0,
      gameState.ch1DialogueStrike ? 1 : 0
    );
    const navigationMistakes = Math.max(
      gameState.navigationMistakes || 0,
      gameState.ch1NavMistakes || 0
    );
    const dialogueStrike = dialogueStrikes > 0 ? 1 : 0;
    const navigationStrike = navigationMistakes >= 2 ? 1 : 0;
    return Math.min(dialogueStrike + navigationStrike, 2);
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

  function getChapter1TagebuchIsChallenge() {
    const dialogueStrikes = Math.max(
      Number(gameState.dialogueStrikes) || 0,
      gameState.ch1DialogueStrike ? 1 : 0
    );
    const navigationMistakes = Math.max(
      Number(gameState.navigationMistakes) || 0,
      Number(gameState.ch1NavMistakes) || 0
    );
    gameState.dialogueStrikes = dialogueStrikes;
    gameState.navigationMistakes = navigationMistakes;
    return dialogueStrikes > 0 || navigationMistakes >= 2;
  }

  function getTagebuchVariant(chapterNumber, strikes) {
    const content = TAGEBUCH_CONTENT[chapterNumber] || TAGEBUCH_CONTENT[1];
    const isChallenging =
      chapterNumber === 1
        ? getChapter1TagebuchIsChallenge()
        : chapterNumber === 2
          ? strikes > 0
          : chapterNumber === 3
            ? strikes > 1
            : strikes >= 2;
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
    4: { label: "Chapter 5: Epilog", nodeId: "chapter_6_title" },
  };

  function goToNextChapterOrMenu(completedChapter) {
    removeTagebuchScreen();
    resetGameState();

    const next = NEXT_CHAPTER_MAP[completedChapter];
    if (next) {
      hideGameplayScene();
      setBackground("black");
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
    closeEtiquetteGame();
    closeAisleGame();
    closeCashierGame();
    closeCh1PppPractice();
    closeHotelNavGame();
    closeCh1ReviewThought();
    removeCelebrationScreen();
    removeTagebuchScreen();

    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    const strikes = getChapterStrikeCount(chapterNumber);
    if (chapterNumber === 3) {
      console.log("Evaluating Chapter 3 Tagebuch with total strikes:", getChapter3Strikes());
    }
    const variant =
      chapterNumber === 3
        ? getTagebuchVariant(3, getChapter3Strikes())
        : chapterNumber === 1
          ? getTagebuchVariant(1, strikes)
          : getTagebuchVariant(chapterNumber, strikes);

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
    const englishItalic = document.createElement("i");
    englishItalic.textContent = variant.english;
    englishText.appendChild(englishItalic);
    card.appendChild(englishText);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tagebuch-card__button";

    if (chapterNumber === 5) {
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
    cardEl.draggable = true;

    cardEl.addEventListener("dragstart", (event) => {
      if (meldezettel.tutorialOpen) {
        event.preventDefault();
        return;
      }
      meldezettel.dragCardId = card.id;
      meldezettel.suppressClick = true;
      event.dataTransfer.setData("text/plain", card.id);
      event.dataTransfer.effectAllowed = "move";
      cardEl.classList.add("is-dragging");
    });

    cardEl.addEventListener("dragend", () => {
      cardEl.classList.remove("is-dragging");
      meldezettel.dragCardId = null;
      window.setTimeout(() => {
        meldezettel.suppressClick = false;
      }, 0);
    });

    cardEl.addEventListener("click", (event) => {
      event.stopPropagation();
      if (meldezettel.tutorialOpen || meldezettel.suppressClick) return;

      if (inField) {
        if (meldezettel.selectedCardId && meldezettel.selectedCardId !== card.id) {
          placeCard(meldezettel.selectedCardId, card.location);
        } else {
          returnCardToPool(card.id);
        }
        return;
      }

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

      fieldEl.addEventListener("dragover", (event) => {
        if (meldezettel.tutorialOpen || card?.locked) return;
        event.preventDefault();
        fieldEl.classList.add("is-droppable");
      });

      fieldEl.addEventListener("dragleave", () => {
        if (!meldezettel.selectedCardId) fieldEl.classList.remove("is-droppable");
      });

      fieldEl.addEventListener("drop", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (meldezettel.tutorialOpen || card?.locked) return;
        const cardId = event.dataTransfer.getData("text/plain") || meldezettel.dragCardId;
        if (cardId) placeCard(cardId, field.id);
      });

      fieldEl.addEventListener("click", () => {
        if (meldezettel.tutorialOpen || meldezettel.suppressClick) return;
        if (card?.locked) return;
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
    els.meldezettelPool.addEventListener("dragover", (event) => {
      if (meldezettel.tutorialOpen) return;
      event.preventDefault();
    });
    els.meldezettelPool.addEventListener("drop", (event) => {
      event.preventDefault();
      if (meldezettel.tutorialOpen) return;
      const cardId = event.dataTransfer.getData("text/plain") || meldezettel.dragCardId;
      if (cardId) returnCardToPool(cardId);
    });
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

      const nextNodeId = getMeldezettelOutcomeNode();
      setTimeout(() => {
        closeMeldezettelGame();
        goToNode(nextNodeId);
      }, 1500);
    } else {
      gameState.meldezettelErrors += incorrectCount;
      gameState.meldezettelMistakes = gameState.meldezettelErrors;
      if (gameState.meldezettelErrors >= MELDEZETTEL_MISTAKE_THRESHOLD) {
        gameState.meldezettelStrike = 1;
      }
      meldezettel.cards = shuffleArray(meldezettel.cards);
      meldezettel.message = "Entschuldigung, aber ich glaube, da ist ein Fehler im Formular. Bitte prüfen Sie das noch einmal.";
      meldezettel.messageType = "error";
      renderMeldezettel();
    }
  }

  function skipMeldezettelForDev(mistakeCount) {
    if (!meldezettel.active) return;

    gameState.meldezettelErrors = mistakeCount;
    gameState.meldezettelMistakes = mistakeCount;
    gameState.meldezettelStrike = mistakeCount >= MELDEZETTEL_MISTAKE_THRESHOLD ? 1 : 0;
    meldezettel.tutorialOpen = false;

    closeMeldezettelGame();
    goToNode(getMeldezettelOutcomeNode());
  }

  function getMeldezettelOutcomeNode() {
    if (gameState.meldezettelStrike === 1) {
      return MELDEZETTEL_UNCERTAIN_NODE;
    }
    return meldezettel.onSuccessNodeId || MELDEZETTEL_SUCCESS_NODE;
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
    title.textContent = "Meldezettel";
    panel.appendChild(title);

    const intro = document.createElement("p");
    intro.className = "meldezettel-tutorial__text";
    intro.textContent = "Fill out the registration form with Lena's personal details.";
    panel.appendChild(intro);

    const startBtn = document.createElement("button");
    startBtn.type = "button";
    startBtn.className = "meldezettel-tutorial__start";
    startBtn.textContent = "Start";
    startBtn.addEventListener("click", closeMeldezettelTutorial);
    panel.appendChild(startBtn);

    tutorial.appendChild(panel);
    els.meldezettelOverlay.appendChild(tutorial);
  }

  // ── Ticketautomat mini-game ───────────────────────────────────────────────

  function ticketMachineControlsEnabled() {
    return ticketMachine.active && !ticketMachine.helpOpen && !ticketMachine.errorOpen;
  }

  function appendHintSegments(parent, segments) {
    segments.forEach((segment) => {
      if (segment.strong) {
        const strong = document.createElement("strong");
        strong.textContent = segment.text;
        parent.appendChild(strong);
        return;
      }
      parent.appendChild(document.createTextNode(segment.text));
    });
  }

  function showTicketMachineHint() {
    if (!ticketMachine.active || !els.ticketMachineHintOverlay) return;
    ticketMachine.helpOpen = true;
    if (els.ticketMachineHintText) {
      els.ticketMachineHintText.replaceChildren();
      const list = document.createElement("div");
      list.className = "ticket-machine-hint__rows";

      TICKET_MACHINE_HINT_ROWS.forEach((row) => {
        const card = document.createElement("article");
        card.className = "ticket-machine-hint__row";

        const icon = document.createElement("span");
        icon.className = "ticket-machine-hint__icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = row.icon;

        const body = document.createElement("div");
        body.className = "ticket-machine-hint__content";

        const label = document.createElement("p");
        label.className = "ticket-machine-hint__label";
        label.textContent = row.label;

        const copy = document.createElement("p");
        copy.className = "ticket-machine-hint__copy";
        appendHintSegments(copy, row.segments);

        body.appendChild(label);
        body.appendChild(copy);
        card.appendChild(icon);
        card.appendChild(body);
        list.appendChild(card);
      });

      els.ticketMachineHintText.appendChild(list);
    }
    els.ticketMachineHintOverlay.hidden = false;
  }

  function closeTicketMachineHint() {
    if (!els.ticketMachineHintOverlay) return;
    ticketMachine.helpOpen = false;
    els.ticketMachineHintOverlay.hidden = true;
  }

  function getChapter3Strikes() {
    const stored = gameState.chapter3Strikes;
    const fallback = gameState.ch3Strikes;
    const value = stored == null ? fallback : stored;
    const n = Number(value);
    if (!Number.isFinite(n) || n < 0) return 0;
    return Math.min(n, CHAPTER3_MAX_STRIKES);
  }

  function addChapter3Strike() {
    const next = Math.min(getChapter3Strikes() + 1, CHAPTER3_MAX_STRIKES);
    gameState.chapter3Strikes = next;
    gameState.ch3Strikes = next;
    console.log("Chapter 3 Strike added! Total strikes:", gameState.chapter3Strikes);
    return next;
  }

  function applyTicketMachineStrikeOnce() {
    if (ticketMachine.chapterStrikeApplied) return;
    ticketMachine.chapterStrikeApplied = true;
    addChapter3Strike();
  }

  function showTicketMachineError(message) {
    ticketMachine.mistakes += 1;
    if (ticketMachine.mistakes === 1) {
      ticketMachine.pendingHint = true;
    }
    if (ticketMachine.mistakes >= 2) {
      applyTicketMachineStrikeOnce();
    }
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
    if (ticketMachine.pendingHint) {
      ticketMachine.pendingHint = false;
      showTicketMachineHint();
      return;
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
    if (ticketMachine.mistakes >= 1) {
      applyTicketMachineStrikeOnce();
    }
    const completedSuccessfully = ticketMachine.mistakes < TICKET_MACHINE_MISTAKE_THRESHOLD;

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
    const recordedMistakes = Math.max(ticketMachine.mistakes || 0, mistakeCount || 0);
    completeTicketMachine(recordedMistakes);
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
    ticketMachine.pendingHint = false;
    ticketMachine.chapterStrikeApplied = false;

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
    const live = document.getElementById("rules-game-live");
    if (live) {
      live.textContent = `${rulesGame.matchedCount} of ${CHURCH_RULES_PAIRS.length} rules matched.`;
    }
  }

  function addChapter4Strike() {
    gameState.ch4Strikes = Math.min((gameState.ch4Strikes || 0) + 1, 3);
    console.log("Chapter 4 Strike added! Total strikes:", gameState.ch4Strikes);
  }

  function finishRulesGame() {
    const mistakes = rulesGame.mistakes;
    closeRulesGame();

    let outcomeNodeId = "ch4_rules_perfect";
    if (mistakes >= RULES_GAME_MISTAKE_THRESHOLD) {
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
      addChapter4Strike();
      updateRulesGameStatus();

      const shake = (el) => {
        if (!el) return;
        el.classList.remove("is-wrong");
        void el.offsetWidth;
        el.classList.add("is-wrong");
        window.setTimeout(() => el.classList.remove("is-wrong"), 450);
      };
      shake(meaningBtn);
      shake(selectedRuleBtn);

      selectedRuleBtn.classList.remove("is-selected");
      selectedRuleBtn.setAttribute("aria-pressed", "false");
      rulesGame.selectedRuleId = null;
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

    const header = document.createElement("header");
    header.className = "rules-game__header";

    const title = document.createElement("h2");
    title.id = "rules-game-title";
    title.className = "rules-game__title";
    title.textContent = "VERHALTENSREGELN IM STEPHANSDOM";
    header.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.className = "rules-game__subtitle";
    subtitle.textContent = "Visitor Etiquette / Visitors' Rules";
    header.appendChild(subtitle);
    panel.appendChild(header);

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

    const live = document.createElement("p");
    live.id = "rules-game-live";
    live.className = "rules-game__live";
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "polite");
    panel.appendChild(live);

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
      while ((gameState.ch4Strikes || 0) < 3) addChapter4Strike();
      finishRulesGame();
    });
    devControls.appendChild(devFailBtn);

    panel.appendChild(devControls);

    overlay.appendChild(panel);
    els.game.appendChild(overlay);
    updateRulesGameStatus();
  }

  // ── Erlaubt vs. Verboten etiquette mini-game ─────────────────────────────

  const etiquetteGame = {
    active: false,
    roundIndex: 0,
    solved: {},
    locked: false,
  };

  function closeEtiquetteGame() {
    etiquetteGame.active = false;
    etiquetteGame.locked = false;
    document.getElementById("etiquette-game")?.remove();
  }

  function addChapter5Strike() {
    gameState.chapter5Strikes = (gameState.chapter5Strikes || 0) + 1;
    addChapter4Strike();
    console.log("Chapter 5 Strike added! Total strikes:", gameState.chapter5Strikes);
  }

  function finishEtiquetteGame() {
    closeEtiquetteGame();
    goToNode(ETIQUETTE_GAME_SUCCESS_NODE);
  }

  function setEtiquetteFeedback(overlay, text, kind) {
    const feedback = overlay.querySelector("#etiquette-game-feedback");
    if (!feedback) return;
    feedback.textContent = text || "";
    feedback.className = `etiquette-game__feedback${kind ? ` is-${kind}` : ""}`;
  }

  function currentEtiquetteRound() {
    return etiquetteGame.rules || [];
  }

  function isEtiquetteRoundComplete() {
    return currentEtiquetteRound().every((rule) => etiquetteGame.solved[rule.id]);
  }

  function fillEtiquetteList(list, rules, overlay) {
    list.innerHTML = "";
    rules.forEach((rule) => {
      const row = document.createElement("div");
      row.className = "etiquette-game__row";
      row.dataset.ruleId = rule.id;

      const text = document.createElement("p");
      text.className = "etiquette-game__rule";
      text.textContent = rule.text;
      row.appendChild(text);

      const toggles = document.createElement("div");
      toggles.className = "etiquette-game__toggles";
      toggles.setAttribute("role", "group");
      toggles.setAttribute("aria-label", rule.text);

      ["erlaubt", "verboten"].forEach((choice) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `etiquette-game__toggle etiquette-game__toggle--${choice}`;
        btn.dataset.choice = choice;
        btn.innerHTML =
          choice === "erlaubt"
            ? `<span class="etiquette-game__badge" aria-hidden="true">✓</span><span>Erlaubt</span>`
            : `<span class="etiquette-game__badge" aria-hidden="true">✕</span><span>Verboten</span>`;
        btn.addEventListener("click", () => handleEtiquetteChoice(rule, choice, btn, overlay));
        toggles.appendChild(btn);
      });

      row.appendChild(toggles);
      list.appendChild(row);
    });
  }

  function renderEtiquetteRound(overlay) {
    const list = overlay.querySelector("#etiquette-game-list");
    const roundLabel = overlay.querySelector("#etiquette-game-round");
    const title = overlay.querySelector("#etiquette-game-title");
    if (!list) return;

    const roundNumber = etiquetteGame.roundIndex + 1;
    if (roundLabel) roundLabel.textContent = `ROUND ${roundNumber} / ${ETIQUETTE_ROUNDS.length}`;
    if (title) title.textContent = "Erlaubt oder Verboten?";

    etiquetteGame.solved = {};
    etiquetteGame.locked = false;
    etiquetteGame.rules = currentEtiquetteRoundFromIndex();
    etiquetteGame.onComplete = () => {
      if (etiquetteGame.roundIndex < ETIQUETTE_ROUNDS.length - 1) {
        etiquetteGame.roundIndex += 1;
        renderEtiquetteRound(overlay);
        return;
      }
      finishEtiquetteGame();
    };
    fillEtiquetteList(list, etiquetteGame.rules, overlay);
    setEtiquetteFeedback(overlay, "Choose ALLOWED or FORBIDDEN for each rule.", "");
  }

  function currentEtiquetteRoundFromIndex() {
    return ETIQUETTE_ROUNDS[etiquetteGame.roundIndex] || [];
  }

  function handleEtiquetteChoice(rule, choice, btn, overlay) {
    if (!etiquetteGame.active || etiquetteGame.locked) return;
    if (etiquetteGame.solved[rule.id]) return;

    const row = overlay.querySelector(`.etiquette-game__row[data-rule-id="${rule.id}"]`);
    if (!row) return;

    if (choice === rule.answer) {
      etiquetteGame.solved[rule.id] = true;
      row.classList.add("is-solved");
      row.querySelectorAll(".etiquette-game__toggle").forEach((toggle) => {
        toggle.disabled = true;
        toggle.classList.toggle("is-correct", toggle === btn);
        toggle.classList.toggle("is-idle", toggle !== btn);
      });
      setEtiquetteFeedback(overlay, "Richtig!", "correct");

      if (isEtiquetteRoundComplete()) {
        etiquetteGame.locked = true;
        setEtiquetteFeedback(overlay, "Richtig!", "correct");
        window.setTimeout(() => {
          if (!etiquetteGame.active) return;
          etiquetteGame.onComplete?.();
        }, 650);
      }
      return;
    }

    addChapter5Strike();
    btn.classList.remove("is-wrong");
    void btn.offsetWidth;
    btn.classList.add("is-wrong");
    row.classList.remove("is-shake");
    void row.offsetWidth;
    row.classList.add("is-shake");
    setEtiquetteFeedback(overlay, "Noch einmal versuchen. / Try again.", "wrong");
    window.setTimeout(() => {
      btn.classList.remove("is-wrong");
      row.classList.remove("is-shake");
    }, 450);
  }

  function openEtiquetteGame() {
    closeEtiquetteGame();
    etiquetteGame.active = true;
    etiquetteGame.roundIndex = 0;
    etiquetteGame.solved = {};
    etiquetteGame.locked = false;

    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    const overlay = document.createElement("div");
    overlay.id = "etiquette-game";
    overlay.className = "etiquette-game";

    const panel = document.createElement("section");
    panel.className = "etiquette-game__panel";
    panel.setAttribute("aria-labelledby", "etiquette-game-title");

    const round = document.createElement("p");
    round.id = "etiquette-game-round";
    round.className = "etiquette-game__round";
    panel.appendChild(round);

    const title = document.createElement("h2");
    title.id = "etiquette-game-title";
    title.className = "etiquette-game__title";
    panel.appendChild(title);

    const instruction = document.createElement("p");
    instruction.className = "etiquette-game__instruction";
    instruction.textContent = "Is this allowed or forbidden in Stephansdom?";
    panel.appendChild(instruction);

    const list = document.createElement("div");
    list.id = "etiquette-game-list";
    list.className = "etiquette-game__list";
    panel.appendChild(list);

    const feedback = document.createElement("p");
    feedback.id = "etiquette-game-feedback";
    feedback.className = "etiquette-game__feedback";
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    panel.appendChild(feedback);

    const devControls = document.createElement("div");
    devControls.className = "etiquette-game__dev";
    const devSkip = document.createElement("button");
    devSkip.type = "button";
    devSkip.textContent = "Dev: Skip";
    devSkip.addEventListener("click", finishEtiquetteGame);
    devControls.appendChild(devSkip);
    panel.appendChild(devControls);

    overlay.appendChild(panel);
    els.game.appendChild(overlay);
    renderEtiquetteRound(overlay);
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

  // ── Chapter 1 PPP grammar practice ───────────────────────────────────────
  // Practice mini-game mistakes never increment strikes. Wrong spoken W-Fragen
  // after practice (hotel / U-Bahn) do add a strike, then replay the choices.

  const ch1Ppp = {
    active: false,
    step: 1,
    sentenceIndex: 0,
    blankIndex: 0,
    scenarioIndex: 0,
    selected: [],
    matchedCount: 0,
    selectedPairId: null,
    locked: false,
    pendingAdvance: null,
    matchTimer: null,
    triggerNode: CH1_PPP_TRIGGER_NODE,
    matchSetIndex: 0,
    flowIndex: 0,
  };

  const hotelNav = {
    active: false,
    locked: false,
    hintOpen: false,
  };

  function tokensMatch(a, b) {
    return a.length === b.length && a.every((token, index) => token === b[index]);
  }

  function sentenceTokensMatch(selected, correct) {
    if (!Array.isArray(selected) || !Array.isArray(correct) || selected.length !== correct.length) {
      return false;
    }
    return selected.every(
      (token, index) =>
        String(token).toLocaleLowerCase("de-DE") === String(correct[index]).toLocaleLowerCase("de-DE")
    );
  }

  function shuffledUntilUnaligned(left, items) {
    let shuffled = shuffledUntilDifferent(items);
    let guard = 0;
    while (
      left.length === shuffled.length &&
      left.some((pair, index) => pair.id === shuffled[index].id) &&
      guard < 20
    ) {
      shuffled = shuffleArray(items);
      guard += 1;
    }
    return shuffled;
  }

  function shuffledUntilDifferent(items) {
    if (items.length < 2) return items.slice();
    let shuffled = shuffleArray(items);
    let guard = 0;
    while (tokensMatch(shuffled, items) && guard < 12) {
      shuffled = shuffleArray(items);
      guard += 1;
    }
    return shuffled;
  }

  function getPppPack() {
    return PPP_PACKS[ch1Ppp.triggerNode] || PPP_PACKS.ch1_ppp_practice;
  }

  function getPppFlow() {
    const flow = getPppPack().flow;
    return Array.isArray(flow) ? flow : null;
  }

  function getPppFlowItem() {
    const flow = getPppFlow();
    if (!flow) return null;
    return flow[ch1Ppp.flowIndex] || null;
  }

  function getPppStepCount() {
    return getPppFlow()?.length || 5;
  }

  function getPppExerciseTitle() {
    const item = getPppFlowItem();
    if (item?.title) return item.title;
    const pack = getPppPack();
    if (ch1Ppp.step === 1) return pack.step1Title || "";
    if (ch1Ppp.step === 2) return pack.step2Title || "";
    if (ch1Ppp.step === 3) return pack.step3Title || "";
    if (ch1Ppp.step === 4) return pack.step4Title || "";
    if (ch1Ppp.step === 5) return pack.step5Title || "";
    return "";
  }

  function getPppSentenceTasks() {
    const item = getPppFlowItem();
    if (item?.type === "sentences") return item.tasks || [];
    return getPppPack().sentences || [];
  }

  function startPppPractice(overlay) {
    if (getPppFlow()) {
      renderPppFlow(overlay);
      return;
    }
    renderCh1PppStep1(overlay);
  }

  function renderPppEtiquette(overlay, item, onComplete) {
    const ui = getCh1PppShell(overlay);
    etiquetteGame.active = true;
    etiquetteGame.solved = {};
    etiquetteGame.locked = false;
    etiquetteGame.rules = item.rules || [];
    etiquetteGame.onComplete = onComplete;
    ch1Ppp.locked = false;

    updateCh1PppProgress(overlay);
    ui.title.textContent = item.title || "";
    setCh1PppInstruction(overlay, item.instruction || "");
    ui.body.hidden = false;
    ui.body.innerHTML = "";
    ui.result.hidden = true;
    ui.checkBtn.hidden = true;

    const list = document.createElement("div");
    list.id = "etiquette-game-list";
    list.className = "etiquette-game__list";
    fillEtiquetteList(list, etiquetteGame.rules, overlay);
    ui.body.appendChild(list);

    const feedback = document.createElement("p");
    feedback.id = "etiquette-game-feedback";
    feedback.className = "etiquette-game__feedback";
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    ui.body.appendChild(feedback);
    setEtiquetteFeedback(overlay, "", "");
  }

  function renderPppFlow(overlay) {
    const flow = getPppFlow();
    if (!flow) {
      renderCh1PppStep1(overlay);
      return;
    }
    if (ch1Ppp.flowIndex >= flow.length) {
      if (getPppPack().skipDoneScreen) {
        finishCh1PppPractice();
        return;
      }
      showCh1PppSuccess(overlay);
      return;
    }
    const item = flow[ch1Ppp.flowIndex];
    ch1Ppp.step = ch1Ppp.flowIndex + 1;

    if (item.type === "matching") {
      renderCh1PppMatching(overlay, item.pairs, {
        title: item.title || "",
        instruction: item.instruction || "",
        shuffleLeft: !!item.shuffleLeft,
        clearOnMatch: !!item.clearOnMatch,
        onComplete: () => {
          ch1Ppp.flowIndex += 1;
          ch1Ppp.sentenceIndex = 0;
          renderPppFlow(overlay);
        },
      });
      return;
    }

    if (item.type === "etiquette") {
      renderPppEtiquette(overlay, item, () => {
        ch1Ppp.flowIndex += 1;
        ch1Ppp.sentenceIndex = 0;
        renderPppFlow(overlay);
      });
      return;
    }

    if (item.type === "blanks") {
      if (ch1Ppp.sentenceIndex >= (item.tasks || []).length) {
        ch1Ppp.sentenceIndex = 0;
        ch1Ppp.flowIndex += 1;
        renderPppFlow(overlay);
        return;
      }
      renderCh1PppStep2Blank(overlay);
      return;
    }

    if (item.type === "sentences") {
      if (ch1Ppp.sentenceIndex >= (item.tasks || []).length) {
        ch1Ppp.sentenceIndex = 0;
        ch1Ppp.flowIndex += 1;
        renderPppFlow(overlay);
        return;
      }
      renderCh1PppSentence(overlay);
    }
  }

  function saveChapter1PppVocab() {
    const pack = getPppPack();
    const list = VOCABULARY_DATA[pack.vocabChapter] || VOCABULARY_DATA.chapter1;
    pack.vocab.forEach((entry) => {
      const exists = list.some((item) => item.german === entry.german);
      if (!exists) list.push(entry);
    });

    if (pack.vocabFlag === "chapter1Ppp") gameState.ch1PppVocabUnlocked = true;
    try {
      const raw = localStorage.getItem(VOCAB_UNLOCK_STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : {};
      stored[pack.vocabFlag] = true;
      localStorage.setItem(VOCAB_UNLOCK_STORAGE_KEY, JSON.stringify(stored));
    } catch (error) {
      console.warn("Unable to save practice vocabulary:", error);
    }
  }

  function closeCh1PppPractice() {
    ch1Ppp.active = false;
    ch1Ppp.locked = false;
    ch1Ppp.pendingAdvance = null;
    etiquetteGame.active = false;
    etiquetteGame.locked = false;
    if (ch1Ppp.matchTimer) {
      window.clearTimeout(ch1Ppp.matchTimer);
      ch1Ppp.matchTimer = null;
    }
    document.getElementById("ch1-ppp")?.remove();
  }

  function setCh1PppInstruction(overlay, text) {
    const instruction = overlay.querySelector("#ch1-ppp-instruction");
    if (!instruction) return;
    instruction.textContent = text || "";
    instruction.hidden = !text;
  }

  function getCh1PppShell(overlay) {
    return {
      title: overlay.querySelector("#ch1-ppp-title"),
      progress: overlay.querySelector("#ch1-ppp-progress"),
      subprogress: overlay.querySelector("#ch1-ppp-subprogress"),
      instruction: overlay.querySelector("#ch1-ppp-instruction"),
      body: overlay.querySelector("#ch1-ppp-body"),
      result: overlay.querySelector("#ch1-ppp-result"),
      resultLabel: overlay.querySelector("#ch1-ppp-result-label"),
      resultText: overlay.querySelector("#ch1-ppp-result-text"),
      continueBtn: overlay.querySelector("#ch1-ppp-continue"),
      checkBtn: overlay.querySelector("#ch1-ppp-check"),
    };
  }

  function updateCh1PppProgress(overlay) {
    const { progress } = getCh1PppShell(overlay);
    if (!progress) return;
    const total = getPppStepCount();
    const current = Math.min(Math.max(ch1Ppp.step, 1), total);
    progress.textContent = `EXERCISE ${current} / ${total}`;
  }

  function updateCh1PppSubprogress(overlay) {
    const { subprogress } = getCh1PppShell(overlay);
    if (!subprogress) return;
    subprogress.hidden = true;
    subprogress.textContent = "";
  }

  function hideCh1PppResult(overlay) {
    const ui = getCh1PppShell(overlay);
    ui.result.hidden = true;
    ui.body.hidden = false;
    ch1Ppp.locked = false;
  }

  function showCh1PppResult(overlay, { correct, title, text, onContinue }) {
    const ui = getCh1PppShell(overlay);
    ch1Ppp.locked = true;
    ui.body.hidden = false;
    ui.checkBtn.hidden = true;
    ui.result.hidden = false;
    ui.result.className = `ch1-ppp__result ${correct ? "is-correct" : "is-wrong"}`;
    ui.resultLabel.textContent = title;
    ui.resultText.textContent = text || "";
    ui.resultText.hidden = !text;
    ui.continueBtn.textContent = correct ? "Continue" : "Retry";
    ui.continueBtn.onclick = () => {
      hideCh1PppResult(overlay);
      onContinue();
    };
  }

  function finishCh1PppPractice() {
    saveChapter1PppVocab();
    closeCh1PppPractice();
    closeHotelNavGame();
    goToNode(getPppPack().successNode);
    pulseVocabButton();
  }

  function showCh1PppSuccess(overlay) {
    const pack = getPppPack();
    const ui = getCh1PppShell(overlay);
    ch1Ppp.step = getPppStepCount();
    updateCh1PppProgress(overlay);
    updateCh1PppSubprogress(overlay, 0, 0);
    ui.title.textContent = "";
    setCh1PppInstruction(overlay, "");
    ui.body.hidden = false;
    ui.body.innerHTML = "";
    ui.result.hidden = true;
    ui.checkBtn.hidden = true;

    const doneTitle = pack.doneTitle || "";
    if (doneTitle) {
      const card = document.createElement("div");
      card.className = "ch1-ppp__done";
      const title = document.createElement("p");
      title.className = "ch1-ppp__done-title";
      title.textContent = doneTitle;
      card.appendChild(title);
      ui.body.appendChild(card);
    }

    ui.checkBtn.hidden = false;
    ui.checkBtn.disabled = false;
    ui.checkBtn.className = "ch1-ppp__primary";
    ui.checkBtn.textContent = pack.doneButton || "Continue";
    ui.checkBtn.onclick = finishCh1PppPractice;
    const dev = overlay.querySelector(".ch1-ppp__dev");
    if (dev) dev.hidden = true;
  }

  function getPppMatching1Sets() {
    const matching = getPppPack().matching1 || [];
    if (!matching.length) return [];
    return Array.isArray(matching[0]) ? matching : [matching];
  }

  function renderCh1PppMatching(overlay, pairs, {
    title,
    instruction,
    wrongText,
    onComplete,
    trackPairSubprogress = true,
    shuffleLeft = false,
    clearOnMatch = false,
  }) {
    const ui = getCh1PppShell(overlay);
    ch1Ppp.matchedCount = 0;
    ch1Ppp.selectedPairId = null;
    ch1Ppp.locked = false;
    updateCh1PppProgress(overlay);
    if (trackPairSubprogress) {
      updateCh1PppSubprogress(overlay, 1, pairs.length);
    }

    ui.title.textContent = title;
    setCh1PppInstruction(overlay, instruction);
    ui.body.hidden = false;
    ui.body.innerHTML = "";
    ui.result.hidden = true;
    ui.checkBtn.hidden = true;

    const grid = document.createElement("div");
    grid.className = "ch1-ppp__match-grid";

    const leftPairs = shuffleLeft ? shuffledUntilDifferent(pairs) : pairs;
    const rightPairs = shuffleLeft
      ? shuffledUntilUnaligned(leftPairs, pairs)
      : shuffledUntilDifferent(pairs);

    const left = document.createElement("div");
    left.className = "ch1-ppp__match-col";
    leftPairs.forEach((pair) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ch1-ppp__pair ch1-ppp__pair--de";
      btn.dataset.pairId = pair.id;
      btn.textContent = pair.german;
      btn.addEventListener("click", () => {
        if (ch1Ppp.locked || btn.classList.contains("is-matched")) return;
        left.querySelectorAll(".is-selected").forEach((el) => el.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        ch1Ppp.selectedPairId = pair.id;
      });
      left.appendChild(btn);
    });

    const right = document.createElement("div");
    right.className = "ch1-ppp__match-col";
    rightPairs.forEach((pair) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ch1-ppp__pair ch1-ppp__pair--en";
      btn.dataset.pairId = pair.id;
      btn.textContent = pair.english;
      btn.addEventListener("click", () => {
        if (ch1Ppp.locked || btn.classList.contains("is-matched")) return;
        const selected = left.querySelector(".ch1-ppp__pair--de.is-selected");
        if (!selected) return;

        if (btn.dataset.pairId === selected.dataset.pairId) {
          selected.classList.remove("is-selected");
          selected.classList.add("is-matched");
          selected.disabled = true;
          btn.classList.add("is-matched");
          btn.disabled = true;
          if (clearOnMatch) {
            window.setTimeout(() => {
              selected.classList.add("is-cleared");
              btn.classList.add("is-cleared");
            }, 280);
          }
          ch1Ppp.selectedPairId = null;
          ch1Ppp.matchedCount += 1;
          if (trackPairSubprogress) {
            updateCh1PppSubprogress(
              overlay,
              Math.min(ch1Ppp.matchedCount + 1, pairs.length),
              pairs.length
            );
          }
          if (ch1Ppp.matchedCount === pairs.length) {
            ch1Ppp.locked = true;
            if (ch1Ppp.matchTimer) window.clearTimeout(ch1Ppp.matchTimer);
            ch1Ppp.matchTimer = window.setTimeout(() => {
              ch1Ppp.matchTimer = null;
              onComplete();
            }, 450);
          }
          return;
        }

        ch1Ppp.locked = true;
        selected.classList.add("is-wrong");
        btn.classList.add("is-wrong");
        window.setTimeout(() => {
          selected.classList.remove("is-wrong", "is-selected");
          btn.classList.remove("is-wrong");
          ch1Ppp.selectedPairId = null;
          ch1Ppp.locked = false;
        }, 450);
      });
      right.appendChild(btn);
    });

    grid.appendChild(left);
    grid.appendChild(right);
    ui.body.appendChild(grid);
  }

  function skipCh1PppCurrentStep(overlay) {
    hideCh1PppResult(overlay);
    if (ch1Ppp.matchTimer) {
      window.clearTimeout(ch1Ppp.matchTimer);
      ch1Ppp.matchTimer = null;
    }
    ch1Ppp.locked = false;
    ch1Ppp.selected = [];
    ch1Ppp.matchedCount = 0;
    ch1Ppp.selectedPairId = null;

    if (getPppFlow()) {
      etiquetteGame.locked = false;
      ch1Ppp.flowIndex += 1;
      ch1Ppp.sentenceIndex = 0;
      renderPppFlow(overlay);
      return;
    }

    if (ch1Ppp.step <= 1) {
      ch1Ppp.matchSetIndex = getPppMatching1Sets().length;
      renderCh1PppStep1(overlay);
      return;
    }

    if (ch1Ppp.step === 2) {
      ch1Ppp.sentenceIndex = getPppStep2Tasks().length;
      renderCh1PppStep2(overlay);
      return;
    }

    if (ch1Ppp.step === 3) {
      if (getPppPack().matching3?.length) {
        renderCh1PppStep4(overlay);
        return;
      }
      ch1Ppp.blankIndex = getPppPack().blanks.length;
      renderCh1PppStep3(overlay);
      return;
    }

    if (ch1Ppp.step === 4) {
      ch1Ppp.scenarioIndex = 0;
      renderCh1PppStep5(overlay);
      return;
    }

    if (ch1Ppp.step === 5) {
      showCh1PppSuccess(overlay);
      return;
    }

    finishCh1PppPractice();
  }

  function renderCh1PppStep1(overlay) {
    const pack = getPppPack();
    const sets = getPppMatching1Sets();
    ch1Ppp.step = 1;
    if (ch1Ppp.matchSetIndex >= sets.length) {
      ch1Ppp.matchSetIndex = 0;
      renderCh1PppStep2(overlay);
      return;
    }
    const multiSet = sets.length > 1;
    renderCh1PppMatching(overlay, sets[ch1Ppp.matchSetIndex], {
      title: pack.step1Title,
      instruction: pack.step1Instruction,
      wrongText: pack.step1Wrong,
      trackPairSubprogress: !multiSet,
      onComplete: () => {
        ch1Ppp.matchSetIndex += 1;
        renderCh1PppStep1(overlay);
      },
    });
    if (multiSet) {
      updateCh1PppSubprogress(overlay, ch1Ppp.matchSetIndex + 1, sets.length);
    }
  }

  function getPppStep2Tasks() {
    const item = getPppFlowItem();
    if (item?.type === "blanks") return item.tasks || [];
    const pack = getPppPack();
    if (Array.isArray(pack.step2Blanks) && pack.step2Blanks.length) return pack.step2Blanks;
    return pack.sentences || [];
  }

  function renderCh1PppStep2(overlay) {
    const pack = getPppPack();
    const tasks = getPppStep2Tasks();
    ch1Ppp.step = 2;
    if (ch1Ppp.sentenceIndex >= tasks.length) {
      ch1Ppp.sentenceIndex = 0;
      renderCh1PppStep3(overlay);
      return;
    }
    if (pack.step2Blanks?.length) {
      renderCh1PppStep2Blank(overlay);
      return;
    }
    renderCh1PppSentence(overlay);
  }

  function splitPppBlankSentence(sentence) {
    const parts = String(sentence || "").split("______");
    return { prefix: parts[0] || "", suffix: parts[1] || "" };
  }

  function renderCh1PppStep2Blank(overlay) {
    const task = getPppStep2Tasks()[ch1Ppp.sentenceIndex];
    const ui = getCh1PppShell(overlay);
    const { prefix, suffix } = splitPppBlankSentence(task.sentence);
    ch1Ppp.locked = false;
    updateCh1PppProgress(overlay);
    updateCh1PppSubprogress(overlay, ch1Ppp.sentenceIndex + 1, getPppStep2Tasks().length);

    ui.title.textContent = getPppExerciseTitle();
    setCh1PppInstruction(overlay, getPppFlowItem()?.instruction || "Choose the modal verb that fits the sentence.");
    ui.body.hidden = false;
    ui.body.innerHTML = "";
    ui.result.hidden = true;
    ui.checkBtn.hidden = true;

    const card = document.createElement("div");
    card.className = "ch1-ppp__card";

    const prompt = document.createElement("p");
    prompt.className = "ch1-ppp__prompt ch1-ppp__prompt--target";
    prompt.textContent = task.prompt;
    card.appendChild(prompt);

    const sentence = document.createElement("p");
    sentence.className = "ch1-ppp__sentence";
    sentence.id = "ch1-ppp-step2-blank";
    sentence.append(prefix);
    const gap = document.createElement("span");
    gap.className = "ch1-ppp__gap";
    gap.textContent = "______";
    sentence.appendChild(gap);
    sentence.append(suffix);
    card.appendChild(sentence);

    const options = document.createElement("div");
    options.className = "ch1-ppp__chips";
    task.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ch1-ppp__chip";
      btn.textContent = option;
      btn.addEventListener("click", () => handleCh1PppStep2Blank(overlay, option, btn));
      options.appendChild(btn);
    });
    card.appendChild(options);
    ui.body.appendChild(card);
  }

  function handleCh1PppStep2Blank(overlay, option, btn) {
    if (ch1Ppp.locked) return;
    const task = getPppStep2Tasks()[ch1Ppp.sentenceIndex];
    const sentence = overlay.querySelector("#ch1-ppp-step2-blank");
    const { prefix, suffix } = splitPppBlankSentence(task.sentence);

    if (option === task.correct) {
      ch1Ppp.locked = true;
      btn.classList.add("is-correct");
      overlay.querySelectorAll(".ch1-ppp__chip").forEach((chip) => {
        chip.disabled = true;
      });
      sentence.replaceChildren();
      sentence.append(prefix);
      const gap = document.createElement("span");
      gap.className = "ch1-ppp__gap is-filled is-correct";
      gap.textContent = option;
      sentence.appendChild(gap);
      sentence.append(suffix);
      scheduleCh1PppAdvance(overlay, () => {
        ch1Ppp.sentenceIndex += 1;
        if (getPppFlow()) renderPppFlow(overlay);
        else renderCh1PppStep2(overlay);
      });
      return;
    }

    btn.classList.add("is-wrong");
    sentence.querySelector(".ch1-ppp__gap")?.classList.add("is-wrong");
    showCh1PppResult(overlay, {
      correct: false,
      title: "Incorrect",
      text: "",
      onContinue: () => renderCh1PppStep2Blank(overlay),
    });
  }

  function renderCh1PppSentence(overlay) {
    const tasks = getPppSentenceTasks();
    const task = tasks[ch1Ppp.sentenceIndex];
    const ui = getCh1PppShell(overlay);
    ch1Ppp.selected = [];
    ch1Ppp.locked = false;
    updateCh1PppProgress(overlay);
    updateCh1PppSubprogress(overlay, ch1Ppp.sentenceIndex + 1, tasks.length);

    ui.title.textContent = getPppExerciseTitle();
    setCh1PppInstruction(overlay, getPppFlowItem()?.instruction || "Form the correct German sentence using proper word order.");
    ui.body.hidden = false;
    ui.body.innerHTML = "";
    ui.result.hidden = true;
    ui.checkBtn.hidden = false;
    ui.checkBtn.disabled = true;
    ui.checkBtn.className = "ch1-ppp__primary";
    ui.checkBtn.textContent = "Check";
    ui.checkBtn.onclick = () => handleCh1PppOrderCheck(overlay);

    const card = document.createElement("div");
    card.className = "ch1-ppp__card";

    const prompt = document.createElement("p");
    prompt.className = "ch1-ppp__prompt ch1-ppp__prompt--target";
    prompt.textContent = task.prompt;
    card.appendChild(prompt);

    const built = document.createElement("div");
    built.className = "ch1-ppp__built";
    built.id = "ch1-ppp-built";
    if (task.endPunct) {
      const row = document.createElement("div");
      row.className = "ch1-ppp__built-row";
      const punct = document.createElement("span");
      punct.className = "ch1-ppp__end-punct";
      punct.setAttribute("aria-hidden", "true");
      punct.textContent = task.endPunct;
      row.appendChild(built);
      row.appendChild(punct);
      card.appendChild(row);
    } else {
      card.appendChild(built);
    }

    const bank = document.createElement("div");
    bank.className = "ch1-ppp__chips";
    const chipTokens = Array.isArray(task.chips) && task.chips.length
      ? task.chips
      : shuffledUntilDifferent([...task.tokens, ...task.distractors]);
    chipTokens.forEach((token) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "ch1-ppp__chip";
      chip.textContent = token;
      chip.addEventListener("click", () => handleCh1PppTokenPick(overlay, chip, token));
      bank.appendChild(chip);
    });
    card.appendChild(bank);
    ui.body.appendChild(card);
  }

  function handleCh1PppTokenPick(overlay, chip, token) {
    if (ch1Ppp.locked || chip.disabled) return;

    ch1Ppp.selected.push(token);
    chip.disabled = true;
    chip.classList.add("is-used");

    const built = overlay.querySelector("#ch1-ppp-built");
    const placed = document.createElement("button");
    placed.type = "button";
    placed.className = "ch1-ppp__chip ch1-ppp__chip--placed";
    placed.textContent = token;
    placed.addEventListener("click", () => {
      if (ch1Ppp.locked) return;
      const index = ch1Ppp.selected.indexOf(token);
      if (index >= 0) ch1Ppp.selected.splice(index, 1);
      placed.remove();
      chip.disabled = false;
      chip.classList.remove("is-used");
      overlay.querySelector("#ch1-ppp-check").disabled = ch1Ppp.selected.length === 0;
    });
    built.appendChild(placed);
    overlay.querySelector("#ch1-ppp-check").disabled = ch1Ppp.selected.length === 0;
  }

  function scheduleCh1PppAdvance(overlay, advance) {
    if (ch1Ppp.matchTimer) window.clearTimeout(ch1Ppp.matchTimer);
    ch1Ppp.matchTimer = window.setTimeout(() => {
      ch1Ppp.matchTimer = null;
      advance();
    }, 450);
  }

  function handleCh1PppOrderCheck(overlay) {
    if (ch1Ppp.locked) return;
    const task = getPppSentenceTasks()[ch1Ppp.sentenceIndex];
    if (sentenceTokensMatch(ch1Ppp.selected, task.correct)) {
      ch1Ppp.locked = true;
      overlay.querySelector("#ch1-ppp-check").hidden = true;
      overlay.querySelectorAll(".ch1-ppp__chip--placed").forEach((chip) => {
        chip.classList.add("is-correct");
        chip.disabled = true;
      });
      overlay.querySelector("#ch1-ppp-built")?.classList.add("is-correct");
      scheduleCh1PppAdvance(overlay, () => advanceCh1PppSentence(overlay));
      return;
    }

    const built = overlay.querySelector("#ch1-ppp-built");
    built.classList.add("is-wrong");
    window.setTimeout(() => built.classList.remove("is-wrong"), 400);
    showCh1PppResult(overlay, {
      correct: false,
      title: "Incorrect",
      text: task.wrongRule || "",
      onContinue: () => renderCh1PppSentence(overlay),
    });
  }

  function advanceCh1PppSentence(overlay) {
    ch1Ppp.sentenceIndex += 1;
    if (getPppFlow()) renderPppFlow(overlay);
    else renderCh1PppStep2(overlay);
  }

  function renderCh1PppStep3(overlay) {
    const pack = getPppPack();
    ch1Ppp.step = 3;
    if (pack.matching3?.length) {
      renderCh1PppMatching(overlay, pack.matching3, {
        title: pack.step3Title,
        instruction: pack.step3Instruction,
        shuffleLeft: true,
        onComplete: () => renderCh1PppStep4(overlay),
      });
      return;
    }
    if (ch1Ppp.blankIndex >= pack.blanks.length) {
      ch1Ppp.blankIndex = 0;
      renderCh1PppStep4(overlay);
      return;
    }
    renderCh1PppWBlank(overlay);
  }

  function isCh1PppWBlankSentenceStart(task) {
    return !String(task?.prefix || "").trim();
  }

  function formatCh1PppWWord(word, sentenceStart) {
    const lower = String(word || "").trim().toLocaleLowerCase("de");
    if (!lower) return "";
    if (!sentenceStart) return lower;
    return lower.charAt(0).toLocaleUpperCase("de") + lower.slice(1);
  }

  function renderCh1PppWBlank(overlay) {
    const task = getPppPack().blanks[ch1Ppp.blankIndex];
    const ui = getCh1PppShell(overlay);
    ch1Ppp.locked = false;
    updateCh1PppProgress(overlay);
    updateCh1PppSubprogress(overlay, ch1Ppp.blankIndex + 1, getPppPack().blanks.length);

    ui.title.textContent = getPppExerciseTitle();
    setCh1PppInstruction(overlay, "");
    ui.body.hidden = false;
    ui.body.innerHTML = "";
    ui.result.hidden = true;
    ui.checkBtn.hidden = true;

    const card = document.createElement("div");
    card.className = "ch1-ppp__card";

    if (task.prompt) {
      const prompt = document.createElement("p");
      prompt.className = "ch1-ppp__prompt ch1-ppp__prompt--target";
      prompt.textContent = task.prompt;
      card.appendChild(prompt);
    }

    const sentence = document.createElement("p");
    sentence.className = "ch1-ppp__sentence";
    sentence.id = "ch1-ppp-wblank-sentence";
    const sentenceStart = isCh1PppWBlankSentenceStart(task);
    const prefix = task.prefix ? `${task.prefix} ` : "";
    sentence.innerHTML = `${prefix}<span class="ch1-ppp__gap">?</span> ${task.suffix}`;
    card.appendChild(sentence);

    const options = document.createElement("div");
    options.className = "ch1-ppp__chips";
    task.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ch1-ppp__chip";
      btn.textContent = formatCh1PppWWord(option, sentenceStart);
      btn.addEventListener("click", () => handleCh1PppWBlank(overlay, option, btn));
      options.appendChild(btn);
    });
    card.appendChild(options);
    ui.body.appendChild(card);
  }

  function handleCh1PppWBlank(overlay, option, btn) {
    if (ch1Ppp.locked) return;
    const task = getPppPack().blanks[ch1Ppp.blankIndex];
    const sentence = overlay.querySelector("#ch1-ppp-wblank-sentence");
    const sentenceStart = isCh1PppWBlankSentenceStart(task);
    const display = formatCh1PppWWord(option, sentenceStart);
    const prefix = task.prefix ? `${task.prefix} ` : "";

    if (formatCh1PppWWord(option, false) === formatCh1PppWWord(task.correct, false)) {
      ch1Ppp.locked = true;
      btn.classList.add("is-correct");
      overlay.querySelectorAll(".ch1-ppp__chip").forEach((chip) => {
        chip.disabled = true;
      });
      sentence.innerHTML = `${prefix}<span class="ch1-ppp__gap is-filled is-correct">${display}</span> ${task.suffix}`;
      scheduleCh1PppAdvance(overlay, () => {
        ch1Ppp.blankIndex += 1;
        renderCh1PppStep3(overlay);
      });
      return;
    }

    btn.classList.add("is-wrong");
    sentence.querySelector(".ch1-ppp__gap")?.classList.add("is-wrong");
    window.setTimeout(() => {
      btn.classList.remove("is-wrong");
      sentence.querySelector(".ch1-ppp__gap")?.classList.remove("is-wrong");
    }, 450);
  }

  function renderCh1PppStep4(overlay) {
    const pack = getPppPack();
    ch1Ppp.step = 4;
    renderCh1PppMatching(overlay, pack.matching2, {
      title: pack.step4Title,
      instruction: pack.step4Instruction,
      onComplete: () => {
        ch1Ppp.scenarioIndex = 0;
        renderCh1PppStep5(overlay);
      },
    });
  }

  function renderCh1PppStep5(overlay) {
    ch1Ppp.step = 5;
    if (ch1Ppp.scenarioIndex >= getPppPack().scenarios.length) {
      ch1Ppp.scenarioIndex = 0;
      showCh1PppSuccess(overlay);
      return;
    }
    renderCh1PppScenario(overlay);
  }

  function renderCh1PppScenario(overlay) {
    const pack = getPppPack();
    const task = pack.scenarios[ch1Ppp.scenarioIndex];
    const ui = getCh1PppShell(overlay);
    ch1Ppp.locked = false;
    updateCh1PppProgress(overlay);
    updateCh1PppSubprogress(overlay);

    ui.title.textContent = getPppExerciseTitle();
    setCh1PppInstruction(overlay, pack.step5Instruction || "");
    ui.body.hidden = false;
    ui.body.innerHTML = "";
    ui.result.hidden = true;
    ui.checkBtn.hidden = true;

    const card = document.createElement("div");
    card.className = "ch1-ppp__card";

    const prompt = document.createElement("p");
    prompt.className = "ch1-ppp__prompt ch1-ppp__prompt--target";
    prompt.textContent = task.prompt;
    card.appendChild(prompt);

    if (task.sentence) {
      const { prefix, suffix } = splitPppBlankSentence(task.sentence);
      const sentence = document.createElement("p");
      sentence.className = "ch1-ppp__sentence";
      sentence.id = "ch1-ppp-scenario-sentence";
      sentence.append(prefix);
      const gap = document.createElement("span");
      gap.className = "ch1-ppp__gap";
      gap.textContent = "______";
      sentence.appendChild(gap);
      sentence.append(suffix);
      card.appendChild(sentence);
    }

    const options = document.createElement("div");
    options.className = "ch1-ppp__scenario-options";
    shuffledUntilDifferent(task.options).forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ch1-ppp__scenario-btn";
      btn.textContent = option;
      btn.addEventListener("click", () => handleCh1PppScenario(overlay, btn, option));
      options.appendChild(btn);
    });
    card.appendChild(options);
    ui.body.appendChild(card);
  }

  function handleCh1PppScenario(overlay, btn, option) {
    if (ch1Ppp.locked) return;
    const task = getPppPack().scenarios[ch1Ppp.scenarioIndex];
    const sentence = overlay.querySelector("#ch1-ppp-scenario-sentence");

    if (option === task.correct) {
      ch1Ppp.locked = true;
      btn.classList.add("is-correct");
      overlay.querySelectorAll(".ch1-ppp__scenario-btn").forEach((chip) => {
        chip.disabled = true;
      });
      if (task.sentence && sentence) {
        const { prefix, suffix } = splitPppBlankSentence(task.sentence);
        sentence.replaceChildren();
        sentence.append(prefix);
        const gap = document.createElement("span");
        gap.className = "ch1-ppp__gap is-filled is-correct";
        gap.textContent = option;
        sentence.appendChild(gap);
        sentence.append(suffix);
      }
      const ui = getCh1PppShell(overlay);
      ui.checkBtn.hidden = false;
      ui.checkBtn.disabled = false;
      ui.checkBtn.className = "ch1-ppp__primary";
      ui.checkBtn.textContent = "Continue";
      ui.checkBtn.onclick = () => {
        ch1Ppp.scenarioIndex += 1;
        renderCh1PppStep5(overlay);
      };
      return;
    }

    btn.classList.add("is-wrong");
    sentence?.querySelector(".ch1-ppp__gap")?.classList.add("is-wrong");
    window.setTimeout(() => {
      btn.classList.remove("is-wrong");
      sentence?.querySelector(".ch1-ppp__gap")?.classList.remove("is-wrong");
    }, 450);
  }

  function openCh1PppPractice() {
    closeCh1PppPractice();
    closeHotelNavGame();
    ch1Ppp.triggerNode = state.nodeId;
    ch1Ppp.active = true;
    ch1Ppp.step = 1;
    ch1Ppp.sentenceIndex = 0;
    ch1Ppp.blankIndex = 0;
    ch1Ppp.scenarioIndex = 0;
    ch1Ppp.matchSetIndex = 0;
    ch1Ppp.flowIndex = 0;
    ch1Ppp.selected = [];
    ch1Ppp.matchedCount = 0;
    ch1Ppp.selectedPairId = null;
    ch1Ppp.locked = false;
    ch1Ppp.pendingAdvance = null;

    clearTypeTimer();
    state.typing = false;
    hideChoices();
    els.dialogueBox.hidden = true;
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    const overlay = document.createElement("div");
    overlay.id = "ch1-ppp";
    overlay.className = "ch1-ppp";

    const panel = document.createElement("section");
    panel.className = "ch1-ppp__panel";
    panel.setAttribute("aria-labelledby", "ch1-ppp-title");

    const progressRow = document.createElement("div");
    progressRow.className = "ch1-ppp__progress-row";

    const progress = document.createElement("p");
    progress.id = "ch1-ppp-progress";
    progress.className = "ch1-ppp__progress";
    progressRow.appendChild(progress);
    panel.appendChild(progressRow);

    const title = document.createElement("h2");
    title.id = "ch1-ppp-title";
    title.className = "ch1-ppp__title";
    panel.appendChild(title);

    const instruction = document.createElement("p");
    instruction.id = "ch1-ppp-instruction";
    instruction.className = "ch1-ppp__instruction";
    panel.appendChild(instruction);

    const body = document.createElement("div");
    body.id = "ch1-ppp-body";
    body.className = "ch1-ppp__body";
    panel.appendChild(body);

    const result = document.createElement("div");
    result.id = "ch1-ppp-result";
    result.className = "ch1-ppp__result";
    result.hidden = true;
    result.innerHTML = `
      <p class="ch1-ppp__result-label" id="ch1-ppp-result-label"></p>
      <p class="ch1-ppp__result-text" id="ch1-ppp-result-text"></p>
      <button type="button" class="ch1-ppp__primary" id="ch1-ppp-continue">Continue</button>
    `;
    panel.appendChild(result);

    const checkBtn = document.createElement("button");
    checkBtn.type = "button";
    checkBtn.id = "ch1-ppp-check";
    checkBtn.className = "ch1-ppp__primary";
    checkBtn.hidden = true;
    panel.appendChild(checkBtn);

    const devControls = document.createElement("div");
    devControls.className = "ch1-ppp__dev";
    const devSkip = document.createElement("button");
    devSkip.type = "button";
    devSkip.textContent = "Dev Skip";
    devSkip.addEventListener("click", () => {
      skipCh1PppCurrentStep(overlay);
    });
    devControls.appendChild(devSkip);
    panel.appendChild(devControls);

    overlay.appendChild(panel);
    els.game.appendChild(overlay);
    startPppPractice(overlay);
  }

  function getHotelNavStepMeta(nodeId) {
    if (nodeId === "start_quiz_transport") {
      return { step: 1, title: "How do you reach the metro from here?" };
    }
    if (nodeId.startsWith("quiz_stop_")) {
      return { step: 2, title: "Which line and stop do you take?" };
    }
    return { step: 3, title: "Where is the hotel when you exit the metro station?" };
  }

  function closeHotelNavGame() {
    hotelNav.active = false;
    hotelNav.locked = false;
    document.getElementById("hotel-nav")?.remove();
  }

  function hideHotelNavStage() {
    els.dialogueBox.hidden = true;
    hideChoices();
    els.npcContainer.style.display = "none";
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");
    hideDirectionHint();
  }

  function setHotelNavHintOpen(overlay, open) {
    hotelNav.hintOpen = open;
    const btn = overlay.querySelector("#hotel-nav-hint-btn");
    const pop = overlay.querySelector("#hotel-nav-hint-pop");
    if (!btn || !pop) return;
    pop.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function fillHotelNavStep(overlay, node) {
    const meta = getHotelNavStepMeta(node.id);
    hotelNav.locked = false;
    overlay.querySelector("#hotel-nav-progress").textContent = `${meta.step} / 3`;
    overlay.querySelector("#hotel-nav-title").textContent = meta.title;
    const prompt = overlay.querySelector("#hotel-nav-prompt");
    prompt.textContent = "";
    prompt.hidden = true;

    const list = overlay.querySelector("#hotel-nav-choices");
    list.innerHTML = "";
    (node.choices || []).forEach((choice) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hotel-nav__choice";
      btn.textContent = choice.text;
      btn.addEventListener("click", () => {
        if (hotelNav.locked) return;
        hotelNav.locked = true;
        selectChoice(choice.text, choice.nextNode);
      });
      list.appendChild(btn);
    });

    setHotelNavHintOpen(overlay, hotelNav.hintOpen);
  }

  function openHotelNavGame(node) {
    closeCh1ReviewThought();
    hotelNav.active = true;
    hideHotelNavStage();
    stopVocabButtonPulse();

    let overlay = document.getElementById("hotel-nav");
    if (!overlay) {
      hotelNav.hintOpen = false;
      overlay = document.createElement("div");
      overlay.id = "hotel-nav";
      overlay.className = "hotel-nav";

      const layout = document.createElement("div");
      layout.className = "hotel-nav__layout";

      const hintCol = document.createElement("div");
      hintCol.className = "hotel-nav__hint-col";

      const hintBtn = document.createElement("button");
      hintBtn.type = "button";
      hintBtn.id = "hotel-nav-hint-btn";
      hintBtn.className = "hotel-nav__hint-btn";
      hintBtn.setAttribute("aria-expanded", "false");
      hintBtn.setAttribute("aria-controls", "hotel-nav-hint-pop");
      hintBtn.innerHTML = '<span aria-hidden="true">💡</span> Hint';
      hintBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setHotelNavHintOpen(overlay, !hotelNav.hintOpen);
      });
      hintCol.appendChild(hintBtn);

      const hintPop = document.createElement("div");
      hintPop.id = "hotel-nav-hint-pop";
      hintPop.className = "hotel-nav__hint-pop";
      hintPop.hidden = true;
      hintPop.setAttribute("role", "tooltip");
      const quote =
        els.directionHintPanel?.querySelector(".direction-hint__quote")?.textContent?.trim() ||
        OLD_MAN_DIRECTIONS;
      hintPop.innerHTML = `
        <p class="hotel-nav__hint-kicker">Viennese Man</p>
        <p class="hotel-nav__hint-quote"></p>
      `;
      hintPop.querySelector(".hotel-nav__hint-quote").textContent = quote;
      hintCol.appendChild(hintPop);

      const panel = document.createElement("section");
      panel.className = "hotel-nav__panel";
      panel.setAttribute("aria-labelledby", "hotel-nav-title");
      panel.innerHTML = `
        <p class="hotel-nav__progress" id="hotel-nav-progress"></p>
        <h2 class="hotel-nav__title" id="hotel-nav-title"></h2>
        <p class="hotel-nav__prompt" id="hotel-nav-prompt"></p>
        <div class="hotel-nav__choices" id="hotel-nav-choices"></div>
      `;

      layout.appendChild(hintCol);
      layout.appendChild(panel);
      overlay.appendChild(layout);
      els.game.appendChild(overlay);
    }

    fillHotelNavStep(overlay, node);
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
    closeEtiquetteGame();
    closeAisleGame();
    closeCashierGame();
    closeCh1PppPractice();
    closeHotelNavGame();
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

  function closeDirectionHintPopup() {
    if (!els.directionHintPanel || !els.directionHintBtn) return;
    els.directionHintPanel.hidden = true;
    els.directionHintBtn.setAttribute("aria-expanded", "false");
  }

  function hideDirectionHint() {
    closeDirectionHintPopup();
    if (els.directionHint) els.directionHint.hidden = true;
  }

  function toggleDirectionHintPopup() {
    if (!els.directionHintPanel || !els.directionHintBtn) return;
    const open = Boolean(els.directionHintPanel.hidden);
    els.directionHintPanel.hidden = !open;
    els.directionHintBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function syncDirectionHint(node) {
    if (!els.directionHint) return;
    if (node?.reviewDirections && !HOTEL_NAV_NODE_IDS.has(node.id)) {
      els.directionHint.hidden = false;
      return;
    }
    hideDirectionHint();
  }

  function renderNode() {
    const node = getNode();
    if (!node) return;
    syncDirectionHint(node);

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

    if (PPP_PACKS[node.id]) {
      removeBlackScreen();
      removeJumpScareFlash();
      setBackground(node.background);
      openCh1PppPractice();
      return;
    }

    if (node.id === CH1_REVIEW_ROUTE_NODE) {
      showCh1ReviewThought(node);
      return;
    }

    if (HOTEL_NAV_NODE_IDS.has(node.id)) {
      removeBlackScreen();
      removeJumpScareFlash();
      setBackground(node.background);
      openHotelNavGame(node);
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
    closeEtiquetteGame();
    closeAisleGame();
    closeCashierGame();
    closeCh1PppPractice();
    closeHotelNavGame();
    closeU3DirectionUi();
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

    const current = getNode();
    if (current?.nextNode && !(getChoicesForCurrentNode(current) || []).length) {
      goToNode(current.nextNode);
      return;
    }

    els.advanceHint.classList.add("is-hidden");
  }

  function applyChapter1NavigationStrike() {
    if ((gameState.ch1NavMistakes || 0) >= 2 && !gameState.ch1NavStrikeApplied) {
      gameState.ch1NavStrikeApplied = true;
      gameState.ch1Strikes = Math.min((gameState.ch1Strikes || 0) + 1, 2);
    }
  }

  function getQuizResultNodeId() {
    const allCorrect =
      gameState.transport === "correct" &&
      gameState.stop === "correct" &&
      gameState.house === "correct";

    gameState.ch1LateArrival = !allCorrect;
    applyChapter1NavigationStrike();
    return allCorrect ? "arrival_success" : "arrival_failure";
  }

  function routeToNode(nodeId) {
    if (nodeId === "ch1_nav_reaction") {
      applyChapter1NavigationStrike();
      goToNode("ch1_nav_reaction");
      return;
    }

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

    if (nodeId === "end_chapter_6") {
      showTagebuchScreen(5);
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
      closeCh1PppPractice();
    closeHotelNavGame();
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
      nextNodeId === "ask_hotel_wrong_wword" ||
      nextNodeId === "ask_hotel_wrong_order"
    ) {
      if (!gameState.ch1DialogueStrike) {
        gameState.ch1DialogueStrike = true;
        gameState.dialogueStrikes = 1;
        gameState.ch1Strikes = Math.min((gameState.ch1Strikes || 0) + 1, 2);
      }
    } else if (
      currentNode === "ch2_reception_greet" &&
      nextNodeId !== "ch2_reception_id"
    ) {
      gameState.dialogueMistakeQ1 = true;
      gameState.receptionistMistake = true;
    } else if (
      currentNode === "ch2_reception_id" &&
      nextNodeId !== "ch2_id_correct"
    ) {
      gameState.dialogueMistakeQ2 = true;
      gameState.receptionistMistake = true;
    } else if (currentNode === "start_quiz_transport") {
      gameState.transport = choiceText === "Geradeaus gehen" ? "correct" : "wrong";
      if (gameState.transport === "wrong") {
        gameState.ch1NavMistakes += 1;
        gameState.navigationMistakes = gameState.ch1NavMistakes;
      }
    } else if (
      currentNode === "quiz_stop_correct_transport" ||
      currentNode === "quiz_stop_wrong_transport"
    ) {
      gameState.stop = choiceText === "U3 bis Neubaugasse" ? "correct" : "wrong";
      if (gameState.stop === "wrong") {
        gameState.ch1NavMistakes += 1;
        gameState.navigationMistakes = gameState.ch1NavMistakes;
      }
    } else if (currentNode.startsWith("quiz_house")) {
      gameState.house = choiceText === "Gegenüber von der Station, neben dem Café" ? "correct" : "wrong";
      if (gameState.house === "wrong") {
        gameState.ch1NavMistakes += 1;
        gameState.navigationMistakes = gameState.ch1NavMistakes;
      }
    } else if (currentNode === "ch3_platform_choice" && nextNodeId === "ch3_platform_wrong") {
      addChapter3Strike();
    } else if (
      currentNode === "ch3_ubahn_thought" &&
      (nextNodeId === "ch3_ubahn_confused" || nextNodeId === "ch3_ubahn_imperfect")
    ) {
      addChapter3Strike();
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
    const isActive = !isCompleted && chapterNumber === lastCompleted + 1;

    if (isCompleted) return "completed";
    if (isActive) return "active";
    return "unlocked";
  }

  function refreshChapterSelectUI() {
    els.chapterCards.forEach((card) => {
      card.classList.remove("chapter-card--locked", "chapter-card--active", "chapter-card--completed", "chapter-card--unlocked");
      card.disabled = false;
      card.removeAttribute("aria-disabled");
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
    5: "chapter_6_title",
  };

  const CHAPTER_LABELS = {
    1: "Chapter 1 - Ankunft",
    2: "Chapter 2 - Check-in",
    3: "Chapter 3 - Unterwegs",
    4: "Chapter 4: Dem Himmel so nah",
    5: "Chapter 5: Epilog",
  };

  function getCurrentChapterNumber() {
    const nodeId = state.nodeId || "";
    if (nodeId.startsWith("ch6_") || nodeId === "chapter_6_title" || nodeId === "end_chapter_6" || nodeId === "journey_complete") {
      return 5;
    }
    if (nodeId.startsWith("ch4_") || nodeId === "chapter_4_title" || nodeId === "end_chapter_4") return 4;
    if (nodeId.startsWith("ch3_") || nodeId === "chapter_3_title" || nodeId === "end_chapter_3") return 3;
    if (
      nodeId.startsWith("ch2_") ||
      nodeId === "chapter_2_teaser" ||
      nodeId === "hotel_lobby_arrival" ||
      nodeId === "ch2_ppp_practice" ||
      nodeId === "end_chapter_2"
    ) {
      return 2;
    }
    return 1;
  }

  function restartCurrentChapter() {
    hideGameplayScene();
    closeMenu();
    removeBlackScreen({ restoreScene: false });
    removeJumpScareFlash();
    removeTagebuchScreen();
    removeCelebrationScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeEtiquetteGame();
    closeAisleGame();
    closeCashierGame();
    closeCh1PppPractice();
    closeHotelNavGame();
    resetGameState();
    setBackground("black");

    const chapterNumber = getCurrentChapterNumber();
    const startNodeId = CHAPTER_START_NODES[chapterNumber] || CHAPTER_START_NODES[1];
    els.chapterLabel.textContent = CHAPTER_LABELS[chapterNumber] || CHAPTER_LABELS[1];
    goToNode(startNodeId);
  }

  function startGame() {
    hideGameplayScene();
    setBackground("black");
    removeBlackScreen({ restoreScene: false });
    removeTagebuchScreen();
    removeCelebrationScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeEtiquetteGame();
    closeAisleGame();
    closeCashierGame();
    closeCh1PppPractice();
    closeHotelNavGame();
    resetGameState();
    gameState.hasSeenVokabelTutorial = false;
    state.nodeId = START_NODE;
    els.chapterLabel.textContent = "Chapter 1 - Ankunft";
    goToNode(START_NODE);
    hideStartMenu();
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
    if (els.vocabPanel) els.vocabPanel.hidden = false;
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
    if (els.vocabPanel) els.vocabPanel.hidden = showTutorial;
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
    closeEtiquetteGame();
    closeAisleGame();
    closeCashierGame();
    closeCh1PppPractice();
    closeHotelNavGame();
    clearTrainerAdvanceTimer();
    vokabeltrainer.active = false;
    if (els.vokabeltrainer) els.vokabeltrainer.hidden = true;
    hideChoices();
    hideDirectionHint();
    stopVocabButtonPulse();
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

    hideGameplayScene();
    setBackground("black");
    closeMenu();
    showStartMainActions();
    removeBlackScreen({ restoreScene: false });
    removeJumpScareFlash();
    removeTagebuchScreen();
    removeCelebrationScreen();
    closeMeldezettelGame();
    closeTicketMachine();
    closeRulesGame();
    closeEtiquetteGame();
    closeAisleGame();
    closeCashierGame();
    closeCh1PppPractice();
    closeHotelNavGame();
    hideDirectionHint();
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
    } else if (targetNodeId === "chapter_6_title") {
      els.chapterLabel.textContent = CHAPTER_LABELS[5];
    }

    goToNode(targetNodeId);
    hideStartMenu();
  }

  function bindEvents() {
    try {
      const raw = localStorage.getItem(VOCAB_UNLOCK_STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : {};
      if (stored.chapter1Ppp) saveChapter1PppVocab();
    } catch (error) {
      console.warn("Unable to restore practice vocabulary:", error);
    }

    els.dialogueBox.addEventListener("click", (event) => {
      if (event.target.closest(".choice-btn, .u3-map-toggle, .u3-platform-board, .u3-line-map, .u3-platform-overlay")) return;
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

      if (u3Direction.mapOpen && event.code === "Escape") {
        event.preventDefault();
        setU3MapOpen(false);
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

      if (hotelNav.active && hotelNav.hintOpen && event.code === "Escape") {
        event.preventDefault();
        const overlay = document.getElementById("hotel-nav");
        if (overlay) setHotelNavHintOpen(overlay, false);
        return;
      }

      if (rulesGame.active || aisleGame.active || cashierGame.active || ch1Ppp.active || hotelNav.active) {
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

      if (!els.directionHintPanel?.hidden) {
        if (event.code === "Escape") {
          event.preventDefault();
          closeDirectionHintPopup();
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
      if (event.target !== els.vocabOverlay) return;
      if (els.vocabTutorial && !els.vocabTutorial.hidden) return;
      closeVocabPanel();
    });
    els.directionHintBtn?.addEventListener("click", toggleDirectionHintPopup);
    els.directionHintClose?.addEventListener("click", closeDirectionHintPopup);
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

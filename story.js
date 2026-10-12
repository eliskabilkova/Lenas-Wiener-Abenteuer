/**
 * Story data for the visual novel.
 * Narrator text and UI labels are in English.
 * Lena's monologues are simple German (A2) with natural fillers and the
 * occasional short English thought. Character dialogue and educational
 * choices are in German.
 */
const storyData = {

  chapter_1_title: {
    id: "chapter_1_title",
    background: "black",
    speaker: "System",
    text: "Kapitel 1: Ankunft",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Kapitel starten", nextNode: "train_intro_1" },
    ],
  },

  // ── Prologue: On the train ────────────────────────────────────────────────

  train_intro_1: {
    id: "train_intro_1",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Wow, ich kann es nicht glauben! Der Zug aus Prag ist fast in Wien. Das ist meine erste Reise ganz allein im Ausland. Ich bin so aufgeregt... aber auch ein bisschen nervös.",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Aus dem Fenster schauen", nextNode: "train_intro_2" },
    ],
  },

  train_intro_2: {
    id: "train_intro_2",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "In der Schule in Prag habe ich viele Jahre Deutsch gelernt. Aber wenn ich wirklich sprechen soll... dann sage ich nichts. Ich habe immer Angst. Und das will ich nicht mehr! Auf dieser Reise muss mein Deutsch nicht perfekt sein. Ich will einfach reden – auch mit Fehlern. Ich will mir selbst zeigen: Ich schaffe das in einer deutschen Stadt. Okay. Es geht los.",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Aus dem Zug aussteigen", nextNode: "start_arrival_excited" },
    ],
  },

  // ── Scene 1: Arrival & vocabulary onboarding ─────────────────────────────

  start_arrival_excited: {
    id: "start_arrival_excited",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena",
    text: "Ich bin in Wien! Okay... deep breath. Tief einatmen... Und los!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "start_vocab_intro" },
    ],
  },

  start_vocab_intro: {
    id: "start_vocab_intro",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ich habe mein Vokabelheft dabei! Wenn ich ein deutsches Wort nicht kenne, schaue ich einfach oben in der Ecke nach. Sehr praktisch!",
    lenaMood: "thoughtful",
    npcImage: "none",
    highlightVocab: true,
    choices: [
      { text: "Weiter", nextNode: "start" },
    ],
  },

  // ── Scene 1b: Asking for directions ──────────────────────────────────────

  start: {
    id: "start",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "So, hier bin ich: Wien Hauptbahnhof! Wow, der ist riesig... Okay, ich schaue auf dem Handy, wo mein Hotel ist...",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Karte auf dem Handy öffnen", nextNode: "start_phone_dead" },
    ],
  },

  start_phone_dead: {
    id: "start_phone_dead",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh nein! Mein Handy ist aus! Der Akku ist leer... Wie finde ich jetzt mein Hotel? Okay, ruhig bleiben. Ich muss jemanden fragen. Wait... wie fragt man auf Deutsch nach dem Weg?",
    lenaMood: "amazed",
    npcImage: "none",
    choices: [
      { text: "Im Bahnhof umsehen", nextNode: "start_see_man" },
    ],
  },

  start_see_man: {
    id: "start_see_man",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Schau, da drüben steht ein älterer Mann! Er sieht nett aus. Okay, ich frage ihn.",
    lenaMood: "normal",
    npcImage: "old_man_neutral.png",
    choices: [
      { text: "Weiter", nextNode: "start_practice_prompt" },
    ],
  },

  start_practice_prompt: {
    id: "start_practice_prompt",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Moment! Zuerst übe ich, was ich sagen will. Dann klappt es bestimmt.",
    lenaMood: "thoughtful",
    npcImage: "old_man_neutral.png",
    choices: [
      {
        text: "Üben / Start Practice",
        nextNode: "ch1_ppp_practice",
        prominent: true,
      },
    ],
  },

  ch1_ppp_practice: {
    id: "ch1_ppp_practice",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena",
    text: "",
    lenaMood: "thoughtful",
    npcImage: "old_man_neutral.png",
    choices: [],
  },

  start_ask_hotel: {
    id: "start_ask_hotel",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, ich habe geübt. Jetzt frage ich den Mann nach dem Weg zum Hotel. Hmm... wie war der Satz noch mal? Egal, ich versuche es einfach.",
    lenaMood: "normal",
    npcImage: "old_man_neutral.png",
    highlightVocab: true,
    choices: [
      { text: "Entschuldigung, wo komme ich zum Hotel 'Wiener Traum'?", nextNode: "ask_hotel_wrong_wword" },
      { text: "Entschuldigung, wie komme ich zum Hotel 'Wiener Traum'?", nextNode: "correct_ask" },
      { text: "Entschuldigung, ich komme wie zum Hotel 'Wiener Traum'?", nextNode: "ask_hotel_wrong_order" },
    ],
  },

  ask_hotel_wrong_wword: {
    id: "ask_hotel_wrong_wword",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Wiener Mann",
    text: "Wie bitte?",
    lenaMood: "unsure",
    npcImage: "old_man_confused.png",
    choices: [
      { text: "Dem Mann antworten", nextNode: "ch1_hotel_apology" },
    ],
  },

  ask_hotel_wrong_order: {
    id: "ask_hotel_wrong_order",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Wiener Mann",
    text: "Wie bitte?",
    lenaMood: "unsure",
    npcImage: "old_man_confused.png",
    choices: [
      { text: "Dem Mann antworten", nextNode: "ch1_hotel_apology" },
    ],
  },

  ch1_hotel_apology: {
    id: "ch1_hotel_apology",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena",
    text: "Entschuldigung, ich versuche es nochmal.",
    thought: "Okay... noch einmal. Komm schon, Lena, du schaffst das!",
    lenaMood: "unsure",
    npcImage: "old_man_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "start_ask_hotel" },
    ],
  },

  correct_ask: {
    id: "correct_ask",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Wiener Mann",
    text: "Guten Tag, kein Problem! Gehen Sie zuerst geradeaus zur U-Bahn. Fahren Sie mit der U3 bis Neubaugasse. Das Hotel ist dort direkt gegenüber von der Station, gleich neben dem Café.",
    lenaMood: "normal",
    npcImage: "old_man_neutral.png",
    choices: [
      { text: "Vielen Dank für die Hilfe! Tschüss!", nextNode: "ch1_phew" },
    ],
  },

  ch1_phew: {
    id: "ch1_phew",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Puh! Das hat geklappt!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Den Weg noch einmal prüfen", nextNode: "ch1_review_route" },
    ],
  },

  ch1_review_route: {
    id: "ch1_review_route",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, ich gehe den Weg noch einmal im Kopf durch. Ich will mich nicht verlaufen!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [],
  },

  // ── Quiz 1: How do you reach the metro? ──────────────────────────────────

  start_quiz_transport: {
    id: "start_quiz_transport",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, erste Frage: Wie komme ich von hier zur U-Bahn?",
    lenaMood: "normal",
    npcImage: "none",
    reviewDirections: true,
    choices: [
      { text: "Nach links gehen", nextNode: "quiz_stop_wrong_transport" },
      { text: "Geradeaus gehen", nextNode: "quiz_stop_correct_transport" },
      { text: "Nach rechts gehen", nextNode: "quiz_stop_wrong_transport" },
    ],
  },

  // ── Quiz 2: Which line and stop? ─────────────────────────────────────────

  quiz_stop_correct_transport: {
    id: "quiz_stop_correct_transport",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und dann? Welche Linie und welche Station nehme ich?",
    lenaMood: "normal",
    npcImage: "none",
    reviewDirections: true,
    choices: [
      { text: "U1 bis Stephansplatz", nextNode: "quiz_house_correct_transport_wrong_stop" },
      { text: "zu Fuß weitergehen", nextNode: "quiz_house_correct_transport_wrong_stop" },
      { text: "U3 bis Neubaugasse", nextNode: "quiz_house_correct_transport_correct_stop" },
    ],
  },

  quiz_stop_wrong_transport: {
    id: "quiz_stop_wrong_transport",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und dann? Welche Linie und welche Station nehme ich?",
    lenaMood: "unsure",
    npcImage: "none",
    reviewDirections: true,
    choices: [
      { text: "U1 bis Stephansplatz", nextNode: "quiz_house_wrong_transport_wrong_stop" },
      { text: "zu Fuß weitergehen", nextNode: "quiz_house_wrong_transport_wrong_stop" },
      { text: "U3 bis Neubaugasse", nextNode: "quiz_house_wrong_transport_correct_stop" },
    ],
  },

  // ── Quiz 3: Where is the hotel? ──────────────────────────────────────────

  quiz_house_correct_transport_correct_stop: {
    id: "quiz_house_correct_transport_correct_stop",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und wo ist das Hotel, wenn ich aus der U-Bahn-Station komme?",
    lenaMood: "normal",
    npcImage: "none",
    reviewDirections: true,
    choices: [
      { text: "Gegenüber von der Station, neben dem Café", nextNode: "ch1_nav_reaction" },
      { text: "Hinter dem Bahnhof", nextNode: "ch1_nav_reaction" },
      { text: "Gegenüber dem Café, neben der Station", nextNode: "ch1_nav_reaction" },
    ],
  },

  quiz_house_correct_transport_wrong_stop: {
    id: "quiz_house_correct_transport_wrong_stop",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und wo ist das Hotel, wenn ich aus der U-Bahn-Station komme?",
    lenaMood: "unsure",
    npcImage: "none",
    reviewDirections: true,
    choices: [
      { text: "Gegenüber von der Station, neben dem Café", nextNode: "ch1_nav_reaction" },
      { text: "Hinter dem Bahnhof", nextNode: "ch1_nav_reaction" },
      { text: "Gegenüber dem Café, neben der Station", nextNode: "ch1_nav_reaction" },
    ],
  },

  quiz_house_wrong_transport_correct_stop: {
    id: "quiz_house_wrong_transport_correct_stop",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und wo ist das Hotel, wenn ich aus der U-Bahn-Station komme?",
    lenaMood: "unsure",
    npcImage: "none",
    reviewDirections: true,
    choices: [
      { text: "Gegenüber von der Station, neben dem Café", nextNode: "ch1_nav_reaction" },
      { text: "Hinter dem Bahnhof", nextNode: "ch1_nav_reaction" },
      { text: "Gegenüber dem Café, neben der Station", nextNode: "ch1_nav_reaction" },
    ],
  },

  quiz_house_wrong_transport_wrong_stop: {
    id: "quiz_house_wrong_transport_wrong_stop",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und wo ist das Hotel, wenn ich aus der U-Bahn-Station komme?",
    lenaMood: "unsure",
    npcImage: "none",
    reviewDirections: true,
    choices: [
      { text: "Gegenüber von der Station, neben dem Café", nextNode: "ch1_nav_reaction" },
      { text: "Hinter dem Bahnhof", nextNode: "ch1_nav_reaction" },
      { text: "Gegenüber dem Café, neben der Station", nextNode: "ch1_nav_reaction" },
    ],
  },

  ch1_nav_reaction: {
    id: "ch1_nav_reaction",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "So, das war's! Hoffentlich finde ich den Weg richtig...",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Zum Hotel gehen", nextNode: "black_screen" },
    ],
  },

  // ── End ───────────────────────────────────────────────────────────────────

  black_screen: {
    id: "black_screen",
    background: "black",
    speaker: "Erzähler",
    text: "Später an diesem Tag...",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "evaluate_quiz_results" },
    ],
  },

  arrival_success: {
    id: "arrival_success",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ich habe es geschafft! Ich habe alles verstanden: geradeaus zur U-Bahn, U3 bis Neubaugasse, und das Hotel gegenüber von der Station, neben dem Café. Hmm... vielleicht ist mein Deutsch besser, als ich denke!",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "arrival_success_hotel" },
    ],
  },

  arrival_success_hotel: {
    id: "arrival_success_hotel",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und das Hotel sieht toll aus! Warmes Licht in den Fenstern, eine schöne alte Fassade... Ich habe den Weg ganz allein gefunden. Einfach hier zu stehen fühlt sich schon wie ein kleiner Sieg an.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Ins Hotel gehen", nextNode: "end_chapter_1" },
    ],
  },

  arrival_failure: {
    id: "arrival_failure",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh Gott, ich bin so müde... Ich bin irgendwo falsch abgebogen und habe mich total verlaufen. Es ist schon dunkel. Nur die Straßenlampen zeigen mir den Weg. Jetzt habe ich das Hotel endlich gefunden – aber es ist so spät! Mein Kopf tut weh...",
    lenaMood: "exhausted",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "arrival_failure_hotel" },
    ],
  },

  arrival_failure_hotel: {
    id: "arrival_failure_hotel",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Aber... das Hotel sieht trotzdem toll aus. Warme Fenster, eine schöne alte Fassade, ein ruhiges Licht in der Lobby. Ich bin müde und mein Kopf tut weh. Aber ich bin da. Für heute ist das genug.",
    lenaMood: "exhausted",
    npcImage: "none",
    choices: [
      { text: "Ins Hotel gehen", nextNode: "end_chapter_1" },
    ],
  },

  hotel_lobby_arrival: {
    id: "hotel_lobby_arrival",
    background: "hotel_lobby.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Die Lobby ist schön und warm. Und da drüben ist die Rezeption. Okay, die nächste Aufgabe... Ich muss nur noch – wait, how do I say 'check in' in German? Oh, right: einchecken! Das ist ja fast das gleiche Wort.",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch2_practice_prompt" },
    ],
  },

  ch2_practice_prompt: {
    id: "ch2_practice_prompt",
    background: "hotel_lobby.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Aber zuerst übe ich, was ich sagen will!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      {
        text: "Üben / Start Practice",
        nextNode: "ch2_ppp_practice",
        prominent: true,
      },
    ],
  },

  ch2_ppp_practice: {
    id: "ch2_ppp_practice",
    background: "hotel_lobby.jpg",
    speaker: "Lena",
    text: "",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [],
  },

  chapter_2_teaser: {
    id: "chapter_2_teaser",
    background: "black",
    speaker: "System",
    text: "KAPITEL 2 - CHECK-IN",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Kapitel starten", nextNode: "hotel_lobby_arrival" },
    ],
  },

  // ── Chapter 2: The Reception ──────────────────────────────────────────────

  ch2_reception_greet: {
    id: "ch2_reception_greet",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Guten Tag! Herzlich willkommen im Hotel Wiener Traum. Haben Sie eine Reservierung?",
    lenaMood: "normal",
    npcImage: "receptionist_neutral1.png",
    highlightVocab: true,
    choices: [
      { text: "Guten Tag! Darf ich eine Reservierung haben?", nextNode: "ch2_greet_wrong_rude" },
      { text: "Guten Tag! Ja, ich habe eine Reservierung, weil ich möchte hier schlafen.", nextNode: "ch2_greet_wrong_grammar" },
      { text: "Guten Tag! Ich habe eine Reservierung auf den Namen Lena Majerová.", nextNode: "ch2_reception_id" },
    ],
  },

  ch2_greet_wrong_rude: {
    id: "ch2_greet_wrong_rude",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Entschuldigung... wie bitte? Was meinen Sie?",
    lenaMood: "unsure",
    npcImage: "receptionist_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch2_reception_greet" },
    ],
  },

  ch2_greet_wrong_grammar: {
    id: "ch2_greet_wrong_grammar",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Bitte? Ah, Sie haben eine Reservierung. Wie ist Ihr Name?",
    lenaMood: "unsure",
    npcImage: "receptionist_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch2_reception_greet" },
    ],
  },

  ch2_reception_id: {
    id: "ch2_reception_id",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Guten Tag, Frau Majerová! Ja, genau. Ich sehe Ihre Reservierung im System. Kann ich bitte Ihren Ausweis sehen?",
    lenaMood: "normal",
    npcImage: "receptionist_neutral2.png",
    choices: [
      { text: "[Meine Telefonnummer sagen]", nextNode: "ch2_id_wrong_phone" },
      { text: "[Meinen Ausweis geben]", nextNode: "ch2_id_correct" },
      { text: "[Meinen vollen Namen deutlich wiederholen]", nextNode: "ch2_id_wrong_name" },
    ],
  },

  ch2_id_correct: {
    id: "ch2_id_correct",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Perfekt, danke! Ah, Frau Majerová. Herzlich willkommen in Wien! Würden Sie mir dann kurz diesen Meldezettel ausfüllen?",
    lenaMood: "normal",
    npcImage: "receptionist_neutral1.png",
    choices: [
      { text: "Weiter", nextNode: "ch2_meldezettel" },
    ],
  },

  ch2_id_wrong_phone: {
    id: "ch2_id_wrong_phone",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Entschuldigung? Nein, Ihre Telefonnummer brauche ich jetzt nicht. Ich muss Ihre Identität prüfen. Haben Sie einen Ausweis?",
    lenaMood: "unsure",
    npcImage: "receptionist_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch2_reception_id" },
    ],
  },

  ch2_id_wrong_name: {
    id: "ch2_id_wrong_name",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Ja, das weiß ich bereits, Frau Majerová. Aber ich brauche ein offizielles Dokument von Ihnen.",
    lenaMood: "unsure",
    npcImage: "receptionist_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch2_reception_id" },
    ],
  },

  // ── Chapter 2: The Meldezettel form mini-game ─────────────────────────────

  ch2_meldezettel: {
    id: "ch2_meldezettel",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Gut. Bitte füllen Sie jetzt den Meldezettel vollständig aus.",
    lenaMood: "none",
    npcImage: "none",
    choices: [],
  },

  ch2_meldezettel_success: {
    id: "ch2_meldezettel_success",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Perfekt, danke schön!",
    lenaMood: "confident",
    npcImage: "receptionist_neutral2.png",
    choices: [
      { text: "Weiter", nextNode: "end_chapter_2" },
    ],
  },

  ch2_meldezettel_uncertain: {
    id: "ch2_meldezettel_uncertain",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Na ja, hoffentlich ist das alles richtig ausgefüllt... Mal sehen.",
    lenaMood: "uncertain",
    npcImage: "receptionist_confused.png",
    choices: [
      { text: "Weiter", nextNode: "end_chapter_2" },
    ],
  },

  // ── Chapter 3: Unterwegs ────────────────────────────────────────────────

  chapter_3_title: {
    id: "chapter_3_title",
    background: "black",
    speaker: "System",
    text: "Kapitel 3: Unterwegs",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Kapitel starten", nextNode: "ch3_morning_intro" },
    ],
  },

  ch3_morning_intro: {
    id: "ch3_morning_intro",
    background: "hotel_room.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Guten Morgen, Wien! Ich habe so gut geschlafen. Heute ist der große Tag – ich fahre endlich ins Zentrum! Ich will den Stephansplatz sehen und den berühmten Stephansdom.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Aufstehen", nextNode: "ch3_morning_intro_architecture" },
    ],
  },

  ch3_morning_intro_architecture: {
    id: "ch3_morning_intro_architecture",
    background: "hotel_room.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ich freue mich so auf die alten Gebäude und die Atmosphäre in der Stadt!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch3_practice_prompt" },
    ],
  },

  ch3_practice_prompt: {
    id: "ch3_practice_prompt",
    background: "hotel_room.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Zuerst übe ich ein paar Vokabeln. Dann bin ich gut vorbereitet für das Abenteuer heute!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      {
        text: "Übung / Practice",
        nextNode: "ch3_ppp_practice",
        prominent: true,
      },
    ],
  },

  ch3_ppp_practice: {
    id: "ch3_ppp_practice",
    background: "hotel_room.jpg",
    speaker: "Lena",
    text: "",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [],
  },

  ch3_morning_intro_transport: {
    id: "ch3_morning_intro_transport",
    background: "hotel_room.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, auf zur U-Bahn-Station! Mal sehen, wie die U-Bahn hier funktioniert.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Zur Station gehen", nextNode: "ch3_station_arrival" },
    ],
  },

  ch3_station_arrival: {
    id: "ch3_station_arrival",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "So, jetzt brauche ich nur noch ein Ticket. Mal sehen...",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Optionen ansehen", nextNode: "ch3_ticket_machine_intro" },
    ],
  },

  ch3_ticket_machine_intro: {
    id: "ch3_ticket_machine_intro",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ich fahre jetzt zum Stephansdom, dann in einen Park und später zurück zum Hotel. Das sind heute mindestens drei Fahrten mit der U-Bahn. Eine Einzelfahrt kostet 2,40 Euro.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch3_ticket_machine_intro_fare" },
    ],
  },

  ch3_ticket_machine_intro_fare: {
    id: "ch3_ticket_machine_intro_fare",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ich kaufe das, was heute billiger ist: Einzeltickets oder... oh, wie heißt das noch mal? Ein Tagesticket? Nein – eine 24-Stunden-Karte! Genau. Und ich bin Touristin, ich habe keinen österreichischen Schülerausweis. Also brauche ich ein normales Ticket für Erwachsene.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Ticket kaufen", nextNode: "ch3_ticket_machine" },
    ],
  },

  // Special node: intercepted by game.js to launch the Ticketautomat mini-game.
  ch3_ticket_machine: {
    id: "ch3_ticket_machine",
    background: "u_bahn_station.jpg",
    speaker: "System",
    text: "Ticketautomat",
    lenaMood: "none",
    npcImage: "none",
    choices: [],
  },

  ch3_ticket_success: {
    id: "ch3_ticket_success",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ja! Ich habe es geschafft! Ich habe endlich mein Ticket. Stephansdom, ich komme!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch3_boarding" },
    ],
  },

  ch3_ticket_fail: {
    id: "ch3_ticket_fail",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ups! Der Automat war ein bisschen kompliziert. Ich habe ein paar Mal falsch gedrückt und war kurz verwirrt. Aber zum Glück hat eine nette Studentin das gesehen. Sie hat mir gezeigt, was ich drücken muss. Ein bisschen peinlich, aber egal! Jetzt habe ich mein Ticket, ich habe neue Wörter gelernt, und es kann losgehen! Stephansplatz, ich komme!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch3_boarding" },
    ],
  },

  ch3_boarding: {
    id: "ch3_boarding",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, ich bin unten in der Station Neubaugasse, Linie U3. Ich muss zum Stephansplatz. Aber es gibt zwei Bahnsteige! Hmm... Ich muss auf die Schilder oben schauen und die richtige Richtung wählen.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Liniennetz ansehen", nextNode: "ch3_platform_map" },
    ],
  },

  ch3_platform_map: {
    id: "ch3_platform_map",
    background: "u_bahn_station.jpg",
    speaker: "",
    text: "",
    lenaMood: "thoughtful",
    npcImage: "none",
    dialogueStyle: "u3-line-map",
    choices: [
      { text: "Bahnsteig wählen", nextNode: "ch3_platform_choice" },
    ],
  },

  ch3_platform_choice: {
    id: "ch3_platform_choice",
    background: "u_bahn_station.jpg",
    speaker: "",
    text: "",
    lenaMood: "thoughtful",
    npcImage: "none",
    dialogueStyle: "u3-platform-boards",
    choices: [],
  },

  ch3_platform_wrong: {
    id: "ch3_platform_wrong",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Moment... Ottakring? Das ist die falsche Richtung!",
    lenaMood: "scared",
    npcImage: "none",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch3_platform_choice" },
    ],
  },

  ch3_platform_correct: {
    id: "ch3_platform_correct",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Super, dieser Zug fährt zum Stephansplatz!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch3_train_ride" },
    ],
  },

  ch3_train_ride: {
    id: "ch3_train_ride",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Das ging schnell! Die U-Bahn kommt hier so oft. Und ich mag die Stimme, die die Stationen ansagt.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Auf die Ansage hören", nextNode: "ch3_train_arrival" },
    ],
  },

  ch3_train_arrival: {
    id: "ch3_train_arrival",
    background: "u_bahn_station.jpg",
    speaker: "Ansage",
    text: "Stephansplatz. Umsteigen zu: U1.",
    lenaMood: "normal",
    npcImage: "none",
    dialogueStyle: "announcement",
    choices: [
      { text: "Weiter", nextNode: "ch3_prepare_exit" },
    ],
  },

  ch3_prepare_exit: {
    id: "ch3_prepare_exit",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Das ist meine Station! Ich nehme meine Tasche und gehe zur langen Rolltreppe nach oben.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch3_escalator_entry" },
    ],
  },

  ch3_escalator_entry: {
    id: "ch3_escalator_entry",
    background: "u_bahn_escalator.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Die Rolltreppe ist lang und voll. Ich steige ein und schaue auf die Karte auf meinem Handy. Ich merke gar nicht, dass ich links stehe und den Weg blockiere.",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch3_ubahn_bump" },
    ],
  },

  ch3_ubahn_bump: {
    id: "ch3_ubahn_bump",
    background: "u_bahn_escalator.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ups! Jemand ist von hinten gegen mich gestoßen... und das ziemlich fest!",
    lenaMood: "scared",
    npcImage: "none",
    choices: [
      { text: "Umdrehen", nextNode: "ch3_ubahn_dialogue" },
    ],
  },

  ch3_ubahn_dialogue: {
    id: "ch3_ubahn_dialogue",
    background: "u_bahn_escalator.jpg",
    speaker: "Wiener Mann",
    text: "Entschuldigung! Rechts stehen, links gehen!",
    lenaMood: "unsure",
    npcImage: "commuter_man_annoyed.png",
    choices: [
      { text: "Dem Mann antworten", nextNode: "ch3_ubahn_thought" },
    ],
  },

  ch3_ubahn_thought: {
    id: "ch3_ubahn_thought",
    background: "u_bahn_escalator.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh nein, ich habe den Weg blockiert, weil ich auf die Karte geschaut habe! Was sage ich jetzt? Wait... wie entschuldigt man sich höflich auf Deutsch?",
    lenaMood: "unsure",
    npcImage: "commuter_man_annoyed.png",
    choices: [
      { text: "Entschuldigung! Ich bin nicht gewusst.", nextNode: "ch3_ubahn_imperfect" },
      { text: "Entschuldigung, das wusste ich nicht. Ich passe nächstes Mal auf.", nextNode: "ch3_ubahn_polite" },
      { text: "Ja, links ist gut, danke!", nextNode: "ch3_ubahn_confused" },
    ],
  },

  ch3_ubahn_imperfect: {
    id: "ch3_ubahn_imperfect",
    background: "u_bahn_escalator.jpg",
    speaker: "Wiener Mann",
    text: "Na gut... Aber auf der Rolltreppe gilt: rechts stehen, links gehen!",
    lenaMood: "unsure",
    npcImage: "commuter_man_annoyed.png",
    choices: [
      { text: "Weiter", nextNode: "ch3_station_exit" },
    ],
  },

  ch3_ubahn_polite: {
    id: "ch3_ubahn_polite",
    background: "u_bahn_escalator.jpg",
    speaker: "Wiener Mann",
    text: "Passt schon. Nächstes Mal einfach rechts stehen!",
    lenaMood: "happy",
    npcImage: "commuter_man_annoyed.png",
    choices: [
      { text: "Weiter", nextNode: "ch3_station_exit" },
    ],
  },

  ch3_ubahn_confused: {
    id: "ch3_ubahn_confused",
    background: "u_bahn_escalator.jpg",
    speaker: "Wiener Mann",
    text: "Sagen Sie einmal, verstehen Sie kein Deutsch?! Gehen Sie auf die rechte Seite!",
    lenaMood: "scared",
    npcImage: "commuter_man_annoyed.png",
    choices: [
      { text: "Weiter", nextNode: "ch3_station_exit" },
    ],
  },

  ch3_station_exit: {
    id: "ch3_station_exit",
    background: "u_bahn_escalator.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Rechts stehen, links gehen... verstanden! Schritt für Schritt lerne ich, wie diese Stadt funktioniert.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Auf den Stephansplatz gehen", nextNode: "end_chapter_3" },
    ],
  },

  end_chapter_3: {
    id: "end_chapter_3",
    background: "u_bahn_station.jpg",
    speaker: "System",
    text: "Ende von Kapitel 3",
    lenaMood: "none",
    npcImage: "none",
    choices: [],
  },

  // ── Kapitel 4: Das Herz von Wien ────────────────────────────────────────

  chapter_4_title: {
    id: "chapter_4_title",
    background: "black",
    speaker: "System",
    text: "Kapitel 4: Das Herz von Wien",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Kapitel starten", nextNode: "ch4_stephans_amazed" },
    ],
  },

  ch4_stephans_amazed: {
    id: "ch4_stephans_amazed",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh wow... Der ist riesig! Das Dach hat so viele Farben, und der Turm geht bis in die Wolken. Der ganze Dom passt nicht auf ein Foto! Ich stehe einfach hier mit offenem Mund...",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch4_square_crowds" },
    ],
  },

  ch4_square_crowds: {
    id: "ch4_square_crowds",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und so viele Menschen! Touristen mit Kameras, Straßenkünstler, Musik von überall... Der Platz ist laut und voller Leben. Neben dieser riesigen Kirche und all den Leuten fühle ich mich ganz klein.",
    lenaMood: "amazed",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch4_stephans_intro" },
    ],
  },

  ch4_stephans_intro: {
    id: "ch4_stephans_intro",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Das ist also der berühmte 'Steffl', wie die Wiener sagen. In echt ist er ganz anders als auf Fotos!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Den Stephansdom bewundern", nextNode: "ch4_mozart_surprise" },
    ],
  },

  ch4_mozart_surprise: {
    id: "ch4_mozart_surprise",
    background: "stephansplatz.jpg",
    speaker: "Erzähler",
    text: "ZACK! Plötzlich springt ein Mann mit weißer Perücke und rotem Mantel direkt vor Lena. Er hält viele goldene Tickets in der Hand und winkt damit!",
    lenaMood: "scared",
    npcImage: "mozart_seller_neutral1.png",
    dialogueStyle: "narrator",
    effect: "jumpScare",
    choices: [
      { text: "Weiter", nextNode: "ch4_mozart_seller" },
    ],
  },

  ch4_mozart_seller: {
    id: "ch4_mozart_seller",
    background: "stephansplatz.jpg",
    speaker: "Straßenverkäufer",
    text: "Hallo! Guten Tag! Suchen Sie klassische Musik? Mozart! Vivaldi! Konzert heute Abend im wunderschönen Saal! Nur heute super Angebot, nur für Sie, meine Dame!",
    lenaMood: "scared",
    npcImage: "mozart_seller_neutral2.png",
    choices: [
      { text: "Weiter", nextNode: "ch4_mozart_shock" },
    ],
  },

  ch4_mozart_shock: {
    id: "ch4_mozart_shock",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh! Der hat mich erschreckt! Moment... das habe ich online gelesen. Im Zentrum gibt es Ticketverkäufer, die wie Mozart aussehen. Sie verkaufen Touristen sehr teure Konzertkarten. Ich muss vorsichtig sein und Nein sagen!",
    lenaMood: "scared",
    npcImage: "mozart_seller_neutral1.png",
    choices: [
      { text: "Ihm antworten", nextNode: "ch4_mozart_choice" },
    ],
  },

  ch4_mozart_choice: {
    id: "ch4_mozart_choice",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Hmm, was sage ich jetzt zu ihm?",
    lenaMood: "thoughtful",
    npcImage: "mozart_seller_neutral2.png",
    instantText: true,
    choices: [
      { text: "Ich weiß nicht... Ist das Konzert gut?", nextNode: "ch4_mozart_wrong_a" },
      { text: "Es tut mir leid, aber ich keine Zeit für Musik habe.", nextNode: "ch4_mozart_wrong_b" },
      { text: "Nein, danke. Ich habe heute schon andere Pläne.", nextNode: "ch4_mozart_correct" },
    ],
  },

  ch4_mozart_wrong_a: {
    id: "ch4_mozart_wrong_a",
    background: "stephansplatz.jpg",
    speaker: "Erzähler",
    text: "Der Verkäufer sieht: Lena ist nicht sicher. Er drückt ihr bunte Prospekte in die Hand und stellt sich ihr in den Weg. Er redet und redet über das 'beste Konzert in Wien'. Es dauert viele Minuten, bis sie endlich weitergehen kann.",
    lenaMood: "unsure",
    npcImage: "mozart_seller_neutral1.png",
    dialogueStyle: "narrator",
    choices: [
      { text: "Weiter", nextNode: "ch4_mozart_after" },
    ],
  },

  ch4_mozart_wrong_b: {
    id: "ch4_mozart_wrong_b",
    background: "stephansplatz.jpg",
    speaker: "Erzähler",
    text: "Er nimmt Lenas Ausrede nicht an. \"Keine Zeit? Das Konzert dauert nur zwei Stunden! Kommen Sie!\" Er kommt näher, und Lena fühlt sich gefangen. Es ist schwer, höflich wegzugehen.",
    lenaMood: "scared",
    npcImage: "mozart_seller_neutral1.png",
    dialogueStyle: "narrator",
    choices: [
      { text: "Weiter", nextNode: "ch4_mozart_after" },
    ],
  },

  ch4_mozart_correct: {
    id: "ch4_mozart_correct",
    background: "stephansplatz.jpg",
    speaker: "Straßenverkäufer",
    text: "Schade! Schönen Tag noch!",
    lenaMood: "normal",
    npcImage: "mozart_seller_neutral1.png",
    choices: [
      { text: "Weiter", nextNode: "ch4_mozart_after" },
    ],
  },

  ch4_mozart_after: {
    id: "ch4_mozart_after",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Puh, das war stressig! Der Platz ist so voll. Ich brauche einen Moment Ruhe. Ich gehe in den Dom – in den berühmten Stephansdom.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch4_cathedral_arrival" },
    ],
  },

  ch4_cathedral_arrival: {
    id: "ch4_cathedral_arrival",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, hier bin ich, direkt am Stephansdom! Ich habe so viele Bilder gesehen. Jetzt will ich endlich sehen, wie er von innen aussieht.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch4_practice_prompt" },
    ],
  },

  ch4_practice_prompt: {
    id: "ch4_practice_prompt",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh, direkt vor dem Eingang ist eine Tafel mit Regeln! Hmm, da stehen ein paar schwierige Wörter. Ich übe lieber kurz mein Deutsch. Dann weiß ich, wie ich mich drinnen benehmen soll.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      {
        text: "Übung / Practice",
        nextNode: "ch4_ppp_practice",
        prominent: true,
      },
    ],
  },

  ch4_ppp_practice: {
    id: "ch4_ppp_practice",
    background: "cathedral.jpg",
    speaker: "Lena",
    text: "",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [],
  },

  // ── Entrance mini-game: match the visitor rules ─────────────────────────

  ch4_rules_intro: {
    id: "ch4_rules_intro",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, da ist sie – die offizielle Tafel: 'Verhaltensregeln im Stephansdom'. Verhaltens... regeln? Hmm... Aha! Jetzt fällt es mir wieder ein: Regeln, wie man sich benimmt. Mal sehen, ob ich alle verstehe!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch4_rules_game" },
    ],
  },

  ch4_rules_game: {
    id: "ch4_rules_game",
    background: "cathedral.jpg",
    speaker: "System",
    text: "",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [],
  },

  ch4_rules_perfect: {
    id: "ch4_rules_perfect",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Super, ich habe alle Regeln verstanden. Ich bin bereit. Rein in den Dom!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Hineingehen", nextNode: "ch4_inside_atmosphere" },
    ],
  },

  ch4_rules_ok: {
    id: "ch4_rules_ok",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Hmm, bei den Regeln bin ich mir nicht ganz sicher... Aber egal, ich gehe trotzdem rein!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Hineingehen", nextNode: "ch4_rules_fail_entry" },
    ],
  },

  ch4_rules_fail: {
    id: "ch4_rules_fail",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Hmm, bei den Regeln bin ich mir nicht ganz sicher... Aber egal, ich gehe trotzdem rein!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Hineingehen", nextNode: "ch4_rules_fail_entry" },
    ],
  },

  ch4_rules_fail_entry: {
    id: "ch4_rules_fail_entry",
    background: "cathedral_interior.jpg",
    speaker: "Erzähler",
    text: "Lena geht hinein. Aber sie hat die Regeln nicht richtig verstanden: Sie trägt noch ihre Kappe und redet sehr laut mit sich selbst. Die Leute drehen sich um. Ein Aufseher in dunkler Uniform kommt schnell zu ihr.",
    lenaMood: "scared",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Weiter", nextNode: "ch4_warden_shush" },
    ],
  },

  ch4_warden_shush: {
    id: "ch4_warden_shush",
    background: "cathedral_interior.jpg",
    speaker: "Domaufseher",
    text: "Psst! Ruhe, bitte! Und keine Kappe im Dom!",
    lenaMood: "scared",
    npcImage: "warden_stern.png",
    choices: [
      { text: "Weiter", nextNode: "ch4_warden_sorry" },
    ],
  },

  ch4_warden_sorry: {
    id: "ch4_warden_sorry",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ups! Wie peinlich. Ich nehme schnell meine Kappe ab und flüstere 'Entschuldigung'. Hier drinnen muss ich besser aufpassen.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Leise weitergehen", nextNode: "ch4_inside_atmosphere" },
    ],
  },

  // ── Inside the cathedral ────────────────────────────────────────────────

  ch4_inside_atmosphere: {
    id: "ch4_inside_atmosphere",
    background: "cathedral_interior.jpg",
    speaker: "Erzähler",
    text: "Drinnen ist alles still. Die Kirche ist riesig. Hohe Steinsäulen gehen nach oben wie alte Bäume. Buntes Licht fällt durch die Glasfenster auf den Boden. Die Luft riecht nach Kerzen und altem Stein.",
    lenaMood: "amazed",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Weiter", nextNode: "ch4_inside_thought" },
    ],
  },

  ch4_inside_thought: {
    id: "ch4_inside_thought",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Von innen ist er noch viel größer. Und diese Stille... wunderschön. Hmm, was mache ich hier zuerst?",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Eine Kerze anzünden", nextNode: "ch4_candle" },
      { text: "Den Dom ansehen", nextNode: "ch4_look_around" },
      { text: "Den Turmeingang suchen", nextNode: "ch4_exit_cathedral" },
    ],
  },

  ch4_exit_blocked: {
    id: "ch4_exit_blocked",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Moment, ich habe den Dom noch gar nicht angeschaut! Ich schaue mich zuerst um.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch4_inside_thought" },
    ],
  },

  // ── Look around: stained-glass atmosphere ───────────────────────────────

  ch4_look_around: {
    id: "ch4_look_around",
    background: "stained-glass.jpg",
    speaker: "Erzähler",
    text: "Lena geht leise durch den Mittelgang zum Hochaltar.",
    lenaMood: "happy",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Weiter", nextNode: "ch4_look_lena" },
    ],
  },

  ch4_look_lena: {
    id: "ch4_look_lena",
    background: "stained-glass.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ich schaue nach oben zu den riesigen Fenstern. Die Sonne scheint durch das bunte Glas. Auf dem Steinboden liegt rotes, goldenes und blaues Licht. Es ist so ruhig und still hier.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Zurück in den Dom", nextNode: "ch4_inside_thought" },
    ],
  },

  ch4_candle: {
    id: "ch4_candle",
    background: "cathedral_candles.jpg",
    speaker: "Erzähler",
    text: "Lena wirft eine Münze in die kleine Metallbox und nimmt eine dünne Kerze. Sie zündet sie an. Jetzt brennt ihre kleine Flamme zusammen mit vielen anderen — ein kleiner Wunsch für ihre große Reise.",
    lenaMood: "happy",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Weiter", nextNode: "ch4_candle_words" },
    ],
  },

  ch4_candle_words: {
    id: "ch4_candle_words",
    background: "cathedral_candles.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Kleines Licht, große Wünsche. Jetzt fühle ich mich bereit für die nächste Aufgabe.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch4_inside_thought" },
    ],
  },

  // ── Transition: standing before the Südturm door ───────────────────────

  ch4_exit_cathedral: {
    id: "ch4_exit_cathedral",
    background: "cathedral.jpg",
    speaker: "Erzähler",
    text: "Lena geht zurück zur Seite des Doms. Sie steht vor einer kleinen Holztür mit dem Schild 'Südturm'.",
    lenaMood: "thoughtful",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Weiter", nextNode: "ch4_exit_thought" },
    ],
  },

  ch4_exit_thought: {
    id: "ch4_exit_thought",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Bevor ich die 343 Stufen nach oben gehe, mache ich kurz Pause. Ich schreibe in mein Tagebuch.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Tagebuch öffnen", nextNode: "end_chapter_4" },
    ],
  },

  // ── Kapitel 5: Dem Himmel so nah ────────────────────────────────────────

  chapter_5_title: {
    id: "chapter_5_title",
    background: "black",
    speaker: "System",
    text: "Kapitel 5: Dem Himmel so nah",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Kapitel starten", nextNode: "ch5_tower_plan" },
    ],
  },

  ch5_tower_plan: {
    id: "ch5_tower_plan",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Das ist also der Eingang zum Südturm. Meine nächste Aufgabe: alle 343 Stufen hinauf und Wien von oben sehen!",
    lenaMood: "confident",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch5_tower_entrance" },
    ],
  },

  ch5_tower_entrance: {
    id: "ch5_tower_entrance",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "343 Stufen bis ganz nach oben? Meine Beine werden mich morgen hassen. Aber ohne diesen Blick fahre ich nicht aus Wien weg!",
    lenaMood: "confident",
    npcImage: "none",
    choices: [
      { text: "Aufstieg beginnen", nextNode: "ch5_climb_game" },
    ],
  },

  ch5_climb_game: {
    id: "ch5_climb_game",
    background: "cathedral_stairs.jpg",
    speaker: "System",
    text: "",
    lenaMood: "exhausted",
    npcImage: "none",
    choices: [],
  },

  ch5_tower_arrival: {
    id: "ch5_tower_arrival",
    background: "cathedral_stairs.jpg",
    speaker: "Lena",
    text: "Ich kann es nicht glauben... ich bin schon oben. Puh, das war so anstrengend!",
    lenaMood: "exhausted",
    npcImage: "none",
    choices: [
      { text: "Auf die Aussichtsplattform gehen", nextNode: "ch5_tower_view" },
    ],
  },

  // ── Climax: the view from the Türmerstube ───────────────────────────────

  ch5_tower_view: {
    id: "ch5_tower_view",
    background: "vienna_view.jpg",
    speaker: "Erzähler",
    text: "Lena tritt auf die Aussichtsplattform, 136 Meter über der Stadt. Ein kühler Wind weht ihr ins Gesicht. Unter ihr liegt Wien – so weit man schauen kann.",
    lenaMood: "amazed",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Weiter", nextNode: "ch5_tower_lena" },
    ],
  },

  ch5_tower_lena: {
    id: "ch5_tower_lena",
    background: "vienna_view.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "343 Stufen... Ich habe es wirklich geschafft! Wow... just look at that! Das berühmte bunte Dach ist direkt unter mir und glänzt in der Sonne. Ich sehe das Riesenrad im Prater, die Donau mitten in der Stadt und die grünen Hügel ganz hinten.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Die Stadt genauer ansehen", nextNode: "ch5_tower_reflect" },
    ],
  },

  ch5_tower_reflect: {
    id: "ch5_tower_reflect",
    background: "vienna_view.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Als ich in Wien aus dem Zug gestiegen bin, hatte ich vor allem Angst. Angst, Deutsch zu sprechen. Angst vor dummen Fehlern. Angst, mich zu verlaufen. Aber diese 343 Stufen sind wie meine ganze Reise: Es war anstrengend, ich habe Fehler gemacht – aber ich bin weitergegangen. Schritt für Schritt.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Tagebuch herausnehmen", nextNode: "ch5_tower_triumph" },
    ],
  },

  ch5_tower_triumph: {
    id: "ch5_tower_triumph",
    background: "vienna_view.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und jetzt bin ich ganz oben! Früher habe ich kein Wort gesagt, wenn ich Deutsch sprechen musste. Aber heute weiß ich: Fehler sind nicht das Ende der Welt. Eine Sprache muss nicht perfekt sein. Man braucht nur den Mut, es zu versuchen. Das muss ich sofort in mein Tagebuch schreiben!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Eintrag schreiben", nextNode: "end_chapter_5" },
    ],
  },

  // ── Kapitel 6: Epilog ───────────────────────────────────────────────────

  chapter_6_title: {
    id: "chapter_6_title",
    background: "black",
    speaker: "System",
    text: "Kapitel 6: Epilog — Das Ende einer tollen Reise",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Kapitel starten", nextNode: "ch6_morning_title" },
    ],
  },

  ch6_morning_title: {
    id: "ch6_morning_title",
    background: "black",
    speaker: "System",
    text: "Am nächsten Morgen — Lenas letzter Tag in Wien...",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch6_cafe_arrival" },
    ],
  },

  // ── The Kaffeehaus: one last coffee, one last conversation ─────────────

  ch6_cafe_arrival: {
    id: "ch6_cafe_arrival",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Dunkles Holz, Marmortische, irgendwo hinter mir klingen Tassen. Ein Kellner in schwarzer Weste geht elegant zwischen den Tischen hin und her. Er hat das sicher schon tausendmal gemacht.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch6_cafe_thought" },
    ],
  },

  ch6_cafe_thought: {
    id: "ch6_cafe_thought",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Meine letzte Stunde in Wien. Mein Koffer steht neben dem Stuhl. Noch eine Melange vor dem Zug – und ich bestelle sie auf Deutsch. Okay, wie sagt man... ach, ich weiß es doch! Los geht's.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Grüß Gott!", nextNode: "ch6_waiter_greet" },
    ],
  },

  ch6_waiter_greet: {
    id: "ch6_waiter_greet",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Grüß Gott, junge Dame! Was darf ich Ihnen bringen?",
    lenaMood: "confident",
    npcImage: "waiter_neutral.png",
    highlightVocab: true,
    choices: [
      { text: "Ich will Kaffee.", nextNode: "ch6_waiter_wrong_blunt" },
      { text: "Eine Melange, weil ich möchte trinken.", nextNode: "ch6_waiter_wrong_order" },
      { text: "Ich möchte bitte eine Melange und ein Glas Wasser.", nextNode: "ch6_waiter_serve" },
    ],
  },

  ch6_waiter_wrong_blunt: {
    id: "ch6_waiter_wrong_blunt",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Hmm... 'Ich will'? Bei uns im Kaffeehaus sagt man lieber 'Ich möchte bitte'. Das klingt viel freundlicher.",
    lenaMood: "unsure",
    npcImage: "waiter_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch6_waiter_greet" },
    ],
  },

  ch6_waiter_wrong_order: {
    id: "ch6_waiter_wrong_order",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Wie bitte? Sie meinen 'weil ich trinken möchte', nicht wahr? Nach 'weil' kommt das Verb ganz am Ende.",
    lenaMood: "unsure",
    npcImage: "waiter_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch6_waiter_greet" },
    ],
  },

  ch6_waiter_serve: {
    id: "ch6_waiter_serve",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Sehr gerne! Eine Melange und ein Glas Wasser — kommt sofort.",
    lenaMood: "happy",
    npcImage: "waiter_neutral.png",
    highlightVocab: true,
    choices: [
      { text: "Weiter", nextNode: "ch6_waiter_smalltalk" },
    ],
  },

  // Only after the coffee is on the table does he stay for a chat.
  ch6_waiter_smalltalk: {
    id: "ch6_waiter_smalltalk",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Ihr Akzent — Sie sind nicht von hier, oder? Woher kommen Sie denn, und wie lange sind Sie schon in Wien?",
    lenaMood: "confident",
    npcImage: "waiter_neutral.png",
    highlightVocab: true,
    choices: [
      { text: "Prag. Zug. Heute.", nextNode: "ch6_smalltalk_wrong_short" },
      { text: "Ich komme aus Prag. Ich bin drei Tage hier — und heute fahre ich zurück.", nextNode: "ch6_waiter_praise" },
      { text: "Ich bin aus Prag und ich bin seit drei Tage hier.", nextNode: "ch6_waiter_praise" },
    ],
  },

  ch6_smalltalk_wrong_short: {
    id: "ch6_smalltalk_wrong_short",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Prag... Zug... heute? Nur die Hälfte, junge Dame! Sagen Sie es mir in einem ganzen Satz — Sie können das.",
    lenaMood: "unsure",
    npcImage: "waiter_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch6_waiter_smalltalk" },
    ],
  },

  // He gently echoes the correct "seit drei Tagen" instead of correcting her.
  ch6_waiter_praise: {
    id: "ch6_waiter_praise",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Ah, aus Prag! Seit drei Tagen in Wien? Wie wunderbar — und Ihr Deutsch ist wirklich gut, junge Dame. Respekt, die meisten Touristen sagen hier nur 'one coffee, please'.",
    lenaMood: "amazed",
    npcImage: "waiter_neutral.png",
    highlightVocab: true,
    choices: [
      { text: "Weiter", nextNode: "ch6_praise_thought" },
    ],
  },

  ch6_praise_thought: {
    id: "ch6_praise_thought",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ein Wiener Kellner hat gerade mein Deutsch gelobt! Wow... wie bin ich hierher gekommen?",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch6_bill_prompt" },
    ],
  },

  ch6_bill_prompt: {
    id: "ch6_bill_prompt",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Meine Melange ist leer, und die Uhr sagt: Zeit zu gehen. Ein letzter Satz auf Deutsch, dann zum Bahnhof. Hmm, wie sagt man das noch mal... Okay, ich versuche es einfach.",
    lenaMood: "thoughtful",
    npcImage: "waiter_neutral.png",
    choices: [
      { text: "Die Karte, bitte.", nextNode: "ch6_bill_wrong_card" },
      { text: "Entschuldigung, ich möchte bitte zahlen.", nextNode: "ch6_bill_paid" },
      { text: "Wie viel kostet das Kaffeehaus?", nextNode: "ch6_bill_wrong_price" },
    ],
  },

  ch6_bill_wrong_card: {
    id: "ch6_bill_wrong_card",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Die Karte? Möchten Sie die Speisekarte noch einmal sehen? Oder möchten Sie vielleicht zahlen?",
    lenaMood: "unsure",
    npcImage: "waiter_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch6_bill_prompt" },
    ],
  },

  ch6_bill_wrong_price: {
    id: "ch6_bill_wrong_price",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Das ganze Kaffeehaus? Das steht leider nicht zum Verkauf, junge Dame! Sie meinen die Rechnung, oder?",
    lenaMood: "unsure",
    npcImage: "waiter_confused.png",
    choices: [
      { text: "Noch einmal versuchen", nextNode: "ch6_bill_prompt" },
    ],
  },

  ch6_bill_paid: {
    id: "ch6_bill_paid",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Sehr gerne. Das macht sechs Euro achtzig.",
    lenaMood: "confident",
    npcImage: "waiter_neutral.png",
    highlightVocab: true,
    choices: [
      { text: "Sieben Euro fünfzig — stimmt so, danke!", nextNode: "ch6_bill_farewell" },
    ],
  },

  ch6_bill_farewell: {
    id: "ch6_bill_farewell",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Vielen Dank, junge Dame! Gute Reise nach Prag — und auf Wiedersehen in Wien!",
    lenaMood: "happy",
    npcImage: "waiter_neutral.png",
    highlightVocab: true,
    choices: [
      { text: "Weiter", nextNode: "ch6_reflect_1" },
    ],
  },

  // ── Looking back over the whole trip ───────────────────────────────────

  ch6_reflect_1: {
    id: "ch6_reflect_1",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Am Anfang hatte ich Angst vor einem einzigen Wort. Und jetzt sitze ich hier und habe ein echtes Gespräch auf Deutsch – beim Kaffee.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch6_reflect_2" },
    ],
  },

  ch6_reflect_2: {
    id: "ch6_reflect_2",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Ein letzter Blick in das gemütliche Café. Dann geht's zum Bahnhof.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch6_departure" },
    ],
  },

  ch6_departure: {
    id: "ch6_departure",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Vor drei Tagen war diese Halle riesig und voller Wörter, die ich nicht sagen konnte. Jetzt ist sie einfach nur ein Bahnhof.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch6_platform" },
    ],
  },

  ch6_platform: {
    id: "ch6_platform",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Erzähler",
    text: "'Railjet nach Prag, Bahnsteig 7.' Lena nimmt den Griff ihres Koffers, schaut ein letztes Mal zurück — und lächelt.",
    lenaMood: "happy",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "In den Zug einsteigen", nextNode: "ch6_train_1" },
    ],
  },

  // ── On the train home: a mirror of the prologue ─────────────────────────

  ch6_train_1: {
    id: "ch6_train_1",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Der gleiche Zug. Der gleiche Platz am Fenster. Vor drei Tagen habe ich genau hier gesessen und gedacht: Bitte, fragt mich niemand etwas.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Aus dem Fenster schauen", nextNode: "ch6_train_2" },
    ],
  },

  ch6_train_2: {
    id: "ch6_train_2",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Jedes Wort, das ich aus Angst nicht gesagt habe, war ein Gespräch, das ich nie hatte. Damit ist jetzt Schluss.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Weiter", nextNode: "ch6_train_3" },
    ],
  },

  ch6_train_3: {
    id: "ch6_train_3",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Eine Sprache muss nicht perfekt sein. Man braucht nur den Mut, trotzdem zu sprechen. Auf Wiedersehen, Wien!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Reise beenden", nextNode: "journey_complete" },
    ],
  },
};

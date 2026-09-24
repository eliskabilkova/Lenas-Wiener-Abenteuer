/**
 * Story data for the visual novel.
 * UI narration and Lena's thoughts are in English.
 * Character dialogue and educational choices are in German.
 */
const storyData = {

  chapter_1_title: {
    id: "chapter_1_title",
    background: "black",
    speaker: "System",
    text: "Chapter 1: Ankunft",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Start Chapter", nextNode: "train_intro_1" },
    ],
  },

  // ── Prologue: On the train ────────────────────────────────────────────────

  train_intro_1: {
    id: "train_intro_1",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Wow, I can't believe it's finally happening! The train from Prague is almost in Vienna. This is my very first solo trip abroad. I'm so excited, but also a little bit terrified...",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Look out the window", nextNode: "train_intro_2" },
    ],
  },

  train_intro_2: {
    id: "train_intro_2",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I've spent years studying German in school back in Prague, but whenever I'm supposed to actually speak, I completely freeze. I'm so tired of being scared. This trip to Vienna isn't about becoming a fluent expert overnight—it's about finally breaking that barrier, stepping out of my comfort zone, and proving to myself that I can survive in a German-speaking city. It's time to start.",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Get off the train", nextNode: "start_arrival_excited" },
    ],
  },

  // ── Scene 1: Arrival & vocabulary onboarding ─────────────────────────────

  start_arrival_excited: {
    id: "start_arrival_excited",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena",
    text: "I made it to Vienna! Alright, let me take a deep breath... Here we go!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "start_vocab_intro" },
    ],
  },

  start_vocab_intro: {
    id: "start_vocab_intro",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "To help me along the way, I brought my trusty Vokabelheft! Whenever I see unfamiliar German words, I can check it in the top corner of the screen!",
    lenaMood: "thoughtful",
    npcImage: "none",
    highlightVocab: true,
    choices: [
      { text: "Continue", nextNode: "start" },
    ],
  },

  // ── Scene 1b: Asking for directions ──────────────────────────────────────

  start: {
    id: "start",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Here I am, Vienna Hauptbahnhof! It's huge... Okay, let me check the map to my hotel on my phone...",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Open Map on Phone", nextNode: "start_phone_dead" },
    ],
  },

  start_phone_dead: {
    id: "start_phone_dead",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh no! My phone is completely dead! It won't turn on... How am I going to find my hotel now? I need to ask someone for directions.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Look around the station", nextNode: "start_see_man" },
    ],
  },

  start_see_man: {
    id: "start_see_man",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Look, there is an old man standing over there! Let's go and ask him.",
    lenaMood: "normal",
    npcImage: "old_man_neutral.png",
    choices: [
      { text: "Continue", nextNode: "start_practice_prompt" },
    ],
  },

  start_practice_prompt: {
    id: "start_practice_prompt",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Wait, let's practice what to say first so I get it right!",
    lenaMood: "thoughtful",
    npcImage: "old_man_neutral.png",
    choices: [
      {
        text: "Start Practice / Üben",
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
    text: "Alright — I practiced this. Time to ask how to get to the hotel.",
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
    speaker: "Viennese Man",
    text: "Wie bitte?",
    lenaMood: "unsure",
    npcImage: "old_man_confused.png",
    choices: [
      { text: "Respond to the man", nextNode: "ch1_hotel_apology" },
    ],
  },

  ask_hotel_wrong_order: {
    id: "ask_hotel_wrong_order",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Viennese Man",
    text: "Wie bitte?",
    lenaMood: "unsure",
    npcImage: "old_man_confused.png",
    choices: [
      { text: "Respond to the man", nextNode: "ch1_hotel_apology" },
    ],
  },

  ch1_hotel_apology: {
    id: "ch1_hotel_apology",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena",
    text: "Entschuldigung, ich versuche es nochmal.",
    thought: "Come on Lena, you've got this!",
    lenaMood: "unsure",
    npcImage: "old_man_confused.png",
    choices: [
      { text: "Try again", nextNode: "start_ask_hotel" },
    ],
  },

  correct_ask: {
    id: "correct_ask",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Viennese Man",
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
    text: "Phew, I managed that!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Double-check the directions", nextNode: "ch1_review_route" },
    ],
  },

  ch1_review_route: {
    id: "ch1_review_route",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Let me double-check his directions in my head so I don't get lost!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [],
  },

  // ── Quiz 1: How do you reach the metro? ──────────────────────────────────

  start_quiz_transport: {
    id: "start_quiz_transport",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "How do you reach the metro from here?",
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
    text: "Which line and stop do you take?",
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
    text: "Which line and stop do you take?",
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
    text: "Where is the hotel when you exit the metro station?",
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
    text: "Where is the hotel when you exit the metro station?",
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
    text: "Where is the hotel when you exit the metro station?",
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
    text: "Where is the hotel when you exit the metro station?",
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
    text: "So, that's done! Hopefully I'll find my way correctly...",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Head to the hotel", nextNode: "black_screen" },
    ],
  },

  // ── End ───────────────────────────────────────────────────────────────────

  black_screen: {
    id: "black_screen",
    background: "black",
    speaker: "Narrator",
    text: "Later that day...",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "evaluate_quiz_results" },
    ],
  },

  arrival_success: {
    id: "arrival_success",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I made it! I understood every direction: geradeaus to the U-Bahn, U3 to Neubaugasse, and the hotel opposite the station next to the café. Maybe my German is better than I thought.",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "arrival_success_hotel" },
    ],
  },

  arrival_success_hotel: {
    id: "arrival_success_hotel",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "And the hotel looks great! Warm lights in the windows, that pretty old façade... After finding my way here on my own, just standing in front of it already feels like a little victory.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Enter the hotel", nextNode: "end_chapter_1" },
    ],
  },

  arrival_failure: {
    id: "arrival_failure",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh my god, I am exhausted... I must have taken a wrong turn somewhere along the way! I got completely lost. It's already completely dark outside, and the street lamps are the only things lighting my way. I finally found the hotel, but it's so late now! My head hurts...",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "arrival_failure_hotel" },
    ],
  },

  arrival_failure_hotel: {
    id: "arrival_failure_hotel",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Still... the hotel looks great. Warm windows, a pretty old façade, a quiet glow from the lobby. I'm exhausted and my head hurts, but at least I made it here. That already feels like enough for today.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Enter the hotel", nextNode: "end_chapter_1" },
    ],
  },

  hotel_lobby_arrival: {
    id: "hotel_lobby_arrival",
    background: "hotel_lobby.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "The lobby looks beautiful and warm. There is the reception desk over there. Okay, time for the next challenge... I just need to check in.",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch2_practice_prompt" },
    ],
  },

  ch2_practice_prompt: {
    id: "ch2_practice_prompt",
    background: "hotel_lobby.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "But first, let's practice what I'm going to say!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      {
        text: "Start Practice / Üben",
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
    text: "CHAPTER 2 - CHECK-IN",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Start Chapter", nextNode: "hotel_lobby_arrival" },
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
      { text: "Try again", nextNode: "ch2_reception_greet" },
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
      { text: "Try again", nextNode: "ch2_reception_greet" },
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
      { text: "[Tell her my phone number]", nextNode: "ch2_id_wrong_phone" },
      { text: "[Hand her my ID card]", nextNode: "ch2_id_correct" },
      { text: "[Repeat my full name clearly]", nextNode: "ch2_id_wrong_name" },
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
      { text: "Continue", nextNode: "ch2_meldezettel" },
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
      { text: "Try again", nextNode: "ch2_reception_id" },
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
      { text: "Try again", nextNode: "ch2_reception_id" },
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
      { text: "Continue", nextNode: "end_chapter_2" },
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
      { text: "Continue", nextNode: "end_chapter_2" },
    ],
  },

  // ── Chapter 3: Unterwegs ────────────────────────────────────────────────

  chapter_3_title: {
    id: "chapter_3_title",
    background: "black",
    speaker: "System",
    text: "Chapter 3: Unterwegs",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Start Chapter", nextNode: "ch3_morning_intro" },
    ],
  },

  ch3_morning_intro: {
    id: "ch3_morning_intro",
    background: "hotel_room.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Good morning, Vienna! I slept so well. Today is the big day – I am finally going to the city center to explore Stephansplatz and see the famous Stephansdom!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Get out of bed", nextNode: "ch3_morning_intro_architecture" },
    ],
  },

  ch3_morning_intro_architecture: {
    id: "ch3_morning_intro_architecture",
    background: "hotel_room.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I can't wait to see the giant architecture and soak in the atmosphere.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_practice_prompt" },
    ],
  },

  ch3_practice_prompt: {
    id: "ch3_practice_prompt",
    background: "hotel_room.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Let's practice some vocabulary first so I'm well prepared for today's adventure!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      {
        text: "Practice / Übung",
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
    text: "Okay, let's go to the U-Bahn station and figure out how local transport works!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Head to the station", nextNode: "ch3_station_arrival" },
    ],
  },

  ch3_station_arrival: {
    id: "ch3_station_arrival",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Now I just need a ticket, let's see...",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Check options", nextNode: "ch3_ticket_machine_intro" },
    ],
  },

  ch3_ticket_machine_intro: {
    id: "ch3_ticket_machine_intro",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I need to go to Stephansdom now, then to a park, and later back to the hotel. That's at least 3 metro trips today. A single ticket (Einzelfahrt) costs €2.40.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Next", nextNode: "ch3_ticket_machine_intro_fare" },
    ],
  },

  ch3_ticket_machine_intro_fare: {
    id: "ch3_ticket_machine_intro_fare",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I should buy whatever is cheaper for today: either individual tickets or a 24-hour pass. Also, since I'm a tourist and don't have an Austrian school ID, I must buy a standard adult fare.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Buy a ticket", nextNode: "ch3_ticket_machine" },
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
    text: "Yes! I did it! I finally have my ticket. Stephansdom, here I come!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_boarding" },
    ],
  },

  ch3_ticket_fail: {
    id: "ch3_ticket_fail",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oops! That ticket machine was a bit of a puzzle. After a few wrong clicks, I got a little confused, but luckily a friendly local student noticed my struggle and showed me what to select. It was a bit clumsy of me, but hey – now I have my ticket, I learned some new German words, and I'm ready to go! Stephansplatz, here I come!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_boarding" },
    ],
  },

  ch3_boarding: {
    id: "ch3_boarding",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, I'm down at the Neubaugasse station on the U3 line. I need to get to Stephansplatz. But there are two platforms! I need to check the overhead signs and choose the correct direction.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Look at line map", nextNode: "ch3_platform_map" },
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
      { text: "Choose platform", nextNode: "ch3_platform_choice" },
    ],
  },

  ch3_platform_choice: {
    id: "ch3_platform_choice",
    background: "u_bahn_station.jpg",
    speaker: "",
    text: "",
    lenaMood: "unsure",
    npcImage: "none",
    dialogueStyle: "u3-platform-boards",
    choices: [],
  },

  ch3_platform_wrong: {
    id: "ch3_platform_wrong",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Wait, Ottakring goes in the opposite direction!",
    lenaMood: "surprised",
    npcImage: "none",
    choices: [
      { text: "Try again", nextNode: "ch3_platform_choice" },
    ],
  },

  ch3_platform_correct: {
    id: "ch3_platform_correct",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Great, this train goes to Stephansplatz!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_train_ride" },
    ],
  },

  ch3_train_ride: {
    id: "ch3_train_ride",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "That was smooth! The U-Bahn comes so often here, and I love the voice announcing the stations.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Listen to announcements", nextNode: "ch3_train_arrival" },
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
      { text: "Continue", nextNode: "ch3_prepare_exit" },
    ],
  },

  ch3_prepare_exit: {
    id: "ch3_prepare_exit",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "That's my stop! I grab my bag and head towards the long escalator up to the surface.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_escalator_entry" },
    ],
  },

  ch3_escalator_entry: {
    id: "ch3_escalator_entry",
    background: "u_bahn_escalator.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "The escalator is long and crowded. I step on and look at the map on my phone, without noticing that I am blocking the left side.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_ubahn_bump" },
    ],
  },

  ch3_ubahn_bump: {
    id: "ch3_ubahn_bump",
    background: "u_bahn_escalator.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oops! Someone just bumped into me from behind quite hard...",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Turn around", nextNode: "ch3_ubahn_dialogue" },
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
      { text: "Reply to the man", nextNode: "ch3_ubahn_thought" },
    ],
  },

  ch3_ubahn_thought: {
    id: "ch3_ubahn_thought",
    background: "u_bahn_escalator.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh no, I blocked the way because I was looking at my map! What should I say to apologize politely?",
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
      { text: "Continue", nextNode: "ch3_station_exit" },
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
      { text: "Continue", nextNode: "ch3_station_exit" },
    ],
  },

  ch3_ubahn_confused: {
    id: "ch3_ubahn_confused",
    background: "u_bahn_escalator.jpg",
    speaker: "Wiener Mann",
    text: "Sagen Sie einmal, verstehen Sie kein Deutsch?! Gehen Sie auf die rechte Seite!",
    lenaMood: "surprised",
    npcImage: "commuter_man_annoyed.png",
    choices: [
      { text: "Continue", nextNode: "ch3_station_exit" },
    ],
  },

  ch3_station_exit: {
    id: "ch3_station_exit",
    background: "u_bahn_escalator.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Stand on the right, walk on the left... got it! Step by step, I'm learning how this city works.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Step out onto Stephansplatz", nextNode: "end_chapter_3" },
    ],
  },

  end_chapter_3: {
    id: "end_chapter_3",
    background: "u_bahn_station.jpg",
    speaker: "System",
    text: "End of Chapter 3",
    lenaMood: "none",
    npcImage: "none",
    choices: [],
  },

  // ── Kapitel 4: Das Herz von Wien ────────────────────────────────────────

  chapter_4_title: {
    id: "chapter_4_title",
    background: "black",
    speaker: "System",
    text: "Chapter 4: Das Herz von Wien",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Start Chapter", nextNode: "ch4_stephans_amazed" },
    ],
  },

  ch4_stephans_amazed: {
    id: "ch4_stephans_amazed",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh my goodness... It's huge! The roof has so many colors, and the tower goes all the way up into the clouds. I can't fit the whole cathedral in one photo! I'm just standing here with my mouth open...",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch4_square_crowds" },
    ],
  },

  ch4_square_crowds: {
    id: "ch4_square_crowds",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "And so many people! Tourists with cameras, street artists, music from every corner... The square is loud and full of life. I feel very small next to this giant church and this big crowd.",
    lenaMood: "surprised",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch4_stephans_intro" },
    ],
  },

  ch4_stephans_intro: {
    id: "ch4_stephans_intro",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "So this is the famous 'Steffl', as the locals call it. Seeing it in real life is completely different than in photos!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Admire Stephansdom", nextNode: "ch4_mozart_surprise" },
    ],
  },

  ch4_mozart_surprise: {
    id: "ch4_mozart_surprise",
    background: "stephansplatz.jpg",
    speaker: "Narrator",
    text: "ZAP! Suddenly, a man in a white wig and a red coat jumps right in front of Lena. He waves a handful of golden tickets!",
    lenaMood: "surprised",
    npcImage: "mozart_seller_neutral1.png",
    dialogueStyle: "narrator",
    effect: "jumpScare",
    choices: [
      { text: "Continue", nextNode: "ch4_mozart_seller" },
    ],
  },

  ch4_mozart_seller: {
    id: "ch4_mozart_seller",
    background: "stephansplatz.jpg",
    speaker: "Straßenverkäufer",
    text: "Hallo! Guten Tag! Suchen Sie klassische Musik? Mozart! Vivaldi! Konzert heute Abend im wunderschönen Saal! Nur heute super Angebot, nur für Sie, meine Dame!",
    lenaMood: "surprised",
    npcImage: "mozart_seller_neutral2.png",
    choices: [
      { text: "Continue", nextNode: "ch4_mozart_shock" },
    ],
  },

  ch4_mozart_shock: {
    id: "ch4_mozart_shock",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh! He scared me! Wait... I read about this online. In the city center, there are ticket sellers dressed as Mozart. They sell very expensive concert tickets to tourists. I have to be careful and say no!",
    lenaMood: "unsure",
    npcImage: "mozart_seller_neutral1.png",
    choices: [
      { text: "Reply to him", nextNode: "ch4_mozart_choice" },
    ],
  },

  ch4_mozart_choice: {
    id: "ch4_mozart_choice",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "What should I say to him?",
    lenaMood: "unsure",
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
    speaker: "Narrator",
    text: "The seller sees that Lena is not sure. He puts shiny brochures into her hands and stands in her way. He talks and talks about the 'best concert in Vienna'. Many minutes pass before she can finally walk away.",
    lenaMood: "unsure",
    npcImage: "mozart_seller_neutral1.png",
    dialogueStyle: "narrator",
    choices: [
      { text: "Continue", nextNode: "ch4_mozart_after" },
    ],
  },

  ch4_mozart_wrong_b: {
    id: "ch4_mozart_wrong_b",
    background: "stephansplatz.jpg",
    speaker: "Narrator",
    text: "He does not accept Lena's excuse. \"Keine Zeit? Das Konzert dauert nur zwei Stunden! Kommen Sie!\" He steps closer, and she feels trapped. It is hard to escape politely.",
    lenaMood: "unsure",
    npcImage: "mozart_seller_neutral1.png",
    dialogueStyle: "narrator",
    choices: [
      { text: "Continue", nextNode: "ch4_mozart_after" },
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
      { text: "Continue", nextNode: "ch4_mozart_after" },
    ],
  },

  ch4_mozart_after: {
    id: "ch4_mozart_after",
    background: "stephansplatz.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Whew, that was intense! The square is so busy. I need a moment of peace. I'll head inside the cathedral—the famous Stephansdom.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch4_cathedral_arrival" },
    ],
  },

  ch4_cathedral_arrival: {
    id: "ch4_cathedral_arrival",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, here I am right at Stephansdom! I've seen so many pictures, and I can't wait to finally see what it looks like on the inside.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch4_practice_prompt" },
    ],
  },

  ch4_practice_prompt: {
    id: "ch4_practice_prompt",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh, I see there's a rules board right in front of the entrance! I'd better brush up on my German so I know how to behave inside.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      {
        text: "Practice / Übung",
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
    text: "Okay, there it is—the official board: 'Verhaltensregeln im Stephansdom'. Let's see if I understand all the rules!",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch4_rules_game" },
    ],
  },

  ch4_rules_game: {
    id: "ch4_rules_game",
    background: "cathedral.jpg",
    speaker: "System",
    text: "",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [],
  },

  ch4_rules_perfect: {
    id: "ch4_rules_perfect",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Great, I understood all the rules. I'm ready to go inside!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Head inside", nextNode: "ch4_inside_atmosphere" },
    ],
  },

  ch4_rules_ok: {
    id: "ch4_rules_ok",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Hmm, I'm not entirely sure about all those rules... but let me head inside anyway!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Head inside", nextNode: "ch4_rules_fail_entry" },
    ],
  },

  ch4_rules_fail: {
    id: "ch4_rules_fail",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Hmm, I'm not entirely sure about all those rules... but let me head inside anyway!",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Head inside", nextNode: "ch4_rules_fail_entry" },
    ],
  },

  ch4_rules_fail_entry: {
    id: "ch4_rules_fail_entry",
    background: "cathedral_interior.jpg",
    speaker: "Narrator",
    text: "Lena walks in. But she did not really understand the rules: she still wears her cap, and she talks to herself very loudly. Heads turn. A warden in a dark uniform comes to her quickly.",
    lenaMood: "surprised",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Continue", nextNode: "ch4_warden_shush" },
    ],
  },

  ch4_warden_shush: {
    id: "ch4_warden_shush",
    background: "cathedral_interior.jpg",
    speaker: "Domaufseher",
    text: "Psst! Ruhe, bitte! Und keine Kappe im Dom!",
    lenaMood: "surprised",
    npcImage: "warden_stern.png",
    choices: [
      { text: "Continue", nextNode: "ch4_warden_sorry" },
    ],
  },

  ch4_warden_sorry: {
    id: "ch4_warden_sorry",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oops! How embarrassing. I quickly take off my cap and whisper 'Entschuldigung'. I have to be more careful in here.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Move on quietly", nextNode: "ch4_inside_atmosphere" },
    ],
  },

  // ── Inside the cathedral ────────────────────────────────────────────────

  ch4_inside_atmosphere: {
    id: "ch4_inside_atmosphere",
    background: "cathedral_interior.jpg",
    speaker: "Narrator",
    text: "Inside, everything is quiet. The church is huge. Tall stone columns go up like old trees. Colorful light falls through the glass windows onto the floor. The air smells like candles and old stone.",
    lenaMood: "surprised",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Continue", nextNode: "ch4_inside_thought" },
    ],
  },

  ch4_inside_thought: {
    id: "ch4_inside_thought",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "It's so much bigger than it looks from the outside. The silence is beautiful. What should I do here?",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Light a candle", nextNode: "ch4_candle" },
      { text: "Look around the cathedral", nextNode: "ch4_look_around" },
      { text: "Find the tower entrance", nextNode: "ch4_exit_cathedral" },
    ],
  },

  ch4_exit_blocked: {
    id: "ch4_exit_blocked",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Hold on, I haven't even explored the cathedral yet! I should look around first.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch4_inside_thought" },
    ],
  },

  // ── Look around: stained-glass atmosphere ───────────────────────────────

  ch4_look_around: {
    id: "ch4_look_around",
    background: "stained-glass.jpg",
    speaker: "Narrator",
    text: "Lena walks quietly down the main aisle towards the high altar.",
    lenaMood: "happy",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Continue", nextNode: "ch4_look_lena" },
    ],
  },

  ch4_look_lena: {
    id: "ch4_look_lena",
    background: "stained-glass.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I look up at the huge glass windows. The sunlight shines through them and creates beautiful red, gold, and blue light on the stone floor. It's so calm and quiet here.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Return to cathedral hall", nextNode: "ch4_inside_thought" },
    ],
  },

  ch4_candle: {
    id: "ch4_candle",
    background: "cathedral_candles.jpg",
    speaker: "Narrator",
    text: "Lena puts a coin into the small metal box and takes a thin candle. She lights it. Now her little flame burns together with many others — one small wish for her big journey.",
    lenaMood: "happy",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Continue", nextNode: "ch4_candle_words" },
    ],
  },

  ch4_candle_words: {
    id: "ch4_candle_words",
    background: "cathedral_candles.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Small light, big wishes. Now, I feel ready for the challenge.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch4_inside_thought" },
    ],
  },

  // ── Transition: standing before the Südturm door ───────────────────────

  ch4_exit_cathedral: {
    id: "ch4_exit_cathedral",
    background: "cathedral.jpg",
    speaker: "Narrator",
    text: "Lena walks back towards the side of the cathedral and stands before the small wooden door marked 'Südturm'.",
    lenaMood: "thoughtful",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Continue", nextNode: "ch4_exit_thought" },
    ],
  },

  ch4_exit_thought: {
    id: "ch4_exit_thought",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Before I take on those 343 steps to the sky, I need to pause for a second and write in my diary.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Open Tagebuch", nextNode: "end_chapter_4" },
    ],
  },

  // ── Kapitel 5: Dem Himmel so nah ────────────────────────────────────────

  chapter_5_title: {
    id: "chapter_5_title",
    background: "black",
    speaker: "System",
    text: "Chapter 5: Dem Himmel so nah",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Start Chapter", nextNode: "ch5_tower_entrance" },
    ],
  },

  ch5_tower_entrance: {
    id: "ch5_tower_entrance",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "343 steps all the way to the top? My legs are going to hate me tomorrow, but there's no way I'm leaving Vienna without seeing this view!",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Start climbing", nextNode: "ch5_climb_game" },
    ],
  },

  ch5_climb_game: {
    id: "ch5_climb_game",
    background: "cathedral_stairs.jpg",
    speaker: "System",
    text: "",
    lenaMood: "tired",
    npcImage: "none",
    choices: [],
  },

  // ── Climax: the view from the Türmerstube ───────────────────────────────

  ch5_tower_view: {
    id: "ch5_tower_view",
    background: "vienna_view.jpg",
    speaker: "Narrator",
    text: "As Lena steps out onto the viewing platform 136 meters above the city, a cool breeze hits her face. Spread out below her, Vienna stretches as far as the eye can see.",
    lenaMood: "surprised",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Continue", nextNode: "ch5_tower_lena" },
    ],
  },

  ch5_tower_lena: {
    id: "ch5_tower_lena",
    background: "vienna_view.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "343 steps... I actually made it! Wow... just look at this view. The iconic tiled roof is right beneath me, glittering in the sun. I can see the Giant Ferris Wheel over in Prater, the Danube cutting through the city, and the green hills in the distance.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Look closer at the city", nextNode: "ch5_tower_reflect" },
    ],
  },

  ch5_tower_reflect: {
    id: "ch5_tower_reflect",
    background: "vienna_view.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "When I first stepped off the train in Vienna, everything felt a bit intimidating. I was nervous to speak German, terrified of making silly mistakes or getting lost. But climbing these 343 steps feels just like this trip—it was tiring and I made mistakes, but I kept going one step at a time.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Take out diary", nextNode: "ch5_tower_triumph" },
    ],
  },

  ch5_tower_triumph: {
    id: "ch5_tower_triumph",
    background: "vienna_view.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Und jetzt bin ich ganz oben! I used to freeze up whenever I had to say a single word in German, but today proved that making mistakes isn't the end of the world. It really opened my eyes—speaking a language isn't about being perfect, it's just about having the courage to try. I need to write all of this down in my diary right now!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Write entry", nextNode: "end_chapter_5" },
    ],
  },

  // ── Kapitel 6: Epilog ───────────────────────────────────────────────────

  chapter_6_title: {
    id: "chapter_6_title",
    background: "black",
    speaker: "System",
    text: "Chapter 6: Epilog — Das Ende einer tollen Reise",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Start Chapter", nextNode: "ch6_morning_title" },
    ],
  },

  ch6_morning_title: {
    id: "ch6_morning_title",
    background: "black",
    speaker: "System",
    text: "The Next Morning — Lena's Final Day in Vienna...",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch6_cafe_arrival" },
    ],
  },

  // ── The Kaffeehaus: one last coffee, one last conversation ─────────────

  ch6_cafe_arrival: {
    id: "ch6_cafe_arrival",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Warm dark wood, marble tables, cups clinking somewhere behind me. A waiter in a black vest glides between the tables like he's done it a thousand times.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch6_cafe_thought" },
    ],
  },

  ch6_cafe_thought: {
    id: "ch6_cafe_thought",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "My last hour in Vienna, suitcase next to my chair. One more Melange before the train—and I'm ordering it in German.",
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
      { text: "Try again", nextNode: "ch6_waiter_greet" },
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
      { text: "Try again", nextNode: "ch6_waiter_greet" },
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
      { text: "Continue", nextNode: "ch6_waiter_smalltalk" },
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
      { text: "Try again", nextNode: "ch6_waiter_smalltalk" },
    ],
  },

  // He gently echoes the correct "seit drei Tagen" instead of correcting her.
  ch6_waiter_praise: {
    id: "ch6_waiter_praise",
    background: "kaffeehaus.jpg",
    speaker: "Herr Ober",
    text: "Ah, aus Prag! Seit drei Tagen in Wien? Wie wunderbar — und Ihr Deutsch ist wirklich gut, junge Dame. Respekt, die meisten Touristen sagen hier nur 'one coffee, please'.",
    lenaMood: "surprised",
    npcImage: "waiter_neutral.png",
    highlightVocab: true,
    choices: [
      { text: "Continue", nextNode: "ch6_praise_thought" },
    ],
  },

  ch6_praise_thought: {
    id: "ch6_praise_thought",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "A Viennese waiter just complimented my German! How did I get here?",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch6_bill_prompt" },
    ],
  },

  ch6_bill_prompt: {
    id: "ch6_bill_prompt",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "My Melange is empty and the clock says it's time. One last sentence in German, then the station.",
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
      { text: "Try again", nextNode: "ch6_bill_prompt" },
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
      { text: "Try again", nextNode: "ch6_bill_prompt" },
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
      { text: "Continue", nextNode: "ch6_reflect_1" },
    ],
  },

  // ── Looking back over the whole trip ───────────────────────────────────

  ch6_reflect_1: {
    id: "ch6_reflect_1",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "When I first arrived, I was terrified to say even a single word. Now I'm sitting here, having a real conversation in German over coffee.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch6_reflect_2" },
    ],
  },

  ch6_reflect_2: {
    id: "ch6_reflect_2",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "One last look around the cozy café, and I'm off to the station.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch6_departure" },
    ],
  },

  ch6_departure: {
    id: "ch6_departure",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Three days ago this hall felt enormous, full of words I couldn't say. Now it's just a train station.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch6_platform" },
    ],
  },

  ch6_platform: {
    id: "ch6_platform",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Narrator",
    text: "'Railjet nach Prag, Bahnsteig 7.' Lena takes the handle of her suitcase, looks back one last time — and smiles.",
    lenaMood: "happy",
    npcImage: "none",
    dialogueStyle: "narrator",
    choices: [
      { text: "Board the train", nextNode: "ch6_train_1" },
    ],
  },

  // ── On the train home: a mirror of the prologue ─────────────────────────

  ch6_train_1: {
    id: "ch6_train_1",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Same train. Same window seat. Three days ago I sat right here and prayed that nobody would ask me anything.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Look out the window", nextNode: "ch6_train_2" },
    ],
  },

  ch6_train_2: {
    id: "ch6_train_2",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Every word I was too afraid to say was a conversation I never got to have. I'm done missing those.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch6_train_3" },
    ],
  },

  ch6_train_3: {
    id: "ch6_train_3",
    background: "train_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Language isn't about being perfect. It's about having the courage to speak anyway. Auf Wiedersehen, Wien!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Complete Journey", nextNode: "journey_complete" },
    ],
  },
};

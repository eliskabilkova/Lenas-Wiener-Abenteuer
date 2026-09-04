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
    npcImage: "old_man_friendly.png",
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
    background: "vienna_street.jpg",
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
    background: "vienna_street.jpg",
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
    background: "vienna_street.jpg",
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
    background: "vienna_street.jpg",
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
    background: "vienna_street.jpg",
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
    background: "vienna_street.jpg",
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
    background: "vienna_street.jpg",
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
    background: "vienna_street.jpg",
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
    npcImage: "receptionist_neutral.png",
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
    npcImage: "receptionist_neutral.png",
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
    npcImage: "receptionist_neutral.png",
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
    npcImage: "receptionist_neutral.png",
    npcMood: "happy",
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
    npcMood: "uncertain",
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
    background: "u_bahn_station.jpg",
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
    background: "u_bahn_station.jpg",
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
    background: "u_bahn_station.jpg",
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
    background: "u_bahn_station.jpg",
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
    background: "u_bahn_station.jpg",
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
    background: "u_bahn_station.jpg",
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
    background: "u_bahn_station.jpg",
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
    background: "u_bahn_station.jpg",
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

  // ── Kapitel 4: Dem Himmel so nah ────────────────────────────────────────

  chapter_4_title: {
    id: "chapter_4_title",
    background: "black",
    speaker: "System",
    text: "Chapter 4: Dem Himmel so nah",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Start Chapter", nextNode: "ch4_stephans_amazed" },
    ],
  },

  ch4_stephans_amazed: {
    id: "ch4_stephans_amazed",
    background: "cathedral.jpg",
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
    background: "cathedral.jpg",
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
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Stephansdom, or St. Stephen's Cathedral, is the symbol of Vienna. It is a huge Gothic church from the 12th century. People from Vienna call it 'Steffl' because of its tall tower. I saw it in so many pictures — and now it is real!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Admire Stephansdom", nextNode: "ch4_mozart_surprise" },
    ],
  },

  ch4_mozart_surprise: {
    id: "ch4_mozart_surprise",
    background: "cathedral.jpg",
    speaker: "Narrator",
    text: "*ZAP!* Suddenly, a man in a white wig and a red coat jumps right in front of me. He waves a handful of golden tickets!",
    lenaMood: "surprised",
    npcImage: "mozart_seller_pushy.png",
    dialogueStyle: "sensory",
    effect: "jumpScare",
    choices: [
      { text: "Continue", nextNode: "ch4_mozart_seller" },
    ],
  },

  ch4_mozart_seller: {
    id: "ch4_mozart_seller",
    background: "cathedral.jpg",
    speaker: "Straßenverkäufer",
    text: "Hallo! Guten Tag! Suchen Sie klassische Musik? Mozart! Vivaldi! Konzert heute Abend im wunderschönen Saal! Nur heute super Angebot, nur für Sie, meine Dame!",
    lenaMood: "surprised",
    npcImage: "mozart_seller_pushy.png",
    choices: [
      { text: "Continue", nextNode: "ch4_mozart_shock" },
    ],
  },

  ch4_mozart_shock: {
    id: "ch4_mozart_shock",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh! He scared me! Wait... I read about this online. In the city center, there are ticket sellers dressed as Mozart. They sell very expensive concert tickets to tourists. I have to be careful and say no!",
    lenaMood: "unsure",
    npcImage: "mozart_seller_pushy.png",
    choices: [
      { text: "Reply to him", nextNode: "ch4_mozart_choice" },
    ],
  },

  ch4_mozart_choice: {
    id: "ch4_mozart_choice",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "What should I say to him?",
    lenaMood: "unsure",
    npcImage: "mozart_seller_pushy.png",
    instantText: true,
    choices: [
      { text: "Ich weiß nicht... Ist das Konzert gut?", nextNode: "ch4_mozart_wrong_a" },
      { text: "Es tut mir leid, aber ich keine Zeit für Musik habe.", nextNode: "ch4_mozart_wrong_b" },
      { text: "Nein, danke. Ich habe heute schon andere Pläne.", nextNode: "ch4_mozart_correct" },
    ],
  },

  ch4_mozart_wrong_a: {
    id: "ch4_mozart_wrong_a",
    background: "cathedral.jpg",
    speaker: "Narrator",
    text: "The seller sees that I am not sure. He puts shiny brochures into my hands and stands in my way. He talks and talks about the 'best concert in Vienna'. Many minutes pass before I can finally walk away.",
    lenaMood: "unsure",
    npcImage: "mozart_seller_pushy.png",
    choices: [
      { text: "Continue", nextNode: "ch4_mozart_after" },
    ],
  },

  ch4_mozart_wrong_b: {
    id: "ch4_mozart_wrong_b",
    background: "cathedral.jpg",
    speaker: "Narrator",
    text: "He does not accept my excuse. \"Keine Zeit? Das Konzert dauert nur zwei Stunden! Kommen Sie!\" He steps closer, and I feel trapped. It is hard to escape politely.",
    lenaMood: "unsure",
    npcImage: "mozart_seller_pushy.png",
    choices: [
      { text: "Continue", nextNode: "ch4_mozart_after" },
    ],
  },

  ch4_mozart_correct: {
    id: "ch4_mozart_correct",
    background: "cathedral.jpg",
    speaker: "Straßenverkäufer",
    text: "Schade! Schönen Tag noch!",
    lenaMood: "normal",
    npcImage: "mozart_seller_neutral.png",
    choices: [
      { text: "Continue", nextNode: "ch4_mozart_after" },
    ],
  },

  ch4_mozart_after: {
    id: "ch4_mozart_after",
    background: "cathedral.jpg",
    speaker: "Lena",
    text: "Whew, that was intense! The square is so busy. I need a moment of peace. I'll head inside the cathedral—the famous Stephansdom.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Walk into Stephansdom", nextNode: "ch4_rules_intro" },
    ],
  },

  // ── Entrance mini-game: match the visitor rules ─────────────────────────

  ch4_rules_intro: {
    id: "ch4_rules_intro",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Wait, there's a sign here with rules for visitors. I should read it carefully so I don't cause any trouble inside. Let's see if I can understand these rules...",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Read the sign", nextNode: "ch4_rules_game" },
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
    speaker: "Lena",
    text: "Great, I understood all the rules. I'm ready to go inside!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Step inside", nextNode: "ch4_inside_atmosphere" },
    ],
  },

  ch4_rules_ok: {
    id: "ch4_rules_ok",
    background: "cathedral.jpg",
    speaker: "Lena",
    text: "I got a bit confused with some rules, but I think I've got it now.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Step inside", nextNode: "ch4_inside_atmosphere" },
    ],
  },

  ch4_rules_fail: {
    id: "ch4_rules_fail",
    background: "cathedral_interior.jpg",
    speaker: "Narrator",
    text: "Lena walks in. But she did not really understand the rules: she still wears her cap, and she talks to herself very loudly. Heads turn. A warden in a dark uniform comes to her quickly.",
    lenaMood: "surprised",
    npcImage: "none",
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
    dialogueStyle: "sensory",
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
      { text: "Look around the cathedral", nextNode: "ch4_time_passes" },
      { text: "Find the tower entrance", nextNode: "ch4_exit_cathedral" },
    ],
  },

  // ── Optional: taking a moment to look around ────────────────────────────

  ch4_time_passes: {
    id: "ch4_time_passes",
    background: "black",
    speaker: "System",
    text: "A few minutes later...",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch4_look_around" },
    ],
  },

  ch4_look_around: {
    id: "ch4_look_around",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "The Gothic architecture is breathtaking. Those stained glass windows are so colorful, and the columns feel like they're touching the sky. I'm glad I took a moment to just soak it all in. Now, I'm ready to find that tower!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Light a candle", nextNode: "ch4_candle" },
      { text: "Find the tower entrance", nextNode: "ch4_exit_cathedral" },
    ],
  },

  ch4_candle: {
    id: "ch4_candle",
    background: "cathedral_interior.jpg",
    speaker: "Narrator",
    text: "Lena puts a coin into the small metal box and takes a thin candle. She lights it. Now her little flame burns together with many others — one small wish for her big journey.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch4_candle_words" },
    ],
  },

  ch4_candle_words: {
    id: "ch4_candle_words",
    background: "cathedral_interior.jpg",
    speaker: "Lena",
    text: "Small light, big wishes. Now, I feel ready for the challenge.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Find the tower entrance", nextNode: "ch4_exit_cathedral" },
    ],
  },

  // ── Transition: back outside, finding the Südturm door ─────────────────

  ch4_exit_cathedral: {
    id: "ch4_exit_cathedral",
    background: "cathedral.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Back outside, the sunlight is bright and the square is loud again. What a contrast! Now... where is the entrance to the South Tower (Südturm)? There! A small door on the side of the church, with a sign: 'Südturm'. It looks so tiny next to this giant cathedral.",
    lenaMood: "thoughtful",
    npcImage: "none",
    choices: [
      { text: "Open the small door", nextNode: "ch4_tower_entrance" },
    ],
  },

  // ── The Südturm climb ───────────────────────────────────────────────────

  ch4_tower_entrance: {
    id: "ch4_tower_entrance",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Here are the stairs. The sign says: 343 Stufen (steps) to the top. No elevator here. Should I?",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Start the climb (343 steps)", nextNode: "ch4_climb_1" },
    ],
  },

  ch4_climb_1: {
    id: "ch4_climb_1",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, let's go! The stone steps are old and very narrow. The staircase turns and turns, like a snail shell. Step 100 already — this is easy! ...Okay, maybe not so easy.",
    lenaMood: "happy",
    npcImage: "none",
    climbStage: 1,
    choices: [
      { text: "Keep climbing", nextNode: "ch4_climb_2" },
    ],
  },

  ch4_climb_2: {
    id: "ch4_climb_2",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Step 200... Puh! My legs are heavy and I am out of breath. My heart is beating so fast. How do the bell ringers do this every day?!",
    lenaMood: "tired",
    npcImage: "none",
    climbStage: 2,
    choices: [
      { text: "Don't stop now!", nextNode: "ch4_climb_3" },
    ],
  },

  ch4_climb_3: {
    id: "ch4_climb_3",
    background: "cathedral_interior.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Step 300... I can't feel my legs anymore. But wait — there is more light coming through the small windows! The top must be very close. Come on, Lena, only a few more steps!",
    lenaMood: "exhausted",
    npcImage: "none",
    climbStage: 3,
    choices: [
      { text: "Push to the top", nextNode: "ch4_tower_view" },
    ],
  },

  // ── The reward: the view from the Türmerstube ───────────────────────────

  ch4_tower_view: {
    id: "ch4_tower_view",
    background: "vienna_view.jpg",
    speaker: "Narrator",
    text: "The Tower Room (Türmerstube). Lena looks out the window. Wow! She can see all of Vienna. Right below her is the famous colorful roof of the cathedral. In the distance, she can see the giant Ferris Wheel (Riesenrad) and many green hills. It is beautiful!",
    lenaMood: "surprised",
    npcImage: "none",
    dialogueStyle: "sensory",
    choices: [
      { text: "Continue", nextNode: "ch4_tower_lena" },
    ],
  },

  ch4_tower_lena: {
    id: "ch4_tower_lena",
    background: "vienna_view.jpg",
    speaker: "Lena",
    text: "I did it! 136 meters high. Vienna looks like a toy city from here. The 'Steffl' is truly the best spot in town.",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Take a photo and go back down", nextNode: "end_chapter_4" },
    ],
  },

  // ── Kapitel 5: Epilog ───────────────────────────────────────────────────

  chapter_6_title: {
    id: "chapter_6_title",
    background: "black",
    speaker: "System",
    text: "Chapter 5: Epilog — Das Ende einer tollen Reise",
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
      { text: "Continue", nextNode: "ch6_cafe_scene" },
    ],
  },

  ch6_cafe_scene: {
    id: "ch6_cafe_scene",
    background: "kaffeehaus.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I'm sitting in this beautiful Viennese café, enjoying my last Melange before my train back to Prague. Looking back at this week, I'm so proud of myself! From asking for directions to finding my way through the U-Bahn and visiting Stephansdom... I actually spoke German every day!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Write in the Tagebuch", nextNode: "end_chapter_6" },
    ],
  },

  ch6_departure: {
    id: "ch6_departure",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "My train leaves in an hour from Hauptbahnhof. Tschüss Wien, auf Wiedersehen!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Complete Journey", nextNode: "journey_complete" },
    ],
  },
};

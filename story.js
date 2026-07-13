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
      { text: "Get off the train", nextNode: "start" },
    ],
  },

  // ── Scene 1: Asking for directions ───────────────────────────────────────

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
      { text: "Entschuldigung, wie komme ich zum Hotel 'Wiener Traum'?", nextNode: "correct_ask" },
      { text: "Hey du! Wo ist mein Hotel?", nextNode: "wrong_rude" },
      { text: "Ich suchen nach ein Hotel hier...", nextNode: "wrong_grammar" },
    ],
  },

  wrong_rude: {
    id: "wrong_rude",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Viennese Man",
    text: "Na bumm... Ein bisschen höflicher bitte, junge Dame! Wie kann ich helfen?",
    lenaMood: "unsure",
    npcImage: "old_man_confused.png",
    choices: [],
  },

  wrong_grammar: {
    id: "wrong_grammar",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Viennese Man",
    text: "Wie bitte? Ich habe dich nicht ganz verstanden. Was suchst du?",
    lenaMood: "unsure",
    npcImage: "old_man_confused.png",
    choices: [],
  },

  correct_ask: {
    id: "correct_ask",
    background: "vienna_hauptbahnhof.jpg",
    speaker: "Viennese Man",
    text: "Servus! Kein Problem. Fahr mit der U-Bahn U3 bis zur Station 'Neubaugasse'. Das Hotel ist direkt in der Mitte der Straße. Alles klar?",
    lenaMood: "normal",
    npcImage: "old_man_friendly.png",
    choices: [
      { text: "Vielen Dank für die Hilfe! Auf Wiedersehen!", nextNode: "start_quiz_transport" },
    ],
  },

  // ── Quiz 1: Which transport? ──────────────────────────────────────────────

  start_quiz_transport: {
    id: "start_quiz_transport",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "The man was very nice! But wait... what exactly did he say? My German is still a bit shaky. Which means of transport should I take?",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Mit dem Bus", nextNode: "quiz_stop_wrong_transport" },
      { text: "Mit der Straßenbahn", nextNode: "quiz_stop_wrong_transport" },
      { text: "Mit der U-Bahn U3", nextNode: "quiz_stop_correct_transport" },
    ],
  },

  // ── Quiz 2: Which station? ────────────────────────────────────────────────

  quiz_stop_correct_transport: {
    id: "quiz_stop_correct_transport",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, I feel good about the U-Bahn U3. That sounded right. Now I need to remember the station. He said a name very clearly...",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Station 'Karlsplatz'", nextNode: "quiz_house_correct_transport_wrong_stop" },
      { text: "Station 'Neubaugasse'", nextNode: "quiz_house_correct_transport_correct_stop" },
      { text: "Station 'Stephansplatz'", nextNode: "quiz_house_correct_transport_wrong_stop" },
    ],
  },

  quiz_stop_wrong_transport: {
    id: "quiz_stop_wrong_transport",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh no... the moment I chose that, I started doubting myself. Did he really say that transport? I can't go back now. I still need to remember the station.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Station 'Karlsplatz'", nextNode: "quiz_house_wrong_transport_wrong_stop" },
      { text: "Station 'Neubaugasse'", nextNode: "quiz_house_wrong_transport_correct_stop" },
      { text: "Station 'Stephansplatz'", nextNode: "quiz_house_wrong_transport_wrong_stop" },
    ],
  },

  // ── Quiz 3: Where exactly is the hotel? ──────────────────────────────────

  quiz_house_correct_transport_correct_stop: {
    id: "quiz_house_correct_transport_correct_stop",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "U-Bahn U3 and Neubaugasse. Yes, that feels right! I am almost there. One last detail: where exactly did he say the hotel is on the street?",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "In der Mitte der Straße", nextNode: "black_screen" },
      { text: "Am Ende der Straße", nextNode: "black_screen" },
      { text: "Hinter dem Bahnhof", nextNode: "black_screen" },
    ],
  },

  quiz_house_correct_transport_wrong_stop: {
    id: "quiz_house_correct_transport_wrong_stop",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I think I chose the right transport, but that station answer felt shaky. Still, I need to keep going. Where did he say the hotel is on the street?",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "In der Mitte der Straße", nextNode: "black_screen" },
      { text: "Hinter dem Bahnhof", nextNode: "black_screen" },
      { text: "Am Ende der Straße", nextNode: "black_screen" },
    ],
  },

  quiz_house_wrong_transport_correct_stop: {
    id: "quiz_house_wrong_transport_correct_stop",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "At least Neubaugasse sounds familiar. But I still feel nervous about the transport. Focus, Lena. What did he say about the hotel location?",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "In der Mitte der Straße", nextNode: "black_screen" },
      { text: "Am Ende der Straße", nextNode: "black_screen" },
      { text: "Hinter dem Bahnhof", nextNode: "black_screen" },
    ],
  },

  quiz_house_wrong_transport_wrong_stop: {
    id: "quiz_house_wrong_transport_wrong_stop",
    background: "vienna_street.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "This is bad... I am not confident about the transport or the station anymore. But I have to make one last decision. Where did he say the hotel is?",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "In der Mitte der Straße", nextNode: "black_screen" },
      { text: "Am Ende der Straße", nextNode: "black_screen" },
      { text: "Hinter dem Bahnhof", nextNode: "black_screen" },
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
    text: "I made it! I understood every direction: U-Bahn U3, Neubaugasse, and the hotel in the middle of the street. Maybe my German is better than I thought.",
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
    text: "Oh my god, I am exhausted... I got completely lost and took so many wrong turns. It's already completely dark outside, and the street lamps are the only things lighting my way. I finally found the hotel, but it's so late now! My head hurts...",
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
      { text: "Approach the reception desk", nextNode: "ch2_reception_greet" },
    ],
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
    text: "Guten Tag! Herzlich willkommen im Hotel Kaiser. Haben Sie eine Reservierung?",
    lenaMood: "normal",
    npcImage: "receptionist_neutral.png",
    choices: [
      { text: "Hallo! Ich bin Lena. Ich brauche jetzt meinen Zimmerschlüssel.", nextNode: "ch2_greet_wrong_rude" },
      { text: "Guten Tag. Ja, ich habe eine Reservierung, weil ich möchte hier schlafen.", nextNode: "ch2_greet_wrong_grammar" },
      { text: "Guten Tag! Ich habe eine Reservierung auf den Namen Lena Majerová.", nextNode: "ch2_reception_id" },
    ],
  },

  ch2_greet_wrong_rude: {
    id: "ch2_greet_wrong_rude",
    background: "hotel_lobby.jpg",
    speaker: "Rezeptionistin",
    text: "Entschuldigung?! Ein bisschen Höflichkeit bitte... Wie war Ihr Name?",
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
    text: "Ah, ja, Lena Majerová, ich sehe es hier im System. Perfekt. Ich brauche jetzt noch Ihren Ausweis, bitte.",
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
    text: "Perfekt, danke! Ah, Frau Majerová – oder einfach Frau Majer, wie man hier in Wien sagen würde. Herzlich willkommen! Wenn Sie mir dann kurz diesen Meldezettel ausfüllen?",
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
    text: "Danke, das ist perfekt. Hier ist Ihr Zimmerschlüssel!",
    lenaMood: "normal",
    npcImage: "receptionist_neutral.png",
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
      { text: "Continue", nextNode: "ch3_morning_intro_architecture" },
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
      { text: "Continue", nextNode: "ch3_morning_intro_transport" },
    ],
  },

  ch3_morning_intro_transport: {
    id: "ch3_morning_intro_transport",
    background: "hotel_room.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "But first, I need to get to the U-Bahn station and figure out how the local transport works. Let's do this!",
    lenaMood: "happy",
    npcImage: "none",
    choices: [
      { text: "Head to the U-Bahn station", nextNode: "ch3_ticket_machine_intro" },
    ],
  },

  ch3_ticket_machine_intro: {
    id: "ch3_ticket_machine_intro",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, here's a Wiener Linien ticket machine. Let's see if I can figure out the right ticket in German...",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Use the ticket machine", nextNode: "ch3_ticket_machine" },
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

  ch3_ubahn_entry: {
    id: "ch3_ubahn_entry",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "The station is busy. I step onto the escalator and look at the map on my phone, without noticing that I am blocking the left side.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_ubahn_dialogue" },
    ],
  },

  ch3_ubahn_dialogue: {
    id: "ch3_ubahn_dialogue",
    background: "u_bahn_station.jpg",
    speaker: "Wiener Mann",
    text: "Heast, rechts stehen, links gehen!",
    lenaMood: "unsure",
    npcImage: "commuter_man_annoyed.png",
    choices: [
      { text: "Continue", nextNode: "ch3_ubahn_thought" },
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
      { text: "Ach, Entschuldigung! Ich habe auf die Karte geschaut und nicht aufgepasst. (Oh, sorry! I was looking at the map and wasn't paying attention.)", nextNode: "ch3_ubahn_polite" },
      { text: "Es tut mir leid, aber Sie können doch warten, oder? (I'm sorry, but you can wait, right?)", nextNode: "ch3_ubahn_rude" },
      { text: "Ja, links ist gut, danke! (Yes, left is good, thank you!)", nextNode: "ch3_ubahn_confused" },
    ],
  },

  ch3_ubahn_polite: {
    id: "ch3_ubahn_polite",
    background: "u_bahn_station.jpg",
    speaker: "Narrator",
    text: "The man grumbles but passes by.",
    lenaMood: "normal",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_phase1_end" },
    ],
  },

  ch3_ubahn_rude: {
    id: "ch3_ubahn_rude",
    background: "u_bahn_station.jpg",
    speaker: "Narrator",
    text: "The man gets angry and rants about rude tourists before moving on.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_phase1_end" },
    ],
  },

  ch3_ubahn_confused: {
    id: "ch3_ubahn_confused",
    background: "u_bahn_station.jpg",
    speaker: "Narrator",
    text: "The man shakes his head in annoyance and pushes past.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_phase1_end" },
    ],
  },

  ch3_phase1_end: {
    id: "ch3_phase1_end",
    background: "black",
    speaker: "Narrator",
    text: "Next station: Stephansplatz. The doors open...",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_placeholder_end" },
    ],
  },

  ch3_placeholder_end: {
    id: "ch3_placeholder_end",
    background: "cathedral.jpg",
    speaker: "System",
    text: "[The cathedral scene begins here.]",
    lenaMood: "none",
    npcImage: "none",
    choices: [
      { text: "Back to Main Menu", nextNode: "main_menu" },
    ],
  },
};

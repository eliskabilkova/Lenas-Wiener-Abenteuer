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
      { text: "Head to the station", nextNode: "ch3_ticket_machine_intro" },
    ],
  },

  ch3_ticket_machine_intro: {
    id: "ch3_ticket_machine_intro",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I need to go to Stephansdom now, then to a museum, and later back to the hotel. That's at least 3 metro trips today. A single ticket (Einzelfahrt) costs €2.40. Let me check the ticket machine. I should buy whatever is cheaper for today: either individual tickets or a 24-hour pass. Also, since I'm a tourist and don't have an Austrian school ID, I must buy a standard adult fare.",
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
      { text: "Look at the signs", nextNode: "ch3_platform_sign" },
    ],
  },

  ch3_platform_sign: {
    id: "ch3_platform_sign",
    background: "u_bahn_station.jpg",
    speaker: "Station Sign",
    text: "",
    lenaMood: "unsure",
    npcImage: "none",
    dialogueStyle: "metro-sign",
    choices: [
      { text: "Continue", nextNode: "ch3_platform_deduction" },
    ],
  },

  ch3_platform_deduction: {
    id: "ch3_platform_deduction",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Okay, there's the network map. I just need to check where Stephansplatz is located and choose the correct 'Endstation' (final destination) from the choices below.",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Gleis 1: U3 Richtung Ottakring", nextNode: "ch3_platform_wrong" },
      { text: "Gleis 2: U3 Richtung Simmering", nextNode: "ch3_platform_correct" },
    ],
  },

  ch3_platform_wrong: {
    id: "ch3_platform_wrong",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Oh no! After one stop, I realized the train is heading away from the center towards Ottakring. I had to get off and wait for the train going back. So embarrassing and such a waste of time!",
    lenaMood: "unsure",
    npcImage: "none",
    choices: [
      { text: "Continue", nextNode: "ch3_train_ride" },
    ],
  },

  ch3_platform_correct: {
    id: "ch3_platform_correct",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "Perfect! Simmering is the correct end station. Stephansplatz is just three stops away from here. The doors are opening, let's get in!",
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
    text: "The metro here is so clean! I love the voice announcing the stations.",
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
      { text: "Ach, Entschuldigung! Ich habe auf die Karte geschaut und nicht aufgepasst.", nextNode: "ch3_ubahn_polite" },
      { text: "Es tut mir leid, aber Sie können doch warten, oder?", nextNode: "ch3_ubahn_rude" },
      { text: "Ja, links ist gut, danke!", nextNode: "ch3_ubahn_confused" },
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
      { text: "Continue", nextNode: "ch3_station_exit" },
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
      { text: "Continue", nextNode: "ch3_station_exit" },
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
      { text: "Continue", nextNode: "ch3_station_exit" },
    ],
  },

  ch3_station_exit: {
    id: "ch3_station_exit",
    background: "u_bahn_station.jpg",
    speaker: "Lena (Internal Monologue)",
    text: "I'm almost at the exit. I can see the light... Stephansplatz, here I come!",
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
    text: "Kapitel 4: Das Herz von Wien",
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
      { text: "Walk to the Giant's Door (Riesentor)", nextNode: "ch4_rules_game" },
    ],
  },

  // ── Entrance mini-game: match the visitor rules ─────────────────────────

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
      { text: "Eine Kerze anzünden (Light a candle)", nextNode: "ch4_candle" },
      { text: "Head back outside to find the tower", nextNode: "ch4_exit_cathedral" },
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
      { text: "Head back outside to find the tower", nextNode: "ch4_exit_cathedral" },
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
};

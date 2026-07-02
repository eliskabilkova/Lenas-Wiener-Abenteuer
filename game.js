let gameState = {
  transport: null, // will store 'correct' or 'wrong'
  stop: null,      // will store 'correct' or 'wrong'
  house: null      // will store 'correct' or 'wrong'
};

/**
 * Visual Novel Game Engine
 * Node-based flow powered by storyData.
 */
(function () {
  "use strict";

  const START_NODE = "chapter_1_title";
  const TYPE_SPEED = 24;

  function resetGameState() {
    gameState.transport = null;
    gameState.stop = null;
    gameState.house = null;
  }

  const BACKGROUND_MAP = {
    "train_interior.jpg": "train_interior",
    "vienna_hauptbahnhof.jpg": "vienna_hauptbahnhof",
    "vienna_street.jpg": "vienna_street",
    "hotel_lobby.jpg": "cafe",
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
  };

  const LENA_MOOD_MAP = {
    normal: "neutral",
    unsure: "thoughtful",
    none: "neutral",
  };

  const REPLAY_CHOICES_FROM_NODE = {
    ch2_greet_wrong_rude: "ch2_reception_greet",
    ch2_greet_wrong_grammar: "ch2_reception_greet",
    ch2_id_wrong_phone: "ch2_reception_id",
    ch2_id_wrong_name: "ch2_reception_id",
  };

  const els = {
    game: document.getElementById("game"),
    startMenu: document.getElementById("start-menu"),
    startMainActions: document.getElementById("start-main-actions"),
    startGameBtn: document.getElementById("start-game-btn"),
    startChaptersBtn: document.getElementById("start-chapters-btn"),
    startChaptersSelection: document.getElementById("start-chapters-selection"),
    startChaptersBackBtn: document.getElementById("start-chapters-back-btn"),
    startChapterSelectButtons: Array.from(document.querySelectorAll(".start-chapter-select-btn")),
    startOptionsBtn: document.getElementById("start-options-btn"),
    startCreditsBtn: document.getElementById("start-credits-btn"),
    optionsPanel: document.getElementById("options-panel"),
    optionsBackBtn: document.getElementById("options-back-btn"),
    creditsPanel: document.getElementById("credits-panel"),
    creditsBackBtn: document.getElementById("credits-back-btn"),
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
    menuMainActions: document.getElementById("menu-main-actions"),
    restartBtn: document.getElementById("restart-btn"),
    startMenuFromGameBtn: document.getElementById("start-menu-from-game-btn"),
    closeMenuBtn: document.getElementById("close-menu-btn"),
  };

  const state = {
    nodeId: START_NODE,
    typing: false,
    waitingForChoice: false,
    fullText: "",
    typeTimer: null,
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
    const choices = getChoicesForCurrentNode(node);
    if (choices.length) {
      showChoices(choices);
    } else {
      els.advanceHint.classList.remove("is-hidden");
    }
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

  function renderDialogue(node) {
    hideChoices();
    applyTextFadeIn();

    const speaker = node.speaker || "";
    const isInternalMonologue = speaker.includes("Internal Monologue");

    els.dialogueText.classList.toggle("internal-thought", isInternalMonologue);
    els.speakerName.classList.remove("is-hidden");
    els.speakerName.textContent = isInternalMonologue ? "Lena" : speaker || "???";

    startTypewriter(node.text);
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
    if (node.id === "chapter_1_title" || node.id === "chapter_2_teaser") {
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
    return node?.id === "chapter_1_title" || node?.id === "chapter_2_teaser";
  }

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

  function showEndChapterScreen() {
    clearTypeTimer();
    state.typing = false;
    hideChoices();
    els.dialogueBox.hidden = true;
    els.npcContainer.classList.add("is-hidden");
    els.lenaContainer.classList.add("is-hidden");

    removeBlackScreen();
    els.dialogueBox.hidden = true;

    const overlay = document.createElement("div");
    overlay.id = "black-screen-overlay";
    overlay.className = "full-black-screen";

    const title = document.createElement("p");
    title.textContent = "Thanks for playing!";
    title.style.fontWeight = "800";
    title.style.fontSize = "clamp(2rem, 7vw, 4rem)";
    title.style.textAlign = "center";
    overlay.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.textContent = "Chapter 1 complete.";
    subtitle.style.fontSize = "clamp(1rem, 3vw, 1.5rem)";
    subtitle.style.marginTop = "0.75rem";
    subtitle.style.opacity = "0.8";
    overlay.appendChild(subtitle);

    const btn = document.createElement("button");
    btn.textContent = "Return to Main Menu";
    btn.addEventListener("click", () => {
      removeBlackScreen();
      els.startMenu.hidden = false;
      els.dialogueBox.hidden = true;
      els.npcContainer.style.display = "none";
      els.npcContainer.classList.add("is-hidden");
    });
    overlay.appendChild(btn);

    els.game.appendChild(overlay);
  }

  // ── Core render ──────────────────────────────────────────────────────────

  function renderNode() {
    const node = getNode();
    if (!node) return;

    if (node.id === "chapter_1_title" || node.id === "black_screen" || node.id === "chapter_2_teaser") {
      showBlackScreen(node);
      return;
    }

    // Make sure any leftover overlay from a previous visit is gone.
    removeBlackScreen();

    setBackground(node.background);
    updateCharacters(node);
    renderDialogue(node);
  }

  function advanceBeat() {
    const node = getNode();
    if (!node) return;

    if (state.typing) {
      finishTyping();
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

    return allCorrect ? "arrival_success" : "arrival_failure";
  }

  function routeToNode(nodeId) {
    if (nodeId === "evaluate_quiz_results") {
      goToNode(getQuizResultNodeId());
      return;
    }

    if (nodeId === "end_chapter_1") {
      showEndChapterScreen();
      return;
    }

    if (nodeId === "main_menu") {
      removeBlackScreen();
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
    hideChoices();
    renderNode();
  }

  function recordAnswer(choiceText, nextNodeId) {
    const currentNode = state.nodeId;

    if (currentNode === "start_quiz_transport") {
      gameState.transport = choiceText === "Mit der U-Bahn U3" ? "correct" : "wrong";
    } else if (
      currentNode === "quiz_stop_correct_transport" ||
      currentNode === "quiz_stop_wrong_transport"
    ) {
      gameState.stop = choiceText === "Station 'Neubaugasse'" ? "correct" : "wrong";
    } else if (currentNode.startsWith("quiz_house")) {
      gameState.house = choiceText === "In der Mitte der Straße" ? "correct" : "wrong";
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

  function showStartMainActions() {
    els.startMainActions.hidden = false;
    els.startChaptersSelection.hidden = true;
  }

  function showStartChaptersSelection() {
    els.startMainActions.hidden = true;
    els.startChaptersSelection.hidden = false;
  }

  function startGame() {
    hideStartMenu();
    removeBlackScreen();
    resetGameState();
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

  function showMainMenuActions() {
    els.menuMainActions.hidden = false;
  }

  function showStartMenuOnly() {
    els.startMainActions.hidden = true;
    els.startChaptersSelection.hidden = true;
  }

  function openOptionsPanel() {
    showStartMenuOnly();
    els.optionsPanel.hidden = false;
  }

  function closeOptionsPanel() {
    els.optionsPanel.hidden = true;
    showStartMainActions();
  }

  function openCreditsPanel() {
    showStartMenuOnly();
    els.creditsPanel.hidden = false;
  }

  function closeCreditsPanel() {
    els.creditsPanel.hidden = true;
    showStartMainActions();
  }

  function returnToStartMenu() {
    clearTypeTimer();
    state.typing = false;
    resetGameState();
    closeMenu();
    removeBlackScreen();
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
    hideChoices();
    resetGameState();
    els.dialogueText.textContent = "";
    els.speakerName.textContent = "";

    if (targetNodeId === "chapter_1_title") {
      els.chapterLabel.textContent = "Chapter 1 - Ankunft";
    } else if (targetNodeId === "chapter_2_teaser") {
      els.chapterLabel.textContent = "Chapter 2 - Check-in";
    }

    goToNode(targetNodeId);
  }

  function bindEvents() {
    els.dialogueBox.addEventListener("click", (event) => {
      if (event.target.closest(".choice-btn")) return;
      advanceBeat();
    });

    document.addEventListener("keydown", (event) => {
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
    els.startChapterSelectButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        jumpToChapter(btn.dataset.chapterNode);
      });
    });

    els.startOptionsBtn.addEventListener("click", openOptionsPanel);
    els.optionsBackBtn.addEventListener("click", closeOptionsPanel);
    els.startCreditsBtn.addEventListener("click", openCreditsPanel);
    els.creditsBackBtn.addEventListener("click", closeCreditsPanel);

    els.menuBtn.addEventListener("click", openMenu);
    els.closeMenuBtn.addEventListener("click", closeMenu);
    els.startMenuFromGameBtn.addEventListener("click", returnToStartMenu);

    els.restartBtn.addEventListener("click", () => {
      closeMenu();
      startGame();
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
  }

  init();
})();

const DEFAULT_EMAIL_INTRO = "Estamos com transporte de capacidade indisponível, verificar com urgência.";
const DEFAULT_OUTAGE_TEXT = "transporte de capacidade indisponível";

// Integração Zabbix - Massivas
const ZABBIX_API_URL = ""; // Ex: "https://zabbix.suaempresa.com.br/api_jsonrpc.php"
const ZABBIX_API_TOKEN = ""; // Adicione seu token de API Zabbix somente leitura aqui

function buildActionTaken(partnerName) {
  return `Aberto chamado com parceiro ${partnerName || "Operadora"}`;
}

const carrierProfiles = {
  CLARO: {
    display: "Claro",
    recipients: "chamado@claroatendimento.com.br",
    actionTaken: "Aberto chamado com parceiro Claro",
    nextAction: "Acionar a Claro",
    spokenWith: "Claro",
    channel: "Email",
    outageText: DEFAULT_OUTAGE_TEXT,
    emailIntro: DEFAULT_EMAIL_INTRO,
  },
  TELY: {
    display: "TELY",
    recipients: "monitoramento@tely.com.br",
    actionTaken: "Aberto chamado com parceiro TELY",
    nextAction: "Cobrar a TELY em 1 hora",
    spokenWith: "TELY",
    channel: "Email",
    outageText: DEFAULT_OUTAGE_TEXT,
    emailIntro: DEFAULT_EMAIL_INTRO,
  },
  TELEBRAS: {
    display: "Telebras",
    recipients: "",
    actionTaken: "Aberto chamado com parceiro Telebras",
    nextAction: "Acionar a Telebras",
    spokenWith: "Telebras",
    channel: "WhatsApp",
    phoneChannel: "0800 880 7000",
    outageText: DEFAULT_OUTAGE_TEXT,
    emailIntro: DEFAULT_EMAIL_INTRO,
  },
  TIM: {
    display: "Tim",
    recipients: "corporate@timbrasil.com.br",
    actionTaken: "Aberto chamado com parceiro Tim",
    nextAction: "Cobrar a Tim em 1 hora",
    spokenWith: "Tim",
    channel: "Telegram",
    outageText: DEFAULT_OUTAGE_TEXT,
    emailIntro: DEFAULT_EMAIL_INTRO,
  },
  VIVO: {
    display: "Vivo",
    recipients: "swap_backbone@indrabrasil.com.br; cire_backbone@indrabrasil.com.br",
    actionTaken: "Aberto chamado com parceiro Vivo",
    nextAction: "Cobrar a Vivo em 1 hora",
    spokenWith: "Vivo",
    channel: "Email",
    outageText: DEFAULT_OUTAGE_TEXT,
    emailIntro: DEFAULT_EMAIL_INTRO,
  },
};

const partnerContacts = {
  VIVO: {
    display: "VIVO",
    aliases: ["TELEFONICA"],
    recipients: "swap_backbone@indrabrasil.com.br; cire_backbone@indrabrasil.com.br",
    details: ['Supervisora "Camila Silvestre Botelho" <camila.botelho@telefonica.com>'],
  },
  TIM: {
    display: "TIM",
    recipients: "corporate@timbrasil.com.br",
    phone: "0800 888 2018",
  },
  TELXIUS: {
    display: "Telxius",
    recipients: "Customerservice.capacity@telxius.com; customerservice.ip@telxius.com; manageronduty@telxius.com",
  },
  TIWS: {
    display: "Tiws",
  },
  "ANGOLA TELECOM": {
    display: "Angola Telecom",
  },
  CIRION: {
    display: "CIRION",
    aliases: ["L3", "LUMEN", "CENTURY"],
    portal: "https://portal.ciriontechnologies.com/portal/#/login",
    user: "noc-L@alloha.com",
    password: "Alloha@2023",
    phone: "0800 887 3333 / +55 11 3957 2288",
    details: ["Alloha@20252025"],
  },
  INTERNEXA: {
    display: "Internexa",
  },
  RNP: {
    display: "RNP",
    recipients: "atendimento@rnp.br",
    phone: "+55 800 722 0216",
  },
  ITS: {
    display: "ITS",
    recipients: "suporte@itsbrasil.net",
  },
  TELY: {
    display: "Tely",
    recipients: '"Monitoramento" <monitoramento@tely.com.br>',
  },
  FLOWBIX: {
    display: "Flowbix",
    recipients: "meajuda@flowbix.com",
    phone: "+55 16 3190-1173",
    portal: "https://lkar.in/CmDT",
  },
  ANTEL: {
    display: "Antel",
    recipients: '"Customer Service" <customer-service@antel.net.uy>',
  },
  "ANET": {
    display: "ANET / SuperConnect",
    aliases: ["SUPERCONNECT"],
  },
  BRDIGITAL: {
    display: "BRDIGITAL",
    aliases: ["BR DIGITAL"],
    recipients: "noc@br.digital",
    phone: "Telefone/WhatsApp: 51 3022-9350",
  },
  GIGACANDANGA: {
    display: "Gigacandanga",
    recipients: 'pablo.maia@gigacandanga.net.br; "Valdir Silvério" <valdir.silverio@gigacandanga.net.br>; "Rafael Alves" <rafael.alves@gigacandanga.net.br>; "cristiane amorim" <cristiane.amorim@gigacandanga.net.br>; "Pablo Maia" <pablo.maia@gigacandanga.net.br>; contatos@gigacandanga.net.br',
  },
  GLOBENET: {
    display: "Globenet",
    recipients: '"GlobeNet NOC" <noc@globenet.net>',
  },
  "SEA TELECOM": {
    display: "Sea Telecom",
    recipients: "noc@seatelecom.com.br",
  },
  UPIX: {
    display: "UPIX",
    aliases: ["76TELECOM", "76 TELECOM"],
    recipients: '"support@upixnetworks.com" <support@upixnetworks.com>',
  },
  ALARES: {
    display: "Alares Telecom / Cabo Telecom",
    aliases: ["ALARES TELECOM", "CABO TELECOM"],
    phone: "+55 35 9255-3300 / +55 19 2018-6821",
    details: ["Portal Wpp"],
  },
  SOFTCOM: {
    display: "Softcom",
    recipients: '"Suporte NOC" <suporte@softdados.com>',
  },
  "ORA TELECOM": {
    display: "ORA Telecom",
    recipients: "cgr@oratelecom.com.br",
    phone: "WhatsApp: +55 86 2106-0202",
  },
  UMTELECOM: {
    display: "UMTELECOM",
    aliases: ["UM TELECOM"],
    recipients: '"Suporte Um Telecom" <suporte@1telecom.com.br>',
    phone: "WhatsApp: +55 55 3003-8411",
  },
  ZATEC: {
    display: "ZATEC",
  },
  ALGAR: {
    display: "Algar",
    phone: "+55 34 9889-2822",
  },
};

const descriptionData = {
  cnl: [],
  failureTypes: {},
  partners: [],
  loaded: false,
};

function useOperationalEmojis() {
  return readDefaults().useEmojis !== false;
}

function useDarkTheme() {
  return readDefaults().darkTheme === true;
}

function applyTheme() {
  document.body.classList.toggle("theme-dark-red", useDarkTheme());
  window.dispatchEvent(new CustomEvent("noc-theme-change", { detail: { dark: useDarkTheme() } }));
}

function emoji(value) {
  return useOperationalEmojis() ? value : "";
}

function withEmoji(value, text) {
  return `${emoji(value)}${emoji(value) ? " " : ""}${text}`;
}

const fields = {};

const dataUrls = {
  cnl: "descricao-main/data/codigos-cnl.json",
  failureTypes: "descricao-main/data/tipos-de-falhas.json",
  partners: "descricao-main/data/parceiras.json",
};

let previewTooltipEl = null;
let previewTooltipTarget = null;
let previewTooltipHideTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  [
    "events",
    "carrier",
    "internalTicket",
    "externalTicket",
    "designations",
    "bdeskTitle",
    "origin",
    "destination",
    "failureTime",
    "contact",
    "symptom",
    "diagnosis",
    "facilities",
    "actionTaken",
    "nextAction",
    "spokenWith",
    "channel",
    "forecast",
    "phoneChannel",
    "recipients",
    "copyTo",
    "greeting",
    "outageText",
    "requesterName",
    "failureType",
    "partner",
    "fiber",
    "descriptionMode",
    "hostA",
    "hostB",
    "descriptionOutput",
    "recognizeOutput",
    "openingOutput",
    "updateOutput",
    "emailOutput",
    "chargeOutput",
    "contactOutput",
    "status",
    "autoStatus",
    "launchScreen",
    "autoFlow",
    "massivasFlow",
    "autoEvents",
    "autoCarrier",
    "autoFailureType",
    "autoInternalTicket",
    "autoRecognizeActions",
    "massivasStatus",
    "massivasHosts",
    "massivasBdeskSubject",
    "massivasOpeningOutput",
    "massivasUpdatePhoneGroup",
    "massivasUpdateTxInfraTicket",
    "massivasUpdateSpokenWith",
    "massivasUpdateSpokenText",
    "massivasUpdateForecast",
    "massivasUpdateNextAction",
    "massivasDebugAlarms",
    "massivasSummary",
    "massivasTopologyGraph",
    "massivasTopologyCanvas",
    "massivasProgressFill",
    "parametersDialog",
    "paramContact",
    "paramRequesterName",
    "paramUseEmojis",
    "paramDarkTheme",
    "appTopProgressBar",
    "appTopProgressFill",
    "nocLoadingOverlay",
    "nocLoadingText",
    "nocErrorModal",
    "nocErrorMessage",
    "nocErrorDetails",
    "nocErrorDetailsWrap",
    "versionUpdateBanner",
    "versionUpdateActionBtn",
    "versionUpdateDismissBtn",
  ].forEach((id) => {
    fields[id] = document.getElementById(id);
  });

  initThreeBackground();
  loadDefaults();
  applyCarrierDefaults(fields.carrier.value, true);
  bindEvents();
  initPreviewTooltips();
  initVersionChecker();
  initErrorHandling();
  initButtonMicroInteractions();
  loadDescriptionData();
  renderOutput();
  renderIcons();
  
  // Listen for language changes
  window.addEventListener("noc-lang-change", () => {
    updateGreeting();
    renderOutput();
    updateStatusTranslations();
  });
  
  // Update language buttons
  updateLangButtons();
});

function updateLangButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === getLang());
  });
}

function updateStatusTranslations() {
  // Update status texts based on current language
  if (fields.autoStatus) {
    const autoStep = currentAutoStep();
    fields.autoStatus.textContent = `${t("step")} ${autoStep} ${t("of")} 5`;
  }
  if (fields.massivasStatus) {
    const massivasStep = currentMassivasStep();
    fields.massivasStatus.textContent = `${t("step")} ${massivasStep} ${t("of")} 3`;
  }
}

function renderIcons() {
  if (window.lucide) {
    lucide.createIcons({
      attrs: {
        "stroke-width": 2,
      },
    });
  }
}

function bindEvents() {
  document.getElementById("generatorForm").addEventListener("input", renderOutput);
  document.getElementById("startAutoButton").addEventListener("click", () => startMode("auto"));
  document.getElementById("startMassivasButton").addEventListener("click", () => startMode("massivas"));
  document.getElementById("parametersButton").addEventListener("click", openParametersDialog);
  document.getElementById("autoHomeButton").addEventListener("click", returnToLaunch);
  document.getElementById("autoManualButton").addEventListener("click", () => startMode("manual"));
  document.getElementById("manualHomeButton").addEventListener("click", returnToLaunch);
  document.getElementById("manualAutoButton").addEventListener("click", () => startMode("auto"));
  document.getElementById("massivasHomeButton").addEventListener("click", returnToLaunch);
  document.getElementById("autoFinishButton").addEventListener("click", restartAutoFlow);
  document.getElementById("massivasFinishButton").addEventListener("click", restartMassivasFlow);
  document.getElementById("autoConfirmStep1").addEventListener("click", confirmAutoStepOne);
  document.getElementById("massivasConfirmStep1").addEventListener("click", confirmMassivasStepOne);
  document.getElementById("massivasDebugButton").addEventListener("click", runMassivasDebugAnalysis);
  document.getElementById("cancelParametersButton").addEventListener("click", closeParametersDialog);
  document.getElementById("closeParametersButton").addEventListener("click", closeParametersDialog);
  document.getElementById("saveParametersButton").addEventListener("click", saveParametersFromDialog);

  document.querySelectorAll("[data-step-nav]").forEach((button) => {
    button.addEventListener("click", () => showAutoStep(Number(button.dataset.stepNav)));
  });

  document.querySelectorAll("[data-massivas-step-nav]").forEach((button) => {
    button.addEventListener("click", () => showMassivasStep(Number(button.dataset.massivasStepNav)));
  });

  fields.autoEvents.addEventListener("input", debounce(() => {
    setValue("events", fields.autoEvents.value);
    if (getValue("events")) parseEvents(false);
    syncAutoFieldsFromMain();
    renderOutput();
    showAutoPreview("description");
  }, 120));

  fields.autoCarrier.addEventListener("input", debounce(() => {
    applyCarrierDefaults(fields.autoCarrier.value, false);
    setValue("partner", fields.autoCarrier.value);
    renderOutput();
    showAutoPreview("description");
  }, 120));

  fields.autoFailureType.addEventListener("input", () => {
    setValue("failureType", fields.autoFailureType.value);
    syncSymptomWithFailureType();
    renderOutput();
    showAutoPreview("description");
  });

  fields.autoInternalTicket.addEventListener("input", () => {
    const pastedTicket = extractInternalTicket(fields.autoInternalTicket.value);
    setValue("internalTicket", pastedTicket || fields.autoInternalTicket.value.trim());
    toggleAutoRecognize();
    renderOutput();
    showAutoPreview("recognize");
  });

  document.querySelectorAll(".auto-next").forEach((button) => {
    button.addEventListener("click", () => showAutoStep(currentAutoStep() + 1));
  });

  document.querySelectorAll(".auto-prev").forEach((button) => {
    button.addEventListener("click", () => showAutoStep(currentAutoStep() - 1));
  });

  document.querySelectorAll(".massivas-next").forEach((button) => {
    button.addEventListener("click", () => showMassivasStep(currentMassivasStep() + 1));
  });

  document.querySelectorAll(".massivas-prev").forEach((button) => {
    button.addEventListener("click", () => showMassivasStep(currentMassivasStep() - 1));
  });

  fields.massivasHosts.addEventListener("input", () => {
    setValue("massivasSummary", buildMassivasSummaryFallback());
  });

  fields.massivasDebugAlarms.addEventListener("input", debounce(updateMassivasAlarmOrganization, 120));

    fields.events.addEventListener("input", debounce(() => {
    if (getValue("events")) {
      parseEvents(false);
      renderOutput();
    }
  }, 120));

  fields.carrier.addEventListener("change", () => {
    applyCarrierDefaults(fields.carrier.value, false);
    setValue("partner", fields.carrier.value);
    renderOutput();
  });

  fields.carrier.addEventListener("input", debounce(() => {
    const carrier = normalizeCarrierKey(fields.carrier.value);
    if (carrierProfiles[carrier]) applyCarrierDefaults(carrier, false);
    setValue("partner", carrier || fields.carrier.value);
    renderOutput();
  }, 120));

  fields.failureType.addEventListener("input", () => {
    syncSymptomWithFailureType();
    renderOutput();
  });

  document.querySelectorAll(".copy-action").forEach((button) => {
    button.addEventListener("click", () => {
      copyGenerated(button.dataset.copyKind);
    });
  });
}

function initPreviewTooltips() {
  if (previewTooltipEl) return;

  previewTooltipEl = document.createElement("div");
  previewTooltipEl.className = "preview-tooltip-float";
  previewTooltipEl.setAttribute("role", "tooltip");
  previewTooltipEl.hidden = true;
  previewTooltipEl.innerHTML = `
    <div class="preview-tooltip-float__label"></div>
    <div class="preview-tooltip-float__title"></div>
    <pre class="preview-tooltip-float__body"></pre>
  `;
  document.body.appendChild(previewTooltipEl);

  document.querySelectorAll("[data-preview-kind]").forEach((button) => {
    button.addEventListener("mouseenter", () => showPreviewTooltip(button));
    button.addEventListener("focus", () => showPreviewTooltip(button));
    button.addEventListener("mouseleave", hidePreviewTooltip);
    button.addEventListener("blur", hidePreviewTooltip);
  });

  window.addEventListener("scroll", hidePreviewTooltip, true);
  window.addEventListener("resize", hidePreviewTooltip);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hidePreviewTooltip();
  });
}

function startMode(mode) {
  showGlobalProgress(70, 200);
  document.body.classList.remove("app-not-started", "app-mode-auto", "app-mode-manual", "app-mode-massivas");
  document.body.classList.add(mode === "auto" ? "app-mode-auto" : mode === "massivas" ? "app-mode-massivas" : "app-mode-manual");

  if (mode === "auto") {
    fields.autoFlow.hidden = false;
    fields.massivasFlow.hidden = true;
    syncAutoFieldsFromMain();
    showAutoStep(1);
    animateAutoFlowIn();
  } else if (mode === "massivas") {
    fields.autoFlow.hidden = true;
    fields.massivasFlow.hidden = false;
    showMassivasStep(1);
    animateMassivasFlowIn();
  } else {
    fields.autoFlow.hidden = true;
    fields.massivasFlow.hidden = true;
    setStatus("Modo manual iniciado.");
    animateManualModeIn();
  }

  renderIcons();
  hideGlobalProgress();
}

function returnToLaunch() {
  showGlobalProgress(60, 180);
  document.body.classList.remove("app-mode-auto", "app-mode-manual", "app-mode-massivas");
  document.body.classList.add("app-not-started");
  fields.autoFlow.hidden = true;
  fields.massivasFlow.hidden = true;
  showAutoStep(1);
  showMassivasStep(1);
  animateLaunchIn();
  renderIcons();
  hideGlobalProgress();
}

function restartAutoFlow() {
  showGlobalProgress(80, 200);
  document.body.classList.remove("app-not-started", "app-mode-manual", "app-mode-massivas");
  document.body.classList.add("app-mode-auto");
  fields.autoFlow.hidden = false;
  fields.massivasFlow.hidden = true;
  resetAutoFlowFields();
  syncAutoFieldsFromMain();
  showAutoStep(1);
  setStatus("Novo acionamento pronto.");
  animateAutoFlowIn();
  renderIcons();
  hideGlobalProgress();
}

function restartMassivasFlow() {
  showGlobalProgress(80, 200);
  document.body.classList.remove("app-not-started", "app-mode-manual", "app-mode-auto");
  document.body.classList.add("app-mode-massivas");
  fields.autoFlow.hidden = true;
  fields.massivasFlow.hidden = false;
  resetMassivasFlowFields();
  showMassivasStep(1);
  setStatus("Nova massiva pronta.");
  animateMassivasFlowIn();
  renderIcons();
  hideGlobalProgress();
}

function openParametersDialog() {
  if (!fields.parametersDialog) return;

  fields.paramContact.value = getValue("contact");
  fields.paramRequesterName.value = getValue("requesterName");
  fields.paramUseEmojis.checked = useOperationalEmojis();
  fields.paramDarkTheme.checked = useDarkTheme();
  fields.parametersDialog.showModal();
}

function closeParametersDialog() {
  if (!fields.parametersDialog?.open) return;

  fields.parametersDialog.close();
}

function saveParametersFromDialog() {
  setValue("contact", fields.paramContact.value.trim());
  setValue("requesterName", fields.paramRequesterName.value.trim());
  saveDefaults();
  renderOutput();
  setStatus("Parâmetros salvos localmente.");
  showToast("Parâmetros salvos.");
  closeParametersDialog();
}

function resetAutoFlowFields() {
  [
    "events",
    "internalTicket",
    "externalTicket",
    "designations",
    "bdeskTitle",
    "origin",
    "destination",
    "failureTime",
    "phoneChannel",
    "hostA",
    "hostB",
    "contact",
  ].forEach((id) => setValue(id, ""));

  setValue("carrier", "CLARO");
  applyCarrierDefaults("CLARO", false);
  setValue("partner", "CLARO");
  setValue("failureType", "INDISPONIBILIDADE");
  syncSymptomWithFailureType();
  setValue("fiber", "ONLY");
  setValue("descriptionMode", "auto");
  renderOutput();
}

function confirmAutoStepOne() {
  setValue("events", fields.autoEvents.value);
  applyCarrierDefaults(fields.autoCarrier.value, false);
  setValue("partner", fields.autoCarrier.value);
  setValue("failureType", fields.autoFailureType.value || "INDISPONIBILIDADE");

  if (getValue("events")) parseEvents(false);
  syncAutoFieldsFromMain();
  syncSymptomWithFailureType();
  renderOutput();
  showAutoStep(2);
}

function resetMassivasFlowFields() {
  setValue("massivasHosts", "");
  setValue("massivasBdeskSubject", "");
  setValue("massivasOpeningOutput", "");
  setValue("massivasUpdatePhoneGroup", "");
  setValue("massivasUpdateTxInfraTicket", "");
  setValue("massivasUpdateSpokenWith", "");
  setValue("massivasUpdateSpokenText", "");
  setValue("massivasUpdateForecast", "Sem previsão");
  setValue("massivasUpdateNextAction", "");
  setValue("massivasDebugAlarms", "");
  setValue("massivasSummary", "");
}

function updateMassivasAlarmOrganization() {
  const alarmsText = getValue("massivasDebugAlarms");
  const hosts = uniqueValues(splitMassivasAlarmLines(alarmsText).map((line) => extractMassivaAffectedHost(parseMassivaAlarmLine(line))).filter(Boolean));

  setValue("massivasHosts", hosts.join("\n"));
  setValue("massivasOpeningOutput", buildMassivasOpening(alarmsText, hosts));
  setValue("massivasSummary", buildMassivasSummaryFallback());
  renderMassivasTopology(alarmsText);
}

function buildMassivasOpening(alarmsText, hosts) {
  const records = splitMassivasAlarmLines(alarmsText)
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .map(parseMassivaAlarmLine);
  const validRecords = records.filter((record) => record.raw);
  const problemRecords = validRecords.filter((record) => /\bPROBLEM\b/i.test(record.raw));
  const resolvedRecords = validRecords.filter((record) => /\bRESOLVED\b/i.test(record.raw));
  const affectedHosts = uniqueValues([
    ...hosts,
    ...validRecords.map(extractMassivaAffectedHost),
  ]);
  const startTimes = validRecords.map((record) => record.time).filter(Boolean).sort();
  const evidenceLines = validRecords.map(formatMassivasOpeningLine);
  const groups = groupAlarmLinesByHost(evidenceLines);
  const groupedEvidence = groups.map((group, index) => [
    `${withEmoji("🖥️", `HOST ${index + 1}`)}:`,
    ...group.lines,
  ].join("\n")).join("\n\n");
  const linkDownRecords = validRecords.filter((record) => /link\s*down|interface.*down|operational.*down/i.test(record.raw));
  const restartRecords = validRecords.filter((record) => /reinici|reboot|restart|uptime|started|cold start|warm start/i.test(record.raw));
  const triggerGroups = countBy(validRecords.map((record) => record.interfaceData.trigger).filter(Boolean));
  const deliveryGroups = countBy(validRecords.map((record) => record.interfaceData.deliveryType).filter(Boolean));
  const operatorGroups = countBy(validRecords.map((record) => record.interfaceData.operator).filter(Boolean));
  const causeGroups = classifyMassivasCauses(validRecords);
  const domains = inferMassivasDomains(deliveryGroups, triggerGroups);
  const topologyText = summarizeMassivasTopology(validRecords);
  const approachKeys = uniqueValues(linkDownRecords.map((record) => record.localInterface || record.interfaceData.remotePort));
  const multipleApproaches = linkDownRecords.length >= 2 && (affectedHosts.length >= 2 || approachKeys.length >= 2);
  const incidentGroups = countBy(validRecords.map((record) => [record.hosts[0], record.interfaceData.trigger, record.interfaceData.deliveryType].filter(Boolean).join("|")));
  const multipleIncidents = validRecords.length > 1 && (affectedHosts.length > 1 || Object.keys(incidentGroups).length > 1 || multipleApproaches);
  const simultaneous = hasSimultaneousImpact(validRecords);
  const repeatedRestart = restartRecords.some((record) => recordsForHost(restartRecords, record.hosts[0]).length >= 2);
  const diagnosis = buildMassivasConclusion({
    affectedHosts,
    validRecords,
    linkDownRecords,
    restartRecords,
    triggerGroups,
    deliveryGroups,
    operatorGroups,
    statusGroups: countBy(validRecords.map((record) => record.status).filter(Boolean)),
    causeGroups,
    domains,
    topologyText,
    multipleIncidents,
    multipleApproaches,
    simultaneous,
    repeatedRestart,
    includeTechnicalDetails: false,
  });
  const symptom = problemRecords.length
    ? affectedHosts.length > 1 || validRecords.length > 1 ? "INDISPONIBILIDADE - MÚLTIPLAS AFETAÇÕES" : "INDISPONIBILIDADE"
    : "INDISPONIBILIDADE NORMALIZADA";
  return [
    `### ${withEmoji("⚡", "ABERTURA DE MASSIVA")} ###`,
    "",
    `${withEmoji("🚨", "FALHA REPORTADA")}: ${symptom};`,
    `${withEmoji("🧭", "DIAGNÓSTICO")}:`,
    `${diagnosis}`,
    groupedEvidence || "Nenhuma evidência válida identificada.",
  ].join("\n");
}

function formatMassivasOpeningLine(record) {
  const line = record.raw.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  const rtdIndex = line.search(/\b(?:RTD|SW)\s*\|/i);
  const normalizedLine = rtdIndex < 0 ? line : line.slice(rtdIndex);
  const trimmedLine = normalizedLine.replace(/(link\s+(?:down|up))\b.*$/i, "$1").trim();
  if (rtdIndex < 0) return trimmedLine;

  return `${record.time ? `${record.time} ` : ""}${trimmedLine}`.trim();
}

async function confirmMassivasStepOne() {
  const btn = document.getElementById("massivasConfirmStep1");
  if (btn) {
    btn.dataset.originalText = btn.textContent;
    btn.textContent = "Consultando Zabbix...";
    btn.disabled = true;
  }

  try {
    await renderMassivasSummary();
  } catch (error) {
    console.error("Erro ao consultar Zabbix:", error);
    showToast("Erro na consulta do Zabbix.", "error");
    setValue("massivasSummary", buildMassivasSummaryFallback());
  } finally {
    if (btn) {
      btn.textContent = btn.dataset.originalText || "Avançar";
      btn.disabled = false;
    }
    showMassivasStep(3);
  }
}

async function renderMassivasSummary() {
  const hostsText = getValue("massivasHosts");
  const hosts = splitLines(hostsText).map(h => h.trim().toUpperCase());
  const debugAlarms = getValue("massivasDebugAlarms");

  if (debugAlarms) {
    setValue("massivasSummary", buildMassivasAnalysis(hosts, debugAlarms));
    return;
  }

  let alarmsText = "Informe ao menos um host para consultar o Zabbix.";

  if (hosts.length > 0) {
    alarmsText = await fetchZabbixAlarms(hosts);
  }

  setValue("massivasSummary", buildMassivasAnalysis(hosts, alarmsText));
}

function buildMassivasSummaryFallback() {
  const hostsText = getValue("massivasHosts");
  const hosts = splitLines(hostsText).map(h => h.trim().toUpperCase());
  return buildMassivasAnalysis(hosts, getValue("massivasDebugAlarms"));
}

function buildMassivasRecognize() {
  const subject = getValue("massivasBdeskSubject").replace(/^(Aut\s+Bdesk:#|authbdesk#)\s*/i, "").trim();
  return subject ? `Aut Bdesk:# ${subject}` : "";
}

function buildMassivasManualUpdate() {
  const lines = [
    `### ${withEmoji("🚨", "ATUALIZAÇÃO DA MASSIVA")} ###`,
    "",
  ];

  if (getValue("massivasUpdateTxInfraTicket")) {
    lines.push(`${withEmoji("🎫", "CHAMADO TX / INFRA")}: ${getValue("massivasUpdateTxInfraTicket")};`);
  }

  lines.push(`${withEmoji("👤", "FALADO COM")}: ${getValue("massivasUpdateSpokenWith")};`);

  if (getValue("massivasUpdatePhoneGroup")) {
    lines.push(`${withEmoji("☎️", "TELEFONE/GRUPO")}: ${getValue("massivasUpdatePhoneGroup")};`);
  }

  lines.push(`${withEmoji("💬", "O QUE FOI FALADO")}: ${getValue("massivasUpdateSpokenText")};`);
  lines.push(`${withEmoji("⏳", "PREVISÃO")}: ${getValue("massivasUpdateForecast") || "Sem previsão"};`);
  lines.push(`${withEmoji("➡️", "PRÓXIMA AÇÃO")}: ${getValue("massivasUpdateNextAction")};`);

  return lines.join("\n");
}

function runMassivasDebugAnalysis() {
  const debugAlarms = getValue("massivasDebugAlarms");
  const hostsText = getValue("massivasHosts");
  const hosts = splitLines(hostsText).map(h => h.trim().toUpperCase());

  if (!debugAlarms) {
    showToast("Cole os alarmes no campo de debug.", "info");
    return;
  }

  setValue("massivasSummary", buildMassivasAnalysis(hosts, debugAlarms));
  setStatus("Análise manual de massiva gerada.");
  showMassivasStep(3);
}

async function fetchZabbixAlarms(hosts) {
  try {
    const response = await fetch("/api/zabbix/alarms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hosts }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Falha ao consultar Zabbix.");
    }

    if (data.configured === false) {
      return data.message || "Zabbix não configurado.";
    }

    if (!data.alarms || data.alarms.length === 0) {
      return "Nenhum host correspondente encontrado no Zabbix.";
    }

    return data.alarms.map((alarm) => `- ${alarm}`).join("\n");
  } catch (error) {
    console.error("Erro na API do Zabbix:", error);
    return `Erro ao consultar Zabbix: ${error.message}`;
  }
}

const triggerCatalog = {
  IFLOOP: ["Interface de Loopback", "BACKBONE"],
  IFLLGR: ["Interface local no mesmo POP", "BACKBONE"],
  IFBBGR: ["Interface backbone entre sites", "BACKBONE"],
  TPBBGR: ["Transporte entre sites", "BACKBONE"],
  IFCCGR: ["Interface de CDN/cache", "BORDA"],
  IFIXGR: ["Interface PTT", "BORDA"],
  IFINGR: ["Interface trânsito IP", "BORDA"],
  IFPGGR: ["Interface PNI/peering", "BORDA"],
  IFACCL: ["Acesso cliente", "B2B"],
  TPLDCL: ["Transporte longa distância cliente", "B2B"],
  TPIPCL: ["Transporte do TP até PE do cliente", "B2B"],
  PEIPCL: ["IP cliente no PE", "B2B"],
  IFACGV: ["Acesso cliente governo", "B2B"],
  TPLDGV: ["Transporte longa distância governo", "B2B"],
  TPIPGV: ["Transporte TP até PE governo", "B2B"],
  PEIPGV: ["IP cliente governo no PE", "B2B"],
  IFACPR: ["Acesso cliente premium", "B2B"],
  TPLDPR: ["Transporte longa distância premium", "B2B"],
  TPIPPR: ["Transporte TP até PE premium", "B2B"],
  PEIPPR: ["IP cliente premium no PE", "B2B"],
};

const interfaceTypeCatalog = {
  ULK: "Único link",
  ATK: "Aggregation trunk",
  ITK: "Interface do aggregation trunk",
  AETK: "Aggregation Ethernet trunk",
  IETK: "Interface do aggregation Ethernet trunk",
};

const deliveryTypeCatalog = {
  CAP: "Capacidade",
  DWD: "DWDM",
  DWDM: "DWDM",
  FIB: "Fibra",
  RAD: "Rádio",
  SWC: "Swap capacidade",
  SWF: "Swap fibra",
  MG: "Gerência de equipamentos",
  MGT: "Gerência de equipamentos",
};

function buildMassivasAnalysis(hosts, alarmsText) {
  const evidenceLines = splitMassivasAlarmLines(alarmsText).map((line) => line.replace(/^-\s*/, ""));
  const records = evidenceLines.map(parseMassivaAlarmLine);
  const validRecords = records.filter((record) => record.raw && !record.raw.startsWith("Nenhum ") && !record.raw.startsWith("Informe "));
  const affectedHosts = uniqueValues([
    ...hosts.map((host) => String(host || "").trim().toUpperCase()).filter(Boolean),
    ...validRecords.map(extractMassivaAffectedHost),
  ]);
  const linkDownRecords = validRecords.filter((record) => /link\s*down|interface.*down|operational.*down/i.test(record.raw));
  const restartRecords = validRecords.filter((record) => /reinici|reboot|restart|uptime|started|cold start|warm start/i.test(record.raw));
  const triggerGroups = countBy(validRecords.map((record) => record.interfaceData.trigger).filter(Boolean));
  const deliveryGroups = countBy(validRecords.map((record) => record.interfaceData.deliveryType).filter(Boolean));
  const operatorGroups = countBy(validRecords.map((record) => record.interfaceData.operator).filter(Boolean));
  const statusGroups = countBy(validRecords.map((record) => record.status).filter(Boolean));
  const causeGroups = classifyMassivasCauses(validRecords);
  const domains = inferMassivasDomains(deliveryGroups, triggerGroups);
  const topologyText = summarizeMassivasTopology(validRecords);
  const incidentGroups = countBy(validRecords.map((record) => [record.hosts[0], record.interfaceData.trigger, record.interfaceData.deliveryType].filter(Boolean).join("|")));
  const simultaneous = hasSimultaneousImpact(validRecords);
  const approachKeys = uniqueValues(linkDownRecords.map((record) => record.localInterface || record.interfaceData.remotePort));
  const multipleApproaches = linkDownRecords.length >= 2 && (affectedHosts.length >= 2 || approachKeys.length >= 2);
  const multipleIncidents = validRecords.length > 1 && (affectedHosts.length > 1 || Object.keys(incidentGroups).length > 1 || multipleApproaches);
  const repeatedRestart = restartRecords.some((record) => recordsForHost(restartRecords, record.hosts[0]).length >= 2);

  const conclusion = buildMassivasConclusion({
    affectedHosts,
    validRecords,
    linkDownRecords,
    restartRecords,
    triggerGroups,
    deliveryGroups,
    operatorGroups,
    statusGroups,
    causeGroups,
    domains,
    topologyText,
    multipleIncidents,
    multipleApproaches,
    simultaneous,
    repeatedRestart,
    includeTechnicalDetails: true,
  });
  const actions = suggestMassivasActions({ validRecords, linkDownRecords, restartRecords, operatorGroups, deliveryGroups, causeGroups, domains, multipleApproaches, simultaneous, repeatedRestart, multipleIncidents });

  return [
    `### ${withEmoji("🚨", "ANÁLISE DA MASSIVA - ALPHA/TESTES")} ###`,
    "",
    `${withEmoji("🔎", "ANALISE")}: ${conclusion}`,
    `${withEmoji("⏳", "PREVISÃO DE NORMALIZAÇÃO")}: Sem previsão.`,
    `${withEmoji("➡️", "DIRECIONAMENTO")}: ${actions.join(" ")}`,
    "",
    `${withEmoji("📎", "EVIDÊNCIAS ORGANIZADAS")}:`,
    ...formatMassivasEvidence(validRecords, evidenceLines),
  ].join("\n");
}

function buildMassivasConclusion(context) {
  const {
    affectedHosts,
    validRecords,
    linkDownRecords,
    triggerGroups,
    deliveryGroups,
    operatorGroups,
    statusGroups,
    causeGroups,
    domains,
    topologyText,
    multipleIncidents,
    multipleApproaches,
    simultaneous,
    repeatedRestart,
    includeTechnicalDetails = false,
  } = context;

  if (!validRecords.length) {
    return "Sem alarmes ativos retornados para os hosts informados. Validar se os hostnames foram colados conforme cadastro do Zabbix ou se a falha já normalizou antes da consulta.";
  }

  const hostText = affectedHosts.length ? `Hosts afetados: ${affectedHosts.join(", ")}.` : "Nenhum hostname no padrão BR-UF-CNL-POP-FUNÇÃO-NN foi identificado nos alarmes.";
  const mainHost = affectedHosts[0] || "host afetado";
  const triggerText = summarizeGroups(triggerGroups, triggerCatalog, "gatilho");
  const deliveryText = summarizeGroups(deliveryGroups, deliveryTypeCatalog, "entrega");
  const statusText = summarizeMassivasStatuses(statusGroups);
  const causeText = summarizeCauseGroups(causeGroups);
  const interfaceText = summarizeInterfaces(validRecords);
  const firstTime = validRecords.map((record) => record.time).filter(Boolean).sort()[0] || "";
  const timeText = firstTime ? ` Início mais antigo identificado: ${firstTime}.` : "";
  const domainText = domains.length ? `Domínios identificados: ${domains.join("; ")}.` : "";
  const technicalContext = includeTechnicalDetails ? [triggerText, deliveryText, domainText, statusText, causeText].filter(Boolean) : [];

  if (repeatedRestart) {
    return formatMassivasDiagnosis(hostText, timeText, `Identificado padrão de reinicialização recorrente no host ${mainHost}. Possíveis causas: instabilidade local, energia, hardware ou software.`, technicalContext);
  }

  if (multipleIncidents && simultaneous) {
    const approachText = linkDownRecords.length === 2 ? "duas abordagens/interfaces" : `${linkDownRecords.length} abordagens/interfaces`;
    const impactText = affectedHosts.length === 1 ? ` no host afetado ${mainHost}` : ` em ${affectedHosts.length} hosts afetados`;
    return formatMassivasDiagnosis(hostText, timeText, `Identificadas ${approachText} em queda${impactText}, com eventos no mesmo intervalo. O cenário pode representar isolamento de site/equipamento ou incidentes independentes; não concluir causa única sem validar a topologia.`, technicalContext);
  }

  if (multipleIncidents || multipleApproaches) {
    const approachText = linkDownRecords.length === 2 ? "duas abordagens/interfaces" : `${linkDownRecords.length} abordagens/interfaces`;
    const impactText = affectedHosts.length === 1
      ? ` no host afetado ${mainHost}`
      : ` em ${affectedHosts.length} hosts afetados`;
    return formatMassivasDiagnosis(hostText, timeText, `Identificadas ${approachText} em queda${impactText}. O cenário sugere múltiplas afetações, degradação ou isolamento parcial; validar a correlação temporal e a topologia antes de definir uma causa única.`, technicalContext);
  }

  if (linkDownRecords.length) {
    const record = linkDownRecords[0];
    const side = record.localInterface ? `na interface local ${record.localInterface}` : "em interface monitorada";
    const remote = record.interfaceData.remotePort ? ` com referência à porta/interface remota ${record.interfaceData.remotePort}` : "";
    return formatMassivasDiagnosis(hostText, timeText, `Identificado link/interface indisponível ${side}${remote}. A evidência aponta para falha provável no transporte/circuito, porta física ou equipamento vizinho associado.`, technicalContext);
  }

  return formatMassivasDiagnosis(hostText, timeText, `Os alarmes representam ${validRecords.length > 1 ? "múltiplas afetações e/ou evidências" : "uma afetação"}. A causa raiz ainda não deve ser presumida. Priorizar correlação temporal, topologia dos hosts e validação das interfaces citadas antes do acionamento definitivo.`, technicalContext);
}

function formatMassivasDiagnosis(hostText, timeText, finding, technicalContext = []) {
  return [
    `• ${hostText}`,
    timeText ? `• ${timeText.replace(/^\s+/, "")}` : "",
    `• ${finding}`,
    ...(technicalContext || []).map((detail) => `• ${detail}`),
  ].filter(Boolean).join("\n");
}

function summarizeMassivasStatuses(groups) {
  const entries = Object.entries(groups);
  if (!entries.length) return "";
  return `Estados dos alarmes: ${entries.map(([status, count]) => `${status}; eventos: ${count}`).join(" | ")}.`;
}

function classifyMassivasCauses(records) {
  const causes = [];
  records.forEach((record) => {
    const raw = record.raw.toLowerCase();
    const recordCauses = [];
    if (/energia|el[eé]tric|power|utility|blackout/.test(raw)) recordCauses.push("ENERGIA/ELETRICA");
    if (/rompimento|rompida|fibra|fiber|corte/.test(raw)) recordCauses.push("FIBRA/ROMPIMENTO");
    if (/reinici|reboot|restart|cold start|warm start|uptime/.test(raw)) recordCauses.push("EQUIPAMENTO/REINICIO");
    if (/temperatura|hardware|fan|ventila|cpu|mem[oó]ria/.test(raw)) recordCauses.push("EQUIPAMENTO/HARDWARE");
    if (!recordCauses.length || /link\s*down|interface.*down|operational.*down/.test(raw)) recordCauses.push("ENLACE/INTERFACE");
    causes.push(...recordCauses);
  });
  return countBy(causes);
}

function summarizeCauseGroups(groups) {
  const entries = Object.entries(groups);
  if (!entries.length) return "";
  return `Causas a investigar: ${entries.map(([cause, count]) => `${cause}; evidências: ${count}`).join(" | ")}.`;
}

function inferMassivasDomains(deliveryGroups, triggerGroups) {
  const domains = [];
  if (deliveryGroups.DWD) domains.push("TX/DWDM");
  if (deliveryGroups.FIB) domains.push("TX/FIBRA");
  if (deliveryGroups.CAP) domains.push("CAPACIDADE");
  if (deliveryGroups.MGT || deliveryGroups.MG) domains.push("GERENCIA");
  if (triggerGroups.IFLLGR) domains.push("REDE METRO/LOCAL");
  if (triggerGroups.IFBBGR || triggerGroups.TPBBGR) domains.push("BACKBONE/TRANSPORTE");
  if (Object.keys(triggerGroups).some((trigger) => /^(IFCCGR|IFIXGR|IFINGR|IFPGGR)$/.test(trigger))) domains.push("BORDA/PTT/PEERING");
  if (Object.keys(triggerGroups).some((trigger) => /(?:CL|GV|PR)$/.test(trigger))) domains.push("B2B/CLIENTE");
  return uniqueValues(domains);
}

function summarizeMassivasTopology(records) {
  const links = records
    .map((record) => ({
      source: record.sourceHost || record.hosts[0] || "origem não identificada",
      target: record.interfaceData.remoteEquipment || "equipamento B não identificado",
      localInterface: record.localInterface,
      remotePort: record.interfaceData.remotePort,
    }))
    .filter((link) => link.target !== "equipamento B não identificado");
  if (!links.length) return "";

  const grouped = {};
  links.forEach((link) => {
    if (!grouped[link.target]) grouped[link.target] = [];
    grouped[link.target].push(link);
  });

  const paths = Object.entries(grouped).map(([target, targetLinks]) => {
    const sources = uniqueValues(targetLinks.map((link) => link.source));
    if (sources.length >= 2) {
      return `Topologia: Ponta A (${sources[0]}) -> ${target} <- Ponta B (${sources[1]}).`;
    }
    const link = targetLinks[0];
    const interfaceText = link.localInterface && link.remotePort
      ? ` pelas interfaces ${link.localInterface} -> ${link.remotePort}`
      : "";
    return `Topologia: ${sources[0]} -> ${target}${interfaceText}.`;
  });

  return paths.join(" ");
}

// Topology learning system
let topologyLearningData = {
  nodes: new Map(),
  edges: new Map(),
  corrections: [],
  learnFromAlarms: function(records) {
    records.forEach(record => {
      const sourceHost = record.sourceHost || record.hosts[0];
      const targetHost = record.interfaceData.remoteEquipment || extractMassivaAffectedHost(record);
      const localIface = record.localInterface;
      const remoteIface = record.interfaceData.remotePort;
      const isTrunk = isTrunkInterface(localIface);
      
      if (sourceHost) {
        this.addNode(sourceHost, 'source', record);
      }
      if (targetHost) {
        this.addNode(targetHost, 'equipment', record);
      }
      if (sourceHost && targetHost) {
        this.addEdge(sourceHost, targetHost, localIface, remoteIface, isTrunk, record);
      }
    });
  },
  addNode: function(id, type, record) {
    if (!this.nodes.has(id)) {
      this.nodes.set(id, {
        id,
        type,
        interfaces: new Set(),
        firstSeen: record.time,
        lastSeen: record.time,
        alarmCount: 0
      });
    }
    const node = this.nodes.get(id);
    node.lastSeen = record.time;
    node.alarmCount++;
    if (record.localInterface) node.interfaces.add(record.localInterface);
  },
  addEdge: function(source, target, localIface, remoteIface, isTrunk, record) {
    const edgeId = `${source}->${target}`;
    if (!this.edges.has(edgeId)) {
      this.edges.set(edgeId, {
        id: edgeId,
        source,
        target,
        localInterfaces: new Set(),
        remoteInterfaces: new Set(),
        isTrunk: false,
        firstSeen: record.time,
        lastSeen: record.time,
        alarmCount: 0
      });
    }
    const edge = this.edges.get(edgeId);
    edge.lastSeen = record.time;
    edge.alarmCount++;
    if (isTrunk) edge.isTrunk = true;
    if (localIface) edge.localInterfaces.add(localIface);
    if (remoteIface) edge.remoteInterfaces.add(remoteIface);
  },
  getTopologyData: function() {
    return {
      nodes: Array.from(this.nodes.values()),
      edges: Array.from(this.edges.values())
    };
  },
  correctNode: function(oldId, newData) {
    const node = this.nodes.get(oldId);
    if (node) {
      this.corrections.push({ type: 'node', oldId, newData, timestamp: Date.now() });
      if (newData.id && newData.id !== oldId) {
        this.nodes.delete(oldId);
        this.nodes.set(newData.id, { ...node, ...newData });
      } else {
        Object.assign(node, newData);
      }
    }
  },
  correctEdge: function(edgeId, newData) {
    const edge = this.edges.get(edgeId);
    if (edge) {
      this.corrections.push({ type: 'edge', edgeId, newData, timestamp: Date.now() });
      Object.assign(edge, newData);
    }
  },
  removeNode: function(id) {
    this.nodes.delete(id);
    // Remove connected edges
    for (const [edgeId, edge] of this.edges) {
      if (edge.source === id || edge.target === id) {
        this.edges.delete(edgeId);
      }
    }
  },
  removeEdge: function(edgeId) {
    this.edges.delete(edgeId);
  }
};

// Detect if interface is a trunk/LAG
function isTrunkInterface(interfaceName) {
  if (!interfaceName) return false;
  const trunkPatterns = [
    /eth-trunk/i,
    /trunk/i,
    /lag/i,
    /bundle/i,
    /port-channel/i,
    /ae\d+/i,
    /po\d+/i
  ];
  return trunkPatterns.some(pattern => pattern.test(interfaceName));
}

// Get interface icon based on type
function getInterfaceIcon(interfaceName) {
  if (!interfaceName) return '🔌';
  if (/eth-trunk|trunk|lag|bundle|ae\d+|po\d+/i.test(interfaceName)) return '🔗';
  if (/100ge/i.test(interfaceName)) return '⚡';
  if (/40ge|10ge|xge/i.test(interfaceName)) return '⚡';
  if (/ge|gigabit/i.test(interfaceName)) return '🌐';
  if (/fe|fast/i.test(interfaceName)) return '📡';
  if (/loopback/i.test(interfaceName)) return '🔄';
  if (/vlan/i.test(interfaceName)) return '🏷️';
  return '🔌';
}

// Get traffic direction arrow
function getTrafficDirection(isBidirectional = true) {
  return isBidirectional ? '↔️' : '→';
}

// Topology zoom and center controls
function topoZoomIn() {
  const graph = fields.massivasTopologyGraph;
  if (graph && graph._cy) {
    graph._cy.zoom(graph._cy.zoom() * 1.25);
  }
}

function topoZoomOut() {
  const graph = fields.massivasTopologyGraph;
  if (graph && graph._cy) {
    graph._cy.zoom(graph._cy.zoom() / 1.25);
  }
}

function topoZoomFit() {
  const graph = fields.massivasTopologyGraph;
  if (graph && graph._cy) {
    graph._cy.fit(null, 48);
  }
}

function topoCenter() {
  const graph = fields.massivasTopologyGraph;
  if (graph && graph._cy) {
    graph._cy.center();
  }
}

function topoRelayout() {
  const graph = fields.massivasTopologyGraph;
  if (graph && graph._cy && typeof graph._cy.destroyed === 'function' && !graph._cy.destroyed()) {
    try { graph._cy.stop(); } catch (e) {}
    const layout = graph._cy.layout({
      name: "cose",
      animate: false,
      fit: true,
      padding: 50,
      nodeRepulsion: 600000,
      idealEdgeLength: 160
    });
    layout.run();
  }
}

function showTopologyHud(html) {
  const hud = document.getElementById("massivasTopologyHud");
  if (hud) {
    hud.innerHTML = html;
    hud.hidden = false;
  }
}

function hideTopologyHud() {
  const hud = document.getElementById("massivasTopologyHud");
  if (hud) {
    hud.hidden = true;
  }
}

function getEquipmentSvgUri(type, color = '#0b6f6a', isDark = false) {
  let svg = '';
  switch (type) {
    case 'pe':
      // Cisco 3D Router (Isometric Cylinder / Puck)
      // Symmetrical 2:1 ellipse cx=32, cy=22, rx=24, ry=12 with 4 orthogonally aligned arrows
      svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <defs>
          <linearGradient id="pe_top_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#ef4444' : '#14b8a6'}"/>
            <stop offset="100%" stop-color="${isDark ? '#b91c1c' : '#0d9488'}"/>
          </linearGradient>
          <linearGradient id="pe_side_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${isDark ? '#7f1d1d' : '#0f766e'}"/>
            <stop offset="50%" stop-color="${isDark ? '#991b1b' : '#115e59'}"/>
            <stop offset="100%" stop-color="${isDark ? '#450a0a' : '#042f2e'}"/>
          </linearGradient>
          <filter id="pe_sh_${isDark ? 'd' : 'l'}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#000000" flood-opacity="${isDark ? '0.45' : '0.2'}"/>
          </filter>
        </defs>
        <g filter="url(#pe_sh_${isDark ? 'd' : 'l'})">
          <path d="M8 22 v16 c0 6.63 10.75 12 24 12 s24 -5.37 24 -12 v-16 Z" fill="url(#pe_side_${isDark ? 'd' : 'l'})"/>
          <path d="M8 38 c0 6.63 10.75 12 24 12 s24 -5.37 24 -12" fill="none" stroke="${isDark ? '#f87171' : '#2dd4bf'}" stroke-width="0.8" opacity="0.6"/>
          <ellipse cx="32" cy="22" rx="24" ry="12" fill="url(#pe_top_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#fca5a5' : '#5eead4'}" stroke-width="1.5"/>
          <path d="M14 22 h10 M20 19 l4 3 l-4 3" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M50 22 h-10 M44 19 l-4 3 l4 3" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M32 18 v-6 M29 15 l3 -3 l3 3" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M32 26 v6 M29 29 l3 3 l3 -3" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="32" cy="22" r="2.2" fill="#ffffff"/>
        </g>
      </svg>`;
      break;

    case 'core':
      // Cisco 3D Core Router (Hexagonal Isometric Chassis)
      // Exact 30 deg isometric geometry (32,8 -> 56,20 -> 32,32 -> 8,20)
      svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <defs>
          <linearGradient id="core_top_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#c084fc' : '#3b82f6'}"/>
            <stop offset="100%" stop-color="${isDark ? '#9333ea' : '#1d4ed8'}"/>
          </linearGradient>
          <linearGradient id="core_left_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#7e22ce' : '#1e40af'}"/>
            <stop offset="100%" stop-color="${isDark ? '#3b0764' : '#0f172a'}"/>
          </linearGradient>
          <linearGradient id="core_right_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#6b21a8' : '#1e3a8a'}"/>
            <stop offset="100%" stop-color="${isDark ? '#2e1065' : '#090d16'}"/>
          </linearGradient>
          <filter id="core_sh_${isDark ? 'd' : 'l'}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#000000" flood-opacity="${isDark ? '0.45' : '0.25'}"/>
          </filter>
        </defs>
        <g filter="url(#core_sh_${isDark ? 'd' : 'l'})">
          <polygon points="8,20 32,32 32,50 8,38" fill="url(#core_left_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#a855f7' : '#1e40af'}" stroke-width="0.8"/>
          <polygon points="56,20 32,32 32,50 56,38" fill="url(#core_right_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#9333ea' : '#1e3a8a'}" stroke-width="0.8"/>
          <polygon points="32,8 56,20 32,32 8,20" fill="url(#core_top_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#e9d5ff' : '#93c5fd'}" stroke-width="1.5"/>
          <ellipse cx="32" cy="20" rx="9" ry="4.5" fill="none" stroke="#ffffff" stroke-width="1.5"/>
          <path d="M20 20 h24 M32 14 v12" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="32" cy="20" r="2" fill="#ffffff"/>
          <circle cx="16" cy="38" r="1.3" fill="${isDark ? '#e9d5ff' : '#93c5fd'}"/>
          <circle cx="22" cy="41" r="1.3" fill="${isDark ? '#e9d5ff' : '#93c5fd'}"/>
          <circle cx="28" cy="44" r="1.3" fill="${isDark ? '#e9d5ff' : '#93c5fd'}"/>
        </g>
      </svg>`;
      break;

    case 'switch':
      // Cisco 3D Switch (Low-Profile Isometric Box)
      // Top face: (32,10 -> 56,22 -> 32,34 -> 8,22)
      svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <defs>
          <linearGradient id="sw_top_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#34d399' : '#10b981'}"/>
            <stop offset="100%" stop-color="${isDark ? '#059669' : '#047857'}"/>
          </linearGradient>
          <linearGradient id="sw_left_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#047857' : '#065f46'}"/>
            <stop offset="100%" stop-color="${isDark ? '#022c22' : '#022c22'}"/>
          </linearGradient>
          <linearGradient id="sw_right_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#065f46' : '#047857'}"/>
            <stop offset="100%" stop-color="${isDark ? '#022c22' : '#064e3b'}"/>
          </linearGradient>
          <filter id="sw_sh_${isDark ? 'd' : 'l'}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#000000" flood-opacity="${isDark ? '0.45' : '0.25'}"/>
          </filter>
        </defs>
        <g filter="url(#sw_sh_${isDark ? 'd' : 'l'})">
          <polygon points="8,22 32,34 32,46 8,34" fill="url(#sw_left_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#10b981' : '#065f46'}" stroke-width="0.8"/>
          <polygon points="56,22 32,34 32,46 56,34" fill="url(#sw_right_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#059669' : '#047857'}" stroke-width="0.8"/>
          <polygon points="32,10 56,22 32,34 8,22" fill="url(#sw_top_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#a7f3d0' : '#6ee7b7'}" stroke-width="1.5"/>
          <path d="M22 17 h18 M36 14 l4 3 l-4 3" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M42 27 h-18 M28 24 l-4 3 l4 3" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="12" y="34.5" width="3.5" height="3" rx="0.5" fill="#a7f3d0"/>
          <rect x="18" y="37.5" width="3.5" height="3" rx="0.5" fill="#a7f3d0"/>
          <rect x="24" y="40.5" width="3.5" height="3" rx="0.5" fill="#a7f3d0"/>
        </g>
      </svg>`;
      break;

    case 'dwdm':
      // Cisco 3D Optical / DWDM Transponder
      svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <defs>
          <linearGradient id="dwdm_top_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#fbbf24' : '#f59e0b'}"/>
            <stop offset="100%" stop-color="${isDark ? '#d97706' : '#b45309'}"/>
          </linearGradient>
          <linearGradient id="dwdm_left_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#92400e' : '#92400e'}"/>
            <stop offset="100%" stop-color="${isDark ? '#451a03' : '#451a03'}"/>
          </linearGradient>
          <linearGradient id="dwdm_right_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#78350f' : '#78350f'}"/>
            <stop offset="100%" stop-color="${isDark ? '#451a03' : '#451a03'}"/>
          </linearGradient>
          <filter id="dwdm_sh_${isDark ? 'd' : 'l'}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#000000" flood-opacity="${isDark ? '0.45' : '0.25'}"/>
          </filter>
        </defs>
        <g filter="url(#dwdm_sh_${isDark ? 'd' : 'l'})">
          <polygon points="8,22 32,34 32,46 8,34" fill="url(#dwdm_left_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#fbbf24' : '#78350f'}" stroke-width="0.8"/>
          <polygon points="56,22 32,34 32,46 56,34" fill="url(#dwdm_right_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#d97706' : '#78350f'}" stroke-width="0.8"/>
          <polygon points="32,10 56,22 32,34 8,22" fill="url(#dwdm_top_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#fef08a' : '#fde68a'}" stroke-width="1.5"/>
          <path d="M16 22 c4 -4 8 -4 16 0 s12 4 16 0" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" fill="none"/>
          <circle cx="16" cy="22" r="2" fill="#ffffff"/>
          <circle cx="32" cy="22" r="2" fill="#ffffff"/>
          <circle cx="48" cy="22" r="2" fill="#ffffff"/>
        </g>
      </svg>`;
      break;

    case 'olt':
      // GPON OLT Optical Terminal
      svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <defs>
          <linearGradient id="olt_top_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#38bdf8' : '#0284c7'}"/>
            <stop offset="100%" stop-color="${isDark ? '#0284c7' : '#0369a1'}"/>
          </linearGradient>
          <linearGradient id="olt_left_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#075985' : '#075985'}"/>
            <stop offset="100%" stop-color="${isDark ? '#082f49' : '#082f49'}"/>
          </linearGradient>
          <linearGradient id="olt_right_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#0c4a6e' : '#0c4a6e'}"/>
            <stop offset="100%" stop-color="${isDark ? '#082f49' : '#082f49'}"/>
          </linearGradient>
          <filter id="olt_sh_${isDark ? 'd' : 'l'}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#000000" flood-opacity="${isDark ? '0.45' : '0.25'}"/>
          </filter>
        </defs>
        <g filter="url(#olt_sh_${isDark ? 'd' : 'l'})">
          <polygon points="8,20 32,32 32,48 8,36" fill="url(#olt_left_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#38bdf8' : '#0369a1'}" stroke-width="0.8"/>
          <polygon points="56,20 32,32 32,48 56,36" fill="url(#olt_right_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#0284c7' : '#0369a1'}" stroke-width="0.8"/>
          <polygon points="32,8 56,20 32,32 8,20" fill="url(#olt_top_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#bae6fd' : '#7dd3fc'}" stroke-width="1.5"/>
          <path d="M32 14 v6 M32 20 l-10 4 M32 20 l10 4" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="32" cy="14" r="2" fill="#ffffff"/>
          <circle cx="22" cy="24" r="1.8" fill="#ffffff"/>
          <circle cx="42" cy="24" r="1.8" fill="#ffffff"/>
        </g>
      </svg>`;
      break;

    default:
      // Generic Host / Server (3D Blade Chassis)
      svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <defs>
          <linearGradient id="srv_top_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#94a3b8' : '#64748b'}"/>
            <stop offset="100%" stop-color="${isDark ? '#64748b' : '#475569'}"/>
          </linearGradient>
          <linearGradient id="srv_left_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#334155' : '#334155'}"/>
            <stop offset="100%" stop-color="${isDark ? '#0f172a' : '#0f172a'}"/>
          </linearGradient>
          <linearGradient id="srv_right_${isDark ? 'd' : 'l'}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${isDark ? '#1e293b' : '#1e293b'}"/>
            <stop offset="100%" stop-color="${isDark ? '#0f172a' : '#0f172a'}"/>
          </linearGradient>
          <filter id="srv_sh_${isDark ? 'd' : 'l'}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#000000" flood-opacity="${isDark ? '0.45' : '0.25'}"/>
          </filter>
        </defs>
        <g filter="url(#srv_sh_${isDark ? 'd' : 'l'})">
          <polygon points="10,22 32,32 32,50 10,40" fill="url(#srv_left_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#94a3b8' : '#475569'}" stroke-width="0.8"/>
          <polygon points="54,22 32,32 32,50 54,40" fill="url(#srv_right_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#64748b' : '#475569'}" stroke-width="0.8"/>
          <polygon points="32,10 54,22 32,32 10,22" fill="url(#srv_top_${isDark ? 'd' : 'l'})" stroke="${isDark ? '#e2e8f0' : '#cbd5e1'}" stroke-width="1.5"/>
          <line x1="14" y1="31" x2="28" y2="37" stroke="#94a3b8" stroke-width="1.2"/>
          <line x1="14" y1="36" x2="28" y2="42" stroke="#94a3b8" stroke-width="1.2"/>
          <line x1="14" y1="41" x2="28" y2="47" stroke="#94a3b8" stroke-width="1.2"/>
          <circle cx="15" cy="27" r="1.2" fill="#38bdf8"/>
          <circle cx="18" cy="28.3" r="1.2" fill="#22c55e"/>
        </g>
      </svg>`;
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const cityCache = new Map();

function extractHostMetadata(hostname) {
  const normalized = String(hostname || '').toUpperCase().replace(/[._]/g, '-');
  const parts = normalized.split('-').filter(Boolean);
  
  if (parts.length >= 4) {
    let uf = '';
    let sigla = '';
    let pop = '';
    
    if (parts[0] === 'BR' && parts.length >= 4) {
      uf = parts[1];
      sigla = parts[2];
      pop = parts[3];
    } else if (parts.length >= 3 && /^[A-Z]{2}$/.test(parts[0])) {
      uf = parts[0];
      sigla = parts[1];
      pop = parts[2];
    } else {
      sigla = parts[0];
      pop = parts[1];
    }
    
    return { uf, sigla, pop };
  }
  
  return { uf: '', sigla: String(hostname || '').slice(0, 3).toUpperCase(), pop: '' };
}

function parseCityResponse(html, expectedUf = '') {
  if (!html || typeof html !== 'string') return null;
  
  const entries = html.split(/<hr\s*\/?>/i).map(e => e.trim()).filter(Boolean);
  const parsedList = [];
  
  for (const entry of entries) {
    const ufMatch = entry.match(/<b>\s*UF:\s*<\/b>\s*([A-Z]{2})/i) || entry.match(/UF:\s*([A-Z]{2})/i);
    const munMatch = entry.match(/<b>\s*Municipio:\s*<\/b>\s*([^<]+)/i) || entry.match(/Municipio:\s*([^<]+)/i);
    const locMatch = entry.match(/<b>\s*Localidade:\s*<\/b>\s*([^<]+)/i);
    const regMatch = entry.match(/<b>\s*Regi[ãa]o:\s*<\/b>\s*([^|<]+)/i);
    const cnlMatch = entry.match(/<b>\s*CNL:\s*<\/b>\s*([A-Z0-9]+)/i);

    const uf = ufMatch ? ufMatch[1].trim().toUpperCase() : '';
    const municipio = munMatch ? munMatch[1].trim() : (locMatch ? locMatch[1].trim() : '');
    const localidade = locMatch ? locMatch[1].trim() : municipio;
    const regiao = regMatch ? regMatch[1].trim() : '';
    const cnl = cnlMatch ? cnlMatch[1].trim().toUpperCase() : '';

    if (municipio || uf) {
      parsedList.push({ uf, municipio, localidade, regiao, cnl });
    }
  }

  if (parsedList.length === 0) return null;

  if (expectedUf) {
    const match = parsedList.find(p => p.uf === expectedUf.toUpperCase());
    if (match) return match;
  }

  return parsedList[0];
}

const TELECOM_CNL_MAP = {
  // Capitais (UF)
  'BSA': { municipio: 'Brasília', uf: 'DF' },
  'BSB': { municipio: 'Brasília', uf: 'DF' },
  'SPO': { municipio: 'São Paulo', uf: 'SP' },
  'SAO': { municipio: 'São Paulo', uf: 'SP' },
  'RJO': { municipio: 'Rio de Janeiro', uf: 'RJ' },
  'RIO': { municipio: 'Rio de Janeiro', uf: 'RJ' },
  'BHZ': { municipio: 'Belo Horizonte', uf: 'MG' },
  'BHO': { municipio: 'Belo Horizonte', uf: 'MG' },
  'CTA': { municipio: 'Curitiba', uf: 'PR' },
  'CTB': { municipio: 'Curitiba', uf: 'PR' },
  'CUR': { municipio: 'Curitiba', uf: 'PR' },
  'POA': { municipio: 'Porto Alegre', uf: 'RS' },
  'PAG': { municipio: 'Porto Alegre', uf: 'RS' },
  'SSA': { municipio: 'Salvador', uf: 'BA' },
  'SLV': { municipio: 'Salvador', uf: 'BA' },
  'REC': { municipio: 'Recife', uf: 'PE' },
  'RCE': { municipio: 'Recife', uf: 'PE' },
  'FOR': { municipio: 'Fortaleza', uf: 'CE' },
  'FTZ': { municipio: 'Fortaleza', uf: 'CE' },
  'BLM': { municipio: 'Belém', uf: 'PA' },
  'BEL': { municipio: 'Belém', uf: 'PA' },
  'MAO': { municipio: 'Manaus', uf: 'AM' },
  'MAN': { municipio: 'Manaus', uf: 'AM' },
  'GYN': { municipio: 'Goiânia', uf: 'GO' },
  'GOI': { municipio: 'Goiânia', uf: 'GO' },
  'CBA': { municipio: 'Cuiabá', uf: 'MT' },
  'CUI': { municipio: 'Cuiabá', uf: 'MT' },
  'CGB': { municipio: 'Campo Grande', uf: 'MS' },
  'CGR': { municipio: 'Campo Grande', uf: 'MS' },
  'VIX': { municipio: 'Vitória', uf: 'ES' },
  'VIT': { municipio: 'Vitória', uf: 'ES' },
  'FLN': { municipio: 'Florianópolis', uf: 'SC' },
  'FLO': { municipio: 'Florianópolis', uf: 'SC' },
  'NAT': { municipio: 'Natal', uf: 'RN' },
  'NTL': { municipio: 'Natal', uf: 'RN' },
  'MCZ': { municipio: 'Maceió', uf: 'AL' },
  'MAC': { municipio: 'Maceió', uf: 'AL' },
  'JPA': { municipio: 'João Pessoa', uf: 'PB' },
  'JPO': { municipio: 'João Pessoa', uf: 'PB' },
  'THE': { municipio: 'Teresina', uf: 'PI' },
  'TER': { municipio: 'Teresina', uf: 'PI' },
  'SLZ': { municipio: 'São Luís', uf: 'MA' },
  'SLS': { municipio: 'São Luís', uf: 'MA' },
  'AJU': { municipio: 'Aracaju', uf: 'SE' },
  'ARC': { municipio: 'Aracaju', uf: 'SE' },
  'PVH': { municipio: 'Porto Velho', uf: 'RO' },
  'PVO': { municipio: 'Porto Velho', uf: 'RO' },
  'RBR': { municipio: 'Rio Branco', uf: 'AC' },
  'RBC': { municipio: 'Rio Branco', uf: 'AC' },
  'MCP': { municipio: 'Macapá', uf: 'AP' },
  'BVB': { municipio: 'Boa Vista', uf: 'RR' },
  'BOA': { municipio: 'Boa Vista', uf: 'RR' },
  'PMW': { municipio: 'Palmas', uf: 'TO' },
  'PLS': { municipio: 'Palmas', uf: 'TO' },

  // Polos Regionais e Grandes Cidades
  'CPS': { municipio: 'Campinas', uf: 'SP' },
  'SJC': { municipio: 'São José dos Campos', uf: 'SP' },
  'STO': { municipio: 'Santos', uf: 'SP' },
  'SAN': { municipio: 'Santos', uf: 'SP' },
  'RIB': { municipio: 'Ribeirão Preto', uf: 'SP' },
  'RBP': { municipio: 'Ribeirão Preto', uf: 'SP' },
  'SOR': { municipio: 'Sorocaba', uf: 'SP' },
  'BAU': { municipio: 'Bauru', uf: 'SP' },
  'SDR': { municipio: 'Santo André', uf: 'SP' },
  'SBC': { municipio: 'São Bernardo do Campo', uf: 'SP' },
  'OSA': { municipio: 'Osasco', uf: 'SP' },
  'GRU': { municipio: 'Guarulhos', uf: 'SP' },
  'JDI': { municipio: 'Jundiaí', uf: 'SP' },
  'PIR': { municipio: 'Piracicaba', uf: 'SP' },
  'SCA': { municipio: 'São Carlos', uf: 'SP' },
  'PRU': { municipio: 'Presidente Prudente', uf: 'SP' },
  'SJP': { municipio: 'São José do Rio Preto', uf: 'SP' },
  'FRA': { municipio: 'Franca', uf: 'SP' },
  'TAU': { municipio: 'Taubaté', uf: 'SP' },
  'BAR': { municipio: 'Barueri', uf: 'SP' },
  'ALF': { municipio: 'Alphaville', uf: 'SP' },
  
  'UDI': { municipio: 'Uberlândia', uf: 'MG' },
  'UBA': { municipio: 'Uberaba', uf: 'MG' },
  'JDR': { municipio: 'Juiz de Fora', uf: 'MG' },
  'JFA': { municipio: 'Juiz de Fora', uf: 'MG' },
  'MOC': { municipio: 'Montes Claros', uf: 'MG' },
  'GVL': { municipio: 'Governador Valadares', uf: 'MG' },
  'IPA': { municipio: 'Ipatinga', uf: 'MG' },
  'DIV': { municipio: 'Divinópolis', uf: 'MG' },
  'POC': { municipio: 'Poços de Caldas', uf: 'MG' },
  'VAG': { municipio: 'Varginha', uf: 'MG' },
  'PTC': { municipio: 'Patos de Minas', uf: 'MG' },
  'CON': { municipio: 'Contagem', uf: 'MG' },
  'BET': { municipio: 'Betim', uf: 'MG' },
  
  'NTR': { municipio: 'Niterói', uf: 'RJ' },
  'NIT': { municipio: 'Niterói', uf: 'RJ' },
  'DCX': { municipio: 'Duque de Caxias', uf: 'RJ' },
  'SGO': { municipio: 'São Gonçalo', uf: 'RJ' },
  'VOL': { municipio: 'Volta Redonda', uf: 'RJ' },
  'VRD': { municipio: 'Volta Redonda', uf: 'RJ' },
  'CFB': { municipio: 'Cabo Frio', uf: 'RJ' },
  'CMP': { municipio: 'Campos dos Goytacazes', uf: 'RJ' },
  'NOF': { municipio: 'Nova Friburgo', uf: 'RJ' },
  'NIG': { municipio: 'Nova Iguaçu', uf: 'RJ' },
  
  'LON': { municipio: 'Londrina', uf: 'PR' },
  'LDA': { municipio: 'Londrina', uf: 'PR' },
  'MGA': { municipio: 'Maringá', uf: 'PR' },
  'MRG': { municipio: 'Maringá', uf: 'PR' },
  'CSC': { municipio: 'Cascavel', uf: 'PR' },
  'FOZ': { municipio: 'Foz do Iguaçu', uf: 'PR' },
  'FZI': { municipio: 'Foz do Iguaçu', uf: 'PR' },
  'PGR': { municipio: 'Ponta Grossa', uf: 'PR' },
  'GUA': { municipio: 'Guarapuava', uf: 'PR' },
  'PTO': { municipio: 'Pato Branco', uf: 'PR' },
  'APU': { municipio: 'Apucarana', uf: 'PR' },
  'UMU': { municipio: 'Umuarama', uf: 'PR' },
  'TBA': { municipio: 'Curitiba', uf: 'PR' },
  
  'CXS': { municipio: 'Caxias do Sul', uf: 'RS' },
  'PEL': { municipio: 'Pelotas', uf: 'RS' },
  'SMO': { municipio: 'Santa Maria', uf: 'RS' },
  'SMA': { municipio: 'Santa Maria', uf: 'RS' },
  'PAS': { municipio: 'Passo Fundo', uf: 'RS' },
  'PFU': { municipio: 'Passo Fundo', uf: 'RS' },
  'RGO': { municipio: 'Rio Grande', uf: 'RS' },
  'CAN': { municipio: 'Canoas', uf: 'RS' },
  'NHB': { municipio: 'Novo Hamburgo', uf: 'RS' },
  'SLE': { municipio: 'São Leopoldo', uf: 'RS' },
  'SCS': { municipio: 'Santa Cruz do Sul', uf: 'RS' },
  'BGV': { municipio: 'Bento Gonçalves', uf: 'RS' },
  'ERE': { municipio: 'Erechim', uf: 'RS' },
  'LJD': { municipio: 'Lajeado', uf: 'RS' },
  'URU': { municipio: 'Uruguaiana', uf: 'RS' },
  
  'JOI': { municipio: 'Joinville', uf: 'SC' },
  'JVE': { municipio: 'Joinville', uf: 'SC' },
  'BNU': { municipio: 'Blumenau', uf: 'SC' },
  'BLU': { municipio: 'Blumenau', uf: 'SC' },
  'CHA': { municipio: 'Chapecó', uf: 'SC' },
  'XAP': { municipio: 'Chapecó', uf: 'SC' },
  'CRI': { municipio: 'Criciúma', uf: 'SC' },
  'ITA': { municipio: 'Itajaí', uf: 'SC' },
  'BCY': { municipio: 'Balneário Camboriú', uf: 'SC' },
  'LGS': { municipio: 'Lages', uf: 'SC' },
  'TUB': { municipio: 'Tubarão', uf: 'SC' },
  'BQU': { municipio: 'Brusque', uf: 'SC' },
  
  'FSA': { municipio: 'Feira de Santana', uf: 'BA' },
  'VCA': { municipio: 'Vitória da Conquista', uf: 'BA' },
  'ILH': { municipio: 'Ilhéus', uf: 'BA' },
  'JUA': { municipio: 'Juazeiro', uf: 'BA' },
  'LEX': { municipio: 'Luís Eduardo Magalhães', uf: 'BA' },
  'POR': { municipio: 'Porto Seguro', uf: 'BA' },
  'ALA': { municipio: 'Alagoinhas', uf: 'BA' },
  'CAM': { municipio: 'Camaçari', uf: 'BA' },
  'LAU': { municipio: 'Lauro de Freitas', uf: 'BA' },
  
  'CRU': { municipio: 'Caruaru', uf: 'PE' },
  'CAR': { municipio: 'Caruaru', uf: 'PE' },
  'PET': { municipio: 'Petrolina', uf: 'PE' },
  'PTL': { municipio: 'Petrolina', uf: 'PE' },
  'OLI': { municipio: 'Olinda', uf: 'PE' },
  'JAB': { municipio: 'Jaboatão dos Guararapes', uf: 'PE' },
  'GAR': { municipio: 'Garanhuns', uf: 'PE' },
  
  'CPG': { municipio: 'Campina Grande', uf: 'PB' },
  'CGP': { municipio: 'Campina Grande', uf: 'PB' },
  'PAT': { municipio: 'Patos', uf: 'PB' },
  'SOU': { municipio: 'Sousa', uf: 'PB' },
  'CZS': { municipio: 'Cajazeiras', uf: 'PB' },
  
  'JDO': { municipio: 'Juazeiro do Norte', uf: 'CE' },
  'SOB': { municipio: 'Sobral', uf: 'CE' },
  'SBR': { municipio: 'Sobral', uf: 'CE' },
  'CAU': { municipio: 'Caucaia', uf: 'CE' },
  'MAR': { municipio: 'Maracanaú', uf: 'CE' },
  'CRF': { municipio: 'Crato', uf: 'CE' },
  'IGN': { municipio: 'Iguatu', uf: 'CE' },
  'QUI': { municipio: 'Quixadá', uf: 'CE' },
  
  'MOS': { municipio: 'Mossoró', uf: 'RN' },
  'MSO': { municipio: 'Mossoró', uf: 'RN' },
  'CAI': { municipio: 'Caicó', uf: 'RN' },
  
  'STN': { municipio: 'Santarém', uf: 'PA' },
  'STM': { municipio: 'Santarém', uf: 'PA' },
  'MAB': { municipio: 'Marabá', uf: 'PA' },
  'MBA': { municipio: 'Marabá', uf: 'PA' },
  'ALT': { municipio: 'Altamira', uf: 'PA' },
  'RED': { municipio: 'Redenção', uf: 'PA' },
  
  'IMP': { municipio: 'Imperatriz', uf: 'MA' },
  'ITZ': { municipio: 'Imperatriz', uf: 'MA' },
  'CAX': { municipio: 'Caxias', uf: 'MA' },
  'TIM': { municipio: 'Timon', uf: 'MA' },
  'BAC': { municipio: 'Bacabal', uf: 'MA' },
  'BAL': { municipio: 'Balsas', uf: 'MA' },
  
  'PHB': { municipio: 'Parnaíba', uf: 'PI' },
  'PIC': { municipio: 'Picos', uf: 'PI' },
  
  'ARA': { municipio: 'Arapiraca', uf: 'AL' },
  'PAL': { municipio: 'Palmeira dos Índios', uf: 'AL' },
  
  'LAG': { municipio: 'Lagarto', uf: 'SE' },
  
  'ANP': { municipio: 'Anápolis', uf: 'GO' },
  'RVD': { municipio: 'Rio Verde', uf: 'GO' },
  'JAT': { municipio: 'Jataí', uf: 'GO' },
  'CAT': { municipio: 'Catalão', uf: 'GO' },
  'LUZ': { municipio: 'Luziânia', uf: 'GO' },
  'VAL': { municipio: 'Valparaíso de Goiás', uf: 'GO' },
  'CAL': { municipio: 'Caldas Novas', uf: 'GO' },
  
  'RDO': { municipio: 'Rondonópolis', uf: 'MT' },
  'ROO': { municipio: 'Rondonópolis', uf: 'MT' },
  'SIN': { municipio: 'Sinop', uf: 'MT' },
  'SNP': { municipio: 'Sinop', uf: 'MT' },
  'TGA': { municipio: 'Tangará da Serra', uf: 'MT' },
  'LUC': { municipio: 'Lucas do Rio Verde', uf: 'MT' },
  'PRI': { municipio: 'Primavera do Leste', uf: 'MT' },
  
  'DOU': { municipio: 'Dourados', uf: 'MS' },
  'TLS': { municipio: 'Três Lagoas', uf: 'MS' },
  'TLG': { municipio: 'Três Lagoas', uf: 'MS' },
  'COR': { municipio: 'Corumbá', uf: 'MS' },
  'PPO': { municipio: 'Ponta Porã', uf: 'MS' },
  
  'JPR': { municipio: 'Ji-Paraná', uf: 'RO' },
  'ARI': { municipio: 'Ariquemes', uf: 'RO' },
  'CAK': { municipio: 'Cacoal', uf: 'RO' },
  'VIL': { municipio: 'Vilhena', uf: 'RO' },
  'ROL': { municipio: 'Rolim de Moura', uf: 'RO' },
  
  'CZS': { municipio: 'Cruzeiro do Sul', uf: 'AC' },
  'LAR': { municipio: 'Laranjal do Jari', uf: 'AP' },
  'RRZ': { municipio: 'Rorainópolis', uf: 'RR' },
  
  'AGN': { municipio: 'Araguaína', uf: 'TO' },
  'GUR': { municipio: 'Gurupi', uf: 'TO' }
};

async function fetchCityInfo(sigla, expectedUf = '') {
  if (!sigla) return null;
  const s = String(sigla).toUpperCase();
  const uf = (expectedUf || '').toUpperCase();
  const key = `${s}_${uf}`;
  
  if (cityCache.has(key)) {
    return cityCache.get(key);
  }

  // 1. Instant match from telecom CNL dictionary (zero CORS friction)
  if (TELECOM_CNL_MAP[s]) {
    const entry = TELECOM_CNL_MAP[s];
    const match = {
      municipio: entry.municipio,
      uf: uf || entry.uf,
      cnl: s
    };
    cityCache.set(key, match);
    return match;
  }
  
  // 2. Query external endpoint if available, with safe silent catch for CORS
  try {
    const formData = new URLSearchParams();
    formData.append('q', s.toLowerCase());
    
    const res = await fetch('https://dev.onerio.pw/raphael/index.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });
    
    if (res && res.ok) {
      const html = await res.text();
      const parsed = parseCityResponse(html, expectedUf);
      if (parsed) {
        cityCache.set(key, parsed);
        return parsed;
      }
    }
  } catch (e) {
    // Silent catch (CORS or network error)
  }
  
  // 3. Fallback to sigla/uf format
  const fallback = {
    municipio: s,
    uf: uf,
    cnl: s
  };
  cityCache.set(key, fallback);
  return fallback;
}

function resolveNodesCityInfo(cyInstance) {
  if (!cyInstance || typeof cyInstance.nodes !== 'function' || cyInstance.destroyed()) return;
  
  cyInstance.nodes().forEach(node => {
    const d = node.data();
    const host = d.fullHost || d.id;
    const meta = extractHostMetadata(host);
    const info = classifyBackboneHost(host, d.deliveryType, d.trigger);
    
    if (meta.sigla) {
      fetchCityInfo(meta.sigla, meta.uf).then(cityInfo => {
        if (!cityInfo || !cyInstance || cyInstance.destroyed()) return;
        const cityDisplay = `${cityInfo.municipio} - ${cityInfo.uf || meta.uf}`;
        const popText = meta.pop ? ` (${meta.pop})` : '';
        const updatedLabel = `${info.badge} ${host}\n📍 ${cityDisplay}${popText}`;
        node.data('city', cityDisplay);
        node.data('label', updatedLabel);
      });
    }
  });
}

function classifyBackboneHost(hostname, deliveryType = '', trigger = '') {
  const host = String(hostname || '').toUpperCase();
  const deliv = String(deliveryType || '').toUpperCase();
  const trig = String(trigger || '').toUpperCase();
  const isDark = document.body && document.body.classList.contains('theme-dark-red');

  if (/(?:[-.]|^)(?:PE|PE\d+)(?:[-.]|$)/i.test(host)) {
    const color = isDark ? '#f87171' : '#0b6f6a';
    return {
      role: 'PE Router',
      badge: '[🔀 PE]',
      type: 'pe',
      shape: 'rectangle',
      borderColor: color,
      svgIcon: getEquipmentSvgUri('pe', color, isDark)
    };
  }
  if (/(?:[-.]|^)(?:CO|CORE|BB|P\d*|RT\d*)(?:[-.]|$)/i.test(host) || trig.includes('BBGR') || trig.includes('BACKBONE')) {
    const color = isDark ? '#c084fc' : '#1e3a8a';
    return {
      role: 'Core Router',
      badge: '[🌐 CORE]',
      type: 'core',
      shape: 'rectangle',
      borderColor: color,
      svgIcon: getEquipmentSvgUri('core', color, isDark)
    };
  }
  if (/(?:[-.]|^)(?:SW|SWC|SWF|SWA|DSW|ACC)(?:[-.]|$)/i.test(host)) {
    const color = isDark ? '#34d399' : '#047857';
    return {
      role: 'Metro Switch',
      badge: '[🔌 SW]',
      type: 'switch',
      shape: 'rectangle',
      borderColor: color,
      svgIcon: getEquipmentSvgUri('switch', color, isDark)
    };
  }
  if (/(?:[-.]|^)(?:TP|DWDM|OTN|MUX|TRANS)(?:[-.]|$)/i.test(host) || deliv === 'DWD' || deliv === 'DWDM') {
    const color = isDark ? '#fbbf24' : '#b45309';
    return {
      role: 'DWDM / TX',
      badge: '[📡 DWDM]',
      type: 'dwdm',
      shape: 'rectangle',
      borderColor: color,
      svgIcon: getEquipmentSvgUri('dwdm', color, isDark)
    };
  }
  if (/(?:[-.]|^)(?:OLT|GPON)(?:[-.]|$)/i.test(host)) {
    const color = isDark ? '#22d3ee' : '#0284c7';
    return {
      role: 'GPON OLT',
      badge: '[📡 OLT]',
      type: 'olt',
      shape: 'rectangle',
      borderColor: color,
      svgIcon: getEquipmentSvgUri('olt', color, isDark)
    };
  }

  const color = isDark ? '#9ca3af' : '#475569';
  return {
    role: 'Equipamento',
    badge: '[🖥️ NODE]',
    type: 'generic',
    shape: 'rectangle',
    borderColor: color,
    svgIcon: getEquipmentSvgUri('generic', color, isDark)
  };
}

// Get technology icon based on delivery type and trigger
function getTechIcon(deliveryType, trigger) {
  if (!deliveryType && !trigger) return '🖥️';
  
  const type = (deliveryType || '').toUpperCase();
  const trig = (trigger || '').toUpperCase();
  
  if (type === 'DWD' || type === 'DWDM') return '📡';
  if (type === 'FIB') return '🔗';
  if (type === 'RAD') return '📻';
  if (type === 'CAP') return '⚡';
  if (type === 'MGT' || type === 'MG') return '🔄';
  if (trig.includes('BBGR') || trig.includes('BACKBONE')) return '🌐';
  if (trig.includes('LOOPBACK')) return '🔁';
  if (trig.includes('CLIENTE') || trig.includes('B2B')) return '👥';
  if (trig.includes('PTT') || trig.includes('PEERING')) return '🌐';
  
  return '🖥️';
}

// Get node type based on delivery type
function getNodeTypeFromDelivery(deliveryType, trigger) {
  const type = (deliveryType || '').toUpperCase();
  const trig = (trigger || '').toUpperCase();
  
  if (type === 'DWD' || type === 'DWDM') return 'dwdm';
  if (type === 'FIB') return 'fibra';
  if (type === 'RAD') return 'radio';
  if (type === 'CAP') return 'capacidade';
  if (type === 'MGT' || type === 'MG') return 'gerencia';
  if (trig.includes('BBGR') || trig.includes('BACKBONE')) return 'backbone';
  
  return 'source';
}

function renderMassivasTopology(alarmsText) {
  const records = splitMassivasAlarmLines(alarmsText).map(parseMassivaAlarmLine);
  const graph = fields.massivasTopologyGraph;
  if (!graph || !window.cytoscape) return;

  // Learn from alarms
  topologyLearningData.learnFromAlarms(records);

  // If no valid alarm records, clear the graph and show placeholder
  const validRecords = records.filter(r => r.raw && r.sourceHost);
  if (!validRecords.length) {
    if (graph._cy) {
      try {
        graph._cy.stop();
        graph._cy.destroy();
      } catch (e) {}
      graph._cy = null;
    }
    graph.innerHTML = '';
    graph._pendingTopology = null;
    hideTopologyHud();
    if (graph._resizeObserver) {
      graph._resizeObserver.disconnect();
      graph._resizeObserver = null;
    }
    return;
  }

  // Cytoscape needs a container with real dimensions; when the flow/step is
  // hidden the container reports 0x0 and the graph renders blank.
  const rect = graph.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) {
    graph._pendingTopology = alarmsText;
    
    if (!graph._resizeObserver) {
      graph._resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width >= 2 && entry.contentRect.height >= 2) {
            if (graph._pendingTopology !== null && graph._pendingTopology !== undefined && graph._pendingTopology !== "") {
              renderMassivasTopology(graph._pendingTopology);
            } else if (graph._cy && typeof graph._cy.destroyed === 'function' && !graph._cy.destroyed()) {
              graph._cy.resize();
              graph._cy.fit(null, 48);
            }
            break;
          }
        }
      });
      graph._resizeObserver.observe(graph);
    }
    return;
  }
  graph._pendingTopology = null;
  
  if (graph._resizeObserver) {
    graph._resizeObserver.disconnect();
    graph._resizeObserver = null;
  }
  
  // Build links with trunk detection - use description hosts (remote equipment)
  const linkGroups = new Map();
  records.forEach((record, index) => {
    const source = record.sourceHost || record.hosts[0] || `origem-${index}`;
    const target = record.interfaceData.remoteEquipment || `equipamento-b-${index}`;
    const localInterface = record.localInterface || "interface";
    const remotePort = record.interfaceData.remotePort || "porta B";
    const isTrunk = isTrunkInterface(localInterface);
    const deliveryType = record.interfaceData.deliveryType || '';
    const trigger = record.interfaceData.trigger || '';
    const operator = record.interfaceData.operator || '';
    const capacity = record.interfaceData.capacity || '';
    
    const linkKey = `${source}->${target}`;
    if (!linkGroups.has(linkKey)) {
      linkGroups.set(linkKey, {
        source,
        target,
        interfaces: [],
        isTrunk: false,
        alarmCount: 0,
        deliveryType,
        trigger,
        operator,
        capacity
      });
    }
    const group = linkGroups.get(linkKey);
    group.interfaces.push({ local: localInterface, remote: remotePort });
    group.alarmCount++;
    if (isTrunk) group.isTrunk = true;
    if (deliveryType) group.deliveryType = deliveryType;
    if (trigger) group.trigger = trigger;
    if (operator) group.operator = operator;
    if (capacity) group.capacity = capacity;
  });

  // Create nodes with technology-based icons and telecom backbone metadata
  const nodeData = new Map();
  linkGroups.forEach((group) => {
    if (!nodeData.has(group.source)) {
      nodeData.set(group.source, { id: group.source, kind: 'source', interfaces: new Set(), deliveryType: '', trigger: '' });
    }
    if (!nodeData.has(group.target)) {
      nodeData.set(group.target, { id: group.target, kind: 'equipment', interfaces: new Set(), deliveryType: group.deliveryType, trigger: group.trigger });
    }
    group.interfaces.forEach(i => {
      nodeData.get(group.source).interfaces.add(i.local);
      nodeData.get(group.target).interfaces.add(i.remote);
    });
    if (group.deliveryType) {
      nodeData.get(group.target).deliveryType = group.deliveryType;
      nodeData.get(group.target).trigger = group.trigger;
    }
  });

  const nodes = Array.from(nodeData.values()).map(node => {
    const info = classifyBackboneHost(node.id, node.deliveryType, node.trigger);
    const meta = extractHostMetadata(node.id);
    const cached = cityCache.get(`${meta.sigla.toUpperCase()}_${meta.uf.toUpperCase()}`);
    const cityText = cached ? `${cached.municipio} - ${cached.uf || meta.uf}` : (meta.uf ? `${meta.sigla} - ${meta.uf}` : meta.sigla);
    const popText = meta.pop ? ` (${meta.pop})` : '';
    const label = `${info.badge} ${node.id}\n📍 ${cityText}${popText}`;

    return {
      data: {
        id: node.id,
        label: label,
        fullHost: node.id,
        pop: meta.pop,
        sigla: meta.sigla,
        uf: meta.uf,
        city: cached ? cached.municipio : '',
        role: info.role,
        kind: node.kind,
        shape: info.shape,
        borderColor: info.borderColor,
        svgIcon: info.svgIcon,
        interfaces: Array.from(node.interfaces),
        interfaceCount: node.interfaces.size,
        deliveryType: node.deliveryType,
        trigger: node.trigger
      }
    };
  });

  const isDark = document.body && document.body.classList.contains('theme-dark-red');

  // Create edges with telecom backbone styling and interface pairs
  const edges = Array.from(linkGroups.values()).map((group, index) => {
    const ifacePair = group.interfaces.length > 0 
      ? `${group.interfaces[0].local || 'Local'} ⟷ ${group.interfaces[0].remote || 'Remota'}`
      : 'Enlace';
    
    const details = [group.capacity, group.deliveryType, group.operator].filter(Boolean).join(' • ');
    const capLabel = details ? `[${details}]` : (group.trigger ? `[${group.trigger}]` : '');
    const edgeLabel = group.isTrunk
      ? `🔗 TRUNK (${group.interfaces.length} ifaces)\n${ifacePair}`
      : (capLabel ? `⚡ ${ifacePair}\n${capLabel}` : `↔️ ${ifacePair}`);

    const isAlarm = group.alarmCount > 0;
    const isDwdm = group.deliveryType === 'DWD' || group.deliveryType === 'DWDM';
    const lineColor = isAlarm 
      ? (isDark ? '#ff4966' : '#a83b3b')
      : (group.isTrunk 
          ? (isDark ? '#f59e0b' : '#d97706') 
          : (isDwdm ? (isDark ? '#c084fc' : '#b45309') : (isDark ? '#64748b' : '#0b6f6a')));

    return {
      data: {
        id: `link-${index}`,
        source: group.source,
        target: group.target,
        label: edgeLabel,
        ifacePair: ifacePair,
        isTrunk: group.isTrunk,
        alarmCount: group.alarmCount,
        interfaceCount: group.interfaces.length,
        deliveryType: group.deliveryType,
        trigger: group.trigger,
        operator: group.operator,
        capacity: group.capacity,
        lineColor: lineColor
      }
    };
  });

  // If Cy instance exists and is valid, update elements in-place safely without destroying
  if (graph._cy && typeof graph._cy.destroyed === 'function' && !graph._cy.destroyed()) {
    try {
      graph._cy.stop();
      graph._cy.batch(() => {
        graph._cy.elements().remove();
        graph._cy.add([...nodes, ...edges]);
      });
      const layout = graph._cy.layout({
        name: "cose",
        animate: false,
        fit: true,
        padding: 50,
        nodeRepulsion: 600000,
        idealEdgeLength: 160,
        edgeElasticity: 100,
        gravity: 80
      });
      layout.run();
      resolveNodesCityInfo(graph._cy);
      graph.style.minHeight = '380px';
      updateExperimentalTopology();
      return;
    } catch (e) {
      // If in-place update fails, fall through to re-instantiate
    }
  }

  // Properly clean up previous instance before creating a new one
  if (graph._cy) {
    try {
      graph._cy.stop();
      graph._cy.destroy();
    } catch (e) {}
    graph._cy = null;
  }

  graph._cy = window.cytoscape({
    container: graph,
    elements: [...nodes, ...edges],
    style: [
      { 
        selector: "node", 
        style: { 
          "background-opacity": 0,
          "background-image": "data(svgIcon)",
          "background-width": "100%",
          "background-height": "100%",
          "background-fit": "contain",
          "background-clip": "none",
          "shape": "rectangle",
          "border-width": 0,
          "width": 64,
          "height": 64,
          "label": "data(label)",
          "color": isDark ? "#ffffff" : "#152033",
          "text-valign": "bottom",
          "text-margin-y": 8,
          "font-size": 11,
          "font-family": '"Inter", system-ui, -apple-system, sans-serif',
          "font-weight": 700,
          "text-background-color": isDark ? "#17171b" : "#ffffff",
          "text-background-opacity": 0.96,
          "text-background-padding": 5,
          "text-background-shape": "roundrectangle",
          "text-border-color": isDark ? "#3b1218" : "#d5deea",
          "text-border-width": 1,
          "text-border-opacity": 0.9,
          "text-wrap": "wrap",
          "text-max-width": "165px"
        } 
      },
      {
        selector: "node:selected",
        style: {
          "overlay-color": isDark ? "#ff4966" : "#0b6f6a",
          "overlay-padding": 6,
          "overlay-opacity": 0.18,
          "overlay-shape": "roundrectangle"
        }
      },
      { 
        selector: "edge", 
        style: { 
          "width": 2.5,
          "line-color": "data(lineColor)",
          "target-arrow-color": "data(lineColor)",
          "target-arrow-shape": "triangle",
          "arrow-scale": 1.1,
          "label": "data(label)",
          "color": isDark ? "#f8fafc" : "#1e293b",
          "font-size": 9.5,
          "font-family": '"Inter", sans-serif',
          "font-weight": 600,
          "text-background-color": isDark ? "#17171b" : "#ffffff",
          "text-background-opacity": 0.95,
          "text-background-padding": 4,
          "text-background-shape": "roundrectangle",
          "text-border-color": isDark ? "#3b1218" : "#d5deea",
          "text-border-width": 1,
          "text-border-opacity": 0.9,
          "curve-style": "bezier",
          "text-wrap": "wrap",
          "text-max-width": "140px",
          "edge-text-rotation": "autorotate"
        } 
      },
      { 
        selector: "edge[isTrunk = 'true']", 
        style: { 
          "width": 4,
          "line-style": "dashed"
        } 
      },
      {
        selector: "edge:selected",
        style: {
          "width": 4,
          "overlay-color": isDark ? "#ff4966" : "#0b6f6a",
          "overlay-padding": 4,
          "overlay-opacity": 0.18
        }
      }
    ],
    layout: { 
      name: "cose", 
      animate: false, 
      fit: true, 
      padding: 50,
      nodeRepulsion: 600000,
      idealEdgeLength: 160,
      edgeElasticity: 100,
      gravity: 80
    },
    minZoom: 0.2,
    maxZoom: 3
  });

  resolveNodesCityInfo(graph._cy);

  // Interactive HUD on node/edge tap
  graph._cy.on('tap', 'node', function(evt) {
    const node = evt.target;
    const d = node.data();
    const cityLoc = d.city ? `${d.city} - ${d.uf}` : (d.uf ? `${d.sigla} - ${d.uf}` : d.pop || 'NOC');
    showTopologyHud(`🖥️ <strong>${d.fullHost}</strong> (${d.role}) | 📍 ${cityLoc}${d.pop ? ` (${d.pop})` : ''} | 🔌 Ifaces: ${d.interfaces.join(', ') || 'N/A'}`);
  });

  graph._cy.on('tap', 'edge', function(evt) {
    const edge = evt.target;
    const d = edge.data();
    const det = [d.capacity, d.deliveryType, d.operator, d.trigger].filter(Boolean).join(' • ');
    showTopologyHud(`🔗 <strong>${d.source} ⟷ ${d.target}</strong> | ⚡ ${d.ifacePair}${det ? ` | [${det}]` : ''}`);
  });

  graph._cy.on('tap', function(evt) {
    if (evt.target === graph._cy) {
      hideTopologyHud();
    }
  });

  // Ensure proper rendering after initialization
  setTimeout(() => {
    if (graph._cy && typeof graph._cy.destroyed === 'function' && !graph._cy.destroyed()) {
      graph._cy.resize();
      graph._cy.fit(null, 48);
    }
  }, 50);

  // Set minimum height to prevent blank/white topology canvas
  graph.style.minHeight = '380px';

  // Update experimental topology view
  updateExperimentalTopology();
}

function getTopologyIcon(kind) {
  switch(kind) {
    case 'source': return '🖥️';
    case 'equipment': return '📡';
    case 'router': return '🔀';
    case 'switch': return '🔌';
    default: return '📦';
  }
}

// Update experimental topology view
function updateExperimentalTopology() {
  const expTopology = document.getElementById('experimentalTopology');
  if (!expTopology) return;
  
  const data = topologyLearningData.getTopologyData();
  
  let html = '<div class="topology-learning-status">';
  html += `<span>📊 Nodes: ${data.nodes.length}</span>`;
  html += `<span>🔗 Links: ${data.edges.length}</span>`;
  html += `<span>📝 Correções: ${topologyLearningData.corrections.length}</span>`;
  html += '</div>';
  
  html += '<div class="topology-nodes-list">';
  html += '<h4>Nodes Aprendidos</h4>';
  data.nodes.forEach(node => {
    html += `<div class="topology-node-item" data-id="${node.id}">`;
    html += `<span class="node-icon">${getTopologyIcon(node.type)}</span>`;
    html += `<span class="node-id">${node.id}</span>`;
    html += `<span class="node-info">Alarmes: ${node.alarmCount} | Ifaces: ${node.interfaces.size}</span>`;
    html += `<button class="btn-edit-node" onclick="editTopologyNode('${node.id}')">✏️</button>`;
    html += `<button class="btn-delete-node" onclick="deleteTopologyNode('${node.id}')">🗑️</button>`;
    html += '</div>';
  });
  html += '</div>';
  
  html += '<div class="topology-edges-list">';
  html += '<h4>Links Aprendidos</h4>';
  data.edges.forEach(edge => {
    html += `<div class="topology-edge-item" data-id="${edge.id}">`;
    html += `<span class="edge-icon">${edge.isTrunk ? '🔗' : '🔌'}</span>`;
    html += `<span class="edge-id">${edge.source} → ${edge.target}</span>`;
    html += `<span class="edge-info">Alarmes: ${edge.alarmCount} | Ifaces: ${edge.localInterfaces.size}</span>`;
    html += `<button class="btn-edit-edge" onclick="editTopologyEdge('${edge.id}')">✏️</button>`;
    html += `<button class="btn-delete-edge" onclick="deleteTopologyEdge('${edge.id}')">🗑️</button>`;
    html += '</div>';
  });
  html += '</div>';
  
  expTopology.innerHTML = html;
}

// Edit topology node
function editTopologyNode(nodeId) {
  const node = topologyLearningData.nodes.get(nodeId);
  if (!node) return;
  
  const newId = prompt('Editar ID do node:', node.id);
  if (newId && newId !== node.id) {
    topologyLearningData.correctNode(nodeId, { id: newId });
  }
  
  const newType = prompt('Editar tipo (source/equipment/router/switch):', node.type);
  if (newType) {
    topologyLearningData.correctNode(nodeId, { type: newType });
  }
  
  // Refresh topology
  renderMassivasTopology(getValue("massivasDebugAlarms"));
}

// Delete topology node
function deleteTopologyNode(nodeId) {
  if (confirm(`Remover node ${nodeId}?`)) {
    topologyLearningData.removeNode(nodeId);
    renderMassivasTopology(getValue("massivasDebugAlarms"));
  }
}

// Edit topology edge
function editTopologyEdge(edgeId) {
  const edge = topologyLearningData.edges.get(edgeId);
  if (!edge) return;
  
  const newSource = prompt('Editar origem:', edge.source);
  if (newSource) {
    topologyLearningData.correctEdge(edgeId, { source: newSource });
  }
  
  const newTarget = prompt('Editar destino:', edge.target);
  if (newTarget) {
    topologyLearningData.correctEdge(edgeId, { target: newTarget });
  }
  
  renderMassivasTopology(getValue("massivasDebugAlarms"));
}

// Delete topology edge
function deleteTopologyEdge(edgeId) {
  if (confirm(`Remover link ${edgeId}?`)) {
    topologyLearningData.removeEdge(edgeId);
    renderMassivasTopology(getValue("massivasDebugAlarms"));
  }
}

function drawMassivasTopology(context, records, top, width, height) {
  const links = records.map((record) => ({
    source: record.sourceHost || record.hosts[0] || "Origem não identificada",
    target: record.interfaceData.remoteEquipment || extractMassivaAffectedHost(record) || "Equipamento B",
    localInterface: record.localInterface || "interface",
    remotePort: record.interfaceData.remotePort || "porta B",
  }));
  const sources = uniqueValues(links.map((link) => link.source));
  const targets = uniqueValues(links.map((link) => link.target));
  if (!links.length) {
    context.fillStyle = "#6b7c8f";
    context.font = "600 18px sans-serif";
    context.fillText("Cole os alarmes para visualizar a topologia", 28, top + 52);
    return;
  }

  const sourceX = Math.max(150, width * 0.18);
  const targetX = width * 0.72;
  const sourceGap = Math.min(92, (height - 70) / Math.max(sources.length, 1));
  const targetGap = Math.min(92, (height - 70) / Math.max(targets.length, 1));
  const sourceY = (index) => top + 48 + index * sourceGap;
  const targetY = (index) => top + 48 + index * targetGap;

  links.forEach((link, index) => {
    const sourceIndex = sources.indexOf(link.source);
    const targetIndex = targets.indexOf(link.target);
    const fromY = sourceY(sourceIndex);
    const toY = targetY(targetIndex);
    context.strokeStyle = "#8ca6bb";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(sourceX + 126, fromY);
    context.lineTo(targetX - 126, toY);
    context.stroke();
    context.fillStyle = "#49667d";
    context.font = "600 14px sans-serif";
    context.fillText(`${link.localInterface} -> ${link.remotePort}`, width * 0.39, (fromY + toY) / 2 - 5);
  });

  sources.forEach((source, index) => drawTopologyNode(context, source, sourceX, sourceY(index), "PONTA", "#1d6fa5"));
  targets.forEach((target, index) => drawTopologyNode(context, target, targetX, targetY(index), "EQUIPAMENTO B", "#b56b2c"));
}

function drawTopologyNode(context, label, centerX, centerY, caption, color) {
  const width = 252;
  const height = 58;
  context.fillStyle = color;
  context.fillRect(centerX - width / 2, centerY - height / 2, width, height);
  context.fillStyle = "#ffffff";
  context.font = "700 12px sans-serif";
  context.fillText(caption, centerX - width / 2 + 14, centerY - 12);
  context.font = "600 14px sans-serif";
  context.fillText(String(label).slice(0, 31), centerX - width / 2 + 14, centerY + 13);
}

function summarizeGroups(groups, catalog, fallbackLabel) {
  const entries = Object.entries(groups);
  if (!entries.length) return "";
  const label = fallbackLabel === "gatilho" ? "Tipos de gatilho" : "Tipos de entrega";
  return `${label}: ${entries.map(([key, count]) => {
    const label = Array.isArray(catalog[key]) ? catalog[key][0] : catalog[key];
    return `${key}${label ? ` (${label})` : ""}; ocorrências: ${count}`;
  }).join(" | ")}.`;
}

function summarizeOperators(groups) {
  const entries = Object.entries(groups);
  if (!entries.length) return "";
  return `Operadoras/responsáveis identificados: ${entries.map(([key, count]) => `${key}; ocorrências: ${count}`).join(" | ")}.`;
}

function summarizeInterfaces(records) {
  const capacities = uniqueValues(records.map((record) => record.interfaceData.capacity).filter(Boolean));
  const interfaceTypes = uniqueValues(records.map((record) => record.interfaceData.interfaceType).filter(Boolean));
  const localInterfaces = uniqueValues(records.map((record) => record.localInterface).filter(Boolean));
  const remoteEquipments = uniqueValues(records.map((record) => record.interfaceData.remoteEquipment).filter(Boolean));
  const remotePorts = uniqueValues(records.map((record) => record.interfaceData.remotePort).filter(Boolean));
  const details = [];
  if (localInterfaces.length) details.push(`interfaces locais ${localInterfaces.slice(0, 4).join(", ")}`);
  if (capacities.length) details.push(`capacidade ${capacities.join(", ")}`);
  if (interfaceTypes.length) details.push(`tipo ${interfaceTypes.map((type) => `${type} (${interfaceTypeCatalog[type.replace(/\d+$/, "")] || "tipo não catalogado"})`).join(", ")}`);
  if (remoteEquipments.length) details.push(`equipamentos B ${remoteEquipments.slice(0, 4).join(", ")}`);
  if (remotePorts.length) details.push(`portas B ${remotePorts.slice(0, 4).join(", ")}`);
  return details.length ? `Dados técnicos: ${details.join("; ")}.` : "";
}

function parseMassivaAlarmLine(line) {
  const primaryHost = extractPrimaryLineHost(line);
  const parenthetical = line.match(/::\s*\(([^)]+)\)/);
  const rawDescMatch = line.match(/::\s*([^:]+?)(?:\s*::|$)/);
  const interfaceDescription = parenthetical ? parenthetical[1] : (rawDescMatch ? rawDescMatch[1].trim() : "");
  const localInterface = extractLocalAlarmInterface(line);
  const interfaceData = parseInterfaceDescription(interfaceDescription || line);
  const hostFromDesc = extractHostFromDescription(interfaceDescription) || extractHostFromDescription(line) || (interfaceData.remoteEquipment && /^BR[.-]/i.test(interfaceData.remoteEquipment) ? interfaceData.remoteEquipment : "");
  const affectedHost = hostFromDesc || primaryHost || "";
  const hosts = affectedHost ? [affectedHost] : (primaryHost ? [primaryHost] : []);

  return {
    raw: line,
    time: extractRecordTime(line),
    status: extractMassivasAlarmStatus(line),
    eventId: extractMassivasEventId(line),
    sourceHost: primaryHost,
    affectedHost: affectedHost,
    hosts,
    localInterface,
    interfaceDescription,
    interfaceData,
  };
}

function extractMassivaAffectedHost(record) {
  if (!record) return "";
  const hostFromDesc = extractHostFromDescription(record.interfaceDescription) || extractHostFromDescription(record.raw);
  if (hostFromDesc) return hostFromDesc.toUpperCase();
  if (record.interfaceData?.remoteEquipment && /^BR[.-]/i.test(record.interfaceData.remoteEquipment)) {
    return record.interfaceData.remoteEquipment.toUpperCase();
  }
  return record.affectedHost || record.sourceHost || (record.hosts && record.hosts[0]) || "";
}

function extractHostFromDescription(description) {
  if (!description) return "";
  const cleaned = String(description).replace(/^[(\s]+|[)\s]+$/g, "").trim();

  // 1. Try finding segment in underscore-separated description starting with BR. or BR-
  const segments = cleaned.split("_").map((s) => s.trim());
  const hostSegment = segments.find((s) => /^BR[.-][A-Z]{2}[.-][A-Z0-9.-]+/i.test(s));
  if (hostSegment) return hostSegment.toUpperCase();

  // 2. Try regex match for standard BR hostname pattern (with dots or hyphens, 4 to 6 segments)
  const match = cleaned.match(/\b(BR[.-][A-Z]{2}(?:[.-][A-Z0-9]{2,6}){2,4}[.-]\d{1,2})\b/i);
  if (match) return match[1].toUpperCase();

  // 3. Try matching between capacity/trigger and remote port
  const afterCapMatch = cleaned.match(/(?:100G|400G|800G|40G|10G|1G|GE|GIG|GB)_(BR[A-Z0-9.-]+?)_/i);
  if (afterCapMatch) return afterCapMatch[1].toUpperCase();

  const beforePortMatch = cleaned.match(/_(BR[A-Z0-9.-]+?)_(?:ET|XGE|XG|GE|GI|TE|ETH|PORT|CH|\d+GE)/i);
  if (beforePortMatch) return beforePortMatch[1].toUpperCase();

  return "";
}

function splitMassivasAlarmLines(text) {
  const sourceLines = splitLines(text).map((line) => line.trim()).filter(Boolean);
  const alarmLines = [];

  sourceLines.forEach((line) => {
    const hasHost = extractFullHosts(line).length > 0;
    const hasState = /\b(?:PROBLEM|RESOLVED|OK|UNKNOWN)\b/i.test(line);
    const continuesPrevious = !hasHost && /link\s+(?:down|up)\b/i.test(line) && alarmLines.length;
    if (continuesPrevious && !hasState) {
      alarmLines[alarmLines.length - 1] += ` ${line}`;
      return;
    }
    alarmLines.push(line);
  });

  return alarmLines;
}

function extractMassivasAlarmStatus(line) {
  const match = String(line || "").match(/\b(PROBLEM|RESOLVED|OK|UNKNOWN)\b/i);
  return match ? match[1].toUpperCase() : "";
}

function extractMassivasEventId(line) {
  const match = String(line || "").match(/[?&]eventid=(\d+)/i);
  return match ? match[1] : "";
}

function extractLocalAlarmInterface(line) {
  const hostPattern = /(?:BR[.-][A-Z]{2}(?:[.-][A-Z0-9]{2,6}){2,4}[.-]\d{1,2})/i;
  const match = String(line || "").match(new RegExp(`${hostPattern.source}\\s*(?:[↑↓→]\\s*)?([^\\s]+)\\s*::`, "i"));
  return match ? match[1].toUpperCase() : "";
}

function parseInterfaceDescription(value) {
  const normalizedValue = String(value || "").toUpperCase();
  const segments = normalizedValue
    .split("_")
    .map((segment) => segment.replace(/^DESCRIPTION\s*:/i, "").trim())
    .filter(Boolean);
  const trigger = normalizeMassivasTrigger(segments.find((segment) => triggerCatalog[segment] || segment === "FFBBGR") || "");
  const interfaceType = normalizeMassivasInterfaceType(segments.find((segment) => /^(?:A|I)?(?:E)?(?:TK|KT)\d+$|^ULK\d*$/.test(segment)) || "");
  const capacity = segments.find((segment) => /^\d+(?:M|G|T)(?:B)?$/.test(segment)) || inferCapacityFromText(value);
  const deliveryType = inferDeliveryType(segments);
  const deliveryIndex = deliveryType ? segments.findIndex((segment) => segment === deliveryType || (deliveryType === "DWD" && segment === "DWDM")) : -1;
  const operatorSegment = deliveryIndex >= 0 ? segments[deliveryIndex + 1] || "" : "";
  const operator = operatorSegment ? inferInterfaceOperator([operatorSegment], deliveryType) : inferInterfaceOperator(segments, deliveryType);
  
  // Extract remote equipment: check if a segment is a BR hostname, or comes after capacity
  const hostSegment = segments.find((segment) => /^BR[.-][A-Z]{2}[.-][A-Z0-9.-]+/i.test(segment));
  const capacityIndex = capacity ? segments.findIndex((segment) => segment === capacity) : -1;
  let remoteEquipment = hostSegment || "";
  let remotePort = "";
  if (!remoteEquipment && capacityIndex >= 0 && capacityIndex + 1 < segments.length) {
    remoteEquipment = segments[capacityIndex + 1] || "";
  }
  if (capacityIndex >= 0 && capacityIndex + 2 < segments.length) {
    remotePort = segments[capacityIndex + 2] || "";
  }
  if (!remotePort && hostSegment) {
    const hostIdx = segments.indexOf(hostSegment);
    if (hostIdx >= 0 && hostIdx + 1 < segments.length && /^(?:ET|XGE|XG|GE|GI|TE|ETH|PORT|CH|\d+GE)/i.test(segments[hostIdx + 1])) {
      remotePort = segments[hostIdx + 1];
    }
  }
  
  // Fallback: try to find remote equipment using regex pattern
  if (!remoteEquipment || !/^BR[.\-]/i.test(remoteEquipment)) {
    const remoteMatch = normalizedValue.match(/_(BR[.\-][A-Z]{2}(?:[.\-][A-Z0-9]{2,6}){2,4}[.\-]\d{1,2})_/i);
    if (remoteMatch) {
      remoteEquipment = remoteMatch[1];
    }
  }
  
  // Extract remote port if not found
  if (!remotePort) {
    const portMatch = normalizedValue.match(/_[A-Z]{2}\d[\d\/]+(?=_CAP|_DWD|_FIB|_RAD|_MGT|_)/i);
    if (portMatch) {
      remotePort = portMatch[0].replace(/^_/, "");
    }
  }
  const tokens = normalizedValue
    .toUpperCase()
    .split(/[_.:\s]+/)
    .map((token) => token.trim())
    .filter(Boolean);
  const fallbackTrigger = normalizeMassivasTrigger(tokens.find((token) => triggerCatalog[token] || token === "FFBBGR") || "");
  const fallbackInterfaceType = normalizeMassivasInterfaceType(tokens.find((token) => /^(?:A|I)?(?:E)?(?:TK|KT)\d+$|^ULK\d*$/.test(token)) || "");
  const fallbackCapacity = tokens.find((token) => /^\d+(?:M|G|T|GE|GIG|GB)$/.test(token)) || "";
  const fallbackDeliveryType = inferDeliveryType(tokens);
  const fallbackOperator = inferInterfaceOperator(tokens, fallbackDeliveryType);

  return {
    trigger: trigger || fallbackTrigger,
    interfaceType: interfaceType || fallbackInterfaceType,
    capacity: capacity || fallbackCapacity,
    deliveryType: deliveryType || fallbackDeliveryType,
    operator: operator || fallbackOperator,
    remoteEquipment: remoteEquipment || tokens.find((token) => token !== trigger && token !== operator && token.includes("-") && /[A-Z]{3,4}/.test(token)) || "",
    remotePort: remotePort || inferRemotePort(value, tokens),
  };
}

function normalizeMassivasTrigger(value) {
  return String(value || "").toUpperCase() === "FFBBGR" ? "IFBBGR" : String(value || "").toUpperCase();
}

function normalizeMassivasInterfaceType(value) {
  const normalized = String(value || "").toUpperCase();
  return normalized.startsWith("IKT") ? normalized.replace(/^IKT/, "ITK") : normalized;
}

function inferDeliveryType(tokens) {
  const found = tokens.find((token) => deliveryTypeCatalog[token]);
  if (!found) return "";
  return found === "DWDM" ? "DWD" : found;
}

function inferInterfaceOperator(tokens, deliveryType) {
  const knownOperator = tokens.find((token) => getPartnerContact(token) || carrierProfiles[token]);
  if (knownOperator) return normalizeInterfaceOperator(knownOperator);

  const operatorVariant = tokens.find((token) => /^(CLARO|VIVO|TIM|OI)(?:[-_:]|$)/i.test(token));
  if (operatorVariant) return operatorVariant.split(/[-_:]/)[0];

  const deliveryIndex = tokens.findIndex((token) => token === deliveryType || (deliveryType === "DWD" && token === "DWDM"));
  if (deliveryIndex < 0 || tokens.length - deliveryIndex > 4) return "";

  const candidate = tokens.slice(deliveryIndex + 1).find((token) => isLikelyOperatorToken(token));
  return candidate ? normalizeInterfaceOperator(candidate) : "";
}

function normalizeInterfaceOperator(token) {
  const value = String(token || "").toUpperCase();
  const known = carrierDetectionOptions().find((option) => value === option.match || value.startsWith(`${option.match}-`) || value.startsWith(`${option.match}_`) || value.startsWith(`${option.match}:`));
  return known ? known.value : value;
}

function isLikelyOperatorToken(token) {
  if (!token) return false;
  if (/^(CH\d+|PT\d+|PORTA|PORT|100G|40G|10G|\d+G|\d+M|\d+T)$/i.test(token)) return false;
  if (triggerCatalog[token] || deliveryTypeCatalog[token]) return false;
  if (/^(ULK\d*|A?ETK\d*|A?TK\d*|I?ETK\d*|I?TK\d*)$/i.test(token)) return false;
  return /^[A-Z][A-Z0-9-]{2,}$/.test(token);
}

function inferRemotePort(value, tokens) {
  const direct = String(value || "").toUpperCase().match(/\b(?:ETH-TRUNK\d+|ET-\d+\/\d+\/\d+|XE-\d+\/\d+\/\d+|GE-\d+\/\d+\/\d+|100GE\d+\/\d+\/\d+|XGE\d+\/\d+\/\d+|TEN-GIGABIT-ETHERNET-\d+\/\d+\/\d+)\b/i);
  if (direct) return direct[0].toUpperCase();

  return tokens.find((token) => /(?:100GE|TEN|XGE|GE|GI|TE|ETH|PORT|CH)\S*/i.test(token)) || "";
}

function inferCapacityFromText(value) {
  const match = String(value || "").match(/\b(10|40|100|400|800)\s*(GE|G)\b/i);
  return match ? `${match[1]}G` : "";
}

function suggestMassivasActions(context) {
  const actions = [];
  const operators = Object.keys(context.operatorGroups || {});
  const responsible = operators.length ? operators.join(", ") : "";
  const domains = context.domains || [];
  const causes = Object.keys(context.causeGroups || {});

  if (context.repeatedRestart || causes.some((cause) => cause.startsWith("EQUIPAMENTO/")) || causes.includes("ENERGIA/ELETRICA")) {
    actions.push("Acionar Infra para validação local do equipamento, energia, hardware e logs de reboot.");
  }

  if (domains.some((domain) => ["TX/DWDM", "TX/FIBRA", "BACKBONE/TRANSPORTE"].includes(domain))) {
    actions.push("Acionar TX/Transporte para validar os enlaces, equipamentos B e portas B indicados nas descrições.");
  }
  if (domains.includes("REDE METRO/LOCAL")) actions.push("Acionar a equipe de Rede Metro para validar a interligação local e a topologia do POP.");
  if (domains.includes("CAPACIDADE")) actions.push("Acionar a equipe responsável pela capacidade para validar o circuito e a entrega monitorada.");
  if (domains.includes("GERENCIA")) actions.push("Validar a gerência do equipamento, conectividade de gestão e disponibilidade do dispositivo.");
  if (context.multipleApproaches && context.simultaneous) actions.push("Correlacionar os eventos no mesmo intervalo para confirmar se há isolamento de site ou múltiplos incidentes independentes.");
  if (responsible) actions.push(`Validar também o trecho sob responsabilidade de ${responsible}, somente se confirmado pela topologia e pelo circuito.`);

  if (!actions.length) actions.push("Validar topologia, correlação temporal e novos alarmes antes de definir acionamento externo.");
  actions.push("Anexar as evidências abaixo no chamado e atualizar conforme retorno das áreas acionadas.");

  return actions;
}

function formatMassivasEvidence(records, fallbackLines) {
  if (!records.length) return fallbackLines.length ? fallbackLines.map((line) => `- ${line}`) : ["- Nenhum alarme retornado."];

  return records.map((record, index) => {
    const data = record.interfaceData;
    const details = [
      record.time ? `horário ${record.time}` : "",
      record.status ? `estado ${record.status}` : "",
      record.eventId ? `eventid ${record.eventId}` : "",
      record.hosts.length ? `hosts ${record.hosts.join(", ")}` : "",
      record.localInterface ? `interface local ${record.localInterface}` : "",
      data.trigger ? `trigger ${data.trigger}` : "",
      data.interfaceType ? `tipo-ifce ${data.interfaceType}` : "",
      data.capacity ? `capacidade ${data.capacity}` : "",
      data.remoteEquipment ? `equipamento B ${data.remoteEquipment}` : "",
      data.remotePort ? `porta B ${data.remotePort}` : "",
      data.deliveryType ? `entrega ${data.deliveryType}` : "",
      data.operator ? `operadora ${data.operator}` : "",
    ].filter(Boolean).join("; ");

    return `${index + 1}. ${details || "alarme sem campos estruturados"}\n   Evidência: ${record.raw}`;
  });
}

function extractRecordTime(line) {
  const full = line.match(/\b20\d{2}-\d{2}-\d{2}\s+\d{2}:\d{2}(?::\d{2})?\b/);
  if (full) return full[0];

  const br = line.match(/\b\d{2}\/\d{2}\/\d{4},?\s+\d{2}:\d{2}(?::\d{2})?\b/);
  if (br) return br[0];

  const hour = line.match(/\b\d{2}:\d{2}(?::\d{2})?\b/);
  return hour ? hour[0] : "";
}

function parseHostnameStandard(host) {
  const normalized = normalizeHost(host).replace(/\./g, "-");
  const parts = normalized.split("-");
  if (parts.length < 6) return null;

  const offset = parts[0] === "BR" ? 0 : -1;
  return {
    country: offset === 0 ? parts[0] : "BR",
    uf: parts[offset + 1],
    city: parts[offset + 2],
    pop: parts[offset + 3],
    role: parts[offset + 4],
    sequence: parts[offset + 5],
  };
}

function hasSimultaneousImpact(records) {
  const times = records.map((record) => timeToSeconds(record.time)).filter((time) => time !== null).sort((a, b) => a - b);
  if (times.length < 2) return false;

  for (let index = 1; index < times.length; index += 1) {
    if (Math.abs(times[index] - times[index - 1]) <= 300) return true;
  }

  return false;
}

function timeToSeconds(value) {
  const dateTime = String(value || "").match(/(20\d{2})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (dateTime) return Date.UTC(Number(dateTime[1]), Number(dateTime[2]) - 1, Number(dateTime[3]), Number(dateTime[4]), Number(dateTime[5]), Number(dateTime[6] || 0));

  const brazilianDateTime = String(value || "").match(/(\d{2})\/(\d{2})\/(20\d{2}),?\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (brazilianDateTime) return Date.UTC(Number(brazilianDateTime[3]), Number(brazilianDateTime[2]) - 1, Number(brazilianDateTime[1]), Number(brazilianDateTime[4]), Number(brazilianDateTime[5]), Number(brazilianDateTime[6] || 0));

  const match = String(value || "").match(/(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return null;
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3] || 0);
}

function recordsForHost(records, host) {
  return records.filter((record) => record.hosts.includes(host));
}

function uniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function countBy(values) {
  return values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function currentMassivasStep() {
  const active = document.querySelector(".massivas-step.is-active");
  return Number(active?.dataset.massivasStep || 1);
}

function showMassivasStep(step) {
  const nextStep = Math.min(Math.max(step, 1), 3);
  showGlobalProgress((nextStep / 3) * 100, 220);
  document.querySelectorAll(".massivas-step").forEach((item) => {
    const isActive = Number(item.dataset.massivasStep) === nextStep;
    item.classList.toggle("is-active", isActive);

    if (isActive && window.gsap) {
      gsap.fromTo(item, { y: 16, opacity: 0.75 }, { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" });
    }
  });

  updateMassivasStepper(nextStep);
  if (fields.massivasStatus) fields.massivasStatus.textContent = `Passo ${nextStep} de 3`;
  setTimeout(hideGlobalProgress, 250);

  // Re-renderiza a topologia quando o passo 1 (que contém o mapa) fica visível.
  // O Cytoscape não renderiza corretamente em contêiner oculto (0x0).
  if (nextStep === 1) {
    // Use setTimeout to wait for CSS transitions and layout to complete
    setTimeout(() => {
      const graph = fields.massivasTopologyGraph;
      if (!graph) return;
      
      // Always try to render the topology with current alarm data
      const alarmsText = getValue("massivasDebugAlarms");
      if (alarmsText && alarmsText.trim()) {
        // Clear any existing Cytoscape instance to ensure fresh render
        if (graph._cy) {
          try {
            graph._cy.destroy();
          } catch (e) {
            // Ignore destroy errors
          }
          graph._cy = null;
        }
        graph.innerHTML = '';
        graph._pendingTopology = null;
        
        // Render with current alarm text
        renderMassivasTopology(alarmsText);
      } else {
        // No alarms text, check if there's pending topology from before
        if (graph._pendingTopology !== null && graph._pendingTopology !== undefined && graph._pendingTopology !== "") {
          renderMassivasTopology(graph._pendingTopology);
        }
      }
      
      // Check if container has valid dimensions after render
      const rect = graph.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) {
        // Container still not ready, try again in next frame
        requestAnimationFrame(() => {
          const retryRect = graph.getBoundingClientRect();
          if (retryRect.width >= 2 && retryRect.height >= 2) {
            if (graph._cy) {
              graph._cy.resize();
              graph._cy.fit(null, 48);
            }
          }
        });
      }
    }, 50);
  }
}

function updateMassivasStepper(step) {
  const progressFill = fields.massivasProgressFill;
  if (progressFill) progressFill.style.width = `${(step / 5) * 100}%`;

  document.querySelectorAll("[data-massivas-step-nav]").forEach((button) => {
    const buttonStep = Number(button.dataset.massivasStepNav);
    button.classList.toggle("is-active", buttonStep === step);
    button.classList.toggle("is-complete", buttonStep < step);
    button.setAttribute("aria-current", buttonStep === step ? "step" : "false");
  });
}

function currentAutoStep() {
  const active = document.querySelector(".auto-step.is-active");
  return Number(active?.dataset.autoStep || 1);
}

function showAutoStep(step) {
  const nextStep = Math.min(Math.max(step, 1), 5);
  showGlobalProgress((nextStep / 5) * 100, 220);
  document.querySelectorAll(".auto-step").forEach((item) => {
    const isActive = Number(item.dataset.autoStep) === nextStep;
    item.classList.toggle("is-active", isActive);

    if (isActive && window.gsap) {
      gsap.fromTo(item, { y: 16, opacity: 0.75 }, { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" });
    }
  });

  updateAutoStepper(nextStep);
  fields.autoStatus.textContent = `Passo ${nextStep} de 5`;
  toggleAutoRecognize();
  setTimeout(hideGlobalProgress, 250);
}

function updateAutoStepper(step) {
  const progressFill = document.getElementById("autoProgressFill");
  if (progressFill) progressFill.style.width = `${(step / 5) * 100}%`;

  document.querySelectorAll("[data-step-nav]").forEach((button) => {
    const buttonStep = Number(button.dataset.stepNav);
    button.classList.toggle("is-active", buttonStep === step);
    button.classList.toggle("is-complete", buttonStep < step);
    button.setAttribute("aria-current", buttonStep === step ? "step" : "false");
  });
}

function syncAutoFieldsFromMain() {
  fields.autoEvents.value = getValue("events");
  fields.autoCarrier.value = getValue("carrier");
  fields.autoFailureType.value = getValue("failureType");
  fields.autoInternalTicket.value = getValue("internalTicket");
  toggleAutoRecognize();
}

function toggleAutoRecognize() {
  fields.autoRecognizeActions.hidden = !getValue("internalTicket");
}

function animateLaunchIn() {
  if (!window.gsap) return;

  gsap.fromTo(".launch-modal", { y: 24, opacity: 0.45, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power2.out" });
}

function animateAutoFlowIn() {
  if (!window.gsap) return;

  gsap.fromTo(".auto-flow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.36, ease: "power2.out" });
}

function animateManualModeIn() {
  if (!window.gsap) return;

  gsap.fromTo(".workspace", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.36, ease: "power2.out" });
}

function animateMassivasFlowIn() {
  if (!window.gsap) return;

  gsap.fromTo(".massivas-flow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.36, ease: "power2.out" });
}

function showButtonPreview(button) {
  const kind = button.dataset.previewKind;
  if (button.classList.contains("auto-copy-action")) {
    if (kind !== "complete") showAutoPreview(kind);
  } else {
    showPreview(kind);
  }
}

function showPreviewTooltip(button) {
  if (!previewTooltipEl) return;

  window.clearTimeout(previewTooltipHideTimer);
  previewTooltipTarget = button;

  const kind = button.dataset.previewKind;
  const title = previewTitleFor(kind);
  const missing = getMissingFields(kind);
  const previewText = missing.length
    ? `Complete os campos para gerar:\n- ${missing.join("\n- ")}`
    : getRawGeneratedText(kind) || "Preencha os dados para gerar a prévia.";
  const label = button.textContent.trim().replace(/\s+/g, " ");
  const compactPreview = shortenPreviewText(previewText, button.classList.contains("auto-copy-action") ? 180 : 150, 4);

  previewTooltipEl.querySelector(".preview-tooltip-float__label").textContent = label;
  previewTooltipEl.querySelector(".preview-tooltip-float__title").textContent = title;
  previewTooltipEl.querySelector(".preview-tooltip-float__body").textContent = compactPreview;
  previewTooltipEl.hidden = false;
  previewTooltipEl.classList.add("is-visible");
  window.requestAnimationFrame(() => positionPreviewTooltip(button));
}

function positionPreviewTooltip(button) {
  if (!previewTooltipEl) return;

  const rect = button.getBoundingClientRect();
  const tooltipRect = previewTooltipEl.getBoundingClientRect();
  const gap = 12;
  const isAuto = button.classList.contains("auto-copy-action");

  let top = rect.top + rect.height / 2 - tooltipRect.height / 2;
  let left = isAuto ? rect.right + gap : rect.left + rect.width / 2 - tooltipRect.width / 2;

  if (!isAuto) {
    top = rect.top - tooltipRect.height - gap;
  }

  if (isAuto && left + tooltipRect.width > window.innerWidth - 12) {
    left = rect.left - tooltipRect.width - gap;
  }

  if (!isAuto && top < 12) {
    top = rect.bottom + gap;
  }

  top = Math.max(12, Math.min(top, window.innerHeight - tooltipRect.height - 12));
  left = Math.max(12, Math.min(left, window.innerWidth - tooltipRect.width - 12));

  previewTooltipEl.style.top = `${top}px`;
  previewTooltipEl.style.left = `${left}px`;
}

function hidePreviewTooltip() {
  if (!previewTooltipEl) return;

  previewTooltipHideTimer = window.setTimeout(() => {
    previewTooltipEl.hidden = true;
    previewTooltipEl.classList.remove("is-visible");
    previewTooltipTarget = null;
  }, 80);
}

function shortenPreviewText(text, maxChars, maxLines) {
  const lines = String(text).split("\n").filter((line) => line.trim().length > 0);
  const compactLines = lines.slice(0, maxLines).map((line) => line.trim());
  let compact = compactLines.join("\n");

  if (compact.length > maxChars) {
    compact = `${compact.slice(0, maxChars - 1).trimEnd()}…`;
  } else if (lines.length > maxLines) {
    compact = `${compact}\n…`;
  }

  return compact;
}

function buildPreviewTooltipContent(button) {
  const kind = button.dataset.previewKind;
  const title = previewTitleFor(kind);
  const missing = getMissingFields(kind);
  const previewText = missing.length
    ? `Complete os campos para gerar:\n- ${missing.join("\n- ")}`
    : getRawGeneratedText(kind) || "Preencha os dados para gerar a prévia.";
  const label = button.textContent.trim().replace(/\s+/g, " ");

  return `
    <div class="preview-tooltip">
      <div class="preview-tooltip__label">${escapeHtml(label)}</div>
      <div class="preview-tooltip__title">${escapeHtml(title)}</div>
      <pre class="preview-tooltip__body">${escapeHtml(previewText)}</pre>
    </div>
  `;
}

function initNetworkOceanBackground(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const themes = {
    light: {
      fog: 0x07111f,
      water: 0x79f1dd,
      mesh: 0x3ed8c7,
      stream: [0x22d3ee, 0xf2b84b, 0x7dd3c7, 0x4ca5ff],
      pulse: 0xf2b84b,
      beacon: 0x9adff4,
      ambient: 0xffffff,
      ambientIntensity: 0.58,
      light: 0x9bd8ff,
      lightIntensity: 1.7,
      light2: 0x69e2cf,
      light2Intensity: 0.9,
    },
    dark: {
      fog: 0x050506,
      water: 0xe5092f,
      mesh: 0xb80d28,
      stream: [0xe5092f, 0xff2448, 0xb80d28, 0x7a0718],
      pulse: 0xff2448,
      beacon: 0xe5092f,
      ambient: 0x260006,
      ambientIntensity: 0.86,
      light: 0xff1744,
      lightIntensity: 2.7,
      light2: 0xb80d28,
      light2Intensity: 1.0,
    },
  };

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07111f, 0.055);
  const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 100);
  camera.position.set(0, 5.9, 8.1);
  camera.lookAt(0, -0.42, -2.4);

  const group = new THREE.Group();
  group.rotation.x = -0.18;
  scene.add(group);

  const columns = 72;
  const rows = 46;
  const xSpan = 25;
  const zSpan = 18;
  const nodeCount = columns * rows;
  const surfacePositions = new Float32Array(nodeCount * 3);
  const basePoints = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = (column / (columns - 1) - 0.5) * xSpan;
      const z = (row / (rows - 1) - 0.5) * zSpan - 1.2;
      basePoints.push({ x, z });
    }
  }

  const surfaceGeometry = new THREE.BufferGeometry();
  surfaceGeometry.setAttribute("position", new THREE.BufferAttribute(surfacePositions, 3));
  const surfaceMaterial = new THREE.PointsMaterial({
    color: 0x79f1dd,
    size: 0.043,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
  });
  const surface = new THREE.Points(surfaceGeometry, surfaceMaterial);
  group.add(surface);

  const linkPairs = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const current = row * columns + column;
      if (column < columns - 1) linkPairs.push([current, current + 1]);
      if (row < rows - 1 && column % 2 === 0) linkPairs.push([current, current + columns]);
    }
  }

  const linkPositions = new Float32Array(linkPairs.length * 2 * 3);
  const linkGeometry = new THREE.BufferGeometry();
  linkGeometry.setAttribute("position", new THREE.BufferAttribute(linkPositions, 3));
  const linkMaterial = new THREE.LineBasicMaterial({
    color: 0x3ed8c7,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const links = new THREE.LineSegments(linkGeometry, linkMaterial);
  group.add(links);

  const streamMaterials = [0x22d3ee, 0xf2b84b, 0x7dd3c7, 0x4ca5ff].map((color) => new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
  }));
  const streams = Array.from({ length: 10 }, (_, index) => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(90 * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const line = new THREE.Line(geometry, streamMaterials[index % streamMaterials.length]);
    line.userData = {
      baseZ: -8.4 + index * 1.82,
      phase: index * 0.74,
      lift: 0.1 + (index % 3) * 0.055,
    };
    group.add(line);
    return line;
  });

  const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xf2b84b, transparent: true, opacity: 0.9 });
  const pulses = [];
  streams.forEach((stream, streamIndex) => {
    for (let index = 0; index < 2; index += 1) {
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.055, 14, 10), pulseMaterial.clone());
      pulse.userData = {
        stream,
        offset: (streamIndex * 0.11 + index * 0.43) % 1,
      };
      pulses.push(pulse);
      group.add(pulse);
    }
  });

  const beaconMaterial = new THREE.MeshStandardMaterial({
    color: 0x9adff4,
    emissive: 0x0b6f6a,
    emissiveIntensity: 0.75,
    roughness: 0.2,
    metalness: 0.2,
  });
  const beacons = [];
  const beaconIndexes = [
    [7, 7], [18, 15], [34, 9], [50, 18], [63, 11],
    [10, 30], [28, 35], [45, 31], [64, 37],
  ];
  beaconIndexes.forEach(([column, row], index) => {
    const beacon = new THREE.Group();
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.11, 18, 12), beaconMaterial);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.006, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0x9adff4, transparent: true, opacity: 0.42 }),
    );
    ring.rotation.x = Math.PI / 2;
    beacon.userData = { column, row, index, core, ring };
    beacon.add(core, ring);
    beacons.push(beacon);
    group.add(beacon);
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.58);
  scene.add(ambientLight);
  const light = new THREE.PointLight(0x9bd8ff, 1.7, 45);
  light.position.set(0, 5.5, 6.8);
  scene.add(light);
  const light2 = new THREE.PointLight(0x69e2cf, 0.9, 32);
  light2.position.set(-5, 1.5, 2.4);
  scene.add(light2);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const mouseWave = { x: 0, z: -1.2, strength: 0 };
  const clickRipples = [];

  function pointerToOcean(clientX, clientY) {
    const normalizedX = clientX / window.innerWidth - 0.5;
    const normalizedY = clientY / window.innerHeight - 0.5;
    return {
      x: normalizedX * xSpan * 0.92,
      z: normalizedY * zSpan * 0.82 - 1.2,
    };
  }

  function waveAt(x, z, seconds) {
    const mouseDistance = Math.hypot(x - mouseWave.x, z - mouseWave.z);
    const mouseInfluence = Math.cos(mouseDistance * 2.7 - seconds * 4.8) * Math.exp(-mouseDistance * 0.36) * mouseWave.strength;
    const rippleInfluence = clickRipples.reduce((sum, ripple) => {
      const age = seconds - ripple.startedAt;
      if (age < 0 || age > 4.2) return sum;
      const distance = Math.hypot(x - ripple.x, z - ripple.z);
      const ring = Math.sin(distance * 4.4 - age * 7.2);
      const envelope = Math.exp(-Math.abs(distance - age * 2.2) * 0.85) * Math.exp(-age * 0.42);
      return sum + ring * envelope * ripple.force;
    }, 0);

    return (
      Math.sin(x * 0.78 + seconds * 0.92) * 0.22 +
      Math.cos(z * 0.9 + seconds * 0.68) * 0.18 +
      Math.sin((x + z) * 0.38 + seconds * 1.25) * 0.12 +
      mouseInfluence +
      rippleInfluence
    );
  }

  function setPositionAt(array, pointIndex, x, y, z) {
    array[pointIndex * 3] = x;
    array[pointIndex * 3 + 1] = y;
    array[pointIndex * 3 + 2] = z;
  }

  function updateSurface(seconds) {
    basePoints.forEach((point, index) => {
      const y = waveAt(point.x, point.z, seconds);
      setPositionAt(surfacePositions, index, point.x, y, point.z);
    });
    surfaceGeometry.attributes.position.needsUpdate = true;

    linkPairs.forEach(([left, right], index) => {
      const leftOffset = left * 3;
      const rightOffset = right * 3;
      const segmentOffset = index * 6;
      linkPositions[segmentOffset] = surfacePositions[leftOffset];
      linkPositions[segmentOffset + 1] = surfacePositions[leftOffset + 1];
      linkPositions[segmentOffset + 2] = surfacePositions[leftOffset + 2];
      linkPositions[segmentOffset + 3] = surfacePositions[rightOffset];
      linkPositions[segmentOffset + 4] = surfacePositions[rightOffset + 1];
      linkPositions[segmentOffset + 5] = surfacePositions[rightOffset + 2];
    });
    linkGeometry.attributes.position.needsUpdate = true;
  }

  function streamPoint(stream, progress, seconds) {
    const x = (progress - 0.5) * 26.4;
    const z = stream.userData.baseZ + Math.sin(progress * Math.PI * 4 + stream.userData.phase + seconds * 0.55) * 0.34;
    const y = waveAt(x, z, seconds) + stream.userData.lift + Math.sin(progress * Math.PI * 2 + seconds) * 0.055;
    return new THREE.Vector3(x, y, z);
  }

  function updateStreams(seconds) {
    streams.forEach((stream) => {
      const positions = stream.geometry.attributes.position.array;
      const pointCount = positions.length / 3;
      for (let index = 0; index < pointCount; index += 1) {
        const progress = index / (pointCount - 1);
        const point = streamPoint(stream, progress, seconds);
        setPositionAt(positions, index, point.x, point.y, point.z);
      }
      stream.geometry.attributes.position.needsUpdate = true;
    });

    pulses.forEach((pulse, index) => {
      const progress = (seconds * 0.09 + pulse.userData.offset) % 1;
      pulse.position.copy(streamPoint(pulse.userData.stream, progress, seconds));
      pulse.scale.setScalar(0.75 + Math.sin(seconds * 4.2 + index) * 0.22);
      pulse.material.opacity = 0.45 + Math.abs(Math.sin(seconds * 3.2 + index)) * 0.48;
    });
  }

  function updateBeacons(seconds) {
    beacons.forEach((beacon) => {
      const { column, row, index, core, ring } = beacon.userData;
      const point = basePoints[row * columns + column];
      beacon.position.set(point.x, waveAt(point.x, point.z, seconds) + 0.08, point.z);
      core.scale.setScalar(0.86 + Math.sin(seconds * 2.1 + index) * 0.18);
      ring.rotation.z = seconds * (0.45 + index * 0.03);
      ring.scale.setScalar(1 + Math.sin(seconds * 1.3 + index) * 0.12);
    });
  }

  function applyOceanTheme() {
    const dark = document.body.classList.contains("theme-dark-red");
    const palette = dark ? themes.dark : themes.light;
    scene.fog.color.setHex(palette.fog);
    surfaceMaterial.color.setHex(palette.water);
    surfaceMaterial.opacity = dark ? 0.78 : 0.7;
    linkMaterial.color.setHex(palette.mesh);
    linkMaterial.opacity = dark ? 0.28 : 0.18;
    streamMaterials.forEach((material, index) => {
      material.color.setHex(palette.stream[index % palette.stream.length]);
      material.opacity = dark ? 0.82 : 0.62;
    });
    pulses.forEach((pulse) => pulse.material.color.setHex(palette.pulse));
    beaconMaterial.color.setHex(palette.beacon);
    beaconMaterial.emissive.setHex(palette.beacon);
    beacons.forEach((beacon) => beacon.userData.ring.material.color.setHex(palette.beacon));
    ambientLight.color.setHex(palette.ambient);
    ambientLight.intensity = palette.ambientIntensity;
    light.color.setHex(palette.light);
    light.intensity = palette.lightIntensity;
    light2.color.setHex(palette.light2);
    light2.intensity = palette.light2Intensity;
  }

  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    const oceanPoint = pointerToOcean(event.clientX, event.clientY);
    mouseWave.x = oceanPoint.x;
    mouseWave.z = oceanPoint.z;
    mouseWave.strength = 0.62;
  });

  window.addEventListener("pointerdown", (event) => {
    const oceanPoint = pointerToOcean(event.clientX, event.clientY);
    clickRipples.push({
      ...oceanPoint,
      startedAt: performance.now() * 0.001,
      force: 0.95,
    });
    if (clickRipples.length > 8) clickRipples.shift();
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = height > width ? 10.8 : 8.1;
    camera.position.y = height > width ? 6.4 : 5.9;
    camera.lookAt(0, -0.42, -2.4);
    camera.updateProjectionMatrix();
  }

  function animate(time) {
    const seconds = time * 0.001;
    target.x += (pointer.x - target.x) * 0.045;
    target.y += (pointer.y - target.y) * 0.045;
    mouseWave.strength += (0.24 - mouseWave.strength) * 0.025;
    for (let index = clickRipples.length - 1; index >= 0; index -= 1) {
      if (seconds - clickRipples[index].startedAt > 4.2) clickRipples.splice(index, 1);
    }
    group.rotation.y = target.x * 0.07;
    group.rotation.x = -0.12 + target.y * 0.045;
    updateSurface(seconds);
    updateStreams(seconds);
    updateBeacons(seconds);
    renderer.render(scene, camera);
    if (!prefersReducedMotion) requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("noc-theme-change", applyOceanTheme);
  applyOceanTheme();
  resize();
  updateSurface(0);
  updateStreams(0);
  updateBeacons(0);
  if (!prefersReducedMotion) requestAnimationFrame(animate);
}

function initThreeBackground() {
  const canvas = document.getElementById("threeBackground");
  if (!canvas) return;
  if (!window.THREE) {
    window.requestAnimationFrame(initThreeBackground);
    return;
  }

  if (canvas.dataset.threeInitialized === "true") return;
  canvas.dataset.threeInitialized = "true";

  initNetworkOceanBackground(canvas);
  return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const themes = {
    light: {
      fog: 0x07111f,
      core: 0x79f1dd,
      coreEmissive: 0x103b4a,
      halo: 0x4ca5ff,
      innerRing: 0xf2b84b,
      node: 0x7dd3c7,
      nodeEmissive: 0x0b6f6a,
      line: 0xf2b84b,
      particles: 0x9adff4,
      router: 0x12324a,
      routerPanel: 0x0b6f6a,
      routerPort: 0xf2b84b,
      wavelengths: [0x22d3ee, 0xf2b84b, 0x7dd3c7, 0x4ca5ff],
      ambient: 0xffffff,
      ambientIntensity: 0.52,
      light: 0x9bd8ff,
      lightIntensity: 1.6,
      light2: 0x69e2cf,
      light2Intensity: 0.9,
    },
    dark: {
      fog: 0x050506,
      core: 0xe5092f,
      coreEmissive: 0x650010,
      halo: 0xe5092f,
      innerRing: 0xff173f,
      node: 0xff2448,
      nodeEmissive: 0x8a0018,
      line: 0xe5092f,
      particles: 0xff173f,
      router: 0x16080b,
      routerPanel: 0x4a0612,
      routerPort: 0xff2448,
      wavelengths: [0xe5092f, 0xff2448, 0xb80d28, 0x7a0718],
      ambient: 0x240006,
      ambientIntensity: 0.82,
      light: 0xff1744,
      lightIntensity: 2.55,
      light2: 0xb80d28,
      light2Intensity: 0.8,
    },
  };

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07111f, 0.04);
  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const group = new THREE.Group();
  scene.add(group);

  const nodeGeometry = new THREE.SphereGeometry(0.105, 18, 12);
  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: 0x7dd3c7,
    emissive: 0x0b6f6a,
    emissiveIntensity: 0.55,
    roughness: 0.32,
    metalness: 0.25,
  });
  const routerMaterial = new THREE.MeshStandardMaterial({
    color: 0x12324a,
    emissive: 0x07111f,
    emissiveIntensity: 0.28,
    roughness: 0.38,
    metalness: 0.42,
  });
  const routerPanelMaterial = new THREE.MeshStandardMaterial({
    color: 0x0b6f6a,
    emissive: 0x0b6f6a,
    emissiveIntensity: 0.35,
    roughness: 0.45,
    metalness: 0.25,
  });
  const routerPortMaterial = new THREE.MeshBasicMaterial({ color: 0xf2b84b, transparent: true, opacity: 0.9 });
  const routerEdgeMaterial = new THREE.LineBasicMaterial({ color: 0x9adff4, transparent: true, opacity: 0.34 });

  const backbonePositions = [
    [-5.2, 1.4, -0.8],
    [-3.4, -1.2, 0.45],
    [-1.25, 1.0, -0.25],
    [0.9, -1.05, 0.35],
    [3.15, 1.15, -0.55],
    [5.05, -0.7, 0.2],
  ];
  const nodes = [];
  const routers = [];
  const portLights = [];

  function createRouter(position, index) {
    const router = new THREE.Group();
    router.position.set(position[0], position[1], position[2]);

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.34, 0.24), routerMaterial);
    body.rotation.y = index % 2 ? -0.12 : 0.12;
    router.add(body);

    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.055, 0.255), routerPanelMaterial);
    panel.position.y = -0.06;
    panel.position.z = 0.014;
    panel.rotation.y = body.rotation.y;
    router.add(panel);

    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.64, 0.36, 0.25)), routerEdgeMaterial);
    edge.rotation.y = body.rotation.y;
    router.add(edge);

    for (let portIndex = 0; portIndex < 5; portIndex += 1) {
      const port = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.025, 0.018), routerPortMaterial.clone());
      port.position.set(-0.2 + portIndex * 0.1, -0.105, 0.138);
      port.rotation.y = body.rotation.y;
      portLights.push(port);
      router.add(port);
    }

    routers.push(router);
    group.add(router);
    return router;
  }

  backbonePositions.forEach((position, index) => {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(position[0], position[1], position[2]);
    node.scale.setScalar(index === 0 || index === backbonePositions.length - 1 ? 1.35 : 1.1);
    nodes.push(node);
    group.add(node);
    createRouter(position, index);
  });

  const accessNodes = [];
  backbonePositions.forEach((position, backboneIndex) => {
    for (let index = 0; index < 3; index += 1) {
      const angle = backboneIndex * 0.9 + index * 2.1;
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.scale.setScalar(0.58);
      node.position.set(
        position[0] + Math.cos(angle) * (0.62 + index * 0.16),
        position[1] + Math.sin(angle) * (0.42 + index * 0.12),
        position[2] - 0.65 - index * 0.22,
      );
      accessNodes.push({ node, parent: nodes[backboneIndex] });
      group.add(node);
    }
  });

  function makeLine(points, material) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    group.add(line);
    return line;
  }

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xf2b84b, transparent: true, opacity: 0.44 });
  const dwdmMaterial = new THREE.LineBasicMaterial({ color: 0x4ca5ff, transparent: true, opacity: 0.38 });
  const accessLineMaterial = new THREE.LineBasicMaterial({ color: 0x9adff4, transparent: true, opacity: 0.22 });
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0x9adff4, transparent: true, opacity: 0.11 });
  const wavelengthMaterials = [0x22d3ee, 0xf2b84b, 0x7dd3c7, 0x4ca5ff].map((color) => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.36,
  }));
  const fiberTubes = [];
  const backboneLine = makeLine(nodes.map((node) => node.position), lineMaterial);

  function makeFiberTube(start, end, offset, material) {
    const direction = end.clone().sub(start);
    const mid = start.clone().lerp(end, 0.5);
    mid.y += Math.sin(start.x + end.x) * 0.32;
    mid.z += 0.42 + Math.abs(offset) * 0.7;
    const side = new THREE.Vector3(-direction.y, direction.x, 0).normalize().multiplyScalar(offset);
    const curve = new THREE.CatmullRomCurve3([
      start.clone().add(side),
      mid.clone().add(side),
      end.clone().add(side),
    ]);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 72, 0.018, 8, false), material);
    group.add(tube);
    fiberTubes.push(tube);
    return tube;
  }

  for (let index = 0; index < nodes.length - 1; index += 1) {
    [-0.18, -0.06, 0.06, 0.18].forEach((offset, materialIndex) => {
      makeFiberTube(nodes[index].position, nodes[index + 1].position, offset, wavelengthMaterials[materialIndex]);
    });
  }

  const dwdmLines = [];
  for (let index = 0; index < nodes.length - 1; index += 1) {
    const start = nodes[index].position;
    const end = nodes[index + 1].position;
    const mid = start.clone().lerp(end, 0.5);
    const normal = new THREE.Vector3(-(end.y - start.y), end.x - start.x, 0).normalize().multiplyScalar(0.26);
    dwdmLines.push(makeLine([start.clone().add(normal), mid.clone().add(normal.multiplyScalar(1.4)), end.clone().add(normal)], dwdmMaterial));
  }

  accessNodes.forEach(({ node, parent }) => {
    makeLine([parent.position, node.position], accessLineMaterial);
  });

  for (let x = -6; x <= 6; x += 1.5) {
    makeLine([new THREE.Vector3(x, -3.2, -2.2), new THREE.Vector3(x, 3.2, -2.2)], gridMaterial);
  }
  for (let y = -3; y <= 3; y += 1.0) {
    makeLine([new THREE.Vector3(-6.2, y, -2.2), new THREE.Vector3(6.2, y, -2.2)], gridMaterial);
  }

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x4ca5ff, transparent: true, opacity: 0.28 });
  const opticalRings = nodes.slice(1, -1).map((node, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42 + index * 0.025, 0.008, 8, 80), ringMaterial);
    ring.position.copy(node.position);
    ring.rotation.x = Math.PI / 2.1;
    group.add(ring);
    return ring;
  });

  const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.86 });
  const pulses = Array.from({ length: 7 }, (_, index) => {
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), pulseMaterial);
    pulse.userData.offset = index / 7;
    group.add(pulse);
    return pulse;
  });

  const particleCount = 180;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let index = 0; index < particleCount; index += 1) {
    const radius = 3.1 + Math.random() * 3.8;
    const angle = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * 5.5;
    particlePositions[index * 3] = Math.cos(angle) * radius;
    particlePositions[index * 3 + 1] = height;
    particlePositions[index * 3 + 2] = Math.sin(angle) * radius;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({ color: 0x9adff4, size: 0.04, transparent: true, opacity: 0.8 });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.52);
  scene.add(ambientLight);
  const light = new THREE.PointLight(0x9bd8ff, 1.6, 40);
  light.position.set(4, 4, 7);
  scene.add(light);
  const light2 = new THREE.PointLight(0x69e2cf, 0.9, 30);
  light2.position.set(-4, -2, 5);
  scene.add(light2);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  function applyThreeTheme() {
    const palette = document.body.classList.contains("theme-dark-red") ? themes.dark : themes.light;
    scene.fog.color.setHex(palette.fog);
    nodeMaterial.color.setHex(palette.node);
    nodeMaterial.emissive.setHex(palette.nodeEmissive);
    routerMaterial.color.setHex(palette.router);
    routerMaterial.emissive.setHex(palette.routerPanel);
    routerPanelMaterial.color.setHex(palette.routerPanel);
    routerPanelMaterial.emissive.setHex(palette.routerPanel);
    routerPortMaterial.color.setHex(palette.routerPort);
    portLights.forEach((port) => port.material.color.setHex(palette.routerPort));
    routerEdgeMaterial.color.setHex(palette.particles);
    lineMaterial.color.setHex(palette.line);
    lineMaterial.opacity = document.body.classList.contains("theme-dark-red") ? 0.7 : 0.44;
    dwdmMaterial.color.setHex(palette.halo);
    dwdmMaterial.opacity = document.body.classList.contains("theme-dark-red") ? 0.62 : 0.38;
    accessLineMaterial.color.setHex(palette.particles);
    gridMaterial.color.setHex(palette.particles);
    ringMaterial.color.setHex(palette.halo);
    ringMaterial.opacity = document.body.classList.contains("theme-dark-red") ? 0.5 : 0.28;
    pulseMaterial.color.setHex(palette.innerRing);
    pulseMaterial.opacity = document.body.classList.contains("theme-dark-red") ? 0.92 : 0.78;
    wavelengthMaterials.forEach((material, index) => {
      material.color.setHex(palette.wavelengths[index % palette.wavelengths.length]);
      material.opacity = document.body.classList.contains("theme-dark-red") ? 0.62 : 0.36;
    });
    particleMaterial.color.setHex(palette.particles);
    particleMaterial.opacity = document.body.classList.contains("theme-dark-red") ? 0.9 : 0.8;
    ambientLight.color.setHex(palette.ambient);
    ambientLight.intensity = palette.ambientIntensity;
    light.color.setHex(palette.light);
    light.intensity = palette.lightIntensity;
    light2.color.setHex(palette.light2);
    light2.intensity = palette.light2Intensity;
  }

  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate(time) {
    const seconds = time * 0.001;
    target.x += (pointer.x - target.x) * 0.05;
    target.y += (pointer.y - target.y) * 0.05;

    group.rotation.y = seconds * 0.18 + target.x * 0.26;
    group.rotation.x = Math.sin(seconds * 0.32) * 0.16 + target.y * 0.18;
    nodes.forEach((node, index) => {
      const base = index === 0 || index === nodes.length - 1 ? 1.35 : 1.1;
      node.scale.setScalar(base + Math.sin(seconds * 1.9 + index) * 0.1);
    });
    routers.forEach((router, index) => {
      router.rotation.z = Math.sin(seconds * 0.6 + index) * 0.025;
      router.position.z = backbonePositions[index][2] + Math.sin(seconds * 0.9 + index) * 0.035;
    });
    portLights.forEach((port, index) => {
      port.material.opacity = 0.42 + Math.abs(Math.sin(seconds * 3.4 + index * 0.7)) * 0.58;
    });
    accessNodes.forEach(({ node }, index) => {
      node.scale.setScalar(0.58 + Math.sin(seconds * 2.2 + index) * 0.06);
    });
    opticalRings.forEach((ring, index) => {
      ring.rotation.z = seconds * (0.35 + index * 0.08);
      ring.scale.setScalar(1 + Math.sin(seconds * 1.4 + index) * 0.08);
    });
    pulses.forEach((pulse) => {
      const progress = (seconds * 0.16 + pulse.userData.offset) % 1;
      const scaled = progress * (nodes.length - 1);
      const index = Math.min(Math.floor(scaled), nodes.length - 2);
      const local = scaled - index;
      pulse.position.copy(nodes[index].position).lerp(nodes[index + 1].position, local);
      pulse.scale.setScalar(0.8 + Math.sin(seconds * 5 + pulse.userData.offset * 10) * 0.2);
    });
    backboneLine.material.opacity = lineMaterial.opacity + Math.sin(seconds * 1.3) * 0.08;
    particles.rotation.y = seconds * 0.06;
    particles.rotation.x = Math.sin(seconds * 0.12) * 0.08;
    renderer.render(scene, camera);
    if (!prefersReducedMotion) requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("noc-theme-change", applyThreeTheme);
  applyThreeTheme();
  resize();
  if (!prefersReducedMotion) requestAnimationFrame(animate);
}

function debounce(callback, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

async function loadDescriptionData() {
  try {
    const [cnl, failureTypes, partners] = await Promise.all([
      fetchJson(dataUrls.cnl),
      fetchJson(dataUrls.failureTypes),
      fetchJson(dataUrls.partners),
    ]);

    descriptionData.cnl = cnl;
    descriptionData.failureTypes = failureTypes[0] || {};
    descriptionData.partners = partners;
    descriptionData.loaded = true;
    fillDatalist("failureTypesList", Object.keys(descriptionData.failureTypes));
    fillDatalist("partnersList", mergePartnerOptions(descriptionData.partners));
    renderOutput();
    setStatus("Dados de descrição carregados.");
  } catch (error) {
    descriptionData.failureTypes = {
      ATENUACAO: "ATN",
      "FALHA DE HARDWARE": "FHW",
      "FALHA DE SOFTWARE": "FSW",
      "FALHA NO CLIENTE": "FCL",
      "FALHA DE ENERGIA": "FEG",
      "FALHA DE GERENCIA": "FGR",
      OSCILACAO: "OSC",
      RUPTURA: "RUP",
      SATURACAO: "SAT",
      INDISPONIBILIDADE: "IND",
      "TAXA DE ERRO": "TXE",
      "TEMPERATURA ALTA": "TPA",
      TRANSPORTE: "TRN",
      RADIO: "RAD",
    };
    fillDatalist("failureTypesList", Object.keys(descriptionData.failureTypes));
    fillDatalist("partnersList", mergePartnerOptions(descriptionData.partners));
    setStatus("Abra por um servidor local para carregar CNL/parceiros automaticamente.");
    renderOutput();
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha ao carregar ${url}`);
  return response.json();
}

function fillDatalist(id, values) {
  const datalist = document.getElementById(id);
  datalist.innerHTML = values
    .map((value) => `<option value="${escapeHtml(String(value).trim())}"></option>`)
    .join("");
}

function mergePartnerOptions(values) {
  const options = new Set(values.map((value) => String(value).trim()).filter(Boolean));

  Object.entries(partnerContacts).forEach(([key, contact]) => {
    options.add(contact.display || key);
    options.add(key);
    (contact.aliases || []).forEach((alias) => options.add(alias));
  });

  return Array.from(options).sort((a, b) => a.localeCompare(b));
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function normalizeCarrierKey(value) {
  return (value || "").trim().toUpperCase();
}

function normalizePartnerLookup(value) {
  return normalizeCarrierKey(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getPartnerContact(value = getValue("carrier")) {
  const lookup = normalizePartnerLookup(value);
  if (!lookup) return null;

  return Object.entries(partnerContacts).find(([key, contact]) => {
    const options = [key, contact.display, ...(contact.aliases || [])].map(normalizePartnerLookup);
    return options.includes(lookup);
  })?.[1] || null;
}

function getCarrierProfile(value = getValue("carrier")) {
  const key = normalizeCarrierKey(value);
  const contact = getPartnerContact(key);
  const display = contact?.display || key || "Operadora";
  const knownProfile = carrierProfiles[key];

  if (knownProfile) {
    return {
      ...knownProfile,
      recipients: contact?.recipients || knownProfile.recipients,
      actionTaken: buildActionTaken(display),
      display,
      spokenWith: display,
      phoneChannel: knownProfile.phoneChannel,
      contact,
    };
  }

  return {
    display,
    recipients: contact?.recipients || "",
    actionTaken: buildActionTaken(display),
    nextAction: `Cobrar ${display} em 1 hora`,
    spokenWith: display,
    channel: "Email",
    phoneChannel: "",
    outageText: DEFAULT_OUTAGE_TEXT,
    emailIntro: DEFAULT_EMAIL_INTRO,
    contact,
  };
}

function applyCarrierDefaults(carrier, initialLoad) {
  const key = normalizeCarrierKey(carrier);
  const profile = getCarrierProfile(key);

  const defaults = readDefaults();
  if (key) setValue("carrier", key);
  setValue("recipients", profile.recipients);
  setValue("actionTaken", profile.actionTaken);
  setValue("nextAction", profile.nextAction);
  setValue("spokenWith", profile.spokenWith);
  setValue("channel", profile.channel);
  setValue("outageText", profile.outageText);
  setValue("phoneChannel", profile.phoneChannel || "");
  setValue("partner", key);

  if (!initialLoad || !fields.contact.value) {
    setValue("contact", defaults.contact || "");
  }

  if (!initialLoad || !fields.requesterName.value) {
    setValue("requesterName", defaults.requesterName || "");
  }

  updateGreeting();
}

function updateGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  fields.greeting.value = greeting;
}

function syncSymptomWithFailureType() {
  const failureType = getValue("failureType");
  if (failureType) setValue("symptom", failureType);
}

function setValue(id, value) {
  fields[id].value = value || "";
}

function getValue(id) {
  return (fields[id].value || "").trim();
}

function parseEvents(showStatus) {
  const text = getValue("events");
  if (!text) {
    if (showStatus) setStatus("Cole o evento antes de extrair.");
    return;
  }

  const normalizedText = normalizeEventText(text);
  if (normalizedText !== text) {
    fields.events.value = normalizedText;
    if (fields.autoEvents) fields.autoEvents.value = normalizedText;
  }

  const carrier = inferCarrier(normalizedText) || getValue("carrier");
  fields.carrier.value = carrier;
  applyCarrierDefaults(carrier, true);

  const designations = extractDesignations(normalizedText);
  const firstDate = extractFailureTime(normalizedText);
  const bdesk = extractBdeskTitle(normalizedText);
  const trecho = extractRoute(normalizedText);
  const hosts = extractHosts(normalizedText);
  const fiber = extractFiber(normalizedText);
  const failureType = inferFailureType(normalizedText, bdesk);
  const routeFromHosts = extractRouteFromHosts(hosts);

  setValue("designations", designations.join("\n"));
  setValue("failureTime", firstDate);
  setValue("bdeskTitle", bdesk);
  setValue("hostA", hosts[0] || "");
  setValue("hostB", hosts[1] || "");
  setValue("origin", trecho.origin || routeFromHosts.origin || "");
  setValue("destination", trecho.destination || routeFromHosts.destination || "");
  if (fiber) setValue("fiber", fiber);
  if (failureType) setValue("failureType", failureType);
  syncSymptomWithFailureType();
  setValue("partner", carrier);

  if (showStatus) {
    setStatus("Dados extraídos do evento. Revise origem, destino e designações antes de copiar.");
  }
}

function normalizeEventText(text) {
  const preparedText = String(text)
    .replace(/([^\n])(20\d{2}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})(?=RTD\s*\|)/g, "$1\n$2")
    .replace(/\r\n/g, "\n");

  const lines = preparedText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const normalized = [];
  let pendingTimestamp = "";

  lines.forEach((line) => {
    if (/^20\d{2}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/.test(line)) {
      pendingTimestamp = line;
      return;
    }

    const cleanedLine = removeAlarmContextMarkers(line);
    if (!cleanedLine || isIgnorableAlarmLine(cleanedLine)) return;

    const value = pendingTimestamp ? `${pendingTimestamp}${cleanedLine}` : cleanedLine;
    normalized.push(value);
    pendingTimestamp = "";
  });

  return normalized.join("\n");
}

function isIgnorableAlarmLine(line) {
  return /^\d{6,}$/.test(line) || /^Aut\s+Bdesk:#/i.test(line) || /^[✅❌]\ufe0f?/u.test(line);
}

function removeAlarmContextMarkers(line) {
  return String(line || "")
    .replace(/[✅❌]\ufe0f?\s*[A-Z0-9]{2,5}(?:-[A-Z0-9]{2,5}){2,5}/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function inferCarrier(text) {
  const upper = text.toUpperCase();

  if (upper.includes("TELEBRAS") || upper.includes("PATX")) return "TELEBRAS";
  if (upper.includes("EILD")) return "VIVO";

  for (const option of carrierDetectionOptions()) {
    const p = option.match.toUpperCase();
    const pNoSpace = p.replace(/\s+/g, "");
    const pUnder = p.replace(/\s+/g, "_");
    const pDash = p.replace(/\s+/g, "-");

    const variations = new Set([p, pNoSpace, pUnder, pDash]);
    for (const v of variations) {
      if (
        upper.includes(`CAP_${v}`) ||
        upper.includes(`CAP:${v}`) ||
        upper.includes(`CAP-${v}`) ||
        upper.includes(`::${v}`)
      ) {
        return option.value;
      }
    }
  }

  if (upper.includes("CAP_CLARO") || upper.includes("::CLARO")) return "CLARO";
  if (upper.includes("CAP_TELY") || upper.includes("::TELY")) return "TELY";
  if (upper.includes("CAP:TIM") || upper.includes("::TIM")) return "TIM";
  if (upper.includes("CAP:VIVO") || upper.includes("::VIVO")) return "VIVO";

  return "";
}

function carrierDetectionOptions() {
  const options = [];

  Object.entries(partnerContacts).forEach(([key, contact]) => {
    [key, contact.display, ...(contact.aliases || [])].filter(Boolean).forEach((match) => {
      options.push({ match, value: key });
    });
  });

  if (typeof descriptionData !== "undefined" && descriptionData.partners) {
    descriptionData.partners.filter(Boolean).forEach((partner) => {
      options.push({ match: partner, value: partner });
    });
  }

  return options
    .filter((option, index, list) => list.findIndex((item) => item.match === option.match) === index)
    .sort((left, right) => right.match.length - left.match.length);
}

function extractDesignations(text) {
  const matches = new Set();
  const labeledLines = text.match(/(?:Designações|Designacoes|Circuito)\s*:?\s*[^\r\n]+/gi) || [];

  labeledLines.forEach((line) => {
    const value = line.replace(/^(?:Designações|Designacoes|Circuito)\s*:?\s*/i, "").trim();
    if (value.length > 3) matches.add(value);
  });

  extractPipeCapacityDesignations(text).forEach((item) => matches.add(item));

  const patterns = [
    /CAP[_:][A-Z0-9:_./*-]+(?:CID:\d+|ID:\d+|EILD[:\-_]?\d+|DES[:A-Z0-9/_ *.-]+|DESG[:A-Z0-9/_ *.-]+)?/gi,
    /CAP-DESG:[A-Z0-9-]+/gi,
    /PATX\d+/gi,
  ];

  patterns.forEach((pattern) => {
    const found = text.match(pattern) || [];
    found.forEach((item) => {
      const cleaned = item.replace(/[),;]+$/g, "").trim();
      if (cleaned.length > 5) matches.add(cleaned);
    });
  });

  return Array.from(matches);
}

function extractPipeCapacityDesignations(text) {
  const designations = [];
  const pattern = /\b(CAP[:_][A-Z0-9]+[:_])([A-Z0-9.-]+(?:\|[A-Z0-9.-]+)+)/gi;
  let match = pattern.exec(text);

  while (match) {
    const prefix = match[1].toUpperCase();
    const circuits = match[2].split("|").map((item) => item.trim()).filter(Boolean);

    circuits.forEach((circuit) => {
      const normalized = circuit.toUpperCase();
      designations.push(normalized.startsWith(prefix) ? normalized : `${prefix}${normalized}`);
    });

    match = pattern.exec(text);
  }

  return designations;
}

function extractFailureTime(text) {
  const timestamps = [];

  const isoPattern = /(?:^|\n)(20\d{2})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/g;
  let match = isoPattern.exec(text);
  while (match) {
    timestamps.push({
      raw: `${match[1]}-${match[2]}-${match[3]} ${match[4]}:${match[5]}:${match[6]}`,
      date: new Date(`${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}`),
    });
    match = isoPattern.exec(text);
  }

  const brPattern = /(?:^|\n)(\d{2})[/-](\d{2})[/-](20\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/g;
  match = brPattern.exec(text);
  while (match) {
    const seconds = match[6] || "00";
    timestamps.push({
      raw: `${match[3]}-${match[2]}-${match[1]} ${match[4]}:${match[5]}:${seconds}`,
      date: new Date(`${match[3]}-${match[2]}-${match[1]}T${match[4]}:${match[5]}:${seconds}`),
    });
    match = brPattern.exec(text);
  }

  const zabbixMarkdownPattern = /\[(\d{2}):(\d{2}):(\d{2})\]\([^)]*\/zabbix\/[^)]*\)/gi;
  match = zabbixMarkdownPattern.exec(text);
  while (match) {
    timestamps.push(zabbixTimeToTimestamp(match[1], match[2], match[3]));
    match = zabbixMarkdownPattern.exec(text);
  }

  const zabbixTabPattern = /(?:^|\n)(\d{2}):(\d{2}):(\d{2})(?=[^\n]*\bPROBLEM\b)/gi;
  match = zabbixTabPattern.exec(text);
  while (match) {
    timestamps.push(zabbixTimeToTimestamp(match[1], match[2], match[3]));
    match = zabbixTabPattern.exec(text);
  }

  if (!timestamps.length) return "";

  timestamps.sort((left, right) => left.date - right.date);
  return timestamps[0].raw;
}

function zabbixTimeToTimestamp(hour, minute, second) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const raw = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return {
    raw,
    date: new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`),
  };
}

function extractBdeskTitle(text) {
  const bdesk = text.match(/[A-Z]{2}::IND::[^\n\r]+::ONLY::[A-Z]+/i);
  return bdesk ? bdesk[0].trim() : "";
}

function extractInternalTicket(text) {
  const bdeskTicket = text.match(/Aut\s+Bdesk:#\s*(\d+)/i);
  if (bdeskTicket) return bdeskTicket[1];

  const looseTicket = text.match(/\b(5\d{5})\b/);
  return looseTicket ? looseTicket[1] : "";
}

function extractHosts(text) {
  const matches = new Set();
  extractFullHosts(text).forEach((host) => matches.add(host));
  extractCompactHosts(text).forEach((host) => matches.add(host));
  extractDescriptionHosts(text).forEach((host) => matches.add(host));

  return Array.from(matches).slice(0, 2);
}

function extractFullHosts(text) {
  const hosts = [];
  const pattern = /(^|[^A-Z0-9])((?:BR[.-][A-Z]{2}(?:[.-][A-Z0-9]{2,6}){2,4}[.-]\d{1,2}))/gi;
  let match = pattern.exec(text);

  while (match) {
    hosts.push(normalizeHost(match[2]));
    match = pattern.exec(text);
  }

  return hosts;
}

function extractCompactHosts(text) {
  const hosts = [];
  const tokens = text.match(/\b[A-Z]{3,4}[A-Z0-9]{3,4}(?:TP|PE|CO|SW|RT|BB)\d{1,2}\b/gi) || [];

  tokens.forEach((token) => {
    const host = compactHostToFull(token);
    if (host) hosts.push(host);
  });

  return hosts;
}

function compactHostToFull(value) {
  const token = value.toUpperCase();
  const types = ["TP", "PE", "CO", "SW", "RT", "BB"];

  for (const siglaLength of [4, 3]) {
    const sigla = token.slice(0, siglaLength);
    const city = findCnlBySigla(sigla);
    if (!city) continue;

    const rest = token.slice(siglaLength);
    for (const type of types) {
      const typeIndex = rest.indexOf(type);
      if (typeIndex <= 0) continue;

      const pop = rest.slice(0, typeIndex);
      const number = rest.slice(typeIndex + type.length);
      if (!pop || !/^\d{1,2}$/.test(number)) continue;

      return normalizeHost(`BR-${city.UF}-${sigla}-${pop}-${type}-${number}`);
    }
  }

  return "";
}

function extractDescriptionHosts(text) {
  const hosts = [];
  const fromDesc = extractHostFromDescription(text);
  if (fromDesc) hosts.push(fromDesc);

  const pattern = /(?:100G|400G|800G|40G|10G|1G|GE|GIG|GB)_(BR[A-Z0-9.-]+?)_(?:ET|XGE|XG|GE|GI|TE|ETH|PORT|CH|\d+GE)/gi;
  const matches = String(text || "").match(pattern);
  if (matches) {
    matches.forEach((match) => {
      const hostMatch = match.match(/(?:100G|400G|800G|40G|10G|1G|GE|GIG|GB)_(BR[A-Z0-9.-]+?)_/i);
      if (hostMatch && hostMatch[1]) {
        const host = hostMatch[1].toUpperCase();
        if (/^BR[A-Z0-9.-]/i.test(host)) hosts.push(host);
      }
    });
  }
  return uniqueValues(hosts);
}

function extractFiber(text) {
  const match = text.match(/::(ONLY|WORK|PROT)::/i);
  return match ? match[1].toUpperCase() : "";
}

function inferFailureType(text, bdeskTitle) {
  const source = `${bdeskTitle} ${text}`.toUpperCase();
  const codeMatch = bdeskTitle.match(/::([A-Z]{3})::/i);
  if (codeMatch) {
    const label = failureLabelByCode(codeMatch[1].toUpperCase());
    if (label) return label;
  }

  if (source.includes("TEMPERATURA")) return "TEMPERATURA ALTA";
  if (source.includes("ENERGIA")) return "FALHA DE ENERGIA";
  if (source.includes("RUPTURA")) return "RUPTURA";
  if (source.includes("OSCILA")) return "OSCILACAO";
  if (source.includes("SATURA")) return "SATURACAO";
  if (source.includes("TAXA DE ERRO")) return "TAXA DE ERRO";
  if (source.includes("LINK DOWN") || source.includes("INDISPON")) return "INDISPONIBILIDADE";
  return getValue("failureType") || "INDISPONIBILIDADE";
}

function failureLabelByCode(code) {
  const entries = Object.entries(descriptionData.failureTypes);
  const found = entries.find(([, value]) => value === code);
  return found ? found[0] : "";
}

function extractRoute(text) {
  const explicit = text.match(/Trecho\s*:?\s*(.+?)\s+x\s+([^\n\r]+)/i);
  if (explicit) {
    return {
      origin: cleanRoutePart(explicit[1]),
      destination: cleanRoutePart(explicit[2]),
    };
  }

  const bdesk = extractBdeskTitle(text);
  const route = bdesk.match(/::IND::(.+?)<>(.+?)::ONLY::/i);
  if (!route) return {};

  return {
    origin: cleanRoutePart(route[1]),
    destination: cleanRoutePart(route[2]),
  };
}

function cleanRoutePart(value) {
  return value.replace(/_/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeHost(value) {
  const normalized = value.trim().toUpperCase().replace(/[._]/g, "-");
  const match = normalized.match(/^((?:BR-)?[A-Z]{2}-[A-Z0-9]{3,4}-[A-Z0-9]{3,4}-[A-Z0-9]{2,3}-)(\d{1,2})/);
  if (!match) return normalized;
  return `${match[1]}${match[2].padStart(2, "0")}`;
}

function buildDescription() {
  const failure = normalizeText(getValue("failureType")) || "INDISPONIBILIDADE";
  const hostA = normalizeHost(getValue("hostA"));
  const hostB = normalizeHost(getValue("hostB"));
  const partner = normalizeText(getValue("partner") || getValue("carrier"));
  const fiber = getValue("fiber") || "ONLY";
  const mode = getValue("descriptionMode");
  const failureCode = descriptionData.failureTypes[failure] || failure.slice(0, 3);
  const isSingle = mode === "single" || (mode === "auto" && (isSinglePointFailure(failure) || !hostB));

  const popA = popSearchCnl(hostA);
  const popB = popSearchCnl(hostB);

  if (!hostA && !getValue("origin")) return "";

  if (isSingle) {
    const site = popA;
    if (failure.includes("ENERGIA")) {
      return [
        site.UF,
        failureCode,
        `${site.MUNICIPIO}_${site.POP}<>${site.UF}-${site.SIGLA}-${site.POP}`,
        partner,
      ].join("::");
    }

    return [
      site.UF,
      failureCode,
      `${site.MUNICIPIO}_${site.POP}<>${hostA || site.HOST}`,
      fiber,
      partner,
    ].join("::");
  }

  const route = [popA, popB].sort(comparePops);
  return [
    route[0].UF,
    failureCode,
    `${route[0].MUNICIPIO}_${route[0].POP}<>${route[1].MUNICIPIO}_${route[1].POP}`,
    fiber,
    partner,
  ].join("::");
}

function normalizeText(value) {
  return value.trim().toUpperCase();
}

function isSinglePointFailure(failure) {
  return failure.includes("FALHA") || failure.includes("TEMPERATURA");
}

function popSearchCnl(host) {
  const parts = host ? host.split("-") : [];
  const sigla = parts[0] === "BR" ? parts[2] : parts[1];
  const pop = parts[0] === "BR" ? parts[3] : parts[2];
  const ufFromHost = parts[0] === "BR" ? parts[1] : parts[0];
  const found = findCnlBySigla(sigla);

  if (found) {
    return {
      UF: found.UF,
      SIGLA: found.SIGLA,
      MUNICIPIO: found.MUNICIPIO,
      POP: pop || found.SIGLA,
      HOST: host,
    };
  }

  return {
    UF: ufFromHost || extractUfFromDescription() || "",
    SIGLA: sigla || "",
    MUNICIPIO: fallbackMunicipio(host),
    POP: pop || "",
    HOST: host,
  };
}

function findCnlBySigla(sigla) {
  return descriptionData.cnl.find((item) => item.SIGLA === sigla);
}

function extractRouteFromHosts(hosts) {
  if (!hosts.length) return {};

  const pops = hosts
    .map((host) => popSearchCnl(host))
    .filter((pop) => pop.MUNICIPIO);

  if (!pops.length) return {};

  const route = pops.slice(0, 2).sort(comparePops);
  return {
    origin: route[0].MUNICIPIO,
    destination: route[1] ? route[1].MUNICIPIO : "",
  };
}

function comparePops(a, b) {
  const left = `${a.MUNICIPIO}${a.POP}`;
  const right = `${b.MUNICIPIO}${b.POP}`;
  return left.localeCompare(right);
}

function fallbackMunicipio(host) {
  const route = extractRouteFromFields();
  if (!host || !route.origin) return "";
  if (host === normalizeHost(getValue("hostB"))) return route.destination || route.origin;
  return route.origin;
}

function extractRouteFromFields() {
  return {
    origin: normalizeText(getValue("origin")).replace(/_/g, " "),
    destination: normalizeText(getValue("destination")).replace(/_/g, " "),
  };
}

function extractUfFromDescription() {
  const match = getValue("bdeskTitle").match(/^([A-Z]{2})::/);
  return match ? match[1] : "";
}

function buildOpening() {
  const lines = [
    `### ${withEmoji("⚡", "ABERTURA NOC")} ###`,
    "",
    `${withEmoji("🚨", "SINTOMA/RECLAMAÇÃO")}: ${getValue("symptom") || "Capacidade indisponível"};`,
    `${withEmoji("🧭", "DIAGNÓSTICO")}: ${getValue("diagnosis") || "Provável falha na operadora parceira"};`,
    `${withEmoji("📎", "FACILIDADES")}: ${getValue("facilities") || "Segue abaixo"};`,
    `${withEmoji("🛠️", "AÇÃO TOMADA")}: ${getValue("actionTaken")};`,
    `${withEmoji("➡️", "PRÓXIMA AÇÃO")}: ${getValue("nextAction")};`,
  ];

  const formattedEvents = formatOpeningEvents(getValue("events"));
  if (formattedEvents) lines.push("", formattedEvents);

  return lines.join("\n");
}

function formatOpeningEvents(eventsText) {
  const lines = splitLines(eventsText);
  if (!lines.length) return "";

  const groups = groupAlarmLinesByHost(lines);
  if (groups.length <= 1) return lines.join("\n");

  return groups
    .map((group, index) => [`${withEmoji("🖥️", `HOST ${index + 1}`)}:`, ...group.lines].join("\n"))
    .join("\n\n");
}

function groupAlarmLinesByHost(lines) {
  const groups = [];

  lines.forEach((line) => {
    const record = parseMassivaAlarmLine(line);
    const host = extractMassivaAffectedHost(record) || extractPrimaryLineHost(line) || "SEM_HOST";
    let group = groups.find((item) => item.host === host);

    if (!group) {
      group = { host, lines: [] };
      groups.push(group);
    }

    group.lines.push(line);
  });

  return groups;
}

function extractPrimaryLineHost(line) {
  const fullHosts = extractFullHosts(line);
  if (fullHosts.length) return fullHosts[0];

  const compactHosts = extractCompactHosts(line);
  return compactHosts[0] || "";
}

function buildUpdate() {
  const profile = getCarrierProfile();
  const spoken = getValue("spokenWith") || profile.display;
  const channel = getValue("channel");
  const lines = [
    `### ${withEmoji("🔄", "ATUALIZAÇÃO NOC")} ###`,
    "",
    `${withEmoji("👤", "FALADO COM")}: ${spoken}${channel ? ` via ${channel}` : ""};`,
  ];

  const phoneChannel = getValue("phoneChannel");
  if (phoneChannel) lines.push(`${withEmoji("☎️", "TELEFONE")}: ${phoneChannel};`);

  lines.push(
    `${withEmoji("💬", "O QUE FOI FALADO")}: Segue abaixo a captura de tela;`,
    `${withEmoji("⏳", "PREVISÃO")}: ${getValue("forecast") || "Sem previsão"};`,
    `${withEmoji("➡️", "PRÓXIMA AÇÃO")}: Cobrar ${profile.display} em 1 hora;`,
  );

  return lines.join("\n");
}

function buildEmail() {
  const carrier = normalizeCarrierKey(getValue("carrier"));
  if (carrier === "TELEBRAS") return buildTelebrasRequest();

  const lines = [
    `${getValue("greeting")};`,
    DEFAULT_EMAIL_INTRO,
    "",
  ];

  const designations = splitLines(getValue("designations"));
  if (designations.length) {
    designations.forEach((item) => lines.push(`Designações:${item}`));
  } else {
    lines.push("Designações:");
  }

  lines.push(
    `Trecho: ${buildRoute()}`,
    `Horário queda: ${formatFailureTime(getValue("failureTime"))}`,
    `Chamado Interno: ${getValue("internalTicket")}`,
    `Contato: ${getValue("contact")}`,
    "",
    "Ficamos no aguardo do protocolo",
    "",
    "Atenciosamente",
  );

  return lines.join("\n");
}

function buildTelebrasRequest() {
  const circuit = telebrasCircuit();
  return [
    `Circuito:${circuit}`,
    `Nome completo: ${getValue("requesterName")}`,
    "Nome da instituição: Alloha",
    `Pessoa para contato(nome, telefone com DDD e Email): ${buildTelebrasContact()}`,
    `Data e hora do problema: ${formatTelebrasDate(getValue("failureTime"))}`,
  ].join("\n");
}

function buildCharge() {
  return buildChargeMessages().join("\n\n");
}

function buildRecognizeAlarms() {
  const ticket = getValue("internalTicket");
  const description = fields.descriptionOutput?.value || getValue("bdeskTitle");

  if (!ticket || !description) return "";

  return `Aut Bdesk:# ${ticket} - ${description}`;
}

function buildEmailSubject() {
  return buildRecognizeAlarms().replace(/^Aut\s+Bdesk:#\s*/i, "");
}

function buildContactInfo() {
  const partner = getValue("carrier") || getValue("partner");
  const contact = getPartnerContact(partner);

  if (!contact) {
    return partner ? `Sem contato cadastrado para ${partner}.` : "Selecione um parceiro para ver contatos.";
  }

  const lines = [`Parceiro: ${contact.display}`];
  if (contact.recipients) lines.push(`E-mail: ${contact.recipients}`);
  if (contact.phone) lines.push(`Telefone/Canal: ${contact.phone}`);
  if (contact.portal) lines.push(`Portal: ${contact.portal}`);
  if (contact.user) lines.push(`Usuário: ${contact.user}`);
  if (contact.password) lines.push(`Senha: ${contact.password}`);
  (contact.details || []).forEach((detail) => lines.push(`Obs: ${detail}`));

  return lines.join("\n");
}

function buildChargeMessages() {
  const external = getValue("externalTicket") || getValue("internalTicket");
  const carrier = getCarrierProfile().display;
  const greeting = getValue("greeting");
  const designator = external ? ` ${external}` : "";

  const messages = [
    `${withEmoji("🔄", `${greeting}, temos alguma atualização deste chamado${designator} ?`)}`,
    `${withEmoji("🚨", `${greeting}, circuito${designator} permanece indisponível.`)}`,
    `${withEmoji("📣", `${greeting} prezados temos atualizações do chamado${designator} ?`)}`,
    `${withEmoji("⏳", `${greeting}, ${carrier}, seguimos no aguardo de atualização do chamado${designator}.`)}`,
    `${withEmoji("🔎", `${greeting}, validado circuito/host normalizado. Temos RFO ou causa raiz?`)}`,
  ];

  return messages.map((message) => String(message)
    .replaceAll("{greeting}", greeting)
    .replaceAll("{ticket}", external || "")
    .replaceAll("{designator}", designator)
    .replaceAll("{carrier}", carrier));
}

function buildComplete() {
  const blocks = [
    buildOpening(),
    "",
    buildUpdate(),
    "",
  ];

  const bdesk = getValue("bdeskTitle");
  const ticket = getValue("internalTicket");
  if (ticket || bdesk) blocks.push(`Aut Bdesk:# ${[ticket, bdesk].filter(Boolean).join(" - ")}`, "");
  if (bdesk) blocks.push(bdesk, "");

  const events = getValue("events");
  if (events) blocks.push(events, "");

  blocks.push(buildEmail());
  return blocks.join("\n");
}

function renderOutput() {
  const description = buildDescription();
  if (description) {
    fields.descriptionOutput.value = description;
    fields.bdeskTitle.value = description;
  } else {
    fields.descriptionOutput.value = getValue("bdeskTitle");
  }

  fields.openingOutput.value = buildOpening();
  fields.updateOutput.value = buildUpdate();
  fields.emailOutput.value = buildEmail();
  fields.chargeOutput.value = buildCharge();
  fields.recognizeOutput.value = buildRecognizeAlarms();
  fields.contactOutput.value = buildContactInfo();
}

function splitLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function firstDesignation() {
  return splitLines(getValue("designations"))[0] || "";
}

function telebrasCircuit() {
  const designations = getValue("designations");
  const patx = designations.match(/PATX\d+/i);
  if (patx) return patx[0].toUpperCase();

  return firstDesignation().replace(/^CAP-DESG:/i, "");
}

function buildRoute() {
  const origin = getValue("origin");
  const destination = getValue("destination");
  if (origin && destination) return `${origin} x ${destination}`;
  return origin || destination || "";
}

function formatFailureTime(value) {
  if (!value) return "";

  if (/^20\d{2}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/.test(value)) return value;
  if (/^\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}(:\d{2})?$/.test(value)) return value;
  return value.endsWith("hrs") || value.endsWith("hs") ? value : `${value}hrs`;
}

function formatTelebrasDate(value) {
  return value.replace(/\//g, "-");
}

function buildTelebrasContact() {
  const contact = getValue("contact");
  const name = getValue("requesterName").split(" ")[0] || "";
  return [name, contact].filter(Boolean).join(", ");
}

function getRawGeneratedText(kind) {
  const map = {
    description: fields.descriptionOutput.value,
    recognize: fields.recognizeOutput.value,
    opening: fields.openingOutput.value,
    update: fields.updateOutput.value,
    subject: buildEmailSubject(),
    email: fields.emailOutput.value,
    recipients: getValue("recipients"),
    contact: fields.contactOutput.value,
    charge: fields.chargeOutput.value,
    complete: buildComplete(),
    "massivas-opening": fields.massivasOpeningOutput.value,
    "massivas-recognize": buildMassivasRecognize(),
    "massivas-update": buildMassivasManualUpdate(),
  };

  const chargeMatch = kind.match(/^charge-(\d+)$/);
  if (chargeMatch) return buildChargeMessages()[Number(chargeMatch[1])] || "";

  return map[kind] || "";
}

function getGeneratedText(kind) {
  if (getMissingFields(kind).length) return "";
  return getRawGeneratedText(kind);
}

function getMissingFields(kind) {
  const chargeMatch = kind.match(/^charge-(\d+)$/);
  if (chargeMatch) {
    return requiredFields([
      ["Protocolo externo ou chamado interno", () => getValue("externalTicket") || getValue("internalTicket")],
      ["Saudação", () => getValue("greeting")],
    ]);
  }

  const requirements = {
    description: [
      ["Operadora/parceiro", () => getValue("carrier") || getValue("partner")],
      ["Tipo de falha", () => getValue("failureType")],
      ["Hostname A", () => getValue("hostA")],
      ["Hostname B ou modo ponta única", () => getValue("hostB") || getValue("descriptionMode") === "single" || isSinglePointFailure(normalizeText(getValue("failureType")))],
    ],
    recognize: [
      ["Chamado interno", () => getValue("internalTicket")],
      ["Descrição Bdesk", () => fields.descriptionOutput.value],
    ],
    subject: [
      ["Chamado interno", () => getValue("internalTicket")],
      ["Descrição Bdesk", () => fields.descriptionOutput.value],
    ],
    opening: [
      ["Alarmes/evento", () => getValue("events")],
      ["Sintoma/reclamação", () => getValue("symptom")],
      ["Diagnóstico", () => getValue("diagnosis")],
      ["Facilidades", () => getValue("facilities")],
      ["Ação tomada", () => getValue("actionTaken")],
      ["Próxima ação", () => getValue("nextAction")],
    ],
    update: [
      ["Parceiro", () => getValue("carrier") || getValue("partner")],
      ["Falado com", () => getValue("spokenWith")],
      ["Canal", () => getValue("channel")],
      ["Previsão", () => getValue("forecast")],
    ],
    email: getEmailRequirements(),
    recipients: [
      ["Destinatários", () => getValue("recipients")],
    ],
    contact: [
      ["Parceiro", () => getValue("carrier") || getValue("partner")],
      ["Contato cadastrado", () => Boolean(getPartnerContact(getValue("carrier") || getValue("partner")))],
    ],
    charge: [
      ["Protocolo externo ou chamado interno", () => getValue("externalTicket") || getValue("internalTicket")],
      ["Saudação", () => getValue("greeting")],
    ],
    "massivas-recognize": [
      ["Assunto Bdesk da massiva", () => getValue("massivasBdeskSubject")],
    ],
    "massivas-update": [
      ["Falado com", () => getValue("massivasUpdateSpokenWith")],
      ["O que foi falado", () => getValue("massivasUpdateSpokenText")],
      ["Previsão", () => getValue("massivasUpdateForecast")],
      ["Próxima ação", () => getValue("massivasUpdateNextAction")],
    ],
    complete: [],
  };

  return requiredFields(requirements[kind] || []);
}

function getEmailRequirements() {
  const carrier = normalizeCarrierKey(getValue("carrier"));

  if (carrier === "TELEBRAS") {
    return [
      ["Circuito/designação", () => firstDesignation() || getValue("designations")],
      ["Nome Telebras", () => getValue("requesterName")],
      ["Contato", () => getValue("contact")],
      ["Horário da falha", () => getValue("failureTime")],
    ];
  }

  return [
    ["Destinatários", () => getValue("recipients")],
    ["Designações", () => getValue("designations")],
    ["Origem", () => getValue("origin")],
    ["Destino", () => getValue("destination")],
    ["Horário da falha", () => getValue("failureTime")],
    ["Chamado interno", () => getValue("internalTicket")],
    ["Contato", () => getValue("contact")],
  ];
}

function requiredFields(requirements) {
  return requirements
    .filter(([, predicate]) => !predicate())
    .map(([label]) => label);
}

async function copyGenerated(kind) {
  const missing = getMissingFields(kind);
  if (missing.length) {
    const message = `Complete: ${missing.join(", ")}.`;
    setStatus(message);
    showToast(message, "info");
    return;
  }

  const text = getGeneratedText(kind);
  if (!text) {
    setStatus("Nada para copiar ainda.");
    showToast("Nada para copiar ainda.", "info");
    return;
  }

  if (kind === "massivas-opening") {
    await copyMassivasOpeningImage(text);
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    setStatus("Texto copiado.");
    showToast("Copiado para a área de transferência.");
  } catch (error) {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
    setStatus("Texto copiado pela seleção.");
    showToast("Copiado pela seleção.");
  }
}

async function copyMassivasOpeningImage(text) {
  const records = splitMassivasAlarmLines(getValue("massivasDebugAlarms")).map(parseMassivaAlarmLine);
  const canvas = document.createElement("canvas");
  const width = 1400;
  const padding = 56;
  canvas.width = width;
  canvas.height = 360;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#172b3a";
  context.font = "700 20px sans-serif";
  context.fillText("TOPOLOGIA DA MASSIVA", padding, 42);
  drawMassivasTopology(context, records, 58, width, 280);

  try {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob || !navigator.clipboard?.write || !window.ClipboardItem) throw new Error("Clipboard de imagem indisponível");
    const textBlob = new Blob([text], { type: "text/plain" });
    await navigator.clipboard.write([new ClipboardItem({ "text/plain": textBlob, "image/png": blob })]);
    setStatus("Abertura copiada como texto; topologia copiada como imagem.");
    showToast("Abertura em texto e topologia em imagem copiadas.");
  } catch (error) {
    await navigator.clipboard.writeText(text);
    setStatus("Abertura copiada como texto; imagem indisponível.");
    showToast("Abertura copiada como texto. Não foi possível anexar a imagem.", "info");
  }
}

function showPreview(kind) {
  const previewTitle = document.getElementById("previewTitle");
  const previewText = document.getElementById("previewText");
  const missing = getMissingFields(kind);
  const text = missing.length
    ? `Complete os campos para gerar:\n- ${missing.join("\n- ")}`
    : getRawGeneratedText(kind);

  if (!previewTitle || !previewText) return;

  previewTitle.textContent = previewTitleFor(kind);
  previewText.textContent = text || "Preencha os alarmes e campos principais para gerar este texto.";
  previewText.classList.remove("animate__animated", "animate__fadeIn");
  void previewText.offsetWidth;
  previewText.classList.add("animate__animated", "animate__fadeIn");
}

function showAutoPreview(kind) {
  const missing = getMissingFields(kind);
  const text = missing.length
    ? `Complete os campos para gerar:\n- ${missing.join("\n- ")}`
    : getRawGeneratedText(kind);

  if (!fields.autoPreviewTitle || !fields.autoPreviewText) return;

  fields.autoPreviewTitle.textContent = previewTitleFor(kind);
  fields.autoPreviewText.textContent = text || "Preencha os dados do passo atual para gerar este texto.";
  fields.autoPreviewText.classList.remove("animate__animated", "animate__fadeIn");
  void fields.autoPreviewText.offsetWidth;
  fields.autoPreviewText.classList.add("animate__animated", "animate__fadeIn");
}

function previewTitleFor(kind) {
  const titles = {
    description: "Descrição Bdesk",
    recognize: "Reconhecer alarmes",
    opening: "Abertura NOC",
    update: "Atualização NOC",
    email: "E-mail / Solicitação",
    subject: "Assunto",
    recipients: "Destinatários",
    contact: "Contato do parceiro",
    "massivas-recognize": "Reconhecer massiva",
    "massivas-update": "Atualizacao massiva",
    "charge-0": "Mensagem padrão",
    "charge-1": "Mensagem padrão",
    "charge-2": "Mensagem padrão",
    "charge-3": "Mensagem padrão",
    "charge-4": "Mensagem padrão",
    complete: "Carimbo completo",
  };

  return titles[kind] || "Prévia";
}

function readDefaults() {
  try {
    return JSON.parse(localStorage.getItem("nocGeneratorDefaults") || "{}");
  } catch (error) {
    return {};
  }
}

function loadDefaults() {
  const defaults = readDefaults();
  if (defaults.contact) setValue("contact", defaults.contact);
  if (defaults.requesterName) setValue("requesterName", defaults.requesterName);
  applyTheme();
}

function saveDefaults() {
  const defaults = {
    contact: getValue("contact"),
    requesterName: getValue("requesterName"),
    useEmojis: fields.paramUseEmojis ? fields.paramUseEmojis.checked : useOperationalEmojis(),
    darkTheme: fields.paramDarkTheme ? fields.paramDarkTheme.checked : useDarkTheme(),
  };

  localStorage.setItem("nocGeneratorDefaults", JSON.stringify(defaults));
  applyTheme();
  setStatus("Padrões salvos neste navegador.");
  showToast("Padrões salvos.");
}

function setStatus(message) {
  fields.status.textContent = message;
}

function showToast(message, icon = "success") {
  if (!window.Swal) return;

  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title: message,
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}

/* ==========================================================================
   APP VERSIONING & DEEP CACHE PURGE SYSTEM
   ========================================================================== */

const CURRENT_APP_VERSION = "3.3";
const APP_BUILD_TIMESTAMP = "2026-09-02";
let detectedNewServerVersion = null;

async function checkServerVersion() {
  try {
    const res = await fetch("version.json?_noc_cb=" + Date.now(), {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" }
    });
    if (res.ok) {
      const data = await res.json();
      const serverVer = (data.version || data).toString().trim();
      if (serverVer && serverVer !== CURRENT_APP_VERSION) {
        detectedNewServerVersion = serverVer;
        showVersionUpdateBanner(serverVer);
        return;
      }
    }
  } catch (e) {
    // Fallback to fetch version.txt
    try {
      const resTxt = await fetch("version.txt?_noc_cb=" + Date.now(), {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" }
      });
      if (resTxt.ok) {
        const serverVer = (await resTxt.text()).trim();
        if (serverVer && serverVer !== CURRENT_APP_VERSION) {
          detectedNewServerVersion = serverVer;
          showVersionUpdateBanner(serverVer);
          return;
        }
      }
    } catch (err) {}
  }
}

function initVersionChecker() {
  const banner = document.getElementById("versionUpdateBanner");
  if (banner) {
    banner.hidden = true;
    banner.classList.remove("is-visible");
  }

  // 1. Check local storage version
  try {
    const storedVersion = localStorage.getItem("noc_app_version");
    if (!storedVersion) {
      localStorage.setItem("noc_app_version", CURRENT_APP_VERSION);
    } else if (storedVersion !== CURRENT_APP_VERSION) {
      showVersionUpdateBanner(CURRENT_APP_VERSION);
    }
  } catch (e) {
    console.warn("Version check error:", e);
  }

  // 2. Perform live server version check
  checkServerVersion();

  // 3. Periodic check & tab switch check
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      checkServerVersion();
    }
  });
  window.addEventListener("focus", () => {
    checkServerVersion();
  });
  setInterval(checkServerVersion, 45000);

  const actionBtn = document.getElementById("versionUpdateActionBtn");
  if (actionBtn) {
    actionBtn.addEventListener("click", handleUpdateAndClearCache);
  }

  const dismissBtn = document.getElementById("versionUpdateDismissBtn");
  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      const b = document.getElementById("versionUpdateBanner");
      if (b) {
        b.hidden = true;
        b.classList.remove("is-visible");
      }
    });
  }
}

function showVersionUpdateBanner(newVer = "") {
  const banner = document.getElementById("versionUpdateBanner");
  if (banner) {
    const titleEl = banner.querySelector("[data-i18n='newVersionTitle']");
    if (titleEl && newVer) {
      titleEl.textContent = `Nova Versão v${newVer} Disponível`;
    }
    banner.hidden = false;
    banner.classList.add("is-visible");
    renderIcons();
  }
}

async function handleUpdateAndClearCache() {
  showGlobalProgress(95, 400);
  showGlobalLoader(t("updatingApp") || "Limpando cache e atualizando...");

  try {
    // 1. Preserve critical user settings so analyst identity is retained
    const defaults = readDefaults();

    // 2. Clear cache storage API
    if ("caches" in window) {
      try {
        const cacheKeys = await window.caches.keys();
        await Promise.all(cacheKeys.map((key) => window.caches.delete(key)));
      } catch (err) {
        console.warn("Error clearing caches:", err);
      }
    }

    // 3. Unregister service workers if any
    if ("serviceWorker" in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      } catch (err) {
        console.warn("Error unregistering service workers:", err);
      }
    }

    // 4. Clear storage
    sessionStorage.clear();
    localStorage.clear();

    // 5. Restore preserved defaults & update version
    const targetVer = detectedNewServerVersion || CURRENT_APP_VERSION;
    localStorage.setItem("noc_app_version", targetVer);
    if (defaults && Object.keys(defaults).length > 0) {
      localStorage.setItem("nocGeneratorDefaults", JSON.stringify(defaults));
    }

    showToast(t("cacheCleanedReloading") || "Cache limpo! Recarregando...", "success");

    // 6. Hard reload with cache-busting parameter
    setTimeout(() => {
      const cleanUrl = window.location.origin + window.location.pathname + "?noc_v=" + Date.now();
      window.location.href = cleanUrl;
    }, 600);
  } catch (error) {
    console.error("Update error:", error);
    window.location.reload(true);
  }
}

/* ==========================================================================
   SMOOTH LOADING ANIMATIONS & ANTI-FLICKER SYSTEM
   ========================================================================== */

let globalProgressTimer = null;
let globalOverlayStartTime = 0;

function showGlobalProgress(targetPercent = 90, duration = 300) {
  const barContainer = document.getElementById("appTopProgressBar");
  const barFill = document.getElementById("appTopProgressFill");
  if (!barContainer || !barFill) return;

  barContainer.hidden = false;
  barContainer.style.opacity = "1";
  barFill.style.transition = `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  barFill.style.width = `${targetPercent}%`;
}

function hideGlobalProgress() {
  const barContainer = document.getElementById("appTopProgressBar");
  const barFill = document.getElementById("appTopProgressFill");
  if (!barContainer || !barFill) return;

  barFill.style.width = "100%";
  setTimeout(() => {
    barContainer.style.opacity = "0";
    setTimeout(() => {
      barContainer.hidden = true;
      barFill.style.width = "0%";
    }, 300);
  }, 150);
}

function showGlobalLoader(text) {
  const overlay = document.getElementById("nocLoadingOverlay");
  const textEl = document.getElementById("nocLoadingText");
  if (!overlay) return;

  if (textEl && text) {
    textEl.textContent = text;
  }
  globalOverlayStartTime = Date.now();
  overlay.classList.add("is-visible");
  showGlobalProgress(85, 400);
}

function hideGlobalLoader(minDisplayMs = 280) {
  const overlay = document.getElementById("nocLoadingOverlay");
  if (!overlay) return;

  const elapsed = Date.now() - globalOverlayStartTime;
  const remaining = Math.max(0, minDisplayMs - elapsed);

  setTimeout(() => {
    overlay.classList.remove("is-visible");
    hideGlobalProgress();
  }, remaining);
}

async function withLoading(asyncFn, loadingText = "") {
  showGlobalLoader(loadingText || t("loading"));
  try {
    const result = await asyncFn();
    return result;
  } catch (error) {
    showCustomError({
      title: t("errorTitle"),
      message: error.message || t("errorOccurred"),
      details: error.stack || String(error),
    });
    throw error;
  } finally {
    hideGlobalLoader(280);
  }
}

/* ==========================================================================
   CUSTOM ERROR HANDLING SYSTEM
   ========================================================================== */

let pendingRetryAction = null;

function showCustomError({ title, message, details, onRetry } = {}) {
  const modal = document.getElementById("nocErrorModal");
  const titleEl = document.getElementById("nocErrorTitle");
  const msgEl = document.getElementById("nocErrorMessage");
  const detailsWrap = document.getElementById("nocErrorDetailsWrap");
  const detailsEl = document.getElementById("nocErrorDetails");
  const retryBtn = document.getElementById("nocErrorRetryButton");

  if (!modal) {
    alert(`${title || "Erro"}: ${message || ""}`);
    return;
  }

  if (titleEl) titleEl.textContent = title || t("errorTitle") || "Falha na Operação";
  if (msgEl) msgEl.textContent = message || t("errorOccurred") || "Ocorreu um erro inesperado.";

  if (details && detailsEl && detailsWrap) {
    detailsEl.textContent = details;
    detailsWrap.hidden = false;
  } else if (detailsWrap) {
    detailsWrap.hidden = true;
  }

  pendingRetryAction = typeof onRetry === "function" ? onRetry : null;
  if (retryBtn) {
    retryBtn.hidden = !pendingRetryAction;
  }

  renderIcons();
  try {
    modal.showModal();
  } catch (e) {
    modal.setAttribute("open", "");
  }
}

function hideCustomError() {
  const modal = document.getElementById("nocErrorModal");
  if (!modal) return;
  try {
    modal.close();
  } catch (e) {
    modal.removeAttribute("open");
  }
}

function initErrorHandling() {
  const closeBtn = document.getElementById("nocErrorCloseButton");
  if (closeBtn) closeBtn.addEventListener("click", hideCustomError);

  const retryBtn = document.getElementById("nocErrorRetryButton");
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      hideCustomError();
      if (typeof pendingRetryAction === "function") {
        const action = pendingRetryAction;
        pendingRetryAction = null;
        action();
      }
    });
  }

  const copyBtn = document.getElementById("nocErrorCopyButton");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const title = document.getElementById("nocErrorTitle")?.textContent || "";
      const msg = document.getElementById("nocErrorMessage")?.textContent || "";
      const details = document.getElementById("nocErrorDetails")?.textContent || "";
      const textToCopy = `🚨 NOC IP TOOL - RELATÓRIO DE ERRO\nTítulo: ${title}\nMensagem: ${msg}\nDetalhes:\n${details}\nData/Hora: ${new Date().toISOString()}`;
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(t("errorCopied") || "Detalhes copiados!");
      } catch (err) {
        showToast("Erro ao copiar para clipboard", "info");
      }
    });
  }

  // Global uncaught error listeners
  window.addEventListener("error", (event) => {
    if (event.message?.includes("ResizeObserver loop")) return;
    console.error("Unhandled Error caught:", event.error || event.message);
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled Promise Rejection caught:", event.reason);
  });
}

/* ==========================================================================
   BUTTON MICRO-INTERACTIONS & RIPPLE EFFECT
   ========================================================================== */

function initButtonMicroInteractions() {
  document.addEventListener("click", (e) => {
    const button = e.target.closest("button, .copy-action, .primary-button, .ghost-button, .lang-btn");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";

    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - rect.left - radius}px`;
    ripple.style.top = `${e.clientY - rect.top - radius}px`;

    const existing = button.querySelector(".btn-ripple");
    if (existing) existing.remove();

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}


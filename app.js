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
  "ANGOLA": {
    display: "Angola Cables",
    recipients:
"noc@angolacables.co.ao",
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
    "massivasUpdatePhoneGroup",
    "massivasUpdateTxInfraTicket",
    "massivasUpdateSpokenWith",
    "massivasUpdateForecast",
    "massivasUpdateNextAction",
    "massivasDebugAlarms",
    "massivasSummary",
    "massivasProgressFill",
    "parametersDialog",
    "paramContact",
    "paramRequesterName",
    "paramUseEmojis",
    "paramDarkTheme",
  ].forEach((id) => {
    fields[id] = document.getElementById(id);
  });

  initThreeBackground();
  loadDefaults();
  applyCarrierDefaults(fields.carrier.value, true);
  bindEvents();
  initPreviewTooltips();
  loadDescriptionData();
  renderOutput();
  renderIcons();
});

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
  document.getElementById("massivasStartFlowButton").addEventListener("click", () => showMassivasStep(2));
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

  fields.massivasDebugAlarms.addEventListener("input", () => {
    if (getValue("massivasDebugAlarms")) {
      const hosts = splitLines(getValue("massivasHosts")).map(h => h.trim().toUpperCase());
      setValue("massivasSummary", buildMassivasAnalysis(hosts, getValue("massivasDebugAlarms")));
    }
  });

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
}

function returnToLaunch() {
  document.body.classList.remove("app-mode-auto", "app-mode-manual", "app-mode-massivas");
  document.body.classList.add("app-not-started");
  fields.autoFlow.hidden = true;
  fields.massivasFlow.hidden = true;
  showAutoStep(1);
  showMassivasStep(1);
  animateLaunchIn();
  renderIcons();
}

function showMassivasDevelopmentPopup() {
  const title = "Massivas em desenvolvimento";
  const text = "Este fluxo ainda está em desenvolvimento.";

  if (window.Swal) {
    Swal.fire({
      icon: "info",
      title,
      text,
      confirmButtonText: "Entendi",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
    return;
  }

  window.alert(`${title}\n\n${text}`);
}

function restartAutoFlow() {
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
}

function restartMassivasFlow() {
  document.body.classList.remove("app-not-started", "app-mode-manual", "app-mode-auto");
  document.body.classList.add("app-mode-massivas");
  fields.autoFlow.hidden = true;
  fields.massivasFlow.hidden = false;
  resetMassivasFlowFields();
  showMassivasStep(1);
  setStatus("Nova massiva pronta.");
  animateMassivasFlowIn();
  renderIcons();
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
  setValue("massivasUpdatePhoneGroup", "");
  setValue("massivasUpdateTxInfraTicket", "");
  setValue("massivasUpdateSpokenWith", "");
  setValue("massivasUpdateForecast", "Sem previsão");
  setValue("massivasUpdateNextAction", "");
  setValue("massivasDebugAlarms", "");
  setValue("massivasSummary", "");
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
    showMassivasStep(4);
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
  const optionalLines = [];
  if (getValue("massivasUpdatePhoneGroup")) {
    optionalLines.push(`${withEmoji("☎️", "TELEFONE/GRUPO")}: ${getValue("massivasUpdatePhoneGroup")};`);
  }
  if (getValue("massivasUpdateTxInfraTicket")) {
    optionalLines.push(`${withEmoji("🎫", "CHAMADO TX / INFRA")}: ${getValue("massivasUpdateTxInfraTicket")};`);
  }

  return [
    `### ${withEmoji("🚨", "ATUALIZAÇÃO DA MASSIVA")} ###`,
    "",
    `${withEmoji("👤", "FALADO COM")}: ${getValue("massivasUpdateSpokenWith")};`,
    ...optionalLines,
    `${withEmoji("⏳", "PREVISÃO")}: ${getValue("massivasUpdateForecast") || "Sem previsão"};`,
    `${withEmoji("➡️", "PRÓXIMA AÇÃO")}: ${getValue("massivasUpdateNextAction")};`,
  ].join("\n");
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
  showMassivasStep(4);
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
};

function buildMassivasAnalysis(hosts, alarmsText) {
  const evidenceLines = splitLines(alarmsText).map((line) => line.replace(/^-\s*/, ""));
  const records = evidenceLines.map(parseMassivaAlarmLine);
  const validRecords = records.filter((record) => record.raw && !record.raw.startsWith("Nenhum ") && !record.raw.startsWith("Informe "));
  const affectedHosts = uniqueValues([
    ...hosts.map(normalizeHost).filter(Boolean),
    ...validRecords.flatMap((record) => record.hosts),
  ]);
  const linkDownRecords = validRecords.filter((record) => /link\s*down|interface.*down|operational.*down/i.test(record.raw));
  const restartRecords = validRecords.filter((record) => /reinici|reboot|restart|uptime|started|cold start|warm start/i.test(record.raw));
  const triggerGroups = countBy(validRecords.map((record) => record.interfaceData.trigger).filter(Boolean));
  const deliveryGroups = countBy(validRecords.map((record) => record.interfaceData.deliveryType).filter(Boolean));
  const operatorGroups = countBy(validRecords.map((record) => record.interfaceData.operator).filter(Boolean));
  const simultaneous = hasSimultaneousImpact(validRecords);
  const multipleApproaches = linkDownRecords.length >= 2 && affectedHosts.length >= 2;
  const repeatedRestart = restartRecords.some((record) => recordsForHost(restartRecords, record.hosts[0]).length >= 2);

  const conclusion = buildMassivasConclusion({
    affectedHosts,
    validRecords,
    linkDownRecords,
    restartRecords,
    triggerGroups,
    deliveryGroups,
    operatorGroups,
    multipleApproaches,
    simultaneous,
    repeatedRestart,
  });
  const actions = suggestMassivasActions({ validRecords, linkDownRecords, restartRecords, operatorGroups, multipleApproaches, simultaneous, repeatedRestart });

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
    multipleApproaches,
    simultaneous,
    repeatedRestart,
  } = context;

  if (!validRecords.length) {
    return "Sem alarmes ativos retornados para os hosts informados. Validar se os hostnames foram colados conforme cadastro do Zabbix ou se a falha já normalizou antes da consulta.";
  }

  const hostText = affectedHosts.length ? `Host(s) envolvido(s): ${affectedHosts.join(", ")}.` : "Nenhum hostname no padrão BR-UF-CNL-POP-FUNÇÃO-NN foi identificado nos alarmes.";
  const mainHost = affectedHosts[0] || "host afetado";
  const triggerText = summarizeGroups(triggerGroups, triggerCatalog, "gatilho");
  const deliveryText = summarizeGroups(deliveryGroups, deliveryTypeCatalog, "entrega");
  const operatorText = summarizeOperators(operatorGroups);
  const interfaceText = summarizeInterfaces(validRecords);
  const firstTime = validRecords.map((record) => record.time).filter(Boolean).sort()[0] || "";
  const timeText = firstTime ? ` Início mais antigo identificado: ${firstTime}.` : "";
  const technicalContext = [triggerText, deliveryText, operatorText, interfaceText].filter(Boolean).join(" ");

  if (repeatedRestart) {
    return `${hostText}${timeText} Identificado padrão de reinicialização recorrente em ${mainHost}, indicando maior probabilidade de instabilidade local do equipamento, energia, hardware ou software. ${technicalContext}`.trim();
  }

  if (multipleApproaches && simultaneous) {
    return `${hostText}${timeText} As evidências indicam queda simultânea de abordagens distintas em hosts relacionados, cenário compatível com isolamento de site/equipamento por perda de caminhos de transporte. ${technicalContext}`.trim();
  }

  if (multipleApproaches) {
    return `${hostText}${timeText} Foram identificadas múltiplas interfaces/transportes em falha envolvendo mais de um host. O cenário sugere degradação ou isolamento parcial, exigindo validação de topologia antes de tratar como falha isolada de porta. ${technicalContext}`.trim();
  }

  if (linkDownRecords.length) {
    const record = linkDownRecords[0];
    const side = record.localInterface ? `na interface local ${record.localInterface}` : "em interface monitorada";
    const remote = record.interfaceData.remotePort ? ` com referência à porta/interface remota ${record.interfaceData.remotePort}` : "";
    return `${hostText}${timeText} Identificado link/interface down ${side}${remote}. A evidência aponta para falha provável no transporte/circuito, porta física ou equipamento vizinho associado. ${technicalContext}`.trim();
  }

  return `${hostText}${timeText} Os alarmes coletados não formam um padrão único de causa raiz. Priorizar correlação temporal, topologia dos hosts e validação das interfaces citadas nas evidências antes do acionamento definitivo. ${technicalContext}`.trim();
}

function summarizeGroups(groups, catalog, fallbackLabel) {
  const entries = Object.entries(groups);
  if (!entries.length) return "";
  return `${fallbackLabel[0].toUpperCase()}${fallbackLabel.slice(1)}(s): ${entries.map(([key, count]) => {
    const label = Array.isArray(catalog[key]) ? catalog[key][0] : catalog[key];
    return `${key}${label ? ` (${label})` : ""}, ${count} ocorrência${count > 1 ? "s" : ""}`;
  }).join("; ")}.`;
}

function summarizeOperators(groups) {
  const entries = Object.entries(groups);
  if (!entries.length) return "";
  return `Operadora(s)/responsável(is) extraído(s) da nomenclatura: ${entries.map(([key, count]) => `${key}, ${count} ocorrência${count > 1 ? "s" : ""}`).join("; ")}.`;
}

function summarizeInterfaces(records) {
  const capacities = uniqueValues(records.map((record) => record.interfaceData.capacity).filter(Boolean));
  const interfaceTypes = uniqueValues(records.map((record) => record.interfaceData.interfaceType).filter(Boolean));
  const localInterfaces = uniqueValues(records.map((record) => record.localInterface).filter(Boolean));
  const details = [];
  if (localInterfaces.length) details.push(`interfaces locais ${localInterfaces.slice(0, 4).join(", ")}`);
  if (capacities.length) details.push(`capacidade ${capacities.join(", ")}`);
  if (interfaceTypes.length) details.push(`tipo ${interfaceTypes.map((type) => `${type} (${interfaceTypeCatalog[type.replace(/\d+$/, "")] || "tipo não catalogado"})`).join(", ")}`);
  return details.length ? `Dados técnicos: ${details.join("; ")}.` : "";
}

function parseMassivaAlarmLine(line) {
  const hosts = uniqueValues(extractFullHosts(line).map(normalizeHost));
  const parenthetical = line.match(/\(([^)]+)\)/);
  const interfaceDescription = parenthetical ? parenthetical[1] : "";
  const localInterface = extractLocalAlarmInterface(line);

  return {
    raw: line,
    time: extractRecordTime(line),
    hosts,
    localInterface,
    interfaceDescription,
    interfaceData: parseInterfaceDescription(interfaceDescription || line),
  };
}

function extractLocalAlarmInterface(line) {
  const hostPattern = /(?:BR[.-][A-Z]{2}[.-][A-Z0-9]{3,4}[.-][A-Z0-9]{3,4}[.-][A-Z0-9]{2,3}[.-]\d{1,2})/i;
  const match = String(line || "").match(new RegExp(`${hostPattern.source}\\s+([^\\s]+)\\s*::`, "i"));
  return match ? match[1].toUpperCase() : "";
}

function parseInterfaceDescription(value) {
  const tokens = String(value || "")
    .toUpperCase()
    .split(/[_.:\s]+/)
    .map((token) => token.trim())
    .filter(Boolean);
  const trigger = tokens.find((token) => triggerCatalog[token]) || "";
  const interfaceType = tokens.find((token) => /^U?LK$|^ATK\d*$|^ITK\d*$/.test(token)) || "";
  const capacity = tokens.find((token) => /^\d+(?:M|G|T|GE|GIG|GB)$/.test(token)) || inferCapacityFromText(value);
  const deliveryType = inferDeliveryType(tokens);
  const operator = inferInterfaceOperator(tokens, deliveryType);
  const remotePort = inferRemotePort(value, tokens);
  const remoteEquipment = tokens.find((token) => token !== trigger && token !== operator && token.includes("-") && /[A-Z]{3,4}/.test(token)) || "";

  return {
    trigger,
    interfaceType,
    capacity,
    deliveryType,
    operator,
    remoteEquipment,
    remotePort,
  };
}

function inferDeliveryType(tokens) {
  const found = tokens.find((token) => deliveryTypeCatalog[token]);
  if (!found) return "";
  return found === "DWDM" ? "DWD" : found;
}

function inferInterfaceOperator(tokens, deliveryType) {
  const knownOperator = tokens.find((token) => getPartnerContact(token) || carrierProfiles[token]);
  if (knownOperator) return normalizeInterfaceOperator(knownOperator);

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
  if (/^(ULK|ATK\d*|ITK\d*)$/i.test(token)) return false;
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

  if (context.repeatedRestart) {
    actions.push("Acionar Infra para validação local do equipamento, energia, hardware e logs de reboot.");
  }

  if (context.multipleApproaches && context.simultaneous) {
    actions.push(`Acionar Infra para validação de possível isolamento do host/site e acionar TX/Transporte para investigar as abordagens que caíram no mesmo intervalo${responsible ? `, envolvendo ${responsible}` : ""}.`);
  } else if (context.linkDownRecords.length) {
    actions.push(responsible
      ? `Acionar TX/Transporte e o parceiro/operadora ${responsible} para validação do circuito, porta e equipamento vizinho indicados nas evidências.`
      : "Acionar TX/Transporte para validação do circuito, porta e equipamento vizinho indicados nas evidências.");
  }

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
      record.hosts.length ? `hosts ${record.hosts.join(", ")}` : "",
      record.localInterface ? `interface local ${record.localInterface}` : "",
      data.trigger ? `trigger ${data.trigger}` : "",
      data.deliveryType ? `entrega ${data.deliveryType}` : "",
      data.operator ? `operadora ${data.operator}` : "",
      data.remotePort ? `porta/interface ${data.remotePort}` : "",
    ].filter(Boolean).join("; ");

    return `${index + 1}. ${details || "alarme sem campos estruturados"}\n   Evidência: ${record.raw}`;
  });
}

function extractRecordTime(line) {
  const full = line.match(/\b20\d{2}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\b/);
  if (full) return full[0];

  const br = line.match(/\b\d{2}\/\d{2}\/\d{4},?\s+\d{2}:\d{2}:\d{2}\b/);
  if (br) return br[0];

  const hour = line.match(/\b\d{2}:\d{2}:\d{2}\b/);
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
  const match = String(value || "").match(/(\d{2}):(\d{2}):(\d{2})/);
  if (!match) return null;
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
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
  const nextStep = Math.min(Math.max(step, 1), 5);
  document.querySelectorAll(".massivas-step").forEach((item) => {
    const isActive = Number(item.dataset.massivasStep) === nextStep;
    item.classList.toggle("is-active", isActive);

    if (isActive && window.gsap) {
      gsap.fromTo(item, { y: 16, opacity: 0.75 }, { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" });
    }
  });

  updateMassivasStepper(nextStep);
  if (fields.massivasStatus) fields.massivasStatus.textContent = `Passo ${nextStep} de 5`;
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

    if (isIgnorableAlarmLine(line)) {
      return;
    }

    const value = pendingTimestamp ? `${pendingTimestamp}${line}` : line;
    normalized.push(value);
    pendingTimestamp = "";
  });

  return normalized.join("\n");
}

function isIgnorableAlarmLine(line) {
  return /^\d{6,}$/.test(line) || /^Aut\s+Bdesk:#/i.test(line) || /^✅️?/u.test(line);
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

  return Array.from(matches).slice(0, 2);
}

function extractFullHosts(text) {
  const hosts = [];
  const pattern = /(^|[^A-Z0-9])((?:BR[.-][A-Z]{2}[.-][A-Z0-9]{3,4}[.-][A-Z0-9]{3,4}[.-][A-Z0-9]{2,3}[.-]\d{1,2}))/gi;
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
    const host = extractPrimaryLineHost(line) || "SEM_HOST";
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

function downloadOutput() {
  const carrier = getValue("carrier").toLowerCase();
  const ticket = getValue("internalTicket") || "noc";
  const sections = [
    ["DESCRIÇÃO BDESK", "description"],
    ["RECONHECER ALARMES", "recognize"],
    ["ABERTURA NOC", "opening"],
    ["ATUALIZAÇÃO NOC", "update"],
    ["E-MAIL / SOLICITAÇÃO", "email"],
    ["COBRANÇA", "charge"],
    ["CONTATO", "contact"],
  ]
    .map(([title, kind]) => {
      const text = getGeneratedText(kind);
      return text ? `### ${title} ###\n${text}` : "";
    })
    .filter(Boolean);

  if (!sections.length) {
    showToast("Complete os campos antes de baixar.", "info");
    return;
  }

  const content = sections.join("\n\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `carimbo-${carrier}-${ticket}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("Arquivo .txt gerado.");
  showToast("Arquivo .txt gerado.");
}

async function clearForm() {
  const confirmed = window.confirm("Limpar campos? Os alarmes e campos detectados serão apagados.");
  if (!confirmed) return;

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
  ].forEach((id) => setValue(id, ""));

  applyCarrierDefaults(getValue("carrier"), true);
  setValue("failureType", "INDISPONIBILIDADE");
  syncSymptomWithFailureType();
  setValue("fiber", "ONLY");
  setValue("descriptionMode", "auto");
  renderOutput();
  setStatus("Campos limpos.");
  showToast("Campos limpos.", "success");
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

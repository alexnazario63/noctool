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
    display: "Vivo / Telefonica",
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
    display: "L3 / Lumen / Century / Cirion",
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
    display: "Upix / 76Telecom",
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

const ADMIN_CONFIG_KEY = "nocAdminConfig";

function readAdminConfig() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_CONFIG_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function normalizeAdminList(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function applyAdminConfig() {
  const config = readAdminConfig();

  (config.partners || []).forEach((partner) => {
    const key = normalizePartnerLookup(partner.key || partner.display || partner.name || "");
    if (!key) return;

    partnerContacts[key] = {
      ...(partnerContacts[key] || {}),
      display: partner.display || partner.name || key,
      aliases: normalizeAdminList(partner.aliases),
      recipients: partner.recipients || "",
      phone: partner.phone || "",
      portal: partner.portal || "",
      user: partner.user || "",
      password: partner.password || "",
      details: normalizeAdminList(partner.details),
    };

    if (partner.channel || partner.nextAction || partner.spokenWith) {
      carrierProfiles[key] = {
        display: partner.display || partner.name || key,
        recipients: partner.recipients || "",
        actionTaken: buildActionTaken(partner.display || partner.name || key),
        nextAction: partner.nextAction || `Cobrar ${partner.display || partner.name || key} em 1 hora`,
        spokenWith: partner.spokenWith || partner.display || partner.name || key,
        channel: partner.channel || "Email",
        outageText: getAdminStampText("outageText", DEFAULT_OUTAGE_TEXT),
        emailIntro: getAdminStampText("emailIntro", DEFAULT_EMAIL_INTRO),
      };
    }
  });
}

function getAdminStampText(key, fallback) {
  const config = readAdminConfig();
  return config.stampTexts?.[key] || fallback;
}

function getAdminChargeMessages() {
  const config = readAdminConfig();
  return Array.isArray(config.chargeMessages) ? config.chargeMessages.filter(Boolean) : [];
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
    "massivasSummary",
    "massivasProgressFill",
    "parametersDialog",
    "paramContact",
    "paramRequesterName",
  ].forEach((id) => {
    fields[id] = document.getElementById(id);
  });

  initThreeBackground();
  applyAdminConfig();
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
  document.getElementById("startMassivasButton").addEventListener("click", showMassivasDevelopmentPopup);
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
    renderMassivasSummary();
    setValue("massivasSummary", buildMassivasSummaryFallback());
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
    renderMassivasSummary();
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
    showMassivasStep(2);
  }
}

async function renderMassivasSummary() {
  const hostsText = getValue("massivasHosts");
  const hosts = splitLines(hostsText).map(h => h.trim().toUpperCase());

  let alarmsText = "Zabbix não configurado ou nenhum alarme encontrado.";

  if (ZABBIX_API_URL && ZABBIX_API_TOKEN && hosts.length > 0) {
    alarmsText = await fetchZabbixAlarms(hosts);
  } else if (hosts.length > 0) {
    alarmsText = hosts.map(h => `- ${h}: (Sem integração ativa com Zabbix)`).join("\n");
  }

  const lines = [
    "### ATUALIZAÇÃO DA MASSIVA ###",
    "",
    "ANALISE: ",
    "PREVISÃO DE NORMALIZAÇÃO: ",
    "PRÓXIMA AÇÃO: ",
    "",
    "ALARMES RELACIONADOS:",
    alarmsText
  ];

  setValue("massivasSummary", lines.join("\n"));
}

function buildMassivasSummaryFallback() {
  const hostsText = getValue("massivasHosts");
  const hosts = splitLines(hostsText).map(h => h.trim().toUpperCase());

  const lines = [
    "### ATUALIZAÇÃO DA MASSIVA ###",
    "",
    "ANALISE: ",
    "PREVISÃO DE NORMALIZAÇÃO: ",
    "PRÓXIMA AÇÃO: ",
    "",
    "HOSTS INFORMADOS:",
    ...(hosts.length ? hosts.map(h => `- ${h}`) : ["Nenhum host informado."])
  ];
  return lines.join("\n");
}

async function fetchZabbixAlarms(hosts) {
  try {
    const hostResponse = await fetch(ZABBIX_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json-rpc' },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "host.get",
        params: {
          filter: { host: hosts },
          output: ["hostid", "host"]
        },
        auth: ZABBIX_API_TOKEN,
        id: 1
      })
    });

    const hostData = await hostResponse.json();
    if (!hostData.result || hostData.result.length === 0) {
      return "Nenhum host correspondente encontrado no Zabbix.";
    }

    const hostIds = hostData.result.map(h => h.hostid);

    const problemResponse = await fetch(ZABBIX_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json-rpc' },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "problem.get",
        params: {
          hostids: hostIds,
          recent: true,
          sortfield: ["eventid"],
          sortorder: "DESC",
          output: ["name", "clock"]
        },
        auth: ZABBIX_API_TOKEN,
        id: 2
      })
    });

    const problemData = await problemResponse.json();
    if (!problemData.result || problemData.result.length === 0) {
      return "Nenhum alarme recente encontrado para os hosts informados no Zabbix.";
    }

    const alarmLines = problemData.result.map(p => {
      const date = new Date(p.clock * 1000);
      const timeStr = date.toLocaleString();
      return `- [${timeStr}] ${p.name}`;
    });

    return alarmLines.join("\n");
  } catch (error) {
    console.error("Erro na API do Zabbix:", error);
    throw error;
  }
}

function currentMassivasStep() {
  const active = document.querySelector(".massivas-step.is-active");
  return Number(active?.dataset.massivasStep || 1);
}

function showMassivasStep(step) {
  const nextStep = Math.min(Math.max(step, 1), 3);
  document.querySelectorAll(".massivas-step").forEach((item) => {
    const isActive = Number(item.dataset.massivasStep) === nextStep;
    item.classList.toggle("is-active", isActive);

    if (isActive && window.gsap) {
      gsap.fromTo(item, { y: 16, opacity: 0.75 }, { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" });
    }
  });

  updateMassivasStepper(nextStep);
  if (fields.massivasStatus) fields.massivasStatus.textContent = `Passo ${nextStep} de 3`;
}

function updateMassivasStepper(step) {
  const progressFill = fields.massivasProgressFill;
  if (progressFill) progressFill.style.width = `${(step / 3) * 100}%`;

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

function initThreeBackground() {
  const canvas = document.getElementById("threeBackground");
  if (!canvas) return;
  if (!window.THREE) {
    window.requestAnimationFrame(initThreeBackground);
    return;
  }

  if (canvas.dataset.threeInitialized === "true") return;
  canvas.dataset.threeInitialized = "true";

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07111f, 0.04);
  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const group = new THREE.Group();
  scene.add(group);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.15, 2),
    new THREE.MeshStandardMaterial({
      color: 0x79f1dd,
      emissive: 0x103b4a,
      emissiveIntensity: 0.9,
      roughness: 0.18,
      metalness: 0.35,
      flatShading: true,
    }),
  );
  group.add(core);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(2.55, 0.035, 12, 220),
    new THREE.MeshBasicMaterial({ color: 0x4ca5ff, transparent: true, opacity: 0.45 }),
  );
  halo.rotation.x = Math.PI / 2.2;
  group.add(halo);

  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.8, 0.018, 12, 180),
    new THREE.MeshBasicMaterial({ color: 0xf2b84b, transparent: true, opacity: 0.32 }),
  );
  innerRing.rotation.y = Math.PI / 4;
  group.add(innerRing);

  const nodeGeometry = new THREE.IcosahedronGeometry(0.08, 1);
  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: 0x7dd3c7,
    emissive: 0x0b6f6a,
    emissiveIntensity: 0.55,
    roughness: 0.32,
    metalness: 0.25,
  });

  const nodes = [];
  for (let index = 0; index < 54; index += 1) {
    const angle = index * 0.72;
    const radius = 2.2 + (index % 9) * 0.28;
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle * 1.17) * 1.8,
      Math.sin(angle) * radius * 0.7,
    );
    nodes.push(node);
    group.add(node);
  }

  const linePoints = nodes.map((node) => node.position);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xf2b84b, transparent: true, opacity: 0.34 });
  const line = new THREE.LineLoop(lineGeometry, lineMaterial);
  group.add(line);

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

  scene.add(new THREE.AmbientLight(0xffffff, 0.52));
  const light = new THREE.PointLight(0x9bd8ff, 1.6, 40);
  light.position.set(4, 4, 7);
  scene.add(light);
  const light2 = new THREE.PointLight(0x69e2cf, 0.9, 30);
  light2.position.set(-4, -2, 5);
  scene.add(light2);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

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
    core.rotation.y = seconds * 0.45;
    halo.rotation.z = seconds * 0.2;
    innerRing.rotation.x = Math.PI / 4 + seconds * 0.16;
    nodes.forEach((node, index) => {
      node.scale.setScalar(1 + Math.sin(seconds * 1.7 + index) * 0.18);
    });
    particles.rotation.y = seconds * 0.06;
    particles.rotation.x = Math.sin(seconds * 0.12) * 0.08;
    renderer.render(scene, camera);
    if (!prefersReducedMotion) requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
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
    descriptionData.failureTypes = {
      ...(failureTypes[0] || {}),
      ...(readAdminConfig().failureTypes || {}),
    };
    descriptionData.partners = [...partners, ...(readAdminConfig().partners || []).map((partner) => partner.display || partner.name || partner.key).filter(Boolean)];
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
      ...(readAdminConfig().failureTypes || {}),
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

  if (!timestamps.length) return "";

  timestamps.sort((left, right) => left.date - right.date);
  return timestamps[0].raw;
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
    "### ABERTURA NOC ###",
    "",
    `SINTOMA/RECLAMAÇÃO: ${getValue("symptom") || getAdminStampText("symptomDefault", "Capacidade indisponível")};`,
    `DIAGNÓSTICO: ${getValue("diagnosis") || getAdminStampText("diagnosisDefault", "Provável falha na operadora parceira")};`,
    `FACILIDADES: ${getValue("facilities") || getAdminStampText("facilitiesDefault", "Segue abaixo")};`,
    `AÇÃO TOMADA: ${getValue("actionTaken")};`,
    `PRÓXIMA AÇÃO: ${getValue("nextAction")};`,
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
    .map((group, index) => [`HOST ${index + 1}:`, ...group.lines].join("\n"))
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
    "### ATUALIZAÇÃO NOC ###",
    "",
    `FALADO COM: ${spoken}${channel ? ` via ${channel}` : ""};`,
  ];

  const phoneChannel = getValue("phoneChannel");
  if (phoneChannel) lines.push(`TELEFONE: ${phoneChannel};`);

  lines.push(
    `O QUE FOI FALADO: ${getAdminStampText("spokenText", "Segue abaixo a captura de tela")};`,
    `PREVISÃO: ${getValue("forecast") || "Sem previsão"};`,
    `PRÓXIMA AÇÃO: Cobrar ${profile.display} em 1 hora;`,
  );

  return lines.join("\n");
}

function buildEmail() {
  const carrier = normalizeCarrierKey(getValue("carrier"));
  if (carrier === "TELEBRAS") return buildTelebrasRequest();

  const lines = [
    `${getValue("greeting")};`,
    getAdminStampText("emailIntro", DEFAULT_EMAIL_INTRO),
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
  const adminMessages = getAdminChargeMessages();

  const messages = adminMessages.length ? adminMessages : [
    `${greeting}, temos alguma atualização deste chamado${designator} ?`,
    `${greeting}, circuito${designator} permanece indisponível.`,
    `${greeting} prezados temos atualizações do chamado${designator} ?`,
    `${greeting}, ${carrier}, seguimos no aguardo de atualização do chamado${designator}.`,
    `${greeting}, validado circuito/host normalizado. Temos RFO ou causa raiz?`,
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
  const adminDefaults = readAdminConfig().defaults || {};
  if (defaults.contact) setValue("contact", defaults.contact);
  if (defaults.requesterName) setValue("requesterName", defaults.requesterName);
  if (adminDefaults.contact) setValue("contact", adminDefaults.contact);
  if (adminDefaults.requesterName) setValue("requesterName", adminDefaults.requesterName);
  if (adminDefaults.copyTo) setValue("copyTo", adminDefaults.copyTo);
  if (adminDefaults.channel) setValue("channel", adminDefaults.channel);
}

function saveDefaults() {
  const defaults = {
    contact: getValue("contact"),
    requesterName: getValue("requesterName"),
  };

  localStorage.setItem("nocGeneratorDefaults", JSON.stringify(defaults));
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

const ADMIN_CONFIG_KEY = "nocAdminConfig";
const ADMIN_SESSION_KEY = "nocAdminSession";
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

const defaultConfig = {
  partners: [],
  chargeMessages: [
    "{greeting}, temos alguma atualização deste chamado{designator} ?",
    "{greeting}, circuito{designator} permanece indisponível.",
    "{greeting} prezados temos atualizações do chamado{designator} ?",
    "{greeting}, {carrier}, seguimos no aguardo de atualização do chamado{designator}.",
    "{greeting}, validado circuito/host normalizado. Temos RFO ou causa raiz?",
  ],
  failureTypes: {},
  stampTexts: {
    emailIntro: "Estamos com transporte de capacidade indisponível, verificar com urgência.",
    outageText: "transporte de capacidade indisponível",
    symptomDefault: "Capacidade indisponível",
    diagnosisDefault: "Provável falha na operadora parceira",
    facilitiesDefault: "Segue abaixo",
    spokenText: "Segue abaixo a captura de tela",
  },
  defaults: {
    contact: "",
    requesterName: "",
    copyTo: "noc-l@alloha.com",
    channel: "Email",
  },
};

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  [
    "loginView",
    "dashboardView",
    "loginForm",
    "adminUser",
    "adminPass",
    "loginStatus",
    "logoutButton",
    "adminForm",
    "partnersListAdmin",
    "addPartnerButton",
    "chargeMessagesAdmin",
    "failureTypesAdmin",
    "stampEmailIntro",
    "stampOutageText",
    "stampSymptom",
    "stampDiagnosis",
    "stampFacilities",
    "stampSpokenText",
    "defaultContactAdmin",
    "defaultRequesterAdmin",
    "defaultCopyAdmin",
    "defaultChannelAdmin",
    "resetAdminButton",
    "adminStatus",
  ].forEach((id) => {
    elements[id] = document.getElementById(id);
  });

  bindAdminEvents();
  renderSession();
  renderIcons();
});

function renderIcons() {
  if (window.lucide) lucide.createIcons({ attrs: { "stroke-width": 2 } });
}

function bindAdminEvents() {
  elements.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (elements.adminUser.value === ADMIN_USER && elements.adminPass.value === ADMIN_PASS) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      elements.loginStatus.textContent = "";
      renderSession();
      return;
    }

    elements.loginStatus.textContent = "Login ou senha inválidos.";
  });

  elements.logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    renderSession();
  });

  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => showTab(button.dataset.adminTab));
  });

  elements.addPartnerButton.addEventListener("click", () => addPartnerEditor());
  elements.adminForm.addEventListener("submit", saveAdminConfig);
  elements.resetAdminButton.addEventListener("click", resetAdminConfig);
}

function renderSession() {
  const authenticated = sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  elements.loginView.hidden = authenticated;
  elements.dashboardView.hidden = !authenticated;

  if (authenticated) loadAdminForm();
  renderIcons();
}

function showTab(tab) {
  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.adminTab === tab);
  });

  document.querySelectorAll("[data-admin-section]").forEach((section) => {
    section.classList.toggle("is-active", section.dataset.adminSection === tab);
  });
}

function readConfig() {
  try {
    return { ...defaultConfig, ...JSON.parse(localStorage.getItem(ADMIN_CONFIG_KEY) || "{}") };
  } catch (error) {
    return structuredClone(defaultConfig);
  }
}

function loadAdminForm() {
  const config = readConfig();
  const stamp = { ...defaultConfig.stampTexts, ...(config.stampTexts || {}) };
  const defaults = { ...defaultConfig.defaults, ...(config.defaults || {}) };

  elements.partnersListAdmin.innerHTML = "";
  (config.partners || []).forEach((partner) => addPartnerEditor(partner));
  if (!(config.partners || []).length) addPartnerEditor();

  elements.chargeMessagesAdmin.value = (config.chargeMessages || defaultConfig.chargeMessages).join("\n");
  elements.failureTypesAdmin.value = Object.entries(config.failureTypes || {})
    .map(([label, code]) => `${label}=${code}`)
    .join("\n");

  elements.stampEmailIntro.value = stamp.emailIntro;
  elements.stampOutageText.value = stamp.outageText;
  elements.stampSymptom.value = stamp.symptomDefault;
  elements.stampDiagnosis.value = stamp.diagnosisDefault;
  elements.stampFacilities.value = stamp.facilitiesDefault;
  elements.stampSpokenText.value = stamp.spokenText;

  elements.defaultContactAdmin.value = defaults.contact;
  elements.defaultRequesterAdmin.value = defaults.requesterName;
  elements.defaultCopyAdmin.value = defaults.copyTo;
  elements.defaultChannelAdmin.value = defaults.channel;
}

function addPartnerEditor(partner = {}) {
  const wrapper = document.createElement("article");
  wrapper.className = "partner-editor";
  wrapper.innerHTML = `
    <div class="partner-editor__head">
      <h3>${escapeHtml(partner.display || partner.key || "Novo parceiro")}</h3>
      <button class="icon-button danger" type="button" data-remove-partner aria-label="Remover parceiro"><i data-lucide="trash-2"></i></button>
    </div>
    <div class="partner-editor__grid">
      ${fieldTemplate("Chave", "key", partner.key || "")}
      ${fieldTemplate("Nome exibido", "display", partner.display || "")}
      ${fieldTemplate("Aliases", "aliases", listToText(partner.aliases))}
      ${fieldTemplate("Destinatários", "recipients", partner.recipients || "")}
      ${fieldTemplate("Telefone/canal", "phone", partner.phone || "")}
      ${fieldTemplate("Portal", "portal", partner.portal || "")}
      ${fieldTemplate("Usuário", "user", partner.user || "")}
      ${fieldTemplate("Senha", "password", partner.password || "")}
      ${fieldTemplate("Canal padrão", "channel", partner.channel || "Email")}
      ${fieldTemplate("Próxima ação", "nextAction", partner.nextAction || "")}
      ${fieldTemplate("Falado com", "spokenWith", partner.spokenWith || "")}
      ${fieldTemplate("Observações", "details", listToText(partner.details))}
    </div>
  `;

  wrapper.querySelector("[data-remove-partner]").addEventListener("click", () => wrapper.remove());
  elements.partnersListAdmin.appendChild(wrapper);
  renderIcons();
}

function fieldTemplate(label, name, value) {
  return `<label class="field"><span>${label}</span><input data-partner-field="${name}" type="text" value="${escapeHtml(value)}"></label>`;
}

function saveAdminConfig(event) {
  event.preventDefault();

  const config = {
    partners: collectPartners(),
    chargeMessages: splitLines(elements.chargeMessagesAdmin.value),
    failureTypes: parseFailureTypes(elements.failureTypesAdmin.value),
    stampTexts: {
      emailIntro: elements.stampEmailIntro.value.trim(),
      outageText: elements.stampOutageText.value.trim(),
      symptomDefault: elements.stampSymptom.value.trim(),
      diagnosisDefault: elements.stampDiagnosis.value.trim(),
      facilitiesDefault: elements.stampFacilities.value.trim(),
      spokenText: elements.stampSpokenText.value.trim(),
    },
    defaults: {
      contact: elements.defaultContactAdmin.value.trim(),
      requesterName: elements.defaultRequesterAdmin.value.trim(),
      copyTo: elements.defaultCopyAdmin.value.trim(),
      channel: elements.defaultChannelAdmin.value.trim(),
    },
  };

  localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(config));
  syncLegacyDefaults(config.defaults);
  elements.adminStatus.textContent = "Alterações salvas. Reabra ou atualize a ferramenta para aplicar tudo.";
}

function collectPartners() {
  return Array.from(document.querySelectorAll(".partner-editor"))
    .map((editor) => {
      const partner = {};
      editor.querySelectorAll("[data-partner-field]").forEach((input) => {
        partner[input.dataset.partnerField] = input.value.trim();
      });
      partner.aliases = splitList(partner.aliases);
      partner.details = splitList(partner.details);
      return partner;
    })
    .filter((partner) => partner.key || partner.display || partner.recipients);
}

function parseFailureTypes(value) {
  return splitLines(value).reduce((acc, line) => {
    const [label, code] = line.split("=").map((part) => part?.trim());
    if (label && code) acc[label.toUpperCase()] = code.toUpperCase();
    return acc;
  }, {});
}

function resetAdminConfig() {
  const confirmed = window.confirm("Limpar todas as configurações administrativas deste navegador?");
  if (!confirmed) return;

  localStorage.removeItem(ADMIN_CONFIG_KEY);
  elements.adminStatus.textContent = "Configurações limpas.";
  loadAdminForm();
}

function syncLegacyDefaults(defaults) {
  const previous = JSON.parse(localStorage.getItem("nocGeneratorDefaults") || "{}");
  localStorage.setItem("nocGeneratorDefaults", JSON.stringify({
    ...previous,
    contact: defaults.contact,
    requesterName: defaults.requesterName,
  }));
}

function splitLines(value) {
  return String(value || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function splitList(value) {
  return String(value || "").split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
}

function listToText(value) {
  return Array.isArray(value) ? value.join(", ") : (value || "");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

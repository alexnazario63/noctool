const translations = {
  pt: {
    // Idioma
    langName: "Português",
    language: "Idioma",
    
    // Título e branding
    appTitle: "NOC IP TOOL",
    developedBy: "Developed by Alexsander",
    version: "Version 3.7.1",
    versionPrefix: "Version",
    
    // Changelog
    changelog: "Changelog",
    changelogIntro: "Ferramenta IP para capacidades e massivas com análise de alarmes com fluxo guiado.",
    changelogItem1: "Fluxo Capacidades com abertura, Bdesk, reconhecimento, e-mail e finalização.",
    changelogItem2: "Fluxo Massivas com análise de alarmes, reconhecimento e atualização direta.",
    changelogItem3: "Topologia de rede Backbone com nós em 3D e resolução de cidade/POP.",
    changelogItem4: "Extração do host afetado diretamente da descrição do enlace.",
    changelogItem5: "Animações de carregamento anti-flicker e tela de diagnóstico de erros.",
    changelogItem6: "Atualizador com limpeza de cache e temas claro/escuro refinados.",
    futureFeatures: "Futuras funcionalidades",
    futureFeature1: "Topologia dinâmica com aprendizado automático e adaptativa",
    
    // Botões principais
    capabilities: "Capacidades",
    massivas: "MASSIVAS",
    parameters: "Parâmetros",
    
    // Navegação
    home: "Início",
    manualEdit: "Edição manual",
    autoFlow: "Fluxo auto",
    step: "Passo",
    of: "de",
    
    // Fluxo automático - Passo 1
    alarms: "Alarmes",
    pasteAlarms: "Colar alarmes e confirmar dados",
    alarmsPlaceholder: "Cole os alarmes aqui",
    partner: "Parceiro",
    failureType: "Tipo de falha",
    confirmData: "Confirmar dados",
    
    // Fluxo automático - Passo 2
    bdeskOpening: "Bdesk e abertura",
    generateInitialTexts: "Gerar textos iniciais",
    bdeskSubject: "Assunto Bdesk",
    openingText: "Texto de abertura",
    back: "Voltar",
    nextStep: "Próximo passo",
    
    // Fluxo automático - Passo 3
    internalTicket: "Chamado interno",
    pasteTicket: "Colar chamado e reconhecer alarmes",
    internalTicketPlaceholder: "588604",
    recognizeAlarms: "Reconhecer alarmes",
    
    // Fluxo automático - Passo 4
    email: "E-mail",
    generateEmail: "Gerar acionamento por e-mail",
    subject: "Assunto",
    recipients: "Destinatários",
    
    // Fluxo automático - Passo 5
    finalization: "Finalização",
    concludeService: "Concluir atendimento",
    finishAndReturn: "Finalizar e voltar ao início",
    
    // Fluxo massivas
    massivasFlow: "Fluxo massivas",
    pasteAlarmsOrganize: "Colar alarmes e organizar hosts",
    massivasAlarmsPlaceholder: "Cole os alarmes aqui para organizar por host",
    separatedHosts: "Hosts separados automaticamente",
    hostsPlaceholder: "Os hosts identificados aparecem aqui",
    topology: "Topologia da massiva",
    topologyDesc: "Origem, equipamento B e interfaces identificadas",
    openingTextMassiva: "Texto de abertura da massiva",
    openingPlaceholder: "A abertura sera gerada a partir dos alarmes colados",
    copyOpeningTopology: "Copiar abertura e topologia",
    goToTicket: "Ir para chamado",
    prepareMassivaTexts: "Preparar textos da massiva",
    bdeskSubjectMassiva: "Assunto Bdesk da massiva",
    bdeskSubjectPlaceholder: "Cole o assunto Bdesk completo para gerar o reconhecimento com Aut Bdesk:#",
    recognizeMassivaAlarms: "Reconhecer alarmes da massiva",
    phoneGroup: "Telefone/Grupo",
    phoneGroupPlaceholder: "Telefone, grupo ou canal acionado",
    txInfraTicket: "Chamado TX / INFRA",
    txInfraPlaceholder: "Chamado ou protocolo da área acionada",
    spokenWith: "Falado com",
    spokenWithPlaceholder: "NOC / TX / Parceiro",
    forecast: "Previsão",
    forecastPlaceholder: "Sem previsão",
    nextAction: "Próxima ação",
    nextActionPlaceholder: "Aguardar retorno e atualizar chamado",
    whatWasSpoken: "O que foi falado",
    whatWasSpokenPlaceholder: "Descreva o retorno, orientacao ou evidencia informada",
    massivaUpdate: "Atualização massiva",
    goToFinalization: "Ir para finalizacao",
    concludeRestart: "Concluir e reiniciar o fluxo",
    finishReturnStart: "Finalizar e voltar ao início",
    
    // Área de trabalho manual
    readyToGenerate: "Pronto para gerar.",
    alarmsEventEvidence: "Alarmes, evento ou evidência",
    alarmsEventPlaceholder: "Cole os alarmes aqui. A extração acontece automaticamente.",
    carrier: "Operadora",
    externalTicket: "Protocolo externo",
    externalTicketPlaceholder: "EVE260500076687",
    
    // Campos avançados
    detectedFieldsAdjustments: "Campos detectados e ajustes",
    bdeskDescription: "Descrição Bdesk",
    fiber: "Fibra",
    mode: "Modo",
    auto: "Automático",
    singleEnd: "Ponta única",
    twoEnds: "Duas pontas",
    hostnameA: "Hostname A",
    hostnameAPlaceholder: "BR-RJ-RJO-CTL-TP-02",
    hostnameB: "Hostname B",
    hostnameBPlaceholder: "BR-SP-SPO-CTL-TP-04",
    circuitData: "Dados do circuito",
    designations: "Designações",
    designationsPlaceholder: "CAP:TIM:RJOCOACAP287332-CID:581006",
    bdeskIdentification: "Identificação Bdesk",
    bdeskTitlePlaceholder: "RJ::IND::RIO DE JANEIRO_CTL<>SAO PAULO_CTL::ONLY::TIM",
    origin: "Origem",
    originPlaceholder: "RIO DE JANEIRO",
    destination: "Destino",
    destinationPlaceholder: "SAO PAULO",
    failureTime: "Horário da falha",
    failureTimePlaceholder: "15/05/2026 13:54",
    nocStamp: "Carimbo NOC",
    symptomComplaint: "Sintoma/reclamação",
    diagnosis: "Diagnóstico",
    facilities: "Facilidades",
    actionTaken: "Ação tomada",
    channel: "Canal",
    phoneExtra: "Telefone/canal extra",
    phoneExtraPlaceholder: "0800 880 7000",
    emailBilling: "E-mail e cobrança",
    copyTo: "Cópia",
    greeting: "Saudação",
    outageType: "Tipo de indisponibilidade",
    
    // Botões de copiar
    copyModels: "Copiar modelos",
    opening: "Abertura",
    update: "Atualização",
    contact: "Contato",
    standardMessages: "Mensagens padrão",
    updateQuestion: "Atualização?",
    unavailable: "Indisponível",
    dearAll: "Prezados?",
    returnMsg: "Retorno",
    rfoQuestion: "RFO?",
    preview: "Prévia",
    previewPlaceholder: "Passe o mouse em um botão para ver uma prévia.",
    
    // Diálogo de parâmetros
    defaultParameters: "Parâmetros padrão",
    analystContactName: "Contato e nome do analista",
    parametersInfo: "Quando preenchidos, esses dados ficam salvos localmente e passam a ser o padrão da ferramenta.",
    analystContact: "Contato do analista",
    analystContactPlaceholder: "+55 (11) 94706-4266",
    analystName: "Nome do analista",
    analystNamePlaceholder: "SEU NOME AQUI",
    useEmojisText: "Usar emojis nos textos operacionais",
    darkTheme: "Tema escuro",
    cancel: "Cancelar",
    saveParameters: "Salvar parâmetros",
    
    // Textos gerados
    nocOpening: "ABERTURA NOC",
    nocUpdate: "ATUALIZAÇÃO NOC",
    symptomReclamation: "SINTOMA/RECLAMAÇÃO",
    facilitiesLabel: "FACILIDADES",
    actionTakenLabel: "AÇÃO TOMADA",
    nextActionLabel: "PRÓXIMA AÇÃO",
    spokenWithLabel: "FALADO COM",
    whatWasSpokenLabel: "O QUE FOI FALADO",
    forecastLabel: "PREVISÃO",
    phoneLabel: "TELEFONE",
    massivaOpening: "ABERTURA DE MASSIVA",
    massivaUpdate: "ATUALIZAÇÃO DA MASSIVA",
    failureReported: "FALHA REPORTADA",
    diagnosisLabel: "DIAGNÓSTICO",
    evidenceOrganized: "EVIDÊNCIAS ORGANIZADAS",
    massivaAnalysis: "ANÁLISE DA MASSIVA - ALPHA/TESTES",
    analysisLabel: "ANALISE",
    normalizationForecast: "PREVISÃO DE NORMALIZAÇÃO",
    directioning: "DIRECIONAMENTO",
    
    // Mensagens de status
    dataExtracted: "Dados extraídos do evento. Revise origem, destino e designações antes de copiar.",
    dataLoaded: "Dados de descrição carregados.",
    parametersSaved: "Parâmetros salvos localmente.",
    textCopied: "Texto copiado.",
    nothingToCopy: "Nada para copiar ainda.",
    newCallReady: "Novo acionamento pronto.",
    newMassivaReady: "Nova massiva pronta.",
    manualModeStarted: "Modo manual iniciado.",
    fieldsCleared: "Campos limpos.",
    fileGenerated: "Arquivo .txt gerado.",
    defaultsSaved: "Padrões salvos neste navegador.",
    localServerNote: "Abra por um servidor local para carregar CNL/parceiros automaticamente.",
    
    // Mensagens de cobrança
    charge0: "{greeting}, temos alguma atualização deste chamado{designator} ?",
    charge1: "{greeting}, circuito{designator} permanece indisponível.",
    charge2: "{greeting} prezados temos atualizações do chamado{designator} ?",
    charge3: "{greeting}, {carrier}, seguimos no aguardo de atualização do chamado{designator}.",
    charge4: "{greeting}, validado circuito/host normalizado. Temos RFO ou causa raiz?",
    
    // E-mail
    goodMorning: "Bom dia",
    goodAfternoon: "Boa tarde",
    goodEvening: "Boa noite",
    waitingForProtocol: "Ficamos no aguardo do protocolo",
    bestRegards: "Atenciosamente",
    
    // Telebras
    circuit: "Circuito",
    fullName: "Nome completo",
    institutionName: "Nome da instituição",
    contactPerson: "Pessoa para contato(nome, telefone com DDD e Email)",
    problemDateTime: "Data e hora do problema",
    
    // Contato
    partnerLabel: "Parceiro",
    emailLabel: "E-mail",
    phoneChannelLabel: "Telefone/Canal",
    portalLabel: "Portal",
    userLabel: "Usuário",
    passwordLabel: "Senha",
    obsLabel: "Obs",
    noContactRegistered: "Sem contato cadastrado para {partner}.",
    selectPartnerContact: "Selecione um parceiro para ver contatos.",
    
    // Ações
    activateInfra: "Acionar Infra para validação local do equipamento, energia, hardware e logs de reboot.",
    activateTx: "Acionar TX/Transporte para validar os enlaces, equipamentos B e portas B indicados nas descrições.",
    activateMetro: "Acionar a equipe de Rede Metro para validar a interligação local e a topologia do POP.",
    activateCapacity: "Acionar a equipe responsável pela capacidade para validar o circuito e a entrega monitorada.",
    validateManagement: "Validar a gerência do equipamento, conectividade de gestão e disponibilidade do dispositivo.",
    correlateEvents: "Correlacionar os eventos no mesmo intervalo para confirmar se há isolamento de site ou múltiplos incidentes independentes.",
    validateResponsible: "Validar também o trecho sob responsabilidade de {responsible}, somente se confirmado pela topologia e pelo circuito.",
    validateTopology: "Validar topologia, correlação temporal e novos alarmes antes de definir acionamento externo.",
    attachEvidence: "Anexar as evidências abaixo no chamado e atualizar conforme retorno das áreas acionadas.",
    
    // Zabbix
    consultingZabbix: "Consultando Zabbix...",
    zabbixError: "Erro na consulta do Zabbix.",
    zabbixNotConfigured: "Zabbix não configurado.",
    noHostsFound: "Nenhum host correspondente encontrado no Zabbix.",
    informHostToConsult: "Informe ao menos um host para consultar o Zabbix.",
    
    // Massivas em desenvolvimento
    massivasInDevelopment: "Massivas em desenvolvimento",
    massivasDevText: "Este fluxo ainda está em desenvolvimento.",
    understood: "Entendi",
    
    // ALPHA/TESTES
    alphaTests: "ALPHA/TESTES",
    pasteHostsAlarmsDebug: "Colar hosts, alarmes e debug",
    hostsMassiva: "Hosts da massiva",
    hostsPlaceholder: "Cole um host por linha",
    alarmsDebugManual: "Alarmes / debug manual",
    debugPlaceholder: "Cole aqui os alarmes retornados pelo Zabbix para testar a análise sem consultar a API",
    zabbixNote: "Ao consultar, a ferramenta busca o Zabbix em modo somente leitura. Se houver alarmes colados, usa o debug manual.",
    consultZabbixAdvance: "Consultar Zabbix e avançar",
    testManualAnalysis: "Testar análise manual",
    reviewAnalysis: "Revisar análise gerada",
    analysisTextNote: "O texto começa com ### ANÁLISE DA MASSIVA ### e já traz conclusão, direcionamento e evidências.",
    
    // Campos obrigatórios
    requiredFields: {
      externalOrInternalTicket: "Protocolo externo ou chamado interno",
      greeting: "Saudação",
      carrierOrPartner: "Operadora/parceiro",
      failureTypeField: "Tipo de falha",
      hostnameA: "Hostname A",
      hostnameBSingleMode: "Hostname B ou modo ponta única",
      internalTicketField: "Chamado interno",
      bdeskDescription: "Descrição Bdesk",
      alarmsEvent: "Alarmes/evento",
      symptom: "Sintoma/reclamação",
      diagnosisField: "Diagnóstico",
      facilitiesField: "Facilidades",
      actionTakenField: "Ação tomada",
      nextActionField: "Próxima ação",
      partnerField: "Parceiro",
      spokenWithField: "Falado com",
      channelField: "Canal",
      forecastField: "Previsão",
      recipientsField: "Destinatários",
      designationsField: "Designações",
      originField: "Origem",
      destinationField: "Destino",
      failureTimeField: "Horário da falha",
      contactField: "Contato",
      contactRegistered: "Contato cadastrado",
      massivaBdeskSubject: "Assunto Bdesk da massiva",
      whatWasSpokenField: "O que foi falado",
      circuitDesignation: "Circuito/designação",
      telebrasName: "Nome Telebras",
    },
    
    // Títulos de preview
    previewTitles: {
      description: "Descrição Bdesk",
      recognize: "Reconhecer alarmes",
      opening: "Abertura NOC",
      update: "Atualização NOC",
      email: "E-mail / Solicitação",
      subject: "Assunto",
      recipients: "Destinatários",
      contact: "Contato do parceiro",
      massivasRecognize: "Reconhecer massiva",
      massivasUpdate: "Atualizacao massiva",
      charge0: "Mensagem padrão",
      charge1: "Mensagem padrão",
      charge2: "Mensagem padrão",
      charge3: "Mensagem padrão",
      charge4: "Mensagem padrão",
      complete: "Carimbo completo",
    },
    
    // Outros
    completeFieldsToGenerate: "Complete os campos para gerar:\n- {fields}",
    fillDataToPreview: "Preencha os dados para gerar a prévia.",
    fillStepData: "Preencha os dados do passo atual para gerar este texto.",
    complete: "Complete: {fields}.",
    copyComplete: "Copiado para a área de transferência.",
    copiedBySelection: "Texto copiado pela seleção.",
    copiedAsText: "Abertura copiada como texto; topologia copiada como imagem.",
    openingCopiedTextOnly: "Abertura copiada como texto. Não foi possível anexar a imagem.",
    clearFields: "Limpar campos?",
    clearFieldsConfirm: "Os alarmes e campos detectados serão apagados.",
    noForecast: "Sem previsão",
    host: "HOST",
    topologyCanvas: "TOPOLOGIA DA MASSIVA",
    pasteAlarmsToViewTopology: "Cole os alarmes para visualizar a topologia",
    noAlarmReturned: "- Nenhum alarme retornado.",
    noValidEvidence: "Nenhuma evidência válida identificada.",
    alarmWithoutFields: "alarme sem campos estruturados",
    evidence: "Evidência",
    withoutActiveAlarms: "Sem alarmes ativos retornados para os hosts informados. Validar se os hostnames foram colados conforme cadastro do Zabbix ou se a falha já normalizou antes da consulta.",
    noHostnameIdentified: "Nenhum hostname no padrão BR-UF-CNL-POP-FUNÇÃO-NN foi identificado nos alarmes.",
    oldestStart: "Início mais antigo identificado: {time}.",
    identifiedDomains: "Domínios identificados: {domains}.",
    statusStates: "Estados dos alarmes: {statuses}",
    causesToInvestigate: "Causas a investigar: {causes}",
    triggerTypes: "Tipos de gatilho",
    deliveryTypes: "Tipos de entrega",
    technicalData: "Dados técnicos: {data}",
    operatorsIdentified: "Operadoras/responsáveis identificados: {operators}",
    multipleAffections: "INDISPONIBILIDADE - MÚLTIPLAS AFETAÇÕES",
    normalized: "INDISPONIBILIDADE NORMALIZADA",
    manualAnalysisGenerated: "Análise manual de massiva gerada.",
    pasteAlarmsDebugField: "Cole os alarmes no campo de debug.",
    completeFieldsFirst: "Complete os campos antes de baixar.",
    noAlarmReturnedForHosts: "Nenhum alarme retornado.",

    // Animações, carregamento e estado
    loading: "Processando...",
    analyzingTopology: "Construindo topologia da rede...",
    fetchingCity: "Identificando localidade...",
    processingAlarms: "Organizando alarmes...",
    
    // Telas de erro personalizadas
    errorTitle: "Falha na Operação",
    errorOccurred: "Ocorreu um erro inesperado durante a execução.",
    errorDiagnosis: "Diagnóstico técnico:",
    errorDetails: "Detalhes do erro",
    copyErrorDetails: "Copiar detalhes do erro",
    tryAgain: "Tentar novamente",
    close: "Fechar",
    errorCopied: "Detalhes do erro copiados para a área de transferência.",
    
    // Atualização de versão e cache
    newVersionTitle: "Nova Versão Disponível",
    newVersionAvailable: "Uma nova versão do sistema foi disponibilizada.",
    updateAndClearCache: "Atualizar e Limpar Cache",
    updatingApp: "Limpando cache e atualizando...",
    cacheCleanedReloading: "Cache limpo com sucesso! Recarregando sistema...",
  },
  
  en: {
    // Language
    langName: "English",
    language: "Language",
    
    // Title and branding
    appTitle: "NOC IP TOOL",
    developedBy: "Developed by Alexsander",
    version: "Version 3.7.1",
    versionPrefix: "Version",
    
    // Changelog
    changelog: "Changelog",
    changelogIntro: "IP tool for capacities and massives with alarm analysis and guided flow.",
    changelogItem1: "Capabilities flow with opening, Bdesk, recognition, email and finalization.",
    changelogItem2: "Massives flow with alarm analysis, recognition and direct update.",
    changelogItem3: "Backbone network topology with 3D nodes and city/POP resolution.",
    changelogItem4: "Affected host extraction directly from link description.",
    changelogItem5: "Anti-flicker loading animations and diagnostic error modal.",
    changelogItem6: "Auto-updater with cache purge and refined light/dark themes.",
    futureFeatures: "Future features",
    futureFeature1: "Dynamic topology with automatic and adaptive learning",
    
    // Main buttons
    capabilities: "Capabilities",
    massivas: "MASSIVAS",
    parameters: "Parameters",
    
    // Navigation
    home: "Home",
    manualEdit: "Manual edit",
    autoFlow: "Auto flow",
    step: "Step",
    of: "of",
    
    // Auto flow - Step 1
    alarms: "Alarms",
    pasteAlarms: "Paste alarms and confirm data",
    alarmsPlaceholder: "Paste alarms here",
    partner: "Partner",
    failureType: "Failure type",
    confirmData: "Confirm data",
    
    // Auto flow - Step 2
    bdeskOpening: "Bdesk and opening",
    generateInitialTexts: "Generate initial texts",
    bdeskSubject: "Bdesk Subject",
    openingText: "Opening text",
    back: "Back",
    nextStep: "Next step",
    
    // Auto flow - Step 3
    internalTicket: "Internal ticket",
    pasteTicket: "Paste ticket and recognize alarms",
    internalTicketPlaceholder: "588604",
    recognizeAlarms: "Recognize alarms",
    
    // Auto flow - Step 4
    email: "Email",
    generateEmail: "Generate email notification",
    subject: "Subject",
    recipients: "Recipients",
    
    // Auto flow - Step 5
    finalization: "Finalization",
    concludeService: "Conclude service",
    finishAndReturn: "Finish and return to start",
    
    // Massivas flow
    massivasFlow: "Massivas flow",
    pasteAlarmsOrganize: "Paste alarms and organize hosts",
    massivasAlarmsPlaceholder: "Paste alarms here to organize by host",
    separatedHosts: "Automatically separated hosts",
    hostsPlaceholder: "Identified hosts appear here",
    topology: "Massiva topology",
    topologyDesc: "Origin, equipment B and identified interfaces",
    openingTextMassiva: "Massiva opening text",
    openingPlaceholder: "The opening will be generated from pasted alarms",
    copyOpeningTopology: "Copy opening and topology",
    goToTicket: "Go to ticket",
    prepareMassivaTexts: "Prepare massiva texts",
    bdeskSubjectMassiva: "Massiva Bdesk subject",
    bdeskSubjectPlaceholder: "Paste the complete Bdesk subject to generate recognition with Aut Bdesk:#",
    recognizeMassivaAlarms: "Recognize massiva alarms",
    phoneGroup: "Phone/Group",
    phoneGroupPlaceholder: "Phone, group or channel activated",
    txInfraTicket: "TX / INFRA ticket",
    txInfraPlaceholder: "Ticket or protocol of the activated area",
    spokenWith: "Spoken with",
    spokenWithPlaceholder: "NOC / TX / Partner",
    forecast: "Forecast",
    forecastPlaceholder: "No forecast",
    nextAction: "Next action",
    nextActionPlaceholder: "Wait for feedback and update ticket",
    whatWasSpoken: "What was spoken",
    whatWasSpokenPlaceholder: "Describe the feedback, guidance or evidence provided",
    massivaUpdate: "Massiva update",
    goToFinalization: "Go to finalization",
    concludeRestart: "Conclude and restart flow",
    finishReturnStart: "Finish and return to start",
    
    // Manual workspace
    readyToGenerate: "Ready to generate.",
    alarmsEventEvidence: "Alarms, event or evidence",
    alarmsEventPlaceholder: "Paste alarms here. Extraction happens automatically.",
    carrier: "Carrier",
    internalTicket: "Internal ticket",
    externalTicket: "External ticket",
    externalTicketPlaceholder: "EVE260500076687",
    
    // Advanced fields
    detectedFieldsAdjustments: "Detected fields and adjustments",
    bdeskDescription: "Bdesk Description",
    fiber: "Fiber",
    mode: "Mode",
    auto: "Automatic",
    singleEnd: "Single end",
    twoEnds: "Two ends",
    hostnameA: "Hostname A",
    hostnameAPlaceholder: "BR-RJ-RJO-CTL-TP-02",
    hostnameB: "Hostname B",
    hostnameBPlaceholder: "BR-SP-SPO-CTL-TP-04",
    circuitData: "Circuit data",
    designations: "Designations",
    designationsPlaceholder: "CAP:TIM:RJOCOACAP287332-CID:581006",
    bdeskIdentification: "Bdesk Identification",
    bdeskTitlePlaceholder: "RJ::IND::RIO DE JANEIRO_CTL<>SAO PAULO_CTL::ONLY::TIM",
    origin: "Origin",
    originPlaceholder: "RIO DE JANEIRO",
    destination: "Destination",
    destinationPlaceholder: "SAO PAULO",
    failureTime: "Failure time",
    failureTimePlaceholder: "15/05/2026 13:54",
    nocStamp: "NOC Stamp",
    symptomComplaint: "Symptom/complaint",
    diagnosis: "Diagnosis",
    facilities: "Facilities",
    actionTaken: "Action taken",
    nextAction: "Next action",
    spokenWith: "Spoken with",
    channel: "Channel",
    forecast: "Forecast",
    phoneExtra: "Phone/extra channel",
    phoneExtraPlaceholder: "0800 880 7000",
    emailBilling: "Email and billing",
    copyTo: "Copy",
    greeting: "Greeting",
    outageType: "Outage type",
    
    // Copy buttons
    copyModels: "Copy models",
    opening: "Opening",
    update: "Update",
    contact: "Contact",
    standardMessages: "Standard messages",
    updateQuestion: "Update?",
    unavailable: "Unavailable",
    dearAll: "Dear all?",
    returnMsg: "Return",
    rfoQuestion: "RFO?",
    preview: "Preview",
    previewPlaceholder: "Hover over a button to see a preview.",
    
    // Parameters dialog
    defaultParameters: "Default parameters",
    analystContactName: "Analyst contact and name",
    parametersInfo: "When filled, these data are saved locally and become the tool default.",
    analystContact: "Analyst contact",
    analystContactPlaceholder: "+55 (11) 94706-4266",
    analystName: "Analyst name",
    analystNamePlaceholder: "YOUR NAME HERE",
    useEmojisText: "Use emojis in operational texts",
    darkTheme: "Dark theme",
    cancel: "Cancel",
    saveParameters: "Save parameters",
    
    // Generated texts
    nocOpening: "NOC OPENING",
    nocUpdate: "NOC UPDATE",
    symptomReclamation: "SYMPTOM/COMPLAINT",
    facilitiesLabel: "FACILITIES",
    actionTakenLabel: "ACTION TAKEN",
    nextActionLabel: "NEXT ACTION",
    spokenWithLabel: "SPOKEN WITH",
    whatWasSpokenLabel: "WHAT WAS SPOKEN",
    forecastLabel: "FORECAST",
    phoneLabel: "PHONE",
    massivaOpening: "MASSIVA OPENING",
    massivaUpdate: "MASSIVA UPDATE",
    failureReported: "FAILURE REPORTED",
    diagnosisLabel: "DIAGNOSIS",
    evidenceOrganized: "ORGANIZED EVIDENCE",
    massivaAnalysis: "MASSIVA ANALYSIS - ALPHA/TESTS",
    analysisLabel: "ANALYSIS",
    normalizationForecast: "NORMALIZATION FORECAST",
    directioning: "DIRECTIONING",
    
    // Status messages
    dataExtracted: "Data extracted from event. Review origin, destination and designations before copying.",
    dataLoaded: "Description data loaded.",
    parametersSaved: "Parameters saved locally.",
    textCopied: "Text copied.",
    nothingToCopy: "Nothing to copy yet.",
    newCallReady: "New activation ready.",
    newMassivaReady: "New massiva ready.",
    manualModeStarted: "Manual mode started.",
    fieldsCleared: "Fields cleared.",
    fileGenerated: ".txt file generated.",
    defaultsSaved: "Defaults saved in this browser.",
    localServerNote: "Open through a local server to load CNL/partners automatically.",
    
    // Charge messages
    charge0: "{greeting}, do we have any updates on this ticket{designator}?",
    charge1: "{greeting}, circuit{designator} remains unavailable.",
    charge2: "{greeting} dear all, do we have updates on ticket{designator}?",
    charge3: "{greeting}, {carrier}, we are waiting for ticket{designator} update.",
    charge4: "{greeting}, circuit/host normalized. Do we have RFO or root cause?",
    
    // Email
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    waitingForProtocol: "We are waiting for the protocol",
    bestRegards: "Best regards",
    
    // Telebras
    circuit: "Circuit",
    fullName: "Full name",
    institutionName: "Institution name",
    contactPerson: "Contact person(name, phone with area code and Email)",
    problemDateTime: "Problem date and time",
    
    // Contact
    partnerLabel: "Partner",
    emailLabel: "Email",
    phoneChannelLabel: "Phone/Channel",
    portalLabel: "Portal",
    userLabel: "User",
    passwordLabel: "Password",
    obsLabel: "Note",
    noContactRegistered: "No contact registered for {partner}.",
    selectPartnerContact: "Select a partner to view contacts.",
    
    // Actions
    activateInfra: "Activate Infra for local validation of equipment, power, hardware and reboot logs.",
    activateTx: "Activate TX/Transport to validate links, equipment B and port B indicated in descriptions.",
    activateMetro: "Activate Metro team to validate local interconnection and POP topology.",
    activateCapacity: "Activate the capacity team to validate the circuit and monitored delivery.",
    validateManagement: "Validate equipment management, management connectivity and device availability.",
    correlateEvents: "Correlate events in the same interval to confirm if there is site isolation or multiple independent incidents.",
    validateResponsible: "Also validate the section under responsibility of {responsible}, only if confirmed by topology and circuit.",
    validateTopology: "Validate topology, temporal correlation and new alarms before defining external activation.",
    attachEvidence: "Attach the evidence below to the ticket and update according to feedback from activated areas.",
    
    // Zabbix
    consultingZabbix: "Consulting Zabbix...",
    zabbixError: "Error consulting Zabbix.",
    zabbixNotConfigured: "Zabbix not configured.",
    noHostsFound: "No matching host found in Zabbix.",
    informHostToConsult: "Enter at least one host to consult Zabbix.",
    
    // Massivas in development
    massivasInDevelopment: "Massivas in development",
    massivasDevText: "This flow is still under development.",
    understood: "Understood",
    
    // ALPHA/TESTS
    alphaTests: "ALPHA/TESTS",
    pasteHostsAlarmsDebug: "Paste hosts, alarms and debug",
    hostsMassiva: "Massiva hosts",
    hostsPlaceholder: "Paste one host per line",
    alarmsDebugManual: "Alarms / manual debug",
    debugPlaceholder: "Paste here the alarms returned by Zabbix to test the analysis without consulting the API",
    zabbixNote: "When consulting, the tool searches Zabbix in read-only mode. If there are pasted alarms, it uses manual debug.",
    consultZabbixAdvance: "Consult Zabbix and advance",
    testManualAnalysis: "Test manual analysis",
    reviewAnalysis: "Review generated analysis",
    analysisTextNote: "The text starts with ### MASSIVA ANALYSIS ### and already brings conclusion, direction and evidence.",
    
    // Required fields
    requiredFields: {
      externalOrInternalTicket: "External ticket or internal ticket",
      greeting: "Greeting",
      carrierOrPartner: "Carrier/partner",
      failureTypeField: "Failure type",
      hostnameA: "Hostname A",
      hostnameBSingleMode: "Hostname B or single end mode",
      internalTicketField: "Internal ticket",
      bdeskDescription: "Bdesk description",
      alarmsEvent: "Alarms/event",
      symptom: "Symptom/complaint",
      diagnosisField: "Diagnosis",
      facilitiesField: "Facilities",
      actionTakenField: "Action taken",
      nextActionField: "Next action",
      partnerField: "Partner",
      spokenWithField: "Spoken with",
      channelField: "Channel",
      forecastField: "Forecast",
      recipientsField: "Recipients",
      designationsField: "Designations",
      originField: "Origin",
      destinationField: "Destination",
      failureTimeField: "Failure time",
      contactField: "Contact",
      contactRegistered: "Registered contact",
      massivaBdeskSubject: "Massiva Bdesk subject",
      whatWasSpokenField: "What was spoken",
      circuitDesignation: "Circuit/designation",
      telebrasName: "Telebras name",
    },
    
    // Preview titles
    previewTitles: {
      description: "Bdesk Description",
      recognize: "Recognize alarms",
      opening: "NOC Opening",
      update: "NOC Update",
      email: "Email / Request",
      subject: "Subject",
      recipients: "Recipients",
      contact: "Partner contact",
      massivasRecognize: "Recognize massiva",
      massivasUpdate: "Massiva update",
      charge0: "Standard message",
      charge1: "Standard message",
      charge2: "Standard message",
      charge3: "Standard message",
      charge4: "Standard message",
      complete: "Complete stamp",
    },
    
    // Others
    completeFieldsToGenerate: "Complete the fields to generate:\n- {fields}",
    fillDataToPreview: "Fill in the data to generate the preview.",
    fillStepData: "Fill in the current step data to generate this text.",
    complete: "Complete: {fields}.",
    copyComplete: "Copied to clipboard.",
    copiedBySelection: "Text copied by selection.",
    copiedAsText: "Opening copied as text; topology copied as image.",
    openingCopiedTextOnly: "Opening copied as text. Could not attach image.",
    clearFields: "Clear fields?",
    clearFieldsConfirm: "Alarms and detected fields will be deleted.",
    noForecast: "No forecast",
    host: "HOST",
    topologyCanvas: "MASSIVA TOPOLOGY",
    pasteAlarmsToViewTopology: "Paste alarms to view topology",
    noAlarmReturned: "- No alarm returned.",
    noValidEvidence: "No valid evidence identified.",
    alarmWithoutFields: "alarm without structured fields",
    evidence: "Evidence",
    withoutActiveAlarms: "No active alarms returned for the informed hosts. Validate if the hostnames were pasted according to Zabbix registration or if the failure already normalized before the consultation.",
    noHostnameIdentified: "No hostname in the BR-UF-CNL-POP-FUNCTION-NN pattern was identified in the alarms.",
    oldestStart: "Oldest start identified: {time}.",
    identifiedDomains: "Identified domains: {domains}.",
    statusStates: "Alarm states: {statuses}",
    causesToInvestigate: "Causes to investigate: {causes}",
    triggerTypes: "Trigger types",
    deliveryTypes: "Delivery types",
    technicalData: "Technical data: {data}",
    operatorsIdentified: "Identified operators/responsible: {operators}",
    multipleAffections: "UNAVAILABILITY - MULTIPLE AFFECTATIONS",
    normalized: "NORMALIZED UNAVAILABILITY",
    manualAnalysisGenerated: "Manual massiva analysis generated.",
    pasteAlarmsDebugField: "Paste alarms in the debug field.",
    completeFieldsFirst: "Complete the fields before downloading.",
    noAlarmReturnedForHosts: "No alarm returned.",

    // Animations, loading and state
    loading: "Processing...",
    analyzingTopology: "Building network topology...",
    fetchingCity: "Resolving location...",
    processingAlarms: "Organizing alarms...",
    
    // Custom error screens
    errorTitle: "Operation Failed",
    errorOccurred: "An unexpected error occurred during execution.",
    errorDiagnosis: "Technical diagnosis:",
    errorDetails: "Error details",
    copyErrorDetails: "Copy error details",
    tryAgain: "Try again",
    close: "Close",
    errorCopied: "Error details copied to clipboard.",
    
    // Version update and cache
    newVersionTitle: "New Version Available",
    newVersionAvailable: "A new version of the system is available.",
    updateAndClearCache: "Update & Clear Cache",
    updatingApp: "Clearing cache and updating...",
    cacheCleanedReloading: "Cache cleared successfully! Reloading...",
  },
  
  es: {
    // Idioma
    langName: "Español",
    language: "Idioma",
    
    // Título y branding
    appTitle: "NOC IP TOOL",
    developedBy: "Developed by Alexsander",
    version: "Version 3.7.1",
    versionPrefix: "Version",
    
    // Changelog
    changelog: "Changelog",
    changelogIntro: "Herramienta IP para capacidades y masivas con análisis de alarmas con flujo guiado.",
    changelogItem1: "Flujo Capacidades con apertura, Bdesk, reconocimiento, email y finalización.",
    changelogItem2: "Flujo Masivas con análisis de alarmas, reconocimiento y actualización directa.",
    changelogItem3: "Topología de red Backbone con nodos en 3D y resolución de ciudad/POP.",
    changelogItem4: "Extracción del host afectado directamente de la descripción del enlace.",
    changelogItem5: "Animaciones de carga anti-flicker y pantalla de diagnóstico de errores.",
    changelogItem6: "Actualizador con purga de caché y temas claro/oscuro refinados.",
    futureFeatures: "Funcionalidades futuras",
    futureFeature1: "Topología dinámica con aprendizaje automático y adaptativo",
    
    // Botones principales
    capabilities: "Capacidades",
    massivas: "MASIVAS",
    parameters: "Parámetros",
    
    // Navegación
    home: "Inicio",
    manualEdit: "Edición manual",
    autoFlow: "Flujo automático",
    step: "Paso",
    of: "de",
    
    // Flujo automático - Paso 1
    alarms: "Alarmas",
    pasteAlarms: "Pegar alarmas y confirmar datos",
    alarmsPlaceholder: "Pega las alarmas aquí",
    partner: "Socio",
    failureType: "Tipo de falla",
    confirmData: "Confirmar datos",
    
    // Flujo automático - Paso 2
    bdeskOpening: "Bdesk y apertura",
    generateInitialTexts: "Generar textos iniciales",
    bdeskSubject: "Asunto Bdesk",
    openingText: "Texto de apertura",
    back: "Volver",
    nextStep: "Siguiente paso",
    
    // Flujo automático - Paso 3
    internalTicket: "Ticket interno",
    pasteTicket: "Pegar ticket y reconocer alarmas",
    internalTicketPlaceholder: "588604",
    recognizeAlarms: "Reconocer alarmas",
    
    // Flujo automático - Paso 4
    email: "Email",
    generateEmail: "Generar notificación por email",
    subject: "Asunto",
    recipients: "Destinatarios",
    
    // Flujo automático - Paso 5
    finalization: "Finalización",
    concludeService: "Concluir servicio",
    finishAndReturn: "Finalizar y volver al inicio",
    
    // Flujo masivas
    massivasFlow: "Flujo masivas",
    pasteAlarmsOrganize: "Pegar alarmas y organizar hosts",
    massivasAlarmsPlaceholder: "Pega las alarmas aquí para organizar por host",
    separatedHosts: "Hosts separados automáticamente",
    hostsPlaceholder: "Los hosts identificados aparecen aquí",
    topology: "Topología de la masiva",
    topologyDesc: "Origen, equipo B e interfaces identificadas",
    openingTextMassiva: "Texto de apertura de la masiva",
    openingPlaceholder: "La apertura se generará a partir de las alarmas pegadas",
    copyOpeningTopology: "Copiar apertura y topología",
    goToTicket: "Ir al ticket",
    prepareMassivaTexts: "Preparar textos de la masiva",
    bdeskSubjectMassiva: "Asunto Bdesk de la masiva",
    bdeskSubjectPlaceholder: "Pega el asunto Bdesk completo para generar el reconocimiento con Aut Bdesk:#",
    recognizeMassivaAlarms: "Reconocer alarmas de la masiva",
    phoneGroup: "Teléfono/Grupo",
    phoneGroupPlaceholder: "Teléfono, grupo o canal activado",
    txInfraTicket: "Ticket TX / INFRA",
    txInfraPlaceholder: "Ticket o protocolo del área activada",
    spokenWith: "Hablado con",
    spokenWithPlaceholder: "NOC / TX / Socio",
    forecast: "Previsión",
    forecastPlaceholder: "Sin previsión",
    nextAction: "Siguiente acción",
    nextActionPlaceholder: "Esperar retorno y actualizar ticket",
    whatWasSpoken: "Lo que se habló",
    whatWasSpokenPlaceholder: "Describe el retorno, orientación o evidencia proporcionada",
    massivaUpdate: "Actualización masiva",
    goToFinalization: "Ir a finalización",
    concludeRestart: "Concluir y reiniciar flujo",
    finishReturnStart: "Finalizar y volver al inicio",
    
    // Área de trabajo manual
    readyToGenerate: "Listo para generar.",
    alarmsEventEvidence: "Alarmas, evento o evidencia",
    alarmsEventPlaceholder: "Pega las alarmas aquí. La extracción ocurre automáticamente.",
    carrier: "Operadora",
    internalTicket: "Ticket interno",
    externalTicket: "Protocolo externo",
    externalTicketPlaceholder: "EVE260500076687",
    
    // Campos avanzados
    detectedFieldsAdjustments: "Campos detectados y ajustes",
    bdeskDescription: "Descripción Bdesk",
    fiber: "Fibra",
    mode: "Modo",
    auto: "Automático",
    singleEnd: "Punta única",
    twoEnds: "Dos puntas",
    hostnameA: "Hostname A",
    hostnameAPlaceholder: "BR-RJ-RJO-CTL-TP-02",
    hostnameB: "Hostname B",
    hostnameBPlaceholder: "BR-SP-SPO-CTL-TP-04",
    circuitData: "Datos del circuito",
    designations: "Designaciones",
    designationsPlaceholder: "CAP:TIM:RJOCOACAP287332-CID:581006",
    bdeskIdentification: "Identificación Bdesk",
    bdeskTitlePlaceholder: "RJ::IND::RIO DE JANEIRO_CTL<>SAO PAULO_CTL::ONLY::TIM",
    origin: "Origen",
    originPlaceholder: "RIO DE JANEIRO",
    destination: "Destino",
    destinationPlaceholder: "SAO PAULO",
    failureTime: "Horario de la falla",
    failureTimePlaceholder: "15/05/2026 13:54",
    nocStamp: "Sello NOC",
    symptomComplaint: "Síntoma/reclamación",
    diagnosis: "Diagnóstico",
    facilities: "Facilidades",
    actionTaken: "Acción tomada",
    nextAction: "Siguiente acción",
    spokenWith: "Hablado con",
    channel: "Canal",
    forecast: "Previsión",
    phoneExtra: "Teléfono/canal extra",
    phoneExtraPlaceholder: "0800 880 7000",
    emailBilling: "Email y cobranza",
    copyTo: "Copia",
    greeting: "Saludo",
    outageType: "Tipo de indisponibilidad",
    
    // Botones de copiar
    copyModels: "Copiar modelos",
    opening: "Apertura",
    update: "Actualización",
    contact: "Contacto",
    standardMessages: "Mensajes estándar",
    updateQuestion: "¿Actualización?",
    unavailable: "Indisponible",
    dearAll: "¿Estimados?",
    returnMsg: "Retorno",
    rfoQuestion: "¿RFO?",
    preview: "Vista previa",
    previewPlaceholder: "Pasa el mouse sobre un botón para ver una vista previa.",
    
    // Diálogo de parámetros
    defaultParameters: "Parámetros predeterminados",
    analystContactName: "Contacto y nombre del analista",
    parametersInfo: "Cuando se llenan, estos datos se guardan localmente y se convierten en el predeterminado de la herramienta.",
    analystContact: "Contacto del analista",
    analystContactPlaceholder: "+55 (11) 94706-4266",
    analystName: "Nombre del analista",
    analystNamePlaceholder: "TU NOMBRE AQUÍ",
    useEmojisText: "Usar emojis en textos operacionales",
    darkTheme: "Tema oscuro",
    cancel: "Cancelar",
    saveParameters: "Guardar parámetros",
    
    // Textos generados
    nocOpening: "APERTURA NOC",
    nocUpdate: "ACTUALIZACIÓN NOC",
    symptomReclamation: "SÍNTOMA/RECLAMACIÓN",
    facilitiesLabel: "FACILIDADES",
    actionTakenLabel: "ACCIÓN TOMADA",
    nextActionLabel: "SIGUIENTE ACCIÓN",
    spokenWithLabel: "HABLADO CON",
    whatWasSpokenLabel: "LO QUE SE HABLÓ",
    forecastLabel: "PREVISIÓN",
    phoneLabel: "TELÉFONO",
    massivaOpening: "APERTURA DE MASIVA",
    massivaUpdate: "ACTUALIZACIÓN DE MASIVA",
    failureReported: "FALLA REPORTADA",
    diagnosisLabel: "DIAGNÓSTICO",
    evidenceOrganized: "EVIDENCIAS ORGANIZADAS",
    massivaAnalysis: "ANÁLISIS DE MASIVA - ALPHA/PRUEBAS",
    analysisLabel: "ANÁLISIS",
    normalizationForecast: "PREVISIÓN DE NORMALIZACIÓN",
    directioning: "DIRECCIONAMIENTO",
    
    // Mensajes de estado
    dataExtracted: "Datos extraídos del evento. Revisa origen, destino y designaciones antes de copiar.",
    dataLoaded: "Datos de descripción cargados.",
    parametersSaved: "Parámetros guardados localmente.",
    textCopied: "Texto copiado.",
    nothingToCopy: "Nada para copiar aún.",
    newCallReady: "Nueva activación lista.",
    newMassivaReady: "Nueva masiva lista.",
    manualModeStarted: "Modo manual iniciado.",
    fieldsCleared: "Campos limpiados.",
    fileGenerated: "Archivo .txt generado.",
    defaultsSaved: "Predeterminados guardados en este navegador.",
    localServerNote: "Abre por un servidor local para cargar CNL/socios automáticamente.",
    
    // Mensajes de cobranza
    charge0: "{greeting}, ¿tenemos alguna actualización de este ticket{designator}?",
    charge1: "{greeting}, circuito{designador} permanece indisponible.",
    charge2: "{greeting} estimados, ¿tenemos actualizaciones del ticket{designator}?",
    charge3: "{greeting}, {carrier}, seguimos esperando actualización del ticket{designator}.",
    charge4: "{greeting}, circuito/host normalizado. ¿Tenemos RFO o causa raíz?",
    
    // Email
    goodMorning: "Buenos días",
    goodAfternoon: "Buenas tardes",
    goodEvening: "Buenas noches",
    waitingForProtocol: "Quedamos a la espera del protocolo",
    bestRegards: "Atentamente",
    
    // Telebras
    circuit: "Circuito",
    fullName: "Nombre completo",
    institutionName: "Nombre de la institución",
    contactPerson: "Persona de contacto(nombre, teléfono con DDD y Email)",
    problemDateTime: "Fecha y hora del problema",
    
    // Contacto
    partnerLabel: "Socio",
    emailLabel: "Email",
    phoneChannelLabel: "Teléfono/Canal",
    portalLabel: "Portal",
    userLabel: "Usuario",
    passwordLabel: "Contraseña",
    obsLabel: "Obs",
    noContactRegistered: "Sin contacto registrado para {partner}.",
    selectPartnerContact: "Selecciona un socio para ver contactos.",
    
    // Acciones
    activateInfra: "Activar Infra para validación local del equipo, energía, hardware y logs de reboot.",
    activateTx: "Activar TX/Transporte para validar los enlaces, equipos B y puertos B indicados en las descripciones.",
    activateMetro: "Activar el equipo de Red Metro para validar la interconexión local y la topología del POP.",
    activateCapacity: "Activar el equipo responsable por la capacidad para validar el circuito y la entrega monitoreada.",
    validateManagement: "Validar la gestión del equipo, conectividad de gestión y disponibilidad del dispositivo.",
    correlateEvents: "Correlacionar los eventos en el mismo intervalo para confirmar si hay aislamiento de sitio o múltiples incidentes independientes.",
    validateResponsible: "Validar también el tramo bajo responsabilidad de {responsible}, solamente si es confirmado por la topología y el circuito.",
    validateTopology: "Validar topología, correlación temporal y nuevas alarmas antes de definir activación externa.",
    attachEvidence: "Adjuntar las evidencias abajo en el ticket y actualizar conforme retorno de las áreas activadas.",
    
    // Zabbix
    consultingZabbix: "Consultando Zabbix...",
    zabbixError: "Error en la consulta de Zabbix.",
    zabbixNotConfigured: "Zabbix no configurado.",
    noHostsFound: "Ningún host correspondiente encontrado en Zabbix.",
    informHostToConsult: "Informa al menos un host para consultar Zabbix.",
    
    // Masivas en desarrollo
    massivasInDevelopment: "Masivas en desarrollo",
    massivasDevText: "Este flujo aún está en desarrollo.",
    understood: "Entendido",
    
    // ALPHA/PRUEBAS
    alphaTests: "ALPHA/PRUEBAS",
    pasteHostsAlarmsDebug: "Pegar hosts, alarmas y debug",
    hostsMassiva: "Hosts de la masiva",
    hostsPlaceholder: "Pega un host por línea",
    alarmsDebugManual: "Alarmas / debug manual",
    debugPlaceholder: "Pega aquí las alarmas retornadas por Zabbix para probar el análisis sin consultar la API",
    zabbixNote: "Al consultar, la herramienta busca Zabbix en modo solo lectura. Si hay alarmas pegadas, usa el debug manual.",
    consultZabbixAdvance: "Consultar Zabbix y avanzar",
    testManualAnalysis: "Probar análisis manual",
    reviewAnalysis: "Revisar análisis generado",
    analysisTextNote: "El texto comienza con ### ANÁLISIS DE MASIVA ### y ya trae conclusión, direccionamiento y evidencias.",
    
    // Campos obligatorios
    requiredFields: {
      externalOrInternalTicket: "Protocolo externo o ticket interno",
      greeting: "Saludo",
      carrierOrPartner: "Operadora/socio",
      failureTypeField: "Tipo de falla",
      hostnameA: "Hostname A",
      hostnameBSingleMode: "Hostname B o modo punta única",
      internalTicketField: "Ticket interno",
      bdeskDescription: "Descripción Bdesk",
      alarmsEvent: "Alarmas/evento",
      symptom: "Síntoma/reclamación",
      diagnosisField: "Diagnóstico",
      facilitiesField: "Facilidades",
      actionTakenField: "Acción tomada",
      nextActionField: "Siguiente acción",
      partnerField: "Socio",
      spokenWithField: "Hablado con",
      channelField: "Canal",
      forecastField: "Previsión",
      recipientsField: "Destinatarios",
      designationsField: "Designaciones",
      originField: "Origen",
      destinationField: "Destino",
      failureTimeField: "Horario de la falla",
      contactField: "Contacto",
      contactRegistered: "Contacto registrado",
      massivaBdeskSubject: "Asunto Bdesk de la masiva",
      whatWasSpokenField: "Lo que se habló",
      circuitDesignation: "Circuito/designación",
      telebrasName: "Nombre Telebras",
    },
    
    // Títulos de vista previa
    previewTitles: {
      description: "Descripción Bdesk",
      recognize: "Reconocer alarmas",
      opening: "Apertura NOC",
      update: "Actualización NOC",
      email: "Email / Solicitud",
      subject: "Asunto",
      recipients: "Destinatarios",
      contact: "Contacto del socio",
      massivasRecognize: "Reconocer masiva",
      massivasUpdate: "Actualización masiva",
      charge0: "Mensaje estándar",
      charge1: "Mensaje estándar",
      charge2: "Mensaje estándar",
      charge3: "Mensaje estándar",
      charge4: "Mensaje estándar",
      complete: "Sello completo",
    },
    
    // Otros
    completeFieldsToGenerate: "Completa los campos para generar:\n- {fields}",
    fillDataToPreview: "Completa los datos para generar la vista previa.",
    fillStepData: "Completa los datos del paso actual para generar este texto.",
    complete: "Completa: {fields}.",
    copyComplete: "Copiado al portapapeles.",
    copiedBySelection: "Texto copiado por selección.",
    copiedAsText: "Apertura copiada como texto; topología copiada como imagen.",
    openingCopiedTextOnly: "Apertura copiada como texto. No fue posible adjuntar la imagen.",
    clearFields: "¿Limpiar campos?",
    clearFieldsConfirm: "Las alarmas y campos detectados serán eliminados.",
    noForecast: "Sin previsión",
    host: "HOST",
    topologyCanvas: "TOPOLOGÍA DE MASIVA",
    pasteAlarmsToViewTopology: "Pega las alarmas para visualizar la topología",
    noAlarmReturned: "- Ninguna alarma retornada.",
    noValidEvidence: "Ninguna evidencia válida identificada.",
    alarmWithoutFields: "alarma sin campos estructurados",
    evidence: "Evidencia",
    withoutActiveAlarms: "Sin alarmas activas retornadas para los hosts informados. Validar si los hostnames fueron pegados conforme registro de Zabbix o si la falla ya se normalizó antes de la consulta.",
    noHostnameIdentified: "Ningún hostname en el patrón BR-UF-CNL-POP-FUNCION-NN fue identificado en las alarmas.",
    oldestStart: "Inicio más antiguo identificado: {time}.",
    identifiedDomains: "Dominios identificados: {domains}.",
    statusStates: "Estados de las alarmas: {statuses}",
    causesToInvestigate: "Causas a investigar: {causes}",
    triggerTypes: "Tipos de gatillo",
    deliveryTypes: "Tipos de entrega",
    technicalData: "Datos técnicos: {data}",
    operatorsIdentified: "Operadores/responsables identificados: {operators}",
    multipleAffections: "INDISPONIBILIDAD - MÚLTIPLES AFECTACIONES",
    normalized: "INDISPONIBILIDAD NORMALIZADA",
    manualAnalysisGenerated: "Análisis manual de masiva generado.",
    pasteAlarmsDebugField: "Pega las alarmas en el campo de debug.",
    completeFieldsFirst: "Completa los campos antes de descargar.",
    noAlarmReturnedForHosts: "Ninguna alarma retornada.",

    // Animaciones, carga y estado
    loading: "Procesando...",
    analyzingTopology: "Construyendo topología de red...",
    fetchingCity: "Identificando ubicación...",
    processingAlarms: "Organizando alarmas...",
    
    // Pantallas de error personalizadas
    errorTitle: "Fallo en la Operación",
    errorOccurred: "Ocurrió un error inesperado durante la ejecución.",
    errorDiagnosis: "Diagnóstico técnico:",
    errorDetails: "Detalles del error",
    copyErrorDetails: "Copiar detalles del error",
    tryAgain: "Intentar nuevamente",
    close: "Cerrar",
    errorCopied: "Detalles del error copiados al portapapeles.",
    
    // Actualización de versión y caché
    newVersionTitle: "Nueva Versión Disponible",
    newVersionAvailable: "Una nueva versión del sistema está disponible.",
    updateAndClearCache: "Actualizar y Limpiar Caché",
    updatingApp: "Limpiando caché y actualizando...",
    cacheCleanedReloading: "¡Caché limpiado con éxito! Recargando...",
  },
};

// Current language
let currentLang = localStorage.getItem("nocLang") || "pt";

// Translation function
function t(key, params = {}) {
  const keys = key.split(".");
  let value = translations[currentLang];
  
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // Fallback to Portuguese if translation not found
      value = translations.pt;
      for (const fk of keys) {
        if (value && typeof value === "object" && fk in value) {
          value = value[fk];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }
  
  if (typeof value !== "string") return key;
  
  // Replace parameters
  let result = value;
  for (const [paramKey, paramValue] of Object.entries(params)) {
    result = result.replace(new RegExp(`{${paramKey}}`, "g"), paramValue);
  }
  
  return result;
}

// Set language
function setLang(lang, event) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem("nocLang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "en" ? "en" : "es";
    updatePageTranslations();
    updateLangButtons();
  }
}

// Update language buttons
function updateLangButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

// Get current language
function getLang() {
  return currentLang;
}

// Update all page translations
function updatePageTranslations() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key === "version") {
      const prefix = t("versionPrefix") || "Version";
      const ver = typeof CURRENT_APP_VERSION !== "undefined" ? CURRENT_APP_VERSION : (t("version") || "3.4").replace(/^[^\d]*/, "");
      el.textContent = `${prefix} ${ver}`;
    } else {
      el.textContent = t(key);
    }
  });
  
  // Update all elements with data-i18n-placeholder attribute
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });
  
  // Update all elements with data-i18n-title attribute
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.dataset.i18nTitle;
    el.title = t(key);
  });
  
  // Update all elements with data-i18n-aria-label attribute
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.dataset.i18nAriaLabel;
    el.setAttribute("aria-label", t(key));
  });
  
  // Dispatch event for custom updates
  window.dispatchEvent(new CustomEvent("noc-lang-change", { detail: { lang: currentLang } }));
}

// Initialize language on load
document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
});
// Canned Grønt Flagg compliance content. Not live data — plausible but not verified.
window.AGG_CONTENT = {
  aiSteps: {
    'ihm-part-i': [
      'Leser dokumentmetadata og signaturer...',
      'Kryssjekker mot Grønt Flagg-kriterier for avfall...',
      'Validerer kildesorteringsrutine og avfallsplan...',
      'Kontrollerer kompostrutine og avfallsregnskap...',
      'Forhåndsvalidering fullført. 2 mindre merknader til Miljødirektoratet.',
    ],
    'marpol-annex-vi': [
      'Leser innkjøpsrutine og menyplan...',
      'Kryssjekker mot Grønt Flagg – Mat og helse...',
      'Validerer andel økologiske og kortreiste råvarer...',
      'Beregner klimavurdering for menyplanen...',
      'Forhåndsvalidering fullført. Klimavurdering: godkjent nivå.',
    ],
    'solas-xii': [
      'Leser vedlikeholdsplan og vernerunderapport...',
      'Kryssjekker mot forskrift om miljørettet helsevern §9...',
      'Validerer gjennomførte vedlikeholdstiltak...',
      'Forhåndsvalidering fullført.',
    ],
    'ism-code': [
      'Leser IK-Mat-håndbok og tilsynsrapport...',
      'Kryssjekker mot forskrift om næringsmiddelhygiene...',
      'Validerer siste tilsyn fra Mattilsynet...',
      'Forhåndsvalidering fullført.',
    ],
    'ballast-water': [
      'Leser installasjonsdokumentasjon for armaturer...',
      'Kryssjekker mot Grønt Flagg – Vann...',
      'Validerer vannforbrukslogg...',
      'Forhåndsvalidering fullført.',
    ],
    'default': [
      'Leser dokumentmetadata...',
      'Kryssjekker mot gjeldende kriterier...',
      'Validerer underlagsdokumentasjon...',
      'Forhåndsvalidering fullført.',
    ],
  },

  // Per-cert phased animation: {label, ms}. Total ~2.0-2.3s.
  aiPhases: {
    'ihm-part-i': [
      { label: 'Leser dokumentmetadata og signaturer...', ms: 600 },
      { label: 'Kryssjekker mot Grønt Flagg-kriterier for avfall...', ms: 800 },
      { label: 'Validerer avfallsregnskap og kildesorteringsrutine...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'marpol-annex-vi': [
      { label: 'Leser innkjøpsrutine og menyplan...', ms: 600 },
      { label: 'Kryssjekker mot Grønt Flagg – Mat og helse...', ms: 800 },
      { label: 'Validerer klimavurdering av menyplanen...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'iopp': [
      { label: 'Leser energikartleggingsrapport...', ms: 600 },
      { label: 'Kryssjekker mot Grønt Flagg – Energi...', ms: 800 },
      { label: 'Validerer forbruksdata for strøm og varme...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'eu-ets': [
      { label: 'Leser energiregnskap og måleravlesninger...', ms: 600 },
      { label: 'Kryssjekker mot Miljøfyrtårn-kriterium for energi...', ms: 800 },
      { label: 'Validerer sammenligning mot referanseår...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'cii-rating': [
      { label: 'Leser enøk-tiltaksliste...', ms: 600 },
      { label: 'Kryssjekker mot Grønt Flagg – Energi...', ms: 800 },
      { label: 'Validerer effekt av nattsenking per avdeling...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'ism-code': [
      { label: 'Leser IK-Mat-håndbok og temperaturlogg...', ms: 600 },
      { label: 'Kryssjekker mot forskrift om næringsmiddelhygiene...', ms: 800 },
      { label: 'Validerer siste tilsynsrapport fra Mattilsynet...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'solas-xii': [
      { label: 'Leser vedlikeholdsplan for bygget...', ms: 600 },
      { label: 'Kryssjekker mot forskrift om miljørettet helsevern §9...', ms: 800 },
      { label: 'Validerer vernerunderapport...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'solas-v': [
      { label: 'Leser årsplan 2025–2026...', ms: 600 },
      { label: 'Kryssjekker mot Rammeplan – Bærekraftig utvikling...', ms: 800 },
      { label: 'Validerer referater fra miljøråd...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'afs': [
      { label: 'Leser kartleggingsrapport for uteområdet...', ms: 600 },
      { label: 'Kryssjekker mot Grønt Flagg – Naturmangfold...', ms: 800 },
      { label: 'Validerer innkjøpsrutine for lekeapparater...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'bwm': [
      { label: 'Leser installasjonsdokumentasjon for armaturer...', ms: 600 },
      { label: 'Kryssjekker mot Grønt Flagg – Vann...', ms: 800 },
      { label: 'Validerer vannforbrukslogg...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'lsa': [
      { label: 'Leser øvelseslogg og kontrollrapporter...', ms: 600 },
      { label: 'Kryssjekker mot forskrift om brannforebygging...', ms: 800 },
      { label: 'Validerer siste kontroll av slokkeutstyr...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'mlc': [
      { label: 'Leser renholdsplan og produktoversikt...', ms: 600 },
      { label: 'Kryssjekker mot forskrift om miljørettet helsevern §13...', ms: 800 },
      { label: 'Validerer miljømerking av renholdsprodukter...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'mlc-title-4': [
      { label: 'Leser smittevernrutiner og opplæringslogg...', ms: 600 },
      { label: 'Kryssjekker mot forskrift om miljørettet helsevern §17...', ms: 800 },
      { label: 'Validerer sjekkliste for stellerom...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
    'default': [
      { label: 'Leser dokumentmetadata...', ms: 600 },
      { label: 'Kryssjekker mot Grønt Flagg-kriterier...', ms: 800 },
      { label: 'Validerer underlagsdokumentasjon...', ms: 600 },
      { label: 'Ferdig — 3 funn klare for gjennomgang.', ms: 300 },
    ],
  },

  // Findings bullets shown inline after AI validation completes.
  aiFindings: {
    'ihm-part-i': [
      { kind: 'ok', text: 'Avfallsplanen følger Grønt Flagg-malen for avfall' },
      { kind: 'ok', text: 'Kildesorteringsrutine dokumentert for alle avdelinger' },
      { kind: 'warn', text: 'Avfallsregnskap for 2026 mangler tall for mars — manuell gjennomgang anbefales' },
    ],
    'marpol-annex-vi': [
      { kind: 'ok', text: 'Innkjøpsrutine dokumenterer andel økologiske råvarer' },
      { kind: 'ok', text: 'Menyplan for våren 2026 foreligger med klimavurdering' },
      { kind: 'warn', text: 'Andel kortreist mat er på grensen til kriteriekravet — merknad til Miljødirektoratet' },
    ],
    'iopp': [
      { kind: 'ok', text: 'Energikartleggingens omfang dekker alle fire avdelinger' },
      { kind: 'ok', text: 'Forbruksdata for strøm og varme dokumentert' },
      { kind: 'warn', text: 'Tiltaksplan energi mangler signatur fra styrer — manuell gjennomgang anbefales' },
    ],
    'eu-ets': [
      { kind: 'ok', text: 'Energiregnskapet følger Miljøfyrtårn-malen' },
      { kind: 'ok', text: 'Måleravlesninger registrert månedlig gjennom 2025' },
      { kind: 'warn', text: 'Sammenligning mot referanseår ufullstendig for fjerde kvartal' },
    ],
    'cii-rating': [
      { kind: 'ok', text: 'Enøk-tiltakslisten samsvarer med Grønt Flagg – Energi' },
      { kind: 'ok', text: 'Temperaturstyringsplan dokumentert for to avdelinger' },
      { kind: 'warn', text: 'Effektmåling av nattsenking mangler for to avdelinger — manuell gjennomgang anbefales' },
    ],
    'ism-code': [
      { kind: 'ok', text: 'IK-Mat-håndbok oppdatert og revidert' },
      { kind: 'ok', text: 'Tilsynsrapport fra Mattilsynet uten avvik' },
      { kind: 'ok', text: 'Temperaturlogg for kjøl og frys komplett siste 12 måneder' },
    ],
    'solas-xii': [
      { kind: 'ok', text: 'Vedlikeholdsplanen er oppdatert og signert' },
      { kind: 'ok', text: 'Vernerunde gjennomført uten avvik' },
      { kind: 'ok', text: 'Tiltak lukket innen frist per forskrift om miljørettet helsevern §9' },
    ],
    'solas-v': [
      { kind: 'ok', text: 'Bærekraftig utvikling er integrert i årsplanen' },
      { kind: 'ok', text: 'Referater fra miljøråd med barna foreligger' },
      { kind: 'warn', text: 'Evaluering av miljøpedagogiske aktiviteter eldre enn 12 måneder — planlegg oppdatering' },
    ],
    'afs': [
      { kind: 'ok', text: 'Kartleggingsrapport dekker hele uteområdet' },
      { kind: 'ok', text: 'Innkjøpsrutine for lekeapparater dokumentert' },
      { kind: 'ok', text: 'Ingen trykkimpregnert virke eller gummigranulat påvist' },
    ],
    'bwm': [
      { kind: 'ok', text: 'Installasjonsdokumentasjon samsvarer med monterte armaturer' },
      { kind: 'ok', text: 'Vannforbruk innenfor målsatt nivå' },
      { kind: 'ok', text: 'Vannforbrukslogg komplett for siste 12 måneder' },
    ],
    'lsa': [
      { kind: 'ok', text: 'Øvelseslogg signert av brannvernleder' },
      { kind: 'warn', text: 'Årskontroll av slokkeutstyr forfaller innen 60 dager' },
      { kind: 'ok', text: 'Evakueringsplan oppslått i alle avdelinger' },
    ],
    'mlc': [
      { kind: 'ok', text: 'Renholdsplan signert av daglig leder' },
      { kind: 'ok', text: 'Produktoversikt med miljømerking oppdatert siste 12 måneder' },
      { kind: 'ok', text: 'Miljømerkede produkter i bruk i alle avdelinger' },
    ],
    'mlc-title-4': [
      { kind: 'ok', text: 'Smittevernrutinen følger kommunens veileder' },
      { kind: 'warn', text: 'Opplæringslogg for håndhygiene mangler to nyansatte — oppdatering pågår' },
      { kind: 'warn', text: 'Sjekkliste for stellerom må re-verifiseres mot forskriften §17' },
    ],
    'default': [
      { kind: 'ok', text: 'Dokumentformatet følger gjeldende kriterium' },
      { kind: 'ok', text: 'Underlagsdokumentasjon verifisert mot Grønt Flagg-registeret' },
      { kind: 'warn', text: 'Ett mindre punkt flagget for Miljødirektoratets gjennomgang' },
    ],
  },

  dnvNotes: {
    'ihm-part-i': 'Kildesorteringsrutine og avfallsplan verifisert mot Grønt Flagg-kriteriene. Kompostrutine dokumentert for alle avdelinger. Mindre formatavvik i avfallsregnskapet (mars) — anbefales godkjent med merknad.',
    'marpol-annex-vi': 'Innkjøpsrutine og menyplan med klimavurdering i orden. Andel økologiske råvarer dokumentert. Anbefaler godkjenning.',
    'solas-xii': 'Vedlikeholdsplan og vernerunde bekreftet uten avvik. Anbefaler godkjenning.',
    'ism-code': 'IK-Mat-system revidert. Tilsyn fra Mattilsynet uten avvik. Anbefaler godkjenning.',
    'ballast-water': 'Vannbesparende armaturer installert og dokumentert. Vannforbrukslogg komplett. Anbefaler godkjenning.',
    'default': 'Dokumentasjonen er komplett og forhåndsvalidert mot gjeldende kriterium. Anbefaler godkjenning.',
  },
};

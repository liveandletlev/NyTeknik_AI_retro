export const projects = ['cobra', 'krakel', 'enhancer'];

const arrow = '<i class="fi-arrow-right" aria-hidden="true"></i>';

export const content = {
  cobra: {
    era: 'NES · 1989–2026',
    kind: 'FÖRE / EFTER',
    title: 'Samma flod, ett nytt utseende',
    teaser: 'Jämför originalets grafik med vår nya version av NES-spelet Cobra Triangle.',
    action: 'Jämför grafiken',
    intro: 'Båtaction, hinder och en obarmhärtig svårighetsgrad. Vi gav NES-spelet Cobra Triangle ny grafik och mer förlåtande regler.',
    summary: 'Originalspelet gör fortfarande jobbet under ytan. Ovanpå har vi byggt ny pixelgrafik. I den lokala spelversionen kan vi också ändra vissa regler och backa efter ett misstag.',
    method: `<p class="method-flow"><span>Spelkassettens innehåll</span>${arrow}<span>Analys av spelkoden</span>${arrow}<span>Nya regler och grafik</span></p><p>Vi följde hur originalet skrev till sitt minne och undersökte de instruktioner som styrde skador och förlorade liv. Vi använde <strong>REA</strong>, som kopplar ihop ai med verktyg för baklängeskonstruktion, och <strong>Ghidra</strong>, som analyserar kompilerade program.</p><p>Genom att ändra bara fyra byte i en arbetskopia gjorde vi spelet enklare. Originalspelet körs i <strong>JSNES</strong>, ett program som efterliknar en NES-konsol. Ny kod ritar vattnet, båtarna och landskapet.</p><p>Vi har alltså analyserat och ändrat utvalda delar av spelet. Hela spelets källkod har inte återskapats.</p>`,
    scope: `<p><strong>Originalet:</strong> Cobra Triangle, utvecklat av Rare för NES och utgivet 1989.</p><p><strong>Vi behövde:</strong> en ROM-fil, alltså en fil med spelkassettens innehåll. Ingen ursprunglig källkod.</p><p><strong>Kontrollerat:</strong> de två regeländringarna i separata beteendetester och grafik för de två första banorna. Hela spelets 25 banor är inte verifierade.</p><p><strong>Här visas:</strong> en åtta sekunder lång, ljudlös inspelning. Båda bilderna kommer från samma körning med originalregler, så jämförelsen visar enbart grafikförändringen.</p>`
  },
  krakel: {
    era: 'CD-ROM · 1995–2026',
    kind: 'BILDGENOMGÅNG',
    title: 'En bokstav får nytt liv',
    teaser: 'Utforska hur vi fick en del av Krakel Spektakels ABC att fungera i webbläsaren.',
    action: 'Utforska bokstavsleken',
    intro: 'Krakel Spektakels ABC lät barn leka med bokstäver, bilder och röster. Vi återskapade en liten del för en modern webbläsare.',
    summary: 'A-leken fungerar nu i en ny webbversion, med bilder och röster från originalskivan. Här kan du utforska en skärmbild av den. Hela bokstavsäventyret har inte byggts om.',
    method: `<p class="method-flow"><span>Originalskivans filer</span>${arrow}<span>Spelreglerna blir läsbara</span>${arrow}<span>Ny webbversion</span></p><p>Vi gjorde spelets kompilerade skript läsbara igen för att förstå hur bokstavsleken fungerade. Skripten var skrivna i <strong>Lingo</strong>, språket i dåtidens multimediaverktyg <strong>Director</strong>. <strong>ProjectorRays</strong>, ett verktyg för dekompilering, gjorde dem möjliga att läsa.</p><p>Ai hjälpte till att plocka ut filerna från skivan, tolka reglerna och skriva den nya webbversionen. Vi jämförde med originalet i <strong>ScummVM</strong>, ett program som kan köra äldre spel på moderna datorer.</p><p><strong>REA</strong>, som kopplar ihop ai med verktyg för baklängeskonstruktion, provades också. Det kunde inte hantera originalets programfil och användes därför inte för själva dekompileringen.</p>`,
    scope: `<p><strong>Originalet:</strong> den första svenska utgåvan av Krakel Spektakels ABC, daterad 1995 i det bevarade arkivmaterialet.</p><p><strong>Vi behövde:</strong> en avbildning av originalskivan, alltså en fil med dess innehåll. Där fanns kompilerade skript, bilder och ljud, men ingen ursprunglig källkod.</p><p><strong>Kontrollerat:</strong> en omgång med ANKARE, ANKA och ALPTOPP, rätt och fel bokstav samt drag- och klickstyrning. Vi provade också att dra bokstäver i originalspelet.</p><p><strong>Här visas:</strong> en skärmbild av vår webbprototyp med tryckbara förklaringar. Berättelsen, övriga bokstäver och originalets alla animationer ingår inte i webbprototypen.</p>`
  },
  enhancer: {
    era: 'WINAMP · 2001–2026',
    kind: 'LYSSNINGSJÄMFÖRELSE',
    title: 'Den går faktiskt till elva',
    teaser: 'Lyssna på samma musik med och utan ett klassiskt ljudtillägg till Winamp.',
    action: 'Prova ljudeffekten',
    intro: 'Winamp var musikspelaren. Enhancer var tillägget som förändrade ljudet. Vi fick den gamla ljudmotorn att arbeta med Spotify på en modern Mac.',
    summary: 'Tryck på Elva och lyssna på samma musikstycke med och utan bearbetning. Effekten kommer från den gamla motorn; musikstycket och gränssnittet är nya.',
    method: `<p class="method-flow"><span>Gammalt Windows-tillägg</span>${arrow}<span>Analys av ljudmotorn</span>${arrow}<span>Ljud på Mac</span></p><p>Vi undersökte hur tillägget bearbetade ljudet. <strong>REA</strong> kopplade ihop ai med analysverktyget <strong>Ghidra</strong>, som hjälper oss att förstå kompilerade program.</p><p>Macappen kör ljudmotorns ursprungliga instruktioner för äldre pc-processorer i <strong>Unicorn</strong>, ett verktyg som efterliknar processorn. På så sätt kunde motorn ta emot och bearbeta Spotify-ljud lokalt på datorn.</p><p>Separat återskapade vi en del av basalgoritmen i ny, läsbar kod och jämförde den med originalet i 66 testfall. Hela tillägget har alltså inte skrivits om, och Macappen använder fortfarande originalmotorn.</p><p>Här har vårt eget musikstycke <em>Nattpass</em> behandlats i förväg med den gamla ljudmotorn och våra effektinställningar. Knappen växlar mellan två synkroniserade ljudfiler.</p>`,
    scope: `<p><strong>Originalet:</strong> Enhancer 0.17 av Adrian Iosif, från 2001, ett ljudtillägg till Winamp.</p><p><strong>Vi behövde:</strong> den kompilerade originalmotorn, distribuerad i ett senare paket som gjorde tillägget användbart i nyare miljöer. Ingen ursprunglig källkod.</p><p><strong>Kontrollerat:</strong> ljudbehandling med originalinstruktionerna, jämförelser med vår app och ett faktiskt Spotify-test på Mac. Prototypen är inte testad med alla datorer och ljudenheter.</p><p><strong>Här hörs:</strong> ett eget, syntetiskt skapat musikstycke på 16 sekunder. Inga Spotify-inspelningar eller externa musikprover används. Versionerna är volymmatchade, så jämförelsen inte bara handlar om högre volym. Du behöver varken Spotify eller någon installation.</p>`
  }
};

export const steps = [
  {
    title: 'Ett ankare börjar på A',
    description: 'Bilden kommer från originalskivan. I vår spelbara webbversion hörs också originalets inspelade ord. Här utforskar vi en skärmbild.'
  },
  {
    title: 'Vilka bokstäver saknas?',
    description: 'I den här bilden är N, A och E redan på plats. Luckorna ska fyllas med A, K och R. Webbversionen låter spelaren dra bokstäver eller trycka på dem.'
  },
  {
    title: 'Reglerna gick att läsa igen',
    description: 'De återvunna skripten beskrev hur spelet väljer luckor och reagerar på rätt och fel bokstav. Vi skrev ny webbkod utifrån dem och kontrollerade en hel spelomgång.'
  }
];

/**
 * ODAM ANATOMIYASI (ATLAS, 1-JILD) - PROF. N.K. AHMEDOV
 * 2-BO'LIM: MUSKULLAR HAQIDA TA'LIMOT (MIOLOGIYA) - SYSTEMA MUSCULORUM
 * To'liq ilmiy va klinik ma'lumotlar bazasi, lotincha terminologiya,
 * boshlanishi (origo), birikishi (insertio), funksiyasi, innervatsiyasi va klinik ahamiyati
 */

window.MYOLOGY_DATA = {
  metadata: {
    title: "Odam anatomiyasi (Atlas, 1-jild)",
    author: "Prof. N.K. Ahmedov",
    section: "Muskullar haqida ta'limot (Miologiya - Myologia)",
    pages: "Miologiya bo'limi, 114–220-rasmlar",
    terminologySource: "Parij (PNA, 1955), Visbaden (1965), Xalqaro anatomik nomenklatura (FCAT, Terminologia Anatomica)"
  },

  // 1. UMUMIY MIOLOGIYA VA MUSKULLAR SHAKLLARI
  generalMyology: {
    definition: "Muskullar (lotincha 'musculus' — sichqoncha, yunoncha 'myos') harakat apparatining faol (aktiv) qismini tashkil etib, qisqarish xususiyatiga ega bo'lgan to'qimadir. Skelet muskullari odam gavdasining fazoda harakatlanishini, gavda muvozanatini, nafas olish, yutish, nutq va mimika harakatlarini ta'minlaydi.",
    weightStats: "Voyaga yetgan odamda skelet muskullari gavda umumiy og'irligining 40-45% ini, yangi tug'ilgan chaqaloqlarda 20-22% ini, sportchilarda esa 50% gacha qismini tashkil qiladi. Odam organizmida 600 dan ortiq alohida skelet muskullari mavjud.",
    structure: {
      venter: "Muskulning qorincha qismi (venter) — qisqaruvchi ko'ndalang-targ'il muskul tolalari (simplastlar) tutamidan tuzilgan bo'lib, uning qizg'ish-qizil rangli faol qismidir.",
      tendo: "Pay (tendo) — pishiq zich biriktiruvchi to'qimadan iborat bo'lib, muskulni suyak suyanchig'iga mahkamlaydi. Paylar cho'zilishga o'ta chidamli bo'lib, 1 sm² pay tolasi 600 kg gacha yuklamaga bardosh bera oladi.",
      aponeurosis: "Yassi pay (aponeuroz) — yassi muskullarning (masalan, qorin devori, orqaning eng keng muskuli) keng plastinkasimon birikuvchi payi.",
      fascia: "Fassiya (fascia) — muskulni tashqi tomondan o'rab turuvchi zich biriktiruvchi to'qima qobig'i. Muskullar qisqarganda ularning o'zaro ishqalanishini kamaytiradi va yonma-yon muskullarni alohida fassial qinlarda ushlab turadi."
    },
    auxiliaryApparatus: [
      {
        id: "vagina-synovialis",
        nameUz: "Sinovial qinlar",
        nameLat: "Vagina synovialis tendinis",
        desc: "Ko'p harakatlanadigan paylar atrofidagi ikki qavatli g'ilof (visseral va pariyetal varaqlar). Bo'shlig'ida sinovial suyuqlik bo'lib, payning suyak ustida sirpanishini yengillashtiradi."
      },
      {
        id: "bursa-synovialis",
        nameUz: "Sinovial xaltachalar",
        nameLat: "Bursa synovialis",
        desc: "Paylar bilan suyak bo'rtiqlari orasida joylashgan suyuqlik saqlovchi yostiqchalar. Bosimni teng taqsimlaydi va ishqalanishni bartaraf etadi."
      },
      {
        id: "trochlea",
        nameUz: "Suyak va fibroz g'altaklar",
        nameLat: "Trochlea muscularis",
        desc: "Paylarning harakat yo'nalishini o'zgartiruvchi va tortishish burchagini oshiruvchi tayanch bloklar (masalan, ko'zning yuqori qiya muskuli g'altagi)."
      },
      {
        id: "ossa-sesamoidea",
        nameUz: "Sesamosimon suyaklar",
        nameLat: "Ossa sesamoidea",
        desc: "Paylar qalinligida joylashgan suyaklar (tizza qopqog'i — patella, no'xatsimon suyak). Richag yelkasini uzaytirib, muskul kuchini oshiradi."
      }
    ],
    shapes: [
      {
        id: "fusiformis",
        nameUz: "Urchuqsimon muskul",
        nameLat: "Musculus fusiformis",
        pageRef: "N.K. Ahmedov, 1-jild, 58-bet, 115-rasm",
        clinicalTag: "BIOMEXANIKA",
        quickFacts: [
          "Uzun naysimon suyaklar sohasida joylashadi (qo'l va oyoq erkin qismlari).",
          "Katta amplituda bilan qisqarishga moslashgan, qorinchasi qalin, uchlari tor payga o'tadi.",
          "Misol: Bilak va yelkaning fleksor hamda ekstensor muskullari."
        ],
        landmarks: "Yelka va boldir fassial qinlari ichida paypaslanadi",
        attachments: "Origo: Proksimal suyak bo'rtig'i; Insertio: Distal suyak g'adir-budurligi",
        neurovascular: "Magistral periferik nervlar va muskul arteriyalari",
        clinicalNote: "Sport tibbiyoti va travmatologiyada tezkor qisqarish vaqtida pay-mushak birikmasi yirtilishi kuzatilishi mumkin."
      },
      {
        id: "biceps",
        nameUz: "Ikki boshli muskul",
        nameLat: "Musculus biceps",
        pageRef: "N.K. Ahmedov, 1-jild, 59-bet, 116-rasm",
        clinicalTag: "ANATOMIK RICHAG",
        quickFacts: [
          "Proksimal tomonda ikkita alohida boshcha (caput longum et breve) bilan boshlanadi.",
          "Ikkala bosh birlashib bitta umumiy qorincha hosil qiladi va umumiy pay bilan tugaydi.",
          "Misol: Yelkaning ikki boshli muskuli (m. biceps brachii), sonning ikki boshli muskuli (m. biceps femoris)."
        ],
        landmarks: "Yelkaning oldingi va sonning orqa yuzasi bo'ylab aniq konturlanadi",
        attachments: "Ikkita proksimal boshcha orqali ikki nuqtadan boshlanib, bitta suyakka birikadi",
        neurovascular: "N. musculocutaneus (yelkada), n. ischiadicus (sonda)",
        clinicalNote: "Yelka ikki boshli muskuli uzun boshining payi yelka bo'g'imi bo'shlig'i ichidan o'tadi (intraartikulyar pay tendiniti xavfi)."
      },
      {
        id: "triceps",
        nameUz: "Uch boshli muskul",
        nameLat: "Musculus triceps",
        pageRef: "N.K. Ahmedov, 1-jild, 60-bet, 117-rasm",
        clinicalTag: "EKSTENSOR TIZIM",
        quickFacts: [
          "Uchta anatomik boshcha (caput longum, laterale, mediale) orqali boshlanadi.",
          "Katta kuch bilan bo'g'imni yozish (ekstenziya) vazifasini bajaradi.",
          "Misol: Yelkaning uch boshli muskuli (m. triceps brachii), boldirning uch boshli muskuli (m. triceps surae)."
        ],
        landmarks: "Yelkaning orqa yuzasi va boldirning orqa 'boldir bo'rtig'i'",
        attachments: "Insertio: Olecranon (tirsakda), Tuber calcanei (tovonda)",
        neurovascular: "N. radialis (qo'lda), n. tibialis (oyoqda)",
        clinicalNote: "Triceps refleksi (C7-C8) nevrologik amaliyotda periferik nervlar va orqa miya segmentlari faoliyatini tekshirishda asosiy oriyentir hisoblanadi."
      },
      {
        id: "quadriceps",
        nameUz: "To'rt boshli muskul",
        nameLat: "Musculus quadriceps",
        pageRef: "N.K. Ahmedov, 1-jild, 61-bet, 118-rasm",
        clinicalTag: "LOKOMOTSIYA",
        quickFacts: [
          "Odam tanasidagi eng baquvvat muskul (sonning to'rt boshli muskuli).",
          "To'rtta qismdan iborat: to'g'ri muskul, lateral, medial va oraliq keng muskullar.",
          "Tizza qopqog'i (patella) orqali boldir suyagiga kuchli lig. patellae payi bilan birikadi."
        ],
        landmarks: "Sonning butun oldingi va lateral yuzasini egallaydi",
        attachments: "Origo: Spina iliaca anterior inferior va femur tanasi; Insertio: Tuberositas tibiae",
        neurovascular: "N. femoralis va a. circumflexa femoris lateralis",
        clinicalNote: "Tizza refleksi (L2-L4 segmentlar) aynan lig. patellae ga perkussiya bolg'achasi bilan urganda chaqiriladi."
      },
      {
        id: "pennatus",
        nameUz: "Patsimon muskul (bir va ikki patsimon)",
        nameLat: "Musculus bipennatus / unipennatus",
        pageRef: "N.K. Ahmedov, 1-jild, 62-bet, 119-rasm",
        clinicalTag: "KUCH MUSKULI",
        quickFacts: [
          "Muskul tolalari payga qush pati kabi burchak ostida qiya birikadi.",
          "Fiziologik ko'ndalang kesim yuzasi juda katta bo'lgani uchun kichik hajmda katta tortish kuchini hosil qiladi.",
          "Misol: Barmoqlarning chuqur bukuvchilari, deltasimon muskulning o'rta qismi."
        ],
        landmarks: "Kaftusti va oyoq panjasi sohalarida pay tutamlari aniq ajraladi",
        attachments: "Markaziy pay plastinkasining ikki yon tomoniga tutashadi",
        neurovascular: "Chuqur muskul shoxlari va anastomozlar",
        clinicalNote: "Kuchli statik va dinamik yuklamalarni ko'tarishga moslashgan, charchoqqa nisbatan chidamli to'qimadir."
      },
      {
        id: "orbicularis",
        nameUz: "Doirasimon muskul (sfinkter)",
        nameLat: "Musculus orbicularis / sphincter",
        pageRef: "N.K. Ahmedov, 1-jild, 63-bet, 120-rasm",
        clinicalTag: "SFINKTER APPARATI",
        quickFacts: [
          "Tabiiy teshiklar (ko'z yorig'i, og'iz teshigi, orqa chiqaruv teshigi) atrofida konsentrik joylashadi.",
          "Qisqarganda teshikni toraytiradi yoki butunlay yopadi.",
          "Suyakka birikmasdan, teri va shilliq qavatlarga tutashadi."
        ],
        landmarks: "Yuzning tabiiy teshiklari atrofidagi yumshoq to'qimalar",
        attachments: "Pay markazi, yuz suyaklari oriyentirlari va teri osti qatlami",
        neurovascular: "N. facialis (VII juft kranial nerv) mimika sfinkterlarini innervatsiya qiladi",
        clinicalNote: "Yuz nervi nevritida (Bell falaji) ko'zning aylanma muskuli falajlanib, ko'z yumilmay qoladi (lagoftalm — 'quyon ko'zi')."
      }
    ]
  },

  // 2. ORQA VA KO'KRAK QAFASI MUSKULLARI
  backAndThorax: {
    titleUz: "Orqa va ko'krak qafasi muskullari",
    titleLat: "Musculi dorsi et thoracis",
    pageRef: "N.K. Ahmedov, 1-jild, 64–82-betlar, 121–142-rasmlar",
    overview: "Orqa va ko'krak muskullari tana skeletini vertikal ushlab turish, nafas harakatlarini amalga oshirish va qo'l erkin harakatini ta'minlashda ishtirok etadi.",
    muscles: [
      {
        id: "trapezius",
        nameUz: "Trapetsiyasimon muskul",
        nameLat: "Musculus trapezius",
        pageRef: "N.K. Ahmedov, 1-jild, 65-bet, 121-rasm",
        clinicalTag: "YELKA STATIKASI",
        quickFacts: [
          "Orqaning eng yuqori qismida joylashgan yassi, uchburchak shakldagi keng muskul.",
          "Ikkala tomon muskullari birgalikda trapetsiya shaklini hosil qiladi.",
          "Kurakni yaqinlashtiradi, ko'taradi va boshni orqaga bukadi."
        ],
        landmarks: "Ensa sohasidan boshlab XI ko'krak umurtqasigacha orqa o'rta chiziq bo'ylab paypaslanadi",
        attachments: "Origo: Linea nuchae superior, protuberantia occipitalis externa, lig. nuchae, C7-Th12 umurtqalar o'tkir o'simtalari. Insertio: O'mrovning lateral 1/3 qismi, acromion, spina scapulae.",
        neurovascular: "Innervatio: N. accessorius (XI juft) va plexus cervicalis (C3-C4). Vasa: A. transversa colli, a. occipitalis.",
        clinicalNote: "Qo'shimcha nerv (n. accessorius) shikastlanganda yelka pastga osilib qoladi, qo'lni gorizontal chiziqdan yuqoriga ko'tarish qiyinlashadi."
      },
      {
        id: "latissimus-dorsi",
        nameUz: "Orqaning eng keng muskuli",
        nameLat: "Musculus latissimus dorsi",
        pageRef: "N.K. Ahmedov, 1-jild, 67-bet, 123-rasm",
        clinicalTag: "LOKOMOTOR BIRIKMA",
        quickFacts: [
          "Orqaning pastki qismini to'liq qoplab turuvchi odam tanasidagi eng katta yassi muskul.",
          "Qo'lni orqaga tortadi, ichkariga buradi (pronatsiya) va tanaga yaqinlashtiradi.",
          "Nafas olishda yordamchi muskul sifatida ishtirok etadi ('yo'taluvchilar muskuli')."
        ],
        landmarks: "Qo'ltiqosti chuqurchasining orqa devorini hosil qiluvchi yo'g'on burma",
        attachments: "Origo: Th7-Th12 va barcha bel umurtqalar o'tkir o'simtalari, fascia thoracolumbalis, crista iliaca, pastki 3-4 qovurg'a. Insertio: Crista tuberculi minoris humeri.",
        neurovascular: "Innervatio: N. thoracodorsalis (plexus brachialis, C6-C8). Vasa: A. thoracodorsalis, aa. intercostales posteriores.",
        clinicalNote: "Ko'krak bezi saratoni radikal operatsiyalarida yoki qo'ltiqosti limfadisseksiyasida n. thoracodorsalis ehtiyotkorlik bilan saqlanishi shart."
      },
      {
        id: "erector-spinae",
        nameUz: "Umurtqani tiklovchi muskul",
        nameLat: "Musculus erector spinae",
        pageRef: "N.K. Ahmedov, 1-jild, 70-bet, 126-rasm",
        clinicalTag: "ORQA MIYA KORSETI",
        quickFacts: [
          "Orqaning eng kuchli va chuqur muskuli bo'lib, butun umurtqa pog'onasi bo'ylab cho'zilgan.",
          "Uchta yo'lakka bo'linadi: m. iliocostalis (yonbosh-qovurg'a), m. longissimus (eng uzun), m. spinalis (o'tkir o'simtali).",
          "Odamning tik qad-qomatini ta'minlovchi asosiy antigravitatsion muskul."
        ],
        landmarks: "Bel va ko'krak umurtqalari o'tkir o'simtalarining ikki yonidagi qalin mushak bo'rtig'i",
        attachments: "Origo: Crista iliaca, os sacrum, bel umurtqalari o'simtalari. Insertio: Qovurg'alar burchaklari, ko'krak va bo'yin umurtqalari ko'ndalang o'simtalari, processus mastoideus.",
        neurovascular: "Innervatio: Barcha orqa miya nervlarining orqa shoxlari (rami posteriores nn. spinalium). Vasa: Aa. intercostales posteriores, aa. lumbales.",
        clinicalNote: "Surunkali bel og'riqlarida (lyumbago, osteoxondroz) aynan shu muskulning reflektor gipertonusi va spazmi yetakchi klinik simptom sanaladi."
      },
      {
        id: "pectoralis-major",
        nameUz: "Katta ko'krak muskuli",
        nameLat: "Musculus pectoralis major",
        pageRef: "N.K. Ahmedov, 1-jild, 74-bet, 130-rasm",
        clinicalTag: "KO'KRAK DEVORI",
        quickFacts: [
          "Ko'krak qafasining oldingi yuzasini qoplovchi kuchli, yelpig'ichsimon muskul.",
          "Uch qismdan iborat: o'mrov qismi (pars clavicularis), to'sh-qovurg'a qismi (pars sternocostalis), qorin qismi (pars abdominalis).",
          "Yelkani tanaga yaqinlashtiradi, ichkariga buradi va tushirilgan qo'lni oldinga ko'taradi."
        ],
        landmarks: "Qo'ltiqosti chuqurchasining oldingi devorini (plicae axillaris anterior) hosil qiladi",
        attachments: "Origo: O'mrovning medial yarmi, to'sh suyagi dastasi va tanasi, II-VII qovurg'a tog'aylari, qorin to'g'ri muskuli qini. Insertio: Crista tuberculi majoris humeri.",
        neurovascular: "Innervatio: Nn. pectorales medialis et lateralis (C5-Th1). Vasa: A. thoracoacromialis, a. thoracica lateralis.",
        clinicalNote: "Ko'krak qafasi jarohatlarida va pnevmotoraksda nafas olishga yordam beruvchi asosiy qo'shimcha muskul hisoblanadi."
      },
      {
        id: "intercostales",
        nameUz: "Qovurg'alararo tashqi va ichki muskullar",
        nameLat: "Musculi intercostales externi et interni",
        pageRef: "N.K. Ahmedov, 1-jild, 78-bet, 135-rasm",
        clinicalTag: "NAFAS MEXANIKASI",
        quickFacts: [
          "Tashqi qovurg'alararo muskullar tolalari yuqoridan pastga va oldinga yo'nalgan bo'lib, qovurg'alarni ko'taradi (nafas olish — inspiratsiya).",
          "Ichki qovurg'alararo muskullar tolalari pastdan yuqoriga va oldinga yo'nalgan bo'lib, qovurg'alarni tushiradi (nafas chiqarish — ekspiratsiya).",
          "Qovurg'alararo oraliqlarda qon tomir-nerv tutami (V-A-N: vena, arteriya, nerv) muskul qatlamlari orasidan o'tadi."
        ],
        landmarks: "Qovurg'alararo oraliqlar (spatium intercostale) bo'ylab joylashadi",
        attachments: "Yuqori va pastki qo'shni qovurg'alar qirralari orasida tortilgan",
        neurovascular: "Innervatio: Nn. intercostales (Th1-Th11). Vasa: Aa. et vv. intercostales.",
        clinicalNote: "Plevra bo'shlig'i punksiyasi o'tkazilganda qovurg'alararo tomir-nerv tutamini shikastlamaslik uchun nina har doim pastdagi qovurg'aning yuqori qirrasi ustidan kiritiladi."
      },
      {
        id: "diaphragma",
        nameUz: "Diafragma (To'sh-qorin to'sig'i)",
        nameLat: "Diaphragma",
        pageRef: "N.K. Ahmedov, 1-jild, 80-bet, 138-rasm",
        clinicalTag: "HAYOTIY MUHIM A'ZO",
        quickFacts: [
          "Ko'krak va qorin bo'shliqlarini bir-biridan ajratib turuvchi gumbazsimon muskul-pay to'siq.",
          "Markazida mustahkam pay markazi (centrum tendineum), chetlarida muskul qismlari (pars lumbalis, costalis, sternalis) mavjud.",
          "Asosiy nafas muskuli: qisqarganda gumbazi pastga tushib, ko'krak bo'shlig'i hajmini 1.5-2 barobar kengaytiradi."
        ],
        landmarks: "Ko'krak qafasining pastki aperturasi chegaralari",
        attachments: "Origo: Bel umurtqalari (L1-L4), pastki 6 ta qovurg'aning ichki yuzasi, xanjarsimon o'simta. Insertio: Centrum tendineum.",
        neurovascular: "Innervatio: N. phrenicus (plexus cervicalis, C3-C5). Vasa: Aa. pericardiacophrenicae, aa. phrenicae superiores et inferiores.",
        clinicalNote: "Uchta katta teshigi bor: Foramen venae cavae (Th8), Hiatus esophageus (Th10), Hiatus aorticus (Th12). Qizilo'ngach teshigi sohasida diafragma churrasi (hiatus hernia) rivojlanishi mumkin."
      }
    ]
  },

  // 3. QORIN VA CHOV KANALI MUSKULLARI
  abdomenAndInguinal: {
    titleUz: "Qorin va chov kanali muskullari",
    titleLat: "Musculi abdominis et canalis inguinalis",
    pageRef: "N.K. Ahmedov, 1-jild, 83–96-betlar, 143–158-rasmlar",
    overview: "Qorin devori muskullari qorin matbuoti (prelum abdominale)ni hosil qilib, ichki a'zolarni himoya qiladi, qorin ichki bosimini boshqaradi va chov kanalini shakllantiradi.",
    muscles: [
      {
        id: "rectus-abdominis",
        nameUz: "Qorinning to'g'ri muskuli",
        nameLat: "Musculus rectus abdominis",
        pageRef: "N.K. Ahmedov, 1-jild, 84-bet, 144-rasm",
        clinicalTag: "QORIN MATBUOTI",
        quickFacts: [
          "Qorin oldingi devorida oq chiziqning ikki tomonida vertikal joylashgan uzun tasmachasimon muskul.",
          "Uzunligi bo'ylab 3-4 ta payli bo'linmalar (intersectiones tendineae) bilan bo'lingan.",
          "Qorin matbuotini mustahkamlaydi, gavdani oldinga bukadi, tos suyagini ko'taradi."
        ],
        landmarks: "Xanjarsimon o'simtadan to qov simfizigacha bo'lgan to'g'ri chiziq",
        attachments: "Origo: V-VII qovurg'a tog'aylari tashqi yuzasi, processus xiphoideus. Insertio: Os pubis (crista pubica va symphysis pubica oralig'i).",
        neurovascular: "Innervatio: Nn. intercostales (Th7-Th12). Vasa: A. epigastrica superior (a. thoracica interna dan) va a. epigastrica inferior (a. iliaca externa dan).",
        clinicalNote: "Ushbu ikkita katta epigastral arteriya qorin to'g'ri muskuli qini orqa devorida o'zaro kuchli anastomoz hosil qiladi (koarktatsiyadagi kollateral qon aylanish)."
      },
      {
        id: "obliquus-externus",
        nameUz: "Qorinning tashqi qiya muskuli",
        nameLat: "Musculus obliquus externus abdominis",
        pageRef: "N.K. Ahmedov, 1-jild, 86-bet, 147-rasm",
        clinicalTag: "CHOV DEVORI ASOSI",
        quickFacts: [
          "Qorinning lateral devorini qoplovchi eng yuzada yotuvchi keng muskul.",
          "Tolalari yuqoridan pastga va oldinga (qo'lni cho'ntakka solish yo'nalishida) boradi.",
          "Pastki aponeuroz qirrasi ichkariga qayrilib, chov boylamini (ligamentum inguinale / Poupart) hosil qiladi."
        ],
        landmarks: "Pastki 8 ta qovurg'aning tashqi yuzasidan boshlanuvchi tishlar",
        attachments: "Origo: V-XII qovurg'alar tashqi yuzasi. Insertio: Crista iliaca, linea alba, symphysis pubica.",
        neurovascular: "Innervatio: Nn. intercostales (Th5-Th12), n. iliohypogastricus, n. ilioinguinalis. Vasa: Aa. intercostales posteriores, a. circumflexa ilium superficialis.",
        clinicalNote: "Ushbu muskul aponeurozining ikkita oyoqchaga (crus mediale et laterale) ajralishi chov kanalining yuza teshigini hosil qiladi."
      },
      {
        id: "obliquus-internus",
        nameUz: "Qorinning ichki qiya muskuli",
        nameLat: "Musculus obliquus internus abdominis",
        pageRef: "N.K. Ahmedov, 1-jild, 88-bet, 150-rasm",
        clinicalTag: "QORIN MATBUOTI QATLAMI",
        quickFacts: [
          "Tashqi qiya muskul ostida joylashgan yassi muskul plastinkasi.",
          "Tolalari pastdan yuqoriga va oldinga qarab (tashqi qiya muskul tolalariga perpendikulyar) yo'nalgan.",
          "Bir tomonlama qisqarganda tanani o'z tomoniga buradi, ikki tomonlama qisqarganda gavdani bukadi."
        ],
        landmarks: "Yonbosh qirrasi va lumbodorsal fassiya orqali paypaslanadi",
        attachments: "Origo: Fascia thoracolumbalis, crista iliaca ning oraliq chizig'i, lig. inguinale ning lateral 2/3 qismi. Insertio: X-XII qovurg'alar pastki qirrasi, linea alba.",
        neurovascular: "Innervatio: Nn. intercostales (Th8-Th12), n. iliohypogastricus, n. ilioinguinalis. Vasa: A. epigastrica inferior, a. circumflexa ilium profunda.",
        clinicalNote: "Pastki tolalari urug' tizimchasiga qo'shilib, moyakni ko'taruvchi muskulni (m. cremaster) hosil qiladi (kremaster refleksi - L1-L2)."
      },
      {
        id: "transversus-abdominis",
        nameUz: "Qorinning ko'ndalang muskuli",
        nameLat: "Musculus transversus abdominis",
        pageRef: "N.K. Ahmedov, 1-jild, 90-bet, 152-rasm",
        clinicalTag: "ICHKI BOSIM REGULYATORI",
        quickFacts: [
          "Qorin old-yon devorining eng chuqur qatlamida yotuvchi yassi muskul.",
          "Tolalari ko'ndalang (gorizontal) yo'nalishda borib, keng aponeurozga aylanadi.",
          "Qorin bo'shlig'i a'zolarini orqa tomondan va yon tomondan mahkam siqib, ichki bosimni ushlab turadi."
        ],
        landmarks: "Qorin ichki fassiyasi (fascia transversalis) ga bevosita taqaladi",
        attachments: "Origo: VII-XII qovurg'alarning ichki yuzasi, fascia thoracolumbalis, crista iliaca, lig. inguinale lateral 1/3 qismi. Insertio: Linea alba.",
        neurovascular: "Innervatio: Nn. intercostales (Th7-Th12), n. iliohypogastricus, n. ilioinguinalis. Vasa: A. epigastrica inferior, aa. intercostales.",
        clinicalNote: "Ushbu muskul aponeurozining qorin to'g'ri muskuli orqasidan oldiga o'tish chegarasida yarimoysimon chiziq (linea arcuata / Duglas chizig'i) shakllanadi."
      },
      {
        id: "canalis-inguinalis",
        nameUz: "Chov kanali (Devorlari va halqalari)",
        nameLat: "Canalis inguinalis",
        pageRef: "N.K. Ahmedov, 1-jild, 93–95-betlar, 155–158-rasmlar",
        clinicalTag: "XIRURGIK TOPOGRAFIYA",
        quickFacts: [
          "Qorinning pastki sohasida chov boylami ustida joylashgan uzunligi 4-5 sm bo'lgan qiya tirqishsimon kanal.",
          "To'rtta devori bor: Oldingi — m. obliquus externus aponeurozi; Orqa — fascia transversalis; Yuqori — mm. obliquus internus et transversus ning pastki qirralari; Pastki — ligamentum inguinale.",
          "Erkaklarda ichidan urug' tizimchasi (funiculus spermaticus), ayollarda bachadonning yumaloq boylami (lig. teres uteri) o'tadi."
        ],
        landmarks: "Spina iliaca anterior superior va tuberculum pubicum orasidagi chiziq",
        attachments: "Ikki halqasi: Anulus inguinalis superficialis (tashqi) va Anulus inguinalis profundus (ichki).",
        neurovascular: "N. ilioinguinalis va ramus genitalis n. genitofemoralis",
        clinicalNote: "Chov churralari (hernia inguinalis): Qiyshiq chov churrasi ichki chov halqasi orqali kirib butun kanal bo'ylab o'tadi; To'g'ri chov churrasi esa to'g'ridan-to'g'ri orqa devor (fossa inguinalis medialis) zaifligidan chiqadi."
      }
    ]
  },

  // 4. BOSH, YUZ VA BO'YIN MUSKULLARI
  headAndNeck: {
    titleUz: "Bosh, yuz va bo'yin muskullari",
    titleLat: "Musculi capitis et colli",
    pageRef: "N.K. Ahmedov, 1-jild, 97–120-betlar, 159–185-rasmlar",
    overview: "Bosh muskullari chaynash va mimika guruhlariga bo'linadi. Bo'yin muskullari bosh harakati, yutish, nafas va muhim qon tomirlar topografiyasini ta'minlaydi.",
    muscles: [
      {
        id: "temporalis",
        nameUz: "Chakka muskuli",
        nameLat: "Musculus temporalis",
        pageRef: "N.K. Ahmedov, 1-jild, 98-bet, 160-rasm",
        clinicalTag: "CHAYNASH APPARATI",
        quickFacts: [
          "Chakka chuqurchasini to'liq to'ldirib turuvchi kuchli, yelpig'ichsimon chaynash muskuli.",
          "Pastki jag'ni ko'tarib, oldingi tishlarni bir-biriga qattiq jipslashtiradi.",
          "Orqa tolalari oldinga siljigan pastki jag'ni orqaga tortadi."
        ],
        landmarks: "Fossa temporalis sohasida, chaynash vaqtida qattiq qisqarishi kaft bilan paypaslanadi",
        attachments: "Origo: Fossa temporalis, fascia temporalis. Insertio: Processus coronoideus mandibulae.",
        neurovascular: "Innervatio: Nn. temporales profundi (n. mandibularis, V3). Vasa: Aa. temporales profundae, a. temporalis superficialis.",
        clinicalNote: "Pastki jag' chiqib ketganda (dislokatsiya) chakka va chaynash muskullarining kuchli reflektor spazmi jag'ni joyiga solishni qiyinlashtiradi."
      },
      {
        id: "masseter",
        nameUz: "Chaynash muskuli",
        nameLat: "Musculus masseter",
        pageRef: "N.K. Ahmedov, 1-jild, 100-bet, 162-rasm",
        clinicalTag: "OKKLYUZIYA KUCHI",
        quickFacts: [
          "Yuzning yon tomonida to'rtburchak shakldagi o'ta baquvvat muskul.",
          "Yuza va chuqur qismlardan iborat bo'lib, pastki jag' burchagiga birikadi.",
          "Tishlarni 70-100 kg kuch bilan qisish qobiliyatiga ega."
        ],
        landmarks: "Yonoq yoyi (arcus zygomaticus) va pastki jag' burchagi (angulus mandibulae)",
        attachments: "Origo: Arcus zygomaticus ning pastki qirrasi va ichki yuzasi. Insertio: Tuberositas masseterica mandibulae.",
        neurovascular: "Innervatio: N. massetericus (n. mandibularis, V3). Vasa: A. masseterica, a. transversa faciei.",
        clinicalNote: "Qoqshol (stolbnyak) kasalligining ilk belgisi aynan shu muskulning tirishishi (trizm — og'iz ochilmasligi) hisoblanadi."
      },
      {
        id: "orbicularis-oris",
        nameUz: "Og'izning aylanma muskuli",
        nameLat: "Musculus orbicularis oris",
        pageRef: "N.K. Ahmedov, 1-jild, 103-bet, 166-rasm",
        clinicalTag: "MIMIKA VA NUTQ",
        quickFacts: [
          "Lablar qalinligida doirasimon joylashgan laboldi (pars labialis) va chekka (pars marginalis) qismlaridan iborat muskul.",
          "Lablarni oldinga cho'zadi (trubka qilib), og'iz yorig'ini zich yopadi.",
          "Oziqlanish, suyuqlik ichish, hushtak chalish va nutq artikulyatsiyasida hal qiluvchi rol o'ynaydi."
        ],
        landmarks: "Lablar qizil hoshiyasi va og'iz burchaklari",
        attachments: "Lab terisi, shilliq qavati va atrofdagi mimika muskullari tolalari bilan chigallashadi",
        neurovascular: "Innervatio: Rami buccales n. facialis (VII juft). Vasa: Aa. labiales superior et inferior.",
        clinicalNote: "Yuz nervi zararlanganda bemor suv ichganda og'iz burchagidan suyuqlik to'kiladi va hushtak chala olmaydi."
      },
      {
        id: "buccinator",
        nameUz: "Lunj muskuli ('Karnaychilar muskuli')",
        nameLat: "Musculus buccinator",
        pageRef: "N.K. Ahmedov, 1-jild, 105-bet, 168-rasm",
        clinicalTag: "OZIQLANISH VA TOPOGRAFIYA",
        quickFacts: [
          "Lunjning asosini tashkil etuvchi yassi, to'rtburchak shakldagi chuqur mimika muskuli.",
          "Og'iz bo'shlig'ini yon tomondan chegaralaydi, chaynash paytida ovqat bo'lagini tishlar orasiga suradi.",
          "Muskul qalinligini quloqoldi so'lak bezi yo'li (ductus parotideus / Stenon yo'li) teshib o'tadi."
        ],
        landmarks: "Lunj shilliq qavati ostida, yuqorigi va pastki jag'lar orasida",
        attachments: "Origo: Crista buccinatoria mandibulae, maxilla alveolyar o'simtasi, raphe pterygomandibularis. Insertio: Og'iz burchagi va lablar.",
        neurovascular: "Innervatio: Rami buccales n. facialis. Vasa: A. buccalis.",
        clinicalNote: "Stenon so'lak yo'li yallig'langanda yoki tosh tiqilganda aynan lunj muskuli sohasida og'riqli shish paydo bo'ladi."
      },
      {
        id: "sternocleidomastoideus",
        nameUz: "To'sh-o'mrov-so'rg'ichsimon muskul",
        nameLat: "Musculus sternocleidomastoideus",
        pageRef: "N.K. Ahmedov, 1-jild, 108-bet, 172-rasm",
        clinicalTag: "BO'YIN ASOSIY ORIYENTIRI",
        quickFacts: [
          "Bo'yinning old-yon yuzasini qiya kesib o'tuvchi yo'g'on, baquvvat muskul.",
          "Bo'yinni oldingi va orqa uchburchaklarga ajratuvchi asosiy anatomik oriyentir.",
          "Bir tomonlama qisqarganda boshni o'z tomoniga bukib, yuzni qarama-qarshi tomonga buradi; ikki tomonlama qisqarganda boshni orqaga tashlaydi."
        ],
        landmarks: "Bo'yin yon tomonida o'mrovdan to quloq orqasigacha bo'rtib turadi",
        attachments: "Origo: Manubrium sterni va extremitas sternalis claviculae. Insertio: Processus mastoideus ossis temporalis va linea nuchae superior.",
        neurovascular: "Innervatio: N. accessorius (XI juft) va plexus cervicalis (C2). Vasa: A. sternocleidomastoidea, a. occipitalis.",
        clinicalNote: "Tug'ruq jarohatlarida ushbu muskul yirtilishi yoki rivojlanmay qolishi natijasida qiyshiqbo'yinlik (torticollis) xastaligi yuzaga keladi."
      },
      {
        id: "neck-triangles",
        nameUz: "Bo'yin uchburchaklari va fassiyalari",
        nameLat: "Trigona colli et fasciae colli",
        pageRef: "N.K. Ahmedov, 1-jild, 112–118-betlar, 176–185-rasmlar",
        clinicalTag: "JARROHLIK ANATOMIYASI",
        quickFacts: [
          "Uyqu uchburchagi (Trigonum caroticum): M. sternocleidomastoideus, m. omohyoideus va m. digastricus orasida bo'lib, umumiy uyqu arteriyasi, ichki bo'yin venasi va adashgan nerv (n. vagus) joylashadi.",
          "Jg'osti uchburchagi (Trigonum submandibulare): Pirogov uchburchagini o'z ichiga oladi (til arteriyasini bog'lash nuqtasi).",
          "V.N. Shevkunenko bo'yicha bo'yin 5 ta fassiyadan iborat: yuza, xususiy fassiyaning yuza va chuqur varaqlari, ichki (endotservikal) fassiya va umurtqaoldi fassiyasi."
        ],
        landmarks: "Bo'yin oraliqlari va fassial xaltalar",
        attachments: "Bo'yin organlari (hiqildoq, qalqonsimon bez, qizilo'ngach) fassial qinlar bilan o'ralgan",
        neurovascular: "Plexus cervicalis, truncus sympathicus, n. vagus, a. carotis communis",
        clinicalNote: "Bo'yin fassiyalari orasidagi bo'shliqlar (spatium praeviscerale, retroviscerale) bo'ylab yiringli infeksiyalar ko'ks oralig'iga (mediastinit) tez tarqalishi mumkin."
      }
    ]
  },

  // 5. QO'L VA OYOQ ERKIN HARAKAT MUSKULLARI
  limbs: {
    titleUz: "Qo'l va oyoq muskullari",
    titleLat: "Musculi membrorum superioris et inferioris",
    pageRef: "N.K. Ahmedov, 1-jild, 121–160-betlar, 186–220-rasmlar",
    overview: "Qo'l muskullari mehnat faoliyati va nozik harakatlarga, oyoq muskullari esa tana og'irligini ko'tarish, tayanch va lokomotsiyaga ixtisoslashgan.",
    muscles: [
      {
        id: "deltoideus",
        nameUz: "Deltasimon muskul",
        nameLat: "Musculus deltoideus",
        pageRef: "N.K. Ahmedov, 1-jild, 122-bet, 187-rasm",
        clinicalTag: "IN'EKSIYA VA ABDUKSIYA",
        quickFacts: [
          "Yelka bo'g'imini tashqi tomondan to'liq qoplab turuvchi qalin, baquvvat uchburchak muskul.",
          "Qo'lni gorizontal sathgacha (90 gradus) chetga ko'taradi (abduksiya).",
          "Oldingi tolalari qo'lni oldinga bukadi, orqa tolalari qo'lni orqaga yozadi."
        ],
        landmarks: "Yelka bo'rtig'ining yumaloq shaklini beruvchi tashqi kontur",
        attachments: "Origo: O'mrov lateral qismi, acromion, spina scapulae. Insertio: Tuberositas deltoidea humeri.",
        neurovascular: "Innervatio: N. axillaris (plexus brachialis, C5-C6). Vasa: A. circumflexa humeri posterior.",
        clinicalNote: "Mushak ichiga in'eksiya (dori yuborish) uchun eng ko'p qo'llaniladigan soha. Yelka chiqishlarida n. axillaris ezilib qolishi mumkin."
      },
      {
        id: "biceps-brachii",
        nameUz: "Yelkaning ikki boshli muskuli",
        nameLat: "Musculus biceps brachii",
        pageRef: "N.K. Ahmedov, 1-jild, 126-bet, 192-rasm",
        clinicalTag: "FLEKSIYA VA SUPINATSIYA",
        quickFacts: [
          "Yelkaning oldingi yuzasida joylashgan uzun ikki boshli muskul.",
          "Tirsak bo'g'imida bilakni bukadi va uni kuchli tashqariga buradi (supinatsiya — 'sho'rva ichish harakati').",
          "Uzun boshi yelka bo'g'imi bo'shlig'i ichidan o'tadi."
        ],
        landmarks: "Yelkaning oldingi yuzasidagi taniqli mushak bo'rtig'i",
        attachments: "Origo: Caput longum — tuberculum supraglenoidale; Caput breve — processus coracoideus. Insertio: Tuberositas radii va aponeurosis m. bicipitis brachii.",
        neurovascular: "Innervatio: N. musculocutaneus (C5-C7). Vasa: A. brachialis.",
        clinicalNote: "Biceps refleksi (C5-C6) tekshiruvi tirsak bukilmasidagi payga bolg'acha urganda qo'lning bukilishi bilan aniqlanadi."
      },
      {
        id: "triceps-brachii",
        nameUz: "Yelkaning uch boshli muskuli",
        nameLat: "Musculus triceps brachii",
        pageRef: "N.K. Ahmedov, 1-jild, 129-bet, 195-rasm",
        clinicalTag: "YELKA EKSTENZIYASI",
        quickFacts: [
          "Yelkaning butun orqa yuzasini egallagan yagona kuchli ekstensor muskul.",
          "Uchta boshdan iborat: uzun bosh (caput longum), lateral bosh (caput laterale), medial bosh (caput mediale).",
          "Tirsak bo'g'imida qo'lni to'liq yozadi."
        ],
        landmarks: "Yelkaning orqa sohasi va tirsak o'simtasi (olecranon)",
        attachments: "Origo: Caput longum — tuberculum infraglenoidale scapulae; Caput laterale et mediale — humerus orqa yuzasi. Insertio: Olecranon ulnae.",
        neurovascular: "Innervatio: N. radialis (C5-C8). Vasa: A. profunda brachii.",
        clinicalNote: "Muskulning lateral va medial boshlari orasidan yelka suyagi bo'ylab yelka-mushak kanali (canalis humeromuscularis) o'tadi, unda n. radialis joylashadi."
      },
      {
        id: "gluteus-maximus",
        nameUz: "Katta dumba muskuli",
        nameLat: "Musculus gluteus maximus",
        pageRef: "N.K. Ahmedov, 1-jild, 138-bet, 202-rasm",
        clinicalTag: "ANTIGRAVITATSIYA VA IN'EKSIYA",
        quickFacts: [
          "Odam tanasidagi eng qalin va yirik muskullardan biri (qalinligi 3-4 sm gacha).",
          "Sonni chanoq-son bo'g'imida kuchli yozadi va tashqariga buradi, tanani tik tutadi.",
          "Zinadan ko'tarilishda va o'tirgan joydan turishda asosiy harakatlantiruvchi kuch."
        ],
        landmarks: "Dumba sohasining bo'rtib turuvchi asosiy massasi",
        attachments: "Origo: Os ilium orqa yuzasi, os sacrum va os coccygis lateral qirralari, lig. sacrotuberale. Insertio: Tuberositas glutea femoris va tractus iliotibialis.",
        neurovascular: "Innervatio: N. gluteus inferior (L5-S2). Vasa: A. glutea inferior va a. glutea superior.",
        clinicalNote: "Kattalarda dumbaga mushak ichi in'eksiyasi o'tkazilganda n. ischiadicus (quymich nervi) ni shikastlamaslik uchun faqat yuqori-tashqi kvadrant (quadrans superolateralis) tanlanadi."
      },
      {
        id: "quadriceps-femoris",
        nameUz: "Sonning to'rt boshli muskuli",
        nameLat: "Musculus quadriceps femoris",
        pageRef: "N.K. Ahmedov, 1-jild, 144-bet, 208-rasm",
        clinicalTag: "YURISH VA TIZZA BO'G'IMI",
        quickFacts: [
          "Sonning oldingi yuzasidagi to'rtta kuchli boshchadan iborat yirik muskul kompleksi.",
          "Tarkibi: m. rectus femoris (to'g'ri son), m. vastus lateralis (lateral keng), m. vastus medialis (medial keng), m. vastus intermedius (oraliq keng muskul).",
          "Tizza bo'g'imida boldirni yozadi (ekstenziya), to'g'ri son muskuli esa chanoq-son bo'g'imida sonni bukadi."
        ],
        landmarks: "Sonning butun oldingi va yon yuzasi",
        attachments: "Origo: Spina iliaca anterior inferior (m. rectus femoris), femur tanasi (keng muskullar). Insertio: Patella orqali ligamentum patellae bilan tuberositas tibiae ga birikadi.",
        neurovascular: "Innervatio: N. femoralis (plexus lumbalis, L2-L4). Vasa: A. femoralis, a. profunda femoris.",
        clinicalNote: "Ushbu muskul atrofiyasi tizza bo'g'imi artrozida tez yuzaga keladi va bo'g'im beqarorligiga (instabillikka) olib keladi."
      },
      {
        id: "triceps-surae",
        nameUz: "Boldirning uch boshli muskuli (Axill payi)",
        nameLat: "Musculus triceps surae et tendo calcaneus",
        pageRef: "N.K. Ahmedov, 1-jild, 152-bet, 214-rasm",
        clinicalTag: "AXILL PAYI VA SAKRASH",
        quickFacts: [
          "Boldirning orqa yuzasida joylashgan bo'lib, ikkita yuzaki qorincha — ikkita boshli boldir muskuli (m. gastrocnemius) va chuqur qatlamdagi kambalasimon muskul (m. soleus) dan iborat.",
          "Barcha boshlar pastda birlashib odam tanasidagi eng baquvvat pay — Axill payi (tendo calcaneus / Achilles) ni hosil qiladi.",
          "Oyoq panjasini bukadi (plantarfleksiya), tovonni ko'tarib oyoq uchida turish va yugurishni ta'minlaydi."
        ],
        landmarks: "Boldirning orqa bo'rtig'i va tovon suyagiga tushuvchi qalin pay",
        attachments: "Origo: Femur lateral va medial do'nglari (gastrocnemius), tibia va fibula orqa yuzasi (soleus). Insertio: Tuber calcanei.",
        neurovascular: "Innervatio: N. tibialis (L5-S2). Vasa: A. tibialis posterior.",
        clinicalNote: "Axill payi yirtilishi sportchilarda to'satdan sakraganda kuzatiladi. Axill refleksi (S1-S2) tovon payiga urilganda tovonning bukilishi bilan baholanadi."
      }
    ]
  }
};

/**
 * ODAM ANATOMIYASI (ATLAS, 1-JILD) - PROF. N.K. AHMEDOV
 * 1-BO'LIM: SUYAKLAR HAQIDA TA'LIMOT (OSTEOLOGIYA) - 4-53 BETLAR, 1-113 RASMLAR
 * Anatomik ma'lumotlar bazasi, terminologiya va ilmiy izohlar
 */

window.ATLAS_DATA = {
  // Metadata
  metadata: {
    title: "Odam anatomiyasi (Atlas, 1-jild)",
    author: "Prof. N.K. Ahmedov",
    section: "1-bo'lim: Suyaklar haqida ta'limot, Osteologiya (Osteologia)",
    pages: "4–53-betlar",
    figures: "1–113-rasmlar",
    terminologySource: "Parij (PNA, 1955), Nyu-York (1960), Visbaden (1965), JSST (1980) Xalqaro anatomik nomenklaturasi"
  },

  // 1-BO'LIM TUSHUNCHALARI
  generalOsteology: {
    definition: "Skelet (yunoncha 'skeletos' — quritilgan) organizmda tayanch bo'ladigan zich to'qimalar (tuzilmalar yig'indisi)dan iborat bo'lib, harakat apparatining sust (passiv) qismini tashkil etadi.",
    weightStats: "Odam skeleti 200 dan ortiq alohida suyaklardan tuzilgan bo'lib, uning umumiy og'irligi 5-6 kg yoki gavda umumiy og'irligining 8-10% ini tashkil qiladi. Harakat apparati (suyaklar, boylamlar va muskullar) esa gavda umumiy og'irligining 72.45% ini tashkil etadi.",
    functions: [
      {
        id: "tayanch",
        titleUz: "Tayanch vazifasi",
        titleLat: "Functio sustentaculum",
        icon: "fa-cubes-stacked",
        desc: "Yumshoq to'qimalar, ichki a'zolar va muskullarning skeletning ayrim qismlariga mustahkam birikib turishi va gavdaning fazodagi vertikal holatini ta'minlashi natijasida vujudga keladi."
      },
      {
        id: "harakat",
        titleUz: "Harakat vazifasi",
        titleLat: "Functio motus",
        icon: "fa-person-walking",
        desc: "Skeletni tashkil etgan suyaklarning o'zaro richaglar hosil qilib, bo'g'imlar vositasida birlashishi va markaziy nerv sistemasi impulslari ostida muskullarning qisqarishi natijasida yuzaga keladi."
      },
      {
        id: "himoya",
        titleUz: "Himoya va biologik vazifa",
        titleLat: "Functio protectionis et hemopoietica",
        icon: "fa-shield-halved",
        desc: "Skelet suyaklari alohida himoya bo'shliqlarini hosil qiladi: kalla suyagi bosh miyani, umurtqa kanali orqa miyani, ko'krak qafasi yurak va o'pkalarni, chanoq bo'shlig'i jinsiy va qovuq a'zolarini tashqi shikastlardan asraydi. Suyak ko'migi (qizil ilik) qon yaratish (gemopoez) a'zosi bo'lib, kalsiy-fosfor mineral almashinuvining asosiy omboridir."
      }
    ],
    chemicalComposition: {
      organic: {
        ratio: "1/3 qism (33.3%)",
        substance: "Ossein (muguz modda)",
        function: "Suyakning elastikligi, egiluvchanligi va bukilishga chidamliligini ta'minlaydi."
      },
      inorganic: {
        ratio: "2/3 qism (66.7%)",
        substance: "Mineral tuzlar (kalsiy fosfat - 51.04%, kalsiy karbonat, magniy tuzlari)",
        function: "Suyakning qattiqligi, pishiqligi va siqilishga chidamliligini ta'minlaydi (eman daraxtidan pishiq, granitdan qattiq, mis va temir kabi mustahkam)."
      },
      ageDynamics: [
        {
          stage: "Yosh bola",
          organicPercent: 55,
          inorganicPercent: 45,
          elasticity: "Juda yuqori (egiluvchan)",
          fragility: "Juda past (kam sinadi, 'yashil novda' sinishi xos)",
          desc: "Yosh bolalar suyagida ossein ko'p bo'lganligi sababli suyak juda egiluvchan, elastik bo'ladi va osonlikcha sinmaydi. Biroq ortiqcha mexanik yuklama tushsa shakli o'zgarishi (qiyshayishi) mumkin."
        },
        {
          stage: "Yetuk / O'rta yosh",
          organicPercent: 33.3,
          inorganicPercent: 66.7,
          elasticity: "Optimal me'yorda",
          fragility: "Minimal (yuqori mustahkamlik)",
          desc: "1/3 organik va 2/3 anorganik moddalarning mukammal nisbati tufayli suyak ulkan yuklamalarga chidaydi (granit va emandan qattiq)."
        },
        {
          stage: "Keksa odam",
          organicPercent: 15,
          inorganicPercent: 85,
          elasticity: "Keskin pasaygan",
          fragility: "Juda yuqori (mo'rt, tez sinuvchan)",
          desc: "Keksa odamlar suyagida ossein miqdori keskin kamayadi, mineral tuzlar ortadi. Natijada suyaklar o'z elastikligini yo'qotib, mo'rt, tez sinadigan (osteoporoz, son suyagi bo'yinchasining sinishi) bo'lib qoladi."
        }
      ],
      vitamins: {
        vitaminD: {
          nameUz: "Vitamin D yetishmovchiligi (Raxit)",
          nameLat: "Rachitis / Hypovitaminosis D",
          effect: "Kalsiy va fosforning ichakdan so'rilishi hamda suyakka cho'kishi buziladi. Suyaklar mineralizatsiyalanmay nimjon, yumshoq bo'lib qoladi va tana og'irligi ostida egilib, qiyshayadi (oyoqlarning O-simon yoki X-simon qiyshayishi, ko'krak qafasining deformatsiyasi)."
        },
        vitaminA: {
          nameUz: "Vitamin A yetishmovchiligi",
          nameLat: "Hypovitaminosis A",
          effect: "Suyak to'qimasi o'sishi va suyak shakllanishining muvozanati buziladi. Suyaklar haddan tashqari qalinlashib, yo'g'onlashadi, ularning ichidagi kanalchalar va bo'shliqlar patologik kattalashadi."
        }
      }
    },
    classification: [
      {
        id: "naysimon",
        nameUz: "Naysimon suyaklar",
        nameLat: "Ossa longa et brevia tubularia",
        badge: "Richag vazifasi",
        types: [
          {
            sub: "Uzun naysimon suyaklar",
            subLat: "Ossa longa",
            examples: "Yelka (humerus), bilak (radius, ulna), son (femur), boldir (tibia, fibula)",
            desc: "Tana (diafiz) va ikki uchi (epifiz)dan iborat, ichida ilik bo'shlig'i (cavitas medullaris) mavjud. Harakat richagi vazifasini bajaradi."
          },
          {
            sub: "Kalta naysimon suyaklar",
            subLat: "Ossa brevia",
            examples: "Qo'l va oyoq kaft suyaklari (ossa metacarpi, metatarsi), barmoq falangalari (phalanges)",
            desc: "Kichik o'lchamli, cheklangan harakat richaglarini hosil qiladi."
          }
        ]
      },
      {
        id: "govak",
        nameUz: "G'ovak suyaklar",
        nameLat: "Ossa spongiosa",
        badge: "Amortizatsiya va mustahkamlik",
        types: [
          {
            sub: "Uzun g'ovak suyaklar",
            subLat: "Ossa spongiosa longa",
            examples: "Qovurg'alar (costae), to'sh suyagi (sternum)",
            desc: "Asosan g'ovak moddadan iborat bo'lib, yupqa zich modda plastinkasi bilan qoplangan; tayanch va ko'krak a'zolarini himoya qilish vazifasini bajaradi."
          },
          {
            sub: "Kalta g'ovak suyaklar",
            subLat: "Ossa spongiosa brevia",
            examples: "Umurtqalar (vertebrae), qo'l-oyoq kaft usti suyaklari (ossa carpi, ossa tarsi)",
            desc: "Katta yuklamani qabul qilib, zarba kuchini amortizatsiya qiladi."
          },
          {
            sub: "Sesamasimon suyaklar",
            subLat: "Ossa sesamoidea",
            examples: "Tizza qopqog'i (patella - eng katta sesamasimon suyak), no'xatsimon suyak (os pisiforme), barmoq sesamasimonlari",
            desc: "Muskul paylarining orasida, bo'g'imlar yaqinida joylashib, paylarning ishqalanishini kamaytiradi va ularning richag yelkasini oshiradi."
          }
        ]
      },
      {
        id: "yassi",
        nameUz: "Yassi suyaklar",
        nameLat: "Ossa plana",
        badge: "Bo'shliq va himoya",
        types: [
          {
            sub: "Kallaning yassi suyaklari",
            subLat: "Ossa calvariae",
            examples: "Peshona (os frontale), tepa (os parietale), ensa (os occipitale)",
            desc: "Tashqi va ichki zich plastinkalar (lamina externa et interna/vitrea) hamda ular orasidagi diploe (g'ovak modda)dan tuzilgan; bosh miyani ishonchli himoya qiladi."
          },
          {
            sub: "Kamar yassi suyaklari",
            subLat: "Ossa cinguli",
            examples: "Kurak suyagi (scapula), chanoq suyagi (os coxae)",
            desc: "Keng yassi yuzalarga ega bo'lib, kuchli muskullar birikishi uchun qulay tayanch vazifasini o'taydi."
          }
        ]
      },
      {
        id: "aralash",
        nameUz: "Aralash suyaklar",
        nameLat: "Ossa mixta",
        badge: "Murakkab shakl",
        types: [
          {
            sub: "Aralash suyaklar",
            subLat: "Ossa mixta",
            examples: "Kalla asosi suyaklari (os sphenoidale, os temporale), yuz skeleti suyaklari",
            desc: "Bir necha turli xildagi suyak qismlarining qo'shilishidan hosil bo'lgan, murakkab shakl va ko'p xil funksiyaga ega suyaklar."
          }
        ]
      }
    ]
  },

  // 1-RASM VA 2-RASM SKELET HOTSPOTLARI (KLINIK MEDICAL DOSSIER)
  skeletonRegions: [
    {
      id: "cranium",
      moduleId: "module5",
      nameUz: "Bosh skeleti (Kalla)",
      nameLat: "Cranium",
      bonesCount: "23 ta suyak (miya qutisi: 8 ta, yuz bo'limi: 14-15 ta)",
      pageRef: "Ahmedov: 33–53-betlar, 69–113-rasmlar",
      clinicalTag: "NEYROXIRURGIYA & LOR",
      quickFacts: [
        "Jami 23 ta suyak: 8 ta miya bo'limi (neurocranium) va 15 ta yuz bo'limi (viscerocranium)",
        "Yagona harakatchan bo'g'imli suyagi — pastki jag' (mandibula)",
        "Kalla ichki asosida 12 juft kalla nervlari chiqadigan maxsus teshik va kanallar joylashgan"
      ],
      landmarks: "Calvaria (kalla qopqog'i) tojsimon, o'qsimon va lambdasimon choklar (suturae) bilan birikadi; Basis cranii esa 3 ta chuqurchaga (oldingi, o'rta, orqa) bo'linadi.",
      attachments: "Chaynov muskullari (m. temporalis, m. masseter, mm. pterygoidei), mimika muskullari, ensa-peshona muskuli (m. epicranius).",
      neurovascular: "12 juft kalla nervlari (I–XII), a. carotis interna, a. meningea media, v. jugularis interna, sinus durae matris.",
      clinicalNote: "Kallaning yon yuzasidagi Pterion sohasida (peshona, tepa, chakka va ponasimon suyaklar tutashgan joy) suyak yupqa bo'lib, uning ichki yuzasidan o'rta miya pardasi arteriyasi (a. meningea media) o'tadi. Ushbu sohaga zarba tekkanda yorilib, o'ta xavfli epidural gematoma rivojlanadi — zudlik bilan dekompressiv kraniotomiya talab etiladi.",
      desc: "Bosh miya, eshituv, ko'rish, muvozanat va hid bilish a'zolari hamda nafas va ovqat hazm qilish tizimlarining boshlang'ich qismlarini ishonchli saqlaydi."
    },
    {
      id: "truncus",
      moduleId: "module2",
      nameUz: "Tana skeleti (Umurtqa va Ko'krak)",
      nameLat: "Skeleton trunci",
      bonesCount: "Umurtqa pog'onasi (33-34 ta), 12 juft qovurg'alar va to'sh suyagi",
      pageRef: "Ahmedov: 7–14-betlar, 5–22-rasmlar",
      clinicalTag: "VERTEBROLOGIYA & REANIMATSIYA",
      quickFacts: [
        "33–34 ta umurtqa (7 bo'yin, 12 ko'krak, 5 bel, 5 dumg'aza, 4–5 dum)",
        "4 ta fiziologik egrilik: 2 ta lordoz (bo'yin, bel) va 2 ta kifoz (ko'krak, dumg'aza)",
        "To'sh suyagi (sternum) qizil suyak iligi olishda sternal punksiya uchun asosiy obyektdir"
      ],
      landmarks: "Corpus vertebrae, arcus vertebrae, foramina intervertebralia, processus spinosus et transversus, manubrium va angulus sterni (Ludwig burchagi).",
      attachments: "Lig. longitudinale anterius et posterius, ligg. flava, m. erector spinae, qovurg'alararo muskullar (mm. intercostales) va diafragma.",
      neurovascular: "Orqa miya (medulla spinalis), 31 juft spinal nervlar, a. vertebralis, interkostal tomir-nerv tutami (qovurg'a pastki egatida).",
      clinicalNote: "Bel sohasida (L4–L5 va L5–S1) umurtqalararo disk churrasi (grija) eng ko'p uchraydi va n. ischiadicusni siqib, lumbosakral radikulopatiya keltirib chiqaradi. Diagnostik lumbal punksiya orqa miya konusidan pastda, L3–L4 yoki L4–L5 sathida amalga oshiriladi.",
      desc: "Umurtqa pog'onasi (columna vertebralis) orqa miyani himoyalaydi, gavda og'irligini ko'taradi; ko'krak qafasi (thorax) ko'krak bo'shlig'i a'zolarini o'rab turadi."
    },
    {
      id: "membrum_superius",
      moduleId: "module3",
      nameUz: "Qo'l suyaklari (Ossa membri superioris)",
      nameLat: "Ossa membri superioris",
      bonesCount: "64 ta suyak (yelka kamari: 4 ta, erkin qism: 60 ta)",
      pageRef: "Ahmedov: 15–22-betlar, 23–45-rasmlar",
      clinicalTag: "TRAVMATOLOGIYA & MIKROXIRURGIYA",
      quickFacts: [
        "Jami 64 ta suyak (har bir qo'lda 32 tadan)",
        "Yelka bo'g'imi inson tanasidagi eng harakatchan ko'p o'qli shar-simon bo'g'im",
        "Kaft usti (carpus) 8 ta kichik g'ovak suyaklardan iborat bo'lib, nozik mehnat harakatlarini ta'minlaydi"
      ],
      landmarks: "Clavicula (S-simon), scapula (spina, acromion, proc. coracoideus), humerus, ulna (olecranon), radius (proc. styloideus) va carpus.",
      attachments: "M. deltoideus, rotator cuff (supraspinatus, infraspinatus, teres minor, subscapularis), m. biceps va triceps brachii.",
      neurovascular: "Plexus brachialis: n. radialis, n. ulnaris, n. medianus, n. axillaris; a. brachialis, a. radialis va ulnaris.",
      clinicalNote: "Yelka suyagining jarrohlik bo'yinchasi (collum chirurgicum) singanda n. axillaris zararlanish xavfi yuqori. Distal radius sinishi (Kollis sinishi) qo'lga yiqilganda eng ko'p uchraydigan travmadir. Kaft kanalida (canalis carpi) n. medianus qisilib, tunel sindromi yuzaga keladi.",
      desc: "Yelka kamari (o'mrov, kurak) va erkin qo'l (yelka, tirsak, bilak, kaft usti, kaft va barmoq falangalari)dan iborat bo'lib, nozik mehnat harakatlariga moslashgan."
    },
    {
      id: "membrum_inferius",
      moduleId: "module4",
      nameUz: "Oyoq suyaklari (Ossa membri inferioris)",
      nameLat: "Ossa membri inferioris",
      bonesCount: "62 ta suyak (chanoq kamari: 2 ta, erkin qism: 60 ta)",
      pageRef: "Ahmedov: 23–32-betlar, 46–68-rasmlar",
      clinicalTag: "ORTOPEDIYA & ANGIOLOGIYA",
      quickFacts: [
        "Jami 62 ta suyak (har bir oyoqda 31 tadan)",
        "Odam skeletidagi eng uzun suyak — son suyagi (femur)",
        "Oyoq gumbazlari (arcus pedis) zarba kuchini 70-80% amortizatsiya qilib, kalla va miyani chayqalishdan asraydi"
      ],
      landmarks: "Os coxae (crista iliaca, spina iliaca, tuber ischiadicum, acetabulum), femur (caput, collum, trochanter major), patella, tibia va fibula, calcaneus.",
      attachments: "M. gluteus maximus, m. quadriceps femoris, ishiokrural muskullar, tendo calcaneus (Axill payi).",
      neurovascular: "N. femoralis, n. ischiadicus, n. tibialis, n. fibularis communis; a. femoralis, a. poplitea, a. tibialis anterior et posterior.",
      clinicalNote: "Keksa odamlarda osteoporoz fonida son suyagi bo'yinchasi (collum femoris) sinishi xavfli hisoblanadi (medial a. circumflexa uzilib, son boshchasining avaskulyar nekrozi kelib chiqadi). Kichik boldir suyagi bo'yinchasi sinishida n. fibularis communis ezilib, 'osilib qoluvchi panja' (pes varus / foot drop) yuzaga keladi.",
      desc: "Chanoq kamari (yonbosh, qov, quymich) va erkin oyoq (son, tizza qopqog'i, katta va kichik boldir, tovon, oshiq, kaft oldi va barmoqlar)dan iborat; tik turish va lokomotsiyani ta'minlaydi."
    }
  ],

  // 3-4-RASMLAR: KATTA BOLDIR SUYAGI QATLAM ANATOMIYASI (KLINIK MEDICAL DOSSIER)
  tibiaLayers: [
    {
      id: "epiphysis",
      pinNumber: "1",
      nameUz: "Epifiz (Suyakning bo'g'im boshi)",
      nameLat: "Epiphysis proximalis et distalis",
      pageRef: "Ahmedov: 4–6-betlar, 3-rasm",
      clinicalTag: "ARTROLOGIYA",
      quickFacts: [
        "Gialin tog'ay bilan qoplangan silliq bo'g'im yuzasi (facies articularis)",
        "Asosan substantia spongiosa to'rlaridan tashkil topgan",
        "Qon tomirlarga boy subxondral suyak plastinkasi bilan himoyalangan"
      ],
      landmarks: "Condylus medialis et lateralis tibiae, facies articularis superior, eminentia intercondylaris.",
      attachments: "Tizza bo'g'imi xochsimon boylamlari (ligg. cruciata anterior et posterior) va menisklar.",
      neurovascular: "Rete articulare genus qon tomir to'ri, n. tibialis va n. fibularis artikulyar shoxlari.",
      clinicalNote: "Yosh o'tishi bilan artrozda (gonartroz) epifiz gialin tog'ayi yemiriladi, subxondral skleroz va osteofitlar hosil bo'ladi. Epifizar sinishlar bo'g'im ichi sinishi hisoblanib, bo'g'im kongruentligini tiklash uchun mutlaq aniq jarrohlik repozitsiyasini talab etadi.",
      desc: "Uzun naysimon suyaklarning ikki uchi bo'lib, bo'g'im yuzalari (facies articularis) bilan tugaydi. Asosan g'ovak moddadan (substantia spongiosa) tuzilgan va yupqa gialin tog'ay bilan qoplangan."
    },
    {
      id: "spongiosa",
      pinNumber: "2",
      nameUz: "G'ovak modda (Ko'mik qavat)",
      nameLat: "Substantia spongiosa",
      pageRef: "Ahmedov: 4–6-betlar, 3-rasm",
      clinicalTag: "GEMATOLOGIYA",
      quickFacts: [
        "Suyak to'sinchalari (trabekulalar) mexanik yuklama chiziqlari bo'ylab yo'nalgan",
        "Katakchalarida faol gemopoez o'chog'i — qizil suyak iligi (medulla ossium rubra) saqlanadi",
        "Yengil, ammo vertikal bosimga o'ta chidamli biologik me'moriy karkas"
      ],
      landmarks: "Epifiz va metafiz ichki bo'shlig'i, trabekulyar yo'nalishlar.",
      attachments: "Ichki tomondan endost pardasi bilan qoplangan.",
      neurovascular: "Sinusoid kapillyarlar to'ri, oziqlantiruvchi arteriolalar.",
      clinicalNote: "G'ovak moddada qizil ilik umrboqiy saqlanib qolishi sababli, klinik gematologiyada suyak iligi aspiratsiyasi va biopsiyasi o'tkaziladi. Tizimli osteoporozda birinchi navbatda aynan trabekulalar siyraklashib, suyak pishiqligi keskin pasayadi.",
      desc: "Yupqa suyak to'sinchalari (trabekulalar)dan iborat bo'lib, ular mexanik yuklama (siqilish va cho'zilish) chiziqlari bo'ylab aniq yo'nalgan. Trabekulalar orasidagi katakchalarda qon yaratuvchi qizil suyak iligi joylashadi."
    },
    {
      id: "compacta",
      pinNumber: "3",
      nameUz: "Zich modda (Kortikal qattiq qobiq)",
      nameLat: "Substantia compacta",
      pageRef: "Ahmedov: 4–6-betlar, 3-rasm",
      clinicalTag: "GISTOLOGIYA & TRAVMA",
      quickFacts: [
        "Diafiz devorini hosil qiladi, qalinligi bir necha millimetrga yetadi",
        "Asosiy strukturaviy morfologik birligi — Osteon (Gavers sistemasi)",
        "Mexanik pishiqligi eman daraxti va granitdan ustun turadi"
      ],
      landmarks: "Diafiz tashqi kortikal qatlami, Gavers va Folkman kanallari.",
      attachments: "Sharpey (perforatsiyalovchi) kollagen tolalari orqali periost zich birikadi.",
      neurovascular: "Canales centrales (Gavers kanallari) ichidan kapillyar va nerv tolasi o'tadi.",
      clinicalNote: "Katta boldir suyagi oldingi qirrasi (margo anterior) teri ostida bevosita yotadi va muskul bilan qoplanmagan. Shu sababli zarba to'g'ridan-to'g'ri tushganda ochiq sinishlar va periostit eng ko'p tibia diafizida kuzatiladi.",
      desc: "Diafiz devorini hosil qiluvchi o'ta qattiq va zich suyak qavati. Osteonlar (Gavers sistemalari)dan tashkil topgan bo'lib, suyakka ulkan mustahkamlik bag'ishlaydi."
    },
    {
      id: "cavitas_medullaris",
      pinNumber: "4",
      nameUz: "Ilik bo'shlig'i (Ilik kanali)",
      nameLat: "Cavitas medullaris",
      pageRef: "Ahmedov: 4–6-betlar, 3-rasm",
      clinicalTag: "REANIMATOLOGIYA",
      quickFacts: [
        "Voyaga yetgan odamda yog' to'qimasiga boy sariq ilik (medulla ossium flava) bilan to'lgan",
        "Yupqa biriktiruvchi to'qima pardasi — endosteum bilan qoplangan",
        "Og'ir anemiyada sariq ilik yana qon yaratuvchi qizil ilikka aylana oladi"
      ],
      landmarks: "Diafiz ichki silindrik kovak kanali.",
      attachments: "Endosteum (ichki suyak pardasi).",
      neurovascular: "A. nutricia markaziy shoxlari, venoz sinusoidlar.",
      clinicalNote: "Yirik naysimon suyaklar (tibia, femur) og'ir sinishlarida medullyar bo'shliqdagi yog' tomchilari shikastlangan tomirlar orqali qon oqimiga tushib, xavfli yog' emboliyasi (Fat Embolism Syndrome: gipoksiya, petexiya, miya simptomlari) keltirib chiqarishi mumkin.",
      desc: "Diafiz markazidagi uzun kovak kanal. Voyaga yetgan odamda bu kanal yog' to'qimasiga boy sariq suyak iligi (medulla ossium flava) bilan to'lgan bo'ladi."
    },
    {
      id: "metaphysis",
      pinNumber: "5",
      nameUz: "Metafiz va metaepifizar o'sish tog'ayi",
      nameLat: "Metaphysis et cartilago epiphysialis",
      pageRef: "Ahmedov: 4–6-betlar, 3-rasm",
      clinicalTag: "PEDIATRIYA & INFEKSIYA",
      quickFacts: [
        "Epifiz va diafiz orasidagi oraliq o'sish zonasi",
        "Bolalikda metaepifizar tog'ay suyakning bo'yiga o'sishini ta'minlaydi",
        "20–25 yoshda to'liq suyaklanib, linea epiphysialis ga aylanadi"
      ],
      landmarks: "O'sish plastinkasi (physis) zonasi.",
      attachments: "Bo'g'im kapsulasi chetlari va qo'shni periost.",
      neurovascular: "Metafiz tomir halqalari (qon oqimi sekin bo'lgan kapillyar to'r).",
      clinicalNote: "Bolalarda o'tkir gematogen osteomielit (suyak yiringlashi) 90% hollarda aynan metafizda boshlanadi, chunki bu yerdagi qon tomirlarida oqim sekinlashgan bo'lib, bakteriyalar oson o'tirib qoladi. Salter-Harris tipidagi o'sish tog'ayi jarohatlari esa suyak o'sishining to'xtashiga olib kelishi mumkin.",
      desc: "Epifiz bilan diafiz orasidagi oraliq zona. Yoshlik davrida bu yerda metaepifizar tog'ay bo'lib, suyakning bo'yiga o'sishini ta'minlaydi; 20-25 yoshda suyaklanib yo'qoladi."
    },
    {
      id: "periosteum_fibrous",
      pinNumber: "7",
      nameUz: "Suyak usti pardasi (Tashqi fibroz qavati)",
      nameLat: "Periosteum (Stratum fibrosum)",
      pageRef: "Ahmedov: 6-bet, 4-rasm",
      clinicalTag: "SPORT TIBBIYOTI",
      quickFacts: [
        "Pishiq, zich kollagen tolalardan iborat himoya qatlami",
        "Pay va boylamlarning suyakka mustahkam ulanishini ta'minlaydi",
        "Sharpey tolalari vositasida kortikal suyakka mixlanadi"
      ],
      landmarks: "Suyakning bo'g'im yuzasidan tashqari butun tashqi yuzasi.",
      attachments: "Fastsiya, paylar va mushak aponevrozlari.",
      neurovascular: "Yuzaki kapillyar to'rlar, sezuvchi nerv tolalari.",
      clinicalNote: "Sportchilarda va uzoq piyoda yurganda haddan tashqari yuklama sababli fibroz qavat mikrozararlanib, 'Shin Splints' (katta boldir periostiti) deb ataluvchi chidab bo'lmas og'riqli sindrom kelib chiqadi.",
      desc: "Pishiq kollagen tolalardan iborat bo'lib, suyakni tashqi tomondan zich o'rab turadi, pay va boylamlarning birikishini mustahkamlaydi."
    },
    {
      id: "periosteum_osteogenic",
      pinNumber: "8",
      nameUz: "Suyak usti pardasi (Ichki osteogen/kambial qavat)",
      nameLat: "Periosteum (Stratum osteogenicum / cambiale)",
      pageRef: "Ahmedov: 6-bet, 4-rasm",
      clinicalTag: "TRAVMA & REGENERATSIYA",
      quickFacts: [
        "Osteogen (osteoblast) hujayralarga o'ta boy kambial qavat",
        "Suyakning eniga appozitsion o'sishini ta'minlaydi",
        "Singan suyak bitishida birlamchi kallus (suyak qadog'i) hosil qiluvchi bosh omil"
      ],
      landmarks: "Fibroz qavat ostidagi nozik osteogen zona.",
      attachments: "Kambial to'qima hujayralari.",
      neurovascular: "Yuqori zichlikdagi og'riq sezuvchi nerv tolalari va oziqlantiruvchi mikrotomirlar.",
      clinicalNote: "Suyak zarbalanganda yoki singanda paydo bo'ladigan o'ta o'tkir og'riq aynan periostning ichki qavatidagi nositseptorlar (og'riq retseptorlari) qo'zg'alishi natijasidir. Jarrohlikda periostni ehtiyotlab saqlash suyakning qayta bitishini (regeneratsiya) tezlashtiradi.",
      desc: "Qon tomirlar va nervlarga boy bo'lib, osteoblast hujayralarini saqlaydi. Suyakning eniga o'sishini va singan suyaklarning regeneratsiyasini ta'minlaydi."
    },
    {
      id: "foramen_nutricium",
      pinNumber: "9",
      nameUz: "Oziq teshigi va kanali",
      nameLat: "Foramen nutricium et canalis nutricius",
      pageRef: "Ahmedov: 6-bet, 4-rasm",
      clinicalTag: "ANGIOLOGIYA",
      quickFacts: [
        "Diafiz orqa yuzasida joylashgan qiya teshik",
        "Katta qon tomir-nerv tutami suyak iligiga kiruvchi darvoza",
        "Katta boldir suyagida proksimal tomonga qiya yo'naladi"
      ],
      landmarks: "Facies posterior tibiae, linea musculi solei dan pastroqda.",
      attachments: "Canalis nutricius devorlari.",
      neurovascular: "Arteria nutricia (a. tibialis posterior tarmog'i), v. nutricia va vegetativ simpatik nerv tolalari.",
      clinicalNote: "Diafizning oziq teshigi sohasidagi sinishlarida asosiy oziqlantiruvchi arteriya uzilishi mumkin. Bu suyak iligining ishemiyasiga va sinishning bitmasdan soxta bo'g'im (pseudoarthrosis) hosil bo'lishiga olib kelishi mumkin.",
      desc: "Diafiz yuzasidagi qiya teshik bo'lib, u orqali suyak to'qimasi va suyak iligini oziqlantiruvchi yirik arteriya, vena hamda nerv tolalari kirib boradi."
    }
  ],

  // 2-BO'LIM: TANA SKELETI
  spineData: {
    totalVertebrae: "33–34 ta umurtqalar (vertebrae)",
    lengths: {
      male: "73–75 sm",
      female: "69–71 sm",
      regions: [
        { nameUz: "Bo'yin qismi", nameLat: "Pars cervicalis (C1–C7)", count: 7, length: "13–14 sm", color: "#38bdf8" },
        { nameUz: "Ko'krak bo'limi", nameLat: "Pars thoracica (Th1–Th12)", count: 12, length: "27–30 sm", color: "#34d399" },
        { nameUz: "Bel qismi", nameLat: "Pars lumbalis (L1–L5)", count: 5, length: "17–18 sm", color: "#fbbf24" },
        { nameUz: "Dumg'aza qismi", nameLat: "Os sacrum (S1–S5 fused)", count: 5, length: "12–15 sm", color: "#f87171" },
        { nameUz: "Dum qismi", nameLat: "Os coccygis (Co1–Co4/5)", count: "4–5", length: "Rudiment", color: "#c084fc" }
      ]
    },
    curvatures: [
      { nameUz: "Bo'yin lordozi", nameLat: "Lordosis cervicalis", type: "Oldinga qavariq", time: "Bola boshini tuta boshlaganda (2-3 oylikda)" },
      { nameUz: "Ko'krak kifozi", nameLat: "Kyphosis thoracica", type: "Orqaga qavariq", time: "Bola o'tira boshlaganda (6 oylikda)" },
      { nameUz: "Bel lordozi", nameLat: "Lordosis lumbalis", type: "Oldinga qavariq", time: "Bola oyoqqa turib yura boshlaganda (10-12 oylikda)" },
      { nameUz: "Dumg'aza kifozi", nameLat: "Kyphosis sacralis", type: "Orqaga qavariq", time: "Chanoq a'zolari joylashuvi bilan bog'liq" }
    ],
    vertebraConstructorParts: [
      {
        id: "corpus",
        nameUz: "Umurtqa tanasi",
        nameLat: "Corpus vertebrae",
        pageRef: "Ahmedov: 7–8-betlar, 5, 6-rasmlar",
        clinicalTag: "VERTEBROLOGIYA",
        quickFacts: [
          "Massiv oldingi tayanch qismi; pastga tushgan sari og'irlik ortishi sababli kattalashib boradi",
          "Ichkarisida qizil suyak iligiga boy substantia spongiosa joylashgan",
          "Qo'shni umurtqa tanalari bilan diskus intervertebralis (tog'ay disk) vositasida tutashadi"
        ],
        landmarks: "Facies terminalis superior et inferior, anulus epiphysialis.",
        attachments: "Ligamentum longitudinale anterius et posterius.",
        neurovascular: "A. vertebralis va interkostal/lyumbal arteriyalar tarmoqlari.",
        clinicalNote: "Osteoporozda tana og'irligi ostida umurtqa tanasining kompressiv sinishi (panshaxasimon deformatsiya) kuzatiladi. Shuningdek keksayganda umurtqa bo'ylarida osteofitlar (spondilez) o'sib chiqadi.",
        desc: "Old tomonda joylashgan massiv tayanch qismi; pastga tushgan sari og'irlik ortishi sababli kattalashib boradi."
      },
      {
        id: "arcus",
        nameUz: "Umurtqa ravog'i",
        nameLat: "Arcus vertebrae",
        pageRef: "Ahmedov: 7–8-betlar, 5-rasm",
        clinicalTag: "NEYROXIRURGIYA",
        quickFacts: [
          "Umurtqa tanasining orqa tomonini o'rab turuvchi yarim xalqa",
          "Tana bilan birgalikda orqa miya yotadigan foramen vertebraleni hosil qiladi",
          "Undan 7 ta o'siq (1 ta toq spinosus, 2 ta transversus, 4 ta articulares) boshlanadi"
        ],
        landmarks: "Lamina arcus vertebrae, incisura vertebralis superior et inferior.",
        attachments: "Ligamenta flava (sariq boylamlar — nihoyatda elastik).",
        neurovascular: "Orqa miya pardalari va venoz chigallari.",
        clinicalNote: "Spina bifida — embrional rivojlanishda umurtqa ravog'ining orqada tutashmasligi natijasida tug'ma orqa miya churralari (meningotsele, mielomeningotsele) kelib chiqadi. Neyroxirurgiyada orqa miyaga kirish uchun laminektomiya (ravoqni rezeksiya qilish) bajariladi.",
        desc: "Tana orqasidan chiqib, umurtqa teshigini (foramen vertebrale) hosil qiluvchi yarim xalqa."
      },
      {
        id: "pedunculus",
        nameUz: "Ravoq oyoqchalari",
        nameLat: "Pedunculi arcus vertebrae",
        pageRef: "Ahmedov: 7–8-betlar",
        clinicalTag: "ORTOPEDIYA",
        quickFacts: [
          "Ravoqni umurtqa tanasi bilan bog'lovchi tor qismlar",
          "Ustki va pastki umurtqa o'ymalarini (incisurae vertebrales) chegaralab turadi",
          "Umurtqa jarrohligida fiksatsiyalovchi vintlar (pedicle screw) kiritiladigan tayanch nuqta"
        ],
        landmarks: "Incisura vertebralis superior et inferior.",
        attachments: "Ravoq fastsiyalari.",
        neurovascular: "Foramen intervertebralening old devorini hosil qiladi; spinal nerv yonidan o'tadi.",
        clinicalNote: "Spondiloliz — ko'pincha L5 umurtqaning ravoq oyoqchasida charchash (stress) sinishi bo'lib, umurtqaning oldinga siljishi (spondilolistez)ga sabab bo'ladi.",
        desc: "Ravoqni umurtqa tanasi bilan birlashtiruvchi tor qismlar."
      },
      {
        id: "spinosus",
        nameUz: "Qirrali (orqa) o'siq",
        nameLat: "Processus spinosus",
        pageRef: "Ahmedov: 7–8-betlar, 5, 9-rasmlar",
        clinicalTag: "TOPOGRAFIYA",
        quickFacts: [
          "Ravoq o'rtasidan to'g'ri orqaga yo'nalgan toq o'siq",
          "Ko'krak sohasida черепицаdek ustma-ust tushib, orqa miyani himoyalaydi",
          "Bel sohasida plastinkasimon gorizontal joylashgan bo'lib, oraliq punksiya uchun ochiq qoladi"
        ],
        landmarks: "Processus spinosus C1–L5; C7 bo'rtib chiquvchi umurtqa (vertebra prominens).",
        attachments: "Ligamentum supraspinale, ligamentum interspinale, ligamentum nuchae, m. trapezius va orqa muskullari.",
        neurovascular: "Mushak va teri tarmoqlari.",
        clinicalNote: "Orqa qirrali o'siqlar teri ostida bevosita paypaslanadi. Lumbal punksiya vaqtida nina L3–L4 yoki L4–L5 qirrali o'siqlari orasidan o'tkaziladi. Skoliozni aniqlashda qirrali o'siqlar chizig'ining egriligi tekshiriladi.",
        desc: "Ravoq o'rtasidan to'g'ri orqaga yo'nalgan toq o'siq; muskullar va boylamlar birikadi."
      },
      {
        id: "transversus",
        nameUz: "Ko'ndalang o'siqlar",
        nameLat: "Processus transversus (juft)",
        pageRef: "Ahmedov: 7–8-betlar, 5, 8-rasmlar",
        clinicalTag: "ANATOMIK MO'LJAL",
        quickFacts: [
          "Ravoqning ikki yon tomoniga yo'nalgan juft gorizontal o'siqlar",
          "Bo'yin umurtqalarida foramen processus transversus teshigiga ega (a. vertebralis o'tadi)",
          "Ko'krak umurtqalarida qovurg'a bilan bo'g'im hosil qiluvchi fovea costalis transversalis bor"
        ],
        landmarks: "Tuberculum anterius et posterius (bo'yinda), fovea costalis transversalis (ko'krakda).",
        attachments: "M. scalenus anterior, medius, posterior, mm. levatores costarum, mm. intertransversarii.",
        neurovascular: "A. et v. vertebralis (C1–C6 teshiklarida), spinal nervlarning oldingi shoxlari.",
        clinicalNote: "VI bo'yin umurtqasi (C6) ko'ndalang o'sig'idagi tuberculum caroticum do'mbog'iga umumiy uyqu arteriyasini qisib qon to'xtatish mumkin. Bel sohasida ko'ndalang o'siqlar sinishi kuchli travmalarda psoas muskuli tortishi natijasida uchraydi.",
        desc: "Ravoqning ikki yon tomoniga yo'nalgan juft o'siqlar; qovurg'a yoki muskullar birikadi."
      },
      {
        id: "articularis",
        nameUz: "Bo'g'im o'simtalari",
        nameLat: "Processus articulares superiores et inferiores (4 ta)",
        pageRef: "Ahmedov: 7–8-betlar",
        clinicalTag: "REVMATOLOGIYA",
        quickFacts: [
          "Har bir umurtqada 4 ta: 2 ta ustki va 2 ta pastki bo'g'im o'simtasi",
          "Qo'shni umurtqalar o'rtasida faset (yoy-o'simtali / zigoapofizar) bo'g'imlarni hosil qiladi",
          "Umurtqa pog'onasining bukilish, yozilish va burilish yo'nalishini belgilaydi"
        ],
        landmarks: "Facies articularis superior et inferior.",
        attachments: "Bo'g'im kapsulasi va yordamchi boylamlar.",
        neurovascular: "Spinal nervlarning medial orqa tarmoqlari (faset bo'g'imini innervatsiya qiladi).",
        clinicalNote: "Faset bo'g'imlari artrozi (spondiloartroz) surunkali bel va bo'yin og'rig'ining asosiy sabablaridan biridir. Davolashda rentgen nazorati ostida faset bo'g'imlariga blokada yoki radiochastotali denervatsiya qo'llaniladi.",
        desc: "Qo'shni umurtqalarning o'zaro bo'g'im hosil qilib birlashishini ta'minlaydi."
      },
      {
        id: "canal",
        nameUz: "Umurtqa kanali",
        nameLat: "Canalis vertebralis",
        pageRef: "Ahmedov: 7, 14-betlar, 14, 15-rasmlar",
        clinicalTag: "NEYROLOGIYA",
        quickFacts: [
          "Barcha umurtqa teshiklarining ustma-ust tushishidan hosil bo'lgan kanal",
          "Kalla suyagining foramen magnum teshigidan boshlanib, dumg'aza yorig'igacha (hiatus sacralis) davom etadi",
          "Orqa miya (medulla spinalis), uning 3 ta pardasi va tomirlarini himoyalaydi"
        ],
        landmarks: "Canalis vertebralis, spatium epidurale (epidural bo'shliq), spatium subarachnoideum.",
        attachments: "Dura mater spinalis, lig. denticulatum.",
        neurovascular: "Orqa miya, ot dumi (cauda equina), a. spinalis anterior et posteriores, venoz chigallar.",
        clinicalNote: "Umurtqa kanali stenozi (torayishi) keksayganda disk churralari va sariq boylam qalinlashuvi sababli yuzaga keladi. Bu 'neyrogen oqsoqlik' (yurganda oyoqlarda karaxtlik va zaiflik) keltirib chiqaradi.",
        desc: "Barcha umurtqa teshiklarining ustma-ust tushishidan hosil bo'lgan kanal; unda orqa miya (medulla spinalis) yotadi."
      },
      {
        id: "intervertebral_foramina",
        nameUz: "Umurtqalararo teshiklar",
        nameLat: "Foramina intervertebralia",
        pageRef: "Ahmedov: 8-bet",
        clinicalTag: "RADIKULOPATIYA",
        quickFacts: [
          "Qo'shni umurtqalarning ustki va pastki o'ymalari qo'shilishidan hosil bo'ladi",
          "Har tomondan 31 juft spinal nervlar va tomirlar chiqadigan darvoza",
          "Kanal devorini old tomondan umurtqalararo disk va orqa tomondan faset bo'g'imi chegaralaydi"
        ],
        landmarks: "Incisura vertebralis inferior (yuqori umurtqaning) va incisura vertebralis superior (pastki umurtqaning).",
        attachments: "Teshik atrofidagi kapsula va boylamlar.",
        neurovascular: "Nervus spinalis (ildizchalari), orqa miya tuguni (ganglion sensorium), r. meningeus, a. va v. radicularis.",
        clinicalNote: "Disk churrasi (grija) yoki spondilartroz osteofitlari umurtqalararo teshikni toraytirib, spinal nerv ildizchasini qisib qo'yadi — bu keskin radikulyar og'riq (radikulit), sezgi yo'qolishi va parezga olib keladi.",
        desc: "Yuqori va pastki umurtqa o'ymalari qo'shilishidan hosil bo'ladi; bu teshiklardan orqa miya nervlari va qon tomirlari chiqadi."
      }
    ],
    specialVertebrae: {
      c1: {
        nameUz: "I bo'yin umurtqasi — Atlant",
        nameLat: "Atlas (C1)",
        figs: "10, 11-rasmlar",
        pageRef: "Ahmedov: 10-bet, 10, 11-rasmlar",
        clinicalTag: "SHOSHILINCH NEYROTRAVMA",
        quickFacts: [
          "Tanasi (corpus) va qirrali o'sig'i bo'lmaydi",
          "Oldingi ravoq (arcus anterior) va orqa ravoq (arcus posterior) hamda massae laterales dan tuzilgan",
          "Oldingi ravoq ichki yuzasida dens axis uchun fovea dentis chuqurchasi mavjud"
        ],
        landmarks: "Arcus anterior/posterior, fovea dentis, massae laterales, sulcus arteriae vertebralis, tuberculum posterius.",
        attachments: "Membrana atlantooccipitalis anterior et posterior, ligamentum transversum atlantis (densni ushlab turuvchi pishiq boylam).",
        neurovascular: "A. vertebralis (orqa ravoq egatida aylanib kalla ichiga kiradi), I bo'yin nervi (n. suboccipitalis).",
        clinicalNote: "Boshga yuqoridan tushadigan kuchli vertikal zarbada (masalan, sayoz suv havzasiga sho'ng'iganda) atlant halqasi yorilib ketadi — bu Jefferson portlashsimon sinishi deb ataladi. Agar ko'ndalang boylam (lig. transversum) uzilsa, dens orqa miyaga botib, nafas markazini darhol to'xtatishi mumkin.",
        desc: "Tanasi (corpus) bo'lmaydi, chunki rivojlanish davrida uning tanasi II bo'yin umurtqasiga qo'shilib, tishsimon o'siqni (dens) hosil qilgan. Oldingi ravoq (arcus anterior) va orqa ravoq (arcus posterior) hamda yon massalar (massae laterales)dan tuzilgan. Oldingi ravoq ichida tish chuqurchasi (fovea dentis) mavjud."
      },
      c2: {
        nameUz: "II bo'yin umurtqasi — Aksis (O'qli umurtqa)",
        nameLat: "Axis (C2)",
        figs: "12, 13-rasmlar",
        pageRef: "Ahmedov: 10–11-betlar, 12, 13-rasmlar",
        clinicalTag: "TRAVMATOLOGIYA",
        quickFacts: [
          "Tanasi ustida massiv vertikal o'q — dens axis (tishsimon o'siq) joylashgan",
          "Boshning gorizontal burilish harakatining 50% qismi Atlant-Aksis bo'g'imida ro'y beradi",
          "Processus spinosusi kuchli rivojlangan va uchi ayri (bifid) bo'ladi"
        ],
        landmarks: "Dens axis, apex dentis, facies articularis anterior et posterior, processus spinosus bifidus.",
        attachments: "Ligamentum apicis dentis, ligamenta alaria (qanotsimon boylamlar — boshning ortiqcha burilishini tormozlaydi).",
        neurovascular: "N. occipitalis major (C2 orqa shoxi — ensa nevralgiyasida og'riq manbai).",
        clinicalNote: "Avtohalokatda bo'yinning keskin giperekstenziyasida (orqaga kuchli siltanish) C2 ravoq oyoqchalari sinishi Hangman sinishi ('dorg'a osilgan odam sinishi') deb nomlanadi. Dens axis sinishi esa darhol jarrohlik yoki gips/halo korset bilan qat'iy fiksatsiyani talab etadi.",
        desc: "Tanasi ustida massiv vertikal tishsimon o'siq (dens) bo'ladi. Atlant bu tish atrofida aylanib, boshning o'ngga va chapga burilishini (rotatio) ta'minlaydi."
      },
      c6: {
        nameUz: "VI bo'yin umurtqasi — Uyqu do'mbog'i",
        nameLat: "Tuberculum caroticum (C6)",
        figs: "7, 8-rasmlar",
        pageRef: "Ahmedov: 8-bet, 7, 8-rasmlar",
        clinicalTag: "SHOSHILINCH GEMOSTAZ",
        quickFacts: [
          "Ko'ndalang o'sig'ining oldingi do'mbog'i boshqa bo'yin umurtqalariga qaraganda ancha yirik va bo'rtgan",
          "Umumiy uyqu arteriyasi (a. carotis communis) bevosita ushbu do'mboq ustidan o'tadi",
          "Tibbiyot xodimlari uchun shoshilinch qon to'xtatishning eng muhim mo'ljali"
        ],
        landmarks: "Processus transversus C6, tuberculum caroticum (Chassaignac do'mbog'i).",
        attachments: "M. scalenus anterior, m. longus colli.",
        neurovascular: "A. carotis communis, v. jugularis interna, n. vagus (bo'yin tomir-nerv tutami).",
        clinicalNote: "Bo'yin yoki yuz sohasida arterial qon ketish yuz berganda, umumiy uyqu arteriyasini C6 sathida tuberculum caroticum ga barmoq bilan qattiq bosib turish orqali qon ketish vaqtinchalik to'xtatiladi. Shuningdek anesteziologiyada stelat gangliya blokadasida topografik mo'ljal hisoblanadi.",
        desc: "Ko'ndalang o'sig'ining oldingi do'mbog'i boshqalarga nisbatan juda yaxshi rivojlangan. Umumiy uyqu arteriyasi (a. carotis communis) shu do'mboqqa taqab qisilishi va qon to'xtatilishi mumkin."
      },
      c7: {
        nameUz: "VII bo'yin umurtqasi — Bo'rtib chiquvchi umurtqa",
        nameLat: "Vertebra prominens (C7)",
        figs: "9-rasm",
        pageRef: "Ahmedov: 8–9-betlar, 9-rasm",
        clinicalTag: "KLINIK TOPOGRAFIYA",
        quickFacts: [
          "Qirrali o'sig'i juda uzun, yo'g'on va uchi bo'linmagan",
          "Tirik odamda bo'yin terisi ostida yaqqol ko'rinib va barmoq bilan oson paypaslanadi",
          "Umurtqalarni pastga qarab sanashda boshlang'ich start nuqtasi"
        ],
        landmarks: "Processus spinosus C7, foramen transversarium (kichik bo'ladi, a. vertebralis kirmaydi).",
        attachments: "Ligamentum nuchae, m. trapezius, m. rhomboideus minor.",
        neurovascular: "A. vertebralis odatda C7 teshigidan o'tmay, C6 teshigidan boshlab kanalga kiradi; C8 spinal nerv C7 ostidan chiqadi.",
        clinicalNote: "Klinik ko'rikda shifokor bemor boshini oldinga engashtirib, C7 ning yaqqol bo'rtgan o'sig'ini topadi va undan pastga qarab Th1, Th2 umurtqalarni aniq hisoblaydi. Bu orqa miya punksiyasi, epidural anesteziya va rentgen tekshiruvlarida xatoliklarning oldini oluvchi oltin standartdir.",
        desc: "Qirrali o'sig'i juda uzun, yo'g'on va uchi bo'linmagan bo'lib, tirik odamda bo'yin terisi ostida yaqqol ko'rinib va ushlab sezilib turadi; hisob-kitob mo'ljali hisoblanadi."
      }
    },
    ribsAndSternum: {
      sternum: {
        nameUz: "To'sh suyagi",
        nameLat: "Sternum (20-rasm)",
        pageRef: "Ahmedov: 12–14-betlar, 20-rasm",
        clinicalTag: "TORAKAL JARROHLIK",
        quickFacts: [
          "Ko'krak qafasining old devorini hosil qiluvchi toq yassi suyak",
          "3 qismdan iborat: dasta (manubrium), tana (corpus) va xanjarband o'simta (processus xiphoideus)",
          "Angulus sterni (Ludwig burchagi) II qovurg'a birikadigan sohada joylashgan"
        ],
        parts: [
          { nameUz: "Dasta qismi", nameLat: "Manubrium sterni", desc: "Tepa qismi; bo'yinturuq o'ymasi (incisura jugularis) va o'mrov o'ymalari (incisura clavicularis) bor." },
          { nameUz: "Tana qismi", nameLat: "Corpus sterni", desc: "O'rta uzun qismi; chetlarida II–VII qovurg'alar tog'ayi birikadigan o'ymalar mavjud." },
          { nameUz: "Xanjarband o'simta", nameLat: "Processus xiphoideus", desc: "Eng pastki uchi bo'lib, har xil shaklda (teshikli, ayrili) bo'lishi mumkin; keksayganda suyaklanadi." }
        ],
        clinicalNote: "To'sh suyagi gematologiyada qizil suyak iligi olish uchun sternal punksiya (Arinkin usuli) obyekti hisoblanadi. Kardioxirurgiyada ochiq yurak operatsiyalarida to'sh suyagini bo'yiga arralash (mediana sternotomiya) bajariladi."
      },
      ribCategories: [
        {
          id: "true",
          nameUz: "Chin qovurg'alar (I–VII juft)",
          nameLat: "Costae verae (I–VII)",
          count: "7 juft",
          pageRef: "Ahmedov: 12–14-betlar, 22-rasm",
          clinicalTag: "TORAKAL JARROHLIK",
          quickFacts: [
            "Tog'aylari to'sh suyagiga mustaqil bo'g'im hosil qilib birikadi",
            "Ko'krak qafasining eng mustahkam karkasini tashkil etadi",
            "I qovurg'a eng qisqa, keng va gorizontal yotadi"
          ],
          clinicalNote: "I qovurg'aning yuqori yuzasidan a. et v. subclavia va yelka chigali o'tadi. Qovurg'a singanda o'tkir suyak parchalari parietal plevra va o'pkani teshib, pnevmotoraks yoki gemotoraksga sabab bo'ladi. Bir nechta qovurg'a ikkita joydan singanda 'ko'krak darchasi' (flail chest) paydo bo'lib, paradoksal nafas vujudga keladi.",
          desc: "Tog'aylari orqali to'g'ridan-to'g'ri to'sh suyagiga (sternum) mustaqil bo'g'im hosil qilib birikadi."
        },
        {
          id: "false",
          nameUz: "Yolg'on qovurg'alar (VIII–X juft)",
          nameLat: "Costae spuriae (VIII–X)",
          count: "3 juft",
          pageRef: "Ahmedov: 12–14-betlar, 22-rasm",
          clinicalTag: "ABDOMINAL TRAVMA",
          quickFacts: [
            "To'sh suyagiga bevosita yetib bormaydi",
            "Tog'aylari ketma-ket birikib, qovurg'a ravog'ini (arcus costalis) hosil qiladi",
            "Jigar va taloqni tashqi mexanik zarbalardan himoyalaydi"
          ],
          clinicalNote: "Chap tomonda IX–XI qovurg'alar singanda taloq yorilishi (ruptura lienis) xavfi juda yuqori bo'lib, hayot uchun xavfli ichki qon ketishiga olib keladi. O'ng qovurg'a ravog'i ostida jigar va o't pufagi palpatsiya qilinadi.",
          desc: "To'sh suyagiga yetib bormay, o'zidan yuqoridagi qovurg'a tog'ayiga ketma-ket qo'shilib, qovurg'a ravog'ini (arcus costalis) hosil qiladi."
        },
        {
          id: "floating",
          nameUz: "Yetim (erkin) qovurg'alar (XI–XII juft)",
          nameLat: "Costae fluctuantes (XI–XII)",
          count: "2 juft",
          pageRef: "Ahmedov: 12–14-betlar, 22-rasm",
          clinicalTag: "UROLOGIYA",
          quickFacts: [
            "Oldingi uchlari tog'ay bilan qoplanmagan va to'shga tutashmaydi",
            "Qorin devorining orqa-yon muskullari orasida erkin tugaydi",
            "Qovurg'a do'mboqchasi (tuberculum costae) bo'lmaydi"
          ],
          clinicalNote: "XII qovurg'a buyraklarning orqa yuzasi proyeksiyasi hisoblanadi. Urologik amaliyotda buyraklarga orqa tomondan jarrohlik yo'li bilan kirishda (lyumbotomiya kesimi) XII qovurg'aning pastki qirrasi asosiy anatomik mo'ljaldir.",
          desc: "Oldingi uchlari tog'ay bilan qoplanmagan va to'shga birikmay, qorin devori muskullari orasida erkin tugaydi."
        }
      ]
    }
  },

  // 3-BO'LIM: QO'L SUYAKLARI
  upperLimbData: {
    girdle: [
      {
        id: "clavicula",
        nameUz: "O'mrov suyagi",
        nameLat: "Clavicula (24, 25-rasmlar)",
        shape: "S-simon egilgan naysimon suyak",
        pageRef: "Ahmedov: 14–15-betlar, 24, 25-rasmlar",
        clinicalTag: "TRAVMATOLOGIYA",
        quickFacts: [
          "S-simon egilgan naysimon suyak; birinchi bo'lib embrional rivojlanishning 5–6-haftasida suyaklanadi",
          "Qo'l erkin skeletini tana skeleti (to'sh suyagi) bilan bog'lovchi yagona suyak ko'prigi",
          "Tana va lateral egilish o'rtasidagi chegara eng zaif soha bo'lib, inson tanasida eng ko'p sinadigan suyaklardan biri"
        ],
        landmarks: "Extremitas sternalis, extremitas acromialis, corpus claviculae, tuberculum conoideum, linea trapezoidea.",
        attachments: "M. pectoralis major, m. sternocleidomastoideus, m. deltoideus, m. trapezius, m. subclavius.",
        neurovascular: "Ostidan a. et v. subclavia hamda yelka chigali (plexus brachialis) o'tadi.",
        clinicalNote: "O'mrov suyagi sinishi ko'pincha yiqilganda qo'lni to'g'ri cho'zib tushish natijasida ro'y beradi (80% o'rta uchlikda). Ichki bo'lakcha sternocleidomastoideus tortishi tufayli yuqoriga, tashqi bo'lakcha qo'l og'irligi tufayli pastga siljiydi. Qon tomir va yelka chigali jarohatlanish xavfi mavjud.",
        parts: [
          { nameUz: "To'sh uchi", nameLat: "Extremitas sternalis", desc: "Yo'g'onlashgan bo'lib, to'sh dastasidagi o'ymaga birikadi." },
          { nameUz: "O'mrov tanasi", nameLat: "Corpus claviculae", desc: "Medial qismi oldinga qavariq, lateral qismi orqaga botiq." },
          { nameUz: "Akromial uchi", nameLat: "Extremitas acromialis", desc: "Yassilangan bo'lib, kurakning akromion o'simtasiga birikadi." }
        ]
      },
      {
        id: "scapula",
        nameUz: "Kurak suyagi",
        nameLat: "Scapula (26, 27-rasmlar)",
        shape: "Uchburchak yassi suyak",
        pageRef: "Ahmedov: 15–16-betlar, 26, 27-rasmlar",
        clinicalTag: "ORTOPEDIYA VA BIOMEXANIKA",
        quickFacts: [
          "Ko'krak qafasining orqa yuzasida II–VII qovurg'alar sathida erkin harakatlanuvchi uchburchak yassi suyak",
          "Cavitas glenoidalis chuqurchasi yelka suyagi boshchasiga nisbatan ancha yassi (labrum glenoidale bilan chuqurlashtiriladi)",
          "Yelka kamari harakatlarida 1:2 nisbatda skapulo-gumeral ritmni ta'minlaydi"
        ],
        landmarks: "Spina scapulae, acromion, processus coracoideus, cavitas glenoidalis, tuberculum supraglenoidale et infraglenoidale, angulus inferior.",
        attachments: "M. subscapularis, m. supraspinatus, m. infraspinatus, m. teres minor/major, m. serratus anterior (kurakni ko'krakka tortuvchi), m. trapezius, m. biceps brachii (caput breve).",
        neurovascular: "Incisura scapulae orqali n. suprascapularis o'tadi (lig. transversum scapulae ostida), a. suprascapularis esa ustidan o'tadi ('Army over Navy').",
        clinicalNote: "N. thoracicus longus zararlanganda m. serratus anterior falajlanadi va 'qanotsimon kurak' (scapula alata) simptomi yuzaga keladi — bemor qo'lini devorga tirab turganda kurak orqaga bo'rtib chiqadi.",
        parts: [
          { nameUz: "Kurak qiri", nameLat: "Spina scapulae", desc: "Kurakning orqa yuzasidagi ko'ndalang qirra; lateral tomonga akromion bo'lib davom etadi." },
          { nameUz: "Akromion (Yelka o'simtasi)", nameLat: "Acromion", desc: "Yelkaning eng yuqori nuqtasini hosil qiluvchi keng o'siq." },
          { nameUz: "Tumshuqsimon o'siq", nameLat: "Processus coracoideus", desc: "Qush tumshug'iga o'xshash oldinga egilgan o'siq; muskullar va boylamlar birikadi." },
          { nameUz: "Bo'g'im chuqurchasi", nameLat: "Cavitas glenoidalis", desc: "Yelka suyagi boshchasi bilan yelka bo'g'imini hosil qiluvchi yassi oval chuqurcha." },
          { nameUz: "Qirrausti va qirraosti chuqurchalari", nameLat: "Fossa supraspinata et fossa infraspinata", desc: "Aynan shu nomdagi baquvvat muskullar joylashgan orqa sohalar." }
        ]
      }
    ],
    freeLimb: [
      {
        id: "humerus",
        nameUz: "Yelka suyagi",
        nameLat: "Humerus (28, 29-rasmlar)",
        pageRef: "Ahmedov: 16–18-betlar, 28, 29-rasmlar",
        clinicalTag: "TRAVMATOLOGIYA VA NEYROXIRURGIYA",
        quickFacts: [
          "Qo'lning erkin qismidagi eng yirik va uzun proksimal naysimon suyak",
          "Collum chirurgicum (jarrohlik bo'yinchasi) — eng ko'p sinish ro'y beradigan nozik soha",
          "Sulcus nervi radialis (spiral egat) diafizning orqa yuzasidan o'tib, n. radialisni o'zida saqlaydi"
        ],
        landmarks: "Caput humeri, collum anatomicum, collum chirurgicum, tuberculum majus/minus, tuberositas deltoidea, epicondylus medialis/lateralis, trochlea et capitulum humeri, fossa olecrani.",
        attachments: "M. supraspinatus, infraspinatus, teres minor (tuberculum majus), m. subscapularis (tuberculum minus), m. deltoideus, m. brachialis, m. triceps brachii.",
        neurovascular: "Collum chirurgicum sohasida n. axillaris va a. circumflexa humeri posterior; diafizda sulcus n. radialis orqali n. radialis va a. profunda brachii; epicondylus medialis orqasida n. ulnaris o'tadi.",
        clinicalNote: "Diafiz sinishida n. radialis zararlanib, 'osilgan panja' (wrist drop) va barmoqlarni yozolmaslik rivojlanadi. Collum chirurgicum sinishida n. axillaris ezilib, deltasimon muskul atrofiyasi va yelkani 15° dan yuqoriga ko'tarolmaslik yuzaga keladi. Bolalarda suprakondilyar sinishlar a. brachialisni qisib, Volkmann ishemik kontrakturasi xavfini tug'diradi.",
        features: [
          { nameUz: "Yelka suyagi boshi", nameLat: "Caput humeri", desc: "Sharsimon silliq bo'g'im yuzasi; kurakning cavitas glenoidalis chuqurchasiga kiradi." },
          { nameUz: "Anatomik bo'yincha", nameLat: "Collum anatomicum", desc: "Boshchani bevosita o'rab turuvchi tor egatcha." },
          { nameUz: "Katta va kichik do'mboqchalar", nameLat: "Tuberculum majus et minus", desc: "Yelka muskullari birikadigan sohalar; ular orasida do'mboqlararo egat (sulcus intertubercularis) bor." },
          { nameUz: "Jarrohlik bo'yinchasi", nameLat: "Collum chirurgicum", desc: "Do'mboqlardan pastdagi tana qismiga o'tuvchi eng nozik soha; amaliyotda eng ko'p sinadigan sohadir." },
          { nameUz: "Deltoidsimon g'adir-budurlik", nameLat: "Tuberositas deltoidea", desc: "Diafizning lateral yuzasida deltasimon muskul birikadigan joy." },
          { nameUz: "G'altak va boshcha", nameLat: "Trochlea humeri et capitulum humeri", desc: "Pastki distal blok; tirsak va bilak suyaklari bilan tirsak bo'g'imini hosil qiladi." },
          { nameUz: "Tirsak o'sig'i chuqurchasi", nameLat: "Fossa olecrani", desc: "Distal orqa yuzadagi chuqur botiqlik; tirsak yozilganda ulna o'sig'i kirib turadi." }
        ]
      },
      {
        id: "forearm",
        nameUz: "Bilak suyaklari (Ulna va Radius)",
        nameLat: "Ossa antebrachii (30–35-rasmlar)",
        pageRef: "Ahmedov: 18–21-betlar, 30–35-rasmlar",
        clinicalTag: "TRAVMATOLOGIYA",
        quickFacts: [
          "Ulna (medial) va Radius (lateral) membranasi orqali birikib pronatsiya-supinatsiyani ta'minlaydi",
          "Olecranon (ulna) tirsak bo'g'imining orqa tayanchi bo'lib, to'liq yozilganda fossa olecraniga kiradi",
          "Radiusning distal uchi kengaygan bo'lib, bilak-kaft usti bo'g'imining (art. radiocarpalis) asosiy yuzasini tashkil etadi"
        ],
        landmarks: "Olecranon, processus coronoideus, incisura trochlearis, caput radii, tuberositas radii, processus styloideus radii et ulnae.",
        attachments: "M. triceps brachii (olecranonga), m. biceps brachii (tuberositas radiiga), m. brachioradialis, m. pronator teres, m. supinator.",
        neurovascular: "N. medianus bilak old yuzasidan, n. ulnaris ichki tomondan, n. radialis (chuqur shoxi) m. supinatordan o'tadi. A. radialis pulsatsiyasi processus styloideus radii medialida oson paypaslanadi.",
        clinicalNote: "Colles sinishi — radius distal uchining yiqilganda orqaga siljib sinishi ('vilkasimon deformatsiya'). Smith sinishi — panja bukilgan holatda tushganda distal bo'lakning kaft tomon siljishi. Monteggia sinishi — ulna proksimal sinishi + radius boshchasi chiqishi. Galeazzi sinishi — radius distal sinishi + ulna boshi chiqishi.",
        ulna: "Tirsak suyagi (Ulna) — ichki (medial) tomonda joylashgan; tepasida olecranon (tirsak o'sig'i), processus coronoideus va g'altak o'ymasi (incisura trochlearis) bor.",
        radius: "Bilak suyagi (Radius) — tashqi (lateral) tomonda joylashgan; tepasida caput radii (dumaloq bo'g'im boshchasi), pastida processus styloideus mavjud.",
        biomechanics: "Pronatsiya va supinatsiya: Radius suyagi tirsak suyagi ustidan qiya kesib o'tib (pronatio — kaftni pastga qaratish) yoki unga parallel joylashib (supinatio — kaftni tepaga qaratish) aylanish harakatini bajaradi."
      }
    ],
    handBones: {
      total: "27 ta suyak (ossa manus, 36–45-rasmlar)",
      carpalProximal: [
        { id: "scaphoideum", num: 1, nameUz: "Qayiqsimon suyak", nameLat: "Os scaphoideum (38-rasm)", pageRef: "Ahmedov: 22-bet, 38-rasm", clinicalTag: "SHOSHILINCH TRAVMA", clinicalNote: "Kaft usti suyaklari orasida eng ko'p sinadi ('anatomik tamaki qutisi'da qattiq og'riq). Qon aylanishi distal tomondan retrograd ta'minlanganligi tufayli proksimal bo'lakchaning avaskulyar nekrozi xavfi juda yuqori.", desc: "Proksimal qatordagi eng katta suyak, qayiq shaklida; tuberositas ossis scaphoidei bor." },
        { id: "lunatum", num: 2, nameUz: "Yarimoysimon suyak", nameLat: "Os lunatum (39-rasm)", pageRef: "Ahmedov: 22-bet, 39-rasm", clinicalTag: "TRAVMA VA DISLOKATSIYA", clinicalNote: "Bilak jarohatlarida eng ko'p chiqadigan (dislokatsiya) suyak bo'lib, carpal kanalida n. medianusni ezib qo'yishi mumkin (Kienböck kasalligi — lunatum avaskulyar nekrozi).", desc: "Yarim oy shaklida, ustki yuzasi qavariq, pastki yuzasi botiq." },
        { id: "triquetrum", num: 3, nameUz: "Uch qirrali suyak", nameLat: "Os triquetrum (40-rasm)", pageRef: "Ahmedov: 22-bet, 40-rasm", clinicalTag: "ANATOMIK MO'LJAL", clinicalNote: "Uchburchak piramidasimon suyak; old yuzasida no'xatsimon suyak bilan bo'g'im hosil qiladi.", desc: "Uchburchak piramidasimon suyak; old yuzasida no'xatsimon suyak bilan bo'g'im hosil qiluvchi yuzasi bor." },
        { id: "pisiforme", num: 4, nameUz: "No'xatsimon suyak", nameLat: "Os pisiforme (41-rasm)", pageRef: "Ahmedov: 22-bet, 41-rasm", clinicalTag: "KLINIK ANATOMIYA", clinicalNote: "M. flexor carpi ulnaris payi ichida yotuvchi sesamasimon suyak; ostidan n. ulnaris Guyon kanalidan o'tadi.", desc: "Kaft usti suyaklarining eng kichigi; muskul payi ichida yotuvchi sesamasimon suyakdir." }
      ],
      carpalDistal: [
        { id: "trapezium", num: 5, nameUz: "Trapetsiya suyak", nameLat: "Os trapezium (42-rasm)", pageRef: "Ahmedov: 22-bet, 42-rasm", clinicalTag: "BIOMEXANIKA", clinicalNote: "I kaft suyagi bilan egarsimon bo'g'im (art. carpometacarpalis pollicis) hosil qilib, bosh barmoqning boshqa barmoqlarga qarama-qarshi turishini (oppositio) ta'minlaydi (inson mehnatining asosi).", desc: "I bosh barmoq kaft suyagi bilan egar-simon bo'g'im hosil qiluvchi ko'pburchakli suyak." },
        { id: "trapezoideum", num: 6, nameUz: "Trapetsiyasimon suyak", nameLat: "Os trapezoideum (43-rasm)", pageRef: "Ahmedov: 23-bet, 43-rasm", clinicalTag: "ANATOMIYA", clinicalNote: "Kichik trapetsiya shaklida; II kaft suyagi asosi bilan mustahkam tutashadi.", desc: "Kichik trapetsiya shaklida; II kaft suyagi bilan birlashadi." },
        { id: "capitatum", num: 7, nameUz: "Boshchali suyak", nameLat: "Os capitatum (44-rasm)", pageRef: "Ahmedov: 23-bet, 44-rasm", clinicalTag: "BIOMEXANIKA", clinicalNote: "Kaft ustining eng yirik markaziy suyagi; panja o'qi uning markazidan o'tadi.", desc: "Kaft ustining eng yirik suyagi; tepasida dumaloq boshchasi bor, III kaft suyagiga tayanch bo'ladi." },
        { id: "hamatum", num: 8, nameUz: "Ilmoqli suyak", nameLat: "Os hamatum (45-rasm)", pageRef: "Ahmedov: 23-bet, 45-rasm", clinicalTag: "SPORT TRAVMASI", clinicalNote: "Hamulus ossis hamati sinishi tennis, beysbol yoki golf raketkasi zarbasida uchraydi va yonidagi Guyon kanalida n. ulnarisni zararlashi mumkin.", desc: "Oldi yuzasida kaft tomonga bo'rtib chiqqan kuchli ilmog'i (hamulus ossis hamati) bor." }
      ],
      metacarpus: "5 ta kaft suyaklari (ossa metacarpi I–V): asosi (basis), tanasi (corpus) va dumaloq boshchasi (caput). V kaft suyagi bo'yinchasi sinishi 'bokschilar sinishi' (boxer's fracture) deb ataladi.",
      phalanges: "14 ta barmoq suyaklari (phalanges digitorum): II–V barmoqlarda 3 tadan (proksimal, o'rta, distal), I (bosh) barmoqda 2 ta (proksimal va distal)."
    }
  },

  // 4-BO'LIM: OYOQ SUYAKLARI
  lowerLimbData: {
    pelvisFusion: {
      titleUz: "Chanoq suyagining yoshga doir birlashishi",
      titleLat: "Synostosis ossis coxae (47, 48-rasmlar)",
      pageRef: "Ahmedov: 24–26-betlar, 47, 48-rasmlar",
      clinicalTag: "YOSH ANATOMIYASI VA TRAVMA",
      quickFacts: [
        "14-16 yoshgacha 3 ta alohida suyakdan (yonbosh, qov va quymich) iborat bo'lib, Y-simon tog'ay bilan bog'langan",
        "16 yoshdan keyin bu tog'ay to'liq suyaklanib (sinostoz), yagona chanoq suyagiga (os coxae) aylanadi",
        "Uchala suyak tanalari birlashgan joyda quymich kosasi (acetabulum) hosil bo'ladi"
      ],
      desc: "Chanoq suyagi 14-16 yoshgacha 3 ta alohida suyakdan (yonbosh, qov va quymich) iborat bo'lib, ular quymich kosasi (acetabulum) sohasida Y-simon tog'ay vositasida birlashib turadi. 16 yoshdan keyin bu tog'ay to'liq suyaklanib, yagona chanoq suyagiga (os coxae) aylanadi.",
      components: [
        {
          id: "ilium",
          nameUz: "Yonbosh suyagi",
          nameLat: "Os ilium",
          pageRef: "Ahmedov: 24–25-betlar, 47-rasm",
          clinicalTag: "GEMATOLOGIYA VA TRAVMA",
          quickFacts: [
            "Chanoq suyagining yuqori eng keng qismi; crista iliaca suyak iligi punksiyasi uchun olinadi",
            "Spina iliaca anterior superior (SIAS) — oyoq uzunligini o'lchash va qorin punksiyasida asosiy mo'ljal",
            "Facies auricularis orqali dumg'aza suyagi bilan mustahkam sakroiliak bo'g'im hosil qiladi"
          ],
          landmarks: "Crista iliaca, SIAS, SIAI, SIPS, SIPI, linea arcuata, fossa iliaca.",
          attachments: "M. gluteus maximus/medius/minimus, m. iliacus, m. sartorius, m. tensor fasciae latae, qorin muskullari.",
          neurovascular: "Sulcus supraacetabularis yonidan a. va n. gluteus superior o'tadi.",
          clinicalNote: "Iliak krest (crista iliaca) qizil suyak iligi trepanobiopsiyasi va autotransplantatsiyasi uchun ideal sohadir. Spina iliaca anterior superior esa appenditsitdagi Mak-Burney nuqtasi hamda oyoqning anatomik uzunligini o'lchashda fundamental nuqtadir.",
          desc: "Tepa keng qanoti (ala ossis ilii), yonbosh qiri (crista iliaca) va o'tkir qirralari (spina iliaca) mavjud."
        },
        {
          id: "pubis",
          nameUz: "Qov suyagi",
          nameLat: "Os pubis",
          pageRef: "Ahmedov: 25-bet, 47, 48-rasmlar",
          clinicalTag: "AKUSHERLIK VA TRAVMA",
          quickFacts: [
            "Chanoq suyagining oldingi devorini hosil qiluvchi suyak",
            "Ikkala qov suyagi o'rtada simfiz tog'ayi (symphysis pubica) orqali birlashadi",
            "Pastki shoxi quymich suyagi shoxi bilan tutashib foramen obturatum teshigini chegaralaydi"
          ],
          landmarks: "Corpus ossis pubis, ramus superior et inferior, tuberculum pubicum, pecten ossis pubis.",
          attachments: "M. rectus abdominis, m. gracilis, m. pectineus, son adduktor muskullari.",
          neurovascular: "Canalis obturatorius orqali a., v. et n. obturatorius o'tadi.",
          clinicalNote: "Symphysis pubica tog'ayli birikmasi homiladorlik vaqtida relaksin gormoni ta'sirida yumshab kengayadi (simfizit — patologik og'riqli kengayish). Chanoq suyagi sinishlarida qov shoxlarining sinishi siydik pufagi va uretra yorilishiga olib kelishi mumkin.",
          desc: "Tanasi, yuqori va pastki shoxlari bor; o'rtada qov birikmasi (symphysis pubica)ni hosil qiladi."
        },
        {
          id: "ischium",
          nameUz: "Quymich suyagi",
          nameLat: "Os ischii",
          pageRef: "Ahmedov: 25–26-betlar, 47, 48-rasmlar",
          clinicalTag: "ANESTEZIOLOGIYA VA AKUSHERLIK",
          quickFacts: [
            "Pastki orqa qism; o'tirganda inson tana og'irligini qabul qiluvchi massiv tuber ischiadicumga ega",
            "Spina ischiadica katta va kichik quymich o'ymalarini (incisura ischiadica major et minor) ajratadi",
            "Tuber ischiadicum orqasidan quymich nervi (n. ischiadicus) yo'naladi"
          ],
          landmarks: "Corpus ossis ischii, ramus ossis ischii, tuber ischiadicum, spina ischiadica.",
          attachments: "Ligamentum sacrotuberale, ligamentum sacrospinale, sonning orqa guruhi muskullari (hamstrings).",
          neurovascular: "Foramen ischiadicum majus orqali n. ischiadicus, a. et v. glutea inferior, n. pudendus o'tadi.",
          clinicalNote: "Spina ischiadica akusherlikda homila boshining tos tekisligidan tushishini baholash mo'ljali hisoblanadi. Shuningdek akusherlik amaliyotida n. pudendus blokadasida igna aynan spina ischiadica mo'ljali bo'yicha kiritiladi.",
          desc: "Pastki orqa qism; o'tirganda asosiy tana og'irligini qabul qiluvchi massiv quymich do'mbog'i (tuber ischiadicum) bor."
        }
      ],
      acetabulum: "Quymich kosasi (Acetabulum) — uchala suyak tanalari birlashgan joydagi chuqur kosa; facies lunata (yarimoysimon bo'g'im yuzasi) va fossa acetabuli (chuqurligi)ga ega; son suyagi boshchasi kirib turadi."
    },
    genderPelvis: {
      male: "Erkaklar chanog'i: Torroq, balandroq, suyaklari qalin va og'ir; kirish teshigi yuraksimon; qov burchagi o'tkir (< 70°).",
      female: "Ayollar chanog'i: Kengroq, yassiroq, yengilroq; ichki bo'shlig'i silindrsimon bo'lib, tug'ruq jarayoniga moslashgan; qov osti ravog'i to'g'ri yoki o'tmas burchak (> 90–100°)."
    },
    freeLimb: {
      femur: {
        nameUz: "Son suyagi",
        nameLat: "Femur / Os femoris (49, 50-rasmlar)",
        pageRef: "Ahmedov: 27–29-betlar, 49, 50-rasmlar",
        clinicalTag: "GERIATRİK TRAVMATOLOGIYA",
        quickFacts: [
          "Inson tanasidagi eng uzun, og'ir va baquvvat naysimon suyak (tana bo'yining ~27% qismi)",
          "Collodiafiz burchagi normada 125°–130°; bu burchak kamaysa coxa vara, kattalashsa coxa valga deyiladi",
          "Collum femoris — intrakapsulyar nozik qon ta'minotiga ega bo'lib, keksalarda eng xavfli sinish sohasidir"
        ],
        landmarks: "Caput femoris, fovea capitis femoris, collum femoris, trochanter major/minor, linea aspera, condylus medialis/lateralis, epicondylus medialis.",
        attachments: "M. iliopsoas (trochanter minorga), m. gluteus medius/minimus (trochanter majorga), son adduktorlari (linea asperaga), m. quadriceps femoris.",
        neurovascular: "A. circumflexa femoris medialis et lateralis (bo'yincha qon ta'minoti), a. ligamenti capitis femoris (bolalikda), n. femoralis old tomonda, n. ischiadicus (quymich nervi) orqa tomonda.",
        clinicalNote: "Son suyagi bo'yinchasi sinishi (fractura colli femoris) keksalarda eng og'ir nogironlikka olib keluvchi jarohatdir. A. circumflexa femoris medialis retinokulyar shoxlari uzilishi oqibatida son boshchasining avaskulyar nekrozi yuzaga keladi va zudlik bilan endoprotezlash talab qilinadi.",
        desc: "Odam tanasidagi eng uzun va eng baquvvat naysimon suyak.",
        neckShaftAngle: {
          male: "Erkaklarda kollodiafiz burchagi ~130°",
          female: "Ayollarda chanoq kengroq bo'lganligi tufayli kollodiafiz burchagi kichikroq bo'lib, deyarli to'g'ri burchakka yaqinlashadi (115–120°).",
          clinical: "Keksa odamlarda bu burchak yanada kichrayadi va osteoporoz tufayli son suyagi bo'yinchasi (collum femoris) sinishi ko'p uchraydi."
        },
        trochanters: "Katta ko'st (trochanter major) va kichik ko'st (trochanter minor) — son muskullarining mustahkam tutashish nuqtalari."
      },
      patella: {
        nameUz: "Tizza qopqog'i",
        nameLat: "Patella (51, 52-rasmlar)",
        pageRef: "Ahmedov: 29-bet, 51, 52-rasmlar",
        clinicalTag: "BIOMEXANIKA",
        quickFacts: [
          "Odam organizmidagi eng yirik sesamasimon suyak",
          "Sonning to'rt boshli muskuli (m. quadriceps femoris) payi ichida yotadi",
          "Kvadritseps muskuli kuchining richag yelkasini 30% ga oshiradi"
        ],
        landmarks: "Basis patellae, apex patellae, facies articularis posterior (facies medialis et lateralis).",
        attachments: "Tendo m. quadricipitis femoris, ligamentum patellae (tuberositas tibiaega birikadi).",
        neurovascular: "Rete articulare genus (tizza bo'g'imining arterial to'ri).",
        clinicalNote: "Patella dislokatsiyasi ko'pincha lateral tomonga ro'y beradi (kvadritseps tortishish Q burchagi lateralga yo'nalganligi sababli). Patella sinishlarida ligamentum patellae uzilsa, tizza bo'g'imida oyoqni faol yozish butunlay imkonsiz bo'lib qoladi.",
        desc: "Odam organizmidagi eng yirik sesamasimon suyak. Sonning to'rt boshli muskuli payi ichida yotadi; asosi (basis patellae) tepada, uchi (apex patellae) pastda joylashadi."
      },
      legBones: {
        tibia: "Katta boldir suyagi (Tibia, 53, 54-rasmlar) — medial tomonda joylashgan, tananing butun og'irligini qabul qiladi; tepasida medial va lateral bo'g'im do'nglari, pastida ichki to'piq (malleolus medialis) bor.",
        fibula: "Kichik boldir suyagi (Fibula, 55, 56-rasmlar) — lateral tomonda ingichka suyak; pastki uchi tashqi to'piqni (malleolus lateralis) hosil qiladi.",
        clinicalNote: "Tibia old qirrasi (margo anterior) va ichki yuzasi teri ostida joylashgan bo'lib, ochiq sinishlar va osteomiyelitga juda moyil. Fibula bo'yinchasi (collum fibulae) singanda n. fibularis communis ezilib, 'shol oyoq / ot yurishi' (steppage gait) paydo bo'ladi."
      }
    },
    footBiomechanics: {
      tarsusBones: [
        { id: "talus", nameUz: "Oshiq suyak", nameLat: "Talus (61-rasm)", pageRef: "Ahmedov: 32-bet, 61-rasm", clinicalTag: "TRAVMA VA AVASKULYAR NEKROZ", clinicalNote: "Oshiq suyagi hech qanday muskul birikmaydigan suyak bo'lib, tanasining 60% qismi bo'g'im tog'ayi bilan qoplangan. Qon ta'minoti nozik bo'lgani sababli bo'yincha sinishlarida avaskulyar nekroz xavfi juda yuqori.", desc: "Boldir suyaklari bilan bo'g'im hosil qilib, butun tana og'irligini tovon va panjaga taqsimlaydi." },
        { id: "calcaneus", nameUz: "Tovon suyagi", nameLat: "Calcaneus (62, 63-rasmlar)", pageRef: "Ahmedov: 32–33-betlar, 62, 63-rasmlar", clinicalTag: "ORTOPEDIYA", clinicalNote: "Balandlikdan oyoqqa tushganda tovon suyagi maydalanib sinadi (Böhler burchagi tekshiriladi). Tovon shporasi (fasciitis plantaris) tovon do'mbog'ida suyak o'simtasi hosil bo'lishidir.", desc: "Oyoqdagi eng katta suyak; orqasida massiv tovon do'mbog'i (tuber calcanei) bo'lib, Axill payi birikadi." },
        { id: "naviculare", nameUz: "Qayiqsimon suyak", nameLat: "Os naviculare (64-rasm)", pageRef: "Ahmedov: 33-bet, 64-rasm", clinicalTag: "BIOMEXANIKA", clinicalNote: "Oshiq suyak boshchasi bilan 3 ta ponasimon suyaklar o'rtasida yotadi; medial bo'ylama gumbazning kalit suyagidir.", desc: "Oshiq suyak boshchasi bilan 3 ta ponasimon suyaklar o'rtasida yotadi." },
        { id: "cuneiformia", nameUz: "3 ta ponasimon suyak", nameLat: "Ossa cuneiformia (mediale, intermedium, laterale, 65-67-rasmlar)", pageRef: "Ahmedov: 33-bet", clinicalTag: "ANATOMIYA", clinicalNote: "Kaft oldi qatorini to'ldiradi va ko'ndalang gumbaz hosil bo'lishida qatnashadi.", desc: "Kaft oldi qatorini to'ldiradi." },
        { id: "cuboideum", nameUz: "Kubsimon suyak", nameLat: "Os cuboideum (68-rasm)", pageRef: "Ahmedov: 33-bet, 68-rasm", clinicalTag: "ANATOMIYA", clinicalNote: "Lateral tomonda tovon va IV-V kaft suyaklari orasida joylashadi; pastki yuzasida m. peroneus longus egati bor.", desc: "Lateral tomonda tovon va IV-V kaft suyaklari orasida joylashadi." }
      ],
      metatarsusAndPhalanges: "5 ta oyoq kafti suyaklari (ossa metatarsi I–V) va 14 ta barmoq suyaklari (bosh barmoqda 2 ta, boshqalarda 3 tadan). II kaft suyagi eng uzun, I eng yo'g'on. V kaft suyagi asosining sinishi Jones sinishi deb nomlanadi.",
      arches: {
        titleUz: "Oyoq gumbazi biomexanikasi (Arcus pedis)",
        pageRef: "Ahmedov: 33–34-betlar",
        clinicalTag: "ORTOPEDIYA VA REABILITATSIYA",
        quickFacts: [
          "Bo'ylama (5 ta) va ko'ndalang gumbazlar insonning tik yurishi (bipedalizm) mahsulidir",
          "Yurish, yugurish va sakrash vaqtida tana va kalla qutisiga tushadigan mexanik zarbalarni 70-80% gacha so'ndiradi",
          "Gumbazning faol 'taranglovchilari' boldir va oyoq osti muskullari, passiv ushlab turuvchilari aponeurosis plantaris va boylamlardir"
        ],
        longitudinal: "Bo'ylama gumbazlar (5 ta) — tovon suyagidan boshlanib, har bir kaft suyagi boshchasigacha nurlanadi; eng balandi II gumbaz (medial tomonda).",
        transverse: "Ko'ndalang gumbaz — ponasimon va kubsimon suyaklar hamda kaft suyaklari asoslari sohasida vujudga keladi.",
        function: "Gumbazlar prujinasimon (resor) elastik vazifani bajarib, yurish, yugurish va sakrash vaqtida tana, orqa miya va kalla qutisiga tushadigan mexanik zarbalarni 70-80% gacha so'ndiradi.",
        flatfoot: "Yassioyoqlik (Pes planus) — gumbazlarni ushlab turuvchi paylar va muskullar zaiflashganda gumbaz tekislanib qoladi. Natijada amortizatsiya yo'qolib, tez charchash, bel va bosh og'rig'i paydo bo'ladi."
      }
    }
  },

  // 5-BO'LIM: BOSH SKELETI (CRANIUM)
  skullData: {
    general: {
      titleUz: "Bosh skeleti (Kalla / Cranium, 69–113-rasmlar)",
      pageRef: "Ahmedov: 34–53-betlar, 69–113-rasmlar",
      clinicalTag: "KRANIOLOGIYA VA NEYROXIRURGIYA",
      desc: "Kalla suyagi 23 ta suyakdan iborat bo'lib, ikkita yirik bo'limga ajratiladi: Miya bo'limi (Neurocranium) va Yuz bo'limi (Viscerocranium / Splanchnocranium).",
      calvariaVsBasis: "Kalla qopqog'i (calvaria) asosan yassi suyaklardan tuzilgan bo'lib, tashqi va ichki zich plastinkalar hamda ular orasidagi diploe (g'ovak modda)dan iborat; kalla asosi (basis cranii) esa murakkab teshik va kanallarga boy."
    },
    neurocranium: [
      {
        id: "occipitale",
        nameUz: "Ensa suyagi",
        nameLat: "Os occipitale (71, 72-rasmlar)",
        type: "Toq suyak",
        pageRef: "Ahmedov: 34–36-betlar, 71, 72-rasmlar",
        clinicalTag: "NEYROXIRURGIYA",
        quickFacts: [
          "Kallaning orqa-pastki devorini tuzadi; foramen magnum orqali orqa miya boshlanadi",
          "Condylus occipitalis atlant bilan articulatio atlantooccipitalis bo'g'imini hosil qiladi",
          "Protuberantia occipitalis externa (inion) kranio-metrik o'lchovlarning asosiy boshlang'ich nuqtasi"
        ],
        landmarks: "Foramen magnum, condylus occipitalis, squama occipitalis, protuberantia occipitalis externa, canalis hypoglossi, sulcus sinus transversi.",
        attachments: "Ligamentum nuchae, m. trapezius, m. sternocleidomastoideus, m. occipitofrontalis.",
        neurovascular: "Foramen magnumdan uzunchoq miya, a. vertebralis, a. spinalis anterior/posterior; canalis hypoglossidan XII juft n. hypoglossus o'tadi.",
        clinicalNote: "Kalla ichi bosimi oshganda (miya shishi, gematoma) miyacha murtaklari (tonsillae cerebelli) foramen magnumga tushib qisiladi (dislokatsiya). Bu uzunchoq miyadagi nafas va qon aylanish markazlarini ezib, o'limga olib keladi.",
        parts: "Asosiy qism (pars basilaris), ikkita yon qism (pars lateralis) va ensa pallasi (squama occipitalis).",
        foramina: "Katta ensa teshigi (foramen magnum) — kalla bo'shlig'ini umurtqa kanali bilan bog'laydi, uzunchoq miya o'tadi; til osti nervi kanali (canalis hypoglossi)."
      },
      {
        id: "sphenoidale",
        nameUz: "Ponasimon suyak",
        nameLat: "Os sphenoidale (73–75-rasmlar)",
        type: "Toq suyak",
        pageRef: "Ahmedov: 36–39-betlar, 73–75-rasmlar",
        clinicalTag: "NEYROENDOKRINOLOGIYA",
        quickFacts: [
          "Kalla asosining markazidagi 'kalit tosh' (keystone bone); barcha kalla suyaklari bilan tutashadi",
          "Sella turcica (Turk egari) chuqurchasida inson endokrin tizimi boshqaruvchisi — gipofiz bezi yotadi",
          "Kalla asosining 5 ta muhim teshigi (canalis opticus, fissura orbitalis superior, foramen rotundum, ovale, spinosum) shu suyakda"
        ],
        landmarks: "Sella turcica, fossa hypophysialis, dorsum sellae, alae minores/majores, processus pterygoidei, fissura orbitalis superior.",
        attachments: "M. pterygoideus lateralis va medialis (chaynov muskullari).",
        neurovascular: "Canalis opticus (n. opticus + a. ophthalmica), Fissura orbitalis superior (III, IV, VI, V/1 nervlar + v. ophthalmica), Foramen rotundum (V/2), Foramen ovale (V/3), Foramen spinosum (a. meningea media).",
        clinicalNote: "Gipofiz adenomasi kattalashganda sella turcica ustidagi chiasma opticum (ko'rish nervlari kesishmasi)ni ezib, bitemporal gemianopsiya (ikki chekka ko'rish maydoni yo'qolishi)ga olib keladi. Transsfenoidal neyroxirurgiyada o'smalar burun va ponasimon sinus orqali olinadi.",
        shape: "Ko'rshapalakka o'xshash qanotli suyak; kalla markazida kalit suyagi hisoblanadi.",
        parts: "Tanasi (corpus), kichik qanotlari (alae minores), katta qanotlari (alae majores) va qanotsimon o'siqlari (processus pterygoidei).",
        structures: "Turk egari (sella turcica) — uning chuqurchasida gipofiz bezi (fossa hypophysialis) yotadi; ponasimon bo'shliq (sinus sphenoidalis).",
        foramina: "Ko'rish kanali (canalis opticus), yuqori ko'z yorig'i (fissura orbitalis superior), dumaloq teshik (foramen rotundum), tuxumsimon teshik (foramen ovale), qirrali teshik (foramen spinosum)."
      },
      {
        id: "temporale",
        nameUz: "Chakka suyagi",
        nameLat: "Os temporale (76–83-rasmlar)",
        type: "Juft suyak",
        pageRef: "Ahmedov: 39–43-betlar, 76–83-rasmlar",
        clinicalTag: "LOR VA NEYROLOGIYA",
        quickFacts: [
          "Eshituv va muvozanat a'zolarini o'z ichiga olgan kallasuyagining eng murakkab suyagi",
          "Pars petrosa (piramida) kalla suyagining eng qattiq qismi bo'lib, ichida ichki quloq labirinti yotadi",
          "Canalis facialis (yuz nervi) va canalis caroticus (ichki uyqu arteriyasi) shu suyakdan o'tadi"
        ],
        landmarks: "Pars petrosa, pars squamosa, pars tympanica, processus mastoideus, processus styloideus, porus acusticus externus et internus, fossa mandibularis.",
        attachments: "M. sternocleidomastoideus (processus mastoideusga), m. temporalis, m. stylohyoideus, m. styloglossus.",
        neurovascular: "A. carotis interna (canalis caroticus), n. facialis (VII juft, canalis facialis), n. vestibulocochlearis (VIII juft, porus acusticus internus), chorda tympani.",
        clinicalNote: "O'rta quloq otiti mastoiditga asoratlanishi mumkin (processus mastoideus katakchalarining erishi). Yuz nervining kanalda ezilishi Bell falaji (yuz bir tomonlama tortishi, ko'z yumilmasligi)ni keltirib chiqaradi. Kalla asosi singanda quloqdan likvor yoki qon oqishi (otolikvoreya) piramida sinishidan darak beradi.",
        parts: [
          { nameUz: "Palla qismi", nameLat: "Pars squamosa", desc: "Tepaga yo'nalgan yassi plastinka, yonoq o'sig'i (processus zygomaticus) bor." },
          { nameUz: "Nog'ora qismi", nameLat: "Pars tympanica", desc: "Tashqi eshituv teshigini (porus acusticus externus) o'rab turadi." },
          { nameUz: "Piramida (Toshsimon qism)", nameLat: "Pars petrosa", desc: "Uchburchak piramida bo'lib, ichida eshituv va muvozanat a'zolari (ichki quloq labirinti) joylashgan." },
          { nameUz: "So'rg'ichsimon qism", nameLat: "Pars mastoidea", desc: "Quloq orqasidagi massiv o'siq; ichida havoli katakchalar (cellulae mastoideae) bor." }
        ],
        canals: "Yuz nervi kanali (canalis facialis), uyqu arteriyasi kanali (canalis caroticus), mushak-eshituv nayi kanali (canalis musculotubarius)."
      },
      {
        id: "parietale",
        nameUz: "Tepa suyagi",
        nameLat: "Os parietale (84, 85-rasmlar)",
        type: "Juft to'rtburchak yassi suyak",
        pageRef: "Ahmedov: 43–44-betlar, 84, 85-rasmlar",
        clinicalTag: "NEYROTRAVMATOLOGIYA",
        quickFacts: [
          "Kalla qopqog'ining o'rta gumbazini hosil qiluvchi to'rtburchak juft yassi suyak",
          "Ichki yuzasida sulci arteriosi — a. meningea media shoxlarining chuqur o'yilgan izlari bor",
          "Pterion sohasida peshona, chakka va ponasimon suyaklar bilan tutashadi"
        ],
        landmarks: "Tuber parietale, linea temporalis superior et inferior, sulcus sinus sagittalis superioris, sulci arteriosi.",
        attachments: "M. temporalis, galea aponeurotica (kalla aponevrozi).",
        neurovascular: "A. meningea media (ichki yuzasida), sinus sagittalis superior (tepa chok bo'ylab).",
        clinicalNote: "Pterion sohasiga (chakka-tepa tutashuvi) to'g'ridan-to'g'ri urilgan zarba ostidagi a. meningea mediani uzib yuboradi. Soatlar ichida o'tkir epidural gematoma rivojlanadi: dastlab 'yorug' oraliq' (lucid interval), so'ngra chuqur koma — zudlik bilan dekompressiv kraniotomiya talab etiladi.",
        desc: "Kalla qopqog'ining o'rta qismini hosil qiladi; tashqi yuzasida tepa do'mbog'i (tuber parietale) va chakka chiziqlari (linea temporalis superior et inferior) joylashgan."
      },
      {
        id: "frontale",
        nameUz: "Peshona suyagi",
        nameLat: "Os frontale (86, 87-rasmlar)",
        type: "Toq suyak",
        pageRef: "Ahmedov: 44–46-betlar, 86, 87-rasmlar",
        clinicalTag: "LOR VA KRANIOFASIAL TRAVMA",
        quickFacts: [
          "Kalla qopqog'i va yuz skeletining tutashgan old qismini hosil qiladi",
          "Ichida havoli peshona bo'shlig'i (sinus frontalis) bo'lib, burun o'rta yo'liga ochiladi",
          "Pars orbitalis ko'z kosasining yuqori yupqa tomini hosil qiladi"
        ],
        landmarks: "Squama frontalis, tuber frontale, arcus superciliaris, glabella, margo supraorbitalis, pars orbitalis.",
        attachments: "M. orbicularis oculi, m. corrugator supercilii, m. frontalis.",
        neurovascular: "Foramen/incisura supraorbitalis orqali n. supraorbitalis (V/1) va a. supraorbitalis o'tadi.",
        clinicalNote: "Peshona suyagi sinusiti (frontit) kuchli bosh va peshona og'rig'iga sabab bo'ladi. Ko'z kosasi tomi singanda ko'z atrofida simmetrik qontalashlar ('ko'zoynak simptomi') paydo bo'ladi.",
        parts: "Peshona pallasi (squama frontalis), ko'z kosasi qismi (pars orbitalis) va burun qismi (pars nasalis); peshona bo'shlig'i (sinus frontalis) va qosh usti yoylari (arcus superciliaris) mavjud."
      },
      {
        id: "ethmoidale",
        nameUz: "G'alvir suyak",
        nameLat: "Os ethmoidale",
        type: "Toq suyak",
        pageRef: "Ahmedov: 46–47-betlar",
        clinicalTag: "RINOLOGIYA VA NEYROTRAVMA",
        quickFacts: [
          "Burun bo'shlig'i va ko'z kosasining ichki devorida joylashgan juda yengil havoli suyak",
          "Lamina cribrosa teshiklaridan I juft — hid bilish nervlari (nn. olfactorii) kalla bo'shlig'iga o'tadi",
          "Crista galli (xo'roz toji) bosh miya qattiq pardasining falx cerebri qatlamini ushlab turadi"
        ],
        landmarks: "Lamina cribrosa, crista galli, lamina perpendicularis, concha nasalis superior et media, labyrinthus ethmoidalis.",
        attachments: "Falx cerebri (bosh miya o'roqsimon o'sig'i).",
        neurovascular: "I juft — nn. olfactorii, a. et v. ethmoidalis anterior et posterior.",
        clinicalNote: "Lamina cribrosa sinishi (burun asosi travmalarida) burundan likvor oqishi (rinolikvoreya) va anosmiya (hid bilmaslik)ga sabab bo'ladi. Bu kalla bo'shlig'iga burundan infeksiya tushishi va pnevmonik/yiringli meningit rivojlanish xavfini keskin oshiradi.",
        desc: "Burun bo'shlig'i va ko'z kosasining ichki devorida joylashgan yengil, havoli suyak; g'alvir plastinkasi (lamina cribrosa — I juft hid bilish nervi tolalari o'tadi), xo'roz toji (crista galli) va burun chig'anoqlari (concha nasalis superior et media) bor."
      }
    ],
    viscerocranium: [
      {
        id: "maxilla",
        nameUz: "Yuqori jag' suyagi",
        nameLat: "Maxilla (88-rasm)",
        type: "Juft suyak",
        pageRef: "Ahmedov: 47–49-betlar, 88-rasm",
        clinicalTag: "YUZ-JAG' JARROHLIGI",
        quickFacts: [
          "Yuz skeletining markaziy juft suyagi bo'lib, eng yirik paranasal sinus — Gaymor bo'shlig'iga (sinus maxillaris) ega",
          "Processus alveolaris ustki tishlar qatori (16 ta katakcha) uchun asos bo'ladi",
          "4 ta o'siqqa ega: peshona, yonoq, tanglay va alveolyar"
        ],
        landmarks: "Sinus maxillaris, foramen infraorbitale, processus alveolaris, processus palatinus, tuber maxillae.",
        attachments: "M. buccinator, m. orbicularis oris, m. levator labii superioris.",
        neurovascular: "Foramen infraorbitaledan n. infraorbitalis (V/2 tarmog'i) va a. infraorbitalis chiqadi.",
        clinicalNote: "Gaymor bo'shlig'i yallig'lanishi (gaymorit) eng keng tarqalgan sinusitdir. Yuqori molyar tishlarning ildizlari ba'zan to'g'ridan-to'g'ri bo'shliq tubiga kirib turadi (odontogen gaymorit sababi). Yuz suyaklari sinishida Le Fort I, II, III darajalari bo'yicha maxilla jarohatlari tasniflanadi.",
        desc: "Katta havoli Gaymor bo'shlig'iga (sinus maxillaris) ega; 4 ta o'simtasi bor: peshona o'simtasi, yonoq o'simtasi, tanglay o'simtasi (processus palatinus) va tish katakchalari o'simtasi (processus alveolaris)."
      },
      {
        id: "mandibula",
        nameUz: "Pastki jag' suyagi",
        nameLat: "Mandibula (96–98-rasmlar)",
        type: "Toq, harakatchan yagona kalla suyagi",
        pageRef: "Ahmedov: 50–52-betlar, 96–98-rasmlar",
        clinicalTag: "STOMATOLOGIYA VA TRAVMA",
        quickFacts: [
          "Kallaning yagona harakatchan suyagi; tanasi va 2 ta shoxdan (ramus mandibulae) iborat",
          "Chakka-pastki jag' bo'g'imi (art. temporomandibularis) orqali chakka suyagiga tutashadi",
          "Jag' burchagi (angulus mandibulae) yoshga qarab 110° dan 150° gacha o'zgaradi"
        ],
        landmarks: "Corpus mandibulae, ramus mandibulae, angulus mandibulae, processus coronoideus, processus condylaris, foramen mentale.",
        attachments: "M. masseter (burchak tashqi yuziga), m. pterygoideus medialis (ichki yuziga), m. temporalis (processus coronoideusga).",
        neurovascular: "Canalis mandibulaedan n. alveolaris inferior va a. alveolaris inferior o'tadi; foramen mentaledan n. mentalis chiqadi.",
        clinicalNote: "Pastki jag'ning ikki tomonlama sinishida m. genioglossus tortish kuchi yo'qolib, til ildizi orqaga ketib traxeyani to'sishi (mexanik asfiksiya) mumkin. Tish davolashda foramen mandibulae sohasida o'tkaziladigan torusal yoki mandibulyar anesteziya n. alveolaris inferiorni bloklaydi.",
        desc: "Tanasi (corpus mandibulae) va ikkita shoxi (ramus mandibulae)dan iborat; shoxining tepasida tojsimon o'siq (processus coronoideus) va bo'g'im o'sig'i (processus condylaris) bor. Chakka-pastki jag' bo'g'imi (articulatio temporomandibularis) orqali chakka suyagi bilan birikadi.",
        angleProgression: [
          {
            stage: "Chaqaloq / Yosh bola",
            angle: "140°–150°",
            desc: "Tishlar hali chiqmagan, jag' tanasi yassi va past, chaynov muskullari rivojlanmagan bo'lganligi sababli burchak o'tmas, yassi bo'ladi."
          },
          {
            stage: "Katta yoshli odam",
            angle: "110°–130°",
            desc: "Doimiy tishlar to'liq chiqqan, alveolyar o'siqlar baland, kuchli chaynov muskullari jag' shoxini to'g'ri burchakka yaqinroq tortib turadi."
          },
          {
            stage: "Keksa odam",
            angle: "140°–150°",
            desc: "Tishlar to'kilib ketgach alveolyar o'siqlar so'rilib ketadi (atrofiya); jag' burchagi yana yassilanib, chaqaloq holatiga o'xshab o'tmaslashadi."
          }
        ]
      },
      { id: "palatinum", nameUz: "Tanglay suyagi", nameLat: "Os palatinum (89-rasm)", type: "Juft L-simon suyak, qattiq tanglayning orqa qismini hosil qiladi." },
      { id: "nasale", nameUz: "Burun suyagi", nameLat: "Os nasale (90-rasm)", type: "Juft to'rtburchak suyak, burun suyanchig'ini hosil qiladi. Yuz jarohatlarida eng ko'p sinadigan suyak." },
      { id: "lacrimale", nameUz: "Ko'z yoshi suyagi", nameLat: "Os lacrimale (91-rasm)", type: "Juft yupqa plastinka, ko'z yoshi xaltachasi egatchasiga ega." },
      { id: "concha_inferior", nameUz: "Pastki burun chig'anog'i", nameLat: "Concha nasalis inferior (92-rasm)", type: "Juft mustaqil suyak plastinkasi; ostida meatus nasi inferior joylashgan." },
      { id: "vomer", nameUz: "Dimog' suyagi (Lemeux)", nameLat: "Vomer (93-rasm)", type: "Toq trapetsiyasimon suyak, suyakli burun to'sig'ining orqa-pastki qismini tuzadi." },
      { id: "zygomaticum", nameUz: "Yonoq suyagi", nameLat: "Os zygomaticum (94, 95-rasmlar)", type: "Juft pishiq suyak, yuz qiyofasini shakllantiradi va yonoq ravog'ini (arcus zygomaticus) hosil qiladi." },
      { id: "hyoideum", nameUz: "Til osti suyagi", nameLat: "Os hyoideum (99-rasm)", type: "Toq taqasimon suyak, boshqa suyaklar bilan bevosita bo'g'im hosil qilmay, boylam va muskullar vositasida osilib turadi; sud tibbiyotida bo'g'ish jarohatlarida sinishi aniqlanadi." }
    ],
    skullCavities: [
      {
        id: "orbita",
        nameUz: "Ko'z kosasi",
        nameLat: "Orbita",
        pageRef: "Ahmedov: 52-bet",
        clinicalTag: "OFTALMOLOGIYA VA TRAVMA",
        quickFacts: [
          "To'rt tomonlama piramidasimon bo'shliq; cho'qqisi canalis opticusga yo'nalgan",
          "Ko'z olmasi, uni harakatlantiruvchi 6 ta muskul, ko'rish nervi va lakrimal apparatni saqlaydi",
          "Pastki devori (Gaymor bo'shlig'i tomi) juda nozik bo'lib, 'blowout' sinishiga moyil"
        ],
        clinicalNote: "Ko'z kosasining 'blowout' sinishida (masalan, musht yoki to'p zarbasida) ko'z olmasi ostidagi m. rectus inferior Gaymor bo'shlig'i ichiga qisilib qoladi — bu diplopiya (ko'zning tepaga qaraganda ikkita bo'lib ko'rinishi) va enoftalmga olib keladi.",
        desc: "To'rt tomonlama piramidasimon bo'shliq. Unda ko'z olmasi, uning muskullari, tomir va nervlari yotadi. 4 ta devori bor: yuqori devor (peshona va ponasimon suyak), pastki devor (yuqori jag' va yonoq), medial devor (ko'z yoshi, g'alvir, ponasimon), lateral devor (yonoq va ponasimon suyak katta qanoti)."
      },
      {
        id: "cavitas_nasi",
        nameUz: "Burun bo'shlig'i",
        nameLat: "Cavitas nasi",
        pageRef: "Ahmedov: 52-bet",
        clinicalTag: "LOR VA RINOLOGIYA",
        quickFacts: [
          "Suyakli burun to'sig'i (septum nasi osseum) bilan o'ng va chap yarmga bo'linadi",
          "3 ta burun yo'li (meatus nasi superior, medius, inferior) paranasal sinuslar bilan tutashgan",
          "Kiesselbach chigali (old-pastki qismda) burun qonashlarining 90% manbaidir"
        ],
        clinicalNote: "Burun to'sig'ining egriligi (deviatio septi nasi) nafas qisishi, surunkali rinosinusit va uyqu apnoesiga sabab bo'ladi. Epistaksis (burundan qon ketish) vaqtida oldingi yoki orqa burun tamponadasi qo'llaniladi.",
        desc: "Suyakli burun to'sig'i bilan o'ng va chap yarmga bo'linadi. 3 ta burun yo'li bor: yuqori yo'l (meatus nasi superior — ponasimon va g'alvir katakchalari ochiladi), o'rta yo'l (meatus nasi medius — Gaymor va peshona bo'shliqlari ochiladi), pastki yo'l (meatus nasi inferior — ko'z yoshi-burun kanali ochiladi)."
      },
      {
        id: "basis_cranii_interna",
        nameUz: "Kalla ichki asosi (3 ta chuqurcha)",
        nameLat: "Basis cranii interna (110, 111-rasmlar)",
        pageRef: "Ahmedov: 52–53-betlar, 110, 111-rasmlar",
        clinicalTag: "TOPOGRAFIK NEYROANATOMIYA",
        quickFacts: [
          "3 ta pog'onasimon chuqurcha: oldingi (yuqori), o'rta va orqa (eng pastki chuqur)",
          "Barcha 12 juft kalla nervlari va miyani oziqlantiruvchi magistral tomirlar shu teshiklardan o'tadi",
          "Kalla asosi sinishlarida o'ziga xos klinik triada: likvoreya, gematoma va nerv falajliklari kuzatiladi"
        ],
        fossae: [
          {
            nameUz: "Oldingi kalla chuqurchasi",
            nameLat: "Fossa cranii anterior",
            bones: "Peshona suyagi ko'z qismi, g'alvir plastinka, ponasimon suyak kichik qanotlari.",
            contents: "Bosh miya peshona bo'laklari yotadi. G'alvir plastinka teshiklaridan I juft — hid bilish nervlari (nn. olfactorii) o'tadi."
          },
          {
            nameUz: "O'rta kalla chuqurchasi",
            nameLat: "Fossa cranii media",
            bones: "Ponasimon suyak tanasi va katta qanotlari, chakka suyagi piramidasi old yuzasi.",
            contents: "Turk egarida gipofiz bezi yotadi. Bosh miya chakka bo'laklari joylashadi. Teshiklar: canalis opticus (II juft — n. opticus), fissura orbitalis superior (III, IV, VI va V/1 nervlar), foramen rotundum (V/2 — n. maxillaris), foramen ovale (V/3 — n. mandibularis), foramen spinosum (a. meningea media)."
          },
          {
            nameUz: "Orqa kalla chuqurchasi",
            nameLat: "Fossa cranii posterior",
            bones: "Ensa suyagi, chakka suyagi piramidasining orqa yuzasi, so'rg'ichsimon o'siq ichki yuzi.",
            contents: "Miyacha (cerebellum), ko'prik va uzunchoq miya yotadi. Teshiklar: foramen magnum (uzunchoq miya va a. vertebralis), foramen jugulare (IX, X, XI nervlar va v. jugularis interna), canalis hypoglossi (XII juft — n. hypoglossus), porus acusticus internus (VII va VIII nervlar)."
          }
        ]
      }
    ],
    infantSkull: {
      titleUz: "Chaqaloq kallasi va liqildoqlar (112, 113-rasmlar)",
      pageRef: "Ahmedov: 53-bet, 112, 113-rasmlar",
      clinicalTag: "PEDIATRIYA VA NEONATOLOGIYA",
      quickFacts: [
        "Chaqaloq kallasining yuz bo'limi miya bo'limiga nisbatan 1:8 nisbatda kichik bo'ladi (katta yoshda 1:2)",
        "Suyaklar orasida elastik biriktiruvchi to'qimali oraliqlar — liqildoqlar (fonticuli) mavjud",
        "Tug'ruq vaqtida kalla suyaklarining bir-birining ustiga siljib (konfiguratsiya) o'tishini ta'minlaydi"
      ],
      clinicalNote: "Katta liqildoq (fonticulus anterior) chaqaloq salomatligining muhim oynasidir: uning tarang bo'rtib chiqishi va pulsatsiyalanishi kalla ichi gipertenziyasi (gidrotsefaliya, meningit), ichiga botib qolishi esa kuchli degidratatsiya (suvsizlanish, toksikoz)dan dalolat beradi. Shuningdek liqildoq orqali neyrosonografiya (bosh miya UTT) amalga oshiriladi.",
      fontanelles: [
        {
          nameUz: "Oldingi katta liqildoq",
          nameLat: "Fonticulus anterior",
          shape: "Rombsimon (o'lchami 3.5 x 2.5 sm)",
          location: "Peshona va tepa suyaklari orasida",
          closure: "Bola hayotining 1.5 – 2 yoshida suyaklanib butunlay yopiladi."
        },
        {
          nameUz: "Orqa kichik liqildoq",
          nameLat: "Fonticulus posterior",
          shape: "Uchburchaksimon",
          location: "Ikkala tepa va ensa suyagi pallasi orasida",
          closure: "Bola tug'ilgandan so'ng 2-oyligida bekilib ketadi."
        },
        {
          nameUz: "Ponasimon juft liqildoqlar",
          nameLat: "Fonticulus sphenoidalis (juft)",
          shape: "Yon liqildoq",
          location: "Peshona, tepa, ponasimon va chakka suyaklari tutashgan joyda",
          closure: "Bola tug'ilganidan so'ng 2–3 oyligida bitadi."
        },
        {
          nameUz: "So'rg'ichsimon juft liqildoqlar",
          nameLat: "Fonticulus mastoideus (juft)",
          shape: "Yon liqildoq",
          location: "Tepa, ensa va chakka suyagi so'rg'ichsimon qismi orasida",
          closure: "Bola tug'ilganidan so'ng 2–3 oyligida bitadi."
        }
      ],
      growthPhases: [
        {
          phase: "I o'sish davri",
          period: "Tug'ilgandan 7 yoshgacha",
          desc: "Kalla juda shiddat bilan o'sadi, ayniqsa ensa bo'limi tez rivojlanadi, liqildoqlar yopilib, tishlar chiqa boshlaydi."
        },
        {
          phase: "II o'sish davri",
          period: "7 yoshdan balog'atgacha (14–16 yoshgacha)",
          desc: "Nisbatan sokin o'sish davri; kalla asosi va ko'z kosalari shakllanadi."
        },
        {
          phase: "III o'sish davri",
          period: "16 yoshdan 20–25 yoshgacha",
          desc: "Kallaning yuz bo'limi va havoli bo'shliqlari (Gaymor, peshona, ponasimon sinuslar) to'liq rivojlanib, individual tashqi qiyofa shakllanadi."
        }
      ]
    }
  },

  // LOTINCHA-O'ZBEKCHA ANATOMIK LUG'AT (GLOSSARY)
  glossary: [
    { lat: "Acetabulum", uz: "Quymich kosasi", cat: "Oyoq", desc: "Chanoq suyagida yonbosh, qov va quymich suyaklari birlashgan chuqurcha; son suyagi boshi kiradi.", fig: "47, 48" },
    { lat: "Acromion", uz: "Yelka o'simtasi", cat: "Qo'l", desc: "Kurak qirining lateral davomi bo'lgan keng yassi o'simta.", fig: "26, 27" },
    { lat: "Ala major / minor", uz: "Katta va kichik qanotlar", cat: "Kalla", desc: "Ponasimon suyakning tanasidan ikki yonga ketgan qanotlari.", fig: "73, 74" },
    { lat: "Angulus mandibulae", uz: "Pastki jag' burchagi", cat: "Kalla", desc: "Pastki jag' tanasi bilan shoxi orasidagi burchak; yoshga qarab 110° dan 150° gacha o'zgaradi.", fig: "96, 98" },
    { lat: "Arcus vertebrae", uz: "Umurtqa ravog'i", cat: "Tana", desc: "Umurtqa tanasining orqa tomonini o'rab turuvchi yarim aylana ravoq.", fig: "5, 6" },
    { lat: "Atlas", uz: "Atlant (I bo'yin umurtqasi)", cat: "Tana", desc: "Tanasi bo'lmagan, oldingi va orqa ravoqlardan tuzilgan birinchi bo'yin umurtqasi.", fig: "10, 11" },
    { lat: "Axis", uz: "Aksis (II bo'yin umurtqasi)", cat: "Tana", desc: "Tanasi ustida vertikal tishsimon o'simta (dens) bo'lgan o'qli umurtqa.", fig: "12, 13" },
    { lat: "Basis cranii", uz: "Kalla asosi (tubi)", cat: "Kalla", desc: "Kalla qutisining pastki tayanch qismi; ichki va tashqi yuzalarga ega.", fig: "109, 111" },
    { lat: "Calcaneus", uz: "Tovon suyagi", cat: "Oyoq", desc: "Oyoq kaft oldidagi eng yirik g'ovak suyak; tovon do'mbog'i bor.", fig: "62, 63" },
    { lat: "Calvaria", uz: "Kalla qopqog'i", cat: "Kalla", desc: "Bosh miyani ustidan gumbazsimon yopib turuvchi yassi suyaklar to'plami.", fig: "69, 70" },
    { lat: "Canalis caroticus", uz: "Uyqu arteriyasi kanali", cat: "Kalla", desc: "Chakka suyagi piramidasidan ichki uyqu arteriyasi o'tadigan kanal.", fig: "80, 109" },
    { lat: "Canalis facialis", uz: "Yuz nervi kanali", cat: "Kalla", desc: "Chakka suyagi piramidasida VII juft nerv o'tadigan egri-bugri kanal.", fig: "81, 82" },
    { lat: "Canalis opticus", uz: "Ko'rish kanali", cat: "Kalla", desc: "Ponasimon suyak kichik qanoti asosidagi teshik; II juft ko'rish nervi o'tadi.", fig: "73, 111" },
    { lat: "Canalis vertebralis", uz: "Umurtqa kanali", cat: "Tana", desc: "Umurtqalar teshiklarining ustma-ust tushishidan hosil bo'lgan orqa miya kanali.", fig: "5, 14" },
    { lat: "Caput femoris", uz: "Son suyagi boshi", cat: "Oyoq", desc: "Son suyagining sharsimon proximal uchi; acetabulumga kirib turadi.", fig: "49, 50" },
    { lat: "Caput humeri", uz: "Yelka suyagi boshi", cat: "Qo'l", desc: "Yelka suyagining sharsimon qismi; kurakning cavitas glenoidalisiga tutashadi.", fig: "28, 29" },
    { lat: "Cavitas medullaris", uz: "Ilik bo'shlig'i", cat: "Umumiy", desc: "Naysimon suyaklar diafizining o'rtasidagi ilik joylashgan bo'shliq.", fig: "3" },
    { lat: "Clavicula", uz: "O'mrov suyagi", cat: "Qo'l", desc: "Yelka kamariga kiruvchi S-simon naysimon suyak.", fig: "24, 25" },
    { lat: "Collum chirurgicum", uz: "Jarrohlik bo'yinchasi", cat: "Qo'l", desc: "Yelka suyagida do'mboqlardan pastdagi eng ko'p sinadigan soha.", fig: "28" },
    { lat: "Columna vertebralis", uz: "Umurtqa pog'onasi", cat: "Tana", desc: "33-34 ta umurtqalar zanjiridan iborat o'q skelet.", fig: "14, 15" },
    { lat: "Costae verae", uz: "Chin qovurg'alar", cat: "Tana", desc: "To'g'ridan-to'g'ri to'sh suyagiga tutashuvchi I–VII juft qovurg'alar.", fig: "22" },
    { lat: "Costae spuriae", uz: "Yolg'on qovurg'alar", cat: "Tana", desc: "To'shga yetmasdan oldingi qovurg'a tog'ayiga qo'shiluvchi VIII–X juft qovurg'alar.", fig: "22" },
    { lat: "Costae fluctuantes", uz: "Yetim (erkin) qovurg'alar", cat: "Tana", desc: "Oldingi uchi qorin devorida erkin tugaydigan XI–XII juft qovurg'alar.", fig: "22" },
    { lat: "Crista galli", uz: "Xo'roz toji", cat: "Kalla", desc: "G'alvir suyakning kalla ichiga bo'rtib chiqqan vertikal o'simtasi.", fig: "111" },
    { lat: "Dens axis", uz: "Aksis tishsimon o'sig'i", cat: "Tana", desc: "II bo'yin umurtqasining vertikal tishi; atlant uning atrofida aylanadi.", fig: "12, 13" },
    { lat: "Diaphysis", uz: "Diafiz (Suyak tanasi)", cat: "Umumiy", desc: "Naysimon suyaklarning ikki epifiz oralig'idagi o'rta kovak silindrsimon qismi.", fig: "3, 4" },
    { lat: "Diploe", uz: "Diploe (Kalla g'ovak moddasi)", cat: "Kalla", desc: "Kalla yassi suyaklarining tashqi va ichki qattiq plastinkalari orasidagi g'ovak to'qima.", fig: "110" },
    { lat: "Epiphysis", uz: "Epifiz (Suyak uchi)", cat: "Umumiy", desc: "Naysimon suyaklarning bo'g'im yuzasiga ega bo'lgan kengaygan uchlari.", fig: "3" },
    { lat: "Femur", uz: "Son suyagi", cat: "Oyoq", desc: "Odam skeletidagi eng yirik va mustahkam naysimon suyak.", fig: "49, 50" },
    { lat: "Fibula", uz: "Kichik boldir suyagi", cat: "Oyoq", desc: "Boldirning lateral tomonida joylashgan ingichka naysimon suyak.", fig: "55, 56" },
    { lat: "Fonticulus anterior", uz: "Oldingi katta liqildoq", cat: "Kalla", desc: "Chaqaloq kallasidagi rombsimon liqildoq; 1.5–2 yoshda bekiladi.", fig: "112, 113" },
    { lat: "Fonticulus posterior", uz: "Orqa kichik liqildoq", cat: "Kalla", desc: "Chaqaloq kallasidagi uchburchak liqildoq; 2 oylikda bekiladi.", fig: "112, 113" },
    { lat: "Foramen magnum", uz: "Katta ensa teshigi", cat: "Kalla", desc: "Ensa suyagidagi ulkan teshik; bosh miya orqa miyaga o'tadi.", fig: "71, 109, 111" },
    { lat: "Foramen nutricium", uz: "Oziq teshigi", cat: "Umumiy", desc: "Suyakka qon tomir va nervlar kirishi uchun xizmat qiladigan teshik.", fig: "4, 32" },
    { lat: "Fossa cranii anterior / media / posterior", uz: "Oldingi / O'rta / Orqa kalla chuqurchalari", cat: "Kalla", desc: "Kalla ichki asosining 3 ta bosqichli chuqurliklari.", fig: "111" },
    { lat: "Hamulus ossis hamati", uz: "Ilmoqli suyak ilmog'i", cat: "Qo'l", desc: "Kaft usti distal qatoridagi os hamatumning ilmoqsimon o'simtasi.", fig: "45" },
    { lat: "Mandibula", uz: "Pastki jag' suyagi", cat: "Kalla", desc: "Kallaning yagona harakatchan suyagi; chaynov apparatining asosi.", fig: "96–98" },
    { lat: "Maxilla", uz: "Yuqori jag' suyagi", cat: "Kalla", desc: "Yuz skeletining markaziy juft suyagi; Gaymor bo'shlig'i bor.", fig: "88" },
    { lat: "Metaphysis", uz: "Metafiz", cat: "Umumiy", desc: "Diafiz va epifiz orasidagi qism; bo'yiga o'sish zonasini tashkil qiladi.", fig: "3" },
    { lat: "Olecranon", uz: "Tirsak o'sig'i", cat: "Qo'l", desc: "Tirsak suyagining (ulna) orqa yuqori massiv o'sig'i.", fig: "30, 31" },
    { lat: "Os coxae", uz: "Chanoq suyagi", cat: "Oyoq", desc: "Yonbosh, qov va quymich suyaklarining birlashishidan hosil bo'lgan juft suyak.", fig: "47, 48" },
    { lat: "Os hyoideum", uz: "Til osti suyagi", cat: "Kalla", desc: "Hiqildoq ustida osilib turuvchi taqasimon mustaqil suyak.", fig: "99" },
    { lat: "Os pisiforme", uz: "No'xatsimon suyak", cat: "Qo'l", desc: "Kaft usti proksimal qatoridagi eng kichik sesamasimon suyak.", fig: "41" },
    { lat: "Os sacrum", uz: "Dumg'aza suyagi", cat: "Tana", desc: "5 ta dumg'aza umurtqasining o'zaro qo'shilishidan hosil bo'lgan yaxlit uchburchak suyak.", fig: "16, 17" },
    { lat: "Os sphenoidale", uz: "Ponasimon suyak", cat: "Kalla", desc: "Kalla asosining markazidagi ko'rshapalakka o'xshash toq suyak.", fig: "73–75" },
    { lat: "Os temporale", uz: "Chakka suyagi", cat: "Kalla", desc: "Eshituv va muvozanat a'zolarini o'zida saqlovchi murakkab suyak.", fig: "76–83" },
    { lat: "Patella", uz: "Tizza qopqog'i", cat: "Oyoq", desc: "Tizza bo'g'imi oldidagi eng yirik sesamasimon suyak.", fig: "51, 52" },
    { lat: "Periosteum", uz: "Suyak usti pardasi", cat: "Umumiy", desc: "Suyakni tashqaridan qoplab, uni oziqlantiruvchi va eniga o'stiruvchi ikki qavatli parda.", fig: "4" },
    { lat: "Promontorium", uz: "Burnoq (Dumg'aza burni)", cat: "Tana", desc: "V bel umurtqasi bilan dumg'aza suyagi tutashgan joydagi oldinga bo'rtgan do'mboq.", fig: "16" },
    { lat: "Radius", uz: "Bilak suyagi", cat: "Qo'l", desc: "Bilakning lateral tomonidagi suyagi; pro-supinatsiyada aylanadi.", fig: "32, 33" },
    { lat: "Scapula", uz: "Kurak suyagi", cat: "Qo'l", desc: "Yelka kamaridagi orqa uchburchak yassi suyak.", fig: "26, 27" },
    { lat: "Sella turcica", uz: "Turk egari", cat: "Kalla", desc: "Ponasimon suyak tanasi ustidagi egar; gipofiz bezi joylashadi.", fig: "73, 100" },
    { lat: "Sternum", uz: "To'sh suyagi", cat: "Tana", desc: "Ko'krak qafasining oldingi devorini hosil qiluvchi toq yassi suyak.", fig: "20" },
    { lat: "Substantia compacta", uz: "Zich modda", cat: "Umumiy", desc: "Suyakning tashqi qattiq, mustahkam qatlami.", fig: "3" },
    { lat: "Substantia spongiosa", uz: "G'ovak modda", cat: "Umumiy", desc: "Suyak ichidagi suyak to'sinchalari va qizil ilikdan iborat qatlam.", fig: "3" },
    { lat: "Talus", uz: "Oshiq suyak", cat: "Oyoq", desc: "Boldir suyaklari bilan bo'g'im hosil qiluvchi kaft oldi suyagi.", fig: "61" },
    { lat: "Tibia", uz: "Katta boldir suyagi", cat: "Oyoq", desc: "Boldirning medial tomondagi qalin va kuchli naysimon suyagi.", fig: "53, 54" },
    { lat: "Tuberculum caroticum", uz: "Uyqu do'mbog'i", cat: "Tana", desc: "VI bo'yin umurtqasining ko'ndalang o'sig'idagi do'mboq; uyqu arteriyasini bosish nuqtasi.", fig: "7" },
    { lat: "Ulna", uz: "Tirsak suyagi", cat: "Qo'l", desc: "Bilakning medial tomondagi suyagi; tirsak o'sig'i (olecranon) bor.", fig: "30, 31" },
    { lat: "Vertebra prominens", uz: "Bo'rtib chiquvchi umurtqa", cat: "Tana", desc: "VII bo'yin umurtqasi (C7); o'tkir o'sig'i teri ostida yaqqol sezilib turadi.", fig: "9" }
  ],

  // VIKTORINA SAVOLLARI (MEDIK TALABALAR UCHUN)
  quizQuestions: [
    {
      id: 1,
      question: "Ahmedov darsligiga ko'ra, normal odam suyagining qattiqligi va pishiqligi nimalarga qiyoslanadi?",
      options: [
        "Po'latdan qattiq, kauchukdek elastik",
        "Eman daraxtidan pishiq, granitdan qattiq, mis va temirga barobar",
        "Marmardan qattiq, shishadan mo'rt",
        "Qo'rg'oshindek og'ir, olmosdek o'tkir"
      ],
      correct: 1,
      explanation: "Ahmedov atlasining 6-betida: 'Normal suyak eman daraxtidan pishiq, granitdan qattiq, mis bilan temirga barobar keladi' deb ta'riflangan."
    },
    {
      id: 2,
      question: "Suyakning mineral (anorganik) tarkibida eng katta foizni qaysi modda tashkil etadi?",
      options: [
        "Kalsiy karbonat (25%)",
        "Magniy fosfat (15.5%)",
        "Fosfat ohak / Kalsiy fosfat (51.04%)",
        "Natriy xlorid (30.1%)"
      ],
      correct: 2,
      explanation: "Suyakning 2/3 anorganik qismida kalsiy tuzlari yetakchi bo'lib, ayniqsa fosfat ohak (kalsiy fosfat) 51,04% ni tashkil etadi (5-bet)."
    },
    {
      id: 3,
      question: "Suyak usti pardasining (periosteum) qaysi qavati suyakning eniga o'sishini va regeneratsiyasini ta'minlaydi?",
      options: [
        "Tashqi fibroz to'qima qavati",
        "Ichki asab va qon tomirlarga boy osteogen (kambial) qavati",
        "Metaepifizar tog'ay qavati",
        "Gialin bo'g'im tog'ayi"
      ],
      correct: 1,
      explanation: "Periostning ichki qavati nerv va qon tomirlarga hamda osteoblastlarga boy bo'lib, suyakni eniga o'stiradi va shikastlanganda tiklaydi (6-bet)."
    },
    {
      id: 4,
      question: "Odam umurtqa pog'onasining o'rtacha uzunligi erkak va ayollarda necha santimetrni tashkil qiladi?",
      options: [
        "Erkaklarda 80-85 sm, ayollarda 75-78 sm",
        "Erkaklarda 73–75 sm, ayollarda 69–71 sm",
        "Erkaklarda 65-68 sm, ayollarda 60-63 sm",
        "Ikkala jinsda ham bir xil — 70 sm"
      ],
      correct: 1,
      explanation: "Ahmedov atlasining 7-betida: 'Umurtqa pog'onasining o'rtacha uzunligi erkaklarda 73–75 sm, ayollarda esa 69–71 sm' deb qayd etilgan."
    },
    {
      id: 5,
      question: "Nima sababdan I bo'yin umurtqasi (atlant)da umurtqa tanasi (corpus vertebrae) mavjud emas?",
      options: [
        "Odam tik yurishga o'tgani sababli atrofiyalangan",
        "Uning tanasi embrional davrda II bo'yin umurtqasiga qo'shilib, tishsimon o'siqni (dens) hosil qilgan",
        "Kalla suyagi og'irligi uni yassilab yuborgan",
        "Ensa suyagi uning o'rnini egallagan"
      ],
      correct: 1,
      explanation: "10-bet: 'Birinchi bo'yin umurtqasi takomil etish davrida ikkinchi umurtqaga o'tib, tishsimon o'siqni hosil qiladi. Natijada uning tanasi o'rniga oldingi ravog'i vujudga kelib, umurtqa teshigi kengaygan.'"
    },
    {
      id: 6,
      question: "Qon ketganda umumiy uyqu arteriyasini suyakka bosib to'xtatish mumkin bo'lgan 'tuberculum caroticum' qaysi umurtqada joylashgan?",
      options: [
        "IV bo'yin umurtqasida",
        "VI bo'yin umurtqasida (C6)",
        "VII bo'yin umurtqasida (C7)",
        "I ko'krak umurtqasida (Th1)"
      ],
      correct: 1,
      explanation: "VI bo'yin umurtqasining oldingi do'mbog'i yonidan uyqu arteriyasi o'tganligi sababli 'uyqu do'mbog'i' (tuberculum caroticum) deb ataladi (8-bet)."
    },
    {
      id: 7,
      question: "Yetim (erkin) qovurg'alar (costae fluctuantes) nechanchi juft qovurg'alarni o'z ichiga oladi?",
      options: [
        "I va II juft",
        "VIII, IX va X juft",
        "XI va XII juft",
        "Faqat XII juft"
      ],
      correct: 2,
      explanation: "XI va XII juft qovurg'alarning oldingi uchlari to'shga birikmay, qorin muskullari orasida erkin tugaydi, shuning uchun 'yetim qovurg'alar' deyiladi."
    },
    {
      id: 8,
      question: "Kaft usti (ossa carpi) suyaklarining proksimal qatoriga qaysi suyaklar kiradi (bosh barmoqdan jimjiloqqa qarab)?",
      options: [
        "Trapetsiya, trapetsiyasimon, boshchali, ilmoqli",
        "Qayiqsimon, yarimoysimon, uch qirrali, no'xatsimon",
        "Tovon, oshiq, qayiqsimon, ponasimon",
        "Boshchali, yarimoysimon, ilmoqli, trapetsiya"
      ],
      correct: 1,
      explanation: "Kaft ustining proksimal qatori 4 ta suyakdan iborat: os scaphoideum (qayiqsimon), os lunatum (yarimoysimon), os triquetrum (uch qirrali) va os pisiforme (no'xatsimon) (19-bet)."
    },
    {
      id: 9,
      question: "Odam tanasidagi eng yirik sesamasimon suyak qaysi?",
      options: [
        "No'xatsimon suyak (os pisiforme)",
        "Tizza qopqog'i (patella)",
        "Oshiq suyak (talus)",
        "Tovon suyagi (calcaneus)"
      ],
      correct: 1,
      explanation: "Patella (tizza qopqog'i) odam tanasidagi eng katta sesamasimon suyak bo'lib, sonning to'rt boshli muskuli payi ichida yotadi (7, 27-betlar)."
    },
    {
      id: 10,
      question: "Chanoq suyagini hosil qiluvchi 3 ta suyak (yonbosh, qov, quymich) necha yoshgacha tog'ay orqali birikib turadi?",
      options: [
        "3-5 yoshgacha",
        "7-9 yoshgacha",
        "14–16 yoshgacha",
        "25-30 yoshgacha"
      ],
      correct: 2,
      explanation: "Ahmedov atlasiga binoan: Yonbosh, qov va quymich suyaklari 14–16 yoshgacha quymich kosasida tog'ay vositasida birlashadi, so'ngra suyaklanib ketadi (23-bet)."
    },
    {
      id: 11,
      question: "Son suyagi kollodiafiz burchagi (bo'yincha-tana burchagi) ayollarda nima sababdan to'g'ri burchakka yaqinroq bo'ladi?",
      options: [
        "Ayollar bo'yi pastroq bo'lgani uchun",
        "Ayollar chanog'i erkaklarnikiga nisbatan sezilarli darajada kengroq bo'lganligi sababli",
        "Son suyagi ingichka bo'lgani sababli",
        "Tizza bo'g'imi tuzilishi tufayli"
      ],
      correct: 1,
      explanation: "Ayollarda chanoqning ko'ndalang o'lchami keng bo'lgani tufayli son suyaklari pastga qarab ko'proq qiyalanadi va kollodiafiz burchagi erkaklardagi 130° dan farqli ravishda to'g'ri burchakka (115-120°) yaqinlashadi."
    },
    {
      id: 12,
      question: "Turk egari (sella turcica) qaysi kalla suyagining tanasida joylashgan va uning chuqurchasida qaysi ichki sekretsiya bezi yotadi?",
      options: [
        "Ensa suyagida — epifiz bezi",
        "Peshona suyagida — qalqonsimon bez",
        "Ponasimon suyakda (os sphenoidale) — gipofiz bezi (hypophysis)",
        "G'alvir suyakda — timus bezi"
      ],
      correct: 2,
      explanation: "Ponasimon suyak (os sphenoidale) tanasining ustida sella turcica joylashgan bo'lib, undagi chuqurchada gipofiz bezi (fossa hypophysialis) yotadi (36, 51-betlar)."
    },
    {
      id: 13,
      question: "Pastki jag' burchagi (angulus mandibulae) keksa odamlarda tishlar to'kilib ketgach qanday o'zgaradi?",
      options: [
        "90° gacha torayadi",
        "O'zgarmaydi, 110° ligicha qoladi",
        "Alveolyar o'simtalar so'rilib, burchak yana chaqaloqlardek 140°–150° gacha yassilanadi",
        "Pastki jag' suyagi to'liq sinostozga uchraydi"
      ],
      correct: 2,
      explanation: "45-bet: 'Tishlar tushib ketishi bilan chaynov muskullari bo'shashadi. Natijada pastki jag' burchagi yassilana borib, chaqaloq bolalarning pastki jag'iga o'xshab qoladi (140-150°).'"
    },
    {
      id: 14,
      question: "Chaqaloq kallasidagi oldingi katta rombsimon liqildoq (fonticulus anterior) bola necha yoshga yetganda to'liq suyaklanib bitadi?",
      options: [
        "2 oyligida",
        "6 oyligida",
        "1.5 – 2 yoshida",
        "7 yoshida"
      ],
      correct: 2,
      explanation: "52-53-betlar: Oldingi katta rombsimon liqildoq bola 2 yoshga to'lganda suyaklanib butunlay yopiladi; orqa liqildoq esa 2 oyligida bekiladi."
    },
    {
      id: 15,
      question: "Kalla suyagining orqa kalla chuqurchasida (fossa cranii posterior) joylashgan 'foramen jugulare' teshigidan qaysi kalla nervlari o'tadi?",
      options: [
        "I, II va III juft nervlar",
        "V/1, V/2 va V/3 nervlar",
        "IX, X va XI juft nervlar (hamda v. jugularis interna)",
        "Faqat XII juft til osti nervi"
      ],
      correct: 2,
      explanation: "Bo'yinturuq teshigi (foramen jugulare) orqali til-yutqin (IX), adashgan (X) va qo'shimcha (XI) bosh miya nervlari hamda ichki bo'yinturuq venasi o'tadi (51-bet)."
    }
  ]
};

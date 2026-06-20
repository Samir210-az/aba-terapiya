/* ============================================================
   AN Psixoloji — ABA Platforması
   DOMAIN_LIB: hər bacarıq sahəsi üçün konkret addımlar + valideyn tapşırıqları
   FBA_PARENT: davranış funksiyasına görə valideyn tapşırıqları
============================================================ */
window.DOMAIN_LIB = {
  mand:{ method:"Mand təlimi (motivasiya + FCT)",
    steps:[
      "Uşağın hazırda ən çox istədiyi əşya/fəaliyyəti (gücləndirici) müəyyən edin və onu görünən, lakin əlçatmaz yerə qoyun.",
      "Maraq göstərəndə dərhal tələbi modelləyin (söz/işarə/şəkil) və cəhd səviyyəsində belə tələbi qəbul edib əşyanı verin.",
      "Köməyi tədricən azaldın: tam model → ilk səs/işarə → 3–5 saniyə gözləmə.",
      "Tələbi müxtəlif əşya, şəxs və otaqlara genişləndirin ki, ümumiləşsin."],
    parent:[
      "Sevdiyi əşyanı şəffaf qutuya qoyun; açmadan əvvəl uşaqdan tələb (söz/işarə/şəkil) gözləyin.",
      "Gün ərzində 5–10 təbii “tələb fürsəti” yaradın: qəlyanaltı, oyuncaq, bayıra çıxmaq.",
      "Uşaq tələb edən kimi dərhal verin — gözlətməyin ki, ünsiyyət “işləsin”."] },

  takt:{ method:"Takt (adlandırma) təlimi",
    steps:[
      "Tanış əşya/şəkli göstərib “Bu nədir?” soruşun; doğru adı modelləyin və təkrarlatdırın.",
      "Doğru adlandırmanı tərif və gücləndirici ilə dərhal möhkəmləndirin.",
      "Real əşyadan şəklə, sonra müxtəlif nümunələrə keçin (ümumiləşdirmə)."],
    parent:[
      "Gəzinti zamanı gördüyünüz əşyaları adlandırın və uşağa təkrarlatdırın.",
      "Şəkilli kitablara birlikdə baxın, “bu nədir?” oyununu oynayın."] },

  listener:{ method:"Reseptiv dil (dinləyici cavabı)",
    steps:[
      "Sadə, bir addımlı təlimatla başlayın (“otur”, “gəl”); lazım olduqda fiziki kömək (prompt) verin.",
      "Doğru icranı dərhal gücləndirin; köməyi tədricən azaldın.",
      "Tanış əşyaları göstərmə (“harada top?”) və iki addımlı təlimatlara keçin."],
    parent:[
      "Gündəlik işlərdə sadə təlimatlar verin (“ayaqqabını gətir”) və uğuru tərifləyin.",
      "Təlimatı bir dəfə, aydın deyin; lazım olsa göstərib kömək edin."] },

  imitation:{ method:"Təqlid təlimi (model + prompt fading)",
    steps:[
      "“Belə et” deyib sadə motor hərəkəti modelləyin; fiziki kömək verin, sonra azaldın.",
      "Uşağın artıq bacardığı hərəkətləri yenilərlə qarışdırın (qarışıq təlim).",
      "Obyektli və ardıcıl iki hərəkətli təqlidlərə keçin."],
    parent:[
      "Mahnılı-hərəkətli oyunlar oynayın (“əl-əl”, “böyük-kiçik”) və təqlidi tərifləyin.",
      "Güzgü qarşısında üz-mimika oyunları edin."] },

  echoic:{ method:"Vokal təqlid (echoic)",
    steps:[
      "Uşağın çıxara bildiyi səslərdən başlayın; oyun şəklində təkrarlatdırın.",
      "Səs → heca → söz ardıcıllığı ilə çətinliyi tədricən artırın.",
      "Hər vokal cəhdi dərhal gücləndirin (səs çıxarmağı “gəlirli” edin)."],
    parent:[
      "Gündəlik səs oyunları oynayın (heyvan səsləri, “ba-ba”, “ma-ma”).",
      "Uşaq səs çıxaranda eyni səsi geri qaytarın (səs-əks oyunu)."] },

  intraverbal:{ method:"İntraverbal (sual-cavab, tamamlama)",
    steps:[
      "Tanış mahnı/ifadələrin sonunu boş buraxıb tamamlatdırın (fill-in).",
      "Sadə sosial suallara (“adın nədir?”) model + gücləndirmə ilə cavab öyrədin.",
      "Kateqoriya və funksiya suallarına keçin (“heyvan de”, “nə ilə yeyirik?”)."],
    parent:[
      "Tanış mahnıları birlikdə oxuyun, son sözü uşağa buraxın.",
      "Gün ərzində sadə suallar verin və cavabı modelləyin."] },

  play:{ method:"Funksional və müstəqil oyun",
    steps:[
      "Oyuncaqla funksional oyunu modelləyin (maşını sürmək, gəlincik yedizdirmək).",
      "Uşağı birgə oyuna cəlb edin, sonra müstəqil oyun müddətini vizual taymerlə artırın.",
      "Oyun ssenarisini genişləndirin (ardıcıl 2–3 hərəkət)."],
    parent:[
      "Hər gün 10–15 dəq birlikdə oyun oynayın, sonra müstəqil oyunu tərifləyin.",
      "Ekran vaxtını azaldıb funksional oyuncaqlar təklif edin."] },

  social:{ method:"Sosial qarşılıqlı əlaqə",
    steps:[
      "Göz kontaktını sevimli əşya/üzü göz səviyyəsinə gətirməklə təbii şəkildə gücləndirin.",
      "Sadə növbəli oyunlarla (top ötürmə) qarşılıqlılığı öyrədin.",
      "Digər uşaqlarla qısa, strukturlu birgə fəaliyyətlər təşkil edin."],
    parent:[
      "Ailədə növbəli oyunlar oynayın (“indi sən, indi mən”).",
      "Salamlaşma və sağollaşmanı hər gün təkrarlayın və modelləyin."] },

  cooperation:{ method:"Əməkdaşlıq və gücləndirici idarəsi",
    steps:[
      "Güclü gücləndiriciləri müəyyən edin (preferens qiymətləndirməsi) və yalnız işlə əlaqəli verin.",
      "Asan, qısa tapşırıqlarla “təlim cütlüyü” qurun (instruksiya → cavab → mükafat).",
      "Tapşırıq tələbini tədricən artırın; oturma və diqqəti möhkəmləndirin."],
    parent:[
      "Sevdiyi əşyaları “xüsusi” edin — yalnız müəyyən vaxt/işdən sonra verin.",
      "Kiçik tapşırıqdan sonra dərhal tərif/mükafat verin."] },

  visual:{ method:"Vizual performans (uyğunlaşdırma, sıralama)",
    steps:[
      "Eyni əşyaları uyğunlaşdırmaqla başlayın (eyni–eyni), sonra şəkil–şəkil, əşya–şəkil.",
      "Rəng, forma, ölçü üzrə çeşidləməyə (sorting) keçin.",
      "Sadə pazl və ardıcıllıq (sıralama) tapşırıqları əlavə edin."],
    parent:[
      "Evdə əşyaları birlikdə çeşidləyin (corablar, qaşıqlar, rənglər).",
      "Sadə pazllar və uyğunlaşdırma oyunları oynayın."] },

  academic:{ method:"Akademik öncəsi bacarıqlar",
    steps:[
      "Rəng, forma, rəqəm və hərfləri əvvəlcə reseptiv (göstər), sonra ekspressiv (de) öyrədin.",
      "Hər anlayışı gündəlik oyun və materiallarla əlaqələndirin.",
      "Sadə sayma və “neçədir?” tapşırıqlarına keçin."],
    parent:[
      "Gün ərzində rəng və formaları adlandırın (“qırmızı alma”, “dəyirmi top”).",
      "1-dən 5-ə qədər birlikdə sayın (pillə, oyuncaq)."] },

  selfcare:{ method:"Özünə qulluq (zəncirləmə)",
    steps:[
      "Bacarığı kiçik addımlara bölün (task analizi) və zəncirləmə (chaining) ilə öyrədin.",
      "Hər addımda lazımi qədər kömək verin, sonra tədricən azaldın.",
      "Müstəqilliyi vizual addım kartları ilə dəstəkləyin."],
    parent:[
      "Əl yuma, geyinmə kimi işləri hər gün eyni ardıcıllıqla birlikdə edin.",
      "Uşağa son addımı özü tamamlamağa imkan verin və tərifləyin."] },

  motor:{ method:"Motor bacarıqlar (iri və incə)",
    steps:[
      "İri motor (atlama, tarazlıq) və incə motor (tutma, qələm) tapşırıqlarını ayrı planlaşdırın.",
      "Hərəkəti modelləyin, fiziki kömək verin, sonra azaldın.",
      "Lazım olduqda erqoterapevtlə (OT) əməkdaşlıq edin."],
    parent:[
      "Boyama, kəsmə, muncuq düzmə kimi incə motor oyunları oynayın.",
      "Hər gün açıq havada hərəkət fəaliyyəti (qaçma, top) təşkil edin."] },

  home:{ method:"Ev bacarıqları",
    steps:[
      "Sadə ev işlərini task analizi ilə öyrədin (süfrə düzmək, oyuncaq yığmaq).",
      "Vizual cədvəl və addım kartları ilə müstəqilliyi artırın.",
      "Tamamlanan işi dərhal təriflə möhkəmləndirin."],
    parent:[
      "Uşağa gündəlik kiçik məsuliyyət verin (qabını aparmaq, oyuncaq yığmaq).",
      "İşi vizual cədvəllə göstərin ki, ardıcıllığı görsün."] },

  community:{ method:"İcma və ictimai mühit",
    steps:[
      "İctimai mühitə qısa, planlı çıxışlarla başlayın (mağaza, park).",
      "Gözləmə, növbə və təhlükəsiz davranışı əvvəlcədən məşq etdirin.",
      "Vizual dəstək (şəkilli cədvəl) ilə keçidləri asanlaşdırın."],
    parent:[
      "Mağazaya/parka getməzdən əvvəl nə olacağını şəkillə izah edin.",
      "Qısa çıxışlardan başlayıb müddəti tədricən artırın."] },

  safety:{ method:"Təhlükəsizlik və müstəqillik",
    steps:[
      "Əsas təhlükəsizlik qaydalarını (yol, isti, kənar adam) rol oyunu ilə öyrədin.",
      "Ad/ünvanı tanıma və kömək istəməyi məşq etdirin.",
      "Bacarıqları real, lakin nəzarətli mühitdə tətbiq edin."],
    parent:[
      "Yolda əl tutmaq, işıqfor qaydasını hər gün təkrarlayın.",
      "“İtsən nə edərsən?” kimi ssenariləri sakit şəkildə məşq edin."] },

  communication:{ method:"Ünsiyyət (reseptiv + ekspressiv)",
    steps:[
      "Anlama (reseptiv) və ifadəni (ekspressiv) ayrı hədəfləyin.",
      "Lazım olduqda alternativ ünsiyyət (şəkil/AAC) tətbiq edin.",
      "Funksional ifadələri gündəlik rejimə yerləşdirin."],
    parent:[
      "Uşağın hər ünsiyyət cəhdinə (səs, işarə, söz) dərhal cavab verin.",
      "Gün ərzində qısa, aydın cümlələrlə danışın."] },

  daily:{ method:"Gündəlik yaşam bacarıqları",
    steps:[
      "Yemək, geyinmə, gigiyena bacarıqlarını task analizi ilə öyrədin.",
      "Rutini sabit saxlayın və vizual cədvəllə dəstəkləyin.",
      "Müstəqilliyi addım-addım artırın."],
    parent:[
      "Gündəlik rejimi sabit saxlayın (eyni vaxt, eyni ardıcıllıq).",
      "Hər müstəqil addımı tərifləyin və sonra köməyi azaldın."] },

  coping:{ method:"Davranış uyğunluğu və özünütənzimləmə",
    steps:[
      "Çətin anları əvvəlcədən proqnozlaşdırıb keçid xəbərdarlığı verin.",
      "Sakitləşmə üsullarını (dərin nəfəs, fasilə) sakit vaxtda öyrədin.",
      "Uyğun davranışı differensial gücləndirmə (DRA) ilə möhkəmləndirin."],
    parent:[
      "Keçidləri əvvəlcədən xəbər verin (“5 dəqiqədən sonra...”).",
      "Sakitləşmə üçün rahat “sakit guşə” yaradın."] },

  generalization:{ method:"Ümumiləşdirmə (PEAK-G)",
    steps:[
      "Öyrənilmiş bacarığı fərqli materiallar, insanlar və mühitlərlə məşq etdirin.",
      "Müxtəlif nümunələrlə (çoxlu nümunə təlimi) çevikliyi artırın.",
      "Təbii mühitdə spontan istifadəni gücləndirin."],
    parent:[
      "Eyni bacarığı evdə fərqli otaqlarda və fərqli əşyalarla məşq edin.",
      "Ailənin müxtəlif üzvləri ilə təkrarlayın."] },

  equivalence:{ method:"Stimul ekvivalentliyi (PEAK-E)",
    steps:[
      "Söz–şəkil–əşya əlaqələrini qurun (eşitdiyi sözü şəklə, şəkli əşyaya bağlayır).",
      "Verilmiş əlaqələrdən yeni əlaqələrin yaranmasını yoxlayın.",
      "Anlayışları kateqoriyalara bağlayın."],
    parent:[
      "Söz–şəkil oyunları oynayın (sözü deyin, uşaq şəkli tapsın).",
      "Eyni anlayışı müxtəlif formada göstərin (söz, şəkil, real əşya)."] },

  relational:{ method:"Relational/transformasiya (PEAK-T)",
    steps:[
      "Müqayisə anlayışlarını öyrədin (böyük/kiçik, çox/az, əvvəl/sonra).",
      "Eyni/fərqli və əks əlaqələri tapşırıqlarla məşq etdirin.",
      "Anlayışları real situasiyalara köçürün."],
    parent:[
      "Gündəlik müqayisələr edin (“hansı daha böyükdür?”).",
      "Sıralama oyunları oynayın (kiçikdən böyüyə düz)."] },

  problem_solving:{ method:"İdrak və problem həlli",
    steps:[
      "Sadə problem ssenariləri qurun və addım-addım həlli modelləyin.",
      "Səbəb-nəticə anlayışını oyunla öyrədin.",
      "Uşağa seçim və qərar imkanı verin."],
    parent:[
      "“Nə edək?” suallarını gündəlik həyatda verin.",
      "Sadə tapmaca və “tap-gör” oyunları oynayın."] }
};

/* FBA — davranış funksiyasına görə valideyn tapşırıqları (terapevt strategiyaları alət səhifəsindədir) */
window.FBA_PARENT = {
  "Diqqət":[
    "Uşaq sakit/uyğun davrananda ona tez-tez müsbət diqqət verin (gözləmədən).",
    "Problemli davranış zamanı reaksiyanı minimuma endirin (sakit, qısa)."],
  "Qaçma":[
    "Tapşırığı kiçik hissələrə bölün; tamamlananda fasilə + tərif verin.",
    "“Fasilə istəyirəm” ifadəsini öyrədin və ona hörmət edin."],
  "Əşya/Fəaliyyət":[
    "İstədiyi əşyanı davranışla deyil, uyğun tələblə əldə etməsinə imkan verin.",
    "Keçidləri əvvəlcədən xəbər verin və gözləməyi tədricən öyrədin."],
  "Sensor":[
    "Təhlükəsiz sensor alternativlər təklif edin (fidget, hərəkət fasiləsi).",
    "Mühitdəki səs/işıq/izdihamı azaldın; sensor ehtiyacı planlı ödəyin."]
};

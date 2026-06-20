/* ============================================================
   AN Psixoloji — ABA Bilik Bazası (kb.js)
   Hər "theme" üçün: metod, konkret terapiya addımları, valideyn tapşırıqları
============================================================ */
const ABA_KB = {
  mand:{ label:"Tələb etmə (Mand)", method:"Mand təlimi — motivasiya + təbii mühit (NET)",
    steps:[
      "Uşağın hazırda ən çox istədiyi 3–5 əşya/fəaliyyəti müəyyən edin (motivasiya əməliyyatı).",
      "Əşyanı uşağın görəcəyi, amma çata bilməyəcəyi yerdə saxlayın.",
      "Uşaq maraq göstərən kimi tələb formasını (söz / işarə / PECS kartı) model verin.",
      "İlk cəhdlərdə tam kömək (prompt) verin, sonra köməyi mərhələli azaldın (fading).",
      "Düzgün tələbdən dərhal sonra (2–3 saniyə) əşyanı verin.",
      "Gün ərzində ən azı 30–50 təbii tələb fürsəti yaradın və hər birini qeyd edin."],
    parent:[
      "Uşağa istədiyini dərhal verməyin — əvvəl hər hansı tələb formasını (səs, jest, söz) gözləyin.",
      "Sevimli əşyaları gözə görünən, amma əlçatmaz rəfdə saxlayın ki, tələb fürsəti yaransın.",
      "Hər tələbi dərhal mükafatlandırın və “afərin, istədin!” deyə adlandırın."]},

  tact:{ label:"Adlandırma (Takt)", method:"Takt təlimi — DTT + gündəlik adlandırma",
    steps:[
      "Tanış 5–10 əşya/şəkillə başlayın.",
      "Əşyanı göstərib “Bu nədir?” soruşun; cavab gəlməsə adını model verin və təkrarlatın.",
      "Düzgün adlandırmanı sosial təriflə dərhal gücləndirin.",
      "Real əşyadan şəklə, sonra hərəkət və xüsusiyyətlərə (rəng, ölçü) keçin.",
      "Gün ərzində gördüyü əşyaları öz-özünə adlandırmağa təşviq edin."],
    parent:[
      "Gəzinti zamanı gördüyünüz əşyaları adlandırın və uşağa təkrarlatın.",
      "Şəkilli kitablara baxarkən “bu nədir?” oyununu oynayın.",
      "Uşaq düzgün desə dərhal sevinclə təsdiqləyin."]},

  listener:{ label:"Dinləyici cavabı (təlimatlar)", method:"Dinləyici təlimi — DTT",
    steps:[
      "Bir addımlı sadə təlimatla başlayın (“otur”, “ver”, “gəl”).",
      "Təlimatı bir dəfə aydın deyin; icra olunmasa yüngül fiziki kömək edin.",
      "İcra olunan kimi dərhal mükafat verin.",
      "Köməyi tədricən azaldın, sonra iki addımlı təlimata keçin.",
      "Müxtəlif insan və mühitlərdə təkrarlayın (ümumiləşdirmə)."],
    parent:[
      "Gündə bir neçə sadə tapşırıq verin (“ayaqqabını gətir”).",
      "Göstərişi qısa və aydın saxlayın — bir anda bir təlimat.",
      "İcra edəndə tərifləyin, etməyəndə yumşaq əl ilə kömək edin."]},

  imitation:{ label:"İmitasiya (təqlid)", method:"Motor imitasiya — DTT",
    steps:[
      "“Belə et” deyib sadə motor hərəkət göstərin (əl çalmaq, qol qaldırmaq).",
      "Lazım olsa əlləri ilə fiziki kömək edin, sonra azaldın.",
      "Düzgün təqliddən sonra dərhal mükafat verin.",
      "Obyektlə imitasiyaya (top atmaq), sonra 2–3 addımlı ardıcıllığa keçin.",
      "Oyun içində təbii təqlid fürsətləri yaradın."],
    parent:[
      "“Mən edirəm, sən təkrarla” oyunları oynayın.",
      "Güzgü qarşısında birlikdə hərəkətlər edin.",
      "Barmaq oyunları və hərəkətli mahnılarla təqlidi gücləndirin."]},

  echoic:{ label:"Səs təkrarı (Echoic)", method:"Echoic təlim — shaping",
    steps:[
      "Sadə səs və hecalarla başlayın (“a”, “ba”, “ma”).",
      "Səsi aydın deyin, uşaqdan təkrarlamasını gözləyin.",
      "Hər təkrarı (yaxınlaşanı belə) mükafatlandırın.",
      "Hecadan sözə, sözdən söz birləşməsinə keçin.",
      "Mand ilə birləşdirin — istədiyi əşyanın adını dedirdin."],
    parent:[
      "Gün ərzində sadə səsləri oyunla təkrarladın.",
      "Uşaq səs çıxaranda dərhal eyni səslə cavab verin.",
      "Mahnı və qafiyələrlə səs təqlidini gücləndirin."]},

  intraverbal:{ label:"İntraverbal (söhbət, cavab)", method:"İntraverbal təlim",
    steps:[
      "Tanış mahnı/ifadələrdə boşluq buraxın (“İki əlimdə ...”).",
      "Sadə suallara cavabı öyrədin (“Adın nədir?”).",
      "Kateqoriya doldurma (“Meyvələri say: alma, ...”).",
      "“Nə / kim / harada” suallarına keçin.",
      "Gündəlik söhbətdə təbii sual-cavab yaradın."],
    parent:[
      "Sevimli mahnıların sözünü yarımçıq qoyub tamamlamasını gözləyin.",
      "Gün ərzində sadə suallar verin, cavabı birlikdə deyin.",
      "“Heyvanları sayaq” kimi kateqoriya oyunları oynayın."]},

  play:{ label:"Müstəqil və simvolik oyun", method:"Oyun bacarıqları — model + NET",
    steps:[
      "Uşağın maraq göstərdiyi oyuncaqları müəyyən edin.",
      "Oyuncağın düzgün istifadəsini model verin.",
      "Müstəqil oyun müddətini tədricən artırın.",
      "Simvolik oyuna keçid edin (kuklanı yedirtmək, maşını sürmək).",
      "Tək oyundan yanaşı, sonra birgə oyuna keçin."],
    parent:[
      "Hər gün 10–15 dəqiqə uşaqla yerdə oyun oynayın.",
      "Müxtəlif oyuncaqlarla necə oynamağı göstərin.",
      "Uşaq tək oynaya bildikdə tərifləyin və müddəti uzadın."]},

  social:{ label:"Sosial qarşılıqlı əlaqə", method:"Sosial bacarıqlar təlimi",
    steps:[
      "Göz kontaktını qısa, oyunla və mükafatla gücləndirin.",
      "Növbə ilə oyunu (“sən – mən”) öyrədin.",
      "Salamlaşma və əl yelləməni model verin.",
      "Birgə diqqəti (eyni əşyaya baxmaq, göstərmək) inkişaf etdirin.",
      "Strukturlu kiçik qrup oyunlarına keçin."],
    parent:[
      "Adını çağırıb baxanda dərhal gülümsəyib mükafatlandırın.",
      "“Topu mənə at, indi sənə” növbə oyunları oynayın.",
      "Salamlaşma və sağollaşmanı hər gün məşq edin."]},

  selfcare:{ label:"Özünə xidmət (gündəlik bacarıq)", method:"Özünə xidmət — zəncirləmə (chaining)",
    steps:[
      "Bacarığı kiçik addımlara bölün (əl yumaq: kranı aç → sabun → ovuşdur → yu → qurula).",
      "Hər addımı ardıcıl öyrədin, köməyi tədricən azaldın.",
      "Vizual addım kartlarından istifadə edin.",
      "Müstəqil tamamlanan addımları dərhal mükafatlandırın.",
      "Tualet, geyinmə, yemək bacarıqlarına genişləndirin."],
    parent:[
      "Gündəlik rejimi (əl yumaq, diş, geyinmə) sabit saxlayın.",
      "Hər addımı şəkilli kartla göstərin.",
      "Uşaq özü etdikdə tərifləyin, tələsməyin."]},

  home:{ label:"Ev bacarıqları", method:"Ev bacarıqları — model + müstəqillik",
    steps:[
      "Sadə ev işlərini seçin (oyuncaq yığmaq, süfrə düzmək).",
      "Addımları model verib birlikdə edin.",
      "Müstəqilliyi tədricən artırın.",
      "Vizual cədvəllə gündəlik işləri təşkil edin."],
    parent:[
      "Uşağı kiçik ev işlərinə cəlb edin (qabları yığmaq).",
      "İşi birlikdə başlayıb tədricən ona buraxın.",
      "Tamamlananda mükafat və tərif verin."]},

  community:{ label:"İcma və təhlükəsizlik", method:"İcma bacarıqları",
    steps:[
      "Təhlükəsizlik qaydalarını (əl tutmaq, dayanmaq) öyrədin.",
      "Mağaza, parka qısa və planlı gəzintilər edin.",
      "Sosial qaydaları (növbə gözləmək) məşq edin.",
      "Tədricən müstəqillik verin."],
    parent:[
      "Çöldə hər zaman “dayan / gözlə” qaydasını məşq edin.",
      "Mağazada uşağa kiçik tapşırıq verin (əşya götürmək).",
      "Təhlükəsiz davranışı dərhal tərifləyin."]},

  academic:{ label:"Akademik öncəsi bacarıqlar", method:"Pre-akademik təlim",
    steps:[
      "Rəng, forma, ölçü uyğunlaşdırma ilə başlayın.",
      "Eyniləri tapma (matching) tapşırıqları verin.",
      "Hərf və rəqəm tanımağa keçid edin.",
      "Çeşidləmə və ardıcıllıq tapşırıqları əlavə edin."],
    parent:[
      "Rəng və formaları gündəlik əşyalarla məşq edin.",
      "Sayma oyunları oynayın (pillələri sayaq).",
      "Məşqləri qısa və oyunlu saxlayın."]},

  motor:{ label:"Motor bacarıqlar", method:"Motor inkişaf",
    steps:[
      "İri motor fəaliyyətləri (qaçmaq, atılmaq, top atmaq).",
      "İncə motor məşqləri (düymə, qələm, kəsmək).",
      "Hərəkəti model verib köməklə azaldın.",
      "Oyunla təkrarlayın."],
    parent:[
      "Hər gün açıq havada hərəkət oyunları (top, qaçış).",
      "Kiçik əzələ üçün plastilin, muncuq düzmə.",
      "Çəkmək və rəngləməyi təşviq edin."]},

  coping:{ label:"Emosional tənzimləmə", method:"Emosional tənzimləmə",
    steps:[
      "Əsas emosiyaları (sevinc, qəzəb, kədər) adlandırmağı öyrədin.",
      "Sakitləşmə üsulları (dərin nəfəs, sakit künc) məşq edin.",
      "Frustrasiya anında uyğun ifadəni (“kömək”, “fasilə”) öyrədin.",
      "Sakit davranışı dərhal mükafatlandırın."],
    parent:[
      "Uşağın hisslərini adlandırın (“Sən hirslisən”).",
      "Sakitləşmə üçün sabit “sakit künc” yaradın.",
      "Sakit qalmağı bacardıqda tərifləyin."]},

  cognition:{ label:"İdrak və əlaqəli öyrənmə", method:"İdrak / relational təlim",
    steps:[
      "Eyni / fərqli anlayışını öyrədin.",
      "Müqayisə (böyük/kiçik, çox/az) məşq edin.",
      "Kateqoriyalaşdırma və əlaqələndirmə tapşırıqları verin.",
      "Sadə perspektiv alma oyunları (başqasının nə gördüyü).",
      "Problem həlli ssenariləri əlavə edin."],
    parent:[
      "“Bu hansına oxşayır?” oyunları oynayın.",
      "Əşyaları qruplara ayırma (meyvə / heyvan) məşq edin.",
      "Sadə tapmacalar və “niyə?” sualları verin."]},

  general:{ label:"Ümumi inkişaf", method:"Fərdiləşdirilmiş təlim",
    steps:[
      "Bacarığı kiçik, ölçülə bilən addımlara bölün.",
      "Hər addımı model verib köməklə öyrədin, sonra azaldın.",
      "Düzgün cavabı dərhal mükafatlandırın.",
      "Müxtəlif mühitlərdə təkrarlayıb ümumiləşdirin."],
    parent:[
      "Hər gün qısa, müsbət məşq vaxtı ayırın.",
      "Uğuru dərhal tərifləyin.",
      "İrəliləyişi gündəlik qeyd edin."]}
};

/* FBA — davranış funksiyasına görə valideyn tapşırıqları */
const ABA_KB_BEHAVIOR = {
  "Diqqət":[
    "Problemli davranışa minimal reaksiya verin; uyğun davranışa dərhal diqqət ayırın.",
    "Gün ərzində planlı, “sərbəst” müsbət diqqət vaxtları yaradın.",
    "Uşağa “mənə bax / mənimlə oyna” demək kimi uyğun yolu öyrədin."],
  "Qaçma":[
    "Tələbi kiçik hissələrə bölün, çətinliyi tədricən artırın.",
    "“Fasilə istəyirəm” demək üçün uyğun yol öyrədin.",
    "Tapşırıq bitəndə fasilə və mükafat verin, davranışla qaçmağa imkan verməyin."],
  "Əşya/Fəaliyyət":[
    "İstədiyini davranışla deyil, uyğun tələblə (“istəyirəm”) almağı öyrədin.",
    "Keçidləri əvvəlcədən xəbər verin, vizual cədvəl işlədin.",
    "Gözləməyi token / “bir az sonra” ilə tədricən öyrədin."],
  "Sensor":[
    "Təhlükəsiz, uyğun sensor alternativ təklif edin (fidget, hərəkət fasiləsi).",
    "Sensor ehtiyacı planlı ödəyin (sensor diet) ki, davranışa ehtiyac qalmasın.",
    "Mühiti tənzimləyin: səs / işıq / izdihamı azaldın."]
};

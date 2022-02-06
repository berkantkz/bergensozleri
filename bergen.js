var request = require('request');
var botApiKey = process.env.BOTAPIKEY;

var songList = ["sen_affetsen", "elimde_fotografin", "benim_icin_uzulme", "insan_dertli_olunca", "ask_kitabı", "seni_kalbimden_kovdum", "kullar_affetmez", "zamani_geldi", "acilarin_kadini", "bulamazsin_benim_gibi_seveni", "birakin_gitsin", "kader_diyemezsin", "onu_da_yak_tanrim", "gecelerden_sor_beni", "eller_aldi", "dertli_dertli", "neden_donmedin", "kul_feryadi", "ayrilik_askimin_cilesi", "sensin_sen", "istemiyorum", "bitirdin_beni", "geleceksen_bugun_gel", "olurdum_ugruna", "ayriligi_anma_sevgilim", "ellerin_mi_oldun"];

lyrics = {
    "0": ["Tanrım kötü kullarını\nSen affetsen ben affetmem", "Ağlatıp da gülenleri\nTerk edip de gidenleri\nSevilip sevmeyenleri\nSen affetsen ben affetmem", "Sevilip sevmeyenleri\nSen affetsen ben affetmem", "Ümidimi kıranları\nBu dünyayı yakanları\nÜmidimi kıranları\nBu dünyayı yakanları\nDar günde bırakanları\nSen affetsen ben affetmem"],
    "1": ["Yaşamayı senle anladım\nSende öğrendim ben sevmeyi", "İnan aşk nedir bilmiyordum\nSende tanıdım bu duyguyu", "Bu şarkımı ben sana yazdım\nSense hala anlayamadın", "Sevgi gibi kutsal kelime\nYalnız senle düştü dilime", "Ölmek yetmez senin uğruna\nSense hala anlayamadın", "Hissetmeyi senle yaşadım\nSende tattım ben bu duyguyu", "Söylemekten hep korkuyordum\nŞimdi dinle bütün aşkımı", "İnan seni çok seviyorum\nSen de beni seviyor musun"],
    "2": ["Gözlerin nemli nemli, başını hiç öne eğme\nAyrılık onur değil ki benim için üzülme", "Bundan sonra adını kırk yılda bir anarım\nSende kaybettiğimi başkasında ararım", "Sevgiyi yaşamaz hiç bağlamak bana düşer\nBir ömür harap oldu ağlamak bana düşer"],
    "3": ["Benim bu hayatımda karlar fırtınalar var\nÇektiklerimi bilse dağlar taşlar hep ağlar", "Kimselere vermesin tanrım böyle çileler\nİnsan dertli olunca hiç bitmezmiş geceler", "Kimse bilsin istemem ağlarken güldüğümü\nBen herkesten gizlerim yaşarken öldüğümü", "Tahammülüm kalmadı bu hayatın kahrına\nTanrım biraz umut ver bu karanlık dünyama"],
    "4": ["Ne olur söyleyin sevenler bana\nAyrılmak kanun mu aşk kitabında", "El ele tutuşup gülmeden daha\nTerk etmek kanun mu aşk kitabında", "Ümitlerim kırıldı gitti\nHayallerim yıkıldı bitti\nKader beni benden etti\nSevdim, sevdim bak ne hale geldim", "Her seven sonunda düşüyor derde\nBu aşk kitabının yazarı ner'de", "Sevdim, sevdim bak ne hale geldim"],
    "5": ["Seni kalbimden kovdum\nBir daha giremezsin\nBeddua ettim sana\nGeriye dönemezsin", "Mutluluk hakkın değil\nSevilip gülemezsin", "Pişman olsan boşuna\nGeriye dönemezsin", "Aşk vermiştim ne yaptın\nAldın yere fırlattın", "İkimizi sen yaktın\nMaziyi silemezsin"],
    "6": ["Gurbette sahipsiz bir yolcu gibi\nGideni götürür yollar affetmez", "Yoluna halılar serilir sanma\nUğrunda ömürler verilir sanma\nDeğerin kıymetin bilinir sanma\nGideni götürür kullar affetmez", "Öyle bir dünya bu vefadan yoksun\nİsterse kainat servetin olsun", "Düştüğün yerlerde sen artık yoksun\nDüşeni götürür yollar affetmez"],
    "7": ["Sevgilim terketmiş haber vermeden\nŞimdi yanlızlığın zamanı geldi", "Ziyan oldu ömürüm bir gün gülmeden\nKadere çatmanın zamanı geldi", "Ben böyle sensiz nasıl yaşarım\nŞimdi ağlamanın zamanı geldi", "Bir çıkar yolum yok, ne yapayım ben?\nŞimdi tam içmenin zamanı geldi", "Yaşamak ızdırap sevilen zalim\nArtık yaşamaya kalmadı halim\nNeyim varsa benim hepsini alın\nBenim için ölmenin zamanı geldi"],
    "8": ["Yıllar yılı dert yolunda\nNe ilk nede sonuncuyum\nKahrediyor hayat beni", "Söylemiyor kimse derman\nÖyle zor ki mutlu olmak\nYüreğinde büyük ferman", "Sevdalardan darbe yedim\nŞu gönlüme sevme dedim\nÖmrü yare kul eyledim", "Çekip gitti sevilenler\nGariplerdi ezilenler\nDünya sizin sevmeyenler"],
    "9": ["Ellere kanıp da, gitme sevgilim\nHayat bu, gün gelir yakarlar seni\nBir de saçlarına karlar yağınca\nEskimiş şal gibi atarlar seni", "Eğer gideceksen mani olmamam\nDüşersen sonunda yine bul beni\nVefasız kullardan vefa bekleme\nKıymetsiz bir pula satarlar seni", "Bulamazsın, bulamazsın benim gibi seveni\nBulamazsın, bulamazsın senin için öleni\nBulamazsın, bulamazsın benim gibi seveni\nBulamazsın, bulamazsın senin için öleni", "Sevgilim dünyanın kanunu böyle\nSevip, mutlu olan var mıdır söyle\nSeni benim kadar kimse sevemez\nMutlu olmazsın başka biriyle"],
    "10": ["Söyleyin ne verdi dertlerden başka?\nİstemem gelmesin aşkımız bitsin\nOnunla küstüm ben hayata aşka\nBırakın, bırakın, bırakın gitsin", "Bir kere insanın şansı gülecek\nSevgili dediğin kıymet bilecek\nBu dünya o yokken elbet dönecek\nBırakın, bırakın, bırakın gitsin", "Sevilmek çok ona, sevip de görsün\nKapansın kapılar geriye dönsün\nOnun da gün gelip umudu sönsün\nBırakın, bırakın, bırakın gitsin"],
    "11": ["Kader diyemezsin, sen kendin ettin\nAşkıma sevgime ihanet ettin\nYalvarışın çok geç, beni kaybettin\nDönme artık, seni ben de terk ettim", "Hani mutluluktu bu aşkın sonu\nHani sevecektik bir ömür boyu\nNasıl yaptın zalim sen bana bunu\nKader diyemezsin, sen kendin ettin", "Şimdi gözlerimde boş bir anısın\nSen gerçek aşkımın sahte yanısın\nSana değil tanrım bana acısın\nBu kötü günlere sen sebep oldun"],
    "12": ["Ben böyle perişan, böyle dertliyken\nOnun gururuna gülüşüne bak\nBu aşkın suçlusu yanlız ben miyim\nOnu da yak tanrım, ateşlerde yak", "Ben nasıl çektiysem, ona da çektir\nBen gibi onu da canından bezdir\nÖğrensin sevmenin bedeli nedir\nOnu da yak tanrım, ateşlerde yak", "Sanki ben sevdiysem, o sevmedi mi\nYeminler ettiysem, o etmedi mi\nO ,hiç bir cezayı hak etmedi mi\nOnu da yak tanrım, ateşlerde yak"],
    "13": ["Dertli miyim, dertsiz miyim\nGarip miyim, öksüz müyüm\nBir ölüden farksız mıyım\nGecelerden sor beni", "Hiç kimseden sorma beni\nŞimdi ben divane deli", "Senin için içtiğimi\nKadehlerden sor beni", "Her gün yalnız olduğumu\nSaçlarımı yolduğumu\nSeni nasıl sorduğumu\nAşıklardan sor beni"],
    "14": ["Eller aldı, eller aldı\nSevdiğimi eller aldı\nMutlu süren yaşantımı\nGözümdeki seller aldı", "Yüzün gülse kalbin ah çekip ağlıyor\nHer zaman dünyamı başıma yıkıyor", "Bıktım artık, bıktım artık\nBu hayattan yaşamaktan\nEller gibi mesud olup\nKurtulamam ağlamaktan"],
    "15": ["Görüyorsun tanrım beni\nDeğiştir bu kaderimi\nAçtım sana ellerimi\nYalvarırım dertli dertli", "Bu canımın sahibisin\nSığınacak gücüm sensin\nDerman bana senden gelsin\nBekliyorum dertli dertli", "Ezdiler hep taş misali\nGözlerimde çile seli\nYaşadığım ner'den belli\nGecem dertli günüm dertli", "Dertlerimle yalnız kaldım\nBir çıkar yol bulamadım\nÇilelere adım adım\nYürüyorum dertli dertli", "Özlediğim güneş doğsun\nYa Rabb'im tek umudumsun\nDualarım kabul olsun\nYaşanmıyor dertli dertli"],
    "16": ["Madem dönüyorsa başımda dünya,\nGün gelip sevdiğim neden dönmesin", "Göçmen kuşlar bile gidip dönüyor,\nGün gelip sevdiğim neden dönmesin.", "Hatıralarım var avunmak için,\nEcelden kendimi korumak için,\nHep dualar ettim kavuşmak için,\nGün gelip sevdiğim neden dönmesin", "Beklerim isterse dönmez desinler,\nYeterki bu ümit bir gün sönmesin,\nHer gidişin birde dönüşü varsa,\nGün gelip sevdiğim neden dönmesin"],
    "17": ["Ümitle sen bekle sonra terkedil\nEn güzel çağında kadere yenil\nBuna da yaşamak, hayat mı denir?", "Seven sevdiğinden ayrılık aldı\nMazinin acısı gönülde kaldı\nAnlıma yazılmış yazıya daldı", "Buna da yaşamak, hayat mı denir?", "Dünyanın azabı içinde kaldık\nSevenler unutmuş, sevmiyor artık\nGönüller dolusu aşklara yazık", "Gönüller dolusu aşklara yazık"],
    "18": ["Sabırla bekledim uzun yılları\nGizledim içimde bütün sırları", "Kaderim kapattı artık yolları\nAyrılık aşkımın çilesi oldu", "Bırakıp da gidecek sanki ne vardı\nAruzlarım içimde hep yarım kaldı\nSevdiğimi elimden ayrılık aldı", "Kalbime uzaktan esen yel misin?\nAşkına susadım geldim der misin?\nGözümden dökülen akan sen misin?"],
    "19": ["Kurduğum hayallerin\nYemyeşil ümitlerin\nBütün renkli düşlerin\nBaşlangıcı sensin sen", "Kışlarımı yaz yapan\nBana aşkı tanıtan\nMutluluktan ağlatan\nTek sevgilim sensin sen", "Görmezsem üzüldüğüm\nGörünce sevindiğim\nSeverek övündüğüm\nTek sevgilim sensin sen"],
    "20": ["Yaşamak sadece nefes almaksa\nAciz bir bedende can taşımaska\nEninde sonunda toprak olmaksa\nBen böyle yaşamak istemiyorum", "Verdiğin gibi al tanrım bu canı\nAçtım ellerimi, yalvarıyorum\nEğer buysa sevmek, buysa yaşamak\nBen böyle yaşamak istemiyorum", "Çok sevmek, kahrolmak acı çekmekse\nİnanmak, aldanmak hata demekse\nYaşamak kadere boyun eğmekse\nBen böyle yaşamak istemiyorum"],
    "21": ["Mutlu bir günümde rastladım sana\nYemeden içmeden kestin sen beni", "Bir baktın bir daha bakmadın bana\nGönül ağacına astın sen beni", "Dünyaya sığmazdım, neşem bitmezdi\nAşkın hücresine kitledin beni", "Ararım şimdi ben geçen günleri\nYedin tüm ömrümü, bitirdin beni", "Kuşlar gibi özgür, hayat doluydum\nYanan bir alevdim söndürdün beni", "Kusurum yanlızca seni sevmekti\nBir kaş çatışınla öldürdün beni"],
    "22": ["Geleceksen bugün gel\nYarın belki geç olur\nBakarsın gelir ecel\nBelli mi olur", "Seveceksen bugün sev\nSonra sevmek güç olur", "Bir gönüle girmemek\nVallahi günah olur\nBillahi günah olur\nBu dünyada sevmemek\nVallahi günah olur\nBir güzeli sevmemek\nMahşer günü suç olur", "Seni benden daha çok seven mi bulacaksın?\nSevmediğin biriyle mutlu mu olacaksın?", "Gül gibi solacaksın\nPişman olup başını taşlara vuracaksın"],
    "23": ["Aşkıma bir ümit verseydin eğer\nÖlürdüm uğrunda, ölürdüm inan", "Sen beni ben gibi sevseydin eğer\nÖlürdüm uğrunda, ölürdüm inan", "Dilimde bir dua olabilseydin\nGözümden yaş olup akabilseydin\nKalbimde aşkını bulabilseydim\nÖlürdüm uğrunda, ölürdüm inan", "Bir özlem olsaydın dudaklarımda\nBir ateş olsaydın avuçlarımda\nSon arzum olsaydın bakışlarımda\nÖlürdüm uğrunda, ölürdüm inan"],
    "24": ["Sensiz hayatımda mesut olamam,\nGönül yarasına çare bulamam,\nYıllar geçse inan sana kıyamam,\nSakın ayrılığı anma sevgilim", "İnsan ayrılıktan çok çabuk bıkar,\nGördüğüm rüyalar hep kötü çıkar,\nGözyaşların benim dünyamı yıkar,\nSakın ayrılığı anma sevgilim", "Aşkın acısını çekmeyen bilmez,\nSensiz hayat benim içime sinmez,\nBugünler bir daha geriye gelmez"],
    "25": ["Gözlerime bakan gözlerin\nRuhumu okşayan sözlerin\nSımsıcak ısıtan nefesin\nEllerin mi oldu sevgilim?", "Ne zaman mazimi sorsan\nNe zaman hayale dalsam\nNe zaman resmine baksam\nİnliyor gönlüm ne zaman seni ansam", "Aşkı hiçe sayan ben miyim?\nSevmiyorsun diye dertliyim\nSöyle bana güzel sevgilim\nSeverken ayrılan ben miyim?", "Sen aşkı hiç bilemezsin\nGözyaşımı silemezsin\nMutluluğu göremezsin\nNe kadar sevsen\nSen beni sevemezsin"]
}

var song = lyrics[Math.floor(Math.random() * songList.length)];
var lyric = song[Math.floor(Math.random() * song.length)];

var uri = "https://api.telegram.org/" + botApiKey + "/sendMessage?chat_id=@bergensozleri&parse_mode=markdown&text=" + "" + lyric + "";

request(encodeURI(uri), function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});
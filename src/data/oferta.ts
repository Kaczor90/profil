// Offer content. Product images are referenced as /img/produkty/<source file name>.webp –
// scripts/images.mjs generates them from _tresci/obrazy.
export interface Product {
  name: string;
  image?: string;
  /** 'contain' for packshots on white background; photos fill the box by default */
  fit?: 'cover' | 'contain';
  description?: string;
  bullets?: string[];
  specs?: string[];
}

export interface Group {
  name: string;
  id?: string;
  logo?: string;
  description?: string[];
  bullets?: string[];
  links?: { label: string; href: string }[];
  products?: Product[];
  gallery?: string[];
  galleryFit?: 'cover' | 'contain';
}

export interface Category {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image?: string;
  imageFit?: 'cover' | 'contain';
  seoDescription: string;
  features?: string[];
  groups: Group[];
}

const img = (name: string) => `/img/produkty/${name}.webp`;
const logo = (name: string) => `/img/partnerzy/${name}.png`;

export const groupId = (g: Group) =>
  g.id ??
  g.name
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const categories: Category[] = [
  {
    slug: 'okna',
    title: 'Okna',
    short: 'Okna PVC, drewniane i aluminiowe oraz drzwi tarasowe Drutex. Energooszczędne, ciche i bezpieczne.',
    intro:
      'Okna PVC, drewniane i aluminiowe oraz systemy tarasowe od Drutex – największego producenta stolarki otworowej z PVC w Europie. Wszystkie okna mają w standardzie obwiedniowe okucia MACO.',
    image: img('psk__iglo_light_baner'),
    seoDescription:
      'Okna PVC, drewniane i aluminiowe Drutex z montażem w Płocku. Iglo 5, Iglo Energy, Softline, MB-70, drzwi tarasowe HS i PSK. Bezpłatna wycena i pomiar.',
    features: [
      'Okna PVC, drewniane i aluminiowe w jednym miejscu',
      'Okucia MACO z zaczepami antywyważeniowymi w standardzie',
      'Do 43 kolorów oklein oraz pełna paleta RAL',
      'Pakiety szybowe nawet do Ug = 0,3 W/(m²K)',
    ],
    groups: [
      {
        name: 'Okna PVC',
        logo: logo('drutex'),
        description: [
          'Energooszczędne okna z wielokomorowych profili klasy A, wykonanych wyłącznie z materiału pierwotnego. Uszczelki EPDM, ciepłe ramki i szeroki wybór szyb – akustycznych, bezpiecznych, antywłamaniowych czy przeciwsłonecznych.',
        ],
        links: [{ label: 'Strona producenta', href: 'https://www.drutex.pl/' }],
        products: [
          {
            name: 'Iglo 5',
            image: img('sypialnia_iglo_5'),
            description: 'Bardzo dobra izolacyjność termiczna w atrakcyjnej cenie – sprawdzony wybór do domu i mieszkania.',
            specs: ['70 mm', '5 komór', 'Ug do 0,6', '43 kolory'],
          },
          {
            name: 'Iglo 5 Classic',
            image: img('szwecja_onrskoldsvik_01'),
            description: 'Parametry Iglo 5 z możliwością wykonania w technologii cienkiego zgrzewu V-Perfect dla idealnie równych naroży.',
            specs: ['70 mm', '5 komór', 'Ug do 0,6', 'V-Perfect'],
          },
          {
            name: 'Iglo Light',
            image: img('iglo_light_hq_salon'),
            description: 'Smukłe, zaokrąglone profile i wąski słupek z klamką środkową – więcej światła dziennego niż w standardowych systemach.',
            specs: ['70 mm', '5 komór', 'Ug do 0,6', '43 kolory'],
          },
          {
            name: 'Iglo Energy',
            image: img('iglo_energy'),
            description: 'Siedmiokomorowy profil i potrójne uszczelnienie – dla wymagających, z myślą o niższych rachunkach za ogrzewanie.',
            specs: ['82 mm', '7 komór', 'Ug do 0,3', 'RC2'],
          },
          {
            name: 'Iglo Energy Classic',
            image: img('rolety-drutex-z-moskitiera-fhd'),
            description: 'Wysoka energooszczędność i bardzo dobra dźwiękoszczelność, także w wykonaniu V-Perfect.',
            specs: ['82 mm', '7 komór', 'Ug do 0,3', 'V-Perfect'],
          },
        ],
      },
      {
        name: 'Okna drewniane',
        logo: logo('drutex'),
        description: [
          'Klasyczna elegancja naturalnego drewna. Ekologiczne lakiery wodne, aluminiowa listwa chroniąca przed UV i wodą oraz bogata paleta farb kryjących i transparentnych.',
        ],
        products: [
          {
            name: 'Softline 68 / 78 / 88',
            image: img('baner-softline'),
            description: 'Profile z kantówki litej: sosna, meranti 450+ lub modrzew. Wersje 78 i 88 mm mają dodatkowe uszczelnienie wewnętrzne.',
            specs: ['68–88 mm', '3 gatunki drewna', 'Ug do 0,3'],
          },
        ],
      },
      {
        name: 'Okna aluminiowe',
        logo: logo('drutex'),
        description: ['Trwałe, smukłe konstrukcje aluminiowe do zabudowy wewnętrznej i zewnętrznej, w dowolnym kolorze z palety RAL.'],
        products: [
          {
            name: 'MB-70',
            image: img('okno-aluminiowe-mb-70hi'),
            description: 'Okna do domów i fasad z przekładką termiczną z poliamidu. Pakiety szybowe do 50 mm.',
            specs: ['70 mm', '3 komory', 'Ug do 0,3'],
          },
          {
            name: 'MB-45',
            image: img('alu-baner'),
            description: 'System do zabudowy wewnętrznej z efektem jednej płaszczyzny. Profile można giąć, tworząc konstrukcje łukowe.',
            specs: ['45 mm', 'paleta RAL', 'szyby do 24 mm'],
          },
        ],
      },
      {
        name: 'Systemy tarasowe',
        logo: logo('drutex'),
        description: ['Duże przeszklenia, które otwierają dom na ogród i taras – z wygodną obsługą i niskim progiem.'],
        products: [
          {
            name: 'Drzwi podnoszono-przesuwne Iglo HS',
            image: img('hs-baner_zCUocqy'),
            description: 'Skrzydła do 400 kg, niski próg aluminiowy, który można ukryć w posadzce, i opcjonalny napęd automatyczny.',
            specs: ['skrzydło do 400 kg', 'Ug do 0,3'],
          },
          {
            name: 'Uchylno-przesuwne Iglo Light PSK',
            image: img('psk__iglo_light_baner'),
            description: 'Duża powierzchnia szklenia i wąski słupek z klamką środkową. Cztery zaczepy antywyważeniowe w standardzie.',
            specs: ['70 mm', 'Ug do 0,7'],
          },
          {
            name: 'Harmonijkowe MB-86 Fold Line',
            image: img('harmonijka-mb-86_www_header'),
            description: 'Aluminiowe drzwi składane do tarasów, balkonów i ogrodów zimowych – otwierane do środka lub na zewnątrz.',
            specs: ['86 mm', 'Ug do 0,5', 'paleta RAL'],
          },
        ],
      },
    ],
  },

  {
    slug: 'okna-dachowe',
    title: 'Okna dachowe',
    short: 'Okna dachowe Velux i Fakro z kołnierzami i akcesoriami – do poddaszy użytkowych i nieużytkowych.',
    intro:
      'Doświetl poddasze. Pomożemy dobrać okno dachowe do kąta nachylenia dachu i pokrycia, a także sposób otwierania, szybę i akcesoria – kołnierz, roletę czy moskitierę – i fachowo je zamontujemy.',
    image: img('roleta-materialowa-7big'),
    seoDescription: 'Okna dachowe Velux i Fakro z montażem w Płocku. Dobór okna, kołnierza i rolet. Bezpłatna wycena.',
    features: [
      'Dobór okna do dachu i pokrycia',
      'Kołnierze uszczelniające',
      'Rolety, żaluzje i moskitiery do okien dachowych',
      'Montaż przez doświadczoną ekipę',
    ],
    groups: [
      {
        name: 'Velux',
        logo: logo('velux'),
        description: [
          'Jedna z najbardziej rozpoznawalnych marek okien dachowych. Okna obrotowe i klapowo-obrotowe, wyłazy dachowe oraz pełna gama osłon i sterowania.',
        ],
        links: [{ label: 'Strona producenta', href: 'https://www.velux.pl/' }],
      },
      {
        name: 'Fakro',
        logo: logo('fakro'),
        description: [
          'Polski producent okien dachowych i schodów strychowych. Szeroki wybór okien do poddaszy użytkowych, wyłazów oraz akcesoriów.',
        ],
        links: [{ label: 'Strona producenta', href: 'https://www.fakro.pl/' }],
      },
      {
        name: 'Rolety do okien dachowych',
        description: [
          'Do okien dachowych dobierzemy rolety SKYLUX z samohamującym mechanizmem i prowadnicami bocznymi, które ograniczają przenikanie światła. Działają płynnie także przy uchylonym oknie.',
        ],
        links: [{ label: 'Zobacz rolety wewnętrzne', href: '/oslony-wewnetrzne/' }],
      },
    ],
  },

  {
    slug: 'drzwi-zewnetrzne',
    title: 'Drzwi zewnętrzne',
    short: 'Stalowe, PVC i drewniane drzwi wejściowe od KMT, Wikęd i Drutex. Bezpieczne, ciepłe i estetyczne.',
    intro:
      'Drzwi wejściowe do domów jednorodzinnych, mieszkań i budynków użyteczności publicznej. Łączą efektowny wygląd z bezpieczeństwem, dobrą izolacją i trwałością na lata.',
    image: img('drzwi_iglo_5_hq_www'),
    seoDescription: 'Drzwi zewnętrzne stalowe, PVC i drewniane z montażem w Płocku – KMT, Wikęd, Drutex. Bezpłatny pomiar i wycena.',
    features: ['Drzwi stalowe, PVC i drewniane', 'Wiele wzorów, przeszkleń i kolorów', 'Okucia i zamki podnoszące bezpieczeństwo', 'Niski próg z przegrodą termiczną'],
    groups: [
      {
        name: 'Drzwi stalowe KMT i Wikęd',
        logo: logo('wiked'),
        description: [
          'Nowoczesne drzwi o niebanalnym designie, wykonane z wysokiej jakości materiałów – świetne na drzwi wejściowe do każdego budynku. Dostępne w różnych wersjach i kolorach.',
        ],
        links: [
          { label: 'Strona KMT', href: 'https://www.kmt.com.pl/' },
          { label: 'Strona Wikęd', href: 'https://wiked.pl/' },
        ],
        gallery: Array.from({ length: 12 }, (_, i) => img(`drzwi_zew_Strona_${String(i + 1).padStart(2, '0')}`)),
        galleryFit: 'contain',
      },
      {
        name: 'Drzwi PVC i drewniane Drutex',
        logo: logo('drutex'),
        products: [
          {
            name: 'Drzwi PVC Iglo 5',
            image: img('drzwi_iglo_5_hq_www'),
            description: 'Zaokrąglone linie profilu, dobra izolacyjność termiczna i akustyczna, bogata gama oklein Renolit i wypełnień.',
            specs: ['70 mm', 'zasuwnica MACO', 'niski próg'],
          },
          {
            name: 'Drzwi drewniane Softline',
            image: img('drzwi_softline_68_dworek'),
            description: 'Naturalne piękno drewna: sosna, meranti 450+ lub modrzew, lakiery wodne i trzypunktowa zasuwnica hakowa.',
            specs: ['68 mm', '3 gatunki drewna', 'Ug do 0,8'],
          },
        ],
      },
    ],
  },

  {
    slug: 'drzwi-wewnetrzne',
    title: 'Drzwi wewnętrzne',
    short: 'Drzwi wewnętrzne DRE, Pol-Skone, Porta, Erkado i innych. Setki wzorów, kolorów i przeszkleń.',
    intro:
      'Drzwi do domów, mieszkań i biur od czołowych polskich producentów. Pomożemy dobrać model, kolor, ościeżnicę i klamkę – i zamontujemy wszystko na miejscu.',
    image: img('RIVIA_TOP_10_biala_mat_orzech_amerykanski'),
    seoDescription:
      'Drzwi wewnętrzne DRE, Pol-Skone, Porta, Erkado, Asilo, Intenso i Barański z montażem w Płocku. Doradztwo, pomiar, bezpłatna wycena.',
    groups: [
      {
        name: 'DRE',
        logo: logo('dre'),
        description: [
          'Jeden z czołowych producentów drzwi w Polsce, na rynku od 1991 roku. Współpracujemy z DRE od lat – ich drzwi niezmiennie cieszą się dużym zainteresowaniem naszych klientów.',
        ],
        bullets: ['drzwi płytowe – z przeszkleniem lub bez', 'drzwi TOP o klasycznej elegancji', 'nowoczesne drzwi ramowe', 'drzwi techniczne i szklane', 'systemy przesuwne – naścienny i chowany w ścianę'],
        links: [{ label: 'Strona producenta', href: 'https://www.dre.pl/' }],
        gallery: [
          'Arte_B_TOP_30_jesion',
          'CARLA_TOP_40_biala_mat',
          'RIVIA_TOP_10_biala_mat_heban',
          'TRIESTA_wenge_ryfla',
          'VETRO_D_heban',
          'VETRO_F_orzech_ciemny_ryfla',
          'aldea_top',
          'Galeria-TOP-ALU-pink',
        ].map(img),
      },
      {
        name: 'Pol-Skone',
        logo: logo('pol-skone'),
        description: [
          'Producent drzwi i okien drewnianych działający od 1990 roku, wytwarzający wyroby z drewna z polskich lasów. Drzwi malowane, okleinowane, laminowane i fornirowane, a także drzwi techniczne.',
        ],
        links: [{ label: 'Strona producenta', href: 'https://www.pol-skone.pl/' }],
        gallery: ['143616993747d773', '1436169925a93fbb', '143616990949b34e', '14361698987deedd', '14361698343cb4bd', '143616962447be1a', '143616994904d8ea', '143616986877be74'].map(img),
      },
      {
        name: 'Porta',
        logo: logo('porta'),
        description: [
          'Marka znana każdemu, kto urządza mieszkanie. Modele projektowane zgodnie z aktualnymi trendami, z certyfikatami Instytutu Techniki Budowlanej, w atrakcyjnych cenach.',
        ],
        links: [{ label: 'Strona producenta', href: 'https://www.porta.com.pl/' }],
        gallery: [
          '9276fb5ce9a298dfec42da3ea3888daf',
          '8e87b995a76d6b36c7e46faeba651e9e',
          '611788eec1ad70df4c21f3b296a1e21a',
          '2d0df4516b752237307df68a74f9bb58',
          '8b1e25d763d1aa24a244f18d238d59f8',
          '83b77c54247a5cc971c49aa9f72797f6',
          '4a1a824fd813e880e2231d5b9c7bc3f6',
          '91db0ea3bdfc9686b40359856fc59980',
        ].map(img),
      },
      {
        name: 'Erkado',
        logo: logo('erkado'),
        description: ['Rodzinna firma, która z sukcesem rozwija się na rynku globalnym. Nowe kolekcje, wysoka jakość i rozsądne ceny.'],
        links: [{ label: 'Strona producenta', href: 'https://erkado.pl/' }],
        gallery: ['graf-11-decormat-grafit-1', 'kamelia-1-jesion-grafit-premium', 'kamelia-1-bialy-greko-sp1n-1', 'uno-premium-jesion-grafit-premium-1', 'fragi-3-wenge-greko-1', 'floks-1-wenge-greko-1'].map(img),
      },
      {
        name: 'Asilo',
        description: [
          'Fornirowane drzwi wewnętrzne w systemie bezprzylgowym – z ukrytymi zawiasami i cichymi zamkami magnetycznymi. Wyglądają jak drzwi z litego drewna.',
        ],
        links: [{ label: 'Strona producenta', href: 'https://asilo.pl/' }],
        gallery: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'].map(img),
      },
      {
        name: 'Intenso Doors',
        description: [
          'Drzwi wewnętrzne produkowane od 2006 roku na ramie z klejonki drzew iglastych. Głównie nowoczesne wzory, ale też kilka klasycznych modeli – w szerokim zakresie cen.',
        ],
        links: [{ label: 'Strona producenta', href: 'https://www.intenso-doors.pl/' }],
        gallery: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'].map(img),
      },
      {
        name: 'Barański',
        description: [
          'Rodzinna firma z ponad 30-letnim doświadczeniem. Drewniane drzwi wewnętrzne, klatkowe i przeciwpożarowe (EI30, EI60), a także energooszczędne drzwi zewnętrzne o grubości do 105 mm (U = 0,54). Wykonuje też drzwi nietypowe według projektu.',
        ],
        links: [{ label: 'Strona producenta', href: 'https://www.baranskidrzwi.pl/' }],
        gallery: ['01', '02', '03', '04', '05', '06', '07'].map(img),
      },
    ],
  },

  {
    slug: 'bramy-garazowe',
    title: 'Bramy garażowe',
    short: 'Bramy segmentowe, roletowe, uchylne i rozwierne Wiśniowski – do domu i do obiektów przemysłowych.',
    intro:
      'Bramy garażowe marki Wiśniowski do garaży przydomowych i hal. Doradzimy rodzaj bramy i napęd, zmierzymy otwór i zamontujemy bramę.',
    image: img('grupa-bramy-unitherm'),
    imageFit: 'contain',
    seoDescription: 'Bramy garażowe Wiśniowski z montażem w Płocku: segmentowe PRIME, UniTherm, UniPro, roletowe, uchylne, rozwierne i przemysłowe.',
    features: ['Bramy segmentowe, roletowe, uchylne i rozwierne', 'Napędy i automatyka', 'Bramy przemysłowe MakroPro', 'Pomiar i montaż'],
    groups: [
      {
        name: 'Bramy do garaży przydomowych',
        id: 'bramy-garazowe',
        logo: logo('wisniowski'),
        links: [{ label: 'Strona producenta', href: 'https://www.wisniowski.pl/' }],
        products: [
          {
            name: 'Brama segmentowa PRIME',
            image: img('grupa-bramy-prime'),
            fit: 'contain',
            description: 'Brama nowej generacji – równowaga między nowoczesną techniką, jakością, bezpieczeństwem i designem.',
          },
          {
            name: 'Brama segmentowa UniTherm',
            image: img('grupa-bramy-unitherm'),
            fit: 'contain',
            description: 'Spełnia rygorystyczne normy odporności na wiatr, wodoszczelności i przepuszczalności powietrza – zachowuje parametry i wygląd przez lata.',
          },
          {
            name: 'Brama segmentowa UniPro',
            description: 'Najbardziej komfortowe rozwiązanie – ciepła brama przeznaczona szczególnie do garaży ogrzewanych.',
          },
          {
            name: 'Brama roletowa',
            image: img('grupa-bramy-roletowe'),
            fit: 'contain',
            description: 'Kurtyna nawija się na wał w skrzynce, oszczędzając miejsce pod sufitem. Napęd w standardzie.',
          },
          {
            name: 'Brama uchylna',
            image: img('grupa-bramy-uchylne'),
            fit: 'contain',
            description: 'Jedna z najpopularniejszych bram – prosta konstrukcja i sprawdzone rozwiązania mechaniczne.',
          },
          {
            name: 'Brama rozwierna',
            image: img('grupa-bramy-rozwierne'),
            fit: 'contain',
            description: 'Najbardziej ekonomiczne zamknięcie garażu – proste rozwiązania i niezawodna praca.',
          },
        ],
      },
      {
        name: 'Bramy przemysłowe',
        logo: logo('wisniowski'),
        description: ['Segmentowe bramy MakroPro do hal, magazynów i warsztatów – w wersji ręcznej lub automatycznej.'],
        products: [
          {
            name: 'MakroPro – segmenty stalowe',
            image: img('wisniowski-makropro20-stal'),
            fit: 'contain',
            bullets: [
              'panele 40 lub 60 mm wypełnione pianką poliuretanową',
              'uszczelnienie na całym obwodzie',
              'zabezpieczenie przed przytrzaśnięciem palców',
            ],
          },
          {
            name: 'MakroPro – segmenty przeszklone',
            description: 'Aluminiowe segmenty przeszklone ze szprosami lub w wersji VISUAL bez szprosów – doświetlają wnętrze hali.',
          },
        ],
      },
    ],
  },

  {
    slug: 'oslony-zewnetrzne',
    title: 'Rolety zewnętrzne',
    short: 'Rolety zewnętrzne, żaluzje fasadowe i markizy. Ochrona przed słońcem, hałasem i włamaniem.',
    intro:
      'Rolety zewnętrzne, żaluzje fasadowe i markizy chronią przed słońcem, hałasem i niepożądanymi gośćmi, a zimą pomagają zatrzymać ciepło. Dobierzemy system do nowego domu i do budynku po remoncie.',
    image: img('Integro-1'),
    seoDescription: 'Rolety zewnętrzne, żaluzje fasadowe C80 i Z90 oraz markizy z montażem w Płocku. Napęd ręczny lub elektryczny.',
    features: ['Izolacja termiczna i akustyczna', 'Prywatność i ochrona przed włamaniem', 'Napęd ręczny lub elektryczny', 'Kolory dopasowane do elewacji'],
    groups: [
      {
        name: 'Rolety zewnętrzne',
        description: ['Trwałe i odporne na warunki atmosferyczne, w szerokiej gamie kolorów, z nowoczesnymi mechanizmami sterowania.'],
        products: [
          {
            name: 'Rolety podtynkowe SP-E',
            image: img('Integro-2'),
            description: 'Po otynkowaniu skrzynka jest niewidoczna. Do nowych domów i modernizacji, także z siatką przeciw owadom.',
          },
          {
            name: 'Rolety natynkowe SK45° i OWAL',
            image: img('Sk45-1'),
            description: 'Do istniejących budynków – aluminiowa skrzynka na ścianie lub we wnęce, ścięta pod kątem 45° albo zaokrąglona.',
          },
          {
            name: 'Rolety nadstawne FART REVO',
            image: img('rolety-zew-fart-revo-1'),
            fit: 'contain',
            description: 'Montowane na oknie, ze skrzynką 240×165 lub 240×205 mm i opcją zintegrowanej moskitiery.',
          },
          {
            name: 'Rolety BECLEVER',
            image: img('BeClever-1'),
            description: 'Dobra izolacja akustyczna i termiczna, dyskrecja dla domowników i kolory dopasowane do elewacji.',
          },
        ],
      },
      {
        name: 'Żaluzje fasadowe',
        description: [
          'Zatrzymują 60–100% promieni słonecznych jeszcze przed szybą. Ograniczają nagrzewanie wnętrz i potrzebę używania klimatyzacji, pozwalając sterować światłem w pomieszczeniu.',
        ],
        products: [
          {
            name: 'Żaluzje fasadowe C80',
            image: img('zaluzje-fasadowe-c80-1'),
            fit: 'contain',
            description: 'Lamele w kształcie litery C, napęd ręczny lub elektryczny, sterowanie grupowe.',
            specs: ['szer. do 4,5 m', 'wys. do 5 m'],
          },
          {
            name: 'Żaluzje fasadowe Z90',
            image: img('zaluzje-fasadowe-z90-1'),
            fit: 'contain',
            description: 'Lamele Z z profilem wyciszającym i możliwością całkowitego zaciemnienia.',
            specs: ['szer. do 4,5 m', 'wys. do 4,5 m'],
          },
        ],
      },
      {
        name: 'Markizy',
        products: [
          {
            name: 'Markizy tarasowe i balkonowe',
            image: img('markiza-australia-1'),
            fit: 'contain',
            description:
              'Chronią przed słońcem i deszczem. Wytrzymała stalowa belka z ramionami, konstrukcja malowana proszkowo na kolor RAL, tkaniny w wielu kolorach.',
          },
        ],
      },
    ],
  },

  {
    slug: 'oslony-wewnetrzne',
    title: 'Rolety, żaluzje i moskitiery',
    short: 'Rolety materiałowe, dzień-noc, żaluzje, plisy i moskitiery – szyte na wymiar do każdego okna.',
    intro:
      'Osłony wewnętrzne zapewniają prywatność w nocy, chronią przed słońcem w dzień i podkreślają charakter wnętrza. Wykonujemy je na wymiar – także do okien dachowych i nietypowych.',
    image: img('roleta-materialowa-6big'),
    seoDescription: 'Rolety materiałowe, dzień-noc, żaluzje drewniane i aluminiowe, plisy, verticale i moskitiery na wymiar w Płocku.',
    groups: [
      {
        name: 'Rolety',
        products: [
          { name: 'Rolety dzień i noc', image: img('image1'), description: 'Pasy tkaniny pozwalają regulować ilość światła bez podnoszenia rolety. W kasecie lub wolnowiszące.' },
          {
            name: 'Rolety materiałowe wolnowiszące',
            image: img('roletki-mat-wolnowiszace-7'),
            description: 'Estetyczne zaciemnienie wnętrz i ogromny wybór tkanin.',
            specs: ['do 340 cm szer.'],
          },
          { name: 'Roletki GRACJA', image: img('image1-1-e1564491503184'), description: 'Montowane do listew przyszybowych, z mechanizmem samoblokującym – także do nietypowych listew.' },
          { name: 'Roletki VEGAS Mini', image: img('mini2'), description: 'Ekonomiczna roleta montowana do skrzydła, także na bezinwazyjne blaszki.' },
          { name: 'Rolety dachowe SKYLUX', image: img('roleta-materialowa-7big'), description: 'Do większości okien dachowych. Prowadnice boczne i płaska kaseta ograniczają przenikanie światła.' },
          { name: 'Rolety rzymskie', image: img('zaslona-zymska-2'), description: 'Eleganckie fałdy tkaniny; w systemie RVS montowane w świetle szyby, bez utrudniania otwierania okna.' },
          { name: 'Panel Track', image: img('panel-track-1'), description: 'Przesuwne panele do dużych przeszkleń i przedzielania pomieszczeń. Szyna 2–5 torów.' },
        ],
      },
      {
        name: 'Żaluzje i plisy',
        products: [
          { name: 'Żaluzje drewniane i aluminiowe', image: img('zaluzje-drewniane-5big'), description: 'Naturalne drewno (27 i 50 mm) lub aluminium (16 i 25 mm) w szerokiej gamie kolorów.' },
          { name: 'Żaluzje pionowe VERTICALE', image: img('zaluzje-pionowe-5big'), description: 'Praktyczne do domów, biur i hoteli. Tkaniny z atestami lub lamele PCV.', specs: ['89 i 127 mm'] },
          {
            name: 'Żaluzje plisowane',
            image: img('zaluzje-plisowane-1big'),
            description: 'Zasłaniają dowolny fragment okna – od góry i od dołu. Pasują też do okien trapezowych, trójkątnych i półokrągłych.',
          },
        ],
      },
      {
        name: 'Moskitiery',
        description: [
          'Aluminiowe ramki odporne na warunki atmosferyczne, w różnych kolorach. Nie ograniczają widoczności i nie przeszkadzają w pracy rolet. Dopasujemy je do każdego okna i drzwi.',
        ],
        products: [
          { name: 'Moskitiera ramkowa', image: img('moskitiery-1big'), description: 'Montowana na bezinwazyjnych uchwytach – do okien otwieranych głównie w celu wietrzenia.' },
          { name: 'Moskitiera rolowana', image: img('2019-06_moskitiery-3big'), description: 'Pionowa lub pozioma, do okien i drzwi balkonowych, z płynnym nawijaniem siatki w kasecie.' },
          { name: 'Moskitiera drzwiowa otwierana', image: img('2019-06_moskitiery-4big'), description: 'Na zawiasach, z magnesami, uszczelką szczotkową i samozamykaczem.' },
          { name: 'Moskitiera przesuwna', image: img('moskitiery-6big'), description: 'Do dużych przeszkleń, balkonów i ogrodów zimowych. Skrzydło do 2000 × 2500 mm.' },
          { name: 'Moskitiera plisowana', image: img('moskitiery-7big'), description: 'Do wyjść na taras – po złożeniu siatka chowa się w wąskim profilu.' },
        ],
      },
    ],
  },

  {
    slug: 'parapety-wewnetrzne',
    title: 'Parapety wewnętrzne',
    short: 'Parapety z MDF, PVC, postformingu, marmuru i konglomeratu – na indywidualny wymiar.',
    intro:
      'Parapety z MDF, PVC, postformingu, marmuru i konglomeratu – każdy wykonujemy na indywidualny wymiar. Z kamienia robimy też schody, blaty i obudowy kominków.',
    image: img('wiz-800.mar_'),
    seoDescription: 'Parapety wewnętrzne MDF, PVC, postforming, marmur i konglomerat na wymiar w Płocku. Także blaty, schody i obudowy kominków z kamienia.',
    features: ['Każdy parapet na wymiar', 'Wcięcia i narożniki według projektu', 'Kilkadziesiąt kolorów i dekorów', 'Nakładki renowacyjne na stare parapety'],
    groups: [
      {
        name: 'Parapety wewnętrzne',
        id: 'parapety',
        products: [
          { name: 'MDF laminowany', image: img('wiz-800.mdf_'), description: 'Wilgocioodporna płyta MDF z okleiną odporną na zarysowania.', specs: ['do 90 cm szer.', 'grub. 2–4 cm'] },
          { name: 'PVC', image: img('wiz-800.pcv_'), description: 'Komorowy parapet odporny na wilgoć i temperaturę, łatwy w pielęgnacji.', specs: ['15–60 cm', 'do 600 cm dł.', '7 kolorów'] },
          { name: 'PVC Softline', image: img('wiz-800.pcvsoft'), description: 'Parapet PVC z subtelnie zaokrąglonymi krawędziami.', specs: ['15–50 cm', 'do 600 cm dł.', '5 kolorów'] },
          { name: 'Postforming', image: img('wiz-800.post_'), description: 'Laminat HPL (połysk) lub CPL (mat) odporny na temperaturę, UV i zarysowania.', specs: ['20–60 cm', 'do 420 cm dł.', '6 kolorów'] },
          { name: 'Marmur', image: img('wiz-800.mar_'), description: 'Naturalny kamień odporny na ścieranie, z delikatnie fazowanymi brzegami.', specs: ['15–60 cm', 'grub. 3 cm'] },
          { name: 'Konglomerat', image: img('wiz-800.kon_'), description: '95% naturalnego marmuru spojonego żywicą – gładki i bardzo wytrzymały.', specs: ['15–60 cm', 'do 300 cm dł.', '17 kolorów'] },
          { name: 'Nakładka renowacyjna', image: img('wiz-800.nr_'), description: 'Szybki i niedrogi sposób na odświeżenie starego parapetu z lastryka, betonu lub kamienia.', specs: ['szer. 38 cm', 'do 600 cm dł.'] },
        ],
      },
      {
        name: 'Schody, blaty i obudowy kominków',
        id: 'kamien',
        description: ['Wykonujemy elementy z kamienia naturalnego i konglomeratu – odporne na uszkodzenia, łatwe w utrzymaniu czystości.'],
        products: [
          { name: 'Obudowy kominków', image: img('fireplace-558985_640'), description: 'Niepalne, nieodbarwiające się i odporne na uszkodzenia – w wersji klasycznej lub nowoczesnej.' },
          { name: 'Blaty kuchenne i łazienkowe', image: img('kitchen-2165756_640'), description: 'Wytrzymałe blaty robocze z kamienia naturalnego i konglomeratu.' },
        ],
      },
    ],
  },

  {
    slug: 'parapety-zewnetrzne',
    title: 'Parapety zewnętrzne',
    short: 'Parapety stalowe, aluminiowe i granitowe – dopasowane kolorem do okien i elewacji.',
    intro:
      'Parapety zewnętrzne ze stali, aluminium i granitu, wykonywane na indywidualny wymiar i dopasowane kolorem do stolarki oraz elewacji.',
    image: img('wiz-800.alu-plytka'),
    seoDescription: 'Parapety zewnętrzne stalowe, aluminiowe i granitowe na wymiar w Płocku. Kolory standardowe i z palety RAL.',
    features: ['Każdy parapet na wymiar', 'Długość do 600 cm w jednym elemencie', 'Kolory standardowe i z palety RAL', 'Zabezpieczenie folią ochronną'],
    groups: [
      {
        name: 'Parapety zewnętrzne',
        id: 'parapety',
        products: [
          { name: 'Stalowe', image: img('wiz-800.stal_'), description: 'Blacha ocynkowana ogniowo z powłoką poliestrową – prosta linia pasująca do każdego okna.', specs: ['10–40 cm', 'dowolny RAL'] },
          { name: 'Stalowe softline', image: img('wiz-800.stal-soft'), description: 'Zaoblone ranty i trwała powłoka lakiernicza.', specs: ['10–40 cm', 'dowolny RAL'] },
          { name: 'Stalowe laminowane', image: img('wiz-800.stal-lamin'), description: 'Okleina RENOLIT odporna na UV, wilgoć i temperaturę – naśladuje naturalne materiały.', specs: ['10–40 cm', '7 kolorów'] },
          { name: 'Stalowe laminowane softline', image: img('wiz-800.stal-lamin-soft'), description: 'Laminowany parapet z miękko zaoblonym wykończeniem.', specs: ['10–40 cm', '6 kolorów'] },
          { name: 'Aluminiowe', image: img('wiz-800.alu_'), description: 'Lekkie, wytrzymałe i odporne na korozję, z proszkową powłoką malarską.', specs: ['10–40 cm', 'dowolny RAL'] },
          { name: 'Aluminiowe – imitacja płytki', image: img('wiz-800.alu-plytka'), description: 'Przetłoczenia imitujące płytkę klinkierową i młotkowana powłoka strukturalna.', specs: ['10–40 cm', '5 kolorów'] },
          { name: 'Granit', image: img('wiz-800.granit'), description: 'Twardy, odporny kamień do zastosowań zewnętrznych i wewnętrznych.', specs: ['15–60 cm', '10 kolorów'] },
        ],
      },
    ],
  },

  {
    slug: 'klamki',
    title: 'Klamki',
    short: 'Klamki drzwiowe i okienne VDS oraz Infinity Line w wielu kształtach, kolorach i materiałach.',
    intro:
      'Klamka to ważny element wykończenia drzwi. Mamy szeroki wybór kształtów, kolorów i materiałów – klamki odporne na ścieranie, w różnorodnej estetyce.',
    seoDescription: 'Klamki do drzwi wewnętrznych i zewnętrznych oraz klamki okienne VDS i Infinity Line w Płocku.',
    groups: [
      {
        name: 'Klamki VDS i Infinity Line',
        id: 'klamki',
        logo: logo('vds'),
        description: ['W salonie pomożemy dobrać klamkę do drzwi i okien. Główne kategorie w naszej ofercie:'],
        bullets: [
          'klamki na dzielonym szyldzie kwadratowym i okrągłym',
          'klamki na długim szyldzie',
          'klamki ze stali nierdzewnej',
          'gałki i klamki do drzwi zewnętrznych',
          'klamki bramowe',
          'klamki okienne i akcesoria',
        ],
        links: [
          { label: 'Strona VDS', href: 'https://vds.pl/' },
          { label: 'Strona Infinity Line', href: 'https://www.infinityline.pl/' },
        ],
      },
    ],
  },
];

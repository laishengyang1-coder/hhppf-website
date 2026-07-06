(function () {
  "use strict";

  const activeLang = window.HH_SITE_LANG || document.documentElement.lang;
  if (activeLang !== "ru") return;

  const ruText = {
    "Quality Film Expert": "Эксперт по пленкам",
    "Story": "История",
    "Strength": "Производство",
    "Products": "Продукты",
    "Identity": "Айдентика",
    "Partner": "Партнерство",
    "Warranty": "Гарантия",
    "H&H · Global Automotive Film Brand": "H&H · международный бренд автомобильных пленок",
    "Protect Better.": "Защищайте лучше.",
    "Grow Together.": "Растем вместе.",
    "H&H delivers automotive film solutions with factory-backed quality, brand consistency and long-term partner support for global markets.": "H&H предлагает решения в области автомобильных пленок с заводским качеством, единой айдентикой и долгосрочной поддержкой партнеров на международных рынках.",
    "Explore Film Solutions": "Смотреть решения",
    "Partner with H&H": "Стать партнером H&H",
    "Verify Warranty": "Проверить гарантию",
    "FILM PORTFOLIO": "ПОРТФЕЛЬ ПЛЕНОК",
    "Complete Film Portfolio": "Полный портфель пленок",
    "Protection": "Защита",
    "Color": "Цвет",
    "Comfort": "Комфорт",
    "Glass": "Стекло",
    "BRAND SYSTEM": "СИСТЕМА БРЕНДА",
    "Brand Framework": "Бренд-платформа",
    "Materials": "Материалы",
    "Samples & Kits": "Образцы и наборы",
    "Display": "Выкладка",
    "Showroom & Events": "Шоурум и события",
    "Store Image": "Образ магазина",
    "Brand Identity": "Айдентика",
    "CORE PERFORMANCE": "КЛЮЧЕВЫЕ СВОЙСТВА",
    "Core Performance": "Ключевые свойства",
    "Gloss": "Глянец",
    "Self-Healing": "Самовосстановление",
    "Hydrophobic": "Гидрофобность",
    "Factory-Backed Film Supply": "Поставки от производителя",
    "Brand · Market · Growth": "Бренд · рынок · рост",
    "Partner Co-Building Support": "Поддержка развития партнеров",
    "Brand Story": "История бренда",
    "Harmony": "Гармония",
    "in protection.": "в защите.",
    "in partnership.": "в партнерстве.",
    "H&H, pronounced “HEHE”, comes from the Eastern philosophy of harmony and cooperation. It represents a long-term relationship between the brand, partners and users: preserving original beauty, connecting people and moving forward with ease.": "H&H, произносится как «HEHE», вдохновлен восточной философией гармонии и сотрудничества. Он отражает долгосрочную связь между брендом, партнерами и пользователями: сохранять исходную красоту, соединять людей и уверенно двигаться вперед.",
    "Harmony in Protection": "Гармония в защите",
    "Preserving the original beauty.": "Сохранять исходную красоту.",
    "Connection": "Связь",
    "Linking partners and users.": "Объединять партнеров и пользователей.",
    "Harmony in Partnership": "Гармония в партнерстве",
    "Moving forward with ease together.": "Спокойно двигаться вперед вместе.",
    "Industrial Support": "Промышленная база",
    "Factory-backed capability for global film markets.": "Заводская база для международных рынков пленок.",
    "H&H is supported by Hehe New Materials Group, founded in 2004 and listed on NEEQ under stock code 870328. Anhui Hehe focuses on automotive film materials and related new material businesses.": "H&H опирается на Hehe New Materials Group, основанную в 2004 году и зарегистрированную на NEEQ под кодом 870328. Anhui Hehe специализируется на материалах для автомобильных пленок и смежных новых материалах.",
    "Years of film expertise": "лет опыта в пленках",
    "Film technology expertise": "технологический опыт",
    "Patents": "патентов",
    "Authorized patents": "авторизованные патенты",
    "Anhui manufacturing center": "производственный центр Anhui",
    "Professional production lines": "профессиональных линий",
    "Professional lines": "производственные линии",
    "Testing procedures": "процедур испытаний",
    "Durability tests": "тестов долговечности",
    "Weathering test scenarios": "сценарии климатических испытаний",
    "R&D Team": "R&D команда",
    "R&D team": "R&D команда",
    "Doctoral-level R&D team integrating coating technology, material development and color innovation.": "R&D команда докторского уровня объединяет технологии покрытий, разработку материалов и цветовые инновации.",
    "R&D Equipment": "R&D оборудование",
    "Laboratory platform": "Лабораторная платформа",
    "Three laboratories in Shanghai, Anhui and Jiangsu support testing, analysis and product evaluation.": "Три лаборатории в Шанхае, Аньхое и Цзянсу поддерживают испытания, анализ и оценку продукции.",
    "Quality System": "Система качества",
    "Quality system": "Система качества",
    "SGS verification and all-weather durability testing support stable, internationally aligned quality.": "Проверка SGS и всепогодные испытания долговечности поддерживают стабильное качество международного уровня.",
    "Certified Quality System": "Сертифицированная система качества",
    "Certified Systems. Reliable Quality.": "Сертифицированные системы. Надежное качество.",
    "Internationally recognized management systems support consistent production, quality control and reliable delivery.": "Международно признанные системы управления поддерживают стабильное производство, контроль качества и надежные поставки.",
    "Certified": "Сертифицировано",
    "Quality Management System": "Система менеджмента качества",
    "Environmental Management System": "Система экологического менеджмента",
    "Automotive Quality Management System": "Система качества для автомобильной отрасли",
    "Participant in group standards for TPU color change film and automotive color-change wrap film.": "Участник групповых стандартов для TPU цветной пленки и автомобильной пленки для изменения цвета.",
    "Product Portfolio": "Продуктовый портфель",
    "Complete Automotive": "Полный портфель",
    "Film Portfolio": "автомобильных пленок",
    "For global partners, H&H provides scalable film solutions covering vehicle protection, color expression, heat insulation and glass spaces.": "Для международных партнеров H&H предлагает масштабируемые решения: защита автомобиля, цветовая персонализация, теплоизоляция и пленки для стеклянных пространств.",
    "Color Film": "Цветная пленка",
    "Window Film": "Оконная пленка",
    "Sunroof Film": "Пленка для панорамной крыши",
    "Architectural Film": "Архитектурная пленка",
    "Clear PPF": "Прозрачная PPF",
    "Clear Paint Protection Film": "Прозрачная защитная пленка",
    "Clear protection for premium vehicles, daily driving, dealership delivery, and high-end detailing shops. High-gloss, self-healing, anti-yellowing performance.": "Прозрачная защита для премиальных автомобилей, ежедневной эксплуатации, дилерской выдачи и профессиональных детейлинг-центров. Глянец, самовосстановление и устойчивость к пожелтению.",
    "Anti-Yellowing": "Анти-желтизна",
    "Color Paint Protection Film": "Цветная защитная пленка",
    "Combining color expression with PPF-level protection. Ideal for vehicle personalization, custom shops, and premium detailing markets seeking differentiation.": "Сочетает цветовую выразительность с уровнем защиты PPF. Подходит для персонализации автомобилей, кастом-студий и премиального детейлинга.",
    "Style": "Стиль",
    "Automotive Window Film": "Автомобильная оконная пленка",
    "Ideal for heat insulation, UV protection and driving comfort in hot-climate markets. Signal-friendly for modern connected vehicles.": "Подходит для теплоизоляции, защиты от УФ и комфорта в жарком климате. Совместима с сигналами современных подключенных автомобилей.",
    "Heat Rejection": "Защита от жары",
    "UV Protection": "УФ-защита",
    "Sunroof Protection Film": "Пленка для защиты панорамной крыши",
    "Designed for panoramic sunroofs and high-temperature cabins. Perfect for luxury vehicles and markets with intense sun exposure.": "Разработана для панорамных крыш и салонов с высокой температурой. Подходит для премиальных автомобилей и рынков с активным солнцем.",
    "Cooling": "Охлаждение",
    "Glass Protection": "Защита стекла",
    "Clarity": "Прозрачность",
    "Architectural & Home Film": "Архитектурная и домашняя пленка",
    "Extending automotive film technology to residential and commercial glass spaces. Privacy, energy efficiency, and UV protection for buildings.": "Перенос автомобильных пленочных технологий в жилые и коммерческие стеклянные пространства: приватность, энергоэффективность и УФ-защита зданий.",
    "Privacy": "Приватность",
    "Energy Saving": "Энергосбережение",
    "Product Series Structure": "Структура продуктовых серий",
    "Clear PPF Series": "Серия прозрачной PPF",
    "Classic / Plus / Pro / Ultra / Matte": "Classic / Plus / Pro / Ultra / Matte",
    "Window Film Series": "Серия оконных пленок",
    "Safety / Ceramic / 5G Ceramic / Colorful Series": "Safety / Ceramic / 5G Ceramic / Colorful Series",
    "Color Film Series": "Серия цветных пленок",
    "Gloss / Metallic / Satin / Color Shift": "Gloss / Metallic / Satin / Color Shift",
    "Need the Full Product Catalog?": "Нужен полный каталог продукции?",
    "Get Product Catalog": "Получить каталог",
    "Request Sample Kit": "Запросить набор образцов",
    "Talk to H&H Team": "Связаться с командой H&H",
    "Visual Identity": "Визуальная айдентика",
    "Brand standard colors built with material texture.": "Фирменные цвета, построенные на фактуре материалов.",
    "The page translates the H&H orange, gray, white and graphite palette into a trade-facing visual system for catalogs, booths, packaging and digital launch pages.": "Страница переводит палитру H&H — оранжевый, серый, белый и графитовый — в коммерческую визуальную систему для каталогов, стендов, упаковки и цифровых запусков.",
    "Brand Core Colors": "Основные цвета бренда",
    "Identify standard color": "Стандартный цвет айдентики",
    "Leap Orange": "Leap Orange",
    "Harmony Gray": "Harmony Gray",
    "Identity Support Colors": "Поддерживающие цвета",
    "Warm White": "Warm White",
    "Graphite Black": "Graphite Black",
    "Brand in Action": "Бренд в действии",
    "Brand Materials Ready for Local Market Launch.": "Бренд-материалы для запуска на локальном рынке.",
    "From sample kits and display tools to store materials and exhibition systems, H&H provides partners with ready-to-use brand materials for retail stores, installers, events and market launch.": "От наборов образцов и демонстрационных инструментов до материалов для магазинов и выставочных систем — H&H предоставляет партнерам готовые бренд-материалы для розницы, установщиков, мероприятий и запуска рынка.",
    "Brand Sample Kit": "Набор образцов бренда",
    "Product Demonstration Display": "Демонстрационный дисплей продукта",
    "Packaging & Product Card": "Упаковка и продуктовая карточка",
    "Vehicle Branding Plate": "Брендированная табличка для автомобиля",
    "Team Apparel": "Командная одежда",
    "Exhibition System": "Выставочная система",
    "More brand materials can be configured based on partner level and local market launch plan.": "Дополнительные бренд-материалы могут быть настроены под уровень партнера и план запуска локального рынка.",
    "Partnership Program": "Партнерская программа",
    "Build Your Local Film Business with H&H.": "Развивайте локальный бизнес пленок вместе с H&H.",
    "H&H works with global partners to build local automotive film markets through product solutions, brand resources, display materials, showroom support, marketing activities, training, and long-term service.": "H&H работает с международными партнерами над развитием локальных рынков автомобильных пленок через продуктовые решения, бренд-ресурсы, демонстрационные материалы, поддержку шоурумов, маркетинговые активности, обучение и долгосрочный сервис.",
    "Product Solutions": "Продуктовые решения",
    "Brand Resources": "Бренд-ресурсы",
    "Display Materials": "Материалы выкладки",
    "Training Support": "Поддержка обучения",
    "Market Co-Building": "Совместное развитие рынка",
    "Become a Partner": "Стать партнером",
    "Warranty Portal": "Портал гарантии",
    "Website: www.hehefilms.com": "Сайт: www.hehefilms.com",
    "Email: anhui@heheppf.com": "Email: anhui@heheppf.com"
  };

  const attrText = {
    "H&H Automotive Films home": "Главная H&H Automotive Films",
    "Main navigation": "Основная навигация",
    "H&H Automotive Films brand hero": "Главный экран бренда H&H Automotive Films",
    "H&H brand visual system": "Визуальная система бренда H&H",
    "Key company metrics": "Ключевые показатели компании",
    "Anhui Hehe manufacturing center": "Производственный центр Anhui Hehe",
    "H&H R&D team": "R&D команда H&H",
    "H&H laboratory platform": "Лабораторная платформа H&H",
    "H&H quality system": "Система качества H&H",
    "H&H brand sample kit": "Набор образцов H&H",
    "H&H product demonstration display": "Демонстрационный дисплей H&H",
    "H&H packaging and product card": "Упаковка и карточка продукта H&H",
    "H&H vehicle branding plate": "Брендированная табличка H&H",
    "H&H team apparel": "Командная одежда H&H",
    "H&H exhibition system": "Выставочная система H&H"
  };

  function normalized(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  function translateTextNode(node) {
    const key = normalized(node.nodeValue);
    if (!key || !ruText[key]) return;
    const leading = node.nodeValue.match(/^\s*/)[0];
    const trailing = node.nodeValue.match(/\s*$/)[0];
    node.nodeValue = `${leading}${ruText[key]}${trailing}`;
  }

  function translateAttributes() {
    document.querySelectorAll("[alt], [aria-label]").forEach((element) => {
      ["alt", "aria-label"].forEach((attr) => {
        if (!element.hasAttribute(attr)) return;
        const key = normalized(element.getAttribute(attr));
        if (attrText[key]) {
          element.setAttribute(attr, attrText[key]);
        }
      });
    });
  }

  function updateLanguageLinks() {
    document.querySelectorAll(".lang-switch").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.lang === "ru");
    });
  }

  function translatePage() {
    document.documentElement.lang = "ru";
    document.title = "H&H автомобильные пленки | PPF, цветные и оконные пленки";

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        "H&H Automotive Films предлагает заводские решения PPF, цветных пленок и оконных пленок для международных рынков.",
      );
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return normalized(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateTextNode);
    translateAttributes();
    updateLanguageLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", translatePage);
  } else {
    translatePage();
  }
})();

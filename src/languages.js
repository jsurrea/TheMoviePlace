const translations = {
  "en": {
    "home_title": "The Movie Place 🍿",
    "search_title": "Search Results 🔎",
    "trends_title": "Trending Movies 📈",
    "no_movies": "We're sorry. We didn't find any movies 😭",

    "app_heading": "The Movie Place",
    "search_heading": "Search results:",
    "trends_heading": "Trending Movies",
    "trending_heading": "Trending",
    "trending_button": "Explore more",
    "categories_heading": "Categories",
    "related_heading": "Related Movies",
    "favorites_heading": "My Favorites",
    "footer_text": "Made with love in Colombia 💛💙❤️"
  },
  "es": {
    "home_title": "El Lugar de Películas 🍿",
    "search_title": "Resultados de Búsqueda 🔎",
    "trends_title": "Películas en Tendencia 📈",
    "no_movies": "Lo sentimos. No encontramos ninguna película 😭",

    "app_heading": "El Lugar de Películas",
    "search_heading": "Resultados de búsqueda:",
    "trends_heading": "Películas en tendencia",
    "trending_heading": "Tendencia",
    "trending_button": "Explorar más",
    "categories_heading": "Categorías",
    "related_heading": "Películas Relacionadas",
    "favorites_heading": "Mis Favoritas",
    "footer_text": "Hecho con amor en Colombia 💛💙❤️"
  },
  "fr": {
    "home_title": "Le lieu du film 🍿",
    "search_title": "Résultats de recherche 🔎",
    "trends_title": "Films à la mode 📈",
    "no_movies": "Désolé. Nous n'avons trouvé aucun film 😭",

    "app_heading": "Le lieu du film",
    "search_heading": "Résultats de recherche:",
    "trends_heading": "Films à la mode",
    "trending_heading": "Tendance",
    "trending_button": "Explorer davantage",
    "categories_heading": "Catégories",
    "related_heading": "Films Associés",
    "favorites_heading": "Mes Favoris",
    "footer_text": "Fabriqué avec amour en Colombie 💛💙❤️"
  },
  "de": {
    "home_title": "Der Filmplatz 🍿",
    "search_title": "Suchergebnisse 🔎",
    "trends_title": "Trendfilme 📈",
    "no_movies": "Es tut uns leid. Wir haben keine Filme gefunden 😭",

    "app_heading": "Der Filmplatz",
    "search_heading": "Suchergebnisse:",
    "trends_heading": "Trendfilme",
    "trending_heading": "Im Trend",
    "trending_button": "Mehr entdecken",
    "categories_heading": "Kategorien",
    "related_heading": "Ähnliche Filme",
    "favorites_heading": "Meine Favoriten",
    "footer_text": "Hergestellt mit Liebe in Kolumbien 💛💙❤️"
  },
  "it": {
    "home_title": "Il Luogo del Film 🍿",
    "search_title": "Risultati della Ricerca 🔎",
    "trends_title": "Film in Tendenza 📈",
    "no_movies": "Spiacenti. Non abbiamo trovato nessun film 😭",

    "app_heading": "Il Luogo del Film",
    "search_heading": "Risultati della ricerca:",
    "trends_heading": "Film in tendenza",
    "trending_heading": "In Tendenza",
    "trending_button": "Esplora di più",
    "categories_heading": "Categorie",
    "related_heading": "Film Correlati",
    "favorites_heading": "I Miei Preferiti",
    "footer_text": "Realizzato con amore in Colombia 💛💙❤️"
  },
  "pt": {
    "home_title": "O Local do Filme 🍿",
    "search_title": "Resultados da Busca 🔎",
    "trends_title": "Filmes em Tendência 📈",
    "no_movies": "Desculpe. Não encontramos nenhum filme 😭",

    "app_heading": "O Local do Filme",
    "search_heading": "Resultados da busca:",
    "trends_heading": "Filmes em tendência",
    "trending_heading": "Tendência",
    "trending_button": "Explorar mais",
    "categories_heading": "Categorias",
    "related_heading": "Filmes Relacionados",
    "favorites_heading": "Meus Favoritos",
    "footer_text": "Feito com amor na Colômbia 💛💙❤️"
  },
};

function updateLanguageOptions() {
  const options = [
    { value: "en", label: "🇺🇸" },
    { value: "es", label: "🇪🇸" },
    { value: "fr", label: "🇫🇷" },
    { value: "de", label: "🇩🇪" },
    { value: "it", label: "🇮🇹" },
    { value: "pt", label: "🇵🇹" },
  ];
  let currentLanguage = localStorage.getItem("language");
  if (!currentLanguage) {
    currentLanguage = navigator.language || navigator.userLanguage;
    currentLanguage = currentLanguage.toLowerCase();
    currentLanguage = currentLanguage.substring(0, 2);
  }
  if (!options.find(option => option.value === currentLanguage)) {
    currentLanguage = "en";
  }
  options.forEach(option => {
    const languageOption = document.createElement("option");
    languageOption.value = option.value;
    languageOption.textContent = option.label;
    if (option.value === currentLanguage) {
      languageOption.selected = true;
    }
    languageSelect.appendChild(languageOption);
  });
}

function getLangLabels(lang) {
  lang = lang || "en";
  lang = lang.toLowerCase();
  lang = lang.substring(0, 2);
  let labels = translations[lang];
  if (!labels) {
    labels = translations["en"];
  }
  return labels;
}

function updateLabels(lang) {
  const labels = getLangLabels(lang);
  for (let key in labels) {
    const elements = document.querySelectorAll(`[data-label="${key}"]`);
    elements.forEach(element => {
      element.textContent = labels[key];
    });
  }
}

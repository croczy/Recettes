/**
 * Application de Gestion des Recettes
 * ====================================
 * Une application interactive pour filtrer et découvrir des recettes
 * basées sur les ingrédients disponibles et le type de plat.
 */

// ==================== Variables Globales ====================
const recipesGrid = document.getElementById('recipesGrid');
const resultsInfo = document.getElementById('resultsInfo');
const ingredientsSelect = document.getElementById('ingredientsSelect');
const typeSelect = document.getElementById('typeSelect');
const clearBtn = document.getElementById('clearBtn');
const surpriseBtn = document.getElementById('surpriseBtn');

let RECIPES = [];

/**
 * Données par défaut en cas de problème de chargement du fichier JSON
 * Contient 6 recettes avec toutes les informations nécessaires
 */
const DEFAULT_RECIPES = [
  {
    nom: "Omelette aux tomates",
    description: "Une recette simple et rapide à base d'œufs et de tomates.",
    temps: "10 min",
    type: "plat",
    difficulte: "Facile",
    portions: "2",
    ingredients: ["2 œufs", "2 tomates", "sel", "poivre", "1 cuillère à soupe d'huile d'olive"],
    etapes: [
      "Couper les tomates en petits dés",
      "Battre les œufs dans un bol avec du sel et du poivre",
      "Chauffer l'huile d'olive dans une poêle à feu moyen",
      "Verser les œufs battus dans la poêle",
      "Laisser cuire 1-2 minutes, puis ajouter les tomates",
      "Plier l'omelette en deux et servir immédiatement"
    ],
    image: "fa-egg"
  },
  {
    nom: "Salade de riz méditerranéenne",
    description: "Riz, tomates, concombre, olives et feta avec une vinaigrette légère.",
    temps: "20 min",
    type: "entrée",
    difficulte: "Facile",
    portions: "4",
    ingredients: ["250g riz", "3 tomates", "1 concombre", "150g olives", "200g feta", "3 cuillères d'huile d'olive", "1 citron"],
    etapes: [
      "Cuire le riz selon les instructions du paquet, puis laisser refroidir",
      "Couper les tomates, le concombre et la feta en petits dés",
      "Mélanger le riz refroidi avec les légumes et les olives",
      "Préparer la vinaigrette avec l'huile d'olive et le jus de citron",
      "Verser la vinaigrette sur la salade et mélanger",
      "Ajouter la feta et bien mélanger avant de servir"
    ],
    image: "fa-bowl-rice"
  },
  {
    nom: "Pâtes à l'ail et au parmesan",
    description: "Pâtes sautées à l'huile d'olive, ail, persil et parmesan.",
    temps: "15 min",
    type: "plat",
    difficulte: "Facile",
    portions: "3",
    ingredients: ["400g pâtes", "5 gousses d'ail", "100ml huile d'olive", "100g parmesan", "persil frais", "sel", "poivre"],
    etapes: [
      "Cuire les pâtes selon les instructions du paquet",
      "Émincer finement l'ail",
      "Faire chauffer l'huile d'olive dans une grande poêle",
      "Faire revenir l'ail 1-2 minutes à feu doux jusqu'à ce qu'il soit doré",
      "Égoutter les pâtes et les ajouter à la poêle",
      "Mélanger bien, ajouter le parmesan râpé et le persil",
      "Assaisonner avec du sel et du poivre, puis servir"
    ],
    image: "fa-bowl-food"
  },
  {
    nom: "Crêpes sucrées",
    description: "Crêpes légères à garnir de sucre, confiture ou chocolat.",
    temps: "25 min",
    type: "dessert",
    difficulte: "Moyen",
    portions: "6",
    ingredients: ["250g farine", "500ml lait", "2 œufs", "2 cuillères de sucre", "50g beurre fondu", "pincée de sel"],
    etapes: [
      "Mélanger la farine, les œufs, le sucre et le sel dans un bol",
      "Ajouter progressivement le lait en mélangeant pour obtenir une pâte lisse",
      "Ajouter le beurre fondu à la pâte",
      "Laisser reposer 30 minutes à température ambiante",
      "Chauffer une poêle antiadhésive à feu moyen-vif",
      "Verser un peu de pâte et incliner la poêle pour l'étaler finement",
      "Cuire 1-2 minutes de chaque côté jusqu'à ce que la crêpe soit dorée",
      "Garnir selon vos préférences (sucre, confiture, chocolat, etc.)"
    ],
    image: "fa-cookie"
  },
  {
    nom: "Bruschetta aux tomates",
    description: "Pain grillé frotté à l'ail, tomates, basilic et huile d'olive.",
    temps: "12 min",
    type: "entrée",
    difficulte: "Facile",
    portions: "4",
    ingredients: ["1 baguette", "3 tomates", "3 gousses d'ail", "50ml huile d'olive", "basilic frais", "sel", "poivre"],
    etapes: [
      "Couper la baguette en tranches épaisses",
      "Faire griller les tranches au four ou à la poêle jusqu'à ce qu'elles soient dorées",
      "Frotter chaque tranche chaude avec une gousse d'ail",
      "Couper les tomates en petits dés et les mettre dans un bol",
      "Ajouter l'huile d'olive, le basilic haché, du sel et du poivre",
      "Verser le mélange sur chaque tranche de pain grillée",
      "Servir immédiatement"
    ],
    image: "fa-bread-slice"
  },
  {
    nom: "Riz sauté aux œufs",
    description: "Riz de la veille sauté avec œufs, petits pois et sauce soja.",
    temps: "15 min",
    type: "plat",
    difficulte: "Facile",
    portions: "2",
    ingredients: ["300g riz cuit (de la veille)", "2 œufs", "150g petits pois", "3 cuillères de sauce soja", "1 oignon", "2 cuillères d'huile"],
    etapes: [
      "Hacher finement l'oignon",
      "Battre les œufs dans un bol",
      "Chauffer l'huile dans un wok ou une grande poêle à feu vif",
      "Faire revenir l'oignon 2-3 minutes",
      "Ajouter le riz cuit et le casser légèrement avec une spatule",
      "Ajouter les petits pois et la sauce soja",
      "Pousser le riz sur les côtés et verser les œufs battus au centre",
      "Mélanger rapidement tout ensemble et laisser cuire 2-3 minutes"
    ],
    image: "fa-kitchen-set"
  },
  {
    nom: "Soupe à l'oignon gratinée",
    description: "Classique français avec oignons caramélisés, pain grillé et fromage fondu.",
    temps: "45 min",
    type: "plat",
    difficulte: "Moyen",
    portions: "4",
    ingredients: ["1kg oignons", "1L bouillon", "200ml vin blanc", "1 baguette", "200g fromage gruyère", "50g beurre", "sel", "poivre"],
    etapes: [
      "Couper les oignons en fines tranches",
      "Faire fondre le beurre dans une grande casserole à feu moyen",
      "Ajouter les oignons et laisser caraméliser pendant 20-25 minutes en remuant régulièrement",
      "Déglacer avec le vin blanc et laisser réduire de moitié",
      "Verser le bouillon et laisser mijoter 15 minutes",
      "Assaisonner avec du sel et du poivre",
      "Verser la soupe dans des bols individuels",
      "Garnir avec une tranche de pain grillée et du fromage râpé",
      "Gratiner au four à 180°C pendant 10 minutes jusqu'à ce que le fromage soit doré"
    ],
    image: "fa-mug-hot"
  },
  {
    nom: "Tarte aux fruits rouges",
    description: "Pâte brisée garnie de crème pâtissière et fruits frais.",
    temps: "60 min",
    type: "dessert",
    difficulte: "Moyen",
    portions: "8",
    ingredients: ["250g farine", "125g beurre", "1 œuf", "100g sucre", "250ml lait", "2 jaunes d'œuf", "300g fruits rouges", "vanille"],
    etapes: [
      "Préparer la pâte brisée : mélanger farine, beurre froid découpé en cubes, 1 œuf et du sel",
      "Laisser reposer au frigo 30 minutes",
      "Étaler la pâte dans un moule à tarte et laisser reposer 15 minutes",
      "Cuire à blanc au four 180°C pendant 15 minutes",
      "Préparer la crème pâtissière : faire bouillir le lait avec la vanille",
      "Blanchir les jaunes d'œuf avec le sucre, ajouter la farine progressivement",
      "Verser le lait chaud sur le mélange en remuant constamment",
      "Laisser épaissir à feu doux 2-3 minutes",
      "Verser la crème dans le fond de tarte",
      "Décorer avec les fruits rouges frais",
      "Servir frais"
    ],
    image: "fa-apple"
  }
];

// ==================== Fonctions de Chargement ====================

/**
 * Charge les recettes depuis le fichier JSON
 * En cas d'erreur, utilise les données par défaut
 */
async function loadRecipes() {
  try {
    const res = await fetch('recettes.json');
    if (!res.ok) throw new Error('Impossible de charger recettes.json');
    RECIPES = await res.json();
    populateIngredientOptions(RECIPES);
    renderRecipes(RECIPES);
    updateInfo(RECIPES.length);
  } catch (e) {
    // Fallback avec les données locales si le serveur n'est pas disponible
    console.warn('recettes.json non accessible, utilisation des données locales.');
    RECIPES = DEFAULT_RECIPES;
    populateIngredientOptions(RECIPES);
    renderRecipes(RECIPES);
    updateInfo(RECIPES.length, 'Mode local sans serveur');
  }
}

/**
 * Remplit le sélecteur d'ingrédients avec tous les ingrédients uniques
 * @param {Array} recipes - Tableau des recettes
 */
function populateIngredientOptions(recipes) {
  // Créer un Set pour stocker tous les ingrédients uniques
  const all = new Set();
  recipes.forEach(r => r.ingredients?.forEach(i => all.add(i)));
  
  // Trier les ingrédients par ordre alphabétique (français)
  const sorted = Array.from(all).sort((a, b) => a.localeCompare(b, 'fr'));
  
  // Vider et remplir le sélecteur
  ingredientsSelect.innerHTML = '';
  for (const ing of sorted) {
    const opt = document.createElement('option');
    opt.value = ing;
    opt.textContent = capitalize(ing);
    ingredientsSelect.appendChild(opt);
  }
}

// ==================== Fonctions de Filtrage ====================

/**
 * Récupère les ingrédients sélectionnés par l'utilisateur
 * @returns {Array} Liste des ingrédients sélectionnés
 */
function getSelectedIngredients() {
  return Array.from(ingredientsSelect.selectedOptions).map(o => o.value);
}

/**
 * Filtre les recettes en fonction des critères sélectionnés
 * (ingrédients et type de plat)
 */
function filterRecipes() {
  const selectedIngredients = getSelectedIngredients();
  const selectedType = typeSelect.value;
  let filtered = RECIPES.slice(); // Copie du tableau

  // Filtrer par ingrédients si au moins un est sélectionné
  if (selectedIngredients.length > 0) {
    filtered = filtered.filter(r => 
      r.ingredients?.some(ing => selectedIngredients.includes(ing))
    );
  }

  // Filtrer par type de plat si sélectionné
  if (selectedType) {
    filtered = filtered.filter(r => r.type === selectedType);
  }

  // Afficher les résultats filtrés
  renderRecipes(filtered);
  
  // Message informatif adapté
  if (selectedIngredients.length === 0 && selectedType === '') {
    updateInfo(filtered.length, 'Aucun filtre appliqué');
  } else if (filtered.length === 0) {
    updateInfo(0, 'Aucun résultat. Essayez avec moins de critères.');
  } else {
    updateInfo(filtered.length, '');
  }
  
  scrollResultsIntoView();
}

/**
 * Efface tous les filtres et affiche toutes les recettes
 */
function clearFilters() {
  ingredientsSelect.selectedIndex = -1; // Désélectionner tous les ingrédients
  typeSelect.value = ''; // Réinitialiser le type
  renderRecipes(RECIPES);
  updateInfo(RECIPES.length);
}

// ==================== Fonction Surprise ====================

/**
 * Affiche une recette aléatoire avec animation spéciale
 */
function surpriseRecipe() {
  if (RECIPES.length === 0) {
    console.warn('Aucune recette disponible');
    return;
  }
  
  // Sélectionner une recette au hasard
  const idx = Math.floor(Math.random() * RECIPES.length);
  const chosen = RECIPES[idx];
  console.debug('Recette surprise choisie:', chosen?.nom);
  
  // Afficher la recette avec animation surprise
  renderRecipes([chosen], true);
  updateInfo(1, '✨ Recette surprise ! (Cliquez sur Effacer pour voir d\'autres recettes)');
  scrollResultsIntoView();
  
  // La recette reste visible jusqu'à ce que l'utilisateur clique sur un bouton
}

// ==================== Fonctions de Rendu ====================

/**
 * Affiche les recettes dans la grille avec animations
 * @param {Array} recipes - Tableau des recettes à afficher
 * @param {Boolean} isSurprise - Si true, ajoute l'animation surprise
 */
function renderRecipes(recipes, isSurprise = false) {
  recipesGrid.innerHTML = ''; // Vider la grille
  const template = document.getElementById('recipeCardTemplate');
  
  recipes.forEach((r, i) => {
    // Cloner le template pour chaque recette
    const node = template.content.cloneNode(true);
    const card = node.querySelector('.recipe-card');
    const title = node.querySelector('.recipe-title');
    const desc = node.querySelector('.recipe-desc');
    const timeText = node.querySelector('.time-text');
    const typePill = node.querySelector('.type-pill');
    const difficultyBadge = node.querySelector('.difficulty-badge');
    const portionsText = node.querySelector('.portions-text');
    const icon = node.querySelector('.recipe-icon');

    // Remplir les données de la recette
    title.textContent = r.nom;
    desc.textContent = r.description;
    timeText.textContent = r.temps;
    typePill.textContent = r.type || '';
    
    // Afficher la difficulté avec couleur
    difficultyBadge.textContent = r.difficulte || 'Facile';
    difficultyBadge.classList.add('difficulty-' + (r.difficulte || 'Facile').toLowerCase());
    
    // Afficher les portions
    portionsText.textContent = r.portions || '2';

    // Gérer les icônes Font Awesome avec fallback
    const fa = (r.image && typeof r.image === 'string') ? r.image : 'fa-utensils';
    icon.className = 'recipe-icon';
    if (fa && fa.startsWith('fa-')) {
      icon.classList.add('fa-solid', fa);
    } else {
      icon.classList.add('fa-solid', 'fa-utensils');
    }

    // Ajouter un délai d'animation échelonné pour chaque carte
    card.style.animationDelay = `${i * 60}ms`;
    
    // Ajouter la classe surprise si c'est une recette surprise
    if (isSurprise) card.classList.add('surprise');
    
    // Rendre la carte cliquable pour afficher les détails
    card.addEventListener('click', function() {
      openRecipeModal(r);
    });
    
    // Aussi cliquable avec Enter (accessibilité)
    card.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        openRecipeModal(r);
      }
    });

    recipesGrid.appendChild(node);
  });
}

/**
 * Met à jour le texte d'information des résultats
 * @param {Number} count - Nombre de résultats
 * @param {String} message - Message personnalisé optionnel
 */
function updateInfo(count, message = '') {
  if (message) {
    resultsInfo.textContent = `${message} (${count} résultat${count > 1 ? 's' : ''})`;
  } else {
    resultsInfo.textContent = `${count} recette${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''}`;
  }
}

/**
 * Utilitaire : Capitalise la première lettre d'une chaîne
 * @param {String} s - Chaîne à capitaliser
 * @returns {String} Chaîne capitalisée
 */
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Scroll vers la grille de recettes pour assurer la visibilité
 */
function scrollResultsIntoView() {
  document.getElementById('recipesGrid')?.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start' 
  });
}

// ==================== Gestion du Modal ====================

/**
 * Affiche le modal avec les détails d'une recette
 * @param {Object} recipe - La recette à afficher
 */
function openRecipeModal(recipe) {
  const modal = document.getElementById('recipeModal');
  
  // Remplir le contenu du modal
  document.getElementById('modalTitle').textContent = recipe.nom;
  document.getElementById('modalTime').textContent = recipe.temps;
  document.getElementById('modalPortions').textContent = recipe.portions;
  
  // Définir la difficulté avec couleur
  const difficultyEl = document.getElementById('modalDifficulty');
  difficultyEl.textContent = recipe.difficulte;
  difficultyEl.className = 'modal-difficulty difficulty-' + (recipe.difficulte || 'Facile').toLowerCase();
  
  // Remplir la liste des ingrédients
  const ingredientsList = document.getElementById('ingredientsList');
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(ing => {
    const li = document.createElement('li');
    li.textContent = ing;
    ingredientsList.appendChild(li);
  });
  
  // Remplir la marche à suivre
  const stepsList = document.getElementById('stepsList');
  stepsList.innerHTML = '';
  recipe.etapes.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    stepsList.appendChild(li);
  });
  
  // Afficher le modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Empêcher le scroll du fond
}

/**
 * Ferme le modal
 */
function closeRecipeModal() {
  const modal = document.getElementById('recipeModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Rétablir le scroll
}

// ==================== Écouteurs d'Événements ====================

// Boutons d'action - utiliser un try/catch pour éviter les erreurs si les éléments n'existent pas
try {
  if (clearBtn) clearBtn.addEventListener('click', clearFilters);
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      surpriseRecipe();
    });
  }
} catch (e) {
  console.error('Erreur lors de l\'ajout des écouteurs de bouton:', e);
}

// Filtrage instantané au changement de sélection (meilleure UX)
if (ingredientsSelect) {
  ingredientsSelect.addEventListener('change', filterRecipes);
}

if (typeSelect) {
  typeSelect.addEventListener('change', filterRecipes);
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM chargé, initialisation des recettes');
  loadRecipes();
  
  // Écouteur pour fermer le modal
  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeRecipeModal);
  }
  
  // Fermer le modal en cliquant en dehors du contenu
  const modal = document.getElementById('recipeModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeRecipeModal();
      }
    });
  }
  
  // Fermer le modal avec la touche Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeRecipeModal();
    }
  });
});


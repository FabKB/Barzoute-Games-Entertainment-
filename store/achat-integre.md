# Vrai achat intégré : règles et choix technique (recherche du 20 octobre 2026)

Achat à mettre en place : **« Atelier illimité »**, achat unique (non consommable), même prix sur iOS et Android.
Aujourd'hui l'achat est en mode test dans le jeu (`Shop.test`).

## Ce que disent les règles

**Apple – App Store Review Guidelines** (texte lu sur la page officielle le 20/10/2026) :
- **3.1.1** : débloquer une fonction (ici, créer plus de doudous) doit passer par l'achat intégré d'Apple.
- **1.3 (catégorie Enfants)** : pas d'achat ni de lien vers l'extérieur sauf derrière un **contrôle parental** ;
  pas d'envoi d'informations personnelles **ni d'informations sur l'appareil** à des tiers ;
  pas d'outil de statistiques ou de publicité tiers (exceptions très limitées).
- **5.1.4** : politique de confidentialité obligatoire, respect des lois sur les données des enfants (COPPA, RGPD).
  Le contrôle parental n'est pas la même chose que le consentement des parents pour collecter des données
  (ici, sans objet : le jeu ne collecte rien).

**Google Play – règles « Familles »** (je n'ai pas pu lire la page officielle depuis mon environnement ;
résumé à partir des résultats de recherche, à vérifier dans Play Console) :
- les règles portent sur toute la monétisation, y compris les offres d'achat intégré ; pas de pratiques commerciales agressives ;
- tous les SDK utilisés doivent convenir à un public d'enfants ; pas d'envoi d'identifiants d'appareil d'enfants ;
- un contenu numérique vendu dans l'app passe par la facturation Google Play.

## Choix recommandé : `capacitor-plugin-cdv-purchase`, sans serveur externe

- Paquet npm `capacitor-plugin-cdv-purchase` (version 13.19.1 vérifiée sur npm le 20/10/2026),
  édition Capacitor du plugin libre `cordova-plugin-purchase` : compatible Capacitor 6, 7 et **8** (notre version),
  StoreKit 2 sur iOS, Google Play Billing sur Android, livré avec un `Package.swift` (compatible avec notre projet iOS sans CocoaPods).
- Il parle **directement** aux systèmes d'achat d'Apple et de Google : pas de compte chez un intermédiaire, pas de frais en plus.
- **À ne pas faire** : brancher un serveur de vérification des reçus (`store.validator`). D'après le README du plugin,
  il envoie alors des informations sur l'appareil (système, modèle, fabricant) à ce serveur — ce que la règle 1.3 d'Apple interdit
  pour la catégorie Enfants. Sans serveur, la vérification se fait avec les mécanismes des boutiques ;
  pour un achat unique à 2,99 €, le risque de fraude ne justifie pas un serveur.
- Point à vérifier au moment du code : comment le plugin vérifie les achats sans serveur sur chaque plateforme,
  et la version de Google Play Billing qu'il embarque (Google impose régulièrement une version minimale).

**Pourquoi pas RevenueCat** (le plus connu) : c'est un service tiers qui reçoit les données d'achat et des informations
sur l'appareil. Je n'ai trouvé aucune documentation officielle de RevenueCat sur la catégorie Enfants d'Apple ;
c'est un risque de refus inutile pour un seul achat unique.

## Ce qu'il faudra créer dans les consoles (après ouverture des comptes)

- Un produit **non consommable** avec le même identifiant sur les deux boutiques, par exemple `atelier_illimite`.
- Le prix (2,99 € prévu) ; les boutiques convertissent dans les autres pays.
- Des comptes de test : « testeurs de licence » dans Play Console, « Sandbox » dans App Store Connect.

## Ce qui est fait dans le jeu (v37)

- Le plugin `capacitor-plugin-cdv-purchase` (13.19.1) est installé ; sa bibliothèque est copiée dans l'app (`www/iap/`)
  et chargée seulement quand le jeu tourne dans l'app. Sur le web, l'achat reste en mode test.
- Produit enregistré : `atelier_illimite`, non consommable, sur Google Play ou l'App Store selon le téléphone.
- Prix affiché : celui de la boutique, dans la devise du pays.
- Achat : contrôle parental, puis paiement Apple/Google ; « annulé », « en attente » (Google) et erreurs ont chacun leur message.
- Chaque achat est terminé (`finish`) après déblocage : sur Google Play, un achat non confirmé est remboursé après quelques jours.
- « Restaurer mes achats » interroge la boutique.
- Aucun serveur de vérification : rien n'est envoyé ailleurs qu'à Apple ou Google.
- Testé avec une boutique simulée (`tests/achat-boutique.test.cjs`) ; le vrai test se fera avec les comptes de test des boutiques.

## Reste à faire (dans les consoles, une fois les comptes ouverts)

- Créer le produit `atelier_illimite` (non consommable, 2,99 € prévu) dans Play Console et dans App Store Connect.
- Ajouter des testeurs de licence (Google) et un compte Sandbox (Apple), puis acheter « pour de faux » avec eux.
- App Store : remplir le contrat des apps payantes, la banque et les formulaires fiscaux avant que l'achat fonctionne.

## Sources
- Apple – App Store Review Guidelines : https://developer.apple.com/app-store/review/guidelines/
- Google Play – règles Familles (aide Play Console) : https://support.google.com/googleplay/android-developer/answer/9893335
- Google Play – SDK publicitaires auto-certifiés Familles : https://support.google.com/googleplay/android-developer/answer/12918983
- TechCrunch – assouplissement des règles Apple pour les apps enfants (2019) : https://techcrunch.com/?p=1880829
- Plugin : https://github.com/j3k0/cordova-plugin-purchase et le paquet npm `capacitor-plugin-cdv-purchase`
- RevenueCat – SDK Cordova : https://www.revenuecat.com/docs/getting-started/installation/cordova

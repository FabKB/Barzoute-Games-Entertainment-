# Barzoute Games Entertainment

## Glace Licorne

Une glace licorne en pixel art court de plateforme en plateforme en laissant derrière elle un arc-en-ciel. C'est un jeu de course sans stress, inspiré de Canabalt et de Nyan Cat : si tu tombes, un nuage te rattrape et te renvoie en l'air. La musique façon Mega Drive est générée en direct par un petit synthé FM.

### Jouer

Ouvre `index.html` dans un navigateur (Chrome, Safari…), sur téléphone ou sur ordinateur, puis choisis ton personnage : la glace licorne, ou un doudou que tu as pris en photo. Quand il y a beaucoup de doudous, les flèches sur les côtés font défiler les pages.

- **Toucher l'écran** (ou Espace / flèche haut) : sauter. Garde le doigt appuyé pour sauter plus haut.
- **Toucher une 2e fois en l'air** : double saut.
- Ramasse les étoiles. Le bouton en haut à droite coupe le son ; P met en pause.

Sur iPhone, active le son de l'appareil : le bouton silencieux peut couper la musique.

### Créer son doudou en photo

Sur l'écran de choix, la case **+ NOUVEAU** (avec un appareil photo) permet de transformer n'importe quel doudou en personnage jouable :

1. Pose le doudou sur un **fond** bien différent de ses couleurs (drap, mur, table, parquet), au milieu de la photo, et prends-le en entier. Le jeu apprend les couleurs du fond sur les bords de la photo et celles du doudou au centre. Un doudou blanc sur un fond blanc reste très difficile.
2. Touche **PRENDRE UNE PHOTO** (ou **CHOISIR UNE PHOTO** dans l'album).
3. L'aperçu montre la photo, avec le fond retiré en rose, et le personnage en pixel art à côté. Si un morceau du doudou disparaît (par exemple un doudou blanc sur un fond blanc), touche le doudou sur la photo (une croix montre l'endroit choisi) ; tu peux aussi régler le curseur **FOND**, qui se règle tout seul pour chaque photo : baisse-le si un morceau disparaît, monte-le s'il reste du fond. Le curseur **LUMIÈRE** éclaircit ou assombrit le personnage ; il se règle aussi tout seul et éclaircit les photos trop sombres.
4. Donne-lui un nom (7 lettres maximum) et touche **VALIDER**.

Le personnage a toujours des yeux et une bouche : le jeu cherche les yeux sur la photo (deux petites taches sombres côte à côte en haut du doudou) et, s'il n'en trouve pas, les place sur la tête. Un petit sourire est ajouté sous les yeux (ou sous le nez), et le doudou cligne des yeux.

Astuce iPhone : une image déjà détourée (sans fond) est utilisée telle quelle.

Tout se passe dans le téléphone : la photo n'est envoyée nulle part. Les doudous sont gardés dans la mémoire du navigateur ; s'ils disparaissent (données du site effacées), il suffit de les refaire.

### Mes doudous et l'Atelier illimité

La petite grille dans le coin d'un doudou ouvre **MES DOUDOUS** : on y choisit, renomme ou supprime ses doudous (supprimer demande deux touchers).

- Le **premier doudou est offert**. À partir du deuxième, la case **+ NOUVEAU** passe par le contrôle parental et l'écran d'achat.
- Pour en créer d'autres, il faut l'**Atelier illimité** : un achat unique, sans abonnement ni publicité.
- Avant l'écran d'achat, un **contrôle parental** pose une multiplication (« Combien font 8 × 7 ? »).
- **RESTAURER MES ACHATS** retrouve un achat déjà fait.

Sur le web, l'achat est en **mode test** : aucun paiement réel, et un lien « ANNULER L'ACHAT (TEST) » dans la galerie permet de recommencer. Dans l'app iOS et Android, l'achat passe par Apple ou Google (plugin `capacitor-plugin-cdv-purchase`, produit `atelier_illimite`, sans serveur de vérification) ; voir `store/achat-integre.md`.

### Les plateformes

Les plateformes changent de forme en route : grands blocs, petits blocs, longues avancées, plateformes qui flottent dans les airs (on peut sauter à travers par en dessous), plateformes qui montent et descendent en emportant le personnage, et petits escaliers.

### Deux modes de jeu

Sur l'écran titre, touche le bouton **MODE** pour choisir :

- **ZEN** : si tu tombes, un nuage te rattrape. On ne perd jamais.
- **DÉFI** : une chute et c'est game over ! (Pendant le passage des nuages entre deux mondes, le personnage avance en pilote automatique et ne peut pas perdre.) Le personnage fait une petite pirouette la tête en bas, puis un écran de fin joyeux s'affiche avec une fanfare, des confettis, ta distance et ton record. Touche **REJOUER** pour recommencer ou **MENU** pour revenir au choix du personnage.

Chaque mode garde son propre record.

### Les mondes

Chaque partie traverse **4 mondes tirés au hasard** parmi les 11 ci-dessous, à raison de 100 m par monde. Entre deux mondes, un rideau de nuages traverse l'écran, puis un avion passe avec une banderole au nom du nouveau monde, et la musique change.

- **Monde des Glaces** : plateformes en sucreries, arc-en-ciel, pop sucrée.
- **Voyage au Japon** : mont Fuji, pagode de Chureito, château de Himeji, forêt de bambous avec de petits torii, pétales de cerisier ; musique pentatonique avec koto et taiko.
- **La Grosse Pomme** : Empire State Building, Chrysler Building, pont de Brooklyn, statue de la Liberté, châteaux d'eau ; musique jazzy-funky.
- **Escale à Londres** : Big Ben et le Parlement, la London Eye, Tower Bridge, le dôme de St Paul, la Tamise, maisons colorées ; pop anglaise des années 60.
- **Bonjour Paris** : tour Eiffel qui scintille, Opéra Garnier, Arc de Triomphe, Sacré-Cœur, la Seine, immeubles haussmanniens avec géraniums aux balcons ; valse musette à l'accordéon.
- **Balade en Slovénie** : les Alpes juliennes et le Triglav enneigé, le lac de Bled couleur émeraude avec son île, son église et ses barques « pletna », le château de Bled sur sa falaise, une prairie avec des kozolec (séchoirs à foin) ; plateformes en kremšnita (le gâteau à la crème de Bled), en ruches peintes et en bois de kozolec ; polka alpine à l'accordéon.
- **Hong Kong**, de nuit : Victoria Peak, la Bank of China Tower et l'IFC, une jonque aux voiles rouges et le Star Ferry sur le port, enseignes au néon, tramway « ding-ding » et taxi rouge ; plateformes en paniers vapeur à dim sum, enseignes lumineuses et échafaudages en bambou ; pop cantonaise à la flûte.
- **Dolce Toscana** : collines, cyprès et vignes ; à Florence, le Duomo, le campanile de Giotto, le Palazzo Vecchio et le Ponte Vecchio sur l'Arno ; à Sienne, la Torre del Mangia, le Palazzo Pubblico et la cathédrale rayée ; les hautes tours de San Gimignano ; la tour penchée de Pise et son baptistère ; plateformes en marbre rayé noir et blanc, toits de tuiles et panforte ; saltarello à la mandoline.
- **Amsterdam** : d'abord la ville, avec ses maisons étroites à pignons (à gradins, en cloche, pointus) le long du canal, la Westerkerk et sa couronne bleue et or, un pont en briques avec des vélos garés, des ormes et une péniche fleurie ; puis, à partir du milieu du monde, la campagne avec ses moulins à vent et ses champs de tulipes en bandes de couleurs ; plateformes en briques hollandaises, en gouda et en parterres de tulipes ; air d'orgue de Barbarie.
- **Copenhague** : le port de Nyhavn et ses maisons colorées aux toits de tuiles, les mâts des voiliers, la flèche torsadée de l'église du Sauveur, des bateaux en bois amarrés et la Petite Sirène sur son rocher ; plateformes en façades de bois peint, en briques de construction et en viennoiserie danoise ; chant de marins à la flûte et à l'accordéon.
- **Île des Pirates** (monde imaginaire) : d'abord le port des pirates, avec ses maisons en bois sur pilotis, ses lanternes et ses enseignes, des navires aux drapeaux à tête de mort rigolote, un ponton avec tonneaux, caisses, cordages et un perroquet ; puis, à partir du milieu du monde, l'île au trésor : eau turquoise, colline et palmiers, un rocher en forme de crâne qui sourit, un galion au loin, et sur la plage un coffre au trésor ouvert, la croix rouge, une pelle et un crabe ; plateformes en planches de pont, en sable à coquillages et en coffres au trésor ; dans ce monde, les étoiles deviennent des **pièces d'or** (elles comptent pareil) ; chant de pirates joyeux en 6/8, à l'accordéon, avec un « oum-pa-pa » (composition originale, dans l'esprit des chansons de pirates).

À mi-parcours de chaque monde, un spectacle passe dans le décor (sans effet sur le jeu) :

- **Glaces** : une licorne au galop (crinière pastel, corne dorée, queue arc-en-ciel) traverse le ciel en laissant un grand arc-en-ciel.
- **Japon** : un monstre géant sort de terre et crache du feu.
- **New York** : un gorille géant tape sur sa poitrine en haut de l'Empire State Building.
- **Londres** : la reine salue la foule depuis le balcon de Buckingham Palace.
- **Paris** : une patrouille d'avions passe en laissant des traînées bleu, blanc, rouge.
- **Slovénie** : le dragon de Ljubljana traverse le ciel, fait un looping et crache deux petites flammes.
- **Hong Kong** : une danse du dragon passe sur les toits (un long dragon rouge et or qui ondule au bout des perches de ses danseurs) pendant qu'un feu d'artifice éclate au-dessus du port.
- **Toscane** : les chevaux du Palio de Sienne passent au galop, chaque jockey aux couleurs de son quartier.
- **Amsterdam** : un moulin géant traverse le décor en faisant tourner ses ailes et souffle une pluie de pétales de tulipes sur tout l'écran.
- **Copenhague** : un drakkar viking à la voile rayée rouge et blanc, avec ses boucliers ronds et sa proue en tête de dragon, traverse le port au rythme de ses rames ; on entend le cor et le tambour des rameurs.
- **Île des Pirates** : un gentil kraken rose sort de l'eau, agite ses tentacules, roule de grands yeux, cligne et fait des bulles, puis replonge.

### La fin : le décollage à Cap Canaveral

Après le 4e monde, on arrive à **Cap Canaveral** : palmiers, grand hangar d'assemblage, tours de lancement. Le personnage court tout seul sur la piste jusqu'à la fusée, saute dedans (on ne voit plus que sa tête dans le hublot), puis compte à rebours « 3, 2, 1, DÉCOLLAGE ! » : la fusée part dans l'espace et l'écran « BON VOYAGE ! » affiche la distance, les étoiles et le record. C'est valable en ZEN comme en DÉFI. Touche **REJOUER** pour un nouveau tirage de 4 mondes.

### Le niveau bonus : le Pays des Bonbons

Toutes les étoiles ramassées s'ajoutent à un trésor, partie après partie (le total s'affiche en haut à gauche de l'écran titre). À **1000 étoiles**, le niveau bonus se débloque et un bouton **BONUS** apparaît sur l'écran titre (touche B au clavier).

Le niveau bonus se joue en trois étapes, sur l'air de Tetris (« Korobeiniki », chanson populaire russe libre de droits, arrangée pour le jeu) :

1. **La pluie de bonbons** : ton personnage reste en bas ; garde le doigt à gauche ou à droite de l'écran pour te déplacer et attraper les bonbons (1 point) et les étoiles (3 points). Attention aux gros brocolis : « beurk », ils retirent 3 bonbons et figent le personnage un court instant. On ne peut pas perdre.
2. **À 100 bonbons**, grosse explosion de confettis, trois ballons apparaissent, comme dans le film « Là-haut », et on s'envole : garde le doigt appuyé pour monter, relâche pour redescendre, passe entre les sucres d'orge géants (ils font juste « bonk »), au-dessus d'une mer de nuages, et attrape les étoiles pendant 35 secondes.
3. **La fusée** : les ballons éclatent, une fusée arrive, ton doudou monte dedans (on ne voit plus que sa tête dans le hublot) et elle décolle vers la Lune. Fin du voyage : « Sur la Lune ! ».

Le niveau bonus reste rejouable à volonté.

Pour l'essayer sans attendre : ajoute `#bonus` à la fin de l'adresse du jeu, ou touche 5 fois de suite le numéro de version en haut à droite de l'écran titre. Ce déblocage de test ne change pas le vrai trésor et s'arrête quand on recharge la page.

### Mon carnet de voyage

Sur l'écran titre, le bouton **carnet** (en haut à droite, à côté du son) ouvre le carnet de voyage : un tampon par lieu, à la manière des tampons qu'on trouve dans les gares et les musées au Japon. Chaque tampon a sa couleur d'encre, son cadre (rond, carré ou octogonal), son monument et son nom.

- Les **11 mondes** : le tampon est gagné quand on traverse le monde jusqu'au bout (en ZEN comme en DÉFI).
- **Cap Canaveral** : au décollage de la fusée.
- **Pays des Bonbons** : en arrivant sur la Lune dans le niveau bonus.

Un nouveau tampon tombe sur l'écran avec « NOUVEAU TAMPON ! ». Les tampons manquants apparaissent en pointillés avec un « ? ». Le carnet est gardé dans le téléphone.

### Langue

Le jeu est en **français** si la première langue du téléphone (ou du navigateur) est le français, et en **anglais** pour toutes les autres langues. Les noms « Glace Licorne », « Barzoute Games » et « GLACE » restent les mêmes.

### L'app iOS et Android (branche `app`)

Le même jeu est emballé en vraie app avec **Capacitor** : `index.html`, la police et les icônes sont copiés dans les projets `android/` et `ios/`.

- **Identifiant de l'app** : `com.barzoute.glacelicorne` (dans `capacitor.config.json`). Il pourra encore changer jusqu'à la première publication dans les boutiques, plus après.
- **Données** : dans l'app, les doudous, l'achat et les records sont aussi gardés dans le stockage de l'app (extension Preferences), plus sûr que celui de la page.
- **Compteur d'images** : en bas à droite, « 60 FPS x3 » donne le nombre d'images par seconde et la finesse de l'image. S'il reste sous 50 pendant 3 secondes de jeu, le jeu baisse la finesse d'un cran (une seule fois) pour redevenir fluide.
- **Autorisations** : appareil photo (et album sur iOS), avec un texte qui explique que la photo reste dans le téléphone.

Pour préparer les projets sur un ordinateur : `npm install`, puis `npm run sync`.

**Tests** : `npm test` lance les tests du jeu dans un navigateur (achat et doudous, détourage photo sur les images de `tests/fixtures`, rotation, fluidité à 90 Hz, étoiles de la piste de la fusée). Sur GitHub, ils passent avant chaque compilation de l'APK : si un test échoue, pas de nouvel APK.

**Android** : à chaque envoi sur la branche `app`, GitHub Actions compile un APK de test et le publie dans la Release **« App Android (test) »** : sur la page du dépôt, rubrique **Releases** (à droite sur ordinateur, plus bas sur téléphone), fichier `glace-licorne-test.apk`. Il s'installe sur un téléphone Android en autorisant l'installation d'applications inconnues. L'APK de test est toujours signé avec la même clé de test (`android/test-signing/`) : une nouvelle version s'installe par-dessus l'ancienne et garde les doudous.

Téléphone de test Android : **Samsung Galaxy A16 5G** (le jeu y tourne à environ 90 images par seconde, paysage et portrait).

**iOS** : la compilation demande un Mac ; elle se fera avec un service de compilation en ligne (étape suivante).

### Ajouter l'icône sur l'écran d'accueil de l'iPhone

Une fois le jeu en ligne (voir ci-dessous), ouvre son adresse dans Safari, touche le bouton **Partager** puis **Sur l'écran d'accueil**. L'icône de la glace licorne apparaît avec tes apps, et le jeu s'ouvre en plein écran.

### Mettre le jeu en ligne (GitHub Pages)

Dans le dépôt GitHub : **Settings → Pages → Build and deployment → Deploy from a branch**, choisis la branche et le dossier `/ (root)`. Le jeu sera ensuite à l'adresse `https://<utilisateur>.github.io/<nom-du-depot>/`.

Tout le jeu tient dans un seul fichier, `index.html` : graphismes dessinés en code, musique synthétisée, aucune image ni dépendance à installer. Seule la police pixel « Press Start 2P » est fournie à part, dans `fonts/` (licence libre SIL OFL, voir `fonts/OFL.txt`).

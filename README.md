# Barzoute Games Entertainment

## Glace Licorne

Une glace licorne en pixel art court de plateforme en plateforme en laissant derrière elle un arc-en-ciel. C'est un jeu de course sans stress, inspiré de Canabalt et de Nyan Cat : si tu tombes, un nuage te rattrape et te renvoie en l'air. La musique façon Mega Drive est générée en direct par un petit synthé FM.

### Jouer

Ouvre `index.html` dans un navigateur (Chrome, Safari…), sur téléphone ou sur ordinateur, puis choisis ton personnage : la glace licorne, le doudou cigogne, le doudou faune ou Douliam, le doudou en tricot.

- **Toucher l'écran** (ou Espace / flèche haut) : sauter. Garde le doigt appuyé pour sauter plus haut.
- **Toucher une 2e fois en l'air** : double saut.
- Ramasse les étoiles. Le bouton en haut à droite coupe le son ; P met en pause.

Sur iPhone, active le son de l'appareil : le bouton silencieux peut couper la musique.

### Les plateformes

Les plateformes changent de forme en route : grands blocs, petits blocs, longues avancées, plateformes qui flottent dans les airs (on peut sauter à travers par en dessous), plateformes qui montent et descendent en emportant le personnage, et petits escaliers.

### Deux modes de jeu

Sur l'écran titre, touche le bouton **MODE** pour choisir :

- **ZEN** : si tu tombes, un nuage te rattrape. On ne perd jamais.
- **DÉFI** : une chute et c'est game over ! (Pendant le passage des nuages entre deux mondes, le personnage avance en pilote automatique et ne peut pas perdre.) Le personnage fait une petite pirouette la tête en bas, puis un écran de fin joyeux s'affiche avec une fanfare, des confettis, ta distance et ton record. Touche **REJOUER** pour recommencer ou **MENU** pour revenir au choix du personnage.

Chaque mode garde son propre record.

### Les mondes

Tous les 100 m, un rideau de nuages traverse l'écran et le jeu passe au monde suivant. Un avion traverse ensuite le ciel avec une banderole au nom du nouveau monde, et la musique change.

1. **Monde des Glaces** : plateformes en sucreries, arc-en-ciel, pop sucrée.
2. **Voyage au Japon** : mont Fuji, pagode de Chureito, château de Himeji, forêt de bambous avec de petits torii, pétales de cerisier ; musique pentatonique avec koto et taiko.
3. **La Grosse Pomme** : Empire State Building, Chrysler Building, pont de Brooklyn, statue de la Liberté, châteaux d'eau ; musique jazzy-funky.
4. **Escale à Londres** : Big Ben et le Parlement, la London Eye, Tower Bridge, le dôme de St Paul, la Tamise, maisons colorées ; pop anglaise des années 60.
5. **Paris en émeute** (version dessin animé, sans blessés) : tour Eiffel, Opéra Garnier, Arc de Triomphe et Sacré-Cœur sous un ciel enfumé, panaches de fumée, voitures brûlées, barricades de palettes et de poubelles, vitrines protégées par des planches, braises qui s'envolent ; plateformes en toits de zinc, barricades et pavés ; valse musette nerveuse en mi mineur.
6. **Balade en Slovénie** : les Alpes juliennes et le Triglav enneigé, le lac de Bled couleur émeraude avec son île, son église et ses barques « pletna », le château de Bled sur sa falaise, une prairie avec des kozolec (séchoirs à foin) ; plateformes en kremšnita (le gâteau à la crème de Bled), en ruches peintes et en bois de kozolec ; polka alpine à l'accordéon.

À mi-parcours de chaque monde, un spectacle passe dans le décor (sans effet sur le jeu) :

- **Glaces** : une licorne traverse le ciel en laissant un grand arc-en-ciel.
- **Japon** : un monstre géant sort de terre et crache du feu.
- **New York** : un gorille géant tape sur sa poitrine en haut de l'Empire State Building.
- **Londres** : la reine salue la foule depuis le balcon de Buckingham Palace.
- **Paris** : une ligne de CRS avance au pas avec ses boucliers et lance des grenades de gaz lacrymogène, qui font de grands nuages blancs.
- **Slovénie** : le dragon de Ljubljana traverse le ciel, fait un looping et crache deux petites flammes.

Après le 6e monde, on repart au Monde des Glaces.

### Le niveau bonus : le Pays des Bonbons

Toutes les étoiles ramassées s'ajoutent à un trésor, partie après partie (le total s'affiche en haut à gauche de l'écran titre). À **1000 étoiles**, le niveau bonus se débloque et un bouton **BONUS** apparaît sur l'écran titre (touche B au clavier).

Le niveau bonus se joue en trois étapes, sur l'air de Tetris (« Korobeiniki », chanson populaire russe libre de droits, arrangée pour le jeu) :

1. **La pluie de bonbons** : ton personnage reste en bas ; garde le doigt à gauche ou à droite de l'écran pour te déplacer et attraper les bonbons (1 point) et les étoiles (3 points). Attention aux gros brocolis : « beurk », ils retirent 3 bonbons et figent le personnage un court instant. On ne peut pas perdre.
2. **À 100 bonbons**, grosse explosion de confettis, trois ballons apparaissent, comme dans le film « Là-haut », et on s'envole : garde le doigt appuyé pour monter, relâche pour redescendre, passe entre les sucres d'orge géants (ils font juste « bonk »), au-dessus d'une mer de nuages, et attrape les étoiles pendant 35 secondes.
3. **La fusée** : les ballons éclatent, une fusée arrive, ton doudou monte dedans (on ne voit plus que sa tête dans le hublot) et elle décolle vers la Lune. Fin du voyage : « Sur la Lune ! ».

Le niveau bonus reste rejouable à volonté.

Pour l'essayer sans attendre : ajoute `#bonus` à la fin de l'adresse du jeu, ou touche 5 fois de suite le numéro de version en haut à droite de l'écran titre. Ce déblocage de test ne change pas le vrai trésor et s'arrête quand on recharge la page.

### Ajouter l'icône sur l'écran d'accueil de l'iPhone

Une fois le jeu en ligne (voir ci-dessous), ouvre son adresse dans Safari, touche le bouton **Partager** puis **Sur l'écran d'accueil**. L'icône de la glace licorne apparaît avec tes apps, et le jeu s'ouvre en plein écran.

### Mettre le jeu en ligne (GitHub Pages)

Dans le dépôt GitHub : **Settings → Pages → Build and deployment → Deploy from a branch**, choisis la branche et le dossier `/ (root)`. Le jeu sera ensuite à l'adresse `https://<utilisateur>.github.io/<nom-du-depot>/`.

Tout le jeu tient dans un seul fichier, `index.html` : graphismes dessinés en code, musique synthétisée, aucune image ni dépendance à installer.

# Clé de signature de l'APK de test

`debug.keystore` signe l'APK de test publié dans la Release « App Android (test) ».
Toujours la même clé : une nouvelle version s'installe par-dessus l'ancienne, et les doudous,
l'achat (test) et les records restent dans le téléphone.

C'est une clé de **test** uniquement (mots de passe Android habituels : `android`).
Elle ne servira **pas** pour Google Play : la version des boutiques aura sa propre clé,
gardée secrète hors du dépôt.

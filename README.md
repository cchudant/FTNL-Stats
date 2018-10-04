# Graphique des serveurs du bot FTNL

J'ai fais ça en 4h le 03/10/18, je le mets opensource pour ceux qui sont interessés.
Comme je n'ai pas beaucoup pris de temps à faire ça mon code n'est absolument pas optimisé et peut effectuer des calculs intensifs (le json par exemple n'est absolument pas adapté pour ce genre d'utilisation)
Pour FTNL ce n'était pas un problème car 8500 messages ce n'est pas tant que ça et ça n'a posé aucun problème.

## Résultats

[Voir les résultats en ligne](https://plot.ly/~SkyBeastMC/0/#plot)

## Lancer la création du graphique

Tout d'abord installez les dépendences avec `npm install`.

Lancer les script dans cet ordre:
- `fetch.js` - Récupère tous les messages du channel #ajout-retrait du discord
- `extract.js` - Extrait les ajouts et retraits de ces messages
- `preprocess.js` - Calcule la somme cumulée afin de pouvoir afficher les résultats
- `display.js` - Crée un graph sur plotly

Pour `fetch.js`, la variable d'environnement `DISCORD_TOKEN` doit posséder le token d'un bot ayant accès en lecture au channel #ajout-retrait du discord.

Pour `display.js`, les variables d'environnement `PLOTLY_API_USER` et `PLOTLY_API_KEY` doivent posséder respectivement le nom et la clé d'api de votre utilisateur plotly.


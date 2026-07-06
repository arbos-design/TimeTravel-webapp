# TimeTravel Agency - Webapp Interactive

Webapp immersive pour une agence fictive de voyage temporel, realisee dans le cadre d'un TP M1/M2 Digital & IA.

Ce depot est la version individuelle a rendre. Il doit etre lance et deploye separement du site Vercel original.

## Stack technique

- Next.js 16, App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion pour les animations
- Lucide React pour les icones
- API route Next.js pour le chatbot
- Mistral AI en option pour les reponses IA

## Fonctionnalites implementees

- Page d'accueil immersive avec hero video et effets de vortex temporel
- Navigation responsive avec menu mobile
- Galerie de 3 destinations temporelles :
  - Cretace
  - Florence 1504
  - Paris 1889
- Cards et sections animees au scroll
- Page chatbot plein ecran : `/chat`
- Widget chatbot flottant sur le site
- Quiz de recommandation de destination
- Formulaire de reservation simule avec validation cote client
- Confirmation de reservation avec reference fictive
- Footer avec liens et mentions fictives

## Chatbot

Le chatbot est gere par la route API :

```bash
app/api/chat/route.ts
```

Fonctionnement :

- si `MISTRAL_API_KEY` est definie, le projet appelle l'API Mistral avec le modele `mistral-small-latest` ;
- si aucune cle n'est definie, le projet utilise un fallback local de demonstration ;
- aucune dependance technique a OpenAI, Groq, Anthropic ou Claude n'est integree dans le code d'execution actuel.

Le mode demo permet de lancer et tester le projet sans compte API.

## Outils IA et assets

- Code initial : projet genere/assiste via Bolt.new et Claude 3.5 Sonnet par l'ancien groupe.
- Chatbot runtime : Mistral AI uniquement si une cle API est fournie.
- Visuels et videos : assets generes pour le TP, stockes dans `public/images`.

Claude est donc une trace historique de production, pas une dependance technique du projet.

## Installation locale

Depuis PowerShell :

```powershell
cd C:\Users\gaell\Desktop\TimeTravel-webapp
npm install
```

Optionnel : creer un fichier `.env.local` a partir du modele :

```powershell
Copy-Item .env.example .env.local
```

Puis renseigner `MISTRAL_API_KEY` si vous voulez utiliser Mistral. Sans cle, le chatbot reste fonctionnel en mode demo.

## Commandes disponibles

Lancer le serveur de developpement :

```powershell
npm run dev
```

Ouvrir ensuite :

```bash
http://localhost:3000
```

Verifier le lint :

```powershell
npm run lint
```

Construire le projet pour la production :

```powershell
npm run build
```

Lancer le build de production localement apres `npm run build` :

```powershell
npm run start
```

## Variables d'environnement

Voir `.env.example`.

```env
MISTRAL_API_KEY=
```

Cette variable est optionnelle. Elle active les reponses Mistral dans le chatbot. Si elle est absente, l'API retourne des reponses locales de demonstration.

## Deploiement Render

Cette version individuelle devra etre deployee sur une nouvelle URL Render independante.

Le site Vercel original existe deja ici :

```bash
https://timetravelwebsite.vercel.app/
```

Cette URL correspond a une version existante du projet et ne doit pas etre utilisee comme URL de rendu individuel.

Configuration Render recommandee :

- Environment : Node
- Build Command : `npm install && npm run build`
- Start Command : `npm run start`
- Variable optionnelle : `MISTRAL_API_KEY`

Si `MISTRAL_API_KEY` n'est pas configuree sur Render, le chatbot utilisera le mode demo local.

## Contexte pedagogique

Projet pedagogique M1/M2 autour d'une experience web interactive enrichie par des contenus generes avec IA. Les destinations, tarifs et mentions legales sont fictifs.

# 🚀 INSTRUCTIONS DE DÉPLOIEMENT - Site Débouchage Tours

## ✅ ÉTAPE 1 : Vérification des fichiers

Voici la structure de ton site :

```
site-tours/
├── index.html
├── contact.html
├── mentions-legales.html
├── politique-confidentialite.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── (à ajouter)
```

## 📸 ÉTAPE 2 : Ajouter les images

Ajoute ces fichiers dans le dossier `images/` :

- Logo Artiserv Débouchage.png
- Artiserv débouchage logo blanc.png
- debouchage-canalisation.jpg
- curage-canalisation.jpg
- inspection-video.jpg
- pompage-fosse.jpg

## 📧 ÉTAPE 3 : Configurer Formspree

1. Va sur https://formspree.io
2. Crée un compte gratuit
3. Crée un nouveau formulaire "Contact Tours"
4. Récupère ton Form ID (ex: mrgwabcd)
5. Dans `contact.html`, ligne 138, modifie :

```html
<!-- AVANT -->
<form class="contact-form" id="contactForm">

<!-- APRÈS -->
<form class="contact-form" id="contactForm" action="https://formspree.io/f/TON_FORM_ID" method="POST">
```

## 💾 ÉTAPE 4 : GitHub

1. Va sur https://github.com
2. Clique "Sign Up" et crée un compte
3. Clique "New repository"
4. Nom : `debouchage-tours`
5. Public
6. Ne coche PAS "Initialize with README"
7. Crée le repo

8. Sur ton ordinateur :
```bash
cd dossier-du-site
git init
git add .
git commit -m "Premier déploiement site Tours"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/debouchage-tours.git
git push -u origin main
```

## ☁️ ÉTAPE 5 : Cloudflare Pages

1. Va sur https://pages.cloudflare.com
2. Crée un compte (gratuit)
3. Clique "Create a project"
4. Connecte GitHub
5. Sélectionne ton repo `debouchage-tours`
6. Build settings :
   - Framework preset : None
   - Build command : (laisse vide)
   - Build output : / (racine)
7. Clique "Save and Deploy"

**Ton site est en ligne ! 🎉**

URL temporaire : `debouchage-tours.pages.dev`

## 🌐 ÉTAPE 6 : Configurer le nom de domaine

### Acheter le domaine

1. Va sur https://www.ovhcloud.com/fr/domains/
2. Recherche `debouchage-tours.fr`
3. Si disponible : Achète-le (~10€/an)

### Configurer le DNS

1. Dans Cloudflare Pages, onglet "Custom domains"
2. Clique "Set up a custom domain"
3. Entre : `debouchage-tours.fr`
4. Cloudflare te donne des serveurs DNS (nameservers)
5. Va dans ton compte OVH
6. Dans les paramètres du domaine
7. Remplace les DNS par ceux de Cloudflare
8. Attends 24-48h pour la propagation

**C'est fait ! Ton site est accessible sur debouchage-tours.fr 🚀**

## 🔧 Modifications futures

Pour modifier le site :
1. Modifie les fichiers localement
2. `git add .`
3. `git commit -m "Description des modifications"`
4. `git push`
5. Cloudflare déploie automatiquement !

## 📞 Aide

Si tu as besoin d'aide, contacte-moi avec les détails de l'étape bloquante.

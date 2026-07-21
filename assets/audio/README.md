# 🎵 Dossier Audio - RPG Quest Master

Ce dossier contient tous les fichiers audio utilisés dans le jeu RPG Quest Master.

## 📁 Structure

```
assets/audio/
├── bgm.mp3              # Musique de fond (boucle)
├── quest_complete.mp3   # Son quête complétée
├── level_up.mp3         # Son montée de niveau
├── click.mp3            # Son clic/interaction
└── README.md            # Ce fichier
```

## 🎶 Fichiers Audio Requis

### 1. **bgm.mp3** - Musique de Fond
- **Type**: Musique ambiante épique
- **Format**: MP3 (compatible navigateur)
- **Durée**: 2-5 minutes (avec boucle)
- **Tempo**: Modéré (100-120 BPM)
- **Mood**: Fantasy/RPG épique

**Recommandations**:
- Musique libre de droits de sites comme:
  - [Incompetech](https://incompetech.com/) 🎵
  - [FreePD](https://freepd.com/) 🎵
  - [YouTube Audio Library](https://www.youtube.com/audiolibrary/) 🎵
  - [Pixabay Music](https://pixabay.com/music/) 🎵

### 2. **quest_complete.mp3** - Son Quête Complétée
- **Type**: Effet sonore positif
- **Format**: MP3
- **Durée**: 0.5-1 seconde
- **Mood**: Victoire/Succès

**Recommandations**:
- Son "jingle" positif
- Volume moyen
- Pas trop long pour ne pas être intrusif

### 3. **level_up.mp3** - Son Montée de Niveau
- **Type**: Effet sonore spécial
- **Format**: MP3
- **Durée**: 1-2 secondes
- **Mood**: Excitation/Réussite

**Recommandations**:
- Son "power up" ou "level up"
- Plus élevé que les autres sons
- Peut être une progression de notes

### 4. **click.mp3** - Son Clic/Interaction
- **Type**: Effet sonore léger
- **Format**: MP3
- **Durée**: 0.2-0.5 seconde
- **Mood**: Neutre/Interaction

**Recommandations**:
- Son léger et court
- Volume bas
- Style: "bip" ou "click"

## 🔧 Comment Ajouter les Fichiers Audio

### Étape 1: Télécharger les Fichiers
1. Visitez un des sites recommandés ci-dessus
2. Téléchargez 4 fichiers audio en format MP3
3. Renommez-les selon la structure ci-dessus

### Étape 2: Placer dans le Dossier
1. Placez les fichiers dans `assets/audio/`
2. Structure finale:
```
rpg-multiplayer-system/
└── assets/
    └── audio/
        ├── bgm.mp3
        ├── quest_complete.mp3
        ├── level_up.mp3
        └── click.mp3
```

### Étape 3: Tester
1. Ouvrez `index.html` dans un navigateur
2. Le jeu devrait jouer la musique automatiquement
3. Complétez une quête pour tester les sons

## 🎚️ Conversion de Format (si besoin)

Si vous avez des fichiers en WAV, OGG ou autres formats:

### Avec FFmpeg (ligne de commande)
```bash
ffmpeg -i input.wav -codec:a libmp3lame -q:a 4 output.mp3
ffmpeg -i input.ogg -codec:a libmp3lame -q:a 4 output.mp3
```

### Avec un convertisseur en ligne
- [Online Convert](https://online-convert.com/) 🔄
- [CloudConvert](https://cloudconvert.com/) 🔄
- [Zamzar](https://www.zamzar.com/) 🔄

## 📊 Recommandations Techniques

| Propriété | Valeur |
|-----------|--------|
| **Format** | MP3 |
| **Bitrate** | 128-192 kbps |
| **Sample Rate** | 44100 Hz |
| **Channels** | Stéréo (2) |
| **Taille Maximale** | 5-10 MB par fichier |

## 🔊 Volume de Contrôle

Dans `index.html` (ligne 11), vous pouvez ajuster:
```html
<audio id="bgm" loop volume="0.3">
    <!-- 0.0 = silencieux, 1.0 = maximum -->
    <!-- Actuellement à 0.3 (30%) -->
</audio>
```

## 🚫 Problèmes Courants

### ❌ Le son ne fonctionne pas
- **Solution 1**: Vérifiez que les fichiers sont en MP3
- **Solution 2**: Vérifiez le chemin: `assets/audio/`
- **Solution 3**: Vérifiez les permissions de fichier

### ❌ La musique ne boucle pas
- **Solution**: Assurez-vous que `loop` est présent dans la balise `<audio>`

### ❌ Les sons sont trop forts/faibles
- **Solution**: Modifiez l'attribut `volume` dans `index.html` (0.0 à 1.0)

### ❌ Erreur CORS (si hébergé en ligne)
- **Solution**: Les fichiers doivent être sur le même serveur que le HTML

## 📚 Ressources Libres de Droits Complètes

### Musique Gratuite
- 🎵 [OpenGameArt](https://opengameart.org/) - Spécialisé jeux
- 🎵 [Bensound](https://www.bensound.com/) - Musique épique
- 🎵 [Purple Planet](https://www.purple-planet.com/) - RPG/Fantasy

### Effets Sonores Gratuits
- 🔊 [Freesound](https://freesound.org/) - 500k+ sons
- 🔊 [Zapsplat](https://www.zapsplat.com/) - Effets gratuits
- 🔊 [OpenGameArt](https://opengameart.org/) - Sons jeux

## 💡 Conseils Pro

1. **Testez avant de pushé** - Écoutez les sons localement d'abord
2. **Respectez les licences** - Vérifiez CC0, CC-BY, ou domaine public
3. **Optimisez les fichiers** - Compressez pour charger plus vite
4. **Mixez les volumes** - Que la musique ne domine pas les effets
5. **Créez votre propre** - Utilisez des DAW gratuits comme:
   - [Audacity](https://www.audacityteam.org/) 🎚️
   - [LMMS](https://lmms.io/) 🎹
   - [MuseScore](https://musescore.org/) 🎼

## 📝 Attribution (si requis)

Si vous utilisez des sons avec attribution CC-BY, créez un fichier `ATTRIBUTION.md`:

```markdown
## Attributions Audio

- **bgm.mp3**: [Artiste] - [Titre] - [Licence]
- **quest_complete.mp3**: [Source] - CC0
- **level_up.mp3**: [Source] - CC-BY
- **click.mp3**: [Source] - Domaine public
```

## 🎮 Intégration dans le Jeu

Le jeu charge les sons automatiquement via:

```javascript
// Dans script.js
const soundSystem = new SoundSystem();

// Jouer la musique
soundSystem.playBGM();

// Jouer des effets
soundSystem.playSound('quest_complete');
soundSystem.playSound('level_up');
soundSystem.playSound('click');

// Toggle son on/off
soundSystem.toggle();
```

---

**Bon courage pour trouver les parfaits sons RPG ! 🎵✨**

*Last updated: 2026-07-21*

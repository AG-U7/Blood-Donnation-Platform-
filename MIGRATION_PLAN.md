# SangVie - Migration React vers Flutter

## 📋 Résumé du Projet

**Nom**: SangVie - Le réseau solidaire de don de sang  
**Objectif**: Transformer l'application web React/TypeScript en application mobile Flutter

### Rôles Utilisateurs Identifiés
1. **Public** - Page d'accueil, connexion/inscription
2. **Donneur** - Feed d'urgences, carte, historique, profil
3. **Hôpital** - Tableau de bord, demandes, statistiques, carte, profil
4. **Administrateur** - Tableau de bord, gestion hôpitaux, utilisateurs, rapports

---

## 📱 Structure Flutter Proposed

```
lib/
├── main.dart
├── app/
│   ├── app.dart                 # Application principale
│   └── router.dart              # Configuration GoRouter
├── core/
│   ├── constants/
│   │   ├── app_colors.dart      # Couleurs (#CC0000, #1A7A3F, etc.)
│   │   ├── app_typography.dart  # Styles de texte DM Sans
│   │   └── app_strings.dart    # Textes statiques
│   ├── theme/
│   │   └── app_theme.dart       # ThemeData Flutter
│   └── utils/
│       └── extensions.dart      # Extensions utilitaires
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── models/
│   │   │   └── repositories/
│   │   ├── presentation/
│   │   │   ├── pages/
│   │   │   │   ├── login_page.dart
│   │   │   │   ├── register_page.dart
│   │   │   │   └── forgot_password_page.dart
│   │   │   └── widgets/
│   │   └── providers/
│   ├── donor/
│   │   ├── data/
│   │   ├── presentation/
│   │   │   ├── pages/
│   │   │   │   ├── donor_feed_page.dart
│   │   │   │   ├── donor_map_page.dart
│   │   │   │   ├── donor_history_page.dart
│   │   │   │   └── donor_profile_page.dart
│   │   │   └── widgets/
│   │   └── providers/
│   ├── hospital/
│   │   ├── data/
│   │   ├── presentation/
│   │   │   ├── pages/
│   │   │   │   ├── hospital_dashboard_page.dart
│   │   │   │   ├── hospital_requests_page.dart
│   │   │   │   ├── hospital_stats_page.dart
│   │   │   │   ├── hospital_map_page.dart
│   │   │   │   └── hospital_profile_page.dart
│   │   │   └── widgets/
│   │   └── providers/
│   ├── admin/
│   │   ├── data/
│   │   ├── presentation/
│   │   │   ├── pages/
│   │   │   │   ├── admin_dashboard_page.dart
│   │   │   │   ├── admin_hospitals_page.dart
│   │   │   │   ├── admin_users_page.dart
│   │   │   │   └── admin_reports_page.dart
│   │   │   └── widgets/
│   │   └── providers/
│   └── home/
│       ├── presentation/
│       │   ├── pages/
│       │   │   ├── splash_page.dart
│       │   │   └── home_page.dart
│       └── widgets/
├── shared/
│   ├── widgets/
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── inputs/
│   │   ├── badges/
│   │   └── loaders/
│   └── layouts/
│       ├── public_layout.dart
│       ├── donor_layout.dart
│       ├── hospital_layout.dart
│       └── admin_layout.dart
├── services/
│   ├── firebase_service.dart
│   ├── auth_service.dart
│   ├── location_service.dart
│   └── notification_service.dart
└── l10n/
    ├── app_fr.arb
    └── app_en.arb
```

---

## 🔄 Correspondance React → Flutter

### Composants UI à Migrer

| React (Shadcn) | Flutter |
|----------------|---------|
| Button | ElevatedButton / Custom Button Widget |
| Card | Card / Container |
| Input | TextField |
| Badge | Chip / Custom Badge Widget |
| Dialog | AlertDialog / Modal Bottom Sheet |
| Sheet (Drawer) | Drawer / BottomSheet |
| Select | DropdownButton / Custom Picker |
| Switch | Switch |
| Tabs | TabBar |
| Avatar | CircleAvatar |
| Progress | LinearProgressIndicator / CircularProgressIndicator |
| Table | DataTable |
| Calendar | TableCalendar |
| Carousel | CarouselSlider |
| Toast (Sonner) | SnackBar / Fluttertoast |

### Libraries à Utiliser

| Catégorie | Package Flutter |
|-----------|-----------------|
| State Management | provider, flutter_riverpod |
| Navigation | go_router |
| Firebase | firebase_core, firebase_auth, cloud_firestore, firebase_messaging |
| Maps | google_maps_flutter |
| HTTP | dio, http |
| Local Storage | shared_preferences, flutter_secure_storage |
| Icons | lucide_icons (ou flutter_svg) |
| Animations | animations, flutter_animate |
| Internationalization | flutter_localizations, intl |
| Forms | reactive_forms |
| Image Handling | cached_network_image, image_picker |
| Date/Time | intl |
| Charts | fl_chart |
| Geolocator | geolocator, geocoding |

---

## 📝 Étapes de Migration

### Phase 1: Setup & Configuration
- [ ] 1.1 Créer nouveau projet Flutter: `flutter create sangvie`
- [ ] 1.2 Configurer pubspec.yaml avec toutes les dépendances
- [ ] 1.3 Configurer Firebase (Android/iOS)
- [ ] 1.4 Mettre en place le thème global (couleurs, typographie)
- [ ] 1.5 Configurer GoRouter pour la navigation

### Phase 2: Shared Components
- [ ] 2.1 Créer les couleurs globales (#CC0000, #1A7A3F, etc.)
- [ ] 2.2 Créer la typographie DM Sans
- [ ] 2.3 Créer les layouts partagés (Public, Donor, Hospital, Admin)
- [ ] 2.4 Créer les widgets réutilisables (Button, Card, Input, Badge)

### Phase 3: Authentication
- [ ] 3.1 Page Splash avec animation
- [ ] 3.2 Page Login (UnifiedLogin.tsx)
- [ ] 3.3 Page Register (Register.tsx)
- [ ] 3.4 Page Forgot Password (ForgotPassword.tsx)
- [ ] 3.5 Intégration Firebase Auth

### Phase 4: Donor Features
- [ ] 4.1 DonorLayout avec bottom navigation
- [ ] 4.2 DonorFeed avec liste des demandes d'urgence
- [ ] 4.3 Modal de détail de demande (répondre à une urgence)
- [ ] 4.4 Toggle statut donneur (actif/inactif)
- [ ] 4.5 DonorMap (carte des hôpitaux)
- [ ] 4.6 DonorHistory (historique des dons)
- [ ] 4.7 DonorProfile

### Phase 5: Hospital Features
- [ ] 5.1 HospitalLayout avec sidebar et bottom nav
- [ ] 5.2 HospitalDashboard avec statistiques
- [ ] 5.3 HospitalRequests (liste + création demandes)
- [ ] 5.4 Modal nouvelle demande (groupe sanguin, quantité, urgence)
- [ ] 5.5 HospitalStats (graphiques)
- [ ] 5.6 HospitalMap
- [ ] 5.7 HospitalProfile

### Phase 6: Admin Features
- [ ] 6.1 AdminLayout avec sidebar sombre
- [ ] 6.2 AdminDashboard (stats globales)
- [ ] 6.3 Liste hôpitaux en attente validation
- [ ] 6.4 AdminUsers (gestion utilisateurs)
- [ ] 6.5 AdminReports (rapports, logs)

### Phase 7: Services & Backend
- [ ] 7.1 Firebase Auth Service
- [ ] 7.2 Firestore Data Models
- [ ] 7.3 Location Service
- [ ] 7.4 Push Notifications (Firebase Cloud Messaging)
- [ ] 7.5 API Integration si backend externe

### Phase 8: Internationalisation
- [ ] 8.1 Configurerflutter_localizations
- [ ] 8.2 Fichiers ARB pour FR et EN
- [ ] 8.3 Implémenter le changement de langue

### Phase 9: Finalisation
- [ ] 9.1 Animations et transitions
- [ ] 9.2 Gestion des erreurs
- [ ] 9.3 Loading states
- [ ] 9.4 Tests
- [ ] 9.5 Build Android/iOS

---

## 🎨 Design Tokens à Recréer

### Couleurs Principales
```dart
// Couleurs du projet
static const Color primaryRed = Color(0xFFCC0000);      // #CC0000 - Sang
static const Color successGreen = Color(0xFF1A7A3F);   // #1A7A3F - Succès
static const Color warningOrange = Color(0xFFD4720B);  // #D4720B - Attention
static const Color textPrimary = Color(0xFF111111);    // #111111 - Texte principal
static const Color textSecondary = Color(0xFF444444); // #444444 - Texte secondaire
static const Color textTertiary = Color(0xFF888888);   // #888888 - Texte tertiary
static const Color border = Color(0xFFE0E0E0);         // #E0E0E0 - Bordures
static const Color background = Color(0xFFF9F9F9);     // #F9F9F9 - Arrière-plan
static const Color surface = Color(0xFFFFFFFF);        // #FFFFFF - Surface
```

### Typographie (DM Sans)
- H1: 32-40px, Bold
- H2: 20-24px, SemiBold
- Body: 14-16px, Regular
- Small: 12px, Regular
- Caption: 10px, Regular

### Badge Variants
- Critical: Red background (#CC0000)
- Moderate: Orange background (#D4720B)
- Low: Green background (#1A7A3F)
- Active/Pending: Various states

---

## 📊 Données à Migrer

### Models Firestore Proposés

```
users/
  {userId}/
    - email
    - name
    - phone
    - bloodType (A+, A-, B+, B-, O+, O-, AB+, AB-)
    - role (donor, hospital, admin)
    - isActive (bool)
    - createdAt
    - profileImageUrl

hospitals/
  {hospitalId}/
    - name
    - email
    - phone
    - address
    - region
    - latitude
    - longitude
    - isValidated (bool)
    - createdAt

bloodRequests/
  {requestId}/
    - hospitalId
    - hospitalName
    - bloodType
    - quantity
    - urgency (critical, moderate, low)
    - description
    - status (active, fulfilled, cancelled)
    - createdAt
    - fulfilledAt

donations/
  {donationId}/
    - donorId
    - hospitalId
    - bloodType
    - quantity
    - status
    - donatedAt
```

---

## ⚠️ Points d'Attention

1. **Cartes (Maps)**: Google Maps Flutter nécessite une clé API
2. **Notifications**: Firebase Cloud Messaging nécessite une configuration supplémentaire
3. **Auth**:Gérer la persistence et la récupération de mot de passe
4. **Géolocalisation**: Demander les permissions sur iOS/Android
5. **Mode hors ligne**: Considérer Firebase Offline Capabilities
6. **Animations**: Les animations Motion React peuvent être répliquées avec flutter_animate

---

## 📦 Commandes de Setup

```bash
# Créer le projet
flutter create sangvie --org com.sangvie

# Dépendances principales
flutter pub add provider go_router firebase_core firebase_auth cloud_firestore
flutter pub add google_maps_flutter geolocator
flutter pub add flutter_localizations intl
flutter pub add shared_preferences flutter_secure_storage
flutter pub add fl_chart cached_network_image
flutter pub add lucide_icons flutter_animate

# Générer code
flutter gen-l10n
```

---

*Document généré pour la migration SangVie React → Flutter*
*Date: Mars 2025*


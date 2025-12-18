# OLX - Aplikacja Ogłoszeń

## Opis projektu

Aplikacja webowa inspirowana platformą OLX, umożliwiająca użytkownikom wystawianie, przeglądanie, edycję oraz zakup produktów. System posiada pełną funkcjonalność zarządzania użytkownikami z rejestracją, logowaniem oraz zabezpieczeniem hasłem.

## Funkcjonalności

### Zarządzanie użytkownikami
- **Rejestracja użytkownika** - tworzenie nowego konta z walidacją hasła (musi zawierać co najmniej jeden numer i jeden znak specjalny)
- **Logowanie** - bezpieczne logowanie z haszowaniem hasła (bcrypt)
- **Wylogowanie** - zakończenie sesji użytkownika
- **Przeglądanie produktów użytkownika** - wyświetlanie wszystkich produktów wystawionych przez danego użytkownika

### Zarządzanie produktami
- **Dodawanie nowego produktu** - wystawianie ogłoszenia z nazwą, ceną i opisem
- **Edycja produktu** - modyfikacja istniejących ogłoszeń
- **Usuwanie produktu** - kasowanie ogłoszeń
- **Przeglądanie wszystkich produktów** - strona główna z listą wszystkich dostępnych produktów
- **Sortowanie produktów** - sortowanie ogłoszeń według wybranego kryterium
- **Zakup produktu** - proces zakupu z formularzem płatności (adres, dane karty)

### Funkcje dodatkowe
- **Walidacja danych** - sprawdzanie poprawności danych wejściowych
- **Dynamiczne widoki** - renderowanie stron z wykorzystaniem EJS

## Instrukcja instalacji i uruchomienia

### Wymagania
- **Node.js** (wersja 14 lub nowsza)
- **MongoDB** (lokalna instancja lub MongoDB Atlas)
- **npm** (Node Package Manager)

### Instalacja

1. **Sklonuj repozytorium lub pobierz projekt**
   ```bash
   git clone <adres-repozytorium>
   cd olx
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Skonfiguruj bazę danych**
   - Zobacz docker.txt

4. **Uruchom aplikację**
   ```bash
   npm start
   ```

5. **Otwórz w przeglądarce**
   ```
   http://localhost:3000
   ```

## Lista endpointów

### Endpointy użytkownika

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/` | Strona główna z listą wszystkich produktów |
| GET | `/register` | Formularz rejestracji |
| POST | `/register` | Rejestracja nowego użytkownika |
| GET | `/login` | Formularz logowania |
| POST | `/login` | Logowanie użytkownika |
| GET | `/logout` | Wylogowanie użytkownika |
| GET | `/userProducts/:slug` | Produkty konkretnego użytkownika |
| GET | `/buy/:slug` | Strona zakupu produktu |
| POST | `/buy/:slug` | Przetwarzanie zakupu produktu |

### Endpointy produktów

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/newProduct/:slug` | Formularz dodawania nowego produktu |
| POST | `/newProduct/:slug` | Dodanie nowego produktu |
| GET | `/editProduct/:slug` | Formularz edycji produktu |
| POST | `/editProduct/:slug` | Aktualizacja produktu |
| POST | `/delete/:slug` | Usunięcie produktu |
| POST | `/sort/:slug` | Sortowanie listy produktów |

### Parametry

- `:slug` - identyfikator użytkownika (username) lub produktu (ObjectId)

## Technologie

### Backend
- **Node.js** - środowisko uruchomieniowe JavaScript
- **Express.js** - framework webowy
- **MongoDB** - baza danych NoSQL
- **Mongoose** - ODM dla MongoDB

### Bezpieczeństwo i sesje
- **bcrypt** - haszowanie haseł
- **express-session** - zarządzanie sesjami użytkowników

### Frontend
- **EJS** - silnik szablonów
- **HTML/CSS** - struktura i stylizacja
- **JavaScript** - interakcje po stronie klienta

## Autorzy

- **Julian Lach**
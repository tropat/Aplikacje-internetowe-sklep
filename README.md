# Projektowanie aplikacji internetowych — projekt nr 3
## Aplikacja sklepowa

### Wizja projektu:
Aplikacja sklepowa, będąca trzecim projektem z Projektowania Aplikacji Internetowych, ma na celu stworzenie platformy, łączącej klientów, sklep oraz dostawców w jednym ekosystemie. Aplikacja ta umożliwi klientom łatwe przeglądanie i zamawianie produktów, a także zlecenie przesyłek z magazynu przez sklep do zatrudnionych dostawców, którzy będą efektywnie zarządzać zleconymi dostawami. Projekt ten zostanie zrealizowany przy użyciu Node.js, Express.js, React oraz mikroserwisów.

### Cele projektu:
- Utworzenie intuicyjnych interfejsów użytkownika dla klientów i dostawców umożliwiających przeglądanie produktów, składanie zamówień oraz zarządzanie dostawami.
- Implementacja trzech mikroserwisów: sklepu, magazynu i systemu logowania, które będą odpowiedzialne za różne aspekty funkcjonalności aplikacji.
- Stworzenie bezpiecznego mechanizmu uwierzytelniania i autoryzacji opartego na tokenach JWT, zapewniającego poufność danych użytkowników.
- Wykorzystanie biblioteki React do budowy responsywnego i estetycznego interfejsu użytkownika.
- Integracja narzędzi takich jak Node.js, Express.js i Sequelize w celu stworzenia skalowalnej oraz wydajnej aplikacji internetowej.

### Funkcje projektu:

Frontend dla klientów:
- Przeglądanie katalogu produktów: Klienci będą mogli przeglądać produkty dostępne w sklepie.
- Dodawanie produktów do koszyka: Możliwość dodawania wybranych produktów do koszyka zakupowego oraz zarządzanie zawartością koszyka.
- Zamówienia: Dokonywanie zamówień na podstawie zawartości koszyka – przetwarzanie danych dotyczących płatności będzie symulowane
- Historia zamówień: Klienci będą mieli dostęp do historii swoich zamówień, wraz z informacjami o statusie dostawy itp.

Frontend dla dostawców:
- Lista paczek do załadowania: Dostawcy będą mieli dostęp do listy paczek do załadowania do pojazdów dostawczych wraz z informacjami o adresach.
- Status dostawy: Możliwość potwierdzania pobrania paczek, zmiany statusu oraz ich dostawy do klientów.

Mikroserwis sklepu:
- Obsługa zamówień: Zlecanie przesyłek do wysyłki na magazynie.
- Obsługa produktów: Aktualizacja ilości produktów w stosunku do tego, co jest w magazynie, przekazywanie informacji o dostępnych produktach

Mikroserwis magazynu:
- Zarządzanie zapasami: Monitorowanie stanu magazynowego, aktualizacja ilości produktów w magazynie, zarządzanie dostawami itp.

Mikroserwis logowania:
- Rejestracja i logowanie użytkowników: Obsługa procesu rejestracji nowych użytkowników oraz uwierzytelnianie istniejących użytkowników.
- Bezpieczeństwo danych: Zapewnienie poufności wrażliwych danych poprzez stosowanie szyfrowania oraz autoryzacji na poziomie użytkownika.

### Planowane narzędzia i pakiety do implementacji:
- Node.js v20 i Express.js v4.18: Do budowy backendu aplikacji oraz implementacji mikroserwisów.
- Sequelize v6 z SQLite3 v5.1: Jako sterownik bazodanowy do obsługi relacyjnej bazy danych.
- React v18.2: Do tworzenia interaktywnych interfejsów użytkownika oraz renderowania stron frontendowych.
- Biblioteka obsługujące autentykację JWT: do zapewnienia bezpiecznego uwierzytelniania i autoryzacji użytkowników.

### Struktura bazy danych:
Mikroserwis logowania
```
Tabela Users:
id(pk) - INTEGER, username - VARCHAR, password(hashed) - VARCHAR, role - VARCHAR
```
Mikroserwis sklepu
```
Tabela Products:
id(pk) - INTEGER, name - VARCHAR, description - TEXT, price - float, quantity - INTEGER
```
```
Tabela Orders:
id(pk) - INTEGER, user_id - INTEGER, products - TEXT(np. “3,4,1”), total_amount - FLOAT, address - VARCHAR,  datetime - DATETIME, order_status - VARCHAR
```

Mikroserwis magazynu

```
Tabela Products: (Identyfikatory produktów w bazie magazynu pokrywają się z tabelą w bazie sklepu)
id(pk) - INTEGER, name - VARCHAR,  quantity - INTEGER
```
```
Tabela Packages:
id(pk) - INTEGER, products - TEXT(np. “3,4,1”), address - VARCHAR, deliverer_id - INTEGER, delivery_status -VARCHAR
```

### Endpointy:

Mikroserwis logowania:

- POST /users 

  BODY {username, password}

  RESPONSE {status}
- GET /users/:id

  RESPONSE {id, username}

- GET /users/login

  BODY {username, password}

  RESPONSE {token}

### Mikroserwis sklepu:
- GET /products

  RESPONSE {list:  [{id,  name, description, price, quantity}, …] }

- GET /products/:id

  RESPONSE {id,  name, description, price, quantity}

- GET /orders/:user_id

  RESPONSE {list: [{id, user_id, products, total_amount, address,  datetime, order_status}, …]}

- GET /orders/:id

  RESPONSE {id, user_id, products, total_amount, address,  datetime, order_status}

- POST /orders

  BODY {username, products, address}

  RESPONSE {id, username, products, total_amount, address,  datetime, order_status}

### Mikroserwis magazynu:
- GET /products/:id

  RESPONSE {id, name, quantity}

- POST /orders

  BODY {products, address}

  RESPONSE {id, products, address, order_status}

- GET /orders

  RESPONSE {list: [{id, products, address, order_status}, …]}

- GET /orders/:id

  RESPONSE {id, products, address, order_status}

- PUT /orders/:id

  BODY {order_status}

  RESPONSE {status}

### Routing
Frontend dla klientów:

Logowanie, rejestracja, produkty, koszyk, płatności, historia zamówień
- /login
- /register
- /products
- /products/:id
- /cart
- /payment
- /orders

Frontend dla dostawców:

Logowanie, rejestracja, przesyłki, odebrane przesyłki
- /login
- /register
- /packages
- /my_packages

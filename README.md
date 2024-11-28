VAII Cvičenie 10

Momentálne je otvorená vetva __MAIN__, ktorá obsahuje _štartér_. Riešenie obsahuje vetva __SOLUTION__.

## Čet

Vytvorte SPA aplikáciu na četovanie medzi používateľmi. Čítať a posielať správy bude možné až po prihlásení. Poslať sa bude dať
dva druhy správ: verejné a súkromné (privátne). Verejné správy budú vidieť všetci používatelia četu. Privátne správy je možné poslať konkrétnemu
adresátovi a navyše len tomu, ktorý je aktívny (vykonal nejakú činnosť za posledných 30 sekúnd).

1. Dáta pre aplikáciu sme vytvorili na predošlom cvičení. Spustite všetky testy, aby ste sa presvedčili, že _backend_ aplikácie je plne funkčný.
2. Pozrite si súbory `App\Views\Home\index.view.php` a všetky súbory v adresári `public\js`. Aplikáciu sme čiastočne vytvorili, pretože jej rozsah nie je možné
   zvládnuť počas jedného cvičenia. 
3. Vašou úlohou bude implementovať chýbajúce metódy v JS triedach `DataService`, `MessagesAPI` a `Chat`.
    1. Začnite metódou `sendRequest()` v triede `DataService`. Jej úlohou je komunikovať s backend časťou aplikácie. Metóda bude slúžiť na:
       - získavanie a posielanie dát na server
       - ak návratový stavový kód nie je zhodný s očakávaným (`responseCode`), vráti chybu z parametra `onErrorReturn`
       - ak je návratová kód rovný `204`, vráti true
       - ak nenastane chyba, vráti prijaté dáta
       - ak nastane chyba, vyhodí výnimku a vráti v nej hodnotu `onErrorReturn`.  
    2. Prezrite si, ako sa táto metóda využíva v triede `AuthAPI`. Podobným spôsobom implementujte chýbajúce metódy v triede `MessagesAPI`.
    3. Implementujte metódu `getActiveUsers()` v triede `Chat`. Úlohou metódy bude získavať zoznam aktívnych používateľov z backendu, aby ste vedeli, ktorým
       používateľom môžete poslať privátnu správu. Používateľov vložte do pripraveného elementu s id `active`. Po kliknutí na meno používateľa sa jeho meno
       prekopíruje do poľa adresáta správy a umožní poslať mu privátnu správu.
    4. Implementujte metódu `getMessages()` v triede `Chat`. Metóda získa všetky správy četu a zobrazí ich v elemente s id `message_rows`. Každá správa bude
       predstavovať jeden riadok tabuľky, skladajúci sa zo stĺpcov dátum a čas, adresát a text správy. Ak je správa privátna, zobrazí sa celý riadok s iným
       farebným pozadím.

## Ako nájdem vetvu môjho cvičenia?

Pokiaľ sa chcete dostať k postupu riešenia cvičenia, je potrebné otvoriť si príslušnú _vetvu_, ktorej názov sa skladá:

__MIESTNOST__ + "-" + __HODINA ZAČIATKU__ + "-" + __DEN__

Ak teda navštevujete cvičenie pondelok o 08:00 v RA323, tak sa vaša vetva bude volať: __RA323-08-PON__

# Použitý framework

Cvičenie používa framework vaííčko dostupný v repozitári [https://github.com/thevajko/vaiicko](https://github.com/thevajko/vaiicko). Pre úspešné riešenie
projektu je potrebné spustiť docker konfiguráciu zo súboru `docker\docker-compose.yml`.  
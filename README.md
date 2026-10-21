# profil-okna.com.pl

Statyczna strona firmy Profil (Płock) zbudowana w [Astro](https://astro.build). Zastępuje WordPressa z Elementorem: gotowa strona to czyste pliki HTML/CSS, bez bazy danych i wtyczek.

## Praca lokalna

```bash
npm install
npm run dev        # podgląd na http://localhost:4321
npm run build      # gotowa strona w folderze dist/
```

## Gdzie co zmieniać

| Co | Plik |
| --- | --- |
| Telefon, e-mail, adres, Facebook, menu | `src/data/site.ts` |
| Kategorie oferty, produkty, opisy, zdjęcia | `src/data/oferta.ts` |
| Logotypy producentów | `src/data/partners.ts` |
| Strona główna | `src/pages/index.astro` |
| Kolory, typografia, wygląd | `src/styles/global.css` |
| Adres, na który przychodzą zapytania z formularza | `public/kontakt.php` (stała `RECIPIENT`) |

## Zdjęcia

Oryginały leżą w `_tresci/obrazy/`. Po dodaniu zdjęcia i wpisaniu go w `src/data/oferta.ts`
jako `img('nazwa-pliku-bez-rozszerzenia')` uruchom:

```bash
node scripts/images.mjs
```

Skrypt zmniejszy zdjęcia, zapisze je jako WebP w `public/img/` i wypisze brakujące pliki.

## Publikacja

1. `npm run build`
2. Wgraj **zawartość** folderu `dist/` (razem z ukrytym plikiem `.htaccess`) przez FTP do katalogu domeny.
3. Formularz wymaga PHP z funkcją `mail()` – standard na hostingu współdzielonym.

Plik `.htaccess` wymusza HTTPS, przekierowuje stare adresy WordPressa i ustawia cache dla zdjęć.

## Podgląd na GitHub Pages

Każdy `git push` do gałęzi `main` uruchamia workflow `.github/workflows/pages.yml`, który publikuje podgląd
pod adresem `https://<login>.github.io/<nazwa-repo>/`. Wersja podglądowa:

- ma `noindex` i `robots.txt` blokujący wyszukiwarki, a `canonical` wskazuje na profil-okna.com.pl,
- nie wysyła formularza (GitHub Pages nie obsługuje PHP) – pokazuje tylko komunikat.

Jednorazowo w repozytorium: **Settings → Pages → Source: GitHub Actions**.

Build produkcyjny (`npm run build` bez zmiennych środowiskowych) jest od tego niezależny.

# Book

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# My Book App

Questa è un'app Angular per la gestione di libri, con un backend PHP per la gestione dei dati.  

Nota: il file `config.php` non è incluso nella repo per motivi di sicurezza.  
Dovrai crearlo tu localmente per collegarti al database MySQL.

---

## Struttura del progetto

/app → Applicazione Angular
/bookserver → Backend PHP
/bookserver/config.php → DA CREARE localmente

## Requisiti

- Node.js e npm
- Angular CLI
- PHP + XAMPP (o altro server con supporto PHP)
- MySQL

## Setup Backend (PHP)

1. Copia il file di esempio `bookserver/config.example.php` come `config.php`:

```bash
cp bookserver/config.example.php bookserver/config.php


Modifica config.php con le tue credenziali locali:

Apri il browser e verifica l'endpoint principale:

http://localhost/bookserver/index.php

Avvia l'app Angular in modalità sviluppo:

ng serve

Apri il browser e vai su:

http://localhost:4200
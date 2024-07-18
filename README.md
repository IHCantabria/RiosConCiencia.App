# RíosConCienciApp

> El objetivo principal del proyecto RíosConCiencia es el diseño, arquitectura, validación e implementación de un sistema inclusivo para la ciencia ciudadana fluvial en el marco del Proyecto Ríos.

## Project setup

## Prerequisites

The dependency installation, compilation and tag creation commands are managed from the package.json file and are executed using npm, so it is necessary that the user has npm and node installed with a version compatible with those indicated in the package file "engines" section.

## External Dependencies

RiosConCiencia.App requires  RiosConCiencia Api for its correct operation. For more information, access the repositories/docs of each one.

## Environment variables in the appsettings

For the correct compilation and operation of the application, it is necessary to configure the following placeholders for the environment variables set in the environment appsettings files:

- RIOSCONCIENCIA_API_URL -> The base uri in which RiosConCiencia Api is hosted.

To perform the replace, one solution is offered.

First: Replace the placeholder values before launching the build scripts.

## Local Run

It is possible to run the App locally using the first method to set the values of the environment variables and running the command npm run dev. As an alternative an .env-sample file is provided with an example configuration, you need to create an env.develpment.local and replace the base URI of Apis 100% functionality.

## Scripts

### Run Local Build

```
npm run dev
```

### Create a new Tag of the current code version(patch/minor/major), Example: "patch"

```
npm run deploy-patch
```

### install dependencies

```
npm run ci
```

### Build and compiles the mode of the project (Pre)

```
npm run ci
npm run build
```

## Build Output Directory

The output of the npm run build script is located in the "build/pre" folder.

## Built With

- [Vue](https://vuejs.org/) - The progressive javascript framework
- [Vite](https://vitejs.dev/) - Frontend Tooling
- [Rollup](https://www.rollupjs.org/guide/en/) - Bundling

## Credits

[IH Cantabria](https://github.com/IHCantabria)

## License

This software use:

- [Buefy](https://www.npmjs.com/package/@fantage9/buefy-vue3?activeTab=readme) - MIT License
- [Bulma](https://bulma.io/) - MIT License
- Weather data provided by [OpenWeather](https://openweathermap.org/) - License CC BY-SA 4.0

Some images taken from :

- Header Photo by [Nicholas Bukofski](https://unsplash.com/@bukofskicreative?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com)

Picts images taken from :

-  Pictogramas ARASAAC -  Gobierno de Aragón property, created Sergio Palao - Creative Commons ( BY- NC- SA) License

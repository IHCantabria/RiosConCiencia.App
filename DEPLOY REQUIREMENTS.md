# DEPLOY REQUIREMENTS

🚀
<br>

> Deploy requirements for IH-IT software
> <br>

## App Template

    - Release

## System

    - Windows

## Environment

    - Dev
    - Pre

## ANSIBLE RECIPE NAME

_Pre_

    - Deploy RiosConCiencia.App - PRE

_Development_

    - Deploy RiosConCiencia.App - DEV

## App folder

`RiosConCiencia.App`

## Distribution

    - Release

## Settings site

    - feature_net45: 'no'
    - net_core: 'no'
    - core_version: 'no'
    - httpplatform: 'no'
    - managedRuntimeVersion_pool: 'no managed'
    - enable32BitAppOnWin64_pool: 'false'
    - managedPipeLineMode_pool: 'integrated'
    - iiswin_aut: 'no'
    - thredds_whitelist: 'no'

## LOG

    - log: 'no'

## Url GIT

    git@github.com:IHCantabria/RiosConCiencia.App.git

## DNS

_Pre_

    - riosconciencia-pre.ihcantabria.com

_Development_

    - riosconcienciadev.ihcantabria.com

## URL APPLICATION

_Pre_

    - riosconciencia-pre.ihcantabria.com

_Development_

    - riosconcienciadev.ihcantabria.com

---

**Do you need any other configuration?**

- Descargar Release: https://api.github.com/repos/IHCantabria/RiosConCiencia.App/releases/tags/riosconciencia-{{ version }}-{{ entorno }}.zip

- [ ] `Variables de entorno, sustituir los siguientes placeholders en los ficheros .env: RIOSCONCIENCIA_API_URL`

<br>

## Relationships

**What applications, services, or data sources is this application related to?**

`________`

## Credits

[IH Cantabria](https://github.com/IHCantabria)

## FAQ

- Document provided by the system administrators [David del Prado](https://ihcantabria.com/directorio-personal/david-del-prado-secadas/) y [Luis Gutierrez](https://ihcantabria.com/directorio-personal/luis-gutierrez/)

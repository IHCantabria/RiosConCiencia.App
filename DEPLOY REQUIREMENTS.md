# DEPLOY REQUIREMENTS

🚀
<br>

> Deploy requirements for IH-IT software
> <br>

## App Template

    - Website

## System

    - IIS - Windows Server

## Environment

    - Dev
    - Prod

## ANSIBLE RECIPE NAME

_Production_

    - Deploy RiosConCiencia.App - PROD

_Development_

    - Deploy RiosConCiencia.App - DEV

## App folder

`RiosConCiencia.App`

## Distribution

    - Master
    - Tag

## Settings site

    - feature_net45: 'no'
    - net_core: 'no'
    - core_version: 'no'
    - httpplatform: 'no'
    - managedRuntimeVersion_pool: 'no managed'
    - enable32BitAppOnWin64_pool: 'false'
    - managedPipeLineMode_pool: 'integrated'
    - iiswin_aut: 'no'

## LOG

    - log: 'no'

## Url GIT

    - git@github.com:IHCantabria/RiosConCiencia.App.git

## DNS

_Production_

    - riosconciencia.ihcantabria.com

_Development_

    - riosconcienciadev.ihcantabria.com

## URL APPLICATION

_Production_

    - riosconciencia.ihcantabria.com

_Development_

    - riosconcienciadev.ihcantabria.com

## Other settings

Select only if needed:

**Binary repo**

`_____________`

**Services to restart**

`_____________`

**Backup**

---

**Do you need any other configuration?**

`_______________________________________________________________________________`

<br>

## Relationships

**What applications, services, or data sources is this application related to?**

`RiosConciencia.Api, RiosConCiencia.Visor`

## Credits

[IH Cantabria](https://github.com/IHCantabria)

## FAQ

- Document provided by the system administrators [David del Prado](https://ihcantabria.com/directorio-personal/tecnologo/david-del-prado-secadas/) y [Gloria Zamora](https://ihcantabria.com/directorio-personal/tecnologo/gloria-zamora/)

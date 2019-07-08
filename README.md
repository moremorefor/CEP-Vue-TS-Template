# CEP-Vue-TS-Template

CEP Extention template with Vue and TypeScript.

## Support Application

- Photoshop

#### CEP version

- CEP 6.1

#### Tested environment

- macOS Sierra / Windows 10
- Photoshop CC2018

## Setup for debug (macOS)

1.  Edit plist file: `<user>/Library/Preferences/com.adobe.CSXS.8.plist`

        Set string value for the key PlayerDebugMode to 1

1.  Force-reloading property list files (macOS 10.9 and higher)

        $ sudo killall cfprefsd

1.  Restart your macOS

## Build (macOS only)

1.  Install packages.

        $ yarn

2.  Edit `setup/config.json`.

3.  Build & Run

        $ yarn start

4.  Restart Adobe applications

5.  Open [http://localhost:8088/](http://localhost:8088/) for debug.

## Create ZXP package

1.  Download ZXPSignCmd

    - [Adobe Labs](https://labs.adobe.com/downloads/extensionbuilder3.html)

2.  Create p12 file

        $ ZXPSignCmd -selfSignedCert <countryCode> <stateOrProvinve> <organization> <commonName> <password> <outputPath.p12>

3.  Packaging

        $ ZXPSignCmd -sign <inputDir> <outputZXP> <p12> <p12Password>

## LICENSE

CEP-Vue-TS-Template is available under the MIT license. See the LICENSE file for more info.

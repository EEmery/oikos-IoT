# Oikos IoT
## Arduino Uno + Firebase

_This repository folder is dedicated to the development of the Oikos Gateways. To learn more about the Oikos Project, visit [our website](http://oikosngo.org)._

### Setting Up

This prototype is build on [Arduino Uno](https://www.arduino.cc/en/Main/ArduinoBoardUno) boards using the robotics and IoT framework for JavaScript, [Johnny-Five](https://github.com/rwaldron/johnny-five).

* First, install Node.js from <https://nodejs.org/>
* Then, install Python 2.7 from <https://python.org>
* With npm, install the the needed packages for the JavaScript scripts
```
$npm install johnny-five
$npm install firebase-admin
$npm install python-shell
```
* For the Python scripts properly communicate with Firebase, install `pyrebase`
```
$pip install pyrebase
```

### About the files

#### arduino-uno-layout1.js

In this layout, each necessity has it's own button. When a button is holded, the necessity binded to it toggles it status. To use, conect the arduino board and run:
```
$node arduino-uno-layout1.js
```

#### arduino-uno-layout2.js

In this layout, there are only three buttons, two for navigation arround the necessities and one for selection. When the selection button is holded, the selected necessity toggles the status. To use, conect the arduino board and run:
```
$node arduino-uno-layout2.js
```

#### admin-scripts (folder)

This folder contains scripts to help managing the Firebase Database.

_Note: For all the following python scripts, Windows users do not need to call `python` before the command._

##### add-necessities.py

Adds necessities to houses in the firebase database. Both houses and necessities must be passed as arguments in the call. Usage:
```
$python add-necessities.py -h house_1 house_2 [...] -n necessity1 necessity2 [...]
$python add-necessities.py --house house_1 [...] --necessities necessity1 [...]
```
If after `-h` or `--house` there is `all`, the script applies the necessities to all houses.

##### print-database.py

Prints the actual state of the database. Usage:
```
$python print-database.py
```

##### remove-necessities.py

Removes necessities to houses in the firebase database. Both houses and necessities must be passed as arguments in the call. Usage:
```
$python remove-necessities.py -h house_1 house_2 [...] -n necessity1 necessity2 [...]
$python remove-necessities.py --house house_1 [...] --necessities necessity1 [...]
```
If after `-h` or `--house` there is `all`, the script removes the necessities in all houses.

##### uniformizer.py

Reads the database template and changes houses keys in order to give them the same necessities. Key values are mainteined. New keys are created with the same value from the template.
```
$python uniformizer.py
```
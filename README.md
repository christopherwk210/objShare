objShare
---
[LICENSE](https://github.com/christopherwk210/objShare/blob/master/LICENSE) - [CHANGELOG](https://github.com/christopherwk210/objShare/blob/master/CHANGELOG.md)

objShare is a single page web application that makes it easy to share basic GameMaker: Studio objects that only use GML over the internet.

More often than not, when people need help in GM:S, it is related to the objects they have in their game. This project was created as a result of seeing many poorly formatted help posts on forums and on reddit. There are of course basic code formatting options in those places, but when the help is needed on a particularly complex object, things can get ugly.

The intention of this project is to help those that want to share their object on the internet, without having to worry about formatting it any special way. The interface is designed to be easy to understand and reminiscent of the object editing interface from within GM:S, so that anyone can find their way around.

Features
---

objShare provides an interface very similar to the object editor found in GameMaker: Studio. All object properties and events are supported at this time except for:

- Parent/Child object relationships
- Object sprite
- Editing physics masks

The code editor supports GML autocompletion and argument hints for GameMaker: Studio and GameMaker Studio 2 iterations of the language.

Importing and exporting GM:S objects are also supported at this time.

Getting Started
---

To get started with the source code, clone and install:

    git clone https://github.com/christopherwk210/objShare.git
    cd objShare
    npm install

To run, simply:

    npm start

More details about the project structure can be found at the [angular-seed](https://github.com/mgechev/angular-seed) page, the project objShare is built upon.

Contributors & Third Party Software
---

This project is built using Angular 2 on top of the [angular-seed](https://github.com/mgechev/angular-seed) project. The following libraries were used in addition:

 - [Normalize.css](https://necolas.github.io/normalize.css/)
 - [Ace Editor](https://ace.c9.io/#nav=about)
 - [Font Awesome](http://fontawesome.io/)
 - [Markdown-it](https://markdown-it.github.io/)
 - [Tether](http://tether.io/)
 - [Drop](http://github.hubspot.com/drop/docs/welcome/)
 - [FileSaver.js](https://eligrey.com/demos/FileSaver.js/)
 - [ObjTree](https://github.com/rranauro/ObjTree)

Tremendous thanks to [@YellowAfterlife](https://twitter.com/YellowAfterlife) for his awesome work on GML integration in the Ace editor and GML auto-completion, which is used with permission in this project. Check out the amazing [GMLive!](http://yal.cc/r/gml/)

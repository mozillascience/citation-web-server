# citation-web-server

citation-web-server is a node server which consumes the [CitationCore](https://github.com/mozillascience/CitationCore) library and presents it to the user. It is part of a larger effort, lead by Mozilla Science Lab, to develop a suite of tools that aim to implement a standard for citing software and making it easier to cite software correctly.  To learn more about this project you can visit the [Software Citation Tools repository](https://github.com/mozillascience/software-citation-tools).

## Install
To install:
```
npm install 
```

Once the install script finishes type in:
```
node bin/www
```
From there the server should be running locally.

## Contributor Install
If you are interested in contributing to citation-plugin please follow these install instructions. They will add a pre-commit hook that will run our linter and reject commits that do not meet the project's coding standards.  We are adhereing to the [AirBnb style guide](https://github.com/airbnb/javascript). 
```
git clone https://github.com/mozillascience/citation-web-server.git
cd Plugin
cp dev/pre-commit .git/hooks/
```
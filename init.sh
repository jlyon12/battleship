#!/bin/bash
if mkdir ./src/assets/;
then echo "Assets folder created successfully."
fi
if cd ./src/assets;
then pwd
fi
if mkdir images/;
then echo "Images folder created successfully."
fi
if mkdir fonts/;
then echo "Fonts folder created successfully."
fi
if cd ../;
then pwd
fi
if mkdir ./js/;
then echo "Javscript folder created successfully."
fi
if cd ../;
then pwd
fi
if mkdir ./dist/;
then echo "Dist folder created successfully."
fi
nvim README.md
nvim package.json
npm init 
npm install
git init
git branch -m main
git add . 
git commit -m "Initial Commit - build dependencies"
if rm init.sh;
then echo "Script finished and has been deleted successfully."
fi

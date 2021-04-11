
cd ./public
rem call go-js-app.bat
call go-remote-pgfree.bat
cd ..
git status
git add .
git status
git commit -am "Atlas-CIV 2.0 - April 2021"
git push heroku master
cd ./public
call go-local.bat
cd ..



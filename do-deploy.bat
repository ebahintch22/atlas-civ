
cd ./public
rem call go-js-app.bat
call go-remote-free-2022.bat

cd ..

git status
git add .
git status

git commit -am "Atlas-CIV 2.0 - Septembre 2022"
git push heroku master

cd ./public
call go-local.bat
cd ..



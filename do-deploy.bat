
cd ./public
call go-js-app.bat
call go-remote-pgfree.bat
cd ..
git status
git add .
git status
git commit -am "ASCIV September 2020"
git push heroku master
cd ./public
call go-local.bat
cd ..



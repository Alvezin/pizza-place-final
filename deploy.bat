
set -e

npm run build

cd dist


git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Alvezin/pizza-place-final.git main:gh-pages

cd -
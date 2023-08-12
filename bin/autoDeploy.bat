call npm docs:build
cd docs/.vitepress/dist

git init
git add -A
git commit -m "auto construct blog"

git push -f git@github.com:zhiqiangovo/zhiqiangovo.github.io.git main:gh-pages
#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.0/bin

cd course-selling-app
git pull origin main
cd Server
pm2 kill
pm2 start index.js
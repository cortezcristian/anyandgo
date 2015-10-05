#!/bin/bash
# anyandgo is pm2 friendly
# idea: add a cronjob with this task
git pull
npm install
sudo pm2 stop 0
sudo NODE_ENV=production pm2 start bin/www

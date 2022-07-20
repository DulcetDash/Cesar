FROM mhart/alpine-node:14

ADD . /app/
WORKDIR /app
RUN rm .env
# #Production
RUN mv .env_live .env
# #Development
# # RUN mv .env_dev .env

RUN npm install -g serve
RUN npm install yarn -g --force
RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:max_size 500Mb
RUN yarn install --network-timeout 100000
# RUN pm2 startup

EXPOSE 10301

CMD [ "pm2-runtime", "ecosystem.config.js" ]
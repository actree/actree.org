FROM node:7.7

ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /opt/local/actree/

COPY wait-for-it.sh /opt/local/actree/wait-for-it.sh
COPY package.json /opt/local/actree/package.json
RUN npm install

COPY keystone.js /opt/local/actree/keystone.js
COPY updates /opt/local/actree/updates/
COPY models /opt/local/actree/models/
COPY routes /opt/local/actree/routes/
COPY templates /opt/local/actree/templates/
COPY public /opt/local/actree/public/

EXPOSE 3000

CMD ["node","keystone.js"]

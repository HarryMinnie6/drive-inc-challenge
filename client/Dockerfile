FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./

# # fixes bug "Error: Cannot find module @rollup/rollup-win32-x64-msvc. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828)"
RUN rm -rf node_modules package-lock.json

RUN yarn install

COPY . .

CMD ["npm", "run", "dev", "--host"]

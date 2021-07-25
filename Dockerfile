FROM node:8 as react-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run-script build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
FROM alpine:latest
RUN apk add --update nodejs npm
COPY api api
CMD cd api/ && npm run start

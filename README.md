# This project uses geonames, weaberbit and pixabay api's to fetch weather data for an entered location along with the location image.

# Note: All credentials like API keys and usernames used in the project are stored in .env file and are accessed via process.env. So, kindly please include .env file with the same credential keys to avoid any issues. Due to security reasons .env is not pushed to git.

Bundling tool used - webpack
Testing tool used - Jest

All build commands can be found in package.json. 

Below are the features included from 'Extend Your Project section':

1. User(s) length of the trip is calculated from start-end date and is shown.
2. A country image is pulled from Pixabay Api in case of city name image could not be fetched.
3. User(s) last fetched information in stored in LocalStorage and is shown whenever the user        re-visits the page.

Both prod and dev environments are setup.

Run command: npm run build-prod =>for production
             npm run build-dev => for development

A default image is retreived from media folder in /src/client/media/weather.jpg when the user visits at the very first time on the page.
To look at it run the app in prod mode: npm run build-prod 

All necessary checks have taken into consideration if user enters invalid location.

Note: While testing for application.test.js and validatelocation.test.js make sure server is up and listening at port 8090.
While testing for server.test.js make sure server is not occupied at port 8090.




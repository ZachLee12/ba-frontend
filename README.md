# Alpine Frontend
The Alpine Frontend is a user interface and dashboard for Smart Region Lab(SRL). It is Single Page Application (SPA) developed with [Angular](https://angular.io/). Based on the role of the authenticated user, it will display the related web UI for the user to perform their authorized actions.

## Running Alpine Frontend
1. Install node modules dependencies.
```npm
npm install
```

2. Start Angular development server.
```
npm start
```

3. Navigate to http://localhost:4200 to access the application.

## Build for Production
1. Initiate the build process to bundle dependencies into a distributable `./dist` folder. 
```
npm run build
```

2. A `./dist` folder will appear in the root directory of the project. This folder is ready to be served by any web server, such as Apache httpd or nginx. You will need to configure the web server to serve the contents at `./dist/ba-frontend`.

3. If you would like to run a quick test to see how `./dist` is served in production, you can install a simple HTTP server globally via `npm` and serve it.
```
npm i http-server -g
```

4. After installing the `http-server`, run the following command to serve the contents of `./dist/ba-frontend`.

```cmd
http-server ./dist/ba-frontend
```





# Cloud computing project readme

The app url is:
http://master.d3g9opgfj85f73.amplifyapp.com

## To do:

-   [x] Setup assets (colors, components)
-   [ ] Landing page
-   [ ] Logging in
-   [ ] Profile view
-   [ ] Dashboard view
-   [ ] Adding posts
-   [ ] Liking, commening (?) posts

## Style guide

We are using https://material-ui.com/, so please refer to their page if you want to add a new component. You can always modify the elements with `makeStyles` as presented in `main-layout.jsx` for example.

Please conform to the style guide and always look for material-ui alternatives, instead of creating your own components by hand.

## Getting started

Install Yarn
(yarnpkg.com/en/docs/install#windows-stable) along with Node.js
In terminal run `npm install -g @aws-amplify/cli`

To properly use the Amazon services you'll have to create two files according to (https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-where)

where in `credentials` you should store the keys from Account Details button at labs.vocareum.com (go to aws educate sign-in, login with your student credentials go to your aws starter account)
and in `config` you should just input

```
[default]
region=us-east-1
```

after that everything should work. If it does not (because why write docs when youre tired), contact @lukasz-starosta.

# Create React App readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

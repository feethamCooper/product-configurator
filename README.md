# Moo Tech Exam

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A deployed version can be found @ https://product-configurator.cooperfeetham.com/

# About

I've tried building this application in such a way, that it can be as flexible as possible for a product to have many customisable attributes.
Most of this functionlity was based on the assumption that any "type" of attribute in which none of it's values are selectable, is that this
attribute type should be abstracted away from the user. Only leaving the user with attributes they can select (i.e. all attribute values
are selectable) or partial select (I.e. some attribute values are selectable).

The applications data comes from a faked API response, that when called provides a promise that resolves after a random number of seconds. See src/fakeAPI.

Most of the data side of the application is handled by the useProduct (src/hooks/useProduct.ts) hook, this hook provides:

- Application states relating to the products (using Zustand).
- A function for calling product API.
- Functions for storing and structuring product data to be cosumed by the app and it's components.

The applications UI is made up of three components: ProductDetail, ProductOptions & ProductSummary (all of which can be found in src/components). These components use SASS (BEM) for there styling, as well as the useProuct hook for their state management.

Other points worth mentioning:

- Supporting functions (currently only relating to error managment), can be found in src/utils.
- App constants relative to the use of the product API and useProduct hook, can be found in src/utils.
- This application uses typescript to help with scalability, so types for this project can be found in src/types/index.ts.
- This application uses unit tests to help with scalability, so any tests associated with a file can be found in the same folder as where the test subject is located I.e. src/hooks/useProduct.test.ts

### Future Improvments:

- Increased test coverage of codebase, since this is a tech exam I've only written 2 sample unit tests.
- Instead of having my "fakeApi" implmentation, I would have prefered to mock repsonses using something like Jest mock.
- Instead of use my current Zustand implmentation (for caching/state management) and custom API query functions (and assuming I had a real API). I would have liked to have use something like SWR/React Query to simplify the code and make a more robust solution.
- Complete and accesbility pass using a screen reader to make sure the correct HTML tags are being used, and the page makes sense in a linear context.
- Replace images to use more modern image formats like webp, or convert what images I can to SVG. Perhaps use responsive images.
- Refactor my SASS colour var to a SASS variables map. Or perhaps used CSS variables.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

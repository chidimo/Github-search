# Github search

A clone of the Github search bar

## How to run this project

1. Make sure you have `Node.js` (version 12 and above) and `npm` installed.
1. Clone this repository into your local machine with the command

        git clone https://github.com/chidimo/github-search.git

1. Once cloning is done, create a `.env.local` file inside inside the `github-search/` folder and add the below environment variable

        REACT_APP_GITHUB_CLIENT_ID="4f262cc9e20d3043da02"

1. To install the project dependencies, `cd` into the `github-search/` folder on a terminal and run the command

        yarn

1. After installation (still in the terminal), start the project by running

        yarn start

1. Once the project is up and running, visit <http://localhost:3000> to view the project.
1. Click the `Login to Github` button to start the authentication process.
1. On the new window, login to your github account and authorize the indicina app. Once done you will be presented with a search box.
1. Enter your search keyword and either click the `Search Github` button or press the enter key to submit the form.
1. Upon submitting the form you will be redirected to the search results page. You can use the options buttons to toggle between results for repositories and users.
1. To search for something else, just type into the search form at the top of the page. The search will be conducted as you type without the need to press enter.

## How to run tests

1. To run tests, use the command

        yarn test

## Notes on styling

I decided to use `css` modules for this app since its simple enough. Personally I prefer styled components (or any other UI library). But I thought it overkill to use any for this exercise.

## Notes on colors

The colors used on the app are an approximation to that in the actual design. This is because I used the browser's dev tools to inspect and pick out colors since I can't exactly get colors off of a figma prototype.

## How to register a new Github client ID

1. Visit [here](https://github.com/settings/applications/new) to register a new application.
1. Fill out application details. Use <http://localhost:3000> as the Homepage URL and Authorization callback URL.

## Resources

1. <https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/>
1. <https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex>

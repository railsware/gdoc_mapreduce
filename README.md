This is a Google Spreadsheets plugin, which adds custom functions.
 
It uses the [Apps Script API](https://developers.google.com/apps-script/reference/calendar/). 
The deployment repository is located [here][repository].

### Development Setup

We assume you have node.js installed.

* Clone the project and open its directory.
* `npm install`
* Follow the setup instructions of [GAPS](https://github.com/danthareja/node-google-apps-script) to authenticate via the API.
* `npm run download` 
* Make changes.
* `npm test`
* `npm run upload` # Deploy to the Google repository, but not to the Marketplace.

### Marketplace Deployment

*This instruction describes how to deploy the add-on with its visibility limited to the railsware users.*

* Open [the project's page][repository].
* Select "Publish" -> "Deploy as add-on..." from the menu.
* Update the version, write a description, and press "Update web store draft".
* On the bottom of the page that was opened press "Publish changes".

### Troubleshooting

* If `npm run upload` returned an error, save your changes (otherwise they'll be overriden), run `npm run download` and then try again.

[repository]: https://script.google.com/a/macros/railsware.com/d/1MDoFYBg5uaHyZ__bPYriAQ3_8-aZD2WC8fWAyAijIGZLp9ToFNRnlK8u/edit

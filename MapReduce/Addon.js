/**
 * Runs when the add-on is launched;
 * @param {Object} event The event parameter for a simple onOpen trigger.
 */
function onOpen(event) {
    SpreadsheetApp.getUi()
        .createAddonMenu()
        .addItem('Use in this spreadsheet.', 'dummy_')
        .addToUi();
}

/**
 * Runs when the add-on is installed;
 * @param {Object} event The event parameter for a simple onInstall trigger.
 */
function onInstall(event) {
    onOpen(event);
}

/**
 * This function is used to load the functions names into
 * the spreadsheet's namespace. Otherwise they won't be available.
 * @link https://developers.google.com/apps-script/guides/sheets/functions
 */
function dummy_() {
    return 'dummy';
}

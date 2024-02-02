const listenToKeyboardEvent = (command: unknown) => {
    console.info('->', 'listening', command)
}

// @ts-ignore
chrome.commands.onCommand.addListener(listenToKeyboardEvent);

const onAllTabs = (tabs: any) => {
    console.info('-> open tabs', tabs)
}
const listTabs = (): void => {
    // @ts-ignore
    chrome.tabs.query({}, onAllTabs)
}

document.addEventListener('DOMContentLoaded', listTabs)

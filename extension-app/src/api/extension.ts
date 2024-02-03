import {Tab} from "../context/context";


const selectTab = (tabId: number) => {
    // @ts-ignore
    chrome?.tabs?.update?.(tabId, {active: true});
}
const getAllTabs = (callback: (tabs: Array<Tab>) => void) => {
    // @ts-ignore
    chrome?.tabs?.query?.({}, (tabs) => {
        const tabList = [...tabs].map(item => {
            return {
                id: item.id,
                url: item.url,
                active: item.active,
                title: item.title,
                favIconUrl: item.favIconUrl
            }
        })
        callback(tabList);
    })
    // generate a list of 5 dummy tabs
    callback([
        {
            id: 1,
            url: 'https://google.com',
            active: true,
            title: 'Google',
            favIconUrl: 'https://www.google.com/favicon.ico'
        },
        {
            id: 2,
            url: 'https://facebook.com',
            active: false,
            title: 'Facebook Facebook Facebook Facebook Facebook Facebook Facebook Facebook',
            favIconUrl: 'https://www.facebook.com/favicon.ico'
        },
        {
            id: 3,
            url: 'https://twitter.com',
            active: false,
            title: 'Twitter',
            favIconUrl: 'https://www.twitter.com/favicon.ico'
        },
        {
            id: 4,
            url: 'https://instagram.com',
            active: false,
            title: 'Instagram',
            favIconUrl: 'https://www.instagram.com/favicon.ico'
        },
        {
            id: 5,
            url: 'https://linkedin.com',
            active: false,
            title: 'LinkedIn',
            favIconUrl: 'https://www.linkedin.com/favicon.ico'
        },
        {
            id: 6,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 7,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 8,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 9,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 10,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 11,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 12,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 13,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 14,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 15,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 16,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 17,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 18,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 19,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        },
        {
            id: 20,
            url: 'https://linkedin.com',
            active: false,
            title: 'Settings',
        }
    ]);

}

export {getAllTabs, selectTab};

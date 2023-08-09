import axios from 'axios';
import config from '../config';

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.url?.startsWith(config.TWITTER_CALLBACK)) {
        await axios.get(config.API_HOST, {
            // params: { type: 'TWITTER', code, state },
        });
        await chrome.storage.local.set({ auth: Date.now() });
        chrome.storage.local.get(['key']).then((result) => {
            console.log(`Value currently is ${result.key}`);
        });

        // tabs.map((tab) =>
        //   chrome.tabs.sendMessage(tab.id, {
        //     from: 'twitterAuthResult',
        //     data: dataToSend,
        //   })
        // );
    }
});

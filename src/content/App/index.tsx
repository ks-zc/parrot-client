/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import './style.module.scss';

export default () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showButton, setShowButton] = useState(true);
    useEffect(() => {
        if (!__DEV__) {
            chrome.storage.onChanged.addListener((changes, areaName) => {
                console.log('changes is ', changes);
                console.log('areaName is ', areaName);
            });
        }
    }, []);

    const toggleSidebar = () => {
        setShowSidebar(true);
        setShowButton(false);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
        setShowButton(true);
    };

    return (
        <div styleName="parrot-app">
            <button styleName={`toggle-button ${showButton ? '' : 'hidden'}`} onClick={toggleSidebar}>
                Toggle Sidebar
            </button>
            <div styleName={`sidebar ${showSidebar ? '' : 'hidden'}`}>
                <button styleName="close-button" onClick={closeSidebar}>
                    Close
                </button>
                <div>this is a long content</div>
            </div>
        </div>
    );
};

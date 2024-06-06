import { lazy } from 'react';

const createLazyComponent = (importFn, delay = 3000) => {
    return lazy(
        () =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(importFn());
                }, delay);
            })
    );
};

export default createLazyComponent;

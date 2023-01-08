import Typewriter from '../src/index.js';

document.addEventListener('alpine:init', (): void => {
    Typewriter((<any>window).Alpine);
});

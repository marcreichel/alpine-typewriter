import Typewriter from '../src/index';

document.addEventListener('alpine:init', (): void => {
    Typewriter((<any>window).Alpine);
});

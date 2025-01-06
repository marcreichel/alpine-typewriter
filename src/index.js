class Typewriter {
    constructor(element, texts, waitTime, showCursor) {
        this.element = element;
        this.texts = texts || [];
        this.current = 1;
        this.currentText = '';
        this.waitTime = waitTime || 2000;
        this.showCursor = showCursor || false;
        this.cursor = true;
        this.segment = [];
        this.segmentPointer = 0;
    }

    async start() {
        this.currentText = this.texts[0] || '';
        this.segment = this.segmentString(this.currentText);
        this.segmentPointer = this.segment.length;
        this.element.innerHTML = this.prepareText(true);
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.increment();
            while (true) {
                await this.swap();
            }
        }
    }

    prepareText(cursor) {
        return `${this.currentText}${
            cursor ? this.getCursor() : ''
        }${this.getPlaceholder()}`;
    }

    getCursor() {
        return this.showCursor
            ? '<span style="position:relative;"><span style="position:absolute;top:0.05em;bottom:0.05em;border-left:0.05em solid currentColor;"></span></span>'
            : '';
    }

    getPlaceholder() {
        return '<span style="position:relative;display:inline-block;height:1em;"></span>';
    }

    async swap() {
        await this.wait(this.waitTime);
        await this.clear();
        await this.type(this.nextText());
    }

    increment() {
        this.current++;
        if (this.current > this.texts.length) {
            this.current = 1;
        }
    }

    nextText() {
        const text = this.texts[this.current - 1];
        this.increment();
        return text;
    }

    segmentString(value) {
        const segments =
            typeof Intl != 'undefined' && Intl.Segmenter
                ? [...new Intl.Segmenter().segment(value)]
                : value.split('').map((segment) => ({ segment }));
        return segments.reduce((acc, { segment }, index) => [...acc, acc[index] + segment], ['']);
    }

    backspace() {
        this.currentText = this.segment[this.segmentPointer];
        this.element.innerHTML = this.prepareText(true);

        return this.wait(100);
    }

    async clear() {
        while (this.segmentPointer > 0) {
            this.segmentPointer--;
            await this.backspace();
        }
    }

    async type(text) {
        this.segment = this.segmentString(text);
        this.segmentPointer = 0;
        while (this.segmentPointer < this.segment.length) {
            await this.append();
            this.segmentPointer++;
        }
    }

    append() {
        this.currentText = this.segment[this.segmentPointer];
        this.element.innerHTML = this.prepareText(true);

        return this.wait(100);
    }

    async wait(milliseconds) {
        this.cursor = true;
        const interval = setInterval(() => {
            this.cursor = !this.cursor;
            if (this.cursor) {
                this.element.innerHTML = this.prepareText(true);
            } else {
                this.element.innerHTML = this.prepareText(false);
            }
        }, 530);
        return new Promise((resolve) => {
            setTimeout(() => {
                clearInterval(interval);
                resolve();
            }, milliseconds);
        });
    }
}

export default function (Alpine) {
    Alpine.directive(
        'typewriter',
        (el, { expression, modifiers }, { evaluate }) => {
            const texts = evaluate(expression);

            const timeModifiers = modifiers.filter((modifier) =>
                modifier.match(/^\d+m?s$/),
            );
            const latestTimeModifier = timeModifiers.pop();
            let milliseconds = null;
            if (latestTimeModifier) {
                if (latestTimeModifier.endsWith('ms')) {
                    milliseconds = parseInt(
                        latestTimeModifier.match(/^(\d+)/)[1],
                    );
                } else {
                    milliseconds =
                        parseInt(latestTimeModifier.match(/^(\d+)s/)[1]) * 1000;
                }
            }

            const showCursor = modifiers.includes('cursor');

            new Typewriter(el, texts, milliseconds, showCursor).start().then();
        },
    );
}

import { Alpine } from 'alpinejs';

class Typewriter {
    protected element: HTMLElement;
    protected texts: string[];
    protected current: number;
    protected waitTime: number;

    constructor(element: HTMLElement, texts: string[], waitTime?: number) {
        this.element = element;
        this.texts = texts || [];
        this.current = 1;
        this.waitTime = waitTime || 2000;
    }

    public async start() {
        this.element.innerText = this.texts[0] || '';
        this.increment();
        while (true) {
            await this.swap();
        }
    }

    protected async swap(): Promise<any> {
        await this.wait(this.waitTime);
        await this.clear();
        await this.type(this.nextText());
    }

    protected increment(): void {
        this.current++;
        if (this.current > this.texts.length) {
            this.current = 1;
        }
    }

    protected nextText(): string {
        let text = this.texts[this.current - 1];
        this.increment();
        return text;
    }

    protected text(): string {
        return this.element.innerText;
    }

    protected length(): number {
        return this.text().length;
    }

    protected append(text): Promise<any> {
        this.element.innerText += text;

        return this.wait(100);
    }

    backspace(): Promise<any> {
        this.element.innerText = this.text().slice(0, -1);

        return this.wait(100);
    }

    protected async clear(): Promise<any> {
        while (this.length()) {
            await this.backspace();
        }
    }

    protected async type(text): Promise<any> {
        while (text.length) {
            await this.append(text[0]);

            text = text.substring(1);
        }
    }

    protected async wait(milliseconds): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        })
    }
}

export default function (Alpine: Alpine): void {
    Alpine.directive('typewriter', (el: Node, { expression, modifiers }, { evaluate }): void => {
        const texts: unknown = evaluate(expression);

        if (!Array.isArray(texts)) {
            throw new Error('Please provide an array of strings.');
        }

        const timeModifiers: string[] = modifiers.filter((modifier: string) => modifier.match(/^\d+m?s$/));
        const latestTimeModifier: string = timeModifiers.pop();
        let milliseconds: number = null;
        if (latestTimeModifier) {
            if (latestTimeModifier.endsWith('ms')) {
                milliseconds = parseInt(latestTimeModifier.match(/^(\d+)/)[1]);
            } else {
                milliseconds = parseInt(latestTimeModifier.match(/^(\d+)s/)[1]) * 1000;
            }
        }

        new Typewriter(<HTMLElement> el, texts, milliseconds).start().then();
    });
}

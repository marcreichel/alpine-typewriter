(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    class Typewriter {
      constructor(element, texts, waitTime) {
        this.element = element;
        this.texts = texts || [];
        this.current = 1;
        this.waitTime = waitTime || 2000;
      }

      async start() {
        this.element.innerText = this.texts[0] || '';
        this.increment();

        while (true) {
          await this.swap();
        }
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
        let text = this.texts[this.current - 1];
        this.increment();
        return text;
      }

      text() {
        return this.element.innerText;
      }

      length() {
        return this.text().length;
      }

      append(text) {
        this.element.innerText += text;
        return this.wait(100);
      }

      backspace() {
        this.element.innerText = this.text().slice(0, -1);
        return this.wait(100);
      }

      async clear() {
        while (this.length()) {
          await this.backspace();
        }
      }

      async type(text) {
        while (text.length) {
          await this.append(text[0]);
          text = text.substring(1);
        }
      }

      async wait(milliseconds) {
        return new Promise(resolve => {
          setTimeout(resolve, milliseconds);
        });
      }

    }

    function Typewriter$1 (Alpine) {
      Alpine.directive('typewriter', (el, {
        expression,
        modifiers
      }, {
        evaluate
      }) => {
        const texts = evaluate(expression);
        const timeModifiers = modifiers.filter(modifier => modifier.match(/^\d+m?s$/));
        const latestTimeModifier = timeModifiers.pop();
        let milliseconds = null;

        if (latestTimeModifier) {
          if (latestTimeModifier.endsWith('ms')) {
            milliseconds = parseInt(latestTimeModifier.match(/^(\d+)/)[1]);
          } else {
            milliseconds = parseInt(latestTimeModifier.match(/^(\d+)s/)[1]) * 1000;
          }
        }

        new Typewriter(el, texts, milliseconds).start();
      });
    }

    document.addEventListener('alpine:init', () => {
      Typewriter$1(window.Alpine);
    });

}));
//# sourceMappingURL=alpine-typewriter.js.map

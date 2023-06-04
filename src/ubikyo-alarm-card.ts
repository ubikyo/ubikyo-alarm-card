import {
  LitElement,
  html,
  css,
  unsafeCSS
} from "lit";

import "./ubikyo-alarm-cards.editor";
import { customElement } from "lit/decorators.js";

@customElement('ubikyo-alarm-card')
class UbikyoAlarmCard extends LitElement {
    user: any;
    config: any;
    hass: any;

    constructor() {
        super();
    }

    static get properties() {
        return {
            hass: {},
            config: {},
        };
    }

    static get styles() {
        return css `
        `;
    }

    render() {
        return html`
            <ha-card>
                <h1 class="card-header">
                    <span id="title" class="name">${this.config.title}</span>
                </h1>
                <div class="wrapper">
                </div>
            </ha-card>
        `
    }
    setConfig(config: { server: any; port: any; extensions: any; }): void {
        this.config = config;
    }

    static async getConfigElement() {
        return document.createElement("sipjs-card-editor");
    }

    static getStubConfig() {
        return {
            title: "Title",
        };
    }

    getCardSize() {
        return this.config.extensions.length + 1;
    }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: "ubikyo-alarm-card",
    name: "Ubikyo Alarm Card",
    preview: false,
    description: "An alternative alarm control panel."
});
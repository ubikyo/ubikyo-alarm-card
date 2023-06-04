import {
    LitElement,
    html,
    css,
} from "lit";
import { customElement } from 'lit/decorators.js';

@customElement('ubikyo-alarm-card')
class UbikyoAlarmCardEditor extends LitElement {
    _config: any;
    hass: any;

    setConfig(config: any): void {
        this._config = config;
    }

    static get properties() {
        return {
            hass: {},
            config: {}
        };
    }

    configChanged(newConfig: any) {   
        const event = new Event("config-changed", {
            bubbles: true,
            composed: true
        });
        (event as any).detail = {config: newConfig};
        this.dispatchEvent(event);
    }

    render() {
        if (!this._config || !this.hass) {
            return;
        }

        return html`
            <div class="card-config">
                <paper-input
                    label="Title"
                    .value="${this._config.title}"
                    .configValue="${"title"}"
                    @value-changed="${this._valueChanged}"
                ></paper-input>
            </div>
        `;
    }

    private _valueChanged(ev: { target: any; }): void {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target;
        const value = target.checked !== undefined
            ? target.checked
            : target.value

        this._config = {
            ...this._config,
            [target.configValue]: value
        };

        this.configChanged(this._config);
    }

    private _editValueChanged(ev: { target: any; }): void {
        if (!this._config || !this.hass) {
            return;
        }
        
        const target = ev.target;
        const index = (ev.target as any).index;

        var array = Object.assign([], this._config["custom"]);
        array[index] = {
            ...array[index],
            ["edit"]: target.checked
        };
        this._config = {
            ...this._config,
            ["custom"]: array
        };

        this.configChanged(this._config);
    }

    private _goBack(): void {
        this.requestUpdate();
    }

    private _editArray(ev: { target: { configKey: any; index: any; configValue: any; value: any; }; }): void {
        var key = ev.target.configKey;
        var index = ev.target.index;
        var array = Object.assign([], this._config[key]);
        array[index] = {
            ...array[index],
            [ev.target.configValue]: ev.target.value
        };
        this._config = {
            ...this._config,
            [key]: array
        };
        this.configChanged(this._config);
    }

    static get styles() {
        return css`
        `;
    }
}
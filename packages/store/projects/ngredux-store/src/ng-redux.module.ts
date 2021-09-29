import { ModuleWithProviders, NgModule, NgZone } from '@angular/core';
import { DevToolsExtension } from './components/dev-tools';
import { NgRedux } from './components/ng-redux';
import { RootStore } from './components/root-store';

/** @hidden */
export function _ngReduxFactory(ngZone: NgZone) {
    return new RootStore(ngZone);
}

@NgModule({})
export class NgReduxModule {
    public static forRoot(): ModuleWithProviders<NgReduxModule> {
        return {
            ngModule: NgReduxModule,
            providers: [
                DevToolsExtension,
                {
                    provide: NgRedux,
                    useFactory: _ngReduxFactory,
                    deps: [ NgZone ],
                },
            ],
        };
    }
}

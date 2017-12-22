import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSocialService, AuthServiceConfig } from "../services/auth-social.service";

export function configFactory(config: AuthServiceConfig) {
    return config;
}

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        AuthSocialService
    ]
})

export class SocialLoginModule {
    public static initialize(config: AuthServiceConfig): ModuleWithProviders {
        return {
            ngModule: SocialLoginModule,
            providers: [
                AuthSocialService,
                {
                    provide: AuthServiceConfig,
                    useValue: config
                }
            ]
        };
    }
}
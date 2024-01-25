// authService.js
import { InteractionType, PublicClientApplication } from 'react-native-msal';
import { authorize } from 'react-native-app-auth';



const msalConfig = {
    auth: {
        issuer: 'https://login.microsoftonline.com/9728fcf8-f04b-4271-b352-022a33fbfcc4/v2.0',
        clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',
        //  clientId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',

        //redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',
        additionalParameters: { prompt: 'select_account' },
        redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
        // redirectUrl: 'https://clientportal.taxleaf.com/MicrosoftConnect',
        scopes: ['openid', 'profile', 'User.Read', 'offline_access'],
        // tokenEndpoint:
        //     'https://login.microsoftonline.com/' +
        //     '9728fcf8-f04b-4271-b352-022a33fbfcc4' +
        //     '/oauth2/v2.0/token',
        //clientId: 'your-client-id',
        // redirectUri: 'msauth://<your-app-package-name>/your-redirect-scheme',
    }
};

const msalRequest = {
    scopes: ['openid', 'profile', 'User.Read'],
};

const authority = 'https://login.microsoftonline.com/9728fcf8-f04b-4271-b352-022a33fbfcc4';

// export const authService = new PublicClientApplication(msalConfig);

export const signIn = async () => {
    try {
        const result = await authorize(msalConfig.auth);
        //const result = await authService.signIn();

        return result;
    } catch (error) {
        console.error('Authentication failed', error);
        throw error;
    }
};

export const signOut = async () => {
    const authService = new PublicClientApplication(msalConfig);

    try {
        await authService.logoutPopup();
    } catch (error) {
        console.error('Sign out failed', error);
        throw error;
    }
};

export const getAccessToken = async () => {
    const authService = new PublicClientApplication(msalConfig);
    try {
        const tokenResponse = await authService.acquireTokenSilent({
            ...msalRequest,
            authority,
        });

        return tokenResponse.accessToken;
    } catch (error) {
        console.error('Failed to acquire token silently', error);
        throw error;
    }
};

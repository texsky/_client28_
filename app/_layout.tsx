import { Stack } from "expo-router";
import React from "react";
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { Provider as PaperProvider } from 'react-native-paper';

/**
 * The root layout component.
 *
 * This component renders a stack navigator with the (tabs) screen.
 *
 * @returns A JSX element representing the root layout.
 */

const Layout = () => {
    return (
        <Provider store={Store}>
            <PaperProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                </Stack>
            </PaperProvider>
        </Provider>
    );
};
export default Layout;
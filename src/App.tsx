import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './config/theme/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRoutes } from './routes/Routes';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={Theme}>
                    <CssBaseline />
                    <AppRoutes />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;

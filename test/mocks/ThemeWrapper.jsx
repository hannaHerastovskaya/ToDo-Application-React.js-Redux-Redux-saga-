import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../src/config/theme';

export default component => <ThemeProvider theme={theme.day}>{component}</ThemeProvider>;

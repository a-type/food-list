import * as React from 'react';
import { Box, Typography } from '@material-ui/core';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box display="flex" flexDirection="column" p={3}>
          <Typography variant="h1" gutterBottom>
            Error
          </Typography>
          <Typography>
            Really sorry, but something broke pretty bad. Try refreshing the
            page or closing and opening the app again.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

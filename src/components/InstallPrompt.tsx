import * as React from 'react';
import { Box, Typography, Button, Paper, Collapse } from '@material-ui/core';
import { colors } from '../theme/colors';

const storageKey = 'has-prompted-install';

export type InstallPromptProps = {};

export function InstallPrompt(props: InstallPromptProps) {
  const [hasBeenPrompted, setHasBeenPrompted] = React.useState(
    () => !!localStorage.getItem(storageKey),
  );
  React.useEffect(() => {
    if (hasBeenPrompted) {
      localStorage.setItem(storageKey, 'true');
    }
  }, [hasBeenPrompted]);

  return (
    <Collapse in={!hasBeenPrompted}>
      <Box
        bgcolor={colors.green[500]}
        color={colors.purple[700]}
        p={2}
        my={2}
        component={Paper}
      >
        <Typography variant="body1" paragraph>
          This app works even better when you add it to your home screen.
        </Typography>
        <Typography variant="body2" paragraph>
          Adding Food List lets you share selected text directly from anywhere,
          no copy + paste required. Just find "Add to homescreen" or a similar
          option in your browser's menu above.
        </Typography>
        <Button
          variant="text"
          color="inherit"
          onClick={() => setHasBeenPrompted(true)}
        >
          No thanks
        </Button>
      </Box>
    </Collapse>
  );
}

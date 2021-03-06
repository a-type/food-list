import * as React from 'react';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { AddToHomeScreen, AddCircleOutline, Devices } from '@material-ui/icons';

export function EmptyState() {
  const isMobile = useMediaQuery('only screen and (max-width: 760px)');

  return (
    <Box style={{ opacity: 0.75 }}>
      <Typography paragraph>
        Type or paste some ingredients in the box below to get started!
      </Typography>
      <Typography paragraph>
        Food List automatically merges foods together whenever possible, so you
        can skip the math (and the extra trips back down the aisles).
      </Typography>
      <Typography paragraph>
        You can compile a list on your laptop and then send it to your phone to
        take to the store - just use the <Devices fontSize="inherit" /> Devices
        button above to transfer!
      </Typography>
      <Typography paragraph>
        Also, Food List works best when you add it to your homescreen.{' '}
        {isMobile ? (
          <>
            <AddToHomeScreen fontSize="inherit" /> Check for the option in your
            browser menu.
          </>
        ) : (
          <>
            Check for an <AddCircleOutline fontSize="inherit" /> Add button in
            your URL bar.
          </>
        )}{' '}
        When you add this app, you can share selected ingredient lists directly
        to your shopping list!
      </Typography>
    </Box>
  );
}

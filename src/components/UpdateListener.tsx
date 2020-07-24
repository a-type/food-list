import * as React from 'react';
import { SimpleNotifier } from '../SimpleNotifier';
import { useSnackbar } from 'notistack';
import { Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

export function UpdateListener({
  notifier,
}: {
  notifier: SimpleNotifier<ServiceWorkerRegistration>;
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    function update(reg: ServiceWorkerRegistration) {
      if (reg.waiting) {
        reg.waiting.addEventListener('statechange', (e) => {
          if ((e.target as any)?.state === 'activated') {
            window.location.reload();
          }
        });
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    }

    notifier.register((reg) => {
      enqueueSnackbar('An update is available!', {
        variant: 'success',
        persist: true,
        action: (key) => (
          <>
            <Button variant="text" color="primary" onClick={() => update(reg)}>
              Update
            </Button>
            <IconButton onClick={() => closeSnackbar(key)} color="inherit">
              <Close />
            </IconButton>
          </>
        ),
      });
    });
    return () => {
      notifier.clear();
    };
  }, [notifier, closeSnackbar, enqueueSnackbar]);

  return null;
}

import * as React from 'react';
import { useHasScroll } from '../hooks/useHasScroll';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    minHeight: 0,
    overflow: 'hidden',
  },
  scroll: {
    overflowY: 'auto',
    height: '100%',
  },
  graphic: {
    opacity: 0,
    transition: 'opacity 0.2s ease',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 0,
    pointerEvents: 'none',
  },
  topGraphic: {
    top: 0,
    pointerEvents: 'none',
    boxShadow: `0 8px 20px 10px #15397b1f`,
  },
  bottomGraphic: {
    bottom: 0,
    boxShadow: `0 -8px 20px 10px #15397b1f`,
  },
}));

export function FoodListScrollContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const classes = useStyles();
  const [ref, { above, below }] = useHasScroll<HTMLDivElement>();

  return (
    <div className={clsx(classes.root, className)}>
      <div ref={ref} className={classes.scroll}>
        {children}
      </div>
      <div
        className={clsx(classes.graphic, classes.topGraphic)}
        style={{ opacity: above ? 1 : 0 }}
      />
      <div
        className={clsx(classes.graphic, classes.bottomGraphic)}
        style={{ opacity: below ? 1 : 0 }}
      />
    </div>
  );
}

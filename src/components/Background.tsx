import * as React from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import useMeasure from 'react-use-measure';
import {
  FastfoodTwoTone,
  EmojiFoodBeverageTwoTone,
  LocalBarTwoTone,
  CakeTwoTone,
  CheckBoxTwoTone,
  EcoTwoTone,
  LocalDiningTwoTone,
  LocalPizzaTwoTone,
  OutdoorGrillTwoTone,
  RestaurantTwoTone,
} from '@material-ui/icons';

const FOOD_ICONS = [
  FastfoodTwoTone,
  EmojiFoodBeverageTwoTone,
  LocalBarTwoTone,
  CakeTwoTone,
  CheckBoxTwoTone,
  EcoTwoTone,
  LocalDiningTwoTone,
  LocalPizzaTwoTone,
  OutdoorGrillTwoTone,
  RestaurantTwoTone,
];

const ICON_SPACING = 64;
const ICON_SIZE = 32;

function getIcon() {
  return FOOD_ICONS[Math.floor(Math.random() * FOOD_ICONS.length)];
}

export const Background = React.memo(function () {
  const [ref, { width, height }] = useMeasure({
    polyfill: ResizeObserver,
    debounce: 100,
    scroll: false,
  });

  const rows = Math.floor(height / ICON_SPACING) + 1;
  const columns = Math.floor(width / ICON_SPACING) + 1;

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        opacity: 0.1,
        position: 'absolute',
        overflow: 'hidden',
      }}
    >
      {rows &&
        columns &&
        new Array(rows).fill(null).map((_, y) =>
          new Array(y % 2 === 0 ? columns : columns + 1)
            .fill(null)
            .map((_, x) => {
              const Icon = getIcon();
              return (
                <Icon
                  key={`${x}.${y}`}
                  style={{
                    position: 'absolute',
                    left:
                      y % 2 === 1 ? x * ICON_SPACING : (x + 0.5) * ICON_SPACING,
                    top: y * ICON_SPACING,
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                  }}
                />
              );
            }),
        )}
    </div>
  );
});

import React from 'react';
import {
  StylesApiProps,
  factory,
  useProps,
  Factory,
  useResolvedStylesApi,
  MantineColor,
} from '../../core';
import {
  ProgressRoot,
  ProgressRootStylesNames,
  ProgressRootCssVariables,
  __ProgressRootProps,
} from './ProgressRoot/ProgressRoot';
import { ProgressSection } from './ProgressSection/ProgressSection';
import { ProgressLabel } from './ProgressLabel/ProgressLabel';
import classes from './Progress.module.css';

export type ProgressStylesNames = ProgressRootStylesNames;

export interface ProgressProps extends __ProgressRootProps, StylesApiProps<ProgressFactory> {
  /** Value of the progress */
  value: number;

  /** Key of `theme.colors` or any valid CSS value, `theme.primaryColor` by default */
  color?: MantineColor;

  /** Determines whether the section should have stipes, `false` by default */
  striped?: boolean;

  /** Determines whether the sections stripes should be animated, if set, `striped` prop is ignored, `false` by default */
  animated?: boolean;
}

export type ProgressFactory = Factory<{
  props: ProgressProps;
  ref: HTMLDivElement;
  stylesNames: ProgressStylesNames;
  vars: ProgressRootCssVariables;
  staticComponents: {
    Section: typeof ProgressSection;
    Root: typeof ProgressRoot;
    Label: typeof ProgressLabel;
  };
}>;

const defaultProps: Partial<ProgressProps> = {
  size: 'md',
};

export const Progress = factory<ProgressFactory>((_props, ref) => {
  const props = useProps('Progress', defaultProps, _props);
  const { value, classNames, styles, vars, color, striped, animated, ...others } = props;

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<ProgressFactory>({
    classNames,
    styles,
    props,
  });

  return (
    <ProgressRoot
      ref={ref}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      vars={vars as any}
      {...others}
    >
      <ProgressSection value={value} color={color} striped={striped} animated={animated} />
    </ProgressRoot>
  );
});

Progress.classes = classes;
Progress.displayName = '@mantine/core/Progress';
Progress.Section = ProgressSection;
Progress.Root = ProgressRoot;
Progress.Label = ProgressLabel;

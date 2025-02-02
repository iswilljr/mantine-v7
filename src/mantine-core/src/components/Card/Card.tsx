import React, { Children, cloneElement } from 'react';
import {
  BoxProps,
  StylesApiProps,
  polymorphicFactory,
  useProps,
  useStyles,
  createVarsResolver,
  PolymorphicFactory,
  MantineShadow,
  MantineRadius,
  MantineSpacing,
  getSpacing,
} from '../../core';
import { Paper } from '../Paper';
import { CardSection } from './CardSection/CardSection';
import { CardProvider } from './Card.context';
import classes from './Card.module.css';

export type CardStylesNames = 'root' | 'section';
export type CardCssVariables = {
  root: '--card-padding';
};

export interface CardProps extends BoxProps, StylesApiProps<CardFactory> {
  /** Key of `theme.shadows` or any valid CSS value to set `box-shadow`, `none` by default */
  shadow?: MantineShadow | (string & {});

  /** Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: MantineRadius | number | (string & {});

  /** Determines whether the card should have border, border color depends on color scheme, `false` by default */
  withBorder?: boolean;

  /** Controls `padding`, key of `theme.spacing` or any valid CSS value, `'md'` by default */
  padding?: MantineSpacing | (string & {}) | number;

  /** Card content */
  children?: React.ReactNode;
}

export type CardFactory = PolymorphicFactory<{
  props: CardProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: CardStylesNames;
  vars: CardCssVariables;
  staticComponents: {
    Section: typeof CardSection;
  };
}>;

const defaultProps: Partial<CardProps> = {
  padding: 'md',
};

const varsResolver = createVarsResolver<CardFactory>((_, { padding }) => ({
  root: {
    '--card-padding': getSpacing(padding),
  },
}));

export const Card = polymorphicFactory<CardFactory>((_props, ref) => {
  const props = useProps('Card', defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, children, padding, ...others } =
    props;

  const getStyles = useStyles<CardFactory>({
    name: 'Card',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const _children = Children.toArray(children);
  const content = _children.map((child, index) => {
    if (typeof child === 'object' && child && 'type' in child && child.type === CardSection) {
      return cloneElement(child, {
        'data-first-section': index === 0 || undefined,
        'data-last-section': index === _children.length - 1 || undefined,
      });
    }

    return child;
  });

  return (
    <CardProvider value={{ getStyles }}>
      <Paper ref={ref} {...getStyles('root')} {...others}>
        {content}
      </Paper>
    </CardProvider>
  );
});

Card.classes = classes;
Card.displayName = '@mantine/core/Card';
Card.Section = CardSection;

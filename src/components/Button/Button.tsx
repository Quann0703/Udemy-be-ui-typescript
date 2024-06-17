import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonProps = {
    children: string | JSX.Element;
    to?: string;
    href?: string;
    className?: string;
    primary?: boolean;
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void | React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ children, to, href, className, primary, disabled, onClick, ...passProps }: ButtonProps) {
    let Comp: any = 'button';

    const props: any = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key: string) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className as string]: className,
        primary,
        disabled,
    });

    return (
        <Comp className={classes} {...props}>
            {children}
        </Comp>
    );
}

export default Button;

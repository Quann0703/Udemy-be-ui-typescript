import React, { ReactNode } from 'react';

import './GlobalStyles.scss';

function GlobalStyles({ children }: { children: ReactNode }) {
    return React.Children.only(children);
}

export default GlobalStyles;

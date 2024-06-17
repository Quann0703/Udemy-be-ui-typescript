import classnames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classnames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>logo</div>
                <div className={cx('body')}>body</div>
                <div className={cx('actions')}>actions</div>
            </div>
        </header>
    );
}

export default Header;

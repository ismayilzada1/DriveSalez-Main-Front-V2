import React from 'react';

const Logo = ({ size }) => {

    const logoStyle = {
        backgroundColor: 'transparent',
        filter: 'url(#colorFilter)',
        width: size,
        height: 'auto',
    };

    return (
        <a href={'/'}>
            <img
                src="/assets/images/logo_black.png"
                style={logoStyle}
                className="img-fluid"
                alt=""
            />

            {/* for black theme */}
            {/*<img*/}
            {/*    src="/assets/images/logo_white.png"*/}
            {/*    style={logoStyle}*/}
            {/*    className="img-fluid"*/}
            {/*    alt=""*/}
            {/*/>*/}


            {/*If u wanna convert black logo to white u can use this, but it will also change all other colors to white too*/}

            {/*<svg style={{display: 'none'}}>*/}
            {/*    <defs>*/}
            {/*        <filter id="colorFilter" colorInterpolationFilters="sRGB">*/}
            {/*            <feColorMatrix*/}
            {/*                type="matrix"*/}
            {/*                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"*/}
            {/*            />*/}
            {/*        </filter>*/}
            {/*    </defs>*/}
            {/*</svg>*/}


        </a>
    );
};

export default Logo;
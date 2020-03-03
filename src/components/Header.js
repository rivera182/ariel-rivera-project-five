import React from 'react';

const Header = (props) => {

    const menus = props.menus;

    return (
        <header>
            <div className="wrapper">
                <nav className="nav-menu">
                    <h1>News News</h1>  
                    <ul>
                        <li onClick={() => props.menuClick("country")}>
                            Country
                        </li>
                        <li onClick={() => props.menuClick("category")}>
                            Category
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="sub-menu">
                <div className="wrapper">
                    {menus.country ?
                        <ul className="countries">
                            <li onClick={() => props.countryChange('ca')}>Canada</li>
                            <li onClick={() => props.countryChange('us')}>USA</li>
                            <li onClick={() => props.countryChange('gb')}>UK</li>
                        </ul>
                        : null}

                    {menus.category ?
                        <ul className="categories">
                            <li onClick={() => props.categoryChange('business')}>Business</li>
                            <li onClick={() => props.categoryChange('sports')}>Sports</li>
                            <li onClick={() => props.categoryChange('technology')}>Technology</li>
                            <li onClick={() => props.categoryChange('entertainment')}>Entertainment</li>
                        </ul>
                        : null}
                </div>
            </div> 
        </header>
    );
}

export default Header; 
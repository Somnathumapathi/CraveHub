    import React from 'react';

    const AppBar = ({ pageName }) => {
        return (
        <nav>
            <div className="bg-black h-16">
            <a className="text-green-600 text-2xl font-semibold" href='homePage'>CraveHub  &nbsp;| &nbsp;&nbsp;{pageName}</a>
            
            </div>
        </nav>
        );
    };
    
    export default AppBar;
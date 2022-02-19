import React from 'react';

interface header {
    name: string;
}

const Header = (props: header) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
}

export default Header
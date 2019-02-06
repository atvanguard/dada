import React from 'react';

import Icon from '../Icon';

import { ReactComponent as Loadr } from '../../assets/img/loader.svg'; 

const Loader = () => {
  
  return(
    <div>
      <Icon>
        <Loadr />
      </Icon>
    </div>
  )
}

export default Loader;
import React from 'react';
import classes from './Content.module.css'

const Content = (props) => {
    let classArray = [classes.content]
    if (props.withNav) {
        classArray.push(classes.withNav) 
    }
    return ( <div className={classArray.join(' ')}>{props.children}</div> );
}
 
export default Content;
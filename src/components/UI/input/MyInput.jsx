import React from 'react';
import style from  './MyInput.module.css';

export const MyInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={style.myInput} {...props} />
    );
});
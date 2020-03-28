import React from 'react'
import {Provider} from 'react-redux';
import App from './App'
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';


const Entry = (props)=>{

    return(
        <Provider store={store}>
        <BrowserRouter>
        <App {...props}/>
        </BrowserRouter>
      </Provider>
    )
}

export default Entry;

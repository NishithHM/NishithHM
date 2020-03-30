import React, {Component} from 'react'
import {connect} from 'react-redux'
import { userUpdate } from '../../redux/actions'
import { getService } from '../../services'
class Protected extends Component{
    constructor(props){
        super(props)
        this.loginAuthentic = ''
    }
    componentDidMount(){
        const phone = sessionStorage.getItem('phone')
        if(sessionStorage.getItem('user_token')===null){
            this.props.history.push('/')
            sessionStorage.clear()
        }
        if(sessionStorage.getItem('user_token')!==null && this.props.loginDetails.token===undefined){
            this.props.dispatch(userUpdate(phone, this.props.history))
        }

        this.loginAuthentic = setInterval(()=>{
            getService(`/user/details/by/${phone}`).then(res=>{
                if(res.data.payload.currentToken!==sessionStorage.getItem('user_token')){
                    this.props.history.push('/')
                    clearTimeout(this.loginAuthentic)
                    sessionStorage.clear()
                }
            })
        },1000*5*60)
    }


    componentDidUpdate(){
        if(sessionStorage.getItem('user_token')===null){
            this.props.history.push('/')
            sessionStorage.clear()
        }
    }

    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loginDetails: state.authReducer.loginDetails
    }
}

export default connect(mapStateToProps)(Protected)
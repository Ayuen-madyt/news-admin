import {
    ADD_ARTICLES,
    LOADING, 
    USER_DETAILS, 
    GET_PROFILES,
    SIGNUP_ERROR,
    LOGIN_ERROR,
    DELETE_ARTICLE,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    USERS
} from './actions'

const initialState = {
    loading: false,
    articles: [],
    profile:[],
    users:[],
    userDetails:[], //where user token, username, userid and email are
    errors:{
        signup:[],
        login:[]
    },
    passwordReset:[],
    passwordConfirm:[]
}

export const reducer = (state=initialState, action)=>{
    switch(action.type){
        case LOADING:
            return{
                ...state,
                loading:true
            }
        
        case DELETE_ARTICLE:
            const newArticles = state.articles.filter(article => article.id !== action.payload)
            return{
                ...state,
                articles: newArticles
            }

        case ADD_ARTICLES:
            return{
                ...state,
                loading:false,
                articles:action.payload
            }
        case USERS:
            return{
                ...state,
                loading:false,
                users:action.payload
            }
        case USER_DETAILS:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('userId', action.payload.user_id)
            localStorage.setItem('email', action.payload.email)
            return{
                ...state,
                userDetails: action.payload
            }
        case GET_PROFILES:
            return{
                ...state,
                profile:action.payload
            }
        case SIGNUP_ERROR:
            return{
                ...state,
                errors:{
                    ...state.errors,
                    signup: action.payload
                }
            }
        case LOGIN_ERROR:
            return{
                ...state,
                errors:{
                    ...state.errors,
                    login: action.payload
                }
        }
        case PASSWORD_RESET_SUCCESS:
            return{
                ...state,
                loading:false,
                passwordReset:action.payload
            }
        case PASSWORD_RESET_FAIL:
            return{
                ...state,
                loading:false,
                passwordReset:action.payload
            }
        case PASSWORD_RESET_CONFIRM_SUCCESS:
            return{
                ...state,
                loading:false,
                passwordConfirm:action.payload
            }
        case PASSWORD_RESET_CONFIRM_FAIL:
            return{
                ...state,
                loading:false,
                passwordConfirm:action.payload
            }

        default:
            return state;
    }
}

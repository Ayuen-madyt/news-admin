import axios from 'axios'

export const ADD_ARTICLES = "ADD_ARTICLES";
export const LOADING = "LOADING";
export const USER_DETAILS = "USER_DETAILS";
export const USERS = "USERS";
export const GET_PROFILES ="GET_PROFILES";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const DELETE_ARTICLE = "DELETE_ARTICLE"
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS"
export const PASSWORD_RESET_FAIL = "PASSWORD_RESET_FAIL"
export const PASSWORD_RESET_CONFIRM_SUCCESS = "PASSWORD_RESET_CONFIRM_SUCCESS"
export const PASSWORD_RESET_CONFIRM_FAIL = "PASSWORD_RESET_CONFIRM_FAIL"
export const POST_SUCCESS ="POST_SUCCESS";
export const POST_FAIL ="POST_FAIL";
export const UPDATE_PROFILE_SUCCESS ="UPDATE_PROFILE";
export const UPDATE_PROFILE_FAIL ="UPDATE_PROFILE_FAIL";

// post article action
export const postSuccess = ()=>{
    return{
        type: POST_SUCCESS
    }
}

// post fail
export const postFail = ()=>{
    return{
        type: POST_FAIL
    }
}

// update profile action
export const updateProfileSuccess = ()=>{
    return{
        type: UPDATE_PROFILE_SUCCESS
    }
}
export const updateProfileFail = ()=>{
    return{
        type: UPDATE_PROFILE_FAIL
    }
}
// error action for signup
export const getSignUpError = (error)=>{
    return{
        type: SIGNUP_ERROR,
        payload: error
    }
}
// error action for login
export const getLoginError = (error)=>{
    return{
        type: LOGIN_ERROR,
        payload: error
    }
}

// password reset success
export const passWordResetSuccess = (response)=>{
    return {
        type:PASSWORD_RESET_SUCCESS,
        payload:response
    }
}

// password reset fail
export const passWordResetFail = (response)=>{
    return {
        type:PASSWORD_RESET_FAIL,
        payload:response
    }
}

// password reset confirm success
export const passWordResetConfirmSuccess = (response)=>{
    return {
        type:PASSWORD_RESET_CONFIRM_SUCCESS,
        payload:response
    }
}

// password reset confirm fail
export const passWordResetConfirmFail = (response)=>{
    return {
        type:PASSWORD_RESET_CONFIRM_FAIL,
        payload:response
    }
}


// delete article action
export const deleteArticle = (articleId)=>{
    return{
        type: DELETE_ARTICLE,
        payload: articleId
    }
}


// loading symbol
export const loading = ()=>{
    return{
        type:LOADING,
    }
}

// action for fetching articles
export const getArticles = (articles)=>{
    return{
        type: ADD_ARTICLES,
        payload: articles
    }
}

// action for adding user details upon login
export const addUserDetails = (data)=>{
    return{
        type:USER_DETAILS,
        payload: data
    }
}

// action for dispatching user profiles to redux store
export const getProfiles = (profiles)=>{
    return{
        type: GET_PROFILES,
        payload: profiles
    }
}

// action for dispatching users to redux store
export const getUsers = (users)=>{
    return{
        type: USERS,
        payload: users
    }
}


// action thunk for fetching users list
export const fetchUsers = ()=>(dispatch)=>{
    dispatch(loading());
    // http://127.0.0.1:8000
   return axios.get('/users/list/')
   .then(res=>{
       dispatch(getUsers(res.data))
   })
   .catch(
       //err=>console.log(err)
    )
}

// thunk for fetching profiles
export const fetchProfiles = ()=>(dispatch)=>{
    dispatch(loading());
   return axios.get('/users/profile/')
   .then(res=>{
       dispatch(getProfiles(res.data))
   })
   .catch(
       //err=>console.log(err)
    )
}

// this function is an action which will be dispatched---
// to the store in app.js inside useEffect
export const fetchData = ()=>(dispatch)=>{
    dispatch(loading());
   return axios.get('/articles/')
   .then(res=>{
       dispatch(getArticles(res.data))
   })
   .catch(
       //err=>console.log(err)
    )
}
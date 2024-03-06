import { createContext, useReducer} from "react";

 //초기상태
 const initialState = {
    isLoggedIn:false, //로그인 여부
};

//Context 객체 생성
const AuthContext = createContext();

//리듀서 함수 
//state: 현재 가리키고 있는 상태
//dispatch:액션을 발생시키는 함수 
const reducer = (state,action) => {
    switch(action.type) {
        case 'LOGIN' :
            return {
                ...state, //불변성 유지
                isLoggedIn:true,
            };

        case 'LOGOUT' : 
            return {
                ...state,
                isLoggedIn:false,
            };

        //아무것도 해당되지 않을 시 기본 상태 반환
        default:
            return state;
    }
}


//createContext.Provider 작성
const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    //로그인 액션 디스패치 
    const login = () => {
        dispatch({type:'LOGIN'});
    }

    //로그아웃 액션 디스패치 
    const logout = () => {
        dispatch({type:'LOGOUT'});
    };
  
    return (
      <AuthContext.Provider value={{state,login,logout}}>
        {children}
      </AuthContext.Provider>
    );
  };

  
  export { AuthContext, AuthProvider };
  

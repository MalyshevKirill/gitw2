import './App.css'
import { useState } from 'react'
import Header from './Components/Header/Header'
import MainView from './Components/MainView/MainView'
import { token } from './Scripts/Token'

export interface RequestStatus {
  code: number
  text: string
}

function App() {
  const [userInfo, setUserInfo] = useState<any>({})
  const [userReposList, setUserReposList] = useState<Array<any>>([])
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false)
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    {
      code: 0,
      text: ""
    }
  )

  const CheckGitAcc = async (userName:string) => {
    setLoadingStatus(true)
    await Promise.all([
      fetch('https://api.github.com/users/' + userName, {
        method:'GET',
        headers: new Headers({
            "Authorization": token,
        })
      })
      .then(responce => 
        {
          if(responce.status===200) {
            setRequestStatus({code: responce.status, text: "Success"})
            return responce.json()
          }
          else {
            responce.status===403?setRequestStatus({code: responce.status, text: "API limit"}):
            setRequestStatus({code: responce.status, text: responce.statusText})
            return null
          }
        }
      )
      .then(
          (result) => {
            if(result !== null) {
              setUserInfo(result)
            }
          }
        ),
      fetch('https://api.github.com/users/' + userName + '/repos', {
          method:'GET',
          headers: new Headers({
              "Authorization": token,
          })
        })
      .then(responce => 
          {
            if(responce.status===200) {
              return responce.json()
            }
            else {
              return null
            }        
          }
        )
      .then(
          (result) => {
            if(result !== null) {
              setUserReposList(result)
            }
          })
    ]).finally(() => {setLoadingStatus(false)})
  }

  return (
    <div className="App">
        <Header CheckGitAcc={CheckGitAcc} loadingStatus={loadingStatus} requestStatus={requestStatus} setRequestStatus={setRequestStatus}/>
        {requestStatus.code===200&&!loadingStatus&&
          <MainView userInfo={userInfo} userReposList={userReposList}/>
        }
    </div>
  );
}

export default App;

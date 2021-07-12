import React, { useState } from 'react'
import { 
  LoginButton,
  LogoutButton,
  Text,
  useSession,
  CombinedDataProvider,
} from '@inrupt/solid-ui-react'
import AddTodo from './components/AddTodo'

const authOptions = {
  clientName: "Solid Todo App",
}

function App() {
  const { session } = useSession();
  const [oidcIssuer, setOidcIssuer] = useState("")

  console.log("session", session)

  const handleChange = (event) => {
    setOidcIssuer(event.target.value)
  }

  return (
    <div className="app-container">
      {session.info.isLoggedIn ? (
        <CombinedDataProvider
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        >
          <div className="message logged-in">
            <span>You are logged in as: </span>
            <Text properties={[
                "http://www.w3.org/2006/vcard/ns#fn",
                "http://xmlns.com/foaf/0.1/name",
              ]} />
            <LogoutButton />
          </div>
          <section>
            <AddTodo />
          </section>
        </CombinedDataProvider>
      ) : (
        <div className="message">
          <span>You are not logged in. </span>
          <span>
            Login with:
            <input 
              className="oidc-issuer-input"
              list="providers"
              name="oidcIssuer"
              onChange={(e) => handleChange(e)}
              type="text"
              value={oidcIssuer}
            />
            <datalist id="providers">
              <option value="https://broker.pod.inrupt.com/" />
              <option value="https://inrupt.net/" />
            </datalist>
          </span>
          <LoginButton 
            oidcIssuer={oidcIssuer}
            redirectUrl={window.location.href}
            authOptions={authOptions}
          />
        </div>
      )}
    </div>
  );
}

export default App;

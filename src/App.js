import React, { useState } from 'react'
import { LoginButton } from '@inrupt/solid-ui-react'

const authOptions = {
  clientName: "Solid Todo App",
}

function App() {
  const [oidcIssuer, setOidcIssuer] = useState("")

  const handleChange = (event) => {
    console.log("handlechange called ")
    setOidcIssuer(event.target.value)
  }
  return (
    <div className="app-container">
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
  );
}

export default App;

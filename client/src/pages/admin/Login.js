import { useState } from "react";

export default function Login(props) {
  const [dataToSend, setDataToSend] = useState();
  
  const formSubmit = (e) => {
    e.preventDefault();
    props.onDataUpdate(dataToSend);
  };

  return (
    <main className="login-container">
      <div>
        <h2>Login</h2>
        <form onSubmit={formSubmit}>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

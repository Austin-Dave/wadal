// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"
//   //       >
//   //         Learn React
//   //       </a>
//   //     </header>
//   //   </div>
//   // );

// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Navigation from "./components/Navigation";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Room from "./components/Room";

// const App = () => {
//   return (
//     <Router>
//       <Navigation />
//       <Switch>
//         <Route path="/signup" component={Signup} />
//         <Route path="/login" component={Login} />
//         <Route path="/room/:id" component={Room} />
//       </Switch>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Room from "./components/Room";
import VideoRoom from "./components/VideoRoom";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/videoroom" element={<VideoRoom />} />
      </Routes>
    </Router>
  );
};

export default App;

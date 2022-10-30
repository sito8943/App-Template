import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import Main from "./layouts/Main";

// views
import Home from "./views/Home/Home";
import SignUp from "./views/Auth/SignUp";
import SignIn from "./views/Auth/SignIn";
import SignOut from "./views/Auth/SignOut";
import NotFound from "./views/NotFound/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/auth" element={<></>}>
        <Route index="index" element={<SignIn />} />
        <Route exact path="/auth/sign-up" element={<SignUp />} />
        <Route exact path="/auth/sign-out" element={<SignOut />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

import Home from "./Routes/Home/Home.component"; 
import Navigation from "./Routes/Navigation/Navigation.component";
import { Routes, Route } from "react-router-dom";

const App = () => {

  const Shop = () => {
    return <h1>Shop page</h1>
  }

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />}/>
      </Route>
    </Routes>
  );
};

export default App;

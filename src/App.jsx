import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./components/Home";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <>
                <Header /> <Hero />
              </>
            }
          />
        </Route>

        <Route path="/channels" element={<Home />}>
          <Route path="/channels/:id" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

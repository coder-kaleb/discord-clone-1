import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Header />} />
        </Route>
      </Routes>
    </>
  );
}

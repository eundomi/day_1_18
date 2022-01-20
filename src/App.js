import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Header";
import { Nav } from "./Nav";
import { Article } from "./Article";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { Read } from "./Read";
import { Create } from "./Create";
import { Update } from "./Update";

function App() {
  const dispatch = useDispatch();
  // topics의 데이터를 1회 가져온다.
  useEffect(() => {
    fetch("/topics")
      .then((type) => type.json())
      .then((result) => {
        // state.topics 을 result의 값으로 변경한다.
        dispatch({ type: "SET_TOPICS", topics: result });
      });
  }, []);
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      {/* url에 따라서 컨텐츠가 달라지게 처리하고 싶다. */}
      <Routes>
        <Route
          path="/"
          element={
            <article>
              <h1>Welcome</h1>Hello, WEB
            </article>
          }
        ></Route>
        <Route path="/read/:id" element={<Read></Read>}></Route>
        <Route path="/create" element={<Create></Create>}></Route>
        <Route path="/update/:id" element={<Update></Update>}></Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Control></Control>}></Route>
        <Route path="/read/:id" element={<Control></Control>}></Route>
      </Routes>
    </div>
  );
}
function Control() {
  const { id } = useParams();
  let contextUI = null;
  if (id !== undefined) {
    contextUI = (
      <>
        <li>
          <Link to={"/update/" + id}>update</Link>
        </li>
      </>
    );
  }
  return (
    <ul>
      <li>
        <Link to="/create">create</Link>
      </li>
      {contextUI}
    </ul>
  );
}
export default App;

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function Update() {
  const dispatch = useDispatch();
  const go = useNavigate();

  const { id } = useParams();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  useEffect(() => {
    // topics/id 데이터를 가져온다.
    fetch("/topics/" + id)
      .then((type) => type.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, [id]);
  if (title === undefined) {
    return <>Loading....</>;
  }

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          await putTopic(evt, id);
          go("/read/" + id);
          const response = await fetch("/topics");
          const topics = await response.json();
          dispatch({ type: "SET_TOPICS", topics: topics });
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(evt) => setBody(evt.target.value)}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="update" />
        </p>
      </form>
    </article>
  );

  async function putTopic(evt, id) {
    const response = await fetch("/topics/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: evt.target.title.value,
        body: evt.target.body.value,
      }),
    });
    const result = await response.json();
    return result;
  }
}

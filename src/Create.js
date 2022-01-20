import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Create() {
  const dispatch = useDispatch();
  const go = useNavigate();
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          const newTopic = await postTopic(evt);
          go("/read/" + newTopic.id);
          const response = await fetch("/topics");
          const topics = await response.json();
          dispatch({ type: "SET_TOPICS", topics: topics });
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="create" />
        </p>
      </form>
    </article>
  );

  async function postTopic(evt) {
    const response = await fetch("http://localhost:3333/topics", {
      method: "POST",
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

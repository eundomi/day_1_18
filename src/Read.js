import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Read() {
  // const params = useParams();
  // const id = params.id;
  const { id } = useParams();
  const [topic, setTopic] = useState();
  useEffect(() => {
    // topics/id 데이터를 가져온다.
    setTopic(undefined);
    fetch("/topics/" + id)
      .then((type) => type.json())
      .then((result) => {
        setTopic(result);
      });
  }, [id]);
  if (topic === undefined) {
    return <>Loading....</>;
  }
  return (
    <article>
      <h1>{topic.title}</h1>
      {topic.body}
    </article>
  );
}

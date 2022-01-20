import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
export function Nav() {
  const topics = useSelector(state=>state.topics);
  let lis = [];
  for(let i=0; i<topics.length; i++){
    lis.push(<li key={topics[i].id}><Link to={'/read/'+topics[i].id}>{topics[i].title}</Link></li>)
  }
  return <nav>
    <ul>
      {lis}
    </ul>
  </nav>;
}

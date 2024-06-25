import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

export const ReqistryPage = observer(() => {
  const { kitId } = useParams();

  if (!kitId) return null;

  return <div>ReqistryPage</div>;
});

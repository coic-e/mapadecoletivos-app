import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import CollectivesMap from "./pages/CollectivesMap";
import Collective from "./pages/Collective";
import CreateCollective from "./pages/CreateCollective";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={CollectivesMap} />
        <Route path="/collectives/create" component={CreateCollective} />
        <Route path="/collectives/:id" component={Collective} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

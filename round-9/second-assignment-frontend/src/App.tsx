import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfo from "./PatientInfo";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
          <Container>
            <Header as="h1">Patientor</Header>
            <Button as={Link} to="/" primary>
              Home
            </Button>
            <Divider hidden />
            <Switch>
              <Route path="/patients/:id" component={<PatientInfo />}>
                <PatientInfo />
              </Route>
              <Route path="/" component={<PatientListPage />}>
                <PatientListPage />
              </Route>
            </Switch>
          </Container>
      </div>
    </Router>
  );
};

export default App;

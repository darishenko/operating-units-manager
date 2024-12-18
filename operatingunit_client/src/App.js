import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { ConfigProvider, Layout } from "antd";
import React from "react";
import { primaryColor } from "./const/constants";
import OperatingRoomLoginPage from "./pages/auth/OperatingRoomLoginPage";
import CommonLoginPage from "./pages/auth/CommonLoginPage";
import OperatingRoomOperations from "./pages/operatingRoom/OperatingRoomOperations";
import UserLoginPage from "./pages/auth/UserLoginPage";
import OperationDetailsPage from "./pages/operation/OperationDetailsPage";
import OperationFactStepPage from "./pages/operation/OperationFactStepPage";
import { clientApi } from "./const/api/clientApi";
import OperationsPlanLoadPage from "./pages/manager/OperationsPlanLoadPage";
import OperationsPlanPage from "./pages/manager/OperationsPlanPage";
import StatisticsPage from "./pages/manager/StatisticsPage";
import MonitoringPage from "./pages/manager/MonitoringPage";
import OperatingRoomPage from "./pages/manager/OperatingRoomPage";
import UsersByRolePage from "./pages/manager/UsersByRolePage";
import {getAuthHeader, getToken} from "./functions/Token";

axios.defaults.baseURL = `http://192.168.0.104:80`;

axios.defaults.formSerializer = (data) => {
  return JSON.stringify(data);
};

const token = getToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = getAuthHeader();
}

const defaultTheme = {
  borderRadius: 6,
  colorPrimary: primaryColor,
  backgroundColor: primaryColor,
  Button: {
    colorPrimary: primaryColor,
  },
};

function App() {
  const [data] = React.useState(defaultTheme);

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="centered-content">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: data.colorPrimary,
                borderRadius: data.borderRadius,
              },
              components: {
                Button: {
                  colorPrimary: data.Button?.colorPrimary,
                  algorithm: data.Button?.algorithm,
                },
              },
            }}
          >
            <Router>
              <Routes>
                <Route path="*" element={<CommonLoginPage />} />
                <Route path="/" element={<CommonLoginPage />} />
                <Route path="/login" element={<CommonLoginPage />} />
                <Route path="/user/login" element={<UserLoginPage />} />
                <Route
                  path="/operatingRoom/login"
                  element={<OperatingRoomLoginPage />}
                />

                <Route
                  path="/operatingRoom/operations"
                  element={<OperatingRoomOperations />}
                />
                <Route
                  path="/operatingRoom/operations/:id"
                  element={<OperationDetailsPage />}
                />
                <Route
                  path="/operatingRoom/operations/:id/fact/:factId/edit"
                  element={<OperationDetailsPage />}
                />
                <Route
                  path={clientApi.operatingRoom.operationFactCheckout(
                    ":id",
                    ":factId",
                  )}
                  element={<OperationDetailsPage />}
                />
                <Route
                  path={clientApi.operatingRoom.operationStep(
                    ":id",
                    ":factId",
                    ":stepId",
                  )}
                  element={<OperationFactStepPage />}
                />

                <Route
                  path={clientApi.manager.loadPlan}
                  element={<OperationsPlanLoadPage />}
                />
                <Route
                  path={clientApi.manager.plan}
                  element={<OperationsPlanPage />}
                />
                <Route
                  path={clientApi.manager.operation(":id")}
                  element={<OperationDetailsPage />}
                />
                <Route
                  path={clientApi.manager.statistics}
                  element={<StatisticsPage />}
                />
                <Route
                  path={clientApi.manager.monitoring}
                  element={<MonitoringPage />}
                />
                <Route
                  path={clientApi.manager.operatingRooms}
                  element={<OperatingRoomPage />}
                />
                <Route
                  path={clientApi.manager.users(":role")}
                  element={<UsersByRolePage />}
                />
              </Routes>
            </Router>
          </ConfigProvider>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;

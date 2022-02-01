import React, { useState } from "react";
import { Box, CircularProgress, LinearProgress, Paper, Tab, Tabs } from "@mui/material";
import TabPanel from "../../utils/TabPanel";
import AccountsPanel from "./AccountsPanel";
import ContactsPanel from "./ContactsPanel";
import DonationsPanel from "./DonationsPanel";
import SavedPanel from "./SavedPanel";
import ReportingResults from "./ReportingResults";

export default function Reporting() {
  const [response, setResponse] = useState({
    data: null,
    error: null,
    isLoading: false,
  });
  const [value, setValue] = useState(0);
  const tabs = ["Saved", "Accounts", "Contacts", "Donations"];

  const a11yProps = (index) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };

  const changeTab = (event, index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "row",
        p: 3,
      }}
    >
      <Paper elevation={6} sx={{ maxWidth: "25%" }}>
        <Tabs
          onChange={changeTab}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
          value={value}
          variant="scrollable"
        >
          {tabs.map((tab, index) => {
            return (
              <Tab
                key={index}
                label={tab}
                style={{
                  borderBottom: value === index ? "2px solid #3f50b5" : "none",
                  color: value === index ? "#3f50b5" : "gray",
                  fontWeight: value === index ? "bold" : "",
                }}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
        <TabPanel value={value} index={0}>
          <SavedPanel setResponse={setResponse} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AccountsPanel setResponse={setResponse} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ContactsPanel setResponse={setResponse} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DonationsPanel setResponse={setResponse} />
        </TabPanel>
      </Paper>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100vw" }}>
        {response.isLoading ? (
          <CircularProgress sx={{ justifySelf: "center", ml: 3 }} />
        ) : (
          <ReportingResults response={response} queryType={value} />
        )}
      </Box>
    </Box>
  );
}

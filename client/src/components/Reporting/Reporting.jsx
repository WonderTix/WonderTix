import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import TabPanel from "../../utils/TabPanel";
import AccountsPanel from "./AccountsPanel";
import ContactsPanel from "./ContactsPanel";
import DonationsPanel from "./DonationsPanel";
import SavedPanel from "./SavedPanel";
import ReportingResults from "./ReportingResults";

export default function Reporting() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
      }}
    >
      <Paper elevation={6} sx={{ m: 3, maxWidth: "20rem" }}>
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
          <SavedPanel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AccountsPanel setData={setData} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ContactsPanel setData={setData} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DonationsPanel setData={setData} />
        </TabPanel>
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          mr: 3,
          mt: 3,
          width: "100vw",
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ justifySelf: "center", ml: 3 }} />
        ) : (
          <ReportingResults data={data} queryType={value} />
        )}
      </Box>
    </Box>
  );
}

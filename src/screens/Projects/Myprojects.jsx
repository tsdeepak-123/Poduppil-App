import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Projects from "../../components/Projects/Projects";
import Header from "../../components/Header/Header";

const Myprojects = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshTrigger(!refreshTrigger);
    setTimeout(() => setRefreshing(false), 1000);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Projects />
    </SafeAreaView>
  );
};

export default Myprojects;

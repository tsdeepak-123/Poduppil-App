import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from "react-native";
import moment from "moment";

const AttendanceDisplay = ({ attendanceData }) => {
  const isLabourData = attendanceData?.LabourAttendance !== undefined;
  const hasAttendanceData = attendanceData !== null && (isLabourData ? attendanceData?.LabourAttendance?.length > 0 : attendanceData?.StaffAttendance?.length > 0);

  return (
    <View style={styles.container}>
      {attendanceData === null ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : !hasAttendanceData ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No attendance recorded for this day.</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.tableContainer}>
            <View style={styles.table}>
              {isLabourData
                ? attendanceData?.LabourAttendance?.map((obj) =>
                    obj?.records?.map((item) => (
                      <View key={item._id} style={styles.row}>
                        <Image
                          source={{
                            uri: item?.laborerId
                              ? item?.laborerId?.photo
                              : item?.StaffId?.photo,
                          }}
                          style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                          <Text style={styles.name}>
                            {item?.laborerId
                              ? item?.laborerId?.name
                              : item?.StaffId?.name}
                          </Text>
                          <Text
                            style={[
                              styles.status,
                              { color: getStatusColor(item.status) },
                            ]}
                          >
                            {item.status === "present"
                              ? "Present"
                              : item.status === "halfday"
                              ? "Half Day"
                              : "Absent"}
                          </Text>
                        </View>
                      </View>
                    ))
                  )
                : attendanceData?.StaffAttendance?.map((obj) =>
                    obj?.records?.map((item) => (
                      <View key={item._id} style={styles.row}>
                        <Image
                          source={{ uri: item?.StaffId?.photo }}
                          style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                          <Text style={styles.name}>{item?.StaffId?.name}</Text>
                          <Text
                            style={[
                              styles.status,
                              { color: getStatusColor(item.status) },
                            ]}
                          >
                            {item.status === "present"
                              ? "Present"
                              : item.status === "halfday"
                              ? "Half Day"
                              : "Absent"}
                          </Text>
                        </View>
                      </View>
                    ))
                  )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "present":
      return "#2ecc71"; 
    case "halfday":
      return "#f39c12"; 
    case "absent":
      return "#e74c3c";
    default:
      return "#333"; 
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf0f1", // Light gray
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#008DDA", 
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "red",
  },
  dateContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008DDA", 
  },
  tableContainer: {
    flex: 1,
    marginTop: 10,
  },
  table: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#008DDA", 
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e", // Dark gray
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AttendanceDisplay;

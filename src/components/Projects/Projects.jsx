import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { getProjects } from "../../services/api";
import Icon from 'react-native-vector-icons/FontAwesome';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const fetchProjects = async () => {
    try {
      let currentPage = page;
      if (searchQuery !== "") {
        setPage(1);
        currentPage = 1; 
      }
      const data = await getProjects({
        page: currentPage,
        limit,
        searchTerm: searchQuery,
      });
      setProjects(data.FindProject);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, searchQuery]);

  const handleDetailPress = (projectId) => {
    console.log("Detail button pressed for project:", projectId);
  };

  const handlePagination = (action) => {
    if (action === "prev" && page > 1) {
      setPage(page - 1);
    } else if (action === "next" && page < Math.ceil(totalCount / limit)) {
      setPage(page + 1);
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Projects</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search projects..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {projects.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.projectCard}
            onPress={() => handleDetailPress(item._id)}
          >
            <Text style={styles.projectName}>{item.name}</Text>
            <Text style={styles.projectDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => handlePagination('prev')} disabled={page === 1}>
          <Icon 
            name="chevron-left" 
            size={25}
            color={page === 1 ? 'gray' : '#008DDA'}
          />
        </TouchableOpacity>
        <Text>{page}</Text>
        <TouchableOpacity onPress={() => handlePagination('next')} disabled={page >= totalPages}>
          <Icon 
            name="chevron-right" 
            size={25}
            color={page >= totalPages ? 'gray' : '#008DDA'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#008DDA',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "#008DDA",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#008DDA",
    borderRadius: 5,
    marginLeft: 10,
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  projectCard: {
    backgroundColor: "#F0F8FF",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Projects;

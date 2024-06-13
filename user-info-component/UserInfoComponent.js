import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import SearchComponent from '../search-component/SearchComponent';
import CustomModal from '../components/CustomModal';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const UserInfoComponent = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let allUsers = [];
        let totalPages = 1; // Default to 1 page initially
        let currentPage = 1;

        // Fetch first page to determine total_pages
        const response = await axios.get('https://reqres.in/api/users?page=1');
        if (response.data && response.data.total_pages) {
          totalPages = response.data.total_pages;
          allUsers = response.data.data;
        }

        // Fetch remaining pages
        while (currentPage < totalPages) {
          currentPage++;
          const nextPageResponse = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
          if (nextPageResponse.data && nextPageResponse.data.data) {
            allUsers = [...allUsers, ...nextPageResponse.data.data];
          }
        }

        setUserData(allUsers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch user data. Please try again later.');
      }
    };

    fetchUserData();
  }, []);

  const openModal = async (userId) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      if (response.data && response.data.data) {
        setSelectedUser(response.data.data);
        setModalVisible(true);
      } else {
        Alert.alert('Error', 'Failed to fetch user details');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Please check your internet connection and try again.');
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      if (!query) {
        // Empty query, fetch all users from all pages
        let allUsers = [];
        let totalPages = 1; 
        let currentPage = 1;
  
        // Fetch first page to determine total_pages
        const response = await axios.get('https://reqres.in/api/users?page=1');
        if (response.data && response.data.total_pages) {
          totalPages = response.data.total_pages;
          allUsers = response.data.data;
        }
  
        // Fetch remaining pages
        while (currentPage < totalPages) {
          currentPage++;
          const nextPageResponse = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
          if (nextPageResponse.data && nextPageResponse.data.data) {
            allUsers = [...allUsers, ...nextPageResponse.data.data];
          }
        }
  
        setUserData(allUsers);
      } else {
        // Non-empty query, fetch user details by ID
        const response = await axios.get(`https://reqres.in/api/users/${query}`);
        if (response.data && response.data.data) {
          // Update userData with the searched user
          const updatedUserData = userData.map(user => user.id === response.data.data.id ? response.data.data : user);
          setUserData(updatedUserData);
          setSelectedUser(response.data.data);
          setModalVisible(true);
        } else {
          // If the user is not found, alert the user
          setUserData([]);
          setSelectedUser(null);
          setModalVisible(false);
          Alert.alert('Error', 'User not found');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error (user not found)
        Alert.alert('Error', 'User not found');
      } else {
        // Handle other network errors
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };  

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>User Information</Text>
        </View>
        <SearchComponent onSearch={handleSearch} />
        {loading ? (
          <ActivityIndicator style={styles.loader} size="large" color="#2596be" />
        ) : (
          <View style={styles.content}>
            <Text style={styles.availableUsersLabel}>AVAILABLE USERS</Text>
            {userData.map((user) => (
              <TouchableOpacity key={user.id} style={styles.card} onPress={() => openModal(user.id)}>
                <View style={styles.userInfoRow}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.label}>ID</Text>
                    <Text style={styles.label}>Name</Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.userInfoText}>{user.id}</Text>
                    <Text style={styles.userInfoText}>{user.first_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <CustomModal visible={modalVisible} onClose={closeModal}>
          <View style={styles.modalContentRow}>
            <View style={styles.modalLeftColumn}>
              <Image source={{ uri: selectedUser?.avatar }} style={styles.userImage} />
            </View>
            <View style={styles.modalRightColumn}>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>First Name</Text>
                <Text style={styles.modalText}>{selectedUser?.first_name}</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Last Name</Text>
                <Text style={styles.modalText}>{selectedUser?.last_name}</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Email</Text>
                <Text style={styles.modalText}>{selectedUser?.email}</Text>
              </View>
              <CustomButton text="Cancel" onPress={closeModal} />
            </View>
          </View>
        </CustomModal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  ribbon: {
    backgroundColor: '#2596be',
    width: '100%',
    marginTop: 0,
    paddingVertical: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  ribbonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    width: '90%',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  availableUsersLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  leftColumn: {
    flex: 0.3,
    alignItems: 'flex-start',
    paddingRight: 0,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 0,
  },
  userInfoText: {
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingRight: 20,
  },
  modalLeftColumn: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 10,
  },
  modalRightColumn: {
    flex: 0.7,
    alignItems: 'flex-start',
  },
  userImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  modalRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 13,
  },
  modalText: {
    fontSize: 13,
    marginBottom: 5,
  },
});

export default UserInfoComponent;

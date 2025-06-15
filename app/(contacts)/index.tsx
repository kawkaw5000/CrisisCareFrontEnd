import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions, TextInput } from "react-native";
import CustomButton from "@/components/buttons/CustomButton";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
import Config from "@/constants/Config";
type Contact = {
  contactName: string;
  contactNumber: string;
  address: string;
  addContactsId: number;
};

export default function ContactPage() {
  useAuthGuard();
  const router = useRouter();
  const windowHeight = Dimensions.get("window").height;
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { height } = Dimensions.get('window');
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${Config.Contact_API}/contactlist`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setContacts(res.data.data);
          console.log(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };
    fetchContacts();
    const intervalId = setInterval(fetchContacts, 1000); 
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() =>{
    
  })
  const handleAddContact = async () => {
    if (!contactName || !contactNumber || !address) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${Config.Contact_API}/addContact`,
        {
          contactName,
          contactNumber,
          address,
        },
        {
          withCredentials: true, 
        }
      );

      console.log("Contact added:", response.data);
      alert("Contact added successfully!");
      setContactName('');
      setContactNumber('');
      setAddress('');
      setShowContactForm(false);
    } catch (error) {
      console.error("Failed to add contact", error);
      alert("Failed to add contact.");
    }
  };

  const handleUpdateContact = async () => {
  if (!selectedContact) return;

    try {
      const response = await axios.put(
        `${Config.Contact_API}/updateContact`,
        {
          addContactsId: selectedContact.addContactsId,
          contactName,
          contactNumber,
          address,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Contact updated successfully");
        setShowContactForm(false);
        setSelectedContact(null);
        setIsEditMode(false);
        setContactName('');
        setContactNumber('');
        setAddress('');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  const openAddContactForm = () => {
    setContactName('');
    setContactNumber('');
    setAddress('');
    setIsEditMode(false);
    setShowContactForm(true);
  };

  const handleSelectContact = (contact: Contact) => {
    setContactName(contact.contactName);
    setContactNumber(contact.contactNumber);
    setAddress(contact.address);
    setSelectedContact(contact);
    setShowContactForm(true);
    setIsEditMode(true); 
  };

  const handleDeleteContact = async () => {
  if (!selectedContact) {
    console.warn("No contact selected for deletion.");
    return;
  }

  try {
    const response = await axios.delete(
      `${Config.Contact_API}/deleteContact/${selectedContact.addContactsId}`
    );

    console.log("Delete successful:", response.data.message);

    // Remove deleted contact from contacts state
    setContacts(prevContacts =>
      prevContacts.filter(c => c.addContactsId !== selectedContact.addContactsId)
    );

    setContactName('');
    setContactNumber('');
    setAddress('');
    setSelectedContact(null);
    setIsEditMode(false);
    setShowContactForm(false);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Delete error:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
  }
};



  return (
    <SafeAreaView style={{...styles.container, backgroundColor: '#84c4ab', position:'relative'}}>
      <View style={styles.centered}>
        <Text style={{...styles.title, marginTop: 50}}>EMERGENCY CONTACTS</Text>
      </View>
      <View style={styles.spacer} />
      <View style={{alignItems: 'center', marginTop: 20, position: 'absolute', top: 0, left: 10}}>
        <TouchableOpacity       
        onPress={() => router.replace("/(home)")}
        >
        <MaterialIcons name="arrow-back-ios" size={50} color="white" />
      </TouchableOpacity>
      </View> 
      <Image
        source={require("../../assets/images/Chat Side Bar.png")}
        style={{
          width: '90%',
          height: height * 0.8,
          resizeMode: 'contain',
          position: 'absolute',
          top: 120,
          left: -130,
        }}
      />
        <View style={{position: 'absolute', top: 445, width: 35, left: 11,
                height: 35,
                borderRadius: 100,
                backgroundColor: '#fff',
                margin: 5,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,}}>
        <TouchableOpacity onPress={openAddContactForm}>
          <FontAwesome name="plus-circle" size={35} color="orange" />
        </TouchableOpacity>  
        </View>
      {contacts.length > 0 ? (
        <View key={contacts.length} style={styles.circleContainer}>
          {contacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectContact(contact)}
              disabled={contacts.length === 0}  // extra safety
            >
              <View style={styles.circle}>
                <FontAwesome name="user" size={25} color="black" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
      {showContactForm && (
      <View style={{position: 'absolute', top:120, right: 0}}>
        <View style={{width: 300, height: windowHeight * 0.80, backgroundColor: 'white', borderRadius: 15,      borderWidth: 4, borderColor: '#409172', alignItems: 'center', gap: 50, padding: 40}}>
          <FontAwesome name="user" size={100} color="#84c4ab"/>
          <View style={{position: "relative"}}>
            <TextInput
              style={{
                height: 40,
                borderColor: "black",
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
                width: 250,
              }}
              placeholder="Contact Name" 
              value={contactName}
              onChangeText={setContactName}           
            />
            <View style={{position: "absolute", top:-30}}>
              <Text style={{fontSize: 15, fontWeight: "bold"}}>Contact Name</Text>
            </View>
          </View> 
          <View style={{position: "relative"}}>
            <TextInput
              style={{
                height: 40,
                borderColor: "black",
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
                width: 250,
              }}
              placeholder="Contact Number"  
              value={contactNumber}
              onChangeText={setContactNumber}          
            />
            <View style={{position: "absolute", top:-30}}>
              <Text style={{fontSize: 15, fontWeight: "bold"}}>Contact Number</Text>
            </View>
          </View>
          <View style={{position: "relative"}}>
            <TextInput
              style={{
                height: 40,
                borderColor: "black",
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
                width: 250,
              }}
              placeholder="Address"   
              value={address}
              onChangeText={setAddress}         
            />
            <View style={{position: "absolute", top:-30}}>
              <Text style={{fontSize: 15, fontWeight: "bold"}}>Address</Text>
            </View>
          </View> 
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <TouchableOpacity
              onPress={isEditMode ? handleUpdateContact : handleAddContact}
              disabled={!isEditMode && contacts.length >= 8}
              style={{
                backgroundColor: !isEditMode && contacts.length >= 8 ? '#ccc' : '#84c4ab',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                opacity: !isEditMode && contacts.length >= 8 ? 0.6 : 1,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                {isEditMode ? 'Update Contact' : 'Add Contact'}
              </Text>
            </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowContactForm(false)}
                style={{
                  backgroundColor: '#ccc',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
              >
              <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isEditMode && (
          <TouchableOpacity
            onPress={handleDeleteContact}
            style={{
              backgroundColor: 'red',
              width: 40,
              height: 40,
              borderRadius: 30, 
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 5, 
              position: 'absolute',
              right: 20,
              top: 10
            }}
          >
            <FontAwesome name="close" size={35} color="orange" />
          </TouchableOpacity>
        )}
      </View>
      )}   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: 'center',
    width: 200
  },
  spacer: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  iconButton: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginBottom: 2,
  },
  iconLabel: {
    fontSize: 12,
    color: "#333",
  },
  iconLabelActive: {
    color: "#FCB647",
    fontWeight: "bold",
  },
  circleContainer: {
    flexDirection: 'column',
    alignItems: 'center',  
    position: 'absolute',
    top: 128, 
    left:12
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 35,
    backgroundColor: '#fff',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  circleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#84c4ab',
  },
});

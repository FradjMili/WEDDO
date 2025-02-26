import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  navigation,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

import { AsyncStorage } from 'react-native';

// import iP from '../constants/BasePath.js';
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/button.js";
import Logo from "../components/Logo.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import InputField from "../components/input.js";
import Background from "../assets/Background.webp";


import { useNavigation } from "@react-navigation/native";
import Profile from "../components/profile.js";
import axios from 'axios'


import BasePath from "../constants/BasePath";
import StorageUtils from "../Utils/StorageUtils.js";

let imageLogo = require('../assets/Logo.png')

const { width, height } = Dimensions.get("window");

import Icon from "react-native-vector-icons/FontAwesome";
const LoginScreen = ({navigation}) => {
  
  const [password,setPassword]=useState("");
  const [email, setEmail] = useState("");
    
  const [errorMsg, setErrorMsg] = useState(null);



const send=()=>{
  let person={email:email, password:password}
  console.log(person);
  axios.post(BasePath + '/api/user/login',person)
  .then(res=>{
    console.log(res.data[0])
  if(res.data==="Please fill all the fields" || res.data==="email not found" || res.data==="login failed" ){
    setErrorMsg(res.data)
  }else {
    console.log("bcdbhdbchdbcdh")
    const userdata =res.data
    console.log(userdata)
    StorageUtils.storeData('user',userdata)
    StorageUtils.storeData('userRole','client')
    navigation.navigate("drawer")
  }


  })
  
}
  const { height } = useWindowDimensions();
  return (
    
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
            <Image
            style={styles.image}
            source={imageLogo}
          />
          </View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Login
          </Text>
          <InputField
            value={email}
            setValue={setEmail}
            label={"Write Your Email ...  "}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#d49b35"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="password"
          />
          <InputField
            value={password}
            setValue={setPassword}
            label={"Password"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#d49b35"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="password"
            inputType="password"
          />
          {errorMsg && 
          <Text style={{color: 'red' , marginTop:-20}}>{errorMsg} </Text>}
          
          
        <TouchableOpacity
                disabled={email==="" ||password ===""}  
                onPress={send} 
                style={{
                    backgroundColor: "#d49b35",
                    padding: 5,
                    borderRadius: 10,
                    marginBottom: 30,
                    borderColor: "#ddd",
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          
          

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >

             <TouchableOpacity
              title="Register"

              onPress={() => navigation.navigate("RegisterScreen")}
            > 
              <Text style={{ color: "#d49b35", fontWeight: "700" }}  onPress={() =>navigation.navigate("RegisterScreen")} > 
              
                {" "}
                Register
                
              </Text>
          </TouchableOpacity> 
          </View>
        </View>
      </SafeAreaView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d49b35",
  },
  slider: {
    height: 0.5 * height,
    backgroundColor: "#B22222",
    borderBottomRightRadius: 75,
    backgroundColor:"white",
    width:width
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "#d49b35",
    borderTopLeftRadius: 75,
    alignItems: "center",
  },
  textBtn: {
    textAlign: "center",
    margin: 15,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    borderRadius: 50,
    //position:"absolute",
    marginTop: "15%",
    alignSelf: "center",
    width: "50%",
    height: "15%",
    backgroundColor: "white",
  },
  image: {
    alignSelf: "center",
    width: 300,
    height: 150,
    margin:30,
    marginTop:0
  }
});
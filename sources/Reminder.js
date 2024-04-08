import React, { useState, useRef } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList, TextInput, ScrollView,Platform, KeyboardAvoidingView, Dimensions, Alert} from 'react-native';
import Navigation from '../components/Navigation';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import moment from 'moment';
import Swiper from 'react-native-swiper';
import CheckList from '../components/CheckList';
const { width } = Dimensions.get('window');


export default function Reminder({navigation}) {
  // const [isChecked,setChecked] = useState(false);
  // const [isChecked1,setChecked1] = useState(false);
  // const [isChecked2,setChecked2] = useState(false); 
  // const [isChecked3,setChecked3] = useState(false); 
  
    let [fontsLoaded] = useFonts({
        "OwenPro-Bold": require("../assets/fonts/OwenPro-Bold.otf"),
        "OwenPro-SemiBold": require("../assets/fonts/OwenPro-SemiBold.otf"),
        "OwenPro-Regular": require("../assets/fonts/OwenPro-Regular.otf"),
        "OwenPro-Medium": require("../assets/fonts/OwenPro-Medium.otf"),
        "OwenPro-Heavy": require("../assets/fonts/OwenPro-Heavy.otf"),
    });

    //Displays splashscreen till the fonts loaded
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [])

    if (!fontsLoaded) {
        return undefined
    } else {
        SplashScreen.hideAsync();
    }

     //State variables
     //const [list, setList] = useState([])
     const [check, setCheck] = useState("")
     const [listsByDate, setListsByDate] = useState({});

     
 
// Function to add task for a specific date
function addTextForDate(text, date) {
  console.log("Adding text for date:", text, date);

  if (text.trim() === "") {
      alert("Please type in something!");
      return;
  }

  const newList = [...(listsByDate[date] || []), { text: text.trim(), isSelected: false }];
  setListsByDate(prevLists => ({ ...prevLists, [date]: newList }));

  // Clearing the text input after adding the task
  setCheck("");
}
// Function to set the value of isSelected based on the state of the checkbox
function setIsSelectedForDate(date, index, isSelected) {
  console.log("Setting isSelected for date:", date, "index:", index, "isSelected:", isSelected);

  setListsByDate(prevLists => {
      const updatedList = (prevLists[date] || []).map((item, i) => {
          return i === index ? { ...item, isSelected } : item;
      });
      return { ...prevLists, [date]: updatedList };
  });
}

 // Function to delete an item at position idx from the list array
 function deleteItemForDate(date, idx) {
  Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
          {
              text: "Cancel",
              style: "cancel"
          },
          {
              text: "Yes", onPress: () => {
                  setListsByDate(prevLists => {
                      const updatedList = (prevLists[date] || []).filter((item, index) => index !== idx);
                      return { ...prevLists, [date]: updatedList };
                  });
              }
          }
      ]);
}
   // Render function for CheckList items
   const renderCheckList = ({ item, index }) => {
    return (
        <CheckList
            data={item}
            index={index}
            setIsSelected={(isSelected) => setIsSelectedForDate(value.toDateString(), index, isSelected)}
            deleteItem={() => deleteItemForDate(value.toDateString(), index)}
        />
    );
};

  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
      <View style={styles.bg}>
        <View style = {styles.bg1}> 
          <View style = {styles.logo}>
              <Image style = {styles.logo1} source={require('../assets/pictures/logo.png')}/>
          </View>

          <View style = {styles.profile}>
              <Text style = {styles.name1}>Reminders</Text>
          </View> 
        </View>
            
        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
              {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                        <View style={[styles.item, isActive && {
                            backgroundColor: '#A7C744',
                            borderColor: '#A7C744',
                          },]}>
                          <Text
                            style={[
                              styles.itemWeekday,
                              isActive && { color: '#fff' },]}>
                            {item.weekday}
                          </Text>

                          <Text
                            style={[
                              styles.itemDate,
                              isActive && { color: '#fff' },]}>
                            {item.date.getDate()}
                          </Text>
                        </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height' } style={styles.flex}>

        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        
          <Text style={styles.subtitle}>{value.toDateString()}</Text>

          <View style={styles.placeholder}>
            <FlatList style={{ flex: 1 }}
              data={listsByDate[value.toDateString()] || []}
              renderItem={({ item, index }) => (
                <CheckList
                  data={item}
                  index={index}
                  setIsSelected={isSelected => setIsSelectedForDate(value.toDateString(), index, isSelected)}
                  deleteItem={() => deleteItemForDate(value.toDateString(), index)}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />

<View style={styles.textBoxWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="New Task"
                onChangeText={text => setCheck(text)}
                value={check}
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => addTextForDate(check, value.toDateString())}>
                <Text style={{ fontSize: 34 , color:'white' , textAlign: 'center', lineHeight: 39 }}>+</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
        </KeyboardAvoidingView>

        
      </View>
  );
}

const styles = StyleSheet.create({
  flex:{
    flex:0.5
  },
  box:{
    width:18,
    height:18,
    marginTop:10,
    borderWidth:1,
    borderColor:'black',
},
  bg: {
    height:'100%',
    width:'100%',
    //paddingVertical: 24,
    backgroundColor:'#E6DACE',
  },
  bg1:{
    width:'100%',
    height:'23%',
    backgroundColor:'#F4ECE6',
    borderRadius:30
},
profile:{
    marginLeft:25,
    marginTop:30
},
name1:{
    fontFamily: "OwenPro-Medium",
    fontSize:30,
},
logo:{
    marginLeft:30,
    marginTop:50,
    marginRight:30
},
logo1:{
    height:40,
    width:100
},
  header: {
    paddingHorizontal: 16,
  },

  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor:'#F4ECE6',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  // placeholderInset: {
  //   borderWidth: 4,
  //   borderColor: '#F4ECE6',
  //   borderStyle: 'dashed',
  //   paddingLeft:20,
  //   paddingTop:10,
  //   borderRadius: 9,
  //   flexGrow: 1,
  //   flexShrink: 1,
  //   flexBasis: 0,
  // },
  rem1:{
    height:60,
    width:300,
    paddingLeft:20,
    paddingTop:5,
    //borderColor:'black',
    //borderWidth:1,
    backgroundColor:"white",
    borderRadius:17,
  },
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: 'white',
    padding: 10
},
textBoxWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 1
},
textInput: {
    borderRadius: 20,
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 15,
    width: "80%",
    color: 'black',
    //marginRight: 5,
    
},
btn: {
    backgroundColor: '#A7C744',
    height: 39,
    width: 40,
    borderRadius: 100,
    alignItems: "center",
    //paddingLeft:9,
    //paddingBottom:2,
    justifyContent: "center",
    marginRight:10,
}
});
import {View, Text, Image, TextInput,Button, StyleSheet, Modal, TouchableOpacity, Pressable, ScrollView, Dimensions} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect,useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Navigation from '../components/Navigation';

const {height, width} = Dimensions.get('window');

export default function Community({navigation}){
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);
    const [modalVisible6, setModalVisible6] = useState(false);
    const [modalVisible7, setModalVisible7] = useState(false);
    
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

   
    return(
        <View style = {styles.bg}>
            <View style = {styles.bg1}>
                <View style = {styles.logo}>
                    <Image style = {styles.logo1} source={require('../assets/pictures/logo.png')}/>
                </View>
                
                <View style = {styles.profile}>
                    <Text style = {styles.name1}>Your Community</Text>
                </View> 
            </View>
            <ScrollView> 
            <View> 
                <View style = {styles.searchbar}>
                    <View style = {styles.searchbaritems}> 
                        <Image style = {styles.searchicon} source={require('../assets/icons/search.png')}/>
                        <TextInput placeholder='Search'></TextInput>
                    </View>
                </View>
       
            
                <View style = {styles.container1}>
                    <Text style = {styles.sub}>Suggested Plarents</Text>
                    <ScrollView 
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    style = {styles.scroll}
                    //pagingEnabled={true}
                    horizontal= {true}
                    showsHorizontalScrollIndicator = {false}
                    decelerationRate={0}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    
                    contentInset={{
                        top: 0,
                        left: 10,
                        bottom: 0,
                        right: 10,}}> 
                    <View style = {styles.community}>
                        <View style = {styles.profilen}> 
                            <View style = {styles.myprofile}></View>
                            <Text style = {styles.me}>joel</Text>
                        </View>
                        
                        <TouchableOpacity onPress={()=>{navigation.navigate('OthersGarden')}}> 
                            <View style = {styles.profilen}> 
                                <View style = {styles.myprofile}></View>
                                <Text style = {styles.me}>nasneen</Text>
                            </View>
                        </TouchableOpacity>

                        <View style = {styles.profilen}> 
                            <View style = {styles.myprofile}></View>
                            <Text style = {styles.me}>abdullah</Text>
                        </View>
                    </View> 
                    </ScrollView>
                </View>

                <View>
                    <Text style = {styles.careTipsText}>Care Tips</Text>
                    <ScrollView 
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    style = {styles.scroll}
                    //pagingEnabled={true}
                    horizontal= {true}
                    showsHorizontalScrollIndicator = {true}
                    decelerationRate={0}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    
                    contentInset={{
                        top: 0,
                        left: 10,
                        bottom: 0,
                        right: 10,}}> 
                    <TouchableOpacity onPress={() => setModalVisible1(true)} style={styles.careTips}>
                        <View style={styles.container}>
                            <View style={styles.tip1}>
                            <Text style={styles.tiptext}>How to repot your plants?</Text>
                            <Text></Text>
                            </View>
                            <Image style={styles.image} source={require('../assets/pictures/repotPlants.jpg')} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible1}
                    onRequestClose={() => {
                        setModalVisible1(!modalVisible1);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button color='black' title="X" onPress={() => setModalVisible1(false)}/>
                        </View>
                        <ScrollView>
                        <Text style={styles.mainTitle}>How to Repot Your Plants?</Text>
                        <Text style={styles.stepTitle}>Step 1: Choose the Right Pot</Text>
                        <Text style={styles.stepDescription}>Select a new pot that is slightly larger than the current one and has drainage holes at the bottom to prevent overwatering.</Text>

                        <Text style={styles.stepTitle}>Step 2: Prepare the Pot</Text>
                        <Text style={styles.stepDescription}>Place a layer of small stones or pot shards at the bottom of the new pot to improve drainage.</Text>

                        <Text style={styles.stepTitle}>Step 3: Remove the Plant</Text>
                        <Text style={styles.stepDescription}>Carefully remove the plant from its current pot by gently squeezing the sides of the pot and tipping it upside down. Be careful not to damage the roots.</Text>

                        <Text style={styles.stepTitle}>Step 4: Inspect the Roots</Text>
                        <Text style={styles.stepDescription}>Check the plant's roots for any signs of rot or overcrowding. Trim off any dead or damaged roots with clean scissors.</Text>

                        <Text style={styles.stepTitle}>Step 5: Add Soil to the New Pot</Text>
                        <Text style={styles.stepDescription}>Fill the new pot with fresh potting soil, leaving enough room at the top for the plant's root ball.</Text>

                        <Text style={styles.stepTitle}>Step 6: Repot the Plant</Text>
                        <Text style={styles.stepDescription}>Place the plant in the new pot and fill in the gaps with additional soil. Press down gently to secure the plant in place.</Text>

                        <Text style={styles.stepTitle}>Step 7: Water the Plant</Text>
                        <Text style={styles.stepDescription}>Water the plant thoroughly until water drains out of the bottom of the pot. Allow the plant to drain completely before placing it in its new location.</Text>

                        <Text style={styles.stepTitle}>Step 8: Care for the Plant</Text>
                        <Text style={styles.stepDescription}>Place the repotted plant in a location with the appropriate light and temperature conditions for its species. Continue to water and care for the plant as needed.</Text>
                        </ScrollView>
                        </View>
                    </View>
                    </Modal>
                       

                    <TouchableOpacity onPress={() => setModalVisible2(true)} style={styles.careTips}>
                        <View style={styles.container}>
                            <View style={styles.tip1}>
                                <Text style={styles.tiptext}>What plants should not be placed together?</Text>
                            </View>
                            <Image style={styles.image} source={require('../assets/pictures/wrongPlants.png')} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={() => {
                        setModalVisible2(!modalVisible2);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button color='black' title="X" onPress={() => setModalVisible2(false)}/>
                        </View>
                        <ScrollView>
                        <Text style={styles.mainTitle}>What plants should not be placed together?</Text>
                        <Text style={styles.stepTitle}>1. Research Plant Compatibility:</Text>
                        <Text style={styles.stepDescription}>Look up information about the plants you want to grow. Identify their specific needs, growth habits, and potential interactions with other plants.</Text>

                        <Text style={styles.stepTitle}>2. Consider Growth Habits:</Text>
                        <Text style={styles.stepDescription}>Identify plants with aggressive growth habits, expansive root systems, or tall structures that may shade out or overcrowd neighboring plants.</Text>

                        <Text style={styles.stepTitle}>3. Check for Disease Susceptibility:</Text>
                        <Text style={styles.stepDescription}>Determine if any of the plants are susceptible to specific diseases. Avoid planting them near other plants that could potentially spread the disease.</Text>

                        <Text style={styles.stepTitle}>4. Assess Nutrient Requirements:</Text>
                        <Text style={styles.stepDescription}>Consider the nutrient requirements of each plant. Avoid planting together plants with similar nutrient requirements to prevent competition for essential nutrients in the soil.</Text>

                        <Text style={styles.stepTitle}>5. Learn about Allelopathy:</Text>
                        <Text style={styles.stepDescription}>Research plants that release chemicals into the soil that can inhibit the growth of other plants. Avoid planting these plants near others that may be affected.</Text>

                        <Text style={styles.stepTitle}>6. Identify Pest Attractors:</Text>
                        <Text style={styles.stepDescription}>Determine if any of the plants are known to attract pests. Avoid planting them near other plants that could be damaged by the pests.</Text>

                        <Text style={styles.stepTitle}>7. Plan Your Garden Layout:</Text>
                        <Text style={styles.stepDescription}>Based on your research, plan your garden layout to ensure that plants with incompatible needs are not placed together.</Text>

                        <Text style={styles.stepTitle}>8. Monitor and Adjust:</Text>
                        <Text style={styles.stepDescription}>Regularly monitor your garden for any signs of plant stress, disease, or pest problems. If issues arise, adjust your garden layout as needed to promote plant health and growth.</Text>
                        </ScrollView>

                        </View>
                    </View>
                    </Modal>

                    <TouchableOpacity onPress={() => setModalVisible3(true)} style={styles.careTips}>
                        <View style={styles.container}>
                            <View style={styles.tip1}>
                            <Text style={styles.tiptext}>How to clean your plant?</Text>
                            </View>
                            <Image style={styles.image} source={require('../assets/pictures/cleanPlant.jpeg')} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible3}
                    onRequestClose={() => {
                        setModalVisible3(!modalVisible3);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button color='black' title="X" onPress={() => setModalVisible3(false)}/>
                        </View>
                        <Text style={styles.mainTitle}>How to clean your plant?</Text>
                        <Text style={styles.stepTitle}>Step 1: Choose the Right Cleaning Method</Text>
                        <Text style={styles.stepDescription}>Select a cleaning method based on the plant's foliage type. For smooth-leaved plants, gently wipe the leaves with a soft, damp cloth. For hairy or textured leaves, use a soft brush or blow gently with a hairdryer on a cool setting to remove dust.</Text>

                        <Text style={styles.stepTitle}>Step 2: Prepare a Cleaning Solution</Text>
                        <Text style={styles.stepDescription}>Mix a mild solution of water and liquid soap or a gentle plant cleaner. Avoid using harsh chemicals or cleaning products that can damage the plant's leaves.</Text>

                        <Text style={styles.stepTitle}>Step 3: Clean the Leaves</Text>
                        <Text style={styles.stepDescription}>Dip a soft cloth or sponge into the cleaning solution and gently wipe the leaves, starting from the base and working towards the tip. Be gentle to avoid damaging the leaves.</Text>

                        <Text style={styles.stepTitle}>Step 4: Rinse the Leaves</Text>
                        <Text style={styles.stepDescription}>After cleaning, use a clean, damp cloth to wipe off any excess soap or cleaning solution from the leaves. Rinse the cloth frequently to avoid spreading dirt or residue.</Text>

                        <Text style={styles.stepTitle}>Step 5: Dry the Leaves</Text>
                        <Text style={styles.stepDescription}>Allow the plant to air dry in a well-ventilated area. Avoid placing the plant in direct sunlight while it is wet, as this can cause the leaves to burn.</Text>

                        <Text style={styles.stepTitle}>Step 6: Monitor the Plant</Text>
                        <Text style={styles.stepDescription}>Monitor the plant for any signs of stress or damage after cleaning. If you notice any issues, such as wilting or yellowing leaves, take steps to address them promptly.</Text>

                        <Text style={styles.stepTitle}>Step 7: Repeat as Needed</Text>
                        <Text style={styles.stepDescription}>Repeat the cleaning process regularly to keep your plant's leaves free from dust and dirt. This will help the plant thrive and maintain its appearance.</Text>


                        </View>
                    </View>
                    </Modal>

                    <TouchableOpacity onPress={() => setModalVisible4(true)} style={styles.careTips}>
                        <View style={styles.container}>
                            <View style={styles.tip1}>
                            <Text style={styles.tiptext}>What causes leaves to become pale?</Text>
                            </View>
                            <Image style={styles.image} source={require('../assets/pictures/palePlant.jpg')} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible4}
                    onRequestClose={() => {
                        setModalVisible4(!modalVisible4);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button color='black' title="X" onPress={() => setModalVisible4(false)}/>
                        </View>                        
                        <Text style={styles.mainTitle}>What causes leaves to become pale?</Text>
                        <Text style={styles.stepTitle}>Step 1: Check Nutrient Levels</Text>
                        <Text style={styles.stepDescription}>Inspect the plant for signs of nutrient deficiency, such as yellowing or pale leaves. Test the soil to determine if it lacks essential nutrients like nitrogen, iron, magnesium, or potassium.</Text>

                        <Text style={styles.stepTitle}>Step 2: Adjust Watering</Text>
                        <Text style={styles.stepDescription}>Ensure the plant is receiving the right amount of water. Overwatering or underwatering can stress the plant and lead to pale leaves. Adjust watering practices as needed.</Text>

                        <Text style={styles.stepTitle}>Step 3: Improve Soil Drainage</Text>
                        <Text style={styles.stepDescription}>If the soil is compacted or poorly drained, it can lead to waterlogged roots and nutrient uptake issues. Improve soil drainage by amending the soil or using raised beds.</Text>

                        <Text style={styles.stepTitle}>Step 4: Check Soil pH</Text>
                        <Text style={styles.stepDescription}>Some plants require specific soil pH levels to absorb nutrients effectively. Test the soil pH and adjust it if necessary to ensure optimal nutrient uptake.</Text>

                        <Text style={styles.stepTitle}>Step 5: Monitor for Pests and Diseases</Text>
                        <Text style={styles.stepDescription}>Inspect the plant regularly for signs of pest infestations or diseases. Treat any issues promptly to prevent them from affecting the plant's health.</Text>

                        <Text style={styles.stepTitle}>Step 6: Address Environmental Stress</Text>
                        <Text style={styles.stepDescription}>Ensure the plant is not exposed to extreme temperatures, direct sunlight, or drafts, which can stress the plant and lead to pale leaves. Provide a suitable environment for the plant's growth.</Text>

                        <Text style={styles.stepTitle}>Step 7: Check for Root Damage</Text>
                        <Text style={styles.stepDescription}>Inspect the plant's roots for signs of damage, such as rot or pest infestations. Address any issues with the roots to ensure proper nutrient uptake.</Text>
                        </View>
                    </View>
                    </Modal>
                </ScrollView>

            </View>
                <View>
                    <Text style = {styles.recommendationText}>Recommendation from our experts</Text>
                    <ScrollView 
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    style = {styles.scroll}
                    //pagingEnabled={true}
                    horizontal= {true}
                    showsHorizontalScrollIndicator = {true}
                    decelerationRate={0}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    
                    contentInset={{
                        top: 0,
                        left: 10,
                        bottom: 0,
                        right: 10,}}> 
                    <View style = {styles.recommendation}>
                        <View style = {styles.rec}>
                            <Image style = {styles.circle} source={require('../assets/pictures/plantdoc1.png')}/>
                            <View style = {styles.box}>
                                <Text style = {styles.tiptext}>Know what type of disease your plant has</Text>
                                <Text style={{ fontFamily: 'OwenPro-Medium', fontSize: 10, paddingTop:10}}>Dr. Olivia Sage</Text>
                            </View>
                        </View>

                        <View style = {styles.rec}>
                            <Image style = {styles.circle} source={require('../assets/pictures/plantdoc2.png')}/>
                            <View style = {styles.box}>
                                <Text style = {styles.tiptext}>Learn how to prune perfectly</Text>
                                <Text style={{ fontFamily: 'OwenPro-Medium', fontSize: 10, paddingTop:26}}>Benjamin Grove</Text>
                            </View>
                        </View>

                        <View style = {styles.rec}>
                            <Image style = {styles.circle} source={require('../assets/pictures/plantdoc3.png')}/>
                            <View style = {styles.box}>
                                <Text style = {styles.tiptext}>Are you using the right fertilizer?</Text>
                                <Text style={{ fontFamily: 'OwenPro-Medium', fontSize: 10, paddingTop:27}}>Lulu Lovelace</Text>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>

                <View>
                    <Text style = {styles.careTipsText}>Ideas for Inspiration</Text>
                    <ScrollView 
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    style = {styles.scroll}
                    //pagingEnabled={true}
                    horizontal= {true}
                    showsHorizontalScrollIndicator = {true}
                    decelerationRate={0}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    
                    contentInset={{
                        top: 0,
                        left: 10,
                        bottom: 0,
                        right: 10,}}> 
                    <TouchableOpacity onPress={() => setModalVisible5(true)} style={styles.careTips}>
                        <View style={styles.container}>
                            <View style={styles.tip1}>
                            <Text style={styles.tiptext}>Must-have Plants and Pots</Text>
                            </View>
                            <Image style={styles.image} source={require('../assets/pictures/idea1.png')} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible5}
                    onRequestClose={() => {
                        setModalVisible5(!modalVisible5);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button color='black' title="X" onPress={() => setModalVisible5(false)}/>
                        </View>
                        <ScrollView>
                        <Text style={styles.mainTitle}>Must-Have Plants and Pots in a Garden</Text>
                        <Text style={styles.stepTitle}>Step 1: Assess Your Garden Space</Text>
                        <Text style={styles.stepDescription}>Evaluate the size and layout of your garden space. Consider factors such as sunlight exposure, soil type, and available water sources.</Text>

                        <Text style={styles.stepTitle}>Step 2: Determine Your Garden Theme</Text>
                        <Text style={styles.stepDescription}>Decide on a theme or style for your garden. Whether you prefer a formal, structured garden or a more relaxed, natural look, your theme will help guide your plant and pot selections.</Text>

                        <Text style={styles.stepTitle}>Step 3: Research Plant Options</Text>
                        <Text style={styles.stepDescription}>Research plants that thrive in your local climate and soil conditions. Consider a mix of flowering plants, foliage plants, and herbs to add variety and interest to your garden.</Text>

                        <Text style={styles.stepTitle}>Step 4: Choose Complementary Pots</Text>
                        <Text style={styles.stepDescription}>Select pots that complement your chosen plant palette and garden theme. Consider the size, shape, and material of the pots to ensure they enhance the overall look of your garden.</Text>

                        <Text style={styles.stepTitle}>Step 5: Create a Planting Plan</Text>
                        <Text style={styles.stepDescription}>Develop a planting plan that includes the placement of plants and pots in your garden. Arrange them in a way that creates visual interest and balances the overall design.</Text>

                        <Text style={styles.stepTitle}>Step 6: Incorporate Unique Elements</Text>
                        <Text style={styles.stepDescription}>Add unique elements such as trellises, arbors, or garden sculptures to enhance the beauty of your garden. These elements can serve as focal points and add personality to your outdoor space.</Text>

                        <Text style={styles.stepTitle}>Step 7: Maintain and Enjoy Your Garden</Text>
                        <Text style={styles.stepDescription}>Regularly maintain your garden by watering, fertilizing, and pruning as needed. Take time to enjoy the beauty and tranquility of your garden space, and make any adjustments or additions to enhance its appeal.</Text>
                        </ScrollView>
                        </View>
                    </View>
                    </Modal>
                       

                    <TouchableOpacity onPress={() => setModalVisible6(true)} style={styles.careTips}>
                        <View style={styles.container}>
                            <View style={styles.tip1}>
                                <Text style={styles.tiptext}>Explore the latest flowers trends</Text>
                            </View>
                            <Image style={styles.image} source={require('../assets/pictures/idea2.jpg')} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible6}
                    onRequestClose={() => {
                        setModalVisible6(!modalVisible6);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button color='black' title="X" onPress={() => setModalVisible6(false)}/>
                        </View>
                        <ScrollView>
                        <Text style={styles.mainTitle}>Flower Inspiration for Your Garden</Text>
                        <Text style={styles.stepTitle}>Step 1: Determine Your Garden's Sunlight Exposure</Text>
                        <Text style={styles.stepDescription}>Identify the areas of your garden that receive full sun, partial sun, or shade. Choose flowers that are suitable for each type of sunlight exposure.</Text>

                        <Text style={styles.stepTitle}>Step 2: Consider Your Garden's Color Palette</Text>
                        <Text style={styles.stepDescription}>Decide on a color scheme for your garden. Choose flowers in complementary or contrasting colors to create visual interest and harmony.</Text>

                        <Text style={styles.stepTitle}>Step 3: Choose Flowers for Each Season</Text>
                        <Text style={styles.stepDescription}>Select flowers that bloom in different seasons to ensure year-round color and interest in your garden. Consider early spring bloomers, summer stunners, fall favorites, and winter wonders.</Text>

                        <Text style={styles.stepTitle}>Step 4: Incorporate Native and Local Flowers</Text>
                        <Text style={styles.stepDescription}>Include native and local flowers in your garden to attract pollinators and support local ecosystems. These flowers are adapted to your climate and soil conditions, making them easier to grow and maintain.</Text>

                        <Text style={styles.stepTitle}>Step 5: Mix Annuals and Perennials</Text>
                        <Text style={styles.stepDescription}>Combine annual and perennial flowers in your garden for a variety of colors and textures. Annuals provide continuous blooms throughout the season, while perennials return year after year.</Text>

                        <Text style={styles.stepTitle}>Step 6: Add Fragrant Flowers</Text>
                        <Text style={styles.stepDescription}>Include fragrant flowers in your garden to enhance the sensory experience. Choose flowers with pleasant scents that attract butterflies, bees, and other beneficial insects.</Text>

                        <Text style={styles.stepTitle}>Step 7: Create a Flowering Border</Text>
                        <Text style={styles.stepDescription}>Plant a flowering border along the edges of your garden or around key features. Use a mix of tall, medium, and low-growing flowers for a layered effect.</Text>

                        <Text style={styles.stepTitle}>Step 8: Plan for Continuous Bloom</Text>
                        <Text style={styles.stepDescription}>Select flowers that bloom at different times to ensure a continuous display of color throughout the growing season. This will keep your garden looking vibrant and inviting.</Text>

                        </ScrollView>
                        </View>
                    </View>
                    </Modal>

                    <TouchableOpacity onPress={() => setModalVisible7(true)} style={styles.careTips}>
                        <View style={styles.container}>
                            <View style={styles.tip1}>
                            <Text style={styles.tiptext}>7 DIY ideas for your plants</Text>
                            </View>
                            <Image style={styles.image} source={require('../assets/pictures/idea3.jpg')} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible7}
                    onRequestClose={() => {
                        setModalVisible7(!modalVisible7);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button color='black' title="X" onPress={() => setModalVisible7(false)}/>
                        </View>
                        <Text style={styles.mainTitle}>7 DIY ideas for you plants</Text>
                        <Text style={styles.stepTitle}>1. Terrarium Garden:</Text>
                        <Text style={styles.stepDescription}>Create a miniature garden inside a glass container. Layer the bottom with rocks for drainage, add activated charcoal for filtration, and top with potting soil. Plant small, low-maintenance plants like succulents and moss.</Text>

                        <Text style={styles.stepTitle}>2. Macrame Plant Hanger:</Text>
                        <Text style={styles.stepDescription}>Learn macrame techniques to create stylish hangers for your hanging plants. Use colorful cords and beads to add a personalized touch.</Text>

                        <Text style={styles.stepTitle}>3. Mason Jar Herb Garden:</Text>
                        <Text style={styles.stepDescription}>Repurpose mason jars by turning them into a herb garden. Fill each jar with potting soil and plant herbs like basil, mint, or parsley. Place them on a sunny windowsill for easy access.</Text>

                        <Text style={styles.stepTitle}>4. Upcycled Planters:</Text>
                        <Text style={styles.stepDescription}>Use old cans, bottles, or containers as planters. Decorate them with paint, fabric, or stickers to match your decor.</Text>

                        <Text style={styles.stepTitle}>5. Fairy Garden:</Text>
                        <Text style={styles.stepDescription}>Create a whimsical fairy garden using miniature furniture, figurines, and tiny plants. Use a shallow container and arrange the elements to create a magical scene.</Text>

                        <Text style={styles.stepTitle}>6. Vertical Garden:</Text>
                        <Text style={styles.stepDescription}>Build a vertical garden using a wooden pallet or a hanging shoe organizer. Plant a variety of herbs, flowers, or succulents to maximize space.</Text>

                        <Text style={styles.stepTitle}>7. Water Propagation:</Text>
                        <Text style={styles.stepDescription}>Grow new plants from cuttings by placing them in water until roots develop. Transfer the rooted cuttings to soil for continued growth.</Text>

                        </View>
                    </View>
                    </Modal>
                </ScrollView>
            </View>
            </View> 
            </ScrollView>

        </View>
        
    )
}



const styles = StyleSheet.create({
    name: {
        fontFamily: "OwenPro-Medium",
        fontSize:20,
    },
    contents:{
        paddingTop:5,
    },
    careTips:{
        marginLeft:3,
        flexDirection:"row",
        paddingTop:14,
        height:165
    },
    careTipsText:{
        marginLeft:20,
        marginTop:10,
        fontFamily:'OwenPro-Regular'
    },
    container:{
        paddingRight:12,
        marginTop:80,
    },
    tip1:{
        height:70,
        width:190,
        borderRadius:15,
        backgroundColor:'#F4ECE6',     
        paddingTop:23,
        paddingLeft:14,
        justifyContent:'center',
    },
    tiptext:{
        fontFamily:'OwenPro-Regular',
        fontSize:12.5,
    },
    image:{
        borderRadius:20,
        height:100,
        width:170,
        marginTop:-150,  
        marginLeft:10
    },
    recommendationText:{
        fontFamily:'OwenPro-Regular',
        fontSize:15,
        marginTop:10,
        marginLeft:20,
    },
    recommendation:{
        flexDirection:'row',
        marginLeft:3,
        paddingTop:10,
    },
    rec:{
        height:90,
        width:200,
        borderRadius:18,
        backgroundColor:"#F4ECE6",
        padding:10,
        marginLeft:13,
        flexDirection:'row'
    },
    content:{
        fontFamily: "OwenPro-Regular",
        fontSize:13
    },
    nickname:{
        fontFamily: "OwenPro-Regular",
        fontSize:15,
    },
    nameContainer: {
      marginTop: 10,
      alignItems:'center',
    },
    root: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:100
    },
    plant: {
        height: 210,
        width: 200,
        borderRadius: 25,
        backgroundColor: "black",
        marginTop: -100,
        marginLeft: 12
    },
    box: {
        width:110
    },
    icon:{
        marginLeft:30,
        marginTop:15,
        marginRight:30,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    searchicon:{
        height:13,
        width:13,
        marginLeft:10,
        marginRight:4,     
    },
    icon1:{
        height:20,
        width:20,
    },
    bg:{
        width:'100%',
        height:'100%',
        backgroundColor:'#E6DACE',
    },
    bg1:{
        width:'100%',
        height:'23%',
        backgroundColor:'#F4ECE6',
        borderRadius:30
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
    profile:{
        marginLeft:25,
        marginTop:30
    },
    name1:{
        fontFamily: "OwenPro-Medium",
        fontSize:30,
    },
    pp:{
        fontFamily: "OwenPro-Regular",
        fontSize:15,
        paddingTop:4,
        color: "#95908d"
    },
    community:{
        height:80,
        // width:"100%",
        // borderWidth:1,
        // borderColor:"black",
        //marginTop:1
        //marginLeft:25,
        //alignItems:"center",
        flexDirection:"row",    
    },
    profilen: {
        alignItems: 'center',
        paddingLeft:8
    },
    myprofile:{
        height:62,
        width:62,
        borderRadius:30,
        backgroundColor:"#F4ECE6",
        //justifyContent:"center",
        //alignItems:"center",  
    },
    me:{
        fontFamily:"OwenPro-Regular",
        fontSize:11
    },
    searchbar:{
        marginLeft:26,
        marginTop:20,
        justifyContent:"center",        
        height:30,
        width:340,
        borderRadius:20,
        backgroundColor:"#F4ECE6",  
    },
    searchbaritems:{
        flexDirection:"row",
        //justifyContent:"center",
        alignItems:'center', 
    },
    sub:{
        fontFamily: "OwenPro-Medium",
        fontSize:15,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20
    },
    suggestions:{
        flexDirection:"row",
    },
    circle:{
        height:68,
        width:68,
        backgroundColor:"white",
        borderRadius:40,
        marginRight:10,
    },
    profilecont:{
        flexDirection:"row",
        //marginLeft:35,
        marginTop:10,
        height:120,
        width:330,
        borderRadius:16,
        backgroundColor:"#F4ECE6",
        padding:10
    },
    profilecont1:{
        flexDirection:"row",
        //marginLeft:35,
        marginTop:10,
        height:150,
        width:330,
        borderRadius:16,
        backgroundColor:"#F4ECE6",
        padding:10

    },
    profilecont2:{
        flexDirection:"row",
        //marginLeft:35,
        marginTop:10,
        height:140,
        width:330,
        borderRadius:16,
        backgroundColor:"#F4ECE6",
        padding:10

    },
    namecont:{
        marginLeft:10,
    },
    
    name:{
        fontFamily: "OwenPro-Medium",
        fontSize:12,
    },
    plarent:{
        fontFamily: "OwenPro-Regular",
        fontSize:11,
    },
    viewcont:{
        height: 34,
        width: 117,
        borderRadius: 10,
        backgroundColor: "#A7C744",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:31,
        marginLeft:10
    },
    view:{
        fontFamily: "OwenPro-Medium",
        fontSize:15,
    },
    centeredView: {
        //flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        //marginTop:10,
      },
      modalView: {
        //margin: 20,
        height:"100%",
        backgroundColor: '#F4ECE6',
        borderRadius: 15,
        paddingTop:35,
        padding: 15,
        //alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      mainTitle:{
        fontWeight: 'bold',
        fontSize: 20,
      },
      stepTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5,
      },
      stepDescription: {
        fontSize: 14,
        marginBottom: 10,
      },
})
import { View, StatusBar, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCard from '../components-react/ProductCard';

const Home = ({ navigation }) => {

    const [products, setProducts] = useState([])
    const [accessory, setAccessory] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation])

    //get data from DB
    const getDataFromDB = () => {
        let productList = []
        let accessoryList = []
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].category == "product") {
                productList.push(Items[index]);
            } else if (Items[index].category == "accessory") {
                accessoryList.push(Items[index]);
            }

        }

        setProducts(productList);
        setAccessory(accessoryList);
    }

    return (
        <View style={styles.rootContainer}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" translucent={true} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 16
                    }}>
                        <TouchableOpacity>
                            <Entypo name="shopping-bag" style={{
                                fontSize: 18,
                                color: COLOURS.backgroundMedium,
                                padding: 12,
                                borderRadius: 10,
                                backgroundColor: COLOURS.backgroundLight
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("mycart")}>
                            <MaterialCommunityIcons name="cart" style={{
                                fontSize: 18,
                                color: COLOURS.backgroundMedium,
                                padding: 12,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLOURS.backgroundLight
                            }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 10, padding: 16 }}>
                        <Text style={{
                            fontSize: 26,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 10
                        }}>Hi-Fi Shop &amp; Service</Text>
                        <Text style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            fontWeight: '400',
                            letterSpacing: 1,
                            lineHeight: 24
                        }}>
                            Audio shop on Rustaveli Ave 57.
                            {"\n"}This shop offers both products and services
                        </Text>
                    </View>
                    <View style={{
                        padding: 16,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: COLOURS.black,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                }}>
                                    Products
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    fontWeight: '400',
                                    opacity: 0.5,
                                    marginLeft: 10
                                }}>
                                    41
                                </Text>
                            </View>
                            <Text style={{
                                fontSize: 14,
                                color: COLOURS.blue,
                                fontWeight: '400'
                            }}>
                                SeeAll
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around'
                        }}>
                            {products.map((data, index) => (
                                <ProductCard
                                    key={index}
                                    data={data} />
                            ))
                            }
                        </View>
                    </View>
                    <View style={{
                        padding: 16,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: COLOURS.black,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                }}>
                                    Accessories
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    fontWeight: '400',
                                    opacity: 0.5,
                                    marginLeft: 10
                                }}>
                                    78
                                </Text>
                            </View>
                            <Text style={{
                                fontSize: 14,
                                color: COLOURS.blue,
                                fontWeight: '400'
                            }}>
                                SeeAll
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around'
                        }}>
                            {accessory.map((data, index) => (
                                <ProductCard
                                    key={index}
                                    data={data} />
                            ))
                            }
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    rootContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
});
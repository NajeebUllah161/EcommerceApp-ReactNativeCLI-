import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import React, { useState } from 'react'

import { COLOURS, Items } from '../database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartProduct = ({ data }) => {


    const [product, setProduct] = useState()
    const [total, setTotal] = useState(null)

    const removeItemFromCart = async itemId => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;
            for (let index = 0; index < array.length; index++) {
                if (array[index] == itemId) {
                    array.splice(index, 1)
                }

                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                getDataFromDB();
            }
        }
    }

    //get data from local database by ID
    const getDataFromDB = async () => {
        let items = await AsyncStorage.getItem('cartItems');
        items = JSON.parse(items);
        let productData = [];
        if (items) {
            Items.forEach(data => {
                if (items.includes(data.id)) {
                    productData.push(data);
                    return
                }
            })
            setProduct(productData);
            getTotal(productData)
        } else {
            setProduct(false);
            getTotal(false)
        }
    };

    const getTotal = productData => {
        let total = 0;
        for (let index = 0; index < productData.length; index++) {
            let productPrice = productData[index].productPrice;
            total = total + productPrice;
        }
        setTotal(total);
    }

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("productinfo", { productId: data.id })}
            style={{
                width: '100%',
                height: 100,
                marginVertical: 6,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <View
                style={{
                    width: '30%',
                    height: 100,
                    padding: 14,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLOURS.backgroundLight,
                    borderRadius: 10,
                    marginRight: 22,
                }}>
                <Image
                    source={data.productImage}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain'
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    justifyContent: 'space-around'
                }}>
                <View
                    style={{

                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            maxWidth: '100%',
                            color: COLOURS.black,
                            fontWeight: '600',
                            letterSpacing: 1
                        }}>
                        {data.productName}
                    </Text>
                    <View
                        style={{
                            marginTop: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            opacity: 0.6
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                maxWidth: '85%',
                                marginRight: 4,
                            }}>
                            &#8377; {data.productPrice}
                        </Text>
                        <Text>
                            (~&#8377;{
                                data.productPrice + data.productPrice / 20
                            })
                        </Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                borderRadius: 100,
                                marginRight: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: COLOURS.backgroundMedium,
                                opacity: 0.5
                            }}
                        >
                            <MaterialCommunityIcons
                                name='minus'
                                style={{
                                    fontSize: 16,
                                    color: COLOURS.backgroundDark
                                }}
                            />
                        </View>
                        <Text>1</Text>
                        <View
                            style={{
                                borderRadius: 100,
                                marginLeft: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: COLOURS.backgroundMedium,
                                opacity: 0.5,
                            }}
                        >
                            <MaterialCommunityIcons
                                name='plus'
                                style={{
                                    fontSize: 16,
                                    color: COLOURS.backgroundDark,
                                }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
                        <MaterialCommunityIcons
                            name='delete-outline'
                            style={{
                                fontSize: 16,
                                color: COLOURS.backgroundDark,
                                backgroundColor: COLOURS.backgroundLight,
                                padding: 8,
                                borderRadius: 100
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CartProduct
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLOURS } from '../database/Database';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ data }) => {

    const navigation = useNavigation();

    return (
         <TouchableOpacity
         onPress={() => navigation.navigate("productinfo", { productId: data.id })} style={{ width: '48%', marginVertical: 14 }}>
            <View style={{
                width: '100%',
                height: 100,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8
            }}>
                {data.isOff ? (
                    <View style={{
                        position: 'absolute',
                        width: '20%',
                        height: '24%',
                        backgroundColor: COLOURS.green,
                        top: 0,
                        left: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: 10,
                        borderBottomRightRadius: 10
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: COLOURS.white,
                            letterSpacing: 1
                        }}>
                            {data.offPercentage}%
                        </Text>
                    </View>
                ) : null}
                <Image source={data.productImage} style={{
                    height: '80%',
                    width: '80%',
                    resizeMode: 'contain'
                }}
                />
            </View>
            <Text style={{
                fontSize: 12,
                color: COLOURS.black,
                fontWeight: '600',
                marginBottom: 2
            }}>
                {data.productName}
            </Text>
            {
                data.category == "accessory" ? (
                    data.isAvailable ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <FontAwesome
                                name="circle"
                                style={{
                                    color: COLOURS.green,
                                    fontSize: 12,
                                    marginRight: 6
                                }}
                            />
                            <Text
                                style={{
                                    color: COLOURS.green,
                                    fontSize: 12
                                }}>
                                Available
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <FontAwesome
                                name="circle"
                                style={{
                                    color: COLOURS.red,
                                    fontSize: 12,
                                    marginRight: 6
                                }}
                            />
                            <Text
                                style={{
                                    color: COLOURS.red,
                                    fontSize: 12
                                }}>
                                Unvailable
                            </Text>
                        </View>
                    )
                ) : null
            }
            <Text>
                &#8377; {data.productPrice}
            </Text>
        </TouchableOpacity>
    )
}

export default ProductCard
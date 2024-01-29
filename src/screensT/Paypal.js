import React, { Component } from 'react'
import {
    View,
  
    ActivityIndicator
} from 'react-native'
import axios from 'axios'
import { encode as base64encode } from 'base-64';
import { WebView } from 'react-native-webview';

export default class Paypal extends Component {

    state = {
        accessToken: null,
        approvalUrl: null,
        paymentId: null
    }


    componentDidMount() {
        const { route } = this.props;

        let currency = route.params.totalPriceCharged;
      //  currency.replace(" USD", "")

      console.log(currency,'LLLLLLLLLLL')

        const clientId = 'AXjD0ypAQmJcX4eef2qT3qop11ZiyaKc-xYloMgfP_SPQZDaSAJmzVn1MvPeKU2asp_cj1MF-YUL3yPn';
        const clientSecret = 'EHpvRzBB8TflBsqIfyUwzuYO7UbFZbDlX92uDbwI-Q-r9sbe_S-zRffAStSYc9MJolriHdNPAHUFCJ6n';
        
        const credentials = base64encode(`${clientId}:${clientSecret}`);

        const dataDetail = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": currency,
                    "currency": "usd",
                    "details": {
                        "subtotal": currency,
                        // "tax": "0",
                        // "shipping": "0",
                        // "handling_fee": "0",
                        // "shipping_discount": "0",
                        // "insurance": "0"
                    }
                }

            }],
            "redirect_urls": {
                "return_url": "https://example.com",
                "cancel_url": "https://example.com"
            }
        }

        axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', { grant_type: 'client_credentials' },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${credentials}`, // Your authorization value
                }
            }
        )
            .then(response => {
                console.log(response.data,'UUUUUUUUUUUUUUUUUUUUUU')
                this.setState({
                    accessToken:  response.data.access_token
                })

                console.log(`Bearer ${this.state.accessToken}`,'PPPPPPPPPPPP')

                console.log(dataDetail,'dataDetaildataDetaildataDetail')

                axios.post('https://api.sandbox.paypal.com/v1/payments/payment', 
                {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "transactions": [{
                        "amount": {
                            "total": 1,
                            "currency": "USD",
                            "details": {
                                "subtotal": 1,
                                "tax": "0",
                                "shipping": "0",
                                "handling_fee": "0",
                                "shipping_discount": "0",
                                "insurance": "0"
                            }
                        }
        
                    }],
                    "redirect_urls": {
                        "return_url": "https://example.com",
                        "cancel_url": "https://example.com"
                    }
                },
        
                
                //dataDetail,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.state.accessToken}`
                        }
                      
                    }
                )
                    .then(response => {
                        console.log(response,'OOOOOOOOOOOOOOOO')

                        const { id, links } = response.data
                        const approvalUrl = links.find(data => data.rel == "approval_url")

                        this.setState({
                            paymentId: id,
                            approvalUrl: approvalUrl.href
                        })
                    }).catch(err => {
                        console.log({ ...err, },"BBBBBBBBBBBBBBBBBB")
                    })
            }).catch(err => {
                console.log({ ...err },"VVVVVVVVVVVVVVVVVVVV")
            })

    }

    _onNavigationStateChange = (webViewState) => {

        if (webViewState.url.includes('https://example.com/')) {

            this.setState({
                approvalUrl: null
            })

            const { PayerID, paymentId } = webViewState.url

            axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: PayerID },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.accessToken}`
                    }
                }
            )
                .then(response => {
                    console.log(response)

                }).catch(err => {
                    console.log({ ...err })
                })

        }
    }

    render() {

        const { approvalUrl } = this.state
        return (
            <View style={{ flex: 1 }}>
                {
                    approvalUrl ? <WebView
                        style={{ height: 400, width: '100%' }}
                        source={{ uri: approvalUrl }}
                        onNavigationStateChange={this._onNavigationStateChange}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                      //  style={{ marginTop: 20 }}
                    /> : <ActivityIndicator />
                }
            </View>
        )
    }
}
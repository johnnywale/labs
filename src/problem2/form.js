import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import {makeStyles} from '@material-ui/core/styles';
import {isAddress} from 'ethereum-address'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

class TransferForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: {
                value: "",
                validated: false,
            },
            amount: {
                value: 0.000000001,
                validated: true,
            },
            otp: {
                value: "",
                validated: false,
            },
        }
    }

    validateForm = () => {
        return this.state.address.validated && this.state.amount.validated && this.state.otp.validated
    }
    validateOtp = (values) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (values === "00000") {
                    resolve({success: true})
                } else {
                    reject({success: false})
                }
            }, 2000);
        })
    }

    render() {
        let styles = makeStyles({
            textFld: {width: 100, height: 70}   //assign the width as your requirement
        });
        return (
            <form className="form" noValidate autoComplete="off">
                <TextField
                    {...this.state.address} label="ETH Address"
                    style={styles.textFld}
                    placeholder="0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826" onChange={(event) => {
                    let val = event.target.value
                    let address = {...this.state.address}
                    if (isAddress(val)) {
                        address.error = false;
                        address.helperText = ""
                        address.value = val
                        address.validated = true;
                        this.setState({address: address});
                    } else {
                        address.error = true;
                        address.helperText = "Invalid address"
                        address.value = val
                        address.validated = false;
                        this.setState({address: address});
                    }
                }}
                />
                <CurrencyTextField
                    {...this.state.amount}
                    style={styles.textFld}
                    label="Amount"
                    variant="standard"
                    decimalPlaces={18}
                    currencySymbol="♦"
                    outputFormat="string"
                />

                <TextField
                    {...this.state.otp}
                    label="OTP Authentication (00000)"
                    style={styles.textFld}
                    variant="standard"
                    onChange={(event) => {
                        if (!this.debouncedFn) {
                            this.debouncedFn = _.debounce(() => {
                                let searchString = event.target.value;
                                this.validateOtp(searchString).then(value => {
                                    let otp = {...this.state.otp}
                                    otp.error = false;
                                    otp.helperText = ""
                                    otp.validated = true;
                                    this.setState({otp: otp});
                                }).catch((reason => {
                                    let otp = {...this.state.otp}
                                    otp.error = true;
                                    otp.helperText = "invalid otp"
                                    otp.validated = false;
                                    this.setState({otp: otp});
                                }))
                            }, 300);
                        }
                        this.debouncedFn();
                        let otp = {...this.state.otp}
                        otp.value = event.target.value
                        this.setState({otp: otp});

                    }}
                />
                <Button variant="contained" disabled={!this.validateForm()} color="primary">
                    Submit
                </Button>
            </form>
        );
    }
}

export default TransferForm

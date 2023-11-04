import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { cardNumberFormatter } from "../utils/Functions";
import { TopUp_URL } from "../config";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/slices/UserSlice";

export default function TopUpModal({ visible, onClose }) {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [nameOnCard, setNameOnCard] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [amountError, setAmountError] = React.useState(false);
  const [cardNumberError, setCardNumberError] = React.useState(false);
  const [nameOnCardError, setNameOnCardError] = React.useState(false);
  const [expiryDateError, setExpiryDateError] = React.useState(false);
  const [cvvError, setCvvError] = React.useState(false);

  const onConfirm = () => {
    if (amount === "") {
      setAmountError(true);
      ToastAndroid.show("Please enter amount", ToastAndroid.SHORT);
      return;
    } else if (cardNumber === "") {
      setCardNumberError(true);
      ToastAndroid.show("Please enter card number", ToastAndroid.SHORT);
      return;
    } else if (nameOnCard === "") {
      setNameOnCardError(true);
      ToastAndroid.show("Please enter name on card", ToastAndroid.SHORT);
      return;
    } else if (expiryDate === "") {
      setExpiryDateError(true);
      ToastAndroid.show("Please enter expiry date", ToastAndroid.SHORT);
      return;
    } else if (cvv === "") {
      setCvvError(true);
      ToastAndroid.show("Please enter CVV", ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.append("amount", amount);
    fd.append("number", cardNumber);
    fd.append("name", nameOnCard);
    fd.append("expiry", expiryDate);
    fd.append("security_code", cvv);
    fetch(TopUp_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: fd,
    }).then((response) => response.json())
      .then((json) => {
        setLoading(false);
        if (json.success) {
          ToastAndroid.show(json.message, ToastAndroid.SHORT);
          dispatch(setUser(json.user));
          setLoading(false);
          setAmount("");
          setCardNumber("");
          setNameOnCard("");
          setExpiryDate("");
          setCvv("");
          onClose();
        } else {
          ToastAndroid.show(json.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  return (
    <View style={[styles.container, { display: visible ? "flex" : "none" }]}>
      <Pressable onPress={onClose} style={{ width: "100%", height: "100%", position: "absolute" }}>
      </Pressable>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Top up
          </Text>
        </View>
        <View style={styles.fields}>
          <View style={styles.field}>
            <Text style={styles.label}>
              Amount
            </Text>
            <TextInput
              style={[styles.input, { borderColor: amountError ? "#e7455f" : "#fff" }]}
              keyboardType="numeric"
              placeholder="Enter amount"
              onChangeText={(text) => {
                setAmountError(false);
                setAmount(text);
              }}
              returnKeyType="next"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              Card number
            </Text>
            <TextInput
              style={[styles.input, { borderColor: cardNumberError ? "#e7455f" : "#fff" }]}
              onChangeText={(text) => {
                setCardNumberError(false);
                setCardNumber(cardNumberFormatter(text));
              }}
              value={cardNumber}
              keyboardType="numeric"
              placeholder="XXXX XXXX XXXX XXXX"
              returnKeyType="next"
              maxLength={19}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              Name on card
            </Text>
            <TextInput
              style={[styles.input, { borderColor: nameOnCardError ? "#e7455f" : "#fff" }]}
              onChangeText={(text) => {
                setNameOnCardError(false);
                setNameOnCard(text);
              }}
              placeholder="JOHN DOE"
              returnKeyType="next"
              autoCapitalize="characters"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              Expiry date
            </Text>
            <TextInput
              style={[styles.input, { borderColor: expiryDateError ? "#e7455f" : "#fff" }]}
              onChangeText={(text) => {
                setExpiryDateError(false);
                setExpiryDate(text);
              }}
              keyboardType="default"
              placeholder="YYYY-MM"
              returnKeyType="next"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              CVV
            </Text>
            <TextInput
              style={[styles.input, { borderColor: cvvError ? "#e7455f" : "#fff" }]}
              onChangeText={(text) => {
                setCvvError(false);
                setCvv(text);
              }}
              secureTextEntry={true}
              keyboardType="numeric"
              placeholder="XXX"
              returnKeyType="done"
            />
          </View>
        </View>
        {loading ? (
          <>
            <Image
              source={require("../assets/loading-line.gif")}
              style={styles.loading}
            />
          </>
        ) : (
          <View style={styles.buttons}>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: "#6963f6" }]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>
                Confirm
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
  },
  content: {
    width: "80%",
    marginLeft: "10%",
    minHeight: "70%",
    backgroundColor: "#121212",
  },
  header: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  fields: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  field: {
    height: 55,
    justifyContent: "center",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 2,
  },
  input: {
    color: "#fff",
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
  },
  buttons: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "#6963f6",
    fontSize: 13,
  },
  loading: {
    width: 40,
    height: 10,
    alignSelf: "center",
    marginTop: 20,
  },
});

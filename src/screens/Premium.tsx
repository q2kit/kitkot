import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";
import { GET_PREMIUM_PLANS } from "../config";
import { useAppSelector } from "../redux/hooks";
import { datetimeDelta } from "../utils/Functions";

const PlanMatrix = ({ plans, style = {}, onPlanPress }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      ...style,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    cell: {
      width: 160,
      borderWidth: 1,
      backgroundColor: "#6963f6",
      padding: 10,
      margin: 5,
      borderColor: "#000",
      flexDirection: "row",
      borderRadius: 5,
    },
  });
  const cols = 2;
  const rows = Math.ceil(plans.length / cols);
  const [planChosen, setPlanChosen] = React.useState(null);

  const matrix = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      let plan = plans[i * cols + j];
      row.push(
        <View
          key={plan.id}
          style={[styles.cell, planChosen?.id === plan.id ? {
            backgroundColor: "#e7455f",
            borderColor: "lightgreen",
            borderWidth: 1,
          } : null]}
        >
          <Pressable
            onPress={() => {
              setPlanChosen(plan);
              onPlanPress(plan);
            }}
            style={{ flex: 1 }}
          >
            <Text style={{ color: "#fff" }}>
              {plan?.name} - ${plan?.price}
            </Text>
          </Pressable>
        </View >
      );
    }
    matrix.push(
      <View key={i} style={styles.row}>
        {row}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {matrix}
    </View>
  );
};

export default function Premium({ navigation }) {
  const user = useAppSelector(state => state.user);
  const [plans, setPlans] = React.useState([]);
  const [planChosen, setPlanChosen] = React.useState(null);

  useEffect(() => {
    fetch(GET_PREMIUM_PLANS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }).then((response) => response.json())
      .then((json) => {
        console.log(json);
        setPlans(json.plans);
      })
      .catch((error) => console.error(error))
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <Image
          source={require("../assets/premium.png")}
          style={[styles.premiumImage, { opacity: user.isPremium ? 1 : 0 }]}
        />
        <Text style={styles.premiumText}>
          Expired on: {datetimeDelta(null, user.premium_until) || "Not premium"}
        </Text>
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.balance}>
          <Image
            source={require("../assets/money.png")}
            style={styles.balanceImage}
          />
          <Text style={styles.balanceText}>
            ${user.balance}
          </Text>
        </View>
        <View style={styles.balanceButtons}>
          <View style={[styles.balanceButton, { backgroundColor: "#6963f6" }]}>
            <Image
              source={require("../assets/top-up.png")}
              style={styles.topUpImage}
            />
            <Text style={styles.balanceButtonText}>
              Top up
            </Text>
          </View>
          <View style={[styles.balanceButton, { backgroundColor: "#e7455f" }]}>
            <Image
              source={require("../assets/withdraw.png")}
              style={styles.withdrawImage}
            />
            <Text style={styles.balanceButtonText}>
              Withdraw
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.plansContainer}>
        <Text style={styles.plansText}>
          Premium plans
        </Text>
        <View style={styles.plans}>
          <PlanMatrix plans={plans} onPlanPress={(plan) => setPlanChosen(plan)} />
        </View>
      </View>
      <View style={styles.checkoutContainer}>
        <View style={styles.checkout}>
          <Text style={styles.checkoutText}>
            Checkout
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
  },
  avatarContainer: {
    display: "flex",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: 30,
    alignSelf: "center",
  },
  premiumImage: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginTop: -15,
  },
  premiumText: {
    color: "#fff",
    alignSelf: "center",
    marginTop: 5,
  },
  balanceContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  balance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  balanceImage: {
    width: 30,
    height: 30,
    marginRight: 5,
    alignSelf: "center",
  },
  balanceText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 17,
  },
  balanceButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  balanceButton: {
    width: 130,
    backgroundColor: "#6963f6",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  balanceButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  topUpImage: {
    width: 25,
    height: 25,
    marginRight: 5,
    alignSelf: "center",
  },
  withdrawImage: {
    width: 30,
    height: 30,
    marginRight: 5,
    alignSelf: "center",
  },
  plansContainer: {
    marginTop: 30,
  },
  plansText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 17,
  },
  plans: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  checkoutContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  checkout: {
    width: 150,
    backgroundColor: "#36b3c6",
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
  },
});

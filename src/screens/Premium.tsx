import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ToastAndroid,
} from "react-native";
import { GET_PREMIUM_PLANS, CONFIRM_PREMIUM } from "../config";
import { setUser } from '../redux/slices/UserSlice';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { datetimeDelta } from "../utils/Functions";
import TopUpModal from "../components/TopUpModal";

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
      backgroundColor: "#69edff",
      padding: 10,
      margin: 5,
      flexDirection: "row",
      borderRadius: 5,
      borderColor: "#000",
      borderWidth: 2,
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
            backgroundColor: "#36b3c6",
            borderColor: "#fff",
            borderWidth: 2,
          } : null]}
        >
          <Pressable
            onPress={() => {
              setPlanChosen(plan);
              onPlanPress(plan);
            }}
            style={{ flex: 1 }}
          >
            <Text style={{ color: "#000" }}>
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
  const dispatch = useAppDispatch();
  const [plans, setPlans] = React.useState([]);
  const [planChosen, setPlanChosen] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [topUpModalVisible, setTopUpModalVisible] = React.useState(false);

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

  const onPressConfirm = () => {
    if (planChosen) {
      setIsLoading(true);
      const fd = new FormData();
      fd.append("plan_id", planChosen.id);
      fetch(CONFIRM_PREMIUM, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: fd,
      }).then((response) => response.json())
        .then((json) => {
          setIsLoading(false);
          if (json.success) {
            ToastAndroid.show(json.message, ToastAndroid.SHORT);
            dispatch(setUser(json.user));
          } else {
            ToastAndroid.show(json.message, ToastAndroid.SHORT);
          }
        })
        .catch((error) => console.error(error))
    } else {
      ToastAndroid.show("Please choose a plan", ToastAndroid.SHORT);
    }
  };

  return plans && (
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
          <Pressable
            style={[styles.balanceButton, { backgroundColor: "#6963f6" }]}
            onPress={() => setTopUpModalVisible(true)}
          >
            <Image
              source={require("../assets/top-up.png")}
              style={styles.topUpImage}
            />
            <Text style={styles.balanceButtonText}>
              Top up
            </Text>
          </Pressable>
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
      <Pressable
        style={[styles.confirmContainer, { opacity: planChosen ? 1 : 1 }]}
        onPress={onPressConfirm}
        disabled={isLoading}
      >
        <Text style={styles.confirmText}>
          Confirm
        </Text>
        <Image
          source={require("../assets/loading-line.gif")}
          style={[styles.loadingImage, { opacity: isLoading ? 1 : 0 }]}
        />
      </Pressable>
      <TopUpModal
        visible={topUpModalVisible}
        onClose={() => setTopUpModalVisible(false)}
      />
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
  confirmContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    width: 150,
    backgroundColor: "#2bba51",
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  loadingImage: {
    width: 40,
    height: 10,
    marginTop: 10,
  },
});

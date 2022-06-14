import RNIap, { purchaseUpdateListener } from "react-native-iap";

export const purchased = async (productId) => {
  let isPurchased = false;
  try {
    const purchases = await RNIap.getAvailablePurchases();
    purchases.forEach((purchase) => {
      if (purchase.productId === productId) {
        isPurchased = true;
        return isPurchased;
      }
    });
    return isPurchased;
  } catch (err) {
    return false;
  }
};

export const requestPurchase = async (productId) => {};

export const fetchAvailableProducts = async (productsId) => {};

export const purchaseUpdateSubscription = async () => {};

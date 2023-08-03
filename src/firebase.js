import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDdclWanFolcZyJVTUqJKWtTftVDxqx0hY",
  authDomain: "bikeshop-3f179.firebaseapp.com",
  projectId: "bikeshop-3f179",
  storageBucket: "bikeshop-3f179.appspot.com",
  messagingSenderId: "518733858556",
  appId: "1:518733858556:web:85c650f4183205ff55f979",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productsCollectionRef = collection(db, "products");

export async function getProducts() {
  const querySnapshot = await getDocs(productsCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getProduct(id) {
  const docRef = doc(db, "products", id);
  const productSnapshot = await getDoc(docRef);
  return {
    ...(await productSnapshot).data(),
    id: productSnapshot.id,
  };
}

export async function getAdminProducts() {
  const q = query(productsCollectionRef, where("userId", "==", "123"));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Soullink, Soulpartner } from "../Types";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

const db = getFirestore(app);

const getSoullinks = async () => {
  const arr: Soullink[] = [];
  const querySnapshot = await getDocs(collection(db, "soullinks"));
  querySnapshot.forEach((doc) => {
    const soullink: Soullink = {
      id: doc.id,
      name: doc.data().name,
      player1: doc.data().player1,
      player2: doc.data().player2,
      edition: doc.data().edition,
      lastPlayed: new Date(doc.data().lastPlayed.seconds * 1000),
      soulpartner: [],
    };
    arr.push(soullink);
  });
  for (let i = 0; i < arr.length; i++) {
    const querySnapshotSoulpartners = await getDocs(
      collection(db, "soullinks/" + arr[i].id + "/soulpartners")
    );
    querySnapshotSoulpartners.forEach((soulpartner) => {
      const partner: Soulpartner = {
        id: soulpartner.id,
        route: soulpartner.data().route,
        pokemon1: soulpartner.data().pokemon1,
        pokemon2: soulpartner.data().pokemon2,
        pokemon1link: soulpartner.data().pokemon1link,
        pokemon2link: soulpartner.data().pokemon2link,
        alive: soulpartner.data().alive,
        killer: soulpartner.data().killer,
        reason: soulpartner.data().reason,
      };
      arr[i].soulpartner.push(partner);
    });
  }
  console.log(arr);
  return arr;
};

const getSoullinkById = async (id: String) => {
  const docRef = doc(db, "soullinks" + id);
  const docSnap = await getDoc(docRef);
  console.log(docSnap);
  return docSnap;
};

const setPartner = async (partner: Soulpartner, id: String) => {
  const docData = partner;
  // dateExample: Timestamp.fromDate(new Date("December 10, 1815"))

  await setDoc(
    doc(db, "soullinks/" + id + "/soulpartners/" + partner.id),
    docData
  );
};

export { getSoullinks, setPartner, getSoullinkById };

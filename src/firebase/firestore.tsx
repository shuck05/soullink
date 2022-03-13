import { deleteDoc, getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Soullink, Soulpartner } from "../Types";
import { doc, addDoc, setDoc, getDoc, Timestamp } from "firebase/firestore";

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
    arr[i].soulpartner.sort(comp);
  }
  return arr;
};

function comp(a: Soulpartner, b: Soulpartner) {
  if (a.alive && !b.alive) return -1;
  if (!a.alive && b.alive) return 1;
  if (a.route < b.route) return -1;
  return 1;
}

const getSoullinkById = async (id: String) => {
  const soullinkArr: Soullink[] = [];
  const docRef = doc(db, "soullinks/" + id);
  const docSnap = await getDoc(docRef).then((erg) => {
    const data = erg.data();
    if (data === undefined) return null;
    const soullink: Soullink = {
      id: erg.id,
      edition: data.edition,
      lastPlayed: new Date(data.lastPlayed.seconds * 1000),
      name: data.name,
      player1: data.player1,
      player2: data.player2,
      soulpartner: [],
    };
    soullinkArr.push(soullink);
  });
  if (soullinkArr.length < 1) return null;
  const querySnapshotSoulpartners = await getDocs(
    collection(db, "soullinks/" + soullinkArr[0].id + "/soulpartners")
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
    soullinkArr[0].soulpartner.push(partner);
  });
  soullinkArr[0].soulpartner.sort(comp);
  if (soullinkArr.length === 1) {
    return soullinkArr[0];
  } else {
    return null;
  }
};

const setPartner = async (partner: Soulpartner, id: String) => {
  const docData = partner;
  // dateExample: Timestamp.fromDate(new Date("December 10, 1815"))

  await setDoc(
    doc(db, "soullinks/" + id + "/soulpartners/" + partner.id),
    docData
  );
};

const setNewPair = async (soulpartner: Soulpartner, id: String) => {
  const newPartner = {
    route: soulpartner.route,
    pokemon1: soulpartner.pokemon1,
    pokemon2: soulpartner.pokemon2,
    pokemon1link: soulpartner.pokemon1link,
    pokemon2link: soulpartner.pokemon2link,
    alive: true,
    killer: "",
    reason: "",
  };
  await addDoc(collection(db, "soullinks/" + id + "/soulpartners"), newPartner);
};

const deleteSoulpartnerById = async (
  idSoullink: string,
  idSoulpartner: string
) => {
  await deleteDoc(
    doc(db, "soullinks/" + idSoullink + "/soulpartners/" + idSoulpartner)
  );
};

export {
  getSoullinks,
  setPartner,
  getSoullinkById,
  setNewPair,
  deleteSoulpartnerById,
};

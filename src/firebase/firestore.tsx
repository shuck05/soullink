import { deleteDoc, getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Soullink, Soulpartner } from "../Types";
import { doc, addDoc, setDoc, getDoc, Timestamp } from "firebase/firestore";

const db = getFirestore(app);

const getSoullinks = async () => {
  console.log("getting Soullinks");
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
        catched: new Date(soulpartner.data().catched.seconds * 1000),
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
  if (a.catched < b.catched) return -1;
  return 1;
}

const getSoullinkById = async (id: String) => {
  const soullinkArr: Soullink[] = [];
  const docRef = doc(db, "soullinks/" + id);
  await getDoc(docRef).then((erg) => {
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
      catched: new Date(soulpartner.data().catched.seconds * 1000),
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
  let docData = {
    pokemon1: partner.pokemon1,
    pokemon2: partner.pokemon2,
    pokemon1link: partner.pokemon1link,
    pokemon2link: partner.pokemon2link,
    alive: partner.alive,
    killer: partner.killer,
    reason: partner.reason,
    route: partner.route,
    catched: Timestamp.fromDate(partner.catched),
  };
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
    catched: Timestamp.fromDate(new Date()),
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

const deleteChallangeById = async (id: String) => {
  const arr: String[] = [];
  const querySnapshotSoulpartners = await getDocs(
    collection(db, "soullinks/" + id + "/soulpartners")
  );
  querySnapshotSoulpartners.forEach((soulpartner) => {
    arr.push(soulpartner.id);
  });

  for (let i = 0; i < arr.length; i++) {
    await deleteDoc(doc(db, "soullinks/" + id + "/soulpartners/" + arr[i]));
  }
  await deleteDoc(doc(db, "soullinks/" + id));
  window.location.reload();
};

const createNewSoullink = async (soullink: Soullink) => {
  let temp = {
    name: soullink.name,
    player1: soullink.player1,
    player2: soullink.player2,
    lastPlayed: Timestamp.fromDate(soullink.lastPlayed),
    edition: soullink.edition,
  };
  await addDoc(collection(db, "soullinks/"), temp);
};

export {
  getSoullinks,
  setPartner,
  getSoullinkById,
  setNewPair,
  deleteSoulpartnerById,
  deleteChallangeById,
  createNewSoullink,
};

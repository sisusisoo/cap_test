// saveToFirebase.js
import { ref, set, update, get, child } from "firebase/database";
import { database } from "../firebase_db"; // Firebase 설정 파일에서 database 임포트

// 데이터 저장 함수
const saveToFirebase = (name, location, menu = null) => {
  const key = `${name}-${location}`;
  set(ref(database, 'places/' + key), {
    name: name,
    location: location,
    menu: menu // menu 필드 추가
  });
};

// 데이터 업데이트 함수
const updateMenuInFirebase = (name, location, menu) => {
  const key = `${name}-${location}`;
  update(ref(database, 'places/' + key), {
    menu: menu
  });
};

// 데이터 존재 여부 확인 함수
const checkIfDataExists = async (key) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `places/${key}`));
  return snapshot.exists();
};

// 데이터 가져오는 함수
const getDataFromFirebase = async (key) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `places/${key}`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};
const checkIfMenuExists = async (key) => {//
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `places/${key}/menu`));
  
  // Check if the 'menu' field exists and is not empty//메뉴가 비었는지 채워져있는지
  if (snapshot.exists() && snapshot.val()) {
    return true; // Menu exists and is not empty
  } else {
    return false; // Menu does not exist or is empty
  }
};

export { saveToFirebase, updateMenuInFirebase, checkIfDataExists, getDataFromFirebase,checkIfMenuExists };
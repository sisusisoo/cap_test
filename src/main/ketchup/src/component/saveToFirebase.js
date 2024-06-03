import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// 데이터를 Firebase에 저장하는 함수
export const saveDataToFirebase = async (name, location, menu) => {
  const key = `${name}-${location}`;
  const dbRef = firebase.database().ref(`path/to/data/${key}`);
  await dbRef.set({ menu });
};

// Firebase에서 데이터를 업데이트하는 함수
export const updateMenuInFirebase = async (name, location, newMenu) => {
  const key = `${name}-${location}`;
  const dbRef = firebase.database().ref(`path/to/data/${key}`);
  await dbRef.update({ menu: newMenu });
};

// Firebase에서 데이터를 가져오는 함수, 존재 여부도 확인
export const fetchDataFromFirebase = async (key) => {
  const dbRef = firebase.database().ref(`path/to/data/${key}`);
  const snapshot = await dbRef.once("value");
  return snapshot.exists() ? snapshot.val() : null;
};

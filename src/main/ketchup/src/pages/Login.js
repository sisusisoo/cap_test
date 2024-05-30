import React, { useState } from "react";
import { auth } from "../firebase_Auth";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database, ref, get } from "../firebase_db";
import GithubButton from "../component/github-btn";
import { Wrapper, Title, Form, Input, Error, Switcher } from "./UserInfoStyles";

export default function LogIn() {
  const navigate = useNavigate(); // react router dom
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Firebase Realtime Database에서 사용자 정보 가져오기
      const userId = userCredential.user.uid;
      const userRef = ref(database, `Users/${userId}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        localStorage.setItem("user", JSON.stringify(userData)); // 사용자 정보를 로컬 스토리지에 저장
      } else {
        throw new Error("User data not found");
      }
      navigate("/main");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log in</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}

      <Switcher>
        Don't have an account? <Link to="/signup">Create one &rarr;</Link>
      </Switcher>

      <GithubButton />
    </Wrapper>
  );
}

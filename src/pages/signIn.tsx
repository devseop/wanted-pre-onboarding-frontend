import React from "react";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import { TUserInfo } from "../types";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState<TUserInfo>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signInUserInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const isValid = !(
    userInfo.email !== " " &&
    userInfo.email.includes("@") === true &&
    userInfo.password !== " " &&
    userInfo.password.length >= 8
  );

  const signInSubmitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const axiosPostHeaders = { "Content-Type": "application/json" };

      try {
        const res = await axios.post(
          `https://www.pre-onboarding-selection-task.shop/auth/signin`,
          userInfo,
          {
            headers: axiosPostHeaders,
          }
        );
        // 로그인 성공시 로컬 스토리지에 JWT 저장
        if (res.status === 200) {
          // console.log("✅ OK");
          window.localStorage.setItem("JWT", res.data.access_token);
        }
        // JWT가 없으면 재로그인 시도
        if (window.localStorage.getItem("JWT")?.length === 0) {
          alert("로그인에 실패했습니다. 다시 로그인해주세요.");
          navigate("/signin");
        } else {
          // JWT가 있으면 /todo로 이동
          alert("로그인에 성공했습니다.");
          navigate("/todo");
        }
      } catch (e) {
        console.error(e);
      }
    },
    [userInfo, navigate]
  );

  return (
    <Styled.Background>
      <Styled.Container>
        <h1>로그인</h1>
        <form onSubmit={signInSubmitHandler}>
          <label htmlFor="email">이메일</label>
          <input
            data-testid="email-input"
            name="email"
            placeholder="todo@gmail.com"
            value={userInfo.email}
            onChange={signInUserInfoHandler}
            autoFocus
          />
          <label htmlFor="password">비밀번호</label>
          <input
            data-testid="password-input"
            name="password"
            placeholder="8자 이상"
            type="password"
            value={userInfo.password}
            onChange={signInUserInfoHandler}
          />
          <Styled.Button
            type="submit"
            data-testid="signin-button"
            disabled={isValid ? true : false}
          >
            로그인
          </Styled.Button>
          <p>
            회원이 아니신가요? <Link to="/signup">회원가입하기</Link>
          </p>
        </form>
      </Styled.Container>
    </Styled.Background>
  );
};

const Background = styled.div`
  background-color: #23232c;
  height: 100vh;
  padding: 220px 0 0;
`;

const Container = styled.div`
  width: 460px;
  margin: 0 auto;
  color: #fff;

  h1 {
    margin-bottom: 32px;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      margin-top: 8px;
      margin-bottom: 24px;
      border-radius: 8px;
      border: none;
      height: 40px;
      outline: none;
      padding: 12px;
    }

    p {
      margin-top: 24px;
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: center;

      a:link {
        color: #2f6afe;
      }

      a:visited {
        color: #2f6afe;
      }
    }
  }
`;

const Button = styled.button`
  height: 44px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background-color: ${(props) => (props.disabled ? "lightgray" : "#2f6afe")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const Styled = { Background, Container, Button };

export default SignIn;

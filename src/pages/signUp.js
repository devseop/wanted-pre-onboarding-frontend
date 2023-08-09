import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /**
   * 회원가입 버튼 활성화를 위한 유효성 검사 =>
   * 이메일 @ 포함 / 비밀번호 8자 이상
   */
  const isValid = !(
    email !== " " &&
    email.includes("@") === true &&
    password !== " " &&
    password.length >= 8
  );

  const signUpSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const signUpData = {
        email: email,
        password: password,
      };

      const axiosPostHeaders = { "Content-Type": "application/json" };

      try {
        const res = await axios.post(
          `https://www.pre-onboarding-selection-task.shop/auth/signup`,
          signUpData,
          {
            headers: axiosPostHeaders,
          }
        );
        if (res.status === 201) {
          alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
          navigate("/signin");
        }
      } catch (e) {
        console.error(e);
      }
    },
    [email, password, navigate]
  );

  return (
    <Styled.Background>
      <Styled.Container>
        <h1>회원가입</h1>
        <form onSubmit={signUpSubmitHandler}>
          <label htmlFor="email">이메일</label>
          <input
            data-testid="email-input"
            name="email"
            placeholder="todo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">비밀번호</label>
          <input
            data-testid="password-input"
            name="password"
            placeholder="8자 이상"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" data-testid="signup-button" disabled={isValid}>
            가입하기
          </button>
          <p>
            이미 계정이 있으신가요? <Link to="/signup">로그인하기</Link>
          </p>
        </form>
      </Styled.Container>
    </Styled.Background>
  );
};

const Background = styled.div`
  background-color: #23232c;
  height: 100vh;
  padding: 96px 0;
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

    button {
      height: 44px;
      border-radius: 8px;
      border: none;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      background-color: ${(props) => (props.isValid ? "#2f6afe" : "lightgray")};
      cursor: ${(props) => (props.isValid ? "pointer" : "not-allowed")};
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

const Styled = { Background, Container };

export default SignUp;

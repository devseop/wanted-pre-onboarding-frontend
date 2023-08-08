import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValid = !(
    email !== " " &&
    email.includes("@") === true &&
    password !== " " &&
    password.length >= 8
  );

  const signInSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const signInData = {
        email: email,
        password: password,
      };
      const axiosPostHeaders = { "Content-Type": "application/json" };

      try {
        const res = await axios.post(
          `https://www.pre-onboarding-selection-task.shop/auth/signin`,
          signInData,
          {
            headers: axiosPostHeaders,
          }
        );
        // 로그인 성공시 로컬 스토리지에 JWT 저장
        if (res.status === 200) {
          console.log("✅ OK");
          window.localStorage.setItem("JWT", res.data.access_token);
        }
        // JWT가 없으면 재로그인 시도
        if (window.localStorage.getItem("JWT").length === 0) {
          alert("로그인에 실패했습니다. 다시 로그인해주세요.");
          setEmail("");
          setPassword("");
        } else {
          // JWT가 있으면 /todo로 이동
          alert("로그인에 성공했습니다.");
          navigate("/todo");
        }
      } catch (e) {
        console.error(e);
      }
    },
    [email, password, navigate]
  );

  return (
    <>
      <div>로그인</div>
      <form onSubmit={signInSubmitHandler}>
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
        <button type="submit" data-testid="signin-button" disabled={isValid}>
          로그인
        </button>
      </form>
    </>
  );
};

export default SignIn;

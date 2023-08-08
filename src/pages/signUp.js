import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    [email, password]
  );

  return (
    <>
      <div>회원가입</div>
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
      </form>
    </>
  );
};

export default SignUp;

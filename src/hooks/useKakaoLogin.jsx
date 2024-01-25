import axios from "axios";
import { useState } from "react";

export default function useKakaoLogin(initialState) {
  console.log(initialState);
  const [data, setData] = useState();
  async function handleLogin() {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${initialState.rest_api_key}&redirect_uri=${initialState.redirect_uri}&response_type=code`;
    window.location.href = kakaoURL;

    const code = new URL(window.location.href).searchParams.get("code");
    const token = await getToken(code);
    setData(token);
  }
  return [data, handleLogin];
}

async function getToken(Authcode) {
  const res = await axios.post("https://kauth.kakao.com/oauth/token", {
    grant_type: "authorization_code",
    client_id: "cbf5e9d6855ac8a3072d3eae8c884c57",
    redirect_uri: "http://localhost:3000",
    code: Authcode,
  });
  console.log(res);

  return res.data;
}

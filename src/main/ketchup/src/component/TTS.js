export const getSpeech = (text) => {
  return new Promise((resolve, reject) => {
    // 이 함수가 완전히 끝나야 이미지가 바뀜
    // Promise 객체를 생성, Promise는 비동기 작업의 완료 또는 실패를 나타냄.
    // resolve: 비동기 작업 성공적으로 완료 
    // reject: 비동기 작업 실패
    let voices = [];

    // 디바이스에 내장된 voice를 가져온다.
    const setVoiceList = () => {
      voices = window.speechSynthesis.getVoices();
    };

    setVoiceList();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      // voice list에 변경됐을때, voice를 다시 가져온다.
      window.speechSynthesis.onvoiceschanged = setVoiceList;
    }

    const speech = (txt) => {
      const lang = "en-US"; // 영어
      const utterThis = new SpeechSynthesisUtterance(txt);
      // rate : speech 속도 조절 (기본값 1 / 조절 0.1 ~ 10 -> 숫자가 클수록 속도가 빠름 )
      const rate = 0.8;

      utterThis.lang = lang;
      utterThis.rate = rate;
      // voice list가 비어있으면 오류를 reject
      //if (voices.length === 0) {
        // alert("Voice list is empty");
        //return;
      //}
      /* 
          영어 vocie 찾기
          디바이스 별로 한국어는 ko-KR 또는 ko_KR로 voice가 정의되어 있다.
      */
      const voice = voices.find(
        (elem) => elem.lang === lang || elem.lang === lang.replace("-", "_")
      );

      // voice가 있다면 utterance에 목소리를 설정.
      if (voice) {
        utterThis.voice = voice;
      } else {
        //alert("Voice list is empty");
        return;
      }

      // utterance를 재생(speak)한다.
      utterThis.onend = () => {
        resolve(); // 음성 합성이 완료되면 Promise를 resolve합니다.
      };

      utterThis.onerror = (error) => {
        alert("Error during speech synthesis"); // 오류가 발생했을 때 알림창 띄우기
      };

      window.speechSynthesis.speak(utterThis);
    };

    speech(text);
  });
};

export const pauseSpeech = () => {
  window.speechSynthesis.cancel();
};

module.exports = {
  client: {
    service: {
      // name: "<YOUR_AWESOME_PROJECT_NAME>",
      url: "http://localhost:8888/graphql"
    }
  }
};
// 타입스크립트를 쓸 때 사용할 수 있음
// 해당 설정으로 타입 추론이 가능함

// 아폴로 클라이언트를 사용해서 추출 가능
// 이렇게 하면 제너레이터드라는 폴더가 생성되며, 폴더 안에 타입들이 들어있는 ts 파일이 만들어진다.
// 나중에 해당 파일을 임포트 해서 사용할 수 있다

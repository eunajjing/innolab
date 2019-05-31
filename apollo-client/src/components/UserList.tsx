import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import UserItem from "./UserItem";
import UserCreator from "./UserCreator";

const UserListBlock = styled.ul``;

interface UserListProps {
  onReachEnd(): void;
  onSubmit(name: string): unknown;
  userList: {
    id: string;
    name: string;
  }[];
}

const UserList: React.FC<UserListProps> = ({
  onReachEnd,
  userList,
  onSubmit
}) => {
  const ref = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !element.children.length) return;

    const [lastChildren] = [...element.children].slice(-1);
    // ref 생성으로 마지막 값
    const observer = new IntersectionObserver(
      // IntersectionObserver : html5의 기능 중 하나
      // 모든 브라우저에서는 지원하지 않음
      // 만약 안되는 브라우저라면 폴리필 지원 여부를 확인해봐야 함
      // 이것도 안되면 스크롤로 제어하는 방식
      // Observer : 관찰 대상을 관찰하는 함수
      // 차일드가 화면에 뜨거나 사라지는 순간 인자로 보낸 콜백 함수 실행
      // 결과 값으로 배열의 형태로 돌아옴

      // 쿼리, 뮤테이션
      // 서브스크립션(서버 푸시, 리퀘스트 후 기다리면 데이터가 차곡차곡 온다)
      // 스키마 링크(서버가 없어도 클라이언트 단에서 서버가 있는 것처럼 쓸 수 있음)

      ([entry]) => {
        if (entry.isIntersecting) {
          // 화면에 보여지고 있는지 여부 체크
          onReachEnd();
          // 보여지고 있다면 함수 실행
        }
      },
      { rootMargin: "300px" }
      // 300px 밑으로 내려가면 실행되도록 설정
    );

    observer.observe(lastChildren);
    return () => observer.disconnect();
    // 값이 변경되면 호출
    // 즉, 관찰 대상이 변경되면 실행됨
  }, [onReachEnd]);

  return (
    <UserListBlock ref={ref}>
      <UserCreator onSubmit={onSubmit} />
      {userList.map(user => (
        <UserItem key={user.id} id={user.id} name={user.name} />
      ))}
    </UserListBlock>
  );
};

export default UserList;

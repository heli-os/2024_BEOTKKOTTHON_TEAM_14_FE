import React from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';

import { writePageStateAtom } from '@/store/atom';
import Typography from '../Typography';

const SaveButton = styled.button`
  margin-top: 20px;
  border-radius: 50px;
  display: flex;
  color: white;
  background-color: black;
  font-size: 15px;
  gap: 10px;
  width: 100px;
  height: 30px;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

function TestamentSaveModal({ setSaveBtnClick }) {
  const [pageName, setPageName] = useRecoilState(writePageStateAtom);

  return (
    <div className="bg-[black]/10 absolute left-0 top-0 w-[100%] h-[100vh]">
      <div className="text-center w-[70%] bg-[white] rounded-[20px] pt-[30px] absolute m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Typography title={'작성 완료'} type={'bold30'} />
        <Typography title={'유서를 저장하시겠습니까?'} type={'bold15'} />
        <div className="flex justify-center mt-[10px]">
          <SaveButton
            onClick={() => {
              setSaveBtnClick(false);
              setPageName('write');
            }}
          >
            확인
          </SaveButton>
        </div>
      </div>
    </div>
  );
}

export default TestamentSaveModal;

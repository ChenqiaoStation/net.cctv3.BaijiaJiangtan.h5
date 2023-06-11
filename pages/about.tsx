import {useEffect} from 'react';
import {Host4Springboot, useHttpPost} from '../x';

const AboutPage = () => {
  useEffect(() => {
    (async () => {
      let result = await useHttpPost(
        `${Host4Springboot}/insertProof.do`,
        JSON.stringify({
          teacherId: 'Teacher id',
          dataIn: 'Data in',
          dataOut: 'dataOut',
        }),
      );
      console.log('insertProof.do', result);
    })();
    return function () {};
  }, []);

  return <div />;
};

export default AboutPage;
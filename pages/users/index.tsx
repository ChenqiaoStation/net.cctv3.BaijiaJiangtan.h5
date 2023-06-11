import {GetStaticProps} from 'next';

import {User} from '../../interfaces';
import {sampleUserData} from '../../utils/sample-data';

type Props = {
  items: User[];
};

const WithStaticProps = ({items}: Props) => <div></div>;

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;
  return {props: {items}};
};

export default WithStaticProps;

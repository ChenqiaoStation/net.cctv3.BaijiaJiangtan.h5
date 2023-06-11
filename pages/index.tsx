import {Alert, Card, Layout} from 'antd';
import {CSSProperties, useState} from 'react';
import {Menus} from '../components';
import SeriesPage from './page-series';
import {Descriptions} from 'antd';
import {Host4Springboot, RUNTIME} from '../x';
import TeacherPage from './page-teacher';
import ChapterPage from './page-chapter';

const {Header, Footer, Sider, Content} = Layout;

const App = () => {
  const [menu, setMenu] = useState(0);

  const onMenuPress = (menu: any) => {
    setMenu(parseInt(menu.key));
  };

  return (
    <Layout style={{height: '100vh'}}>
      <Header style={viewHeader}></Header>
      <Layout style={{height: '100vh'}}>
        <Sider style={{overflowY: 'auto', backgroundColor: 'white'}}>
          <Menus onMenuPress={onMenuPress} />
        </Sider>
        <Content style={{margin: '24px 16px 0', overflowY: 'auto'}}>
          <Card bordered={false}>
            <Descriptions title="系统信息">
              <Descriptions.Item label="环境">
                {['测试环境', '生产环境'][RUNTIME]}
              </Descriptions.Item>
              <Descriptions.Item label="Server地址">
                {Host4Springboot}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <div style={{height: 16}} />
          {
            [
              null,
              <TeacherPage />,
              <SeriesPage />,
              <ChapterPage />,
              null,
              null,
              null,
              null,
              null,
              null,
            ][menu]
          }
        </Content>
      </Layout>
    </Layout>
  );
};

const viewHeader: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
};

export default App;

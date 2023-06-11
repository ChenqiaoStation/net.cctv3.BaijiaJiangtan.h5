import {Layout} from 'antd';
import Head from 'next/head';
import {CSSProperties, useEffect, useState} from 'react';
import DPlayer from 'react-dplayer';

const Video = () => {
  useEffect(() => {
    return function () {};
  }, []);
  return (
    <html>
      <Head>
        <script src="https://unpkg.com/dplayer/dist/DPlayer.min.js" />
        <script src="https://unpkg.com/react/dist/react.min.js" />
        <script src="https://unpkg.com/react-dom/dist/react-dom.min.js" />
        <script src="https://unpkg.com/react-dplayer/dist/react-dplayer.min.js" />
      </Head>
      <Layout style={{height: '100vh', width: '100vw'}}>
        {/* <div id="video"></div> */}
        <DPlayer
          options={{
            loop: false,
            logo: 'https://avatars3.githubusercontent.com/u/17537749?v=4&s=460',
            video: {
              url: 'https://hotasp.v.cntv.cn/asp/hls/main/0303000a/3/default/4d9a2a6cee684ef3bc77e5d0c51a14ee/main.m3u8?maxbr=2048',
            },
            screenshot: true,
          }}
        />
      </Layout>
    </html>
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

export default Video;

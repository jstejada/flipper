/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {Button as AntButton, message} from 'antd';
import React, {useState, useEffect, useCallback} from 'react';
import path from 'path';
import fs from 'fs-extra';
import open from 'open';
import {capture, getCaptureLocation, getFileName} from '../utils/screenshot';
import {CameraOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {useStore} from '../utils/useStore';

async function openFile(path: string | null) {
  if (!path) {
    return;
  }

  let fileStat;
  try {
    fileStat = await fs.stat(path);
  } catch (err) {
    message.error(`Couldn't open captured file: ${path}: ${err}`);
    return;
  }

  // Rather randomly chosen. Some FSs still reserve 8 bytes for empty files.
  // If this doesn't reliably catch "corrupt" files, you might want to increase this.
  if (fileStat.size <= 8) {
    message.error(
      'Screencap file retrieved from device appears to be corrupt. Your device may not support screen recording. Sometimes restarting your device can help.',
      0,
    );
    return;
  }

  try {
    await open(path);
  } catch (e) {
    console.warn(`Opening ${path} failed with error ${e}.`);
  }
}

export default function ScreenCaptureButtons() {
  const selectedDevice = useStore((state) => state.connections.selectedDevice);
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
  const [isRecordingAvailable, setIsRecordingAvailable] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let canceled = false;
    selectedDevice?.screenCaptureAvailable().then((result) => {
      if (!canceled) {
        setIsRecordingAvailable(result);
      }
    });
    return () => {
      canceled = true;
    };
  }, [selectedDevice]);

  const handleScreenshot = useCallback(() => {
    setIsTakingScreenshot(true);
    return capture(selectedDevice!)
      .then(openFile)
      .catch((e) => {
        console.error('Taking screenshot failed:', e);
        message.error('Taking screenshot failed:' + e);
      })
      .finally(() => {
        setIsTakingScreenshot(false);
      });
  }, [selectedDevice]);

  const handleRecording = useCallback(() => {
    if (!selectedDevice) {
      return;
    }
    if (!isRecording) {
      setIsRecording(true);
      const videoPath = path.join(getCaptureLocation(), getFileName('mp4'));
      return selectedDevice.startScreenCapture(videoPath).catch((e) => {
        console.error('Failed to start recording', e);
        message.error('Failed to start recording' + e);
        setIsRecording(false);
      });
    } else {
      return selectedDevice
        .stopScreenCapture()
        .then(openFile)
        .catch((e) => {
          console.error('Failed to start recording', e);
          message.error('Failed to start recording' + e);
        })
        .finally(() => {
          setIsRecording(false);
        });
    }
  }, [selectedDevice, isRecording]);

  return (
    <>
      <AntButton
        icon={<CameraOutlined />}
        title="Take Screenshot"
        type="ghost"
        onClick={handleScreenshot}
        disabled={!selectedDevice}
        loading={isTakingScreenshot}
      />
      <AntButton
        icon={<VideoCameraOutlined />}
        title="Make Screen Recording"
        type={isRecording ? 'primary' : 'ghost'}
        onClick={handleRecording}
        disabled={!selectedDevice || !isRecordingAvailable}
        danger={isRecording}
      />
    </>
  );
}
